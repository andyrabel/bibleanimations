// French text for "Solomon's Temple", merged over data.js (see addLanguage in ../../i18n.js).
// Same shape as data.js, text fields only. Version keys are the French versions
// (sg21, bds, neg1979, lsg); `default` covers the ones not listed. STOPS line up
// with data.js by position.
//
// Quotations are verbatim, in « … » with non-breaking spaces (U+00A0) inside the
// guillemets and before the high punctuation marks. The Segond 21 and the
// Semeur give the measurements in metres (a cubit as half a metre); the LSG
// writes "l’Éternel" and "Égypte".

// French nouns carry gender, so where a note needs an article the term includes it.
export const TERMS = {
  house: { sg21: 'temple', bds: 'Temple', default: 'maison' },
  theHouse: { sg21: 'le temple', bds: 'le Temple', default: 'la maison' },
  ofTheHouse: { sg21: 'du temple', bds: 'du Temple', default: 'de la maison' },
  porch: 'portique',
  thePorch: 'le portique',
  theMainRoom: { sg21: 'le lieu saint', bds: 'la grande salle', default: 'le temple' },
  ofTheMainRoom: { sg21: 'du lieu saint', bds: 'de la grande salle', default: 'du temple' },
  inner: { bds: 'salle du fond', default: 'sanctuaire' },
  theInner: { bds: 'la salle du fond', default: 'le sanctuaire' },
  ofTheInner: { bds: 'de la salle du fond', default: 'du sanctuaire' },
  cypress: 'cyprès',
  olive: 'olivier sauvage',
  bronze: { neg1979: 'airain', lsg: 'airain', default: 'bronze' },
  ofBronze: { neg1979: 'd’airain', lsg: 'd’airain', default: 'de bronze' },
  court: { bds: 'cour', default: 'parvis' },
  theCourt: { bds: 'la cour', default: 'le parvis' },
  hiram: 'Hiram',
  jachin: { bds: 'Yakîn', default: 'Jakin' },
  theSea: { sg21: 'la cuve', bds: 'la grande cuve', default: 'la mer' },
  oxen: 'bœufs',
  stands: { bds: 'chariots', default: 'bases' },
  basins: 'bassins',
  lampstands: 'chandeliers',
  theVeil: 'le voile',
  ziv: 'Ziv',
  theLord: { lsg: 'l’Éternel', default: 'l’Eternel' },
  ofTheLord: { lsg: 'de l’Éternel', default: 'de l’Eternel' },
};

export const MATERIALS = {
  stone: 'Pierre',
  cedar: 'Cèdre',
  cypress: 'Cyprès',
  olive: 'Olivier sauvage',
  gold: 'Or',
  bronze: { neg1979: 'Airain', lsg: 'Airain', default: 'Bronze' },
};

export const FEATURES = {
  mainRoom: { name: { sg21: 'Lieu saint', bds: 'Grande salle', default: 'Temple' } },
  mostHoly: { name: 'Lieu très saint' },
  porch: { name: 'Portique' },
  chambers: { name: { bds: 'Chambres annexes', default: 'Chambres latérales' } },
  stair: { name: { bds: 'Escalier en colimaçon', default: 'Escalier tournant' } },
  incense: { name: { bds: 'Autel des parfums', sg21: 'Autel en or', default: 'Autel d’or' } },
  cherubim: { name: 'Chérubins' },
  innerDoors: { name: { bds: 'Portes de la salle du fond', default: 'Portes du sanctuaire' } },
  veil: { name: 'Voile' },
  doors: { name: { sg21: 'Portes du lieu saint', bds: 'Portes de la grande salle', default: 'Portes du temple' } },
  lampstands: { name: 'Chandeliers' },
  tables: { name: 'Tables' },
  jachin: { name: '{Jachin}' },
  boaz: { name: 'Boaz' },
  sea: { name: { sg21: 'La cuve', bds: 'La grande cuve', default: 'La mer' } },
  standsS: { name: { bds: 'Chariots', default: 'Bases' } },
  standsN: { name: { bds: 'Chariots', default: 'Bases' } },
  altar: { name: { neg1979: 'Autel d’airain', lsg: 'Autel d’airain', default: 'Autel de bronze' } },
  innerCourt: { name: { bds: 'Cour intérieure', default: 'Parvis intérieur' } },
  greatCourt: { name: { bds: 'Grande cour', default: 'Grand parvis' } },
  cityOfDavid: { name: 'Cité de David' },
  kidron: { name: 'Vallée du Cédron' },
  olives: { name: 'Mont des Oliviers' },
};

export const INTRO = {
  title: 'Jérusalem, le mont Morija',
  ref: '1 Rois 6:1',
  quote: {
    sg21: '« Ce fut 480 ans après la sortie d’Egypte des Israélites que Salomon commença de construire la maison destinée à l’Eternel, la quatrième année de son règne sur Israël, durant le mois de Ziv, qui est le deuxième mois. »',
    bds: '« Le roi Salomon commença la construction du Temple en l’honneur de l’Eternel quatre cent quatre-vingts ans après la sortie des Israélites d’Egypte, soit la quatrième année de son règne sur Israël, au deuxième mois, le mois de Ziv. »',
    neg1979: '« Ce fut la quatre cent quatre-vingtième année après la sortie des enfants d’Israël du pays d’Egypte que Salomon bâtit la maison à l’Eternel, la quatrième année de son règne sur Israël, au mois de Ziv, qui est le second mois. »',
    lsg: '« Ce fut la quatre cent quatre-vingtième année après la sortie des enfants d’Israël du pays d’Égypte que Salomon bâtit la maison à l’Éternel, la quatrième année de son règne sur Israël, au mois de Ziv, qui est le second mois. »',
  },
  note: 'David voulait bâtir une maison pour {theLord}, mais Dieu lui dit que c’est son fils qui la bâtirait (2 Samuel 7:12–13 ; 1 Rois 5:3–5). Salomon fit alliance avec Hiram, roi de Tyr, pour le cèdre et le cyprès du Liban, et ses hommes extrayaient de grandes pierres pour les fondations (5:6–18). Cette visite suit 1 Rois 6–7, avec ce qu’y ajoutent 2 Chroniques 3–4, et chaque partie se dresse à notre arrivée.',
  aside: 'Tout est dessiné aux mesures que donne le texte, en coudées. 2 Chroniques 3:3 parle de la coudée « de l’ancienne mesure » ; ici 1 coudée ≈ 45 cm. La Segond 21 et la Semeur donnent les mesures en mètres, en comptant une coudée pour un demi-mètre. Là où le texte ne donne ni mesure ni position, comme pour l’épaisseur des murs ou les parvis, le modèle est une supposition, et les notes le disent. Les quelques personnages ne sont là que pour montrer l’échelle.',
};

export const FINALE = {
  title: 'La parole {ofTheLord} à Salomon',
  ref: '1 Rois 6:13',
  quote: {
    sg21: '« …j’habiterai au milieu des Israélites et je n’abandonnerai pas mon peuple, Israël. »',
    bds: '« Je viendrai habiter au milieu des Israélites et je n’abandonnerai pas mon peuple Israël. »',
    neg1979: '« …j’habiterai au milieu des enfants d’Israël, et je n’abandonnerai point mon peuple d’Israël. »',
    lsg: '« …j’habiterai au milieu des enfants d’Israël, et je n’abandonnerai point mon peuple d’Israël. »',
  },
  note: 'La parole vint pendant qu’on bâtissait la maison, et avec une condition : si Salomon marchait dans les lois de Dieu, Dieu tiendrait sa promesse à David (6:11–12). Lors de la dédicace, la nuée remplit la maison, et les prêtres ne purent pas y rester pour faire le service (8:10–11). Environ quatre siècles plus tard, les Babyloniens l’incendièrent (2 Rois 25:9).',
};

export const STOPS = [
  {
    title: 'Le mont Morija', ref: '2 Chroniques 3:1',
    quote: {
      sg21: '« Salomon commença à construire la maison de l’Eternel à Jérusalem, sur le mont Morija, où il était apparu à David, son père. David y avait préparé un emplacement sur l’aire de battage d’Ornan, le Jébusien. »',
      bds: '« Salomon commença à bâtir le temple de l’Eternel à Jérusalem, sur la colline de Moriya où l’Eternel était apparu à son père David, et à l’emplacement que celui-ci avait prévu sur l’aire d’Ornân, le Yebousien. »',
      neg1979: '« Salomon commença à bâtir la maison de l’Eternel à Jérusalem, sur la montagne de Morija, qui avait été indiquée à David, son père, dans le lieu préparé par David sur l’aire d’Ornan, le Jébusien. »',
      lsg: '« Salomon commença à bâtir la maison de l’Éternel à Jérusalem, sur la montagne de Morija, qui avait été indiquée à David, son père, dans le lieu préparé par David sur l’aire d’Ornan, le Jébusien. »',
    },
    note: 'David acheta cette aire sur la colline au nord de sa ville et y bâtit un autel quand le fléau s’arrêta (2 Samuel 24:18–25 ; 1 Chroniques 21:18–22:1). Les fondations furent posées au mois de {ziv}, la quatrième année de Salomon (6:37), selon le calcul habituel vers 966 av. J.-C. Les grandes pierres avaient été taillées par les ouvriers de Salomon et de Hiram et par les Guiblites (5:17–18).',
    size: 'La maison : 60 × 20 coudées à l’intérieur (27 × 9 m)',
  },
  {
    title: 'La maison s’élève', ref: '1 Rois 6:7',
    quote: {
      sg21: '« Lorsqu’on construisit le temple, on se servit de pierres toutes taillées. On n’entendit ni marteau, ni hache, ni aucun instrument en fer dans le temple pendant qu’on le construisait. »',
      bds: '« Lorsqu’on édifia le Temple, on n’employa que des pierres déjà entièrement taillées, de sorte que, pendant la construction, on n’entendit aucun bruit de marteau, de pic ou d’autre instrument de fer dans le Temple. »',
      neg1979: '« Lorsqu’on bâtit la maison, on se servit de pierres toutes taillées, et ni marteau, ni hache, ni aucun instrument de fer, ne furent entendus dans la maison pendant qu’on la construisait. »',
      lsg: '« Lorsqu’on bâtit la maison, on se servit de pierres toutes taillées, et ni marteau, ni hache, ni aucun instrument de fer, ne furent entendus dans la maison pendant qu’on la construisait. »',
    },
    note: 'Soixante coudées de long, vingt de large et trente de haut (6:2) : deux fois la longueur et la largeur de la tente du tabernacle, et trois fois sa hauteur. L’épaisseur des murs n’est pas donnée ; ils sont dessinés épais de six coudées à la base, comme ceux du temple d’Ezéchiel (Ezéchiel 41:5), avec un retrait d’une coudée au deuxième et au troisième étage des chambres latérales (voir l’étape 5).',
    size: '60 × 20 × 30 coudées à l’intérieur (27 × 9 × 13,5 m)',
  },
  {
    title: 'Le portique', ref: '1 Rois 6:3',
    quote: {
      sg21: '« Le portique situé devant le lieu saint du temple avait 10 mètres de long, correspondant à la largeur du temple, et 5 de profondeur sur le devant du temple. »',
      bds: '« Sur la façade avant du Temple, devant la grande salle, il y avait un portique de dix mètres de largeur, comme le Temple, et de cinq mètres de profondeur. »',
      neg1979: '« Le portique devant le temple de la maison avait vingt coudées de longueur répondant à la largeur de la maison, et dix coudées de profondeur sur la face de la maison. »',
      lsg: '« Le portique devant le temple de la maison avait vingt coudées de longueur répondant à la largeur de la maison, et dix coudées de profondeur sur la face de la maison. »',
    },
    note: 'Le livre des Rois n’en donne pas la hauteur. 2 Chroniques 3:4 donne vingt coudées dans quelques traductions anciennes et cent vingt dans le texte hébreu ; une tour quatre fois plus haute que la maison semble peu probable, et il est donc dessiné haut de vingt coudées, comme le lit la Semeur (dix mètres). A l’intérieur, il était couvert d’or pur (2 Chroniques 3:4). On ne dit pas si la façade était ouverte ; elle est dessinée ouverte.',
    size: '20 × 10 coudées (9 × 4,5 m)',
  },
  {
    title: 'Les fenêtres', ref: '1 Rois 6:4',
    quote: {
      sg21: '« Le roi fit au temple des fenêtres solidement grillagées. »',
      bds: '« Dans les murs du Temple, on pratiqua des fenêtres à claire-voie grillagées. »',
      neg1979: '« Le roi fit à la maison des fenêtres solidement grillées. »',
      lsg: '« Le roi fit à la maison des fenêtres solidement grillées. »',
    },
    note: 'Les mots hébreux sont incertains : des embrasures qui se rétrécissent vers l’intérieur, ou des fenêtres fermées de treillis. Elles ne pouvaient être qu’en haut des murs, au-dessus des chambres latérales. Leur nombre n’est pas donné ; il y en a cinq de chaque côté, toutes dans {theMainRoom}. Aucune n’est mentionnée pour {theInner}, et Salomon dira que {theLord} veut habiter dans l’obscurité (8:12).',
    size: 'Nombre et taille non donnés',
  },
  {
    title: 'Les chambres latérales', ref: '1 Rois 6:6',
    quote: {
      sg21: '« L’étage inférieur était large de 2 mètres et demi, celui du milieu de 3 et le troisième de 3 et demi. En effet, il ménagea des retraits tout autour du temple, à l’extérieur, afin que la charpente ne pénètre pas dans les murs du temple. »',
      bds: '« L’étage inférieur de cette annexe avait deux mètres cinquante de large, l’étage intermédiaire, trois mètres, et l’étage supérieur, trois mètres cinquante. En effet, le mur extérieur du Temple devenait moins épais vers le haut, de sorte que la charpente ne venait pas entamer les murs mêmes du Temple. »',
      neg1979: '« L’étage inférieur était large de cinq coudées, celui du milieu de six coudées, et le troisième de sept coudées ; car il ménagea des retraites à la maison tout autour en dehors, afin que la charpente n’entre pas dans les murs de la maison. »',
      lsg: '« L’étage inférieur était large de cinq coudées, celui du milieu de six coudées, et le troisième de sept coudées ; car il ménagea des retraites à la maison tout autour en dehors, afin que la charpente n’entrât pas dans les murs de la maison. »',
    },
    note: 'Trois étages de chambres entourent les côtés et le fond de la maison (6:5), chacun haut de cinq coudées, reliés à elle par des bois de cèdre (6:10). Le mur se retire d’une coudée à chaque étage : chaque étage a donc une coudée de plus que celui du dessous, et ses poutres reposent sur le retrait. Le nombre des chambres et l’épaisseur du mur extérieur ne sont pas donnés ; le temple d’Ezéchiel avait trente chambres à chaque étage (Ezéchiel 41:6).',
    size: 'Etages de 5, 6 et 7 coudées de large, chacun haut de 5',
  },
  {
    title: { bds: 'L’escalier en colimaçon', default: 'L’escalier tournant' }, ref: '1 Rois 6:8',
    quote: {
      sg21: '« L’entrée des chambres de l’étage inférieur se trouvait sur le côté droit du temple. On montait à l’étage du milieu par un escalier tournant, et de l’étage du milieu au troisième. »',
      bds: '« On accédait aux chambres annexes de l’étage inférieur par une porte située sur le côté sud du Temple ; de là on montait aux étages supérieurs par des escaliers en colimaçon. »',
      neg1979: '« L’entrée des chambres de l’étage inférieur était sur le côté droit de la maison ; on montait à l’étage du milieu par un escalier tournant, et de l’étage du milieu au troisième. »',
      lsg: '« L’entrée des chambres de l’étage inférieur était au côté droit de la maison ; on montait à l’étage du milieu par un escalier tournant, et de l’étage du milieu au troisième. »',
    },
    note: 'Le côté droit est le sud, pour qui regarde vers l’est depuis la maison. Le texte hébreu dit que la porte menait à l’étage du milieu, le grec à l’étage inférieur. Le mot pour l’escalier est rare et peut désigner un escalier tournant ou des trappes avec des échelles ; son emplacement n’est pas indiqué. Il est dessiné en escalier tournant près de la porte, le mur extérieur coupé.',
  },
  {
    title: 'Le toit de cèdre', ref: '1 Rois 6:9',
    quote: {
      sg21: '« Lorsqu’il eut fini de construire le temple, Salomon lui fit un plafond de planches et de poutres de cèdre. »',
      bds: '« Après avoir achevé de bâtir le Temple, Salomon le fit couvrir d’un plafond soutenu par une armature de poutres de cèdre. »',
      neg1979: '« Après avoir achevé de bâtir la maison, Salomon la couvrit de planches et de poutres de cèdre. »',
      lsg: '« Après avoir achevé de bâtir la maison, Salomon la couvrit de planches et de poutres de cèdre. »',
    },
    note: 'Les hommes de Hiram et de Salomon coupaient le cèdre au Liban, le descendaient à la mer et l’acheminaient en radeaux le long de la côte (5:6–9). Les poutres franchissent les vingt coudées {ofTheMainRoom}. Le toit est dessiné plat ; aucun parapet n’est mentionné. {ThePorch} et les chambres latérales ont leur propre toit.',
  },
  {
    title: 'Le cèdre à l’intérieur', ref: '1 Rois 6:18',
    quote: {
      sg21: '« Le cèdre à l’intérieur de la maison présentait des sculptures de coloquintes et de fleurs entrouvertes. Tout était en cèdre, on ne voyait aucune pierre. »',
      bds: '« Les boiseries de cèdre qui revêtaient l’intérieur du sanctuaire étaient ornées de sculptures en formes de coloquintes et de fleurs entrouvertes. Tout était recouvert de boiseries de cèdre, on ne voyait aucune pierre. »',
      neg1979: '« Le bois de cèdre à l’intérieur de la maison offrait des sculptures de coloquintes et de fleurs épanouies ; tout était de cèdre, on ne voyait aucune pierre. »',
      lsg: '« Le bois de cèdre à l’intérieur de la maison offrait des sculptures de coloquintes et de fleurs épanouies ; tout était de cèdre, on ne voyait aucune pierre. »',
    },
    note: 'Des planches de cèdre couvrent les murs du sol au plafond, et le sol est en planches de cyprès (6:15). Ici, et aux étapes qui regardent à l’intérieur, le mur sud est coupé.',
  },
  {
    title: { bds: 'La salle du fond', default: 'Le sanctuaire' }, ref: '1 Rois 6:16',
    quote: {
      sg21: '« Il revêtit de planches de cèdre les 10 mètres du fond du temple, depuis le sol jusqu’en haut des murs, et il réserva cet espace pour en faire le sanctuaire, le lieu très saint. »',
      bds: '« Il fit aussi recouvrir de boiseries de cèdre depuis le sol jusqu’au plafond les murs intérieurs de l’arrière-corps de l’édifice, bâti sur dix mètres de long. Puis il fit aménager l’intérieur de cette partie pour en faire le lieu très saint. »',
      neg1979: '« Il revêtit de planches de cèdre les vingt coudées du fond de la maison, depuis le sol jusqu’au haut des murs, et il réserva cet espace pour en faire le sanctuaire, le lieu très saint. »',
      lsg: '« Il revêtit de planches de cèdre les vingt coudées du fond de la maison, depuis le sol jusqu’au haut des murs, et il réserva cet espace pour en faire le sanctuaire, le lieu très saint. »',
    },
    note: 'Un cube de vingt coudées de côté (6:20), préparé pour l’arche de l’alliance (6:19). La maison est haute de trente coudées : ou bien le sol était surélevé, ou bien le plafond plus bas ; il est dessiné avec un plafond plus bas. 2 Chroniques 3:9 mentionne des chambres hautes couvertes d’or, qui pourraient être l’espace au-dessus. {TheMainRoom}, devant, est long de quarante coudées (6:17).',
    size: '20 × 20 × 20 coudées (9 m de côté)',
  },
  {
    title: 'Couvert d’or', ref: '1 Rois 6:21',
    quote: {
      sg21: '« Il couvrit d’or pur l’intérieur du temple et il fit passer le voile dans des chaînettes d’or devant le sanctuaire, qu’il couvrit d’or. »',
      bds: '« Salomon plaqua tout l’intérieur de l’édifice d’or fin. Devant l’entrée de la salle du fond, il fit tendre des chaînettes d’or. »',
      neg1979: '« Il couvrit d’or pur l’intérieur de la maison, et il fit passer le voile dans des chaînettes d’or devant le sanctuaire, qu’il couvrit d’or. »',
      lsg: '« Il couvrit d’or pur l’intérieur de la maison, et il fit passer le voile dans des chaînettes d’or devant le sanctuaire, qu’il couvrit d’or. »',
    },
    note: 'Toute la maison est couverte d’or, ainsi que l’autel de cèdre {ofTheInner} (6:20–22), l’autel des parfums qui est devant (7:48). 2 Chroniques 3:6–8 ajoute des pierres précieuses, de l’or de Parvaïm et six cents talents d’or pour le lieu très saint, une vingtaine de tonnes. La façon dont pendaient les chaînettes n’est pas dite ; elles sont dessinées en travers de la cloison.',
    size: 'Autel des parfums : taille non donnée',
  },
  {
    title: 'Les chérubins', ref: '1 Rois 6:27',
    quote: {
      sg21: '« Salomon plaça les chérubins au milieu du temple, à l’intérieur. Leurs ailes étaient déployées : l’aile du premier touchait l’un des murs, et celle du second l’autre mur ; les bouts de leurs autres ailes se touchaient au milieu du temple. »',
      bds: '« Salomon fit placer les chérubins au milieu de la pièce la plus intérieure du Temple. De leurs ailes extérieures déployées, ils touchaient les deux parois opposées alors que leurs deux autres ailes se touchaient au milieu de la pièce. »',
      neg1979: '« Salomon plaça les chérubins au milieu de la maison, dans l’intérieur. Leurs ailes étaient déployées : l’aile du premier touchait à l’un des murs, et l’aile du second touchait à l’autre mur ; et leurs autres ailes se rencontraient par l’extrémité au milieu de la maison. »',
      lsg: '« Salomon plaça les chérubins au milieu de la maison, dans l’intérieur. Leurs ailes étaient déployées : l’aile du premier touchait à l’un des murs, et l’aile du second touchait à l’autre mur ; et leurs autres ailes se rencontraient par l’extrémité au milieu de la maison. »',
    },
    note: 'Deux chérubins en bois d’{olive}, hauts chacun de dix coudées, avec des ailes de cinq coudées, de même mesure et de même forme (6:23–26), couverts d’or (6:28). Ils se tenaient debout, tournés vers {theMainRoom} (2 Chroniques 3:13). Leur aspect n’est pas décrit ; ils sont dessinés en simples figures ailées debout. Lors de la dédicace, l’arche fut placée sous leurs ailes (8:6–7).',
    size: 'Chacun haut de 10 coudées, 10 d’une aile à l’autre (4,5 m)',
  },
  {
    title: 'Chérubins, palmes et fleurs', ref: '1 Rois 6:29',
    quote: {
      sg21: '« Il fit sculpter sur tout le pourtour des murs de la maison, à l’intérieur et à l’extérieur, des chérubins, des palmes et des fleurs entrouvertes. »',
      bds: '« Il fit sculpter en relief sur tous les murs intérieurs du Temple, dans les deux pièces, des chérubins, des palmes et des fleurs entrouvertes. »',
      neg1979: '« Il fit sculpter sur tout le pourtour des murs de la maison, à l’intérieur et à l’extérieur, des chérubins, des palmes et des fleurs épanouies. »',
      lsg: '« Il fit sculpter sur tout le pourtour des murs de la maison, à l’intérieur et à l’extérieur, des chérubins, des palmes et des fleurs épanouies. »',
    },
    note: 'Le sol aussi est couvert d’or (6:30), et 2 Chroniques 3:5–7 ajoute des palmes et des chaînettes sur l’or {ofTheMainRoom}, et de l’or sur les poutres, les seuils, les murs et les portes. La disposition des sculptures n’est pas décrite ; elles sont dessinées en bandes, un chérubin entre deux palmes, comme dans le temple d’Ezéchiel (Ezéchiel 41:18).',
  },
  {
    title: 'Les portes d’olivier sauvage', ref: '1 Rois 6:32',
    quote: {
      sg21: '« Les deux battants étaient en olivier sauvage. Il y fit sculpter des chérubins, des palmes et des fleurs entrouvertes, et il les couvrit d’or. Il plaqua aussi de l’or sur les chérubins et sur les palmes. »',
      bds: '« Les deux battants étaient de bois d’olivier sauvage, ils étaient ornés de sculptures plaquées d’or représentant des chérubins, des palmes et des fleurs entrouvertes. On étendit l’or en pellicules sur les chérubins et sur les palmes. »',
      neg1979: '« Les deux battants étaient de bois d’olivier sauvage. Il y fit sculpter des chérubins, des palmes et des fleurs épanouies, et il les couvrit d’or ; il étendit aussi l’or sur les chérubins et sur les palmes. »',
      lsg: '« Les deux battants étaient de bois d’olivier sauvage. Il y fit sculpter des chérubins, des palmes et des fleurs épanouies, et il les couvrit d’or ; il étendit aussi l’or sur les chérubins et sur les palmes. »',
    },
    note: 'Le linteau et les poteaux {ofTheInner} étaient « à cinq angles » (6:31), peut-être un encadrement en pointe ou le cinquième de la largeur du mur ; l’entrée est dessinée large de quatre coudées, terminée en pointe. Les portes tournaient sur des gonds d’or (7:50). 2 Chroniques 3:14 parle aussi d’un voile de couleurs et de fin lin, orné de chérubins, et 6:21 le mentionne dans la Segond. Les deux sont dessinés : les portes ouvertes et {theVeil} derrière.',
    size: 'Largeur de l’entrée : un cinquième du mur ?',
  },
  {
    title: { sg21: 'Les portes du lieu saint', bds: 'Les portes de la grande salle', default: 'Les portes du temple' }, ref: '1 Rois 6:33–34',
    quote: {
      sg21: '« De même, il fit pour la porte du temple des poteaux en olivier sauvage, qui faisaient le quart de la dimension du mur, et deux battants en cyprès. Chacun des battants était formé de deux planches pivotantes. »',
      bds: '« Pour fermer l’entrée de la grande salle du Temple, le roi fit également faire une porte à deux battants en bois de cyprès avec un encadrement de bois d’olivier sauvage prenant le quart de la dimension du mur. Chacun des deux battants était muni de deux gonds. »',
      neg1979: '« Il fit de même, pour la porte du temple, des poteaux de bois d’olivier sauvage, ayant le quart de la dimension du mur, et deux battants de bois de cyprès ; chacun des battants était formé de deux planches brisées. »',
      lsg: '« Il fit de même, pour la porte du temple, des poteaux de bois d’olivier sauvage, ayant le quart de la dimension du mur, et deux battants de bois de cyprès ; chacun des battants était formé de deux planches brisées. »',
    },
    note: 'Sculptées de chérubins, de palmes et de fleurs, et couvertes d’or appliqué sur la sculpture (6:35). L’entrée est dessinée large de cinq coudées, le quart du mur ; sa hauteur n’est pas donnée. Chaque battant se replie en deux, de sorte que l’entrée peut s’ouvrir en partie ou en entier.',
  },
  {
    title: { bds: 'La cour intérieure', default: 'Le parvis intérieur' }, ref: '1 Rois 6:36',
    quote: {
      sg21: '« Il construisit le parvis intérieur grâce à trois rangées de pierres de taille et une rangée de poutres de cèdre. »',
      bds: '« Puis Salomon fit entourer la cour intérieure d’un mur de trois rangées de pierres de taille superposées et d’une rangée de poutres de cèdre. »',
      neg1979: '« Il bâtit le parvis intérieur de trois rangées de pierres de taille et d’une rangée de poutres de cèdre. »',
      lsg: '« Il bâtit le parvis intérieur de trois rangées de pierres de taille et d’une rangée de poutres de cèdre. »',
    },
    note: 'Sa taille n’est pas donnée ; il est dessiné deux fois plus long et plus large que le parvis du tabernacle. Les Chroniques l’appellent le parvis des prêtres ; autour se trouvait le grand parvis, avec des portes couvertes {ofBronze} (2 Chroniques 4:9), bâti de la même manière (7:12). Le grand parvis entourait aussi le palais de Salomon, dont la construction prit treize ans (7:1) ; il n’est pas représenté.',
    size: 'Non donnée · dessiné 200 × 100 coudées (90 × 45 m)',
  },
  {
    title: '{Jachin} et Boaz', ref: '1 Rois 7:21',
    quote: {
      sg21: '« Il dressa les colonnes dans le portique du temple. Il dressa la colonne de droite et l’appela Jakin, puis il dressa la colonne de gauche et l’appela Boaz. »',
      bds: '« Hiram érigea les deux colonnes devant le portique du Temple. Il appela la colonne de droite Yakîn (Il affermit) et celle de gauche Boaz (La force est en Lui). »',
      neg1979: '« Il dressa les colonnes dans le portique du temple ; il dressa la colonne de droite, et la nomma Jakin ; puis il dressa la colonne de gauche, et la nomma Boaz. »',
      lsg: '« Il dressa les colonnes dans le portique du temple ; il dressa la colonne de droite, et la nomma Jakin ; puis il dressa la colonne de gauche, et la nomma Boaz. »',
    },
    note: 'Hiram, un bronzier de Tyr dont la mère était de Nephthali (7:13–14), coula deux colonnes hautes de dix-huit coudées, et de douze de tour. Sur chacune il posa un chapiteau de cinq coudées, avec un treillis et des chaînettes, deux rangées de grenades, deux cents par chapiteau, et un ouvrage en forme de lis au sommet (7:15–22). 2 Chroniques 3:15 donne trente-cinq coudées, peut-être les deux ensemble. On ne dit pas si elles portaient quelque chose ; elles sont dessinées isolées.',
    size: '18 coudées de haut, 12 de tour (8 × 1,7 m) · chapiteaux de 5 coudées',
    made: 'Hiram de Tyr (7:13–22)',
  },
  {
    title: { sg21: 'La cuve', bds: 'La grande cuve', neg1979: 'La mer de métal fondu', lsg: 'La mer de fonte' }, ref: '1 Rois 7:23',
    quote: {
      sg21: '« Il fit la cuve en métal fondu. Elle faisait 5 mètres d’un bord à l’autre et était entièrement ronde. Elle faisait 2 mètres et demi de haut et l’on pouvait mesurer sa circonférence avec un cordon de 15 mètres. »',
      bds: '« Puis il fit la grande cuve ronde en métal fondu. Elle mesurait cinq mètres de diamètre et deux mètres cinquante de hauteur, un cordeau de quinze mètres mesurait sa circonférence. »',
      neg1979: '« Il fit la mer de métal fondu. Elle avait dix coudées d’un bord à l’autre, une forme entièrement ronde, cinq coudées de hauteur, et une circonférence que mesurait un cordon de trente coudées. »',
      lsg: '« Il fit la mer de fonte. Elle avait dix coudées d’un bord à l’autre, une forme entièrement ronde, cinq coudées de hauteur, et une circonférence que mesurait un cordon de trente coudées. »',
    },
    note: 'Elle repose sur douze {oxen}, trois tournés vers chaque côté, l’arrière du corps en dedans (7:25), avec deux rangées de coloquintes coulées sous le bord ; elle a l’épaisseur d’une main, et son bord est comme une fleur de lis (7:24–26). Les Rois disent qu’elle contenait deux mille baths, 2 Chroniques 4:5 dit trois mille. Elle servait aux ablutions des prêtres (2 Chroniques 4:6), et se trouvait à l’angle sud-est de la maison (7:39).',
    size: '10 coudées de diamètre, 5 de haut (4,5 × 2,3 m)',
    made: 'Hiram (7:23–26)',
  },
  {
    title: 'Les {stands} et les bassins', ref: '1 Rois 7:38',
    quote: {
      sg21: '« Il fit 10 bassins en bronze. Chaque bassin pouvait contenir 880 litres, faisait 2 mètres et reposait sur l’une des dix bases. »',
      bds: '« Il fabriqua encore dix bassins de bronze de deux mètres de diamètre pouvant contenir mille litres d’eau. Chaque bassin reposait sur l’un des dix chariots. »',
      neg1979: '« Il fit dix bassins d’airain. Chaque bassin contenait quarante baths, chaque bassin avait quatre coudées, chaque bassin était sur l’une des dix bases. »',
      lsg: '« Il fit dix bassins d’airain. Chaque bassin contenait quarante baths, chaque bassin avait quatre coudées, chaque bassin était sur l’une des dix bases. »',
    },
    note: 'Chaque support mesure quatre coudées de côté et trois de haut, avec des panneaux ornés de lions, de {oxen} et de chérubins, et des guirlandes, sur quatre roues {ofBronze} comme celles d’un char, hautes d’une coudée et demie (7:27–37). Cinq se trouvent au sud de la maison et cinq au nord (7:39). On y lavait ce qui servait à l’holocauste (2 Chroniques 4:6). La façon dont chaque bassin reposait sur son support n’est pas claire.',
    size: '{Stands} de 4 × 4 × 3 coudées · bassins de 4 coudées de diamètre',
    made: 'Hiram (7:27–39)',
  },
  {
    title: { neg1979: 'L’autel d’airain', lsg: 'L’autel d’airain', default: 'L’autel de bronze' }, ref: '2 Chroniques 4:1',
    quote: {
      sg21: '« Il fit un autel en bronze long de 10 mètres, large de 10 et haut de 5. »',
      bds: '« Salomon fit fabriquer un autel de bronze de dix mètres sur dix et cinq mètres de haut. »',
      neg1979: '« Il fit un autel d’airain, long de vingt coudées, large de vingt coudées, et haut de dix coudées. »',
      lsg: '« Il fit un autel d’airain, long de vingt coudées, large de vingt coudées, et haut de dix coudées. »',
    },
    note: 'Le livre des Rois ne le met pas dans la liste, mais il l’appelle « l’autel {ofBronze} qui est devant {theLord} » (8:64). On ne dit pas comment les prêtres montaient au sommet ; les autels ne devaient pas avoir de marches (Exode 20:26), et aucune n’est dessinée. Tout le bronze fut coulé dans la terre argileuse de la vallée du Jourdain, entre Succoth et Tsarthan, et il y en avait trop pour le peser (7:46–47).',
    size: '20 × 20 × 10 coudées (9 × 9 × 4,5 m)',
  },
  {
    title: 'Les objets d’or', ref: '1 Rois 7:48–49',
    quote: {
      sg21: '« Salomon fit encore tous les autres ustensiles pour la maison de l’Eternel : l’autel en or ; la table en or sur laquelle on mettait les pains consacrés ; les chandeliers en or pur, cinq à droite et cinq à gauche, devant le sanctuaire… »',
      bds: '« Il fit encore fabriquer tous les autres objets destinés au temple de l’Eternel : l’autel des parfums en or, la table d’or sur laquelle on plaçait les pains exposés devant l’Eternel, les chandeliers d’or fin avec leurs lampes, placés cinq à droite et cinq à gauche devant la salle du fond… »',
      neg1979: '« Salomon fit encore tous les autres ustensiles pour la maison de l’Eternel : l’autel d’or ; la table d’or, sur laquelle on mettait les pains de proposition ; les chandeliers d’or pur, cinq à droite et cinq à gauche, devant le sanctuaire… »',
      lsg: '« Salomon fit encore tous les autres ustensiles pour la maison de l’Éternel : l’autel d’or ; la table d’or, sur laquelle on mettait les pains de proposition ; les chandeliers d’or pur, cinq à droite et cinq à gauche, devant le sanctuaire… »',
    },
    note: 'Le livre des Rois parle d’une table ; 2 Chroniques 4:7–8 de dix tables et de dix chandeliers, cinq de chaque côté, faits selon leur modèle. Dix tables sont dessinées, avec les pains (2 Chroniques 4:19), et des chandeliers comme celui du tabernacle (Exode 25:31–37). Leurs tailles ne sont pas données. Avec eux furent faits des coupes, des mouchettes, des bassins, des tasses et des brasiers d’or (7:50).',
  },
  {
    title: 'Sept ans', ref: '1 Rois 6:38',
    quote: {
      sg21: '« La onzième année, au mois de Bul, qui est le huitième mois, elle fut terminée dans toutes ses parties et elle fut telle qu’elle devait être. On mit 7 ans à la construire. »',
      bds: '« La onzième année, au mois de Boul – le huitième mois – le Temple fut achevé dans tous ses détails conformément à tout ce qui était prévu. Salomon avait donc mis sept ans pour le construire. »',
      neg1979: '« …la onzième année, au mois de Bul, qui est le huitième mois, la maison fut achevée dans toutes ses parties et telle qu’elle devait être. Salomon la construisit dans l’espace de sept ans. »',
      lsg: '« …la onzième année, au mois de Bul, qui est le huitième mois, la maison fut achevée dans toutes ses parties et telle qu’elle devait être. Salomon la construisit dans l’espace de sept ans. »',
    },
    note: 'Quand tout l’ouvrage fut achevé, Salomon apporta l’argent, l’or et les objets que son père David avait consacrés, et les mit dans les trésors de la maison {ofTheLord} (7:51). L’arche fut apportée lors de la dédicace, à la fête du septième mois (8:1–6).',
  },
];
