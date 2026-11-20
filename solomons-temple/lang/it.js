// Italian text for "Solomon's Temple", merged over data.js (see addLanguage in
// ../../i18n.js). Same shape as data.js, text fields only. One version, the Nuova
// Riveduta 2006 (nr2006), so every field is a plain string. STOPS line up with
// data.js by position.
//
// Quotations are verbatim, in «…». The NR2006 keeps the cubits. Its words: the
// house is the "casa", the main room the "luogo santo" (6:3, 5) or "tempio"
// (6:17), the inner sanctuary the "santuario", the porch the "portico", the side
// chambers "camere laterali", cypress "cipresso", olive wood "legno d’olivo",
// palm trees "palme", the Sea the "Mare di metallo fuso" on twelve "buoi", the
// stands "basi" with their "conche". The bronze worker and the king of Tyre are
// both Chiram; the south pillar is Iachim in 1 Re 7:21 (Iachin in 2 Cr 3:17).

export const TERMS = {
  house: 'casa',
  porch: 'portico',
  mainRoom: 'luogo santo',
  inner: 'santuario',
  cypress: 'cipresso',
  olive: 'legno d’olivo',
  bronze: 'bronzo',
  court: 'cortile',
  hiram: 'Chiram',
  jachin: 'Iachim',
  oxen: 'buoi',
  stands: 'basi',
  basins: 'conche',
  basin: 'conca',
  capitals: 'capitelli',
  lampstands: 'candelabri',
  veil: 'cortina',
  blue: 'violaceo',
  ziv: 'Ziv',
};

export const MATERIALS = {
  stone: 'Pietra',
  cedar: 'Cedro',
  cypress: 'Cipresso',
  olive: 'Olivo',
  gold: 'Oro',
  bronze: 'Bronzo',
};

export const FEATURES = {
  mainRoom: { name: 'Luogo santo' },
  mostHoly: { name: 'Luogo santissimo' },
  porch: { name: 'Portico' },
  chambers: { name: 'Camere laterali' },
  stair: { name: 'Scala a chiocciola' },
  incense: { name: 'Altare d’oro' },
  cherubim: { name: 'Cherubini' },
  innerDoors: { name: 'Porta del santuario' },
  veil: { name: 'Cortina' },
  doors: { name: 'Porta del tempio' },
  lampstands: { name: 'Candelabri' },
  tables: { name: 'Tavole' },
  jachin: { name: 'Iachim' },
  boaz: { name: 'Boaz' },
  sea: { name: 'Il Mare' },
  standsS: { name: 'Basi' },
  standsN: { name: 'Basi' },
  altar: { name: 'Altare di bronzo' },
  innerCourt: { name: 'Cortile interno' },
  greatCourt: { name: 'Gran cortile' },
  cityOfDavid: { name: 'Città di Davide' },
  kidron: { name: 'Torrente Chidron' },
  olives: { name: 'Monte degli Ulivi' },
};

export const INTRO = {
  title: 'Gerusalemme, il monte Moria',
  ref: '1 Re 6:1',
  quote: '«Il quattrocentottantesimo anno dopo l’uscita dei figli d’Israele dal paese d’Egitto, nel quarto anno del suo regno sopra Israele, nel mese di Ziv, che è il secondo mese, Salomone cominciò a costruire la casa per il Signore.»',
  note: 'Davide voleva costruire una casa per il Signore, ma Dio gli disse che l’avrebbe costruita suo figlio (2 Samuele 7:12–13; 1 Re 5:3–5). Salomone si accordò con Chiram, re di Tiro, per avere cedro e cipresso del Libano, e i suoi uomini estrassero grandi pietre per le fondamenta (5:6–18). Questa visita segue 1 Re 6–7, con ciò che aggiunge 2 Cronache 3–4, e ogni parte si innalza quando ci arriviamo.',
  aside: 'Tutto è disegnato con le misure del testo, in cubiti. 2 Cronache 3:3 dice che erano “cubiti dell’antica misura”; qui 1 cubito ≈ 45 cm. Dove il testo non dà né misura né posizione, come lo spessore dei muri o i cortili, il modello è un’ipotesi, e le note lo dicono. Le poche persone servono solo a dare la scala.',
};

export const FINALE = {
  title: 'La parola del Signore a Salomone',
  ref: '1 Re 6:13',
  quote: '«…abiterò in mezzo ai figli d’Israele e non abbandonerò il mio popolo Israele.»',
  note: 'La parola giunse mentre la casa veniva costruita, e giunse con una condizione: se Salomone avesse camminato secondo le leggi di Dio, Dio avrebbe confermato la promessa fatta a Davide (6:11–12). Quando la casa fu dedicata, la nuvola la riempì, e i sacerdoti non poterono rimanervi per il loro servizio (8:10–11). Circa quattro secoli dopo, i Babilonesi la incendiarono (2 Re 25:9).',
};

export const STOPS = [
  {
    title: 'Il monte Moria',
    ref: '2 Cronache 3:1',
    quote: '«Salomone cominciò a costruire la casa del Signore a Gerusalemme sul monte Moria, dove il Signore era apparso a Davide suo padre, nel luogo che Davide aveva preparato, nell’aia di Ornan, il Gebuseo.»',
    note: 'Davide comprò quest’aia sul monte a nord della sua città e vi costruì un altare quando il flagello si fermò (2 Samuele 24:18–25; 1 Cronache 21:18–22:1); 2 Samuele chiama Ornan Arauna. Le fondamenta furono gettate nel mese di Ziv, nel quarto anno di Salomone (6:37), secondo il calcolo più comune verso il 966 a.C. Le grandi pietre erano state tagliate e preparate dagli operai di Salomone e di Chiram e dai Ghiblei (5:17–18).',
    size: 'La casa: 60 × 20 cubiti all’interno (27 × 9 m)',
  },
  {
    title: 'La casa si innalza',
    ref: '1 Re 6:7',
    quote: '«Per la costruzione della casa si servirono di pietre già preparate nella cava; così nella casa, durante la sua costruzione, non si udì mai rumore di martello, d’ascia o d’altro strumento di ferro.»',
    note: 'Sessanta cubiti di lunghezza, venti di larghezza e trenta di altezza (6:2): il doppio della tenda del tabernacolo in lunghezza e larghezza, e il triplo in altezza. Lo spessore dei muri non è indicato; sono disegnati di sei cubiti alla base, come quelli del tempio di Ezechiele (Ezechiele 41:5), e si assottigliano di un cubito al secondo e al terzo piano delle camere laterali (vedi la tappa 5).',
    size: '60 × 20 × 30 cubiti all’interno (27 × 9 × 13,5 m)',
  },
  {
    title: 'Il portico',
    ref: '1 Re 6:3',
    quote: '«Il portico sul davanti del luogo santo della casa si estendeva per venti cubiti, rispondenti alla larghezza della casa, ed era profondo dieci cubiti sul davanti della casa.»',
    note: 'Il libro dei Re non ne dà l’altezza. In 2 Cronache 3:4 il testo ebraico, che la NR2006 segue, dice centoventi cubiti, e alcune traduzioni antiche venti; una torre quattro volte più alta della casa sembra poco probabile, perciò è disegnato di venti. All’interno era ricoperto d’oro finissimo (2 Cronache 3:4). Non si dice se il davanti fosse aperto; è disegnato aperto.',
    size: '20 × 10 cubiti (9 × 4,5 m)',
  },
  {
    title: 'Le finestre',
    ref: '1 Re 6:4',
    quote: '«Il re fece alla casa delle finestre a reticolato fisso.»',
    note: 'Le parole ebraiche sono incerte: telai che si restringono verso l’interno, o finestre chiuse da grate. Potevano stare solo in alto sui muri, sopra le camere laterali. Il numero non è dato; ce ne sono cinque per lato, tutte nel luogo santo. Nel santuario non sono menzionate, e Salomone avrebbe detto che il Signore abitava “nell’oscurità” (8:12).',
    size: 'Numero e misura non indicati',
  },
  {
    title: 'Le camere laterali',
    ref: '1 Re 6:6',
    quote: '«Il piano inferiore era largo cinque cubiti; quello di mezzo sei cubiti, e il terzo sette cubiti; perché egli aveva fatto delle sporgenze intorno ai muri esterni della casa, affinché le travi non fossero incastrate nei muri della casa.»',
    note: 'Tre piani di camere circondano i lati e il fondo della casa (6:5), ognuno alto cinque cubiti, collegati a essa con travi di cedro (6:10). Il muro si assottiglia di un cubito a ogni piano, così ogni piano è largo un cubito più di quello sotto, e le sue travi poggiano sulla sporgenza. Il numero delle camere e lo spessore del muro esterno non sono indicati; il tempio di Ezechiele aveva trenta camere per piano (Ezechiele 41:6).',
    size: 'Piani larghi 5, 6 e 7 cubiti, alti 5 ciascuno',
  },
  {
    title: 'La scala a chiocciola',
    ref: '1 Re 6:8',
    quote: '«L’ingresso del piano di mezzo si trovava sul lato destro della casa; per una scala a chiocciola si saliva al piano di mezzo, e dal piano di mezzo al terzo.»',
    note: 'Il lato destro è il sud, guardando a oriente dalla casa. Il testo ebraico dice che la porta dava sul piano di mezzo, il greco su quello inferiore. La parola per la scala è rara e può indicare una scala a chiocciola o botole con scale a pioli; non si dice dove fosse. È disegnata come scala a chiocciola accanto alla porta, con il muro esterno tagliato.',
  },
  {
    title: 'Il tetto di cedro',
    ref: '1 Re 6:9',
    quote: '«Dopo aver finito di costruire la casa, Salomone la coprì di travi e di assi di legno di cedro.»',
    note: 'Gli uomini di Chiram e di Salomone tagliarono il cedro nel Libano, lo portarono al mare e lo spedirono legato come zattere lungo la costa (5:6–9). Le travi coprono i venti cubiti del luogo santo. Il tetto è disegnato piano; non si parla di un parapetto. Il portico e le camere laterali hanno i loro tetti.',
  },
  {
    title: 'Cedro all’interno',
    ref: '1 Re 6:18',
    quote: '«Il legno di cedro, nell’interno della casa, presentava delle sculture di frutti di colloquintide e di fiori sbocciati; tutto era di cedro, non si vedeva neppure una pietra.»',
    note: 'Tavole di cedro rivestono le pareti dal pavimento fino al tetto, e il pavimento è di tavole di cipresso (6:15). Qui, e nelle tappe che guardano dentro, la parete sud è tagliata.',
  },
  {
    title: 'Il santuario',
    ref: '1 Re 6:16',
    quote: '«Rivestì di tavole di cedro uno spazio di venti cubiti in fondo alla casa, dal pavimento al soffitto; e riservò quello spazio interno per farne un santuario, il luogo santissimo.»',
    note: 'Un cubo di venti cubiti di lato (6:20), preparato per l’arca del patto (6:19). La casa è alta trenta cubiti, quindi o il pavimento era più alto o il soffitto più basso; è disegnato con il soffitto più basso. 2 Cronache 3:9 parla di camere superiori rivestite d’oro, che possono essere lo spazio di sopra. Il luogo santo, davanti, è lungo quaranta cubiti (6:17).',
    size: '20 × 20 × 20 cubiti (9 m di lato)',
  },
  {
    title: 'Ricoperta d’oro',
    ref: '1 Re 6:21',
    quote: '«Salomone ricoprì d’oro finissimo l’interno della casa e fece passare un velo, sospeso da catenelle d’oro, davanti al santuario, che ricoprì d’oro.»',
    note: 'Tutta la casa è ricoperta d’oro, e anche l’altare di cedro che apparteneva al santuario (6:20–22), l’altare dei profumi che sta davanti (7:48). 2 Cronache 3:6–8 aggiunge pietre preziose, oro di Parvaim e seicento talenti d’oro per il luogo santissimo. L’ebraico parla di catenelle d’oro fatte passare davanti al santuario; non si dice come pendessero, e sono disegnate lungo il davanti della parete.',
    size: 'Altare dei profumi: misura non indicata',
  },
  {
    title: 'I cherubini',
    ref: '1 Re 6:27',
    quote: '«Salomone pose i cherubini in mezzo alla casa, nell’interno. I cherubini avevano le ali spiegate, in modo che l’ala del primo toccava una delle pareti e l’ala del secondo toccava l’altra parete; le altre ali si toccavano l’una con l’altra con le punte, in mezzo alla casa.»',
    note: 'Due cherubini di legno d’olivo, alti dieci cubiti ciascuno, con ali di cinque cubiti, delle stesse dimensioni e della stessa forma (6:23–26), ricoperti d’oro (6:28). Stavano in piedi, con le facce rivolte verso la sala (2 Cronache 3:13). Il loro aspetto non è descritto, perciò sono disegnati come semplici figure alate in piedi. Alla dedicazione l’arca fu posta sotto le loro ali (8:6–7).',
    size: 'Alti 10 cubiti ciascuno, 10 da una punta d’ala all’altra (4,5 m)',
  },
  {
    title: 'Cherubini, palme e fiori',
    ref: '1 Re 6:29',
    quote: '«Fece ornare tutte le pareti della casa, tutto intorno, tanto all’interno quanto all’esterno, di sculture di cherubini, di palme e di fiori sbocciati.»',
    note: 'Anche il pavimento è ricoperto d’oro (6:30), e 2 Cronache 3:5–7 aggiunge palme e catenelle sull’oro della casa maggiore, e oro sulle travi, sugli stipiti, sulle pareti e sulle porte. Non si descrive come fossero disposte le sculture; sono disegnate a fasce, una palma fra cherubino e cherubino, come nel tempio di Ezechiele (Ezechiele 41:18).',
  },
  {
    title: 'Battenti di legno d’olivo',
    ref: '1 Re 6:32',
    quote: '«I due battenti erano di legno d’olivo. Egli vi fece scolpire dei cherubini, delle palme e dei fiori sbocciati, e li ricoprì d’oro, stendendo l’oro sui cherubini e sulle palme.»',
    note: 'L’inquadratura della porta del santuario, con gli stipiti, “occupava la quinta parte della parete” (6:31); l’ebraico è oscuro, e potrebbe anche indicare un telaio a cinque lati. L’ingresso è disegnato largo quattro cubiti e appuntito in cima. I battenti giravano su cardini d’oro (7:50). 2 Cronache 3:14 parla anche di una cortina di filo violaceo, porporino, scarlatto e di bisso, con cherubini; Re parla solo dei battenti. Sono disegnati entrambi: i battenti aperti e la cortina dietro.',
    size: 'Larghezza dell’ingresso: un quinto della parete?',
  },
  {
    title: 'La porta del tempio',
    ref: '1 Re 6:33–34',
    quote: '«Fece pure, per la porta del tempio, degli stipiti di legno d’olivo, che occupavano un quarto della larghezza del muro, e due battenti di legno di cipresso; ciascun battente si componeva di due pezzi mobili.»',
    note: 'Scolpiti con cherubini, palme e fiori sbocciati, e ricoperti d’oro steso sulle sculture (6:35). L’ingresso è disegnato largo cinque cubiti, un quarto del muro; l’altezza non è data. Ogni battente si piega in due, così l’ingresso può aprirsi in parte o del tutto.',
  },
  {
    title: 'Il cortile interno',
    ref: '1 Re 6:36',
    quote: '«Costruì il muro di cinta del cortile interno con tre ordini di pietre squadrate e un ordine di travatura di cedro.»',
    note: 'La misura non è data; è disegnato lungo e largo il doppio del cortile del tabernacolo. Le Cronache lo chiamano cortile dei sacerdoti, e intorno c’era il gran cortile, con porte dai battenti ricoperti di bronzo (2 Cronache 4:9), cinto allo stesso modo (7:12). Nel gran cortile c’era anche il palazzo di Salomone, che richiese tredici anni di lavoro (7:1); non è mostrato.',
    size: 'Non indicata · disegnato di 200 × 100 cubiti (90 × 45 m)',
  },
  {
    title: 'Iachim e Boaz',
    ref: '1 Re 7:21',
    quote: '«Egli rizzò le colonne nel portico del tempio; rizzò la colonna a destra, e la chiamò Iachim; poi rizzò la colonna a sinistra, e la chiamò Boaz.»',
    note: 'Chiram, un artigiano del bronzo di Tiro, figlio di una vedova della tribù di Neftali (7:13–14), fuse due colonne alte diciotto cubiti, di dodici cubiti di circonferenza. Su ciascuna pose un capitello di cinque cubiti, con un reticolato a catenelle, due ordini di melagrane, duecento per capitello, e la forma di giglio in cima (7:15–22). La destra è il sud. 2 Cronache 3:15 dà trentacinque cubiti, forse le due insieme. Non si dice se sostenessero qualcosa; sono disegnate libere.',
    size: 'Alte 18 cubiti, 12 di circonferenza (8 m di altezza, 1,7 m di diametro) · capitelli di 5 cubiti',
    made: 'Chiram di Tiro (7:13–22)',
  },
  {
    title: 'Il Mare',
    ref: '1 Re 7:23',
    quote: '«Poi fece il Mare di metallo fuso, che aveva dieci cubiti da un orlo all’altro; era di forma perfettamente rotonda, aveva cinque cubiti d’altezza, e una corda di trenta cubiti ne misurava la circonferenza.»',
    note: 'Poggia su dodici buoi, tre rivolti verso ogni lato, con le parti posteriori volte verso il centro (7:25), e ha due ordini di frutti di colloquintide fusi sotto l’orlo; ha lo spessore di un palmo, e l’orlo ha la forma di un fiore di giglio (7:24–26). Re dice che conteneva 2.000 bati, 2 Cronache 4:5 dice 3.000. Era destinato alle abluzioni dei sacerdoti (2 Cronache 4:6) e stava al lato destro della casa, verso sud-est (7:39).',
    size: '10 cubiti di diametro, 5 di altezza (4,5 × 2,3 m)',
    made: 'Chiram (7:23–26)',
  },
  {
    title: 'Le basi e le conche',
    ref: '1 Re 7:38',
    quote: '«Poi fece le dieci conche di bronzo, ciascuna delle quali conteneva quaranta bati ed era di quattro cubiti; ogni conca posava sopra una delle dieci basi.»',
    note: 'Ogni base misura quattro cubiti per lato e tre di altezza, con riquadri di leoni, buoi e cherubini e ghirlande, su quattro ruote di bronzo fatte come quelle di un carro, alte un cubito e mezzo (7:27–37). Cinque stanno al lato destro della casa e cinque al lato sinistro (7:39). Nelle conche si lavava ciò che serviva agli olocausti (2 Cronache 4:6). Non è chiaro come poggiassero sulle basi.',
    size: 'Basi di 4 × 4 × 3 cubiti · conche di 4 cubiti di diametro',
    made: 'Chiram (7:27–39)',
  },
  {
    title: 'L’altare di bronzo',
    ref: '2 Cronache 4:1',
    quote: '«Poi fece un altare di bronzo, lungo venti cubiti, largo venti cubiti e alto dieci cubiti.»',
    note: 'Re non lo mette nell’elenco, ma lo chiama “l’altare di bronzo, che è davanti al Signore” (8:64). Non si dice come vi salissero i sacerdoti; agli altari non si doveva salire per gradini (Esodo 20:26), perciò non sono disegnati. Tutto il bronzo fu fuso nella pianura del Giordano, in un suolo argilloso, fra Succot e Sartan, e in tale quantità che non se ne verificò il peso (7:46–47).',
    size: '20 × 20 × 10 cubiti (9 × 9 × 4,5 m)',
  },
  {
    title: 'Gli arredi d’oro',
    ref: '1 Re 7:48–49',
    quote: '«Salomone fece fabbricare tutti gli arredi della casa del Signore: l’altare d’oro, la tavola d’oro sulla quale si mettevano i pani della presentazione; i candelabri d’oro puro, cinque a destra e cinque a sinistra, davanti al santuario…»',
    note: 'Re parla di una tavola; 2 Cronache 4:7–8 di dieci tavole e dieci candelabri, cinque per lato, fatti conformemente alle norme. Sono disegnate dieci tavole, con i pani sopra (2 Cronache 4:19), e candelabri come quelli del tabernacolo (Esodo 25:31–37). Le misure non sono date. Insieme a essi furono fatte coppe, coltelli, bacinelle, cucchiai e bracieri d’oro (7:50).',
  },
  {
    title: 'Sette anni',
    ref: '1 Re 6:38',
    quote: '«…l’undicesimo anno, nel mese di Bul, che è l’ottavo mese, la casa fu terminata in tutte le sue parti, come era stata progettata. Salomone la costruì in sette anni.»',
    note: 'Finita tutta l’opera, Salomone portò l’argento, l’oro e gli utensili che suo padre Davide aveva consacrati e li mise nei tesori della casa del Signore (7:51). L’arca fu portata dentro alla dedicazione, nella festa del settimo mese (8:1–6).',
  },
];
