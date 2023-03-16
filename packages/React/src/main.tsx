import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { io } from "socket.io-client";

export const socket = io("http://localhost:3001");

socket.on("connect", () => {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <App />
  );
});
