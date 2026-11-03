// French text for "The Dedication of the Wall", merged over data.js (see addLanguage in ../../i18n.js).
// Same shape as data.js, text fields only. Version keys are the French versions
// (sg21, bds, neg1979, lsg); `default` covers the ones not listed. STOPS lines up
// with data.js by position. The city's own names (gates, towers, places) come
// from ../../nehemiahs-wall/lang/fr.js.
//
// Quotations are verbatim, in « … » with non-breaking spaces (U+00A0) inside the
// guillemets and before the high punctuation marks. The LSG writes "Éphraïm".

// The instruments of 12:27: every version has "luths" where the English has
// harps, and the BDS "lyres" where the others have "harpes".
export const INSTRUMENTS = {
  cymbals: 'Cymbales',
  harps: 'Luths',
  lyres: { bds: 'Lyres', default: 'Harpes' },
  trumpets: 'Trompettes',
  david: { bds: 'Instruments de David', default: 'Instruments de musique de David' },
};

export const GATES = {
  ephraim: { name: { lsg: 'Porte d’Éphraïm', default: 'Porte d’Ephraïm' } },
  guard: { name: { bds: 'Porte de la Prison', default: 'Porte de la prison' } },
};

export const PEOPLE = {
  ezra: { name: 'Esdras' },
  nehemiah: { name: 'Néhémie' },
  choir1: { name: 'Le premier chœur' },
  choir2: { name: { sg21: 'Le deuxième chœur', default: 'Le second chœur' } },
};

export const INTRO = {
  title: 'Jérusalem, 445 av. J.-C.',
  ref: 'Néhémie 12:27–43',
  quote: {
    sg21: '« … afin de célébrer la dédicace dans une fête joyeuse, avec des chants de louange, au son des cymbales, des luths et des harpes. » (12:27)',
    bds: '« … afin de célébrer l’événement dans la joie, par la louange et par le chant des cantiques accompagnés par les cymbales, les luths et les lyres. » (12:27)',
    default: '« … afin de célébrer la dédicace et la fête par des louanges et par des chants, au son des cymbales, des luths et des harpes. » (12:27)',
  },
  note: 'La muraille est achevée, en cinquante-deux jours (6:15). Néhémie 12 raconte comment on en fit la dédicace : deux grands chœurs firent le tour de la ville sur la muraille, en sens opposés, et se retrouvèrent dans la maison de Dieu. Cette visite les suit.',
  aside: 'La date n’est pas donnée, seulement que c’était après l’achèvement de la muraille en 445 av. J.-C. La ville est la même reconstitution que dans « La muraille de Néhémie », et les positions sont approximatives.',
};

export const FINALE = {
  title: 'La joie de Jérusalem',
  ref: 'Néhémie 12:43',
  quote: {
    sg21: '« … et l’on a entendu de loin les cris de joie de Jérusalem. »',
    bds: '« … et l’on entendait de loin les cris de joie qui retentissaient à Jérusalem. »',
    default: '« … et les cris de joie de Jérusalem furent entendus au loin. »',
  },
  note: 'Environ 140 ans après que les Babyloniens eurent abattu les murailles (2 R 25:10), la ville a de nouveau une muraille, et le bruit de sa joie traverse le Cédron jusqu’au mont des Oliviers.',
};

export const STOPS = [
  {
    title: { sg21: 'On va chercher les Lévites', bds: 'On fait venir les lévites', default: 'On appelle les Lévites' },
    quote: {
      sg21: '« Au moment de la dédicace de la muraille de Jérusalem, on est allé chercher les Lévites, où qu’ils habitent, et on les a fait venir à Jérusalem… »',
      bds: '« Lors de l’inauguration de la muraille de Jérusalem, on fit venir les lévites à Jérusalem de toutes les localités où ils habitaient… »',
      default: '« Lors de la dédicace des murailles de Jérusalem, on appela les Lévites de tous les lieux qu’ils habitaient et on les fit venir à Jérusalem… »',
    },
    note: {
      bds: 'Les lévites habitaient des villes dans tout Juda (11:20, 36), et les musiciens s’étaient construit des villages autour de Jérusalem : Netopha au sud, Guéba et Azmaveth au nord, et Beth-Guilgal. Le texte ne dit pas d’où partit la procession. La porte de la Vallée, au milieu du côté ouest, convient aux deux parcours ; on s’y rassemble donc ici.',
      default: 'Les Lévites habitaient des villes dans tout Juda (11:20, 36), et les chantres s’étaient bâti des villages autour de Jérusalem : Nethopha au sud, Guéba et Azmaveth au nord, et Beth-Guilgal. Le texte ne dit pas d’où partit la procession. La porte de la vallée, au milieu du côté ouest, convient aux deux parcours ; on s’y rassemble donc ici.',
    },
    who: { sg21: 'Les Lévites · les membres des chorales', bds: 'Les lévites · les musiciens', default: 'Les Lévites · les fils des chantres' },
  },
  {
    title: 'Le peuple, les portes et la muraille purifiés',
    quote: {
      sg21: '« Les prêtres et les Lévites se sont purifiés eux-mêmes, puis ils ont purifié le peuple, les portes et la muraille. »',
      bds: '« Les prêtres et les lévites accomplirent les rites de purification, tant pour eux-mêmes que pour le peuple, pour les portes et pour la muraille. »',
      default: '« Les sacrificateurs et les Lévites se purifièrent, et ils purifièrent le peuple, les portes et la muraille. »',
    },
    note: 'Le texte ne dit pas comment. Quand les Lévites furent mis à part, on les aspergea d’eau et ils lavèrent leurs vêtements (Nb 8:7, 21), et à la Pâque qui suivit la reconstruction du temple, les prêtres et les Lévites se purifièrent ensemble (Esd 6:20). La lumière qui parcourt la muraille ne fait que marquer ce qui est purifié.',
    who: { sg21: 'Les prêtres et les Lévites', bds: 'Les prêtres et les lévites', default: 'Les sacrificateurs et les Lévites' },
  },
  {
    title: 'Sur la muraille',
    quote: {
      sg21: '« J’ai fait monter les chefs de Juda sur la muraille et j’ai mis en place deux grands chœurs avec leur cortège. »',
      bds: '« Je fis monter sur la muraille les chefs de Juda et je formai deux grands chœurs. »',
      default: '« Je fis monter sur la muraille les chefs de Juda, et je formai deux grands chœurs. »',
    },
    note: 'Néhémie le raconte lui-même. Le haut de la muraille forme un chemin tout autour de la ville, à la vue de tous. Quand elle était à moitié bâtie, Tobija s’était moqué en disant qu’un renard qui y monterait la ferait tomber (4:3). Maintenant elle porte deux processions.',
    who: 'Néhémie · les chefs de Juda',
  },
  {
    title: 'Le premier chœur part à droite',
    quote: {
      sg21: '« Le premier s’est mis en marche du côté droit de la muraille, vers la porte du fumier… Le scribe Esdras marchait à leur tête. »',
      bds: '« Le premier se dirigea du côté droit et marcha sur la muraille vers la porte du Fumier… Esdras, le spécialiste de la Loi, était à leur tête. »',
      default: '« Le premier se mit en marche du côté droit sur la muraille, vers la porte du fumier… Esdras, le scribe, était à leur tête. »',
    },
    note: {
      sg21: 'En hébreu, on s’oriente face à l’est : la main droite est donc le sud. Derrière le chœur marchent Hosée et la moitié des chefs de Juda, des prêtres munis de trompettes, et Zacharie, descendant d’Asaph, avec ses frères qui jouaient « des instruments de musique de David, l’homme de Dieu ».',
      bds: 'En hébreu, on s’oriente face à l’est : la main droite est donc le sud. Derrière les choristes marchent Osée et la moitié des chefs de Juda, des prêtres munis de trompettes, et Zacharie, descendant d’Asaph, avec ses collègues qui jouaient « des instruments de David, homme de Dieu ».',
      default: 'En hébreu, on s’oriente face à l’est : la main droite est donc le sud. Derrière le chœur marchent Hosée et la moitié des chefs de Juda, des fils de sacrificateurs avec des trompettes, et Zacharie, descendant d’Asaph, avec ses frères et « les instruments de musique de David, homme de Dieu ».',
    },
    who: {
      sg21: 'Esdras · le premier chœur · Hosée et la moitié des chefs · des prêtres · Zacharie et ses frères',
      bds: 'Esdras · le premier chœur · Osée et la moitié des chefs · des prêtres · Zacharie et ses collègues',
      default: 'Esdras · le premier chœur · Hosée et la moitié des chefs · des fils de sacrificateurs · Zacharie et ses frères',
    },
  },
  {
    title: { sg21: 'Les marches de la ville de David', bds: 'Les marches de la Cité de David', default: 'Les degrés de la cité de David' },
    quote: {
      sg21: '« A la porte de la source, ils ont gravi droit devant eux, par les marches de la ville de David, la montée de la muraille… »',
      bds: '« A la porte de la Source, ils gravirent en face d’eux les marches qui les conduisaient à la Cité de David, par la montée qui mène au rempart… »',
      neg1979: '« A la porte de la source, ils gravirent par la montée de la muraille les degrés de la cité de David qui étaient en face d’eux… »',
      lsg: '« A la porte de la source, ils montèrent vis-à-vis d’eux les degrés de la cité de David par la montée de la muraille… »',
    },
    note: {
      bds: 'Après la porte de la Source, la muraille tourne vers le nord et monte la colline de la Cité de David. On discute pour savoir si le chœur resta sur la muraille ou monta par un escalier à côté, les marches qui descendaient de la ville (3:15). Ici, il reste en haut de la muraille.',
      default: 'Après la porte de la source, la muraille tourne vers le nord et monte la colline de la Cité de David. On discute pour savoir si le chœur resta sur la muraille ou monta par un escalier à côté, les degrés qui descendaient de la ville (3:15). Ici, il reste en haut de la muraille.',
    },
    who: 'Le premier chœur',
  },
  {
    title: {
      sg21: 'Au-dessus du palais de David, jusqu’à la porte des eaux',
      bds: 'Au-dessus de l’ancien palais de David, jusqu’à la porte des Eaux',
      default: 'Au-dessus de la maison de David, jusqu’à la porte des eaux',
    },
    quote: {
      sg21: '« … la montée de la muraille qui surplombe le palais de David, poursuivant leur chemin jusqu’à la porte des eaux, située à l’est. »',
      bds: '« … qui surplombe l’ancien palais de David, puis ils continuèrent jusqu’à la porte des Eaux, du côté oriental de la ville. »',
      default: '« … au-dessus de la maison de David, jusqu’à la porte des eaux, vers l’orient. »',
    },
    note: {
      sg21: 'Ils passent au-dessus de l’ancien palais royal, au sommet de la colline (celui de 3:25), et s’arrêtent sur la porte des eaux, où Esdras avait lu la Loi à tout le peuple (8:1–3). Ils attendent ici pendant que le deuxième chœur fait le tour.',
      bds: 'Ils passent au-dessus de l’ancien palais royal, au sommet de la colline (celui de 3:25), et s’arrêtent sur la porte des Eaux, où Esdras avait lu la Loi à tout le peuple (8:1–3). Ils attendent ici pendant que le second chœur fait le tour.',
      default: 'Ils passent au-dessus de l’ancien palais royal, au sommet de la colline (celui de 3:25), et s’arrêtent sur la porte des eaux, où Esdras avait lu la Loi à tout le peuple (8:1–3). Ils attendent ici pendant que le second chœur fait le tour.',
    },
    who: 'Le premier chœur',
  },
  {
    title: { sg21: 'Le deuxième chœur part dans l’autre sens', bds: 'Le second chœur part à gauche', default: 'Le second chœur part à l’opposé' },
    quote: {
      sg21: '« Le deuxième chœur a pris la direction opposée. Je marchais moi-même derrière lui avec l’autre moitié du peuple, sur la muraille… »',
      bds: '« Le second chœur partit vers la gauche. Je les suivis avec l’autre moitié du peuple sur le haut de la muraille… »',
      neg1979: '« Le second chœur se mit en marche à l’opposé. J’étais derrière lui avec l’autre moitié du peuple, sur la muraille… »',
      lsg: '« Le second chœur se mit en marche à l’opposite. J’étais derrière lui avec l’autre moitié du peuple, sur la muraille… »',
    },
    note: 'Néhémie marche lui-même derrière ce chœur. Son parcours est la muraille du chapitre 3 à l’envers : les mêmes tours et les mêmes portes, nommées dans l’autre sens. Les listes de ce genre sont l’un des principaux moyens de retrouver le tracé de la muraille.',
    who: { sg21: 'Le deuxième chœur · Néhémie et la moitié du peuple', default: 'Le second chœur · Néhémie et la moitié du peuple' },
  },
  {
    title: {
      bds: 'Les portes d’Ephraïm, de la vieille ville et des Poissons',
      lsg: 'La porte d’Éphraïm, la vieille porte et la porte des poissons',
      default: 'La porte d’Ephraïm, la vieille porte et la porte des poissons',
    },
    quote: {
      sg21: '« … au-dessus de la porte d’Ephraïm, de la vieille porte, de la porte des poissons… »',
      bds: '« … au-dessus de la porte d’Ephraïm, de la porte de la vieille ville, puis de la porte des Poissons… »',
      neg1979: '« … puis au-dessus de la porte d’Ephraïm, de la vieille porte, de la porte des poissons… »',
      lsg: '« … puis au-dessus de la porte d’Éphraïm, de la vieille porte, de la porte des poissons… »',
    },
    note: {
      bds: 'La porte d’Ephraïm ne figure pas dans les réparations du chapitre 3, mais elle avait une place où l’on construisit des cabanes pour la fête (8:16). Elle ouvrait sur la route du nord, vers la région montagneuse d’Ephraïm. On la place ici, entre la muraille large et la porte de la vieille ville, d’après l’ordre de ce verset.',
      lsg: 'La porte d’Éphraïm ne figure pas dans les réparations du chapitre 3, mais elle avait une place où l’on construisit des cabanes pour la fête (8:16). Elle ouvrait sur la route du nord, vers la région montagneuse d’Éphraïm. On la place ici, entre la muraille large et la vieille porte, d’après l’ordre de ce verset.',
      default: 'La porte d’Ephraïm ne figure pas dans les réparations du chapitre 3, mais elle avait une place où l’on construisit des cabanes pour la fête (8:16). Elle ouvrait sur la route du nord, vers la région montagneuse d’Ephraïm. On la place ici, entre la muraille large et la vieille porte, d’après l’ordre de ce verset.',
    },
    who: { sg21: 'Le deuxième chœur · Néhémie et la moitié du peuple', default: 'Le second chœur · Néhémie et la moitié du peuple' },
  },
  {
    title: { bds: 'Jusqu’à la porte des Brebis et la porte de la Prison', default: 'Jusqu’à la porte des brebis et la porte de la prison' },
    quote: {
      sg21: '« … de la tour de Hananeel et de la tour de Méa jusqu’à la porte des brebis, avant de s’arrêter à la porte de la prison. »',
      bds: '« … puis la tour de Hananéel et la tour de Méa jusqu’à la porte des Brebis. On s’arrêta à la porte de la Prison. »',
      default: '« … de la tour de Hananeel et de la tour de Méa, jusqu’à la porte des brebis. Et l’on s’arrêta à la porte de la prison. »',
    },
    note: {
      sg21: 'La porte des brebis est l’endroit où la reconstruction avait commencé (3:1) : le deuxième chœur finit donc là où l’ouvrage avait débuté. La porte de la prison n’est mentionnée nulle part ailleurs et l’on ignore où elle se trouvait. Elle est montrée ici comme la porte nord du parvis du temple.',
      bds: 'La porte des Brebis est l’endroit où la reconstruction avait commencé (3:1) : le second chœur finit donc là où l’ouvrage avait débuté. La porte de la Prison n’est mentionnée nulle part ailleurs et l’on ignore où elle se trouvait. Elle est montrée ici comme la porte nord du parvis du temple.',
      default: 'La porte des brebis est l’endroit où la reconstruction avait commencé (3:1) : le second chœur finit donc là où l’ouvrage avait débuté. La porte de la prison n’est mentionnée nulle part ailleurs et l’on ignore où elle se trouvait. Elle est montrée ici comme la porte nord du parvis du temple.',
    },
    who: { sg21: 'Le deuxième chœur · Néhémie et la moitié du peuple', default: 'Le second chœur · Néhémie et la moitié du peuple' },
  },
  {
    title: { bds: 'Dans le temple de Dieu', default: 'Dans la maison de Dieu' },
    quote: {
      sg21: '« Puis les deux chœurs ont pris place dans la maison de Dieu… Les musiciens se sont alors fait entendre, sous la direction de Jizrachja. »',
      bds: '« Les deux chœurs prirent place dans le temple de Dieu… Les musiciens faisaient résonner leurs cantiques sous la direction de Yizrahya. »',
      default: '« Les deux chœurs s’arrêtèrent dans la maison de Dieu… Les chantres se firent entendre, dirigés par Jizrachja. »',
    },
    note: 'Les deux chœurs descendent de la muraille et se retrouvent dans le parvis du temple, l’un venant du sud, l’autre du nord, avec Néhémie, des magistrats et des prêtres munis de trompettes. C’est le temple reconstruit sous Zorobabel et achevé en 516 av. J.-C. (Esd 6:15).',
    who: {
      sg21: 'Les deux chœurs · Néhémie et des magistrats · des prêtres avec des trompettes · Jizrachja',
      bds: 'Les deux chœurs · Néhémie et la moitié des chefs · des prêtres avec des trompettes · Yizrahya',
      default: 'Les deux chœurs · Néhémie et les magistrats · des sacrificateurs avec des trompettes · Jizrachja',
    },
  },
  {
    title: 'De nombreux sacrifices',
    quote: {
      sg21: '« Ce jour-là, les Israélites ont offert de nombreux sacrifices et se sont livrés à des réjouissances, car Dieu leur avait donné un grand sujet de joie. Même les femmes et les enfants se sont livrés aux réjouissances… »',
      bds: '« Les gens offrirent ce jour-là de nombreux sacrifices et ils s’adonnèrent à la joie car Dieu leur avait accordé un grand sujet de joie. Les femmes et les enfants prirent part aux réjouissances… »',
      default: '« On offrit ce jour-là de nombreux sacrifices, et on se livra aux réjouissances, car Dieu avait donné au peuple un grand sujet de joie. Les femmes et les enfants se réjouirent aussi… »',
    },
    note: 'Pas seulement les prêtres, les Lévites et les chefs : les femmes et les enfants se réjouissent aussi. La fumée des offrandes monte de l’autel devant le temple.',
    who: 'Tout le peuple, les femmes et les enfants aussi',
  },
];
