import "./styles.css";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "@/layout/App";

const root = createRoot(document.getElementById("root")!);
root.render(React.createElement(App));