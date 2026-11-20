// Italian text for "Ezekiel's Temple", merged over data.js (see addLanguage in
// ../../i18n.js). Same shape as data.js, text fields only. One version, the Nuova
// Riveduta 2006 (nr2006), so every field is a plain string. STOPS line up with
// data.js by position.
//
// Quotations are verbatim, in «…»; speech inside a quotation is in “…”. The
// NR2006 keeps the cubits. It follows the Greek for the two rooms by the north
// and south gates (40:44, with a note), but the Hebrew elsewhere: eleven cubits
// for the porch and a pillar by each jamb (40:49), five hundred "cubiti della
// canna" for the wall (42:16–20). Its words: "canna", "camere" (the guardrooms),
// "pilastri", "vestibolo", "tempio" (the nave), "camere laterali", "spazio vuoto"
// (the separate yard), "palme".

export const TERMS = {
  rod: 'canna',
  guardrooms: 'camere',
  porch: 'vestibolo',
  porches: 'vestiboli',
  jambs: 'pilastri',
  court: 'cortile',
  nave: 'tempio',
  house: 'casa',
  sideChambers: 'camere laterali',
  separate: 'spazio vuoto',
  palms: 'palme',
  bronze: 'bronzo',
};

export const FEATURES = {
  eastGate: { name: 'Porta orientale' },
  northGate: { name: 'Porta settentrionale' },
  southGate: { name: 'Porta meridionale' },
  outerCourt: { name: 'Cortile esterno' },
  chambers: { name: 'Camere' },
  pavement: { name: 'Lastrico' },
  innerCourt: { name: 'Cortile interno' },
  innerSouth: { name: 'Porta meridionale interna' },
  innerEast: { name: 'Porta orientale interna' },
  innerNorth: { name: 'Porta settentrionale interna' },
  tables: { name: 'Tavole' },
  rinse: { name: 'Camera per lavare' },
  roomN: { name: 'Camera dei sacerdoti' },
  roomS: { name: 'Camera dei sacerdoti' },
  altar: { name: 'Altare' },
  porch: { name: 'Vestibolo' },
  columns: { name: 'Colonne' },
  nave: { name: 'Tempio' },
  mostHoly: { name: 'Luogo santissimo' },
  sideChambers: { name: 'Camere laterali' },
  table: { name: 'Altare di legno' },
  westBuilding: { name: 'Edificio' },
  yard: { name: 'Spazio vuoto' },
  priestsN: { name: 'Camere sante' },
  priestsS: { name: 'Camere sante' },
  mountain: { name: 'Un monte altissimo' },
};

export const PEOPLE = {
  man: { name: 'L’uomo' },
  ezekiel: { name: 'Ezechiele' },
};

export const INTRO = {
  title: 'Un monte altissimo',
  ref: 'Ezechiele 40:2',
  quote: '«In una visione divina mi trasportò là e mi posò sopra un monte altissimo sul quale stava, dal lato di mezzogiorno, come la costruzione di una città.»',
  note: 'Era il venticinquesimo anno della deportazione, quattordici anni dopo la presa di Gerusalemme e l’incendio del tempio di Salomone (40:1). Ezechiele, sacerdote fra gli esuli nel paese dei Caldei (1:3), è trasportato in visione su un monte nel paese d’Israele. Ciò che sembra una città si intende di solito come il tempio stesso, con le sue mura e le sue porte. Un uomo con una canna per misurare glielo mostra parte per parte (Ezechiele 40–42), e ogni parte sorge mentre egli la misura.',
  aside: 'Tutto è disegnato con le misure del testo, nel cubito lungo di 40:5, un cubito e un palmo (≈ 52,5 cm). Ezechiele dà lunghezze e larghezze ma quasi nessuna altezza, perciò le altezze sono ipotesi, e le note dicono dove altro il modello deve supporre. Il monte non è un luogo reale; la visione non dice dove si trovi.',
};

export const FINALE = {
  title: 'La gloria ritorna',
  ref: 'Ezechiele 43:4–5',
  quote: '«La gloria del Signore entrò nella casa per la via della porta che guardava a oriente. Lo Spirito mi portò in alto e mi condusse nel cortile interno; ed ecco, la gloria del Signore riempiva la casa.»',
  note: 'Anni prima Ezechiele aveva visto la gloria lasciare il tempio di Salomone per la porta orientale e fermarsi sul monte a oriente della città (10:18–19; 11:22–23). Ora ritorna per la stessa via, con una voce come il rumore di grandi acque, e la terra risplende (43:2). Ezechiele cade sulla sua faccia (43:3), e il Signore parla della casa: “questo è il luogo del mio trono… io vi abiterò per sempre in mezzo ai figli d’Israele” (43:7). Poi la porta orientale resta chiusa, perché per essa è entrato il Signore (44:1–2).',
};

export const STOPS = [
  {
    title: 'L’uomo con la canna per misurare',
    ref: 'Ezechiele 40:3',
    quote: '«Egli mi condusse là, ed ecco che c’era un uomo il cui aspetto era come l’aspetto del bronzo; aveva in mano una corda di lino e una canna per misurare; egli stava in piedi sulla porta.»',
    note: 'L’uomo disse a Ezechiele di aprire gli occhi e guardare, di porgere l’orecchio e ascoltare, di stare attento a tutto ciò che gli avrebbe mostrato, e di riferire tutto alla casa d’Israele (40:4). La corda serviva per le distanze lunghe (47:3), la canna per gli edifici. Non si dice chi sia; parla da parte del Signore (44:5) ed è disegnato lucente come il bronzo, come in 1:7. Ezechiele è disegnato con una semplice tunica.',
    size: 'La canna: 6 cubiti lunghi (3,2 m)',
  },
  {
    title: 'Il muro',
    ref: 'Ezechiele 40:5',
    quote: '«Ed ecco, un muro esterno circondava la casa tutto intorno. L’uomo aveva in mano una canna per misurare, lunga sei cubiti, di un cubito e un palmo ciascuno. Egli misurò la larghezza del muro: era una canna; l’altezza era una canna.»',
    note: 'Un cubito lungo è il cubito comune più un palmo, circa 52,5 cm, perciò la canna misura poco più di 3 m, e il muro è spesso quanto è alto. La sua altezza è disegnata dal cortile esterno, che sta sette gradini sopra il terreno di fuori. Più avanti si dice a che cosa serve il muro: fa “la separazione fra il sacro e il profano” (42:20).',
    size: '6 × 6 cubiti lunghi (3,2 × 3,2 m)',
  },
  {
    title: 'La porta orientale',
    ref: 'Ezechiele 40:6',
    quote: '«Poi venne alla porta che guardava verso oriente, ne salì la gradinata e misurò la soglia della porta, che era della larghezza di una canna…»',
    note: 'Dentro, tre camere per lato, ognuna di una canna per lato, cinque cubiti fra l’una e l’altra e una chiusura di un cubito davanti (40:7, 10, 12); poi la soglia interna e un vestibolo di otto cubiti che dà sul cortile (40:8–9). L’apertura è larga dieci cubiti; ci sono finestre con grate alle camere e palme sui pilastri (40:11, 16). Cinquanta cubiti di lunghezza e venticinque di larghezza (40:13, 15). Le altezze non sono date; i sessanta cubiti di 40:14 sono incerti, e i pilastri sono disegnati più bassi.',
    size: '50 × 25 cubiti (26 × 13 m) · camere di 6 × 6',
  },
  {
    title: 'Il cortile esterno',
    ref: 'Ezechiele 40:17',
    quote: '«Poi mi condusse nel cortile esterno, ed ecco c’erano delle camere e un lastrico tutto intorno al cortile: trenta camere davano su quel lastrico.»',
    note: 'Il lastrico corre lungo il muro, largo quanto le porte sono lunghe (40:18), più in basso del cortile interno. La misura e la disposizione delle trenta camere non sono date; sono disegnate in file di cinque da ogni lato di ogni porta. Più tardi il popolo avrebbe mangiato i suoi sacrifici in luoghi simili (vedi 46:21–24). Dal davanti di questa porta fino alla porta seguente, verso l’interno, ci sono cento cubiti (40:19).',
    size: 'Lastrico largo quanto una porta è lunga · camere senza misura',
  },
  {
    title: 'La porta settentrionale',
    ref: 'Ezechiele 40:22',
    quote: '«Le sue finestre, i suoi archi e le sue palme avevano la stessa misura della porta orientale; vi si saliva per sette gradini, davanti ai quali stavano i suoi archi.»',
    note: 'La porta che guarda a settentrione è uguale a quella orientale: tre camere per lato, cinquanta cubiti di lunghezza e venticinque di larghezza (40:20–21). I suoi sette gradini salgono dal terreno fuori dal muro, così il cortile esterno sta sopra la cima del monte. I gradini della porta orientale non sono contati (40:6); sono disegnati uguali.',
    size: '50 × 25 cubiti · 7 gradini',
  },
  {
    title: 'La porta meridionale',
    ref: 'Ezechiele 40:24',
    quote: '«Poi mi condusse verso mezzogiorno, ed ecco una porta che guardava a mezzogiorno; egli ne misurò i pilastri e gli archi, che avevano le stesse dimensioni.»',
    note: 'Una terza porta, uguale alle altre, con i suoi sette gradini e le palme sui pilastri (40:25–26). Non c’è porta a occidente: la casa e l’edificio dietro di essa occupano quel lato, e si entra solo da oriente, da settentrione o da mezzogiorno. Secondo 46:9, chi entra per la porta settentrionale esce per quella meridionale, e chi entra per quella meridionale esce per quella settentrionale.',
    size: '50 × 25 cubiti · 7 gradini',
  },
  {
    title: 'La porta meridionale del cortile interno',
    ref: 'Ezechiele 40:31',
    quote: '«Gli archi della porta erano dal lato del cortile esterno; c’erano delle palme sui suoi pilastri e vi si saliva per otto gradini.»',
    note: 'A cento cubiti dalla porta meridionale esterna c’è quella interna, con le stesse dimensioni (40:27–29), ma girata al contrario: il suo vestibolo dà sul cortile esterno, e altri otto gradini salgono al cortile interno. Il muro del cortile interno non è descritto; è disegnato un muretto intorno alla sua terrazza. Gli archi di venticinque cubiti per cinque del versetto 30 non sono chiari e non sono disegnati.',
    size: '50 × 25 cubiti · 8 gradini',
  },
  {
    title: 'Le porte interne orientale e settentrionale',
    ref: 'Ezechiele 40:32',
    quote: '«Poi mi condusse nel cortile interno per la porta orientale e misurò la porta; essa aveva le stesse dimensioni.»',
    note: 'Poi la porta settentrionale (40:35–37). Le sei porte sono uguali: cinquanta cubiti per venticinque, tre camere per lato, finestre e palme sui pilastri; quelle esterne hanno sette gradini, quelle interne otto. Ogni porta interna sta di fronte a una esterna, a cento cubiti (40:23, 27).',
    size: 'Ciascuna di 50 × 25 cubiti · 8 gradini',
  },
  {
    title: 'Tavole per gli olocausti',
    ref: 'Ezechiele 40:39',
    quote: '«Nel vestibolo della porta c’erano due tavole di qua e due tavole di là per scannarvi su gli olocausti, i sacrifici espiatori e per la colpa.»',
    note: 'Altre due per lato, all’esterno del vestibolo, presso i gradini (40:40–41), otto in tutto, e quattro tavole di pietra tagliata, di un cubito e mezzo per lato e alte un cubito, per gli strumenti con cui si scannavano i sacrifici (40:42). Una camera con l’ingresso presso i pilastri serviva per lavare gli olocausti (40:38). Il testo nomina il settentrione (40:40), e gli olocausti si sgozzavano dal lato settentrionale dell’altare (Levitico 1:11), perciò le tavole sono disegnate lì. Gli uncini di un palmo (40:43) sono troppo piccoli per vedersi.',
    size: 'Tavole di pietra di 1½ × 1½ × 1 cubito',
  },
  {
    title: 'Camere per i sacerdoti',
    ref: 'Ezechiele 40:45–46',
    quote: '«Egli mi disse: “Questa camera che guarda verso mezzogiorno è per i sacerdoti che sono incaricati del servizio della casa; la camera che guarda verso settentrione è per i sacerdoti incaricati del servizio dell’altare. I figli di Sadoc sono quelli che, tra i figli di Levi, si accostano al Signore per fare il suo servizio”.»',
    note: 'Una camera sta accanto alla porta settentrionale e guarda a mezzogiorno; l’altra accanto a quella meridionale e guarda a settentrione (40:44). L’ebraico le chiama camere per i cantori e mette la seconda presso la porta orientale; la NR2006 segue il greco, come dice la sua nota. Le misure non sono date.',
    size: 'Senza misura',
  },
  {
    title: 'Il cortile interno e l’altare',
    ref: 'Ezechiele 40:47',
    quote: '«Egli misurò il cortile; era quadrato e misurava cento cubiti di lunghezza e cento cubiti di larghezza; l’altare stava davanti alla casa.»',
    note: 'La sua corda segna il quadrato, con un lastrico più chiaro di quello dei cortili dietro. L’altare è misurato più avanti, in 43:13–17: una base con un canaletto tutto intorno, due ripiani e un focolare di dodici cubiti per lato con quattro corni, con i gradini rivolti a oriente. Così è disegnato, in mezzo al cortile: alto circa undici cubiti, diciotto per lato alla base. Su di esso i sacerdoti avrebbero offerto olocausti e sacrifici di riconoscenza, e il Signore li avrebbe graditi (43:27).',
    size: 'Cortile di 100 × 100 cubiti (52 m) · focolare dell’altare di 12 × 12',
  },
  {
    title: 'Il vestibolo della casa',
    ref: 'Ezechiele 40:49',
    quote: '«La lunghezza del vestibolo era di venti cubiti e la larghezza era di undici cubiti; vi si saliva per dei gradini; presso i pilastri c’erano delle colonne, una di qua e una di là.»',
    note: 'La casa sta su un basamento alto una buona canna (41:8). Il vestibolo è profondo undici cubiti nell’ebraico, che la NR2006 segue, dodici nel greco; ne sono disegnati dodici, e così la casa misura cento cubiti di lunghezza (41:13). L’ingresso è largo quattordici cubiti fra pilastri di cinque (40:48). Il greco conta dieci gradini. Le due colonne, una per lato, ricordano Iachim e Boaz (1 Re 7:21); la misura non è data.',
    size: 'Vestibolo di 20 × 12 cubiti · basamento alto 6',
  },
  {
    title: 'Il tempio',
    ref: 'Ezechiele 41:2',
    quote: '«La larghezza dell’ingresso era di dieci cubiti; le pareti laterali dell’ingresso misuravano cinque cubiti da un lato e cinque cubiti dall’altro. Egli misurò la lunghezza del tempio: quaranta cubiti, e venti cubiti di larghezza.»',
    note: 'I muri sono spessi sei cubiti (41:1, 5); la sala misura quaranta per venti, come la sala principale del tempio di Salomone (1 Re 6:17). L’altezza della casa non è data; è disegnata di trenta cubiti, come quella di Salomone, e il muro sud è tolto per vedere l’interno. Ezechiele entra fino al tempio; è sacerdote, ma solo l’uomo va oltre.',
    size: '40 × 20 cubiti (21 × 10,5 m) · muri di 6',
  },
  {
    title: 'Il luogo santissimo',
    ref: 'Ezechiele 41:4',
    quote: '«Misurò una lunghezza di venti cubiti e una larghezza di venti cubiti in fondo al tempio, e mi disse: “Questo è il luogo santissimo”.»',
    note: 'Qui entra solo l’uomo (41:3); Ezechiele resta nel tempio. Il muro fra le due sale è spesso due cubiti, con un ingresso di sei. La sala misura venti cubiti per lato, come quella di Salomone (1 Re 6:20), ma non c’è nulla: né arca, né cherubini, né cortina. Ezechiele non sa che cosa la riempirà finché la gloria non ritorna (43:5).',
    size: '20 × 20 cubiti (10,5 m) · ingresso di 6',
  },
  {
    title: 'Le camere laterali',
    ref: 'Ezechiele 41:6',
    quote: '«Le camere laterali erano una accanto all’altra, in numero di trenta, e c’erano tre piani; stavano in un muro, costruito per queste camere tutto intorno alla casa, perché fossero appoggiate senza appoggiarsi al muro della casa.»',
    note: 'Larghe quattro cubiti in basso, più larghe a ogni piano man mano che il muro si assottiglia (41:5, 7), come nel tempio di Salomone (1 Re 6:6). Il muro esterno è spesso cinque cubiti, con una porta a settentrione e una a mezzogiorno che danno su uno spazio libero di cinque cubiti sul basamento, e intorno uno spazio di venti cubiti (41:9–11). L’altezza dei piani non è data; sono disegnati di sei cubiti.',
    size: 'Larghe 4 cubiti · muro esterno di 5 · 3 piani di 30',
  },
  {
    title: 'L’edificio a occidente',
    ref: 'Ezechiele 41:12',
    quote: '«L’edificio situato davanti allo spazio vuoto dal lato d’occidente misurava settanta cubiti di larghezza; il muro dell’edificio misurava cinque cubiti di spessore tutto intorno ed era lungo novanta cubiti.»',
    note: 'Dietro la casa, al di là dello spazio vuoto, c’è un grande edificio di cui non si dice l’uso; occupa il lato occidentale, dove non c’è porta. Anche l’altezza e le porte non sono date. Settanta per novanta all’interno, con i muri misura ottanta per cento, e con lo spazio vuoto davanti cento cubiti da oriente a occidente (41:13).',
    size: '70 × 90 cubiti all’interno (37 × 47 m) · muri di 5',
  },
  {
    title: 'Cento cubiti',
    ref: 'Ezechiele 41:13',
    quote: '«Poi misurò la casa: era di cento cubiti di lunghezza. Lo spazio vuoto, l’edificio e i suoi muri avevano una lunghezza di cento cubiti.»',
    note: 'Anche la facciata della casa con lo spazio vuoto dai due lati misura cento cubiti (41:14), perciò la casa e i suoi spazi formano un quadrato come il cortile interno davanti, che la sua corda segna. Dal davanti al fondo: il vestibolo 5 + 12, il muro 6, il tempio 40, il muro 2, il luogo santissimo 20, il muro 6, le camere laterali 4 e il loro muro 5. Non si parla di un tetto; ne è disegnato uno.',
    size: 'La casa: 100 × 100 cubiti con i suoi spazi (52 m)',
  },
  {
    title: 'Cherubini e palme',
    ref: 'Ezechiele 41:18–19',
    quote: '«C’erano degli ornamenti di cherubini e di palme, una palma tra cherubino e cherubino, e ogni cherubino aveva due facce: una faccia d’uomo, rivolta verso la palma da un lato, e una faccia di leone, rivolta verso l’altra palma, dall’altro lato. Gli ornamenti erano in tutta la casa, tutto intorno.»',
    note: 'Le pareti sono rivestite di legno dal pavimento fino alle finestre (41:16–17), e ornate dal pavimento fino al di sopra della porta (41:20). A differenza del tempio di Salomone, non si parla d’oro. Nel tempio c’è un altare di legno alto tre cubiti e lungo due: “Questa è la tavola che sta davanti al Signore” (41:22).',
    size: 'Altare di legno di 2 × 2 × 3 cubiti',
  },
  {
    title: 'Porte doppie',
    ref: 'Ezechiele 41:23–24',
    quote: '«Il tempio e il santuario avevano due porte; ogni porta aveva due battenti, due battenti che si piegavano in due pezzi, due pezzi per ogni battente.»',
    note: 'Le porte del tempio erano scolpite con cherubini e palme, come le pareti, e sulla facciata del vestibolo c’era una tettoia di legno; la parola è incerta (41:25), ed è disegnata una cornice. Il vestibolo aveva finestre a grate e palme ai lati (41:26). Le porte sono disegnate aperte, ogni battente piegato in due.',
    size: 'Ingressi di 10 e 6 cubiti',
  },
  {
    title: 'Le camere sante',
    ref: 'Ezechiele 42:13',
    quote: '«Egli mi disse: “Le camere a settentrione e le camere a mezzogiorno, che stanno di fronte allo spazio vuoto, sono le camere sante dove i sacerdoti che si accostano al Signore mangeranno le cose santissime; là deporranno le cose santissime, le offerte e le vittime per i sacrifici di espiazione e per la colpa, poiché quel luogo è santo.»',
    note: 'Da ogni lato della casa, nel cortile esterno: un blocco di cento cubiti verso lo spazio vuoto e uno di cinquanta verso l’esterno, a tre piani digradanti, con un corridoio di dieci cubiti fra loro e l’ingresso da oriente (42:1–12). Qui i sacerdoti depongono i loro paramenti santi prima di uscire verso il popolo (42:14). La disposizione è una lettura di un passo difficile.',
    size: '100 × 50 cubiti · corridoio di 10',
  },
  {
    title: 'Cinquecento',
    ref: 'Ezechiele 42:20',
    quote: '«Misurò dai quattro lati il muro che formava il recinto: tutto intorno la lunghezza era di cinquecento e la larghezza di cinquecento; il muro faceva la separazione fra il sacro e il profano.»',
    note: 'L’uomo condusse Ezechiele fuori per la porta orientale e misurò il recinto tutto intorno (42:15–19). L’ebraico dice cinquecento canne per lato, circa 1,6 km; il greco dice cubiti, e la NR2006 ha “cinquecento cubiti della canna da misurare”. I cortili e le porte del capitolo 40 fanno insieme cinquecento cubiti, e così è disegnato. In 45:2 il santuario è di nuovo un quadrato di cinquecento.',
    size: '500 × 500 cubiti (262 m)',
  },
];
