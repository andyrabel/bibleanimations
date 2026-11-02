// Spanish text for "The Tabernacle", merged over data.js (see addLanguage in ../../i18n.js).
// Same shape as data.js, text fields only. Version keys are the Spanish versions
// (nbla, nvi, rvr1960, rva); `default` covers the ones not listed. STOPS, TRIBES and
// LEVITES line up with data.js by position.
//
// Quotations are verbatim, including each version's own spelling (the RVA keeps
// its 1909 spelling: "á", "fué").

// Words that differ between versions. Spanish nouns carry gender, so where a
// note needs an article the term includes it ({theBoards}: las tablas / los
// tablones), and the notes avoid adjectives that would have to agree.
export const TERMS = {
  bases: { nvi: 'bases', default: 'basas' },
  boards: { nvi: 'tablones', default: 'tablas' },
  board: { nvi: 'tablón', default: 'tabla' },
  theBoards: { nvi: 'los tablones', default: 'las tablas' },
  bars: { nvi: 'travesaños', default: 'barras' },
  theBars: { nvi: 'los travesaños', default: 'las barras' },
  theMiddleBar: { nvi: 'el travesaño central', default: 'la barra del medio' },
  pillars: { nvi: 'postes', default: 'columnas' },
  thePillars: { nvi: 'los postes', default: 'las columnas' },
  acacia: { rva: 'madera de Sittim', default: 'madera de acacia' },
  bronze: { rva: 'metal', default: 'bronce' },
  blue: { rva: 'cárdeno', default: 'azul' },
  colours: { nbla: 'azul, púrpura y escarlata', nvi: 'azul, carmesí y escarlata', rvr1960: 'azul, púrpura y carmesí', rva: 'cárdeno, púrpura y carmesí' },
  theCover: { nvi: 'la tapa', rva: 'la cubierta', default: 'el propiciatorio' },
  ark: { nvi: 'arca del pacto', default: 'arca del testimonio' },
  veil: { nvi: 'cortina', default: 'velo' },
  theVeil: { nvi: 'la cortina', default: 'el velo' },
  ofTheVeil: { nvi: 'de la cortina', default: 'del velo' },
  lampstand: { rvr1960: 'candelero', rva: 'candelero', default: 'candelabro' },
  laver: { nbla: 'pila', nvi: 'recipiente de bronce', default: 'fuente' },
  theLaver: { nbla: 'la pila', nvi: 'el recipiente de bronce', default: 'la fuente' },
  court: 'atrio',
  tabernacle: { nvi: 'santuario', default: 'tabernáculo' },
  theTent: { nbla: 'la tienda de reunión', nvi: 'la Tienda de reunión', rvr1960: 'el tabernáculo de reunión', rva: 'el tabernáculo del testimonio' },
  ofTheTent: { nbla: 'de la tienda de reunión', nvi: 'de la Tienda de reunión', rvr1960: 'del tabernáculo de reunión', rva: 'del tabernáculo del testimonio' },
  clasps: { nbla: 'broches', nvi: 'ganchos', default: 'corchetes' },
  bread: { rvr1960: 'pan de la proposición', rva: 'pan de la proposición', default: 'pan de la Presencia' },
  goatsHair: { rva: 'pelo de cabras', default: 'pelo de cabra' },
  rams: { nvi: 'piel de carnero teñida de rojo', rvr1960: 'pieles de carneros teñidas de rojo', rva: 'cueros de carneros teñidos de rojo', default: 'pieles de carnero teñidas de rojo' },
  outer: { nbla: 'pieles de marsopa', nvi: 'pieles finas', rvr1960: 'pieles de tejones', rva: 'cueros de tejones' },
  theLord: { rvr1960: 'Jehová', rva: 'Jehová', default: 'el Señor' },
  ofTheLord: { rvr1960: 'de Jehová', rva: 'de Jehová', default: 'del Señor' },
  bezalel: { rvr1960: 'Bezaleel', rva: 'Bezaleel', default: 'Bezalel' },
  oholiab: 'Aholiab',
};

export const MATERIALS = {
  gold: 'Oro',
  silver: 'Plata',
  linen: { rvr1960: 'Lino torcido', rva: 'Lino torcido', default: 'Lino fino' },
  yarn: '{Colours}',
};

export const FEATURES = {
  ark: { name: '{Ark}' },
  table: { name: 'Mesa' },
  incense: { name: 'Altar de oro' },
  veil: { name: '{Veil}' },
  screen: { name: { rva: 'Cortina de la puerta', default: 'Cortina de la entrada' } },
  altar: { name: { nvi: 'Altar de los holocaustos', default: 'Altar del holocausto' } },
  gate: { name: { rva: 'Puerta del atrio', default: 'Entrada del atrio' } },
  holyPlace: { name: 'Lugar Santo' },
  mostHoly: { name: 'Lugar Santísimo' },
  sinai: { name: 'Monte Sinaí' },
};

export const TRIBES = [
  { name: 'Judá' }, { name: 'Isacar' }, { name: 'Zabulón' },
  { name: 'Rubén' }, { name: 'Simeón' }, { name: 'Gad' },
  { name: 'Efraín' }, { name: 'Manasés' }, { name: 'Benjamín' },
  { name: 'Dan' }, { name: 'Aser' }, { name: 'Neftalí' },
];
export const LEVITES = [
  { name: 'Gersonitas' }, { name: 'Coatitas' }, { name: 'Meraritas' }, { name: 'Moisés, Aarón y sus hijos' },
];

export const INTRO = {
  title: 'El desierto de Sinaí',
  ref: 'Éxodo 25:8',
  quote: {
    nbla: '«Que me hagan un santuario, para que Yo habite entre ellos».',
    nvi: '«Después me harán un santuario, para que yo habite entre ustedes».',
    rvr1960: '«Y harán un santuario para mí, y habitaré en medio de ellos».',
    rva: '«Y hacerme han un santuario, y yo habitaré entre ellos».',
  },
  note: 'En el monte, Dios mostró a Moisés el modelo de un santuario que se podía transportar (25:9, 40). Los capítulos 25–31 dan las instrucciones, y los capítulos 35–39 cuentan cómo el pueblo hizo cada pieza. En el capítulo 40 Moisés lo levantó todo en un solo día, en un orden fijo. Este recorrido sigue ese orden, y cada pieza se levanta cuando llegamos.',
  aside: 'Todo está dibujado con las medidas que da el texto, en codos (1 codo ≈ 45 cm). Donde el texto no da medida ni posición, como en el caso del {lampstand} y {theLaver}, el modelo es una suposición prudente.',
};

export const FINALE = {
  title: { rvr1960: 'La gloria de Jehová', rva: 'La gloria de Jehová', default: 'La gloria del Señor' },
  ref: 'Éxodo 40:34',
  quote: {
    nbla: '«Entonces la nube cubrió la tienda de reunión y la gloria del Señor llenó el tabernáculo».',
    nvi: '«En ese instante, la nube cubrió la Tienda de reunión y la gloria del Señor llenó el santuario».',
    rvr1960: '«Entonces una nube cubrió el tabernáculo de reunión, y la gloria de Jehová llenó el tabernáculo».',
    rva: '«Entonces una nube cubrió el tabernáculo del testimonio, y la gloria de Jehová hinchió el tabernáculo».',
  },
  note: 'Moisés no podía entrar en {theTent}, porque la nube reposaba encima (40:35). Desde entonces, la nube sobre el {tabernacle} de día, y el fuego en ella de noche, indicaban a Israel cuándo partir y cuándo quedarse (40:36–38).',
};

export const STOPS = [
  {
    title: 'Las {bases}',
    quote: {
      nbla: '«Y en el primer mes del año segundo, el día primero del mes, el tabernáculo fue levantado».',
      nvi: '«Fue así como el santuario se instaló el día primero del mes primero del año segundo».',
      rvr1960: '«Así, en el día primero del primer mes, en el segundo año, el tabernáculo fue erigido».',
      rva: '«Y así en el día primero del primer mes, en el segundo año, el tabernáculo fué erigido».',
    },
    note: 'Casi un año después de salir de Egipto, Moisés levanta el {tabernacle}, empezando por las {bases}. Bajo cada {board} van dos {bases} de plata: cien en total, contando las cuatro que hay bajo {thePillars} {ofTheVeil}. Cada una se fundió con un talento de plata entregado como rescate por los hombres contados en el censo (30:11–16; 38:25–27). A la entrada hay cinco {pillars} sobre {bases} de {bronze} (26:37).',
    size: 'Un talento cada una, unos 34 kg · 100 de plata, 5 de {bronze}',
  },
  {
    title: '{TheBoards} y {theBars}',
    quote: {
      nbla: '«Moisés levantó el tabernáculo y puso sus basas, colocó sus tablas, metió sus barras y erigió sus columnas».',
      nvi: '«Al instalar el santuario, Moisés puso en su lugar las bases, levantó los tablones, los insertó en los travesaños y levantó los postes».',
      rvr1960: '«Moisés hizo levantar el tabernáculo, y asentó sus basas, y colocó sus tablas, y puso sus barras, e hizo alzar sus columnas».',
      rva: '«Y Moisés hizo levantar el tabernáculo, y asentó sus basas, y colocó sus tablas, y puso sus barras, é hizo alzar sus columnas».',
    },
    note: 'Cada {board} es de {acacia} cubierta de oro, de diez codos de alto y un codo y medio de ancho (26:16, 29). Veinte se levantan en el lado sur, veinte en el norte y seis al fondo, con dos más en las esquinas de atrás (26:18–23). Cinco {bars} a cada lado sujetan el conjunto, y {theMiddleBar} va de un extremo a otro (26:26–28). Luego se levantan {thePillars}: cuatro para {theVeil} y cinco para la entrada.',
    size: 'Cada {board}: 10 × 1½ codos (4.5 × 0.7 m) · 48 en total',
    made: 'Los artesanos hábiles (36:8, 20–38)',
  },
  {
    title: 'Las cortinas',
    quote: {
      nbla: '«Harás el tabernáculo con diez cortinas de lino fino torcido, y tela azul, púrpura y escarlata. Las harás con querubines, obra de hábil artífice».',
      nvi: '«Haz el santuario con diez cortinas de tela de lino fino y de lana color azul, carmesí y escarlata, con querubines artísticamente bordados en ellas».',
      rvr1960: '«Harás el tabernáculo de diez cortinas de lino torcido, azul, púrpura y carmesí; y lo harás con querubines de obra primorosa».',
      rva: '«Y harás el tabernáculo de diez cortinas de lino torcido, cárdeno, y púrpura, y carmesí: y harás querubines de obra delicada».',
    },
    note: 'En sentido estricto, «el {tabernacle}» son estas diez cortinas de lino (26:1). Cada una mide 28 codos por 4. Se cosen en dos grupos de cinco, y cincuenta {clasps} de oro unen los dos grupos (26:3–6). Extendidas sobre {theBoards}, forman el techo, y desde dentro se ven por encima los querubines tejidos.',
    size: 'Diez cortinas, cada una de 28 × 4 codos (12.6 × 1.8 m)',
    made: 'Los artesanos hábiles (36:8–13)',
  },
  {
    title: 'La tienda y sus cubiertas',
    quote: {
      nbla: '«Y extendió la tienda sobre el tabernáculo y puso la cubierta de la tienda arriba, sobre él, tal como el Señor había mandado a Moisés».',
      nvi: '«Luego extendió la tienda de campaña sobre el santuario y encima de esta puso el toldo, tal y como el Señor se lo mandó».',
      rvr1960: '«Levantó la tienda sobre el tabernáculo, y puso la sobrecubierta encima del mismo, como Jehová había mandado a Moisés».',
      rva: '«Y extendió la tienda sobre el tabernáculo, y puso la sobrecubierta encima del mismo; como Jehová había mandado á Moisés».',
    },
    note: 'Sobre el lino va una tienda de once cortinas de {goatsHair}, cada una de 30 codos por 4, unidas con {clasps} de {bronze}; la sexta se dobla en la parte delantera (26:7–11). Encima van dos cubiertas más, de {rams} y de {outer} (26:14). No se dan sus medidas, así que se dibujan solo sobre el techo. Es la primera de las siete veces que el capítulo 40 dice que Moisés lo hizo como {theLord} le había mandado.',
    size: '{GoatsHair}: once cortinas, cada una de 30 × 4 codos (13.5 × 1.8 m)',
    made: 'Los artesanos hábiles (36:14–19)',
  },
  {
    title: 'El arca',
    quote: {
      nbla: '«Entonces tomó el testimonio y lo puso en el arca, colocó las varas en el arca y puso el propiciatorio arriba, sobre el arca».',
      nvi: '«A continuación, tomó las tablas del pacto y las puso en el arca; luego ajustó las varas al arca, y sobre ella puso la tapa».',
      rvr1960: '«Y tomó el testimonio y lo puso dentro del arca, y colocó las varas en el arca, y encima el propiciatorio sobre el arca».',
      rva: '«Y tomó y puso el testimonio dentro del arca, y colocó las varas en el arca, y encima la cubierta sobre el arca».',
    },
    note: 'Un cofre de {acacia} cubierta de oro puro por dentro y por fuera, con una moldura de oro y cuatro anillos de oro para las varas (25:10–15). Dentro van las dos tablas de piedra (31:18). Encima va {theCover}, de oro puro, con dos querubines de oro labrados en la misma pieza, uno frente al otro, con las alas extendidas por encima (25:17–20). Dios prometió encontrarse allí con Moisés, entre los querubines (25:22).',
    size: '2½ × 1½ × 1½ codos (1.1 × 0.7 × 0.7 m)',
  },
  {
    title: '{TheVeil}',
    quote: {
      nbla: '«Y metió el arca en el tabernáculo y puso un velo por cortina y cubrió el arca del testimonio, tal como el Señor había mandado a Moisés».',
      nvi: '«Llevó el arca al interior del santuario y colgó la cortina para resguardarla. De este modo, protegió el arca con las tablas del pacto, tal y como el Señor se lo había ordenado».',
      rvr1960: '«Luego metió el arca en el tabernáculo, y puso el velo extendido, y ocultó el arca del testimonio, como Jehová había mandado a Moisés».',
      rva: '«Y metió el arca en el tabernáculo, y puso el velo de la tienda, y cubrió el arca del testimonio; como Jehová había mandado á Moisés».',
    },
    note: '{TheVeil} es de tela {colours} y lino fino, con querubines labrados (26:31). Cuelga de ganchos de oro en cuatro {pillars}, debajo de los {clasps} (26:32–33), y separa el Lugar Santo del Lugar Santísimo, un cubo de diez codos por lado. Solo el sumo sacerdote pasaba al otro lado, una vez al año (Lv 16).',
    size: 'Lugar Santísimo: 10 × 10 × 10 codos (4.5 m por lado)',
  },
  {
    title: 'La mesa',
    quote: {
      nbla: '«Puso también la mesa en la tienda de reunión, en el lado norte del tabernáculo, fuera del velo; y puso en orden sobre ella los panes delante del Señor…»',
      nvi: '«Moisés puso la mesa en la Tienda de reunión, en el lado norte del santuario, fuera de la cortina, y puso el pan en orden ante el Señor…»',
      rvr1960: '«Puso la mesa en el tabernáculo de reunión, al lado norte de la cortina, fuera del velo, y sobre ella puso por orden los panes delante de Jehová…»',
      rva: '«Y puso la mesa en el tabernáculo del testimonio, al lado septentrional del pabellón, fuera del velo: Y sobre ella puso por orden los panes delante de Jehová…»',
    },
    note: 'De {acacia} cubierta de oro puro, con una moldura de oro, un borde de un palmo de ancho y anillos para sus varas (25:23–28). Sobre ella estaba siempre el {bread} delante {ofTheLord} (25:30). Levítico 24:5–6 habla de doce panes, puestos en dos hileras de seis.',
    size: '2 × 1 × 1½ codos (90 × 45 × 70 cm)',
  },
  {
    title: 'El {lampstand}',
    quote: {
      nbla: '«Entonces colocó el candelabro en la tienda de reunión, frente a la mesa, en el lado sur del tabernáculo, y encendió las lámparas delante del Señor…»',
      nvi: '«Colocó luego el candelabro en la Tienda de reunión, frente a la mesa, en el lado sur del santuario, y encendió las lámparas ante el Señor…»',
      rvr1960: '«Puso el candelero en el tabernáculo de reunión, enfrente de la mesa, al lado sur de la cortina, y encendió las lámparas delante de Jehová…»',
      rva: '«Y puso el candelero en el tabernáculo del testimonio, enfrente de la mesa, al lado meridional del pabellón. Y encendió las lámparas delante de Jehová…»',
    },
    note: 'Labrado a martillo de un talento de oro puro: una caña central con tres brazos a cada lado, adornados con copas en forma de flor de almendro (25:31–39). Sus siete lámparas alumbran el espacio que tiene delante (25:37), la única luz del Lugar Santo. No se da su altura.',
    size: 'Altura no indicada · un talento de oro, unos 34 kg',
  },
  {
    title: 'El altar de oro',
    quote: {
      nbla: '«Luego colocó el altar de oro en la tienda de reunión, delante del velo; y quemó en él incienso aromático…»',
      nvi: '«Puso también el altar de oro en la Tienda de reunión, frente a la cortina, y sobre él quemó incienso aromático…»',
      rvr1960: '«Puso también el altar de oro en el tabernáculo de reunión, delante del velo, y quemó sobre él incienso aromático…»',
      rva: '«Puso también el altar de oro en el tabernáculo del testimonio, delante del velo: Y encendió sobre él el perfume aromático…»',
    },
    note: 'El altar del incienso: de {acacia} cubierta de oro puro, con cuernos en sus esquinas, una moldura de oro y anillos para las varas (30:1–5). Está delante {ofTheVeil}, frente al arca que queda detrás (30:6). Cada mañana y cada tarde, cuando se preparaban las lámparas, se quemaba incienso sobre él (30:7–8).',
    size: '1 × 1 × 2 codos (45 × 45 × 90 cm)',
  },
  {
    title: { rva: 'La cortina de la puerta', default: 'La cortina de la entrada' },
    quote: {
      nbla: '«Después colocó la cortina para la entrada del tabernáculo».',
      nvi: '«Después de eso colgó la cortina a la entrada del santuario».',
      rvr1960: '«Puso asimismo la cortina a la entrada del tabernáculo».',
      rva: '«Puso asimismo la cortina de la puerta del tabernáculo».',
    },
    note: 'El {tabernacle} mira al este, con la parte trasera hacia el oeste (26:22). La entrada se cierra con una cortina de tela {colours} y lino fino, bordada pero sin los querubines {ofTheVeil} (26:36). Cuelga de ganchos de oro en cinco {pillars} de {acacia} cubierta de oro, sobre {bases} de {bronze} (26:37).',
  },
  {
    title: { nvi: 'El altar de los holocaustos', default: 'El altar del holocausto' },
    quote: {
      nbla: '«…y puso el altar del holocausto delante de la entrada del tabernáculo de la tienda de reunión, y ofreció sobre él el holocausto y la ofrenda de cereal…»',
      nvi: '«Moisés puso también el altar de los holocaustos a la entrada del santuario, la Tienda de reunión, y sobre él ofreció holocaustos y ofrendas de grano…»',
      rvr1960: '«Y colocó el altar del holocausto a la entrada del tabernáculo, del tabernáculo de reunión, y sacrificó sobre él holocausto y ofrenda…»',
      rva: '«Y colocó el altar del holocausto á la puerta del tabernáculo, del tabernáculo del testimonio; y ofreció sobre él holocausto y presente…»',
    },
    note: 'Una caja hueca de tablas de {acacia} cubierta de {bronze}, con un cuerno en cada esquina, una rejilla de {bronze} a media altura, y anillos y varas para transportarla (27:1–8). Está al aire libre, delante de la entrada. No se dice a qué distancia de la puerta.',
    size: '5 × 5 × 3 codos (2.3 × 2.3 × 1.4 m)',
  },
  {
    title: '{TheLaver}',
    quote: {
      nbla: '«Puso la pila entre la tienda de reunión y el altar, y puso en ella agua para lavarse, y Moisés, Aarón y sus hijos se lavaban las manos y los pies en ella».',
      nvi: '«Colocó luego el recipiente de bronce entre la Tienda de reunión y el altar, y echó en ella agua para lavarse, y Moisés, Aarón y sus hijos se lavaron allí las manos y los pies».',
      rvr1960: '«Y puso la fuente entre el tabernáculo de reunión y el altar, y puso en ella agua para lavar. Y Moisés y Aarón y sus hijos lavaban en ella sus manos y sus pies».',
      rva: '«Y puso la fuente entre el tabernáculo del testimonio y el altar; y puso en ella agua para lavar. Y Moisés y Aarón y sus hijos lavaban en ella sus manos y sus pies».',
    },
    note: 'Se hizo de {bronze}, con su base de {bronze}, a partir de los espejos de las mujeres que servían a la entrada {ofTheTent} (38:8). Los sacerdotes se lavaban aquí cada vez que entraban en la tienda o se acercaban al altar (30:19–21). No se dan su tamaño ni su forma. Aarón lleva las vestiduras del sumo sacerdote (28:4–39): una túnica de lino tejida a cuadros; el manto de {blue}, con campanillas de oro y granadas alrededor del borde; el efod, con una piedra de ónice en cada hombro; el pectoral con doce piedras, una por cada tribu; y la mitra de lino con su lámina de oro. Sus hijos llevan túnicas de lino, cinturones y gorros (28:40).',
    size: 'Tamaño y forma no indicados',
  },
  {
    title: 'El {court}',
    quote: {
      nbla: '«Moisés levantó el atrio alrededor del tabernáculo y del altar, y colgó la cortina para la entrada del atrio. Así terminó Moisés la obra».',
      nvi: '«Después levantó Moisés el atrio en torno al santuario y al altar, y colgó la cortina a la entrada del atrio. Así terminó Moisés la obra».',
      rvr1960: '«Finalmente erigió el atrio alrededor del tabernáculo y del altar, y puso la cortina a la entrada del atrio. Así acabó Moisés la obra».',
      rva: '«Finalmente erigió el atrio en derredor del tabernáculo y del altar, y puso la cortina de la puerta del atrio. Y así acabó Moisés la obra».',
    },
    note: 'Cien codos por cincuenta, cerrado con cortinas de lino fino de cinco codos de alto, colgadas de {pillars} con {bases} de {bronze} y con ganchos y molduras de plata, y sujetas con estacas y cuerdas de {bronze} (27:9–19; 35:18). La entrada, al este, mide veinte codos de ancho y tiene una cortina de {colours} (27:16). Sesenta {pillars}, a cinco codos de distancia, cuadran con las cantidades que se dan para cada lado.',
    size: '100 × 50 codos (45 × 22.5 m)',
  },
];
