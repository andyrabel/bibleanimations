// Spanish text for "Nehemiah's Wall", merged over data.js (see addLanguage in ../../i18n.js).
// Same shape as data.js, text fields only. Version keys are the Spanish versions
// (nbla, nvi, rvr1960, rva); `default` covers the ones not listed. STOPS lines up
// with data.js by position.
//
// Quotations are verbatim, including each version's own spelling and names
// (the RVA keeps its 1909 spelling: "á", "Jerusalem", "Nethineos").

// The gate parts follow each version's wording of Nehemiah 3:3-15: the RVR and RVA
// "enmaderaron" (timbered) where others have beams, and their "cerraduras y cerrojos"
// stand for bolts and bars.
export const PARTS = {
  beams: { rvr1960: 'Maderamen', rva: 'Maderamen', default: 'Vigas' },
  doors: { nbla: 'Hojas', default: 'Puertas' },
  bolts: { rvr1960: 'Cerraduras', rva: 'Cerraduras', default: 'Cerrojos' },
  bars: { rvr1960: 'Cerrojos', rva: 'Cerrojos', default: 'Barras' },
  covered: { nbla: 'Revestida', rvr1960: 'Enmaderada', rva: 'Enmaderada', default: 'Techada' },
  consecrated: 'Consagrada',
};

export const GATES = {
  sheep: { name: 'Puerta de las Ovejas', repair: 'Edificada' },
  fish: { name: { nvi: 'Puerta de los Pescados', default: 'Puerta del Pescado' }, repair: 'Edificada' },
  old: { name: { nvi: 'Entrada de Jesaná', default: 'Puerta Vieja' }, repair: 'Reparada' },
  valley: { name: 'Puerta del Valle', repair: 'Reparada y edificada' },
  dung: { name: { nvi: 'Puerta del Basurero', default: 'Puerta del Muladar' }, repair: 'Reparada y edificada' },
  fountain: { name: 'Puerta de la Fuente', repair: 'Reparada y edificada' },
  water: { name: { nvi: 'Puerta del Agua', default: 'Puerta de las Aguas' }, repair: 'No se dice que fuera reparada' },
  horse: { name: 'Puerta de los Caballos', repair: 'Los sacerdotes repararon encima de ella' },
  east: { name: 'Puerta Oriental', repair: 'Solo se nombra a su guarda' },
  muster: {
    name: { rvr1960: 'Puerta del Juicio', rva: 'Puerta del Juicio', default: 'Puerta de la Inspección' },
    repair: 'Las reparaciones llegaron frente a ella',
  },
};

export const TOWERS = {
  meah: { name: { rvr1960: 'Torre de Hamea', rva: 'Torre de Meah', default: 'Torre de los Cien' } },
  hananel: { name: { nvi: 'Torre de Jananel', default: 'Torre de Hananeel' } },
  ovens: { name: { nbla: 'Torre de Hornos', default: 'Torre de los Hornos' } },
  kingtower: { name: { nbla: 'Torre de la casa alta del rey', nvi: 'Torre del palacio real', default: 'Torre alta de la casa del rey' } },
  greattower: { name: { nbla: 'Gran torre sobresaliente', rva: 'Grande torre que sobresale', default: 'Gran torre que sobresale' } },
  corner2: { name: { nbla: 'Aposento alto de la esquina', nvi: 'Puesto de vigilancia de la esquina', default: 'Sala de la esquina' } },
};

export const FEATURES = {
  temple: { name: 'El templo' },
  broadWall: { name: { rvr1960: 'Muro ancho', rva: 'Muro ancho', default: 'Muralla Ancha' } },
  poolSiloam: { name: { rva: 'Estanque de Selah', default: 'Estanque de Siloé' } },
  kingsGarden: { name: { rvr1960: 'Huerto del rey', rva: 'Huerta del rey', default: 'Jardín del rey' } },
  stairs: { name: 'Gradas de la ciudad de David' },
  tombs: { name: 'Sepulcros de David' },
  artificialPool: { name: { rvr1960: 'Estanque labrado', rva: 'Estanque labrado', default: 'Estanque artificial' } },
  mighty: { name: { nvi: 'Cuartel de la guardia real', default: 'Casa de los Valientes' } },
  armory: { name: { nbla: 'Subida al arsenal', nvi: 'Arsenal', default: 'Subida de la armería' } },
  eliashib: { name: 'Casa del sumo sacerdote Eliasib' },
  angle: { name: { nbla: 'El Ángulo', default: 'La esquina' } },
  kingsHouse: {
    name: { nbla: 'Casa alta del rey y atrio de la guardia', nvi: 'Palacio real y patio de la guardia', default: 'Casa del rey y patio de la cárcel' },
  },
  gihon: { name: 'Manantial de Gihón' },
  ophel: { name: { rva: 'Ophel', default: 'Ofel' } },
  cityOfDavid: { name: 'Ciudad de David' },
  kidron: { name: 'Valle del Cedrón' },
  kidronN: { name: 'Valle del Cedrón' },
  hinnom: { name: 'Valle de Hinom' },
  olives: { name: 'Monte de los Olivos' },
};

export const INTRO = {
  title: 'Jerusalén, 445 a. C.',
  ref: 'Nehemías 1–3',
  quote: {
    nbla: '«…la muralla de Jerusalén está derribada y sus puertas quemadas a fuego». (1:3)',
    nvi: '«La muralla de Jerusalén sigue derribada, con sus puertas consumidas por el fuego». (1:3)',
    rvr1960: '«…y el muro de Jerusalén derribado, y sus puertas quemadas a fuego». (1:3)',
    rva: '«…y el muro de Jerusalem derribado, y sus puertas quemadas á fuego». (1:3)',
  },
  note: 'Nehemías, copero del rey Artajerjes, ha vuelto a una ciudad en ruinas. El capítulo 3 enumera, en orden, quién reconstruyó cada tramo de la muralla, en sentido contrario a las agujas del reloj desde la puerta de las Ovejas. Este recorrido sigue esa lista, y la muralla se vuelve a levantar a nuestro paso.',
  aside: 'El circuito que se muestra es la ciudad más pequeña de después del exilio: la loma de la Ciudad de David y el monte del Templo. Las posiciones son aproximadas.',
};

export const FINALE = {
  title: 'La muralla está terminada',
  ref: 'Nehemías 6:15–16',
  quote: {
    nbla: '«La muralla fue terminada el veinticinco del mes de Elul, en cincuenta y dos días».',
    nvi: '«La muralla se terminó el día veinticinco del mes de elul. Su reconstrucción había durado cincuenta y dos días».',
    rvr1960: '«Fue terminado, pues, el muro, el veinticinco del mes de Elul, en cincuenta y dos días».',
    rva: '«Acabóse pues el muro el veinticinco del mes de Elul, en cincuenta y dos días».',
  },
  note: {
    nbla: 'Sus enemigos «reconocieron que esta obra había sido hecha con la ayuda de nuestro Dios» (6:16). Cada familia reparó el tramo junto a su propia casa, y todo el circuito quedó terminado en menos de dos meses, casi todo con la piedra caliza que yacía entre los escombros.',
    nvi: 'Sus enemigos «reconocieron que ese trabajo se había hecho con la ayuda de nuestro Dios» (6:16). Cada familia reparó el tramo junto a su propia casa, y todo el circuito quedó terminado en menos de dos meses, casi todo con la piedra caliza que yacía entre los escombros.',
    default: 'Sus enemigos «conocieron que por nuestro Dios había sido hecha esta obra» (6:16). Cada familia reparó el tramo junto a su propia casa, y todo el circuito quedó terminado en menos de dos meses, casi todo con la piedra caliza que yacía entre los escombros.',
  },
};

export const STOPS = [
  {
    title: 'La puerta de las Ovejas',
    quote: {
      nbla: '«Entonces el sumo sacerdote Eliasib se levantó con sus hermanos los sacerdotes y edificaron la puerta de las Ovejas; la consagraron y asentaron sus hojas».',
      nvi: '«Entonces el sumo sacerdote Eliasib y sus compañeros los sacerdotes trabajaron en la reconstrucción de la puerta de las Ovejas. La repararon y la colocaron en su lugar…»',
      rvr1960: '«Entonces se levantó el sumo sacerdote Eliasib con sus hermanos los sacerdotes, y edificaron la puerta de las Ovejas. Ellos arreglaron y levantaron sus puertas…»',
      rva: '«Y levantóse Eliasib el gran sacerdote con sus hermanos los sacerdotes, y edificaron la puerta de las Ovejas. Ellos aparejaron y levantaron sus puertas…»',
    },
    note: {
      rvr1960: 'Los sacerdotes empezaron por la puerta más cercana al templo, por donde entraban las ovejas para el sacrificio. Se levantan sus puertas, pero no se mencionan cerraduras ni cerrojos. Es la única puerta de la que el hebreo dice que fue consagrada.',
      rva: 'Los sacerdotes empezaron por la puerta más cercana al templo, por donde entraban las ovejas para el sacrificio. Se levantan sus puertas, pero no se mencionan cerraduras ni cerrojos. Es la única puerta de la que el hebreo dice que fue consagrada.',
      default: 'Los sacerdotes empezaron por la puerta más cercana al templo, por donde entraban las ovejas para el sacrificio. Se colocan sus puertas, pero no se mencionan cerrojos ni barras. Es la única puerta de la que el hebreo dice que fue consagrada.',
    },
    builders: 'El sumo sacerdote Eliasib y los sacerdotes',
  },
  {
    title: { rvr1960: 'Torres de Hamea y Hananeel', rva: 'Torres de Meah y Hananeel', nvi: 'Torres de los Cien y Jananel', default: 'Torres de los Cien y Hananeel' },
    quote: {
      nbla: '«Consagraron la muralla hasta la torre de los Cien y hasta la torre de Hananeel».',
      nvi: '«…y reconstruyeron también la muralla desde la torre de los Cien hasta la torre de Jananel».',
      rvr1960: '«…hasta la torre de Hamea, y edificaron hasta la torre de Hananeel».',
      rva: '«…hasta la torre de Meah, aparejándola hasta la torre de Hananeel».',
    },
    note: 'El lado norte no tenía un valle profundo que lo protegiera, así que lo guardaban torres. Según el hebreo, la consagración llegó hasta aquí. A continuación trabajaron los hombres de Jericó, y luego Zacur, hijo de Imri.',
    builders: 'Los sacerdotes · hombres de Jericó · Zacur',
  },
  {
    title: { nvi: 'La puerta de los Pescados', default: 'La puerta del Pescado' },
    quote: {
      nbla: '«La puerta del Pescado la edificaron los hijos de Senaa. Colocaron sus vigas y asentaron sus hojas, sus cerrojos y sus barras».',
      nvi: '«La puerta de los Pescados la reconstruyeron los descendientes de Sená. Colocaron las vigas y pusieron la puerta en su lugar, con sus cerrojos y barras».',
      rvr1960: '«Los hijos de Senaa edificaron la puerta del Pescado; ellos la enmaderaron, y levantaron sus puertas, con sus cerraduras y sus cerrojos».',
      rva: '«Y los hijos de Senaa edificaron la puerta del Pescado: ellos la enmaderaron, y levantaron sus puertas, con sus cerraduras y sus cerrojos».',
    },
    note: {
      nbla: 'Probablemente se llamaba así por el comercio de pescado (los tirios vendían pescado en Jerusalén, 13:16). Es la primera puerta descrita por completo: vigas, hojas, cerrojos y barras. Después vinieron Meremot, Mesulam, Sadoc y los tecoítas, «pero sus nobles no apoyaron la obra de sus señores».',
      nvi: 'Probablemente se llamaba así por el comercio de pescado (los tirios vendían pescado en Jerusalén, 13:16). Es la primera puerta descrita por completo: vigas, puertas, cerrojos y barras. Después vinieron Meremot, Mesulán, Sadoc y los de Tecoa, «aunque sus notables no quisieron colaborar con los dirigentes».',
      rvr1960: 'Probablemente se llamaba así por el comercio de pescado (los tirios vendían pescado en Jerusalén, 13:16). Es la primera puerta descrita por completo: maderamen, puertas, cerraduras y cerrojos. Después vinieron Meremot, Mesulam, Sadoc y los tecoítas, «pero sus grandes no se prestaron para ayudar a la obra de su Señor».',
      rva: 'Probablemente se llamaba así por el comercio de pescado (los tirios vendían pescado en Jerusalén, 13:16). Es la primera puerta descrita por completo: maderamen, puertas, cerraduras y cerrojos. Después vinieron Meremot, Mesulam, Sadoc y los tecoítas, «mas sus grandes no prestaron su cerviz á la obra de su Señor».',
    },
    builders: 'Los hijos de Senaa',
  },
  {
    title: { nvi: 'La entrada de Jesaná', default: 'La puerta Vieja' },
    quote: {
      nbla: '«La puerta Vieja la repararon Joiada, hijo de Paseah, y Mesulam, hijo de Besodías. Colocaron sus vigas y asentaron sus hojas con sus cerrojos y sus barras».',
      nvi: '«La entrada de Jesaná la reconstruyeron Joyadá, hijo de Paseaj, y Mesulán, hijo de Besodías. Colocaron las vigas y pusieron en su lugar las puertas con sus cerrojos y barras».',
      rvr1960: '«La puerta Vieja fue restaurada por Joiada hijo de Paseah y Mesulam hijo de Besodías; ellos la enmaderaron, y levantaron sus puertas, con sus cerraduras y cerrojos».',
      rva: '«Y la puerta Vieja restauraron Joiada hijo de Pasea, y Mesullam hijo de Besodías: ellos la enmaderaron, y levantaron sus puertas, con sus cerraduras y sus cerrojos».',
    },
    note: {
      nbla: 'Su nombre hebreo, Jesaná, significa «vieja». Puede referirse a la puerta de la ciudad vieja o al camino hacia el pueblo de Jesaná. Como la puerta del Pescado, recibe vigas, hojas, cerrojos y barras.',
      nvi: 'Jesaná significa «vieja», y otras versiones la llaman la puerta Vieja. El nombre puede referirse a la puerta de la ciudad vieja o al camino hacia el pueblo de Jesaná. Como la puerta de los Pescados, recibe vigas, puertas, cerrojos y barras.',
      default: 'Su nombre hebreo, Jesaná, significa «vieja». Puede referirse a la puerta de la ciudad vieja o al camino hacia el pueblo de Jesaná. Como la puerta del Pescado, recibe maderamen, puertas, cerraduras y cerrojos.',
    },
    builders: 'Joiada, hijo de Paseah, y Mesulam, hijo de Besodías',
  },
  {
    title: { rvr1960: 'El muro ancho', rva: 'El muro ancho', default: 'La muralla Ancha' },
    quote: {
      nbla: '«Ellos restauraron a Jerusalén hasta la muralla Ancha».',
      nvi: '«Entre los dos reconstruyeron la muralla de Jerusalén hasta la muralla Ancha».',
      rvr1960: '«Así dejaron reparada a Jerusalén hasta el muro ancho».',
      rva: '«Así dejaron reparado á Jerusalem hasta el muro ancho».',
    },
    note: 'Aquí trabajaron hombres de Gabaón y de Mizpa, junto con Uziel el platero y Hananías el perfumista. Avigad excavó en la colina occidental una «muralla ancha» de 7 m de grosor, de los días de Ezequías, y se discute si la línea de Nehemías llegaba hasta ella. Aquí se muestra en una posición simplificada.',
    builders: 'Hombres de Gabaón y Mizpa · Uziel · Hananías',
  },
  {
    title: { nbla: 'La torre de Hornos', default: 'La torre de los Hornos' },
    quote: {
      nbla: '«Malquías, hijo de Harim, y Hasub, hijo de Pahat Moab, repararon otra sección y la torre de Hornos».',
      nvi: '«Malquías, hijo de Jarín, y Jasub, hijo de Pajat Moab, reconstruyeron el siguiente tramo de la muralla y la torre de los Hornos».',
      rvr1960: '«Malquías hijo de Harim y Hasub hijo de Pahat-moab restauraron otro tramo, y la torre de los Hornos».',
      rva: '«Malchîas hijo de Harim y Hasub hijo de Pahath-moab, restauraron la otra medida, y la torre de los Hornos».',
    },
    note: {
      nvi: 'Quizá se llamaba así por los hornos de los panaderos (compara la calle de los panaderos, Jer 37:21). Cerca trabajaron los gobernantes de las dos mitades del distrito de Jerusalén. Salún trabajó aquí «con la ayuda de sus hijas».',
      default: 'Quizá se llamaba así por los hornos de los panaderos (compara la calle de los panaderos, Jer 37:21). Cerca trabajaron los gobernantes de las dos mitades del distrito de Jerusalén. Salum trabajó aquí, «él con sus hijas».',
    },
    builders: 'Refaías · Jedaías · Hatús · Malquías · Hasub · Salum y sus hijas',
  },
  {
    title: 'La puerta del Valle',
    quote: {
      nbla: '«…La edificaron y asentaron sus hojas con sus cerrojos y sus barras, y 1,000 codos (450 metros) de la muralla hasta la puerta del Muladar».',
      nvi: '«…y la colocaron en su lugar con sus cerrojos y barras. Levantaron también mil codos de muralla hasta la puerta del Basurero».',
      rvr1960: '«…ellos la reedificaron, y levantaron sus puertas, con sus cerraduras y sus cerrojos, y mil codos del muro, hasta la puerta del Muladar».',
      rva: '«…ellos la reedificaron, y levantaron sus puertas, con sus cerraduras y sus cerrojos, y mil codos en el muro hasta la puerta del Muladar».',
    },
    note: 'La inspección nocturna de Nehemías empezó aquí (2:13). En 1927 Crowfoot y FitzGerald excavaron una puerta en el muro occidental de la Ciudad de David que muchos identifican con esta. Mil codos son unos 450–500 m.',
    builders: 'Hanún y los habitantes de Zanoa',
  },
  {
    title: { nvi: 'La puerta del Basurero', default: 'La puerta del Muladar' },
    quote: {
      nbla: '«Malquías, hijo de Recab, oficial del distrito de Bet Haquerem reparó la puerta del Muladar. La edificó y asentó sus hojas, sus cerrojos y sus barras».',
      nvi: '«Malquías, hijo de Recab, gobernador del distrito de Bet Haqueren, reconstruyó la puerta del Basurero y la colocó en su lugar con sus cerrojos y barras».',
      rvr1960: '«Reedificó la puerta del Muladar Malquías hijo de Recab, gobernador de la provincia de Bet-haquerem; él la reedificó, y levantó sus puertas, sus cerraduras y sus cerrojos».',
      rva: '«Y reedificó la puerta del Muladar, Malchîas hijo de Rechâb, príncipe de la provincia de Beth-haccerem: él la reedificó, y levantó sus puertas, sus cerraduras y sus cerrojos».',
    },
    note: 'Por esta puerta se sacaban los desechos. Estaba cerca del extremo sur, sobre el valle de Hinom, adonde se llevaba la basura. Acabamos de recorrer los mil codos desde la puerta del Valle.',
    builders: 'Malquías, hijo de Recab, gobernante de Bet-haquerem',
  },
  {
    title: 'La puerta de la Fuente',
    quote: {
      nbla: '«…La edificó, la revistió y asentó sus hojas, sus cerrojos y sus barras».',
      nvi: '«…reconstruyó la puerta de la Fuente, la techó y la colocó en su lugar con sus cerrojos y barras».',
      rvr1960: '«…él la reedificó, la enmaderó y levantó sus puertas, sus cerraduras y sus cerrojos».',
      rva: '«…él la reedificó, y la enmaderó, y levantó sus puertas, sus cerraduras y sus cerrojos».',
    },
    note: {
      nbla: 'Es la única puerta de la que se dice «la revistió»: el hebreo significa que la techó o la cubrió. También tiene hojas, cerrojos y barras. Se llamaba así por las aguas de manantial al pie de la loma.',
      nvi: 'Es la única puerta de la que se dice que fue techada. También tiene puertas, cerrojos y barras. Se llamaba así por las aguas de manantial al pie de la loma.',
      default: 'Es la única puerta de la que se dice «la enmaderó»: el hebreo significa que la techó o la cubrió. También tiene puertas, cerraduras y cerrojos. Se llamaba así por las aguas de manantial al pie de la loma.',
    },
    builders: 'Salum, hijo de Col-hoze, gobernante de Mizpa',
  },
  {
    title: { rvr1960: 'El estanque de Siloé y el huerto del rey', rva: 'El estanque de Selah y la huerta del rey', default: 'El estanque de Siloé y el jardín del rey' },
    quote: {
      nbla: '«…y la muralla del estanque de Siloé en el jardín del rey…»',
      nvi: '«Reconstruyó también el muro del estanque de Siloé, que está junto al jardín del rey…»',
      rvr1960: '«…y el muro del estanque de Siloé hacia el huerto del rey…»',
      rva: '«…y el muro del estanque de Selah hacia la huerta del rey…»',
    },
    note: {
      rva: 'El túnel de Ezequías llevaba el agua del manantial de Gihón hasta este extremo de la ciudad (2 R 20:20). El jardín real estaba más abajo, donde se unen los valles del Cedrón y de Hinom. Siglos después, Jesús envió a un ciego a lavarse en este estanque, entonces llamado Siloé (Jn 9:7).',
      default: 'El túnel de Ezequías llevaba el agua del manantial de Gihón hasta este extremo de la ciudad (2 R 20:20). El jardín real estaba más abajo, donde se unen los valles del Cedrón y de Hinom. Siglos después, Jesús envió a un ciego a lavarse en este estanque (Jn 9:7).',
    },
    builders: 'Salum',
  },
  {
    title: { nvi: 'Las gradas que llevan a la Ciudad de David', default: 'Las gradas que descienden de la ciudad de David' },
    quote: {
      nbla: '«…hasta las gradas que descienden de la ciudad de David».',
      nvi: '«…hasta las gradas que llevan a la Ciudad de David».',
      default: '«…y hasta las gradas que descienden de la ciudad de David».',
    },
    note: 'Aquí el relato gira hacia el norte por el lado oriental. Kenyon descubrió que la muralla de después del exilio seguía la cresta de la loma, muy por encima de la muralla antigua de la ladera, cuyas terrazas derrumbadas Nehemías no pudo cruzar con su cabalgadura (2:14).',
    builders: 'Salum',
  },
  {
    title: 'Frente a los sepulcros de David',
    quote: {
      nbla: '«Después de él hizo reparaciones Nehemías, hijo de Azbuc, oficial de la mitad del distrito de Bet Sur, hasta un punto frente a los sepulcros de David…»',
      nvi: '«Nehemías, hijo de Azbuc, gobernador de una mitad del distrito de Betsur, reconstruyó el siguiente tramo hasta el lugar que está frente a los sepulcros de David…»',
      rvr1960: '«Después de él restauró Nehemías hijo de Azbuc, gobernador de la mitad de la región de Bet-sur, hasta delante de los sepulcros de David…»',
      rva: '«Después de él restauró Nehemías hijo de Azbuc, príncipe de la mitad de la región de Beth-sur, hasta delante de los sepulcros de David…»',
    },
    note: 'Es otro Nehemías, gobernante de la mitad de Bet-sur. David fue sepultado en la Ciudad de David (1 R 2:10). En la excavación de Weill de 1913–14 aparecieron aquí tumbas en forma de túnel, excavadas en la roca, que algunos proponen como las tumbas reales.',
    builders: 'Nehemías, hijo de Azbuc',
  },
  {
    title: { rvr1960: 'El estanque labrado', rva: 'El estanque labrado', default: 'El estanque artificial' },
    quote: {
      rvr1960: '«…y hasta el estanque labrado…»',
      rva: '«…y hasta el estanque labrado…»',
      default: '«…hasta el estanque artificial…»',
    },
    note: 'Es un depósito hecho a mano, distinto del estanque de Siloé. Puede estar relacionado con las obras hidráulicas de los días de Ezequías (Is 22:9–11). No se sabe dónde estaba exactamente.',
    builders: 'Nehemías, hijo de Azbuc',
  },
  {
    title: { nvi: 'El cuartel de la guardia real', default: 'La casa de los Valientes' },
    quote: {
      nbla: '«…y hasta la casa de los valientes».',
      nvi: '«…y hasta el cuartel de la guardia real».',
      default: '«…y hasta la casa de los Valientes».',
    },
    note: {
      nvi: 'Quizá el cuartel de los guerreros de David, sus valientes (2 S 23:8). Después vinieron los levitas con Rejún, y luego Jasabías y Binuy por sus distritos de Queilá.',
      default: 'Quizá el cuartel de los guerreros de David, sus valientes (2 S 23:8). Después vinieron los levitas bajo Rehum, y luego Hasabías y Bavai por sus distritos de Keila.',
    },
    builders: { nvi: 'Nehemías, hijo de Azbuc · levitas · Jasabías · Binuy', default: 'Nehemías, hijo de Azbuc · levitas · Hasabías · Bavai' },
  },
  {
    title: { nbla: 'La subida al arsenal, en el Ángulo', nvi: 'El arsenal de la esquina', default: 'La subida de la armería, en la esquina' },
    quote: {
      nbla: '«…reparó otra sección, enfrente de la subida al arsenal del Ángulo».',
      nvi: '«…que reconstruyó el tramo que sube frente al arsenal de la esquina».',
      rvr1960: '«…otro tramo frente a la subida de la armería de la esquina».',
      rva: '«…la otra medida frente á la subida de la armería de la esquina».',
    },
    note: {
      nbla: 'Ezer, gobernante de Mizpa, reparó otra sección. Aquí la muralla cambia de dirección, en «el Ángulo», un recodo o contrafuerte de su trazado.',
      default: 'Ezer, gobernante de Mizpa, reparó otro tramo. Aquí la muralla cambia de dirección, en «la esquina», un recodo o contrafuerte de su trazado.',
    },
    builders: 'Ezer, hijo de Jesúa, gobernante de Mizpa',
  },
  {
    title: 'La casa de Eliasib',
    quote: {
      nbla: '«Después de él, Baruc, hijo de Zabai, con todo fervor reparó otra sección, desde el Ángulo hasta la puerta de la casa del sumo sacerdote Eliasib».',
      nvi: '«El tramo siguiente, es decir, el sector que va desde la esquina hasta la puerta de la casa del sumo sacerdote Eliasib, lo reconstruyó con entusiasmo Baruc, hijo de Zabay».',
      rvr1960: '«Después de él Baruc hijo de Zabai con todo fervor restauró otro tramo, desde la esquina hasta la puerta de la casa de Eliasib sumo sacerdote».',
      rva: '«Después de él se enfervorizó á restaurar Baruch hijo de Zachâi la otra medida, desde la esquina hasta la puerta de la casa de Eliasib gran sacerdote».',
    },
    note: 'Después de Baruc, Meremot trabajó desde la puerta de Eliasib hasta el extremo de su casa. Aquí vivía el sumo sacerdote que había empezado en la puerta de las Ovejas.',
    builders: 'Baruc, hijo de Zabai · Meremot, hijo de Urías',
  },
  {
    title: { nbla: 'El Ángulo y la esquina', rva: 'La revuelta y la esquina', default: 'El ángulo y la esquina' },
    quote: {
      nbla: '«…desde la casa de Azarías hasta el Ángulo y hasta la esquina».',
      nvi: '«…desde la casa de Azarías hasta el ángulo, es decir, hasta la esquina».',
      rvr1960: '«…desde la casa de Azarías hasta el ángulo entrante del muro, y hasta la esquina».',
      rva: '«…desde la casa de Azarías hasta la revuelta, y hasta la esquina».',
    },
    note: 'Aquí trabajaron sacerdotes de los alrededores, y luego Benjamín, Hasub y Azarías, cada uno junto a su propia casa. Cada cual guardaba su propio hogar. Binúi terminó en la esquina.',
    builders: 'Sacerdotes de los alrededores · Benjamín · Hasub · Azarías · Binúi',
  },
  {
    title: { nbla: 'La torre de la casa alta del rey', nvi: 'La torre del palacio real', default: 'La torre alta de la casa del rey' },
    quote: {
      nbla: '«…la torre que sobresale de la casa alta del rey, que está junto al atrio de la guardia».',
      nvi: '«…la torre alta que sobresale del palacio real, junto al patio de la guardia».',
      default: '«…la torre alta que sale de la casa del rey, que está en el patio de la cárcel».',
    },
    note: 'Una torre sobresalía del antiguo palacio real, junto al patio de la guardia donde estuvo preso Jeremías (Jer 32:2). Eilat Mazar relacionó grandes estructuras de esta loma con el palacio y con la muralla de Nehemías. Ambas propuestas se discuten.',
    builders: 'Palal, hijo de Uzai · Pedaías, hijo de Faros',
  },
  {
    title: { nvi: 'Ofel y la puerta del Agua', rva: 'Ophel y la puerta de las Aguas', default: 'Ofel y la puerta de las Aguas' },
    quote: {
      nbla: '«Los sirvientes del templo que habitaban en Ofel hicieron reparaciones hasta el frente de la puerta de las Aguas, hacia el oriente…»',
      nvi: '«Los servidores del Templo que vivían en Ofel reconstruyeron el sector oriental que está frente a la puerta del Agua…»',
      rvr1960: '«Y los sirvientes del templo que habitaban en Ofel restauraron hasta enfrente de la puerta de las Aguas al oriente…»',
      rva: '«…los Nethineos estuvieron en Ophel hasta enfrente de la puerta de las Aguas al oriente…»',
    },
    note: {
      nvi: 'Los servidores del Templo vivían en Ofel. No se dice que la puerta del Agua fuera reparada. La obra solo llegó hasta enfrente de ella, así que se muestra en pie con sus puertas, como si no necesitara reparación. Bajaba hacia el manantial de Gihón. Más tarde Esdras leyó la Ley en la plaza que había delante de ella (8:1).',
      default: 'Los sirvientes del templo vivían en Ofel. No se dice que la puerta de las Aguas fuera reparada. La obra solo llegó hasta enfrente de ella, así que se muestra en pie con sus puertas, como si no necesitara reparación. Bajaba hacia el manantial de Gihón. Más tarde Esdras leyó la Ley en la plaza que había delante de ella (8:1).',
    },
    builders: { rva: 'Los Nethineos (sirvientes del templo)', nvi: 'Los servidores del Templo', default: 'Los sirvientes del templo' },
  },
  {
    title: { nbla: 'La gran torre sobresaliente y el muro de Ofel', nvi: 'La gran torre y la muralla de Ofel', rva: 'La grande torre y el muro de Ophel', default: 'La gran torre y el muro de Ofel' },
    quote: {
      nbla: '«Después de ellos, los tecoítas repararon otra sección frente a la gran torre sobresaliente y hasta el muro de Ofel».',
      nvi: '«Los hombres de Tecoa reconstruyeron el tramo que va desde el frente de la gran torre que allí sobresale, hasta la muralla de Ofel».',
      rvr1960: '«Después de ellos restauraron los tecoítas otro tramo, enfrente de la gran torre que sobresale, hasta el muro de Ofel».',
      rva: '«Después de él restauraron los Tecoitas la otra medida, enfrente de la grande torre que sobresale, hasta el muro de Ophel».',
    },
    note: 'La gente común de Tecoa se hizo cargo de un segundo tramo, aunque sus nobles se habían negado a trabajar (3:5).',
    builders: { nvi: 'Los hombres de Tecoa', default: 'Los tecoítas' },
  },
  {
    title: 'La puerta de los Caballos',
    quote: {
      nbla: '«Más arriba de la puerta de los Caballos, los sacerdotes hicieron reparaciones cada uno frente a su casa».',
      nvi: '«Los sacerdotes, cada uno frente a su casa, reconstruyeron el sector de la muralla sobre la puerta de los Caballos».',
      default: '«Desde la puerta de los Caballos restauraron los sacerdotes, cada uno enfrente de su casa».',
    },
    note: 'No se registran puertas, cerrojos ni barras para esta puerta. Jeremías la sitúa al oriente (Jer 31:40). Puede estar relacionada con la entrada de los caballos al palacio (2 R 11:16).',
    builders: 'Los sacerdotes',
  },
  {
    title: 'La puerta Oriental',
    quote: {
      nbla: '«Y tras él hizo reparaciones Semaías, hijo de Secanías, portero de la puerta Oriental».',
      nvi: '«El sector que sigue lo reparó Semaías, hijo de Secanías, guardián de la puerta oriental».',
      rvr1960: '«…y después de él restauró Semaías hijo de Secanías, guarda de la puerta Oriental».',
      rva: '«…y después de él restauró Semaías hijo de Sechânías, guarda de la puerta oriental».',
    },
    note: 'Sadoc, hijo de Imer, reparó frente a su casa, y después lo hizo Semaías. Semaías es el guarda de la puerta, pero no se dice que la puerta misma fuera reconstruida. Daba al Cedrón, al este del templo.',
    builders: 'Sadoc, hijo de Imer · Semaías · Hananías · Hanún · Mesulam',
  },
  {
    title: { rvr1960: 'La puerta del Juicio', rva: 'La puerta del Juicio', default: 'La puerta de la Inspección' },
    quote: {
      nbla: '«Después de él, Malquías, uno de los orfebres, hizo reparaciones hasta la casa de los sirvientes del templo y de los mercaderes, frente a la puerta de la Inspección…»',
      nvi: '«Malquías, que era uno de los plateros, reconstruyó el tramo que llega hasta las casas de los servidores del Templo y de los comerciantes, frente a la puerta de la Inspección…»',
      rvr1960: '«Después de él restauró Malquías hijo del platero, hasta la casa de los sirvientes del templo y de los comerciantes, enfrente de la puerta del Juicio…»',
      rva: '«Después de él restauró Malchîas hijo del platero, hasta la casa de los Nethineos y de los tratantes, enfrente de la puerta del Juicio…»',
    },
    note: 'El nombre hebreo, Mifcad, significa cita, revista o inspección. Las reparaciones llegaron hasta la casa de los sirvientes del templo y de los mercaderes, frente a ella. No se mencionan sus puertas.',
    builders: { nvi: 'Malquías, uno de los plateros', rvr1960: 'Malquías, hijo del platero', rva: 'Malquías, hijo del platero', default: 'Malquías, uno de los orfebres' },
  },
  {
    title: { nbla: 'El aposento alto de la esquina', nvi: 'El puesto de vigilancia de la esquina', default: 'La sala de la esquina' },
    quote: {
      nbla: '«…y hasta el aposento alto de la esquina».',
      nvi: '«…y hasta el puesto de vigilancia de la esquina».',
      default: '«…y hasta la sala de la esquina».',
    },
    note: 'El hebreo dice literalmente «el aposento alto de la esquina», probablemente una sala de guardia en la esquina noreste, que dominaba el Cedrón.',
    builders: { nvi: 'Malquías, uno de los plateros', rvr1960: 'Malquías, hijo del platero', rva: 'Malquías, hijo del platero', default: 'Malquías, uno de los orfebres' },
  },
  {
    title: 'De vuelta a la puerta de las Ovejas',
    quote: {
      nbla: '«Los orfebres y los mercaderes hicieron reparaciones entre el aposento alto de la esquina y la puerta de las Ovejas».',
      nvi: '«Y el sector que va desde allí hasta la puerta de las Ovejas lo reconstruyeron los plateros y los comerciantes».',
      rvr1960: '«Y entre la sala de la esquina y la puerta de las Ovejas, restauraron los plateros y los comerciantes».',
      rva: '«Y entre la sala de la esquina hasta la puerta de las Ovejas, restauraron los plateros, y los tratantes».',
    },
    note: 'Los orfebres y los mercaderes cerraron el último hueco, junto a la puerta donde empezó el circuito. La muralla está completa.',
    builders: { nvi: 'Los plateros y los comerciantes', rvr1960: 'Los plateros y los comerciantes', rva: 'Los plateros y los tratantes', default: 'Los orfebres y los mercaderes' },
  },
];
