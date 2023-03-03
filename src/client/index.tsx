import { createRoot } from "react-dom/client";
import { createElement } from "react";
import { App } from "./components/App";

const div = document.createElement("div");

document.body.appendChild(div);

createRoot(div).render(createElement(App));
