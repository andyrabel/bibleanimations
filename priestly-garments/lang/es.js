// Spanish text for "The Priestly Garments", merged over data.js (see addLanguage in ../../i18n.js).
// Same shape as data.js, text fields only. Version keys are the Spanish versions
// (nbla, nvi, rvr1960, rva); `default` covers the ones not listed. STOPS and
// STONES line up with data.js by position.
//
// Quotations are verbatim, including each version's own spelling (the RVA keeps
// its 1909 spelling: "á", "lavólos").

// Words that differ between versions. Spanish nouns carry gender, so where a
// note needs an article the term includes it ({theSash}: el cinturón / la
// faja), and the notes avoid adjectives that would have to agree.
export const TERMS = {
  tunic: 'túnica',
  theTunic: 'la túnica',
  sash: { nbla: 'cinturón', nvi: 'faja', default: 'cinto' },
  theSash: { nbla: 'el cinturón', nvi: 'la faja', default: 'el cinto' },
  band: { nbla: 'cinto tejido', nvi: 'cinta', rvr1960: 'cinto del efod', rva: 'cinto del ephod' },
  theBand: { nbla: 'el cinto tejido', nvi: 'la cinta', rvr1960: 'el cinto del efod', rva: 'el cinto del ephod' },
  ofTheBand: { nbla: 'del cinto tejido', nvi: 'de la cinta', rvr1960: 'del cinto del efod', rva: 'del cinto del ephod' },
  ephod: { rva: 'ephod', default: 'efod' },
  breastpiece: { rva: 'racional', default: 'pectoral' },
  turban: { nbla: 'tiara', nvi: 'turbante', default: 'mitra' },
  theTurban: { nbla: 'la tiara', nvi: 'el turbante', default: 'la mitra' },
  ofTheTurban: { nbla: 'de la tiara', nvi: 'del turbante', default: 'de la mitra' },
  plate: { nvi: 'placa de oro', rva: 'plancha de oro', default: 'lámina de oro' },
  theCaps: { nbla: 'tiaras', nvi: 'mitras', rvr1960: 'tiaras', rva: 'chapeos' },
  theUndergarments: { nvi: 'ropa interior de lino', rva: 'pañetes de lino', default: 'calzoncillos de lino' },
  theUrim: { nbla: 'el Urim y el Tumim', nvi: 'el urim y el tumim', rvr1960: 'los Urim y Tumim', rva: 'el Urim y Thummim' },
  urim: { rva: 'Urim y Thummim', default: 'Urim y Tumim' },
  ithamar: { rva: 'Ithamar', default: 'Itamar' },
  blue: { rva: 'cárdeno', default: 'azul' },
  colours: { nbla: 'azul, púrpura y escarlata', nvi: 'azul, carmesí y escarlata', rvr1960: 'azul, púrpura y carmesí', rva: 'cárdeno, púrpura y carmesí' },
  theLaver: { nbla: 'la pila', nvi: 'el recipiente de bronce', default: 'la fuente' },
  theTent: { nbla: 'la tienda de reunión', nvi: 'la Tienda de reunión', rvr1960: 'el tabernáculo de reunión', rva: 'el tabernáculo del testimonio' },
  ofTheTent: { nbla: 'de la tienda de reunión', nvi: 'de la Tienda de reunión', rvr1960: 'del tabernáculo de reunión', rva: 'del tabernáculo del testimonio' },
  ofTheLord: { rvr1960: 'de Jehová', rva: 'de Jehová', default: 'del Señor' },
  glory: { nbla: 'para gloria y hermosura', nvi: 'para darles honra y dignidad', default: 'para honra y hermosura' },
  // The words engraved on the plate (Éxodo 28:36).
  holy: { nbla: 'Santidad al Señor', nvi: 'Consagrado al Señor', rvr1960: 'SANTIDAD A JEHOVÁ', rva: 'SANTIDAD A JEHOVA' },
};

export const MATERIALS = {
  linen: { rvr1960: 'Lino torcido', rva: 'Lino torcido', default: 'Lino fino' },
  yarn: '{Colours}',
  gold: 'Oro',
  stones: 'Piedras preciosas',
};

export const PEOPLE = {
  aaron: { name: 'Aarón' },
  moses: { name: 'Moisés' },
  abihu: { name: 'Abiú' },
  ithamar: { name: '{Ithamar}' },
};

export const PARTS = {
  tunic: { name: '{Tunic}' },
  sash: { name: '{Sash}' },
  robe: { name: 'Manto' },
  ephod: { name: '{Ephod}' },
  onyx: { name: 'Piedras de ónice' },
  band: { name: '{Band}' },
  breastpiece: { name: '{Breastpiece}' },
  urim: { name: '{Urim}' },
  turban: { name: '{Turban}' },
  plate: { name: '{Plate}' },
};

export const STONES = [
  { name: { nbla: 'rubí', nvi: 'rubí', default: 'piedra sárdica' } },
  { name: { nvi: 'crisólito', default: 'topacio' } },
  { name: { nbla: 'esmeralda', nvi: 'esmeralda', default: 'carbunclo' } },
  { name: { nbla: 'turquesa', nvi: 'turquesa', default: 'esmeralda' } },
  { name: 'zafiro' },
  { name: { nvi: 'jade', default: 'diamante' } },
  { name: { rva: 'rubí', default: 'jacinto' } },
  { name: 'ágata' },
  { name: 'amatista' },
  { name: { nvi: 'topacio', default: 'berilo' } },
  { name: { rva: 'onix', default: 'ónice' } },
  { name: 'jaspe' },
];

export const INTRO = {
  title: { rva: 'Vestidos sagrados', default: 'Vestiduras sagradas' },
  ref: 'Éxodo 28:2',
  quote: {
    nbla: '«Harás vestiduras sagradas para tu hermano Aarón, para gloria y hermosura».',
    nvi: '«Hazle a tu hermano Aarón vestiduras sagradas que le confieran honra y dignidad».',
    rvr1960: '«Y harás vestiduras sagradas a Aarón tu hermano, para honra y hermosura».',
    rva: '«Y harás vestidos sagrados á Aarón tu hermano, para honra y hermosura».',
  },
  note: 'Dios mandó a Moisés hacer vestiduras para Aarón y sus hijos, para que le sirvieran como sacerdotes (28:1–4). Éxodo 28 describe cada pieza y Éxodo 39 cuenta cómo se hizo. En Levítico 8, a la entrada {ofTheTent}, con toda la congregación reunida, Moisés lavó a Aarón y lo vistió, una prenda tras otra. Este recorrido sigue ese orden.',
  aside: 'Las medidas están en codos (1 codo ≈ 45 cm) cuando el texto las da. La mayoría de las formas y los largos no se dan, así que son una suposición prudente; las notas indican dónde.',
};

export const FINALE = {
  title: { nbla: 'Para gloria y hermosura', nvi: 'Honra y dignidad', default: 'Para honra y hermosura' },
  ref: 'Levítico 8:13',
  quote: {
    nbla: '«Luego Moisés hizo que los hijos de Aarón se acercaran y los vistió con túnicas, los ciñó con cinturones, y les ajustó las tiaras tal como el Señor había ordenado a Moisés».',
    nvi: '«Acto seguido, Moisés hizo que los hijos de Aarón se acercaran. Entonces los vistió con las túnicas, se las ciñó con la faja y les sujetó las mitras, tal como el Señor se lo había mandado».',
    rvr1960: '«Después Moisés hizo acercarse los hijos de Aarón, y les vistió las túnicas, les ciñó con cintos, y les ajustó las tiaras, como Jehová lo había mandado a Moisés».',
    rva: '«Después Moisés hizo llegar los hijos de Aarón, y vistióles las túnicas, y ciñólos con cintos…»',
  },
  note: 'Entre vestir a Aarón y a sus hijos, Moisés ungió el tabernáculo y todo lo que había en él, y derramó el aceite de la unción sobre la cabeza de Aarón (8:10–12). También las vestiduras de los hijos se hicieron {glory} (28:40). Durante siete días los sacerdotes se quedaron a la entrada {ofTheTent} hasta completar su consagración (8:33–35).',
};

export const STOPS = [
  {
    title: 'El lavamiento', ref: 'Levítico 8:6',
    quote: {
      nbla: '«Entonces Moisés hizo que Aarón y sus hijos se acercaran, y los lavó con agua».',
      nvi: '«Acto seguido, Moisés hizo que se acercaran Aarón y sus hijos y los lavó con agua».',
      rvr1960: '«Entonces Moisés hizo acercarse a Aarón y a sus hijos, y los lavó con agua».',
      rva: '«Entonces Moisés hizo llegar á Aarón y á sus hijos, y lavólos con agua».',
    },
    note: 'Moisés lleva a Aarón y a sus cuatro hijos, Nadab, Abiú, Eleazar e {ithamar} (Éxodo 28:1), hasta {theLaver}, entre {theTent} y el altar, y los lava. Los sacerdotes se lavaban allí las manos y los pies cada vez que entraban a servir (30:19–21; 40:31–32). El texto no dice cómo se sacaba el agua; aquí Moisés la vierte con un cántaro, primero sobre las manos de cada uno y luego sobre sus pies. Debajo de todo, los sacerdotes llevaban {theUndergarments}, desde la cintura hasta los muslos (28:42–43).',
    made: 'Los artesanos (39:28)',
  },
  {
    title: '{TheTunic}', ref: 'Levítico 8:7',
    quote: {
      nbla: '«Puso sobre él la túnica…»',
      nvi: '«A Aarón le puso la túnica…»',
      rvr1960: '«Y puso sobre él la túnica…»',
      rva: '«Y puso sobre él la túnica…»',
    },
    note: 'Primero se pone {theTunic}, sobre la ropa interior. Es de lino fino, tejida a cuadros (28:39). No se describen su largo ni sus mangas; aquí llega hasta los tobillos. Se tejieron túnicas iguales para los hijos de Aarón (39:27).',
    size: 'No se da',
    made: 'Los artesanos (39:27)',
  },
  {
    title: '{TheSash}', ref: 'Levítico 8:7',
    quote: {
      nbla: '«…lo ciñó con el cinturón…»',
      nvi: '«…y se la ciñó con la faja…»',
      rvr1960: '«…y le ciñó con el cinto…»',
      rva: '«…y ciñólo con el cinto…»',
    },
    note: 'Lino fino torcido e hilo de {colours}, obra de bordador (28:39; 39:29). El texto no dice qué largo tenía ni cómo se ataba; aquí rodea la cintura y sus extremos cuelgan por delante. El manto va encima.',
    size: 'No se da',
    made: 'Los bordadores (39:29)',
  },
  {
    title: 'El manto', ref: 'Levítico 8:7',
    quote: {
      nbla: '«…y lo vistió con el manto…»',
      nvi: '«…luego lo cubrió con el manto…»',
      rvr1960: '«…le vistió después el manto…»',
      rva: '«…vistióle después el manto…»',
    },
    note: 'El manto del {ephod} es todo de {blue}, tejido de una pieza, con una abertura para la cabeza reforzada con un borde tejido para que no se rompiera (28:31–32; 39:22–23). Alrededor del borde inferior cuelgan granadas de {colours}, con una campanilla de oro entre cada una (28:33–34). Las campanillas debían oírse cuando Aarón entraba en el lugar santo y cuando salía, para que no muriera (28:35). No se dan el largo ni el número: aquí llega a la pantorrilla, con 18 de cada una.',
    size: 'No se da',
    made: 'Los tejedores (39:22–26)',
  },
  {
    title: 'El {ephod}', ref: 'Levítico 8:7',
    quote: {
      nbla: '«…luego le puso el efod, y lo ciñó con el cinto tejido del efod, con el cual se lo ató».',
      nvi: '«…y encima le puso el efod, ciñéndoselo con la cinta del mismo».',
      rvr1960: '«…y puso sobre él el efod, y lo ciñó con el cinto del efod, y lo ajustó con él».',
      rva: '«…y puso sobre él el ephod, y ciñólo con el cinto del ephod, y ajustólo con él».',
    },
    note: 'Oro, hilo de {colours} y lino fino torcido, obra de artesano (28:6); el oro se batió en láminas finas y se cortó en hilos para tejerlo (39:3). Dos hombreras lo unen por delante y por detrás, y {theBand} es de la misma obra (28:7–8). En cada hombro, una piedra de ónice engastada en oro lleva grabados seis nombres de los hijos de Israel, por orden de nacimiento, para que Aarón lleve sus nombres delante {ofTheLord} (28:9–12). No se da su forma; aquí cubre el cuerpo del pecho a las caderas.',
    made: 'Los artesanos (39:2–7)',
  },
  {
    title: 'El {breastpiece}', ref: 'Levítico 8:8',
    quote: {
      nbla: '«Después le puso el pectoral…»',
      nvi: '«Enseguida le colocó el pectoral…»',
      rvr1960: '«Luego le puso encima el pectoral…»',
      rva: '«Púsole luego encima el racional…»',
    },
    note: 'Hecho como el {ephod} y doblado en un cuadrado de un palmo por lado (28:15–16). Lleva doce piedras en cuatro hileras, cada una engastada en oro y grabada con el nombre de una de las tribus, para que Aarón lleve sus nombres sobre el corazón (28:17–21, 29). Unas cadenillas de oro atan sus esquinas de arriba a los engastes de los hombros, y un cordón {blue} ata sus anillos de abajo al {ephod}, justo encima {ofTheBand}, para que no se suelte (28:22–28). El texto no da el orden de los nombres; aquí se sigue el orden de nacimiento.',
    size: 'Un palmo por lado, unos 22 cm, doblado',
    made: 'Los artesanos (39:8–21)',
  },
  {
    title: '{TheUrim}', ref: 'Levítico 8:8',
    quote: {
      nbla: '«…y dentro del pectoral puso el Urim y el Tumim».',
      nvi: '«…y sobre este puso el urim y el tumim».',
      rvr1960: '«…y puso dentro del mismo los Urim y Tumim».',
      rva: '«…y en él puso el Urim y Thummim».',
    },
    note: 'Se ponen dentro del {breastpiece} doblado, para que estén sobre el corazón de Aarón cuando entra delante {ofTheLord} (28:30). Por medio de ellos el sacerdote consultaba las decisiones {ofTheLord} para Israel (Números 27:21). El texto nunca dice de qué estaban hechos ni cómo eran, así que aquí son solo dos formas sencillas metidas en la bolsa.',
    size: 'No se describen',
  },
  {
    title: '{TheTurban}', ref: 'Levítico 8:9',
    quote: {
      nbla: '«Puso también la tiara sobre su cabeza…»',
      nvi: '«Por último, le colocó el turbante en la cabeza…»',
      rvr1960: '«Después puso la mitra sobre su cabeza…»',
      rva: '«Después puso la mitra sobre su cabeza…»',
    },
    note: 'De lino fino (28:39; 39:28). No se describe su forma; aquí es una tela larga enrollada alrededor de la cabeza. Los hijos de Aarón llevaban {theCaps} (28:40).',
    size: 'No se da',
    made: 'Los artesanos (39:28)',
  },
  {
    title: 'La {plate}', ref: 'Levítico 8:9',
    quote: {
      nbla: '«…y sobre la tiara, al frente, puso la lámina de oro, la diadema santa, tal como el Señor había ordenado a Moisés».',
      nvi: '«…y en la parte delantera puso la placa de oro, la tiara sagrada, tal como el Señor se lo había mandado».',
      rvr1960: '«…y sobre la mitra, en frente, puso la lámina de oro, la diadema santa, como Jehová había mandado a Moisés».',
      rva: '«…y sobre la mitra en su frente delantero puso la plancha de oro, la diadema santa; como Jehová había mandado á Moisés».',
    },
    note: 'De oro puro, con las palabras «{holy}» grabadas como en un sello (28:36; 39:30), aquí en hebreo. Un cordón {blue} la ata al frente {ofTheTurban} (28:37), de modo que descansa sobre la frente de Aarón: él lleva la culpa de las ofrendas santas que Israel presenta, para que sean aceptadas delante {ofTheLord} (28:38). No se da su tamaño.',
    size: 'No se da',
    made: 'Los artesanos (39:30–31)',
  },
];
