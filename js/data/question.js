// ============================================================
// VERTIGE — Banque de questions
// ============================================================

const QUESTIONS = {
  facile: [
    // Couple & connaissance
    { type: "open", text: "Quel est mon plat préféré ?" },
    { type: "open", text: "Quelle est ma plus grande peur ?" },
    { type: "open", text: "Où nous sommes-nous embrassés pour la première fois ?" },
    { type: "open", text: "Quel est mon film préféré ?" },
    { type: "open", text: "Quelle est ma chanson du moment ?" },
    { type: "open", text: "Quel est mon rêve de voyage ?" },
    { type: "open", text: "Quelle est ma plus grande qualité selon toi ?" },
    { type: "open", text: "Quel est mon animal préféré ?" },

    // Speed / liste
    { type: "list", text: "Donne 5 fruits qui commencent par une voyelle", count: 5 },
    { type: "list", text: "Cite 4 couleurs", count: 4 },
    { type: "list", text: "Nomme 5 choses qu’on trouve dans une cuisine", count: 5 },
    { type: "list", text: "Donne 4 métiers qui commencent par P", count: 4 },

    // QI léger
    { type: "open", text: "Combien font 7 × 8 ?" },
    { type: "open", text: "Quelle est la capitale de l’Italie ?" },
    { type: "open", text: "Combien y a-t-il de lettres dans l’alphabet ?" },
  ],

  moyen: [
    { type: "open", text: "Quelle est la chose que je n’ai jamais osé te dire ?" },
    { type: "open", text: "Quel est mon plus gros fantasme que tu connais ?" },
    { type: "open", text: "Où aimerais-tu qu’on fasse l’amour un jour ?" },
    { type: "open", text: "Quelle partie de mon corps tu préfères toucher ?" },
    { type: "open", text: "Quel est mon plus grand complexe ?" },
    { type: "open", text: "Si on avait une soirée libre demain, que voudrais-tu faire ?" },

    { type: "list", text: "Cite 6 mots qui commencent par la lettre S", count: 6 },
    { type: "list", text: "Donne 5 choses qu’on peut faire avec de la chantilly", count: 5 },
    { type: "list", text: "Nomme 5 endroits du corps où on peut embrasser", count: 5 },

    { type: "open", text: "Combien font 12 × 11 ?" },
    { type: "open", text: "Quel est le plus grand océan du monde ?" },
  ],

  chaud: [
    { type: "open", text: "Décris en détail la dernière fois où tu as vraiment joui à cause de moi." },
    { type: "open", text: "Quelle position tu aimerais qu’on teste ce soir ?" },
    { type: "open", text: "Qu’est-ce qui te rend le plus excité(e) chez moi ?" },
    { type: "open", text: "As-tu déjà fantasmé sur quelqu’un d’autre en pensant à moi ?" },
    { type: "open", text: "Quelle phrase coquine tu aimerais m’entendre dire ?" },
    { type: "open", text: "Où aimerais-tu que je te touche en premier ce soir ?" },

    { type: "list", text: "Cite 6 endroits où on peut faire l’amour en dehors de la chambre", count: 6 },
    { type: "list", text: "Donne 5 mots coquins qui commencent par C", count: 5 },
    { type: "list", text: "Nomme 5 choses qui peuvent servir de sextoy improvisé", count: 5 },
  ],

  torride: [
    { type: "open", text: "Décris exactement ce que tu veux que je te fasse dans les 10 prochaines minutes." },
    { type: "open", text: "Quelle est la chose la plus sale que tu aimerais qu’on fasse ensemble ?" },
    { type: "open", text: "Si je te donnais un ordre coquin maintenant, lequel accepterais-tu sans hésiter ?" },
    { type: "open", text: "As-tu déjà joui en pensant à moi pendant que tu te touchais ?" },
    { type: "open", text: "Quelle partie de mon corps tu aimerais lécher en premier ?" },
    { type: "open", text: "Dis-moi la position dans laquelle tu aimerais me voir te prendre / te dominer." },

    { type: "list", text: "Cite 7 mots très coquins", count: 7 },
    { type: "list", text: "Donne 5 endroits de mon corps où tu aimerais jouir", count: 5 },
  ]
};
