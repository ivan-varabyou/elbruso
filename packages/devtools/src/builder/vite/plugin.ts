import { transformCode } from "../../ui/lib/utils.js";
import type { PluginOptions } from "../../ui/lib/types.js";
import type { Plugin } from "vite";

interface VitePluginOptions extends PluginOptions {
  enabled?: boolean;
}

export function vitePlugin(options: VitePluginOptions = {}): Plugin {
  return {
    name: "devtools",
    enforce: "pre",
    transform(code, id) {
      if (!options.enabled && options.enabled !== undefined) return undefined;
      if (!id.match(/\.(tsx|jsx)$/)) return undefined;
      if (id.includes("node_modules")) return undefined;

      try {
        const result = transformCode(code, id);
        return { code: result };
      } catch (error) {
        console.error("devtools vite plugin error:", error);
        return undefined;
      }
    },
  };
}
