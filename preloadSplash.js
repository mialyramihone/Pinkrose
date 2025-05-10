const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    requestOpenPlayer: () => ipcRenderer.send('request-open-player')
})