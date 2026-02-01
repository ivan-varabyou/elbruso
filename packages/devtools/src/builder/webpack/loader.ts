import { transformCode } from "../../ui/lib/utils.js";

interface LoaderContext {
  resourcePath: string;
}

export default function loader(this: LoaderContext, source: string): string {
  const filePath = this.resourcePath;
  const isDevMode = process.env.NODE_ENV === "development";

  if (!isDevMode) return source;

  try {
    return transformCode(source, filePath);
  } catch (error) {
    console.error("devtools webpack loader error:", error);
    return source;
  }
}
