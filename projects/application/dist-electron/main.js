"use strict";
const electron = require("electron");
const path = require("path");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const path__namespace = /* @__PURE__ */ _interopNamespaceDefault(path);
class CommunicationService {
  constructor() {
    this.registeredControllers = [];
  }
  registerController(controller) {
    this.registeredControllers.push(controller);
  }
  async receiveMessage(event, args) {
    const [message] = args;
    for (const controller of this.registeredControllers) {
      if (message.path.startsWith(controller.path)) {
        await controller.handleMessage(event, message);
      }
    }
  }
}
electron.app.whenReady().then(() => {
  const win = new electron.BrowserWindow({
    title: "Main window",
    width: 1280,
    height: 720,
    backgroundColor: "#222220",
    // TODO: Make this dependent on System theme.,
    webPreferences: {
      preload: path__namespace.join(__dirname, "preload.js")
    }
  });
  electron.ipcMain.on("request", (event, ...args) => {
    try {
      const communicationService = new CommunicationService();
      communicationService.receiveMessage(event, args);
    } catch (error) {
      console.error("Error handling request:", error);
      event.sender.send("response", { error: error.message });
    }
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile("dist/index.html");
  }
});
