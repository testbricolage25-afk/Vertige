const QUESTIONS = {
  // ====================== FACILE ======================
  facile: [
    // Couple
    { type: "open", text: "Quel est mon plat préféré ?", timer: [18, 28] },
    { type: "open", text: "Quelle est ma plus grande peur ?", timer: [18, 28] },
    { type: "open", text: "Où nous sommes-nous embrassés pour la première fois ?", timer: [16, 25] },
    { type: "open", text: "Quel est mon film préféré ?", timer: [15, 25] },
    { type: "open", text: "Quelle est ma chanson du moment ?", timer: [15, 24] },
    { type: "open", text: "Quel est mon rêve de voyage ?", timer: [18, 28] },
    { type: "open", text: "Quelle est ma plus grande qualité selon toi ?", timer: [16, 26] },

    // Culture / fun
    { type: "list", text: "Cite 4 films Marvel", count: 4, timer: [18, 28] },
    { type: "list", text: "Donne 5 fruits", count: 5, timer: [16, 25] },
    { type: "list", text: "Cite 4 marques de voiture", count: 4, timer: [15, 24] },
    { type: "list", text: "Nomme 5 choses qu’on trouve dans une cuisine", count: 5, timer: [16, 26] },
    { type: "list", text: "Donne 4 sports", count: 4, timer: [14, 22] },
    { type: "open", text: "Combien font 8 × 7 ?", timer: [10, 16] },
    { type: "open", text: "Quelle est la capitale de l’Espagne ?", timer: [10, 16] },

    // Fetch
    { type: "fetch", text: "Va chercher un verre d’eau et ramène-le", timer: [35, 55] },
    { type: "fetch", text: "Va chercher un oreiller", timer: [30, 50] },
    { type: "fetch", text: "Va chercher une serviette", timer: [30, 50] },
  ],

  // ====================== MOYEN ======================
  moyen: [
    { type: "open", text: "Quelle est la chose que je n’ai jamais osé te dire ?", timer: [20, 32] },
    { type: "open", text: "Quel est mon plus gros fantasme que tu connais ?", timer: [18, 30] },
    { type: "open", text: "Où aimerais-tu qu’on fasse l’amour un jour ?", timer: [18, 28] },
    { type: "open", text: "Quelle partie de mon corps tu préfères toucher ?", timer: [16, 26] },
    { type: "open", text: "Quel est mon plus grand complexe ?", timer: [18, 28] },
    { type: "open", text: "Si on avait une soirée libre demain, que voudrais-tu faire ?", timer: [18, 30] },

    { type: "list", text: "Cite 5 films de super-héros", count: 5, timer: [20, 32] },
    { type: "list", text: "Donne 6 mots qui commencent par S", count: 6, timer: [18, 28] },
    { type: "list", text: "Nomme 5 endroits du corps où on peut embrasser", count: 5, timer: [16, 26] },
    { type: "list", text: "Cite 4 acteurs français connus", count: 4, timer: [16, 26] },
    { type: "list", text: "Donne 5 choses qu’on peut faire avec de la chantilly", count: 5, timer: [18, 28] },

    { type: "fetch", text: "Va chercher un glaçon", timer: [35, 55] },
    { type: "fetch", text: "Va chercher un objet qui peut servir de sextoy improvisé", timer: [40, 65] },
    { type: "fetch", text: "Va chercher quelque chose de rouge", timer: [30, 50] },
  ],

  // ====================== CHAUD ======================
  chaud: [
    { type: "open", text: "Décris en détail la dernière fois où tu as vraiment joui à cause de moi.", timer: [22, 35] },
    { type: "open", text: "Quelle position tu aimerais qu’on teste ce soir ?", timer: [18, 28] },
    { type: "open", text: "Qu’est-ce qui te rend le plus excité(e) chez moi ?", timer: [16, 26] },
    { type: "open", text: "As-tu déjà fantasmé sur quelqu’un d’autre en pensant à moi ?", timer: [18, 28] },
    { type: "open", text: "Quelle phrase coquine tu aimerais m’entendre dire ?", timer: [16, 26] },
    { type: "open", text: "Où aimerais-tu que je te touche en premier ce soir ?", timer: [15, 25] },

    { type: "list", text: "Cite 6 endroits où on peut faire l’amour en dehors de la chambre", count: 6, timer: [20, 32] },
    { type: "list", text: "Donne 5 mots très coquins", count: 5, timer: [16, 26] },
    { type: "list", text: "Nomme 5 choses qui peuvent servir de sextoy", count: 5, timer: [18, 28] },
    { type: "list", text: "Cite 4 positions sexuelles", count: 4, timer: [15, 25] },

    { type: "fetch", text: "Va chercher le lubrifiant ou un équivalent", timer: [35, 55] },
    { type: "fetch", text: "Va chercher quelque chose avec lequel on peut me bander les yeux", timer: [35, 55] },
  ],

  // ====================== TORRIDE ======================
  torride: [
    { type: "open", text: "Décris exactement ce que tu veux que je te fasse dans les 10 prochaines minutes.", timer: [22, 35] },
    { type: "open", text: "Quelle est la chose la plus sale que tu aimerais qu’on fasse ensemble ?", timer: [20, 32] },
    { type: "open", text: "Si je te donnais un ordre très coquin maintenant, lequel accepterais-tu sans hésiter ?", timer: [18, 28] },
    { type: "open", text: "As-tu déjà joui en pensant à moi pendant que tu te touchais ?", timer: [16, 26] },
    { type: "open", text: "Dis-moi la position dans laquelle tu aimerais me voir te prendre / te dominer.", timer: [18, 28] },
    { type: "open", text: "Décris comment tu aimerais me faire jouir ce soir.", timer: [20, 32] },

    { type: "list", text: "Cite 7 mots très coquins", count: 7, timer: [18, 28] },
    { type: "list", text: "Donne 5 endroits de mon corps où tu aimerais jouir", count: 5, timer: [16, 26] },
    { type: "list", text: "Nomme 4 endroits où tu aimerais que je jouisse", count: 4, timer: [15, 25] },
  ]
};
