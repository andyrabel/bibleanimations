// French text for this journey, merged over data.js (see addLanguage in ../../i18n.js).
// Same shape as data.js, text fields only; STOPS line up by position. Quotations are
// verbatim, in « … » with non-breaking spaces (U+00A0) inside the guillemets and before
// the high punctuation marks.

// Words that differ between versions: {term} in any text field.
export const TERMS = {
  cauda: { neg1979: 'Clauda', lsg: 'Clauda', default: 'Cauda' },
  centurion: { sg21: 'officier', bds: 'officier', default: 'centenier' },
};

export const PLACES = {
  caesarea: { name: 'Césarée' },
  sidon: { name: 'Sidon' },
  myra: { name: 'Myra' },
  cnidus: { name: 'Cnide' },
  fairHavens: { name: { lsg: 'Beaux Ports', default: 'Beaux-Ports' } },
  malta: { name: 'Malte' },
  syracuse: { name: 'Syracuse' },
  rhegium: { name: 'Reggio' },
  puteoli: { name: 'Pouzzoles' },
  forum: { name: 'Forum d’Appius' },
  taverns: { name: { lsg: 'Trois Tavernes', default: 'Trois-Tavernes' } },
  rome: { name: 'Rome' },
};

export const FEATURES = {
  lasea: { name: 'Lasée' },
  phoenix: { name: 'Phénix' },
  salmone: { name: 'Salmone' },
  cauda: { name: '{Cauda}' },
  cyprus: { name: 'Chypre' },
  cilicia: { name: 'Cilicie' },
  pamphylia: { name: 'Pamphylie' },
  lycia: { name: 'Lycie' },
  crete: { name: 'Crète' },
  achaia: { name: 'Achaïe' },
  sicily: { name: 'Sicile' },
  italy: { name: 'Italie' },
  phoenicia: { name: 'Phénicie' },
  adria: { name: 'Adriatique' },
  syrtis: { name: 'Syrte' },
  sea: { name: 'Mer Méditerranée' },
};

export const INTRO = {
  title: 'Témoigner aussi à Rome',
  ref: 'Actes 23:11',
  quote: {
    sg21: '« La nuit suivante, le Seigneur apparut à Paul et dit : “Prends courage, [Paul] : de même que tu as rendu témoignage de ce qui me concerne à Jérusalem, il faut aussi que tu rendes témoignage à Rome.” »',
    bds: '« La nuit suivante, le Seigneur apparut à Paul et lui dit : Courage ! Tu as été mon témoin à Jérusalem, il faut que tu le sois aussi à Rome. »',
    neg1979: '« La nuit suivante, le Seigneur apparut à Paul, et dit : Prends courage ; car, de même que tu as rendu témoignage de moi dans Jérusalem, il faut aussi que tu rendes témoignage dans Rome. »',
    lsg: '« La nuit suivante, le Seigneur apparut à Paul, et dit : Prends courage ; car, de même que tu as rendu témoignage de moi dans Jérusalem, il faut aussi que tu rendes témoignage dans Rome. »',
  },
  note: 'Paul avait été arrêté dans le temple de Jérusalem (21:27–36). Le Seigneur lui parla dans la forteresse la nuit après sa comparution devant le sanhédrin. Il fut conduit à Césarée, gardé là deux ans sous les gouverneurs Félix et Festus, et, en citoyen romain, en appela à César (24:27 ; 25:11–12). Il alla donc à Rome comme prisonnier, vers 59–60 apr. J.-C. Luc l’accompagnait, et son récit du voyage est l’un des plus précis que nous ayons sur la navigation antique.',
  aside: 'Le relief est réel, d’après des données d’altitude modernes, avec les hauteurs triplées pour que les montagnes se voient ; le littoral est celui d’aujourd’hui. Luc, qui naviguait avec Paul, donne les ports et les îles, mais pas les routes entre eux : les trajets par mer prennent le plus court en eau libre le long des lieux qu’il nomme, et la dérive de Cauda à Malte est dessinée en ligne droite. Les villes et le navire sont dessinés bien plus grands que nature. Aucun personnage n’est montré.',
};

export const FINALE = {
  title: 'Sans obstacle',
  ref: 'Actes 28:31',
  quote: {
    sg21: '« Il prêchait le royaume de Dieu et enseignait ce qui concerne le Seigneur Jésus-Christ avec une pleine assurance et sans obstacle. »',
    bds: '« Il proclamait le royaume de Dieu et enseignait, avec une pleine assurance et sans aucun empêchement, ce qui concerne le Seigneur Jésus-Christ. »',
    neg1979: '« …prêchant le royaume de Dieu et enseignant ce qui concerne le Seigneur Jésus-Christ, en toute liberté et sans obstacle. »',
    lsg: '« …prêchant le royaume de Dieu et enseignant ce qui concerne le Seigneur Jésus Christ, en toute liberté et sans obstacle. »',
  },
  note: 'Les Actes s’achèvent sur Paul, deux années entières à Rome, dans un logement qu’il louait, recevant tous ceux qui venaient le voir (28:30). De là, pense-t-on souvent, il écrivit aux Philippiens que sa captivité avait servi aux progrès de l’Évangile, si bien que toute la garde prétorienne savait qu’il était en prison pour Christ (Philippiens 1:12–13). Le livre s’arrête là ; il ne dit pas comment se termina son procès.',
};

export const STOPS = [
  {
    title: 'Pour l’Italie', ref: 'Actes 27:1',
    quote: {
      sg21: '« Quand notre embarquement pour l’Italie a été décidé, on a confié Paul et quelques autres prisonniers à un dénommé Julius, officier de la cohorte impériale. »',
      bds: '« Quand il fut décidé que nous partirions en bateau pour l’Italie, on confia Paul et quelques autres prisonniers à la garde d’un officier du bataillon impérial, nommé Julius. »',
      neg1979: '« Lorsqu’il fut décidé que nous nous embarquerions pour l’Italie, on remit Paul et quelques autres prisonniers à un centenier de la cohorte Auguste, nommé Julius. »',
      lsg: '« Lorsqu’il fut décidé que nous nous embarquerions pour l’Italie, on remit Paul et quelques autres prisonniers à un centenier de la cohorte Auguste, nommé Julius. »',
    },
    note: 'Le récit dit de nouveau « nous » : Luc navigua avec Paul, et aussi Aristarque de Thessalonique (27:2). Ils montèrent sur un navire d’Adramytte, un port près de Troas, qui devait longer les côtes d’Asie. Césarée, la ville portuaire d’Hérode, était le siège du gouverneur romain de Judée.',
  },
  {
    title: 'Sidon', ref: 'Actes 27:3',
    quote: {
      sg21: '« Le jour suivant, nous avons abordé à Sidon ; Julius, qui traitait Paul avec bienveillance, lui a permis d’aller chez ses amis et de recevoir leurs soins. »',
      bds: '« Le lendemain, nous avons fait escale à Sidon. Julius, qui témoignait une grande bienveillance à Paul, lui a permis alors de se rendre chez ses amis pour recevoir leur aide. »',
      neg1979: '« Le jour suivant, nous abordâmes à Sidon ; et Julius, qui traitait Paul avec bienveillance, lui permit d’aller chez ses amis et de recevoir leurs soins. »',
      lsg: '« Le jour suivant, nous abordâmes à Sidon ; et Julius, qui traitait Paul avec bienveillance, lui permit d’aller chez ses amis et de recevoir leurs soins. »',
    },
    note: 'Sidon, à quelque 110 km plus au nord sur la côte, était un ancien port phénicien où il y avait des croyants, peut-être depuis la dispersion qui suivit la mort d’Étienne (11:19). Le {centurion} Julius, qui sauverait plus tard la vie de Paul (27:43), lui permit d’aller voir ses amis.',
  },
  {
    title: 'À l’abri de Chypre', ref: 'Actes 27:4',
    quote: {
      sg21: '« Partis de là, nous avons longé l’île de Chypre, parce que les vents étaient contraires. »',
      bds: '« Une fois repartis de là, nous avons longé la côte de Chypre pour nous protéger des vents contraires. »',
      neg1979: '« Partis de là, nous longeâmes l’île de Chypre, parce que les vents étaient contraires. »',
      lsg: '« Partis de là, nous longeâmes l’île de Chypre, parce que les vents étaient contraires. »',
    },
    note: 'Les vents d’été soufflent de l’ouest et du nord-ouest. Le navire passa donc à l’est et au nord de Chypre, à l’abri de l’île, puis remonta vers l’ouest le long des côtes de Cilicie et de Pamphylie, aidé par les brises de terre et les courants (27:5). L’itinéraire dessiné est une supposition de ce genre.',
  },
  {
    title: 'Un navire d’Alexandrie', ref: 'Actes 27:6',
    quote: {
      sg21: '« Là, ayant trouvé un bateau d’Alexandrie qui allait en Italie, l’officier nous y a fait monter. »',
      bds: '« Là, l’officier a trouvé un bateau d’Alexandrie qui était sur le point de partir pour l’Italie et il nous a fait monter à son bord. »',
      neg1979: '« Et là, le centenier, ayant trouvé un navire d’Alexandrie qui allait en Italie, nous y fit monter. »',
      lsg: '« Et là, le centenier, ayant trouvé un navire d’Alexandrie qui allait en Italie, nous y fit monter. »',
    },
    note: 'Myra, en Lycie, était un port sur la route du blé d’Égypte à Rome ; à cause des vents d’ouest, les navires d’Alexandrie remontaient jusqu’à la côte d’Asie avant de virer à l’ouest. Celui-ci transportait du blé (27:38) et 276 personnes (27:37). Les navires de la flotte du blé étaient grands : l’un d’eux, décrit au IIᵉ siècle, mesurait quelque 55 m.',
  },
  {
    title: 'À la hauteur de Cnide', ref: 'Actes 27:7',
    quote: {
      sg21: '« Pendant plusieurs jours nous avons navigué lentement, et ce n’est pas sans difficulté que nous sommes parvenus à la hauteur de Cnide, où le vent ne nous a pas permis d’aborder. Nous avons alors doublé le cap Salmoné pour passer au sud de la Crète. »',
      bds: '« Pendant plusieurs jours, nous avons navigué lentement et c’est avec beaucoup de peine que nous sommes parvenus à la hauteur de Cnide. Mais le vent ne nous permettait plus d’avancer dans cette direction, et nous sommes passés au sud de la Crète, en doublant le cap Salmoné. »',
      neg1979: '« Pendant plusieurs jours nous naviguâmes lentement, et ce ne fut pas sans difficulté que nous atteignîmes la hauteur de Cnide, où le vent ne nous permit pas d’aborder. Nous passâmes au-dessous de l’île de Crète, du côté de Salmone. »',
      lsg: '« Pendant plusieurs jours nous naviguâmes lentement, et ce ne fut pas sans difficulté que nous atteignîmes la hauteur de Cnide, où le vent ne nous permit pas d’aborder. Nous passâmes au-dessous de l’île de Crète, du côté de Salmone. »',
    },
    note: 'Cnide se trouvait au bout d’une longue presqu’île, le dernier abri avant la mer Égée ouverte. Le vent contraire les empêchant de tenir leur route vers l’Italie, ils virèrent au sud, passèrent la pointe est de la Crète au cap Salmone et gagnèrent l’abri de sa côte sud.',
  },
  {
    title: { lsg: 'Beaux Ports', default: 'Beaux-Ports' }, ref: 'Actes 27:8',
    quote: {
      sg21: '« Nous avons longé l’île avec peine et sommes arrivés à un endroit appelé Beaux-Ports près de la ville de Lasée. »',
      bds: '« Nous avons eu du mal à longer la côte et nous sommes arrivés à un endroit appelé “Beaux-Ports”, près de la ville de Lasée. »',
      neg1979: '« Nous la côtoyâmes avec peine, et nous arrivâmes à un lieu nommé Beaux-Ports, près duquel était la ville de Lasée. »',
      lsg: '« Nous la côtoyâmes avec peine, et nous arrivâmes à un lieu nommé Beaux Ports, près duquel était la ville de Lasée. »',
    },
    note: 'Beaux-Ports s’appelle toujours Kaloi Limenes, une petite baie sur la côte sud de la Crète ; des ruines proches sont identifiées à Lasée. On avait perdu beaucoup de temps, et le Jeûne, le jour des expiations, fin septembre ou en octobre, était déjà passé (27:9). La navigation était dangereuse dès la mi-septembre et cessait tout à fait en hiver.',
  },
  {
    title: 'L’avertissement de Paul', ref: 'Actes 27:10',
    quote: {
      sg21: '« “Mes amis, je vois que la navigation ne se fera pas sans dommages et qu’il y aura beaucoup de pertes, non seulement pour la cargaison et pour le bateau, mais encore pour nous-mêmes.” »',
      bds: '« Mes amis, je considère que, si nous continuons notre voyage, non seulement la cargaison et le bateau subiront de grands dommages, mais nous-mêmes nous risquerons notre vie. »',
      neg1979: '« C’est pourquoi Paul avertit les autres, en disant : O hommes, je vois que la navigation ne se fera pas sans péril et sans beaucoup de dommage, non seulement pour la cargaison et pour le navire, mais encore pour nos personnes. »',
      lsg: '« C’est pourquoi Paul avertit les autres, en disant : O hommes, je vois que la navigation ne se fera pas sans péril et sans beaucoup de dommage, non seulement pour la cargaison et pour le navire, mais encore pour nos personnes. »',
    },
    note: 'Le {centurion} écouta le pilote et le propriétaire du navire plutôt que Paul. Beaux-Ports n’étant pas un bon port pour hiverner, la plupart furent d’avis de tenter d’atteindre Phénix, un port de Crète à quelque 65 km à l’ouest, tourné vers le sud-ouest et le nord-ouest, pour y passer l’hiver (27:11–12).',
  },
  {
    title: 'Euraquilon', ref: 'Actes 27:14',
    quote: {
      sg21: '« Mais bientôt un vent violent, qu’on appelle Euraquilon, s’est déchaîné. »',
      bds: '« Mais peu de temps après, un vent violent comme un typhon – connu sous le nom d’euraquilon – s’est mis à souffler des hauteurs de l’île. »',
      neg1979: '« Mais bientôt un vent impétueux, qu’on appelle Euraquilon, se déchaîna sur l’île. »',
      lsg: '« Mais bientôt un vent impétueux, qu’on appelle Euraquilon, se déchaîna sur l’île. »',
    },
    note: 'Un léger vent du sud les avait engagés à partir, en serrant la côte de près (27:13). Puis le vent descendit des montagnes de Crète, du nord-est. Le navire ne pouvait pas lui tenir tête, et ils se laissèrent emporter (27:15).',
  },
  {
    title: '{Cauda}', ref: 'Actes 27:16',
    quote: {
      sg21: '« Alors que nous passions au sud d’une petite île appelée Cauda, nous avons eu beaucoup de peine à nous rendre maîtres du canot de sauvetage. »',
      bds: '« Nous avons passé ainsi au sud d’une petite île appelée Cauda. Comme elle nous abritait un peu du vent, nous en avons profité pour nous rendre maîtres du canot de sauvetage. Nous sommes parvenus, à grand-peine… »',
      neg1979: '« Nous passâmes au-dessous d’une petite île nommée Clauda, et nous eûmes de la peine à nous rendre maîtres de la chaloupe… »',
      lsg: '« Nous passâmes au-dessous d’une petite île nommée Clauda, et nous eûmes de la peine à nous rendre maîtres de la chaloupe… »',
    },
    note: 'À l’abri de l’île, à quelque 40 km au sud-ouest, ils remontèrent la chaloupe et ceinturèrent la coque de câbles. Craignant d’échouer sur la Syrte, les bancs de sable au large de l’Afrique, ils abaissèrent les agrès et se laissèrent dériver (27:17). Les jours suivants, ils jetèrent la cargaison, puis les agrès du navire à la mer (27:18–19).',
  },
  {
    title: 'Tout espoir perdu', ref: 'Actes 27:20',
    quote: {
      sg21: '« Le soleil et les étoiles ne nous sont pas apparus pendant plusieurs jours et la tempête a été si forte que, finalement, nous avions perdu tout espoir d’être sauvés. »',
      bds: '« Pendant plusieurs jours, on ne voyait plus ni le soleil ni les étoiles. La tempête continuait de faire rage et nous finissions par perdre tout espoir d’en sortir sains et saufs. »',
      neg1979: '« Le soleil et les étoiles ne parurent pas pendant plusieurs jours, et la tempête était si forte que nous perdîmes enfin toute espérance de nous sauver. »',
      lsg: '« Le soleil et les étoiles ne parurent pas pendant plusieurs jours, et la tempête était si forte que nous perdîmes enfin toute espérance de nous sauver. »',
    },
    note: 'Sans soleil ni étoiles, un navire ne pouvait pas faire le point. La dérive de Cauda à Malte est de quelque 870 km ; à la vitesse que les marins d’aujourd’hui comptent pour un navire à la cape dans la tempête, il faut environ treize jours, ce qui concorde avec les quatorze nuits de 27:27. L’itinéraire est dessiné comme une dérive en ligne droite.',
  },
  {
    title: 'Ne crains pas, Paul', ref: 'Actes 27:23–24',
    quote: {
      sg21: '« En effet, un ange du Dieu auquel j’appartiens et que je sers m’est apparu cette nuit et m’a dit : ‘Paul, n’aie pas peur ! Il faut que tu comparaisses devant l’empereur, et voici que Dieu t’accorde la vie de tous ceux qui naviguent avec toi.’ »',
      bds: '« En effet, cette nuit, un ange du Dieu à qui j’appartiens et que je sers, s’est présenté devant moi et m’a dit : “Paul, ne crains rien ! Il faut que tu comparaisses devant l’empereur, et Dieu t’accorde la vie sauve pour tous tes compagnons de voyage.” »',
      neg1979: '« Un ange du Dieu à qui j’appartiens et que je sers m’est apparu cette nuit, et m’a dit : Paul, ne crains point ; il faut que tu comparaisses devant César, et voici, Dieu t’a donné tous ceux qui naviguent avec toi. »',
      lsg: '« Un ange du Dieu à qui j’appartiens et que je sers m’est apparu cette nuit, et m’a dit : Paul, ne crains point ; il faut que tu comparaisses devant César, et voici, Dieu t’a donné tous ceux qui naviguent avec toi. »',
    },
    note: 'Après être restés longtemps sans manger, Paul se leva au milieu d’eux. Il leur rappela qu’ils auraient dû l’écouter en Crète, mais les invita à prendre courage : personne ne perdrait la vie, seul le navire serait perdu, et ils devaient échouer sur une île (27:21–26).',
  },
  {
    title: 'La quatorzième nuit', ref: 'Actes 27:27',
    quote: {
      sg21: '« La quatorzième nuit, vers le milieu de la nuit, alors que nous étions ballottés sur l’Adriatique, les marins ont supposé que l’on approchait d’une terre. »',
      bds: '« C’était la quatorzième nuit que nous étions ainsi ballottés sur l’Adriatique quand, vers le milieu de la nuit, les marins ont eu l’impression qu’on approchait d’une terre. »',
      neg1979: '« La quatorzième nuit, tandis que nous étions ballottés sur l’Adriatique, les matelots, vers le milieu de la nuit, soupçonnèrent qu’on approchait de quelque terre. »',
      lsg: '« La quatorzième nuit, tandis que nous étions ballottés sur l’Adriatique, les matelots, vers le milieu de la nuit, soupçonnèrent qu’on approchait de quelque terre. »',
    },
    note: 'L’Adriatique, ou Adria, désignait alors toute la mer entre la Grèce, l’Italie et l’Afrique. En sondant, les matelots trouvèrent vingt brasses, puis quinze ; ils jetèrent quatre ancres de la poupe et attendirent le jour avec impatience (27:28–29). Paul encouragea tous à manger, rendit grâces pour le pain devant tous et le rompit ; puis on allégea le navire en jetant le blé à la mer (27:33–38).',
  },
  {
    title: 'Le naufrage', ref: 'Actes 27:44',
    quote: {
      sg21: '« …et aux autres de s’agripper à des planches ou à des débris du bateau. C’est ainsi que tous sont parvenus sains et saufs à terre. »',
      bds: '« Les autres suivraient en s’agrippant à des planches ou à des épaves du bateau. C’est ainsi que tous sont arrivés sains et saufs sur le rivage. »',
      neg1979: '« …et aux autres de se mettre sur des planches ou sur des débris du navire. Et ainsi tous parvinrent à terre sains et saufs. »',
      lsg: '« …et aux autres de se mettre sur des planches ou sur des débris du navire. Et ainsi tous parvinrent à terre sains et saufs. »',
    },
    note: 'Au lever du jour, ils virent une baie avec une plage et tentèrent d’y faire échouer le navire, mais il heurta un endroit où deux courants se rencontraient, un récif ou un banc de sable, et s’y enfonça ; la poupe se brisait sous la violence des vagues (27:39–41). Les soldats voulaient tuer les prisonniers, mais le {centurion}, voulant sauver Paul, les en empêcha (27:42–43). La baie Saint-Paul, au nord de Malte, est le lieu traditionnel.',
  },
  {
    title: 'Malte', ref: 'Actes 28:2',
    quote: {
      sg21: '« Ses habitants nous ont témoigné une bienveillance peu courante ; ils nous ont tous accueillis près d’un grand feu qu’ils avaient allumé, car la pluie tombait et il faisait très froid. »',
      bds: '« Les habitants, qui ne parlaient pas le grec, nous ont témoigné une bienveillance peu ordinaire. Ils ont allumé un grand feu et nous ont tous accueillis à sa chaleur, car il s’était mis à pleuvoir et il faisait froid. »',
      neg1979: '« Les barbares nous témoignèrent une bienveillance peu commune ; ils nous recueillirent tous auprès d’un grand feu, qu’ils avaient allumé parce que la pluie tombait et qu’il faisait très froid. »',
      lsg: '« Les barbares nous témoignèrent une bienveillance peu commune ; ils nous recueillirent tous auprès d’un grand feu, qu’ils avaient allumé parce que la pluie tombait et qu’il faisait grand froid. »',
    },
    note: 'Une vipère s’attacha à la main de Paul alors qu’il mettait du bois sur le feu ; il la secoua sans en souffrir aucun mal, et les habitants dirent qu’il était un dieu (28:3–6). Publius, le premier personnage de l’île, les reçut trois jours. Paul guérit son père, puis les autres malades de l’île vinrent et furent guéris (28:7–9). Ils restèrent trois mois, tout l’hiver.',
  },
  {
    title: 'Syracuse', ref: 'Actes 28:11',
    quote: {
      sg21: '« Après un séjour de 3 mois, nous avons embarqué sur un bateau d’Alexandrie qui avait passé l’hiver dans l’île et qui portait pour enseigne les Dioscures. »',
      bds: '« C’est seulement trois mois plus tard que nous sommes repartis à bord d’un bateau d’Alexandrie, à l’emblème de Castor et Pollux, qui avait passé l’hiver dans un port de l’île. »',
      neg1979: '« Après un séjour de trois mois, nous nous embarquâmes sur un navire d’Alexandrie, qui avait passé l’hiver dans l’île, et qui portait pour enseigne les Dioscures. »',
      lsg: '« Après un séjour de trois mois, nous nous embarquâmes sur un navire d’Alexandrie, qui avait passé l’hiver dans l’île, et qui portait pour enseigne les Dioscures. »',
    },
    note: 'Les Dioscures sont Castor et Pollux, fils de Zeus et protecteurs des marins, sculptés ou peints à la proue. Ils reprirent la mer à la réouverture de la navigation au printemps, quelque 150 km jusqu’à Syracuse, la principale ville de Sicile, et y restèrent trois jours (28:12).',
  },
  {
    title: 'Reggio et Pouzzoles', ref: 'Actes 28:13',
    quote: {
      sg21: '« De là, en suivant la côte, nous avons atteint Reggio. Le lendemain, le vent du sud s’est levé et en 2 jours nous avons fait le trajet jusqu’à Pouzzoles. »',
      bds: '« De là, nous avons longé la côte jusqu’à Reggio. Le lendemain, le vent du sud s’est levé et, en deux jours, nous avons gagné Pouzzoles. »',
      neg1979: '« De là, en suivant la côte, nous atteignîmes Reggio ; et, le vent du midi s’étant levé le lendemain, nous fîmes en deux jours le trajet jusqu’à Pouzzoles… »',
      lsg: '« De là, en suivant la côte, nous atteignîmes Reggio ; et, le vent du midi s’étant levé le lendemain, nous fîmes en deux jours le trajet jusqu’à Pouzzoles… »',
    },
    note: 'Reggio, à la pointe de l’Italie, gardait le détroit de Messine. Poussés par le vent du sud, ils parcoururent en deux jours les 350 km jusqu’à Pouzzoles, dans la baie de Naples. Pouzzoles était le grand port où les navires du blé d’Alexandrie déchargeaient pour Rome. Ils y trouvèrent des frères et restèrent sept jours (28:14).',
  },
  {
    title: 'Le Forum d’Appius', ref: 'Actes 28:15',
    quote: {
      sg21: '« Les frères de Rome, qui avaient reçu de nos nouvelles, sont venus à notre rencontre jusqu’au Forum d’Appius et aux Trois-Tavernes. En les voyant, Paul a remercié Dieu et pris courage. »',
      bds: '« Les frères de cette ville, qui avaient eu de nos nouvelles, sont venus à notre rencontre jusqu’au Forum d’Appius et aux Trois-Tavernes. Quand Paul les a vus, il a remercié Dieu et a pris courage. »',
      neg1979: '« De Rome vinrent à notre rencontre, jusqu’au Forum d’Appius et aux Trois-Tavernes, les frères qui avaient entendu parler de nous. Paul, en les voyant, rendit grâces à Dieu, et prit courage. »',
      lsg: '« De Rome vinrent à notre rencontre, jusqu’au Forum d’Appius et aux Trois Tavernes, les frères qui avaient entendu parler de nous. Paul, en les voyant, rendit grâces à Dieu, et prit courage. »',
    },
    note: 'De Pouzzoles, ils continuèrent à pied par la voie Appienne, la plus ancienne des grandes voies romaines. Le Forum d’Appius, un bourg de marché à quelque 70 km de Rome, et les Trois-Tavernes, à environ 50 km, sont les lieux où deux groupes de frères vinrent à leur rencontre. Paul avait écrit à l’Église de Rome trois ans plus tôt, désirant la voir (Romains 1:11 ; 15:23).',
  },
  {
    title: 'Rome', ref: 'Actes 28:16',
    quote: {
      sg21: '« A notre arrivée à Rome, [l’officier a remis les prisonniers au chef de la garde, mais] on a permis à Paul d’habiter dans un logement particulier avec le soldat qui le gardait. »',
      bds: '« Après notre arrivée à Rome, Paul fut autorisé à loger dans un appartement personnel, sous la garde d’un soldat. »',
      neg1979: '« Lorsque nous fûmes arrivés à Rome, on permit à Paul de demeurer dans un domicile particulier, avec un soldat qui le gardait. »',
      lsg: '« Lorsque nous fûmes arrivés à Rome, on permit à Paul de demeurer en son particulier, avec un soldat qui le gardait. »',
    },
    note: 'Rome comptait peut-être un million d’habitants, de loin la plus grande ville de l’empire. Paul était sous garde, mais dans son propre logement. Trois jours après, il convoqua les principaux des Juifs et leur expliqua pourquoi il était venu : c’était à cause de l’espérance d’Israël qu’il portait cette chaîne (28:17–20). Les uns crurent, les autres non (28:24).',
  },
];
