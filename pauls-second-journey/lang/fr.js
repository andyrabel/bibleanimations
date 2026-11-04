// French text for this journey, merged over data.js (see addLanguage in ../../i18n.js).
// Same shape as data.js, text fields only; STOPS line up by position. Quotations are
// verbatim, in « … » with non-breaking spaces (U+00A0) inside the guillemets and before
// the high punctuation marks.

// Words that differ between versions: {term} in any text field.
export const TERMS = {
  areopagus: 'Aréopage',
};

export const PLACES = {
  antioch: { name: 'Antioche' },
  derbe: { name: { bds: 'Derbé', default: 'Derbe' } },
  lystra: { name: { bds: 'Lystres', default: 'Lystre' } },
  iconium: { name: { neg1979: 'Icone', lsg: 'Icone', default: 'Iconium' } },
  antiochP: { name: { bds: 'Antioche en Pisidie', default: 'Antioche de Pisidie' } },
  troas: { name: 'Troas' },
  neapolis: { name: 'Néapolis' },
  philippi: { name: 'Philippes' },
  thessalonica: { name: 'Thessalonique' },
  berea: { name: 'Bérée' },
  athens: { name: 'Athènes' },
  corinth: { name: 'Corinthe' },
  cenchrea: { name: 'Cenchrées' },
  ephesus: { name: { lsg: 'Éphèse', default: 'Ephèse' } },
  caesarea: { name: 'Césarée' },
  jerusalem: { name: 'Jérusalem' },
};

export const FEATURES = {
  tarsus: { name: 'Tarse' },
  amphipolis: { name: 'Amphipolis' },
  apollonia: { name: 'Apollonie' },
  samothrace: { name: 'Samothrace' },
  areopagus: { name: '{Areopagus}' },
  syria: { name: 'Syrie' },
  cilicia: { name: 'Cilicie' },
  galatia: { name: 'Galatie' },
  phrygia: { name: 'Phrygie' },
  mysia: { name: 'Mysie' },
  bithynia: { name: 'Bithynie' },
  asia: { name: 'Asie' },
  macedonia: { name: 'Macédoine' },
  achaia: { name: 'Achaïe' },
  judea: { name: 'Judée' },
  cyprus: { name: 'Chypre' },
  aegean: { name: 'Mer Égée' },
  sea: { name: 'Mer Méditerranée' },
};

export const INTRO = {
  title: 'Retournons',
  ref: 'Actes 15:36',
  quote: {
    sg21: '« Quelques jours plus tard, Paul dit à Barnabas : “Retournons visiter nos frères et sœurs dans toutes les villes où nous avons annoncé la parole du Seigneur, pour voir comment ils vont.” »',
    bds: '« Après quelque temps, Paul dit à Barnabas : Partons refaire le tour de toutes les villes où nous avons annoncé la Parole du Seigneur et rendons visite aux frères pour voir ce qu’ils deviennent. »',
    neg1979: '« Quelques jours s’écoulèrent, après lesquels Paul dit à Barnabas : Retournons voir les frères dans toutes les villes où nous avons annoncé la parole du Seigneur, pour voir en quel état ils sont. »',
    lsg: '« Quelques jours s’écoulèrent, après lesquels Paul dit à Barnabas : Retournons visiter les frères dans toutes les villes où nous avons annoncé la parole du Seigneur, pour voir en quel état ils sont. »',
  },
  note: 'Après le concile de Jérusalem (Actes 15), Paul proposa de retourner voir les Églises du premier voyage. Barnabas voulait reprendre Jean-Marc ; Paul refusa, et ils se séparèrent : Barnabas partit pour Chypre avec Marc, et Paul prit la route avec Silas (15:37–40). Ce voyage, vers 49–52 apr. J.-C., porta l’Évangile en Europe : à Philippes, Thessalonique, Bérée, Athènes et Corinthe.',
  aside: 'Le relief est réel, d’après des données d’altitude modernes, avec les hauteurs triplées pour que les montagnes se voient ; le littoral est celui d’aujourd’hui, si bien que les ports ensablés d’Éphèse et de Milet sont maintenant à l’intérieur des terres. Les Actes ne disent pas quelles routes ils suivirent : les trajets par terre prennent le passage le plus facile entre les lieux nommés, et ceux par mer le plus court en eau libre. Les villes et le navire sont dessinés bien plus grands que nature. Aucun personnage n’est montré.',
};

export const FINALE = {
  title: 'La parole a retenti',
  ref: '1 Thessaloniciens 1:8',
  quote: {
    sg21: '« En effet, non seulement la parole du Seigneur a retenti depuis chez vous en Macédoine et en Achaïe, mais c’est aussi partout que votre foi en Dieu s’est fait connaître, de sorte que nous n’avons pas besoin d’en parler. »',
    bds: '« Non seulement l’œuvre accomplie chez vous par la Parole du Seigneur a eu un grand retentissement jusqu’en Macédoine et en Achaïe, mais encore la nouvelle de votre foi en Dieu est parvenue en tout lieu, et nous n’avons même pas besoin d’en parler. »',
    neg1979: '« Non seulement, en effet, la parole du Seigneur a retenti de chez vous dans la Macédoine et dans l’Achaïe, mais encore votre foi en Dieu s’est fait connaître en tout lieu, de telle manière que nous n’avons pas besoin d’en parler. »',
    lsg: '« Non seulement, en effet, la parole du Seigneur a retenti de chez vous dans la Macédoine et dans l’Achaïe, mais votre foi en Dieu s’est fait connaître en tout lieu, de telle manière que nous n’avons pas besoin d’en parler. »',
  },
  note: 'Paul écrivit cela de Corinthe, quelques mois après avoir été chassé de Thessalonique (1 Thessaloniciens 2:17 ; 3:1–6). C’est sans doute la plus ancienne de ses lettres qui nous soit parvenue. Il écrirait encore aux Églises fondées pendant ce voyage, à Philippes, Thessalonique et Corinthe, et les reverrait lors de son troisième voyage (20:1–3).',
};

export const STOPS = [
  {
    title: 'Paul choisit Silas', ref: 'Actes 15:40',
    quote: {
      sg21: '« Paul choisit Silas et partit, confié par les frères à la grâce du Seigneur. »',
      bds: '« Paul, de son côté, choisit Silas et partit avec lui, après avoir été confié par les frères à la grâce du Seigneur. »',
      neg1979: '« Paul choisit Silas, et partit, recommandé par les frères à la grâce du Seigneur. »',
      lsg: '« Paul fit choix de Silas, et partit, recommandé par les frères à la grâce du Seigneur. »',
    },
    note: 'Silas (Silvain dans les lettres) était un des responsables de l’Église de Jérusalem et un prophète, envoyé à Antioche avec la lettre du concile (15:22, 32). Comme Paul, il était citoyen romain (16:37). Barnabas et Marc partirent pour Chypre ; les Actes ne les suivent pas, mais Paul parle plus tard des deux avec estime (1 Corinthiens 9:6 ; Colossiens 4:10).',
  },
  {
    title: 'Par la Syrie et la Cilicie', ref: 'Actes 15:41',
    quote: {
      sg21: '« Il traversa la Syrie et la Cilicie en fortifiant les Eglises. »',
      bds: '« Il parcourut la Syrie et la Cilicie en fortifiant les Eglises. »',
      neg1979: '« Il parcourut la Syrie et la Cilicie, fortifiant les Eglises. »',
      lsg: '« Il parcourut la Syrie et la Cilicie, fortifiant les Églises. »',
    },
    note: 'La route montait vers le nord par les monts Amanus et les Portes de Syrie, contournait le fond du golfe jusqu’à Tarse, la ville natale de Paul (21:39), puis gravissait les Portes de Cilicie, le passage à travers le Taurus, jusqu’au plateau. Les Églises de cette région étaient antérieures au premier voyage (15:23 ; Galates 1:21).',
  },
  {
    title: 'Timothée', ref: 'Actes 16:1',
    quote: {
      sg21: '« Il se rendit ensuite à Derbe et à Lystre. Il y avait là un disciple appelé Timothée, fils d’une femme juive croyante et d’un père grec. »',
      bds: '« Paul se rendit ensuite à Derbé, puis à Lystres. Il y trouva un disciple nommé Timothée ; sa mère était une croyante d’origine juive et son père était Grec. »',
      neg1979: '« Il se rendit ensuite à Derbe et à Lystre. Et voici, il y avait là un disciple nommé Timothée, fils d’une femme juive fidèle et d’un père grec. »',
      lsg: '« Il se rendit ensuite à Derbe et à Lystre. Et voici, il y avait là un disciple nommé Timothée, fils d’une femme juive fidèle et d’un père grec. »',
    },
    note: 'La mère de Timothée, Eunice, et sa grand-mère Loïs étaient croyantes (2 Timothée 1:5), et les frères de Lystre et d’Iconium lui rendaient un bon témoignage (16:2). Paul l’emmena et, comme tous savaient que son père était grec, il le circoncit à cause des Juifs de ces lieux (16:3). Il devint son plus proche collaborateur (Philippiens 2:19–22).',
  },
  {
    title: 'Les Églises affermies', ref: 'Actes 16:5',
    quote: {
      sg21: '« Les Eglises se fortifiaient dans la foi et augmentaient en nombre chaque jour. »',
      bds: '« Et les Eglises s’affermissaient dans la foi et voyaient augmenter chaque jour le nombre de leurs membres. »',
      neg1979: '« Les Eglises se fortifiaient dans la foi, et augmentaient en nombre de jour en jour. »',
      lsg: '« Les Églises se fortifiaient dans la foi, et augmentaient en nombre de jour en jour. »',
    },
    note: 'De ville en ville, ils transmettaient les décisions des apôtres et des anciens de Jérusalem (16:4) : les croyants non juifs n’avaient pas à être circoncis, mais devaient s’abstenir des viandes sacrifiées aux idoles, du sang, des animaux étouffés et de l’immoralité sexuelle (15:28–29).',
  },
  {
    title: 'Empêchés de parler en Asie', ref: 'Actes 16:6',
    quote: {
      sg21: '« Empêchés par le Saint-Esprit d’annoncer la parole en Asie, ils traversèrent la Phrygie et la Galatie. »',
      bds: '« Ils traversèrent la Galatie phrygienne parce que le Saint-Esprit les avait empêchés d’annoncer la Parole dans la province d’Asie. »',
      neg1979: '« Ayant été empêchés par le Saint-Esprit d’annoncer la parole dans l’Asie, ils traversèrent la Phrygie et le pays de Galatie. »',
      lsg: '« Ayant été empêchés par le Saint Esprit d’annoncer la parole dans l’Asie, ils traversèrent la Phrygie et le pays de Galatie. »',
    },
    note: 'L’Asie est ici la province romaine de la côte égéenne, dont Éphèse était la ville principale. Les Actes ne disent pas comment le Saint-Esprit les en empêcha, ni par où ils passèrent. La carte les fait monter vers le nord à travers la Phrygie, en direction de la Bithynie, comme le suggère le verset suivant.',
  },
  {
    title: 'Pas en Bithynie', ref: 'Actes 16:7',
    quote: {
      sg21: '« Arrivés près de la Mysie, ils se préparaient à entrer en Bithynie, mais l’Esprit [de Jésus] ne le leur permit pas. »',
      bds: '« Parvenus près de la Mysie, ils se proposaient d’aller en Bithynie ; mais, là encore, l’Esprit de Jésus s’opposa à leur projet. »',
      neg1979: '« Arrivés près de la Mysie, ils se disposaient à entrer en Bithynie ; mais l’Esprit de Jésus ne le leur permit pas. »',
      lsg: '« Arrivés près de la Mysie, ils se disposaient à entrer en Bithynie ; mais l’Esprit de Jésus ne le leur permit pas. »',
    },
    note: 'La Bithynie, au bord de la mer Noire, était une autre province aux grandes villes. Arrêtés une seconde fois, ils poursuivirent vers l’ouest à travers la Mysie sans y prêcher, jusqu’à la côte, à Troas (16:8) : quelque 400 km de route.',
  },
  {
    title: 'Le Macédonien', ref: 'Actes 16:9',
    quote: {
      sg21: '« Pendant la nuit, Paul eut une vision ; un Macédonien lui apparut et le supplia : “Passe en Macédoine, secours-nous !” »',
      bds: '« Là, Paul eut une vision au cours de la nuit : un Macédonien se tenait devant lui et le suppliait : Viens en Macédoine et secours-nous ! »',
      neg1979: '« Pendant la nuit, Paul eut une vision : un Macédonien lui apparut, et lui fit cette prière : Passe en Macédoine, secours-nous ! »',
      lsg: '« Pendant la nuit, Paul eut une vision : un Macédonien lui apparut, et lui fit cette prière : Passe en Macédoine, secours-nous ! »',
    },
    note: 'Alexandrie de Troade était une colonie romaine et le port d’où l’on passait en Macédoine. À partir d’ici, le récit dit « nous » (16:10) : l’auteur, Luc selon la tradition, les a rejoints. Ils en conclurent que Dieu les appelait à annoncer l’Évangile en Macédoine.',
  },
  {
    title: 'Samothrace et Néapolis', ref: 'Actes 16:11', caption: 'D’Asie en Europe',
    quote: {
      sg21: '« Après avoir embarqué à Troas, nous avons fait voile directement vers Samothrace, et le lendemain vers Néapolis. »',
      bds: '« Nous nous sommes embarqués à Troas et nous avons mis directement le cap sur l’île de Samothrace. Le lendemain, nous avons atteint Néapolis. »',
      neg1979: '« Etant partis de Troas, nous fîmes voile directement vers la Samothrace, et le lendemain nous débarquâmes à Néapolis. »',
      lsg: '« Étant partis de Troas, nous fîmes voile directement vers la Samothrace, et le lendemain nous débarquâmes à Néapolis. »',
    },
    note: 'Avec le vent en poupe, la traversée prit deux jours, avec une nuit dans l’île de Samothrace ; en sens inverse, il en fallut cinq (20:6). Néapolis, l’actuelle Kavala, était le port de Philippes, sur la via Egnatia, la voie romaine qui traversait la Macédoine.',
  },
  {
    title: 'Lydie', ref: 'Actes 16:14',
    quote: {
      sg21: '« L’une d’elles s’appelait Lydie. C’était une marchande de pourpre originaire de la ville de Thyatire, qui craignait Dieu. Elle nous écoutait et le Seigneur a ouvert son cœur pour qu’elle soit attentive à ce que disait Paul. »',
      bds: '« Il y avait parmi elles une marchande d’étoffes de pourpre, nommée Lydie, originaire de la ville de Thyatire, une non-Juive qui adorait Dieu. Elle écoutait, et le Seigneur ouvrit son cœur, de sorte qu’elle fut attentive à ce que disait Paul. »',
      neg1979: '« L’une d’elles, nommée Lydie, marchande de pourpre, de la ville de Thyatire, était une femme craignant Dieu, et elle écoutait. Le Seigneur lui ouvrit le cœur, pour qu’elle soit attentive à ce que disait Paul. »',
      lsg: '« L’une d’elles, nommée Lydie, marchande de pourpre, de la ville de Thyatire, était une femme craignant Dieu, et elle écoutait. Le Seigneur lui ouvrit le coeur, pour qu’elle fût attentive à ce que disait Paul. »',
    },
    note: 'Philippes était une colonie romaine et une des principales villes de son district (16:12). Le jour du sabbat, ils sortirent par la porte jusqu’à la rivière, où ils pensaient trouver un lieu de prière, et parlèrent aux femmes qui s’y étaient réunies (16:13). Lydie fut baptisée avec sa famille et les reçut dans sa maison (16:15).',
  },
  {
    title: 'Le geôlier', ref: 'Actes 16:31',
    quote: {
      sg21: '« Paul et Silas ont répondu : “Crois au Seigneur Jésus[-Christ] et tu seras sauvé, toi et ta famille.” »',
      bds: '« – Crois au Seigneur Jésus, lui répondirent-ils, et tu seras sauvé ; il en est de même pour toi et pour les tiens. »',
      neg1979: '« Paul et Silas répondirent : Crois au Seigneur Jésus, et tu seras sauvé, toi et ta famille. »',
      lsg: '« Paul et Silas répondirent : Crois au Seigneur Jésus, et tu seras sauvé, toi et ta famille. »',
    },
    note: 'Quand Paul eut chassé un esprit d’une jeune esclave, ses maîtres firent battre de verges Paul et Silas et les firent jeter en prison. À minuit, ils priaient et chantaient des hymnes quand un tremblement de terre ouvrit les portes (16:16–26). Le geôlier, sur le point de se tuer, demanda ce qu’il devait faire pour être sauvé ; il fut baptisé avec sa famille cette nuit-là (16:27–34).',
  },
  {
    title: 'Thessalonique', ref: 'Actes 17:2',
    quote: {
      sg21: '« Paul y entra, conformément à son habitude. Pendant trois sabbats, il discuta avec eux à partir des Ecritures… »',
      bds: '« Selon son habitude, Paul s’y rendit et, pendant trois sabbats, il discuta avec eux sur les Ecritures. »',
      neg1979: '« Paul y entra, selon sa coutume. Pendant trois sabbats, il discuta avec eux, d’après les Ecritures… »',
      lsg: '« Paul y entra, selon sa coutume. Pendant trois sabbats, il discuta avec eux, d’après les Écritures… »',
    },
    note: 'Ils prirent la via Egnatia par Amphipolis et Apollonie, quelque 140 km, jusqu’à Thessalonique, la capitale de la province (17:1). Paul montrait par les Écritures que le Christ devait souffrir et ressusciter (17:3). Certains crurent, avec beaucoup de Grecs craignant Dieu ; d’autres ameutèrent la foule, et les frères firent partir Paul et Silas de nuit (17:4–10).',
  },
  {
    title: 'Bérée', ref: 'Actes 17:11',
    quote: {
      sg21: '« Ces derniers avaient des sentiments plus nobles que ceux de Thessalonique. Ils accueillirent la parole avec beaucoup d’empressement, et ils examinaient chaque jour les Ecritures pour voir si ce qu’on leur disait était exact. »',
      bds: '« Ils y trouvèrent des gens qui étaient bien mieux disposés que les Juifs de Thessalonique et qui accueillirent la Parole de Dieu avec beaucoup d’empressement ; ceux-ci examinaient chaque jour les Ecritures pour voir si ce qu’on leur disait était juste. »',
      neg1979: '« Ces Juifs avaient des sentiments plus nobles que ceux de Thessalonique ; ils reçurent la parole avec beaucoup d’empressement, et ils examinaient chaque jour les Ecritures, pour voir si ce qu’on leur disait était exact. »',
      lsg: '« Ces Juifs avaient des sentiments plus nobles que ceux de Thessalonique ; ils reçurent la parole avec beaucoup d’empressement, et ils examinaient chaque jour les Écritures, pour voir si ce qu’on leur disait était exact. »',
    },
    note: 'Bérée se trouvait à quelque 70 km à l’ouest, à l’écart de la grande route. Beaucoup y crurent, dont des femmes grecques de haut rang, et des hommes (17:12). Mais des Juifs vinrent de Thessalonique agiter la foule, et les frères firent partir Paul vers la mer, tandis que Silas et Timothée restaient (17:13–14).',
  },
  {
    title: 'Athènes', ref: 'Actes 17:16',
    quote: {
      sg21: '« Pendant que Paul les attendait à Athènes, son esprit était profondément indigné à la vue de cette ville pleine d’idoles. »',
      bds: '« Pendant qu’il attendait ses compagnons à Athènes, Paul bouillait d’indignation en voyant combien cette ville était remplie d’idoles. »',
      neg1979: '« Comme Paul les attendait à Athènes, il sentait au-dedans de lui son esprit s’irriter, à la vue de cette ville pleine d’idoles. »',
      lsg: '« Comme Paul les attendait à Athènes, il sentait au dedans de lui son esprit s’irriter, à la vue de cette ville pleine d’idoles. »',
    },
    note: 'Ceux qui accompagnaient Paul le conduisirent jusqu’à Athènes (17:15), par mer, pense-t-on d’ordinaire ; l’itinéraire contourne l’Eubée jusqu’au Pirée, le port d’Athènes. Athènes n’était plus puissante, mais restait la ville des philosophes et de temples célèbres. Paul discutait à la synagogue, et chaque jour sur la place publique avec ceux qu’il y rencontrait (17:17).',
  },
  {
    title: 'À un dieu inconnu', ref: 'Actes 17:23',
    quote: {
      sg21: '« En effet, en parcourant votre ville et en examinant les objets de votre culte, j’ai même découvert un autel avec cette inscription : ‘A un dieu inconnu’ ! Celui que vous révérez sans le connaître, c’est celui que je vous annonce. »',
      bds: '« En effet, en parcourant les rues de votre ville et en examinant vos monuments sacrés, j’ai même découvert un autel qui porte cette inscription : A un dieu inconnu. Ce que vous révérez ainsi sans le connaître, je viens vous l’annoncer. »',
      neg1979: '« Car, en parcourant votre ville et en considérant les objets de votre dévotion, j’ai même découvert un autel avec cette inscription : A un dieu inconnu ! Ce que vous révérez sans le connaître, c’est ce que je vous annonce. »',
      lsg: '« Car, en parcourant votre ville et en considérant les objets de votre dévotion, j’ai même découvert un autel avec cette inscription : A un dieu inconnu ! Ce que vous révérez sans le connaître, c’est ce que je vous annonce. »',
    },
    note: 'Des philosophes épicuriens et stoïciens le conduisirent à l’Aréopage, le conseil qui siégeait sur la colline d’Arès, au pied de l’Acropole, pour entendre son enseignement nouveau (17:18–22). Il parla du Dieu qui a fait le monde et n’habite pas dans des temples faits de main d’homme, et de l’homme qu’il a ressuscité des morts (17:24–31). Quelques-uns crurent, dont Denys, membre du conseil, et une femme nommée Damaris (17:34).',
  },
  {
    title: 'Corinthe', ref: 'Actes 18:9–10',
    quote: {
      sg21: '« Le Seigneur dit à Paul dans une vision pendant la nuit : “N’aie pas peur, mais parle et ne te tais pas, car je suis moi-même avec toi et personne ne s’attaquera à toi pour te faire du mal. En effet, j’ai un peuple nombreux dans cette ville.” »',
      bds: '« Une nuit, le Seigneur lui-même parla à Paul dans une vision : N’aie pas peur, lui dit-il, parle et ne te tais pas, je suis avec toi. Personne ne pourra s’attaquer à toi pour te faire du mal, car il y a dans cette ville un peuple nombreux qui m’appartient. »',
      neg1979: '« Le Seigneur dit à Paul en vision pendant la nuit : Ne crains point ; mais parle, et ne te tais point, car je suis avec toi, et personne ne mettra la main sur toi pour te faire du mal ; parle, car j’ai un peuple nombreux dans cette ville. »',
      lsg: '« Le Seigneur dit à Paul en vision pendant la nuit : Ne crains point ; mais parle, et ne te tais point, Car je suis avec toi, et personne ne mettra la main sur toi pour te faire du mal : parle, car j’ai un peuple nombreux dans cette ville. »',
    },
    note: 'Corinthe, capitale de l’Achaïe, était une ville romaine active sur l’isthme entre deux mers. Paul logea chez Aquilas et Priscille, des Juifs chassés de Rome, et travailla avec eux à faire des tentes (18:1–3) ; il vint, écrira-t-il, dans la faiblesse et la crainte (1 Corinthiens 2:3). Il y resta un an et demi (18:11). Une inscription date le proconsulat de Gallion (18:12) vers 51–52 apr. J.-C., l’une des dates les plus sûres de la vie de Paul.',
  },
  {
    title: 'Cenchrées', ref: 'Actes 18:18',
    quote: {
      sg21: '« Paul resta encore assez longtemps à Corinthe. Ensuite il prit congé des frères et sœurs et embarqua pour la Syrie avec Priscille et Aquilas. Il s’était fait raser la tête à Cenchrées, car il avait fait un vœu. »',
      bds: '« Après cet incident, Paul resta à Corinthe le temps qui lui parut nécessaire, puis il prit congé des frères et s’embarqua pour la Syrie, emmenant avec lui Priscille et Aquilas. Avant de quitter le port de Cenchrées, Paul se fit raser la tête car il avait fait un vœu. »',
      neg1979: '« Paul resta encore assez longtemps à Corinthe. Ensuite il prit congé des frères, et s’embarqua pour la Syrie, avec Priscille et Aquilas, après s’être fait raser la tête à Cenchrées, car il avait fait un vœu. »',
      lsg: '« Paul resta encore assez longtemps à Corinthe. Ensuite il prit congé des frères, et s’embarqua pour la Syrie, avec Priscille et Aquilas, après s’être fait raser la tête à Cenchrées, car il avait fait un voeu. »',
    },
    note: 'Le port oriental de Corinthe se trouvait sur le golfe Saronique, face à l’Asie. Les Actes ne disent pas quel était le vœu de Paul ; se faire couper les cheveux en marquait la fin, ou le début. Il y eut plus tard une Église ici, au service de laquelle était Phœbé (Romains 16:1).',
  },
  {
    title: { lsg: 'Éphèse', default: 'Ephèse' }, ref: 'Actes 18:21',
    quote: {
      sg21: '« …et prit congé d’eux en disant : “[Il faut absolument que je célèbre la fête prochaine à Jérusalem.] Je reviendrai vers vous, si Dieu le veut.” Et il partit d’Ephèse en bateau. »',
      bds: '« En les quittant il leur dit toutefois : Je reviendrai vous voir une autre fois, s’il plaît à Dieu. Il repartit donc d’Ephèse par mer. »',
      neg1979: '« Mais il n’y consentit point, et il prit congé d’eux, en disant : [Il faut absolument que je célèbre la fête prochaine à Jérusalem.] Je reviendrai vers vous, si Dieu le veut. Et il partit d’Ephèse. »',
      lsg: '« Mais il n’y consentit point, et il prit congé d’eux, en disant : Il faut absolument que je célèbre la fête prochaine à Jérusalem. Je reviendrai vers vous, si Dieu le veut. Et il partit d’Éphèse. »',
    },
    note: 'Au retour, le navire fit escale à Éphèse, la principale ville d’Asie, où ils avaient d’abord été empêchés de prêcher. Paul parla dans la synagogue, et on lui demanda de rester plus longtemps, mais il refusa (18:19–20). Il y laissa Priscille et Aquilas, et revint lors de son troisième voyage (18:26 ; 19:1). La côte s’est ensablée depuis ; le port se trouvait alors au pied de la ville.',
  },
  {
    title: 'Retour à Antioche', ref: 'Actes 18:22',
    quote: {
      sg21: '« Il débarqua à Césarée et monta à Jérusalem pour saluer l’Eglise, puis il descendit à Antioche. »',
      bds: '« Il débarqua à Césarée et, de là, il monta à Jérusalem où il alla saluer l’Eglise. Puis il redescendit à Antioche. »',
      neg1979: '« Etant débarqué à Césarée, il monta à Jérusalem, et, après avoir salué l’Eglise, il descendit à Antioche. »',
      lsg: '« Étant débarqué à Césarée, il monta à Jérusalem, et, après avoir salué l’Église, il descendit à Antioche. »',
    },
    note: 'Césarée, la ville portuaire d’Hérode, était le port de Jérusalem. « Monter » s’entend d’ordinaire de la montée à Jérusalem, et certaines versions le disent en toutes lettres. Les Actes ne disent pas comment Paul continua jusqu’à Antioche ; l’itinéraire suit la route côtière vers le nord, par Ptolémaïs, Tyr et Sidon.',
  },
];
