import { renderHome } from "../pages/home.js";

const routes = {
  "/": renderHome,
};

function getPath() {
  const hash = window.location.hash || "#/";
  return hash.slice(1);
}

export function startRouter() {
  function render() {
    const path = getPath();
    const page = routes[path] || routes["/"];
    page();
  }

  window.addEventListener("hashchange", render);
  render();
}
