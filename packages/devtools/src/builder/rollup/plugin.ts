import { transformCode } from "../../ui/lib/utils.js";
import type { PluginOptions } from "../../ui/lib/types.js";

export function rollupPlugin(options: PluginOptions = {}): {
  name: string;
  transform(code: string, id: string): { code: string } | undefined;
} {
  return {
    name: "devtools",
    transform(code, id) {
      if (!options.enabled && options.enabled !== undefined) return undefined;
      if (!id.match(/\.(tsx|jsx)$/)) return undefined;
      if (id.includes("node_modules")) return undefined;

      try {
        const result = transformCode(code, id);
        return { code: result };
      } catch (error) {
        console.error("devtools rollup plugin error:", error);
        return undefined;
      }
    },
  };
}
