// Italian text for "Paul's Voyage to Rome", merged over data.js (see addLanguage in
// ../../i18n.js). Same shape as data.js, text fields only. One version, the Nuova
// Riveduta 2006 (nr2006), so every field is a plain string. STOPS line up with
// data.js by position. Place names follow the NR2006 (Sidone, Mira, Salmone,
// Beiporti, Lasea, Clauda, le Sirti, Reggio, Pozzuoli, Foro Appio, Tre Taverne).
//
// Quotations are verbatim, in «…»; speech inside a quotation is in “…”. Words the
// NR2006 prints in [brackets] are left out with "…" where they can be, and kept
// as printed where they can't.

export const TERMS = {
  cauda: 'Clauda',
  centurion: 'centurione',
};

export const PLACES = {
  caesarea: { name: 'Cesarea' },
  sidon: { name: 'Sidone' },
  myra: { name: 'Mira' },
  cnidus: { name: 'Cnido' },
  fairHavens: { name: 'Beiporti' },
  malta: { name: 'Malta' },
  syracuse: { name: 'Siracusa' },
  rhegium: { name: 'Reggio' },
  puteoli: { name: 'Pozzuoli' },
  forum: { name: 'Foro Appio' },
  taverns: { name: 'Tre Taverne' },
  rome: { name: 'Roma' },
};

export const FEATURES = {
  lasea: { name: 'Lasea' },
  phoenix: { name: 'Fenice' },
  salmone: { name: 'Salmone' },
  cauda: { name: 'Clauda' },
  cyprus: { name: 'Cipro' },
  cilicia: { name: 'Cilicia' },
  pamphylia: { name: 'Panfilia' },
  lycia: { name: 'Licia' },
  crete: { name: 'Creta' },
  achaia: { name: 'Acaia' },
  sicily: { name: 'Sicilia' },
  italy: { name: 'Italia' },
  phoenicia: { name: 'Fenicia' },
  adria: { name: 'Adriatico' },
  syrtis: { name: 'Sirti' },
  sea: { name: 'Mar Mediterraneo' },
};

export const INTRO = {
  title: 'Testimone anche a Roma',
  ref: 'Atti 23:11',
  quote: '«La notte seguente il Signore gli si presentò e disse: “Fatti coraggio [, Paolo], perché come hai reso testimonianza di me a Gerusalemme, così bisogna che tu la renda anche a Roma”.»',
  note: 'Paolo era stato arrestato nel tempio di Gerusalemme (21:27–36). Il Signore gli parlò nella fortezza, la notte dopo che era comparso davanti al sinedrio. Fu portato a Cesarea, tenuto là due anni sotto i governatori Felice e Festo e, da cittadino romano, si appellò a Cesare (24:27; 25:11–12). Così andò a Roma, da prigioniero, verso il 59–60 d.C. Luca era con lui, e il suo racconto del viaggio è una delle testimonianze più dettagliate della navigazione antica.',
  aside: 'Il rilievo è reale, ricavato da dati altimetrici moderni, con le altezze moltiplicate per tre perché i monti si vedano; la costa è quella di oggi. Luca, che navigò con Paolo, nomina i porti e le isole, ma non le rotte fra l’uno e l’altro, perciò i percorsi via mare seguono la via più breve in acque aperte vicino ai luoghi che nomina, e la deriva da Clauda a Malta è disegnata in linea retta. Le città e la nave sono disegnate molto più grandi del vero. Non compaiono persone.',
};

export const FINALE = {
  title: 'Senza impedimento',
  ref: 'Atti 28:31',
  quote: '«…proclamando il regno di Dio e insegnando le cose relative al Signore Gesù Cristo con tutta franchezza e senza impedimento.»',
  note: 'Gli Atti finiscono con Paolo due anni interi a Roma, in una casa presa in affitto, mentre riceve tutti quelli che vanno a trovarlo (28:30). Da lì, secondo molti, scrisse ai Filippesi che la sua prigionia aveva contribuito al progresso del vangelo, tanto che a tutti quelli del pretorio era noto che era in catene per Cristo (Filippesi 1:12–13). Il libro si ferma qui; non racconta come finì il suo processo.',
};

export const STOPS = [
  {
    title: 'Verso l’Italia',
    ref: 'Atti 27:1',
    quote: '«Quando fu deciso che noi salpassimo per l’Italia, Paolo con altri prigionieri furono consegnati a un centurione, di nome Giulio, della coorte Augusta.»',
    note: 'Il racconto torna a dire “noi”: Luca navigò con Paolo, e anche Aristarco, un Macedone di Tessalonica (27:2). Salirono su una nave di Adramitto, un porto vicino a Troas, che doveva toccare i porti della costa d’Asia. Cesarea, la città portuale di Erode, era la sede del governatore romano della Giudea.',
  },
  {
    title: 'Sidone',
    ref: 'Atti 27:3',
    quote: '«Il giorno seguente arrivammo a Sidone; e Giulio, usando benevolenza verso Paolo, gli permise di andare dai suoi amici per ricevere le loro cure.»',
    note: 'Sidone, circa 110 km più a nord lungo la costa, era un antico porto fenicio con dei credenti, forse fin dalla dispersione seguita alla morte di Stefano (11:19). Il centurione Giulio, che più tardi avrebbe salvato la vita a Paolo (27:43), gli permise di scendere a terra a trovare gli amici.',
  },
  {
    title: 'Al riparo di Cipro',
    ref: 'Atti 27:4',
    quote: '«Poi, partiti di là, navigammo al riparo di Cipro, perché i venti erano contrari.»',
    note: 'I venti d’estate soffiano da ovest e da nord-ovest. Perciò la nave si tenne a est e a nord di Cipro, al riparo dell’isola, e poi avanzò verso ovest lungo la costa della Cilicia e della Panfilia, dove le brezze di terra e le correnti aiutavano (27:5). Il percorso disegnato è un’ipotesi di questo genere.',
  },
  {
    title: 'Una nave alessandrina',
    ref: 'Atti 27:6',
    quote: '«Il centurione, trovata qui una nave alessandrina che faceva vela per l’Italia, ci fece salire su quella.»',
    note: 'Mira, in Licia, era un porto sulla rotta del grano dall’Egitto a Roma; con i venti da ovest, le navi di Alessandria risalivano fino alla costa dell’Asia prima di volgere a ovest. Questa portava frumento (27:38) e duecentosettantasei persone (27:37). Le navi della flotta del grano erano grandi: una descritta nel II secolo misurava circa 55 m.',
  },
  {
    title: 'Di fronte a Cnido',
    ref: 'Atti 27:7',
    quote: '«Navigando per molti giorni lentamente, giungemmo a fatica, per l’impedimento del vento, di fronte a Cnido. Poi veleggiammo sotto Creta, al largo di Salmone…»',
    note: 'Cnido stava sulla punta di una lunga penisola, l’ultimo riparo prima dell’Egeo aperto. Con il vento contrario non potevano tenere la rotta per l’Italia, perciò volsero a sud e scesero oltre la punta orientale di Creta, doppiando il capo Salmone, fino al riparo della sua costa meridionale.',
  },
  {
    title: 'Beiporti',
    ref: 'Atti 27:8',
    quote: '«…e, costeggiandola con difficoltà, giungemmo a un luogo detto Beiporti, vicino al quale era la città di Lasea.»',
    note: 'Beiporti si chiama ancora Kali Limenes, una piccola baia sulla costa sud di Creta; alcune rovine vicine sono identificate con Lasea. Si era perso molto tempo, e il giorno del digiuno, il giorno dell’espiazione, a fine settembre o in ottobre, era già passato (27:9). Navigare era pericoloso da metà settembre, e d’inverno ci si fermava del tutto.',
  },
  {
    title: 'L’avvertimento di Paolo',
    ref: 'Atti 27:10',
    quote: '«Uomini, vedo che la navigazione si farà pericolosa con grave danno, non solo del carico e della nave, ma anche delle nostre persone.»',
    note: 'Il centurione si fidò più del pilota e del padrone della nave che delle parole di Paolo. Beiporti non era un porto adatto a svernare, perciò la maggioranza decise di cercare di arrivare a Fenice, un porto di Creta circa 65 km più a ovest, esposto a sud-ovest e a nord-ovest, e di passarvi l’inverno (27:11–12).',
  },
  {
    title: 'L’Euroaquilone',
    ref: 'Atti 27:14',
    quote: '«Ma poco dopo si scatenò giù dall’isola un vento impetuoso, chiamato Euroaquilone…»',
    note: 'Un leggero scirocco li aveva incoraggiati a partire, costeggiando l’isola da vicino (27:13). Poi il vento scese dai monti di Creta, da nord-est. La nave non poteva resistergli, perciò la lasciarono andare alla deriva (27:15). Il nome greco del vento unisce l’Euro, da oriente, e l’Aquilone, da settentrione.',
  },
  {
    title: 'Clauda',
    ref: 'Atti 27:16',
    quote: '«Passati rapidamente sotto un’isoletta chiamata Clauda, a stento potemmo impadronirci della scialuppa.»',
    note: 'Al riparo dell’isola, circa 40 km a sud-ovest, issarono la scialuppa e cinsero lo scafo con delle funi per rinforzarlo. Temendo di incagliarsi nelle Sirti, i banchi di sabbia davanti all’Africa, calarono l’àncora galleggiante e andarono alla deriva (27:17). Nei giorni seguenti gettarono il carico, e poi l’attrezzatura della nave (27:18–19).',
  },
  {
    title: 'Ogni speranza perduta',
    ref: 'Atti 27:20',
    quote: '«Già da molti giorni non si vedevano né sole né stelle, e sopra di noi infuriava una forte tempesta, sicché ogni speranza di scampare era ormai persa.»',
    note: 'Senza sole né stelle una nave non aveva modo di sapere dove fosse. La deriva da Clauda a Malta è di circa 870 km; alla velocità che i navigatori moderni calcolano per una nave alla deriva in una tempesta, richiede circa tredici giorni, il che corrisponde alle quattordici notti di 27:27. Il percorso è disegnato come una deriva in linea retta.',
  },
  {
    title: 'Paolo, non temere',
    ref: 'Atti 27:23–24',
    quote: '«Poiché un angelo del Dio al quale appartengo, e che io servo, mi è apparso questa notte, dicendo: “Paolo, non temere; bisogna che tu compaia davanti a Cesare, ed ecco, Dio ti ha dato tutti quelli che navigano con te”.»',
    note: 'Dopo che erano rimasti a lungo senza mangiare, Paolo si alzò in mezzo a loro. Ricordò che avrebbero dovuto ascoltarlo a Creta, ma li esortò a stare di buon animo: nessuno avrebbe perso la vita, solo la nave, e sarebbero stati gettati sopra un’isola (27:21–26).',
  },
  {
    title: 'La quattordicesima notte',
    ref: 'Atti 27:27',
    quote: '«E la quattordicesima notte da che eravamo portati qua e là per l’Adriatico, verso la mezzanotte, i marinai sospettavano di essere vicini a terra…»',
    note: 'L’Adriatico indicava allora tutto il mare fra la Grecia, l’Italia e l’Africa. Calato lo scandaglio, i marinai trovarono venti braccia, circa 37 m, poi quindici, circa 27 m; gettarono da poppa quattro ancore e aspettarono con ansia il giorno (27:28–29). Paolo esortò tutti a prendere cibo, rese grazie per il pane davanti a tutti e lo spezzò; poi alleggerirono la nave gettando il frumento in mare (27:33–38).',
  },
  {
    title: 'Il naufragio',
    ref: 'Atti 27:44',
    quote: '«…e poi gli altri, chi sopra tavole e chi su rottami della nave. E così avvenne che tutti giunsero salvi a terra.»',
    note: 'All’alba videro un’insenatura con una spiaggia e cercarono di spingervi la nave, ma incapparono in un luogo che aveva il mare dai due lati e la nave si arenò; la poppa si sfasciava per la violenza delle onde (27:39–41). I soldati volevano uccidere i prigionieri, ma il centurione, volendo salvare Paolo, li fermò (27:42–43). La baia di San Paolo, nel nord di Malta, è il luogo tradizionale.',
  },
  {
    title: 'Malta',
    ref: 'Atti 28:2',
    quote: '«Gli indigeni usarono verso di noi bontà non comune; infatti ci accolsero tutti intorno a un grande fuoco acceso a motivo della pioggia che cadeva e del freddo.»',
    note: 'Una vipera si attaccò alla mano di Paolo mentre metteva rami sul fuoco; egli la scosse nel fuoco e non ne patì alcun male, e la gente concluse che era un dio (28:3–6). Publio, l’uomo principale dell’isola, li ospitò per tre giorni. Paolo guarì suo padre, e poi vennero gli altri malati dell’isola e furono guariti (28:7–9). Rimasero tre mesi, tutto l’inverno.',
  },
  {
    title: 'Siracusa',
    ref: 'Atti 28:11',
    quote: '«Tre mesi dopo ci imbarcammo su una nave alessandrina, recante l’insegna di Castore e Polluce, la quale aveva svernato nell’isola.»',
    note: 'Castore e Polluce, figli di Giove, erano i protettori dei marinai, scolpiti o dipinti a prua. Ripresero il mare quando si riaprì la stagione, in primavera, circa 150 km fino a Siracusa, la città principale della Sicilia, e vi restarono tre giorni (28:12).',
  },
  {
    title: 'Reggio e Pozzuoli',
    ref: 'Atti 28:13',
    quote: '«Di là, costeggiando, arrivammo a Reggio. Il giorno seguente si levò un vento di scirocco, e in due giorni giungemmo a Pozzuoli.»',
    note: 'Reggio, sulla punta dell’Italia, sorvegliava lo stretto di Messina. Con lo scirocco a favore percorsero in due giorni i 350 km fino a Pozzuoli, nel golfo di Napoli. Pozzuoli era il grande porto dove le navi del grano di Alessandria scaricavano per Roma. Lì trovarono dei fratelli e rimasero sette giorni (28:14).',
  },
  {
    title: 'Il Foro Appio',
    ref: 'Atti 28:15',
    quote: '«Ora i fratelli, avute nostre notizie, di là ci vennero incontro sino al Foro Appio e alle Tre Taverne; e Paolo, quando li vide, ringraziò Dio e si fece coraggio.»',
    note: 'Da Pozzuoli proseguirono a piedi per la via Appia, la più antica delle grandi strade romane. Il Foro Appio, un borgo di mercato a circa 70 km da Roma, e le Tre Taverne, a circa 50 km, sono dove due gruppi di fratelli vennero loro incontro. Paolo aveva scritto alla chiesa di Roma tre anni prima, desiderando vivamente vederli (Romani 1:11; 15:23).',
  },
  {
    title: 'Roma',
    ref: 'Atti 28:16',
    quote: '«E quando entrammo a Roma… a Paolo fu concesso di abitare per suo conto con un soldato di guardia.»',
    note: 'Roma aveva forse un milione di abitanti, di gran lunga la città più grande dell’impero. Paolo era sotto custodia, ma in un alloggio suo. Tre giorni dopo convocò i notabili fra i Giudei e spiegò perché era venuto: era in catene a motivo della speranza d’Israele (28:17–20). Alcuni furono persuasi, altri non credettero (28:24).',
  },
];
