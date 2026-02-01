export function getPathData(
  element: HTMLElement,
): { file: string; fileLine: number; callFile: string | null; callFileLine: number | null } | null {
  const dataPath = element.getAttribute("data-path");
  if (!dataPath) return null;
  try {
    return JSON.parse(dataPath);
  } catch {
    return null;
  }
}

export function getElementPath(element: HTMLElement): string {
  const path: string[] = [];
  let current: HTMLElement | null = element;

  while (current && current !== document.body) {
    let selector = current.tagName.toLowerCase();

    if (current.id) {
      selector += `#${current.id}`;
    } else if (current.className && typeof current.className === "string") {
      const classes = current.className.trim().split(/\s+/).slice(0, 2).join(".");
      if (classes) selector += `.${classes}`;
    }

    path.unshift(selector);
    current = current.parentElement;
  }

  return path.join(" > ");
}

export function getElementText(element: HTMLElement): string {
  return element.textContent?.trim().substring(0, 50) || "";
}

export function isDebugElement(element: HTMLElement): boolean {
  return (
    element.classList.contains("devtools-console") ||
    element.classList.contains("devtools-trigger") ||
    element.closest(".devtools-console") !== null ||
    element.closest(".devtools-trigger") !== null
  );
}
