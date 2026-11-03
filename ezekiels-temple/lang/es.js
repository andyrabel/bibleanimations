// Spanish text for "Ezekiel's Temple", merged over data.js (see addLanguage in ../../i18n.js).
// Same shape as data.js, text fields only. Version keys are the Spanish versions
// (nbla, nvi, rvr1960, rva); `default` covers the ones not listed. STOPS line up
// with data.js by position.
//
// Quotations are verbatim, including each version's own spelling (the RVA keeps
// its 1909 spelling: "á", "díjome") and the NBLA's measurements in metres in
// brackets. Where the RVA opens a chapter in capitals ("METIOME", "LLEVOME"), the
// quotation starts after them.

// Spanish nouns carry gender, so where a note needs an article the term
// includes it ({theNave}: la nave / el templo), and the notes avoid adjectives that would have to agree.
export const TERMS = {
  rod: { nvi: 'vara', default: 'caña' },
  guardrooms: { nvi: 'celdas', default: 'cámaras' },
  porch: { nvi: 'vestíbulo', default: 'pórtico' },
  porches: { nvi: 'vestíbulos', nbla: 'pórticos', default: 'arcos' },
  jambs: { nbla: 'pilares', nvi: 'pilares', default: 'postes' },
  court: 'atrio',
  theNave: { nbla: 'la nave', nvi: 'la nave central', default: 'el templo' },
  ofTheNave: { nbla: 'de la nave', nvi: 'de la nave central', default: 'del templo' },
  theHouse: { nbla: 'el templo', nvi: 'el Templo', default: 'la casa' },
  sideChambers: { rva: 'cámaras', default: 'cámaras laterales' },
  theSeparate: { nbla: 'la zona separada', nvi: 'el patio', rvr1960: 'el espacio abierto', rva: 'el apartamiento' },
  palms: { rva: 'palmas', default: 'palmeras' },
  bronze: { rva: 'metal', default: 'bronce' },
  theLord: { rvr1960: 'Jehová', rva: 'Jehová', default: 'el Señor' },
};

export const FEATURES = {
  eastGate: { name: 'Puerta oriental' },
  northGate: { name: 'Puerta del norte' },
  southGate: { name: { rva: 'Puerta del mediodía', default: 'Puerta del sur' } },
  outerCourt: { name: 'Atrio exterior' },
  chambers: { name: { nvi: 'Habitaciones', default: 'Cámaras' } },
  pavement: { name: { nvi: 'Enlosado', rvr1960: 'Enlosado', rva: 'Solado', default: 'Pavimento' } },
  innerCourt: { name: 'Atrio interior' },
  innerSouth: { name: 'Puerta sur interior' },
  innerEast: { name: 'Puerta oriental interior' },
  innerNorth: { name: 'Puerta norte interior' },
  tables: { name: 'Mesas' },
  rinse: { name: 'Cámara para lavar' },
  roomN: { name: { nvi: 'Sala de los sacerdotes', default: 'Cámara de los sacerdotes' } },
  roomS: { name: { nvi: 'Sala de los sacerdotes', default: 'Cámara de los sacerdotes' } },
  altar: { name: 'Altar' },
  porch: { name: { nvi: 'Vestíbulo', default: 'Pórtico' } },
  columns: { name: 'Columnas' },
  nave: { name: { nbla: 'Nave', nvi: 'Nave central', default: 'Templo' } },
  mostHoly: { name: { nvi: 'Lugar Santísimo', default: 'Lugar santísimo' } },
  sideChambers: { name: { rva: 'Cámaras', default: 'Cámaras laterales' } },
  table: { name: 'Altar de madera' },
  westBuilding: { name: 'Edificio' },
  yard: { name: { nbla: 'Zona separada', nvi: 'Patio', rvr1960: 'Espacio abierto', rva: 'Apartamiento' } },
  priestsN: { name: { nvi: 'Habitaciones sagradas', default: 'Cámaras santas' } },
  priestsS: { name: { nvi: 'Habitaciones sagradas', default: 'Cámaras santas' } },
  mountain: { name: 'Un monte muy alto' },
};

export const PEOPLE = {
  man: { name: { rvr1960: 'El varón', rva: 'El varón', default: 'El hombre' } },
  ezekiel: { name: 'Ezequiel' },
};

export const INTRO = {
  title: 'Un monte muy alto',
  ref: 'Ezequiel 40:2',
  quote: {
    nbla: '«En visiones de Dios, Él me llevó a la tierra de Israel y me puso sobre un monte muy alto, sobre el cual, hacia el sur, había una construcción parecida a una ciudad.»',
    nvi: '«En visiones de Dios, él me llevó a la tierra de Israel y me colocó sobre un monte muy alto. Desde allí, mirando al sur, había unos edificios que parecían una ciudad.»',
    rvr1960: '«En visiones de Dios me llevó a la tierra de Israel, y me puso sobre un monte muy alto, sobre el cual había un edificio parecido a una gran ciudad, hacia la parte sur.»',
    rva: '«En visiones de Dios me llevó á la tierra de Israel, y púsome sobre un monte muy alto, sobre el cual había como edificio de una ciudad al mediodía.»',
  },
  note: 'Era el año veinticinco del exilio, catorce años después de la caída de Jerusalén y del incendio del templo de Salomón (40:1). Ezequiel, sacerdote entre los desterrados en Babilonia (1:3), es llevado en visión a un monte de la tierra de Israel. Lo que parece una ciudad suele entenderse como el templo mismo, con sus muros y puertas. Un hombre con una {rod} de medir se lo muestra parte por parte (Ezequiel 40–42), y cada parte se levanta a medida que él la mide.',
  aside: 'Todo está dibujado a las medidas que da el texto, en el codo largo de 40:5, un codo y un palmo menor (≈ 52,5 cm). Ezequiel da largos y anchos, pero casi ninguna altura, así que las alturas son suposiciones, y las notas dicen dónde más el modelo tiene que suponer. El monte no es un lugar real; la visión no dice dónde está.',
};

export const FINALE = {
  title: 'La gloria vuelve',
  ref: 'Ezequiel 43:4–5',
  quote: {
    nbla: '«La gloria del Señor entró en el templo por el camino de la puerta que da hacia el oriente. Entonces el Espíritu me levantó y me llevó al atrio interior, y la gloria del Señor llenó el templo.»',
    nvi: '«…cuando la gloria del Señor entró al Templo por la puerta que daba al oriente. Entonces el Espíritu me levantó, me introdujo en el atrio interior y vi que la gloria del Señor había llenado el Templo.»',
    rvr1960: '«Y la gloria de Jehová entró en la casa por la vía de la puerta que daba al oriente. Y me alzó el Espíritu y me llevó al atrio interior; y he aquí que la gloria de Jehová llenó la casa.»',
    rva: '«Y la gloria de Jehová entró en la casa por la vía de la puerta que daba cara al oriente. Y alzóme el espíritu, y metióme en el atrio de adentro; y he aquí que la gloria de Jehová hinchió la casa.»',
  },
  note: 'Años antes, Ezequiel había visto la gloria salir del templo de Salomón por la puerta oriental y detenerse sobre el monte al oriente de la ciudad (10:18–19; 11:22–23). Ahora vuelve por el mismo camino, con un sonido como de muchas aguas, y la tierra resplandece (43:2). Ezequiel cae sobre su rostro (43:3), y {theLord} habla desde la casa: «este es el lugar de Mi trono… donde habitaré entre los israelitas para siempre» (43:7, NBLA). Después la puerta oriental queda cerrada, porque {theLord} entró por ella (44:1–2).',
};

export const STOPS = [
  {
    title: 'El hombre de la {rod} de medir', ref: 'Ezequiel 40:3',
    quote: {
      nbla: '«Me llevó allá; y vi a un hombre cuyo aspecto era semejante al bronce, con un cordel de lino y una caña de medir (unos 3 metros) en la mano, y estaba de pie en la puerta.»',
      nvi: '«Me llevó allá y vi un hombre que parecía hecho de bronce. Estaba de pie junto a la puerta y en su mano tenía una cuerda de lino y una vara de medir.»',
      rvr1960: '«Me llevó allí, y he aquí un varón, cuyo aspecto era como aspecto de bronce; y tenía un cordel de lino en su mano, y una caña de medir; y él estaba a la puerta.»',
      rva: '«Y llevóme allí, y he aquí un varón, cuyo aspecto era como aspecto de metal, y tenía un cordel de lino en su mano, y una caña de medir: y él estaba á la puerta.»',
    },
    note: 'El hombre le dijo a Ezequiel que mirara con sus ojos, oyera con sus oídos y pusiera atención a todo lo que se le iba a mostrar, y que lo contara a la casa de Israel (40:4). El cordel servía para las distancias largas (47:3), la {rod} para los edificios. No se dice quién es; habla de parte del Señor (44:5) y se dibuja brillante como el {bronze}, como en 1:7. Ezequiel se dibuja con una túnica sencilla.',
    size: 'La {rod}: 6 codos largos (3,2 m)',
  },
  {
    title: 'El muro', ref: 'Ezequiel 40:5',
    quote: {
      nbla: '«Entonces vi que por el exterior del templo había un muro, todo alrededor, y en la mano del hombre había una caña de medir de 6 codos (3.2 metros), cada codo era de un codo y un palmo menor (52.5 centímetros). Midió el muro, y tenía una caña de ancho y una caña de alto.»',
      nvi: '«Entonces vi un muro que rodeaba el Templo por fuera. Para medir, el hombre tenía en la mano una vara de seis codos largos y midió el muro, el cual tenía una vara de ancho por una de alto.»',
      rvr1960: '«Y he aquí un muro fuera de la casa; y la caña de medir que aquel varón tenía en la mano era de seis codos de a codo y palmo menor; y midió el espesor del muro, de una caña, y la altura, de otra caña.»',
      rva: '«Y he aquí, un muro fuera de la casa: y la caña de medir que aquel varón tenía en la mano, era de seis codos, de á codo y palmo: y midió la anchura del edificio de una caña, y la altura, de otra caña.»',
    },
    note: 'Un codo largo es el codo común más un palmo menor, unos 52,5 cm, así que la {rod} mide algo más de 3 m, y el muro es tan grueso como alto. Su altura se dibuja desde el atrio exterior, que está siete gradas por encima del suelo de fuera. Más adelante el hombre dice para qué es el muro: «para dividir entre lo sagrado y lo profano» (42:20, NBLA).',
    size: '6 × 6 codos largos (3,2 × 3,2 m)',
  },
  {
    title: 'La puerta oriental', ref: 'Ezequiel 40:6',
    quote: {
      nbla: '«Entonces fue a la puerta que miraba al oriente, subió las gradas, y midió el umbral de la puerta, y tenía una caña (3.2 metros) de ancho, y el otro umbral, una caña de ancho.»',
      nvi: '«Luego se dirigió a la puerta que mira hacia el oriente. Subió sus gradas y midió el umbral de la puerta, el cual medía una vara de ancho.»',
      rvr1960: '«Después vino a la puerta que mira hacia el oriente, y subió por sus gradas, y midió un poste de la puerta, de una caña de ancho, y el otro poste, de otra caña de ancho.»',
      rva: '«Después vino á la puerta que daba cara hacia el oriente, y subió por sus gradas, y midió el un poste de la puerta, de una caña en anchura, y el otro poste de otra caña en ancho.»',
    },
    note: 'Dentro, tres {guardrooms} a cada lado, cada una de una {rod} en cuadro, con cinco codos entre ellas y una barrera de un codo delante (40:7, 10, 12); luego el umbral interior y un {porch} de ocho codos que da al atrio (40:8–9). La entrada mide diez codos de ancho; hay ventanas hacia las {guardrooms} y {palms} labradas en los {jambs} (40:11, 16). Cincuenta codos de largo y veinticinco de ancho (40:13, 15). No se dan las alturas; los sesenta codos de 40:14 son inciertos, y los {jambs} se dibujan más bajos.',
    size: '50 × 25 codos (26 × 13 m) · {guardrooms} de 6 × 6',
  },
  {
    title: 'El atrio exterior', ref: 'Ezequiel 40:17',
    quote: {
      nbla: '«Entonces el hombre me llevó al atrio exterior, en el cual había cámaras y un pavimento construido todo alrededor del atrio; treinta cámaras daban al pavimento.»',
      nvi: '«Luego el hombre me llevó al atrio exterior. Allí vi unas habitaciones y un enlosado construido alrededor del atrio; las habitaciones que daban al enlosado eran treinta.»',
      rvr1960: '«Me llevó luego al atrio exterior, y he aquí había cámaras, y estaba enlosado todo en derredor; treinta cámaras había alrededor en aquel atrio.»',
      rva: '«Llevóme luego al atrio exterior, y he aquí, había cámaras, y solado hecho al atrio en derredor: treinta cámaras había alrededor en aquel atrio.»',
    },
    note: 'El pavimento corre a lo largo del muro, tan ancho como largas son las puertas (40:18), más bajo que el atrio interior. No se dan la medida ni la disposición de las treinta cámaras; se dibujan en filas de cinco a cada lado de cada puerta. Más adelante el pueblo comería sus sacrificios en lugares así (compárese 46:21–24). Desde el extremo interior de esta puerta hasta la siguiente puerta hacia dentro hay cien codos (40:19).',
    size: 'Pavimento tan ancho como largo es una puerta · cámaras sin medida',
  },
  {
    title: 'La puerta del norte', ref: 'Ezequiel 40:22',
    quote: {
      nbla: '«Sus ventanas, sus pórticos y sus figuras de palmeras tenían las mismas medidas de la puerta que daba al oriente; se subía a ella por siete gradas, y su pórtico estaba delante de ellas.»',
      nvi: '«Sus ventanas, su vestíbulo y sus palmeras tenían las mismas medidas que las de la puerta oriental. A esta puerta se subía por medio de siete gradas y su vestíbulo estaba frente a ellas.»',
      rvr1960: '«Y sus ventanas y sus arcos y sus palmeras eran conforme a la medida de la puerta que estaba hacia el oriente; y se subía a ella por siete gradas, y delante de ellas estaban sus arcos.»',
      rva: '«Y sus ventanas, y sus arcos, y sus palmas, eran conforme á la medida de la puerta que estaba hacia el oriente; y subían á ella por siete gradas; y delante de ellas estaban sus arcos.»',
    },
    note: 'La puerta que mira al norte es igual a la oriental: tres {guardrooms} a cada lado, cincuenta codos de largo y veinticinco de ancho (40:20–21). Sus siete gradas suben desde el suelo de fuera del muro, de modo que el atrio exterior queda por encima de la cima del monte. Las gradas de la puerta oriental no se cuentan (40:6); se dibujan iguales.',
    size: '50 × 25 codos · 7 gradas',
  },
  {
    title: { rva: 'La puerta del mediodía', default: 'La puerta del sur' }, ref: 'Ezequiel 40:24',
    quote: {
      nbla: '«Luego el hombre me llevó hacia el sur, donde había una puerta que daba hacia el sur; y midió sus pilares y sus pórticos conforme a aquellas mismas medidas.»',
      nvi: '«Luego me condujo hacia el sur y allí había una puerta que daba al sur. Midió las celdas, los pilares y el vestíbulo, y todos estos tenían las mismas medidas que los anteriores.»',
      rvr1960: '«Me llevó después hacia el sur, y he aquí una puerta hacia el sur; y midió sus portales y sus arcos conforme a estas medidas.»',
      rva: '«Llevóme después hacia el mediodía, y he aquí una puerta hacia el mediodía: y midió sus portales y sus arcos conforme á estas medidas.»',
    },
    note: 'Una tercera puerta, igual a las otras, con sus siete gradas y sus {palms} en los {jambs} (40:25–26). No hay puerta al occidente: la casa y el edificio de detrás llenan ese lado, y solo se entra por el oriente, el norte o el sur. Según 46:9, quien entra por la puerta del norte sale por la del sur, y quien entra por la del sur sale por la del norte.',
    size: '50 × 25 codos · 7 gradas',
  },
  {
    title: { rva: 'La puerta del mediodía del atrio interior', default: 'La puerta sur del atrio interior' }, ref: 'Ezequiel 40:31',
    quote: {
      nbla: '«Sus pórticos daban al atrio exterior; y había figuras de palmeras en sus pilares, y se subía por ocho gradas.»',
      nvi: '«Su vestíbulo daba hacia el atrio exterior; sus pilares también tenían grabados de palmeras. A esta puerta se llegaba subiendo ocho gradas.»',
      rvr1960: '«Y sus arcos caían afuera al atrio, con palmeras en sus postes; y sus gradas eran de ocho peldaños.»',
      rva: '«Y sus arcos caían afuera al atrio, con palmas en sus postes; y sus gradas eran de ocho escalones.»',
    },
    note: 'A cien codos de la puerta sur exterior está la interior, de la misma medida (40:27–29), pero vuelta al revés: su {porch} da al atrio exterior, y ocho gradas más suben al atrio interior. No se describe el muro del atrio interior; se dibuja uno bajo alrededor de su terraza. Los {porches} de veinticinco codos por cinco del versículo 30 no son claros y no se dibujan.',
    size: '50 × 25 codos · 8 gradas',
  },
  {
    title: 'Las puertas oriental y norte del atrio interior', ref: 'Ezequiel 40:32',
    quote: {
      nbla: '«Entonces me llevó al atrio interior que daba al oriente, y midió la puerta conforme a aquellas mismas medidas.»',
      nvi: '«También me llevó al atrio interior que daba al oriente y midió la entrada, la cual tenía igual medida que las anteriores.»',
      rvr1960: '«Y me llevó al atrio interior hacia el oriente, y midió la puerta conforme a estas medidas.»',
      rva: '«Y llevóme al atrio interior hacia el oriente, y midió la puerta conforme á estas medidas.»',
    },
    note: 'Después, la puerta del norte (40:35–37). Las seis puertas son iguales: cincuenta codos por veinticinco, tres {guardrooms} a cada lado, ventanas, y {palms} en los {jambs}; las exteriores tienen siete gradas, las interiores ocho. Cada puerta interior está frente a una exterior, a cien codos (40:23, 27).',
    size: 'Cada una 50 × 25 codos · 8 gradas',
  },
  {
    title: 'Mesas para el holocausto', ref: 'Ezequiel 40:39',
    quote: {
      nbla: '«En el vestíbulo de la puerta había a cada lado dos mesas, en las cuales degollaban el holocausto, la ofrenda por el pecado y la ofrenda por la culpa.»',
      nvi: '«En el vestíbulo de la puerta había cuatro mesas, dos de cada lado, donde se mataba a los animales para el holocausto, para la ofrenda por el pecado y para la ofrenda por la culpa.»',
      rvr1960: '«Y en la entrada de la puerta había dos mesas a un lado, y otras dos al otro, para degollar sobre ellas el holocausto y la expiación y el sacrificio por el pecado.»',
      rva: '«Y en la entrada de la puerta había dos mesas de la una parte, y otras dos de la otra, para degollar sobre ellas el holocausto, y la expiación, y el sacrificio por el pecado.»',
    },
    note: 'Dos más a cada lado fuera del {porch}, según se sube (40:40–41), ocho en total, y cuatro mesas de piedra labrada, de codo y medio en cuadro y un codo de alto, para los cuchillos (40:42). Una cámara con su entrada junto a la puerta servía para lavar el holocausto (40:38). El texto nombra la puerta del norte (40:40), y los holocaustos se degollaban al lado norte del altar (Levítico 1:11), así que las mesas se dibujan allí. Los ganchos de un palmo (40:43) son demasiado pequeños para mostrarlos.',
    size: 'Mesas de piedra de 1½ × 1½ × 1 codos',
  },
  {
    title: { nvi: 'Salas para los sacerdotes', default: 'Cámaras para los sacerdotes' }, ref: 'Ezequiel 40:45–46',
    quote: {
      nbla: '«Y el hombre me dijo: “Esta cámara, cuya fachada da al sur, es para los sacerdotes encargados del templo; y la cámara, cuya fachada da al norte, es para los sacerdotes encargados del altar. Estos son los hijos de Sadoc, que, de los hijos de Leví, se acercan al Señor para servirle”».',
      nvi: '«Aquel hombre me dijo: “La sala que da al sur es para los sacerdotes encargados del Templo, mientras que la sala que da al norte es para los sacerdotes encargados del altar. Estos son los hijos de Sadoc y son los únicos levitas que pueden acercarse al Señor para ministrar delante de él”».',
      rvr1960: '«Y me dijo: Esta cámara que mira hacia el sur es de los sacerdotes que hacen la guardia del templo. Y la cámara que mira hacia el norte es de los sacerdotes que hacen la guardia del altar; estos son los hijos de Sadoc, los cuales son llamados de los hijos de Leví para ministrar a Jehová.»',
      rva: '«Y díjome: Esta cámara que mira hacia el mediodía es de los sacerdotes que tienen la guarda del templo. Y la cámara que mira hacia el norte es de los sacerdotes que tienen la guarda del altar: estos son los hijos de Sadoc, los cuales son llamados de los hijos de Leví al Señor, para ministrarle.»',
    },
    note: 'Una cámara está junto a la puerta del norte, mirando al sur; la otra junto a la puerta del sur, mirando al norte (40:44). El hebreo las llama cámaras de los cantores y pone la segunda junto a la puerta oriental (así la RVR1960); el griego tiene dos cámaras y la puerta del sur, como la NBLA. No se dan sus medidas.',
    size: 'Sin medida',
  },
  {
    title: 'El atrio interior y el altar', ref: 'Ezequiel 40:47',
    quote: {
      nbla: '«Y midió el atrio, un cuadrado de 100 codos (52.5 metros) de largo y 100 codos de ancho; y el altar estaba delante del templo.»',
      nvi: '«Luego midió el atrio, que era un cuadrado de cien codos de largo por cien codos de ancho. El altar estaba frente al Templo.»',
      rvr1960: '«Y midió el atrio, cien codos de longitud, y cien codos de anchura; era cuadrado; y el altar estaba delante de la casa.»',
      rva: '«Y midió el atrio, cien codos de longitud, y la anchura de cien codos cuadrados; y el altar estaba delante de la casa.»',
    },
    note: 'Su cordel marca el cuadrado, con un pavimento más claro que el de los patios de detrás. El altar se mide más adelante, en 43:13–17: una base con un canal alrededor, dos cornisas, y un hogar de doce codos en cuadro con cuatro cuernos, sus gradas mirando al oriente. Así se dibuja, en medio del atrio: unos once codos de alto, dieciocho en cuadro al pie. Sobre él los sacerdotes ofrecerían holocaustos y ofrendas de paz, y {theLord} los aceptaría (43:27).',
    size: 'Atrio de 100 × 100 codos (52 m) · hogar del altar de 12 × 12',
  },
  {
    title: { nbla: 'El pórtico del templo', nvi: 'El vestíbulo del Templo', default: 'El pórtico de la casa' }, ref: 'Ezequiel 40:49',
    quote: {
      nbla: '«La longitud del pórtico era de 20 codos (10.5 metros) y la anchura de 11 codos (5.78 metros); y junto a las gradas por donde se subía a él, había columnas junto a los pilares, una a un lado y otra al otro.»',
      nvi: '«El vestíbulo medía veinte codos de ancho por doce codos de largo y se llegaba a él por un tramo de escalera. Junto a cada pilar había una columna.»',
      rvr1960: '«La longitud del pórtico, veinte codos, y el ancho once codos, al cual subían por gradas; y había columnas junto a los postes, una de un lado, y otra de otro.»',
      rva: '«La longitud del pórtico veinte codos, y la anchura once codos, al cual subían por gradas: y había columnas junto á los postes, una de un lado, y otra de otro.»',
    },
    note: 'La casa está sobre una plataforma de una {rod} entera de alto (41:8). El {porch} tiene doce codos de fondo en el griego (NVI), once en el hebreo (NBLA, RVR1960); se dibujan doce, con lo que la casa mide cien codos de largo (41:13). Su entrada tiene catorce codos de ancho entre {jambs} de cinco codos (40:48). El griego cuenta diez gradas. Las dos columnas recuerdan a Jaquín y Boaz (1 Reyes 7:21); no se da su medida.',
    size: '{Porch} de 20 × 12 codos · plataforma de 6 de alto',
  },
  {
    title: { nbla: 'La nave', nvi: 'La nave central', default: 'El templo' }, ref: 'Ezequiel 41:2',
    quote: {
      nbla: '«Y la anchura de la entrada era de 10 codos (5.25 metros), y los lados de la entrada eran de 5 codos (2.63 metros) por un lado y 5 codos por el otro. Midió la longitud de la nave y tenía 40 codos (21 metros), y la anchura, 20 codos (10.5 metros).»',
      nvi: '«El ancho de la entrada era de diez codos y cada una de las paredes laterales medía cinco codos de ancho. También midió la nave central; esta medía cuarenta codos de largo por veinte de ancho.»',
      rvr1960: '«El ancho de la puerta era de diez codos, y los lados de la puerta, de cinco codos de un lado, y cinco del otro. Y midió su longitud, de cuarenta codos, y la anchura de veinte codos.»',
      rva: '«Y la anchura de la puerta era de diez codos; y los lados de la puerta, de cinco codos de una parte, y cinco de otra. Y midió su longitud de cuarenta codos, y la anchura de veinte codos.»',
    },
    note: 'Los muros tienen seis codos de grueso (41:1, 5); la sala mide cuarenta por veinte, como la sala principal del templo de Salomón (1 Reyes 6:17). No se da la altura de la casa; se dibuja de treinta codos como la de Salomón, y el muro sur se quita para ver dentro. Ezequiel entra hasta {theNave}; es sacerdote, pero solo el hombre pasa más allá.',
    size: '40 × 20 codos (21 × 10,5 m) · muros de 6',
  },
  {
    title: { nvi: 'El Lugar Santísimo', default: 'El lugar santísimo' }, ref: 'Ezequiel 41:4',
    quote: {
      nbla: '«Midió su longitud y tenía 20 codos (10.5 metros), y la anchura, 20 codos delante de la nave. Entonces me dijo: “Este es el lugar santísimo”».',
      nvi: '«Después midió la longitud del santuario interior, hacia el lado del Lugar Santo, que era de veinte codos de largo; su anchura era de la misma medida. Entonces me dijo: “Este es el Lugar Santísimo”».',
      rvr1960: '«Midió también su longitud, de veinte codos, y la anchura de veinte codos, delante del templo; y me dijo: Este es el lugar santísimo.»',
      rva: '«Midió también su longitud, de veinte codos, y la anchura de veinte codos, delante del templo: y díjome: Este es el lugar santísimo.»',
    },
    note: 'Aquí solo entra el hombre (41:3); Ezequiel se queda en {theNave}. El muro entre las dos salas tiene dos codos de grueso, con una entrada de seis codos. La sala mide veinte codos en cuadro como la de Salomón (1 Reyes 6:20), pero nada hay en ella: ni arca, ni querubines, ni velo. Ezequiel no sabe qué la llenará hasta que vuelve la gloria (43:5).',
    size: '20 × 20 codos (10,5 m) · entrada de 6',
  },
  {
    title: { rva: 'Las cámaras', default: 'Las cámaras laterales' }, ref: 'Ezequiel 41:6',
    quote: {
      nbla: '«Las cámaras laterales estaban superpuestas en tres pisos, treinta en cada piso; y las cámaras laterales se extendían hasta el muro que estaba en su lado interior, todo alrededor, para que fueran aseguradas sin que fueran aseguradas al muro del templo.»',
      nvi: '«Estas cámaras laterales estaban puestas una sobre otra, formando tres pisos. En cada piso había treinta salas. Alrededor de todo el muro del Templo había soportes que sobresalían para sostener las cámaras laterales, de modo que no estuvieran empotradas en el muro del Templo.»',
      rvr1960: '«Las cámaras laterales estaban sobrepuestas unas a otras, treinta en cada uno de los tres pisos; y entraban modillones en la pared de la casa alrededor, sobre los que estribasen las cámaras, para que no estribasen en la pared de la casa.»',
      rva: '«Y las cámaras eran cámara sobre cámara, treinta y tres por orden; y entraban modillones en la pared de la casa alrededor, sobre los que las cámaras estribasen, y no estribasen en la pared de la casa.»',
    },
    note: 'Cuatro codos de ancho abajo, más anchas en cada piso a medida que el muro se retira (41:5, 7), como en el templo de Salomón (1 Reyes 6:6). Su muro exterior tiene cinco codos de grueso, con una puerta al norte y otra al sur que dan a un espacio libre de cinco codos sobre la plataforma, y alrededor un patio de veinte codos (41:9–11). No se da la altura de los pisos; se dibujan de seis codos.',
    size: '4 codos de ancho · muro exterior de 5 · 3 pisos de 30',
  },
  {
    title: 'El edificio al occidente', ref: 'Ezequiel 41:12',
    quote: {
      nbla: '«El edificio que estaba enfrente de la zona separada, hacia el lado occidental, tenía 70 codos (36.75 metros) de ancho; y el muro del edificio tenía 5 codos (2.63 metros) de ancho, todo alrededor, y su longitud era de 90 codos (47.25 metros).»',
      nvi: '«El edificio, que por el lado oeste quedaba frente al patio, medía setenta codos de ancho, con un muro de cinco codos de ancho por noventa codos de largo.»',
      rvr1960: '«Y el edificio que estaba delante del espacio abierto al lado del occidente era de setenta codos; y la pared del edificio, de cinco codos de grueso alrededor, y noventa codos de largo.»',
      rva: '«Y el edificio que estaba delante del apartamiento al lado de hacia el occidente era de setenta codos; y la pared del edificio, de cinco codos de anchura alrededor, y noventa codos de largo.»',
    },
    note: 'Detrás de la casa, al otro lado de {theSeparate}, hay un gran edificio cuyo uso no se dice; llena el lado occidental, donde no hay puerta. Tampoco se dan su altura ni sus puertas. Setenta por noventa por dentro, con sus muros mide ochenta por cien, y con {theSeparate} delante, cien codos de oriente a occidente (41:13).',
    size: '70 × 90 codos por dentro (37 × 47 m) · muros de 5',
  },
  {
    title: 'Cien codos', ref: 'Ezequiel 41:13',
    quote: {
      nbla: '«El hombre midió el templo y tenía 100 codos (52.5 metros) de largo; la zona separada con el edificio y sus muros tenían también 100 codos de largo.»',
      nvi: '«El hombre midió el Templo, el cual tenía un total de cien codos de largo. También el patio con el edificio adyacente y el muro medían cien codos de largo.»',
      rvr1960: '«Luego midió la casa, cien codos de largo; y el espacio abierto y el edificio y sus paredes, de cien codos de longitud.»',
      rva: '«Y midió la casa, cien codos de largo: y el apartamiento, y el edificio, y sus paredes, de longitud de cien codos…»',
    },
    note: 'El frente de la casa con los patios a ambos lados mide también cien codos (41:14), así que la casa y sus patios forman un cuadrado como el atrio interior de delante, que su cordel marca. De delante atrás: el {porch} 5 + 12, el muro 6, {theNave} 40, el muro 2, el lugar santísimo 20, el muro 6, las {sideChambers} 4 y su muro 5. No se menciona techo; se dibuja uno.',
    size: 'La casa: 100 × 100 codos con sus patios (52 m)',
  },
  {
    title: { rva: 'Querubines y palmas', default: 'Querubines y palmeras' }, ref: 'Ezequiel 41:18–19',
    quote: {
      nbla: '«Y había esculpidos querubines y palmeras; una palmera entre querubín y querubín, y cada querubín tenía dos caras: cara de hombre hacia la palmera por un lado y cara de leoncillo hacia la palmera por el otro lado; estaban esculpidos alrededor de todo el templo.»',
      nvi: '«…se alternaban los grabados de querubines y palmeras. Cada querubín tenía dos rostros, uno de hombre y otro de león. Cada rostro miraba hacia la palmera que tenía a su costado. Alrededor de todo el Templo podían verse los grabados de estos querubines.»',
      rvr1960: '«Y estaba labrada con querubines y palmeras, entre querubín y querubín una palmera; y cada querubín tenía dos rostros; un rostro de hombre hacia la palmera de un lado, y un rostro de león hacia la palmera del otro lado, por toda la casa alrededor.»',
      rva: '«Y estaba labrada con querubines y palmas: entre querubín y querubín una palma: y cada querubín tenía dos rostros: Un rostro de hombre hacia la palma de la una parte, y rostro de león hacia la palma de la otra parte, por toda la casa alrededor.»',
    },
    note: 'Las paredes están revestidas de madera desde el suelo hasta las ventanas (41:16–17), y labradas desde el suelo hasta encima de la entrada (41:20). A diferencia del de Salomón, no se habla de oro. En {theNave} hay un altar de madera de tres codos de alto y dos de largo: «Esta es la mesa que está delante del Señor» (41:22, NBLA). No se da su anchura; se dibuja de dos codos en cuadro.',
    size: 'Altar de madera de 2 × 2 × 3 codos',
  },
  {
    title: 'Puertas dobles', ref: 'Ezequiel 41:23–24',
    quote: {
      nbla: '«La nave y el santuario tenían puertas dobles. Las puertas tenían dos hojas, dos hojas giratorias; dos hojas una puerta y dos la otra.»',
      nvi: '«Tanto la nave central como el Lugar Santísimo tenían puertas dobles. Cada puerta tenía dos hojas; dos hojas giratorias para cada puerta.»',
      rvr1960: '«El templo y el santuario tenían dos puertas. Y en cada puerta había dos hojas, dos hojas que giraban; dos hojas en una puerta, y otras dos en la otra.»',
      rva: '«Y el templo y el santuario tenían dos portadas. Y en cada portada había dos puertas, dos puertas que se volvían: dos puertas en la una portada, y otras dos en la otra.»',
    },
    note: 'Las puertas {ofTheNave} estaban labradas con querubines y palmeras como las paredes, y delante del {porch} había un umbral o una cornisa de madera; la palabra es incierta (41:25), y se dibuja una cornisa. El {porch} tenía ventanas estrechas y palmeras a los lados (41:26). Las puertas se dibujan abiertas, cada hoja plegada en dos.',
    size: 'Entradas de 10 y 6 codos',
  },
  {
    title: { nvi: 'Las habitaciones sagradas', default: 'Las cámaras santas' }, ref: 'Ezequiel 42:13',
    quote: {
      nbla: '«Entonces el hombre me dijo: “Las cámaras del norte y las cámaras del sur, que están frente a la zona separada, son las cámaras santas donde los sacerdotes que están cerca del Señor comerán las cosas santísimas. Allí pondrán las cosas santísimas, la ofrenda de cereal, la ofrenda por el pecado y la ofrenda por la culpa; porque el lugar es santo.»',
      nvi: '«Después el hombre me dijo: “Las habitaciones del norte y del sur, que están frente al patio, son las habitaciones sagradas. Allí es donde los sacerdotes que se acercan al Señor comerán las ofrendas más sagradas. Allí colocarán las ofrendas más sagradas, la ofrenda de cereal, la ofrenda por el pecado y la ofrenda por la culpa, porque el lugar es santo.»',
      rvr1960: '«Y me dijo: Las cámaras del norte y las del sur, que están delante del espacio abierto, son cámaras santas en las cuales los sacerdotes que se acercan a Jehová comerán las santas ofrendas; allí pondrán las ofrendas santas, la ofrenda y la expiación y el sacrificio por el pecado, porque el lugar es santo.»',
      rva: '«Y díjome: Las cámaras del norte y las del mediodía, que están delante de la lonja, son cámaras santas, en las cuales los sacerdotes que se acercan á Jehová comerán las santas ofrendas: allí pondrán las ofrendas santas, y el presente, y la expiación, y el sacrificio por el pecado: porque el lugar es santo.»',
    },
    note: 'A cada lado de la casa, en el atrio exterior: un bloque de cien codos junto al patio y otro de cincuenta por fuera, de tres pisos escalonados, con un corredor de diez codos entre ellos y la entrada por el oriente (42:1–12). Los sacerdotes dejan aquí sus vestiduras santas antes de salir al pueblo (42:14). La disposición es una lectura de un pasaje difícil.',
    size: '100 × 50 codos · corredor de 10',
  },
  {
    title: 'Quinientos', ref: 'Ezequiel 42:20',
    quote: {
      nbla: '«Por los cuatro lados lo midió; tenía un muro todo alrededor de 500 cañas (262.5 metros) de largo y 500 cañas de ancho, para dividir entre lo sagrado y lo profano.»',
      nvi: '«El hombre tomó las medidas de los cuatro lados. La zona estaba rodeada por un muro que medía quinientos codos de largo por quinientos codos de ancho. Este muro separaba lo sagrado de lo profano.»',
      rvr1960: '«A los cuatro lados lo midió; tenía un muro todo alrededor, de quinientas cañas de longitud y quinientas cañas de ancho, para hacer separación entre el santuario y el lugar profano.»',
      rva: '«A los cuatro lados lo midió: tuvo el muro todo alrededor quinientas cañas de longitud, y quinientas cañas de anchura, para hacer separación entre el santuario y el lugar profano.»',
    },
    note: 'El hombre sacó a Ezequiel por la puerta oriental y midió todo alrededor (42:15–19). El hebreo dice quinientas cañas por lado, unos 1,6 km (RVR1960, RVA; la NBLA dice cañas, pero da 262,5 metros); el griego dice codos (NVI). Los atrios y las puertas del capítulo 40 suman quinientos codos, y así se dibuja. En 45:2 el santuario es otra vez un cuadrado de quinientos.',
    size: '500 × 500 codos (262 m)',
  },
];
