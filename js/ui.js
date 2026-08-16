// ============================================================
// VERTIGE — Interface
// ============================================================

const UI = {
  app: null,
  state: {
    mode: null,
    names: { monsieur: '', madame: '' },
    props: [],
    acts: [],
    clothes: { monsieur: [], madame: [] }
  },

  availableProps: [
    'Chantilly', 'Menottes', 'Ceinture', 'Cache-œil', 'Glaçon',
    'Huile de massage', 'Lubrifiant', 'Eau', 'Vibromasseur'
  ],

  availableActs: [
    'Sexe oral vaginal',
    'Sexe oral anal',
    'Pénétration vaginale',
    'Pénétration anale',
    'Doigts vaginaux',
    'Doigts anaux',
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
    window.scrollTo(0, 0);
  },

  // ========== 1. RYTHME ==========
  showModeSelection() {
    this.clear();
    this.app.innerHTML = `
      <div class="header">
        <h1>Vertige</h1>
        <p>Choisissez jusqu’où vous irez</p>
      </div>

      <div class="modes">
        <div class="mode-card" data-mode="rapide">
          <h2>Rapide</h2>
          <div class="duration">≈ 20 – 30 minutes</div>
          <p>Peu de questions. La pression monte vite. On ne traîne pas.</p>
        </div>

        <div class="mode-card" data-mode="pose">
          <h2>Posé</h2>
          <div class="duration">≈ 45 – 70 minutes</div>
          <p>On prend le temps. Chaque réponse compte. La chaleur s’installe.</p>
        </div>

        <div class="mode-card" data-mode="marathon">
          <h2>Marathon</h2>
          <div class="duration">≈ 1h30 et plus</div>
          <p>Longue descente. Plusieurs vagues. On ne revient pas indemne.</p>
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
        <p>Vos prénoms pour ce soir</p>
      </div>

      <div class="form-container">
        <div class="input-group">
          <label>Monsieur</label>
          <input type="text" id="name-monsieur" placeholder="Son prénom" autocomplete="off" autocapitalize="words">
        </div>

        <div class="input-group">
          <label>Madame</label>
          <input type="text" id="name-madame" placeholder="Son prénom" autocomplete="off" autocapitalize="words">
        </div>

        <button class="btn btn-primary mt" id="btn-names">Continuer</button>
      </div>
    `;

    document.getElementById('btn-names').addEventListener('click', () => {
      const m = document.getElementById('name-monsieur').value.trim();
      const f = document.getElementById('name-madame').value.trim();
      if (!m || !f) {
        alert('Les deux prénoms sont nécessaires.');
        return;
      }
      this.state.names.monsieur = m;
      this.state.names.madame = f;
      this.showProps();
    });
  },

  // ========== 3. ACCESSOIRES ==========
  showProps() {
    this.clear();
    const html = this.availableProps.map(p => `
      <label class="check-item">
        <input type="checkbox" value="${p}">
        <span>${p}</span>
      </label>
    `).join('');

    this.app.innerHTML = `
      <div class="header">
        <h1>Vertige</h1>
        <p>Ce que vous avez à disposition</p>
        <span class="small">Cochez uniquement ce qui est réellement à portée de main.</span>
      </div>

      <div class="check-list">${html}</div>
      <button class="btn btn-primary" id="btn-props">Continuer</button>
    `;

    document.getElementById('btn-props').addEventListener('click', () => {
      this.state.props = [...document.querySelectorAll('.check-list input:checked')].map(i => i.value);
      this.showActs();
    });
  },

  // ========== 4. ACTES ==========
  showActs() {
    this.clear();
    const html = this.availableActs.map(a => `
      <label class="check-item">
        <input type="checkbox" value="${a}" checked>
        <span>${a}</span>
      </label>
    `).join('');

    this.app.innerHTML = `
      <div class="header">
        <h1>Vertige</h1>
        <p>Ce qui est autorisé ce soir</p>
        <span class="small">Tout est coché. Retirez seulement ce que vous refusez clairement.</span>
      </div>

      <div class="check-list">${html}</div>
      <button class="btn btn-primary" id="btn-acts">Continuer</button>
    `;

    document.getElementById('btn-acts').addEventListener('click', () => {
      this.state.acts = [...document.querySelectorAll('.check-list input:checked')].map(i => i.value);
      this.showClothes();
    });
  },

  // ========== 5. TENUES ==========
  showClothes() {
    this.clear();

    const makeList = (list) => list.map(item => `
      <label class="check-item small">
        <input type="checkbox" value="${item}">
        <span>${item}</span>
      </label>
    `).join('');

    this.app.innerHTML = `
      <div class="header">
        <h1>Vertige</h1>
        <p>Votre tenue actuelle</p>
        <span class="small">Le jeu s’en servira. Soyez précis.</span>
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

      <button class="btn btn-primary" id="btn-clothes">Continuer</button>
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
        <p>Le seuil</p>
      </div>

      <div class="promise">
        <p>
          ${this.state.names.monsieur} et ${this.state.names.madame}.
        </p>
        <p>
          Ce soir, vous ne jouez pas.<br>
          Vous vous abandonnez.
        </p>
        <p>
          Vous avancez jusqu’au bout.<br>
          Vous ne trichez pas.<br>
          Vous n’interrompez pas.
        </p>
        <p>
          C’est <strong>Vertige</strong> qui décidera<br>
          quand vos corps auront assez tremblé.
        </p>
        <p class="signature">
          Vous vous donnez l’un à l’autre.<br>
          Et au jeu.
        </p>
      </div>

      <button class="btn btn-primary" id="btn-start">
        Nous franchissons le seuil
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
        <p>Le jeu commence</p>
      </div>
      <div class="promise">
        <p style="color: var(--text-soft); font-size: 1rem;">
          Mode : <strong>${this.state.mode}</strong><br><br>
          ${this.state.names.monsieur} & ${this.state.names.madame}<br><br>
          Tout est prêt.<br>
          Le moteur de jeu arrive.
        </p>
      </div>
    `;
    console.log('État du jeu :', this.state);
  }
};
