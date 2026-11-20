// Italian text for "Nehemiah's Wall", merged over data.js (see addLanguage in
// ../../i18n.js). Same shape as data.js, text fields only. There is one version,
// the Nuova Riveduta 2006 (nr2006, as on Bible Gateway), so every field is a plain
// string. STOPS line up with data.js by position.
//
// Quotations are verbatim, in «…». Names follow the NR2006 (Eliasib, Mesullam,
// Mispa). In Neemia 3 it has "intelaiatura" for the beams, "battenti" for the
// doors and "serrature e sbarre" for the bolts and bars; Ophel is "la collina",
// the Inspection Gate the "porta di Ammifcad", and in 3:8 the builders "left
// Jerusalem as it was" up to the Broad Wall.

export const GATES = {
  sheep: { name: 'Porta delle Pecore', repair: 'Costruita' },
  fish: { name: 'Porta dei Pesci', repair: 'Costruita' },
  old: { name: 'Porta Vecchia', repair: 'Restaurata' },
  valley: { name: 'Porta della Valle', repair: 'Restaurata e costruita' },
  dung: { name: 'Porta del Letame', repair: 'Restaurata e costruita' },
  fountain: { name: 'Porta della Sorgente', repair: 'Restaurata e costruita' },
  water: { name: 'Porta delle Acque', repair: 'Non si dice che fu restaurata' },
  horse: { name: 'Porta dei Cavalli', repair: 'I sacerdoti lavorarono al di sopra' },
  east: { name: 'Porta orientale', repair: 'È nominato solo il suo guardiano' },
  muster: { name: 'Porta di Ammifcad', repair: 'I lavori arrivarono di fronte' },
};

export const TOWERS = {
  meah: { name: 'Torre di Mea' },
  hananel: { name: 'Torre di Cananeel' },
  ovens: { name: 'Torre dei Forni' },
  kingtower: { name: 'Torre superiore del palazzo del re' },
  greattower: { name: 'Grande torre sporgente' },
  corner2: { name: 'Piano superiore dell’angolo' },
};

export const FEATURES = {
  temple: { name: 'Il tempio' },
  broadWall: { name: 'Muro largo' },
  poolSiloam: { name: 'Serbatoio di Siloe' },
  kingsGarden: { name: 'Giardino del re' },
  stairs: { name: 'Scalinata della città di Davide' },
  tombs: { name: 'Tombe di Davide' },
  artificialPool: { name: 'Il serbatoio costruito' },
  mighty: { name: 'Casa dei prodi' },
  armory: { name: 'Arsenale' },
  eliashib: { name: 'Casa del sommo sacerdote Eliasib' },
  angle: { name: 'L’angolo' },
  kingsHouse: { name: 'Palazzo del re e cortile della prigione' },
  gihon: { name: 'Sorgente di Ghion' },
  ophel: { name: 'Ofel' },
  cityOfDavid: { name: 'Città di Davide' },
  kidron: { name: 'Torrente Chidron' },
  kidronN: { name: 'Torrente Chidron' },
  hinnom: { name: 'Valle di Innom' },
  olives: { name: 'Monte degli Ulivi' },
};

// The gate-part chips, in the NR2006's words.
export const PARTS = {
  beams: 'Intelaiatura',
  doors: 'Battenti',
  bolts: 'Serrature',
  bars: 'Sbarre',
  covered: 'Coperta',
  consecrated: 'Consacrata',
};

export const INTRO = {
  title: 'Gerusalemme, 445 a.C.',
  ref: 'Neemia 1–3',
  quote: '«…le mura di Gerusalemme restano in rovina e le sue porte sono consumate dal fuoco.» (1:3)',
  note: 'Neemia, coppiere del re Artaserse, tornò in una città in rovina. Il capitolo 3 elenca, in ordine, chi ricostruì ogni tratto delle mura, in senso antiorario a partire dalla porta delle Pecore. Questa visita segue quell’elenco, e le mura risorgono al nostro passaggio.',
  aside: 'Il circuito mostrato è quello della città più piccola del dopo esilio: il colle della città di Davide e il monte del tempio. Le posizioni sono approssimative.',
};

export const FINALE = {
  title: 'Le mura sono finite',
  ref: 'Neemia 6:15–16',
  quote: '«Le mura furono portate a termine il venticinquesimo giorno di Elul, in cinquantadue giorni.»',
  note: 'I nemici “riconobbero che quest’opera si era compiuta con l’aiuto del nostro Dio” (6:16). Ogni famiglia restaurò il tratto vicino alla propria casa, e l’intero circuito fu finito in meno di due mesi, quasi tutto con il calcare che stava fra le macerie.',
};

export const STOPS = [
  {
    title: 'La porta delle Pecore',
    quote: '«Eliasib, sommo sacerdote, si mise al lavoro con i suoi fratelli sacerdoti e insieme costruirono la porta delle Pecore; la consacrarono e vi misero i battenti…»',
    note: 'I sacerdoti cominciarono dalla porta più vicina al tempio, da cui entravano le pecore per i sacrifici. Vi si mettono i battenti, ma non si parla di serrature né di sbarre. È l’unica porta che il testo dice consacrata.',
    builders: 'Il sommo sacerdote Eliasib e i sacerdoti',
  },
  {
    title: 'Le torri di Mea e di Cananeel',
    quote: '«…continuarono a costruire fino alla torre di Mea, che consacrarono, e fino alla torre di Cananeel.»',
    note: 'Il lato nord non aveva una valle profonda a proteggerlo, perciò era difeso da torri. La consacrazione arrivò fin qui. Poi lavorarono gli uomini di Gerico, e accanto a loro Zaccur, figlio d’Imri.',
    builders: 'I sacerdoti · uomini di Gerico · Zaccur',
  },
  {
    title: 'La porta dei Pesci',
    quote: '«I figli di Senaa costruirono la porta dei Pesci, ne fecero l’intelaiatura e vi misero i battenti, le serrature e le sbarre.»',
    note: 'Probabilmente si chiamava così per il commercio del pesce (gente di Tiro vendeva pesce a Gerusalemme, 13:16). È la prima porta descritta per intero: intelaiatura, battenti, serrature e sbarre. Poi vennero Meremot, Mesullam, Sadoc e i Tecoiti, “di cui i più importanti non vollero sottomettersi a lavorare”.',
    builders: 'I figli di Senaa',
  },
  {
    title: 'La porta Vecchia',
    quote: '«Ioiada, figlio di Pasea, e Mesullam, figlio di Besodeia, restaurarono la porta Vecchia; ne fecero l’intelaiatura e vi misero i battenti, le serrature e le sbarre.»',
    note: 'Il nome ebraico è Iesana, “vecchia”. Può riferirsi alla porta della città vecchia o alla strada per il villaggio di Iesana. Come la porta dei Pesci, riceve intelaiatura, battenti, serrature e sbarre.',
    builders: 'Ioiada, figlio di Pasea, e Mesullam, figlio di Besodeia',
  },
  {
    title: 'Il muro largo',
    quote: '«Essi lasciarono Gerusalemme com’era, fino al muro largo.»',
    note: 'Qui lavorarono uomini di Gabaon e di Mispa, con Uzziel, uno degli orefici, e Anania, uno dei profumieri. L’ebraico è oscuro: la NR2006 dice che lasciarono la città com’era, altre versioni che la restaurarono. Avigad scavò sulla collina occidentale un “muro largo” spesso 7 m, dei giorni di Ezechia, e si discute se la linea di Neemia arrivasse fin là. Qui compare in una posizione semplificata.',
    builders: 'Uomini di Gabaon e di Mispa · Uzziel · Anania',
  },
  {
    title: 'La torre dei Forni',
    quote: '«Malchia, figlio di Carim, e Cassub, figlio di Paat-Moab, restaurarono un’altra parte delle mura e la torre dei Forni.»',
    note: 'Forse si chiamava così per i forni dei fornai (si veda la via dei fornai, Gr 37:21). Lì vicino lavorarono i capi delle due metà del distretto di Gerusalemme. Sallum lavorò qui “con le sue figlie”.',
    builders: 'Refaia · Iedaia · Cattus · Malchia · Cassub · Sallum e le sue figlie',
  },
  {
    title: 'La porta della Valle',
    quote: '«Canun e gli abitanti di Zanoà restaurarono la porta della Valle; la costruirono, vi misero i battenti, le serrature e le sbarre. Fecero inoltre mille cubiti di muro fino alla porta del Letame.»',
    note: 'L’ispezione notturna di Neemia cominciò qui (2:13). Nel 1927 Crowfoot e FitzGerald scavarono una porta nel muro occidentale della città di Davide che molti identificano con questa. Mille cubiti sono circa 450–500 m.',
    builders: 'Canun e gli abitanti di Zanoà',
  },
  {
    title: 'La porta del Letame',
    quote: '«Malchia, figlio di Recab, capo del distretto di Bet-Accherem, restaurò la porta del Letame; la costruì, vi mise i battenti, le serrature, le sbarre.»',
    note: 'Da questa porta si portavano fuori i rifiuti. Era vicino alla punta meridionale, sopra la valle di Innom, dove i rifiuti venivano gettati. Abbiamo appena percorso i mille cubiti dalla porta della Valle.',
    builders: 'Malchia, figlio di Recab, capo di Bet-Accherem',
  },
  {
    title: 'La porta della Sorgente',
    quote: '«Sallum, figlio di Col-Oze, capo del distretto di Mispa, restaurò la porta della Sorgente; la costruì, la coperse, vi mise i battenti, le serrature e le sbarre.»',
    note: 'È l’unica porta che il testo dice coperta. Ha anche battenti, serrature e sbarre. Si chiamava così per le sorgenti d’acqua ai piedi del colle.',
    builders: 'Sallum, figlio di Col-Oze, capo di Mispa',
  },
  {
    title: 'Il serbatoio di Siloe e il giardino del re',
    quote: '«Fece inoltre il muro del serbatoio di Siloe, presso il giardino del re…»',
    note: 'Il tunnel di Ezechia portava l’acqua dalla sorgente di Ghion fino a questa punta della città (2 Re 20:20). Il giardino del re era più in basso, dove si incontrano il Chidron e la valle di Innom. Secoli dopo Gesù mandò un cieco a lavarsi in questa vasca (Gv 9:7).',
    builders: 'Sallum',
  },
  {
    title: 'La scalinata della città di Davide',
    quote: '«…fino alla scalinata che scende dalla città di Davide.»',
    note: 'Qui il racconto volta a nord, lungo il lato orientale. Kenyon scoprì che il muro del dopo esilio seguiva la cresta del colle, ben sopra il vecchio muro sul pendio, le cui terrazze crollate Neemia non riuscì ad attraversare con la sua cavalcatura (2:14).',
    builders: 'Sallum',
  },
  {
    title: 'Di fronte alle tombe di Davide',
    quote: '«Dopo di lui Neemia, figlio di Azbuc, capo della metà del distretto di Bet-Zur, lavorò alle riparazioni sino di fronte alle tombe di Davide…»',
    note: 'È un altro Neemia, capo della metà del distretto di Bet-Zur. Davide fu sepolto nella città di Davide (1 Re 2:10). Negli scavi di Weill del 1913–14 apparvero qui tombe a galleria scavate nella roccia, che alcuni propongono come le tombe reali.',
    builders: 'Neemia, figlio di Azbuc',
  },
  {
    title: 'Il serbatoio costruito',
    quote: '«…fino al serbatoio che era stato costruito…»',
    note: 'Un bacino fatto dall’uomo, diverso dal serbatoio di Siloe. Può essere legato alle opere idrauliche dei giorni di Ezechia (Is 22:9–11). Non si sa con precisione dove fosse.',
    builders: 'Neemia, figlio di Azbuc',
  },
  {
    title: 'La casa dei prodi',
    quote: '«…e fino alla casa dei prodi.»',
    note: 'Forse la caserma dei guerrieri di Davide, i suoi valorosi (2 Sam 23:8). Poi vennero i Leviti sotto Reum, e poi Casabia e Bavvai, per i loro distretti di Cheila.',
    builders: 'Neemia, figlio di Azbuc · Leviti · Casabia · Bavvai',
  },
  {
    title: 'L’arsenale',
    quote: '«…e accanto a lui Ezer, figlio di Iesua, capo di Mispa, restaurò un’altra parte delle mura, di fronte alla salita dell’arsenale, all’angolo.»',
    note: 'Ezer, capo di Mispa, restaurò un’altra parte. Qui il muro cambia direzione, all’“angolo”, una piega o un contrafforte del suo tracciato.',
    builders: 'Ezer, figlio di Iesua, capo di Mispa',
  },
  {
    title: 'La casa di Eliasib',
    quote: '«Dopo di lui Baruc, figlio di Zabbai, ne restaurò con ardore un’altra parte, dall’angolo fino alla porta della casa di Eliasib, il sommo sacerdote.»',
    note: 'Dopo Baruc, Meremot lavorò dalla porta della casa di Eliasib fino alla sua estremità. Qui abitava il sommo sacerdote che aveva cominciato alla porta delle Pecore.',
    builders: 'Baruc, figlio di Zabbai · Meremot, figlio di Uria',
  },
  {
    title: 'La svolta e l’angolo',
    quote: '«Dopo di lui Binnui, figlio di Chenadad, restaurò un’altra parte delle mura, dalla casa di Azaria fino alla svolta e fino all’angolo.»',
    note: 'Qui lavorarono i sacerdoti delle campagne circostanti, e poi Beniamino, Cassub e Azaria, ciascuno di fronte alla propria casa. Ognuno custodiva la propria dimora. Binnui finì all’angolo.',
    builders: 'Sacerdoti delle campagne · Beniamino · Cassub · Azaria · Binnui',
  },
  {
    title: 'La torre del palazzo del re',
    quote: '«Palal, figlio d’Uzai, lavorò di fronte alla svolta e alla torre superiore che sporge dal palazzo del re e che dà sul cortile della prigione.»',
    note: 'Una torre sporgeva dal vecchio palazzo reale, vicino al cortile della prigione dove fu rinchiuso Geremia (Gr 32:2). Eilat Mazar ha collegato grandi strutture di questo colle al palazzo e al muro di Neemia. Entrambe le proposte sono discusse.',
    builders: 'Palal, figlio d’Uzai · Pedaia, figlio di Paros',
  },
  {
    title: 'Ofel e la porta delle Acque',
    quote: '«I Netinei che abitavano sulla collina lavorarono fino di fronte alla porta delle Acque, verso oriente…»',
    note: 'I Netinei, i servi del tempio, abitavano sulla collina, l’Ofel. Non si dice che la porta delle Acque fu restaurata. Il lavoro arrivò solo fino di fronte a essa, perciò compare in piedi, con i battenti, come se non avesse bisogno di riparazioni. Scendeva verso la sorgente di Ghion. Più tardi Esdra lesse la legge sulla piazza davanti a essa (8:1).',
    builders: 'I Netinei',
  },
  {
    title: 'La grande torre e il muro della collina',
    quote: '«Dopo di loro i Tecoiti ne restaurarono un’altra parte, di fronte alla grande torre sporgente e fino al muro della collina.»',
    note: 'La gente comune di Tecoa si prese un secondo tratto, benché i più importanti fra loro non avessero voluto lavorare (3:5).',
    builders: 'I Tecoiti',
  },
  {
    title: 'La porta dei Cavalli',
    quote: '«I sacerdoti lavorarono alle riparazioni al di sopra della porta dei Cavalli, ciascuno di fronte alla propria casa.»',
    note: 'Per questa porta non si registrano battenti, serrature né sbarre. Geremia la pone verso oriente (Gr 31:40). Può essere legata all’ingresso dei cavalli nel palazzo (2 Re 11:16).',
    builders: 'I sacerdoti',
  },
  {
    title: 'La porta orientale',
    quote: '«Dopo di lui lavorò Semaia, figlio di Secania, guardiano della porta orientale.»',
    note: 'Sadoc, figlio d’Immer, lavorò di fronte alla sua casa, e dopo di lui Semaia. Semaia è il guardiano della porta, ma non si dice che la porta stessa fu ricostruita. Dava sul Chidron, a oriente del tempio.',
    builders: 'Sadoc, figlio d’Immer · Semaia · Anania · Canun · Mesullam',
  },
  {
    title: 'La porta di Ammifcad',
    quote: '«Dopo di lui Malchia, uno degli orefici, lavorò fino alle case dei Netinei e dei mercanti, di fronte alla porta di Ammifcad…»',
    note: 'Il nome ebraico, Mifcad, significa adunata, rassegna o ispezione. I lavori arrivarono fino alle case dei Netinei e dei mercanti, di fronte a essa. Non si parla dei suoi battenti.',
    builders: 'Malchia, uno degli orefici',
  },
  {
    title: 'Il piano superiore dell’angolo',
    quote: '«…e fino al piano superiore dell’angolo.»',
    note: 'Probabilmente una stanza di guardia sull’angolo nord-orientale, che dominava il Chidron.',
    builders: 'Malchia, uno degli orefici',
  },
  {
    title: 'Di nuovo alla porta delle Pecore',
    quote: '«Gli orefici e i mercanti lavorarono alle riparazioni fra il piano superiore dell’angolo e la porta delle Pecore.»',
    note: 'Gli orefici e i mercanti chiusero l’ultima breccia, presso la porta dove il circuito era cominciato. Le mura sono complete.',
    builders: 'Gli orefici e i mercanti',
  },
];
