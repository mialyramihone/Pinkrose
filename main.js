const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

let splashWindow;
let mainWindow;

function getIconPath() {
  const iconPath = process.platform === 'win32'
    ? path.join(__dirname, 'img', 'Logo-PinkRose-Player.ico')
    : path.join(__dirname, 'img', 'logo.png');

  if (!fs.existsSync(iconPath)) {
    console.error("Icône introuvable :", iconPath);
    return null;
  }
  return iconPath;
}

function createSplashWindow() {
  const iconPath = getIconPath();
  
  splashWindow = new BrowserWindow({
    width: 300,
    height: 420,
    frame: false,
    icon: iconPath,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  splashWindow.loadFile('splash.html');
  
  setTimeout(() => {
    splashWindow.close();
    createMainWindow();
  }, 4500);
}

function createMainWindow() {
  const iconPath = getIconPath();
  
  mainWindow = new BrowserWindow({
    width: 300,
    height: 420,
    frame: false,
    icon: iconPath,
    // backgroundColor: '#FFD1DC',
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.loadFile('player.html');
}

app.whenReady().then(() => {
  createSplashWindow();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});