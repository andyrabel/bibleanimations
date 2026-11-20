// Italian text for "Paul's Second Missionary Journey", merged over data.js (see
// addLanguage in ../../i18n.js). Same shape as data.js, text fields only. One
// version, the Nuova Riveduta 2006 (nr2006), so every field is a plain string.
// STOPS line up with data.js by position. Place names follow the NR2006 (Troas,
// Neapolis, Amfipoli, Cencrea, Areòpago).
//
// Quotations are verbatim, in «…»; speech inside a quotation is in “…”, and in
// ‘…’ inside that. Words the NR2006 prints in [brackets] are kept as printed.

export const TERMS = {
  areopagus: 'Areòpago',
};

export const PLACES = {
  antioch: { name: 'Antiochia' },
  derbe: { name: 'Derba' },
  lystra: { name: 'Listra' },
  iconium: { name: 'Iconio' },
  antiochP: { name: 'Antiochia di Pisidia' },
  troas: { name: 'Troas' },
  neapolis: { name: 'Neapolis' },
  philippi: { name: 'Filippi' },
  thessalonica: { name: 'Tessalonica' },
  berea: { name: 'Berea' },
  athens: { name: 'Atene' },
  corinth: { name: 'Corinto' },
  cenchrea: { name: 'Cencrea' },
  ephesus: { name: 'Efeso' },
  caesarea: { name: 'Cesarea' },
  jerusalem: { name: 'Gerusalemme' },
};

export const FEATURES = {
  tarsus: { name: 'Tarso' },
  amphipolis: { name: 'Amfipoli' },
  apollonia: { name: 'Apollonia' },
  samothrace: { name: 'Samotracia' },
  areopagus: { name: 'Areòpago' },
  syria: { name: 'Siria' },
  cilicia: { name: 'Cilicia' },
  galatia: { name: 'Galazia' },
  phrygia: { name: 'Frigia' },
  mysia: { name: 'Misia' },
  bithynia: { name: 'Bitinia' },
  asia: { name: 'Asia' },
  macedonia: { name: 'Macedonia' },
  achaia: { name: 'Acaia' },
  judea: { name: 'Giudea' },
  cyprus: { name: 'Cipro' },
  aegean: { name: 'Mar Egeo' },
  sea: { name: 'Mar Mediterraneo' },
};

export const INTRO = {
  title: 'Ritorniamo',
  ref: 'Atti 15:36',
  quote: '«Dopo diversi giorni Paolo disse a Barnaba: “Ritorniamo ora a visitare i [nostri] fratelli di tutte le città in cui abbiamo annunciato la Parola del Signore, per vedere come stanno”.»',
  note: 'Dopo il concilio di Gerusalemme (Atti 15), Paolo propose di tornare alle chiese del primo viaggio. Barnaba voleva prendere di nuovo Giovanni detto Marco; Paolo non volle, e si separarono: Barnaba s’imbarcò per Cipro con Marco, e Paolo partì per via di terra con Sila (15:37–40). Questo viaggio, verso il 49–52 d.C., portò il vangelo in Europa: a Filippi, Tessalonica, Berea, Atene e Corinto.',
  aside: 'Il rilievo è reale, ricavato da dati altimetrici moderni, con le altezze moltiplicate per tre perché i monti si vedano; la costa è quella di oggi, perciò i porti insabbiati di Efeso e Mileto ora sono lontani dal mare. Gli Atti non dicono per quali strade andarono, perciò i percorsi via terra seguono il passaggio più facile fra i luoghi nominati, e quelli via mare la via più breve in acque aperte. Le città e la nave sono disegnate molto più grandi del vero. Non compaiono persone.',
};

export const FINALE = {
  title: 'La parola ha echeggiato',
  ref: '1 Tessalonicesi 1:8',
  quote: '«Infatti da voi la parola del Signore ha echeggiato non soltanto nella Macedonia e nell’Acaia, ma anzi la fama della fede che avete in Dio si è sparsa in ogni luogo, di modo che non abbiamo bisogno di parlarne…»',
  note: 'Paolo lo scrisse da Corinto, pochi mesi dopo essere stato cacciato da Tessalonica (1 Tessalonicesi 2:17; 3:1–6). È probabilmente la più antica delle sue lettere che abbiamo. Avrebbe scritto ancora alle chiese fondate in questo viaggio, a Filippi, Tessalonica e Corinto, e le avrebbe visitate di nuovo nel terzo viaggio (20:1–3).',
};

export const STOPS = [
  {
    title: 'Paolo sceglie Sila',
    ref: 'Atti 15:40',
    quote: '«Paolo, invece, scelse Sila e partì, raccomandato dai fratelli alla grazia del Signore.»',
    note: 'Sila (Silvano nelle lettere) era uno dei capi della chiesa di Gerusalemme e profeta, mandato ad Antiochia con la lettera del concilio (15:22, 32). Come Paolo, era cittadino romano (16:37). Barnaba e Marco s’imbarcarono per Cipro; gli Atti non li seguono, anche se più tardi Paolo parla bene di tutti e due (1 Corinzi 9:6; Colossesi 4:10).',
  },
  {
    title: 'Attraverso la Siria e la Cilicia',
    ref: 'Atti 15:41',
    quote: '«E percorse la Siria e la Cilicia, rafforzando le chiese.»',
    note: 'La strada andava a nord sui monti Amano, per le Porte Sirie, girava intorno al fondo del golfo fino a Tarso, la città natale di Paolo (21:39), e saliva per le Porte Cilicie, il passo attraverso il Tauro, fino all’altopiano. Le chiese di qui erano più antiche del primo viaggio (15:23; Galati 1:21).',
  },
  {
    title: 'Timoteo',
    ref: 'Atti 16:1',
    quote: '«Giunse anche a Derba e a Listra; e là c’era un discepolo, di nome Timoteo, figlio di una donna ebrea credente, ma di padre greco.»',
    note: 'La madre di Timoteo, Eunice, e sua nonna Loide erano credenti (2 Timoteo 1:5), e i fratelli di Listra e di Iconio rendevano buona testimonianza di lui (16:2). Paolo volle prenderlo con sé e, poiché tutti sapevano che suo padre era greco, lo circoncise a causa dei Giudei di quei luoghi (16:3). Divenne il suo collaboratore più vicino (Filippesi 2:19–22).',
  },
  {
    title: 'Le chiese si fortificano',
    ref: 'Atti 16:5',
    quote: '«Le chiese dunque si fortificavano nella fede e crescevano ogni giorno di numero.»',
    note: 'Di città in città trasmettevano le decisioni prese dagli apostoli e dagli anziani di Gerusalemme (16:4): gli stranieri che credevano non dovevano essere circoncisi, ma dovevano astenersi dalle carni sacrificate agli idoli, dal sangue, dagli animali soffocati e dalla fornicazione (15:28–29).',
  },
  {
    title: 'Fermati in Asia',
    ref: 'Atti 16:6',
    quote: '«Poi attraversarono la Frigia e la regione della Galazia, essendogli stato impedito dallo Spirito Santo di annunciare la Parola in Asia…»',
    note: 'L’Asia qui è la provincia romana sulla costa dell’Egeo, la cui città principale era Efeso. Gli Atti non dicono come lo Spirito Santo glielo impedì, né per dove andarono. La mappa li porta a nord attraverso la Frigia, verso la Bitinia, come suggerisce il versetto seguente.',
  },
  {
    title: 'Né la Bitinia',
    ref: 'Atti 16:7',
    quote: '«…e, giunti ai confini della Misia, cercavano di andare in Bitinia; ma lo Spirito di Gesù non lo permise loro…»',
    note: 'La Bitinia, sul mar Nero, era un’altra provincia con grandi città. Fermati una seconda volta, andarono a ovest attraverso la Misia, senza predicarvi, fino alla costa a Troas (16:8): circa 400 km di strada.',
  },
  {
    title: 'Il Macedone',
    ref: 'Atti 16:9',
    quote: '«Paolo ebbe durante la notte una visione: un Macedone gli stava davanti e lo pregava, dicendo: “Passa in Macedonia e soccorrici”.»',
    note: 'Alessandria Troade era una colonia romana e il porto per la traversata verso la Macedonia. Da qui il racconto dice “noi” (16:10): l’autore, secondo la tradizione Luca, si unì a loro. Ne conclusero che Dio li chiamava ad annunciare il vangelo in Macedonia.',
  },
  {
    title: 'Samotracia e Neapolis',
    ref: 'Atti 16:11',
    caption: 'Dall’Asia all’Europa',
    quote: '«Perciò, salpando da Troas, puntammo diritto su Samotracia, e il giorno seguente su Neapolis…»',
    note: 'Con il vento a favore la traversata durò due giorni, con una notte sull’isola di Samotracia; in senso contrario il viaggio durò cinque giorni (20:6). Neapolis, l’odierna Kavala, era il porto di Filippi, sulla via Egnazia, la strada romana che attraversava la Macedonia.',
  },
  {
    title: 'Lidia',
    ref: 'Atti 16:14',
    quote: '«Una donna della città di Tiatiri, commerciante di porpora, di nome Lidia, che temeva Dio, stava ad ascoltare. Il Signore le aprì il cuore per renderla attenta alle cose dette da Paolo.»',
    note: 'Filippi era una colonia romana e la città più importante di quella regione (16:12). Il sabato uscirono dalla porta, lungo il fiume, dove pensavano ci fosse un luogo di preghiera, e parlarono alle donne là riunite (16:13). Lidia fu battezzata con la sua famiglia, e li ospitò in casa sua (16:15).',
  },
  {
    title: 'Il carceriere',
    ref: 'Atti 16:31',
    quote: '«Ed essi risposero: “Credi nel Signore Gesù [Cristo], e sarai salvato tu e la tua famiglia”.»',
    note: 'Quando Paolo scacciò uno spirito da una serva, i suoi padroni fecero battere Paolo e Sila con le verghe e li fecero gettare in prigione. Verso mezzanotte pregavano e cantavano inni quando un terremoto spalancò le porte (16:16–26). Il carceriere, sul punto di uccidersi, chiese che cosa dovesse fare per essere salvato; lui e tutti i suoi furono battezzati quella stessa notte (16:27–34).',
  },
  {
    title: 'Tessalonica',
    ref: 'Atti 17:2',
    quote: '«…e Paolo, com’era sua consuetudine, entrò da loro, e per tre sabati tenne loro ragionamenti tratti dalle Scritture…»',
    note: 'Presero la via Egnazia, passando per Amfipoli e Apollonia, circa 140 km, fino a Tessalonica, la capitale della provincia (17:1). Paolo dimostrava dalle Scritture che il Cristo doveva soffrire e risuscitare (17:3). Alcuni credettero, con una gran folla di Greci pii; altri misero in subbuglio la città, e i fratelli fecero partire Paolo e Sila di notte (17:4–10).',
  },
  {
    title: 'Berea',
    ref: 'Atti 17:11',
    quote: '«Ora questi erano di sentimenti più nobili di quelli di Tessalonica, perché ricevettero la Parola con ogni premura, esaminando ogni giorno le Scritture per vedere se le cose stavano così.»',
    note: 'Berea stava circa 70 km a ovest, lontano dalla strada principale. Molti vi credettero, fra cui nobildonne greche, e uomini (17:12). Ma i Giudei di Tessalonica vennero ad agitare la folla, e i fratelli condussero Paolo fino al mare, mentre Sila e Timoteo rimanevano (17:13–14).',
  },
  {
    title: 'Atene',
    ref: 'Atti 17:16',
    quote: '«Mentre Paolo li aspettava ad Atene, lo spirito gli s’inacerbiva dentro nel vedere la città piena di idoli.»',
    note: 'Quelli che accompagnavano Paolo lo condussero fino ad Atene (17:15), per mare, come si pensa di solito; il percorso gira intorno all’Eubea fino al Pireo, il porto di Atene. Atene non era più potente, ma era ancora la città dei filosofi e di templi famosi. Paolo discorreva nella sinagoga e, ogni giorno, sulla piazza con quelli che vi si trovavano (17:17).',
  },
  {
    title: 'Al dio sconosciuto',
    ref: 'Atti 17:23',
    quote: '«Poiché, passando e osservando gli oggetti del vostro culto, ho trovato anche un altare sul quale era scritto: “Al dio sconosciuto”. Orbene, ciò che voi adorate senza conoscerlo, io ve lo annuncio.»',
    note: 'Filosofi epicurei e stoici lo condussero all’Areòpago, il consiglio che si riuniva sul colle di Ares, ai piedi dell’Acropoli, per ascoltare la sua nuova dottrina (17:18–22). Parlò del Dio che ha fatto il mondo e non abita in templi costruiti da mani d’uomo, e dell’uomo che egli ha risuscitato dai morti (17:24–31). Alcuni credettero, fra cui Dionisio l’areopagita e una donna chiamata Damaris (17:34).',
  },
  {
    title: 'Corinto',
    ref: 'Atti 18:9–10',
    quote: '«Una notte il Signore disse in visione a Paolo: “Non temere, ma continua a parlare e non tacere; perché io sono con te, e nessuno ti metterà le mani addosso per farti del male; perché io ho un popolo numeroso in questa città”.»',
    note: 'Corinto, capitale dell’Acaia, era una vivace città romana sull’istmo fra due mari. Paolo stette con Aquila e Priscilla, Giudei cacciati da Roma, e lavorò con loro come fabbricante di tende (18:1–3); arrivò, avrebbe scritto, con debolezza e timore (1 Corinzi 2:3). Rimase un anno e sei mesi (18:11). Un’iscrizione data il proconsolato di Gallione (18:12) verso il 51–52 d.C., una delle date più sicure della vita di Paolo.',
  },
  {
    title: 'Cencrea',
    ref: 'Atti 18:18',
    quote: '«Quanto a Paolo, dopo essersi trattenuto ancora molti giorni, prese commiato dai fratelli e, dopo essersi fatto radere il capo a Cencrea, perché aveva fatto un voto, s’imbarcò per la Siria con Priscilla e Aquila.»',
    note: 'Il porto orientale di Corinto stava sul golfo Saronico, di fronte all’Asia. Gli Atti non dicono quale fosse il voto di Paolo; tagliarsi i capelli ne segnava la fine, o l’inizio. Più tardi qui ci fu una chiesa, di cui Febe era diaconessa (Romani 16:1).',
  },
  {
    title: 'Efeso',
    ref: 'Atti 18:21',
    quote: '«…e dopo aver preso commiato e aver detto: “…Dio volendo, tornerò da voi”, salpò da Efeso…»',
    note: 'Al ritorno la nave fece scalo a Efeso, la città principale dell’Asia, dove prima era stato loro impedito di predicare. Paolo parlò nella sinagoga, e lo pregarono di rimanere più a lungo, ma non acconsentì (18:19–20). Vi lasciò Priscilla e Aquila e tornò nel terzo viaggio (18:26; 19:1). Da allora la costa si è insabbiata; a quel tempo il porto era accanto alla città.',
  },
  {
    title: 'Di nuovo ad Antiochia',
    ref: 'Atti 18:22',
    quote: '«…giunto a Cesarea, salì a Gerusalemme e, salutata la chiesa, scese ad Antiochia.»',
    note: 'Cesarea, la città portuale di Erode, era il porto di Gerusalemme. Il greco dice solo che “salì” e salutò la chiesa; di solito si intende che salì a Gerusalemme, e la NR2006 lo scrive. Gli Atti non dicono come Paolo proseguì fino ad Antiochia; il percorso prende la strada costiera verso nord, per Tolemaide, Tiro e Sidone.',
  },
];
