// French text for "The Day of Atonement", merged over data.js (see addLanguage in ../../i18n.js).
// Same shape as data.js, text fields only. Version keys are the French versions
// (sg21, bds, neg1979, lsg); `default` covers the ones not listed. STOPS line up
// with data.js by position.
//
// Quotations are verbatim, including each version's own spelling (the SG21, BDS
// and NEG1979 write "l’Eternel", the LSG "l’Éternel"; the SG21 writes "7 fois").

// Words that differ between versions. French nouns carry gender (la ceinture /
// l’écharpe, la tiare / le turban), so where a note needs an article the term
// includes it, and the notes avoid adjectives that would have to agree.
export const TERMS = {
  theTunic: 'la tunique',
  theUndergarments: 'les caleçons de lin',
  theSash: { bds: 'l’écharpe', default: 'la ceinture' },
  theTurban: { bds: 'le turban', default: 'la tiare' },
  laver: 'cuve',
  theLaver: 'la cuve de bronze',
  theTent: { sg21: 'la tente de la rencontre', bds: 'la tente de la Rencontre', default: 'la tente d’assignation' },
  ofTheTent: { sg21: 'de la tente de la rencontre', bds: 'de la tente de la Rencontre', default: 'de la tente d’assignation' },
  veil: 'voile',
  cover: 'propitiatoire',
  bull: 'taureau',
  firepan: { sg21: 'brûle-parfum', bds: 'encensoir', default: 'brasier' },
  theFirepan: { sg21: 'le brûle-parfum', bds: 'l’encensoir', default: 'le brasier' },
  ofTheFirepan: { sg21: 'du brûle-parfum', bds: 'de l’encensoir', default: 'du brasier' },
  household: { neg1979: 'maison', lsg: 'maison', default: 'famille' },
  colours: { bds: 'pourpre violette et écarlate, rouge éclatant', default: 'fil bleu, pourpre et cramoisi' },
  theLiveGoat: { bds: 'le bouc émissaire', default: 'le bouc pour Azazel' },
  manReady: { sg21: 'un homme prêt pour cette fonction', bds: 'un homme désigné pour cela', default: 'un homme qui a cette charge' },
  bathePlace: { sg21: 'dans un endroit saint', default: 'dans un lieu saint' },
  glory: { sg21: 'pour marquer son importance et son rang', bds: 'insignes de gloire et de dignité', default: 'pour marquer sa dignité et pour lui servir de parure' },
  onceAYear: { sg21: 'une fois par année', bds: 'une fois par an', default: 'une fois chaque année' },
  theLord: 'l’Éternel',
};

export const ATONE = {
  self: 'Aaron et sa {household}',
  sanctuary: 'Le sanctuaire',
  tent: '{TheTent}',
  altar: 'L’autel',
  people: 'Le peuple',
};

export const WEARING = {
  linen: 'Les vêtements sacrés de lin : {theTunic}, {theUndergarments}, {theSash} et {theTurban} (16:4)',
  glory: 'Les vêtements du grand-prêtre (16:24 ; Exode 28)',
};

export const LABELS = {
  aaron: { name: 'Aaron' },
  man: { name: { sg21: 'L’homme prêt', bds: 'L’homme désigné', default: 'L’homme chargé' } },
  bull: { name: 'Taureau' },
  ramA: { name: 'Le bélier d’Aaron' },
  ramP: { name: 'Le bélier du peuple' },
  goatL: { name: 'Bouc', after: { name: { lsg: 'Bouc pour l’Éternel', default: 'Bouc pour l’Eternel' } } },
  goatS: { name: 'Bouc', after: { name: { bds: 'Bouc émissaire', default: 'Bouc pour Azazel' } } },
  laver: { name: 'Cuve' },
  altar: { name: 'Autel' },
  cover: { name: 'Propitiatoire' },
  veil: { name: 'Voile' },
  firepan: { name: '{Firepan}' },
  outside: { name: 'Hors du camp' },
  wilderness: { name: 'Le désert' },
};

export const INTRO = {
  title: 'Le jour des expiations',
  ref: 'Lévitique 16:2',
  quote: {
    sg21: '« Dis à ton frère Aaron de ne pas entrer à n’importe quel moment dans la partie du sanctuaire située derrière le voile, devant le propitiatoire qui recouvre l’arche, sinon il mourrait. En effet, j’apparaîtrai dans la nuée sur le propitiatoire. »',
    bds: '« Dis à ton frère Aaron de ne pas entrer à tout moment dans le sanctuaire au-delà du voile, devant le propitiatoire qui repose sur le coffre sacré afin qu’il ne meure pas ; car j’apparais dans la nuée au-dessus du propitiatoire. »',
    neg1979: '« Parle à ton frère Aaron, afin qu’il n’entre pas en tout temps dans le sanctuaire, au-dedans du voile, devant le propitiatoire qui est sur l’arche, de peur qu’il ne meure ; car j’apparaîtrai dans la nuée sur le propitiatoire. »',
    lsg: '« Parle à ton frère Aaron, afin qu’il n’entre pas en tout temps dans le sanctuaire, au dedans du voile, devant le propitiatoire qui est sur l’arche, de peur qu’il ne meure ; car j’apparaîtrai dans la nuée sur le propitiatoire. »',
  },
  note: 'Après la mort de Nadab et Abihu, fils d’Aaron, pour avoir offert un feu que l’Éternel n’avait pas ordonné (16:1 ; 10:1–2), l’Éternel dit à Moïse comment Aaron pourrait entrer derrière le voile et vivre. Une fois par an, le dixième jour du septième mois (16:29, 34), le grand-prêtre faisait l’expiation pour lui-même et pour sa {household}, pour le sanctuaire, {theTent} et l’autel, et pour tout le peuple. Cette visite suit Lévitique 16 pas à pas.',
  aside: 'Les dimensions sont en coudées (1 coudée ≈ 45 cm), et le tabernacle est tel que dans les autres animations. Lévitique 16 donne l’ordre mais pas tous les détails, comme l’endroit où Aaron se lavait, ce qu’étaient les sorts ou comment le sang était porté ; les notes disent où il s’agit d’une supposition. L’abattage des animaux n’est pas montré : ils se couchent.',
};

export const FINALE = {
  title: 'Une fois par an',
  ref: 'Lévitique 16:30',
  quote: {
    sg21: '« En effet, ce jour-là on fera l’expiation pour vous afin de vous purifier : vous serez purifiés de tous vos péchés devant l’Eternel. »',
    bds: '« Car en ce jour-là, on accomplira le rite d’expiation pour vous afin de vous purifier de toutes vos fautes ; ainsi vous serez purs devant l’Eternel. »',
    neg1979: '« Car en ce jour on fera l’expiation pour vous, afin de vous purifier : vous serez purifiés de tous vos péchés devant l’Eternel. »',
    lsg: '« Car en ce jour on fera l’expiation pour vous, afin de vous purifier : vous serez purifiés de tous vos péchés devant l’Éternel. »',
  },
  note: 'Chaque année, le dixième jour du septième mois, tout Israël, l’indigène comme l’étranger, devait s’humilier et ne faire aucun travail : un jour de repos solennel (16:29–31). Les prêtres oints après Aaron feraient de même avec les vêtements de lin (16:32–33), {onceAYear} (16:34). Hébreux 9 rappelle ce jour où le grand-prêtre seul entrait dans la partie intérieure, une fois par an, et non sans y porter du sang (9:7).',
};

export const STOPS = [
  {
    title: 'Les vêtements sacrés de lin', ref: 'Lévitique 16:4',
    quote: {
      sg21: '« Il mettra la tunique sacrée de lin et portera sur son corps des caleçons de lin. Il mettra une ceinture de lin et se couvrira la tête d’une tiare de lin. Ce sont les vêtements sacrés dont il s’habillera après avoir lavé son corps dans l’eau. »',
      bds: '« Il se revêtira d’une tunique sainte en lin, il mettra sur lui des caleçons de lin, se ceindra d’une écharpe de lin et se coiffera d’un turban de lin. Il mettra ces vêtements sacrés après s’être lavé le corps dans l’eau. »',
      default: '« Il se revêtira de la tunique sacrée de lin, et portera sur son corps des caleçons de lin ; il se ceindra d’une ceinture de lin, et il se couvrira la tête d’une tiare de lin : ce sont les vêtements sacrés, dont il se revêtira après avoir lavé son corps dans l’eau. »',
    },
    note: 'Ce jour-là, Aaron ne porte pas ses vêtements d’or, de {colours}, mais du simple lin : {theTunic} par-dessus {theUndergarments}, {theSash} et {theTurban} (16:4). Il se lave avant de les mettre. Le texte ne dit ni où ni comment ; ici, il se verse de l’eau sur le corps à {theLaver}, où les prêtres se lavaient (Exode 30:18–21).',
    where: 'À {theLaver}',
  },
  {
    title: 'Les offrandes', ref: 'Lévitique 16:5',
    quote: {
      sg21: '« Il recevra de l’assemblée des Israélites deux boucs pour le sacrifice d’expiation et un bélier pour l’holocauste. »',
      bds: '« L’assemblée des Israélites lui fournira deux boucs pour le sacrifice pour le péché et un bélier pour l’holocauste. »',
      default: '« Il recevra de l’assemblée des enfants d’Israël deux boucs pour le sacrifice d’expiation et un bélier pour l’holocauste. »',
    },
    note: 'Aaron amène ses propres offrandes, un jeune taureau pour le sacrifice d’expiation et un bélier pour l’holocauste (16:3), et le peuple donne deux boucs et un bélier. Le taureau sert à l’expiation pour Aaron et pour sa {household} (16:6) ; les boucs sont pour le peuple (16:15). Ici, ils entrent par la porte du parvis et attendent au nord de l’autel, où l’on égorgeait les offrandes (1:11 ; 4:24).',
    where: 'Le parvis, au nord de l’autel',
  },
  {
    title: 'Les sorts', ref: 'Lévitique 16:8',
    quote: {
      sg21: '« Il tirera au sort entre les deux boucs : l’un sera pour l’Eternel et l’autre pour Azazel. »',
      bds: '« Il tirera au sort pour savoir lequel des deux sera destiné à être sacrifié à l’Eternel et lequel sera destiné à être un bouc émissaire. »',
      neg1979: '« Aaron jettera le sort sur les deux boucs, un sort pour l’Eternel et un sort pour Azazel. »',
      lsg: '« Aaron jettera le sort sur les deux boucs, un sort pour l’Éternel et un sort pour Azazel. »',
    },
    note: 'Les deux boucs se tiennent devant {theLord}, à l’entrée {ofTheTent} (16:7). Le sort décide lequel est offert en sacrifice d’expiation et lequel est laissé vivant, pour être chassé dans le désert (16:9–10). En hébreu, le second sort est « pour Azazel », un mot dont le sens est discuté. Le texte ne dit pas ce qu’étaient les sorts ni comment on les jetait ; ici, ce sont deux simples pierres jetées devant les boucs.',
    where: 'Devant l’entrée {ofTheTent}',
  },
  {
    title: 'Le taureau pour lui-même', ref: 'Lévitique 16:11',
    quote: {
      sg21: '« Aaron offrira son taureau expiatoire et fera l’expiation pour lui et pour sa famille. Il égorgera son taureau expiatoire. »',
      bds: '« Aaron offrira pour lui-même le taureau du sacrifice pour le péché afin de faire l’expiation pour lui-même et pour sa famille. Il immolera le taureau de son sacrifice pour le péché. »',
      default: '« Aaron offrira son taureau expiatoire, et il fera l’expiation pour lui et pour sa maison. Il égorgera son taureau expiatoire. »',
    },
    note: 'Avant de faire l’expiation pour quiconque, Aaron la fait pour lui-même et pour sa {household}. Le taureau est égorgé au nord de l’autel (1:11 ; 4:24) ; ici, il se couche, et son sang est gardé dans un bassin à côté de lui. Le texte ne nomme pas le récipient ; l’autel avait des bassins de bronze pour le sang (Exode 27:3).',
    where: 'Au nord de l’autel',
  },
  {
    title: 'Les charbons de l’autel', ref: 'Lévitique 16:12',
    quote: {
      sg21: '« Il prendra un brûle-parfum plein de charbons ardents pris sur l’autel devant l’Eternel et deux poignées de parfum odoriférant en poudre, et il portera ces éléments derrière le voile. »',
      bds: '« Après cela, il prendra un plein encensoir de charbons ardents de l’autel, de devant l’Eternel, et deux pleines poignées de parfum à brûler réduit en poudre, et il emportera le tout au-delà du voile. »',
      neg1979: '« Il prendra un brasier plein de charbons ardents ôtés de dessus l’autel devant l’Eternel, et de deux poignées de parfum odoriférants en poudre ; il portera ces choses au-delà du voile… »',
      lsg: '« Il prendra un brasier plein de charbons ardents ôtés de dessus l’autel devant l’Éternel, et de deux poignées de parfum odoriférants en poudre ; il portera ces choses au delà du voile… »',
    },
    note: 'Les charbons viennent de l’autel du parvis, dont le feu ne devait jamais s’éteindre (6:12–13). Le parfum est le mélange sacré d’Exode 30:34–38, réduit en poudre. {TheFirepan} n’est pas décrit ; les ustensiles de l’autel étaient de bronze (Exode 27:3), et il l’est donc aussi ici. Aaron porte le parfum dans l’autre main.',
    where: 'À l’autel',
  },
  {
    title: { bds: 'Le nuage sur le propitiatoire', default: 'La nuée sur le propitiatoire' }, ref: 'Lévitique 16:13',
    quote: {
      sg21: '« Il mettra le parfum sur le feu devant l’Eternel, afin que la nuée du parfum couvre le propitiatoire qui est sur le témoignage, et il ne mourra pas. »',
      bds: '« Là, il répandra le parfum sur le feu devant l’Eternel, de sorte que le nuage de fumée couvre le propitiatoire qui se trouve au-dessus de l’acte de l’alliance. Ainsi il ne mourra pas. »',
      neg1979: '« … il mettra le parfum sur le feu devant l’Eternel, afin que la nuée du parfum couvre le propitiatoire qui est sur le témoignage, et il ne mourra point. »',
      lsg: '« … il mettra le parfum sur le feu devant l’Éternel, afin que la nuée du parfum couvre le propitiatoire qui est sur le témoignage, et il ne mourra point. »',
    },
    note: 'Derrière le voile se trouve seulement l’arche, avec le propitiatoire et ses deux chérubins au-dessus (Exode 25:17–22). C’est là que l’Éternel avait dit qu’il apparaîtrait dans la nuée (16:2). La fumée du parfum cache le propitiatoire aux yeux d’Aaron. Personne d’autre ne doit être dans {theTent} pendant qu’il est à l’intérieur (16:17). Le texte ne dit pas ce qu’il fit {ofTheFirepan} ; ici, il le pose par terre devant l’arche.',
    where: 'Derrière le voile',
  },
  {
    title: 'Le sang du taureau', ref: 'Lévitique 16:14',
    quote: {
      sg21: '« Il prendra du sang du taureau et fera l’aspersion avec son doigt sur le devant du propitiatoire, du côté est ; il fera avec son doigt 7 fois l’aspersion du sang devant le propitiatoire. »',
      bds: '« Il prendra du sang du taureau et en fera aspersion avec son doigt sur le côté oriental du propitiatoire, puis il en fera sept fois aspersion devant le propitiatoire. »',
      default: '« Il prendra du sang du taureau, et il fera l’aspersion avec son doigt sur le devant du propitiatoire vers l’orient ; il fera avec son doigt sept fois l’aspersion du sang devant le propitiatoire. »',
    },
    note: 'Aaron ressort chercher le sang de son taureau et le porte derrière le voile. Avec son doigt, il en fait l’aspersion sur le côté est du propitiatoire, celui qui est tourné vers lui, puis sept fois devant. Le texte ne donne pas de nombre pour la première aspersion (ici, une seule) et ne dit pas comment le sang était porté.',
    where: 'Derrière le voile',
  },
  {
    title: 'Le bouc pour le peuple', ref: 'Lévitique 16:15',
    quote: {
      sg21: '« Il égorgera le bouc expiatoire pour le peuple et en portera le sang derrière le voile. Il fera avec ce sang comme il a fait avec le sang du taureau… »',
      bds: '« Il immolera le bouc du sacrifice pour le péché du peuple et en portera le sang au-delà du voile ; il procédera avec ce sang comme avec celui du taureau… »',
      neg1979: '« Il égorgera le bouc expiatoire pour le peuple, et il en portera le sang au-delà du voile. Il fera avec ce sang comme il a fait avec le sang du taureau… »',
      lsg: '« Il égorgera le bouc expiatoire pour le peuple, et il en portera le sang au delà du voile. Il fera avec ce sang comme il a fait avec le sang du taureau… »',
    },
    note: 'On égorge le bouc sur lequel est tombé le sort pour l’Éternel, et son sang est aspergé comme celui du taureau, sur le propitiatoire et devant. Aaron fait ainsi l’expiation pour le sanctuaire, à cause des impuretés d’Israël et de tous ses péchés, et il fait de même pour {theTent}, qui demeure au milieu d’eux (16:16). Personne ne doit être dans {theTent} jusqu’à ce qu’il sorte (16:17).',
    where: 'Derrière le voile',
  },
  {
    title: 'Les cornes de l’autel', ref: 'Lévitique 16:18',
    quote: {
      sg21: '« Lorsqu’il sortira, il ira vers l’autel qui est devant l’Eternel et il fera l’expiation pour l’autel. Il prendra du sang du taureau et du bouc, et il en mettra sur les cornes du pourtour de l’autel. »',
      bds: '« Après cela, il sortira vers l’autel qui est devant l’Eternel et accomplira le rite d’expiation pour celui-ci ; il prendra du sang du taureau et du sang du bouc, et il en appliquera sur les cornes de l’autel tout autour. »',
      neg1979: '« En sortant, il ira vers l’autel qui est devant l’Eternel, et il fera l’expiation pour l’autel ; il prendra du sang du taureau et du bouc, et il en mettra sur les cornes de l’autel tout autour. »',
      lsg: '« En sortant, il ira vers l’autel qui est devant l’Éternel, et il fera l’expiation pour l’autel ; il prendra du sang du taureau et du bouc, et il en mettra sur les cornes de l’autel tout autour. »',
    },
    note: 'Aaron met du sang des deux sur chacune des quatre cornes, puis il en fait sept fois l’aspersion sur l’autel avec son doigt, pour le purifier et le sanctifier des impuretés d’Israël (16:19). On discute de quel autel il s’agit : les cornes de l’autel d’or des parfums étaient elles aussi purifiées avec du sang une fois par an (Exode 30:10). Ici, c’est l’autel du parvis, puisque Aaron sort pour y aller.',
    where: 'À l’autel',
  },
  {
    title: 'Le bouc vivant', ref: 'Lévitique 16:21',
    quote: {
      sg21: '« Il posera ses deux mains sur la tête du bouc vivant et confessera sur lui toutes les fautes des Israélites et toutes les transgressions par lesquelles ils ont péché ; il les mettra sur la tête du bouc… »',
      bds: '« Il posera ses deux mains sur la tête du bouc vivant et confessera sur lui toutes les désobéissances, tous les péchés, toutes les fautes des Israélites ; ainsi il les fera passer sur la tête du bouc… »',
      default: '« Aaron posera ses deux mains sur la tête du bouc vivant, et il confessera sur lui toutes les iniquités des enfants d’Israël et toutes les transgressions par lesquelles ils ont péché ; il les mettra sur la tête du bouc… »',
    },
    note: 'Quand le sanctuaire, {theTent} et l’autel ont été purifiés, Aaron fait approcher {theLiveGoat}, qui est resté vivant devant l’Éternel (16:10, 20). Les deux mains sur sa tête, il confesse sur lui tous les péchés d’Israël et les met sur la tête du bouc.',
    where: 'Devant l’entrée {ofTheTent}',
  },
  {
    title: 'Dans le désert', ref: 'Lévitique 16:22',
    quote: {
      sg21: '« Le bouc emportera sur lui toutes leurs fautes dans une terre aride, il sera chassé dans le désert. »',
      bds: '« Le bouc emportera sur lui tous leurs péchés dans un lieu à l’écart : on le chassera au désert. »',
      default: '« Le bouc emportera sur lui toutes leurs iniquités dans une terre désolée ; il sera chassé dans le désert. »',
    },
    note: '{ManReady} emmène le bouc (16:21), hors du parvis, à travers le camp et jusque dans le désert, et le laisse aller. Il doit laver ses vêtements et se laver avant de revenir dans le camp (16:26). Le texte ne dit pas où il l’emmena ; ici, il part vers l’est.',
    where: 'À travers le camp, vers le désert',
  },
  {
    title: 'Les vêtements de lin déposés', ref: 'Lévitique 16:23',
    quote: {
      sg21: '« Aaron entrera dans la tente de la rencontre ; il quittera les vêtements de lin qu’il avait mis en entrant dans le sanctuaire et les déposera là. »',
      bds: '« Aaron retournera dans la tente de la Rencontre, il ôtera les vêtements de lin qu’il avait mis pour pénétrer dans le sanctuaire, et les déposera là. »',
      default: '« Aaron entrera dans la tente d’assignation ; il quittera les vêtements de lin qu’il avait mis en entrant dans le sanctuaire, et il les déposera là. »',
    },
    note: 'Aaron retourne dans {theTent} et quitte les vêtements de lin qu’il portait derrière le voile. Ils restent dans {theTent} ; le texte ne dit pas ce qu’ils devenaient. Ici, ils sont laissés pliés contre la paroi.',
    where: 'Dans {theTent}',
  },
  {
    title: { bds: 'Ses vêtements ordinaires', default: 'Ses propres vêtements' }, ref: 'Lévitique 16:24',
    quote: {
      sg21: '« Il lavera son corps avec de l’eau dans un endroit saint et reprendra ses vêtements. »',
      bds: '« Il se lavera à l’eau dans un lieu saint, puis remettra ses vêtements sacerdotaux ordinaires… »',
      default: '« Il lavera son corps avec de l’eau dans un lieu saint, et reprendra ses vêtements. »',
    },
    note: 'Il se lave de nouveau (le texte dit seulement « {bathePlace} », ce qui n’est pas montré) et met les vêtements du grand-prêtre, faits « {glory} » (Exode 28:2) : la tunique brodée et sa ceinture, la robe de l’éphod avec ses clochettes, l’éphod avec ses pierres d’onyx, le pectoral avec ses douze pierres, et {theTurban} avec la lame d’or.',
    where: 'Dans {theTent}',
  },
  {
    title: 'Les holocaustes', ref: 'Lévitique 16:24',
    quote: {
      bds: '« … et il sortira pour offrir son holocauste ainsi que celui du peuple, afin d’accomplir le rite d’expiation pour lui et pour le peuple. »',
      default: '« Puis il sortira, offrira son holocauste et l’holocauste du peuple, et fera l’expiation pour lui et pour le peuple. »',
    },
    note: 'Aaron sort et offre en holocauste les deux béliers, le sien et celui du peuple (16:3, 5), qui étaient brûlés entièrement sur l’autel (1:9). Il y brûle aussi la graisse des sacrifices d’expiation (16:25).',
    where: 'À l’autel',
  },
  {
    title: { sg21: 'À l’extérieur du camp', bds: 'À l’extérieur du camp', default: 'Hors du camp' }, ref: 'Lévitique 16:27',
    quote: {
      sg21: '« On emportera à l’extérieur du camp le taureau expiatoire et le bouc expiatoire dont on a porté le sang dans le sanctuaire pour faire l’expiation, et l’on brûlera au feu leur peau, leur viande et leurs excréments. »',
      bds: '« Quant au taureau et au bouc offerts en sacrifice pour le péché et dont le sang aura été introduit dans le sanctuaire pour accomplir le rite d’expiation, on emportera leur peau, leur viande et leurs déchets à l’extérieur du camp pour les brûler. »',
      default: '« On emportera hors du camp le taureau expiatoire et le bouc expiatoire dont on a porté le sang dans le sanctuaire pour faire l’expiation, et l’on brûlera au feu leurs peaux, leur chair et leurs excréments. »',
    },
    note: 'Un sacrifice d’expiation dont le sang a été porté dans le sanctuaire n’est pas mangé par les prêtres (6:30) : il est brûlé hors du camp. Celui qui le brûle doit laver ses vêtements et se laver avant de revenir dans le camp (16:28). Le texte ne dit pas à quel endroit hors du camp ; ici, c’est au-delà des tentes, à l’est.',
    where: 'Hors du camp',
  },
];
