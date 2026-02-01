export function getRelativePath(absolutePath: string): string {
  const gitElbruso = "/home/ivan/git/elbruso/";
  if (absolutePath.startsWith(gitElbruso)) {
    return absolutePath.slice(gitElbruso.length);
  }
  return absolutePath;
}

export function getLineNumber(sourceCode: string, byteOffset: number): number {
  if (!sourceCode) return 1;
  let line = 1;
  for (let i = 0; i < byteOffset && i < sourceCode.length; i++) {
    if (sourceCode[i] === "\n") {
      line++;
    }
  }
  return line;
}

export function transformCode(code: string, filePath: string): string {
  const isDevMode = process.env.NODE_ENV === "development";
  if (!isDevMode) return code;

  const lineByLine = code.split("\n");
  const result: string[] = [];
  let lineNumber = 0;
  let callLine: number | null = null;
  let callFile = "";

  for (let i = 0; i < lineByLine.length; i++) {
    const line = lineByLine[i];
    lineNumber = i + 1;

    const jsxMatch = line.match(/^\s*<[A-Z][a-zA-Z0-9_]*[^>]*>/);
    if (jsxMatch && !line.includes("data-path")) {
      const pathObject = {
        file: filePath.replace("/home/ivan/git/elbruso/", ""),
        fileLine: lineNumber,
        callFile: callFile || null,
        callFileLine: callLine || null,
      };
      const dataPathAttr = ` data-path='${JSON.stringify(pathObject)}'`;
      const closingBracket = line.lastIndexOf(">");
      if (closingBracket !== -1) {
        result.push(line.slice(0, closingBracket) + dataPathAttr + line.slice(closingBracket));
      } else {
        result.push(line + dataPathAttr);
      }
    } else {
      result.push(line);
    }

    if (line.includes("<")) {
      const openTags = (line.match(/</g) || []).length;
      const closeTags = (line.match(/\/>/g) || []).length;
      if (openTags > closeTags) {
        callLine = lineNumber;
        callFile = filePath.replace("/home/ivan/git/elbruso/", "");
      }
    }
  }

  return result.join("\n");
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}
