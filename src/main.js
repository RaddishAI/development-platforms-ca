import "./styles/main.css";
import { startRouter } from "./router/router.js";
import { initAuth } from "./lib/auth.js";

console.log("main.js loaded");

await initAuth();
startRouter();
