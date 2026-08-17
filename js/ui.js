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

  diceBody: {
    soft: ['lèvres', 'cou', 'oreilles', 'mains', 'épaules'],
    medium: ['seins', 'torse', 'ventre', 'cuisses', 'fesses'],
    hard: ['sexe', 'clitoris', 'gland', 'boules', 'anus']
  },
  diceAction: {
    soft: ['embrasser', 'lécher doucement', 'caresser', 'souffler'],
    medium: ['sucer', 'lécher longuement', 'masturber lentement', 'doigter doucement'],
    hard: ['sucer profondément', 'masturber rapidement', 'doigter intensément', 'faire jouir']
  },

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

  // ========== SETUP ==========
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

  // ========== JEU ==========
  startGame() {
    const hasVaginal = this.state.acts.includes('Pénétration vaginale');
    const hasAnal = this.state.acts.includes('Pénétration anale');
    const hasSwallow = this.state.acts.includes('Avaler le sperme');

    let plan = [];
    plan.push(hasSwallow ? 'buccal' : 'visage_ou_buccal');
    plan.push('seins');
    if (hasVaginal) plan.push('vaginal');
    else if (hasAnal) plan.push('anal');
    else plan.push('seins_ou_fesses');

    this.game = {
      intensity: 0,
      currentPlayer: Math.random() < 0.5 ? 'monsieur' : 'madame',
      remainingClothes: {
        monsieur: [...this.state.clothes.monsieur],
        madame: [...this.state.clothes.madame]
      },
      gagesCount: { monsieur: 0, madame: 0 },
      orgasmsDone: 0,
      orgasmPlan: plan,
      recoveryTurns: 0,
      ongoingGage: null,
      paused: false,
      remainingTime: 0,
      timeoutId: null,
      startTime: Date.now()
    };

    this.nextTurn();
  },

  renderStatusBar() {
    const m = this.game.remainingClothes.monsieur;
    const f = this.game.remainingClothes.madame;
    const pct = Math.min(100, Math.round(this.game.intensity * 16.6));

    let dots = '';
    for (let i = 1; i <= 3; i++) {
      dots += `<span class="ejac-dot \( {i <= this.game.orgasmsDone ? 'done' : ''}"> \){i}</span>`;
    }

    return `
      <div class="status-bar">
        <div class="status-col">
          <div class="status-name">${this.state.names.monsieur}</div>
          <div class="status-gages">\( {this.game.gagesCount.monsieur} gage \){this.game.gagesCount.monsieur > 1 ? 's' : ''}</div>
          <div class="status-clothes">${m.length ? m.slice(0,3).join(', ') + (m.length > 3 ? '…' : '') : 'Nu'}</div>
        </div>
        <div class="status-center">
          <div class="intensity-bar"><div class="intensity-fill" style="width:${pct}%"></div></div>
          <div class="ejac-dots">${dots}</div>
        </div>
        <div class="status-col">
          <div class="status-name">${this.state.names.madame}</div>
          <div class="status-gages">\( {this.game.gagesCount.madame} gage \){this.game.gagesCount.madame > 1 ? 's' : ''}</div>
          <div class="status-clothes">${f.length ? f.slice(0,3).join(', ') + (f.length > 3 ? '…' : '') : 'Nue'}</div>
        </div>
      </div>
    `;
  },

  getTimer(q) {
    const base = q.timer || [14, 22];
    let min = base[0], max = base[1];
    const minPassed = (Date.now() - this.game.startTime) / 60000;

    if (minPassed > 35) { min = Math.max(9, min-2); max = Math.max(15, max-3); }
    if (minPassed > 70) { min = Math.max(8, min-2); max = Math.max(13, max-3); }
    if (this.game.intensity >= 3.8) { min = Math.max(7, min-2); max = Math.max(12, max-2); }
    if (this.game.recoveryTurns > 0) { min += 6; max += 8; }

    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  nextTurn() {
    if (this.game.orgasmsDone >= 3) return this.showVictory();
    if (this.game.recoveryTurns > 0) this.game.recoveryTurns--;

    this.game.currentPlayer = this.game.currentPlayer === 'monsieur' ? 'madame' : 'monsieur';
    const player = this.game.currentPlayer;
    const name = this.state.names[player];

    const force = this.game.intensity >= 3.8 && Math.random() < 0.25;
    const q = this.getRandomQuestion(force);
    const duration = this.getTimer(q);

    this.clear();

    const ongoing = this.game.ongoingGage
      ? `<div class="ongoing">${this.game.ongoingGage}</div>` : '';

    this.app.innerHTML = `
      ${ongoing}
      <div class="player-turn">À toi <strong>${name}</strong></div>

      <div class="question-card">
        <p class="question-text">${q.text}</p>
        ${q.type === 'list' ? `<p class="question-hint">Au moins ${q.count} réponses</p>` : ''}
        ${q.type === 'fetch' ? `<p class="question-hint">Tu peux te lever</p>` : ''}
      </div>

      <div class="buzz-zone">
        <p class="buzz-hint">${force ? 'PRESSION • Réponds vite' : 'Réponds puis buzz'}</p>
        <button class="btn btn-primary btn-buzz" id="btn-buzz">BUZZ</button>
        <button class="btn btn-pause" id="btn-pause">Pause</button>
      </div>

      ${this.renderStatusBar()}
    `;

    this.game.remainingTime = duration;
    this.game.timeoutId = setTimeout(() => {
      if (!this.game.paused) {
        this.game.timeoutId = null;
        this.onFail(player);
      }
    }, duration * 1000);

    document.getElementById('btn-buzz').addEventListener('click', () => {
      if (this.game.timeoutId && !this.game.paused) {
        clearTimeout(this.game.timeoutId);
        this.game.timeoutId = null;
        this.game.intensity = Math.min(6, this.game.intensity + (force ? 0.2 : 0.1));
        this.nextTurn();
      }
    });

    document.getElementById('btn-pause').addEventListener('click', () => {
      this.game.paused = !this.game.paused;
      const btn = document.getElementById('btn-pause');
      btn.textContent = this.game.paused ? 'Reprendre' : 'Pause';

      if (this.game.paused) {
        if (this.game.timeoutId) {
          clearTimeout(this.game.timeoutId);
          this.game.timeoutId = null;
        }
      } else {
        // On ne relance pas le timer restant pour simplifier (évite les bugs)
        // L'utilisateur re-buzz ou attend la prochaine question
      }
    });
  },

  onFail(loser) {
    this.game.gagesCount[loser]++;
    this.game.intensity = Math.min(6, this.game.intensity + 0.4);
    this.game.ongoingGage = null;
    this.showGage(loser);
  },

  showGage(loser) {
    const winner = loser === 'monsieur' ? 'madame' : 'monsieur';
    const intensity = this.game.intensity;

    let shouldOrgasm = false;
    if (this.game.orgasmsDone === 0 && intensity >= 2.8 && intensity < 4.2 && Math.random() < 0.42) shouldOrgasm = true;
    if (this.game.orgasmsDone === 1 && intensity >= 4.0 && intensity < 5.3 && Math.random() < 0.48) shouldOrgasm = true;
    if (this.game.orgasmsDone === 2 && intensity >= 5.0 && Math.random() < 0.55) shouldOrgasm = true;

    const isDice = !shouldOrgasm && Math.random() < 0.13;

    let text = '', isOrgasm = false, isOngoing = false, duration = null;

    if (shouldOrgasm) {
      text = this.fill(this.pickOrgasm(), loser, winner);
      isOrgasm = true;
    } else if (isDice) {
      text = this.createDiceGage(loser, winner, intensity);
      duration = 60;
    } else if (this.game.recoveryTurns > 0) {
      text = this.fill(this.pickFrom(GAGES.recovery), loser, winner);
      duration = 50;
    } else {
      const raw = this.pickSmartGage(loser, intensity);
      text = this.fill(raw, loser, winner);
      isOngoing = raw.includes('jusqu’à la prochaine perte') || raw.includes("jusqu'à la prochaine perte");
      duration = isOngoing ? null : this.getGageDuration(intensity);
    }

    this.clear();

    this.app.innerHTML = `
      <div class="gage-card">
        <div class="gage-label">${isOrgasm ? 'ÉJACULATION' : (isDice ? 'DÉS' : 'Gage')}</div>
        <p class="gage-text">${text}</p>
        <div id="timer-box"></div>
      </div>

      ${duration ? '<button class="btn btn-primary" id="btn-ready">Je suis prêt(e) — Lancer le chrono</button>' : ''}
      <button class="btn btn-primary" id="btn-done" ${duration ? 'disabled' : ''}>
        ${isOrgasm ? 'Éjaculation terminée' : 'Gage terminé'}
      </button>

      ${this.renderStatusBar()}
    `;

    if (duration) {
      document.getElementById('btn-ready').addEventListener('click', () => {
        document.getElementById('btn-ready').style.display = 'none';
        document.getElementById('timer-box').innerHTML = `<div class="gage-timer" id="gage-timer">${duration}s</div>`;
        let left = duration;
        const iv = setInterval(() => {
          left--;
          const el = document.getElementById('gage-timer');
          if (el) el.textContent = left + 's';
          if (left <= 0) {
            clearInterval(iv);
            document.getElementById('btn-done').disabled = false;
          }
        }, 1000);
      });
    }

    if (isOngoing) this.game.ongoingGage = text;

    if (isOrgasm) {
      this.game.orgasmsDone++;
      this.game.recoveryTurns = 5;
      this.game.intensity = Math.max(2.2, this.game.intensity - 1.5);
    }

    document.getElementById('btn-done').addEventListener('click', () => this.nextTurn());
  },

  createDiceGage(loser, winner, intensity) {
    let bodyP, actP;
    if (intensity < 2.5) { bodyP = this.diceBody.soft; actP = this.diceAction.soft; }
    else if (intensity < 4.2) { bodyP = this.diceBody.medium; actP = this.diceAction.medium; }
    else { bodyP = this.diceBody.hard; actP = this.diceAction.hard; }

    const body = bodyP[Math.floor(Math.random() * bodyP.length)];
    const act = actP[Math.floor(Math.random() * actP.length)];
    return `${this.state.names[loser]} doit ${act} ${body} de ${this.state.names[winner]} pendant 60 secondes.`;
  },

  pickSmartGage(loser, intensity) {
    const isF = loser === 'madame';
    if (intensity < 1.8) return this.pickFrom(GAGES.soft);
    if (intensity < 2.8) return this.pickFrom(GAGES.tease);
    if (intensity < 3.7) return this.pickFrom(GAGES.touch);
    if (intensity < 4.6) return this.pickFrom(isF ? GAGES.oral_f : GAGES.oral_m);
    if (Math.random() < 0.3) return this.pickFrom(GAGES.ongoing);
    return this.pickFrom(GAGES.heavy);
  },

  pickOrgasm() {
    const p = this.game.orgasmPlan[this.game.orgasmsDone] || 'visage_ou_buccal';
    if (p === 'buccal') return GAGES.orgasm[0];
    if (p === 'visage_ou_buccal') return Math.random() < 0.5 ? GAGES.orgasm[0] : GAGES.orgasm[1];
    if (p === 'seins') return Math.random() < 0.5 ? GAGES.orgasm[2] : GAGES.orgasm[3];
    if (p === 'vaginal') return GAGES.orgasm[4];
    if (p === 'anal') return GAGES.orgasm[5];
    return GAGES.orgasm[Math.floor(Math.random() * GAGES.orgasm.length)];
  },

  pickFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },

  fill(tpl, loser, winner) {
    let t = tpl;
    t = t.replace(/{loser}/g, this.state.names[loser]);
    t = t.replace(/{winner}/g, this.state.names[winner]);
    t = t.replace(/{monsieur}/g, this.state.names.monsieur);
    t = t.replace(/{madame}/g, this.state.names.madame);
    const prop = this.state.props.length ? this.state.props[Math.floor(Math.random() * this.state.props.length)] : 'un objet';
    t = t.replace(/{prop}/g, prop);
    const sw = this.state.acts.includes('Avaler le sperme') ? 'doit goûter et avaler' : 'peut recracher';
    t = t.replace(/{swallow}/g, sw);
    return t;
  },

  getGageDuration(i) {
    if (i < 2) return 40;
    if (i < 3.5) return 55;
    if (i < 4.8) return 70;
    return 85;
  },

  getRandomQuestion(force) {
    const level = force ? 'torride' :
      this.game.intensity < 1.8 ? 'facile' :
      this.game.intensity < 3.3 ? 'moyen' :
      this.game.intensity < 4.7 ? 'chaud' : 'torride';
    const pool = (QUESTIONS && QUESTIONS[level]) ? QUESTIONS[level] : QUESTIONS.facile;
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
