// Italian text for "Paul's First Missionary Journey", merged over data.js (see
// addLanguage in ../../i18n.js). Same shape as data.js, text fields only. One
// version, the Nuova Riveduta 2006 (nr2006), so every field is a plain string.
// STOPS line up with data.js by position. Place names follow the NR2006 (Seleucia,
// Pafo, Perga, Iconio, Derba, Attalia, Antiochia di Pisidia); at Listra it has
// Giove and Mercurio for Zeus and Hermes.
//
// Quotations are verbatim, in «…»; speech inside a quotation is in “…”, and in
// ‘…’ inside that.

export const TERMS = {
  zeus: 'Giove',
  hermes: 'Mercurio',
  proconsul: 'proconsole',
};

export const PLACES = {
  antioch: { name: 'Antiochia' },
  seleucia: { name: 'Seleucia' },
  salamis: { name: 'Salamina' },
  paphos: { name: 'Pafo' },
  perga: { name: 'Perga' },
  antiochP: { name: 'Antiochia di Pisidia' },
  iconium: { name: 'Iconio' },
  lystra: { name: 'Listra' },
  derbe: { name: 'Derba' },
  attalia: { name: 'Attalia' },
};

export const FEATURES = {
  tarsus: { name: 'Tarso' },
  zeus: { name: 'Tempio di Giove' },
  syria: { name: 'Siria' },
  cilicia: { name: 'Cilicia' },
  cyprus: { name: 'Cipro' },
  pamphylia: { name: 'Panfilia' },
  pisidia: { name: 'Pisidia' },
  lycaonia: { name: 'Licaonia' },
  galatia: { name: 'Galazia' },
  taurus: { name: 'Monti del Tauro' },
  sea: { name: 'Mar Mediterraneo' },
};

export const INTRO = {
  title: 'Messi da parte per l’opera',
  ref: 'Atti 13:2',
  quote: '«Mentre celebravano il culto del Signore e digiunavano, lo Spirito Santo disse: “Mettetemi da parte Barnaba e Saulo per l’opera alla quale li ho chiamati”.»',
  note: 'La chiesa di Antiochia di Siria, dove per la prima volta i discepoli furono chiamati cristiani (11:26), aveva profeti e dottori: Barnaba, Simeone detto Niger, Lucio di Cirene, Manaem e Saulo (13:1). Due di loro furono mandati, probabilmente alla fine degli anni 40 d.C., in un viaggio di circa 2.000 km per mare e a piedi: attraverso Cipro, su per i monti del Tauro fino all’altopiano dell’Asia Minore, e ritorno. Atti 13–14 racconta il viaggio; le lettere di Paolo aggiungono qualcosa.',
  aside: 'Il rilievo è reale, ricavato da dati altimetrici moderni, con le altezze moltiplicate per tre perché i monti si vedano; la costa è quella di oggi. Gli Atti non dicono per quali strade andarono, perciò i percorsi via terra seguono il passaggio più facile fra i luoghi nominati, e quelli via mare sono un’ipotesi. Le città e la nave sono disegnate molto più grandi del vero. Non compaiono persone.',
};

export const FINALE = {
  title: 'La porta della fede',
  ref: 'Atti 14:27',
  quote: '«Giunti là e riunita la chiesa, riferirono tutte le cose che Dio aveva compiute per mezzo di loro e come aveva aperto la porta della fede agli stranieri.»',
  note: 'Rimasero parecchio tempo con i discepoli ad Antiochia (14:28). La questione sollevata da questo viaggio, se gli stranieri che credevano dovessero essere circoncisi e osservare la legge di Mosè, portò presto Paolo e Barnaba a Gerusalemme, dove gli apostoli e gli anziani riconobbero che Dio aveva purificato mediante la fede il cuore degli stranieri come quello dei Giudei (15:1–11). Più tardi Paolo ripartì, per visitare i fratelli in tutte le città dove avevano annunciato la Parola (15:36).',
};

export const STOPS = [
  {
    title: 'Partiti da Antiochia',
    ref: 'Atti 13:3',
    quote: '«Allora, dopo aver digiunato, pregato e imposto loro le mani, li lasciarono partire.»',
    note: 'Antiochia, sul fiume Oronte, era la capitale della provincia romana di Siria e una delle grandi città dell’impero. Barnaba vi aveva portato Saulo da Tarso (11:25–26), e i due erano appena tornati da Gerusalemme, dove avevano portato un soccorso per la carestia, con Giovanni detto Marco (12:25). Ora la chiesa impone loro le mani e li lascia partire.',
  },
  {
    title: 'Verso Seleucia',
    ref: 'Atti 13:4',
    quote: '«Essi dunque, mandati dallo Spirito Santo, scesero a Seleucia, e di là salparono verso Cipro.»',
    note: 'Seleucia di Pieria era il porto di Antiochia, sul mare, vicino alla foce dell’Oronte. Barnaba era un levita cipriota di nascita (4:36), perciò l’isola era un buon punto di partenza. Gli Atti non descrivono la nave; i viaggiatori si imbarcavano su navi mercantili, e quella disegnata qui è un piccolo mercantile romano dell’epoca.',
  },
  {
    title: 'Salamina',
    ref: 'Atti 13:5',
    quote: '«Giunti a Salamina, annunciarono la Parola di Dio nelle sinagoghe dei Giudei; e avevano con loro Giovanni come aiutante.»',
    note: 'Salamina, sulla costa orientale, a circa 200 km da Seleucia, era la città più grande dell’isola, con abbastanza Giudei per più di una sinagoga. Da allora in poi Paolo avrebbe lavorato così: prima nella sinagoga (13:14; 14:1). Giovanni è Giovanni Marco, cugino di Barnaba (Colossesi 4:10), nella cui casa materna a Gerusalemme si riuniva la chiesa (12:12).',
  },
  {
    title: 'Attraverso tutta l’isola',
    ref: 'Atti 13:6',
    quote: '«Poi, attraversata tutta l’isola fino a Pafo, trovarono un tale, mago e falso profeta giudeo, di nome Bar-Gesù…»',
    note: 'Da Salamina a Pafo ci sono circa 160 km. Gli Atti non dicono per dove passarono; di solito si suppone la strada costiera, per Cizio, Amatunte e Curio, e il percorso la segue, ai piedi dei monti Troodos. Cipro era una provincia senatoria, governata da un proconsole, e Luca gli dà il titolo esatto (13:7).',
  },
  {
    title: 'Il proconsole crede',
    ref: 'Atti 13:12',
    quote: '«Allora il proconsole, visto quello che era accaduto, credette, colpito dalla dottrina del Signore.»',
    note: 'Pafo (la Nuova Pafo) era la capitale, dove risiedeva il proconsole Sergio Paolo. Egli chiamò Barnaba e Saulo per ascoltare la Parola di Dio, ma il mago Elima, che stava con lui, cercava di distoglierlo dalla fede. Saulo, detto anche Paolo, annunciò che sarebbe rimasto cieco per un certo tempo, e così fu (13:7–11). Da qui in poi Luca lo chiama Paolo e lo nomina per primo.',
  },
  {
    title: 'Perga di Panfilia',
    ref: 'Atti 13:13',
    quote: '«Paolo e i suoi compagni, imbarcatisi a Pafo, arrivarono a Perga di Panfilia; ma Giovanni, separatosi da loro, ritornò a Gerusalemme.»',
    note: 'La traversata da Pafo alla costa della Panfilia è di circa 250 km. Perga stava a circa 12 km dal mare, sul fiume Cestro, che le barche potevano risalire; il percorso arriva alla sua foce. Qui Giovanni Marco tornò a casa. Gli Atti non dicono perché, ma Paolo non lo dimenticò, e più tardi lui e Barnaba si separarono per questo (15:37–39). Anni dopo Paolo chiese di nuovo Marco, perché gli era molto utile (2 Timoteo 4:11).',
  },
  {
    title: 'Attraverso il Tauro',
    ref: '2 Corinzi 11:26',
    quote: '«Spesso in viaggio, in pericolo sui fiumi, in pericolo per i briganti, in pericolo da parte dei miei connazionali, in pericolo da parte degli stranieri, in pericolo nelle città, in pericolo nei deserti, in pericolo sul mare…»',
    note: 'Da Perga ad Antiochia di Pisidia ci sono circa 160 km, su per le gole del Tauro fino a un altopiano a più di 1.000 m. Gli Atti non dicono nulla della strada (13:14). Paolo scrisse questo elenco anni dopo, di tutti i suoi viaggi, ma fiumi in piena e briganti erano pericoli noti su questi monti, e molti hanno pensato a questa strada. Alcuni collegano la salita alla malattia di cui parla in Galati 4:13.',
  },
  {
    title: 'Antiochia di Pisidia',
    ref: 'Atti 13:14',
    quote: '«Essi, passando oltre Perga, giunsero ad Antiochia di Pisidia; ed entrati di sabato nella sinagoga, si sedettero.»',
    note: 'Questa Antiochia, vicino alla Pisidia, su un colle a circa 1.100 m, era una colonia romana, popolata con veterani delle legioni al tempo di Augusto. Dopo la lettura della legge e dei profeti, i capi della sinagoga chiesero ai visitatori una parola di esortazione (13:15), e Paolo si alzò a parlare: dall’esodo e da Davide fino a Gesù, risuscitato dai morti, per mezzo del quale è annunciato il perdono dei peccati (13:16–41).',
  },
  {
    title: 'Luce dei popoli',
    ref: 'Atti 13:47',
    quote: '«Così infatti ci ha ordinato il Signore, dicendo: “Io ti ho posto come luce dei popoli, perché tu porti la salvezza fino alle estremità della terra”.»',
    note: 'Il sabato seguente quasi tutta la città si radunò per udire. Quando alcuni dei Giudei si opposero, Paolo e Barnaba si rivolsero agli stranieri, con queste parole di Isaia 49:6. Gli stranieri si rallegrarono, e la Parola del Signore si diffondeva per tutta la regione (13:44–49). Poi le donne pie e ragguardevoli e i notabili della città furono istigati contro di loro, e furono cacciati; scossero la polvere dei piedi e andarono a Iconio (13:50–51).',
  },
  {
    title: 'Iconio',
    ref: 'Atti 14:1',
    quote: '«Anche a Iconio Paolo e Barnaba entrarono nella sinagoga dei Giudei e parlarono in modo tale che una gran folla di Giudei e di Greci credette.»',
    note: 'Iconio, l’odierna Konya, stava circa 140 km a est, al margine della grande pianura della Licaonia. Vi rimasero molto tempo, predicando con franchezza, e il Signore rendeva testimonianza alla Parola con segni e prodigi (14:3). Ma la città si divise, e quando seppero di un piano per lapidarli fuggirono a Listra e Derba, città della Licaonia, e nei dintorni (14:4–7).',
  },
  {
    title: 'Gli dèi sono scesi',
    ref: 'Atti 14:11',
    quote: '«La folla, veduto ciò che Paolo aveva fatto, alzò la voce, dicendo in lingua licaonica: “Gli dèi hanno preso forma umana e sono scesi fino a noi”.»',
    note: 'Listra, una piccola colonia romana, stava circa 30 km a sud di Iconio. Paolo guarì un uomo zoppo dalla nascita, e la folla chiamò Barnaba Giove e Paolo Mercurio, perché era lui che teneva il discorso (14:8–12). Il sacerdote di Giove, il cui tempio era all’entrata della città, condusse davanti alle porte tori e ghirlande per offrire loro un sacrificio, e i due si strapparono le vesti e a stento lo impedirono (14:13–18). Non si sa dove fosse il tempio; è disegnato lungo la strada.',
  },
  {
    title: 'Lapidato a Listra',
    ref: 'Atti 14:19',
    quote: '«Allora giunsero da Antiochia e da Iconio alcuni Giudei, i quali sobillarono la folla; essi lapidarono Paolo e lo trascinarono fuori dalla città, credendolo morto.»',
    note: 'Ma mentre i discepoli gli venivano attorno, egli si rialzò ed entrò nella città, e il giorno seguente partì con Barnaba per Derba (14:20). Anni dopo Paolo lo contava fra le sue sofferenze: una volta fu lapidato (2 Corinzi 11:25). A Timoteo ricordò ciò che gli accadde ad Antiochia, a Iconio e a Listra, e come il Signore lo liberò da tutto (2 Timoteo 3:11). Timoteo era di Listra (16:1).',
  },
  {
    title: 'Derba',
    ref: 'Atti 14:21',
    quote: '«E, dopo aver evangelizzato quella città e fatto molti discepoli, se ne tornarono a Listra, a Iconio e ad Antiochia…»',
    note: 'Derba, circa 90 km a est di Listra, fu il punto più lontano del viaggio. Il suo sito è noto solo da iscrizioni con il nome della città trovate a nord-est di Karaman, e se ne discute ancora; è disegnata lì. Da Derba la strada per le Porte Cilicie fino a Tarso e a casa era più breve, ma tornarono indietro, nelle città da cui erano stati cacciati.',
  },
  {
    title: 'Fortificando i discepoli',
    ref: 'Atti 14:22',
    quote: '«…fortificando gli animi dei discepoli ed esortandoli a perseverare nella fede, dicendo loro che dobbiamo entrare nel regno di Dio attraverso molte tribolazioni.»',
    note: 'Tornarono per la strada da cui erano venuti, per Listra e Iconio, dove Paolo era stato lapidato e i due erano stati minacciati, per fortificare i nuovi credenti. Ciò che dissero loro non fu che seguire Gesù sarebbe stato facile.',
  },
  {
    title: 'Anziani in ogni chiesa',
    ref: 'Atti 14:23',
    quote: '«Dopo aver designato per loro degli anziani in ciascuna chiesa, e aver pregato e digiunato, li raccomandarono al Signore, nel quale avevano creduto.»',
    note: 'In ogni città lasciarono i credenti con le loro guide, e lo fecero come la chiesa di Antiochia aveva mandato loro, con preghiera e digiuno (13:3). Poi li affidarono al Signore. Di nuovo ad Antiochia di Pisidia, erano ripassati per tutte e quattro le città.',
  },
  {
    title: 'Le chiese della Galazia',
    ref: 'Galati 4:13',
    quote: '«…sapete bene che fu a motivo di una malattia che vi evangelizzai la prima volta…»',
    note: 'Le quattro città erano nella provincia romana di Galazia. Molti pensano che la lettera di Paolo “alle chiese della Galazia” (Galati 1:2) fosse scritta a loro, e che qui egli ricordi questa prima visita, quando lo accolsero anche se era malato. Altri pensano che la lettera fosse per i popoli galati più a nord, che visitò più tardi (16:6). In ogni caso la malattia non è nominata.',
  },
  {
    title: 'Perga e Attalia',
    ref: 'Atti 14:25',
    quote: '«Dopo aver annunciato la Parola a Perga, scesero ad Attalia…»',
    note: 'Attraversarono la Pisidia e scesero per i monti in Panfilia (14:24). Questa volta predicarono a Perga, dove all’andata gli Atti non parlano di predicazione, e scesero al porto sulla costa, l’odierna Antalya.',
  },
  {
    title: 'Di nuovo ad Antiochia',
    ref: 'Atti 14:26',
    quote: '«…e di là salparono verso Antiochia, da dove erano stati raccomandati alla grazia di Dio per l’opera che avevano compiuta.»',
    note: 'Da lì sono circa 500 km per mare fino a Seleucia, lungo la costa della Cilicia e il nord di Cipro, e poi, risalendo l’Oronte, fino ad Antiochia. Erano stati via forse uno o due anni; gli Atti non danno date. L’opera per cui erano stati messi da parte (13:2) era compiuta.',
  },
];
