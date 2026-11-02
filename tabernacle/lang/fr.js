// French text for "The Tabernacle", merged over data.js (see addLanguage in ../../i18n.js).
// Same shape as data.js, text fields only. Version keys are the French versions
// (sg21, bds, neg1979, lsg); `default` covers the ones not listed. STOPS, TRIBES and
// LEVITES line up with data.js by position.
//
// Quotations are verbatim, including each version's own spelling (the SG21, BDS
// and NEG1979 write "l’Eternel", the LSG "l’Éternel").

// Words that differ between versions. French nouns carry gender (les planches /
// les cadres) and "de" elides before a vowel (de bronze / d’airain), so some
// terms carry their article or preposition, and the notes avoid adjectives
// that would have to agree with a term.
export const TERMS = {
  bases: { bds: 'socles', default: 'bases' },
  base: { bds: 'socle', default: 'base' },
  boards: { bds: 'cadres', default: 'planches' },
  board: { bds: 'cadre', default: 'planche' },
  theBoards: { bds: 'les cadres', default: 'les planches' },
  bars: { bds: 'traverses', default: 'barres' },
  theBars: { bds: 'les traverses', default: 'les barres' },
  theMiddleBar: { bds: 'la traverse du milieu', default: 'la barre du milieu' },
  pillars: { bds: 'piliers', default: 'colonnes' },
  thePillars: { bds: 'les piliers', default: 'les colonnes' },
  curtains: { bds: 'tentures', default: 'tapis' },
  acacia: 'bois d’acacia',
  bronze: { neg1979: 'airain', lsg: 'airain', default: 'bronze' },
  ofBronze: { neg1979: 'd’airain', lsg: 'd’airain', default: 'de bronze' },
  blue: { bds: 'pourpre violette', default: 'bleu' },
  colours: { bds: 'pourpre violette et écarlate, rouge éclatant', default: 'fil bleu, pourpre et cramoisi' },
  cover: 'propitiatoire',
  theCover: 'le propitiatoire',
  ark: { bds: 'coffre de l’alliance', default: 'arche du témoignage' },
  veil: 'voile',
  theVeil: 'le voile',
  ofTheVeil: 'du voile',
  lampstand: 'chandelier',
  laver: 'cuve',
  theLaver: 'la cuve',
  court: 'parvis',
  tabernacle: 'tabernacle',
  tent: { sg21: 'tente de la rencontre', bds: 'tente de la Rencontre', default: 'tente d’assignation' },
  theTent: { sg21: 'la tente de la rencontre', bds: 'la tente de la Rencontre', default: 'la tente d’assignation' },
  ofTheTent: { sg21: 'de la tente de la rencontre', bds: 'de la tente de la Rencontre', default: 'de la tente d’assignation' },
  clasps: 'agrafes',
  bread: { sg21: 'pains consacrés', bds: 'pain exposé', default: 'pains de proposition' },
  theBread: { sg21: 'les pains consacrés', bds: 'le pain exposé', default: 'les pains de proposition' },
  goatsHair: 'poil de chèvre',
  rams: 'peaux de béliers teintes en rouge',
  outer: 'peaux de dauphins',
  theTurban: { bds: 'le turban', default: 'la tiare' },
  caps: { sg21: 'coiffes', bds: 'turbans', default: 'bonnets' },
  theLord: 'l’Éternel',
  ofTheLord: 'de l’Éternel',
  bezalel: { bds: 'Betsaléel', default: 'Betsaleel' },
  oholiab: 'Oholiab',
};

export const MATERIALS = {
  gold: 'Or',
  silver: 'Argent',
  linen: 'Fin lin retors',
  yarn: '{Colours}',
};

export const FEATURES = {
  ark: { name: '{Ark}' },
  table: { name: 'Table' },
  incense: { name: 'Autel d’or' },
  veil: { name: '{Veil}' },
  screen: { name: 'Rideau de l’entrée' },
  altar: { name: 'Autel des holocaustes' },
  gate: { name: 'Porte du parvis' },
  holyPlace: { name: 'Lieu saint' },
  mostHoly: { name: 'Lieu très saint' },
  sinai: { name: 'Mont Sinaï' },
};

export const TRIBES = [
  { name: 'Juda' }, { name: 'Issacar' }, { name: 'Zabulon' },
  { name: 'Ruben' }, { name: 'Siméon' }, { name: 'Gad' },
  { name: 'Éphraïm' }, { name: 'Manassé' }, { name: 'Benjamin' },
  { name: 'Dan' }, { name: 'Aser' }, { name: 'Nephthali' },
];
export const LEVITES = [
  { name: 'Guershonites' }, { name: 'Kehathites' }, { name: 'Merarites' }, { name: 'Moïse, Aaron et ses fils' },
];

export const INTRO = {
  title: 'Le désert du Sinaï',
  ref: 'Exode 25:8',
  quote: {
    sg21: '« Ils me feront un sanctuaire et j’habiterai au milieu d’eux. »',
    bds: '« Le peuple me fabriquera un sanctuaire pour que j’habite au milieu de lui. »',
    default: '« Ils me feront un sanctuaire, et j’habiterai au milieu d’eux. »',
  },
  note: 'Sur la montagne, Dieu montra à Moïse le modèle d’un sanctuaire que l’on pouvait transporter (25:9, 40). Les chapitres 25 à 31 donnent les instructions, et les chapitres 35 à 39 racontent comment le peuple en fabriqua chaque pièce. Au chapitre 40, Moïse dressa tout en un seul jour, dans un ordre précis. Cette visite suit cet ordre, et chaque pièce se met en place à notre arrivée.',
  aside: 'Tout est dessiné aux dimensions que donne le texte, en coudées (1 coudée ≈ 45 cm). Là où le texte ne donne ni taille ni position, comme pour le {lampstand} et {theLaver}, le modèle est une supposition prudente.',
};

export const FINALE = {
  title: 'La gloire de l’Éternel',
  ref: 'Exode 40:34',
  quote: {
    sg21: '« Alors la nuée couvrit la tente de la rencontre et la gloire de l’Eternel remplit le tabernacle. »',
    bds: '« La nuée enveloppa la tente de la Rencontre et la gloire de l’Eternel remplit le tabernacle. »',
    neg1979: '« Alors la nuée couvrit la tente d’assignation, et la gloire de l’Eternel remplit le tabernacle. »',
    lsg: '« Alors la nuée couvrit la tente d’assignation, et la gloire de l’Éternel remplit le tabernacle. »',
  },
  note: 'Moïse ne pouvait pas entrer dans {theTent}, parce que la nuée demeurait dessus (40:35). Dès lors, la nuée au-dessus du {tabernacle} le jour, et le feu en elle la nuit, indiquaient à Israël quand partir et quand rester (40:36–38).',
};

export const STOPS = [
  {
    title: 'Les {bases}',
    quote: {
      sg21: '« Le premier jour du premier mois de la deuxième année [après leur sortie d’Egypte], le tabernacle fut dressé. »',
      default: '« Le premier jour du premier mois de la seconde année, le tabernacle fut dressé. »',
    },
    note: 'Près d’un an après la sortie d’Égypte, Moïse dresse le {tabernacle}, en commençant par les {bases}. Sous chaque {board} vont deux {bases} d’argent : cent en tout, en comptant les quatre qui sont sous {thePillars} {ofTheVeil}. L’argent venait de la rançon payée par les hommes recensés, un talent pour chaque {base} (30:11–16 ; 38:25–27). À l’entrée, cinq {pillars} reposent sur des {bases} {ofBronze} (26:37).',
    size: 'Un talent pièce, environ 34 kg · 100 en argent, 5 en {bronze}',
  },
  {
    title: '{TheBoards} et {theBars}',
    quote: {
      sg21: '« Moïse dressa le tabernacle; il posa ses bases, plaça les planches et les barres et éleva les colonnes. »',
      bds: '« Moïse fit ériger le tabernacle et en fixer les socles, on mit en place les cadres, on fixa les traverses et l’on dressa les piliers. »',
      default: '« Moïse dressa le tabernacle; il en posa les bases, plaça les planches et les barres, et éleva les colonnes. »',
    },
    note: 'Chaque {board}, en {acacia} plaqué d’or, mesure dix coudées de haut sur une coudée et demie de large (26:16, 29). Vingt se dressent au sud, vingt au nord et six au fond, plus deux aux angles arrière (26:18–23). Cinq {bars} de chaque côté maintiennent l’ensemble, et {theMiddleBar} va d’un bout à l’autre (26:26–28). Puis on dresse {thePillars} : quatre pour {theVeil} et cinq pour l’entrée.',
    size: 'Chaque {board} : 10 × 1½ coudées (4,5 × 0,7 m) · 48 en tout',
    made: 'Les artisans habiles (36:8, 20–38)',
  },
  {
    title: { bds: 'Les tentures', default: 'Les tapis' },
    quote: {
      sg21: '« Tu feras le tabernacle avec 10 tapis en fin lin retors et des étoffes teintes en bleu, en pourpre et en cramoisi. Tu y représenteras des chérubins selon l’art du brodeur. »',
      bds: '« Tu feras le tabernacle avec dix tentures de fin lin retors, de pourpre violette et écarlate, de rouge éclatant, ornées de chérubins dans les règles de l’art. »',
      neg1979: '« Tu feras le tabernacle avec dix tapis de fin lin retors, et d’étoffes teintes en bleu, en pourpre et en cramoisi; tu y représenteras des chérubins artistement travaillés. »',
      lsg: '« Tu feras le tabernacle de dix tapis de fin lin retors, et d’étoffes teintes en bleu, en pourpre et en cramoisi; tu y représenteras des chérubins artistement travaillés. »',
    },
    note: 'Au sens strict, « le {tabernacle} », ce sont ces dix {curtains} de lin (26:1). Chaque pièce mesure 28 coudées sur 4. Les pièces sont cousues en deux ensembles de cinq, et cinquante {clasps} d’or relient les deux ensembles (26:3–6). Étendues sur {theBoards}, elles forment le toit, et de l’intérieur on voit au-dessus de soi les chérubins tissés.',
    size: 'Dix pièces de 28 × 4 coudées (12,6 × 1,8 m)',
    made: 'Les artisans habiles (36:8–13)',
  },
  {
    title: 'La tente et ses couvertures',
    quote: {
      sg21: '« Il étendit la tenture sur le tabernacle et mit sa couverture par-dessus, comme l’Eternel le lui avait ordonné. »',
      bds: '« On étendit la toile de tente sur le tabernacle et l’on posa la couverture de la tente par-dessus, comme l’Eternel l’avait ordonné à Moïse. »',
      neg1979: '« Il étendit la tente sur le tabernacle, et il mit la couverture de la tente par-dessus, comme l’Eternel l’avait ordonné à Moïse. »',
      lsg: '« Il étendit la tente sur le tabernacle, et il mit la couverture de la tente par-dessus, comme l’Éternel l’avait ordonné à Moïse. »',
    },
    note: 'Sur le lin vient une tente de onze pièces en {goatsHair}, de 30 coudées sur 4 chacune, reliées par des {clasps} {ofBronze} ; la sixième se replie sur le devant (26:7–11). Par-dessus viennent deux autres couvertures, en {rams} et en {outer} (26:14). Leurs dimensions ne sont pas données, elles ne sont donc dessinées que sur le toit. C’est la première des sept fois où le chapitre 40 dit que Moïse fit comme {theLord} le lui avait ordonné.',
    size: '{GoatsHair} : onze pièces de 30 × 4 coudées (13,5 × 1,8 m)',
    made: 'Les artisans habiles (36:14–19)',
  },
  {
    title: { bds: 'Le coffre', default: 'L’arche' },
    quote: {
      sg21: '« Il prit le témoignage et le plaça dans l’arche; il mit les barres à l’arche et posa le propitiatoire sur l’arche. »',
      bds: '« Celui-ci prit les deux tablettes de l’acte de l’alliance et les déposa dans le coffre ; il disposa les barres le long du coffre et fit poser le propitiatoire dessus… »',
      default: '« Il prit le témoignage, et le plaça dans l’arche; il mit les barres à l’arche, et il posa le propitiatoire au-dessus de l’arche. »',
    },
    note: 'Un coffre en {acacia} plaqué d’or pur dedans et dehors, avec une bordure d’or et quatre anneaux d’or pour les barres (25:10–15). À l’intérieur sont placées les deux tables de pierre (31:18). Par-dessus vient {theCover}, en or pur, avec deux chérubins d’or martelés dans la même pièce, face à face, les ailes déployées au-dessus (25:17–20). Dieu promit d’y rencontrer Moïse, entre les chérubins (25:22).',
    size: '2½ × 1½ × 1½ coudées (1,1 × 0,7 × 0,7 m)',
  },
  {
    title: '{TheVeil}',
    quote: {
      sg21: '« Puis il apporta l’arche dans le tabernacle, mit le voile de séparation et cacha ainsi l’arche du témoignage, comme l’Eternel le lui avait ordonné. »',
      bds: '« … puis il le fit apporter dans le tabernacle et suspendit le voile de séparation qui abrita des regards le coffre de l’acte de l’alliance, comme l’Eternel l’avait ordonné à Moïse. »',
      neg1979: '« Il apporta l’arche dans le tabernacle; il mit le voile de séparation, et il en couvrit l’arche du témoignage, comme l’Eternel l’avait ordonné à Moïse. »',
      lsg: '« Il apporta l’arche dans le tabernacle; il mit le voile de séparation, et il en couvrit l’arche du témoignage, comme l’Éternel l’avait ordonné à Moïse. »',
    },
    note: '{TheVeil} est fait de {colours} et de fin lin retors, avec des chérubins (26:31). Il est suspendu par des crochets d’or à quatre {pillars}, sous les {clasps} (26:32–33), et sépare le lieu saint du lieu très saint, un cube de dix coudées de côté. Seul le grand-prêtre passait de l’autre côté, une fois par an (Lv 16).',
    size: 'Lieu très saint : 10 × 10 × 10 coudées (4,5 m de côté)',
  },
  {
    title: 'La table',
    quote: {
      sg21: '« Il plaça la table dans la tente de la rencontre, du côté nord du tabernacle, devant le voile, et il y déposa les pains en ordre devant l’Eternel… »',
      bds: '« Il plaça la table dans la tente de la Rencontre sur le côté nord du tabernacle, à l’extérieur du voile, et il y disposa une rangée de pains devant l’Eternel… »',
      neg1979: '« Il plaça la table dans la tente d’assignation, au côté septentrional du tabernacle, en dehors du voile; et il y déposa en ordre les pains, devant l’Eternel… »',
      lsg: '« Il plaça la table dans la tente d’assignation, au côté septentrional du tabernacle, en dehors du voile; et il y déposa en ordre les pains, devant l’Éternel… »',
    },
    note: 'En {acacia} plaqué d’or pur, avec une bordure d’or, un rebord large d’une main et des anneaux pour ses barres (25:23–28). On y plaçait en permanence {theBread} devant {theLord} (25:30). Lévitique 24:5–6 parle de douze pains, disposés en deux rangées de six.',
    size: '2 × 1 × 1½ coudées (90 × 45 × 70 cm)',
  },
  {
    title: 'Le {lampstand}',
    quote: {
      sg21: '« Il plaça le chandelier dans la tente de la rencontre, en face de la table, du côté sud du tabernacle, et il arrangea ses lampes devant l’Eternel… »',
      bds: '« Il installa le chandelier dans la tente de la Rencontre en face de la table, du côté sud du tabernacle. Il y arrangea les lampes devant l’Eternel… »',
      neg1979: '« Il plaça le chandelier dans la tente d’assignation, en face de la table, au côté méridional du tabernacle; et il en arrangea les lampes, devant l’Eternel… »',
      lsg: '« Il plaça le chandelier dans la tente d’assignation, en face de la table, au côté méridional du tabernacle; et il en arrangea les lampes, devant l’Éternel… »',
    },
    note: 'Martelé dans un talent d’or pur : une tige centrale avec trois branches de chaque côté, ornées de coupes en forme de fleur d’amandier (25:31–39). Ses sept lampes éclairent l’espace devant lui (25:37), seule lumière du lieu saint. Sa hauteur n’est pas donnée.',
    size: 'Hauteur non indiquée · un talent d’or, environ 34 kg',
  },
  {
    title: 'L’autel d’or',
    quote: {
      sg21: '« Il plaça l’autel d’or dans la tente de la rencontre, devant le voile, et il y fit brûler le parfum odoriférant… »',
      bds: '« Il plaça l’autel d’or dans la tente de la Rencontre, devant le voile, et y fit brûler le parfum aromatique… »',
      default: '« Il plaça l’autel d’or dans la tente d’assignation, devant le voile; et il y fit brûler le parfum odoriférant… »',
    },
    note: 'L’autel des parfums : en {acacia} plaqué d’or pur, avec des cornes aux angles, une bordure d’or et des anneaux pour les barres (30:1–5). Il se tient devant {theVeil}, face à l’arche qui est derrière (30:6). Chaque matin et chaque soir, quand on préparait les lampes, on y brûlait du parfum (30:7–8).',
    size: '1 × 1 × 2 coudées (45 × 45 × 90 cm)',
  },
  {
    title: 'Le rideau de l’entrée',
    quote: {
      sg21: '« Ensuite il plaça le rideau à l’entrée du tabernacle. »',
      bds: '« Il fixa le rideau à l’entrée du tabernacle. »',
      default: '« Il plaça le rideau à l’entrée du tabernacle. »',
    },
    note: 'Le {tabernacle} est tourné vers l’est, son arrière vers l’ouest (26:22). L’entrée est fermée par un rideau de {colours} et de fin lin retors, brodé mais sans les chérubins {ofTheVeil} (26:36). Il est suspendu par des crochets d’or à cinq {pillars} en {acacia} plaqué d’or, sur des {bases} {ofBronze} (26:37).',
  },
  {
    title: 'L’autel des holocaustes',
    quote: {
      sg21: '« Il plaça l’autel des holocaustes près de l’entrée du tabernacle, de la tente de la rencontre, et il y offrit l’holocauste et l’offrande… »',
      bds: '« Il dressa l’autel des holocaustes à l’entrée du tabernacle, la tente de la Rencontre, et y offrit l’holocauste et l’offrande… »',
      default: '« Il plaça l’autel des holocaustes à l’entrée du tabernacle, de la tente d’assignation; et il y offrit l’holocauste et l’offrande… »',
    },
    note: 'Une caisse creuse en {acacia} plaqué {ofBronze}, avec une corne à chaque angle, une grille {ofBronze} à mi-hauteur, et des anneaux et des barres pour la transporter (27:1–8). Il se dresse en plein air, devant l’entrée. Le texte ne dit pas à quelle distance de la porte.',
    size: '5 × 5 × 3 coudées (2,3 × 2,3 × 1,4 m)',
  },
  {
    title: '{TheLaver}',
    quote: {
      sg21: '« Il plaça la cuve entre la tente de la rencontre et l’autel et il y mit de l’eau pour les ablutions. Moïse, Aaron et ses fils s’y lavèrent les mains et les pieds. »',
      bds: '« Il fit installer la cuve entre la tente de la Rencontre et l’autel et y fit mettre de l’eau pour les ablutions pour que Moïse, Aaron et ses fils s’y lavent les mains et les pieds. »',
      default: '« Il plaça la cuve entre la tente d’assignation et l’autel, et il y mit de l’eau pour les ablutions; Moïse, Aaron et ses fils, s’y lavèrent les mains et les pieds… »',
    },
    note: 'Elle fut faite {ofBronze}, avec sa base {ofBronze}, à partir des miroirs des femmes qui s’assemblaient à l’entrée {ofTheTent} (38:8). Les prêtres s’y lavaient chaque fois qu’ils entraient dans la tente ou s’approchaient de l’autel (30:19–21). Ni sa taille ni sa forme ne sont données. Aaron porte les vêtements du grand-prêtre (28:4–39) : une tunique de fin lin brodée ; la robe de l’éphod, toute de {blue}, avec des clochettes d’or et des grenades tout autour du bord ; l’éphod, avec une pierre d’onyx sur chaque épaule ; le pectoral aux douze pierres, une par tribu ; et {theTurban} de lin avec sa lame d’or. Ses fils portent des tuniques de lin, des ceintures et des {caps} (28:40).',
    size: 'Taille et forme non indiquées',
  },
  {
    title: 'Le {court}',
    quote: {
      sg21: '« Enfin, il dressa le parvis autour du tabernacle et de l’autel et il mit le rideau à la porte de cette cour. C’est ainsi que Moïse mit un terme aux travaux. »',
      bds: '« Il fit dresser les tentures du parvis autour du tabernacle et de l’autel et disposa le rideau à la porte du parvis. Ainsi Moïse acheva les travaux. »',
      default: '« Il dressa le parvis autour du tabernacle et de l’autel, et il mit le rideau à la porte du parvis. Ce fut ainsi que Moïse acheva l’ouvrage. »',
    },
    note: 'Cent coudées sur cinquante, fermé par des toiles de fin lin de cinq coudées de haut, suspendues à des {pillars} sur des {bases} {ofBronze}, avec des crochets et des tringles d’argent, et tenues par des piquets et des cordages {ofBronze} (27:9–19 ; 35:18). L’entrée, à l’est, est large de vingt coudées et fermée par un rideau de {colours} (27:16). Soixante {pillars}, un toutes les cinq coudées, correspondent aux nombres donnés pour chaque côté.',
    size: '100 × 50 coudées (45 × 22,5 m)',
  },
];
