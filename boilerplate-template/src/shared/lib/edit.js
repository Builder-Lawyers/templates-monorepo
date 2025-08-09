import { syncPropsWithJson } from "@/shared/lib/utils/syncWithProps.js";

if (window.parent !== window) {
  console.log("[edit.js] Edit mode enabled");

  window.addEventListener("message", (event) => {
    console.log("[edit.js] Edit mode enabled");
    const { json, type } = event.data;

    const allowedOrigins = ["http://localhost:3000"];
    if (!allowedOrigins.includes(event.origin)) {
      console.warn("Blocked message from origin", event.origin);
      return;
    }

    if (type === "sync-json") {
      console.log("[edit.js] Received sync-json message");
      syncPropsWithJson(json);
    }
  });
}
