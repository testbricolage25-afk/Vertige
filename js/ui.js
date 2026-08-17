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

  timerRanges: {
    rapide:   { facile: [12, 22], moyen: [10, 18], chaud: [8, 15],  torride: [6, 12] },
    pose:     { facile: [18, 32], moyen: [15, 26], chaud: [12, 22], torride: [9, 16] },
    marathon: { facile: [22, 40], moyen: [18, 32], chaud: [14, 26], torride: [10, 18] }
  },

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
          <div class="duration">≈ 20 – 30 minutes • 1 orgasm</div>
          <p>Pression rapide. On ne traîne pas.</p>
        </div>
        <div class="mode-card" data-mode="pose">
          <h2>Posé</h2>
          <div class="duration">≈ 45 – 70 minutes • 2 orgasmes</div>
          <p>On prend le temps. La chaleur s’installe.</p>
        </div>
        <div class="mode-card" data-mode="marathon">
          <h2>Marathon</h2>
          <div class="duration">≈ 1h30 et plus • 3 orgasmes</div>
          <p>Longue descente. On ne revient pas indemne.</p>
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

  startGame() {
    const targetOrgasms = { rapide: 1, pose: 2, marathon: 3 }[this.state.mode];

    this.game = {
      heat: 0,
      fails: 0,
      questionsAsked: 0,
      currentPlayer: Math.random() < 0.5 ? 'monsieur' : 'madame',
      remainingClothes: {
        monsieur: [...this.state.clothes.monsieur],
        madame: [...this.state.clothes.madame]
      },
      activeEffects: [],
      orgasms: { monsieur: 0, madame: 0 },
      targetOrgasms,
      timeoutId: null
    };

    this.nextTurn();
  },

  getHeatLevel() {
    if (this.game.heat < 22) return 'facile';
    if (this.game.heat < 48) return 'moyen';
    if (this.game.heat < 75) return 'chaud';
    return 'torride';
  },

  increaseHeat(n) {
    n = n || 5;
    this.game.heat = Math.min(100, this.game.heat + n);
  },

  hasBottomClothes(who) {
    const bottoms = ['Caleçon', 'Culotte / String', 'Lingerie une pièce', 'Short', 'Pantalon', 'Jupe', 'Robe', 'Maillot de bain', 'Maillot 1 pièce', 'Maillot 2 pièces', 'Collant'];
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
    const level = this.getHeatLevel();
    const pool = (typeof QUESTIONS !== 'undefined' && QUESTIONS[level]) ? QUESTIONS[level] : [{ type: "open", text: "Décris ce que tu ressens en ce moment." }];
    return pool[Math.floor(Math.random() * pool.length)];
  },

  getRandomDuration(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  nextTurn() {
    const totalOrgasms = this.game.orgasms.monsieur + this.game.orgasms.madame;
    if (totalOrgasms >= this.game.targetOrgasms) {
      return this.showVictory();
    }

    this.game.questionsAsked++;
    this.game.currentPlayer = this.game.currentPlayer === 'monsieur' ? 'madame' : 'monsieur';
    const player = this.game.currentPlayer;
    const playerName = this.state.names[player];
    const question = this.getRandomQuestion();
    const level = this.getHeatLevel();
    const range = this.timerRanges[this.state.mode][level];
    const duration = this.getRandomDuration(range[0], range[1]);

    this.clear();
    this.app.innerHTML = `
      <div class="game-header">
        <div class="heat-bar"><div class="heat-fill" style="width:${this.game.heat}%"></div></div>
        <div class="game-meta">
          <span class="level">${level.toUpperCase()}</span>
          <span>Orgasmes : \( {totalOrgasms}/ \){this.game.targetOrgasms}</span>
        </div>
      </div>

      <div class="player-turn">À toi <strong>${playerName}</strong></div>

      <div class="question-card">
        <p class="question-text">${question.text}</p>
        ${question.type === 'list' ? '<p class="question-hint">Au moins ' + question.count + ' réponses</p>' : ''}
      </div>

      <div class="buzz-zone">
        <p class="buzz-hint">Réponds… puis buzz avant que ça sonne</p>
        <button class="btn btn-primary btn-buzz" id="btn-buzz">BUZZ</button>
      </div>

      <div class="clothes-status">
        <div><strong>\( {this.state.names.monsieur}</strong><br> \){this.game.remainingClothes.monsieur.length} vêtements</div>
        <div><strong>\( {this.state.names.madame}</strong><br> \){this.game.remainingClothes.madame.length} vêtements</div>
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
        this.increaseHeat(3);
        this.nextTurn();
      }
    });
  },

  onFail(loser) {
    this.game.fails++;
    this.increaseHeat(9);
    this.showGage(loser);
  },

  showGage(loser) {
    const winner = loser === 'monsieur' ? 'madame' : 'monsieur';
    const level = this.getHeatLevel();
    const gage = this.pickSmartGage(loser, winner, level);

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
          <span>Fautes : ${this.game.fails}</span>
        </div>
      </div>

      <div class="gage-card">
        <div class="gage-label">Gage pour ${this.state.names[loser]}</div>
        <p class="gage-text">${gage.text}</p>
        ${timerHtml}
      </div>

      <button class="btn btn-primary" id="btn-gage-done" ${gage.duration ? 'disabled' : ''}>
        ${gage.isOrgasm ? 'Orgasme terminé' : 'Gage terminé'}
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
      this.game.orgasms[gage.orgasmFor]++;
    }

    document.getElementById('btn-gage-done').addEventListener('click', () => {
      this.nextTurn();
    });
  },

  pickSmartGage(loser, winner, level) {
    const hasBottomLoser = this.hasBottomClothes(loser);
    const hasBottomWinner = this.hasBottomClothes(winner);
    const props = this.state.props;
    const acts = this.state.acts;

    if (level === 'facile') {
      if (this.game.remainingClothes[loser].length > 0 || this.game.remainingClothes[winner].length > 0) {
        const who = Math.random() < 0.6 ? winner : loser;
        return {
          text: this.state.names[loser] + ' enlève un vêtement de ' + this.state.names[who] + '.',
          removeClothes: { who: who, count: 1 }
        };
      }
      return {
        text: this.state.names[loser] + ' caresse ' + this.state.names[winner] + ' par-dessus les vêtements pendant 40 secondes.',
        duration: 40
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
        text: this.state.names[loser] + ' embrasse et caresse le corps de ' + this.state.names[winner] + ' pendant 50 secondes.',
        duration: 50
      };
    }

    if (level === 'chaud') {
      if (hasBottomLoser) {
        return {
          text: this.state.names[loser] + ' doit enlever le dernier vêtement du bas et se toucher pendant 40 secondes.',
          duration: 40,
          removeClothes: { who: loser, count: 1 }
        };
      }
      if (Math.random() < 0.45) {
        return {
          text: this.state.names[loser] + ' fait une fellation / un cunnilingus à ' + this.state.names[winner] + ' pendant 60 secondes.',
          duration: 60
        };
      }
      if (props.length > 0) {
        const prop = props[Math.floor(Math.random() * props.length)];
        return {
          text: this.state.names[loser] + ' utilise ' + prop + ' de façon très coquine sur ' + this.state.names[winner] + ' pendant 50 secondes.',
          duration: 50
        };
      }
      return {
        text: this.state.names[loser] + ' se masturbe devant ' + this.state.names[winner] + ' pendant 45 secondes.',
        duration: 45
      };
    }

    // TORRIDE
    const totalOrgasms = this.game.orgasms.monsieur + this.game.orgasms.madame;
    if (totalOrgasms < this.game.targetOrgasms && Math.random() < 0.55) {
      return {
        text: this.state.names[loser] + ' doit faire jouir ' + this.state.names[winner] + ' (avec les moyens autorisés).',
        isOrgasm: true,
        orgasmFor: winner
      };
    }

    if (acts.length > 0 && Math.random() < 0.5) {
      const acte = acts[Math.floor(Math.random() * acts.length)];
      return {
        text: this.state.names[loser] + ' et ' + this.state.names[winner] + ' pratiquent : ' + acte + ' pendant 90 secondes.',
        duration: 90
      };
    }

    return {
      text: this.state.names[loser] + ' doit faire jouir ' + this.state.names[winner] + ' avec la bouche ou les mains.',
      isOrgasm: true,
      orgasmFor: winner
    };
  },

  showVictory() {
    this.clear();
    this.app.innerHTML = `
      <div class="header"><h1>Vertige</h1><p>La fin</p></div>
      <div class="promise">
        <p>Vous êtes allés jusqu’au bout.</p>
        <p>${this.state.names.monsieur} : ${this.game.orgasms.monsieur} orgasm(s)<br>
           ${this.state.names.madame} : ${this.game.orgasms.madame} orgasm(s)</p>
        <p class="signature">Vos corps ont tremblé.<br>Le jeu est terminé.</p>
      </div>
      <button class="btn btn-primary" onclick="location.reload()">Recommencer</button>
    `;
  }
};
