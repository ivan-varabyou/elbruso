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
Usage: node update-barrel-exports.js [options]

Options:
  --dry-run    Show what would be changed without making changes
  --verbose    Show detailed output
  --help       Show this help message

This script updates barrel exports (index.ts files) by:
1. Finding all export * statements
2. Replacing them with named exports based on rename-map.json
3. Adding proper export { Component } statements
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

function findIndexFiles(dir = projectRoot, files = []) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const relativePath = path.relative(projectRoot, fullPath);

    if (
      relativePath.startsWith("node_modules") ||
      relativePath.startsWith(".git") ||
      relativePath.startsWith(".backups") ||
      relativePath.startsWith("scripts")
    ) {
      continue;
    }

    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (item === "node_modules") continue;
      findIndexFiles(fullPath, files);
    } else if (item === "index.ts" || item === "index.tsx") {
      files.push(fullPath);
    }
  }

  return files;
}

function parseExportStar(content) {
  const exportStarRegex = /export\s*\*\s*from\s*['"]([^'"]+)['"]/g;
  const matches = [];
  let match;

  while ((match = exportStarRegex.exec(content)) !== null) {
    matches.push({
      full: match[0],
      path: match[1],
      index: match.index,
    });
  }

  return matches;
}

function getNamedExports(componentName, renameMap) {
  const exports = renameMap.exports || {};
  const components = renameMap.components || [];
  const componentExports = renameMap.componentExports || {};

  if (exports[componentName]) {
    return exports[componentName];
  }

  if (components.length > 0) {
    const found = components.find(
      (c) =>
        c.from === componentName ||
        c.name === componentName ||
        (typeof c === "string" && c === componentName),
    );
    if (found) {
      return typeof found === "string" ? found : found.name;
    }
  }

  if (componentExports[componentName]) {
    return componentExports[componentName];
  }

  return null;
}

function updateBarrelFile(filePath, renameMap) {
  const content = fs.readFileSync(filePath, "utf-8");
  const originalContent = content;

  const exportStars = parseExportStar(content);

  if (exportStars.length === 0) {
    logVerbose(`No export * found in ${path.relative(projectRoot, filePath)}`);
    return false;
  }

  logVerbose(
    `Found ${exportStars.length} export * statements in ${path.relative(projectRoot, filePath)}`,
  );

  let newContent = content;
  let offset = 0;

  for (const expStar of exportStars) {
    const modulePath = expStar.path;
    const namedExport = getNamedExports(modulePath, renameMap);

    if (namedExport) {
      const oldString = expStar.full;
      const newString = `export { ${namedExport} } from '${modulePath}';`;

      const absoluteIndex = expStar.index + offset;
      newContent =
        newContent.substring(0, absoluteIndex) +
        newString +
        newContent.substring(absoluteIndex + oldString.length);

      offset += newString.length - oldString.length;

      log(`Updating export: ${modulePath} -> export { ${namedExport} }`);
    }
  }

  if (newContent !== originalContent) {
    if (dryRun) {
      log(`Would update: ${path.relative(projectRoot, filePath)}`);
    } else {
      fs.writeFileSync(filePath, newContent);
      log(`Updated barrel exports: ${path.relative(projectRoot, filePath)}`);
    }
    return true;
  }

  return false;
}

function addMissingExports(filePath, renameMap) {
  const content = fs.readFileSync(filePath, "utf-8");
  const components = renameMap.components || renameMap.newExports || [];

  if (!components.length) {
    return false;
  }

  let newContent = content;
  let added = false;

  for (const component of components) {
    const componentName = typeof component === "string" ? component : component.name;
    const componentPath = typeof component === "string" ? component : component.path;
    const importPath = component.path || component;

    if (!content.includes(`export { ${componentName} }`)) {
      const exportStatement = `export { ${componentName} } from '${importPath}';\n`;

      if (dryRun) {
        log(`Would add export: ${componentName}`);
      } else {
        newContent += exportStatement;
        log(`Added export: ${componentName}`);
        added = true;
      }
    }
  }

  if (added && !dryRun) {
    fs.writeFileSync(filePath, newContent);
  }

  return added;
}

async function run() {
  console.log("========================================");
  console.log("    Barrel Exports Update Script        ");
  console.log("========================================");
  console.log(`Mode: ${dryRun ? "DRY-RUN" : "LIVE"}`);
  console.log("========================================");

  const renameMap = readRenameMap();

  if (!renameMap) {
    log("No rename-map.json found, exiting", "error");
    process.exit(1);
  }

  const indexFiles = findIndexFiles();

  console.log(`Found ${indexFiles.length} barrel files`);

  let filesUpdated = 0;
  let filesAddedExports = 0;

  for (const filePath of indexFiles) {
    const updated = updateBarrelFile(filePath, renameMap);
    const added = addMissingExports(filePath, renameMap);

    if (updated) filesUpdated++;
    if (added) filesAddedExports++;
  }

  console.log("========================================");
  console.log("    Barrel Exports Update Complete     ");
  console.log("========================================");
  console.log(`Files with updated exports: ${filesUpdated}`);
  console.log(`Files with added exports: ${filesAddedExports}`);

  if (dryRun) {
    console.log("Run without --dry-run to apply changes");
  }
}

run().catch((error) => {
  log(`Script failed: ${error.message}`, "error");
  process.exit(1);
});
