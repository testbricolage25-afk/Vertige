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

  // ========== ÉCRAN 1 : CHOIX DU MODE ==========
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
          <p>Longue exploration. Plusieurs vagues, surprises et profondeur.</p>
        </div>
      </div>
    `;

    document.querySelectorAll('.mode-card').forEach(card => {
      card.addEventListener('click', () => {
        this.state.mode = card.dataset.mode;
        this.showNames();
      });
    });
  },

  // ========== ÉCRAN 2 : PRÉNOMS ==========
  showNames() {
    this.clear();

    this.app.innerHTML = `
      <div class="header">
        <h1>Vertige</h1>
        <p>Comment vous appeler ce soir ?</p>
      </div>

      <div class="form-container">
        <div class="input-group">
          <label>Monsieur</label>
          <input type="text" id="name-monsieur" placeholder="Son prénom" autocomplete="off">
        </div>

        <div class="input-group">
          <label>Madame</label>
          <input type="text" id="name-madame" placeholder="Son prénom" autocomplete="off">
        </div>

        <button class="btn btn-primary" id="btn-names" style="margin-top:
