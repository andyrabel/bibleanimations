// Spanish text for "Solomon's Temple", merged over data.js (see addLanguage in ../../i18n.js).
// Same shape as data.js, text fields only. Version keys are the Spanish versions
// (nbla, nvi, rvr1960, rva); `default` covers the ones not listed. STOPS line up
// with data.js by position.
//
// Quotations are verbatim, including each version's own spelling (the RVA keeps
// its 1909 spelling: "á", "fué"). Where the RVA opens a chapter in capitals
// ("Y COMENZO", "HIZO"), the quotation starts after them.

// Spanish nouns carry gender, so where a note needs an article the term
// includes it ({theHouse}: la casa / el templo), and the notes avoid adjectives that would have to agree.
export const TERMS = {
  house: { nvi: 'templo', default: 'casa' },
  theHouse: { nvi: 'el templo', default: 'la casa' },
  ofTheHouse: { nvi: 'del templo', default: 'de la casa' },
  porch: { nvi: 'vestíbulo', default: 'pórtico' },
  thePorch: { nvi: 'el vestíbulo', default: 'el pórtico' },
  theMainRoom: { nbla: 'la nave', nvi: 'la nave central', default: 'el templo' },
  ofTheMainRoom: { nbla: 'de la nave', nvi: 'de la nave central', default: 'del templo' },
  inner: { rvr1960: 'lugar santísimo', rva: 'oráculo', default: 'santuario interior' },
  theInner: { rvr1960: 'el lugar santísimo', rva: 'el oráculo', default: 'el santuario interior' },
  ofTheInner: { rvr1960: 'del lugar santísimo', rva: 'del oráculo', default: 'del santuario interior' },
  cypress: { rva: 'madera de haya', default: 'madera de ciprés' },
  olive: { rva: 'madera de oliva', default: 'madera de olivo' },
  bronze: 'bronce',
  court: 'atrio',
  hiram: 'Hiram',
  jachin: { rva: 'Jachîn', default: 'Jaquín' },
  oxen: 'bueyes',
  stands: { nvi: 'bases', default: 'basas' },
  basins: { nbla: 'pilas', nvi: 'recipientes', default: 'fuentes' },
  lampstands: { nbla: 'candelabros', nvi: 'candelabros', default: 'candeleros' },
  theVeil: { nvi: 'la cortina', default: 'el velo' },
  ziv: { rva: 'Ziph', default: 'Zif' },
  theLord: { rvr1960: 'Jehová', rva: 'Jehová', default: 'el Señor' },
  ofTheLord: { rvr1960: 'de Jehová', rva: 'de Jehová', default: 'del Señor' },
};

export const MATERIALS = {
  stone: 'Piedra',
  cedar: 'Cedro',
  cypress: { rva: 'Haya', default: 'Ciprés' },
  olive: { rva: 'Oliva', default: 'Olivo' },
  gold: 'Oro',
  bronze: 'Bronce',
};

export const FEATURES = {
  mainRoom: { name: { nbla: 'Nave', nvi: 'Nave central', default: 'Templo' } },
  mostHoly: { name: 'Lugar Santísimo' },
  porch: { name: { nvi: 'Vestíbulo', default: 'Pórtico' } },
  chambers: { name: { nbla: 'Cámaras laterales', nvi: 'Anexo', default: 'Aposentos' } },
  stair: { name: 'Escalera de caracol' },
  incense: { name: 'Altar de oro' },
  cherubim: { name: 'Querubines' },
  innerDoors: { name: { rvr1960: 'Puertas del santuario', rva: 'Puertas del oráculo', default: 'Puertas del santuario interior' } },
  veil: { name: { nvi: 'Cortina', default: 'Velo' } },
  doors: { name: { nbla: 'Puertas de la nave', nvi: 'Puertas de la nave central', default: 'Puertas del templo' } },
  lampstands: { name: { nbla: 'Candelabros', nvi: 'Candelabros', default: 'Candeleros' } },
  tables: { name: 'Mesas' },
  jachin: { name: '{Jachin}' },
  boaz: { name: 'Boaz' },
  sea: { name: { nvi: 'La fuente', default: 'El mar' } },
  standsS: { name: { nvi: 'Bases', default: 'Basas' } },
  standsN: { name: { nvi: 'Bases', default: 'Basas' } },
  altar: { name: 'Altar de bronce' },
  innerCourt: { name: 'Atrio interior' },
  greatCourt: { name: 'Atrio grande' },
  cityOfDavid: { name: 'Ciudad de David' },
  kidron: { name: 'Valle del Cedrón' },
  olives: { name: 'Monte de los Olivos' },
};

export const INTRO = {
  title: 'Jerusalén, el monte Moriah',
  ref: '1 Reyes 6:1',
  quote: {
    nbla: '«Y sucedió que en el año 480 después que los israelitas salieron de la tierra de Egipto, en el cuarto año del reinado de Salomón sobre Israel, en el mes de Zif, que es el segundo mes, comenzó Salomón a edificar la casa del Señor.»',
    nvi: '«Salomón comenzó a construir el templo del Señor en el cuarto año de su reinado en Israel, en el mes de zif, que es el mes segundo. Habían transcurrido cuatrocientos ochenta años desde que los israelitas salieron de Egipto.»',
    rvr1960: '«En el año cuatrocientos ochenta después que los hijos de Israel salieron de Egipto, el cuarto año del principio del reino de Salomón sobre Israel, en el mes de Zif, que es el mes segundo, comenzó él a edificar la casa de Jehová.»',
    rva: '«…en el año cuatrocientos ochenta después que los hijos de Israel salieron de Egipto, en el cuarto año del principio del reino de Salomón sobre Israel, en el mes de Ziph, que es el mes segundo, que él comenzó á edificar la casa de Jehová.»',
  },
  note: 'David quería edificar una casa para {theLord}, pero Dios le dijo que la edificaría su hijo (2 Samuel 7:12–13; 1 Reyes 5:3–5). Salomón hizo un pacto con Hiram, rey de Tiro, para obtener cedro y ciprés del Líbano, y sus hombres sacaron grandes piedras para los cimientos (5:6–18). Este recorrido sigue 1 Reyes 6–7, con lo que añade 2 Crónicas 3–4, y cada parte se levanta al llegar.',
  aside: 'Todo está dibujado a las medidas que da el texto, en codos. 2 Crónicas 3:3 dice que el codo era «de la medida antigua»; aquí 1 codo ≈ 45 cm. Donde el texto no da medida ni posición, como en el grosor de los muros o en los atrios, el modelo es una suposición, y las notas lo dicen. Las pocas personas solo están para mostrar la escala.',
};

export const FINALE = {
  title: 'La palabra {ofTheLord} a Salomón',
  ref: '1 Reyes 6:13',
  quote: {
    nbla: '«Habitaré en medio de los israelitas, y no abandonaré a Mi pueblo Israel.»',
    nvi: '«Entonces viviré entre los israelitas y no abandonaré a mi pueblo Israel.»',
    rvr1960: '«…y habitaré en ella en medio de los hijos de Israel, y no dejaré a mi pueblo Israel.»',
    rva: '«Y habitaré en medio de los hijos de Israel, y no dejaré á mi pueblo Israel.»',
  },
  note: 'La palabra vino mientras se edificaba la casa, y vino con una condición: si Salomón andaba en los estatutos de Dios, Dios cumpliría su promesa a David (6:11–12). Cuando la casa fue dedicada, la nube la llenó, y los sacerdotes no podían quedarse a ministrar (8:10–11). Unos cuatro siglos después, los babilonios la quemaron (2 Reyes 25:9).',
};

export const STOPS = [
  {
    title: 'El monte Moriah', ref: '2 Crónicas 3:1',
    quote: {
      nbla: '«Entonces Salomón comenzó a edificar la casa del Señor en Jerusalén en el monte Moriah, donde el Señor se había aparecido a su padre David, en el lugar que David había preparado en la era de Ornán jebuseo.»',
      nvi: '«Salomón comenzó a construir el templo del Señor en el monte Moria, en Jerusalén, donde el Señor había aparecido a su padre David. Lo construyó en el lugar que David había destinado, esto es, en el lugar donde Arauna el jebuseo limpiaba el trigo.»',
      rvr1960: '«Comenzó Salomón a edificar la casa de Jehová en Jerusalén, en el monte Moriah, que había sido mostrado a David su padre, en el lugar que David había preparado en la era de Ornán jebuseo.»',
      rva: '«…Salomón á edificar la casa en Jerusalem, en el monte Moria que había sido mostrado á David su padre, en el lugar que David había preparado en la era de Ornán Jebuseo.»',
    },
    note: 'David compró esta era en el monte al norte de su ciudad y edificó allí un altar cuando cesó la plaga (2 Samuel 24:18–25; 1 Crónicas 21:18–22:1). Los cimientos se echaron en el mes de {ziv}, en el cuarto año de Salomón (6:37), según el cálculo habitual hacia el 966 a. C. Las grandes piedras las habían cortado y labrado los constructores de Salomón y de Hiram y los giblitas (5:17–18).',
    size: 'La casa: 60 × 20 codos por dentro (27 × 9 m)',
  },
  {
    title: 'Se levanta {theHouse}', ref: '1 Reyes 6:7',
    quote: {
      nbla: '«La casa, mientras se edificaba, se construía de piedras preparadas en la cantera; y no se oyó ni martillo ni hacha ni ningún instrumento de hierro en la casa mientras la construían.»',
      nvi: '«En la construcción del templo solo se emplearon piedras de cantera ya labradas, así que durante las obras no se oyó el ruido de martillos ni de piquetas, ni de ninguna otra herramienta.»',
      rvr1960: '«Y cuando se edificó la casa, la fabricaron de piedras que traían ya acabadas, de tal manera que cuando la edificaban, ni martillos ni hachas se oyeron en la casa, ni ningún otro instrumento de hierro.»',
      rva: '«Y la casa cuando se edificó, fabricáronla de piedras que traían ya acabadas; de tal manera que cuando la edificaban, ni martillos ni hachas se oyeron en la casa, ni ningún otro instrumento de hierro.»',
    },
    note: 'Sesenta codos de largo, veinte de ancho y treinta de alto (6:2): el doble de largo y de ancho que la tienda del tabernáculo, y el triple de alto. No se da el grosor de los muros; están dibujados de seis codos al pie, como los del templo de Ezequiel (Ezequiel 41:5), y se retranquean un codo en el segundo y en el tercer piso de las cámaras laterales (ver la parada 5).',
    size: '60 × 20 × 30 codos por dentro (27 × 9 × 13,5 m)',
  },
  {
    title: { nvi: 'El vestíbulo', default: 'El pórtico' }, ref: '1 Reyes 6:3',
    quote: {
      nbla: '«Y el pórtico delante de la nave del templo tenía 20 codos (9 metros) de largo, conforme al ancho de la casa, y su ancho al frente de la casa era de 10 codos (4.5 metros).»',
      nvi: '«El vestíbulo de la nave central del templo medía también veinte codos de ancho y por el frente del templo sobresalía diez codos.»',
      rvr1960: '«Y el pórtico delante del templo de la casa tenía veinte codos de largo a lo ancho de la casa, y el ancho delante de la casa era de diez codos.»',
      rva: '«Y el pórtico delante del templo de la casa, de veinte codos de largo, según la anchura de la casa, y su ancho era de diez codos delante de la casa.»',
    },
    note: 'Reyes no da su altura. 2 Crónicas 3:4 da veinte codos en algunas traducciones antiguas y 120 en el texto hebreo; una torre cuatro veces más alta que la casa parece poco probable, así que está dibujado de veinte, como lee la NVI. Por dentro estaba revestido de oro puro (2 Crónicas 3:4). No se dice si el frente estaba abierto; está dibujado abierto.',
    size: '20 × 10 codos (9 × 4,5 m)',
  },
  {
    title: 'Las ventanas', ref: '1 Reyes 6:4',
    quote: {
      nbla: '«También para la casa hizo ventanas con celosías.»',
      nvi: '«Salomón también mandó colocar en el templo ventanales con celosías.»',
      rvr1960: '«E hizo a la casa ventanas anchas por dentro y estrechas por fuera.»',
      rva: '«E hizo á la casa ventanas anchas por de dentro, y estrechas por de fuera.»',
    },
    note: 'Las palabras hebreas son inciertas: marcos que se estrechan hacia dentro, o ventanas cerradas con celosías. Solo pudieron estar en lo alto de los muros, por encima de las cámaras laterales. No se da su número; hay cinco a cada lado, todas en {theMainRoom}. No se mencionan en {theInner}, y Salomón diría que {theLord} habita en la densa oscuridad (8:12).',
    size: 'Número y medida no se dan',
  },
  {
    title: 'Las cámaras laterales', ref: '1 Reyes 6:6',
    quote: {
      nbla: '«El piso inferior tenía 5 codos (2.25 metros) de ancho, el del medio tenía 6 codos (2.7 metros) de ancho, y el tercero tenía 7 codos (3.2 metros) de ancho; porque por fuera hizo rebajos en la pared de la casa por todo alrededor para no empotrar las vigas en las paredes de la casa.»',
      nvi: '«El piso inferior del anexo medía cinco codos de ancho; el piso intermedio, seis codos, y el piso más alto, siete codos. Salomón había mandado hacer salientes en el exterior del templo para que las vigas no se empotraran en la pared misma.»',
      rvr1960: '«El aposento de abajo era de cinco codos de ancho, el de en medio de seis codos de ancho, y el tercero de siete codos de ancho; porque por fuera había hecho disminuciones a la casa alrededor, para no empotrar las vigas en las paredes de la casa.»',
      rva: '«El aposento de abajo era de cinco codos de ancho, y el de en medio de seis codos de ancho, y el tercero de siete codos de ancho: porque por de fuera había hecho disminuciones á la casa en derredor, para no trabar las vigas de las paredes de la casa.»',
    },
    note: 'Tres pisos de cámaras rodean los lados y el fondo de la casa (6:5), cada uno de cinco codos de alto, unidos a ella con maderas de cedro (6:10). El muro se retranquea un codo en cada piso, de modo que cada piso tiene un codo más de ancho que el de abajo, y sus vigas descansan en el saliente. No se da el número de cámaras ni el grosor del muro exterior; el templo de Ezequiel tenía treinta cámaras en cada piso (Ezequiel 41:6).',
    size: 'Pisos de 5, 6 y 7 codos de ancho, cada uno de 5 de alto',
  },
  {
    title: 'La escalera de caracol', ref: '1 Reyes 6:8',
    quote: {
      nbla: '«La entrada a la cámara lateral inferior estaba al lado derecho de la casa; y se subía por una escalera de caracol al piso del medio, y del medio al tercero.»',
      nvi: '«La entrada al piso inferior se hallaba en el lado sur del templo; una escalera de caracol conducía al nivel intermedio y a la planta alta.»',
      rvr1960: '«La puerta del aposento de en medio estaba al lado derecho de la casa; y se subía por una escalera de caracol al de en medio, y del aposento de en medio al tercero.»',
      rva: '«La puerta del aposento de en medio estaba al lado derecho de la casa: y subíase por un caracol al de en medio, y del aposento de en medio al tercero.»',
    },
    note: 'El lado derecho es el sur, para quien mira hacia el oriente desde la casa. El texto hebreo dice que la puerta daba al piso del medio, el griego al de abajo. La palabra para la escalera es rara y puede significar una escalera de caracol o trampillas con escaleras de mano; no se dice dónde estaba. Está dibujada como escalera de caracol junto a la puerta, con el muro exterior cortado.',
  },
  {
    title: 'El techo de cedro', ref: '1 Reyes 6:9',
    quote: {
      nbla: '«Edificó, pues, la casa y la terminó; y cubrió la casa con vigas y tablas de cedro.»',
      nvi: '«Salomón terminó de construir el templo techándolo con vigas y tablones de cedro.»',
      rvr1960: '«Labró, pues, la casa, y la terminó; y la cubrió con artesonados de cedro.»',
      rva: '«Labró pues la casa, y acabóla; y cubrió la casa con artesonados de cedro.»',
    },
    note: 'Los hombres de Hiram y de Salomón cortaron el cedro en el Líbano, lo bajaron al mar y lo llevaron en balsas por la costa (5:6–9). Las vigas cubren los veinte codos {ofTheMainRoom}. El techo está dibujado plano; no se habla de un pretil. {ThePorch} y las cámaras laterales tienen sus propios techos.',
  },
  {
    title: 'Cedro por dentro', ref: '1 Reyes 6:18',
    quote: {
      nbla: '«Y por dentro la casa estaba revestida de cedro tallado en forma de calabazas y flores abiertas. Todo era de cedro, no se veía la piedra.»',
      nvi: '«El interior del templo lo recubrió de cedro tallado con figuras de calabazas y flores abiertas. No se veía una sola piedra, pues todo era de cedro.»',
      rvr1960: '«Y la casa estaba cubierta de cedro por dentro, y tenía entalladuras de calabazas silvestres y de botones de flores. Todo era cedro; ninguna piedra se veía.»',
      rva: '«Y la casa estaba cubierta de cedro por de dentro, y tenía entalladuras de calabazas silvestres y de botones de flores. Todo era cedro; ninguna piedra se veía.»',
    },
    note: 'Tablas de cedro cubren las paredes desde el suelo hasta el techo, y el piso es de tablas de {cypress} (6:15). Aquí, y en las paradas que miran dentro, el muro sur está cortado.',
  },
  {
    title: { rvr1960: 'El lugar santísimo', rva: 'El oráculo', default: 'El santuario interior' }, ref: '1 Reyes 6:16',
    quote: {
      nbla: '«Edificó los 20 codos (9 metros) del fondo de la casa con tablas de cedro desde el suelo hasta el techo. Así le edificó el santuario interior, el Lugar Santísimo.»',
      nvi: '«En el santuario interior, al fondo del templo, acondicionó el Lugar Santísimo, recubriendo el espacio de veinte codos con tablas de cedro desde el piso hasta el techo.»',
      rvr1960: '«Asimismo hizo al final de la casa un edificio de veinte codos, de tablas de cedro desde el suelo hasta lo más alto; así hizo en la casa un aposento que es el lugar santísimo.»',
      rva: '«Asimismo hizo al cabo de la casa un edificio de veinte codos de tablas de cedro, desde el solado hasta lo más alto; y fabricóse en la casa un oráculo, que es el lugar santísimo.»',
    },
    note: 'Un cubo de veinte codos por lado (6:20), preparado para el arca del pacto (6:19). La casa tiene treinta codos de alto, así que o el piso estaba más alto o el techo más bajo; está dibujado con el techo más bajo. 2 Crónicas 3:9 menciona aposentos altos revestidos de oro, que pueden ser el espacio de arriba. {TheMainRoom}, delante, tiene cuarenta codos de largo (6:17).',
    size: '20 × 20 × 20 codos (9 m por lado)',
  },
  {
    title: 'Revestido de oro', ref: '1 Reyes 6:21',
    quote: {
      nbla: '«Salomón revistió el interior de la casa de oro puro. Puso cadenas de oro a lo largo del frente del santuario interior, y lo revistió de oro.»',
      nvi: '«Además, Salomón recubrió de oro puro el interior del templo, y tendió cadenas de oro a lo largo del frente del santuario interno, el cual estaba recubierto de oro.»',
      rvr1960: '«De manera que Salomón cubrió de oro puro la casa por dentro, y cerró la entrada del santuario con cadenas de oro, y lo cubrió de oro.»',
      rva: '«De suerte que vistió Salomón de oro puro la casa por de dentro, y cerró la entrada del oráculo con cadenas de oro, y vistiólo de oro.»',
    },
    note: 'Toda la casa se reviste de oro, y también el altar de cedro {ofTheInner} (6:20–22), el altar del incienso que está delante (7:48). 2 Crónicas 3:6–8 añade piedras preciosas, oro de Parvaim y seiscientos talentos de oro para el Lugar Santísimo, unas veinte toneladas. No se dice cómo colgaban las cadenas; están dibujadas a lo largo del frente del tabique.',
    size: 'Altar del incienso: no se da la medida',
  },
  {
    title: 'Los querubines', ref: '1 Reyes 6:27',
    quote: {
      nbla: '«Colocó los querubines en medio de la casa interior; las alas de los querubines se extendían de modo que el ala del uno tocaba una pared y el ala del otro querubín tocaba la otra pared. Sus otras dos alas se tocaban ala con ala en el centro de la casa.»',
      nvi: '«Salomón puso los querubines con sus alas extendidas en medio del recinto interior del templo. Con una de sus alas, cada querubín tocaba una pared, mientras que sus otras alas se tocaban en medio del santuario.»',
      rvr1960: '«Puso estos querubines dentro de la casa en el lugar santísimo, los cuales extendían sus alas, de modo que el ala de uno tocaba una pared, y el ala del otro tocaba la otra pared, y las otras dos alas se tocaban la una a la otra en medio de la casa.»',
      rva: '«Y puso estos querubines dentro de la casa de adentro: los cuales querubines extendían sus alas, de modo que el ala del uno tocaba á la pared, y el ala del otro querubín tocaba á la otra pared, y las otras dos alas se tocaban la una á la otra en la mitad de la casa.»',
    },
    note: 'Dos querubines de {olive}, cada uno de diez codos de alto, con alas de cinco codos, de la misma medida y forma (6:23–26), revestidos de oro (6:28). Estaban de pie mirando hacia {theMainRoom} (2 Crónicas 3:13). No se describe su aspecto, así que están dibujados como sencillas figuras aladas de pie. En la dedicación, el arca se puso bajo sus alas (8:6–7).',
    size: 'Cada uno de 10 codos de alto y 10 de ala a ala (4,5 m)',
  },
  {
    title: 'Querubines, palmeras y flores', ref: '1 Reyes 6:29',
    quote: {
      nbla: '«Luego esculpió todas las paredes de la casa en derredor con grabados de figuras de querubines, palmeras y flores abiertas, tanto el santuario interior como el exterior.»',
      nvi: '«Sobre las paredes que rodeaban el templo, lo mismo por dentro que por fuera, talló figuras de querubines, palmeras y flores abiertas.»',
      rvr1960: '«Y esculpió todas las paredes de la casa alrededor de diversas figuras, de querubines, de palmeras y de botones de flores, por dentro y por fuera.»',
      rva: '«Y esculpió todas las paredes de la casa alrededor de diversas figuras, de querubines, de palmas, y de botones de flores, por de dentro y por de fuera.»',
    },
    note: 'También el piso se reviste de oro (6:30), y 2 Crónicas 3:5–7 añade palmeras y cadenas sobre el oro {ofTheMainRoom}, y oro en las vigas, los umbrales, las paredes y las puertas. No se describe cómo estaban dispuestas las tallas; están dibujadas en franjas, un querubín entre dos palmeras, como en el templo de Ezequiel (Ezequiel 41:18).',
  },
  {
    title: 'Puertas de {olive}', ref: '1 Reyes 6:32',
    quote: {
      nbla: '«Las dos puertas eran de madera de olivo, y talló en ellas figuras de querubines, palmeras y flores abiertas, y las revistió de oro; cubrió también de oro los querubines y las palmeras.»',
      nvi: '«Sobre las dos puertas de madera de olivo talló figuras de querubines, palmeras y flores abiertas, y todas ellas las recubrió de oro.»',
      rvr1960: '«Las dos puertas eran de madera de olivo; y talló en ellas figuras de querubines, de palmeras y de botones de flores, y las cubrió de oro; cubrió también de oro los querubines y las palmeras.»',
      rva: '«Las dos puertas eran de madera de oliva; y entalló en ellas figuras de querubines y de palmas y de botones de flores, y cubriólas de oro: cubrió también de oro los querubines y las palmas.»',
    },
    note: 'El dintel y los postes {ofTheInner} eran «de cinco lados» (6:31), quizá un marco en punta o una quinta parte del ancho del muro; la entrada está dibujada de cuatro codos de ancho con remate en punta. Giraban sobre goznes de oro (7:50). 2 Crónicas 3:14 habla también de un velo de colores y lino fino, con querubines bordados; Reyes solo habla de las puertas. Están dibujados ambos: las puertas abiertas y {theVeil} detrás.',
    size: 'Ancho de la entrada: ¿una quinta parte del muro?',
  },
  {
    title: 'Las puertas {ofTheMainRoom}', ref: '1 Reyes 6:33–34',
    quote: {
      nbla: '«Además para la entrada de la nave hizo postes cuadrangulares de madera de olivo, y dos puertas de madera de ciprés; las dos hojas de una puerta eran giratorias, y las dos hojas de la otra puerta también eran giratorias.»',
      nvi: '«Así mismo, para la entrada de la nave central hizo postes cuadrangulares de madera de olivo. También hizo dos puertas de madera de ciprés, cada una con dos hojas giratorias.»',
      rvr1960: '«Igualmente hizo a la puerta del templo postes cuadrados de madera de olivo. Pero las dos puertas eran de madera de ciprés; y las dos hojas de una puerta giraban, y las otras dos hojas de la otra puerta también giraban.»',
      rva: '«Igualmente hizo á la puerta del templo postes de madera de oliva cuadrados. Pero las dos puertas eran de madera de haya; y los dos lados de la una puerta eran redondos, y los otros dos lados de la otra puerta también redondos.»',
    },
    note: 'Talladas con querubines, palmeras y flores abiertas y revestidas de oro ajustado a la talla (6:35). La entrada está dibujada de cinco codos de ancho, la cuarta parte del muro; no se da su altura. Cada puerta se pliega en dos, de modo que la entrada puede abrirse en parte o del todo.',
  },
  {
    title: 'El atrio interior', ref: '1 Reyes 6:36',
    quote: {
      nbla: '«Edificó el atrio interior con tres hileras de piedra labrada y una hilera de vigas de cedro.»',
      nvi: '«Las paredes del atrio interior las construyó con tres hileras de piedra labrada por cada hilera de vigas de cedro.»',
      rvr1960: '«Y edificó el atrio interior de tres hileras de piedras labradas, y de una hilera de vigas de cedro.»',
      rva: '«Y edificó el atrio interior de tres órdenes de piedras labradas, y de un orden de vigas de cedro.»',
    },
    note: 'No se da su medida; está dibujado con el doble de largo y de ancho que el atrio del tabernáculo. Crónicas lo llama el atrio de los sacerdotes, y alrededor estaba el atrio grande, con puertas revestidas de bronce (2 Crónicas 4:9), edificado de la misma manera (7:12). En el atrio grande estaba también el palacio de Salomón, que tardó trece años en edificarse (7:1); no se muestra.',
    size: 'No se da · dibujado de 200 × 100 codos (90 × 45 m)',
  },
  {
    title: '{Jachin} y Boaz', ref: '1 Reyes 7:21',
    quote: {
      nbla: '«Erigió, pues, las columnas en el pórtico de la nave. Erigió la columna derecha y la llamó Jaquín, y erigió la columna izquierda y la llamó Boaz.»',
      nvi: '«Cuando Hiram levantó las columnas en el vestíbulo de la nave central, llamó Jaquín a la columna de la derecha y Boaz a la de la izquierda.»',
      rvr1960: '«Estas columnas erigió en el pórtico del templo; y cuando hubo alzado la columna del lado derecho, le puso por nombre Jaquín, y alzando la columna del lado izquierdo, llamó su nombre Boaz.»',
      rva: '«Estas columnas erigió en el pórtico del templo: y cuando hubo alzado la columna de la mano derecha, púsole por nombre Jachîn: y alzando la columna de la mano izquierda, llamó su nombre Boaz.»',
    },
    note: 'Hiram, un broncista de Tiro cuya madre era de Neftalí (7:13–14), fundió dos columnas de dieciocho codos de alto y doce de contorno. Sobre cada una puso un capitel de cinco codos, con celosía y cadenas, dos hileras de granadas, doscientas por capitel, y obra de lirios arriba (7:15–22). 2 Crónicas 3:15 da treinta y cinco codos, quizá las dos juntas. No se dice si sostenían algo; están dibujadas exentas.',
    size: '18 codos de alto, 12 de contorno (8 × 1,7 m) · capiteles de 5 codos',
    made: 'Hiram de Tiro (7:13–22)',
  },
  {
    title: { nvi: 'La fuente de metal', default: 'El mar' }, ref: '1 Reyes 7:23',
    quote: {
      nbla: '«Hizo asimismo el mar de metal fundido de 10 codos (4.5 metros) de borde a borde, en forma circular. Su altura era de 5 codos (2.25 metros), y tenía 30 codos (13.5 metros) de circunferencia.»',
      nvi: '«Hizo también una fuente circular de metal fundido que medía diez codos de diámetro y cinco codos de alto. Su circunferencia, medida a cordel, era de treinta codos.»',
      rvr1960: '«Hizo fundir asimismo un mar de diez codos de un lado al otro, perfectamente redondo; su altura era de cinco codos, y lo ceñía alrededor un cordón de treinta codos.»',
      rva: '«Hizo asimismo un mar de fundición, de diez codos del un lado al otro, perfectamente redondo: su altura era de cinco codos, y ceñíalo alrededor un cordón de treinta codos.»',
    },
    note: 'Descansa sobre doce {oxen}, tres mirando hacia cada lado, con las ancas hacia dentro (7:25), con dos hileras de calabazas fundidas bajo el borde; tiene un palmo de grueso, y su borde es como una flor de lirio (7:24–26). Reyes dice que cabían 2000 batos, 2 Crónicas 4:5 dice 3000. Era para que los sacerdotes se lavaran (2 Crónicas 4:6), y estaba en la esquina sureste de la casa (7:39).',
    size: '10 codos de diámetro, 5 de alto (4,5 × 2,3 m)',
    made: 'Hiram (7:23–26)',
  },
  {
    title: 'Las {stands} y {basins}', ref: '1 Reyes 7:38',
    quote: {
      nbla: '«También hizo diez pilas de bronce. En cada pila cabían 40 batos (880 litros); cada pila medía 4 codos (1.6 metros), y sobre cada una de las diez basas había una pila.»',
      nvi: '«Hiram hizo también diez recipientes de bronce, uno para cada base. Cada uno de ellos medía cuatro codos y tenía capacidad para cuarenta batos.»',
      rvr1960: '«Hizo también diez fuentes de bronce; cada fuente contenía cuarenta batos, y cada una era de cuatro codos; y colocó una fuente sobre cada una de las diez basas.»',
      rva: '«Hizo también diez fuentes de bronce: cada fuente contenía cuarenta batos, y cada una era de cuatro codos; y asentó una fuente sobre cada una de las diez basas.»',
    },
    note: 'Cada base mide cuatro codos por lado y tres de alto, con tableros de leones, {oxen} y querubines y guirnaldas, sobre cuatro ruedas de bronce como las de un carro, de un codo y medio de alto (7:27–37). Cinco están al lado sur de la casa y cinco al norte (7:39). Allí lavaban lo que se usaba para el holocausto (2 Crónicas 4:6). No está claro cómo se apoyaban en sus bases.',
    size: '{Stands} de 4 × 4 × 3 codos · {basins} de 4 codos de diámetro',
    made: 'Hiram (7:27–39)',
  },
  {
    title: 'El altar de bronce', ref: '2 Crónicas 4:1',
    quote: {
      nbla: '«Entonces hizo un altar de bronce de 20 codos (9 metros) de largo, de 20 codos de ancho y de 10 codos de alto.»',
      nvi: '«Él mandó a hacer un altar de bronce que medía veinte codos de largo por veinte de ancho y diez de alto.»',
      rvr1960: '«Hizo además un altar de bronce de veinte codos de longitud, veinte codos de anchura, y diez codos de altura.»',
      rva: '«…además un altar de bronce de veinte codos de longitud, y veinte codos de anchura, y diez codos de altura.»',
    },
    note: 'Reyes no lo incluye en la lista, pero lo llama «el altar de bronce que estaba delante {ofTheLord}» (8:64). No se dice cómo llegaban los sacerdotes arriba; los altares no debían tener gradas (Éxodo 20:26), así que no se dibujan. Todo el bronce se fundió en la tierra arcillosa del valle del Jordán, entre Sucot y Saretán, y era tanto que no se pesó (7:46–47).',
    size: '20 × 20 × 10 codos (9 × 9 × 4,5 m)',
  },
  {
    title: 'Los utensilios de oro', ref: '1 Reyes 7:48–49',
    quote: {
      nbla: '«Salomón hizo todos los utensilios que estaban en la casa del Señor: el altar de oro y la mesa de oro sobre la cual estaba el pan de la Presencia; los candelabros de oro puro, cinco a la mano derecha y cinco a la izquierda, frente al santuario interior…»',
      nvi: '«Salomón también mandó hacer los otros utensilios que estaban en el templo del Señor, es decir: el altar de oro; la mesa de oro sobre la que se ponía el pan de la Presencia; los candelabros de oro puro, cinco en el lado sur y cinco en el lado norte, en frente del santuario interior…»',
      rvr1960: '«Entonces hizo Salomón todos los enseres que pertenecían a la casa de Jehová: un altar de oro, y una mesa también de oro, sobre la cual estaban los panes de la proposición; cinco candeleros de oro purísimo a la mano derecha, y otros cinco a la izquierda, frente al lugar santísimo…»',
      rva: '«Entonces hizo Salomón todos los vasos que pertenecían á la casa de Jehová: un altar de oro, y una mesa sobre la cual estaban los panes de la proposición, también de oro; Y cinco candeleros de oro purísimo á la mano derecha, y otros cinco á la izquierda, delante del oráculo…»',
    },
    note: 'Reyes habla de una mesa; 2 Crónicas 4:7–8 de diez mesas y diez {lampstands}, cinco a cada lado, hechos según su forma. Están dibujadas diez mesas, con el pan encima (2 Crónicas 4:19), y {lampstands} como los del tabernáculo (Éxodo 25:31–37). No se dan sus medidas. Con ellos se hicieron copas, despabiladeras, tazones, cucharas e incensarios de oro (7:50).',
  },
  {
    title: 'Siete años', ref: '1 Reyes 6:38',
    quote: {
      nbla: '«…en el año undécimo, en el mes de Bul, que es el mes octavo, la casa fue acabada en todas sus partes y conforme a todos sus planos. La edificó, pues, en siete años.»',
      nvi: '«…en el mes de bul del año undécimo, es decir, en el mes octavo de ese año, se terminó de construir el templo siguiendo al pie de la letra todos los detalles del diseño. Siete años le llevó a Salomón la construcción del templo.»',
      rvr1960: '«Y en el undécimo año, en el mes de Bul, que es el mes octavo, fue acabada la casa con todas sus dependencias, y con todo lo necesario. La edificó, pues, en siete años.»',
      rva: '«Y en el undécimo año, en el mes de Bul, que es el mes octavo, fué acabada la casa con todas sus pertenencias, y con todo lo necesario. Edificóla pues, en siete años.»',
    },
    note: 'Terminada toda la obra, Salomón metió la plata, el oro y los utensilios que su padre David había consagrado, y los puso en los tesoros de la casa {ofTheLord} (7:51). El arca se metió en la dedicación, en la fiesta del mes séptimo (8:1–6).',
  },
];
