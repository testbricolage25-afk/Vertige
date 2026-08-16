// Vertige - Gestion de l'interface

const UI = {
  init() {
    const app = document.getElementById('app');
    if (!app) {
      console.error('Élément #app introuvable');
      return;
    }

    app.innerHTML = `
      <h1>Vertige</h1>
      <p class="subtitle">Réponds ou cède</p>
      <button class="btn" id="start-btn">Commencer</button>
    `;

    const btn = document.getElementById('start-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        alert('Bientôt...');
      });
    }
  }
};
