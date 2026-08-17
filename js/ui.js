const UI = {
  app: null,
  state: {
    mode: null,
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
    this.showModeSelection();
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
          <div class="duration">≈ 20 – 30 min • 1 éjaculation</div>
          <p>Pression rapide. Une seule montée.</p>
        </div>
        <div class="mode-card" data-mode="pose">
          <h2>Posé</h2>
          <div class="duration">≈ 45 – 70 min • 2 éjaculations</div>
          <p>On prend le temps. Deux vagues.</p>
        </div>
        <div class="mode-card" data-mode="marathon">
          <h2>Marathon</h2>
          <div class="duration">≈ 1h30+ • 3 éjaculations</div>
          <p>Longue descente. Progression totale.</p>
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
        <span class="small">Le jeu s’en servira. Soyez précis.</span>
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
    const target = { rapide: 1, pose: 2, marathon: 3 }[this.state.mode];

    // Plan des éjaculations selon les actes autorisés
    const hasVaginal = this.state.acts.includes('Pénétration vaginale');
    const hasAnal = this.state.acts.includes('Pénétration anale');
    const hasSwallow = this.state.acts.includes('Avaler le sperme');
    const hasOral = this.state.acts.includes('Sexe oral vaginal') || this.state.acts.includes('Sexe oral anal');

    let orgasmPlan = [];

    if (this.state.mode === 'rapide') {
      if (hasVaginal) orgasmPlan = ['vaginal'];
      else if (hasAnal) orgasmPlan = ['anal'];
      else if (hasSwallow) orgasmPlan = ['buccal'];
      else orgasmPlan = ['visage_ou_seins'];
    } 
    else if (this.state.mode === 'pose') {
      orgasmPlan = ['visage_ou_seins'];
      if (hasVaginal) orgasmPlan.push('vaginal');
      else if (hasAnal) orgasmPlan.push('anal');
      else orgasmPlan.push('seins_ou_fesses');
    } 
    else {
      // marathon
      orgasmPlan = ['visage_ou_buccal', 'seins_ou_entre', hasVaginal ? 'vaginal' : (hasAnal ? 'anal' : 'seins_ou_fesses')];
    }

    this.game = {
      heat: 0,
      fails: 0,
      questionsAsked: 0,
      currentPlayer: Math.random() < 0.5 ? 'monsieur' : 'madame',
      remainingClothes: {
        monsieur: [...this.state.clothes.monsieur],
        madame: [...this.state.clothes.madame]
      },
      orgasmsDone: 0,
      targetOrgasms: target,
      orgasmPlan: orgasmPlan,
      recoveryTurns: 0,          // tours de récupération après éjac
      seriesLeft: 0,             // pour les speed quiz en chaîne
      currentSeriesQuestion: null,
      timeoutId: null
    };

    this.nextTurn();
  },

  getHeatLevel() {
    if (this.game.heat < 25) return 'facile';
    if (this.game.heat < 50) return 'moyen';
    if (this.game.heat < 75) return 'chaud';
    return 'torride';
  },

  increaseHeat(n) {
    this.game.heat = Math.min(100, this.game.heat + (n || 4));
  },

  hasBottomClothes(who) {
    const bottoms = ['Caleçon','Culotte / String','Lingerie une pièce','Short','Pantalon','Jupe','Robe','Maillot de bain','Maillot 1 pièce','Maillot 2 pièces','Collant'];
    return this.game.remainingClothes[who].some(c => bottoms.includes(c));
  },

  removeRandomClothes(who, count) {
    count = count || 1;
    for (let i = 0; i < count; i++) {
      if (this.game.remainingClothes[who].length === 0) break;
      const idx = Math.floor(Math.random() * this.game.remainingClothes[who].length);
      this.game.remainingClothes[who].splice(idx, 1);
    }
  },

  getRandomQuestion() {
    // Si on est en série speed
    if (this.game.seriesLeft > 0 && this.game.currentSeriesQuestion) {
      return this.game.currentSeriesQuestion;
    }

    const level = this.getHeatLevel();
    const pool = (typeof QUESTIONS !== 'undefined' && QUESTIONS[level]) ? QUESTIONS[level] : [];
    if (pool.length === 0) return { type: "open", text: "Décris ce que tu ressens.", timer: [15, 25] };

    const q = pool[Math.floor(Math.random() * pool.length)];

    // 25% de chance de lancer une série de 3 (sauf fetch)
    if (q.type !== 'fetch' && Math.random() < 0.28) {
      this.game.seriesLeft = 3;
      this.game.currentSeriesQuestion = q;
    }

    return q;
  },

  nextTurn() {
    if (this.game.orgasmsDone >= this.game.targetOrgasms) {
      return this.showVictory();
    }

    // Récupération après éjaculation
    if (this.game.recoveryTurns > 0) {
      this.game.recoveryTurns--;
    }

    this.game.questionsAsked++;
    this.game.currentPlayer = this.game.currentPlayer === 'monsieur' ? 'madame' : 'monsieur';
    const player = this.game.currentPlayer;
    const playerName = this.state.names[player];
    const question = this.getRandomQuestion();
    const level = this.getHeatLevel();

    // Timer réaliste
    let duration;
    if (question.timer) {
      duration = Math.floor(Math.random() * (question.timer[1] - question.timer[0] + 1)) + question.timer[0];
    } else {
      duration = level === 'facile' ? 20 : level === 'moyen' ? 18 : level === 'chaud' ? 15 : 12;
    }

    // Pendant récupération on donne un peu plus de temps
    if (this.game.recoveryTurns > 0) duration += 8;

    this.clear();

    let seriesInfo = '';
    if (this.game.seriesLeft > 0) {
      seriesInfo = `<div class="series-info">Série speed • ${4 - this.game.seriesLeft}/3</div>`;
    }

    this.app.innerHTML = `
      <div class="game-header">
        <div class="heat-bar"><div class="heat-fill" style="width:${this.game.heat}%"></div></div>
        <div class="game-meta">
          <span class="level">${level.toUpperCase()}</span>
          <span>Éjaculations : \( {this.game.orgasmsDone}/ \){this.game.targetOrgasms}</span>
        </div>
      </div>

      ${seriesInfo}

      <div class="player-turn">À toi <strong>${playerName}</strong></div>

      <div class="question-card">
        <p class="question-text">${question.text}</p>
        ${question.type === 'list' ? '<p class="question-hint">Au moins ' + question.count + ' réponses</p>' : ''}
        ${question.type === 'fetch' ? '<p class="question-hint">Tu as le droit de te lever</p>' : ''}
      </div>

      <div class="buzz-zone">
        <p class="buzz-hint">Réponds… puis buzz avant que ça sonne</p>
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

        // Succès
        if (this.game.seriesLeft > 0) {
          this.game.seriesLeft--;
          if (this.game.seriesLeft === 0) {
            this.game.currentSeriesQuestion = null;
          }
        }

        this.increaseHeat(this.game.recoveryTurns > 0 ? 2 : 4);
        this.nextTurn();
      }
    });
  },

  onFail(loser) {
    this.game.fails++;
    this.increaseHeat(8);

    // On casse la série
    this.game.seriesLeft = 0;
    this.game.currentSeriesQuestion = null;

    this.showGage(loser);
  },

  // ====================== GAGES + ÉJACULATIONS ======================
  showGage(loser) {
    const winner = loser === 'monsieur' ? 'madame' : 'monsieur';
    const level = this.getHeatLevel();

    // Est-ce le moment d’une éjaculation ?
    const shouldOrgasm = this.game.heat >= 70 && this.game.orgasmsDone < this.game.targetOrgasms && Math.random() < 0.45;

    let gage;
    if (shouldOrgasm) {
      gage = this.createOrgasmGage();
    } else {
      gage = this.pickSmartGage(loser, winner, level);
    }

    this.clear();

    let timerHtml = '';
    if (gage.duration) {
      timerHtml = '<div class="gage-timer" id="gage-timer">' + gage.duration + 's</div>';
    }

    this.app.innerHTML = `
      <div class="game-header">
        <div class="heat-bar"><div class="heat-fill" style="width:${this.game.heat}%"></div></div>
        <div class="game-meta">
          <span class="level">${level.toUpperCase()}</span>
          <span>Éjaculations : \( {this.game.orgasmsDone}/ \){this.game.targetOrgasms}</span>
        </div>
      </div>

      <div class="gage-card">
        <div class="gage-label">${gage.isOrgasm ? 'ÉJACULATION' : 'Gage pour ' + this.state.names[loser]}</div>
        <p class="gage-text">${gage.text}</p>
        ${timerHtml}
      </div>

      <button class="btn btn-primary" id="btn-gage-done" ${gage.duration ? 'disabled' : ''}>
        ${gage.isOrgasm ? 'Éjaculation terminée' : 'Gage terminé'}
      </button>
    `;

    if (gage.duration) {
      let left = gage.duration;
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

    if (gage.removeClothes) {
      this.removeRandomClothes(gage.removeClothes.who, gage.removeClothes.count);
    }

    if (gage.isOrgasm) {
      this.game.orgasmsDone++;
      this.game.recoveryTurns = 3; // 3 tours de récupération
      this.game.heat = Math.max(40, this.game.heat - 15); // on redescend un peu
    }

    document.getElementById('btn-gage-done').addEventListener('click', () => {
      this.nextTurn();
    });
  },

  createOrgasmGage() {
    const plan = this.game.orgasmPlan[this.game.orgasmsDone] || 'visage_ou_seins';
    const m = this.state.names.monsieur;
    const f = this.state.names.madame;
    const hasSwallow = this.state.acts.includes('Avaler le sperme');

    if (plan === 'vaginal') {
      return {
        text: m + ' doit jouir dans ' + f + ' (pénétration vaginale). Prenez le temps qu’il faut.',
        isOrgasm: true,
        duration: null
      };
    }
    if (plan === 'anal') {
      return {
        text: m + ' doit jouir dans ' + f + ' (pénétration anale). Allez-y doucement et prenez le temps.',
        isOrgasm: true,
        duration: null
      };
    }
    if (plan === 'buccal' || (plan === 'visage_ou_buccal' && hasSwallow)) {
      return {
        text: m + ' doit jouir dans la bouche de ' + f + '. ' + (hasSwallow ? f + ' doit goûter et avaler.' : f + ' peut choisir d’avaler ou de cracher.'),
        isOrgasm: true,
        duration: null
      };
    }
    if (plan === 'visage_ou_buccal' || plan === 'visage_ou_seins') {
      return {
        text: m + ' doit jouir sur le visage ou dans la bouche de ' + f + ' (au choix du moment).',
        isOrgasm: true,
        duration: null
      };
    }
    if (plan === 'seins_ou_entre' || plan === 'seins_ou_fesses') {
      return {
        text: m + ' doit jouir sur les seins, entre les seins ou sur les fesses de ' + f + '.',
        isOrgasm: true,
        duration: null
      };
    }

    // fallback
    return {
      text: m + ' doit jouir sur ' + f + ' (endroit au choix selon ce qui est autorisé).',
      isOrgasm: true,
      duration: null
    };
  },

  pickSmartGage(loser, winner, level) {
    const m = this.state.names.monsieur;
    const f = this.state.names.madame;
    const hasBottomLoser = this.hasBottomClothes(loser);
    const hasBottomWinner = this.hasBottomClothes(winner);
    const props = this.state.props;

    // Pendant récupération → gages plus doux
    if (this.game.recoveryTurns > 0) {
      return {
        text: this.state.names[loser] + ' caresse doucement ' + this.state.names[winner] + ' pendant 40 secondes (récupération).',
        duration: 40
      };
    }

    if (level === 'facile') {
      if (this.game.remainingClothes[loser].length > 0 || this.game.remainingClothes[winner].length > 0) {
        const who = Math.random() < 0.55 ? winner : loser;
        return {
          text: this.state.names[loser] + ' enlève un vêtement de ' + this.state.names[who] + '.',
          removeClothes: { who: who, count: 1 }
        };
      }
      return {
        text: this.state.names[loser] + ' embrasse et caresse ' + this.state.names[winner] + ' pendant 35 secondes.',
        duration: 35
      };
    }

    if (level === 'moyen') {
      if (hasBottomLoser || hasBottomWinner) {
        const who = hasBottomWinner ? winner : loser;
        return {
          text: this.state.names[loser] + ' enlève un vêtement du bas de ' + this.state.names[who] + '.',
          removeClothes: { who: who, count: 1 }
        };
      }
      if (props.length > 0 && Math.random() < 0.4) {
        const prop = props[Math.floor(Math.random() * props.length)];
        return {
          text: this.state.names[loser] + ' utilise ' + prop + ' sur ' + this.state.names[winner] + ' pendant 45 secondes.',
          duration: 45
        };
      }
      return {
        text: this.state.names[loser] + ' caresse ' + this.state.names[winner] + ' de façon de plus en plus coquine pendant 50 secondes.',
        duration: 50
      };
    }

    if (level === 'chaud') {
      if (hasBottomLoser) {
        return {
          text: this.state.names[loser] + ' enlève le dernier vêtement du bas et se touche pendant 40 secondes.',
          duration: 40,
          removeClothes: { who: loser, count: 1 }
        };
      }
      if (Math.random() < 0.4) {
        return {
          text: this.state.names[loser] + ' fait une fellation / un cunnilingus à ' + this.state.names[winner] + ' pendant 60 secondes.',
          duration: 60
        };
      }
      return {
        text: this.state.names[loser] + ' se masturbe devant ' + this.state.names[winner] + ' pendant 45 secondes.',
        duration: 45
      };
    }

// torride (mais pas encore éjaculation forcée)
    if (Math.random() < 0.5) {
      return {
        text: this.state.names[loser] + ' doit faire plaisir à ' + this.state.names[winner] + ' avec la bouche pendant 70 secondes.',
        duration: 70
      };
    }
    return {
      text: this.state.names[loser] + ' et ' + this.state.names[winner] + ' s’embrassent et se touchent intensément pendant 60 secondes.',
      duration: 60
    };
  },

  showVictory() {
    this.clear();
    this.app.innerHTML = `
      <div class="header"><h1>Vertige</h1><p>La fin</p></div>
      <div class="promise">
        <p>Vous êtes allés jusqu’au bout.</p>
        <p>\( {this.game.orgasmsDone} éjaculation \){this.game.orgasmsDone > 1 ? 's' : ''}.</p>
        <p class="signature">Vos corps ont tremblé.<br>Le jeu est terminé.</p>
      </div>
      <button class="btn btn-primary" onclick="location.reload()">Recommencer</button>
    `;
  }
};
