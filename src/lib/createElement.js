// import { addEvent } from "./eventManager";

export function createElement(vNode) {
  console.log(vNode);

  if (vNode == null || typeof vNode === "boolean") {
    return document.createTextNode("");
  }

  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(vNode);
  }

  if (Array.isArray(vNode)) {
    const docFrag = document.createDocumentFragment();
    docFrag.append(...vNode.map(createElement));
    return docFrag;
  }

  const el = document.createElement(vNode.type);
  vNode.children.map(createElement).forEach((child) => el.appendChild(child));

  updateAttributes(el, vNode.props);
  return el;
}

function updateAttributes($el, props) {
  Object.entries(props || {}).map(([attr, value]) => {
    if (attr === "className") {
      $el.setAttribute("class", value);
    } else {
      $el.setAttribute(attr, value);
    }
  });
}
