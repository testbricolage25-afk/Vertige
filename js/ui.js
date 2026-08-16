// Vertige - Interface complète (setup)

const UI = {
  app: null,
  state: {
    mode: null,
    names: { monsieur: '', madame: '' },
    props: [],
    acts: [],
    clothes: { monsieur: [], madame: [] }
  },

  // Listes de référence
  availableProps: [
    'Chantilly', 'Menottes', 'Ceinture', 'Cache-œil', 'Glaçon',
    'Huile de massage', 'Lubrifiant', 'Eau', 'Vibromasseur'
  ],

  availableActs: [
    'Sexe oral vaginal', 'Sexe oral anal',
    'Pénétration vaginale', 'Pénétration anale',
    'Doigts vaginaux', 'Doigts anaux',
    'Avaler le sperme'
  ],

  clothesMonsieur: [
    'Caleçon', 'Maillot de bain', 'Short', 'Pantalon', 'T-shirt',
    'Chaussettes', 'Chaussures', 'Sweat', 'Veste / Gilet',
    'Bonnet', 'Gants', 'Écharpe', 'Lunettes'
  ],

  clothesMadame: [
    'Lingerie une pièce', 'Culotte / String', 'Soutien-gorge',
    'Maillot 2 pièces', 'Maillot 1 pièce', 'Jupe', 'Robe',
    'Short', 'Pantalon', 'T-shirt', 'Pull', 'Veste / Gilet',
    'Écharpe', 'Gants', 'Bonnet', 'Lunettes',
    'Cheveux attachés', 'Chaussettes', 'Chaussures', 'Collant'
  ],

  init() {
    this.app = document.getElementById('app');
    this.showModeSelection();
  },

  clear() {
    this.app.innerHTML = '';
  },

  // ========== 1. MODE ==========
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

  // ========== 2. PRÉNOMS ==========
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
        <button class="btn btn-primary full" id="btn-names">Continuer</button>
      </div>
    `;
    document.getElementById('btn-names').addEventListener('click', () => {
      const m = document.getElementById('name-monsieur').value.trim();
      const f = document.getElementById('name-madame').value.trim();
      if (!m || !f) return alert('Merci de renseigner les deux prénoms');
      this.state.names.monsieur = m;
      this.state.names.madame = f;
      this.showProps();
    });
  },

  // ========== 3. ACCESSOIRES ==========
  showProps() {
    this.clear();
    let html = this.availableProps.map(p => `
      <label class="check-item">
        <input type="checkbox" value="${p}">
        <span>${p}</span>
      </label>
    `).join('');

    this.app.innerHTML = `
      <div class="header">
        <h1>Vertige</h1>
        <p>Quels accessoires avez-vous sous la main ?</p>
      </div>
      <div class="check-list">${html}</div>
      <button class="btn btn-primary full" id="btn-props">Continuer</button>
    `;

    document.getElementById('btn-props').addEventListener('click', () => {
      this.state.props = [...document.querySelectorAll('.check-list input:checked')].map(i => i.value);
      this.showActs();
    });
  },

  // ========== 4. ACTES AUTORISÉS ==========
  showActs() {
    this.clear();
    let html = this.availableActs.map(a => `
      <label class="check-item">
        <input type="checkbox" value="${a}" checked>
        <span>${a}</span>
      </label>
    `).join('');

    this.app.innerHTML = `
      <div class="header">
        <h1>Vertige</h1>
        <p>Quels actes sont autorisés ce soir ?</p>
        <p class="small">Tout est coché par défaut. Décochez ce que vous ne souhaitez pas.</p>
      </div>
      <div class="check-list">${html}</div>
      <button class="btn btn-primary full" id="btn-acts">Continuer</button>
    `;

    document.getElementById('btn-acts').addEventListener('click', () => {
      this.state.acts = [...document.querySelectorAll('.check-list input:checked')].map(i => i.value);
      this.showClothes();
    });
  },

  // ========== 5. TENUES ==========
  showClothes() {
    this.clear();

    const makeList = (list, id) => list.map(item => `
      <label class="check-item small">
        <input type="checkbox" value="${item}">
        <span>${item}</span>
      </label>
    `).join('');

    this.app.innerHTML = `
      <div class="header">
        <h1>Vertige</h1>
        <p>Comment êtes-vous habillés en ce moment ?</p>
      </div>

      <div class="clothes-grid">
        <div>
          <h3>${this.state.names.monsieur}</h3>
          <div class="check-list" id="clothes-m">
            ${makeList(this.clothesMonsieur)}
          </div>
        </div>
        <div>
          <h3>${this.state.names.madame}</h3>
          <div class="check-list" id="clothes-f">
            ${makeList(this.clothesMadame)}
          </div>
        </div>
      </div>

      <button class="btn btn-primary full" id="btn-clothes">Continuer</button>
    `;

    document.getElementById('btn-clothes').addEventListener('click', () => {
      this.state.clothes.monsieur = [...document.querySelectorAll('#clothes-m input:checked')].map(i => i.value);
      this.state.clothes.madame = [...document.querySelectorAll('#clothes-f input:checked')].map(i => i.value);
      this.showPromise();
    });
  },

  // ========== 6. PROMESSE ==========
showPromise() {
    this.clear();
    this.app.innerHTML = `
      <div class="header">
        <h1>Vertige</h1>
        <p>Une dernière chose...</p>
      </div>

      <div class="promise">
        <p>
          ${this.state.names.monsieur} et ${this.state.names.madame},<br><br>
          Ce soir, vous vous engagez pleinement.<br><br>
          Vous jouez jusqu’au bout.<br>
          Vous ne trichez pas.<br>
          Vous n’arrêtez pas le jeu.<br><br>
          C’est <strong>Vertige</strong> qui décidera quand la partie est terminée.
        </p>

        <p class="signature">
          Vous vous abandonnez l’un à l’autre,<br>
          et au jeu.
        </p>
      </div>

      <button class="btn btn-primary full" id="btn-start">
        Nous nous engageons — Commencer
      </button>
    `;

    document.getElementById('btn-start').addEventListener('click', () => {
      this.startGame();
    });
  },

  // ========== LANCEMENT ==========
  startGame() {
    this.clear();
    this.app.innerHTML = `
      <div class="header">
        <h1>Vertige</h1>
        <p>Le jeu commence...</p>
      </div>
      <p style="text-align:center;color:var(--text-soft);margin-top:3rem;line-height:1.7;">
        Mode : <strong>${this.state.mode}</strong><br>
        ${this.state.names.monsieur} & ${this.state.names.madame}<br><br>
        (Prochaine étape : le vrai moteur de jeu)
      </p>
    `;
    console.log('État complet du jeu :', this.state);
  }
};
