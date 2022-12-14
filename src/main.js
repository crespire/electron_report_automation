const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log('Added: ', name))
    .catch((error) => console.log('Error: ', error));
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// Listen for form submit
ipcMain.on('submitForm', (event, data) => {
  console.log('Got form event');
  console.log(event);
  console.log(data);
});

// TO-DO: Get JSON from Clockify API
// TO-DO: Generate PDF (ejs+puppeteer)
// TO-DO: Generate XLSX (SheetJS) Can I do this client side? Looks like SheetJS lets me.