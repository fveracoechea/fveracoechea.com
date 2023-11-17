"use strict";
(() => {
  // client/jsx/transform.ts
  var entityMap = {
    "&": "amp",
    "<": "lt",
    ">": "gt",
    '"': "quot",
    "'": "#39",
    "/": "#x2F"
  };
  function escapeHtml(str) {
    return String(str).replace(/[&<>"'\/\\]/g, (s) => `&${entityMap[s]};`);
  }
  function renderChild(node, child) {
    if (typeof child === "string" || typeof child === "boolean" || typeof child === "number") {
      node.appendChild(document.createTextNode(escapeHtml(String(child))));
    } else if (child instanceof HTMLElement || child instanceof DocumentFragment) {
      node.appendChild(child);
    }
  }
  function createElement(tag, props = {}) {
    if (typeof tag === "function") {
      return tag(props);
    }
    const node = typeof tag === "symbol" && tag === Fragment ? document.createDocumentFragment() : document.createElement(tag);
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
  var Fragment = Symbol("DocumentFragment");

  // client/components/testing.tsx
  var text = "Button text";
  var buttonProps = {
    title: "title",
    class: "color-red",
    id: "btn-id"
  };
  function MyComponent() {
    return /* @__PURE__ */ createElement("div", { id: "component", class: "p-12", children: [
      /* @__PURE__ */ createElement("nav", { children: "TESTING" }),
      /* @__PURE__ */ createElement("div", { children: /* @__PURE__ */ createElement("button", { ...buttonProps, children: text }) }),
      /* @__PURE__ */ createElement("section", { class: "section", children: "SECTION" }),
      /* @__PURE__ */ createElement("section", { class: "section", children: "2" }),
      /* @__PURE__ */ createElement("section", { class: "number", children: 4 }),
      /* @__PURE__ */ createElement("section", { class: "func", children: () => {
      } }),
      /* @__PURE__ */ createElement("section", { class: "array text-xl", children: [1, 2, 3, 4] }),
      /* @__PURE__ */ createElement("div", { class: "childless" })
    ] });
  }
  console.log(/* @__PURE__ */ createElement(MyComponent, {}));
  document.body.appendChild(MyComponent());
})();
