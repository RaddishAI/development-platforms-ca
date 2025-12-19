import { renderHome } from "../pages/home.js";
import { renderRegister } from "../pages/register.js";
import { renderLogin } from "../pages/login.js";
import { renderCreate } from "../pages/create.js";

const routes = {
  "/": renderHome,
  "/register": renderRegister,
  "/login": renderLogin,
  "/create": renderCreate,
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
