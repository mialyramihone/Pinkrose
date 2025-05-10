// Gestion des contrôles de fenêtre Electron
if (typeof require !== 'undefined') {
    const { ipcRenderer } = require('electron');
    
    document.getElementById('minimize-btn')?.addEventListener('click', () => {
      ipcRenderer.send('window:minimize');
    });
    
    document.getElementById('close-btn')?.addEventListener('click', () => {
      ipcRenderer.send('window:close');
    });
  }
  
  // Navigation entre les interfaces
  function navigateTo(page) {
    if (typeof require !== 'undefined') {
      const { ipcRenderer } = require('electron');
      ipcRenderer.send('navigate-to', page);
    } else {
      window.location.href = `${page}.html`;
    }
  }