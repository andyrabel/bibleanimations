// Italian text for "Paul's Third Missionary Journey", merged over data.js (see
// addLanguage in ../../i18n.js). Same shape as data.js, text fields only. One
// version, the Nuova Riveduta 2006 (nr2006), so every field is a plain string.
// STOPS line up with data.js by position. Place names follow the NR2006 (Troas,
// Asso, Chio, Samo, Cos, Rodi, Tolemaide); at Ephesus it has Diana for Artemis.
//
// Quotations are verbatim, in «…»; speech inside a quotation is in “…”. Words the
// NR2006 prints in [brackets] are left out with "…" where they can be, and kept
// as printed where they can't.

export const TERMS = {
  artemis: 'Diana',
  theater: 'teatro',
};

export const PLACES = {
  antioch: { name: 'Antiochia' },
  derbe: { name: 'Derba' },
  lystra: { name: 'Listra' },
  iconium: { name: 'Iconio' },
  antiochP: { name: 'Antiochia di Pisidia' },
  ephesus: { name: 'Efeso' },
  troas: { name: 'Troas' },
  neapolis: { name: 'Neapolis' },
  philippi: { name: 'Filippi' },
  thessalonica: { name: 'Tessalonica' },
  berea: { name: 'Berea' },
  corinth: { name: 'Corinto' },
  assos: { name: 'Asso' },
  mitylene: { name: 'Mitilene' },
  miletus: { name: 'Mileto' },
  cos: { name: 'Cos' },
  rhodes: { name: 'Rodi' },
  patara: { name: 'Patara' },
  tyre: { name: 'Tiro' },
  ptolemais: { name: 'Tolemaide' },
  caesarea: { name: 'Cesarea' },
  jerusalem: { name: 'Gerusalemme' },
};

export const FEATURES = {
  tarsus: { name: 'Tarso' },
  theater: { name: 'Teatro' },
  smyrna: { name: 'Smirne' },
  pergamum: { name: 'Pergamo' },
  thyatira: { name: 'Tiatiri' },
  sardis: { name: 'Sardi' },
  philadelphia: { name: 'Filadelfia' },
  laodicea: { name: 'Laodicea' },
  colossae: { name: 'Colosse' },
  hierapolis: { name: 'Ierapoli' },
  chios: { name: 'Chio' },
  samos: { name: 'Samo' },
  syria: { name: 'Siria' },
  cilicia: { name: 'Cilicia' },
  galatia: { name: 'Galazia' },
  phrygia: { name: 'Frigia' },
  asia: { name: 'Asia' },
  macedonia: { name: 'Macedonia' },
  achaia: { name: 'Acaia' },
  lycia: { name: 'Licia' },
  phoenicia: { name: 'Fenicia' },
  judea: { name: 'Giudea' },
  cyprus: { name: 'Cipro' },
  aegean: { name: 'Mar Egeo' },
  sea: { name: 'Mar Mediterraneo' },
};

export const INTRO = {
  title: 'Condurre a termine la corsa',
  ref: 'Atti 20:24',
  quote: '«Ma non faccio nessun conto della mia vita, come se mi fosse preziosa, pur di condurre a termine [con gioia] la mia corsa e il servizio affidatomi dal Signore Gesù, cioè di testimoniare del vangelo della grazia di Dio.»',
  note: 'Paolo lo disse agli anziani di Efeso, a Mileto, verso la fine del suo terzo viaggio, intorno al 53–57 d.C. Passò la maggior parte del viaggio a Efeso, più di due anni. Poi percorse la Macedonia e la Grecia raccogliendo una colletta per i poveri di Gerusalemme, e la portò lui stesso, anche se era stato avvertito che lo aspettavano catene (20:23).',
  aside: 'Il rilievo è reale, ricavato da dati altimetrici moderni, con le altezze moltiplicate per tre perché i monti si vedano; la costa è quella di oggi, perciò i porti insabbiati di Efeso e Mileto ora sono lontani dal mare. Gli Atti non dicono per quali strade andarono, perciò i percorsi via terra seguono il passaggio più facile fra i luoghi nominati, e quelli via mare la via più breve in acque aperte. Le città e la nave sono disegnate molto più grandi del vero. Non compaiono persone.',
};

export const FINALE = {
  title: 'Quello che Dio aveva fatto',
  ref: 'Atti 21:19',
  quote: '«Dopo averli salutati, Paolo si mise a raccontare dettagliatamente quello che Dio aveva fatto tra i pagani, per mezzo del suo servizio.»',
  note: 'Paolo e i suoi compagni raccontarono tutto a Giacomo e agli anziani, che glorificarono Dio (21:18–20). Pochi giorni dopo Paolo fu afferrato nel tempio e arrestato (21:27–33). Sarebbe arrivato a Roma, come sperava (Romani 15:23–24), ma da prigioniero (Atti 27–28).',
};

export const STOPS = [
  {
    title: 'Di nuovo da Antiochia',
    ref: 'Atti 18:23',
    quote: '«Dopo essersi fermato qui qualche tempo, partì, percorrendo la regione della Galazia e della Frigia successivamente, fortificando tutti i discepoli.»',
    note: 'Dopo un po’ di tempo ad Antiochia, Paolo partì per la terza volta, di nuovo per via di terra, verso le chiese dei primi due viaggi. Gli Atti dedicano a questa parte del viaggio una sola frase prima che Paolo arrivi a Efeso (19:1). Il percorso passa per Tarso e per le Porte Cilicie, come nel secondo viaggio.',
  },
  {
    title: 'La colletta',
    ref: '1 Corinzi 16:1',
    quote: '«Quanto poi alla colletta per i santi, come ho ordinato alle chiese di Galazia, così fate anche voi.»',
    note: 'In questo viaggio Paolo raccolse denaro dalle chiese dei pagani per i credenti poveri di Gerusalemme (Romani 15:25–28; 2 Corinzi 8–9), come gli apostoli gli avevano chiesto di ricordarsi dei poveri (Galati 2:10). Alle chiese della Galazia, come poi ai Corinzi, disse di mettere da parte qualcosa il primo giorno di ogni settimana (1 Corinzi 16:2).',
  },
  {
    title: 'Efeso',
    ref: 'Atti 19:1',
    quote: '«Mentre Apollo era a Corinto, Paolo, dopo aver attraversato le regioni superiori del paese, giunse a Efeso e vi trovò alcuni discepoli.»',
    note: 'Le “regioni superiori” si intendono come la strada dell’altopiano, non quella delle valli; Colossesi 2:1 fa pensare che Paolo non andò mai a Laodicea né a Colosse, perciò il percorso passa a nord di esse. Efeso era la città principale dell’Asia, con il grande tempio di Diana. Paolo trovò una dozzina di discepoli che conoscevano solo il battesimo di Giovanni (19:1–7) e insegnò nella sinagoga per tre mesi (19:8).',
  },
  {
    title: 'Tutta l’Asia udì',
    ref: 'Atti 19:10',
    quote: '«Questo durò due anni. Così tutti coloro che abitavano nell’Asia, Giudei e Greci, udirono la Parola del Signore…»',
    note: 'Quando la sinagoga gli si rivoltò contro, Paolo insegnò ogni giorno nella scuola di Tiranno (19:9). Sorsero chiese in tutta la provincia, alcune fondate da altri: Epafra portò il vangelo a Colosse, Laodicea e Ierapoli (Colossesi 1:7; 4:13). Le sette chiese di Apocalisse 2–3 sono tutte in Asia: Efeso, Smirne, Pergamo, Tiatiri, Sardi, Filadelfia e Laodicea.',
  },
  {
    title: 'Il tumulto',
    ref: 'Atti 19:29',
    quote: '«…la città fu piena di confusione; e trascinando con sé a forza Gaio e Aristarco, macedoni, compagni di viaggio di Paolo, si precipitarono tutti d’accordo verso il teatro.»',
    note: 'Demetrio, un orefice che faceva tempietti di Diana in argento, vide minacciato il suo guadagno e sollevò gli artigiani (19:23–27). Nel teatro la folla gridò le lodi della dea per due ore, finché il segretario della città la calmò (19:34–41). Qui sono disegnate le sue rovine, con posto per circa 25.000 persone. Paolo voleva entrare, ma i discepoli non glielo permisero (19:30).',
  },
  {
    title: 'Una porta aperta a Troas',
    ref: '2 Corinzi 2:12',
    quote: '«Giunto a Troas per il vangelo di Cristo, una porta mi fu aperta dal Signore…»',
    note: 'Dopo il tumulto Paolo partì per la Macedonia (20:1). Le sue lettere completano il cammino: a Troas trovò una porta aperta per il vangelo, ma non ebbe pace, perché Tito, che aveva portato a Corinto una lettera dolorosa, non era tornato (2 Corinzi 2:4, 13). Perciò proseguì. Gli Atti non dicono come andò da Efeso a Troas; il percorso segue la strada per Smirne e Pergamo.',
  },
  {
    title: 'Tito in Macedonia',
    ref: '2 Corinzi 7:6',
    caption: 'Dall’Asia all’Europa',
    quote: '«Ma Dio, che consola gli afflitti, ci consolò con l’arrivo di Tito…»',
    note: 'Anche in Macedonia Paolo non ebbe riposo: combattimenti di fuori, timori di dentro (2 Corinzi 7:5). Poi arrivò Tito con buone notizie da Corinto, e Paolo scrisse 2 Corinzi dalla Macedonia. Le chiese della Macedonia, pur povere, diedero con generosità per la colletta (2 Corinzi 8:1–5).',
  },
  {
    title: 'La Grecia',
    ref: 'Atti 20:2',
    quote: '«Attraversate quelle regioni, rivolgendo molte esortazioni ai discepoli, giunse in Grecia.»',
    note: 'Gli Atti riassumono la Macedonia in una frase; Paolo forse arrivò fino all’Illiria, sull’Adriatico (Romani 15:19). In Grecia si trattenne tre mesi (20:3), probabilmente a Corinto, e lì scrisse la sua lettera ai Romani, portata da Febe, di Cencrea (Romani 16:1). Gli Atti non dicono per dove venne dalla Macedonia; il percorso prende la strada della Tessaglia.',
  },
  {
    title: 'Per i poveri di Gerusalemme',
    ref: 'Romani 15:26',
    quote: '«…la Macedonia e l’Acaia si sono compiaciute di fare una colletta per i poveri che sono tra i santi di Gerusalemme.»',
    note: 'Scrivendo a Roma da Corinto, Paolo spiegò che prima doveva portare l’offerta a Gerusalemme, e chiese di pregare perché fosse gradita (Romani 15:25–31). L’Acaia è la provincia della Grecia a sud della Macedonia, con Corinto capitale. Dopo Gerusalemme sperava di visitare Roma andando in Spagna (15:24, 28).',
  },
  {
    title: 'Di nuovo per la Macedonia',
    ref: 'Atti 20:3',
    quote: '«Qui si trattenne tre mesi. Poi, dato che i Giudei avevano ordito un complotto contro di lui mentre stava per imbarcarsi per la Siria, decise di ritornare attraverso la Macedonia.»',
    note: 'Voleva navigare dalla Grecia direttamente in Siria; invece tornò per la via lunga, per terra, attraverso la Macedonia. Lo accompagnavano uomini delle chiese, forse con la colletta: Sòpatro di Berea, Aristarco e Secondo di Tessalonica, Gaio di Derba, Timoteo, e Tichico e Trofimo dell’Asia (20:4).',
  },
  {
    title: 'Spezzare il pane a Troas',
    ref: 'Atti 20:7',
    caption: 'Dall’Europa di nuovo in Asia',
    quote: '«Il primo giorno della settimana, mentre eravamo riuniti per spezzare il pane, Paolo, dovendo partire il giorno seguente, parlava ai discepoli, e prolungò il discorso fino a mezzanotte.»',
    note: 'Salparono da Filippi dopo i giorni degli Azzimi, arrivarono a Troas in cinque giorni e vi rimasero sette (20:6); da Filippi il racconto torna a dire “noi”. Quella notte un giovane, Eutico, si addormentò sul davanzale di una finestra, cadde dal terzo piano e fu raccolto morto; Paolo lo abbracciò, e lo ricondussero a casa vivo (20:9–12).',
  },
  {
    title: 'A piedi fino ad Asso',
    ref: 'Atti 20:13',
    quote: '«Quanto a noi, che eravamo partiti con la nave, facemmo vela per Asso, dove avevamo intenzione di prendere a bordo Paolo; perché egli aveva stabilito così, volendo fare quel tragitto a piedi.»',
    note: 'Paolo camminò circa 35 km attraverso il promontorio, mentre gli altri lo giravano per mare. Ad Asso lo presero a bordo e proseguirono fino a Mitilene, nell’isola di Lesbo (20:14).',
  },
  {
    title: 'Chio, Samo, Mileto',
    ref: 'Atti 20:15',
    quote: '«Di là, navigando, arrivammo il giorno dopo di fronte a Chio; il giorno seguente approdammo a Samo, e… il giorno dopo giungemmo a Mileto.»',
    note: 'Oltrepassarono Efeso, perché Paolo si affrettava per essere a Gerusalemme, se possibile, il giorno della Pentecoste (20:16). Ogni giorno di navigazione finiva su un’isola o in un porto, come facevano le navi di cabotaggio.',
  },
  {
    title: 'L’addio a Mileto',
    ref: 'Atti 20:38',
    quote: '«…dolenti soprattutto perché aveva detto loro che non avrebbero più rivisto la sua faccia; e lo accompagnarono alla nave.»',
    note: 'Da Mileto Paolo mandò a chiamare gli anziani della chiesa di Efeso, a circa 50 km, e parlò loro dei suoi anni con loro, di ciò che lo aspettava e del gregge che dovevano pascere (20:17–35). Poi si inginocchiò e pregò con tutti loro (20:36). Il porto di Mileto, come quello di Efeso, si è insabbiato da allora.',
  },
  {
    title: 'Cos, Rodi, Patara',
    ref: 'Atti 21:1',
    quote: '«Dopo esserci separati da loro, salpammo e giungemmo direttamente a Cos, il giorno seguente a Rodi e di là a Patara.»',
    note: 'Ogni giorno finiva su un’isola o in un porto. A Patara, sulla costa della Licia, trovarono una nave diretta in Fenicia e salirono a bordo (21:2): una nave più grande, d’alto mare, che attraversava diritta invece di seguire la costa.',
  },
  {
    title: 'A sud di Cipro, fino a Tiro',
    ref: 'Atti 21:3',
    quote: '«Giunti in vista di Cipro, e lasciatala a sinistra, navigammo verso la Siria e approdammo a Tiro, perché qui si doveva scaricare la nave.»',
    note: 'La traversata di circa 650 km passò a sud di Cipro, dove era cominciato il primo viaggio di Paolo. A Tiro rimasero sette giorni con i discepoli, che per lo Spirito dicevano a Paolo di non salire a Gerusalemme; alla partenza tutta la chiesa, con le mogli e i figli, li accompagnò, e si inginocchiarono sulla spiaggia a pregare (21:4–5).',
  },
  {
    title: 'Cesarea',
    ref: 'Atti 21:13',
    quote: '«Paolo allora rispose: “Che fate voi, piangendo e spezzandomi il cuore? Sappiate che io sono pronto non solo a essere legato, ma anche a morire a Gerusalemme per il nome del Signore Gesù”.»',
    note: 'Da Tiro navigarono fino a Tolemaide, e il giorno dopo arrivarono a Cesarea, in casa di Filippo l’evangelista (21:7–8). Il profeta Agabo prese la cintura di Paolo, se ne legò i piedi e le mani e disse che così i Giudei di Gerusalemme avrebbero legato l’uomo a cui apparteneva (21:10–11). Tutti supplicarono Paolo di non salire; questa fu la sua risposta.',
  },
  {
    title: 'Gerusalemme',
    ref: 'Atti 21:17',
    quote: '«Arrivati a Gerusalemme, i fratelli ci accolsero festosamente.»',
    note: 'Da Cesarea a Gerusalemme ci sono circa 100 km, in salita sui monti. Alcuni discepoli di Cesarea andarono con loro e li condussero in casa di Mnasone di Cipro, discepolo di vecchia data, presso il quale dovevano alloggiare (21:16). Gli Atti nominano la colletta una sola volta, quando Paolo dice più tardi di essere venuto a portare elemosine alla sua nazione (24:17).',
  },
];
