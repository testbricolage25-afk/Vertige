// Vertige - Gestion de l'interface

const UI = {
  app: null,

  init() {
    this.app = document.getElementById('app');
    this.showHome();
  },

  clear() {
    this.app.innerHTML = '';
  },

  showHome() {
    this.clear();

    const title = document.createElement('h1');
    title.textContent = 'Vertige';

    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = 'Réponds ou cède';

    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'Commencer';
    btn.addEventListener('click', () => {
      // Plus tard on lancera le jeu ici
      alert('Bientôt...');
    });

    this.app.appendChild(title);
    this.app.appendChild(subtitle);
    this.app.appendChild(btn);
  }
};
