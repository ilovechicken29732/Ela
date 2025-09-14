document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-btn');
  const panels = {
    games: document.getElementById('games-panel'),
    about: document.getElementById('about-panel'),
    settings: document.getElementById('settings-panel')
  };

  const gameListEl = document.getElementById('game-list');
  const placeholder = document.getElementById('placeholder');
  const fullscreenWrapper = document.getElementById('fullscreen-wrapper');
  const gameIframe = fullscreenWrapper.querySelector('iframe');
  const exitBtn = document.getElementById('exit-btn');
  const playModeSelect = document.getElementById('play-mode');

  // Example game list - replace with your local game files
  const games = [
    { title: 'Classic Shooter', src: 'games/shooter/index.html' },
    { title: 'Puzzle Grid', src: 'games/puzzle/index.html' },
    { title: 'Adventure Quest', src: 'games/adventure/index.html' }
  ];

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', false);
        panels[t.dataset.tab].hidden = true;
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', true);
      panels[tab.dataset.tab].hidden = false;
    });
  });

  // Populate game list buttons
  games.forEach(game => {
    const btn = document.createElement('button');
    btn.textContent = game.title;
    btn.setAttribute('type', 'button');
    btn.addEventListener('click', () => playGame(game.src));
    gameListEl.appendChild(btn);
  });

  // Play game according to selected play mode
  function playGame(src) {
    const mode = playModeSelect.value;
    if (mode === 'embed') {
      placeholder.style.display = 'none';
      fullscreenWrapper.hidden = false;
      gameIframe.src = src;
    } else if (mode === 'newtab') {
      window.open(src, '_blank');
    } else if (mode === 'blank') {
      const newWin = window.open('about:blank');
      if (!newWin) {
        alert("Please allow pop-ups for this website.");
        return;
      }
      newWin.document.write(`
        <style>html,body{margin:0;overflow:hidden;height:100%;}iframe{border:none;width:100vw; height:100vh;}</style>
        <iframe src="${src}" sandbox="allow-scripts allow-same-origin" allowfullscreen></iframe>
      `);
      newWin.document.close();
    }
  }

  // Exit embedded game fullscreen
  exitBtn.addEventListener('click', () => {
    fullscreenWrapper.hidden = true;
    placeholder.style.display = 'block';
    gameIframe.src = '';
  });
});
