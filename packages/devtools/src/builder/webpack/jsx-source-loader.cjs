const path = require("path");

function getRelativePath(absolutePath) {
  const gitRoot = "/home/ivan/git/elbruso/";
  if (absolutePath.startsWith(gitRoot)) {
    return absolutePath.slice(gitRoot.length);
  }
  return absolutePath;
}

module.exports = function jsxSourceLoader(source) {
  const callback = this.async();
  const resourcePath = this.resourcePath;

  if (!resourcePath.endsWith(".tsx") && !resourcePath.endsWith(".jsx")) {
    return callback(null, source);
  }

  try {
    const lines = source.split("\n");
    const result = [];
    let count = 0;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      const lineNumber = i + 1;

      // Проверяем что это JSX элемент
      const selfClosing = line.match(/^\s*<([A-Z][a-zA-Z0-9_]+)[^>]*\/>\s*$/);
      const openingTag = line.match(/^\s*<([A-Z][a-zA-Z0-9_]+)[^>]*>\s*$/);

      if (selfClosing && !line.includes("data-source")) {
        const componentName = selfClosing[1];
        const sourceInfo = {
          fileName: getRelativePath(resourcePath),
          lineNumber: lineNumber,
        };

        const sourceAttr = ` data-source="${encodeURIComponent(JSON.stringify(sourceInfo))}"`;
        line = line.trimEnd().slice(0, -2) + sourceAttr + " />";
        count++;
      }

      result.push(line);
    }

    if (count > 0) {
      console.log(
        "[jsx-loader] Added data-source to",
        count,
        "elements in",
        path.basename(resourcePath),
      );
    }

    callback(null, result.join("\n"));
  } catch (error) {
    callback(null, source);
  }
};
