// French text for this journey, merged over data.js (see addLanguage in ../../i18n.js).
// Same shape as data.js, text fields only; STOPS line up by position. Quotations are
// verbatim, in « … » with non-breaking spaces (U+00A0) inside the guillemets and before
// the high punctuation marks.

// Words that differ between versions: {term} in any text field.
export const TERMS = {
  artemis: { sg21: 'Artémis', bds: 'Artémis', default: 'Diane' },
  theater: 'théâtre',
};

export const PLACES = {
  antioch: { name: 'Antioche' },
  derbe: { name: { bds: 'Derbé', default: 'Derbe' } },
  lystra: { name: { bds: 'Lystres', default: 'Lystre' } },
  iconium: { name: { neg1979: 'Icone', lsg: 'Icone', default: 'Iconium' } },
  antiochP: { name: { bds: 'Antioche en Pisidie', default: 'Antioche de Pisidie' } },
  ephesus: { name: { lsg: 'Éphèse', default: 'Ephèse' } },
  troas: { name: 'Troas' },
  neapolis: { name: 'Néapolis' },
  philippi: { name: 'Philippes' },
  thessalonica: { name: 'Thessalonique' },
  berea: { name: 'Bérée' },
  corinth: { name: 'Corinthe' },
  assos: { name: 'Assos' },
  mitylene: { name: 'Mytilène' },
  miletus: { name: 'Milet' },
  cos: { name: 'Cos' },
  rhodes: { name: 'Rhodes' },
  patara: { name: 'Patara' },
  tyre: { name: 'Tyr' },
  ptolemais: { name: { neg1979: 'Ptolemaïs', default: 'Ptolémaïs' } },
  caesarea: { name: 'Césarée' },
  jerusalem: { name: 'Jérusalem' },
};

export const FEATURES = {
  tarsus: { name: 'Tarse' },
  theater: { name: '{Theater}' },
  smyrna: { name: 'Smyrne' },
  pergamum: { name: 'Pergame' },
  thyatira: { name: 'Thyatire' },
  sardis: { name: 'Sardes' },
  philadelphia: { name: 'Philadelphie' },
  laodicea: { name: 'Laodicée' },
  colossae: { name: 'Colosses' },
  hierapolis: { name: 'Hiérapolis' },
  chios: { name: { bds: 'Chio', default: 'Chios' } },
  samos: { name: 'Samos' },
  syria: { name: 'Syrie' },
  cilicia: { name: 'Cilicie' },
  galatia: { name: 'Galatie' },
  phrygia: { name: 'Phrygie' },
  asia: { name: 'Asie' },
  macedonia: { name: 'Macédoine' },
  achaia: { name: 'Achaïe' },
  lycia: { name: 'Lycie' },
  phoenicia: { name: 'Phénicie' },
  judea: { name: 'Judée' },
  cyprus: { name: 'Chypre' },
  aegean: { name: 'Mer Égée' },
  sea: { name: 'Mer Méditerranée' },
};

export const INTRO = {
  title: 'Achever la course',
  ref: 'Actes 20:24',
  quote: {
    sg21: '« Mais je n’y attache aucune importance et je ne considère pas ma vie comme précieuse, pourvu que j’accomplisse [avec joie] ma course et le ministère que le Seigneur Jésus m’a confié : annoncer la bonne nouvelle de la grâce de Dieu. »',
    bds: '« Ma vie m’importe peu, je ne lui accorde aucun prix ; mon but c’est d’aller jusqu’au bout de ma course et d’accomplir pleinement le service que le Seigneur Jésus m’a confié c’est-à-dire de proclamer l’Evangile, ce message de la grâce de Dieu. »',
    neg1979: '« Mais je ne fais pour moi-même aucun cas de ma vie, comme si elle m’était précieuse, pourvu que j’accomplisse ma course [avec joie], et le ministère que j’ai reçu du Seigneur Jésus, d’annoncer la bonne nouvelle de la grâce de Dieu. »',
    lsg: '« Mais je ne fais pour moi-même aucun cas de ma vie, comme si elle m’était précieuse, pourvu que j’accomplisse ma course avec joie, et le ministère que j’ai reçu du Seigneur Jésus, d’annoncer la bonne nouvelle de la grâce de Dieu. »',
  },
  note: 'Paul dit cela aux anciens d’Éphèse, à Milet, vers la fin de son troisième voyage, vers 53–57 apr. J.-C. Il passa la plus grande partie du voyage à Éphèse, plus de deux ans. Puis il parcourut la Macédoine et la Grèce pour réunir une collecte en faveur des pauvres de Jérusalem, et l’y apporta lui-même, bien qu’on l’eût averti que des liens l’attendaient (20:23).',
  aside: 'Le relief est réel, d’après des données d’altitude modernes, avec les hauteurs triplées pour que les montagnes se voient ; le littoral est celui d’aujourd’hui, si bien que les ports ensablés d’Éphèse et de Milet sont maintenant à l’intérieur des terres. Les Actes ne disent pas quelles routes ils suivirent : les trajets par terre prennent le passage le plus facile entre les lieux nommés, et ceux par mer le plus court en eau libre. Les villes et le navire sont dessinés bien plus grands que nature. Aucun personnage n’est montré.',
};

export const FINALE = {
  title: 'Ce que Dieu avait fait',
  ref: 'Actes 21:19',
  quote: {
    sg21: '« Après les avoir salués, il a raconté en détail ce que Dieu avait fait au milieu des non-Juifs à travers son ministère. »',
    bds: '« Après les avoir salués, Paul exposa en détail tout ce que Dieu avait accompli par son ministère parmi les non-Juifs. »',
    neg1979: '« Après les avoir salués, il raconta en détail ce que Dieu avait fait au milieu des païens par son ministère. »',
    lsg: '« Après les avoir salués, il raconta en détail ce que Dieu avait fait au milieu des païens par son ministère. »',
  },
  note: 'Paul et ses compagnons firent leur rapport à Jacques et aux anciens, qui glorifièrent Dieu (21:18–20). Quelques jours plus tard, Paul fut saisi dans le temple et arrêté (21:27–33). Il irait à Rome, comme il l’espérait (Romains 15:23–24), mais prisonnier (Actes 27–28).',
};

export const STOPS = [
  {
    title: 'De nouveau d’Antioche', ref: 'Actes 18:23',
    quote: {
      sg21: '« Après avoir passé quelque temps à Antioche, Paul se mit en route et parcourut successivement la Galatie et la Phrygie en fortifiant tous les disciples. »',
      bds: '« Après y avoir passé un certain temps, il repartit et parcourut de lieu en lieu la région galate de la Phrygie, en affermissant tous les disciples dans la foi. »',
      neg1979: '« Lorsqu’il eut passé quelque temps à Antioche, Paul se mit en route, et parcourut successivement la Galatie et la Phrygie, fortifiant tous les disciples. »',
      lsg: '« Lorsqu’il eut passé quelque temps à Antioche, Paul se mit en route, et parcourut successivement la Galatie et la Phrygie, fortifiant tous les disciples. »',
    },
    note: 'Après un séjour à Antioche, Paul repartit pour la troisième fois, de nouveau par voie de terre, vers les Églises des deux premiers voyages. Les Actes ne consacrent qu’une phrase à cette partie du voyage avant que Paul n’arrive à Éphèse (19:1). L’itinéraire passe par Tarse et les Portes de Cilicie, comme lors du deuxième voyage.',
  },
  {
    title: 'La collecte', ref: '1 Corinthiens 16:1',
    quote: {
      sg21: '« En ce qui concerne la collecte en faveur des saints, faites, vous aussi, comme je l’ai prescrit aux Eglises de la Galatie… »',
      bds: '« Venons-en à la question de la collecte en faveur de ceux qui, en Judée, font partie du peuple saint : j’ai déjà donné mes directives aux Eglises de la Galatie. Suivez-les, vous aussi. »',
      neg1979: '« Pour ce qui concerne la collecte en faveur des saints, agissez, vous aussi, comme je l’ai ordonné aux Eglises de la Galatie. »',
      lsg: '« Pour ce qui concerne la collecte en faveur des saints, agissez, vous aussi, comme je l’ai ordonné aux Églises de la Galatie. »',
    },
    note: 'Pendant ce voyage, Paul réunit de l’argent auprès des Églises non juives pour les croyants pauvres de Jérusalem (Romains 15:25–28 ; 2 Corinthiens 8–9), comme les apôtres lui avaient demandé de se souvenir des pauvres (Galates 2:10). Il dit aux Églises de Galatie, comme plus tard aux Corinthiens, de mettre quelque chose de côté le premier jour de chaque semaine (1 Corinthiens 16:2).',
  },
  {
    title: { lsg: 'Éphèse', default: 'Ephèse' }, ref: 'Actes 19:1',
    quote: {
      sg21: '« Pendant qu’Apollos était à Corinthe, Paul arriva à Ephèse après avoir traversé les hautes provinces de l’Asie. Il rencontra quelques disciples… »',
      bds: '« Pendant qu’Apollos se trouvait à Corinthe, Paul, après avoir traversé la région montagneuse d’Asie Mineure, descendit à Ephèse. Il y rencontra un petit groupe de disciples et leur demanda… »',
      neg1979: '« Pendant qu’Apollos était à Corinthe, Paul, après avoir parcouru les hautes provinces de l’Asie, arriva à Ephèse. Ayant rencontré quelques disciples, il leur dit… »',
      lsg: '« Pendant qu’Apollos était à Corinthe, Paul, après avoir parcouru les hautes provinces de l’Asie, arriva à Éphèse. Ayant rencontré quelques disciples, il leur dit… »',
    },
    note: 'Les « hautes provinces » s’entendent de la route des hauteurs plutôt que des vallées ; Colossiens 2:1 laisse penser que Paul n’alla jamais à Laodicée ni à Colosses, et l’itinéraire passe donc au nord. Éphèse était la principale ville d’Asie, avec le grand temple de {artemis}. Paul y trouva une douzaine de disciples qui ne connaissaient que le baptême de Jean (19:1–7), et enseigna trois mois dans la synagogue (19:8).',
  },
  {
    title: 'Toute l’Asie entendit', ref: 'Actes 19:10',
    quote: {
      sg21: '« Cela dura 2 ans, si bien que tous les habitants de l’Asie, juifs et non juifs, entendirent la parole du Seigneur. »',
      bds: '« Cela dura deux ans, si bien que tous les habitants de la province d’Asie, tant Juifs que Grecs, entendirent la Parole du Seigneur. »',
      neg1979: '« Cela dura deux ans, de sorte que tous ceux qui habitaient l’Asie, Juifs et Grecs, entendirent la parole du Seigneur. »',
      lsg: '« Cela dura deux ans, de sorte que tous ceux qui habitaient l’Asie, Juifs et Grecs, entendirent la parole du Seigneur. »',
    },
    note: 'Quand la synagogue se retourna contre lui, Paul enseigna chaque jour dans l’école de Tyrannus (19:9). Des Églises naquirent dans toute la province, certaines fondées par d’autres : Épaphras apporta l’Évangile à Colosses, Laodicée et Hiérapolis (Colossiens 1:7 ; 4:13). Les sept Églises d’Apocalypse 2–3 sont toutes en Asie : Éphèse, Smyrne, Pergame, Thyatire, Sardes, Philadelphie et Laodicée.',
  },
  {
    title: 'L’émeute', ref: 'Actes 19:29',
    quote: {
      sg21: '« Toute la ville fut dans l’agitation. Ils se précipitèrent tous ensemble au théâtre en entraînant avec eux Gaïus et Aristarque, des Macédoniens compagnons de voyage de Paul. »',
      bds: '« Bientôt, toute la ville fut en effervescence. On s’empara de Gaïus et d’Aristarque, deux Macédoniens qui accompagnaient Paul dans son voyage, et l’on se précipita en foule au théâtre. »',
      neg1979: '« Toute la ville fut dans la confusion. Ils se précipitèrent tous ensemble au théâtre, entraînant avec eux Gaïus et Aristarque, Macédoniens, compagnons de voyage de Paul. »',
      lsg: '« Toute la ville fut dans la confusion. Ils se précipitèrent tous ensemble au théâtre, entraînant avec eux Gaïus et Aristarque, Macédoniens, compagnons de voyage de Paul. »',
    },
    note: 'Démétrius, un orfèvre qui fabriquait des temples d’argent de {artemis}, vit son commerce menacé et souleva les artisans (19:23–27). Au {theater}, la foule cria pendant deux heures la louange de la déesse, jusqu’à ce que le secrétaire de la ville la calme (19:34–41). Ses ruines, qui comptent environ 25 000 places, sont dessinées ici. Paul voulait y entrer, mais les disciples l’en empêchèrent (19:30).',
  },
  {
    title: 'Une porte ouverte à Troas', ref: '2 Corinthiens 2:12',
    quote: {
      sg21: '« Quand je suis arrivé à Troas pour annoncer l’Evangile de Christ, bien que le Seigneur m’y ait ouvert une porte, je n’avais pas l’esprit en repos parce que je n’avais pas trouvé mon frère Tite. »',
      bds: '« Je suis allé à Troas pour y annoncer l’Evangile de Christ. J’y ai trouvé, grâce au Seigneur, des portes largement ouvertes à mon activité. »',
      neg1979: '« Au reste, lorsque je fus arrivé à Troas pour l’Evangile de Christ, quoique le Seigneur m’y ait ouvert une porte, je n’eus point de repos d’esprit, parce que je ne trouvai pas Tite, mon frère… »',
      lsg: '« Au reste, lorsque je fus arrivé à Troas pour l’Évangile de Christ, quoique le Seigneur m’y eût ouvert une porte, je n’eus point de repos d’esprit, parce que je ne trouvai pas Tite, mon frère… »',
    },
    note: 'Après l’émeute, Paul partit pour la Macédoine (20:1). Ses lettres complètent le récit : à Troas, il trouva une porte ouverte pour l’Évangile, mais pas de repos, car Tite, qui avait porté une lettre douloureuse à Corinthe, n’était pas revenu (2 Corinthiens 2:4, 13). Il continua donc. Les Actes ne disent pas comment il alla d’Éphèse à Troas ; l’itinéraire suit la route par Smyrne et Pergame.',
  },
  {
    title: 'Tite en Macédoine', ref: '2 Corinthiens 7:6',
    quote: {
      sg21: '« Mais Dieu, qui réconforte ceux qui sont abattus, nous a encouragés par l’arrivée de Tite… »',
      bds: '« Mais Dieu, qui réconforte ceux qui sont abattus, nous a réconfortés par l’arrivée de Tite. »',
      neg1979: '« Mais Dieu, qui console ceux qui sont abattus, nous a consolés par l’arrivée de Tite… »',
      lsg: '« Mais Dieu, qui console ceux qui sont abattus, nous a consolés par l’arrivée de Tite… »',
    },
    note: 'En Macédoine non plus, Paul n’eut pas de repos : des luttes au-dehors, des craintes au-dedans (2 Corinthiens 7:5). Puis Tite arriva avec de bonnes nouvelles de Corinthe, et Paul écrivit 2 Corinthiens depuis la Macédoine. Les Églises de Macédoine, pourtant pauvres, donnèrent généreusement pour la collecte (2 Corinthiens 8:1–5).',
  },
  {
    title: 'La Grèce', ref: 'Actes 20:2',
    quote: {
      sg21: '« Il parcourut cette région en adressant de nombreuses paroles d’encouragement aux croyants et se rendit en Grèce… »',
      bds: '« En parcourant cette province, il eut de nombreuses occasions d’encourager les croyants. De là, il passa en Grèce… »',
      neg1979: '« Il parcourut cette contrée, en adressant aux disciples de nombreuses exhortations. »',
      lsg: '« Il parcourut cette contrée, en adressant aux disciples de nombreuses exhortations. »',
    },
    note: 'Les Actes résument la Macédoine en une phrase ; Paul alla peut-être jusqu’en Illyrie, sur l’Adriatique (Romains 15:19). En Grèce, il resta trois mois (20:3), sans doute à Corinthe, et y écrivit sa lettre aux Romains, portée par Phœbé de Cenchrées (Romains 16:1). Les Actes ne disent pas par où il vint de Macédoine ; l’itinéraire prend la route de Thessalie.',
  },
  {
    title: 'Pour les pauvres de Jérusalem', ref: 'Romains 15:26',
    quote: {
      sg21: '« En effet, les Eglises de la Macédoine et l’Achaïe ont bien voulu organiser une collecte en faveur de ceux qui sont pauvres parmi les saints de Jérusalem. »',
      bds: '« En effet, les Eglises de la Macédoine et de l’Achaïe ont décidé de donner une part de leurs biens pour venir en aide aux croyants pauvres de Jérusalem. »',
      neg1979: '« Car la Macédoine et l’Achaïe ont bien voulu s’imposer une contribution en faveur des pauvres parmi les saints de Jérusalem. »',
      lsg: '« Car la Macédoine et l’Achaïe ont bien voulu s’imposer une contribution en faveur des pauvres parmi les saints de Jérusalem. »',
    },
    note: 'Écrivant à Rome depuis Corinthe, Paul expliqua qu’il devait d’abord porter le don à Jérusalem, et leur demanda de prier pour qu’il soit bien reçu (Romains 15:25–31). L’Achaïe est la province de Grèce au sud de la Macédoine, avec Corinthe pour capitale. Après Jérusalem, il espérait passer par Rome en allant en Espagne (15:24, 28).',
  },
  {
    title: 'Retour par la Macédoine', ref: 'Actes 20:3',
    quote: {
      sg21: '« …où il séjourna trois mois. Il était sur le point d’embarquer pour la Syrie, mais comme les Juifs formaient un complot contre lui, il décida de repartir par la Macédoine. »',
      bds: '« …où il demeura trois mois. Au moment où il allait s’embarquer pour la Syrie, il apprit que les Juifs avaient formé un complot contre lui. Il décida alors de repasser par la Macédoine. »',
      neg1979: '« Puis il se rendit en Grèce, où il séjourna trois mois. Il était sur le point de s’embarquer pour la Syrie, quand les Juifs lui dressèrent des embûches. Alors il se décida à reprendre la route de la Macédoine. »',
      lsg: '« Puis il se rendit en Grèce, où il séjourna trois mois. Il était sur le point de s’embarquer pour la Syrie, quand les Juifs lui dressèrent des embûches. Alors il se décida à reprendre la route de la Macédoine. »',
    },
    note: 'Il comptait s’embarquer de Grèce directement pour la Syrie ; il revint au contraire par le long chemin, à travers la Macédoine. Des hommes des Églises l’accompagnaient, peut-être avec la collecte : Sopater de Bérée, Aristarque et Second de Thessalonique, Gaïus de Derbe, Timothée, ainsi que Tychique et Trophime d’Asie (20:4).',
  },
  {
    title: 'La fraction du pain à Troas', ref: 'Actes 20:7',
    quote: {
      sg21: '« Le dimanche, nous étions réunis pour rompre le pain. Comme il devait partir le lendemain, Paul s’entretenait avec les disciples, et il a prolongé son discours jusqu’à minuit. »',
      bds: '« Le dimanche, nous étions réunis pour rompre le pain. Comme il devait partir le lendemain, Paul s’entretenait avec les assistants et prolongea son discours jusque vers minuit. »',
      neg1979: '« Le premier jour de la semaine, nous étions réunis pour rompre le pain. Paul, qui devait partir le lendemain, s’entretenait avec les disciples, et il prolongea son discours jusqu’à minuit. »',
      lsg: '« Le premier jour de la semaine, nous étions réunis pour rompre le pain. Paul, qui devait partir le lendemain, s’entretenait avec les disciples, et il prolongea son discours jusqu’à minuit. »',
    },
    note: 'Ils s’embarquèrent à Philippes après les jours des pains sans levain, arrivèrent à Troas en cinq jours et y restèrent sept (20:6) ; dès Philippes, le récit dit de nouveau « nous ». Cette nuit-là, un jeune homme, Eutychus, s’endormit sur une fenêtre, tomba du troisième étage et fut relevé mort ; Paul le prit dans ses bras, et on le ramena vivant (20:9–12).',
  },
  {
    title: 'À pied jusqu’à Assos', ref: 'Actes 20:13',
    quote: {
      sg21: '« Quant à nous, nous avons pris les devants pour embarquer sur un bateau à destination d’Assos. Nous devions y reprendre Paul, conformément à ses instructions, car il voulait faire la route à pied. »',
      bds: '« Pour nous, nous avons pris les devants, et nous nous sommes embarqués sur un bateau qui nous a amenés à Assos, où nous devions prendre Paul, conformément à ce qu’il avait décidé. Car il voulait faire la route à pied jusque-là. »',
      neg1979: '« Pour nous, nous précédâmes Paul sur le navire, et nous fîmes voile pour Assos, où nous avions convenu de le reprendre, parce qu’il devait faire la route à pied. »',
      lsg: '« Pour nous, nous précédâmes Paul sur le navire, et nous fîmes voile pour Assos, où nous avions convenu de le reprendre, parce qu’il devait faire la route à pied. »',
    },
    note: 'Paul fit à pied quelque 35 km à travers le cap pendant que les autres le contournaient par la mer. À Assos, ils le prirent à bord et continuèrent jusqu’à Mytilène, dans l’île de Lesbos (20:14).',
  },
  {
    title: { bds: 'Chio, Samos, Milet', default: 'Chios, Samos, Milet' }, ref: 'Actes 20:15',
    quote: {
      sg21: '« De là, continuant par la mer, nous sommes arrivés le lendemain en face de Chios. Le jour suivant nous sommes passés par Samos, et le jour d’après nous sommes arrivés à Milet. »',
      bds: '« …nous avons passé le lendemain au large de Chio. Le jour suivant, nous jetions l’ancre à Samos et, un jour plus tard, nous abordions à Milet. »',
      neg1979: '« De là, continuant par mer, nous arrivâmes le lendemain vis-à-vis de Chios. Le jour suivant, nous cinglâmes vers Samos, et le jour d’après nous vînmes à Milet. »',
      lsg: '« De là, continuant par mer, nous arrivâmes le lendemain vis-à-vis de Chios. Le jour suivant, nous cinglâmes vers Samos, et le jour d’après nous vînmes à Milet. »',
    },
    note: 'Ils passèrent au large d’Éphèse, car Paul se hâtait d’être à Jérusalem, si possible, pour le jour de la Pentecôte (20:16). Chaque journée de navigation s’achevait dans une île ou un port, comme pour les navires de cabotage.',
  },
  {
    title: 'Adieux à Milet', ref: 'Actes 20:38',
    quote: {
      sg21: '« …attristés surtout parce qu’il avait dit qu’ils ne verraient plus son visage. Puis ils l’ont accompagné jusqu’au bateau. »',
      bds: '« Ce qui les affligeait surtout, c’était de l’avoir entendu dire qu’ils ne le reverraient plus. Puis ils l’accompagnèrent jusqu’au bateau. »',
      neg1979: '« …ils l’embrassaient, affligés surtout de ce qu’il avait dit qu’ils ne verraient plus son visage. Et ils l’accompagnèrent jusqu’au navire. »',
      lsg: '« …ils l’embrassaient, affligés surtout de ce qu’il avait dit qu’ils ne verraient plus son visage. Et ils l’accompagnèrent jusqu’au navire. »',
    },
    note: 'De Milet, Paul fit venir les anciens de l’Église d’Éphèse, à une cinquantaine de kilomètres, et leur parla de ses années parmi eux, de ce qui l’attendait et du troupeau qu’ils devaient paître (20:17–35). Puis il se mit à genoux et pria avec eux tous (20:36). Le port de Milet, comme celui d’Éphèse, s’est ensablé depuis.',
  },
  {
    title: 'Cos, Rhodes, Patara', ref: 'Actes 21:1',
    quote: {
      sg21: '« Après nous être séparés, nous avons pris la mer pour aller directement à Cos, puis le lendemain à Rhodes, et de là à Patara. »',
      bds: '« Après nous être séparés d’eux, nous avons pris la mer et nous avons mis directement le cap sur l’île de Cos, puis le lendemain, nous avons continué sur Rhodes et, de là, vers Patara. »',
      neg1979: '« Nous nous embarquâmes, après nous être séparés d’eux, et nous allâmes directement à Cos, le lendemain à Rhodes, et de là à Patara. »',
      lsg: '« Nous nous embarquâmes, après nous être séparés d’eux, et nous allâmes directement à Cos, le lendemain à Rhodes, et de là à Patara. »',
    },
    note: 'Chaque étape s’achevait dans une île ou un port. À Patara, sur la côte de Lycie, ils trouvèrent un navire qui passait en Phénicie et montèrent à bord (21:2) : un navire plus grand, pour la haute mer, qui traversait directement au lieu de longer la côte.',
  },
  {
    title: 'Au large de Chypre, jusqu’à Tyr', ref: 'Actes 21:3',
    quote: {
      sg21: '« Arrivés en vue de l’île de Chypre, nous l’avons laissée à gauche, poursuivant notre route du côté de la Syrie pour débarquer à Tyr. Le bateau devait en effet décharger sa cargaison. »',
      bds: '« Arrivés en vue de Chypre, nous l’avons laissée sur notre gauche et nous avons continué notre route vers la Syrie, pour débarquer à Tyr où le navire devait livrer sa cargaison. »',
      neg1979: '« Quand nous fûmes en vue de l’île de Chypre, nous la laissâmes à gauche, poursuivant notre route du côté de la Syrie, et nous abordâmes à Tyr, où le bâtiment devait décharger sa cargaison. »',
      lsg: '« Quand nous fûmes en vue de l’île de Chypre, nous la laissâmes à gauche, poursuivant notre route du côté de la Syrie, et nous abordâmes à Tyr, où le bâtiment devait décharger sa cargaison. »',
    },
    note: 'La traversée de quelque 650 km passa au sud de Chypre, où avait commencé le premier voyage de Paul. À Tyr, ils restèrent sept jours avec les disciples, qui disaient à Paul, par l’Esprit, de ne pas monter à Jérusalem ; au départ, toute l’Église, femmes et enfants compris, les accompagna, et ils prièrent à genoux sur le rivage (21:4–5).',
  },
  {
    title: 'Césarée', ref: 'Actes 21:13',
    quote: {
      sg21: '« Il a alors répondu : “Que faites-vous là à pleurer et à me briser le cœur ? Je suis prêt non seulement à être emprisonné, mais encore à mourir à Jérusalem pour le nom du Seigneur Jésus.” »',
      bds: '« Mais il nous répondit : Que faites-vous là ? Voulez-vous me briser le cœur avec vos larmes ? Je suis tout à fait prêt, moi, non seulement à aller en prison, mais même à mourir à Jérusalem pour le Seigneur Jésus. »',
      neg1979: '« Alors il répondit : Que faites-vous, en pleurant et en me brisant le cœur ? Je suis prêt, non seulement à être lié, mais encore à mourir à Jérusalem pour le nom du Seigneur Jésus. »',
      lsg: '« Alors il répondit : Que faites-vous, en pleurant et en me brisant le coeur ? Je suis prêt, non seulement à être lié, mais encore à mourir à Jérusalem pour le nom du Seigneur Jésus. »',
    },
    note: 'De Tyr, ils naviguèrent jusqu’à Ptolémaïs, et le lendemain arrivèrent à Césarée, chez Philippe l’évangéliste (21:7–8). Le prophète Agabus prit la ceinture de Paul, s’en lia les pieds et les mains, et dit que les Juifs de Jérusalem lieraient ainsi l’homme à qui elle appartenait (21:10–11). Tous supplièrent Paul de ne pas monter ; voici sa réponse.',
  },
  {
    title: 'Jérusalem', ref: 'Actes 21:17',
    quote: {
      sg21: '« A notre arrivée à Jérusalem, les frères et sœurs nous ont accueillis avec joie. »',
      bds: '« A notre arrivée à Jérusalem, les frères nous accueillirent avec joie. »',
      neg1979: '« Lorsque nous arrivâmes à Jérusalem, les frères nous reçurent avec joie. »',
      lsg: '« Lorsque nous arrivâmes à Jérusalem, les frères nous reçurent avec joie. »',
    },
    note: 'De Césarée à Jérusalem, il y a environ 100 km de montée dans les collines. Des disciples de Césarée les accompagnèrent et les conduisirent chez Mnason de Chypre, un ancien disciple, qui devait les loger (21:16). Les Actes ne mentionnent la collecte qu’une fois, quand Paul dit plus tard qu’il était venu apporter des aumônes à sa nation (24:17).',
  },
];
