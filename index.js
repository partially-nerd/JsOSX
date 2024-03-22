const { app, BrowserWindow, remote } = require('electron');
const path = require('node:path');

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    frame: 0,
    // transparent: 1,
    // vibrancy: 'fullscreen-ui',
    // backgroundMaterial: 'acrylic',
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      webviewTag: true,
    }
  })
  mainWindow.loadURL('http://127.0.0.1:3000/root.jsx').then(() => {
    mainWindow.webContents.send('argv', {argv: process.argv});
  });
    mainWindow.setFullScreen(true);
  //   mainWindow.webContents.openDevTools();
}
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
})