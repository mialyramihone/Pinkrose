// Éléments DOM
const audioPlayer = new Audio()
const playBtn = document.getElementById('play-btn')
const openFileBtn = document.getElementById('open-file-btn')
const progressBar = document.getElementById('progress-bar')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')
const titleEl = document.getElementById('song-title')

// Contrôles de fenêtre
document.getElementById('minimize-btn').addEventListener('click', () => {
  window.electronAPI.window.minimize()
})

document.getElementById('close-btn').addEventListener('click', () => {
  window.electronAPI.window.close()
})

openFileBtn.addEventListener('click', async () => {
  try {
    const filePath = await window.electronAPI.files.openAudio()
    if (!filePath) return

    audioPlayer.src = filePath
    titleEl.textContent = filePath.split('/').pop().replace(/\.[^/.]+$/, "") // Nom du fichier sans extension
    playBtn.textContent = '▶'
    
    // Met à jour la durée quand le fichier est chargé
    audioPlayer.addEventListener('loadedmetadata', () => {
      durationEl.textContent = formatTime(audioPlayer.duration)
    })
  } catch (err) {
    console.error('Erreur:', err)
  }
})

// Contrôle de lecture
playBtn.addEventListener('click', () => {
  if (audioPlayer.paused) {
    audioPlayer.play()
    playBtn.textContent = '⏸'
  } else {
    audioPlayer.pause()
    playBtn.textContent = '▶'
  }
})


audioPlayer.addEventListener('timeupdate', () => {
  progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100
  currentTimeEl.textContent = formatTime(audioPlayer.currentTime)
})

progressBar.addEventListener('input', () => {
  const seekTime = (progressBar.value / 100) * audioPlayer.duration
  audioPlayer.currentTime = seekTime
})


function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

audioPlayer.addEventListener('ended', () => {
  playBtn.textContent = '▶'
})

// ---------------------DEBUT ------------------ // 
// setTimeout(() => {
//     const splash = document.getElementById('splash-screen');
//     const app = document.getElementById('app-interface');
    
//     splash.style.opacity = '0';
//     splash.style.transition = 'opacity 0.5s ease-out';
    
//     splash.addEventListener('transitionend', () => {
//       splash.remove();
//       app.style.display = 'block';
//     });
//   }, 2000);