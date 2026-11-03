// French text for "Ezekiel's Temple", merged over data.js (see addLanguage in ../../i18n.js).
// Same shape as data.js, text fields only. Version keys are the French versions
// (sg21, bds, neg1979, lsg); `default` covers the ones not listed. STOPS line up
// with data.js by position.
//
// Quotations are verbatim, in « … » with non-breaking spaces (U+00A0) inside the
// guillemets and before the high punctuation marks. The Segond 21 gives the
// measurements in metres (a long cubit as half a metre); the LSG writes "l’Éternel".

// French nouns carry gender, so where a note needs an article the term includes it.
export const TERMS = {
  rod: { bds: 'règle', default: 'canne' },
  guardrooms: { sg21: 'locaux', bds: 'loges de garde', default: 'chambres' },
  porch: { bds: 'portique', default: 'vestibule' },
  porches: { bds: 'portiques', default: 'vestibules' },
  jambs: { neg1979: 'poteaux', lsg: 'poteaux', default: 'piliers' },
  court: 'parvis',
  theNave: { sg21: 'le lieu saint', bds: 'la grande salle', default: 'le temple' },
  ofTheNave: { sg21: 'du lieu saint', bds: 'de la grande salle', default: 'du temple' },
  theHouse: { sg21: 'le temple', bds: 'le Temple', default: 'la maison' },
  sideChambers: { sg21: 'annexes', bds: 'salles latérales', default: 'chambres latérales' },
  theSeparate: { sg21: 'la cour', bds: 'l’espace libre', default: 'la place vide' },
  palms: { sg21: 'branches de palmier', bds: 'palmiers', default: 'palmes' },
  theBronze: { neg1979: 'l’airain', lsg: 'l’airain', default: 'le bronze' },
  theLord: { lsg: 'l’Éternel', default: 'l’Eternel' },
};

export const FEATURES = {
  eastGate: { name: { sg21: 'Entrée est', default: 'Porte orientale' } },
  northGate: { name: { sg21: 'Entrée nord', default: 'Porte nord' } },
  southGate: { name: { sg21: 'Entrée sud', default: 'Porte sud' } },
  outerCourt: { name: 'Parvis extérieur' },
  chambers: { name: { neg1979: 'Chambres', lsg: 'Chambres', default: 'Salles' } },
  pavement: { name: { neg1979: 'Pavé', lsg: 'Pavé', default: 'Dallage' } },
  innerCourt: { name: 'Parvis intérieur' },
  innerSouth: { name: 'Porte sud intérieure' },
  innerEast: { name: 'Porte orientale intérieure' },
  innerNorth: { name: 'Porte nord intérieure' },
  tables: { name: 'Tables' },
  rinse: { name: 'Salle pour laver' },
  roomN: { name: { neg1979: 'Chambre des sacrificateurs', lsg: 'Chambre des sacrificateurs', default: 'Salle des prêtres' } },
  roomS: { name: { neg1979: 'Chambre des sacrificateurs', lsg: 'Chambre des sacrificateurs', default: 'Salle des prêtres' } },
  altar: { name: 'Autel' },
  porch: { name: { bds: 'Portique', default: 'Vestibule' } },
  columns: { name: 'Colonnes' },
  nave: { name: { sg21: 'Lieu saint', bds: 'Grande salle', default: 'Temple' } },
  mostHoly: { name: 'Lieu très saint' },
  sideChambers: { name: { sg21: 'Annexes', bds: 'Salles latérales', default: 'Chambres latérales' } },
  table: { name: 'Autel de bois' },
  westBuilding: { name: 'Bâtiment' },
  yard: { name: { sg21: 'Cour', bds: 'Espace libre', default: 'Place vide' } },
  priestsN: { name: { neg1979: 'Chambres saintes', lsg: 'Chambres saintes', default: 'Salles saintes' } },
  priestsS: { name: { neg1979: 'Chambres saintes', lsg: 'Chambres saintes', default: 'Salles saintes' } },
  mountain: { name: { sg21: 'Une montagne très haute', bds: 'Une très haute montagne', default: 'Une montagne très élevée' } },
};

export const PEOPLE = {
  man: { name: { bds: 'Le personnage', default: 'L’homme' } },
  ezekiel: { name: 'Ézéchiel' },
};

export const INTRO = {
  title: { sg21: 'Une montagne très haute', bds: 'Une très haute montagne', default: 'Une montagne très élevée' },
  ref: 'Ézéchiel 40:2',
  quote: {
    sg21: '« Il m’y a transporté dans des visions divines et m’a déposé sur une montagne très haute ; du côté sud, on y trouvait comme les bâtiments d’une ville. »',
    bds: '« Il m’emmena, dans des visions reçues de Dieu, au pays d’Israël et me déposa sur une très haute montagne sur laquelle s’élevaient, du côté du sud, des constructions qui ressemblaient à une ville. »',
    neg1979: '« Il m’y transporta, dans des visions divines, et me déposa sur une montagne très élevée, où se trouvait au midi comme une ville construite. »',
    lsg: '« Il m’y transporta, dans des visions divines, et me déposa sur une montagne très élevée, où se trouvait au midi comme une ville construite. »',
  },
  note: 'C’était la vingt-cinquième année de l’exil, quatorze ans après la prise de Jérusalem et l’incendie du temple de Salomon (40:1). Ézéchiel, prêtre parmi les exilés à Babylone (1:3), est transporté en vision sur une montagne du pays d’Israël. Ce qui ressemble à une ville est d’ordinaire compris comme le temple lui-même, avec ses murs et ses portes. Un homme muni d’une {rod} à mesurer le lui montre partie par partie (Ézéchiel 40–42), et chaque partie s’élève à mesure qu’il la mesure.',
  aside: 'Tout est dessiné aux dimensions que donne le texte, en coudée longue (40:5), une coudée et un palme (≈ 52,5 cm). Ézéchiel donne des longueurs et des largeurs, mais presque aucune hauteur : les hauteurs sont donc supposées, et les notes disent où le modèle doit encore supposer. La montagne n’est pas un lieu réel ; la vision ne dit pas où elle se trouve.',
};

export const FINALE = {
  title: 'La gloire revient',
  ref: 'Ézéchiel 43:4–5',
  quote: {
    sg21: '« La gloire de l’Eternel a pénétré dans le temple en passant par l’entrée qui est orientée à l’est. L’Esprit m’a alors enlevé et m’a conduit dans le parvis intérieur. J’ai vu que la gloire de l’Eternel remplissait le temple. »',
    bds: '« La gloire de l’Eternel entra dans le Temple par la porte orientale. L’Esprit m’enleva et me transporta dans le parvis intérieur : la gloire de l’Eternel remplissait le Temple. »',
    neg1979: '« La gloire de l’Eternel entra dans la maison par la porte qui était du côté de l’orient. Alors, l’Esprit m’enleva et me transporta dans le parvis intérieur. Et voici, la gloire de l’Eternel remplissait la maison. »',
    lsg: '« La gloire de l’Éternel entra dans la maison par la porte qui était du côté de l’orient. Alors, l’esprit m’enleva et me transporta dans le parvis intérieur. Et voici, la gloire de l’Éternel remplissait la maison. »',
  },
  note: 'Des années plus tôt, Ézéchiel avait vu la gloire quitter le temple de Salomon par la porte orientale et s’arrêter sur la montagne à l’est de la ville (10:18–19 ; 11:22–23). Elle revient maintenant par le même chemin, avec un bruit semblable à celui des grandes eaux, et la terre resplendit (43:2). Ézéchiel tombe sur sa face (43:3), et {theLord} parle depuis la maison : « voici l’emplacement de mon trône, l’endroit où je poserai la plante de mes pieds. C’est là que j’habiterai pour toujours au milieu des Israélites » (43:7, SG21). Ensuite la porte orientale reste fermée, parce que {theLord} est entré par elle (44:1–2).',
};

export const STOPS = [
  {
    title: { bds: 'Le personnage à la règle d’arpenteur', default: 'L’homme à la canne à mesurer' }, ref: 'Ézéchiel 40:3',
    quote: {
      sg21: '« Il m’y a transporté et j’ai vu un homme dont l’aspect ressemblait à celui du bronze. Il tenait un cordon en lin et une canne servant à mesurer. Il se tenait à l’entrée. »',
      bds: '« Quand il m’eut conduit là-bas, j’aperçus un individu qui paraissait de bronze et qui portait dans sa main un cordeau de lin pour mesurer et une règle d’arpenteur ; il se tenait près de la porte de la ville. »',
      neg1979: '« Il me conduisit là ; et voici, il y avait un homme dont l’aspect était comme l’aspect de l’airain ; il avait dans la main un cordeau de lin et une canne pour mesurer, et il se tenait à la porte. »',
      lsg: '« Il me conduisit là ; et voici, il y avait un homme dont l’aspect était comme l’aspect de l’airain ; il avait dans la main un cordeau de lin et une canne pour mesurer, et il se tenait à la porte. »',
    },
    note: 'L’homme dit à Ézéchiel de regarder de ses yeux, d’écouter de ses oreilles et d’être attentif à tout ce qu’il allait lui montrer, puis de le rapporter à la maison d’Israël (40:4). Le cordeau servait aux grandes distances (47:3), la {rod} aux bâtiments. Qui il est n’est pas dit ; il parle de la part de l’Eternel (44:5) et il est dessiné brillant comme {theBronze}, comme en 1:7. Ézéchiel est dessiné dans une simple tunique.',
    size: 'La {rod} : 6 coudées longues (3,2 m)',
  },
  {
    title: 'Le mur', ref: 'Ézéchiel 40:5',
    quote: {
      sg21: '« Un mur extérieur entourait le temple de tous côtés. Dans la main de l’homme se trouvait une canne à mesurer de 6 mesures ; chaque mesure avait 8 centimètres de plus que la mesure ordinaire. Il a mesuré 3 mètres pour la largeur de l’enceinte et 3 mètres pour sa hauteur. »',
      bds: '« Voici ce que je vis : un mur extérieur entourait le Temple de tous côtés, et le personnage tenait en main une règle d’arpenteur longue de six coudées, en prenant la coudée longue, un peu plus grande que la coudée ordinaire. Il mesura l’épaisseur des murs de cette construction : elle correspondait à la longueur de sa règle. Il trouva la même dimension pour la hauteur. »',
      neg1979: '« Voici, un mur extérieur entourait la maison de tous côtés. Dans la main de l’homme était une canne de six coudées pour mesurer, chaque coudée ayant un palme de plus que la coudée ordinaire. Il mesura la largeur du mur, qui était d’une canne, et la hauteur, qui était d’une canne. »',
      lsg: '« Voici, un mur extérieur entourait la maison de tous côtés. Dans la main de l’homme était une canne de six coudées pour mesurer, chaque coudée ayant un palme de plus que la coudée ordinaire. Il mesura la largeur du mur, qui était d’une canne, et la hauteur, qui était d’une canne. »',
    },
    note: 'La coudée longue est la coudée ordinaire plus un palme, environ 52,5 cm : la {rod} mesure donc un peu plus de 3 m, et le mur est aussi épais que haut. Sa hauteur est dessinée depuis le parvis extérieur, qui se trouve sept marches au-dessus du sol du dehors. Plus loin, l’homme dit à quoi sert ce mur : il « marquait la séparation entre le saint et le profane » (42:20, SG21).',
    size: '6 × 6 coudées longues (3,2 × 3,2 m)',
  },
  {
    title: 'La porte orientale', ref: 'Ézéchiel 40:6',
    quote: {
      sg21: '« Il s’est rendu à l’entrée du côté est et en a gravi les marches. Puis il a mesuré 3 mètres de large pour le seuil de la porte et 3 mètres de large pour l’autre seuil. »',
      bds: '« Puis il alla vers la porte qui faisait face à l’orient et il en gravit les marches. Il mesura le seuil de la porte qui avait une largeur égale à la longueur de sa règle. »',
      neg1979: '« Il alla vers la porte orientale, et il en monta les degrés. Il mesura le seuil de la porte, qui avait une canne en largeur, et l’autre seuil, qui avait une canne en largeur. »',
      lsg: '« Il alla vers la porte orientale, et il en monta les degrés. Il mesura le seuil de la porte, qui avait une canne en largeur, et l’autre seuil, qui avait une canne en largeur. »',
    },
    note: 'À l’intérieur, trois {guardrooms} de chaque côté, chacun d’une {rod} en carré, séparés par cinq coudées, avec une barrière d’une coudée devant (40:7, 10, 12) ; puis le seuil intérieur et un {porch} de huit coudées qui donne sur le parvis (40:8–9). Le passage a dix coudées de large ; des fenêtres donnent sur les {guardrooms}, et des {palms} sont sculptés sur les {jambs} (40:11, 16). Cinquante coudées de long et vingt-cinq de large (40:13, 15). Les hauteurs ne sont pas données ; les soixante coudées de 40:14 sont incertaines, et les {jambs} sont dessinés plus bas.',
    size: '50 × 25 coudées (26 × 13 m) · {guardrooms} de 6 × 6',
  },
  {
    title: 'Le parvis extérieur', ref: 'Ézéchiel 40:17',
    quote: {
      sg21: '« Ensuite, il m’a conduit dans le parvis extérieur. Tout autour se trouvaient des salles et un dallage qui garnissait le parvis. Il y avait 30 salles sur ce dallage. »',
      bds: '« Puis le personnage me conduisit vers le parvis extérieur où se trouvaient des salles. Un dallage faisait tout le tour du parvis. Trente salles donnaient sur ce dallage… »',
      neg1979: '« Il me conduisit dans le parvis extérieur, où se trouvaient des chambres et un pavé tout autour ; il y avait trente chambres sur ce pavé. »',
      lsg: '« Il me conduisit dans le parvis extérieur, où se trouvaient des chambres et un pavé tout autour ; il y avait trente chambres sur ce pavé. »',
    },
    note: 'Le dallage longe le mur, aussi large que les portes sont longues (40:18), plus bas que le parvis intérieur. La taille et la disposition des trente salles ne sont pas données ; elles sont dessinées en rangées de cinq de chaque côté de chaque porte. Plus tard, le peuple mangerait ses sacrifices dans des lieux semblables (comparer 46:21–24). De l’extrémité intérieure de cette porte jusqu’à la porte suivante vers l’intérieur, il y a cent coudées (40:19).',
    size: 'Dallage aussi large qu’une porte est longue · salles non mesurées',
  },
  {
    title: 'La porte nord', ref: 'Ézéchiel 40:22',
    quote: {
      sg21: '« Ses fenêtres, son vestibule et ses branches de palmier sculptées avaient les mêmes dimensions que pour l’entrée du côté est. On y accédait par sept marches en face desquelles se trouvait son vestibule. »',
      bds: '« …ses fenêtres, son portique et ses palmiers avaient aussi les mêmes dimensions que ceux de la porte orientale. On y accédait par sept degrés et l’on avait alors le portique devant soi. »',
      neg1979: '« Ses fenêtres, son vestibule, ses palmes, avaient la même mesure que la porte orientale ; on y montait par sept degrés, devant lesquels était son vestibule. »',
      lsg: '« Ses fenêtres, son vestibule, ses palmes, avaient la même mesure que la porte orientale ; on y montait par sept degrés, devant lesquels était son vestibule. »',
    },
    note: 'La porte tournée vers le nord est semblable à la porte orientale : trois {guardrooms} de chaque côté, cinquante coudées de long et vingt-cinq de large (40:20–21). Ses sept marches montent depuis le sol en dehors du mur, si bien que le parvis extérieur domine le sommet de la montagne. Les marches de la porte orientale ne sont pas comptées (40:6) ; elles sont dessinées de même.',
    size: '50 × 25 coudées · 7 marches',
  },
  {
    title: 'La porte sud', ref: 'Ézéchiel 40:24',
    quote: {
      sg21: '« Puis il m’a amené du côté sud, où se trouvait aussi une entrée. Il a mesuré ses piliers et son vestibule, qui avaient les mêmes dimensions que pour les autres entrées. »',
      bds: '« Ensuite il me conduisit du côté sud où je vis la porte méridionale. Il en mesura les piliers et le portique qui avaient les mêmes dimensions que les autres. »',
      neg1979: '« Il me conduisit du côté du midi, où se trouvait la porte méridionale. Il en mesura les poteaux et les vestibules, qui avaient la même mesure. »',
      lsg: '« Il me conduisit du côté du midi, où se trouvait la porte méridionale. Il en mesura les poteaux et les vestibules, qui avaient la même mesure. »',
    },
    note: 'Une troisième porte, semblable aux autres, avec ses sept marches et des {palms} sur les {jambs} (40:25–26). Il n’y a pas de porte à l’ouest : la maison et le bâtiment qui est derrière occupent ce côté, et l’on n’entre que par l’est, le nord ou le sud. Selon 46:9, qui entre par la porte nord sort par la porte sud, et qui entre par la porte sud sort par la porte nord.',
    size: '50 × 25 coudées · 7 marches',
  },
  {
    title: 'La porte sud du parvis intérieur', ref: 'Ézéchiel 40:31',
    quote: {
      sg21: '« Son vestibule débouchait sur le parvis extérieur. Il y avait des branches de palmier sculptées sur ses piliers, et huit marches pour y accéder. »',
      bds: '« Son portique donnait sur le parvis extérieur, ses piliers étaient ornés de palmiers et son escalier avait huit marches. »',
      neg1979: '« Les vestibules de la porte aboutissaient au parvis extérieur ; il y avait des palmes sur ses poteaux, et huit degrés pour y monter. »',
      lsg: '« Les vestibules de la porte aboutissaient au parvis extérieur ; il y avait des palmes sur ses poteaux, et huit degrés pour y monter. »',
    },
    note: 'À cent coudées de la porte sud extérieure se trouve la porte intérieure, de mêmes dimensions (40:27–29), mais retournée : son {porch} donne sur le parvis extérieur, et huit marches de plus montent au parvis intérieur. Le mur du parvis intérieur n’est pas décrit ; un mur bas est dessiné autour de sa terrasse. Les {porches} de vingt-cinq coudées sur cinq du verset 30 sont obscurs et ne sont pas dessinés.',
    size: '50 × 25 coudées · 8 marches',
  },
  {
    title: 'Les portes est et nord du parvis intérieur', ref: 'Ézéchiel 40:32',
    quote: {
      sg21: '« Puis il m’a conduit dans le parvis intérieur par le côté est. Il a mesuré l’entrée, qui avait les mêmes dimensions que les autres entrées. »',
      bds: '« Puis il me conduisit dans le parvis intérieur par le côté est et il mesura la porte qui avait les mêmes dimensions que les autres… »',
      neg1979: '« Il me conduisit dans le parvis intérieur, par l’entrée orientale. Il mesura la porte, qui avait la même mesure. »',
      lsg: '« Il me conduisit dans le parvis intérieur, par l’entrée orientale. Il mesura la porte, qui avait la même mesure. »',
    },
    note: 'Puis la porte nord (40:35–37). Les six portes sont semblables : cinquante coudées sur vingt-cinq, trois {guardrooms} de chaque côté, des fenêtres et des {palms} sur les {jambs} ; les portes extérieures ont sept marches, les portes intérieures huit. Chaque porte intérieure fait face à une porte extérieure, à cent coudées (40:23, 27).',
    size: 'Chacune 50 × 25 coudées · 8 marches',
  },
  {
    title: 'Les tables pour l’holocauste', ref: 'Ézéchiel 40:39',
    quote: {
      sg21: '« De chaque côté du vestibule de l’entrée se trouvaient deux tables sur lesquelles on devait égorger les animaux destinés aux holocaustes, aux sacrifices d’expiation et aux sacrifices de culpabilité. »',
      bds: '« Dans le portique de la porte se trouvaient deux tables de chaque côté sur lesquelles étaient égorgées les victimes destinées aux holocaustes, aux sacrifices pour le péché et aux sacrifices de réparation. »',
      neg1979: '« Dans le vestibule de la porte se trouvaient de chaque côté deux tables, sur lesquelles on devait égorger l’holocauste, le sacrifice d’expiation et le sacrifice de culpabilité. »',
      lsg: '« Dans le vestibule de la porte se trouvaient de chaque côté deux tables, sur lesquelles on devait égorger l’holocauste, le sacrifice d’expiation et le sacrifice de culpabilité. »',
    },
    note: 'Deux autres de chaque côté en dehors du {porch}, quand on monte (40:40–41), huit en tout, et quatre tables en pierre de taille, d’une coudée et demie de côté et d’une coudée de haut, pour les couteaux (40:42). Une salle avec son entrée près de la porte servait à laver l’holocauste (40:38). Le texte nomme la porte nord (40:40), et les holocaustes étaient égorgés du côté nord de l’autel (Lévitique 1:11) : les tables sont donc dessinées là. Les crochets d’un palme (40:43) sont trop petits pour être montrés.',
    size: 'Tables de pierre de 1½ × 1½ × 1 coudée',
  },
  {
    title: { neg1979: 'Les chambres des sacrificateurs', lsg: 'Les chambres des sacrificateurs', default: 'Les salles des prêtres' }, ref: 'Ézéchiel 40:45–46',
    quote: {
      sg21: '« L’homme m’a dit : “Cette salle orientée au sud est destinée aux prêtres qui ont la charge du temple, alors que la salle orientée au nord est destinée aux prêtres qui ont la charge de l’autel. Parmi les Lévites, ce sont les descendants de Tsadok qui s’approchent de l’Eternel pour le servir.” »',
      bds: '« Le personnage me dit : Cette salle dont la façade est au sud est réservée aux prêtres chargés du service du Temple, et celle dont la façade est au nord est pour les prêtres qui assurent le service de l’autel : ce sont les descendants de Tsadoq qui, parmi les descendants de Lévi, s’approchent de l’Eternel pour officier pour son culte. »',
      neg1979: '« Il me dit : Cette chambre, dont la face est au midi, est pour les sacrificateurs qui ont la garde de la maison ; et la chambre dont la face est au septentrion est pour les sacrificateurs qui ont la garde de l’autel. Ce sont les fils de Tsadok, qui, parmi les fils de Lévi, s’approchent de l’Eternel pour le servir. »',
      lsg: '« Il me dit : Cette chambre, dont la face est au midi, est pour les sacrificateurs qui ont la garde de la maison ; et la chambre dont la face est au septentrion est pour les sacrificateurs qui ont la garde de l’autel. Ce sont les fils de Tsadok, qui, parmi les fils de Lévi, s’approchent de l’Éternel pour le servir. »',
    },
    note: 'L’une est à côté de la porte nord, tournée vers le sud, l’autre à côté de la porte sud, tournée vers le nord (40:44). L’hébreu les appelle salles des chantres et place la seconde près de la porte orientale (ainsi la SG21 et la NEG1979) ; le grec a deux salles et la porte sud, comme la Semeur. Leurs dimensions ne sont pas données.',
    size: 'Non mesurées',
  },
  {
    title: 'Le parvis intérieur et l’autel', ref: 'Ézéchiel 40:47',
    quote: {
      sg21: '« Il a mesuré le parvis : il faisait 50 mètres de long et 50 mètres de large, il était carré. L’autel était devant le temple. »',
      bds: '« Puis il mesura le parvis, qui formait un carré de cent coudées de côté. L’autel se trouvait devant le Temple. »',
      neg1979: '« Il mesura le parvis, qui avait cent coudées de longueur et cent coudées de largeur, en carré. L’autel était devant la maison. »',
      lsg: '« Il mesura le parvis, qui avait cent coudées de longueur et cent coudées de largeur, en carré. L’autel était devant la maison. »',
    },
    note: 'Son cordeau trace le carré, dallé plus clair que les cours derrière lui. L’autel est mesuré plus loin, en 43:13–17 : une base entourée d’une rigole, deux ressauts, et un foyer de douze coudées de côté avec quatre cornes, ses marches tournées vers l’est. Il est dessiné ainsi, au milieu du parvis : environ onze coudées de haut, dix-huit de côté à la base. Les prêtres y offriraient des holocaustes et des sacrifices de communion, et {theLord} les accepterait (43:27).',
    size: 'Parvis de 100 × 100 coudées (52 m) · foyer de l’autel de 12 × 12',
  },
  {
    title: { bds: 'Le portique du Temple', sg21: 'Le vestibule du temple', default: 'Le vestibule de la maison' }, ref: 'Ézéchiel 40:49',
    quote: {
      sg21: '« Le vestibule avait une longueur de 10 mètres et une largeur de 5 mètres et demi. On y accédait par des marches. Il y avait des colonnes à côté des piliers, l’une d’un côté et l’autre de l’autre. »',
      bds: '« Le portique avait vingt coudées sur douze. On y accédait par des marches et, de chaque côté, près des piliers, se dressait une colonne. »',
      neg1979: '« Le vestibule avait une longueur de vingt coudées et une largeur de onze coudées ; on y montait par des degrés. Il y avait des colonnes près des poteaux, l’une d’un côté, et l’autre de l’autre. »',
      lsg: '« Le vestibule avait une longueur de vingt coudées et une largeur de onze coudées ; on y montait par des degrés. Il y avait des colonnes près des poteaux, l’une d’un côté, et l’autre de l’autre. »',
    },
    note: 'La maison se dresse sur une plate-forme haute d’une {rod} entière (41:8). Le {porch} a douze coudées de profondeur selon le grec (Semeur), onze selon l’hébreu (NEG1979, LSG) ; douze sont dessinées, ce qui donne à la maison cent coudées de long (41:13). Son entrée a quatorze coudées de large entre des {jambs} de cinq coudées (40:48). Le grec compte dix marches. Les deux colonnes rappellent Jakin et Boaz (1 Rois 7:21) ; leurs dimensions ne sont pas données.',
    size: '{Porch} de 20 × 12 coudées · plate-forme de 6 de haut',
  },
  {
    title: { sg21: 'Le lieu saint', bds: 'La grande salle', default: 'Le temple' }, ref: 'Ézéchiel 41:2',
    quote: {
      sg21: '« La largeur de l’ouverture faisait 5 mètres. Il y avait 2 mètres et demi d’un côté de l’entrée et 2 mètres et demi de l’autre. Il a mesuré 20 mètres pour la longueur du lieu saint et 10 mètres pour sa largeur. »',
      bds: '« La porte avait dix coudées de largeur et ses murs latéraux, de part et d’autre, cinq coudées. Il mesura la longueur de la grande salle : quarante coudées, et sa largeur : vingt coudées. »',
      neg1979: '« La largeur de la porte était de dix coudées ; il y avait cinq coudées d’un côté de la porte, et cinq coudées de l’autre. Il mesura la longueur du temple, quarante coudées, et la largeur, vingt coudées. »',
      lsg: '« La largeur de la porte était de dix coudées ; il y avait cinq coudées d’un côté de la porte, et cinq coudées de l’autre. Il mesura la longueur du temple, quarante coudées, et la largeur, vingt coudées. »',
    },
    note: 'Les murs ont six coudées d’épaisseur (41:1, 5) ; la salle mesure quarante sur vingt, comme la grande salle du temple de Salomon (1 Rois 6:17). La hauteur de la maison n’est pas donnée ; elle est dessinée de trente coudées comme celle de Salomon, et le mur sud est retiré pour voir à l’intérieur. Ézéchiel entre jusque dans {theNave} ; il est prêtre, mais seul l’homme va plus loin.',
    size: '40 × 20 coudées (21 × 10,5 m) · murs de 6',
  },
  {
    title: 'Le lieu très saint', ref: 'Ézéchiel 41:4',
    quote: {
      sg21: '« Il a mesuré une longueur de 10 mètres et une largeur de 10 mètres devant le temple, puis il m’a dit : “Voici le lieu très saint.” »',
      bds: '« Il mesura la longueur de la pièce : vingt coudées, et autant de largeur face à la grande salle. Puis il me dit : Cette partie est le lieu très saint. »',
      neg1979: '« Il mesura une longueur de vingt coudées, et une largeur de vingt coudées, sur le devant du temple ; et il me dit : C’est ici le lieu très saint. »',
      lsg: '« Il mesura une longueur de vingt coudées, et une largeur de vingt coudées, sur le devant du temple ; et il me dit : C’est ici le lieu très saint. »',
    },
    note: 'Ici, seul l’homme entre (41:3) ; Ézéchiel reste dans {theNave}. Le mur entre les deux salles a deux coudées d’épaisseur, avec une entrée de six coudées. La salle a vingt coudées de côté comme celle de Salomon (1 Rois 6:20), mais rien ne s’y trouve : ni arche, ni chérubins, ni voile. Ézéchiel ne saura ce qui la remplit qu’au retour de la gloire (43:5).',
    size: '20 × 20 coudées (10,5 m) · entrée de 6',
  },
  {
    title: { sg21: 'Les annexes', bds: 'Les salles latérales', default: 'Les chambres latérales' }, ref: 'Ézéchiel 41:6',
    quote: {
      sg21: '« Ces annexes étaient disposées les unes à côté des autres sur trois étages, au nombre de 30 par étage. Elles s’inséraient dans un mur construit pour elles tout autour du temple ; elles y étaient encastrées et n’étaient pas encastrées dans le mur même du temple. »',
      bds: '« Il y avait trois étages de trente salles qui étaient soutenues par un mur construit autour du Temple, de manière à ce que ces chambres s’y encastrent, sans être encastrées dans le mur même du Temple. »',
      neg1979: '« Les chambres latérales étaient les unes à côté des autres, au nombre de trente, et il y avait trois étages ; elles entraient dans un mur construit pour ces chambres tout autour de la maison, elles y étaient appuyées sans entrer dans le mur même de la maison. »',
      lsg: '« Les chambres latérales étaient les unes à côté des autres, au nombre de trente, et il y avait trois étages ; elles entraient dans un mur construit pour ces chambres tout autour de la maison, elles y étaient appuyées sans entrer dans le mur même de la maison. »',
    },
    note: 'Quatre coudées de large en bas, plus larges à chaque étage à mesure que le mur se retire (41:5, 7), comme dans le temple de Salomon (1 Rois 6:6). Leur mur extérieur a cinq coudées d’épaisseur, avec une porte au nord et une au sud qui donnent sur un espace libre de cinq coudées sur la plate-forme, et tout autour une cour de vingt coudées (41:9–11). La hauteur des étages n’est pas donnée ; ils sont dessinés de six coudées.',
    size: '4 coudées de large · mur extérieur de 5 · 3 étages de 30',
  },
  {
    title: 'Le bâtiment à l’ouest', ref: 'Ézéchiel 41:12',
    quote: {
      sg21: '« Le bâtiment qui était devant une cour, à l’ouest, avait une largeur de 35 mètres, un mur de 2 mètres et demi d’épaisseur tout autour et une longueur de 45 mètres. »',
      bds: '« Du côté ouest, il y avait un bâtiment large de soixante-dix coudées attenant à l’espace libre ; sa muraille, longue de quatre-vingt-dix coudées, avait cinq coudées d’épaisseur sur tout le pourtour. »',
      neg1979: '« Le bâtiment qui était devant la place vide, du côté de l’occident, avait une largeur de soixante-dix coudées, un mur de cinq coudées d’épaisseur tout autour, et une longueur de quatre-vingt-dix coudées. »',
      lsg: '« Le bâtiment qui était devant la place vide, du côté de l’occident, avait une largeur de soixante-dix coudées, un mur de cinq coudées d’épaisseur tout autour, et une longueur de quatre-vingt-dix coudées. »',
    },
    note: 'Derrière la maison, de l’autre côté de {theSeparate}, se dresse un grand bâtiment dont l’usage n’est pas dit ; il occupe le côté ouest, où il n’y a pas de porte. Sa hauteur et ses portes ne sont pas données non plus. Soixante-dix sur quatre-vingt-dix à l’intérieur, il mesure avec ses murs quatre-vingts sur cent, et avec {theSeparate} devant lui, cent coudées d’est en ouest (41:13).',
    size: '70 × 90 coudées à l’intérieur (37 × 47 m) · murs de 5',
  },
  {
    title: 'Cent coudées', ref: 'Ézéchiel 41:13',
    quote: {
      sg21: '« L’homme a mesuré le temple : il faisait 50 mètres de long. La cour, le bâtiment et ses murs avaient une longueur de 50 mètres. »',
      bds: '« Le personnage mesura le Temple ; longueur : cent coudées et même dimension pour l’espace libre, le bâtiment occidental et ses murailles. »',
      neg1979: '« Il mesura la maison, qui avait cent coudées de longueur. La place vide, le bâtiment et ses murs, avaient une longueur de cent coudées. »',
      lsg: '« Il mesura la maison, qui avait cent coudées de longueur. La place vide, le bâtiment et ses murs, avaient une longueur de cent coudées. »',
    },
    note: 'La façade de la maison avec les cours de chaque côté mesure aussi cent coudées (41:14) : la maison et ses cours forment un carré comme le parvis intérieur devant elle, que son cordeau trace. D’avant en arrière : le {porch} 5 + 12, le mur 6, {theNave} 40, le mur 2, le lieu très saint 20, le mur 6, les {sideChambers} 4 et leur mur 5. Aucun toit n’est mentionné ; un toit est dessiné.',
    size: 'La maison : 100 × 100 coudées avec ses cours (52 m)',
  },
  {
    title: { sg21: 'Chérubins et branches de palmier', bds: 'Chérubins et palmiers', default: 'Chérubins et palmes' }, ref: 'Ézéchiel 41:18–19',
    quote: {
      sg21: '« …on avait sculpté des chérubins et des branches de palmier. Il y avait une branche de palmier entre deux chérubins. Chaque chérubin avait deux visages : un visage d’homme tourné d’un côté vers la branche de palmier, et une face de lion tournée de l’autre côté vers l’autre branche de palmier. C’était comme cela tout autour du temple… »',
      bds: '« …on avait sculpté des chérubins et des palmiers : un palmier entre deux chérubins. Chaque chérubin avait deux faces : une face d’homme tournée vers l’un des palmiers et une face de lion tournée vers l’autre. Ces décorations se retrouvaient tout autour de la maison. »',
      neg1979: '« …et orné de chérubins et de palmes. Il y avait une palme entre deux chérubins. Chaque chérubin avait deux visages, une face d’homme tournée d’un côté vers la palme, et une face de lion tournée de l’autre côté vers l’autre palme ; il en était ainsi tout autour de la maison. »',
      lsg: '« …et orné de chérubins et de palmes. Il y avait une palme entre deux chérubins. Chaque chérubin avait deux visages, une face d’homme tournée d’un côté vers la palme, et une face de lion tournée de l’autre côté vers l’autre palme ; il en était ainsi tout autour de la maison. »',
    },
    note: 'Les murs sont lambrissés de bois du sol jusqu’aux fenêtres (41:16–17), et sculptés du sol jusqu’au-dessus de l’entrée (41:20). Contrairement à celui de Salomon, il n’est pas question d’or. Dans {theNave} se trouve un autel de bois, haut de trois coudées et long de deux : « Voici la table qui est devant l’Eternel » (41:22, SG21). Sa largeur n’est pas donnée ; il est dessiné de deux coudées de côté.',
    size: 'Autel de bois de 2 × 2 × 3 coudées',
  },
  {
    title: 'Les portes à deux battants', ref: 'Ézéchiel 41:23–24',
    quote: {
      sg21: '« Le lieu saint du temple et le lieu très saint avaient deux portes. Ces portes avaient deux battants pivotants, deux battants pour une porte et deux pour l’autre. »',
      bds: '« La grande salle et le sanctuaire avaient chacun une double porte à deux battants pivotants. »',
      neg1979: '« Le temple et le sanctuaire avaient deux portes. Il y avait aux portes deux battants, qui tous deux tournaient sur les portes, deux battants pour une porte et deux pour l’autre. »',
      lsg: '« Le temple et le sanctuaire avaient deux portes. Il y avait aux portes deux battants, qui tous deux tournaient sur les portes, deux battants pour une porte et deux pour l’autre. »',
    },
    note: 'Les portes {ofTheNave} étaient sculptées de chérubins et de palmes comme les murs, et devant le {porch} il y avait un seuil ou un auvent de bois ; le mot est incertain (41:25), et un auvent est dessiné. Le {porch} avait des fenêtres étroites et des palmes sur ses côtés (41:26). Les portes sont dessinées ouvertes, chaque battant replié en deux.',
    size: 'Entrées de 10 et 6 coudées',
  },
  {
    title: { neg1979: 'Les chambres saintes', lsg: 'Les chambres saintes', default: 'Les salles saintes' }, ref: 'Ézéchiel 42:13',
    quote: {
      sg21: '« Il m’a dit : “Les salles du nord et les salles du sud qui sont devant la cour, ce sont les salles saintes où les prêtres qui s’approchent de l’Eternel mangeront les choses très saintes. Ils y déposeront les offrandes très saintes, les offrandes végétales, les sacrifices d’expiation et les sacrifices de culpabilité, car c’est un endroit saint. »',
      bds: '« Le personnage me dit : Les salles du côté nord et celles du côté sud qui donnent sur l’espace libre, sont des salles saintes où les prêtres qui officient pour l’Eternel mangeront les aliments très saints ; c’est là qu’ils les déposeront ainsi que l’offrande végétale et la viande des sacrifices pour le péché et des sacrifices de réparation. Car ce lieu est saint. »',
      neg1979: '« Il me dit : Les chambres du septentrion et les chambres du midi, qui sont devant la place vide, ce sont les chambres saintes, où les sacrificateurs qui s’approchent de l’Eternel mangeront les choses très saintes ; ils y déposeront les choses très saintes, les offrandes, les victimes présentées dans les sacrifices d’expiation et de culpabilité ; car le lieu est saint. »',
      lsg: '« Il me dit : Les chambres du septentrion et les chambres du midi, qui sont devant la place vide, ce sont les chambres saintes, où les sacrificateurs qui s’approchent de l’Éternel mangeront les choses très saintes ; ils y déposeront les choses très saintes, les offrandes, les victimes présentées dans les sacrifices d’expiation et de culpabilité ; car le lieu est saint. »',
    },
    note: 'De chaque côté de la maison, dans le parvis extérieur : un bâtiment de cent coudées le long de la cour et un de cinquante du côté extérieur, sur trois étages en retrait, avec une allée de dix coudées entre eux et l’entrée du côté est (42:1–12). Les prêtres y laissent leurs vêtements saints avant de sortir vers le peuple (42:14). Cette disposition est une lecture parmi d’autres d’un passage difficile.',
    size: '100 × 50 coudées · allée de 10',
  },
  {
    title: 'Cinq cents', ref: 'Ézéchiel 42:20',
    quote: {
      sg21: '« Il a donc mesuré les quatre côtés du mur formant l’enceinte du temple : sa longueur était d’un kilomètre et demi et sa largeur d’un kilomètre et demi. Ce mur marquait la séparation entre le saint et le profane. »',
      bds: '« Il mesura les quatre côtés. Il y avait là une muraille, dont la longueur et la largeur faisaient cinq cents coudées, pour séparer le sacré du profane. »',
      neg1979: '« Il mesura des quatre côtés le mur formant l’enceinte de la maison ; la longueur était de cinq cents cannes, et la largeur de cinq cents cannes ; ce mur marquait la séparation entre le saint et le profane. »',
      lsg: '« Il mesura des quatre côtés le mur formant l’enceinte de la maison ; la longueur était de cinq cents cannes, et la largeur de cinq cents cannes ; ce mur marquait la séparation entre le saint et le profane. »',
    },
    note: 'L’homme fit sortir Ézéchiel par la porte orientale et mesura tout autour (42:15–19). L’hébreu a cinq cents cannes de côté, environ un kilomètre et demi (SG21, NEG1979, LSG) ; le grec a des coudées (Semeur). Les parvis et les portes du chapitre 40 font en tout cinq cents coudées, et c’est ainsi qu’il est dessiné. En 45:2, le sanctuaire est de nouveau un carré de cinq cents.',
    size: '500 × 500 coudées (262 m)',
  },
];
