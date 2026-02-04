#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

let dryRun = false;
let phase = "all";

const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--dry-run") {
    dryRun = true;
  } else if (args[i] === "--phase") {
    if (args[i + 1]) {
      phase = args[i + 1];
      i++;
    }
  }
}

function log(message, type = "info") {
  const prefix = dryRun ? "[DRY-RUN]" : "";
  const timestamp = new Date().toISOString();
  console.log(`${prefix}[${timestamp}] [${type.toUpperCase()}] ${message}`);
}

function logError(message) {
  log(message, "error");
}

function logSuccess(message) {
  log(message, "success");
}

function logWarning(message) {
  log(message, "warning");
}

function ensureBackupDir(phaseName) {
  const backupDir = path.join(projectRoot, ".backups", phaseName);
  if (!fs.existsSync(backupDir)) {
    if (!dryRun) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    log(`Created backup directory: ${backupDir}`);
  }
  return backupDir;
}

function createBackup(filePath, backupDir) {
  if (!fs.existsSync(filePath)) {
    logWarning(`File not found for backup: ${filePath}`);
    return null;
  }

  const relativePath = path.relative(projectRoot, filePath);
  const backupPath = path.join(backupDir, relativePath);
  const backupFileDir = path.dirname(backupPath);

  if (!fs.existsSync(backupFileDir)) {
    if (!dryRun) {
      fs.mkdirSync(backupFileDir, { recursive: true });
    }
  }

  if (!dryRun) {
    fs.copyFileSync(filePath, backupPath);
  }
  log(`Backed up: ${relativePath} -> ${path.join(".backups", phase, relativePath)}`);
  return backupPath;
}

function readRenameMap() {
  const renameMapPath = path.join(__dirname, "rename-map.json");

  if (!fs.existsSync(renameMapPath)) {
    logError(`rename-map.json not found at ${renameMapPath}`);
    process.exit(1);
  }

  try {
    const content = fs.readFileSync(renameMapPath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    logError(`Failed to parse rename-map.json: ${error.message}`);
    process.exit(1);
  }
}

function findAllTsFiles(dir = projectRoot, files = []) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const relativePath = path.relative(projectRoot, fullPath);

    if (
      relativePath.startsWith("node_modules") ||
      relativePath.startsWith(".git") ||
      relativePath.startsWith(".backups") ||
      relativePath.startsWith("scripts") ||
      relativePath.startsWith(".backup_deleted")
    ) {
      continue;
    }

    try {
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        findAllTsFiles(fullPath, files);
      } else if (
        item.endsWith(".ts") ||
        item.endsWith(".tsx") ||
        item.endsWith(".js") ||
        item.endsWith(".jsx")
      ) {
        files.push(fullPath);
      }
    } catch (error) {
      // Skip files that don't exist or are inaccessible
      logWarning(`Skipping inaccessible path: ${relativePath}`);
    }
  }

  return files;
}

async function phase1Rename(renameMap) {
  log("Starting Phase 1: File Renaming");
  const backupDir = ensureBackupDir("phase1-rename");

  // Support both formats: array of {oldPath, newPath, action} or object with renames
  const renames = renameMap.mappings || renameMap.renames || renameMap;

  // If it's an array, filter by action="rename"
  const renameList = Array.isArray(renames)
    ? renames.filter((m) => m.action === "rename" || !m.action)
    : Object.entries(renames || {}).map(([oldPath, newPath]) => ({ oldPath, newPath }));

  let successCount = 0;
  let failCount = 0;
  let skipCount = 0;

  for (const item of renameList) {
    const oldPathStr = item.oldPath || item[0];
    const newPathStr = item.newPath || item[1];

    if (!oldPathStr || !newPathStr) continue;

    const oldPath = path.join(projectRoot, oldPathStr);
    const newPath = path.join(projectRoot, newPathStr);

    if (!fs.existsSync(oldPath)) {
      logWarning(`File not found: ${oldPathStr}`);
      continue;
    }

    createBackup(oldPath, backupDir);

    if (fs.existsSync(newPath)) {
      logWarning(`Destination already exists, skipping: ${newPathStr}`);
      skipCount++;
      continue;
    }

    if (dryRun) {
      log(`Would rename: ${oldPathStr} -> ${newPathStr}`);
    } else {
      try {
        fs.renameSync(oldPath, newPath);
        logSuccess(`Renamed: ${oldPathStr} -> ${newPathStr}`);
        successCount++;
      } catch (error) {
        logError(`Failed to rename ${oldPathStr}: ${error.message}`);
        failCount++;
      }
    }
  }

  log(`Phase 1 complete: ${successCount} renamed, ${skipCount} skipped, ${failCount} failed`);
  return { successCount, failCount };
}

async function phase2BarrelExports(renameMap) {
  log("Starting Phase 2: Barrel Exports Update");
  const backupDir = ensureBackupDir("phase2-barrel");

  // Extract components from mappings for export generation
  const components = [];
  const exports = renameMap.exports || {};

  if (renameMap.mappings) {
    for (const item of renameMap.mappings) {
      if (item.oldPath) {
        const basename = path.basename(item.oldPath, path.extname(item.oldPath));
        const exportName = basename.replace(
          /\.(dumb|smart|widget|modal|layout|page|section|provider|context|hook|service|api|ws|store|selector|types|dto|interface|constant|config|lib|adapter|pattern|chart|viz)$/,
          "",
        );
        components.push({
          from: item.oldPath.replace(
            /\.(dumb|smart|widget|modal|layout|page|section|provider|context|hook|service|api|ws|store|selector|types|dto|interface|constant|config|lib|adapter|pattern|chart|viz)$/,
            "",
          ),
          name:
            exportName +
            (item.oldPath.includes(".dumb")
              ? "Dumb"
              : item.oldPath.includes(".smart")
                ? "Smart"
                : item.oldPath.includes(".widget")
                  ? "Widget"
                  : item.oldPath.includes(".modal")
                    ? "Modal"
                    : item.oldPath.includes(".layout")
                      ? "Layout"
                      : item.oldPath.includes(".page")
                        ? "Page"
                        : item.oldPath.includes(".section")
                          ? "Section"
                          : item.oldPath.includes(".provider")
                            ? "Provider"
                            : item.oldPath.includes(".context")
                              ? "Context"
                              : item.oldPath.includes(".hook")
                                ? "Hook"
                                : item.oldPath.includes(".service")
                                  ? "Service"
                                  : item.oldPath.includes(".api")
                                    ? "Api"
                                    : item.oldPath.includes(".ws")
                                      ? "Ws"
                                      : item.oldPath.includes(".store")
                                        ? "Store"
                                        : item.oldPath.includes(".selector")
                                          ? "Selector"
                                          : ""),
        });
      }
    }
  }

  const tsFiles = findAllTsFiles();
  const barrelFiles = tsFiles.filter((f) => f.endsWith("index.ts") || f.endsWith("index.tsx"));

  let successCount = 0;

  for (const barrelPath of barrelFiles) {
    if (!fs.existsSync(barrelPath)) continue;

    createBackup(barrelPath, backupDir);

    let content = fs.readFileSync(barrelPath, "utf-8");
    const originalContent = content;

    const lines = content.split("\n");
    const newLines = [];

    for (const line of lines) {
      if (line.trim().startsWith("export * from")) {
        const match = line.match(/export \* from ['"]([^'"]+)['"]/);
        if (match) {
          const modulePath = match[1];

          if (components.length > 0) {
            for (const component of components) {
              if (
                modulePath.includes(component.from.split("/").pop()) ||
                modulePath === "./" + component.from.split("/").pop()
              ) {
                newLines.push(`export { ${component.name} } from '${modulePath}';`);
                break;
              }
            }
          } else if (exports[modulePath]) {
            newLines.push(`export { ${exports[modulePath]} } from '${modulePath}';`);
          } else {
            newLines.push(line);
          }
        } else {
          newLines.push(line);
        }
      } else {
        newLines.push(line);
      }
    }

    content = newLines.join("\n");

    if (content !== originalContent) {
      if (dryRun) {
        log(`Would update barrel exports in: ${path.relative(projectRoot, barrelPath)}`);
      } else {
        fs.writeFileSync(barrelPath, content);
        logSuccess(`Updated barrel exports: ${path.relative(projectRoot, barrelPath)}`);
        successCount++;
      }
    }
  }

  log(`Phase 2 complete: ${successCount} barrel files updated`);
  return { successCount };
}

async function phase3Imports(renameMap) {
  log("Starting Phase 3: Import Updates");
  const backupDir = ensureBackupDir("phase3-imports");

  // Support both formats
  const renames = renameMap.mappings || renameMap.renames || renameMap;

  // If it's an array, convert to import map
  const importMap = {};
  const renameList = Array.isArray(renames) ? renames : [];

  if (Array.isArray(renames)) {
    for (const item of renames) {
      const oldPath = item.oldPath || item[0];
      const newPath = item.newPath || item[1];
      if (oldPath && newPath) {
        const oldBasename = path.basename(oldPath, path.extname(oldPath));
        const newBasename = path.basename(newPath, path.extname(newPath));
        importMap[oldBasename] = newBasename;
      }
    }
  }

  const tsFiles = findAllTsFiles();
  let filesModified = 0;

  for (const filePath of tsFiles) {
    // Ensure filePath is a string
    const filePathStr = String(filePath);

    if (!fs.existsSync(filePathStr)) continue;

    createBackup(filePathStr, backupDir);

    let content = fs.readFileSync(filePathStr, "utf-8");
    const originalContent = content;

    for (const item of renameList) {
      const oldPath = item.oldPath || item[0];
      const newPath = item.newPath || item[1];

      if (!oldPath || !newPath) continue;

      const oldBasename = path.basename(oldPath, path.extname(oldPath));
      const newBasename = path.basename(newPath, path.extname(newPath));

      const patterns = [
        new RegExp(`from ['"]${oldPath}['"]`, "g"),
        new RegExp(`from ['"]\\./${oldBasename}['"]`, "g"),
        new RegExp(`from ['"]\\.\\.\\/${oldBasename}['"]`, "g"),
        new RegExp(`from ['"]\\.\\.\\.\\/${oldBasename}['"]`, "g"),
        new RegExp(`import type.*from ['"]${oldPath}['"]`, "g"),
        new RegExp(`import type.*from ['"]\\./${oldBasename}['"]`, "g"),
      ];

      for (const pattern of patterns) {
        content = content.replace(pattern, (match) => {
          return match.replace(oldPath, newPath).replace(oldBasename, newBasename);
        });
      }
    }

    if (content !== originalContent) {
      if (dryRun) {
        log(`Would update imports in: ${path.relative(projectRoot, filePathStr)}`);
      } else {
        fs.writeFileSync(filePathStr, content);
        logSuccess(`Updated imports: ${path.relative(projectRoot, filePathStr)}`);
        filesModified++;
      }
    }
  }

  log(`Phase 3 complete: ${filesModified} files updated`);
  return { successCount: filesModified };
}

async function runMigration() {
  console.log("========================================");
  console.log("        Migration Script Started        ");
  console.log("========================================");
  console.log(`Mode: ${dryRun ? "DRY-RUN" : "LIVE"}`);
  console.log(`Phase: ${phase}`);
  console.log("========================================");

  const renameMap = readRenameMap();

  try {
    if (phase === "all" || phase === "rename") {
      await phase1Rename(renameMap);
    }

    if (phase === "all" || phase === "barrel") {
      await phase2BarrelExports(renameMap);
    }

    if (phase === "all" || phase === "imports") {
      await phase3Imports(renameMap);
    }

    console.log("========================================");
    console.log("        Migration Complete!             ");
    console.log("========================================");

    if (!dryRun) {
      log("Backup files created in .backups/ directory");
    }
  } catch (error) {
    logError(`Migration failed: ${error.message}`);
    process.exit(1);
  }
}

runMigration();
