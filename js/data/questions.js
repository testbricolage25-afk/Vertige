const QUESTIONS = {
  // ========== FACILE (timers courts) ==========
  facile: [
    // Hyper simples → timers très courts
    { type: "open", text: "Combien font 5 × 6 ?", timer: [5, 9] },
    { type: "open", text: "Combien font 8 × 7 ?", timer: [5, 9] },
    { type: "open", text: "Quelle est la capitale de la France ?", timer: [5, 8] },
    { type: "open", text: "Combien y a-t-il de lettres dans l’alphabet ?", timer: [5, 8] },
    { type: "open", text: "De quelle couleur est le ciel par temps clair ?", timer: [4, 7] },
    { type: "open", text: "Combien font 9 + 6 ?", timer: [4, 7] },

    // Couple (personnalisées)
    { type: "open", text: "Quel est mon plat préféré ?", timer: [11, 17] },
    { type: "open", text: "Quel est mon film préféré ?", timer: [10, 16] },
    { type: "open", text: "Quelle est ma chanson du moment ?", timer: [10, 16] },
    { type: "open", text: "Quel est mon animal préféré ?", timer: [9, 14] },
    { type: "open", text: "Quelle est ma boisson préférée ?", timer: [9, 14] },
    { type: "open", text: "Où nous sommes-nous embrassés pour la première fois ?", timer: [12, 18] },
    { type: "open", text: "Quelle est ma plus grande qualité selon toi ?", timer: [12, 18] },

    // Listes speed
    { type: "list", text: "Cite 3 fruits", count: 3, timer: [8, 13] },
    { type: "list", text: "Cite 3 couleurs", count: 3, timer: [7, 12] },
    { type: "list", text: "Donne 4 animaux", count: 4, timer: [9, 14] },
    { type: "list", text: "Cite 3 marques de voiture", count: 3, timer: [9, 14] },
    { type: "list", text: "Donne 3 sports", count: 3, timer: [8, 13] },

    // Mini-jeux
    { type: "draw", text: "Dessine un avion (simple)", timer: [12, 18] },
    { type: "draw", text: "Dessine un cœur", timer: [8, 14] },
    { type: "draw", text: "Dessine un soleil", timer: [8, 13] },
    { type: "rps", text: "Pierre-Feuille-Ciseaux", timer: [0, 0] }, // géré spécialement
  ],

  // ========== MOYEN ==========
  moyen: [
    { type: "open", text: "Quelle est la chose que je n’ai jamais osé te dire ?", timer: [14, 22] },
    { type: "open", text: "Quel est mon plus gros fantasme que tu connais ?", timer: [13, 20] },
    { type: "open", text: "Où aimerais-tu qu’on fasse l’amour un jour ?", timer: [13, 20] },
    { type: "open", text: "Quelle partie de mon corps tu préfères toucher ?", timer: [11, 17] },
    { type: "open", text: "Quel est mon plus grand complexe ?", timer: [12, 19] },
    { type: "open", text: "Décris mon corps avec 4 adjectifs.", timer: [13, 20] },
    { type: "open", text: "Quelle est la chose la plus coquine que tu aies déjà faite ?", timer: [14, 21] },
    { type: "open", text: "Qu’est-ce qui te fait le plus fondre chez moi ?", timer: [12, 18] },

    { type: "list", text: "Cite 5 films Marvel", count: 5, timer: [14, 21] },
    { type: "list", text: "Donne 5 mots qui commencent par S", count: 5, timer: [12, 18] },
    { type: "list", text: "Nomme 5 endroits du corps où on peut embrasser", count: 5, timer: [12, 18] },
    { type: "list", text: "Cite 4 positions sexuelles", count: 4, timer: [11, 17] },
    { type: "list", text: "Donne 5 mots coquins", count: 5, timer: [11, 17] },
    { type: "list", text: "Cite 4 acteurs français", count: 4, timer: [11, 17] },

    { type: "draw", text: "Dessine un sexe (simple)", timer: [14, 22] },
    { type: "draw", text: "Dessine une position sexuelle", timer: [15, 24] },
    { type: "rps", text: "Pierre-Feuille-Ciseaux", timer: [0, 0] },

    { type: "fetch", text: "Va chercher un glaçon", timer: [25, 40] },
    { type: "fetch", text: "Va chercher quelque chose de rouge", timer: [22, 36] },
  ],

  // ========== CHAUD ==========
  chaud: [
    { type: "open", text: "Décris en détail la dernière fois où tu as vraiment joui à cause de moi.", timer: [16, 25] },
    { type: "open", text: "Quelle position tu aimerais qu’on teste ce soir ?", timer: [12, 19] },
    { type: "open", text: "Qu’est-ce qui te rend le plus excité(e) chez moi ?", timer: [11, 17] },
    { type: "open", text: "Quelle phrase coquine tu aimerais m’entendre dire ?", timer: [11, 17] },
    { type: "open", text: "Où aimerais-tu que je te touche en premier ?", timer: [10, 16] },
    { type: "open", text: "Si je te donnais un ordre coquin maintenant, lequel accepterais-tu ?", timer: [13, 20] },
    { type: "open", text: "Quelle partie de mon corps tu aimerais lécher en premier ?", timer: [11, 17] },
    { type: "open", text: "Décris comment tu aimerais que je te domine.", timer: [14, 21] },

    { type: "list", text: "Cite 6 endroits où faire l’amour hors de la chambre", count: 6, timer: [15, 23] },
    { type: "list", text: "Donne 5 mots très coquins", count: 5, timer: [11, 17] },
    { type: "list", text: "Nomme 5 choses qui peuvent servir de sextoy", count: 5, timer: [12, 18] },
    { type: "list", text: "Cite 5 endroits de mon corps où tu aimerais jouir", count: 5, timer: [12, 18] },
    { type: "list", text: "Donne 4 façons de me faire jouir avec ta bouche", count: 4, timer: [11, 17] },

    { type: "draw", text: "Dessine ce que tu veux me faire", timer: [16, 25] },
    { type: "rps", text: "Pierre-Feuille-Ciseaux", timer: [0, 0] },

    { type: "fetch", text: "Va chercher le lubrifiant", timer: [25, 40] },
    { type: "fetch", text: "Va chercher de quoi me bander les yeux", timer: [25, 40] },
  ],

  // ========== TORRIDE ==========
  torride: [
    { type: "open", text: "Décris exactement ce que tu veux que je te fasse dans les 10 prochaines minutes.", timer: [16, 25] },
    { type: "open", text: "Quelle est la chose la plus sale que tu aimerais qu’on fasse ?", timer: [14, 22] },
    { type: "open", text: "Si je te donnais un ordre très coquin, lequel accepterais-tu sans hésiter ?", timer: [13, 20] },
    { type: "open", text: "As-tu déjà joui en pensant à moi en te touchant ?", timer: [11, 17] },
    { type: "open", text: "Dis-moi la position dans laquelle tu aimerais me voir te prendre.", timer: [13, 20] },
    { type: "open", text: "Décris comment tu aimerais me faire jouir ce soir.", timer: [14, 22] },
    { type: "open", text: "Quelle est la chose la plus interdite que tu aimerais qu’on fasse ?", timer: [14, 22] },

    { type: "list", text: "Cite 7 mots très coquins", count: 7, timer: [13, 20] },
    { type: "list", text: "Donne 5 endroits où tu aimerais jouir", count: 5, timer: [11, 17] },
    { type: "list", text: "Cite 5 choses sales que tu veux que je te fasse", count: 5, timer: [12, 18] },

    { type: "rps", text: "Pierre-Feuille-Ciseaux", timer: [0, 0] },
  ]
};
