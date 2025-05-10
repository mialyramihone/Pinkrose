document.getElementById('minimize-btn').addEventListener('click', () => {
    window.electronAPI.minimize()
  })
  
  document.getElementById('close-btn').addEventListener('click', () => {
    window.electronAPI.close()
  })
  
  document.getElementById('add-music').addEventListener('click', async () => {
    const files = await window.electronAPI.selectFiles()
    // Traiter les fichiers sélectionnés
  })