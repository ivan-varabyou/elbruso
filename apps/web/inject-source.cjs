function getRelativePath(absolutePath) {
  const gitRoot = "/home/ivan/git/elbruso/";
  if (absolutePath.startsWith(gitRoot)) {
    return absolutePath.slice(gitRoot.length);
  }
  return absolutePath;
}

function injectSourcePlugin(babel) {
  const t = babel.types;
  return {
    visitor: {
      JSXOpeningElement(path, state) {
        const filePath = state.filename || state.file?.opts?.filename;
        if (!filePath) return;

        const lineNumber = path.node.loc?.start.line;
        if (!lineNumber) return;

        const getName = (node) => {
          if (node.type === "JSXIdentifier") return node.name;
          if (node.type === "JSXMemberExpression") {
            return getName(node.object) + "." + getName(node.property);
          }
          return "";
        };

        const name = getName(path.node.name);
        if (!name) return;

        const relativePath = getRelativePath(filePath);
        const sourceInfo = {
          fileName: relativePath,
          lineNumber: lineNumber,
        };
        const sourceValue = encodeURIComponent(JSON.stringify(sourceInfo));

        const injectAttr = (attrName, val) => {
          const attrs = path.node.attributes || [];
          if (!attrs.some(a => a.type === "JSXAttribute" && a.name.name === attrName)) {
            path.node.attributes.push(
              t.jsxAttribute(t.jsxIdentifier(attrName), t.stringLiteral(val))
            );
          }
        };

        const isComponent = /^[A-Z]/.test(name) || name.includes(".");
        if (isComponent) {
          injectAttr("data-call-path", `${relativePath}:${lineNumber}`);
        }
        injectAttr("data-path", `${relativePath}:${lineNumber}`);
        injectAttr("data-source", sourceValue);
      },
    },
  };
}

module.exports = injectSourcePlugin;
