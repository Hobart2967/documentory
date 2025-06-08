"use strict";
const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("ipcChannel", {
  sendMessage: (message) => ipcRenderer.send("request", message)
});
