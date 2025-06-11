import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { IpcRequestDto } from '../shared/comms/ipc-request-dto';
type IpcEventListener = (event: IpcRendererEvent, ...args: any[]) => void;

contextBridge.exposeInMainWorld('ipcChannel', {
  sendMessage: (message: IpcRequestDto<unknown>) => ipcRenderer.send('request', message),
  onMessage: (callback: IpcEventListener) => ipcRenderer.on('response', (event, ...args) => callback(event, ...args)),
});