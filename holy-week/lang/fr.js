// French text for "Holy Week in Jerusalem", merged over data.js (see addLanguage in ../../i18n.js).
// Same shape as data.js, text fields only. Version keys are the French versions
// (sg21, bds, neg1979, lsg); `default` covers the ones not listed. STOPS line up
// with data.js by position.
//
// Quotations are verbatim, in « … » with non-breaking spaces (U+00A0) inside the
// guillemets and before the high punctuation marks, speech inside them in “ … ”.
// The LSG writes "Écritures" and "pour plusieurs" (14:24).

export const TERMS = {
  temple: { bds: 'Temple', default: 'temple' },
  council: { bds: 'Grand-Conseil', default: 'sanhédrin' },
};

export const DAYS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Le sabbat', 'Le premier jour de la semaine'];

export const LABELS = {
  olives: { name: 'Mont des Oliviers' },
  kidron: { name: 'Vallée du Cédron' },
  upperCity: { name: 'Ville haute' },
  lowerCity: { name: 'Ville basse' },
  bethphage: { name: 'Bethphagé' },
  bethany: { name: 'Béthanie' },
  temple: { name: 'Le temple' },
  royalStoa: { name: 'Portique royal' },
  courtWomen: { name: 'Parvis des femmes' },
  portico: { name: 'Portique de Salomon' },
  antonia: { name: 'Forteresse Antonia' },
  herodsPalace: { name: 'Palais d’Hérode' },
  pavement: { name: 'Le Pavé' },
  golgotha: { name: 'Golgotha' },
  tomb: { name: { neg1979: 'Le sépulcre', lsg: 'Le sépulcre', default: 'Le tombeau' } },
  upperRoom: { name: 'La chambre haute' },
  caiaphas: { name: 'Maison du grand-prêtre' },
  siloam: { name: 'Réservoir de Siloé' },
  bethesda: { name: 'Réservoir de Béthesda' },
  gethsemane: { name: 'Gethsémané' },
  figTree: { name: 'Le figuier' },
  jesus: { name: 'Jésus' },
  peter: { name: 'Pierre' },
  john: { name: 'Jean' },
  judas: { name: 'Judas' },
  colt: { name: 'L’ânon' },
  questioners: { name: 'Pharisiens et hérodiens' },
  widow: { name: 'La veuve' },
  anointer: { name: 'La femme' },
  jarMan: { name: 'L’homme à la cruche' },
  caiaphasP: { name: 'Le grand-prêtre' },
  girl: { name: 'Une servante' },
  pilate: { name: 'Pilate' },
  barabbas: { name: 'Barabbas' },
  simonC: { name: 'Simon de Cyrène' },
  centurion: { name: { sg21: 'L’officier romain', bds: 'L’officier romain', default: 'Le centenier' } },
  women: { name: 'Les femmes' },
  joseph: { name: 'Joseph d’Arimathée' },
  nicodemus: { name: 'Nicodème' },
  guard: { name: 'La garde' },
  youngMan: { name: 'Un jeune homme en blanc' },
};

export const INTRO = {
  title: 'La semaine sainte à Jérusalem',
  ref: 'Marc 10:33–34',
  quote: {
    sg21: '« Nous montons à Jérusalem et le Fils de l’homme sera livré aux chefs des prêtres et aux spécialistes de la loi. Ils le condamneront à mort… et trois jours après il ressuscitera. »',
    bds: '« Voici, nous montons à Jérusalem. Le Fils de l’homme y sera livré aux chefs des prêtres et aux spécialistes de la Loi. Ils le condamneront à mort… Puis, au bout de trois jours, il ressuscitera. »',
    default: '« Voici, nous montons à Jérusalem, et le Fils de l’homme sera livré aux principaux sacrificateurs et aux scribes. Ils le condamneront à mort… et, trois jours après, il ressuscitera. »',
  },
  note: 'Sur la route qui monte de Jéricho, Jésus annonça aux douze ce qui allait arriver à Jérusalem. Cette visite suit sa dernière semaine dans la ville, jour après jour dans l’ordre de Marc, du dimanche où il y entra au premier jour de la semaine suivante, avec les autres évangiles là où ils ajoutent quelque chose. C’est la Pâque, et la ville est pleine de pèlerins.',
  aside: 'Jérusalem est montrée telle qu’elle était vers l’an 30 : le temple d’Hérode sur sa grande esplanade, l’Antonia, le palais d’Hérode, et la première et la deuxième muraille. Beaucoup de lieux sont incertains, comme la chambre haute, la maison du grand-prêtre, le prétoire et Golgotha ; les notes disent quelle tradition est suivie. La crucifixion n’est montrée que de loin.',
};

export const FINALE = {
  title: 'Il est ressuscité',
  ref: '1 Corinthiens 15:3–4',
  quote: {
    sg21: '« …Christ est mort pour nos péchés, conformément aux Ecritures ; il a été enseveli et il est ressuscité le troisième jour, conformément aux Ecritures. »',
    bds: '« …Christ est mort pour nos péchés, conformément aux Ecritures ; il a été mis au tombeau, il est ressuscité le troisième jour, comme l’avaient annoncé les Ecritures. »',
    neg1979: '« …que Christ est mort pour nos péchés, selon les Ecritures ; il a été enseveli, et il est ressuscité le troisième jour, selon les Ecritures. »',
    lsg: '« …que Christ est mort pour nos péchés, selon les Écritures ; qu’il a été enseveli, et qu’il est ressuscité le troisième jour, selon les Écritures. »',
  },
  note: 'Le jeune homme dit aux femmes d’aller dire aux disciples et à Pierre que Jésus les précédait en Galilée, où ils le verraient (Marc 16:7). Les autres évangiles et les Actes racontent comment il apparut aux femmes, à Pierre, aux deux disciples sur la route d’Emmaüs, aux onze, et à plus de cinq cents personnes à la fois (1 Corinthiens 15:5–8).',
};

export const STOPS = [
  {
    title: 'L’ânon', ref: 'Marc 11:2', when: 'Dimanche matin',
    quote: {
      sg21: '« Allez au village qui est devant vous. Dès que vous y serez entrés, vous trouverez un ânon attaché, sur lequel personne n’est encore monté. Détachez-le et amenez-le. »',
      bds: '« Allez dans le village qui est devant vous. Dès que vous y serez entrés, vous trouverez un ânon attaché que personne n’a encore monté. Détachez-le et amenez-le ici. »',
      default: '« Allez au village qui est devant vous ; dès que vous y serez entrés, vous trouverez un ânon attaché, sur lequel aucun homme ne s’est encore assis ; détachez-le, et amenez-le. »',
    },
    note: 'En montant la route de Jéricho, ils arrivent à Bethphagé et à Béthanie, près du mont des Oliviers (11:1). Deux disciples trouvent l’ânon attaché à une porte, dehors, dans la rue, et l’amènent ; ils jettent leurs vêtements sur lui et Jésus s’y assied (11:4–7). Matthieu 21:5 et Jean 12:15 y voient Zacharie 9:9 : ton roi vient à toi, monté sur un âne. Marc ne nomme pas les deux disciples.',
    where: 'Bethphagé, au mont des Oliviers',
  },
  {
    title: 'Hosanna !', ref: 'Marc 11:8–9', when: 'Dimanche',
    quote: {
      sg21: '« Beaucoup de gens étendirent leurs vêtements sur le chemin, et d’autres des branches qu’ils coupèrent dans les champs. Ceux qui précédaient et ceux qui suivaient Jésus criaient : “Hosanna ! Béni soit celui qui vient au nom du Seigneur !” »',
      bds: '« Beaucoup de gens étendirent leurs manteaux sur le chemin ; d’autres, des branches vertes coupées dans les champs. La foule, de la tête à la fin du cortège, criait : Hosanna ! Béni soit celui qui vient au nom du Seigneur ! »',
      default: '« Beaucoup de gens étendirent leurs vêtements sur le chemin, et d’autres des branches qu’ils coupèrent dans les champs. Ceux qui précédaient et ceux qui suivaient Jésus criaient : Hosanna ! Béni soit celui qui vient au nom du Seigneur ! »',
    },
    note: 'La route franchit l’épaule du mont des Oliviers et redescend vers la ville. La foule qui précède et celle qui suit étendent des vêtements et des branches coupées sur le chemin ; Jean dit qu’on prit des branches de palmiers et qu’on sortit de la ville à sa rencontre (Jean 12:12–13). « Hosanna » est un mot hébreu qui veut dire « sauve, je t’en prie », tiré du Psaume 118:25–26, que l’on chantait aux fêtes.',
    where: 'La route sur le mont des Oliviers',
  },
  {
    title: 'Il pleura sur la ville', ref: 'Luc 19:41–42', when: 'Dimanche',
    quote: {
      sg21: '« Quand il approcha de la ville et qu’il la vit, Jésus pleura sur elle et dit : “Si seulement tu avais toi aussi reconnu, aujourd’hui, ce qui peut te donner la paix ! Mais maintenant, cela est caché à tes yeux.” »',
      bds: '« Quand il fut arrivé près de la ville et qu’il la vit, il pleura sur elle : Ah, dit-il, si seulement tu avais compris, toi aussi, en ce jour, de quoi dépend ta paix ! Mais, hélas, à présent, tout cela est caché à tes yeux. »',
      default: '« Comme il approchait de la ville, Jésus, en la voyant, pleura sur elle, et dit : Si toi aussi, au moins en ce jour qui t’est donné, tu connaissais les choses qui appartiennent à ta paix ! Mais maintenant elles sont cachées à tes yeux. »',
    },
    note: 'Au sommet de la route, toute la ville apparaît de l’autre côté du Cédron, le temple étincelant devant elle. Luc seul raconte que Jésus pleura ici et annonça le siège : on ne laissera pas en toi pierre sur pierre (19:43–44). Les Romains détruisirent la ville et le temple quarante ans plus tard, en l’an 70.',
    where: 'Le versant ouest du mont des Oliviers',
  },
  {
    title: 'Dans le temple', ref: 'Marc 11:11', when: 'Dimanche soir',
    quote: {
      sg21: '« Jésus entra à Jérusalem et se rendit au temple. Après avoir tout regardé autour de lui, comme il était déjà tard, il sortit pour aller à Béthanie avec les douze. »',
      bds: '« Une fois entré dans Jérusalem, Jésus se rendit au Temple et y observa attentivement tout ce qui s’y passait. Ensuite, comme il se faisait déjà tard, il quitta la ville avec les Douze pour se rendre à Béthanie. »',
      default: '« Jésus entra à Jérusalem, dans le temple. Quand il eut tout considéré, comme il était déjà tard, il s’en alla à Béthanie avec les douze. »',
    },
    note: 'Il descend, traverse le Cédron et monte vers la ville : ici il entre par la porte orientale du parvis du temple (la porte de Suse de la Mishna), mais le texte ne dit pas par quelle porte. Le grand parvis, ouvert à tous, entourait les parvis intérieurs sur l’esplanade construite par Hérode. Chez Marc, il ne fait que regarder et retourne à Béthanie ; chez Matthieu et Luc, il chasse les marchands le jour même.',
    where: 'Le parvis des païens',
  },
  {
    title: 'Le figuier', ref: 'Marc 11:13', when: 'Lundi matin',
    quote: {
      sg21: '« Il aperçut de loin un figuier qui avait des feuilles et alla voir s’il y trouverait quelque chose, mais quand il se fut approché, il ne trouva que des feuilles, car ce n’était pas la saison des figues. »',
      bds: '« Il aperçut, de loin, un figuier couvert de feuillage. Il se dirigea vers cet arbre pour voir s’il y trouverait quelque fruit. Quand il se fut approché, il n’y trouva que des feuilles, car ce n’était pas la saison des figues. »',
      default: '« Apercevant de loin un figuier qui avait des feuilles, il alla voir s’il y trouverait quelque chose ; et, s’en étant approché, il ne trouva que des feuilles, car ce n’était pas la saison des figues. »',
    },
    note: 'En revenant de Béthanie, il a faim. Il dit à l’arbre : « Que plus personne ne mange jamais de ton fruit », et les disciples l’entendent (11:14) ; le lendemain matin, ils le trouvent desséché jusqu’aux racines (11:20–21). Marc place la purification du temple entre les deux, comme si l’un expliquait l’autre. On ne sait pas où se trouvait l’arbre.',
    where: 'La route de Béthanie',
  },
  {
    title: 'Les tables renversées', ref: 'Marc 11:15–17', when: 'Lundi',
    quote: {
      sg21: '« …il renversa les tables des changeurs de monnaie et les sièges des vendeurs de pigeons… “N’est-il pas écrit : Mon temple sera appelé une maison de prière pour toutes les nations ? Mais vous, vous en avez fait une caverne de voleurs.” »',
      bds: '« …il renversa les comptoirs des changeurs d’argent ainsi que les chaises des marchands de pigeons… N’est-il pas écrit : On appellera ma maison une maison de prière pour tous les peuples ? Mais vous, vous en avez fait une caverne de brigands ! »',
      default: '« …il renversa les tables des changeurs, et les sièges des vendeurs de pigeons… N’est-il pas écrit : Ma maison sera appelée une maison de prière pour toutes les nations ? Mais vous, vous en avez fait une caverne de voleurs. »',
    },
    note: 'Les pèlerins changeaient leur argent contre la monnaie du temple pour l’impôt du demi-sicle, et achetaient des pigeons et d’autres animaux pour les sacrifices. Ici, le marché se tient dans le Portique royal, au sud du parvis, où beaucoup le situent. Il cite Esaïe 56:7 et Jérémie 7:11. Les chefs des prêtres et les scribes cherchent dès lors comment le faire mourir (11:18).',
    where: 'Le Portique royal',
  },
  {
    title: { sg21: 'La pièce de l’empereur', default: 'La pièce de César' }, ref: 'Marc 12:16–17', when: 'Mardi',
    quote: {
      sg21: '« “De qui porte-t-elle l’effigie et l’inscription ?” “De l’empereur”, lui répondirent-ils. Alors il leur dit : “Rendez à l’empereur ce qui est à l’empereur et à Dieu ce qui est à Dieu.” »',
      bds: '« Cette effigie et cette inscription, de qui sont-elles ? – De César. Alors Jésus leur dit : Rendez à César ce qui revient à César, et à Dieu ce qui revient à Dieu. »',
      neg1979: '« De qui porte-t-il l’effigie et l’inscription ? De César, lui répondirent-ils. Alors il leur dit : Rendez à César ce qui est à César, et à Dieu ce qui est à Dieu. »',
      lsg: '« De qui sont cette effigie et cette inscription ? De César, lui répondirent-ils. Alors il leur dit : Rendez à César ce qui est à César, et à Dieu ce qui est à Dieu. »',
    },
    note: 'Le mardi, tandis qu’il marche dans le temple, on l’interroge sans cesse : les chefs des prêtres, les scribes et les anciens sur son autorité, des pharisiens et des hérodiens sur l’impôt, des sadducéens sur la résurrection, un scribe sur le premier commandement (11:27–12:34). Le denier portait la tête de l’empereur Tibère. On ne sait pas dans quelle partie des parvis la scène eut lieu ; ici, c’est sous le portique de Salomon, où Jean situe son enseignement (Jean 10:23).',
    where: 'Le portique de Salomon (une supposition)',
  },
  {
    title: 'Les deux pièces de la veuve', ref: 'Marc 12:42–43', when: 'Mardi',
    quote: {
      sg21: '« Une pauvre veuve vint aussi ; elle y mit deux petites pièces, une toute petite somme. Alors Jésus appela ses disciples et leur dit : “Je vous le dis en vérité, cette pauvre veuve a donné plus que tous ceux qui ont mis dans le tronc.” »',
      bds: '« …qui déposa deux petites pièces, une somme minime. Alors Jésus appela ses disciples et leur dit : Vraiment, je vous l’assure, cette pauvre veuve a donné bien plus que tous ceux qui ont mis de l’argent dans le tronc. »',
      neg1979: '« Il vint aussi une pauvre veuve, et elle y mit deux petites pièces, faisant un quart de sou. Alors Jésus, ayant appelé ses disciples, leur dit : Je vous le dis en vérité, cette pauvre veuve a donné plus qu’aucun de ceux qui ont mis dans le tronc. »',
      lsg: '« Il vint aussi une pauvre veuve, elle y mit deux petites pièces, faisant un quart de sou. Alors Jésus, ayant appelé ses disciples, leur dit : Je vous le dis en vérité, cette pauvre veuve a donné plus qu’aucun de ceux qui ont mis dans le tronc. »',
    },
    note: 'Il s’assied en face du tronc et regarde les riches y mettre beaucoup (12:41). La Mishna décrit treize troncs dans le temple, en forme de corne de bélier, pour les offrandes ; ils sont montrés ici autour du parvis des femmes, aussi loin qu’une femme pouvait aller, là où on les situe d’ordinaire. Le lepte était la plus petite pièce qui existait. « Elle a mis, de son nécessaire, tout ce qu’elle possédait » (12:44).',
    where: 'Le parvis des femmes',
  },
  {
    title: 'Pas pierre sur pierre', ref: 'Marc 13:1–2', when: 'Mardi après-midi',
    quote: {
      sg21: '« …un de ses disciples lui dit : “Maître, regarde : quelles pierres et quelles constructions !” Jésus lui répondit : “Vois-tu ces grandes constructions ? Il ne restera pas pierre sur pierre, tout sera détruit.” »',
      bds: '« …un de ses disciples lui dit : Regarde, Maître, quelles belles pierres ! Quel édifice magnifique ! Jésus lui répondit : Oui, regarde bien ces grandes constructions : il ne restera pas une pierre sur une autre, tout sera démoli. »',
      default: '« …un de ses disciples lui dit : Maître, regarde quelles pierres, et quelles constructions ! Jésus lui répondit : Vois-tu ces grandes constructions ? Il ne restera pas pierre sur pierre qui ne soit renversée. »',
    },
    note: 'Certaines pierres d’Hérode font plus de dix mètres de long, et les travaux du temple n’étaient pas achevés. Assis sur le mont des Oliviers en face du temple, Pierre, Jacques, Jean et André lui demandent en privé quand cela arrivera (13:3–4), et il parle de ce qui doit venir, jusqu’à : « Veillez » (13:37). En l’an 70, les Romains incendièrent le temple et renversèrent ses bâtiments.',
    where: 'Le mont des Oliviers, en face du temple',
  },
  {
    title: 'L’onction à Béthanie', ref: 'Marc 14:3', when: 'Mercredi soir',
    quote: {
      sg21: '« Comme Jésus était à Béthanie, dans la maison de Simon le lépreux, une femme entra pendant qu’il se trouvait à table. Elle tenait un vase qui contenait un parfum de nard pur très cher. Elle brisa le vase et versa le parfum sur la tête de Jésus. »',
      bds: '« Jésus était à Béthanie, dans la maison de Simon, le lépreux. Pendant le repas, une femme s’approcha de lui, tenant un flacon d’albâtre rempli d’un parfum de nard pur de grande valeur. Elle cassa le col du flacon et répandit le parfum sur la tête de Jésus. »',
      default: '« Comme Jésus était à Béthanie, dans la maison de Simon le lépreux, une femme entra, pendant qu’il se trouvait à table. Elle tenait un vase d’albâtre, qui renfermait un parfum de nard pur de grand prix ; et, ayant rompu le vase, elle répandit le parfum sur la tête de Jésus. »',
    },
    note: 'Certains dirent que le parfum aurait pu être vendu plus d’une année de salaire et donné aux pauvres ; Jésus dit qu’elle avait d’avance oint son corps pour la sépulture (14:4–8). Puis Judas Iscariot alla trouver les chefs des prêtres, qui lui promirent de l’argent (14:10–11). Marc place la scène deux jours avant la Pâque (14:1), d’où le mercredi ; Jean raconte une onction à Béthanie six jours avant, par Marie, la sœur de Marthe (Jean 12:1–3).',
    where: 'La maison de Simon le lépreux, à Béthanie',
  },
  {
    title: 'L’homme à la cruche', ref: 'Marc 14:13–15', when: 'Jeudi après-midi',
    quote: {
      sg21: '« Allez à la ville. Vous rencontrerez un homme qui porte une cruche d’eau : suivez-le… Alors il vous montrera une grande chambre à l’étage, aménagée et toute prête : c’est là que vous nous préparerez la Pâque. »',
      bds: '« Allez à la ville. Vous y rencontrerez un homme portant une cruche d’eau. Suivez-le… Alors il vous montrera, à l’étage supérieur, une grande pièce aménagée, déjà prête. C’est là que vous ferez les préparatifs pour nous. »',
      default: '« Allez à la ville ; vous rencontrerez un homme portant une cruche d’eau, suivez-le… Et il vous montrera une grande chambre haute, meublée et toute prête : c’est là que vous nous préparerez la Pâque. »',
    },
    note: 'C’est le premier jour des pains sans levain, où l’on immolait les agneaux de la Pâque (14:12). Luc dit que les deux étaient Pierre et Jean (Luc 22:8). Un homme portant de l’eau se remarquait, car c’était d’ordinaire un travail de femme. La maison est placée sur le mont Sion, où la tradition situe la chambre haute ; le texte ne dit pas où elle était, et il vient ici du réservoir de Siloé.',
    where: 'Du réservoir de Siloé au mont Sion',
  },
  {
    title: 'Le dernier repas', ref: 'Marc 14:22–24', when: 'Jeudi soir',
    quote: {
      sg21: '« Pendant qu’ils mangeaient, Jésus prit du pain et, après avoir prononcé la prière de bénédiction, il le rompit et le leur donna en disant : “Prenez, [mangez,] ceci est mon corps.” Il prit ensuite une coupe et, après avoir remercié Dieu, il la leur donna… “Ceci est mon sang, le sang de la [nouvelle] alliance, qui est versé pour beaucoup.” »',
      bds: '« Au cours du repas, Jésus prit du pain puis, après avoir prononcé la prière de reconnaissance, il le partagea en morceaux qu’il donna à ses disciples en disant : Prenez, ceci est mon corps. Ensuite il prit une coupe, remercia Dieu et la leur donna… Ceci est mon sang, par lequel est scellée l’alliance : il va être versé pour beaucoup d’hommes. »',
      neg1979: '« Pendant qu’ils mangeaient, Jésus prit du pain ; et, après avoir rendu grâces, il le rompit, et le leur donna, en disant : Prenez, ceci est mon corps. Il prit ensuite une coupe ; et, après avoir rendu grâces, il la leur donna… Ceci est mon sang, le sang de l’alliance, qui est répandu pour beaucoup. »',
      lsg: '« Pendant qu’ils mangeaient, Jésus prit du pain ; et, après avoir rendu grâces, il le rompit, et le leur donna, en disant : Prenez, ceci est mon corps. Il prit ensuite une coupe ; et, après avoir rendu grâces, il la leur donna… Ceci est mon sang, le sang de l’alliance, qui est répandu pour plusieurs. »',
    },
    note: 'Ils sont étendus à table, comme pour le repas de la Pâque (14:18). Il dit que l’un d’eux le livrera, l’un de ceux qui trempent avec lui dans le plat (14:18–20). Jean raconte comment il leur lava les pieds (Jean 13:1–15), et comment Judas prit le morceau et sortit : « Il faisait nuit » (Jean 13:30). Chez Marc, le repas est la Pâque ; Jean semble placer la Pâque le vendredi soir (Jean 18:28 ; 19:14), et la manière d’accorder les deux est encore discutée.',
    where: 'La chambre haute',
  },
  {
    title: 'Gethsémané', ref: 'Marc 14:35–36', when: 'Jeudi, dans la nuit',
    quote: {
      sg21: '« Puis il avança de quelques pas, se jeta contre terre et pria que, si cela était possible, cette heure s’éloigne de lui. Il disait : “Abba, Père, tout t’est possible. Eloigne de moi cette coupe ! Toutefois, non pas ce que je veux, mais ce que tu veux.” »',
      bds: '« Il fit quelques pas, se laissa tomber à terre et pria Dieu que cette heure s’éloigne de lui, si c’était possible : Abba, Père, pour toi, tout est possible. Eloigne de moi cette coupe ; cependant, qu’il arrive non pas ce que moi, je veux, mais ce que toi, tu veux. »',
      neg1979: '« Puis, ayant fait quelques pas en avant, il se jeta contre terre, et pria que, s’il était possible, cette heure s’éloigne de lui. Il disait : Abba, Père, toutes choses te sont possibles, éloigne de moi cette coupe ! Toutefois, non pas ce que je veux, mais ce que tu veux. »',
      lsg: '« Puis, ayant fait quelques pas en avant, il se jeta contre terre, et pria que, s’il était possible, cette heure s’éloignât de lui. Il disait : Abba, Père, toutes choses te sont possibles, éloigne de moi cette coupe ! Toutefois, non pas ce que je veux, mais ce que tu veux. »',
    },
    note: 'Après avoir chanté les psaumes, ils se rendent au mont des Oliviers (14:26), de l’autre côté du Cédron, dans un jardin (Jean 18:1). Le chemin est une supposition : descendre du mont Sion près de Siloé et remonter la vallée au clair de lune ; la Pâque tombait à la pleine lune. Il prend avec lui Pierre, Jacques et Jean, leur demande de veiller et va plus loin seul ; trois fois il revient et les trouve endormis (14:33–41). Gethsémané veut dire « pressoir à huile ».',
    where: 'Gethsémané, de l’autre côté du Cédron',
  },
  {
    title: 'L’arrestation', ref: 'Marc 14:45–46, 50', when: 'Vendredi, dans la nuit',
    quote: {
      sg21: '« Dès qu’il fut arrivé, il s’approcha de Jésus en disant : “Maître !” et il l’embrassa. Alors ces gens mirent la main sur Jésus et l’arrêtèrent… Alors tous l’abandonnèrent et prirent la fuite. »',
      bds: '« En arrivant, Judas se dirigea droit sur Jésus ; il lui dit : “Maître !” et l’embrassa. Aussitôt, les autres mirent la main sur Jésus et l’arrêtèrent… Alors tous ses compagnons l’abandonnèrent et prirent la fuite. »',
      neg1979: '« Dès qu’il fut arrivé, il s’approcha de Jésus, disant : Rabbi ! Et il lui donna un baiser. Alors ces gens mirent la main sur Jésus, et le saisirent… Alors tous l’abandonnèrent, et prirent la fuite. »',
      lsg: '« Dès qu’il fut arrivé, il s’approcha de Jésus, disant : Rabbi ! Et il le baisa. Alors ces gens mirent la main sur Jésus, et le saisirent… Alors tous l’abandonnèrent, et prirent la fuite. »',
    },
    note: 'Judas arrive avec une foule armée d’épées et de bâtons, envoyée par les chefs des prêtres, les scribes et les anciens (14:43) ; Jean ajoute une cohorte de soldats et des gardes, avec des lanternes, des flambeaux et des armes (Jean 18:3). L’un des assistants tire l’épée et coupe l’oreille du serviteur du grand-prêtre (14:47) ; Luc dit que Jésus le guérit (Luc 22:51).',
    where: 'Gethsémané',
  },
  {
    title: 'Le reniement de Pierre', ref: 'Marc 14:67–68', when: 'Vendredi, avant l’aube',
    quote: {
      sg21: '« Elle vit Pierre qui se chauffait, le regarda et lui dit : “Toi aussi, tu étais avec Jésus de Nazareth.” Il le nia en disant : “Je ne sais ni ne comprends ce que tu veux dire.” »',
      bds: '« …elle vit Pierre qui se chauffait et le dévisagea ; elle lui dit : Toi aussi, tu étais avec ce Jésus, ce Nazaréen ! Mais Pierre le nia en disant : Je ne vois pas, je ne comprends pas ce que tu veux dire. »',
      default: '« Voyant Pierre qui se chauffait, elle le regarda, et lui dit : Toi aussi, tu étais avec Jésus de Nazareth. Il le nia, disant : Je ne sais pas, je ne comprends pas ce que tu veux dire. »',
    },
    note: 'Jésus est conduit chez le grand-prêtre, Caïphe (Matthieu 26:57), où les chefs des prêtres et tout le {council} cherchent un témoignage contre lui ; quand on lui demande s’il est le Christ, il répond : « Je le suis » (14:53–64). Pierre le suit de loin jusque dans la cour et s’assied avec les gardes près du feu (14:54). Il renie Jésus trois fois, le coq chante une seconde fois, et il pleure (14:66–72). La maison est placée à l’endroit traditionnel, sur le mont Sion.',
    where: 'La cour du grand-prêtre',
  },
  {
    title: 'Devant Pilate', ref: 'Marc 15:14–15', when: 'Vendredi matin',
    quote: {
      sg21: '« “Quel mal a-t-il fait ?” leur dit Pilate. Ils crièrent encore plus fort : “Crucifie-le !” Voulant satisfaire la foule, Pilate leur relâcha Barabbas et, après avoir fait fouetter Jésus, il le livra à la crucifixion. »',
      bds: '« – Qu’a-t-il fait de mal ? Eux, cependant, crièrent de plus en plus fort : Crucifie-le ! Alors Pilate, voulant donner satisfaction à la foule, leur relâcha Barabbas et, après avoir fait battre Jésus à coups de fouet, il le livra pour qu’on le crucifie. »',
      default: '« Pilate leur dit : Quel mal a-t-il fait ? Et ils crièrent encore plus fort : Crucifie-le ! Pilate, voulant satisfaire la foule, leur relâcha Barabbas ; et, après avoir fait battre de verges Jésus, il le livra pour être crucifié. »',
    },
    note: 'Dès le matin, on le lie et on le livre à Ponce Pilate, le gouverneur romain (15:1). La coutume voulait qu’on relâche un prisonnier à la fête ; la foule réclame Barabbas, emprisonné pour un meurtre commis dans une émeute (15:6–11). Luc ajoute que Pilate l’envoya à Hérode Antipas, qui le lui renvoya (Luc 23:7–11). Le prétoire est placé au palais d’Hérode, avec le tribunal sur le Pavé (Jean 19:13) ; d’autres le placent à l’Antonia, où commence la Via Dolorosa.',
    where: 'Le Pavé, devant le palais d’Hérode',
  },
  {
    title: 'Simon de Cyrène', ref: 'Marc 15:21', when: 'Vendredi matin',
    quote: {
      sg21: '« Ils forcèrent un passant qui revenait des champs à porter la croix de Jésus. C’était Simon de Cyrène, le père d’Alexandre et de Rufus. »',
      bds: '« Ils obligèrent un passant qui revenait des champs, Simon de Cyrène, le père d’Alexandre et de Rufus, à porter la croix de Jésus. »',
      default: '« Ils forcèrent à porter la croix de Jésus un passant qui revenait des champs, Simon de Cyrène, père d’Alexandre et de Rufus. »',
    },
    note: 'Les soldats se moquent de lui, le revêtent de pourpre et d’une couronne d’épines, puis lui remettent ses vêtements et l’emmènent (15:16–20). Il sort en portant sa croix (Jean 19:17) ; puis Simon est forcé de la porter derrière lui (Luc 23:26), suivi d’une grande foule, et de femmes qui se lamentent sur lui (Luc 23:27). Ce qu’il portait était sans doute la poutre transversale. Ici, ils sortent par la porte de Gennath, ce qui est une supposition.',
    where: 'De la ville à Golgotha',
  },
  {
    title: 'La croix', ref: 'Marc 15:33, 38–39', when: 'Vendredi, de la sixième heure à la neuvième',
    quote: {
      sg21: '« A midi, il y eut des ténèbres sur tout le pays, jusqu’à trois heures de l’après-midi… Le voile du temple se déchira en deux, depuis le haut jusqu’en bas. Quand l’officier romain qui se tenait en face de Jésus [entendit son cri et] le vit expirer de cette manière, il dit : “Cet homme était vraiment le Fils de Dieu.” »',
      bds: '« A midi, le pays tout entier fut plongé dans l’obscurité, et cela dura jusqu’à trois heures de l’après-midi… Alors, le rideau du Temple se déchira en deux, de haut en bas. Voyant de quelle manière il était mort, l’officier romain, qui se tenait en face de Jésus, dit : Cet homme était vraiment le Fils de Dieu ! »',
      default: '« La sixième heure étant venue, il y eut des ténèbres sur toute la terre, jusqu’à la neuvième heure… Le voile du temple se déchira en deux, depuis le haut jusqu’en bas. Le centenier, qui était en face de Jésus, voyant qu’il avait expiré de la sorte, dit : Assurément, cet homme était Fils de Dieu. »',
    },
    note: 'On le crucifie à la troisième heure, vers neuf heures du matin, entre deux brigands, et on tire ses vêtements au sort ; au-dessus de lui est écrit le motif : « Le roi des Juifs » (15:24–27). Les passants et les chefs des prêtres se moquent de lui (15:29–32). A la neuvième heure, il s’écrie : « Mon Dieu, mon Dieu, pourquoi m’as-tu abandonné ? » et il meurt (15:34–37). Des femmes regardent de loin (15:40). Golgotha est montré à l’endroit traditionnel, aujourd’hui dans l’église du Saint-Sépulcre, hors de la muraille de l’époque.',
    where: 'Golgotha, le lieu du Crâne',
  },
  {
    title: 'La mise au tombeau', ref: 'Marc 15:46', when: 'Vendredi soir',
    quote: {
      sg21: '« Joseph acheta un drap de lin, descendit Jésus de la croix, l’enveloppa dans le drap de lin et le déposa dans un tombeau taillé dans la roche. Puis il roula une pierre à l’entrée du tombeau. »',
      bds: '« Celui-ci, après avoir acheté un drap de lin, descendit le corps de la croix, l’enveloppa dans le drap et le déposa dans un tombeau taillé dans le roc. Puis il roula un bloc de pierre devant l’entrée du tombeau. »',
      default: '« Et Joseph, ayant acheté un linceul, descendit Jésus de la croix, l’enveloppa du linceul, et le déposa dans un sépulcre taillé dans le roc. Puis il roula une pierre à l’entrée du sépulcre. »',
    },
    note: 'C’est le jour de la préparation, avant le début du sabbat au coucher du soleil. Joseph d’Arimathée, membre respecté du {council}, demande le corps à Pilate (15:42–45) ; Nicodème apporte de la myrrhe et de l’aloès, et le tombeau est neuf, dans un jardin près du lieu (Jean 19:39–41). Marie de Magdala et Marie, mère de Joses, regardent où on le dépose (15:47). Les tombeaux de l’époque avaient des portes basses ; quelques-uns se fermaient par une pierre ronde comme celle-ci.',
    where: 'Un tombeau dans un jardin voisin',
  },
  {
    title: 'Le sabbat', ref: 'Matthieu 27:65–66', when: 'Samedi, le sabbat',
    quote: {
      sg21: '« Pilate leur dit : “Vous avez une garde. Allez-y, gardez-le comme vous le souhaitez !” Ils s’en allèrent et firent surveiller le tombeau par la garde après avoir scellé la pierre. »',
      bds: '« Pilate leur déclara : D’accord ! Prenez un corps de garde et assurez la protection de ce tombeau à votre guise. Ils se rendirent donc au tombeau et le firent surveiller après avoir apposé les scellés sur la pierre en présence de la garde. »',
      neg1979: '« Pilate leur dit : Vous avez une garde ; allez, gardez-le comme vous l’entendez. Ils s’en allèrent, et s’assurèrent du sépulcre au moyen de la garde, après avoir scellé la pierre. »',
      lsg: '« Pilate leur dit : Vous avez une garde ; allez, gardez-le comme vous l’entendrez. Ils s’en allèrent, et s’assurèrent du sépulcre au moyen de la garde, après avoir scellé la pierre. »',
    },
    note: 'Marc ne dit rien du sabbat ; les femmes se reposent selon la loi (Luc 23:56). Matthieu raconte que les chefs des prêtres et les pharisiens se souvinrent qu’il avait dit qu’il ressusciterait après trois jours, et demandèrent à Pilate de faire garder le tombeau (27:62–64). On ne sait pas comment la pierre fut scellée ; ici, c’est un cordon fixé avec de l’argile.',
    where: 'Le tombeau',
  },
  {
    title: 'Il n’est pas ici', ref: 'Marc 16:5–6', when: 'Dimanche, au lever du soleil',
    quote: {
      sg21: '« Elles pénétrèrent dans le tombeau, virent un jeune homme assis à droite, habillé d’une robe blanche, et elles furent épouvantées. Il leur dit : “N’ayez pas peur. Vous cherchez Jésus de Nazareth, celui qui a été crucifié. Il est ressuscité, il n’est pas ici !” »',
      bds: '« Elles pénétrèrent dans le caveau et virent, assis du côté droit, un jeune homme vêtu d’une robe blanche. Elles furent saisies de frayeur. Mais le jeune homme leur dit : N’ayez pas peur ! Vous cherchez Jésus de Nazareth, celui qui a été crucifié ? Il est ressuscité, il n’est plus ici. »',
      default: '« Elles entrèrent dans le sépulcre, virent un jeune homme assis à droite vêtu d’une robe blanche, et elles furent épouvantées. Il leur dit : Ne vous épouvantez pas ; vous cherchez Jésus de Nazareth, qui a été crucifié ; il est ressuscité, il n’est point ici. »',
    },
    note: 'Le sabbat passé, Marie de Magdala, Marie, mère de Jacques, et Salomé achetèrent des aromates pour l’embaumer, et vinrent de grand matin le premier jour de la semaine, au lever du soleil. Elles se demandaient qui leur roulerait la pierre, et la trouvèrent déjà roulée (16:1–4). Matthieu dit qu’un ange l’avait roulée et que les gardes tremblèrent de peur (Matthieu 28:2–4).',
    where: 'Le tombeau vide',
  },
];
