class InjectSourcePlugin {
  constructor() {
    this.name = "InjectSourcePlugin";
  }

  apply(compiler) {
    console.log("[InjectSourcePlugin] Plugin registered");

    compiler.hooks.thisCompilation.tap("InjectSourcePlugin", (compilation) => {
      console.log("[InjectSourcePlugin] Compilation started");

      compilation.hooks.processAssets.tap(
        {
          name: "InjectSourcePlugin",
          stage: compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_INLINE,
        },
        (assets) => {
          console.log("[InjectSourcePlugin] Processing assets, count:", Object.keys(assets).length);

          for (const [filename, asset] of Object.entries(assets)) {
            if (
              filename.includes(".js") &&
              !filename.includes("node_modules") &&
              !filename.includes("_next/static/media")
            ) {
              const source = asset.source();
              if (typeof source === "string" && source.includes("React.createElement")) {
                console.log("[InjectSourcePlugin] Processing:", filename);

                const gitRoot = "/home/ivan/git/elbruso/";
                const relativePath = filename.startsWith(gitRoot)
                  ? filename.slice(gitRoot.length)
                  : filename;

                let result = source;
                let count = 0;

                result = result.replace(
                  /React\.createElement\s*\(\s*([A-Z][a-zA-Z0-9_]*)/g,
                  (match, componentName) => {
                    count++;
                    const sourceInfo = {
                      fileName: relativePath,
                      lineNumber: 0,
                    };
                    return `React.createElement(${componentName}, { "data-source": "${encodeURIComponent(JSON.stringify(sourceInfo))}" }`;
                  },
                );

                if (count > 0) {
                  console.log(
                    "[InjectSourcePlugin] Added data-source to",
                    count,
                    "elements in",
                    filename,
                  );
                  // Create a new source instead of using updateSource
                  const { RawSource } = compiler.webpack.sources || require("webpack-sources");
                  if (RawSource) {
                    asset.updateSource(result);
                  } else {
                    // Fallback for older webpack versions
                    Object.assign(asset, {
                      source: () => result,
                      updateSource: (newSource) => {
                        Object.assign(asset, { source: () => newSource });
                      },
                    });
                  }
                }
              }
            }
          }
        },
      );
    });
  }
}

module.exports = InjectSourcePlugin;
