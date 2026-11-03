// Spanish text for "The Dedication of the Wall", merged over data.js (see addLanguage in ../../i18n.js).
// Same shape as data.js, text fields only. Version keys are the Spanish versions
// (nbla, nvi, rvr1960, rva); `default` covers the ones not listed. STOPS lines up
// with data.js by position. The city's own names (gates, towers, places) come
// from ../../nehemiahs-wall/lang/es.js.
//
// Quotations are verbatim, including each version's own spelling and names
// (the RVA keeps its 1909 spelling: "á", "Jerusalem", "Ephraim").

// The instruments of 12:27, as each version names them: the NVI has "liras y
// arpas" and the RVR and RVA "salterios y cítaras" where the NBLA has "arpas y liras".
export const INSTRUMENTS = {
  cymbals: 'Címbalos',
  harps: { nvi: 'Liras', rvr1960: 'Salterios', rva: 'Salterios', default: 'Arpas' },
  lyres: { nvi: 'Arpas', rvr1960: 'Cítaras', rva: 'Cítaras', default: 'Liras' },
  trumpets: 'Trompetas',
  david: { rva: 'Instrumentos músicos de David', default: 'Instrumentos de David' },
};

export const GATES = {
  ephraim: { name: { rva: 'Puerta de Ephraim', default: 'Puerta de Efraín' } },
  guard: { name: { rvr1960: 'Puerta de la Cárcel', rva: 'Puerta de la Cárcel', default: 'Puerta de la Guardia' } },
};

export const PEOPLE = {
  ezra: { name: 'Esdras' },
  nehemiah: { name: 'Nehemías' },
  choir1: { name: 'El primer coro' },
  choir2: { name: 'El segundo coro' },
};

export const INTRO = {
  title: 'Jerusalén, 445 a. C.',
  ref: 'Nehemías 12:27–43',
  quote: {
    nbla: '«…a fin de celebrar la dedicación con alegría, con himnos de acción de gracias y con cánticos, acompañados de címbalos, arpas y liras». (12:27)',
    nvi: '«…para celebrar la dedicación con cánticos de acción de gracias, al son de címbalos, liras y arpas». (12:27)',
    rvr1960: '«…para hacer la dedicación y la fiesta con alabanzas y con cánticos, con címbalos, salterios y cítaras». (12:27)',
    rva: '«…para hacer la dedicación y la fiesta con alabanzas y con cánticos, con címbalos, salterios y cítaras». (12:27)',
  },
  note: 'La muralla está terminada, en cincuenta y dos días (6:15). Nehemías 12 cuenta cómo se dedicó: dos grandes coros recorrieron lo alto de la muralla en direcciones opuestas y se encontraron en la casa de Dios. Este recorrido los sigue.',
  aside: 'No se da la fecha, solo que fue después de terminada la muralla en el 445 a. C. La ciudad es la misma reconstrucción que en «La muralla de Nehemías», y las posiciones son aproximadas.',
};

export const FINALE = {
  title: { rvr1960: 'El alborozo de Jerusalén', rva: 'El alborozo de Jerusalem', default: 'El regocijo de Jerusalén' },
  ref: 'Nehemías 12:43',
  quote: {
    nbla: '«El regocijo de Jerusalén se oía desde lejos».',
    nvi: '«Era tal el regocijo de Jerusalén que se oía desde lejos».',
    rvr1960: '«…y el alborozo de Jerusalén fue oído desde lejos».',
    rva: '«…y el alborozo de Jerusalem fué oído de lejos».',
  },
  note: 'Unos 140 años después de que los babilonios derribaran las murallas (2 R 25:10), la ciudad vuelve a tener muralla, y el sonido de su alegría cruza el Cedrón hasta el monte de los Olivos.',
};

export const STOPS = [
  {
    title: 'Buscan a los levitas',
    quote: {
      nbla: '«En la dedicación de la muralla de Jerusalén buscaron a los levitas de todos sus lugares para traerlos a Jerusalén…»',
      nvi: '«Cuando llegó el momento de dedicar la muralla, buscaron a los levitas en todos los lugares donde vivían, y los llevaron a Jerusalén…»',
      rvr1960: '«Para la dedicación del muro de Jerusalén, buscaron a los levitas de todos sus lugares para traerlos a Jerusalén…»',
      rva: '«Y á la dedicación del muro de Jerusalem buscaron á los Levitas de todos los lugares, para traerlos á Jerusalem…»',
    },
    note: 'Los levitas vivían en ciudades por todo Judá (11:20, 36), y los cantores se habían edificado aldeas alrededor de Jerusalén: Netofa al sur, Geba y Azmavet al norte, y Bet Gilgal. El texto no dice dónde empezó la procesión. La puerta del Valle, a mitad del lado oeste, conviene a los dos recorridos, así que se reúnen aquí.',
    who: { nvi: 'Los levitas · los cantores', default: 'Los levitas · los hijos de los cantores' },
  },
  {
    title: { rvr1960: 'Purifican al pueblo, las puertas y el muro', rva: 'Purifican al pueblo, las puertas y el muro', default: 'Purifican al pueblo, las puertas y la muralla' },
    quote: {
      nbla: '«Los sacerdotes y los levitas se purificaron; también purificaron al pueblo, las puertas y la muralla».',
      nvi: '«Después de purificarse a sí mismos, los sacerdotes y los levitas purificaron también a la gente, las puertas y la muralla».',
      rvr1960: '«Y se purificaron los sacerdotes y los levitas; y purificaron al pueblo, y las puertas, y el muro».',
      rva: '«Y se purificaron los sacerdotes y los Levitas; y purificaron al pueblo, y las puertas, y el muro».',
    },
    note: 'El texto no dice cómo. Cuando los levitas fueron apartados por primera vez, fueron rociados con agua y lavaron sus ropas (Nm 8:7, 21), y en la Pascua después de reconstruido el templo, los sacerdotes y los levitas se purificaron juntos (Esd 6:20). La luz que recorre la muralla solo señala lo que se purifica.',
    who: 'Los sacerdotes y los levitas',
  },
  {
    title: { rvr1960: 'Sobre el muro', rva: 'Sobre el muro', default: 'Sobre la muralla' },
    quote: {
      nbla: '«Entonces hice subir a los jefes de Judá sobre la muralla, y formé dos grandes coros…»',
      nvi: '«Luego hice que los líderes de Judá subieran a la muralla y organicé dos grandes coros…»',
      rvr1960: '«Hice luego subir a los príncipes de Judá sobre el muro, y puse dos coros grandes que fueron en procesión…»',
      rva: '«Hice luego subir á los príncipes de Judá sobre el muro, y puse dos coros grandes que fueron en procesión…»',
    },
    note: 'Nehemías lo cuenta él mismo. Lo alto de la muralla forma un camino alrededor de toda la ciudad, a la vista de todos. Cuando estaba a medio construir, Tobías se burló diciendo que si una zorra subía por ella la derribaría (4:3). Ahora lleva dos procesiones.',
    who: { nbla: 'Nehemías · los jefes de Judá', nvi: 'Nehemías · los líderes de Judá', default: 'Nehemías · los príncipes de Judá' },
  },
  {
    title: 'El primer coro va hacia la derecha',
    quote: {
      nbla: '«…el primero marchaba hacia la derecha, por encima de la muralla, hacia la puerta del Muladar… Y el escriba Esdras iba delante de ellos».',
      nvi: '«Uno de ellos marchaba sobre la muralla hacia la derecha, rumbo a la puerta del Basurero… Al frente de ellos iba el maestro Esdras».',
      rvr1960: '«…el uno a la derecha, sobre el muro, hacia la puerta del Muladar… y el escriba Esdras delante de ellos».',
      rva: '«…el uno á la mano derecha sobre el muro hacia la puerta del Muladar… y Esdras escriba, delante de ellos».',
    },
    note: {
      nbla: 'En hebreo las direcciones se dan mirando al este, así que la mano derecha es el sur. Detrás del coro van Osaías y la mitad de los jefes de Judá, hijos de los sacerdotes con trompetas, y Zacarías, descendiente de Asaf, con sus parientes y «los instrumentos musicales de David, hombre de Dios».',
      nvi: 'En hebreo las direcciones se dan mirando al este, así que la mano derecha es el sur. Detrás del coro van Osaías y la mitad de los líderes de Judá, sacerdotes con trompetas, y Zacarías, descendiente de Asaf, con sus parientes, que llevaban «los instrumentos musicales de David, hombre de Dios».',
      rvr1960: 'En hebreo las direcciones se dan mirando al este, así que la mano derecha es el sur. Detrás del coro van Osaías y la mitad de los príncipes de Judá, hijos de los sacerdotes con trompetas, y Zacarías, descendiente de Asaf, con sus hermanos y «los instrumentos musicales de David varón de Dios».',
      rva: 'En hebreo las direcciones se dan mirando al este, así que la mano derecha es el sur. Detrás del coro van Osaías y la mitad de los príncipes de Judá, hijos de los sacerdotes con trompetas, y Zacarías, descendiente de Asaph, con sus hermanos y «los instrumentos músicos de David varón de Dios».',
    },
    who: {
      nbla: 'Esdras · el primer coro · Osaías y la mitad de los jefes · hijos de sacerdotes · Zacarías y sus parientes',
      nvi: 'Esdras · el primer coro · Osaías y la mitad de los líderes · sacerdotes · Zacarías y sus parientes',
      default: 'Esdras · el primer coro · Osaías y la mitad de los príncipes · hijos de sacerdotes · Zacarías y sus hermanos',
    },
  },
  {
    title: { nvi: 'Las gradas de la Ciudad de David', default: 'Las gradas de la ciudad de David' },
    quote: {
      nbla: '«Y a la puerta de la Fuente subieron directamente las gradas de la ciudad de David por la escalera de la muralla…»',
      nvi: '«Al llegar a la puerta de la Fuente, subieron derecho por las gradas de la Ciudad de David, por la cuesta de la muralla…»',
      rvr1960: '«Y a la puerta de la Fuente, en frente de ellos, subieron por las gradas de la ciudad de David, por la subida del muro…»',
      rva: '«Y á la puerta de la Fuente, en derecho delante de ellos, subieron por las gradas de la ciudad de David, por la subida del muro…»',
    },
    note: 'Pasada la puerta de la Fuente, la muralla gira al norte y sube por la loma de la Ciudad de David. Se discute si el coro siguió sobre la muralla o subió por una escalera junto a ella, las gradas que bajaban de la ciudad (3:15). Aquí sigue por lo alto de la muralla.',
    who: 'El primer coro',
  },
  {
    title: {
      nvi: 'Junto al palacio de David hasta la puerta del Agua',
      rvr1960: 'Desde la casa de David hasta la puerta de las Aguas', rva: 'Desde la casa de David hasta la puerta de las Aguas',
      default: 'Por encima de la casa de David hasta la puerta de las Aguas',
    },
    quote: {
      nbla: '«…por encima de la casa de David hasta la puerta de las Aguas al oriente».',
      nvi: '«…pasando junto al palacio de David, hasta la puerta del Agua, al este de la ciudad».',
      rvr1960: '«…desde la casa de David hasta la puerta de las Aguas, al oriente».',
      rva: '«…desde la casa de David hasta la puerta de las Aguas al oriente».',
    },
    note: {
      nvi: 'Pasan junto al antiguo palacio real, en lo alto de la loma (el de 3:25), y se detienen sobre la puerta del Agua, donde Esdras había leído la Ley a todo el pueblo (8:1–3). Aquí esperan mientras el segundo coro da la vuelta.',
      default: 'Pasan junto al antiguo palacio real, en lo alto de la loma (el de 3:25), y se detienen sobre la puerta de las Aguas, donde Esdras había leído la Ley a todo el pueblo (8:1–3). Aquí esperan mientras el segundo coro da la vuelta.',
    },
    who: 'El primer coro',
  },
  {
    title: { nbla: 'El segundo coro va hacia la izquierda', nvi: 'El segundo coro va en dirección opuesta', default: 'El segundo coro va del lado opuesto' },
    quote: {
      nbla: '«El segundo coro marchaba hacia la izquierda, y yo iba tras ellos con la mitad del pueblo por encima de la muralla, pasando por la torre de los Hornos, hasta la muralla Ancha…»',
      nvi: '«El segundo coro marchaba en dirección opuesta, a lo largo de la torre de los Hornos hasta el muro Ancho. Yo iba detrás, sobre la muralla, junto con la otra mitad de la gente».',
      rvr1960: '«El segundo coro iba del lado opuesto, y yo en pos de él, con la mitad del pueblo sobre el muro, desde la torre de los Hornos hasta el muro ancho…»',
      rva: '«Y el segundo coro iba del lado opuesto, y yo en pos de él, con la mitad del pueblo sobre el muro, desde la torre de los Hornos hasta el muro ancho…»',
    },
    note: 'Nehemías mismo camina detrás de este coro. Su recorrido es la muralla del capítulo 3 al revés: las mismas torres y puertas, nombradas en el orden contrario. Listas como estas son una de las principales maneras de trazar el curso de la muralla.',
    who: { nvi: 'El segundo coro · Nehemías y la mitad de la gente', default: 'El segundo coro · Nehemías y la mitad del pueblo' },
  },
  {
    title: {
      nvi: 'Las puertas de Efraín, de Jesaná y de los Pescados',
      rva: 'La puerta de Ephraim, la puerta vieja y la del Pescado',
      default: 'La puerta de Efraín, la puerta Vieja y la del Pescado',
    },
    quote: {
      nbla: '«…y por la puerta de Efraín, junto a la puerta Vieja, junto a la puerta del Pescado…»',
      nvi: '«Pasamos por encima de la puerta de Efraín, la de Jesaná y la de los Pescados…»',
      rvr1960: '«…y desde la puerta de Efraín hasta la puerta Vieja y a la puerta del Pescado…»',
      rva: '«Y desde la puerta de Ephraim hasta la puerta vieja, y á la puerta del Pescado…»',
    },
    note: {
      nbla: 'La puerta de Efraín no está en las reparaciones del capítulo 3, pero tenía una plaza donde la gente hizo enramadas para la fiesta (8:16). Daba al camino del norte, hacia la región montañosa de Efraín. Se sitúa aquí, entre la muralla Ancha y la puerta Vieja, por el orden de este versículo.',
      nvi: 'La puerta de Efraín no está en las reparaciones del capítulo 3, pero tenía una plaza donde la gente hizo enramadas para la fiesta (8:16). Daba al camino del norte, hacia la región montañosa de Efraín. Se sitúa aquí, entre el muro Ancho y la puerta de Jesaná, por el orden de este versículo.',
      rva: 'La puerta de Ephraim no está en las reparaciones del capítulo 3, pero tenía una plaza donde la gente hizo enramadas para la fiesta (8:16). Daba al camino del norte, hacia la región montañosa de Efraín. Se sitúa aquí, entre el muro ancho y la puerta vieja, por el orden de este versículo.',
      default: 'La puerta de Efraín no está en las reparaciones del capítulo 3, pero tenía una plaza donde la gente hizo enramadas para la fiesta (8:16). Daba al camino del norte, hacia la región montañosa de Efraín. Se sitúa aquí, entre el muro ancho y la puerta Vieja, por el orden de este versículo.',
    },
    who: { nvi: 'El segundo coro · Nehemías y la mitad de la gente', default: 'El segundo coro · Nehemías y la mitad del pueblo' },
  },
  {
    title: {
      rvr1960: 'Hasta la puerta de las Ovejas y la puerta de la Cárcel', rva: 'Hasta la puerta de las Ovejas y la puerta de la Cárcel',
      default: 'Hasta la puerta de las Ovejas y la puerta de la Guardia',
    },
    quote: {
      nbla: '«…y la torre de Hananeel, y la torre de los Cien hasta la puerta de las Ovejas, y se detuvieron en la puerta de la Guardia».',
      nvi: '«…por la torre de Jananel y la de los Cien, y por la puerta de las Ovejas, hasta llegar a la puerta de la Guardia. Allí nos detuvimos».',
      rvr1960: '«…y la torre de Hananeel, y la torre de Hamea, hasta la puerta de las Ovejas; y se detuvieron en la puerta de la Cárcel».',
      rva: '«…y la torre de Hananeel, y la torre de Hamath, hasta la puerta de las Ovejas: y pararon en la puerta de la Cárcel».',
    },
    note: {
      rvr1960: 'La puerta de las Ovejas es donde empezó la reconstrucción (3:1), así que el segundo coro termina donde comenzó la obra. La puerta de la Cárcel no se menciona en ningún otro lugar y no se sabe dónde estaba. Aquí se muestra como la puerta norte del atrio del templo.',
      rva: 'La puerta de las Ovejas es donde empezó la reconstrucción (3:1), así que el segundo coro termina donde comenzó la obra. La puerta de la Cárcel no se menciona en ningún otro lugar y no se sabe dónde estaba. Aquí se muestra como la puerta norte del atrio del templo.',
      default: 'La puerta de las Ovejas es donde empezó la reconstrucción (3:1), así que el segundo coro termina donde comenzó la obra. La puerta de la Guardia no se menciona en ningún otro lugar y no se sabe dónde estaba. Aquí se muestra como la puerta norte del atrio del templo.',
    },
    who: { nvi: 'El segundo coro · Nehemías y la mitad de la gente', default: 'El segundo coro · Nehemías y la mitad del pueblo' },
  },
  {
    title: { nvi: 'En el Templo de Dios', default: 'En la casa de Dios' },
    quote: {
      nbla: '«Luego los dos coros tomaron su lugar en la casa de Dios… Los cantores cantaban, con su director Izrahías».',
      nvi: '«Los dos coros ocuparon sus sitios en el Templo de Dios… Enseguida los cantores empezaron a cantar a toda voz, dirigidos por Izraías».',
      rvr1960: '«Llegaron luego los dos coros a la casa de Dios… Y los cantores cantaban en alta voz, e Izrahías era el director».',
      rva: '«Pararon luego los dos coros en la casa de Dios… Y los cantores cantaban alto, é Israhía era el prefecto».',
    },
    note: {
      rva: 'Los dos coros bajan de la muralla y se encuentran en el atrio del templo, uno desde el sur y otro desde el norte, con Nehemías, la mitad de los magistrados y los sacerdotes con trompetas. Es el templo reconstruido bajo Zorobabel y terminado en el 516 a. C. (Esd 6:15).',
      default: 'Los dos coros bajan de la muralla y se encuentran en el atrio del templo, uno desde el sur y otro desde el norte, con Nehemías, la mitad de los oficiales y los sacerdotes con trompetas. Es el templo reconstruido bajo Zorobabel y terminado en el 516 a. C. (Esd 6:15).',
    },
    who: {
      nvi: 'Los dos coros · Nehemías y la mitad de los oficiales · sacerdotes con trompetas · Izraías',
      rva: 'Los dos coros · Nehemías y la mitad de los magistrados · sacerdotes con trompetas · Israhía',
      default: 'Los dos coros · Nehemías y la mitad de los oficiales · sacerdotes con trompetas · Izrahías',
    },
  },
  {
    title: { nvi: 'Muchos sacrificios', rvr1960: 'Numerosas víctimas', rva: 'Grandes víctimas', default: 'Gran cantidad de sacrificios' },
    quote: {
      nbla: '«Aquel día ofrecieron gran cantidad de sacrificios y se regocijaron porque Dios les había dado mucha alegría, también las mujeres y los niños se regocijaron».',
      nvi: '«Ese día se ofrecieron muchos sacrificios y hubo fiesta, porque Dios los llenó de alegría. Hasta las mujeres y los niños participaron».',
      rvr1960: '«Y sacrificaron aquel día numerosas víctimas, y se regocijaron, porque Dios los había recreado con grande contentamiento; se alegraron también las mujeres y los niños…»',
      rva: '«Y sacrificaron aquel día grandes víctimas, é hicieron alegrías; porque Dios los había recreado con grande contentamiento: alegráronse también la mujeres y muchachos…»',
    },
    note: 'No solo los sacerdotes, los levitas y los jefes: también las mujeres y los niños se alegran. El humo de las ofrendas sube del altar delante del templo.',
    who: { rva: 'Todo el pueblo, también las mujeres y los muchachos', default: 'Todo el pueblo, también las mujeres y los niños' },
  },
];
