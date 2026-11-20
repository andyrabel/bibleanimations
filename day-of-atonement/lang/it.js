// Italian text for "The Day of Atonement", merged over data.js (see addLanguage in
// ../../i18n.js). Same shape as data.js, text fields only. One version, the Nuova
// Riveduta 2006 (nr2006), so every field is a plain string. STOPS line up with
// data.js by position.
//
// Quotations are verbatim, in «…». The NR2006's words in Levitico 16: "capri",
// "toro", "montone", "cortina", "propiziatorio", "turibolo", "calzoni",
// "espiazione", and the second lot is "di Azazel". Its chapter 6 follows the
// Hebrew numbering (English 6:12–13 is 6:5–6, 6:30 is 6:23).

export const TERMS = {
  tunic: 'tunica',
  undergarments: 'calzoni di lino',
  sash: 'cintura',
  turban: 'turbante',
  laver: 'conca',
  tent: 'tenda di convegno',
  veil: 'cortina',
  cover: 'propiziatorio',
  bull: 'toro',
  firepan: 'turibolo',
  household: 'casa',
  blue: 'violaceo',
  liveGoat: 'capro vivo',
  manReady: 'Un uomo che ha questo incarico',
  bathePlace: 'in un luogo santo',
  glory: 'in segno di dignità e di gloria',
  humble: 'umiliarsi',
  onceAYear: 'una volta all’anno',
  sabbath: 'un sabato di riposo solenne',
};

export const ATONE = {
  self: 'Aaronne e la sua casa',
  sanctuary: 'Il santuario',
  tent: 'La tenda di convegno',
  altar: 'L’altare',
  people: 'Il popolo',
};

export const WEARING = {
  linen: 'I paramenti sacri di lino: la tunica, i calzoni, la cintura e il turbante (16:4)',
  glory: 'I paramenti del sommo sacerdote (16:24; Esodo 28)',
};

export const LABELS = {
  aaron: { name: 'Aaronne' },
  man: { name: 'L’uomo incaricato' },
  bull: { name: 'Toro' },
  ramA: { name: 'Il montone di Aaronne' },
  ramP: { name: 'Il montone del popolo' },
  goatL: { name: 'Capro', after: { name: 'Capro del Signore' } },
  goatS: { name: 'Capro', after: { name: 'Capro di Azazel' } },
  laver: { name: 'Conca' },
  altar: { name: 'Altare' },
  cover: { name: 'Propiziatorio' },
  veil: { name: 'Cortina' },
  firepan: { name: 'Turibolo' },
  outside: { name: 'Fuori dall’accampamento' },
  wilderness: { name: 'Il deserto' },
};

export const INTRO = {
  title: 'Il giorno dell’espiazione',
  ref: 'Levitico 16:2',
  quote: '«Parla ad Aaronne, tuo fratello, e digli di non entrare in qualsiasi tempo nel santuario, di là dalla cortina, davanti al propiziatorio che è sull’arca, affinché non muoia; poiché io apparirò nella nuvola sul propiziatorio.»',
  note: 'Dopo che Nadab e Abiu, figli di Aaronne, morirono per aver offerto un fuoco estraneo davanti al Signore (16:1; 10:1–2), il Signore disse a Mosè come Aaronne poteva entrare di là dalla cortina e vivere. Una volta all’anno, il decimo giorno del settimo mese (16:29, 34), il sommo sacerdote faceva l’espiazione per sé e per la sua casa, per il santuario, per la tenda di convegno e per l’altare, e per tutto il popolo. Questa visita segue Levitico 16 passo dopo passo.',
  aside: 'Le misure sono in cubiti (1 cubito ≈ 45 cm), e il tabernacolo è lo stesso delle altre animazioni. Levitico 16 dà l’ordine, ma non tutti i particolari, come dove Aaronne si lavò, che cosa fossero le sorti o come si portasse il sangue; le note dicono dove qualcosa è un’ipotesi. L’uccisione degli animali non è mostrata: si accasciano a terra.',
};

export const FINALE = {
  title: 'Una volta all’anno',
  ref: 'Levitico 16:30',
  quote: '«Poiché in quel giorno si farà l’espiazione per voi, per purificarvi; voi sarete purificati da tutti i vostri peccati, davanti al Signore.»',
  note: 'Ogni anno, il decimo giorno del settimo mese, tutto Israele, sia il nativo del paese sia lo straniero, doveva umiliarsi e non fare nessun lavoro: un sabato di riposo solenne (16:29–31). I sacerdoti unti dopo Aaronne avrebbero fatto lo stesso, con le vesti di lino (16:32–33), una volta all’anno (16:34). Ebrei 9 ricorda questo giorno, in cui solo il sommo sacerdote entrava nel luogo interno, una sola volta all’anno, e non senza sangue (9:7).',
};

export const STOPS = [
  {
    title: 'I paramenti sacri di lino',
    ref: 'Levitico 16:4',
    quote: '«Indosserà la tunica sacra di lino, indosserà sotto la tunica i calzoni di lino; si metterà la cintura di lino e si coprirà il capo con il turbante di lino. Questi sono i paramenti sacri; egli li indosserà dopo essersi lavato il corpo nell’acqua.»',
    note: 'In questo giorno Aaronne non porta i suoi paramenti d’oro, violacei, porporini e scarlatti, ma semplice lino: la tunica sopra i calzoni, la cintura e il turbante (16:4). Si lava prima di indossarli. Il testo non dice né dove né come; qui si versa l’acqua addosso presso la conca, dove si lavavano i sacerdoti (Esodo 30:18–21).',
    where: 'Presso la conca',
  },
  {
    title: 'Le offerte',
    ref: 'Levitico 16:5',
    quote: '«Dalla comunità dei figli d’Israele prenderà due capri per un sacrificio per il peccato e un montone per un olocausto.»',
    note: 'Aaronne porta le sue offerte, un toro per il peccato e un montone per l’olocausto (16:3), e il popolo dà due capri e un montone. Il toro fa l’espiazione per Aaronne e la sua casa (16:6); i capri sono per il popolo (16:15). Qui entrano dalla porta del cortile e aspettano a nord dell’altare, dove si sgozzavano le offerte (1:11; 4:24).',
    where: 'Il cortile, a nord dell’altare',
  },
  {
    title: 'Le sorti',
    ref: 'Levitico 16:8',
    quote: '«Aaronne tirerà a sorte per vedere quale dei due debba essere del Signore e quale di Azazel.»',
    note: 'I due capri sono presentati davanti al Signore all’ingresso della tenda di convegno (16:7). Le sorti decidono quale viene offerto per il peccato e quale resta vivo, per essere mandato nel deserto (16:9–10). Azazel è una parola ebraica dal senso discusso. Il testo non dice che cosa fossero le sorti né come si tirassero; qui sono due semplici pietre gettate davanti ai capri.',
    where: 'Davanti all’ingresso della tenda di convegno',
  },
  {
    title: 'Il toro per sé',
    ref: 'Levitico 16:11',
    quote: '«Aaronne offrirà dunque il suo toro del sacrificio espiatorio e farà l’espiazione per sé e per la sua casa. Sgozzerà il toro del sacrificio per il peccato per sé.»',
    note: 'Prima di fare l’espiazione per chiunque altro, Aaronne la fa per sé e per la sua casa. Il toro è sgozzato a nord dell’altare (1:11; 4:24); qui si accascia a terra, e il suo sangue è raccolto in un catino lì accanto. Il testo non dice in quale recipiente; l’altare aveva catini di bronzo (Esodo 27:3).',
    where: 'A nord dell’altare',
  },
  {
    title: 'Carboni dall’altare',
    ref: 'Levitico 16:12',
    quote: '«Poi prenderà un turibolo pieno di carboni accesi, tolti dall’altare davanti al Signore, e due manciate di incenso aromatico polverizzato; e porterà ogni cosa di là dalla cortina.»',
    note: 'I carboni vengono dall’altare del cortile, il cui fuoco non doveva mai spegnersi (6:5–6). L’incenso è il profumo sacro di Esodo 30:34–38, ridotto in polvere. Il turibolo non è descritto; gli utensili dell’altare erano di bronzo (Esodo 27:3), perciò anche questo lo è, e Aaronne porta l’incenso nell’altra mano.',
    where: 'Presso l’altare',
  },
  {
    title: 'La nuvola sul propiziatorio',
    ref: 'Levitico 16:13',
    quote: '«Metterà l’incenso sul fuoco davanti al Signore, affinché la nuvola dell’incenso copra il propiziatorio che è sulla testimonianza, e non morirà.»',
    note: 'Di là dalla cortina c’è solo l’arca, con il propiziatorio e i suoi due cherubini sopra (Esodo 25:17–22). Lì il Signore disse che sarebbe apparso nella nuvola (16:2). La nuvola dell’incenso nasconde il propiziatorio agli occhi di Aaronne. Nessun altro può stare nella tenda di convegno mentre egli è dentro (16:17). Il testo non dice che cosa fece del turibolo; qui lo posa a terra davanti all’arca.',
    where: 'Di là dalla cortina',
  },
  {
    title: 'Il sangue del toro',
    ref: 'Levitico 16:14',
    quote: '«Poi prenderà del sangue del toro, aspergerà col dito il propiziatorio verso oriente e farà sette aspersioni del sangue col dito, davanti al propiziatorio.»',
    note: 'Aaronne esce a prendere il sangue del suo toro e lo porta di là dalla cortina. Col dito ne asperge il propiziatorio verso oriente, il lato rivolto verso di lui, e sette volte davanti a esso. Il testo non dà un numero per la prima aspersione (qui è una) né dice come si portava il sangue.',
    where: 'Di là dalla cortina',
  },
  {
    title: 'Il capro per il popolo',
    ref: 'Levitico 16:15',
    quote: '«Poi sgozzerà il capro del sacrificio per il peccato, che è per il popolo, e ne porterà il sangue di là dalla cortina; farà con questo sangue quello che ha fatto con il sangue del toro…»',
    note: 'Il capro toccato in sorte al Signore viene sgozzato, e il suo sangue è asperso come quello del toro, sul propiziatorio e davanti a esso. Così Aaronne fa l’espiazione per il santuario, a causa delle impurità e delle trasgressioni d’Israele, e fa lo stesso per la tenda di convegno, che sta in mezzo a loro (16:16). Nessuno può stare nella tenda di convegno finché egli non sia uscito (16:17).',
    where: 'Di là dalla cortina',
  },
  {
    title: 'I corni dell’altare',
    ref: 'Levitico 16:18',
    quote: '«Egli uscirà verso l’altare che è davanti al Signore e farà l’espiazione per esso; prenderà del sangue del toro e del sangue del capro e lo metterà sui corni dell’altare da ogni lato.»',
    note: 'Aaronne mette il sangue di tutti e due su ciascuno dei quattro corni e poi ne fa sette aspersioni sull’altare con il dito, per purificarlo e santificarlo dalle impurità dei figli d’Israele (16:19). Si discute di quale altare si tratti: anche i corni dell’altare d’oro del profumo erano purificati con il sangue una volta all’anno (Esodo 30:10). Qui è l’altare del cortile, perché Aaronne esce verso di esso.',
    where: 'Presso l’altare',
  },
  {
    title: 'Il capro vivo',
    ref: 'Levitico 16:20–21',
    quote: '«…farà avvicinare il capro vivo. Aaronne poserà tutte e due le mani sul capo del capro vivo, confesserà su di lui tutte le iniquità dei figli d’Israele, tutte le loro trasgressioni, tutti i loro peccati e li metterà sulla testa del capro…»',
    note: 'Quando il santuario, la tenda di convegno e l’altare sono stati purificati, Aaronne fa avvicinare il capro vivo, che è stato messo vivo davanti al Signore (16:10, 20). Con le due mani sul suo capo confessa su di lui tutti i peccati d’Israele e li mette sulla testa dell’animale.',
    where: 'Davanti all’ingresso della tenda di convegno',
  },
  {
    title: 'Nel deserto',
    ref: 'Levitico 16:22',
    quote: '«Quel capro porterà su di sé tutte le loro iniquità in una regione solitaria; esso sarà lasciato andare nel deserto.»',
    note: 'Un uomo che ha questo incarico porta via il capro (16:21), fuori dal cortile, attraverso l’accampamento e fino al deserto, e lo lascia andare. Deve lavarsi le vesti e il corpo prima di rientrare nell’accampamento (16:26). Non si dice dove lo portò; qui va verso oriente.',
    where: 'Attraverso l’accampamento, verso il deserto',
  },
  {
    title: 'Le vesti di lino deposte',
    ref: 'Levitico 16:23',
    quote: '«Poi Aaronne entrerà nella tenda di convegno, si spoglierà delle vesti di lino che aveva indossate per entrare nel santuario e le deporrà lì.»',
    note: 'Aaronne torna nella tenda di convegno e si toglie le vesti di lino che aveva portato di là dalla cortina. Restano nella tenda; il testo non dice che cosa se ne facesse. Qui restano piegate presso la parete.',
    where: 'Nella tenda di convegno',
  },
  {
    title: 'I suoi paramenti',
    ref: 'Levitico 16:24',
    quote: '«Si laverà il corpo con acqua in un luogo santo, indosserà i paramenti…»',
    note: 'Si lava di nuovo (il testo dice solo “in un luogo santo”, perciò non è mostrato) e indossa i paramenti del sommo sacerdote, fatti “in segno di dignità e di gloria” (Esodo 28:2): la tunica e la cintura, il manto violaceo con i suoi sonagli, l’efod con le pietre d’onice, il pettorale con le dodici pietre, e il turbante con la lamina d’oro.',
    where: 'Nella tenda di convegno',
  },
  {
    title: 'Gli olocausti',
    ref: 'Levitico 16:24',
    quote: '«…uscirà a offrire il suo olocausto e l’olocausto del popolo e farà l’espiazione per sé e per il popolo.»',
    note: 'Aaronne esce e offre in olocausto i due montoni, il suo e quello del popolo (16:3, 5), che si bruciavano interi sull’altare (1:9). Vi brucia anche il grasso del sacrificio per il peccato (16:25).',
    where: 'Presso l’altare',
  },
  {
    title: 'Fuori dall’accampamento',
    ref: 'Levitico 16:27',
    quote: '«Si porterà fuori dall’accampamento il toro del sacrificio per il peccato e il capro del sacrificio espiatorio, il cui sangue sarà stato portato nel santuario per farvi l’espiazione; e se ne bruceranno le pelli, la carne e gli escrementi.»',
    note: 'Una vittima espiatoria il cui sangue è stato portato nel santuario non viene mangiata dai sacerdoti (6:23): è bruciata fuori dall’accampamento. Chi la brucia deve lavarsi le vesti e il corpo prima di rientrare nell’accampamento (16:28). Il testo non dice in quale luogo fuori dall’accampamento; qui è oltre le tende a oriente.',
    where: 'Fuori dall’accampamento',
  },
];
