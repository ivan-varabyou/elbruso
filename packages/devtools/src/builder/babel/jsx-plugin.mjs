export default function injectSourcePlugin() {
  return {
    visitor: {
      JSXOpeningElement(path, state) {
        try {
          const filename = state.filename;
          if (!filename) return;

          const line = path.node.loc?.start.line;
          if (!line) return;

          const name = path.node.name?.name;
          if (!name) return;

          const relPath = filename.startsWith(gitRoot) ? filename.slice(gitRoot.length) : filename;
          const sourceInfo = { fileName: relPath, lineNumber: line };
          const sourceValue = JSON.stringify(sourceInfo);

          const injectAttr = (attrName, val) => {
            const attrs = path.node.attributes || [];
            if (!attrs.some(a => a.type === "JSXAttribute" && a.name.name === attrName)) {
              path.node.attributes.push(
                state.types.jsxAttribute(state.types.jsxIdentifier(attrName), state.types.stringLiteral(val))
              );
            }
          };

          const isComponent = /^[A-Z]/.test(name) || name.includes(".");
          if (isComponent) {
            injectAttr("data-call-path", `${relPath}:${line}`);
          }
          injectAttr("data-path", `${relPath}:${line}`);
          injectAttr("data-source", sourceValue);
        } catch (e) {
          // Silent fail - don't break compilation
        }
      },
    },
  };
}
