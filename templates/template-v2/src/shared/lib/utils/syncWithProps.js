export function syncPropsWithJson(json) {
  console.log("[sync] incoming json:", json);
  const widgets = extractWidgets(json);
  console.log("[sync] extracted widgets:", widgets);

  for (const widget of widgets) {
    const id = widget?.props?.id;
    if (!id) {
      console.warn("[sync] skipped widget without id", widget);
      continue;
    }

    const root = document.querySelector(`[data-widget-id="${id}"]`);
    if (!root) {
      console.warn("[sync] root not found for id:", id);
      continue;
    }

    const nodes = root.querySelectorAll("[data-prop]");

    if (nodes.length === 0) {
      console.warn("[sync] no updatable nodes in", root);
    }

    nodes.forEach((node) => updateNodeText(node, widget.props));
  }
}

function updateNodeText(node, props) {
  const propPath = node.getAttribute("data-prop");
  if (!propPath) return;

  const value = getValueByPath(props, propPath);

  if (value === undefined) {
    console.warn("[sync] value not found for path", propPath);
    return;
  }

  console.log("[sync] updating prop", { node, propPath, value });

  if (node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement) {
    node.value = String(value);
  } else {
    node.textContent = String(value);
  }
}

function getValueByPath(obj, path) {
  return path?.split(".").reduce((acc, key) => {
    if (!acc) return undefined;

    const parsedKey = !isNaN(Number(key)) ? Number(key) : key;
    return acc[parsedKey];
  }, obj);
}

function extractWidgets(json) {
  const globalWidgets = json.global?.props?.widgets ?? [];
  const pageWidgets = json.pages?.flatMap((p) => p.widgets ?? []) ?? [];
  return [...globalWidgets, ...pageWidgets];
}
