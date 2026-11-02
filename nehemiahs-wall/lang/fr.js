// French text for "Nehemiah's Wall", merged over data.js (see addLanguage in ../../i18n.js).
// Same shape as data.js, text fields only. Version keys are the French versions
// (sg21, bds, neg1979, lsg); `default` covers the ones not listed. STOPS lines up
// with data.js by position.
//
// Quotations are verbatim, including each version's own spelling and names
// (the LSG writes "Éliaschib", "Élul"; the NEG1979 "Eliaschib", "Elul").

// The gate parts follow each version's wording of Nehemiah 3:3-15. Where the Hebrew
// has beams (3:3, 3:6) the SG21, NEG1979 and LSG say the gate was covered, as they
// also do for the Fountain Gate's roof (3:15); only the BDS has a "charpente".
export const PARTS = {
  beams: { bds: 'Charpente', default: 'Couverte' },
  doors: 'Battants',
  bolts: 'Verrous',
  bars: 'Barres',
  covered: 'Toit',
  consecrated: 'Consacrée',
};

export const GATES = {
  sheep: { name: { bds: 'Porte des Brebis', default: 'Porte des brebis' }, repair: 'Bâtie' },
  fish: { name: { bds: 'Porte des Poissons', default: 'Porte des poissons' }, repair: 'Bâtie' },
  old: { name: { bds: 'Vieille Porte', default: 'Vieille porte' }, repair: 'Réparée' },
  valley: { name: { bds: 'Porte de la Vallée', default: 'Porte de la vallée' }, repair: 'Réparée et bâtie' },
  dung: { name: { bds: 'Porte du Fumier', default: 'Porte du fumier' }, repair: 'Réparée et bâtie' },
  fountain: { name: { bds: 'Porte de la Source', default: 'Porte de la source' }, repair: 'Réparée et bâtie' },
  water: { name: { bds: 'Porte des Eaux', default: 'Porte des eaux' }, repair: 'Le texte ne dit pas qu’elle fut réparée' },
  horse: {
    name: { bds: 'Porte des Chevaux', default: 'Porte des chevaux' },
    repair: { neg1979: 'Les sacrificateurs travaillèrent au-dessus', lsg: 'Les sacrificateurs travaillèrent au-dessus', default: 'Les prêtres travaillèrent au-dessus' },
  },
  east: { name: { sg21: 'Porte de l’est', bds: 'Porte de l’Orient', default: 'Porte de l’orient' }, repair: 'Seul son gardien est nommé' },
  muster: {
    name: { bds: 'Porte de la Surveillance', default: 'Porte de Miphkad' },
    repair: 'Les réparations allèrent jusqu’en face',
  },
};

export const TOWERS = {
  meah: { name: 'Tour de Méa' },
  hananel: { name: { bds: 'Tour de Hananéel', default: 'Tour de Hananeel' } },
  ovens: { name: { bds: 'Tour des Fours', default: 'Tour des fours' } },
  kingtower: { name: { sg21: 'Haute tour du palais royal', bds: 'Tour supérieure du palais royal', default: 'Tour supérieure de la maison du roi' } },
  greattower: { name: { sg21: 'Grande tour qui dépasse', default: 'Grande tour en saillie' } },
  corner2: { name: { sg21: 'Chambre à l’étage du coin', bds: 'Poste de guet de l’angle', default: 'Chambre haute du coin' } },
};

export const FEATURES = {
  temple: { name: 'Le temple' },
  broadWall: { name: { bds: 'Muraille élargie', default: 'Muraille large' } },
  poolSiloam: { name: { sg21: 'Bassin de Siloé', bds: 'Étang de l’aqueduc', default: 'Étang de Siloé' } },
  kingsGarden: { name: 'Jardin du roi' },
  stairs: { name: { sg21: 'Marches de la ville de David', bds: 'Marches de la Cité de David', default: 'Degrés de la cité de David' } },
  tombs: { name: { sg21: 'Tombeaux de David', bds: 'Cimetière de David', default: 'Sépulcres de David' } },
  artificialPool: { name: { sg21: 'Bassin artificiel', bds: 'Réservoir artificiel', default: 'Étang construit' } },
  mighty: { name: { sg21: 'Maison des hommes vaillants', bds: 'Caserne', default: 'Maison des héros' } },
  armory: { name: 'Montée de l’arsenal' },
  eliashib: {
    name: { neg1979: 'Maison du souverain sacrificateur Eliaschib', lsg: 'Maison du souverain sacrificateur Éliaschib', default: 'Maison du grand-prêtre Eliashib' },
  },
  angle: { name: { bds: 'La saillie', default: 'L’angle' } },
  kingsHouse: { name: { sg21: 'Palais royal et cour de la prison', bds: 'Palais royal et cour de la prison', default: 'Maison du roi et cour de la prison' } },
  gihon: { name: 'Source de Guihon' },
  ophel: { name: 'Ophel' },
  cityOfDavid: { name: { sg21: 'Ville de David', default: 'Cité de David' } },
  kidron: { name: 'Vallée du Cédron' },
  kidronN: { name: 'Vallée du Cédron' },
  hinnom: { name: 'Vallée de Hinnom' },
  olives: { name: 'Mont des Oliviers' },
};

export const INTRO = {
  title: 'Jérusalem, 445 av. J.-C.',
  ref: 'Néhémie 1–3',
  quote: {
    sg21: '« … La muraille de Jérusalem est pleine de brèches et ses portes ont été réduites en cendres. » (1:3)',
    bds: '« … il y a des brèches dans la muraille de Jérusalem et ses portes ont été détruites par le feu. » (1:3)',
    default: '« … les murailles de Jérusalem sont en ruines, et ses portes sont consumées par le feu. » (1:3)',
  },
  note: 'Néhémie, échanson du roi Artaxerxès, est revenu dans une ville en ruines. Le chapitre 3 énumère, dans l’ordre, qui a reconstruit chaque section de la muraille, dans le sens inverse des aiguilles d’une montre à partir de la porte des brebis. Cette visite suit cette liste, et la muraille se relève sur notre passage.',
  aside: 'Le circuit montré est celui de la ville d’après l’exil, plus petite : la colline de la Cité de David et le mont du Temple. Les positions sont approximatives.',
};

export const FINALE = {
  title: 'La muraille est achevée',
  ref: 'Néhémie 6:15–16',
  quote: {
    sg21: '« La muraille a été terminée le vingt-cinquième jour du mois d’Elul, soit en 52 jours. »',
    bds: '« La muraille fut achevée en cinquante-deux jours, le vingt-cinq du mois d’Eloul. »',
    neg1979: '« La muraille fut achevée le vingt-cinquième jour du mois d’Elul, en cinquante-deux jours. »',
    lsg: '« La muraille fut achevée le vingt-cinquième jour du mois d’Élul, en cinquante-deux jours. »',
  },
  note: {
    sg21: 'Leurs ennemis « ont reconnu que c’était notre Dieu qui avait présidé à la réalisation de ce travail » (6:16). Chaque famille a réparé la section voisine de sa propre maison, et tout le circuit a été achevé en moins de deux mois, presque entièrement avec le calcaire qui gisait dans les décombres.',
    bds: 'Leurs ennemis « reconnurent qu’un tel ouvrage n’avait pu être mené à bonne fin qu’avec l’aide de notre Dieu » (6:16). Chaque famille a réparé la section voisine de sa propre maison, et tout le circuit a été achevé en moins de deux mois, presque entièrement avec le calcaire qui gisait dans les décombres.',
    default: 'Les nations alentour « reconnurent que l’œuvre s’était accomplie par la volonté de notre Dieu » (6:16). Chaque famille a réparé la section voisine de sa propre maison, et tout le circuit a été achevé en moins de deux mois, presque entièrement avec le calcaire qui gisait dans les décombres.',
  },
};

export const STOPS = [
  {
    title: { bds: 'La porte des Brebis', default: 'La porte des brebis' },
    quote: {
      sg21: '« Le grand-prêtre Eliashib s’est levé avec ses frères, les prêtres, et ils ont reconstruit la porte des brebis. Ils l’ont consacrée et ont posé les battants de la porte. »',
      bds: '« Eliashib, le grand-prêtre, se mit au travail avec ses collègues, les prêtres, et ils se chargèrent de la reconstruction de la porte des Brebis. Ils la consacrèrent et en posèrent les battants… »',
      neg1979: '« Eliaschib, le souverain sacrificateur, se leva avec ses frères, les sacrificateurs, et ils bâtirent la porte des brebis. Ils la consacrèrent et en posèrent les battants… »',
      lsg: '« Éliaschib, le souverain sacrificateur, se leva avec ses frères, les sacrificateurs, et ils bâtirent la porte des brebis. Ils la consacrèrent et en posèrent les battants… »',
    },
    note: 'Les prêtres ont commencé par la porte la plus proche du temple, par où entraient les brebis destinées aux sacrifices. On en pose les battants, mais ni verrous ni barres ne sont mentionnés. C’est la seule porte dont le texte dit qu’elle fut consacrée.',
    builders: {
      neg1979: 'Eliaschib, le souverain sacrificateur, et les sacrificateurs',
      lsg: 'Éliaschib, le souverain sacrificateur, et les sacrificateurs',
      default: 'Le grand-prêtre Eliashib et les prêtres',
    },
  },
  {
    title: { bds: 'Les tours de Méa et de Hananéel', default: 'Les tours de Méa et de Hananeel' },
    quote: {
      sg21: '« Ils ont consacré la muraille jusqu’à la tour de Méa et jusqu’à celle de Hananeel. »',
      bds: '« … puis ils continuèrent à réparer la muraille, qu’ils consacrèrent, jusqu’à la tour de Méa, puis jusqu’à la tour de Hananéel. »',
      default: '« … ils la consacrèrent, depuis la tour de Méa jusqu’à la tour de Hananeel. »',
    },
    note: {
      bds: 'Le côté nord n’avait pas de vallée profonde pour le protéger, alors des tours le gardaient. La consécration s’étendit jusqu’ici. Ensuite travaillèrent les habitants de Jéricho, puis Zakkour, fils d’Imri.',
      default: 'Le côté nord n’avait pas de vallée profonde pour le protéger, alors des tours le gardaient. La consécration s’étendit jusqu’ici. Ensuite travaillèrent les hommes de Jéricho, puis Zaccur, fils d’Imri.',
    },
    builders: {
      bds: 'Les prêtres · habitants de Jéricho · Zakkour',
      sg21: 'Les prêtres · habitants de Jéricho · Zaccur',
      default: 'Les sacrificateurs · hommes de Jéricho · Zaccur',
    },
  },
  {
    title: { bds: 'La porte des Poissons', default: 'La porte des poissons' },
    quote: {
      sg21: '« Les fils de Senaa ont reconstruit la porte des poissons. Ils l’ont couverte d’un toit et en ont posé les battants, les verrous et les barres. »',
      bds: '« Les descendants de Senaa reconstruisirent la porte des Poissons. Ils en firent la charpente et en posèrent les battants, les verrous et les barres. »',
      default: '« Les fils de Senaa bâtirent la porte des poissons. Ils la couvrirent, et en posèrent les battants, les verrous et les barres. »',
    },
    note: {
      sg21: 'Son nom venait sans doute du commerce du poisson (des Tyriens vendaient du poisson à Jérusalem, 13:16). C’est la première porte décrite en entier : couverte, avec battants, verrous et barres ; l’hébreu parle ici de poutres. Ensuite vinrent Merémoth, Meshullam, Tsadok et les habitants de Tekoa, « même si les plus influents d’entre eux refusaient de se plier au service de leur Seigneur ».',
      bds: 'Son nom venait sans doute du commerce du poisson (des Tyriens vendaient du poisson à Jérusalem, 13:16). C’est la première porte décrite en entier : charpente, battants, verrous et barres. Ensuite vinrent Merémoth, Meshoullam, Tsadoq et les habitants de Teqoa, « mais leurs notables refusèrent de travailler sous les ordres des maîtres d’œuvre ».',
      default: 'Son nom venait sans doute du commerce du poisson (des Tyriens vendaient du poisson à Jérusalem, 13:16). C’est la première porte décrite en entier : couverte, avec battants, verrous et barres ; l’hébreu parle ici de poutres. Ensuite vinrent Merémoth, Meschullam, Tsadok et les Tekoïtes, « dont les principaux ne se soumirent pas au service de leur seigneur ».',
    },
    builders: { bds: 'Les descendants de Senaa', default: 'Les fils de Senaa' },
  },
  {
    title: { bds: 'La Vieille Porte', default: 'La vieille porte' },
    quote: {
      sg21: '« Jojada, fils de Paséach, et Meshullam, fils de Besodia, ont réparé la vieille porte. Ils l’ont couverte d’un toit et en ont posé les battants, les verrous et les barres. »',
      bds: '« Yoyada, fils de Paséah, et Meshoullam, fils de Besodia, réparèrent la Vieille Porte. Ils en firent la charpente et posèrent les battants, les verrous et les barres. »',
      default: '« Jojada, fils de Paséach, et Meschullam, fils de Besodia, réparèrent la vieille porte. Ils la couvrirent, et en posèrent les battants, les verrous et les barres. »',
    },
    note: {
      bds: 'Son nom hébreu, Yeshana, signifie « vieille ». Il peut désigner la porte de la vieille ville ou la route du village de Yeshana. Comme la porte des Poissons, elle reçoit charpente, battants, verrous et barres.',
      default: 'Son nom hébreu, Yeshana, signifie « vieille ». Il peut désigner la porte de la vieille ville ou la route du village de Yeshana. Comme la porte des poissons, elle est couverte et reçoit battants, verrous et barres.',
    },
    builders: {
      sg21: 'Jojada, fils de Paséach, et Meshullam, fils de Besodia',
      bds: 'Yoyada, fils de Paséah, et Meshoullam, fils de Besodia',
      default: 'Jojada, fils de Paséach, et Meschullam, fils de Besodia',
    },
  },
  {
    title: { bds: 'Là où la muraille s’élargit', default: 'La muraille large' },
    quote: {
      sg21: '« Ils n’ont quitté Jérusalem qu’une fois arrivés à la muraille large. »',
      bds: '« Ils restaurèrent Jérusalem jusqu’à l’endroit où la muraille s’élargit. »',
      default: '« Ils laissèrent Jérusalem jusqu’à la muraille large. »',
    },
    note: 'Ici travaillèrent des hommes de Gabaon et de Mitspa, avec Uzziel l’orfèvre et Hanania le parfumeur. Avigad a mis au jour sur la colline occidentale une « muraille large » de 7 m d’épaisseur, du temps d’Ézéchias, et l’on discute pour savoir si le tracé de Néhémie l’atteignait. Elle est montrée ici à une position simplifiée.',
    builders: {
      sg21: 'Habitants de Gabaon et de Mitspa · Uzziel · Hanania',
      bds: 'Gens de Gabaon et de Mitspa · Ouzziel · Hanania',
      default: 'Hommes de Gabaon et de Mitspa · Uzziel · Hanania',
    },
  },
  {
    title: { bds: 'La tour des Fours', default: 'La tour des fours' },
    quote: {
      sg21: '« Une autre partie de la muraille et la tour des fours ont été réparées par Malkija, fils de Harim, et par Hashub, fils de Pachath-Moab. »',
      bds: '« Un second secteur de la muraille ainsi que la tour des Fours furent réparés par Malkiya, fils de Harim, et par Hashoub, fils de Pahath-Moab. »',
      neg1979: '« Une autre portion de la muraille et la tour des fours furent réparées par Malkija, fils de Harim, et par Haschub, fils de Pachath-Moab. »',
      lsg: '« Une autre portion de la muraille et la tour des fours furent réparées par Malkija, fils de Harim, et par Haschub, fils de Pachath Moab. »',
    },
    note: {
      sg21: 'Elle tenait peut-être son nom des fours des boulangers (voir la rue des boulangers, Jr 37:21). Près d’ici travaillèrent les chefs des deux moitiés du district de Jérusalem. Shallum travailla ici, « accompagné de ses filles ».',
      bds: 'Elle tenait peut-être son nom des fours des boulangers (voir la rue des boulangers, Jr 37:21). Près d’ici travaillèrent les chefs des deux moitiés du district de Jérusalem. Shalloum travailla ici, « assisté de ses filles ».',
      default: 'Elle tenait peut-être son nom des fours des boulangers (voir la rue des boulangers, Jr 37:21). Près d’ici travaillèrent les chefs des deux moitiés du district de Jérusalem. Schallum travailla ici « avec ses filles ».',
    },
    builders: {
      sg21: 'Rephaja · Jedaja · Hattush · Malkija · Hashub · Shallum et ses filles',
      bds: 'Rephaya · Yedaya · Hattoush · Malkiya · Hashoub · Shalloum et ses filles',
      default: 'Rephaja · Jedaja · Hattusch · Malkija · Haschub · Schallum et ses filles',
    },
  },
  {
    title: { bds: 'La porte de la Vallée', default: 'La porte de la vallée' },
    quote: {
      sg21: '« … Ils l’ont reconstruite et en ont posé les battants, les verrous et les barres. Ils ont fait, de plus, 500 mètres de mur jusqu’à la porte du fumier. »',
      bds: '« … Ils la reconstruisirent et en posèrent les battants, les verrous et les barres. De plus, ils restaurèrent la muraille sur cinq cents mètres jusqu’à la porte du Fumier. »',
      default: '« … Ils la bâtirent, et en posèrent les battants, les verrous et les barres. Ils firent de plus mille coudées de mur jusqu’à la porte du fumier. »',
    },
    note: 'L’inspection nocturne de Néhémie commença ici (2:13). En 1927, Crowfoot et FitzGerald ont fouillé une porte du mur occidental de la Cité de David que beaucoup identifient avec celle-ci. L’hébreu dit mille coudées, soit environ 450 à 500 m.',
    builders: { bds: 'Hanoun et les habitants de Zanoah', default: 'Hanun et les habitants de Zanoach' },
  },
  {
    title: { bds: 'La porte du Fumier', default: 'La porte du fumier' },
    quote: {
      sg21: '« C’est Malkija, fils de Récab, chef du district de Beth-Hakkérem, qui a réparé la porte du fumier. Il l’a reconstruite et en a posé les battants, les verrous et les barres. »',
      bds: '« C’est Malkiya, fils de Rékab, chef du district de Beth-Hakkérem, qui répara la porte du Fumier. Il la rebâtit et en posa les battants, les verrous et les barres. »',
      neg1979: '« Malkija, fils de Récab, chef du district de Beth-Hakkérem, répara la porte du fumier. Il la bâtit, et en posa les battants, les verrous et les barres. »',
      lsg: '« Malkija, fils de Récab, chef du district de Beth Hakkérem, répara la porte du fumier. Il la bâtit, et en posa les battants, les verrous et les barres. »',
    },
    note: {
      bds: 'C’est par cette porte qu’on sortait les ordures. Elle se trouvait près de l’extrémité sud, au-dessus de la vallée de Hinnom, où l’on portait les déchets. Nous venons de parcourir les mille coudées depuis la porte de la Vallée.',
      default: 'C’est par cette porte qu’on sortait les ordures. Elle se trouvait près de l’extrémité sud, au-dessus de la vallée de Hinnom, où l’on portait les déchets. Nous venons de parcourir les mille coudées depuis la porte de la vallée.',
    },
    builders: {
      bds: 'Malkiya, fils de Rékab, chef de Beth-Hakkérem',
      lsg: 'Malkija, fils de Récab, chef de Beth Hakkérem',
      default: 'Malkija, fils de Récab, chef de Beth-Hakkérem',
    },
  },
  {
    title: { bds: 'La porte de la Source', default: 'La porte de la source' },
    quote: {
      sg21: '« … Il l’a reconstruite, l’a couverte d’un toit et en a posé les battants, les verrous et les barres. »',
      bds: '« … Après l’avoir reconstruite, il la couvrit d’un toit et fixa les battants, les verrous et les barres. »',
      default: '« … Il la bâtit, la couvrit, et en posa les battants, les verrous et les barres. »',
    },
    note: {
      bds: 'C’est la seule porte dont il est dit qu’elle fut couverte d’un toit. Elle a aussi des battants, des verrous et des barres. Son nom venait des eaux de source au pied de la colline.',
      default: 'C’est la seule porte dont l’hébreu dit qu’elle fut couverte d’un toit ; pour la porte des poissons et la vieille porte, il parle de poutres, que cette version rend aussi par « couvrir ». Elle a aussi des battants, des verrous et des barres. Son nom venait des eaux de source au pied de la colline.',
    },
    builders: {
      sg21: 'Shallum, fils de Col-Hozé, chef de Mitspa',
      bds: 'Shalloun, fils de Kol-Hozé, chef de Mitspa',
      neg1979: 'Schallum, fils de Col-Hozé, chef de Mitspa',
      lsg: 'Schallum, fils de Col Hozé, chef de Mitspa',
    },
  },
  {
    title: { sg21: 'Le bassin de Siloé et le jardin du roi', bds: 'L’étang de l’aqueduc et le jardin du roi', default: 'L’étang de Siloé et le jardin du roi' },
    quote: {
      sg21: '« De plus, il a fait le mur du bassin de Siloé, près du jardin du roi… »',
      bds: '« De plus, il releva la muraille de l’Etang de l’aqueduc, près du jardin du roi… »',
      neg1979: '« Il fit de plus le mur de l’étang de Siloé près du jardin du roi… »',
      lsg: '« Il fit de plus le mur de l’étang de Siloé, près du jardin du roi… »',
    },
    note: {
      bds: 'L’hébreu dit Shélah, « canal » : sans doute le bassin appelé plus tard Siloé. Le tunnel d’Ézéchias amenait l’eau de la source de Guihon jusqu’à cette extrémité de la ville (2 R 20:20). Le jardin royal se trouvait plus bas, là où se rejoignent les vallées du Cédron et de Hinnom. Des siècles plus tard, Jésus envoya un aveugle se laver à Siloé (Jn 9:7).',
      default: 'Le tunnel d’Ézéchias amenait l’eau de la source de Guihon jusqu’à cette extrémité de la ville (2 R 20:20). Le jardin royal se trouvait plus bas, là où se rejoignent les vallées du Cédron et de Hinnom. Des siècles plus tard, Jésus envoya un aveugle se laver à Siloé (Jn 9:7).',
    },
    builders: { sg21: 'Shallum', bds: 'Shalloun', default: 'Schallum' },
  },
  {
    title: { sg21: 'Les marches qui descendent de la ville de David', bds: 'Les marches qui descendent de la Cité de David', default: 'Les degrés qui descendent de la cité de David' },
    quote: {
      sg21: '« … jusqu’aux marches qui descendent de la ville de David. »',
      bds: '« … jusqu’aux marches qui descendent de la Cité de David. »',
      default: '« … jusqu’aux degrés qui descendent de la cité de David. »',
    },
    note: 'Ici, le récit tourne vers le nord, le long du côté est. Kenyon a découvert que la muraille d’après l’exil suivait la crête de la colline, bien au-dessus de l’ancienne muraille à flanc de pente, dont les terrasses effondrées empêchèrent la monture de Néhémie de passer (2:14).',
    builders: { sg21: 'Shallum', bds: 'Shalloun', default: 'Schallum' },
  },
  {
    title: { sg21: 'En face des tombeaux de David', bds: 'En face du cimetière de David', default: 'Vis-à-vis des sépulcres de David' },
    quote: {
      sg21: '« Après lui, c’est Néhémie, fils d’Azbuk, chef de la moitié du district de Beth-Tsur, qui a travaillé aux réparations. Il est allé jusqu’en face des tombeaux de David… »',
      bds: '« Au-delà, Néhémie, fils d’Azbouq, chef de la moitié du district de Beth-Tsour, travaillait dans le secteur qui s’étendait jusqu’en face du cimetière de David… »',
      neg1979: '« Après lui Néhémie, fils d’Azbuk, chef de la moitié du district de Beth-Tsur, travailla aux réparations jusque vis-à-vis des sépulcres de David… »',
      lsg: '« Après lui Néhémie, fils d’Azbuk, chef de la moitié du district de Beth Tsur, travailla aux réparations jusque vis-à-vis des sépulcres de David… »',
    },
    note: 'C’est un autre Néhémie, chef de la moitié du district de Beth-Tsur. David fut enterré dans la cité de David (1 R 2:10). Les fouilles de Weill, en 1913–1914, ont mis au jour ici des tombes en forme de tunnel, taillées dans le roc, que certains proposent d’identifier aux tombeaux royaux.',
    builders: { bds: 'Néhémie, fils d’Azbouq', default: 'Néhémie, fils d’Azbuk' },
  },
  {
    title: { sg21: 'Le bassin artificiel', bds: 'Le réservoir artificiel', default: 'L’étang qui avait été construit' },
    quote: {
      sg21: '« … jusqu’au bassin artificiel… »',
      bds: '« … jusqu’au réservoir artificiel… »',
      default: '« … jusqu’à l’étang qui avait été construit… »',
    },
    note: 'Un réservoir creusé de main d’homme, distinct du bassin de Siloé. Il est peut-être lié aux travaux hydrauliques du temps d’Ézéchias (Es 22:9–11). On ne sait pas exactement où il se trouvait.',
    builders: { bds: 'Néhémie, fils d’Azbouq', default: 'Néhémie, fils d’Azbuk' },
  },
  {
    title: { sg21: 'La maison des hommes vaillants', bds: 'La caserne', default: 'La maison des héros' },
    quote: {
      sg21: '« … et jusqu’à la maison des hommes vaillants. »',
      bds: '« … et jusqu’à la caserne. »',
      default: '« … et jusqu’à la maison des héros. »',
    },
    note: {
      sg21: 'Peut-être la caserne des guerriers de David, ses hommes vaillants (2 S 23:8). Ensuite vinrent les Lévites sous la direction de Rehum, puis Hashabia et Bavvaï pour les deux moitiés du district de Keïla.',
      bds: 'Peut-être la caserne des guerriers de David, ses hommes vaillants (2 S 23:8). Ensuite vinrent des lévites, Rehoum, puis Hashabia et Bavvaï pour les deux moitiés du district de Qeïla.',
      default: 'Peut-être la caserne des guerriers de David, ses hommes vaillants (2 S 23:8). Ensuite vinrent les Lévites, Rehum, puis Haschabia et Bavvaï pour les deux moitiés du district de Keïla.',
    },
    builders: {
      sg21: 'Néhémie, fils d’Azbuk · Lévites · Hashabia · Bavvaï',
      bds: 'Néhémie, fils d’Azbouq · lévites · Hashabia · Bavvaï',
      default: 'Néhémie, fils d’Azbuk · Lévites · Haschabia · Bavvaï',
    },
  },
  {
    title: { bds: 'La montée de l’arsenal, à la saillie', default: 'La montée de l’arsenal, à l’angle' },
    quote: {
      sg21: '« … une autre partie de la muraille, en face de la montée de l’arsenal, à l’angle. »',
      bds: '« … un second secteur, situé en face de la montée de l’arsenal, à l’endroit où la muraille fait saillie. »',
      default: '« … une autre portion de la muraille, vis-à-vis de la montée de l’arsenal, à l’angle. »',
    },
    note: {
      bds: 'Ezer, chef de Mitspa, répara un second secteur. Ici la muraille change de direction, à une saillie, coude ou contrefort de son tracé.',
      default: 'Ezer, chef de Mitspa, répara une autre portion. Ici la muraille change de direction, à « l’angle », un coude ou un contrefort de son tracé.',
    },
    builders: { lsg: 'Ézer, fils de Josué, chef de Mitspa', default: 'Ezer, fils de Josué, chef de Mitspa' },
  },
  {
    title: { neg1979: 'La maison d’Eliaschib', lsg: 'La maison d’Éliaschib', default: 'La maison d’Eliashib' },
    quote: {
      sg21: '« Après lui, Baruc, fils de Zabbaï, s’est montré plein d’ardeur: il a réparé une autre partie, depuis l’angle jusqu’à la porte de la maison du grand-prêtre Eliashib. »',
      bds: '« Au-delà, Baruch, fils de Zabbaï, réparait avec ardeur une autre section depuis l’angle jusqu’à l’entrée de la maison d’Eliashib, le grand-prêtre. »',
      neg1979: '« Après lui Baruc, fils de Zabbaï, répara avec ardeur une autre portion, depuis l’angle jusqu’à la porte de la maison d’Eliaschib, le souverain sacrificateur. »',
      lsg: '« Après lui Baruc, fils de Zabbaï, répara avec ardeur une autre portion, depuis l’angle jusqu’à la porte de la maison d’Éliaschib, le souverain sacrificateur. »',
    },
    note: {
      sg21: 'Après Baruc, Merémoth travailla depuis la porte d’Eliashib jusqu’au bout de sa maison. Ici vivait le grand-prêtre qui avait commencé à la porte des brebis.',
      bds: 'Après Baruch, Merémoth travailla depuis l’entrée de la maison d’Eliashib jusqu’à son extrémité. Ici vivait le grand-prêtre qui avait commencé à la porte des Brebis.',
      neg1979: 'Après Baruc, Merémoth travailla depuis la porte d’Eliaschib jusqu’au bout de sa maison. Ici vivait le souverain sacrificateur qui avait commencé à la porte des brebis.',
      lsg: 'Après Baruc, Merémoth travailla depuis la porte d’Éliaschib jusqu’au bout de sa maison. Ici vivait le souverain sacrificateur qui avait commencé à la porte des brebis.',
    },
    builders: { bds: 'Baruch, fils de Zabbaï · Merémoth, fils d’Urie', default: 'Baruc, fils de Zabbaï · Merémoth, fils d’Urie' },
  },
  {
    title: { bds: 'L’angle en saillie', default: 'L’angle et le coin' },
    quote: {
      bds: '« … un autre secteur allant de la maison d’Azaria jusqu’à l’angle en saillie de la muraille. »',
      default: '« … depuis la maison d’Azaria jusqu’à l’angle et jusqu’au coin. »',
    },
    note: {
      sg21: 'Ici travaillèrent les prêtres qui habitaient la plaine, puis Benjamin, Hashub et Azaria, chacun près de sa propre maison. Chacun gardait son propre foyer. Binnuï termina au coin.',
      bds: 'Ici travaillèrent les prêtres des plaines environnantes, puis Benjamin, Hashoub et Azaria, chacun près de sa propre maison. Chacun gardait son propre foyer. Binnouï termina à l’angle.',
      default: 'Ici travaillèrent les sacrificateurs des environs, puis Benjamin, Haschub et Azaria, chacun près de sa propre maison. Chacun gardait son propre foyer. Binnuï termina au coin.',
    },
    builders: {
      sg21: 'Prêtres de la plaine · Benjamin · Hashub · Azaria · Binnuï',
      bds: 'Prêtres des environs · Benjamin · Hashoub · Azaria · Binnouï',
      default: 'Sacrificateurs des environs · Benjamin · Haschub · Azaria · Binnuï',
    },
  },
  {
    title: { sg21: 'La haute tour du palais royal', bds: 'La tour supérieure du palais royal', default: 'La tour supérieure de la maison du roi' },
    quote: {
      sg21: '« … la haute tour qui dépasse du palais royal et est adjacente à la cour de la prison. »',
      bds: '« … la tour supérieure qui domine le palais royal et touche à la cour de la prison… »',
      default: '« … la tour supérieure qui fait saillie en avant de la maison du roi près de la cour de la prison. »',
    },
    note: 'Une tour s’avançait de l’ancien palais royal, près de la cour de la prison où Jérémie fut détenu (Jr 32:2). Eilat Mazar a rattaché de grandes structures de cette colline au palais et à la muraille de Néhémie. Les deux propositions sont discutées.',
    builders: {
      sg21: 'Palal, fils d’Uzaï · Pedaja, fils de Pareosh',
      bds: 'Palal, fils d’Ouzaï · Pedaya, fils de Pareosh',
      default: 'Palal, fils d’Uzaï · Pedaja, fils de Pareosch',
    },
  },
  {
    title: { bds: 'L’Ophel et la porte des Eaux', sg21: 'L’Ophel et la porte des eaux', default: 'La colline et la porte des eaux' },
    quote: {
      sg21: '« Les serviteurs du temple installés sur la colline de l’Ophel ont travaillé jusqu’en face de la porte des eaux, à l’est… »',
      bds: '« Les desservants du Temple s’étaient établis sur la colline de l’Ophel jusqu’en face de la porte des Eaux à l’est… »',
      default: '« Les Néthiniens demeurant sur la colline travaillèrent jusque vis-à-vis de la porte des eaux, à l’orient… »',
    },
    note: {
      sg21: 'Les serviteurs du temple habitaient la colline de l’Ophel. Le texte ne dit pas que la porte des eaux fut réparée : les travaux allèrent seulement jusqu’en face d’elle, si bien qu’elle est montrée debout avec ses battants, comme si elle n’avait pas besoin de réparation. Elle descendait vers la source de Guihon. Plus tard, Esdras lut la Loi sur la place qui s’étendait devant elle (8:1).',
      bds: 'Les desservants du Temple habitaient la colline de l’Ophel. Le texte ne dit pas que la porte des Eaux fut réparée : les travaux allèrent seulement jusqu’en face d’elle, si bien qu’elle est montrée debout avec ses battants, comme si elle n’avait pas besoin de réparation. Elle descendait vers la source de Guihon. Plus tard, Esdras lut la Loi sur la place qui s’étendait devant elle (8:1).',
      default: 'Les Néthiniens, les serviteurs du temple, habitaient la colline de l’Ophel. Le texte ne dit pas que la porte des eaux fut réparée : les travaux allèrent seulement jusqu’en face d’elle, si bien qu’elle est montrée debout avec ses battants, comme si elle n’avait pas besoin de réparation. Elle descendait vers la source de Guihon. Plus tard, Esdras lut la Loi sur la place qui s’étendait devant elle (8:1).',
    },
    builders: { sg21: 'Les serviteurs du temple', bds: 'Les desservants du Temple', default: 'Les Néthiniens (serviteurs du temple)' },
  },
  {
    title: { sg21: 'La grande tour qui dépasse et le mur de la colline', bds: 'La grande tour en saillie et la muraille de l’Ophel', default: 'La grande tour en saillie et le mur de la colline' },
    quote: {
      sg21: '« Après eux les habitants de Tekoa ont réparé une autre partie, en face de la grande tour qui dépasse et jusqu’au mur de la colline. »',
      bds: '« Les gens de Teqoa travaillaient à la section suivante, depuis la grande tour en saillie jusqu’à la muraille de la colline de l’Ophel. »',
      default: '« Après eux les Tekoïtes réparèrent une autre portion, vis-à-vis de la grande tour en saillie jusqu’au mur de la colline. »',
    },
    note: {
      bds: 'Les gens ordinaires de Teqoa prirent en charge une deuxième section, alors que leurs notables avaient refusé de travailler (3:5).',
      default: 'Les gens ordinaires de Tekoa prirent en charge une deuxième section, alors que leurs notables avaient refusé de travailler (3:5).',
    },
    builders: { sg21: 'Les habitants de Tekoa', bds: 'Les gens de Teqoa', default: 'Les Tekoïtes' },
  },
  {
    title: { bds: 'La porte des Chevaux', default: 'La porte des chevaux' },
    quote: {
      sg21: '« Au-dessus de la porte des chevaux, les prêtres ont travaillé chacun devant sa maison. »',
      bds: '« A partir de la porte des Chevaux, les prêtres travaillaient chacun en face de sa maison. »',
      default: '« Au-dessus de la porte des chevaux, les sacrificateurs travaillèrent chacun devant sa maison. »',
    },
    note: 'Aucun battant, verrou ou barre n’est mentionné pour cette porte. Jérémie la situe à l’est (Jr 31:40). Elle pourrait être liée à l’entrée des chevaux du palais (2 R 11:16).',
    builders: { neg1979: 'Les sacrificateurs', lsg: 'Les sacrificateurs', default: 'Les prêtres' },
  },
  {
    title: { sg21: 'La porte de l’est', bds: 'La porte de l’Orient', default: 'La porte de l’orient' },
    quote: {
      sg21: '« Après lui a travaillé Shemaeja, fils de Shecania, gardien de la porte de l’est. »',
      bds: '« … et ensuite Shemaya, fils de Shekania, gardien de la porte de l’Orient… »',
      default: '« Après lui travailla Schemaeja, fils de Schecania, gardien de la porte de l’orient. »',
    },
    note: {
      sg21: 'Tsadok, fils d’Immer, répara devant sa maison, puis ce fut le tour de Shemaeja. Shemaeja est le gardien de la porte, mais le texte ne dit pas que la porte elle-même fut reconstruite. Elle donnait sur le Cédron, à l’est du temple.',
      bds: 'Tsadoq, fils d’Immer, répara devant sa maison, puis ce fut le tour de Shemaya. Shemaya est le gardien de la porte, mais le texte ne dit pas que la porte elle-même fut reconstruite. Elle donnait sur le Cédron, à l’est du temple.',
      default: 'Tsadok, fils d’Immer, répara devant sa maison, puis ce fut le tour de Schemaeja. Schemaeja est le gardien de la porte, mais le texte ne dit pas que la porte elle-même fut reconstruite. Elle donnait sur le Cédron, à l’est du temple.',
    },
    builders: {
      sg21: 'Tsadok, fils d’Immer · Shemaeja · Hanania · Hanun · Meshullam',
      bds: 'Tsadoq, fils d’Immer · Shemaya · Hanania · Hanoun · Meshoullam',
      default: 'Tsadok, fils d’Immer · Schemaeja · Hanania · Hanun · Meschullam',
    },
  },
  {
    title: { bds: 'La porte de la Surveillance', default: 'La porte de Miphkad' },
    quote: {
      sg21: '« Après lui, Malkija, un orfèvre, a travaillé jusqu’à la maison des serviteurs du temple et des marchands, en face de la porte de Miphkad… »',
      bds: '« Puis Malkiya, de la corporation des orfèvres, travaillait jusqu’aux maisons des desservants du Temple et des marchands, vis-à-vis de la porte de la Surveillance… »',
      default: '« Après lui Malkija, d’entre les orfèvres, travailla jusqu’aux maisons des Néthiniens et des marchands, vis-à-vis de la porte de Miphkad… »',
    },
    note: {
      bds: 'Son nom hébreu, Miphkad, signifie rendez-vous, revue ou inspection, d’où « la Surveillance ». Les réparations allèrent jusqu’aux maisons des desservants du Temple et des marchands, en face d’elle. Ses battants ne sont pas mentionnés.',
      default: 'Son nom hébreu, Miphkad, signifie rendez-vous, revue ou inspection. Les réparations allèrent jusqu’à la maison des serviteurs du temple et des marchands, en face d’elle. Ses battants ne sont pas mentionnés.',
    },
    builders: { sg21: 'Malkija, un orfèvre', bds: 'Malkiya, de la corporation des orfèvres', default: 'Malkija, d’entre les orfèvres' },
  },
  {
    title: { sg21: 'La chambre à l’étage du coin', bds: 'Le poste de guet de l’angle', default: 'La chambre haute du coin' },
    quote: {
      sg21: '« … et jusqu’à la chambre à l’étage qui se trouve au coin. »',
      bds: '« … et jusqu’au poste de guet situé en haut de l’angle de la muraille. »',
      default: '« … et jusqu’à la chambre haute du coin. »',
    },
    note: 'L’hébreu dit littéralement « la chambre haute du coin », sans doute un poste de garde à l’angle nord-est, qui dominait le Cédron.',
    builders: { sg21: 'Malkija, un orfèvre', bds: 'Malkiya, de la corporation des orfèvres', default: 'Malkija, d’entre les orfèvres' },
  },
  {
    title: { bds: 'Retour à la porte des Brebis', default: 'Retour à la porte des brebis' },
    quote: {
      sg21: '« Les orfèvres et les marchands ont travaillé entre la chambre à l’étage qui se trouve au coin et la porte des brebis. »',
      bds: '« Les orfèvres et les marchands réparèrent la muraille entre ce poste de l’angle et la porte des Brebis. »',
      default: '« Les orfèvres et les marchands travaillèrent entre la chambre haute du coin et la porte des brebis. »',
    },
    note: 'Les orfèvres et les marchands comblèrent la dernière brèche, près de la porte où le circuit avait commencé. La muraille est complète.',
    builders: 'Les orfèvres et les marchands',
  },
];
