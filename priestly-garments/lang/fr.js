// French text for "The Priestly Garments", merged over data.js (see addLanguage in ../../i18n.js).
// Same shape as data.js, text fields only. Version keys are the French versions
// (sg21, bds, neg1979, lsg); `default` covers the ones not listed. STOPS and
// STONES line up with data.js by position.
//
// Quotations are verbatim, including each version's own spelling (the SG21, BDS
// and NEG1979 write "l’Eternel", the LSG "l’Éternel").

// Words that differ between versions. French nouns carry gender (la tiare / le
// turban, la lame / l’insigne), so where a note needs an article the term
// includes it, and the notes avoid adjectives and pronouns that would have to
// agree with a term.
export const TERMS = {
  tunic: 'tunique',
  theTunic: 'la tunique',
  sash: 'ceinture',
  theSash: 'la ceinture',
  band: { sg21: 'écharpe de l’éphod', default: 'ceinture de l’éphod' },
  theBand: { sg21: 'l’écharpe de l’éphod', default: 'la ceinture de l’éphod' },
  ofTheBand: { sg21: 'de l’écharpe de l’éphod', default: 'de la ceinture de l’éphod' },
  ephod: 'éphod',
  breastpiece: 'pectoral',
  turban: { bds: 'turban', default: 'tiare' },
  theTurban: { bds: 'le turban', default: 'la tiare' },
  ofTheTurban: { bds: 'du turban', default: 'de la tiare' },
  plate: { bds: 'insigne d’or', default: 'lame d’or' },
  thePlate: { bds: 'l’insigne d’or', default: 'la lame d’or' },
  crown: { bds: 'diadème de consécration', default: 'diadème sacré' },
  caps: { sg21: 'coiffes', bds: 'turbans', default: 'bonnets' },
  theCaps: { sg21: 'des coiffes', bds: 'des turbans', default: 'des bonnets' },
  undergarments: 'caleçons de lin',
  theUndergarments: 'des caleçons de lin',
  theUrim: { bds: 'l’ourim et le toummim', default: 'l’urim et le thummim' },
  urim: { bds: 'ourim et toummim', default: 'urim et thummim' },
  ithamar: 'Ithamar',
  blueCord: { bds: 'un cordon de pourpre violette', default: 'un cordon bleu' },
  robeColour: { bds: 'tout entière en pourpre violette', default: 'entièrement d’étoffe bleue' },
  colours: { bds: 'pourpre violette et écarlate, rouge éclatant', default: 'fil bleu, pourpre et cramoisi' },
  laver: 'cuve',
  theLaver: 'la cuve',
  tent: { sg21: 'tente de la rencontre', bds: 'tente de la Rencontre', default: 'tente d’assignation' },
  theTent: { sg21: 'la tente de la rencontre', bds: 'la tente de la Rencontre', default: 'la tente d’assignation' },
  ofTheTent: { sg21: 'de la tente de la rencontre', bds: 'de la tente de la Rencontre', default: 'de la tente d’assignation' },
  theLord: 'l’Éternel',
  ofTheLord: 'de l’Éternel',
  glory: { sg21: 'pour marquer leur importance et l’honneur de leur rang', bds: 'insignes de gloire et de dignité', default: 'pour marquer leur dignité et pour leur servir de parure' },
  // The words engraved on the plate (Exode 28:36).
  holy: { bds: 'Consacré à l’Eternel', lsg: 'Sainteté à l’Éternel', default: 'Sainteté à l’Eternel' },
};

export const MATERIALS = {
  linen: 'Fin lin',
  yarn: '{Colours}',
  gold: 'Or',
  stones: 'Pierres précieuses',
};

export const PEOPLE = {
  aaron: { name: 'Aaron' },
  moses: { name: 'Moïse' },
  nadab: { name: 'Nadab' },
  abihu: { name: 'Abihu' },
  eleazar: { name: 'Éléazar' },
  ithamar: { name: '{Ithamar}' },
};

export const PARTS = {
  tunic: { name: '{Tunic}' },
  sash: { name: '{Sash}' },
  robe: { name: 'Robe' },
  ephod: { name: '{Ephod}' },
  onyx: { name: 'Pierres d’onyx' },
  band: { name: '{Band}' },
  breastpiece: { name: '{Breastpiece}' },
  urim: { name: '{Urim}' },
  turban: { name: '{Turban}' },
  plate: { name: '{Plate}' },
};

export const STONES = [
  { name: 'sardoine' },
  { name: 'topaze' },
  { name: 'émeraude' },
  { name: { bds: 'rubis', default: 'escarboucle' } },
  { name: 'saphir' },
  { name: 'diamant' },
  { name: 'opale' },
  { name: 'agate' },
  { name: 'améthyste' },
  { name: 'chrysolithe' },
  { name: 'onyx' },
  { name: 'jaspe' },
];

export const INTRO = {
  title: 'Vêtements sacrés',
  ref: 'Exode 28:2',
  quote: {
    sg21: '« Tu feras à ton frère Aaron des vêtements sacrés pour marquer son importance et son rang. »',
    bds: '« Tu confectionneras pour ton frère Aaron des vêtements sacrés, insignes de gloire et de dignité. »',
    default: '« Tu feras à Aaron, ton frère, des vêtements sacrés, pour marquer sa dignité et pour lui servir de parure. »',
  },
  note: 'Dieu ordonna à Moïse de faire des vêtements pour Aaron et ses fils, afin qu’ils le servent comme prêtres (28:1–4). Exode 28 décrit chaque pièce et Exode 39 raconte comment elles furent faites. En Lévitique 8, à l’entrée {ofTheTent}, devant toute l’assemblée réunie, Moïse lava Aaron et le revêtit, un vêtement après l’autre. Cette visite suit cet ordre.',
  aside: 'Les dimensions sont en coudées (1 coudée ≈ 45 cm) quand le texte les donne. La plupart des formes et des longueurs ne sont pas données : ce sont des suppositions prudentes, et les notes disent lesquelles.',
};

export const FINALE = {
  title: { sg21: 'Importance et rang', bds: 'Gloire et dignité', default: 'Dignité et parure' },
  ref: 'Lévitique 8:13',
  quote: {
    sg21: '« Moïse fit aussi approcher les fils d’Aaron; il les habilla de tuniques, leur passa des ceintures et leur attacha des coiffes comme l’Eternel le lui avait ordonné. »',
    bds: '« Après cela, il fit avancer les fils d’Aaron, les revêtit de tuniques, leur mit une ceinture et les coiffa de turbans, comme l’Eternel le lui avait ordonné. »',
    neg1979: '« Moïse fit aussi approcher les fils d’Aaron; il les revêtit de tuniques, les ceignit de ceintures, et leur attacha des bonnets comme l’Eternel l’avait ordonné à Moïse. »',
    lsg: '« Moïse fit aussi approcher les fils d’Aaron; il les revêtit de tuniques, les ceignit de ceintures, et leur attacha des bonnets, comme l’Éternel l’avait ordonné à Moïse. »',
  },
  note: 'Entre l’habillement d’Aaron et celui de ses fils, Moïse oignit le tabernacle et tout ce qu’il contenait, et versa l’huile d’onction sur la tête d’Aaron (8:10–12). Les vêtements des fils, eux aussi, furent faits « {glory} » (28:40). Pendant sept jours, les prêtres restèrent à l’entrée {ofTheTent} jusqu’à ce que leur consécration soit accomplie (8:33–35).',
};

export const STOPS = [
  {
    title: 'Le lavage', ref: 'Lévitique 8:6',
    quote: {
      sg21: '« Il fit approcher Aaron et ses fils, et il les lava avec de l’eau. »',
      bds: '« Puis il fit avancer Aaron et ses fils, pour les laver avec de l’eau. »',
      default: '« Moïse fit approcher Aaron et ses fils, et il les lava avec de l’eau. »',
    },
    note: 'Moïse amène Aaron et ses quatre fils, Nadab, Abihu, Éléazar et {ithamar} (Exode 28:1), à {theLaver}, entre {theTent} et l’autel, et les lave. Les prêtres s’y lavaient les mains et les pieds chaque fois qu’ils entraient pour servir (30:19–21 ; 40:31–32). Le texte ne dit pas comment l’eau était puisée ; ici, Moïse la verse avec une cruche, d’abord sur les mains de chacun, puis sur ses pieds. Sous tout le reste, les prêtres portaient {theUndergarments}, des reins jusqu’aux cuisses (28:42–43).',
    made: 'Les artisans (39:28)',
  },
  {
    title: '{TheTunic}', ref: 'Lévitique 8:7',
    quote: {
      sg21: '« Il mit la tunique à Aaron… »',
      bds: '« Ensuite il revêtit Aaron de la tunique… »',
      default: '« Il mit à Aaron la tunique… »',
    },
    note: 'On met d’abord {theTunic}, par-dessus les sous-vêtements. Elle est en fin lin, brodée (28:4, 39). Ni sa longueur ni ses manches ne sont décrites ; ici, elle descend jusqu’aux chevilles. Des tuniques semblables furent tissées pour les fils d’Aaron (39:27).',
    size: 'Non indiquée',
    made: 'Les artisans (39:27)',
  },
  {
    title: '{TheSash}', ref: 'Lévitique 8:7',
    quote: {
      sg21: '« … lui passa la ceinture… »',
      bds: '« … lui noua la ceinture… »',
      default: '« … il le ceignit de la ceinture… »',
    },
    note: 'Fin lin retors et {colours}, ouvrage de brodeur (28:39 ; 39:29). Le texte ne dit ni sa longueur ni comment elle était nouée ; ici, elle fait le tour de la taille et ses extrémités pendent devant. La robe se met par-dessus.',
    size: 'Non indiquée',
    made: 'Les brodeurs (39:29)',
  },
  {
    title: 'La robe', ref: 'Lévitique 8:7',
    quote: {
      sg21: '« … l’habilla de la robe… »',
      bds: '« … et lui mit la robe… »',
      default: '« … il le revêtit de la robe… »',
    },
    note: 'La robe de l’{ephod} est {robeColour}, tissée d’une seule pièce, avec une ouverture pour la tête renforcée d’un bord tissé pour qu’elle ne se déchire pas (28:31–32 ; 39:22–23). Au bas de la robe pendent tout autour des grenades de {colours}, avec une clochette d’or entre chacune (28:33–34). On devait entendre les clochettes quand Aaron entrait dans le lieu saint et quand il en sortait, afin qu’il ne meure pas (28:35). Ni la longueur ni le nombre ne sont donnés : ici, elle descend à mi-mollet, avec 18 de chaque.',
    size: 'Non indiquée',
    made: 'Les tisserands (39:22–26)',
  },
  {
    title: 'L’{ephod}', ref: 'Lévitique 8:7',
    quote: {
      sg21: '« … et plaça sur lui l’éphod, qu’il serra avec l’écharpe de l’éphod dont il l’habilla. »',
      bds: '« … et lui mit la robe et l’éphod par-dessus, il l’entoura avec la ceinture de l’éphod pour l’en revêtir. »',
      default: '« … et il plaça sur lui l’éphod, qu’il serra avec la ceinture de l’éphod dont il le revêtit. »',
    },
    note: 'Or, {colours} et fin lin retors, ouvrage d’artiste (28:6) ; l’or fut battu en lames minces et découpé en fils pour être tissé (39:3). Deux épaulettes le joignent devant et derrière, et {theBand} est du même travail (28:7–8). Sur chaque épaule, une pierre d’onyx sertie d’or porte gravés six noms des fils d’Israël, dans l’ordre de leur naissance, pour qu’Aaron porte leurs noms devant {theLord} (28:9–12). Sa forme n’est pas donnée ; ici, il couvre le corps de la poitrine aux hanches.',
    made: 'Les artisans (39:2–7)',
  },
  {
    title: 'Le {breastpiece}', ref: 'Lévitique 8:8',
    quote: {
      bds: '« Il plaça sur sa poitrine le pectoral… »',
      default: '« Il lui mit le pectoral… »',
    },
    note: 'Fait comme l’{ephod}, et plié en un carré d’un empan de côté (28:15–16). Il porte douze pierres en quatre rangées, chacune sertie d’or et gravée du nom d’une des tribus, pour qu’Aaron porte leurs noms sur son cœur (28:17–21, 29). Des chaînettes d’or attachent ses coins du haut aux montures des épaules, et {blueCord} attache ses anneaux du bas à l’{ephod}, juste au-dessus {ofTheBand}, pour qu’il ne se détache pas (28:22–28). Le texte ne donne pas l’ordre des noms ; ici, c’est l’ordre de naissance.',
    size: 'Un empan de côté, environ 22 cm, plié',
    made: 'Les artisans (39:8–21)',
  },
  {
    title: '{TheUrim}', ref: 'Lévitique 8:8',
    quote: {
      sg21: '« … dans lequel il plaça l’urim et le thummim. »',
      bds: '« … dans lequel il plaça l’ourim et le toummim. »',
      default: '« … et il joignit au pectoral l’urim et le thummim. »',
    },
    note: 'Ils sont mis avec le {breastpiece} plié, pour être sur le cœur d’Aaron quand il se présente devant {theLord} (28:30). Par eux, le prêtre consultait les décisions {ofTheLord} pour Israël (Nombres 27:21). Le texte ne dit jamais de quoi ils étaient faits ni à quoi ils ressemblaient : ici, ce sont seulement deux formes simples glissées dans la poche.',
    size: 'Non décrits',
  },
  {
    title: '{TheTurban}', ref: 'Lévitique 8:9',
    quote: {
      bds: '« Il coiffa sa tête du turban… »',
      default: '« Il posa la tiare sur sa tête… »',
    },
    note: 'En fin lin (28:39 ; 39:28). Sa forme n’est pas décrite ; ici, c’est une longue bande de tissu enroulée autour de la tête. Les fils d’Aaron portaient {theCaps} (28:40).',
    size: 'Non indiquée',
    made: 'Les artisans (39:28)',
  },
  {
    title: '{ThePlate}', ref: 'Lévitique 8:9',
    quote: {
      sg21: '« … et plaça sur le devant de la tiare la lame d’or, le diadème sacré, comme l’Eternel le lui avait ordonné. »',
      bds: '« … sur le devant duquel il ajusta l’insigne d’or, le diadème de consécration, comme l’Eternel le lui avait ordonné. »',
      neg1979: '« … et il plaça sur le devant de la tiare la lame d’or, diadème sacré, comme l’Eternel l’avait ordonné à Moïse. »',
      lsg: '« … et il plaça sur le devant de la tiare la lame d’or, diadème sacré, comme l’Éternel l’avait ordonné à Moïse. »',
    },
    note: 'En or pur, avec les mots « {holy} » gravés comme sur un sceau (28:36 ; 39:30), ici en hébreu. {BlueCord} l’attache au devant {ofTheTurban} (28:37), sur le front d’Aaron : il porte la faute des offrandes saintes que présente Israël, pour qu’elles soient agréées devant {theLord} (28:38). Sa taille n’est pas donnée.',
    size: 'Non indiquée',
    made: 'Les artisans (39:30–31)',
  },
];
