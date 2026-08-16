// Vertige - Interface

const UI = {
  app: null,
  state: {
    mode: null,
    names: { monsieur: '', madame: '' },
    props: [],
    acts: [],
    clothes: { monsieur: [], madame: [] }
  },

  init() {
    this.app = document.getElementById('app');
    this.showModeSelection();
  },

  clear() {
    this.app.innerHTML = '';
  },

  showModeSelection() {
    this.clear();

    this.app.innerHTML = `
      <div class="header">
        <h1>Vertige</h1>
        <p>Choisissez votre rythme</p>
      </div>

      <div class="modes">
        <div class="mode-card" data-mode="rapide">
          <h2>Rapide</h2>
          <div class="duration">≈ 20 à 30 minutes</div>
          <p>Montée rapide. Peu de questions, intensité qui grimpe vite.</p>
        </div>

        <div class="mode-card" data-mode="pose">
          <h2>Posé</h2>
          <div class="duration">≈ 45 à 70 minutes</div>
          <p>Progression sensuelle. On prend le temps de monter ensemble.</p>
        </div>

        <div class="mode-card" data-mode="marathon">
          <h2>Marathon</h2>
          <div class="duration">≈ 1h30 et plus</div>
          <p>Longue exploration. Plusieurs vagues, surprises et profondes.</p>
        </div>
      </div>
    `;

    // Écouteurs
    document.querySelectorAll('.mode-card').forEach(card => {
      card.addEventListener('click', () => {
        const mode = card.dataset.mode;
        this.state.mode = mode;
        // Pour l’instant on affiche juste une confirmation
        alert(`Mode choisi : ${mode}\n(Prochaine étape bientôt)`);
        // Plus tard → this.showNames();
      });
    });
  }
};
