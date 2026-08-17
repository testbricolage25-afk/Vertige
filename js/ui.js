// ============================================================
// VERTIGE — Interface + Moteur de jeu
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

  // État de la partie
  game: {
    heat: 0,               // 0 à 100
    fails: 0,
    questionsAsked: 0,
    currentPlayer: 'monsieur', // ou 'madame'
    timer: null,
    timeLeft: 0,
    currentQuestion: null,
    isPlaying: false
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

  // Durées de timer selon le mode (en secondes)
  timerByMode: {
    rapide:   { facile: 25, moyen: 22, chaud: 18, torride: 15 },
    pose:     { facile: 35, moyen: 30, chaud: 25, torride: 20 },
    marathon: { facile: 45, moyen: 38, chaud: 30, torride: 25 }
  },

  init() {
    this.app = document.getElementById('app');
    this.showModeSelection();
  },

  clear() {
    if (this.game.timer) {
      clearInterval(this.game.timer);
      this.game.timer = null;
    }
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

  // ============================================================
  // MOTEUR DE JEU
  // ============================================================

  startGame() {
    this.game = {
      heat: 0,
      fails: 0,
      questionsAsked: 0,
      currentPlayer: Math.random() < 0.5 ? 'monsieur' : 'madame',
      timer: null,
      timeLeft: 0,
      currentQuestion: null,
      isPlaying: true
    };
    this.nextQuestion();
  },

  getHeatLevel() {
    if (this.game.heat < 25) return 'facile';
    if (this.game.heat < 50) return 'moyen';
    if (this.game.heat < 75) return 'chaud';
    return 'torride';
  },

  increaseHeat(amount = 4) {
    this.game.heat = Math.min(100, this.game.heat + amount);
  },

  getRandomQuestion() {
    const level = this.getHeatLevel();
    const pool = QUESTIONS[level];
    if (!pool || pool.length === 0) return { type: "open", text: "Décris ce que tu ressens en ce moment." };
    return pool[Math.floor(Math.random() * pool.length)];
  },

  getTimerDuration() {
    const level = this.getHeatLevel();
    return this.timerByMode[this.state.mode][level] || 30;
  },

  nextQuestion() {
    this.clear();
    this.game.questionsAsked++;
    this.game.currentQuestion = this.getRandomQuestion();
    this.game.timeLeft = this.getTimerDuration();

    // Alterne le joueur
    this.game.currentPlayer = this.game.currentPlayer === 'monsieur' ? 'madame' : 'monsieur';
    const playerName = this.state.names[this.game.currentPlayer];

    const level = this.getHeatLevel();
    const heatPercent = Math.round(this.game.heat);

    this.app.innerHTML = `
      <div class="game-header">
        <div class="heat-bar">
          <div class="heat-fill" style="width: ${heatPercent}%"></div>
        </div>
        <div class="game-meta">
          <span class="level">${level.toUpperCase()}</span>
          <span class="fails">Fautes : ${this.game.fails}</span>
        </div>
      </div>

      <div class="player-turn">
        À toi, <strong>${playerName}</strong>
      </div>

      <div class="question-card">
        <p class="question-text">${this.game.currentQuestion.text}</p>
        ${this.game.currentQuestion.type === 'list' ? `<p class="question-hint">Tu dois en donner au moins ${this.game.currentQuestion.count}</p>` : ''}
      </div>

      <div class="timer" id="timer-display">${this.game.timeLeft}s</div>

      <div class="game-actions">
        <button class="btn btn-success" id="btn-ok">Validé</button>
        <button class="btn btn-danger" id="btn-fail">Échec / Temps écoulé</button>
      </div>
    `;

    // Timer
    this.game.timer = setInterval(() => {
      this.game.timeLeft--;
      const el = document.getElementById('timer-display');
      if (el) el.textContent = this.game.timeLeft + 's';

      if (this.game.timeLeft <= 0) {
        clearInterval(this.game.timer);
        this.game.timer = null;
        this.triggerGage();
      }
    }, 1000);

    document.getElementById('btn-ok').addEventListener('click', () => {
      clearInterval(this.game.timer);
      this.game.timer = null;
      this.increaseHeat(3); // petite montée même en réussissant
      this.nextQuestion();
    });

    document.getElementById('btn-fail').addEventListener('click', () => {
      clearInterval(this.game.timer);
      this.game.timer = null;
      this.triggerGage();
    });
  },

  // Remplace les placeholders dans un gage
  fillGage(template) {
    let text = template;

    text = text.replace(/{monsieur}/g, this.state.names.monsieur);
    text = text.replace(/{madame}/g, this.state.names.madame);

    // Prop aléatoire parmi ceux choisis (sinon générique)
    if (this.state.props.length > 0) {
      const prop = this.state.props[Math.floor(Math.random() * this.state.props.length)];
      text = text.replace(/{prop}/g, prop);
    } else {
      text = text.replace(/{prop}/g, "un objet à portée de main");
    }

    // Acte aléatoire
    if (this.state.acts.length > 0) {
      const acte = this.state.acts[Math.floor(Math.random() * this.state.acts.length)];
      text = text.replace(/{acte}/g, acte);
    } else {
      text = text.replace(/{acte}/g, "un acte coquin autorisé");
    }

    // Vêtements (on peut enlever)
    const vetM = this.state.clothes.monsieur.length > 0
      ? this.state.clothes.monsieur[Math.floor(Math.random() * this.state.clothes.monsieur.length)]
      : "un vêtement";
    const vetF = this.state.clothes.madame.length > 0
      ? this.state.clothes.madame[Math.floor(Math.random() * this.state.clothes.madame.length)]
      : "un vêtement";

    text = text.replace(/{vetement_m}/g, vetM);
    text = text.replace(/{vetement_f}/g, vetF);

    return text;
  },

  getRandomGage() {
    const level = this.getHeatLevel();
    const pool = GAGES[level];
    if (!pool || pool.length === 0) return "Embrassez-vous longuement.";
    const raw = pool[Math.floor(Math.random() * pool.length)];
    return this.fillGage(raw);
  },

  triggerGage() {
    this.game.fails++;
    this.increaseHeat(8); // grosse montée de chaleur sur une faute

    const gageText = this.getRandomGage();
    const level = this.getHeatLevel();

    this.clear();
    this.app.innerHTML = `
      <div class="game-header">
        <div class="heat-bar">
          <div class="heat-fill" style="width: ${Math.round(this.game.heat)}%"></div>
        </div>
        <div class="game-meta">
          <span class="level">${level.toUpperCase()}</span>
          <span class="fails">Fautes : ${this.game.fails}</span>
        </div>
      </div>

      <div class="gage-card">
        <div class="gage-label">Gage</div>
        <p class="gage-text">${gageText}</p>
      </div>

      <p class="gage-hint">Faites le gage… puis continuez.</p>

      <button class="btn btn-primary" id="btn-continue">
        Gage terminé — Question suivante
      </button>
    `;

    document.getElementById('btn-continue').addEventListener('click', () => {
      this.nextQuestion();
    });
  }
};
