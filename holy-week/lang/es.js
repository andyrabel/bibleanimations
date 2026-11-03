// Spanish text for "Holy Week in Jerusalem", merged over data.js (see addLanguage in ../../i18n.js).
// Same shape as data.js, text fields only. Version keys are the Spanish versions
// (nbla, nvi, rvr1960, rva); `default` covers the ones not listed. STOPS line up
// with data.js by position.
//
// Quotations are verbatim, in «…», with speech inside them in “…”. The RVA keeps
// its 1909 spelling ("á", "Jerusalem", "Bethania", "fué").

export const TERMS = {
  temple: { nvi: 'Templo', default: 'templo' },
  council: { nvi: 'Consejo', default: 'concilio' },
};

export const DAYS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'El sábado', 'El primer día de la semana'];

export const LABELS = {
  olives: { name: 'Monte de los Olivos' },
  kidron: { name: { rva: 'Torrente de Cedrón', default: 'Valle del Cedrón' } },
  upperCity: { name: 'Ciudad Alta' },
  lowerCity: { name: 'Ciudad Baja' },
  bethphage: { name: { rva: 'Bethphagé', default: 'Betfagé' } },
  bethany: { name: { rva: 'Bethania', default: 'Betania' } },
  temple: { name: 'El templo' },
  royalStoa: { name: 'Pórtico Real' },
  courtWomen: { name: 'Atrio de las Mujeres' },
  portico: { name: 'Pórtico de Salomón' },
  antonia: { name: 'Fortaleza Antonia' },
  herodsPalace: { name: 'Palacio de Herodes' },
  pavement: { name: { nvi: 'El Empedrado', default: 'El Enlosado' } },
  golgotha: { name: 'Gólgota' },
  tomb: { name: 'El sepulcro' },
  upperRoom: { name: { rva: 'El cenáculo', default: 'El aposento alto' } },
  caiaphas: { name: 'Casa del sumo sacerdote' },
  siloam: { name: 'Estanque de Siloé' },
  bethesda: { name: 'Estanque de Betesda' },
  gethsemane: { name: { rva: 'Gethsemaní', default: 'Getsemaní' } },
  figTree: { name: 'La higuera' },
  jesus: { name: 'Jesús' },
  peter: { name: 'Pedro' },
  john: { name: 'Juan' },
  judas: { name: 'Judas' },
  colt: { name: { nvi: 'El burrito', default: 'El pollino' } },
  questioners: { name: 'Fariseos y herodianos' },
  widow: { name: 'La viuda' },
  anointer: { name: 'La mujer' },
  jarMan: { name: 'El hombre del cántaro' },
  caiaphasP: { name: 'El sumo sacerdote' },
  girl: { name: 'Una criada' },
  pilate: { name: 'Pilato' },
  barabbas: { name: 'Barrabás' },
  simonC: { name: 'Simón de Cirene' },
  centurion: { name: 'El centurión' },
  women: { name: 'Las mujeres' },
  joseph: { name: { rva: 'José de Arimathea', default: 'José de Arimatea' } },
  nicodemus: { name: 'Nicodemo' },
  guard: { name: 'La guardia' },
  youngMan: { name: { rva: 'Un mancebo de blanco', default: 'Un joven vestido de blanco' } },
};

export const INTRO = {
  title: 'La Semana Santa en Jerusalén',
  ref: 'Marcos 10:33–34',
  quote: {
    nbla: '«Ahora subimos a Jerusalén, y el Hijo del Hombre será entregado a los principales sacerdotes y a los escribas, y lo condenarán a muerte… y tres días después resucitará».',
    nvi: '«Ahora vamos subiendo a Jerusalén y el Hijo del hombre será entregado a los jefes de los sacerdotes y a los maestros de la Ley. Ellos lo condenarán a muerte… Pero al tercer día resucitará».',
    rvr1960: '«He aquí subimos a Jerusalén, y el Hijo del Hombre será entregado a los principales sacerdotes y a los escribas, y le condenarán a muerte… mas al tercer día resucitará».',
    rva: '«He aquí subimos á Jerusalem, y el Hijo del hombre será entregado á los principes de los sacerdotes, y á los escribas, y le condenarán á muerte… mas al tercer día resucitará».',
  },
  note: 'En el camino desde Jericó, Jesús dijo a los doce lo que iba a suceder en Jerusalén. Este recorrido sigue su última semana allí, día a día en el orden de Marcos, desde el domingo en que entró en la ciudad hasta el primer día de la semana siguiente, con los otros evangelios donde añaden algo. Es la Pascua, y la ciudad está llena de peregrinos.',
  aside: 'Jerusalén se muestra como era hacia el año 30 d. C.: el templo de Herodes sobre su gran explanada, la Antonia, el palacio de Herodes y las murallas primera y segunda. Muchos lugares son inciertos, como el aposento alto, la casa del sumo sacerdote, el pretorio y el Gólgota; las notas dicen qué tradición se sigue. La crucifixión solo se muestra de lejos.',
};

export const FINALE = {
  title: 'Ha resucitado',
  ref: '1 Corintios 15:3–4',
  quote: {
    nbla: '«…que Cristo murió por nuestros pecados, conforme a las Escrituras; que fue sepultado y que resucitó al tercer día, conforme a las Escrituras».',
    nvi: '«…que Cristo murió por nuestros pecados según las Escrituras, que fue sepultado, que resucitó al tercer día según las Escrituras».',
    rvr1960: '«…Que Cristo murió por nuestros pecados, conforme a las Escrituras; y que fue sepultado, y que resucitó al tercer día, conforme a las Escrituras».',
    rva: '«…Que Cristo fué muerto por nuestros pecados conforme á las Escrituras; Y que fué sepultado, y que resucitó al tercer día, conforme á las Escrituras».',
  },
  note: 'El joven dijo a las mujeres que fueran a decir a los discípulos y a Pedro que Jesús iba delante de ellos a Galilea, donde lo verían (Marcos 16:7). Los otros evangelios y Hechos cuentan cómo se apareció a las mujeres, a Pedro, a los dos del camino de Emaús, a los once y a más de quinientos a la vez (1 Corintios 15:5–8).',
};

export const STOPS = [
  {
    title: { nvi: 'El burrito', default: 'El pollino' }, ref: 'Marcos 11:2', when: 'Domingo por la mañana',
    quote: {
      nbla: '«Vayan a la aldea enfrente de ustedes, y tan pronto como entren en ella, encontrarán un pollino atado en el cual nadie se ha montado todavía; desátenlo y tráiganlo».',
      nvi: '«Vayan a la aldea que tienen enfrente. Tan pronto como entren en ella, encontrarán atado un burrito, en el que nunca se ha montado nadie. Desátenlo y tráiganlo acá».',
      rvr1960: '«Id a la aldea que está enfrente de vosotros, y luego que entréis en ella, hallaréis un pollino atado, en el cual ningún hombre ha montado; desatadlo y traedlo».',
      rva: '«Id al lugar que está delante de vosotros, y luego entrados en él, hallaréis un pollino atado, sobre el cual ningún hombre ha subido; desatadlo y traedlo».',
    },
    note: 'Subiendo por el camino de Jericó llegan a Betfagé y Betania, junto al monte de los Olivos (11:1). Dos discípulos encuentran el animal atado a una puerta, fuera, en la calle, y lo traen; echan sobre él sus mantos y Jesús se sienta encima (11:4–7). Mateo 21:5 y Juan 12:15 ven en esto Zacarías 9:9: tu rey viene a ti montado en un asno. Marcos no dice quiénes eran los dos discípulos.',
    where: 'Betfagé, en el monte de los Olivos',
  },
  {
    title: '¡Hosanna!', ref: 'Marcos 11:8–9', when: 'Domingo',
    quote: {
      nbla: '«Muchos tendieron sus mantos en el camino, y otros tendieron ramas que habían cortado de los campos. Los que iban delante y los que lo seguían, gritaban: “¡Hosanna! Bendito el que viene en el nombre del Señor”».',
      nvi: '«Muchos tendieron sus mantos sobre el camino; otros usaron ramas que habían cortado en los campos. Tanto los que iban delante como los que iban detrás gritaban: —¡Hosanna! —¡Bendito el que viene en el nombre del Señor!».',
      rvr1960: '«También muchos tendían sus mantos por el camino, y otros cortaban ramas de los árboles, y las tendían por el camino. Y los que iban delante y los que venían detrás daban voces, diciendo: ¡Hosanna! ¡Bendito el que viene en el nombre del Señor!».',
      rva: '«Y muchos tendían sus vestidos por el camino, y otros cortaban hojas de los árboles, y las tendían por el camino. Y los que iban delante, y los que iban detrás, daban voces diciendo: ¡Hosanna! Bendito el que viene en el nombre del Señor».',
    },
    note: 'El camino cruza la loma del monte de los Olivos y baja hacia la ciudad. La multitud que va delante y la que sigue tiende mantos y ramas cortadas en el camino; Juan dice que tomaron ramas de palmera y salieron de la ciudad a recibirlo (Juan 12:12–13). «Hosanna» es una palabra hebrea que significa «salva, te ruego», del Salmo 118:25–26, que se cantaba en las fiestas.',
    where: 'El camino sobre el monte de los Olivos',
  },
  {
    title: 'Lloró sobre la ciudad', ref: 'Lucas 19:41–42', when: 'Domingo',
    quote: {
      nbla: '«Cuando Jesús se acercó, al ver la ciudad, lloró sobre ella, diciendo: “¡Si tú también hubieras sabido en este día lo que conduce a la paz! Pero ahora está oculto a tus ojos”».',
      nvi: '«Cuando se acercaba a Jerusalén, Jesús vio la ciudad y lloró por ella. Dijo: —¡Cómo quisiera que hoy supieras lo que te puede traer paz! Pero eso ahora está oculto a tus ojos».',
      rvr1960: '«Y cuando llegó cerca de la ciudad, al verla, lloró sobre ella, diciendo: ¡Oh, si también tú conocieses, a lo menos en este tu día, lo que es para tu paz! Mas ahora está encubierto de tus ojos».',
      rva: '«Y como llegó cerca viendo la ciudad, lloró sobre ella, Diciendo: ¡Oh si también tú conocieses, á lo menos en este tu día, lo que toca á tu paz! mas ahora está encubierto de tus ojos».',
    },
    note: 'Al pasar la cima aparece toda la ciudad al otro lado del Cedrón, con el templo resplandeciendo delante. Solo Lucas cuenta que Jesús lloró aquí y anunció el asedio: no dejarán en ti piedra sobre piedra (19:43–44). Los romanos destruyeron la ciudad y el templo cuarenta años después, en el año 70.',
    where: 'La ladera occidental del monte de los Olivos',
  },
  {
    title: 'En el templo', ref: 'Marcos 11:11', when: 'Domingo por la tarde',
    quote: {
      nbla: '«Jesús entró en Jerusalén, fue al templo, y después de mirar todo alrededor, salió para Betania con los doce discípulos, siendo ya avanzada la hora».',
      nvi: '«Jesús entró en Jerusalén y fue al Templo. Después de observarlo todo, como ya era tarde, salió para Betania con los doce».',
      rvr1960: '«Y entró Jesús en Jerusalén, y en el templo; y habiendo mirado alrededor todas las cosas, como ya anochecía, se fue a Betania con los doce».',
      rva: '«Y entró Jesús en Jerusalem, y en el templo: y habiendo mirado alrededor todas las cosas, y siendo ya tarde, salióse á Bethania con los doce».',
    },
    note: 'Baja, cruza el Cedrón y sube a la ciudad: aquí entra por la puerta oriental del atrio del templo (la puerta de Susa de la Misná), aunque el texto no dice por qué puerta. El gran atrio, abierto a todos, rodeaba los atrios interiores sobre la explanada que Herodes había construido. En Marcos solo mira alrededor y vuelve a Betania; en Mateo y Lucas purifica el templo ese mismo día.',
    where: 'El atrio de los gentiles',
  },
  {
    title: 'La higuera', ref: 'Marcos 11:13', when: 'Lunes por la mañana',
    quote: {
      nbla: '«Y viendo de lejos una higuera con hojas, fue a ver si quizá pudiera hallar algo en ella; cuando llegó a ella, no encontró más que hojas, porque no era tiempo de higos».',
      nvi: '«Viendo a lo lejos una higuera que tenía hojas, fue a ver si hallaba algún fruto. Cuando llegó a ella solo encontró hojas, porque no era tiempo de higos».',
      rvr1960: '«Y viendo de lejos una higuera que tenía hojas, fue a ver si tal vez hallaba en ella algo; pero cuando llegó a ella, nada halló sino hojas, pues no era tiempo de higos».',
      rva: '«Y viendo de lejos una higuera que tenía hojas, se acercó, si quizá hallaría en ella algo: y como vino á ella, nada halló sino hojas; porque no era tiempo de higos».',
    },
    note: 'De vuelta de Betania tiene hambre. Dice al árbol: «Nunca jamás coma nadie fruto de ti», y los discípulos lo oyen (11:14); a la mañana siguiente lo encuentran seco desde las raíces (11:20–21). Marcos pone la purificación del templo entre los dos momentos, como si uno explicara el otro. No se dice dónde estaba el árbol.',
    where: 'El camino desde Betania',
  },
  {
    title: 'Las mesas volcadas', ref: 'Marcos 11:15–17', when: 'Lunes',
    quote: {
      nbla: '«…volcó las mesas de los que cambiaban el dinero y los asientos de los que vendían las palomas… “¿No está escrito: ‘Mi casa será llamada casa de oración para todas las naciones’? Pero ustedes la han hecho cueva de ladrones”».',
      nvi: '«Volcó las mesas de los que cambiaban dinero y los puestos de los que vendían palomas… “¿No está escrito: ‘Mi casa será llamada casa de oración para todos los pueblos’? Pero ustedes la han convertido en ‘cueva de ladrones’”».',
      rvr1960: '«…y volcó las mesas de los cambistas, y las sillas de los que vendían palomas… ¿No está escrito: Mi casa será llamada casa de oración para todas las naciones? Mas vosotros la habéis hecho cueva de ladrones».',
      rva: '«…y trastornó las mesas de los cambistas, y las sillas de los que vendían palomas… ¿No está escrito que mi casa, casa de oración será llamada por todas las gentes? Mas vosotros la habéis hecho cueva de ladrones».',
    },
    note: 'Los peregrinos cambiaban su dinero por la moneda del templo para el impuesto del medio siclo y compraban palomas y otros animales para los sacrificios. Aquí el mercado está en el Pórtico Real, en el lado sur del atrio, donde muchos lo sitúan. Cita Isaías 56:7 y Jeremías 7:11. Los principales sacerdotes y los escribas empiezan a buscar cómo destruirlo (11:18).',
    where: 'El Pórtico Real',
  },
  {
    title: 'La moneda del César', ref: 'Marcos 12:16–17', when: 'Martes',
    quote: {
      nbla: '«“¿De quién es esta imagen y la inscripción?”. “De César”, le contestaron. Entonces Jesús les dijo: “Den a César lo que es de César, y a Dios lo que es de Dios”».',
      nvi: '«—¿De quién es esta imagen y esta inscripción? —Del césar —contestaron. Y Jesús les dijo: —Denle, pues, al césar lo que es del césar y a Dios lo que es de Dios».',
      rvr1960: '«¿De quién es esta imagen y la inscripción? Ellos le dijeron: De César. Respondiendo Jesús, les dijo: Dad a César lo que es de César, y a Dios lo que es de Dios».',
      rva: '«¿Cúya es esta imagen y esta inscripción? Y ellos le dijeron: De César. Y respondiendo Jesús, les dijo: Dad lo que es de César á César; y lo que es de Dios, á Dios».',
    },
    note: 'El martes, andando por el templo, le preguntan una y otra vez: los principales sacerdotes, los escribas y los ancianos sobre su autoridad, los fariseos y los herodianos sobre el tributo, los saduceos sobre la resurrección y un escriba sobre el mandamiento principal (11:27–12:34). El denario llevaba la cabeza del emperador Tiberio. No se dice en qué parte de los atrios fue; aquí es en el pórtico de Salomón, donde Juan sitúa su enseñanza (Juan 10:23).',
    where: 'El pórtico de Salomón (una conjetura)',
  },
  {
    title: 'Las dos monedas de la viuda', ref: 'Marcos 12:42–43', when: 'Martes',
    quote: {
      nbla: '«Llegó una viuda pobre y echó dos pequeñas monedas de cobre, o sea, un cuadrante. Y llamando Jesús a Sus discípulos, les dijo: “En verdad les digo, que esta viuda pobre echó más que todos los contribuyentes al tesoro”».',
      nvi: '«Pero una viuda pobre llegó y echó dos moneditas de muy poco valor. Jesús llamó a sus discípulos y dijo: “Les aseguro que esta viuda pobre ha echado en el tesoro más que todos los demás”».',
      rvr1960: '«Y vino una viuda pobre, y echó dos blancas, o sea un cuadrante. Entonces llamando a sus discípulos, les dijo: De cierto os digo que esta viuda pobre echó más que todos los que han echado en el arca».',
      rva: '«Y como vino una viuda pobre, echó dos blancas, que son un maravedí. Entonces llamando á sus discípulos, les dice: De cierto os digo que esta viuda pobre echó más que todos los que han echado en el arca».',
    },
    note: 'Se sienta frente al arca de las ofrendas y mira cómo los ricos echan mucho (12:41). La Misná describe trece cofres en el templo, en forma de cuerno de carnero, para las ofrendas; aquí están alrededor del atrio de las mujeres, hasta donde podía llegar una mujer, que es donde suelen situarse. El leptón era la moneda más pequeña que había. «Ella, de su pobreza, echó todo lo que tenía» (12:44).',
    where: 'El atrio de las mujeres',
  },
  {
    title: 'No quedará piedra sobre piedra', ref: 'Marcos 13:1–2', when: 'Martes por la tarde',
    quote: {
      nbla: '«…uno de Sus discípulos le dijo: “Maestro, ¡mira qué piedras y qué edificios!”. Y Jesús le dijo: “¿Ves estos grandes edificios? No quedará piedra sobre piedra que no sea derribada”».',
      nvi: '«…dijo uno de sus discípulos: —¡Mira, Maestro! ¡Qué piedras! ¡Qué edificios! —¿Ves todos estos grandiosos edificios? —contestó Jesús—. No quedará piedra sobre piedra, pues todo será derribado».',
      rvr1960: '«…le dijo uno de sus discípulos: Maestro, mira qué piedras, y qué edificios. Jesús, respondiendo, le dijo: ¿Ves estos grandes edificios? No quedará piedra sobre piedra, que no sea derribada».',
      rva: '«…le dice uno de sus discípulos: Maestro, mira qué piedras, y qué edificios. Y Jesús respondiendo, le dijo: ¿Ves estos grandes edificios? no quedará piedra sobre piedra que no sea derribada».',
    },
    note: 'Algunas piedras de Herodes miden más de diez metros, y las obras del templo aún seguían. Sentado en el monte de los Olivos frente al templo, Pedro, Jacobo, Juan y Andrés le preguntan en privado cuándo será esto (13:3–4), y él habla de lo que ha de venir, y termina: «Velad» (13:37). En el año 70 los romanos incendiaron el templo y derribaron sus edificios.',
    where: 'El monte de los Olivos, frente al templo',
  },
  {
    title: 'Ungido en Betania', ref: 'Marcos 14:3', when: 'Miércoles por la noche',
    quote: {
      nbla: '«Estando Él en Betania, sentado a la mesa en casa de Simón el leproso, vino una mujer con un frasco de alabastro de perfume muy costoso de nardo puro; y rompió el frasco y lo derramó sobre la cabeza de Jesús».',
      nvi: '«En Betania, mientras estaba él sentado a la mesa en casa de Simón, el que había tenido una enfermedad en la piel, llegó una mujer con un frasco de alabastro lleno de un perfume muy costoso, hecho de nardo puro. Rompió el frasco y derramó el perfume sobre la cabeza de Jesús».',
      rvr1960: '«Pero estando él en Betania, en casa de Simón el leproso, y sentado a la mesa, vino una mujer con un vaso de alabastro de perfume de nardo puro de mucho precio; y quebrando el vaso de alabastro, se lo derramó sobre su cabeza».',
      rva: '«Y estando él en Bethania en casa de Simón el leproso, y sentado á la mesa, vino una mujer teniendo un alabastro de ungüento de nardo espique de mucho precio; y quebrando el alabastro, derramóselo sobre su cabeza».',
    },
    note: 'Algunos dijeron que el perfume podía haberse vendido por más del salario de un año y dado a los pobres; Jesús dijo que ella se había anticipado a ungir su cuerpo para la sepultura (14:4–8). Luego Judas Iscariote fue a los principales sacerdotes, que le prometieron dinero (14:10–11). Marcos sitúa esto dos días antes de la Pascua (14:1), por eso se muestra el miércoles; Juan cuenta una unción en Betania seis días antes, por María, la hermana de Marta (Juan 12:1–3).',
    where: 'La casa de Simón el leproso, Betania',
  },
  {
    title: 'El hombre del cántaro', ref: 'Marcos 14:13–15', when: 'Jueves por la tarde',
    quote: {
      nbla: '«Vayan a la ciudad, y allí les saldrá al encuentro un hombre que lleva un cántaro de agua; síganlo… Y él les mostrará un gran aposento alto, amueblado y preparado; hagan los preparativos para nosotros allí».',
      nvi: '«Vayan a la ciudad y les saldrá al encuentro un hombre que lleva un cántaro de agua. Síganlo… Él les mostrará en la planta alta una sala amplia, amueblada y arreglada. Preparen allí nuestra cena».',
      rvr1960: '«Id a la ciudad, y os saldrá al encuentro un hombre que lleva un cántaro de agua; seguidle… Y él os mostrará un gran aposento alto ya dispuesto; preparad para nosotros allí».',
      rva: '«Id á la ciudad, y os encontrará un hombre que lleva un cántaro de agua; seguidle… Y él os mostrará un gran cenáculo ya preparado: aderezad para nosotros allí».',
    },
    note: 'Es el primer día de los panes sin levadura, cuando se sacrificaban los corderos de la Pascua (14:12). Lucas dice que los dos eran Pedro y Juan (Lucas 22:8). Un hombre cargando agua llamaría la atención, porque solía ser trabajo de mujeres. La casa se sitúa en el monte Sion, donde la tradición pone el aposento alto; el texto no dice dónde estaba, y aquí él viene subiendo desde el estanque de Siloé.',
    where: 'Del estanque de Siloé al monte Sion',
  },
  {
    title: 'La última cena', ref: 'Marcos 14:22–24', when: 'Jueves por la noche',
    quote: {
      nbla: '«Mientras comían, tomó pan, y habiéndolo bendecido lo partió, se lo dio a ellos, y dijo: “Tomen, esto es Mi cuerpo”. Y tomando una copa, después de dar gracias, se la dio a ellos… “Esto es Mi sangre del nuevo pacto, que es derramada por muchos”».',
      nvi: '«Mientras comían, Jesús tomó pan y lo bendijo. Luego lo partió y se lo dio a ellos, diciéndoles: —Tomen; esto es mi cuerpo. Después tomó una copa, dio gracias, se la pasó a ellos… —Esto es mi sangre del pacto que es derramada por muchos».',
      rvr1960: '«Y mientras comían, Jesús tomó pan y bendijo, y lo partió y les dio, diciendo: Tomad, esto es mi cuerpo. Y tomando la copa, y habiendo dado gracias, les dio… Esto es mi sangre del nuevo pacto, que por muchos es derramada».',
      rva: '«Y estando ellos comiendo, tomó Jesús pan, y bendiciendo, partió y les dió, y dijo: Tomad, esto es mi cuerpo. Y tomando el vaso, habiendo hecho gracias, les dió… Esto es mi sangre del nuevo pacto, que por muchos es derramada».',
    },
    note: 'Están recostados a la mesa, como en la cena de Pascua (14:18). Dice que uno de ellos lo entregará, uno que moja el pan con él en el plato (14:18–20). Juan cuenta cómo les lavó los pies (Juan 13:1–15) y cómo Judas tomó el bocado y salió: «y era de noche» (Juan 13:30). En Marcos la cena es la Pascua; Juan parece situar la Pascua el viernes por la tarde (Juan 18:28; 19:14), y aún se discute cómo encajan los dos.',
    where: 'El aposento alto',
  },
  {
    title: { rva: 'Gethsemaní', default: 'Getsemaní' }, ref: 'Marcos 14:35–36', when: 'Jueves por la noche',
    quote: {
      nbla: '«Adelantándose un poco, se postró en tierra y oraba que si fuera posible, pasara de Él aquella hora. Y decía: “¡Abba, Padre! Para Ti todas las cosas son posibles; aparta de Mí esta copa, pero no sea lo que Yo quiero, sino lo que Tú quieras”».',
      nvi: '«Yendo un poco más allá, se postró en tierra y empezó a orar que, de ser posible, no tuviera él que pasar por aquella hora. Decía: “Abba, Padre, todo es posible para ti. No me hagas beber este trago amargo; pero no sea lo que yo quiero, sino lo que quieres tú”».',
      rvr1960: '«Yéndose un poco adelante, se postró en tierra, y oró que si fuese posible, pasase de él aquella hora. Y decía: Abba, Padre, todas las cosas son posibles para ti; aparta de mí esta copa; mas no lo que yo quiero, sino lo que tú».',
      rva: '«Y yéndose un poco adelante, se postró en tierra, y oró que si fuese posible, pasase de él aquella hora, Y decía: Abba, Padre, todas las cosas son á ti posibles: traspasa de mí este vaso; empero no lo que yo quiero, sino lo que tú».',
    },
    note: 'Después de cantar el himno salen al monte de los Olivos (14:26), al otro lado del Cedrón, a un huerto (Juan 18:1). El camino es una conjetura: bajando del monte Sion junto a Siloé y subiendo por el valle a la luz de la luna; la Pascua caía en luna llena. Lleva consigo a Pedro, Jacobo y Juan, les pide que velen y sigue solo; tres veces vuelve y los encuentra dormidos (14:33–41). Getsemaní significa «prensa de aceite».',
    where: 'Getsemaní, al otro lado del Cedrón',
  },
  {
    title: 'El arresto', ref: 'Marcos 14:45–46, 50', when: 'Viernes, de noche',
    quote: {
      nbla: '«Cuando llegó Judas, inmediatamente se acercó a Jesús y le dijo: “¡Rabí!”. Y lo besó. Entonces ellos echaron mano a Jesús y lo prendieron… Y abandonando a Jesús, todos huyeron».',
      nvi: '«Tan pronto como llegó, Judas se acercó a Jesús y dijo: —¡Rabí! Y lo besó. Entonces los hombres prendieron a Jesús… Entonces todos lo abandonaron y huyeron».',
      rvr1960: '«Y cuando vino, se acercó luego a él, y le dijo: Maestro, Maestro. Y le besó. Entonces ellos le echaron mano, y le prendieron… Entonces todos los discípulos, dejándole, huyeron».',
      rva: '«Y como vino, se acercó luego á él, y le dice: Maestro, Maestro. Y le besó. Entonces ellos echaron en él sus manos, y le prendieron… Entonces dejándole todos sus discípulos, huyeron».',
    },
    note: 'Judas llega con una multitud con espadas y palos, de parte de los principales sacerdotes, los escribas y los ancianos (14:43); Juan añade una compañía de soldados y alguaciles con linternas, antorchas y armas (Juan 18:3). Uno de los presentes saca la espada y corta la oreja al siervo del sumo sacerdote (14:47); Lucas dice que Jesús lo sanó (Lucas 22:51).',
    where: 'Getsemaní',
  },
  {
    title: 'Pedro lo niega', ref: 'Marcos 14:67–68', when: 'Viernes, antes del amanecer',
    quote: {
      nbla: '«…y al ver a Pedro calentándose, lo miró y dijo: “Tú también estabas con Jesús el Nazareno”. Pero él lo negó, diciendo: “Ni sé, ni entiendo de qué hablas”».',
      nvi: '«Cuando vio a Pedro calentándose, se fijó en él. —Tú también estabas con ese Nazareno, con Jesús —le dijo ella. Pero él lo negó: —No lo conozco. Ni siquiera sé de qué estás hablando».',
      rvr1960: '«…y cuando vio a Pedro que se calentaba, mirándole, dijo: Tú también estabas con Jesús el nazareno. Mas él negó, diciendo: No le conozco, ni sé lo que dices».',
      rva: '«Y como vió á Pedro que se calentaba, mirándole, dice: Y tú con Jesús el Nazareno estabas. Mas él negó, diciendo: No conozco, ni sé lo que dices».',
    },
    note: 'Llevan a Jesús ante el sumo sacerdote, Caifás (Mateo 26:57), donde los principales sacerdotes y todo el {council} buscan testimonio contra él; cuando le preguntan si es el Cristo, dice: «Yo soy» (14:53–64). Pedro lo sigue de lejos hasta el patio y se sienta con los guardias junto al fuego (14:54). Niega a Jesús tres veces, el gallo canta por segunda vez y él llora (14:66–72). La casa se sitúa en el lugar tradicional, en el monte Sion.',
    where: 'El patio del sumo sacerdote',
  },
  {
    title: 'Ante Pilato', ref: 'Marcos 15:14–15', when: 'Viernes por la mañana',
    quote: {
      nbla: '«Y Pilato les decía: “¿Por qué? ¿Qué mal ha hecho?”. Y ellos gritaban aún más: “¡Crucifícalo!”. Pilato, queriendo complacer a la multitud, les soltó a Barrabás; y después de hacer azotar a Jesús, lo entregó para que fuera crucificado».',
      nvi: '«Pilato les preguntó: —¿Por qué? ¿Qué crimen ha cometido? Pero ellos gritaban aún más fuerte: —¡Crucifícalo! Como quería satisfacer a la multitud, Pilato soltó a Barrabás; a Jesús lo mandó azotar y lo entregó para que lo crucificaran».',
      rvr1960: '«Pilato les decía: ¿Pues qué mal ha hecho? Pero ellos gritaban aún más: ¡Crucifícale! Y Pilato, queriendo satisfacer al pueblo, les soltó a Barrabás, y entregó a Jesús, después de azotarle, para que fuese crucificado».',
      rva: '«Mas Pilato les decía: ¿Pues qué mal ha hecho? Y ellos daban más voces: Crucifícale. Y Pilato, queriendo satisfacer al pueblo, les soltó á Barrabás, y entregó á Jesús, después de azotarle, para que fuese crucificado».',
    },
    note: 'Muy de mañana lo atan y lo entregan a Poncio Pilato, el gobernador romano (15:1). Era costumbre soltar un preso en la fiesta; la multitud pide a Barrabás, preso por un homicidio en una revuelta (15:6–11). Lucas añade que Pilato lo envió a Herodes Antipas, que se lo devolvió (Lucas 23:7–11). El pretorio se sitúa en el palacio de Herodes, con el tribunal en el Enlosado (Juan 19:13); otros lo sitúan en la Antonia, donde empieza la Vía Dolorosa.',
    where: 'El Enlosado, ante el palacio de Herodes',
  },
  {
    title: 'Simón de Cirene', ref: 'Marcos 15:21', when: 'Viernes por la mañana',
    quote: {
      nbla: '«Y obligaron a uno que pasaba y que venía del campo, Simón de Cirene, padre de Alejandro y Rufo, a que llevara la cruz de Jesús».',
      nvi: '«A uno que pasaba por allí de vuelta del campo, un tal Simón de Cirene, padre de Alejandro y de Rufo, lo obligaron a llevar la cruz».',
      rvr1960: '«Y obligaron a uno que pasaba, Simón de Cirene, padre de Alejandro y de Rufo, que venía del campo, a que le llevase la cruz».',
      rva: '«Y cargaron á uno que pasaba, Simón Cireneo, padre de Alejandro y de Rufo, que venía del campo, para que llevase su cruz».',
    },
    note: 'Los soldados se burlan de él, lo visten de púrpura y con una corona de espinas, luego le ponen sus propios vestidos y lo sacan (15:16–20). Sale cargando su cruz (Juan 19:17); luego obligan a Simón a llevarla detrás de él (Lucas 23:26), con una gran multitud que lo sigue, entre ellas mujeres que lloran por él (Lucas 23:27). Lo que llevaba era probablemente el travesaño. Aquí salen por la puerta de Genat, lo cual es una conjetura.',
    where: 'De la ciudad al Gólgota',
  },
  {
    title: 'La cruz', ref: 'Marcos 15:33, 38–39', when: 'Viernes, de la hora sexta a la novena',
    quote: {
      nbla: '«Cuando llegó la hora sexta, hubo oscuridad sobre toda la tierra hasta la hora novena… Y el velo del templo se rasgó en dos, de arriba abajo. Viendo el centurión que estaba frente a Él, la manera en que expiró, dijo: “En verdad este hombre era Hijo de Dios”».',
      nvi: '«Desde el mediodía y hasta las tres de la tarde toda la tierra quedó en oscuridad… La cortina del santuario del Templo se rasgó en dos, de arriba a abajo. Y el centurión, que estaba frente a Jesús, al ver cómo murió, dijo: —¡Verdaderamente este hombre era el Hijo de Dios!».',
      rvr1960: '«Cuando vino la hora sexta, hubo tinieblas sobre toda la tierra hasta la hora novena… Entonces el velo del templo se rasgó en dos, de arriba abajo. Y el centurión que estaba frente a él, viendo que después de clamar había expirado así, dijo: Verdaderamente este hombre era Hijo de Dios».',
      rva: '«Y cuando vino la hora de sexta, fueron hechas tinieblas sobre toda la tierra hasta la hora de nona… Entonces el velo del templo se rasgó en dos, de alto á bajo. Y el centurión que estaba delante de él, viendo que había espirado así clamando, dijo: Verdaderamente este hombre era el Hijo de Dios».',
    },
    note: 'Lo crucifican a la hora tercera, hacia las nueve de la mañana, entre dos ladrones, y reparten sus vestidos echando suertes; sobre él está escrita la causa: «El Rey de los judíos» (15:24–27). Los que pasan y los principales sacerdotes se burlan de él (15:29–32). A la hora novena clama: «Dios mío, Dios mío, ¿por qué me has desamparado?», y muere (15:34–37). Unas mujeres miran de lejos (15:40). El Gólgota se muestra en el lugar tradicional, hoy en la iglesia del Santo Sepulcro, fuera de la muralla de entonces.',
    where: 'El Gólgota, el lugar de la Calavera',
  },
  {
    title: 'La sepultura', ref: 'Marcos 15:46', when: 'Viernes al atardecer',
    quote: {
      nbla: '«…quien compró un lienzo de lino, y bajando el cuerpo de la cruz, lo envolvió en el lienzo de lino y lo puso en un sepulcro que había sido excavado en la roca; e hizo rodar una piedra a la entrada del sepulcro».',
      nvi: '«Entonces José bajó el cuerpo, lo envolvió en una sábana de tela de lino que había comprado y lo puso en un sepulcro cavado en la roca. Luego hizo rodar una piedra a la entrada del sepulcro».',
      rvr1960: '«…el cual compró una sábana, y quitándolo, lo envolvió en la sábana, y lo puso en un sepulcro que estaba cavado en una peña, e hizo rodar una piedra a la entrada del sepulcro».',
      rva: '«El cual compró una sábana, y quitándole, le envolvió en la sábana, y le puso en un sepulcro que estaba cavado en una peña, y revolvió una piedra á la puerta del sepulcro».',
    },
    note: 'Es el día de la preparación, antes de que empiece el sábado al ponerse el sol. José de Arimatea, miembro respetado del {council}, pide el cuerpo a Pilato (15:42–45); Nicodemo trae mirra y áloe, y el sepulcro es nuevo, en un huerto junto al lugar (Juan 19:39–41). María Magdalena y María, la madre de José, ven dónde lo ponen (15:47). Los sepulcros de la época tenían puertas bajas; algunos se cerraban con una piedra redonda como esta.',
    where: 'Un sepulcro en un huerto cercano',
  },
  {
    title: 'El sábado', ref: 'Mateo 27:65–66', when: 'Sábado, día de reposo',
    quote: {
      nbla: '«Pilato les dijo: “Una guardia tienen; vayan, asegúrenlo como ustedes saben”. Y fueron y aseguraron el sepulcro; y además de poner la guardia, sellaron la piedra».',
      nvi: '«—Llévense una guardia de soldados —ordenó Pilato—, y vayan a asegurar el sepulcro lo mejor que puedan. Así que ellos fueron, cerraron el sepulcro con una piedra, lo sellaron y dejaron puesta la guardia».',
      rvr1960: '«Y Pilato les dijo: Ahí tenéis una guardia; id, aseguradlo como sabéis. Entonces ellos fueron y aseguraron el sepulcro, sellando la piedra y poniendo la guardia».',
      rva: '«Y Pilato les dijo: Tenéis una guardia: id, aseguradlo como sabéis. Y yendo ellos, aseguraron el sepulcro, sellando la piedra, con la guardia».',
    },
    note: 'Marcos no dice nada del sábado; las mujeres descansan conforme al mandamiento (Lucas 23:56). Mateo cuenta que los principales sacerdotes y los fariseos recordaron que él había dicho que resucitaría después de tres días y pidieron a Pilato que asegurara el sepulcro (27:62–64). No se dice cómo se selló la piedra; aquí es un cordón fijado con arcilla.',
    where: 'El sepulcro',
  },
  {
    title: 'No está aquí', ref: 'Marcos 16:5–6', when: 'Domingo, al salir el sol',
    quote: {
      nbla: '«Entrando en el sepulcro, vieron a un joven sentado al lado derecho, vestido con ropaje blanco; y ellas se asustaron. Pero él les dijo: “No se asusten; ustedes buscan a Jesús el Nazareno, el que fue crucificado. Ha resucitado, no está aquí”».',
      nvi: '«Al entrar en el sepulcro, vieron a un joven vestido con un manto blanco, sentado a la derecha, y se asustaron. —No se asusten —dijo—. Ustedes buscan a Jesús el Nazareno, el que fue crucificado. ¡Ha resucitado! No está aquí».',
      rvr1960: '«Y cuando entraron en el sepulcro, vieron a un joven sentado al lado derecho, cubierto de una larga ropa blanca; y se espantaron. Mas él les dijo: No os asustéis; buscáis a Jesús nazareno, el que fue crucificado; ha resucitado, no está aquí».',
      rva: '«Y entradas en el sepulcro, vieron un mancebo sentado al lado derecho, cubierto de una larga ropa blanca; y se espantaron. Más él les dice: No os asustéis: buscáis á Jesús Nazareno, el que fué crucificado; resucitado há, no está aquí».',
    },
    note: 'Pasado el sábado, María Magdalena, María la madre de Jacobo, y Salomé compraron especias para ungirlo, y vinieron muy de mañana el primer día de la semana, ya salido el sol. Se preguntaban quién les quitaría la piedra, y la encontraron ya removida (16:1–4). Mateo dice que un ángel la removió y que los guardias temblaron de miedo (Mateo 28:2–4).',
    where: 'El sepulcro vacío',
  },
];
