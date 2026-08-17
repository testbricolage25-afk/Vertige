const UI = {
  app: null,
  state: {
    names: { monsieur: '', madame: '' },
    props: [],
    acts: [],
    clothes: { monsieur: [], madame: [] }
  },

  game: null,

  availableProps: [
    'Chantilly', 'Menottes', 'Ceinture', 'Cache-œil', 'Glaçon',
    'Huile de massage', 'Lubrifiant', 'Eau', 'Vibromasseur'
  ],

  availableActs: [
    'Sexe oral vaginal', 'Sexe oral anal', 'Pénétration vaginale',
    'Pénétration anale', 'Doigts vaginaux', 'Doigts anaux', 'Avaler le sperme'
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
    this.showNames();
  },

  clear() {
    if (this.game && this.game.timeoutId) {
      clearTimeout(this.game.timeoutId);
      this.game.timeoutId = null;
    }
    this.app.innerHTML = '';
    window.scrollTo(0, 0);
  },

  // ====================== SETUP ======================
  showNames() {
    this.clear();
    this.app.innerHTML = `
      <div class="header"><h1>Vertige</h1><p>Vos prénoms pour ce soir</p></div>
      <div class="form-container">
        <div class="input-group">
          <label>Monsieur</label>
          <input type="text" id="name-monsieur" placeholder="Son prénom" autocomplete="off">
        </div>
        <div class="input-group">
          <label>Madame</label>
          <input type="text" id="name-madame" placeholder="Son prénom" autocomplete="off">
        </div>
        <button class="btn btn-primary mt" id="btn-names">Continuer</button>
      </div>
    `;
    document.getElementById('btn-names').addEventListener('click', () => {
      const m = document.getElementById('name-monsieur').value.trim();
      const f = document.getElementById('name-madame').value.trim();
      if (!m || !f) return alert('Les deux prénoms sont nécessaires.');
      this.state.names.monsieur = m;
      this.state.names.madame = f;
      this.showProps();
    });
  },

  showProps() {
    this.clear();
    let html = '';
    this.availableProps.forEach(p => {
      html += '<label class="check-item"><input type="checkbox" value="' + p + '"><span>' + p + '</span></label>';
    });
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

  showActs() {
    this.clear();
    let html = '';
    this.availableActs.forEach(a => {
      html += '<label class="check-item"><input type="checkbox" value="' + a + '" checked><span>' + a + '</span></label>';
    });
    this.app.innerHTML = `
      <div class="header">
        <h1>Vertige</h1>
        <p>Ce qui est autorisé ce soir</p>
        <span class="small">Retirez seulement ce que vous refusez clairement.</span>
      </div>
      <div class="check-list">${html}</div>
      <button class="btn btn-primary" id="btn-acts">Continuer</button>
    `;
    document.getElementById('btn-acts').addEventListener('click', () => {
      this.state.acts = [...document.querySelectorAll('.check-list input:checked')].map(i => i.value);
      this.showClothes();
    });
  },

  showClothes() {
    this.clear();
    const makeList = (list) => {
      let html = '';
      list.forEach(item => {
        html += '<label class="check-item small"><input type="checkbox" value="' + item + '"><span>' + item + '</span></label>';
      });
      return html;
    };
    this.app.innerHTML = `
      <div class="header">
        <h1>Vertige</h1>
        <p>Votre tenue actuelle</p>
        <span class="small">Le jeu s’en servira.</span>
      </div>
      <div class="clothes-grid">
        <div>
          <h3>${this.state.names.monsieur}</h3>
          <div class="check-list" id="clothes-m">${makeList(this.clothesMonsieur)}</div>
        </div>
        <div>
          <h3>${this.state.names.madame}</h3>
          <div class="check-list" id="clothes-f">${makeList(this.clothesMadame)}</div>
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

  showPromise() {
    this.clear();
    this.app.innerHTML = `
      <div class="header"><h1>Vertige</h1><p>Le seuil</p></div>
      <div class="promise">
        <p>${this.state.names.monsieur} et ${this.state.names.madame}.</p>
        <p>Ce soir, vous ne jouez pas.<br>Vous vous abandonnez.</p>
        <p>Vous avancez jusqu’au bout.<br>Vous ne trichez pas.<br>Vous n’interrompez pas.</p>
        <p>C’est <strong>Vertige</strong> qui décidera<br>quand vos corps auront assez tremblé.</p>
        <p class="signature">Vous vous donnez l’un à l’autre.<br>Et au jeu.</p>
      </div>
      <button class="btn btn-primary" id="btn-start">Nous franchissons le seuil</button>
    `;
    document.getElementById('btn-start').addEventListener('click', () => this.startGame());
  },

  // ====================== MOTEUR ======================
  startGame() {
    const hasVaginal = this.state.acts.includes('Pénétration vaginale');
    const hasAnal = this.state.acts.includes('Pénétration anale');
    const hasSwallow = this.state.acts.includes('Avaler le sperme');

    let plan = ['visage_ou_buccal', 'seins_ou_entre'];
    if (hasVaginal) plan.push('vaginal');
    else if (hasAnal) plan.push('anal');
    else plan.push('seins_ou_fesses');

    this.game = {
      intensity: 0,
      fails: 0,
      currentPlayer: Math.random() < 0.5 ? 'monsieur' : 'madame',
      remainingClothes: {
        monsieur: [...this.state.clothes.monsieur],
        madame: [...this.state.clothes.madame]
      },
      orgasmsDone: 0,
      targetOrgasms: 3,
      orgasmPlan: plan,
      recoveryTurns: 0,
      ongoingGage: null,
      timeoutId: null,
      startTime: Date.now()
    };

    this.nextTurn();
  },

  getTimer(q) {
    const base = q.timer || [12, 20];
    let min = base[0], max = base[1];
    const minutes = (Date.now() - this.game.startTime) / 60000;
    if (minutes > 40) { min = Math.max(7, min-3); max = Math.max(12, max-4); }
    if (minutes > 80) { min = Math.max(6, min-2); max = Math.max(10, max-3); }
    if (this.game.intensity >= 4) { min = Math.max(6, min-2); max = Math.max(10, max-3); }
    if (this.game.recoveryTurns > 0) { min += 5; max += 7; }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  nextTurn() {
    if (this.game.orgasmsDone >= 3) return this.showVictory();

    if (this.game.recoveryTurns > 0) this.game.recoveryTurns--;

    this.game.currentPlayer = this.game.currentPlayer === 'monsieur' ? 'madame' : 'monsieur';
    const player = this.game.currentPlayer;
    const playerName = this.state.names[player];

    const forcePressure = this.game.intensity >= 3.5 && Math.random() < 0.28;
    const question = this.getRandomQuestion(forcePressure);
    const duration = this.getTimer(question);

    this.clear();

    let ongoingHtml = '';
    if (this.game.ongoingGage) {
      ongoingHtml = `<div class="ongoing">En cours : ${this.game.ongoingGage}</div>`;
    }

    this.app.innerHTML = `
      ${ongoingHtml}
      <div class="player-turn">À toi <strong>${playerName}</strong></div>
      <div class="question-card">
        <p class="question-text">${question.text}</p>
        ${question.type === 'list' ? '<p class="question-hint">Au moins ' + question.count + ' réponses</p>' : ''}
        ${question.type === 'fetch' ? '<p class="question-hint">Tu peux te lever</p>' : ''}
      </div>
      <div class="buzz-zone">
        <p class="buzz-hint">${forcePressure ? 'PRESSION • Réponds vite' : 'Réponds… puis buzz'}</p>
        <button class="btn btn-primary btn-buzz" id="btn-buzz">BUZZ</button>
      </div>
    `;

    this.game.timeoutId = setTimeout(() => {
      this.game.timeoutId = null;
      this.onFail(player);
    }, duration * 1000);

    document.getElementById('btn-buzz').addEventListener('click', () => {
      if (this.game.timeoutId) {
        clearTimeout(this.game.timeoutId);
        this.game.timeoutId = null;
        this.game.intensity = Math.min(6, this.game.intensity + (forcePressure ? 0.2 : 0.1));
        this.nextTurn();
      }
    });
  },

  onFail(loser) {
    this.game.fails++;
    this.game.intensity = Math.min(6, this.game.intensity + 0.4);
    this.game.ongoingGage = null; // une perte casse l’effet en cours
    this.showGage(loser);
  },

  showGage(loser) {
    const winner = loser === 'monsieur' ? 'madame' : 'monsieur';
    const intensity = this.game.intensity;
    const shouldOrgasm = intensity >= 5.0 && this.game.orgasmsDone < 3 && Math.random() < 0.5;

    let raw;
    if (shouldOrgasm) {
      raw = this.pickFrom(GAGES.orgasm);
    } else if (this.game.recoveryTurns > 0) {
      raw = this.pickFrom(GAGES.recovery);
    } else {
      raw = this.pickSmartGage(loser, intensity);
    }

    const text = this.fill(raw, loser, winner);
    const isOrgasm = shouldOrgasm;
    const isOngoing = raw.includes('jusqu’à la prochaine perte') || raw.includes('jusqu\'à la prochaine perte');
    const duration = isOrgasm || isOngoing ? null : this.getGageDuration(intensity);

    this.clear();

    let timerHtml = duration ? `<div class="gage-timer" id="gage-timer">${duration}s</div>` : '';

    this.app.innerHTML = `
      <div class="gage-card">
        <div class="gage-label">${isOrgasm ? 'ÉJACULATION' : 'Gage'}</div>
        <p class="gage-text">${text}</p>
        ${timerHtml}
      </div>
      <button class="btn btn-primary" id="btn-gage-done" ${duration ? 'disabled' : ''}>
        ${isOrgasm ? 'Éjaculation terminée' : 'Gage terminé'}
      </button>
    `;

    if (duration) {
      let left = duration;
      const interval = setInterval(() => {
        left--;
        const el = document.getElementById('gage-timer');
        if (el) el.textContent = left + 's';
        if (left <= 0) {
          clearInterval(interval);
          const btn = document.getElementById('btn-gage-done');
          if (btn) btn.disabled = false;
        }
      }, 1000);
    }

    if (isOngoing) this.game.ongoingGage = text;

    if (isOrgasm) {
      this.game.orgasmsDone++;
      this.game.recoveryTurns = 5;
      this.game.intensity = Math.max(2.5, this.game.intensity - 1.6);
    }

    // Gestion simple des vêtements
    if (raw.includes('enlève') || raw.includes('déshabiller')) {
      const target = raw.includes('{winner}') ? winner : loser;
      this.removeRandomClothes(target);
    }

    document.getElementById('btn-gage-done').addEventListener('click', () => this.nextTurn());
  },

  pickSmartGage(loser, intensity) {
    const isMadame = loser === 'madame';
    if (intensity < 1.8) return this.pickFrom(GAGES.soft);
    if (intensity < 2.8) return this.pickFrom(GAGES.tease);
    if (intensity < 3.7) return this.pickFrom(GAGES.touch);
    if (intensity < 4.6) return this.pickFrom(isMadame ? GAGES.oral_f : GAGES.oral_m);
    if (Math.random() < 0.35) return this.pickFrom(GAGES.ongoing);
    return this.pickFrom(GAGES.heavy);
  },

  pickFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },

  fill(template, loser, winner) {
    let t = template;
    t = t.replace(/{loser}/g, this.state.names[loser]);
    t = t.replace(/{winner}/g, this.state.names[winner]);
    t = t.replace(/{monsieur}/g, this.state.names.monsieur);
    t = t.replace(/{madame}/g, this.state.names.madame);

    const prop = this.state.props.length > 0
      ? this.state.props[Math.floor(Math.random() * this.state.props.length)]
      : 'un objet à portée de main';
    t = t.replace(/{prop}/g, prop);

    const swallow = this.state.acts.includes('Avaler le sperme')
      ? 'doit goûter et avaler'
      : 'peut recracher';
    t = t.replace(/{swallow}/g, swallow);

    return t;
  },

  getGageDuration(intensity) {
    if (intensity < 2) return 40;
    if (intensity < 3.5) return 55;
    if (intensity < 4.8) return 70;
    return 85;
  },

  removeRandomClothes(who) {
    const list = this.game.remainingClothes[who];
    if (list.length === 0) return;
    list.splice(Math.floor(Math.random() * list.length), 1);
  },

  getRandomQuestion(forceHard) {
    const level = forceHard ? 'torride' :
      this.game.intensity < 1.8 ? 'facile' :
      this.game.intensity < 3.3 ? 'moyen' :
      this.game.intensity < 4.7 ? 'chaud' : 'torride';
    const pool = QUESTIONS[level] || QUESTIONS.facile;
    return pool[Math.floor(Math.random() * pool.length)];
  },

  showVictory() {
    this.clear();
    this.app.innerHTML = `
      <div class="header"><h1>Vertige</h1><p>La fin</p></div>
      <div class="promise">
        <p>Vous êtes allés jusqu’au bout.</p>
        <p>3 éjaculations.</p>
        <p class="signature">Vos corps ont tremblé.<br>Le jeu est terminé.</p>
      </div>
      <button class="btn btn-primary" onclick="location.reload()">Recommencer</button>
    `;
  }
};
