// Italian text for "The Tabernacle", merged over data.js (see addLanguage in
// ../../i18n.js). Same shape as data.js, text fields only. There is one version,
// the Nuova Riveduta 2006 (nr2006, as on Bible Gateway), so every field is a plain
// string. STOPS, TRIBES and LEVITES line up with data.js by position.
//
// Quotations are verbatim, in «…»; speech inside a quotation is in “…”.

// The NR2006's words (Esodo 25–40).
export const TERMS = {
  bases: 'basi',
  boards: 'assi',
  board: 'asse',
  bars: 'traverse',
  pillars: 'colonne',
  acacia: 'legno d’acacia',
  bronze: 'bronzo',
  blue: 'violaceo',
  cover: 'propiziatorio',
  ark: 'arca della testimonianza',
  veil: 'velo',
  lampstand: 'candelabro',
  laver: 'conca',
  court: 'cortile',
  tent: 'tenda di convegno',
  clasps: 'fermagli',
  bread: 'pane della presentazione',
  goatsHair: 'pelo di capra',
  rams: 'pelli di montone tinte di rosso',
  outer: 'pelli di delfino',
  bezalel: 'Besaleel',
  oholiab: 'Ooliab',
};

export const MATERIALS = {
  acacia: 'Legno d’acacia',
  gold: 'Oro',
  silver: 'Argento',
  bronze: 'Bronzo',
  linen: 'Lino fino',
  yarn: 'Violaceo, porporino e scarlatto',
};

export const FEATURES = {
  ark: { name: 'Arca della testimonianza' },
  table: { name: 'Tavola' },
  lampstand: { name: 'Candelabro' },
  incense: { name: 'Altare d’oro' },
  veil: { name: 'Velo' },
  screen: { name: 'Portiera dell’ingresso' },
  altar: { name: 'Altare degli olocausti' },
  laver: { name: 'Conca' },
  gate: { name: 'Ingresso del cortile' },
  holyPlace: { name: 'Luogo santo' },
  mostHoly: { name: 'Luogo santissimo' },
  sinai: { name: 'Monte Sinai' },
};

export const TRIBES = [
  { name: 'Giuda' }, { name: 'Issacar' }, { name: 'Zabulon' },
  { name: 'Ruben' }, { name: 'Simeone' }, { name: 'Gad' },
  { name: 'Efraim' }, { name: 'Manasse' }, { name: 'Beniamino' },
  { name: 'Dan' }, { name: 'Ascer' }, { name: 'Neftali' },
];
export const LEVITES = [
  { name: 'Ghersoniti' }, { name: 'Cheatiti' }, { name: 'Merariti' }, { name: 'Mosè, Aaronne e i suoi figli' },
];

export const INTRO = {
  title: 'Il deserto del Sinai',
  ref: 'Esodo 25:8',
  quote: '«Essi mi faranno un santuario e io abiterò in mezzo a loro.»',
  note: 'Sul monte Dio mostrò a Mosè il modello di un santuario che si poteva trasportare (25:9, 40). I capitoli 25–31 danno le istruzioni, e i capitoli 35–39 raccontano come il popolo fece ogni pezzo. Nel capitolo 40 Mosè eresse tutto in un solo giorno, in un ordine preciso. Questa visita segue quell’ordine, e ogni pezzo viene montato quando ci arriviamo.',
  aside: 'Tutto è disegnato con le misure del testo, in cubiti (1 cubito ≈ 45 cm). Dove il testo non dà né misura né posizione, come per il candelabro e la conca, il modello è un’ipotesi modesta.',
};

export const FINALE = {
  title: 'La gloria del Signore',
  ref: 'Esodo 40:34',
  quote: '«Allora la nuvola coprì la tenda di convegno, e la gloria del Signore riempì il tabernacolo.»',
  note: 'Mosè non poté entrare nella tenda di convegno, perché la nuvola si era posata sopra (40:35). Da allora in poi la nuvola sul tabernacolo di giorno, e il fuoco di notte, mostravano a Israele quando partire e quando restare (40:36–38).',
};

export const STOPS = [
  {
    title: 'Le basi',
    quote: '«Il primo giorno del primo mese del secondo anno, il tabernacolo fu eretto.»',
    note: 'Quasi un anno dopo l’uscita dall’Egitto, Mosè erige il tabernacolo, cominciando dalle basi. Sotto ogni asse vanno due basi d’argento: cento in tutto, contando le quattro sotto le colonne del velo. Ognuna fu fusa con un talento d’argento, dato come riscatto dagli uomini contati nel censimento (30:11–16; 38:25–27). Le cinque colonne dell’ingresso poggiano su basi di bronzo (26:37).',
    size: 'Un talento ciascuna, circa 34 kg · 100 d’argento, 5 di bronzo',
  },
  {
    title: 'Le assi e le traverse',
    quote: '«Mosè eresse il tabernacolo, ne pose le basi, ne collocò le assi, ne mise le traverse e ne rizzò le colonne.»',
    note: 'Ogni asse è di legno d’acacia rivestito d’oro, lunga dieci cubiti e larga un cubito e mezzo (26:16, 29). Venti stanno sul lato meridionale, venti su quello settentrionale e sei sul retro, più due agli angoli posteriori (26:18–23). Cinque traverse per lato le tengono insieme, e la traversa di mezzo passa da una parte all’altra (26:26–28). Poi vengono rizzate le colonne: quattro per il velo e cinque per l’ingresso.',
    size: 'Ogni asse: 10 × 1½ cubiti (4,5 × 0,7 m) · 48 in tutto',
    made: 'Gli uomini abili (36:8, 20–38)',
  },
  {
    title: 'I teli',
    quote: '«Farai poi il tabernacolo con dieci teli di lino fino ritorto, di filo color violaceo, porporino e scarlatto, con dei cherubini artisticamente lavorati.»',
    note: 'A rigore, “il tabernacolo” sono questi dieci teli di lino (26:1). Ognuno misura 28 cubiti per 4. Sono cuciti in due serie di cinque, e cinquanta fermagli d’oro uniscono le due serie (26:3–6). Stesi sopra le assi formano il soffitto, e da dentro si vedono in alto i cherubini lavorati.',
    size: 'Dieci teli, ciascuno di 28 × 4 cubiti (12,6 × 1,8 m)',
    made: 'Gli uomini abili (36:8–13)',
  },
  {
    title: 'La tenda e le sue coperte',
    quote: '«Stese la tenda sul tabernacolo e sopra la tenda pose la coperta di essa, come il Signore aveva ordinato a Mosè.»',
    note: 'Sopra il lino va una tenda di undici teli di pelo di capra, ciascuno di 30 cubiti per 4, uniti con fermagli di bronzo; il sesto è ripiegato sul davanti (26:7–11). Sopra ancora vanno due coperte, di pelli di montone tinte di rosso e di pelli di delfino (26:14). Il testo non dà le misure di queste due, perciò compaiono solo sul tetto. È la prima delle sette volte in cui il capitolo 40 dice che Mosè fece tutto come il Signore aveva ordinato.',
    size: 'Pelo di capra: undici teli, ciascuno di 30 × 4 cubiti (13,5 × 1,8 m)',
    made: 'Gli uomini abili (36:14–19)',
  },
  {
    title: 'L’arca',
    quote: '«Poi prese la Testimonianza e la pose dentro l’arca, mise le stanghe all’arca e collocò il propiziatorio sull’arca…»',
    note: 'Una cassa di legno d’acacia rivestita d’oro puro dentro e fuori, con una ghirlanda d’oro e quattro anelli d’oro per le stanghe (25:10–15). Dentro ci sono le due tavole di pietra, la Testimonianza (31:18). Il propiziatorio è d’oro puro, con due cherubini d’oro tutti d’un pezzo con esso, l’uno di fronte all’altro, con le ali spiegate in alto (25:17–20). Dio promise di incontrarsi lì con Mosè, fra i due cherubini (25:22).',
    size: '2½ × 1½ × 1½ cubiti (1,1 × 0,7 × 0,7 m)',
  },
  {
    title: 'Il velo',
    quote: '«…portò l’arca nel tabernacolo, sospese il velo di separazione e con esso coprì l’arca della testimonianza, come il Signore aveva ordinato a Mosè.»',
    note: 'Il velo è di filo violaceo, porporino e scarlatto e di lino fino ritorto, con cherubini artisticamente lavorati (26:31). È sospeso con chiodi d’oro a quattro colonne, sotto i fermagli (26:32–33), e separa il luogo santo dal santissimo, un cubo di dieci cubiti di lato. Solo il sommo sacerdote passava dall’altra parte, una volta l’anno (Levitico 16).',
    size: 'Luogo santissimo: 10 × 10 × 10 cubiti (4,5 m di lato)',
  },
  {
    title: 'La tavola',
    quote: '«Pose pure la tavola nella tenda di convegno, dal lato settentrionale del tabernacolo, fuori dal velo. Vi dispose sopra in ordine il pane, davanti al Signore…»',
    note: 'Di legno d’acacia rivestito d’oro puro, con una ghirlanda d’oro, una cornice alta quattro dita e anelli per le stanghe (25:23–28). Sopra c’era sempre il pane della presentazione davanti al Signore (25:30). Levitico 24:5–6 parla di dodici focacce, messe in due file di sei.',
    size: '2 × 1 × 1½ cubiti (90 × 45 × 70 cm)',
  },
  {
    title: 'Il candelabro',
    quote: '«Poi mise il candelabro nella tenda di convegno, di fronte alla tavola, dal lato meridionale del tabernacolo; accese le lampade davanti al Signore…»',
    note: 'Fatto con un talento d’oro puro lavorato al martello: un tronco centrale con tre bracci per lato, ornati di calici a forma di mandorla (25:31–39). Le sue sette lampade rischiarano lo spazio davanti a esso (25:37), l’unica luce del luogo santo. Il testo non ne dà l’altezza.',
    size: 'Altezza non indicata · un talento d’oro, circa 34 kg',
  },
  {
    title: 'L’altare d’oro',
    quote: '«Poi mise l’altare d’oro nella tenda di convegno, davanti al velo, e vi bruciò sopra l’incenso aromatico…»',
    note: 'L’altare del profumo: di legno d’acacia rivestito d’oro puro, con corni agli angoli, una ghirlanda d’oro e anelli per le stanghe (30:1–5). Sta davanti al velo, di fronte all’arca che è dietro di esso (30:6). Ogni mattina e ogni sera, quando si curavano le lampade, vi si bruciava sopra l’incenso (30:7–8).',
    size: '1 × 1 × 2 cubiti (45 × 45 × 90 cm)',
  },
  {
    title: 'La portiera dell’ingresso',
    quote: '«Mise pure la portiera all’ingresso del tabernacolo.»',
    note: 'Il tabernacolo è rivolto a oriente, con il retro a occidente (26:22). L’ingresso è chiuso da una portiera ricamata di filo violaceo, porporino e scarlatto e di lino fino ritorto, ma senza i cherubini del velo (26:36). È sospesa con chiodi d’oro a cinque colonne rivestite d’oro, su basi di bronzo (26:37).',
  },
  {
    title: 'L’altare degli olocausti',
    quote: '«Poi collocò l’altare degli olocausti all’ingresso del tabernacolo, della tenda di convegno e vi offrì, sopra, l’olocausto e l’oblazione…»',
    note: 'Una cassa vuota, fatta di tavole di legno d’acacia rivestite di bronzo, con un corno a ogni angolo, una graticola di bronzo a metà altezza, e anelli e stanghe per portarlo (27:1–8). Sta all’aperto, davanti all’ingresso. Il testo non dice a che distanza dalla porta.',
    size: '5 × 5 × 3 cubiti (2,3 × 2,3 × 1,4 m)',
  },
  {
    title: 'La conca',
    quote: '«Pose la conca fra la tenda di convegno e l’altare, e vi pose dentro dell’acqua per le abluzioni. Mosè, Aaronne e i suoi figli, con quell’acqua, si lavarono le mani e i piedi…»',
    note: 'Di bronzo, con la sua base di bronzo, fatta con gli specchi delle donne che prestavano servizio all’ingresso della tenda di convegno (38:8). I sacerdoti vi si lavavano ogni volta che entravano nella tenda o si avvicinavano all’altare (30:19–21). Il testo non ne dà né la misura né la forma. Aaronne porta le vesti del sommo sacerdote (28:4–39): la tunica di lino fino; il manto violaceo, con sonagli d’oro e melagrane tutto intorno all’orlo; l’efod, con una pietra d’onice su ogni spalla; il pettorale con dodici pietre, una per tribù; e il turbante di lino con la piastra d’oro. I suoi figli portano tuniche, cinture e mitre (28:40).',
    size: 'Misura e forma non indicate',
  },
  {
    title: 'Il cortile',
    quote: '«Eresse pure il recinto intorno al tabernacolo e all’altare e sospese la cortina all’ingresso del cortile. Così Mosè completò l’opera.»',
    note: 'Cento cubiti per cinquanta, chiuso da cortine di lino fino ritorto alte cinque cubiti, su colonne con basi di bronzo e ganci e aste d’argento, fissate con picchetti di bronzo e funi (27:9–19; 35:18). L’ingresso, a oriente, è largo venti cubiti e ha una portiera di filo violaceo, porporino e scarlatto (27:16). Sessanta colonne, a cinque cubiti l’una dall’altra, corrispondono ai numeri dati per ogni lato.',
    size: '100 × 50 cubiti (45 × 22,5 m)',
  },
];
