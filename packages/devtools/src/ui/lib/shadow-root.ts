export function createShadowRoot(host: HTMLElement): ShadowRoot {
  return host.attachShadow({ mode: "open" });
}

export function injectStyles(shadow: ShadowRoot): void {
  const style = document.createElement("style");
  style.textContent = `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    .devtools-host { all: initial; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    .devtools-host * { font-family: inherit; }
    .devtools-trigger {
      position: fixed; bottom: 20px; right: 20px; width: 40px; height: 40px;
      background: #1a1a1a; border: 1px solid #333; border-radius: 8px;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      color: #fff; font-size: 18px; z-index: 1000000; transition: transform 0.2s, background 0.2s;
    }
    .devtools-trigger:hover { background: #333; transform: scale(1.1); }
    .devtools-console {
      position: fixed; bottom: 80px; right: 20px; width: 350px; max-height: 400px;
      background: #1a1a1a; border: 1px solid #333; border-radius: 8px;
      display: flex; flex-direction: column; overflow: hidden; z-index: 1000000;
    }
    .devtools-console-header {
      padding: 10px 12px; background: #252525; border-bottom: 1px solid #333;
      display: flex; justify-content: space-between; align-items: center;
    }
    .devtools-console-title { color: #fff; font-weight: 600; }
    .devtools-console-close {
      background: none; border: none; color: #888; cursor: pointer; font-size: 16px;
    }
    .devtools-console-close:hover { color: #fff; }
    .devtools-console-body { flex: 1; overflow-y: auto; padding: 8px; max-height: 340px; }
    .devtools-log-item {
      padding: 8px 10px; margin-bottom: 4px; background: #252525; border-radius: 4px;
      color: #ddd; border-left: 3px solid transparent;
    }
    .devtools-log-item.info { border-left-color: #0066ff; }
    .devtools-log-item.action { border-left-color: #00cc66; }
    .devtools-log-item.error { border-left-color: #ff4444; }
    .devtools-log-time { color: #666; font-size: 10px; margin-bottom: 4px; }
  `;
  shadow.appendChild(style);
}
