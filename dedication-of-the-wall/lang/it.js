// Italian text for "The Dedication of the Wall", merged over data.js (see addLanguage
// in ../../i18n.js). Same shape as data.js, text fields only. One version, the Nuova
// Riveduta 2006 (nr2006), so every field is a plain string. STOPS line up with
// data.js by position. The city's names come from ../nehemiahs-wall/lang/it.js.
//
// Quotations are verbatim, in «…». In 12:38 the NR2006 has "le mura larghe"
// (the city's label, from Neemia 3:8, is "Muro largo"), and the Gate of the
// Guard is the "porta della Prigione".

export const GATES = {
  ephraim: { name: 'Porta di Efraim' },
  guard: { name: 'Porta della Prigione' },
};

export const INSTRUMENTS = {
  cymbals: 'Cembali',
  harps: 'Saltèri',
  lyres: 'Cetre',
  trumpets: 'Trombe',
  david: 'Strumenti di Davide',
};

export const PEOPLE = {
  ezra: { name: 'Esdra' },
  nehemiah: { name: 'Neemia' },
  choir1: { name: 'Il primo coro' },
  choir2: { name: 'Il secondo coro' },
};

export const INTRO = {
  title: 'Gerusalemme, 445 a.C.',
  ref: 'Neemia 12:27–43',
  quote: '«…allo scopo di fare l’inaugurazione con gioia, con lodi e canti e suono di cembali, saltèri e cetre.» (12:27)',
  note: 'Le mura sono finite, in cinquantadue giorni (6:15). Neemia 12 racconta come furono inaugurate: due grandi cori percorsero la cima delle mura in direzioni opposte e si incontrarono nel tempio di Dio. Questa visita li accompagna.',
  aside: 'La data non è indicata, solo che fu dopo il compimento delle mura, nel 445 a.C. La città è la stessa ricostruzione delle “Mura di Neemia”, e le posizioni sono approssimative.',
};

export const FINALE = {
  title: 'La gioia di Gerusalemme',
  ref: 'Neemia 12:43',
  quote: '«…e la gioia di Gerusalemme si sentiva da lontano.»',
  note: 'Circa 140 anni dopo che i Babilonesi avevano abbattuto le mura (2 Re 25:10), la città ha di nuovo le sue mura, e il suono della sua gioia attraversa il Chidron fino al monte degli Ulivi.',
};

export const STOPS = [
  {
    title: 'Si mandano a cercare i Leviti',
    quote: '«Per l’inaugurazione delle mura di Gerusalemme si mandarono a cercare i Leviti da tutti i luoghi dove si trovavano, per farli venire a Gerusalemme…»',
    note: 'I Leviti abitavano in città sparse per tutto Giuda (11:20, 36), e i cantori si erano costruiti villaggi nei dintorni di Gerusalemme: quelli dei Netofatiti a sud, Gheba e Azmavet a nord, e Bet-Ghilgal. Il testo non dice dove cominciò la processione. La porta della Valle, a metà del lato occidentale, serve a entrambi i percorsi, perciò si radunano qui.',
    who: 'I Leviti · i cantori',
  },
  {
    title: 'Il popolo, le porte e le mura purificati',
    quote: '«I sacerdoti e i Leviti si purificarono e purificarono il popolo, le porte e le mura.»',
    note: 'Il testo non dice come. Quando i Leviti furono messi a parte la prima volta, furono aspersi con acqua e si lavarono le vesti (Nm 8:7, 21), e alla Pasqua dopo la ricostruzione del tempio i sacerdoti e i Leviti si purificarono insieme (Esd 6:20). La luce che percorre le mura mostra soltanto che cosa viene purificato.',
    who: 'I sacerdoti e i Leviti',
  },
  {
    title: 'Sulle mura',
    quote: '«Poi feci salire sulle mura i capi di Giuda e formai due grandi cori con i relativi cortei.»',
    note: 'È Neemia stesso a raccontarlo. La cima delle mura forma un camminamento tutt’intorno alla città, sotto gli occhi di tutti. Quando erano a metà, Tobia aveva deriso che, se una volpe ci fosse saltata sopra, avrebbe fatto crollare il loro muro (4:3). Ora porta due processioni.',
    who: 'Neemia · i capi di Giuda',
  },
  {
    title: 'Il primo coro va a destra',
    quote: '«Il primo si incamminò dal lato destro, sulle mura, verso la porta del Letame… Esdra, lo scriba, camminava alla loro testa.»',
    note: 'In ebraico le direzioni si danno guardando a oriente, perciò la destra è il sud. Dietro il coro camminano Osaia e la metà dei capi di Giuda, figli dei sacerdoti con le trombe, e Zaccaria, discendente di Asaf, con i suoi fratelli, che suonavano “gli strumenti musicali di Davide, uomo di Dio”.',
    who: 'Esdra · il primo coro · Osaia e metà dei capi · sacerdoti · Zaccaria e i suoi fratelli',
  },
  {
    title: 'La scalinata della città di Davide',
    quote: '«Alla porta della Sorgente, di fronte a loro, salirono per la scalinata della città di Davide, per la salita delle mura…»',
    note: 'Dopo la porta della Sorgente le mura voltano a nord e salgono sul colle della città di Davide. Si discute se il coro restò sulle mura o salì per una scala accanto a esse, la scalinata che scendeva dalla città (3:15). Qui procede sulla cima delle mura.',
    who: 'Il primo coro',
  },
  {
    title: 'Sopra la casa di Davide fino alla porta delle Acque',
    quote: '«…al di sopra della casa di Davide, e giunsero alla porta delle Acque, a oriente.»',
    note: 'Passano accanto al vecchio palazzo reale, in cima al colle (quello di 3:25), e si fermano sopra la porta delle Acque, dove Esdra aveva letto la legge a tutto il popolo (8:1–3). Qui aspettano mentre il secondo coro fa il giro.',
    who: 'Il primo coro',
  },
  {
    title: 'Il secondo coro va nel senso opposto',
    quote: '«Il secondo coro si incamminò nel senso opposto; e io gli andavo dietro, con l’altra metà del popolo, sopra le mura. Passando al di sopra della torre dei Forni, esso andò fino alle mura larghe…»',
    note: 'Neemia stesso cammina dietro questo coro. Il suo percorso è il muro del capitolo 3 al contrario: le stesse torri e porte, nominate in ordine inverso. Elenchi come questi sono uno dei modi principali per tracciare il corso delle mura.',
    who: 'Il secondo coro · Neemia e l’altra metà del popolo',
  },
  {
    title: 'Le porte di Efraim, Vecchia e dei Pesci',
    quote: '«…poi al di sopra della porta di Efraim, della porta Vecchia, della porta dei Pesci…»',
    note: 'La porta di Efraim non compare nelle riparazioni del capitolo 3, ma aveva una piazza dove il popolo fece le capanne per la festa (8:16). Dava sulla strada del nord, verso la regione montuosa di Efraim. È stata messa qui, fra il muro largo e la porta Vecchia, secondo l’ordine di questo versetto.',
    who: 'Il secondo coro · Neemia e l’altra metà del popolo',
  },
  {
    title: 'Fino alla porta delle Pecore e alla porta della Prigione',
    quote: '«…della torre di Cananeel, della torre di Mea, fino alla porta delle Pecore; e il coro si fermò alla porta della Prigione.»',
    note: 'La porta delle Pecore è dove cominciò la ricostruzione (3:1), perciò il secondo coro finisce dove l’opera era cominciata. La porta della Prigione non è nominata altrove, e non si sa dove fosse. Qui è la porta settentrionale del cortile del tempio.',
    who: 'Il secondo coro · Neemia e l’altra metà del popolo',
  },
  {
    title: 'Nel tempio di Dio',
    quote: '«I due cori si fermarono nel tempio di Dio… E i cantori fecero risonare forte le loro voci, diretti da Izraia.»',
    note: 'I due cori scendono dalle mura e si incontrano nel cortile del tempio, uno da sud e l’altro da nord, con Neemia, la metà dei magistrati e i sacerdoti con le trombe. È il tempio ricostruito sotto Zorobabele e finito nel 516 a.C. (Esd 6:15).',
    who: 'I due cori · Neemia e metà dei magistrati · sacerdoti con le trombe · Izraia',
  },
  {
    title: 'Numerosi sacrifici',
    quote: '«In quel giorno il popolo offrì numerosi sacrifici, e si rallegrò perché Dio gli aveva concesso una gran gioia. Anche le donne e i bambini si rallegrarono…»',
    note: 'Non solo i sacerdoti, i Leviti e i capi: anche le donne e i bambini si rallegrano. Il fumo delle offerte sale dall’altare davanti al tempio.',
    who: 'Tutto il popolo, anche le donne e i bambini',
  },
];
