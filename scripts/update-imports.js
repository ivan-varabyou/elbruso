#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

let dryRun = false;
let verbose = false;

const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--dry-run") {
    dryRun = true;
  } else if (args[i] === "--verbose" || args[i] === "-v") {
    verbose = true;
  } else if (args[i] === "--help" || args[i] === "-h") {
    console.log(`
Usage: node update-imports.js [options]

Options:
  --dry-run    Show what would be changed without making changes
  --verbose    Show detailed output
  --help       Show this help message

This script updates all imports throughout the project by:
1. Reading rename-map.json for old/new name mappings
2. Finding all TypeScript/JavaScript files
3. Updating import statements to reflect renamed files
4. Handling both relative and alias imports
`);
    process.exit(0);
  }
}

function log(message, level = "info") {
  const prefix = dryRun ? "[DRY-RUN]" : "";
  const prefixStr = prefix ? `${prefix} ` : "";
  console.log(`${prefixStr}[${level.toUpperCase()}] ${message}`);
}

function logVerbose(message) {
  if (verbose) {
    log(message, "verbose");
  }
}

function readRenameMap() {
  const renameMapPath = path.join(__dirname, "rename-map.json");

  if (!fs.existsSync(renameMapPath)) {
    log(`rename-map.json not found at ${renameMapPath}`, "error");
    return null;
  }

  try {
    const content = fs.readFileSync(renameMapPath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    log(`Failed to parse rename-map.json: ${error.message}`, "error");
    return null;
  }
}

function findAllSourceFiles(dir = projectRoot, files = []) {
  const extensions = [".ts", ".tsx", ".js", ".jsx", ".vue", ".svelte"];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const relativePath = path.relative(projectRoot, fullPath);

    if (
      relativePath.startsWith("node_modules") ||
      relativePath.startsWith(".git") ||
      relativePath.startsWith(".backups") ||
      relativePath.startsWith("scripts") ||
      relativePath.startsWith(".next") ||
      relativePath.startsWith("dist") ||
      relativePath.startsWith("build")
    ) {
      continue;
    }

    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      findAllSourceFiles(fullPath, files);
    } else if (extensions.includes(path.extname(item))) {
      files.push(fullPath);
    }
  }

  return files;
}

function buildImportPatterns(renameMap) {
  const renames = renameMap.renames || renameMap;
  const patterns = [];

  for (const [oldPath, newPath] of Object.entries(renames)) {
    const oldBasename = path.basename(oldPath, path.extname(oldPath));
    const newBasename = path.basename(newPath, path.extname(newPath));
    const oldExt = path.extname(oldPath);
    const newExt = path.extname(newPath);

    patterns.push({
      oldFull: oldPath,
      newFull: newPath,
      oldBasename,
      newBasename,
      oldExt,
      newExt,
      patterns: [
        new RegExp(`from\\s+['"]${escapeRegex(oldPath)}['"]`, "g"),
        new RegExp(`from\\s+['"]\\./${escapeRegex(oldBasename)}['"]`, "g"),
        new RegExp(`from\\s+['"]\\.\\./${escapeRegex(oldBasename)}['"]`, "g"),
        new RegExp(`from\\s+['"]\\.\\.\\./${escapeRegex(oldBasename)}['"]`, "g"),
        new RegExp(`import\\s+.*\\s+from\\s+['"]${escapeRegex(oldPath)}['"]`, "g"),
        new RegExp(`import\\s+['"]${escapeRegex(oldPath)}['"]`, "g"),
        new RegExp(`export\\s+.*\\s+from\\s+['"]${escapeRegex(oldPath)}['"]`, "g"),
        new RegExp(`require\\s*\\(\\s*['"]${escapeRegex(oldPath)}['"]\\s*\\)`, "g"),
        new RegExp(`import\\s*\\(\\s*['"]${escapeRegex(oldPath)}['"]\\s*\\)`, "g"),
        new RegExp(`\\(['"]${escapeRegex(oldPath)}['"]\\)`, "g"),
      ],
    });
  }

  return patterns;
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function updateImportsInFile(filePath, patterns) {
  const content = fs.readFileSync(filePath, "utf-8");
  const originalContent = content;
  let newContent = content;
  let changesCount = 0;

  for (const patternSet of patterns) {
    for (const pattern of patternSet.patterns) {
      const matches = newContent.match(pattern);
      if (matches) {
        for (const match of matches) {
          let newMatch = match;

          if (patternSet.oldFull !== patternSet.newFull) {
            newMatch = newMatch.replace(patternSet.oldFull, patternSet.newFull);
          }

          if (patternSet.oldBasename !== patternSet.newBasename) {
            newMatch = newMatch.replace(
              new RegExp(patternSet.oldBasename, "g"),
              patternSet.newBasename,
            );
          }

          if (patternSet.oldExt !== patternSet.newExt) {
            newMatch = newMatch.replace(
              new RegExp(patternSet.oldExt + "(['\"])", "g"),
              patternSet.newExt + "$1",
            );
          }

          if (newMatch !== match) {
            newContent = newContent.replace(match, newMatch);
            changesCount++;
          }
        }
      }
    }
  }

  if (changesCount > 0) {
    if (dryRun) {
      log(`Would update ${changesCount} imports in: ${path.relative(projectRoot, filePath)}`);
    } else {
      fs.writeFileSync(filePath, newContent);
      log(`Updated ${changesCount} imports: ${path.relative(projectRoot, filePath)}`);
    }
  }

  return changesCount;
}

function updateDynamicImports(filePath, patterns) {
  const content = fs.readFileSync(filePath, "utf-8");
  const originalContent = content;
  let newContent = content;

  for (const patternSet of patterns) {
    const dynamicPatterns = [
      new RegExp(
        `lazy\\s*\\(\\s*\\(\\s*\\)\\s*=>\\s*import\\s*\\(\\s*['"]${escapeRegex(patternSet.oldFull)}['"]\\s*\\)\\)`,
        "g",
      ),
      new RegExp(`import\\s*\\(\\s*['"]${escapeRegex(patternSet.oldFull)}['"]\\s*\\)`, "g"),
    ];

    for (const pattern of dynamicPatterns) {
      if (pattern.test(newContent)) {
        newContent = newContent.replace(pattern, (match) => {
          return match.replace(patternSet.oldFull, patternSet.newFull);
        });

        if (newContent !== originalContent) {
          return true;
        }
      }
    }
  }

  return false;
}

async function run() {
  console.log("========================================");
  console.log("       Import Update Script             ");
  console.log("========================================");
  console.log(`Mode: ${dryRun ? "DRY-RUN" : "LIVE"}`);
  console.log("========================================");

  const renameMap = readRenameMap();

  if (!renameMap) {
    log("No rename-map.json found, exiting", "error");
    process.exit(1);
  }

  const patterns = buildImportPatterns(renameMap);

  if (patterns.length === 0) {
    log("No rename mappings found in rename-map.json", "warning");
    process.exit(0);
  }

  console.log(`Loaded ${patterns.length} rename patterns`);

  const sourceFiles = findAllSourceFiles();

  console.log(`Found ${sourceFiles.length} source files`);

  let filesModified = 0;
  let totalChanges = 0;

  for (const filePath of sourceFiles) {
    try {
      const changes = updateImportsInFile(filePath, patterns);
      if (changes > 0) {
        filesModified++;
        totalChanges += changes;
      }
    } catch (error) {
      log(`Error processing ${filePath}: ${error.message}`, "error");
    }
  }

  console.log("========================================");
  console.log("       Import Update Complete           ");
  console.log("========================================");
  console.log(`Files modified: ${filesModified}`);
  console.log(`Total import updates: ${totalChanges}`);

  if (dryRun) {
    console.log("Run without --dry-run to apply changes");
  }
}

run().catch((error) => {
  log(`Script failed: ${error.message}`, "error");
  process.exit(1);
});
