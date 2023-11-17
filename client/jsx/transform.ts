const entityMap: Record<string, string> = {
  "&": "amp",
  "<": "lt",
  ">": "gt",
  '"': "quot",
  "'": "#39",
  "/": "#x2F",
};

function escapeHtml(str: object[] | string) {
  return String(str).replace(/[&<>"'\/\\]/g, (s) => `&${entityMap[s]};`);
}

function renderChild(node: HTMLElement | DocumentFragment, child: JSX.Child) {
  if (
    typeof child === "string" ||
    typeof child === "boolean" ||
    typeof child === "number"
  ) {
    node.appendChild(document.createTextNode(escapeHtml(String(child))));
  } else if (
    child instanceof HTMLElement ||
    child instanceof DocumentFragment
  ) {
    node.appendChild(child);
  }
}

export function createElement(
  tag: string | symbol | JSX.FunctionComponent,
  props: JSX.Props = {}
  // key?: string
) {
  if (typeof tag === "function") {
    return tag(props);
  }

  const node =
    typeof tag === "symbol" && tag === Fragment
      ? document.createDocumentFragment()
      : document.createElement(tag as string);

  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      const value = props[key];
      const attributeName = escapeHtml(key);

      if (key === "children" || node instanceof DocumentFragment) {
        continue;
      }

      if (typeof value === "string") {
        node.setAttribute(attributeName, value);
      } else {
        node.removeAttribute(attributeName);
      }
    }
  }

  if (props.children && Array.isArray(props.children)) {
    for (const child of props.children) {
      renderChild(node, child);
    }
  } else {
    renderChild(node, props.children);
  }

  return node;
}

export const Fragment = Symbol("DocumentFragment");

export const JSX = {
  createElement,
  Fragment,
};
