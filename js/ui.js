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
    soft: ['lèvres', 'cou', 'seins', 'ventre', 'intérieur des cuisses', 'fesses'],
    medium: ['seins', 'fesses', 'sexe', 'clitoris', 'gland', 'boules'],
    hard: ['sexe', 'clitoris', 'gland', 'boules', 'anus', 'gorge']
  },
  diceAction: {
    soft: ['embrasser langoureusement', 'lécher lentement', 'caresser avec les doigts', 'sucer doucement'],
    medium: ['sucer', 'lécher longuement', 'masturber lentement', 'doigter doucement', 'lécher en cercle'],
    hard: ['sucer profondément', 'masturber rapidement', 'doigter intensément', 'lécher et sucer en même temps', 'faire jouir']
  },

  init: function() {
    this.app = document.getElementById('app');
    this.showNames();
  },

  clear: function() {
    if (this.game && this.game.timeoutId) {
      clearTimeout(this.game.timeoutId);
      this.game.timeoutId = null;
    }
    this.app.innerHTML = '';
    window.scrollTo(0, 0);
  },

  // ========== SETUP ==========
  showNames: function() {
    this.clear();
    this.app.innerHTML =
      '<div class="header"><h1>Vertige</h1><p>Vos prénoms pour ce soir</p></div>' +
      '<div class="form-container">' +
        '<div class="input-group"><label>Monsieur</label>' +
        '<input type="text" id="name-monsieur" placeholder="Son prénom" autocomplete="off"></div>' +
        '<div class="input-group"><label>Madame</label>' +
        '<input type="text" id="name-madame" placeholder="Son prénom" autocomplete="off"></div>' +
        '<button class="btn btn-primary mt" id="btn-names">Continuer</button>' +
      '</div>';

    var self = this;
    document.getElementById('btn-names').addEventListener('click', function() {
      var m = document.getElementById('name-monsieur').value.trim();
      var f = document.getElementById('name-madame').value.trim();
      if (!m || !f) { alert('Les deux prénoms sont nécessaires.'); return; }
      self.state.names.monsieur = m;
      self.state.names.madame = f;
      self.showProps();
    });
  },

  showProps: function() {
    this.clear();
    var html = '';
    for (var i = 0; i < this.availableProps.length; i++) {
      html += '<label class="check-item"><input type="checkbox" value="' + this.availableProps[i] + '"><span>' + this.availableProps[i] + '</span></label>';
    }
    this.app.innerHTML =
      '<div class="header"><h1>Vertige</h1><p>Ce que vous avez à disposition</p>' +
      '<span class="small">Cochez uniquement ce qui est réellement à portée de main.</span></div>' +
      '<div class="check-list">' + html + '</div>' +
      '<button class="btn btn-primary" id="btn-props">Continuer</button>';

    var self = this;
    document.getElementById('btn-props').addEventListener('click', function() {
      var checked = document.querySelectorAll('.check-list input:checked');
      self.state.props = [];
      for (var i = 0; i < checked.length; i++) self.state.props.push(checked[i].value);
      self.showActs();
    });
  },

  showActs: function() {
    this.clear();
    var html = '';
    for (var i = 0; i < this.availableActs.length; i++) {
      html += '<label class="check-item"><input type="checkbox" value="' + this.availableActs[i] + '" checked><span>' + this.availableActs[i] + '</span></label>';
    }
    this.app.innerHTML =
      '<div class="header"><h1>Vertige</h1><p>Ce qui est autorisé ce soir</p>' +
      '<span class="small">Retirez seulement ce que vous refusez clairement.</span></div>' +
      '<div class="check-list">' + html + '</div>' +
      '<button class="btn btn-primary" id="btn-acts">Continuer</button>';

    var self = this;
    document.getElementById('btn-acts').addEventListener('click', function() {
      var checked = document.querySelectorAll('.check-list input:checked');
      self.state.acts = [];
      for (var i = 0; i < checked.length; i++) self.state.acts.push(checked[i].value);
      self.showClothes();
    });
  },

  showClothes: function() {
    this.clear();
    var self = this;
    function makeList(list) {
      var html = '';
      for (var i = 0; i < list.length; i++) {
        html += '<label class="check-item small"><input type="checkbox" value="' + list[i] + '"><span>' + list[i] + '</span></label>';
      }
      return html;
    }
    this.app.innerHTML =
      '<div class="header"><h1>Vertige</h1><p>Votre tenue actuelle</p><span class="small">Le jeu s’en servira.</span></div>' +
      '<div class="clothes-grid">' +
        '<div><h3>' + this.state.names.monsieur + '</h3><div class="check-list" id="clothes-m">' + makeList(this.clothesMonsieur) + '</div></div>' +
        '<div><h3>' + this.state.names.madame + '</h3><div class="check-list" id="clothes-f">' + makeList(this.clothesMadame) + '</div></div>' +
      '</div>' +
      '<button class="btn btn-primary" id="btn-clothes">Continuer</button>';

    document.getElementById('btn-clothes').addEventListener('click', function() {
      var mC = document.querySelectorAll('#clothes-m input:checked');
      var fC = document.querySelectorAll('#clothes-f input:checked');
      self.state.clothes.monsieur = [];
      self.state.clothes.madame = [];
      for (var i = 0; i < mC.length; i++) self.state.clothes.monsieur.push(mC[i].value);
      for (var i = 0; i < fC.length; i++) self.state.clothes.madame.push(fC[i].value);
      self.showPromise();
    });
  },

  showPromise: function() {
    this.clear();
    this.app.innerHTML =
      '<div class="header"><h1>Vertige</h1><p>Le seuil</p></div>' +
      '<div class="promise">' +
        '<p>' + this.state.names.monsieur + ' et ' + this.state.names.madame + '.</p>' +
        '<p>Ce soir, vous ne jouez pas.<br>Vous vous abandonnez.</p>' +
        '<p>Vous avancez jusqu’au bout.<br>Vous ne trichez pas.<br>Vous n’interrompez pas.</p>' +
        '<p>C’est <strong>Vertige</strong> qui décidera<br>quand vos corps auront assez tremblé.</p>' +
        '<p class="signature">Vous vous donnez l’un à l’autre.<br>Et au jeu.</p>' +
      '</div>' +
      '<button class="btn btn-primary" id="btn-start">Nous franchissons le seuil</button>';

    var self = this;
    document.getElementById('btn-start').addEventListener('click', function() {
      self.startGame();
    });
  },

  // ========== JEU ==========
  startGame: function() {
    var hasVaginal = this.state.acts.indexOf('Pénétration vaginale') !== -1;
    var hasAnal = this.state.acts.indexOf('Pénétration anale') !== -1;
    var hasSwallow = this.state.acts.indexOf('Avaler le sperme') !== -1;

    var plan = [];
    plan.push(hasSwallow ? 'buccal' : 'visage_ou_buccal');
    plan.push('seins');
    if (hasVaginal) plan.push('vaginal');
    else if (hasAnal) plan.push('anal');
    else plan.push('seins_ou_fesses');

    this.game = {
      intensity: 0,
      currentPlayer: Math.random() < 0.5 ? 'monsieur' : 'madame',
      remainingClothes: {
        monsieur: this.state.clothes.monsieur.slice(),
        madame: this.state.clothes.madame.slice()
      },
      gagesCount: { monsieur: 0, madame: 0 },
      totalGages: 0,
      orgasmsDone: 0,
      orgasmPlan: plan,
      recoveryTurns: 0,
      ongoingGage: null,
      streak: { monsieur: 0, madame: 0 },
      lastSuccess: null,
      paused: false,
      turnActive: false,
      timeoutId: null,
      startTime: Date.now()
    };

    this.nextTurn();
  },

  renderStatusBar: function() {
    var m = this.game.remainingClothes.monsieur;
    var f = this.game.remainingClothes.madame;
    var pct = Math.min(100, Math.round(this.game.intensity * 16.6));
    var mClothes = m.length ? m.slice(0, 3).join(', ') + (m.length > 3 ? '…' : '') : 'Nu';
    var fClothes = f.length ? f.slice(0, 3).join(', ') + (f.length > 3 ? '…' : '') : 'Nue';

    var dots = '';
    for (var i = 1; i <= 3; i++) {
      dots += '<span class="ejac-dot' + (i <= this.game.orgasmsDone ? ' done' : '') + '">' + i + '</span>';
    }

    return '' +
      '<div class="status-bar">' +
        '<div class="status-col">' +
          '<div class="status-name">' + this.state.names.monsieur + '</div>' +
          '<div class="status-gages">' + this.game.gagesCount.monsieur + ' gage' + (this.game.gagesCount.monsieur > 1 ? 's' : '') + '</div>' +
          '<div class="status-clothes">' + mClothes + '</div>' +
        '</div>' +
        '<div class="status-center">' +
          '<div class="intensity-bar"><div class="intensity-fill" style="width:' + pct + '%"></div></div>' +
          '<div class="ejac-dots">' + dots + '</div>' +
        '</div>' +
        '<div class="status-col">' +
          '<div class="status-name">' + this.state.names.madame + '</div>' +
          '<div class="status-gages">' + this.game.gagesCount.madame + ' gage' + (this.game.gagesCount.madame > 1 ? 's' : '') + '</div>' +
          '<div class="status-clothes">' + fClothes + '</div>' +
        '</div>' +
      '</div>';
  },

  getTimer: function(q) {
    var base = q.timer || [14, 22];
    var min = base[0], max = base[1];
    var minutes = (Date.now() - this.game.startTime) / 60000;

    if (minutes > 40) { min = Math.max(9, min - 2); max = Math.max(15, max - 3); }
    if (minutes > 80) { min = Math.max(8, min - 2); max = Math.max(13, max - 3); }
    if (this.game.intensity >= 4) { min = Math.max(7, min - 1); max = Math.max(12, max - 2); }
    if (this.game.recoveryTurns > 0) { min += 6; max += 8; }

    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  nextTurn: function() {
    if (this.game.orgasmsDone >= 3) {
      this.showVictory();
      return;
    }
    if (this.game.recoveryTurns > 0) this.game.recoveryTurns--;

    this.game.currentPlayer = this.game.currentPlayer === 'monsieur' ? 'madame' : 'monsieur';
    var player = this.game.currentPlayer;
    var name = this.state.names[player];

    // Événements aléatoires (après un minimum d'intensité)
    var eventRoll = Math.random();
    if (this.game.intensity > 1.0 && eventRoll < 0.07) {
      this.showDiceEvent(player);
      return;
    }
    if (this.game.intensity > 1.4 && eventRoll < 0.12) {
      this.showBoardGameEvent(player);
      return;
    }
    if (this.game.intensity > 1.8 && eventRoll < 0.16) {
      this.showRPS(player);
      return;
    }
    if (this.game.intensity > 2.2 && eventRoll < 0.19) {
      this.showDiceDuel(player);
      return;
    }

    var force = this.game.intensity >= 4.0 && Math.random() < 0.20;
    var q = this.getRandomQuestion(force);
    var duration = this.getTimer(q);

    this.clear();
    var ongoing = this.game.ongoingGage ? '<div class="ongoing">' + this.game.ongoingGage + '</div>' : '';

    this.app.innerHTML =
      ongoing +
      '<div class="player-turn">À toi <strong>' + name + '</strong></div>' +
      '<div class="question-card">' +
        '<p class="question-text">' + q.text + '</p>' +
        (q.type === 'list' ? '<p class="question-hint">Au moins ' + q.count + ' réponses</p>' : '') +
        (q.type === 'fetch' ? '<p class="question-hint">Tu peux te lever</p>' : '') +
        (q.type === 'draw' ? '<p class="question-hint">Dessine puis buzz</p>' : '') +
      '</div>' +
      '<div class="buzz-zone">' +
        '<p class="buzz-hint">' + (force ? 'PRESSION • Réponds vite' : 'Réponds puis buzz') + '</p>' +
        '<button class="btn btn-primary btn-buzz" id="btn-buzz">BUZZ</button>' +
        '<button class="btn btn-pause" id="btn-pause">Pause</button>' +
      '</div>' +
      this.renderStatusBar();

    var self = this;
    this.game.paused = false;
    this.game.turnActive = true;
    this.game.remainingTime = duration;
    this.game.turnStart = Date.now();

    this.game.timeoutId = setTimeout(function() {
      if (self.game.turnActive && !self.game.paused) {
        self.game.timeoutId = null;
        self.game.turnActive = false;
        self.onFail(player);
      }
    }, duration * 1000);

    document.getElementById('btn-buzz').addEventListener('click', function() {
      if (!self.game.turnActive || self.game.paused) return;
      if (self.game.timeoutId) {
        clearTimeout(self.game.timeoutId);
        self.game.timeoutId = null;
      }
      self.game.turnActive = false;

      // Progression très lente sur les succès
      self.game.intensity = Math.min(6, self.game.intensity + (force ? 0.06 : 0.035));

      // Streak
      if (self.game.lastSuccess === player) {
        self.game.streak[player]++;
      } else {
        self.game.streak[player] = 1;
        self.game.streak[player === 'monsieur' ? 'madame' : 'monsieur'] = 0;
      }
      self.game.lastSuccess = player;

      // 3 victoires d'affilée → l'autre prend un gage
      if (self.game.streak[player] >= 3) {
        self.game.streak[player] = 0;
        var other = player === 'monsieur' ? 'madame' : 'monsieur';
        self.showGage(other);
        return;
      }

      self.nextTurn();
    });

    document.getElementById('btn-pause').addEventListener('click', function() {
      var btn = document.getElementById('btn-pause');
      if (!self.game.paused) {
        self.game.paused = true;
        btn.textContent = 'Reprendre';
        var elapsed = (Date.now() - self.game.turnStart) / 1000;
        self.game.remainingTime = Math.max(3, self.game.remainingTime - elapsed);
        if (self.game.timeoutId) {
          clearTimeout(self.game.timeoutId);
          self.game.timeoutId = null;
        }
      } else {
        self.game.paused = false;
        btn.textContent = 'Pause';
        self.game.turnStart = Date.now();
        self.game.timeoutId = setTimeout(function() {
          if (self.game.turnActive && !self.game.paused) {
            self.game.timeoutId = null;
            self.game.turnActive = false;
            self.onFail(player);
          }
        }, self.game.remainingTime * 1000);
      }
    });
  },

  onFail: function(loser) {
    this.game.gagesCount[loser]++;
    this.game.totalGages++;
    this.game.intensity = Math.min(6, this.game.intensity + 0.18);
    this.game.streak.monsieur = 0;
    this.game.streak.madame = 0;
    this.game.lastSuccess = null;
    this.game.ongoingGage = null;
    this.showGage(loser);
  },

  // ========== GAGES ==========
  showGage: function(loser) {
    var winner = loser === 'monsieur' ? 'madame' : 'monsieur';
    var intensity = this.game.intensity;
    var self = this;
    var totalG = this.game.totalGages;

    // Éjaculation uniquement si assez de gages sont passés
    var shouldOrgasm = false;
    if (this.game.orgasmsDone === 0 && totalG >= 6 && intensity >= 3.4 && Math.random() < 0.38) shouldOrgasm = true;
    if (this.game.orgasmsDone === 1 && totalG >= 12 && intensity >= 4.4 && Math.random() < 0.42) shouldOrgasm = true;
    if (this.game.orgasmsDone === 2 && totalG >= 18 && intensity >= 5.2 && Math.random() < 0.48) shouldOrgasm = true;

    var text = '', isOrgasm = false, isOngoing = false, duration = null;

    if (shouldOrgasm) {
      text = this.fill(this.pickOrgasm(), loser, winner);
      isOrgasm = true;
    } else if (this.game.recoveryTurns > 0) {
      text = this.fill(this.pickFrom(GAGES.recovery), loser, winner);
      duration = 50;
    } else {
      var raw = this.pickSmartGage(loser, intensity);
      text = this.fill(raw, loser, winner);
      isOngoing = raw.indexOf('jusqu’à la prochaine perte') !== -1 || raw.indexOf("jusqu'à la prochaine perte") !== -1;
      duration = isOngoing ? null : this.getGageDuration(intensity);
    }

    this.clear();
    var readyBtn = duration ? '<button class="btn btn-primary" id="btn-ready">Je suis prêt(e) — Lancer le chrono</button>' : '';
    var doneLabel = isOrgasm ? 'Éjaculation terminée' : 'Gage terminé';

    this.app.innerHTML =
      '<div class="gage-card">' +
        '<div class="gage-label">' + (isOrgasm ? 'ÉJACULATION' : 'Gage') + '</div>' +
        '<p class="gage-text">' + text + '</p>' +
        '<div id="timer-box"></div>' +
      '</div>' +
      readyBtn +
      '<button class="btn btn-primary" id="btn-done" ' + (duration ? 'disabled' : '') + '>' + doneLabel + '</button>' +
      this.renderStatusBar();

    if (duration) {
      document.getElementById('btn-ready').addEventListener('click', function() {
        document.getElementById('btn-ready').style.display = 'none';
        document.getElementById('timer-box').innerHTML = '<div class="gage-timer" id="gage-timer">' + duration + 's</div>';
        var left = duration;
        var iv = setInterval(function() {
          left--;
          var el = document.getElementById('gage-timer');
          if (el) el.textContent = left + 's';
          if (left <= 0) {
            clearInterval(iv);
            var btn = document.getElementById('btn-done');
            if (btn) btn.disabled = false;
          }
        }, 1000);
      });
    }

    if (isOngoing) this.game.ongoingGage = text;

    if (isOrgasm) {
      this.game.orgasmsDone++;
      this.game.recoveryTurns = 5;
      this.game.intensity = Math.max(2.0, this.game.intensity - 1.4);
    }

    document.getElementById('btn-done').addEventListener('click', function() {
      self.nextTurn();
    });
  },

  // ========== ÉVÉNEMENTS ==========
  showDiceEvent: function(player) {
    var self = this;
    var other = player === 'monsieur' ? 'madame' : 'monsieur';

    this.clear();
    this.app.innerHTML =
      '<div class="player-turn">Événement</div>' +
      '<div class="question-card"><p class="question-text">Lancer les dés</p><p class="question-hint">Appuie pour lancer</p></div>' +
      '<button class="btn btn-primary" id="btn-roll">Lancer les dés</button>' +
      this.renderStatusBar();

    document.getElementById('btn-roll').addEventListener('click', function() {
      var intensity = self.game.intensity;
      var bodyP = intensity < 2.5 ? self.diceBody.soft : (intensity < 4.2 ? self.diceBody.medium : self.diceBody.hard);
      var actP = intensity < 2.5 ? self.diceAction.soft : (intensity < 4.2 ? self.diceAction.medium : self.diceAction.hard);
      var body = bodyP[Math.floor(Math.random() * bodyP.length)];
      var act = actP[Math.floor(Math.random() * actP.length)];
      var text = self.state.names[player] + ' doit ' + act + ' ' + body + ' de ' + self.state.names[other] + ' pendant 50 secondes.';

      self.clear();
      self.app.innerHTML =
        '<div class="gage-card"><div class="gage-label">DÉS</div><p class="gage-text">' + text + '</p></div>' +
        '<button class="btn btn-primary" id="btn-dice-done">Gage terminé</button>' +
        self.renderStatusBar();

      document.getElementById('btn-dice-done').addEventListener('click', function() {
        self.game.gagesCount[player]++;
        self.game.totalGages++;
        self.game.intensity = Math.min(6, self.game.intensity + 0.12);
        self.nextTurn();
      });
    });
  },

  showBoardGameEvent: function(player) {
    var self = this;
    var games = ['Uno', 'Skyjo', 'Puissance 4', 'un jeu de cartes', 'un jeu de société'];
    var gameName = games[Math.floor(Math.random() * games.length)];

    this.clear();
    this.app.innerHTML =
      '<div class="player-turn">Événement</div>' +
      '<div class="question-card"><p class="question-text">Faites une partie de ' + gameName + '</p>' +
      '<p class="question-hint">Quand c’est fini, indiquez qui a gagné</p></div>' +
      '<button class="btn btn-primary" id="btn-win-m">' + this.state.names.monsieur + ' a gagné</button>' +
      '<button class="btn btn-primary" id="btn-win-f" style="margin-top:0.6rem">' + this.state.names.madame + ' a gagné</button>' +
      this.renderStatusBar();

    function finish(winner) {
      var loser = winner === 'monsieur' ? 'madame' : 'monsieur';
      self.showGage(loser);
    }

    document.getElementById('btn-win-m').addEventListener('click', function() { finish('monsieur'); });
    document.getElementById('btn-win-f').addEventListener('click', function() { finish('madame'); });
  },

  showRPS: function(player) {
    var self = this;
    var score = { monsieur: 0, madame: 0 };
    var round = 1;

    function render() {
      self.clear();
      self.app.innerHTML =
        '<div class="header"><h1>Pierre • Feuille • Ciseaux</h1><p>Manche ' + round + ' — Premier à 3</p></div>' +
        '<div class="rps-score">' + self.state.names.monsieur + ' ' + score.monsieur + ' — ' + score.madame + ' ' + self.state.names.madame + '</div>' +
        '<div class="rps-buttons">' +
          '<button class="btn btn-primary rps-btn" data-choice="pierre">Pierre</button>' +
          '<button class="btn btn-primary rps-btn" data-choice="feuille">Feuille</button>' +
          '<button class="btn btn-primary rps-btn" data-choice="ciseaux">Ciseaux</button>' +
        '</div>' +
        self.renderStatusBar();

      var btns = document.querySelectorAll('.rps-btn');
      for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', function() {
          var pChoice = this.getAttribute('data-choice');
          var choices = ['pierre', 'feuille', 'ciseaux'];
          var oChoice = choices[Math.floor(Math.random() * 3)];
          var winner = null;

          if (pChoice !== oChoice) {
            if ((pChoice === 'pierre' && oChoice === 'ciseaux') ||
                (pChoice === 'feuille' && oChoice === 'pierre') ||
                (pChoice === 'ciseaux' && oChoice === 'feuille')) {
              winner = player;
            } else {
              winner = player === 'monsieur' ? 'madame' : 'monsieur';
            }
          }

          if (winner) score[winner]++;

          if (score.monsieur >= 3 || score.madame >= 3) {
            var loser = score.monsieur >= 3 ? 'madame' : 'monsieur';
            self.showGage(loser);
          } else {
            round++;
            render();
          }
        });
      }
    }
    render();
  },

  showDiceDuel: function(player) {
    var self = this;
    var round = 1;
    var maxRound = 3;

    function playRound() {
      self.clear();
      self.app.innerHTML =
        '<div class="player-turn">Duel de dés — Round ' + round + '/' + maxRound + '</div>' +
        '<div class="question-card"><p class="question-text">Lancez chacun un dé</p><p class="question-hint">Le plus haut chiffre gagne</p></div>' +
        '<button class="btn btn-primary" id="btn-roll-duel">Lancer les dés</button>' +
        self.renderStatusBar();

      document.getElementById('btn-roll-duel').addEventListener('click', function() {
        var d1 = Math.floor(Math.random() * 6) + 1;
        var d2 = Math.floor(Math.random() * 6) + 1;
        var loser;

        if (d1 === d2) {
          // égalité → on relance
          playRound();
          return;
        }

        // Pour simplifier : le joueur actuel est d1
        loser = d1 > d2 ? (player === 'monsieur' ? 'madame' : 'monsieur') : player;

        var level = round === 1 ? 'soft' : (round === 2 ? 'medium' : 'hard');
        var text = '';

        if (level === 'soft') {
          text = self.state.names[loser] + ' doit embrasser et caresser ' + self.state.names[loser === 'monsieur' ? 'madame' : 'monsieur'] + ' pendant 40 secondes.';
        } else if (level === 'medium') {
          text = self.state.names[loser] + ' doit faire une fellation / un cunnilingus lent pendant 60 secondes.';
        } else {
          text = self.state.names[loser] + ' doit faire un 69 pendant 90 secondes.';
        }

        self.clear();
        self.app.innerHTML =
          '<div class="gage-card"><div class="gage-label">Round ' + round + '</div><p class="gage-text">' + text + '</p></div>' +
          '<button class="btn btn-primary" id="btn-round-done">Gage terminé</button>' +
          self.renderStatusBar();

        document.getElementById('btn-round-done').addEventListener('click', function() {
          self.game.gagesCount[loser]++;
          self.game.totalGages++;
          self.game.intensity = Math.min(6, self.game.intensity + 0.15);
          if (round >= maxRound) {
            self.nextTurn();
          } else {
            round++;
            playRound();
          }
        });
      });
    }
    playRound();
  },

  // ========== HELPERS ==========
  pickSmartGage: function(loser, intensity) {
    var isF = loser === 'madame';
    if (intensity < 1.8) return this.pickFrom(GAGES.soft);
    if (intensity < 2.8) return this.pickFrom(GAGES.tease);
    if (intensity < 3.7) return this.pickFrom(GAGES.touch);
    if (intensity < 4.6) return this.pickFrom(isF ? GAGES.oral_f : GAGES.oral_m);
    if (Math.random() < 0.28) return this.pickFrom(GAGES.ongoing);
    return this.pickFrom(GAGES.heavy);
  },

  pickOrgasm: function() {
    var p = this.game.orgasmPlan[this.game.orgasmsDone] || 'visage_ou_buccal';
    if (p === 'buccal') return GAGES.orgasm[0];
    if (p === 'visage_ou_buccal') return Math.random() < 0.5 ? GAGES.orgasm[0] : GAGES.orgasm[1];
    if (p === 'seins') return Math.random() < 0.5 ? GAGES.orgasm[2] : GAGES.orgasm[3];
    if (p === 'vaginal') return GAGES.orgasm[4];
    if (p === 'anal') return GAGES.orgasm[5];
    return GAGES.orgasm[Math.floor(Math.random() * GAGES.orgasm.length)];
  },

  pickFrom: function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },

  fill: function(tpl, loser, winner) {
    var t = tpl;
    t = t.replace(/{loser}/g, this.state.names[loser]);
    t = t.replace(/{winner}/g, this.state.names[winner]);
    t = t.replace(/{monsieur}/g, this.state.names.monsieur);
    t = t.replace(/{madame}/g, this.state.names.madame);
    var prop = this.state.props.length ? this.state.props[Math.floor(Math.random() * this.state.props.length)] : 'un objet';
    t = t.replace(/{prop}/g, prop);
    var sw = this.state.acts.indexOf('Avaler le sperme') !== -1 ? 'doit goûter et avaler' : 'peut recracher';
    t = t.replace(/{swallow}/g, sw);
    return t;
  },

  getGageDuration: function(i) {
    if (i < 2) return 40;
    if (i < 3.5) return 55;
    if (i < 4.8) return 70;
    return 85;
  },

  getRandomQuestion: function(force) {
    var level = force ? 'torride' :
      this.game.intensity < 1.8 ? 'facile' :
      this.game.intensity < 3.3 ? 'moyen' :
      this.game.intensity < 4.7 ? 'chaud' : 'torride';
    var pool = (typeof QUESTIONS !== 'undefined' && QUESTIONS[level]) ? QUESTIONS[level] : QUESTIONS.facile;
    return pool[Math.floor(Math.random() * pool.length)];
  },

  showVictory: function() {
    this.clear();
    this.app.innerHTML =
      '<div class="header"><h1>Vertige</h1><p>La fin</p></div>' +
      '<div class="promise">' +
        '<p>Vous êtes allés jusqu’au bout.</p>' +
        '<p>3 éjaculations.</p>' +
        '<p class="signature">Vos corps ont tremblé.<br>Le jeu est terminé.</p>' +
      '</div>' +
      '<button class="btn btn-primary" onclick="location.reload()">Recommencer</button>';
  }
};
