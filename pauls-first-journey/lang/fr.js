// French text for "Paul's First Missionary Journey", merged over data.js (see
// addLanguage in ../../i18n.js). Same shape as data.js, text fields only.
// Version keys are the French versions (sg21, bds, neg1979, lsg); `default`
// covers the ones not listed. STOPS line up with data.js by position.
//
// Quotations are verbatim, in « … » with non-breaking spaces (U+00A0) inside the
// guillemets and before the high punctuation marks, speech inside them in “ … ”.
// The NEG1979 and LSG write Icone, Jupiter and Mercure; the Semeur (BDS) Pergé,
// Lystres and Derbé.

export const TERMS = {
  zeus: { neg1979: 'Jupiter', lsg: 'Jupiter', default: 'Zeus' },
  hermes: { neg1979: 'Mercure', lsg: 'Mercure', default: 'Hermès' },
  proconsul: { sg21: 'gouverneur', default: 'proconsul' },
};

export const PLACES = {
  antioch: { name: 'Antioche' },
  seleucia: { name: 'Séleucie' },
  salamis: { name: 'Salamine' },
  paphos: { name: 'Paphos' },
  perga: { name: { bds: 'Pergé', default: 'Perge' } },
  antiochP: { name: { bds: 'Antioche en Pisidie', default: 'Antioche de Pisidie' } },
  iconium: { name: { neg1979: 'Icone', lsg: 'Icone', default: 'Iconium' } },
  lystra: { name: { bds: 'Lystres', default: 'Lystre' } },
  derbe: { name: { bds: 'Derbé', default: 'Derbe' } },
  attalia: { name: 'Attalie' },
};

export const FEATURES = {
  tarsus: { name: 'Tarse' },
  zeus: { name: 'Temple de {zeus}' },
  syria: { name: 'Syrie' },
  cilicia: { name: 'Cilicie' },
  cyprus: { name: 'Chypre' },
  pamphylia: { name: 'Pamphylie' },
  pisidia: { name: 'Pisidie' },
  lycaonia: { name: 'Lycaonie' },
  galatia: { name: 'Galatie' },
  taurus: { name: 'Monts Taurus' },
  sea: { name: 'Mer Méditerranée' },
};

export const INTRO = {
  title: 'Mis à part pour l’œuvre',
  ref: 'Actes 13:2',
  quote: {
    sg21: '« Pendant qu’ils rendaient un culte au Seigneur et qu’ils jeûnaient, le Saint-Esprit dit : “Mettez-moi à part Barnabas et Saul pour la tâche à laquelle je les ai appelés.” »',
    bds: '« Un jour qu’ils adoraient ensemble le Seigneur et qu’ils jeûnaient, le Saint-Esprit leur dit : Mettez à part pour moi Barnabas et Saul pour l’œuvre à laquelle je les ai appelés. »',
    neg1979: '« Pendant qu’ils servaient le Seigneur dans leur ministère et qu’ils jeûnaient, le Saint-Esprit dit : Mettez-moi à part Barnabas et Saul pour l’œuvre à laquelle je les ai appelés. »',
    lsg: '« Pendant qu’ils servaient le Seigneur dans leur ministère et qu’ils jeûnaient, le Saint Esprit dit : Mettez-moi à part Barnabas et Saul pour l’oeuvre à laquelle je les ai appelés. »',
  },
  note: 'L’Église d’Antioche de Syrie, où pour la première fois les disciples furent appelés chrétiens (11:26), avait des prophètes et des docteurs : Barnabas, Siméon appelé Niger, Lucius de Cyrène, Manahen et Saul (13:1). Deux d’entre eux furent envoyés, sans doute à la fin des années 40 apr. J.-C., pour un voyage de quelque 2 000 km par mer et à pied : à travers Chypre, par les monts Taurus jusqu’aux hautes terres d’Asie Mineure, puis le retour. Actes 13–14 le raconte ; les lettres de Paul y ajoutent un peu.',
  aside: 'Le relief est réel, d’après des données d’altitude modernes, avec les hauteurs triplées pour que les montagnes se voient ; le littoral est celui d’aujourd’hui. Les Actes ne disent pas quelles routes ils suivirent : les trajets par terre prennent le passage le plus facile entre les lieux nommés, et les trajets par mer sont une supposition. Les villes et le navire sont dessinés bien plus grands que nature. Aucun personnage n’est montré.',
};

export const FINALE = {
  title: 'La porte de la foi',
  ref: 'Actes 14:27',
  quote: {
    sg21: '« Après leur arrivée, Paul et Barnabas réunirent l’Eglise et racontèrent tout ce que Dieu avait fait avec eux et comment il avait ouvert la porte de la foi aux non-Juifs. »',
    bds: '« A leur arrivée, ils réunirent l’Eglise et racontèrent tout ce que Dieu avait fait avec eux ; ils exposèrent, en particulier, comment il avait ouvert aux non-Juifs la porte de la foi. »',
    neg1979: '« Après leur arrivée, ils convoquèrent l’Eglise, et ils racontèrent tout ce que Dieu avait fait avec eux, et comment il avait ouvert aux nations la porte de la foi. »',
    lsg: '« Après leur arrivée, ils convoquèrent l’Église, et ils racontèrent tout ce que Dieu avait fait avec eux, et comment il avait ouvert aux nations la porte de la foi. »',
  },
  note: 'Ils restèrent longtemps avec les disciples à Antioche (14:28). La question que ce voyage avait soulevée, à savoir si les croyants non juifs devaient être circoncis et observer la loi de Moïse, conduisit bientôt Paul et Barnabas à Jérusalem, où les apôtres et les anciens reconnurent que Dieu avait purifié par la foi le cœur des non-Juifs comme celui des Juifs (15:1–11). Plus tard, Paul repartit visiter les frères dans toutes les villes où ils avaient annoncé la parole (15:36).',
};

export const STOPS = [
  {
    title: 'Envoyés d’Antioche', ref: 'Actes 13:3',
    quote: {
      sg21: '« Alors, après avoir jeûné, prié et posé les mains sur eux, ils les laissèrent partir. »',
      bds: '« Alors, après avoir jeûné et prié, ils leur imposèrent les mains et les laissèrent partir. »',
      neg1979: '« Alors, après avoir jeûné et prié, ils leur imposèrent les mains, et les laissèrent partir. »',
      lsg: '« Alors, après avoir jeûné et prié, ils leur imposèrent les mains, et les laissèrent partir. »',
    },
    note: 'Antioche sur l’Oronte était la capitale de la province romaine de Syrie et l’une des grandes villes de l’empire. Barnabas y avait amené Saul de Tarse (11:25–26), et ils revenaient de Jérusalem, où ils avaient porté des secours pendant la famine, avec Jean-Marc (12:25). L’Église leur impose maintenant les mains et les envoie.',
  },
  {
    title: 'Vers Séleucie', ref: 'Actes 13:4',
    quote: {
      sg21: '« Envoyés par le Saint-Esprit, Barnabas et Saul descendirent à Séleucie, d’où ils embarquèrent pour l’île de Chypre. »',
      bds: '« C’est donc envoyés par le Saint-Esprit que Barnabas et Saul descendirent à Séleucie, où ils s’embarquèrent pour l’île de Chypre. »',
      neg1979: '« Barnabas et Saul, envoyés par le Saint-Esprit, descendirent à Séleucie, et de là ils s’embarquèrent pour l’île de Chypre. »',
      lsg: '« Barnabas et Saul, envoyés par le Saint Esprit, descendirent à Séleucie, et de là ils s’embarquèrent pour l’île de Chypre. »',
    },
    note: 'Séleucie de Piérie était le port d’Antioche, au bord de la mer près de l’embouchure de l’Oronte. Barnabas était un Lévite originaire de Chypre (4:36) : l’île était tout indiquée pour commencer. Les Actes ne décrivent pas leur navire ; les voyageurs prenaient passage sur des navires marchands, et celui qui est dessiné ici est un petit navire de commerce romain de l’époque.',
  },
  {
    title: 'Salamine', ref: 'Actes 13:5',
    quote: {
      sg21: '« Arrivés à Salamine, ils annoncèrent la parole de Dieu dans les synagogues des Juifs. Ils avaient aussi Jean pour aide. »',
      bds: '« Une fois arrivés à Salamine, ils annoncèrent la Parole de Dieu dans les synagogues des Juifs. Jean-Marc était avec eux et les secondait. »',
      neg1979: '« Arrivés à Salamine, ils annoncèrent la parole de Dieu dans les synagogues des Juifs. Ils avaient Jean pour aide. »',
      lsg: '« Arrivés à Salamine, ils annoncèrent la parole de Dieu dans les synagogues des Juifs. Ils avaient Jean pour aide. »',
    },
    note: 'Salamine, sur la côte est, à quelque 200 km de Séleucie, était la plus grande ville de l’île, avec assez de Juifs pour plus d’une synagogue. Paul procédera désormais ainsi : d’abord à la synagogue (13:14 ; 14:1). Jean est Jean-Marc, cousin de Barnabas (Colossiens 4:10), dont la mère avait à Jérusalem une maison où l’Église se réunissait (12:12).',
  },
  {
    title: 'À travers toute l’île', ref: 'Actes 13:6',
    quote: {
      sg21: '« Ensuite, ils traversèrent [toute] l’île jusqu’à Paphos, où ils trouvèrent un magicien, un prétendu prophète juif appelé Bar-Jésus. »',
      bds: '« Ils traversèrent toute l’île et arrivèrent à Paphos. Ils trouvèrent là un magicien juif nommé Bar-Jésus, qui se faisait passer pour un prophète. »',
      neg1979: '« Ayant ensuite traversé toute l’île jusqu’à Paphos, ils trouvèrent un certain magicien, faux prophète juif, nommé Bar-Jésus… »',
      lsg: '« Ayant ensuite traversé toute l’île jusqu’à Paphos, ils trouvèrent un certain magicien, faux prophète juif, nommé Bar Jésus… »',
    },
    note: 'De Salamine à Paphos, il y a environ 160 km. Les Actes ne donnent pas la route ; on suppose d’ordinaire la route côtière par Kition, Amathonte et Kourion, et l’itinéraire la suit, au pied des monts Troodos. Chypre était une province sénatoriale, gouvernée par un proconsul, et Luc lui donne le titre exact (13:7).',
  },
  {
    title: 'Le {proconsul} croit', ref: 'Actes 13:12',
    quote: {
      sg21: '« Quand il vit ce qui était arrivé, le gouverneur crut, frappé qu’il était par l’enseignement du Seigneur. »',
      bds: '« Quand le proconsul vit ce qui venait de se passer, il crut ; car il avait été vivement impressionné par l’enseignement qui lui avait été donné au sujet du Seigneur. »',
      neg1979: '« Alors le proconsul, voyant ce qui était arrivé, crut, étant frappé de la doctrine du Seigneur. »',
      lsg: '« Alors le proconsul, voyant ce qui était arrivé, crut, étant frappé de la doctrine du Seigneur. »',
    },
    note: 'Paphos (la Nouvelle Paphos) était la capitale, où résidait le {proconsul} Sergius Paulus. Il fit appeler Barnabas et Saul pour entendre la parole de Dieu, mais le magicien Élymas, qui était avec lui, cherchait à le détourner de la foi. Saul, appelé aussi Paul, lui annonça qu’il serait aveugle pour un temps, et ce fut le cas (13:7–11). Désormais Luc l’appelle Paul, et le nomme en premier.',
  },
  {
    title: { bds: 'Pergé en Pamphylie', default: 'Perge en Pamphylie' }, ref: 'Actes 13:13',
    quote: {
      sg21: '« Paul et ses compagnons embarquèrent à Paphos pour se rendre à Perge en Pamphylie, mais Jean se sépara d’eux et retourna à Jérusalem. »',
      bds: '« Paul et ses compagnons reprirent la mer à Paphos et arrivèrent à Pergé en Pamphylie. Là, Jean-Marc les abandonna et retourna à Jérusalem. »',
      neg1979: '« Paul et ses compagnons, s’étant embarqués à Paphos, se rendirent à Perge en Pamphylie. Jean se sépara d’eux, et retourna à Jérusalem. »',
      lsg: '« Paul et ses compagnons, s’étant embarqués à Paphos, se rendirent à Perge en Pamphylie. Jean se sépara d’eux, et retourna à Jérusalem. »',
    },
    note: 'La traversée de Paphos à la côte de Pamphylie fait environ 250 km. La ville se trouvait à une douzaine de kilomètres de la mer, sur le fleuve Cestros, que les navires pouvaient remonter ; l’itinéraire aborde à son embouchure. Ici, Jean-Marc rentra chez lui. Les Actes ne disent pas pourquoi, mais Paul le lui reprocha, et plus tard Barnabas et lui se séparèrent à ce sujet (15:37–39). Des années après, Paul demanda de nouveau Marc, qui lui était utile (2 Timothée 4:11).',
  },
  {
    title: 'Par les monts Taurus', ref: '2 Corinthiens 11:26',
    quote: {
      sg21: '« Fréquemment en voyage, j’ai été en danger sur les fleuves, en danger de la part des brigands, en danger de la part de mes compatriotes, en danger de la part des non-Juifs, en danger dans les villes, en danger dans les déserts, en danger sur la mer… »',
      bds: '« Souvent en voyage, j’ai été en danger au passage des fleuves, en danger dans des régions infestées de brigands, en danger à cause des Juifs, mes compatriotes, en danger à cause des païens, en danger dans les villes, en danger dans les contrées désertes, en danger sur la mer… »',
      neg1979: '« Fréquemment en voyage, j’ai été en péril sur les fleuves, en péril de la part des brigands, en péril de la part de ceux de ma nation, en péril de la part des païens, en péril dans les villes, en péril dans les déserts, en péril sur la mer… »',
      lsg: '« Fréquemment en voyage, j’ai été en péril sur les fleuves, en péril de la part des brigands, en péril de la part de ceux de ma nation, en péril de la part des païens, en péril dans les villes, en péril dans les déserts, en péril sur la mer… »',
    },
    note: 'De la côte à Antioche de Pisidie, il y a quelque 160 km, par les gorges du Taurus jusqu’à un plateau à plus de 1 000 m d’altitude. Les Actes ne disent rien de la route (13:14). Paul a écrit cette liste des années plus tard, à propos de tous ses voyages, mais les fleuves en crue et les brigands étaient des dangers connus dans ces montagnes, et beaucoup ont pensé à cette route. Certains rattachent cette montée à la maladie qu’il évoque en Galates 4:13.',
  },
  {
    title: { bds: 'Antioche en Pisidie', default: 'Antioche de Pisidie' }, ref: 'Actes 13:14',
    quote: {
      sg21: '« De Perge ils poursuivirent leur route et arrivèrent à Antioche de Pisidie. Ils entrèrent dans la synagogue le jour du sabbat et s’assirent. »',
      bds: '« Quant à eux, ils quittèrent Pergé et continuèrent leur route jusqu’à Antioche en Pisidie. Là, ils se rendirent à la synagogue le jour du sabbat et s’assirent. »',
      neg1979: '« De Perge ils poursuivirent leur route, et arrivèrent à Antioche de Pisidie. Etant entrés dans la synagogue le jour du sabbat, ils s’assirent. »',
      lsg: '« De Perge ils poursuivirent leur route, et arrivèrent à Antioche de Pisidie. Étant entrés dans la synagogue le jour du sabbat, ils s’assirent. »',
    },
    note: 'Cette Antioche, près de la Pisidie, sur une colline à environ 1 100 m d’altitude, était une colonie romaine, peuplée de vétérans des légions sous Auguste. Après la lecture de la loi et des prophètes, les chefs de la synagogue invitèrent les visiteurs à adresser une parole d’encouragement (13:15), et Paul se leva pour prêcher : de l’exode et de David jusqu’à Jésus, ressuscité des morts, par qui le pardon des péchés est annoncé (13:16–41).',
  },
  {
    title: { bds: 'La lumière des peuples', default: 'La lumière des nations' }, ref: 'Actes 13:47',
    quote: {
      sg21: '« En effet, tel est l’ordre que le Seigneur nous a donné : Je t’ai établi pour être la lumière des nations, pour apporter le salut jusqu’aux extrémités de la terre. »',
      bds: '« Car le Seigneur a bien défini notre mission lorsqu’il a dit : Je t’ai établi pour que tu sois la lumière des autres peuples, et pour que tu portes le salut jusqu’aux extrémités de la terre. »',
      neg1979: '« Car ainsi nous l’a ordonné le Seigneur : Je t’ai établi pour être la lumière des nations, Pour porter le salut jusqu’aux extrémités de la terre. »',
      lsg: '« Car ainsi nous l’a ordonné le Seigneur : Je t’ai établi pour être la lumière des nations, Pour porter le salut jusqu’aux extrémités de la terre. »',
    },
    note: 'Le sabbat suivant, presque toute la ville se rassembla pour entendre. Comme certains Juifs s’opposaient à eux, Paul et Barnabas se tournèrent vers les non-Juifs, avec ces paroles d’Ésaïe 49:6. Les non-Juifs se réjouirent, et la parole du Seigneur se répandit dans toute la région (13:44–49). Puis on excita contre eux les notables de la ville, hommes et femmes, et ils furent chassés ; ils secouèrent contre eux la poussière de leurs pieds et allèrent plus loin (13:50–51).',
  },
  {
    title: { neg1979: 'Icone', lsg: 'Icone', default: 'Iconium' }, ref: 'Actes 14:1',
    quote: {
      sg21: '« A Iconium de même, Paul et Barnabas entrèrent dans la synagogue des Juifs, et ils parlèrent de telle manière qu’une grande foule de Juifs et de non-Juifs crurent. »',
      bds: '« A Iconium, Paul et Barnabas se rendirent aussi à la synagogue des Juifs et y parlèrent de telle sorte que beaucoup de Juifs et de non-Juifs devinrent croyants. »',
      neg1979: '« A Icone, Paul et Barnabas entrèrent ensemble dans la synagogue des Juifs, et ils parlèrent de telle manière qu’une grande multitude de Juifs et de Grecs crurent. »',
      lsg: '« A Icone, Paul et Barnabas entrèrent ensemble dans la synagogue des Juifs, et ils parlèrent de telle manière qu’une grande multitude de Juifs et de Grecs crurent. »',
    },
    note: 'La ville, l’actuelle Konya, se trouvait quelque 140 km plus à l’est, au bord de la grande plaine de Lycaonie. Ils y restèrent longtemps, parlant avec assurance, et le Seigneur confirmait la parole par des signes et des prodiges (14:3). Mais la ville se divisa, et quand ils apprirent qu’on voulait les lapider, ils se réfugièrent dans les villes de Lycaonie et dans les environs (14:4–7).',
  },
  {
    title: 'Les dieux sont descendus', ref: 'Actes 14:11',
    quote: {
      sg21: '« A la vue de ce que Paul avait fait, la foule se mit à dire tout haut en lycaonien : “Les dieux sont descendus vers nous sous une forme humaine.” »',
      bds: '« Quand ils virent ce que Paul avait fait, les nombreux assistants crièrent dans leur langue, le lycaonien : Les dieux ont pris forme humaine et ils sont descendus parmi nous. »',
      neg1979: '« A la vue de ce que Paul avait fait, la foule éleva la voix, et dit en langue lycaonienne : Les dieux sous une forme humaine sont descendus vers nous. »',
      lsg: '« A la vue de ce que Paul avait fait, la foule éleva la voix, et dit en langue lycaonienne : Les dieux sous une forme humaine sont descendus vers nous. »',
    },
    note: 'Cette petite colonie romaine se trouvait à une trentaine de kilomètres au sud d’Iconium. Paul guérit un homme boiteux de naissance, et la foule prit Barnabas pour {zeus} et Paul pour {hermes}, parce que c’était lui qui parlait (14:8–12). Le prêtre de {zeus}, dont le temple était à l’entrée de la ville, amena des taureaux et des guirlandes vers les portes pour leur offrir un sacrifice, et tous deux déchirèrent leurs vêtements et eurent grand-peine à l’en empêcher (14:13–18). On ne sait pas où était le temple ; il est dessiné au bord de la route.',
  },
  {
    title: { bds: 'Lapidé à Lystres', default: 'Lapidé à Lystre' }, ref: 'Actes 14:19',
    quote: {
      sg21: '« Alors arrivèrent d’Antioche et d’Iconium des Juifs qui gagnèrent la foule. Après avoir lapidé Paul, ils le traînèrent hors de la ville, pensant qu’il était mort. »',
      bds: '« Des Juifs arrivèrent d’Antioche et d’Iconium et ils parvinrent à retourner le peuple contre eux : ils lapidèrent Paul, puis ils le traînèrent hors de la ville, croyant qu’il était mort. »',
      neg1979: '« Alors survinrent d’Antioche et d’Icone des Juifs qui gagnèrent la foule, et qui, après avoir lapidé Paul, le traînèrent hors de la ville, pensant qu’il était mort. »',
      lsg: '« Alors survinrent d’Antioche et d’Icone des Juifs qui gagnèrent la foule, et qui, après avoir lapidé Paul, le traînèrent hors de la ville, pensant qu’il était mort. »',
    },
    note: 'Mais quand les disciples l’entourèrent, il se leva et rentra dans la ville, et le lendemain il partit avec Barnabas (14:20). Des années plus tard, Paul le comptait parmi ses souffrances : une fois il fut lapidé (2 Corinthiens 11:25). Il rappela à Timothée ce qui lui était arrivé à Antioche, à Iconium et dans cette ville, et comment le Seigneur l’avait délivré de tout (2 Timothée 3:11). Timothée en était originaire (16:1).',
  },
  {
    title: { bds: 'Derbé', default: 'Derbe' }, ref: 'Actes 14:21',
    quote: {
      sg21: '« Après avoir évangélisé cette ville et fait un certain nombre de disciples, ils retournèrent à Lystre, à Iconium et à Antioche. »',
      bds: '« Après avoir annoncé l’Evangile dans cette ville et y avoir fait de nombreux disciples, ils retournèrent à Lystres, à Iconium et à Antioche. »',
      neg1979: '« Quand ils eurent évangélisé cette ville et fait un certain nombre de disciples, ils retournèrent à Lystre, à Icone et à Antioche… »',
      lsg: '« Quand ils eurent évangélisé cette ville et fait un certain nombre de disciples, ils retournèrent à Lystre, à Icone et à Antioche… »',
    },
    note: 'Cette ville, à quelque 90 km plus à l’est, fut le point le plus éloigné du voyage. Son emplacement n’est connu que par des inscriptions portant son nom, trouvées au nord-est de Karaman, et reste discuté ; elle est dessinée là. De là, la route par les Portes de Cilicie jusqu’à Tarse et chez eux était plus courte, mais ils revinrent sur leurs pas, vers les villes d’où on les avait chassés.',
  },
  {
    title: 'Fortifier les disciples', ref: 'Actes 14:22',
    quote: {
      sg21: '« Ils fortifiaient l’esprit des disciples, les encourageaient à persévérer dans la foi et disaient : “C’est à travers beaucoup de difficultés qu’il nous faut entrer dans le royaume de Dieu.” »',
      bds: '« Ils fortifiaient les disciples et les encourageaient à demeurer fermes dans la foi. – Car, leur disaient-ils, c’est au travers de beaucoup de souffrances qu’il nous faut entrer dans le royaume de Dieu. »',
      neg1979: '« …fortifiant l’esprit des disciples, les exhortant à persévérer dans la foi, et disant que c’est par beaucoup de tribulations qu’il nous faut entrer dans le royaume de Dieu. »',
      lsg: '« …fortifiant l’esprit des disciples, les exhortant à persévérer dans la foi, et disant que c’est par beaucoup de tribulations qu’il nous faut entrer dans le royaume de Dieu. »',
    },
    note: 'Ils revinrent par le chemin de l’aller, par les villes où Paul avait été lapidé et où tous deux avaient été menacés, pour affermir les nouveaux croyants. Ce qu’ils leur dirent, ce n’est pas que suivre Jésus serait facile.',
  },
  {
    title: { bds: 'Des responsables dans chaque Eglise', lsg: 'Des anciens dans chaque Église', default: 'Des anciens dans chaque Eglise' }, ref: 'Actes 14:23',
    quote: {
      sg21: '« Ils désignèrent des anciens dans chaque Eglise et, après avoir prié et jeûné, ils les confièrent au Seigneur en qui ils avaient cru. »',
      bds: '« Dans chaque Eglise, ils firent nommer pour celles-ci des responsables et, en priant et en jeûnant, ils les confièrent au Seigneur en qui ils avaient cru. »',
      neg1979: '« Ils désignèrent des anciens dans chaque Eglise, et, après avoir prié et jeûné, ils les recommandèrent au Seigneur, en qui ils avaient cru. »',
      lsg: '« Ils firent nommer des anciens dans chaque Église, et, après avoir prié et jeûné, ils les recommandèrent au Seigneur, en qui ils avaient cru. »',
    },
    note: 'Dans chaque ville, ils laissèrent aux croyants des responsables à eux, et ils le firent comme l’Église d’Antioche les avait envoyés eux-mêmes, dans la prière et le jeûne (13:3). Puis ils les confièrent à la garde du Seigneur. De retour à Antioche, près de la Pisidie, ils avaient fait le tour des quatre villes.',
  },
  {
    title: 'Les Églises de Galatie', ref: 'Galates 4:13',
    quote: {
      sg21: '« …mais, vous le savez, c’est à cause d’un problème physique que je vous ai annoncé l’Evangile pour la première fois. »',
      bds: '« Vous vous en souvenez, n’est-ce pas ? C’est une maladie qui m’a donné l’occasion de vous annoncer l’Evangile pour la première fois. »',
      neg1979: '« Vous savez que ce fut à cause d’une infirmité de la chair que je vous ai annoncé pour la première fois l’Evangile. »',
      lsg: '« Vous savez que ce fut à cause d’une infirmité de la chair que je vous ai pour la première fois annoncé l’Évangile. »',
    },
    note: 'Les quatre villes se trouvaient dans la province romaine de Galatie. Beaucoup pensent que la lettre de Paul « aux Églises de la Galatie » (Galates 1:2) leur était adressée, et qu’il se souvient ici de cette première visite, quand ils l’accueillirent malgré sa maladie. D’autres pensent que la lettre s’adressait aux peuples galates plus au nord, qu’il visita plus tard (16:6). Dans les deux cas, la maladie n’est pas nommée.',
  },
  {
    title: { bds: 'Pergé et Attalie', default: 'Perge et Attalie' }, ref: 'Actes 14:25',
    quote: {
      sg21: '« Ils annoncèrent la parole à Perge, puis ils descendirent à Attalie. »',
      bds: '« Après avoir annoncé la Parole à Pergé, ils descendirent au port d’Attalie. »',
      neg1979: '« …annoncèrent la parole à Perge, et descendirent à Attalie. »',
      lsg: '« …annoncèrent la parole à Perge, et descendirent à Attalie. »',
    },
    note: 'Ils traversèrent la Pisidie et redescendirent par les montagnes jusqu’en Pamphylie (14:24). Cette fois, ils prêchèrent dans la ville de la côte où les Actes ne mentionnent aucune prédication à l’aller, puis descendirent au port, l’actuelle Antalya.',
  },
  {
    title: 'Retour à Antioche', ref: 'Actes 14:26',
    quote: {
      sg21: '« De là ils embarquèrent pour Antioche, leur point de départ, où on les avait confiés à la grâce de Dieu pour la tâche qu’ils venaient d’accomplir. »',
      bds: '« Là ils s’embarquèrent pour Antioche d’où ils étaient partis et où on les avait confiés à la grâce de Dieu pour l’œuvre qu’ils venaient d’accomplir. »',
      neg1979: '« De là ils s’embarquèrent pour Antioche, d’où ils avaient été recommandés à la grâce de Dieu pour l’œuvre qu’ils venaient d’accomplir. »',
      lsg: '« De là ils s’embarquèrent pour Antioche, d’où ils avaient été recommandés à la grâce de Dieu pour l’oeuvre qu’ils venaient d’accomplir. »',
    },
    note: 'D’Attalie à Séleucie, il y a quelque 500 km par mer, le long de la côte de Cilicie et du nord de Chypre, puis on remonte l’Oronte jusqu’à Antioche. Ils étaient partis depuis peut-être un ou deux ans ; les Actes ne donnent pas de dates. L’œuvre pour laquelle ils avaient été mis à part (13:2) était accomplie.',
  },
];
