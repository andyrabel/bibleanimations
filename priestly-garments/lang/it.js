// Italian text for "The Priestly Garments", merged over data.js (see addLanguage in
// ../../i18n.js). Same shape as data.js, text fields only. One version, the Nuova
// Riveduta 2006 (nr2006), so every field is a plain string. STOPS and STONES line
// up with data.js by position.
//
// Quotations are verbatim, in «…». The NR2006's names: the sash is the "cintura",
// the ephod's band the "cintura artistica dell’efod", the plate the "lamina d’oro",
// the "santo diadema" (Lv 8:9), the caps "mitre", the undergarments "mutande".

export const TERMS = {
  tunic: 'tunica',
  sash: 'cintura',
  band: 'cintura artistica dell’efod',
  ephod: 'efod',
  breastpiece: 'pettorale',
  turban: 'turbante',
  plate: 'lamina d’oro',
  crown: 'santo diadema',
  caps: 'mitre',
  undergarments: 'mutande di lino',
  urim: 'urim e tummim',
  ithamar: 'Itamar',
  blue: 'violaceo',
  colours: 'violaceo, porporino e scarlatto',
  laver: 'conca',
  tent: 'tenda di convegno',
  glory: 'in segno di dignità e di gloria',
  holy: 'Santo al Signore',
};

export const MATERIALS = {
  linen: 'Lino fino',
  yarn: 'Violaceo, porporino e scarlatto',
  gold: 'Oro',
  stones: 'Pietre preziose',
};

export const PARTS = {
  tunic: { name: 'Tunica' },
  sash: { name: 'Cintura' },
  robe: { name: 'Manto' },
  ephod: { name: 'Efod' },
  onyx: { name: 'Pietre d’onice' },
  band: { name: 'Cintura dell’efod' },
  breastpiece: { name: 'Pettorale' },
  urim: { name: 'Urim e tummim' },
  turban: { name: 'Turbante' },
  plate: { name: 'Lamina d’oro' },
};

export const PEOPLE = {
  aaron: { name: 'Aaronne' },
  moses: { name: 'Mosè' },
  nadab: { name: 'Nadab' },
  abihu: { name: 'Abiu' },
  eleazar: { name: 'Eleazar' },
  ithamar: { name: 'Itamar' },
};

// Esodo 28:17–20 in the NR2006, row by row.
export const STONES = [
  { name: 'sardonio' }, { name: 'topazio' }, { name: 'smeraldo' },
  { name: 'rubino' }, { name: 'zaffiro' }, { name: 'calcedonio' },
  { name: 'opale' }, { name: 'agata' }, { name: 'ametista' },
  { name: 'crisolito' }, { name: 'onice' }, { name: 'diaspro' },
];

export const INTRO = {
  title: 'Paramenti sacri',
  ref: 'Esodo 28:2',
  quote: '«A tuo fratello Aaronne farai dei paramenti sacri, in segno di dignità e di gloria.»',
  note: 'Dio ordinò a Mosè di fare dei paramenti per Aaronne e i suoi figli, perché lo servissero come sacerdoti (28:1–4). Esodo 28 descrive ogni capo, ed Esodo 39 racconta come furono fatti. In Levitico 8, all’ingresso della tenda di convegno, davanti a tutta la comunità radunata, Mosè lavò Aaronne e lo rivestì, capo per capo. Questa visita segue quell’ordine.',
  aside: 'Le misure sono in cubiti (1 cubito ≈ 45 cm) quando il testo le dà. Della maggior parte delle forme e delle lunghezze non si dice nulla, perciò sono un’ipotesi modesta; le note dicono dove.',
};

export const FINALE = {
  title: 'Dignità e gloria',
  ref: 'Levitico 8:13',
  quote: '«Poi Mosè fece avvicinare i figli di Aaronne, li vestì di tuniche, li cinse di cinture e legò sul loro capo delle mitre, come il Signore aveva ordinato a Mosè.»',
  note: 'Fra la vestizione di Aaronne e quella dei suoi figli, Mosè unse il tabernacolo e tutto ciò che conteneva, e versò l’olio dell’unzione sul capo di Aaronne (8:10–12). Anche i paramenti dei figli erano fatti “in segno di dignità” (Es 28:40). Per sette giorni i sacerdoti rimasero all’ingresso della tenda di convegno, finché fu compiuta la loro consacrazione (8:33–35).',
};

export const STOPS = [
  {
    title: 'Il lavaggio',
    ref: 'Levitico 8:6',
    quote: '«Mosè fece avvicinare Aaronne e i suoi figli, e li lavò con acqua.»',
    note: 'Mosè conduce Aaronne e i suoi quattro figli, Nadab, Abiu, Eleazar e Itamar (Esodo 28:1), alla conca, fra la tenda di convegno e l’altare. I sacerdoti vi si lavavano le mani e i piedi ogni volta che entravano per il servizio (30:19–21; 40:31–32). Il testo non dice come si attingeva l’acqua; qui Mosè la versa con una brocca, prima sulle mani di ciascuno e poi sui piedi. Sotto tutto il resto i sacerdoti portavano mutande di lino, dai fianchi alle cosce (28:42–43).',
    made: 'Gli artigiani (39:28)',
  },
  {
    title: 'La tunica',
    ref: 'Levitico 8:7',
    quote: '«Poi rivestì Aaronne della tunica…»',
    note: 'Prima viene la tunica, sopra le mutande. È di lino fino, lavorata a maglia (28:39). La lunghezza e le maniche non sono descritte; qui arriva alle caviglie. Tuniche uguali furono tessute per i figli di Aaronne (39:27).',
    size: 'Non indicata',
    made: 'I tessitori (39:27)',
  },
  {
    title: 'La cintura',
    ref: 'Levitico 8:7',
    quote: '«…lo cinse della cintura…»',
    note: 'Di lino fino ritorto e di filo violaceo, porporino e scarlatto, lavoro di ricamatore (28:39; 39:29). Il testo non dice né la lunghezza né come era legata; qui gira intorno alla vita e le estremità ricadono sul davanti. Il manto va sopra.',
    size: 'Non indicata',
    made: 'I ricamatori (39:29)',
  },
  {
    title: 'Il manto',
    ref: 'Levitico 8:7',
    quote: '«…gli mise addosso il manto…»',
    note: 'Il manto dell’efod è tutto di color violaceo, tessuto in un pezzo solo, con un’apertura per la testa rinforzata da un orlo tessuto, come quella di una corazza, perché non si strappasse (28:31–32; 39:22–23). Intorno all’orlo inferiore ci sono melagrane di filo violaceo, porporino e scarlatto, alternate a sonagli d’oro (28:33–34). Il suono dei sonagli doveva udirsi quando Aaronne entrava nel luogo santo e quando ne usciva, perché non morisse (28:35). La lunghezza e il numero non sono dati: qui il manto arriva a metà gamba, con 18 di ciascuno.',
    size: 'Non indicata',
    made: 'I tessitori (39:22–26)',
  },
  {
    title: 'L’efod',
    ref: 'Levitico 8:7',
    quote: '«…gli mise l’efod e lo cinse della cintura artistica dell’efod, con la quale gli fissò l’efod addosso.»',
    note: 'Di lino fino ritorto, fili d’oro e filo violaceo, porporino e scarlatto, lavorato artisticamente (28:6); l’oro fu battuto in lamine e tagliato a fili (39:3). Due spalline lo uniscono davanti e dietro, e la cintura è tutta d’un pezzo con esso (28:7–8). Su ogni spalla una pietra d’onice incastonata nell’oro porta incisi sei nomi dei figli d’Israele, in ordine di nascita, perché Aaronne porti i loro nomi davanti al Signore (28:9–12). La forma non è data; qui copre il corpo dal petto ai fianchi.',
    made: 'Gli artigiani (39:2–7)',
  },
  {
    title: 'Il pettorale',
    ref: 'Levitico 8:8',
    quote: '«Gli mise pure il pettorale…»',
    note: 'Fatto come l’efod e piegato in doppio, quadrato, di una spanna per lato (28:15–16). Ha dodici pietre in quattro file, ognuna incastonata nell’oro e incisa con il nome di una delle tribù, perché Aaronne porti i loro nomi sul cuore (28:17–21, 29). Catenelle d’oro fissano gli angoli superiori alle montature sulle spalline, e un cordone violaceo lega gli anelli inferiori all’efod, appena sopra la cintura, perché non si stacchi (28:22–28). Il testo non dà l’ordine dei nomi; qui segue l’ordine di nascita.',
    size: 'Una spanna per lato, circa 22 cm, piegato in doppio',
    made: 'Gli artigiani (39:8–21)',
  },
  {
    title: 'L’urim e il tummim',
    ref: 'Levitico 8:8',
    quote: '«…e sul pettorale mise l’urim e il tummim.»',
    note: 'Stanno dentro il pettorale piegato, perché siano sul cuore di Aaronne quando si presenta davanti al Signore (28:30). Per mezzo di essi il sacerdote consultava il giudizio del Signore per Israele (Numeri 27:21). Il testo non dice mai di che cosa fossero fatti né come fossero, perciò qui sono solo due forme semplici dentro la tasca.',
    size: 'Non descritti',
  },
  {
    title: 'Il turbante',
    ref: 'Levitico 8:9',
    quote: '«Poi gli mise in capo il turbante…»',
    note: 'Di lino fino (28:39; 39:28). La forma non è descritta; qui è un lungo telo avvolto intorno al capo. I figli di Aaronne portavano mitre (28:40).',
    size: 'Non indicato',
    made: 'Gli artigiani (39:28)',
  },
  {
    title: 'La lamina d’oro',
    ref: 'Levitico 8:9',
    quote: '«…e sul davanti del turbante pose la lamina d’oro, il santo diadema, come il Signore aveva ordinato a Mosè.»',
    note: 'D’oro puro, con le parole “Santo al Signore” incise come su un sigillo (28:36; 39:30), qui in ebraico. Un nastro violaceo la fissa sul davanti del turbante (28:37), così che sta sulla fronte di Aaronne: egli porta le colpe commesse nelle sante offerte che Israele consacra, perché siano gradite al Signore (28:38). La misura non è data.',
    size: 'Non indicata',
    made: 'Gli artigiani (39:30–31)',
  },
];
