import { app, BrowserWindow, ipcMain } from 'electron'
import * as nodeDiskInfo from 'node-disk-info';
import * as path from 'path';
import { CommunicationService } from './services/communication.service';

app.whenReady().then(() => {
  const win = new BrowserWindow({
    title: 'Main window',
    width: 1280,
    height: 720,
    backgroundColor: '#222220', // TODO: Make this dependent on System theme.,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

   ipcMain.on('request', (event, ...args) => {
      try {
        const communicationService = new CommunicationService();
        communicationService.receiveMessage(event, args);
      } catch (error) {
        console.error('Error handling request:', error);
        event.sender.send('response', { error: error.message });
      }

   });

  // You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    // Load your file
    win.loadFile('dist/index.html');
  }
});
