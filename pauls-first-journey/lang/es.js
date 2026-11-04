// Spanish text for "Paul's First Missionary Journey", merged over data.js (see
// addLanguage in ../../i18n.js). Same shape as data.js, text fields only.
// Version keys are the Spanish versions (nbla, nvi, rvr1960, rva); `default`
// covers the ones not listed. STOPS line up with data.js by position.
//
// Quotations are verbatim, including each version's own spelling (the RVA keeps
// its 1909 spelling: "á", "Papho", "Pamphylia"). Where the RVA opens a chapter in
// capitals ("Y ACONTECIO"), the quotation starts after them.

export const TERMS = {
  zeus: { nvi: 'Zeus', default: 'Júpiter' },
  hermes: { nvi: 'Hermes', default: 'Mercurio' },
  proconsul: { nvi: 'gobernador', default: 'procónsul' },
};

export const PLACES = {
  antioch: { name: 'Antioquía' },
  seleucia: { name: 'Seleucia' },
  salamis: { name: 'Salamina' },
  paphos: { name: { rva: 'Papho', default: 'Pafos' } },
  perga: { name: 'Perge' },
  antiochP: { name: 'Antioquía de Pisidia' },
  iconium: { name: 'Iconio' },
  lystra: { name: 'Listra' },
  derbe: { name: 'Derbe' },
  attalia: { name: { nvi: 'Atalía', default: 'Atalia' } },
};

export const FEATURES = {
  tarsus: { name: 'Tarso' },
  zeus: { name: 'Templo de {zeus}' },
  syria: { name: 'Siria' },
  cilicia: { name: 'Cilicia' },
  cyprus: { name: { rva: 'Cipro', default: 'Chipre' } },
  pamphylia: { name: { rva: 'Pamphylia', default: 'Panfilia' } },
  pisidia: { name: 'Pisidia' },
  lycaonia: { name: 'Licaonia' },
  galatia: { name: 'Galacia' },
  taurus: { name: 'Montes Tauro' },
  sea: { name: 'Mar Mediterráneo' },
};

export const INTRO = {
  title: 'Apartados para la obra',
  ref: 'Hechos 13:2',
  quote: {
    nbla: '«Mientras ministraban al Señor y ayunaban, el Espíritu Santo dijo: “Aparten a Bernabé y a Saulo para la obra a la que los he llamado”.»',
    nvi: '«Mientras participaban en el culto al Señor y ayunaban, el Espíritu Santo dijo: “Apártenme ahora a Bernabé y a Saulo para el trabajo al que los he llamado”.»',
    rvr1960: '«Ministrando estos al Señor, y ayunando, dijo el Espíritu Santo: Apartadme a Bernabé y a Saulo para la obra a que los he llamado.»',
    rva: '«Ministrando pues éstos al Señor, y ayunando, dijo el Espíritu Santo: Apartadme á Bernabé y á Saulo para la obra para la cual los he llamado.»',
  },
  note: 'La iglesia de Antioquía de Siria, donde a los discípulos se les llamó cristianos por primera vez (11:26), tenía profetas y maestros: Bernabé, Simón llamado Níger, Lucio de Cirene, Manaén y Saulo (13:1). Dos de ellos fueron enviados, probablemente a finales de los años 40 d. C., en un viaje de unos 2000 km por mar y a pie: a través de Chipre, por los montes Tauro hasta las tierras altas de Asia Menor, y de regreso. Lo cuentan Hechos 13–14; las cartas de Pablo añaden un poco.',
  aside: 'La tierra es real, a partir de datos de elevación modernos, con las alturas multiplicadas por tres para que se vean los montes; la costa es la de hoy. Hechos no dice por qué caminos fueron, así que las rutas por tierra siguen el paso más fácil entre los lugares nombrados, y las rutas por mar son una suposición. Las ciudades y el barco se dibujan mucho más grandes de lo que eran. No se muestran personas.',
};

export const FINALE = {
  title: 'La puerta de la fe',
  ref: 'Hechos 14:27',
  quote: {
    nbla: '«Cuando llegaron y reunieron a la iglesia, informaron de todas las cosas que Dios había hecho con ellos, y cómo había abierto a los gentiles la puerta de la fe.»',
    nvi: '«Cuando llegaron, reunieron a la iglesia e informaron de todo lo que Dios había hecho por medio de ellos y de cómo había abierto la puerta de la fe a los no judíos.»',
    rvr1960: '«Y habiendo llegado, y reunido a la iglesia, refirieron cuán grandes cosas había hecho Dios con ellos, y cómo había abierto la puerta de la fe a los gentiles.»',
    rva: '«Y habiendo llegado, y reunido la iglesia, relataron cuán grandes cosas había Dios hecho con ellos, y cómo había abierto á los Gentiles la puerta de la fe.»',
  },
  note: 'Se quedaron mucho tiempo con los discípulos en Antioquía (14:28). La pregunta que este viaje planteó, si los creyentes gentiles debían circuncidarse y guardar la ley de Moisés, pronto llevó a Pablo y a Bernabé a Jerusalén, donde los apóstoles y los ancianos reconocieron que Dios había purificado por la fe el corazón de los gentiles, como el de los judíos (15:1–11). Más tarde Pablo salió de nuevo, a visitar a los hermanos en todas las ciudades donde habían predicado (15:36).',
};

export const STOPS = [
  {
    title: 'Enviados desde Antioquía', ref: 'Hechos 13:3',
    quote: {
      nbla: '«Entonces, después de ayunar, orar y haber impuesto las manos sobre ellos, los enviaron.»',
      nvi: '«Así que después de ayunar, orar e imponerles las manos, los despidieron.»',
      rvr1960: '«Entonces, habiendo ayunado y orado, les impusieron las manos y los despidieron.»',
      rva: '«Entonces habiendo ayunado y orado, y puesto las manos encima de ellos, despidiéronlos.»',
    },
    note: 'Antioquía del Orontes era la capital de la provincia romana de Siria y una de las grandes ciudades del imperio. Bernabé había traído aquí a Saulo desde Tarso (11:25–26), y los dos acababan de volver de llevar una ayuda para el hambre a Jerusalén, con Juan Marcos (12:25). Ahora la iglesia les impone las manos y los envía.',
  },
  {
    title: 'Rumbo a Seleucia', ref: 'Hechos 13:4',
    quote: {
      nbla: '«Ellos, pues, enviados por el Espíritu Santo, descendieron a Seleucia y de allí se embarcaron para Chipre.»',
      nvi: '«Bernabé y Saulo, enviados por el Espíritu Santo, bajaron a Seleucia y de allí navegaron a Chipre.»',
      rvr1960: '«Ellos, entonces, enviados por el Espíritu Santo, descendieron a Seleucia, y de allí navegaron a Chipre.»',
      rva: '«Y ellos, enviados así por el Espíritu Santo, descendieron á Seleucia: y de allí navegaron á Cipro.»',
    },
    note: 'Seleucia de Pieria era el puerto de Antioquía, junto al mar, cerca de la desembocadura del Orontes. Bernabé era un levita natural de Chipre (4:36), así que la isla era un buen lugar para empezar. Hechos no describe su barco; los viajeros pasaban en barcos mercantes, y el que se dibuja aquí es un pequeño mercante romano de la época.',
  },
  {
    title: 'Salamina', ref: 'Hechos 13:5',
    quote: {
      nbla: '«Al llegar a Salamina, proclamaban la palabra de Dios en las sinagogas de los judíos; y tenían también a Juan de ayudante.»',
      nvi: '«Al llegar a Salamina, predicaron la palabra de Dios en las sinagogas de los judíos. Tenían también a Juan como ayudante.»',
      rvr1960: '«Y llegados a Salamina, anunciaban la palabra de Dios en las sinagogas de los judíos. Tenían también a Juan de ayudante.»',
      rva: '«Y llegados á Salamina, anunciaban la palabra de Dios en las sinagogas de los Judíos: y tenían también á Juan en el ministerio.»',
    },
    note: 'Salamina, en la costa oriental, a unos 200 km de Seleucia, era la mayor ciudad de la isla, con judíos suficientes para más de una sinagoga. Así trabajaría Pablo desde entonces: primero en la sinagoga (13:14; 14:1). Juan es Juan Marcos, primo de Bernabé (Colosenses 4:10), en cuya casa materna de Jerusalén se reunía la iglesia (12:12).',
  },
  {
    title: 'Por toda la isla', ref: 'Hechos 13:6',
    quote: {
      nbla: '«Después de haber recorrido toda la isla hasta Pafos, encontraron a cierto mago, un falso profeta judío llamado Barjesús…»',
      nvi: '«Recorrieron toda la isla hasta Pafos. Allí se encontraron con un hechicero, un falso profeta judío llamado Barjesús…»',
      rvr1960: '«Y habiendo atravesado toda la isla hasta Pafos, hallaron a cierto mago, falso profeta, judío, llamado Barjesús…»',
      rva: '«Y habiendo atravesado toda la isla hasta Papho, hallaron un hombre mago, falso profeta, Judío, llamado Bar jesús…»',
    },
    note: 'De Salamina a Pafos hay unos 160 km. Hechos no dice por dónde fueron; lo habitual es suponer el camino de la costa por Citio, Amatunte y Curio, y la ruta lo sigue, al pie de los montes Troodos. Chipre era una provincia senatorial, gobernada por un procónsul, y Lucas le da el título exacto (13:7).',
  },
  {
    title: 'El {proconsul} cree', ref: 'Hechos 13:12',
    quote: {
      nbla: '«Entonces el procónsul, cuando vio lo que había sucedido, creyó, maravillado de la doctrina del Señor.»',
      nvi: '«Al ver lo sucedido, el gobernador creyó, maravillado de la enseñanza acerca del Señor.»',
      rvr1960: '«Entonces el procónsul, viendo lo que había sucedido, creyó, maravillado de la doctrina del Señor.»',
      rva: '«Entonces el procónsul, viendo lo que había sido hecho, creyó, maravillado de la doctrina del Señor.»',
    },
    note: 'Pafos (la Nueva Pafos) era la capital, donde vivía el {proconsul} Sergio Paulo. Llamó a Bernabé y a Saulo para oír la palabra de Dios, pero el mago Elimas, que estaba con él, trataba de apartarlo de la fe. Saulo, también llamado Pablo, le anunció que quedaría ciego por un tiempo, y así fue (13:7–11). Desde aquí Lucas lo llama Pablo, y lo nombra primero.',
  },
  {
    title: { rva: 'Perge de Pamphylia', default: 'Perge de Panfilia' }, ref: 'Hechos 13:13',
    quote: {
      nbla: '«Pablo y sus compañeros navegaron desde Pafos y llegaron a Perge de Panfilia; pero Juan se apartó de ellos y regresó a Jerusalén…»',
      nvi: '«Pablo y sus compañeros se hicieron a la mar desde Pafos y llegaron a Perge de Panfilia. Juan se separó de ellos y regresó a Jerusalén…»',
      rvr1960: '«Habiendo zarpado de Pafos, Pablo y sus compañeros arribaron a Perge de Panfilia; pero Juan, apartándose de ellos, volvió a Jerusalén.»',
      rva: '«Y partidos de Papho, Pablo y sus compañeros arribaron á Perge de Pamphylia: entonces Juan, apartándose de ellos, se volvió á Jerusalem.»',
    },
    note: 'La travesía de Pafos a la costa de Panfilia es de unos 250 km. Perge estaba a unos 12 km del mar, sobre el río Cestro, que los barcos podían remontar; la ruta llega a su desembocadura. Aquí Juan Marcos se volvió a casa. Hechos no dice por qué, pero Pablo se lo tuvo en cuenta, y más tarde él y Bernabé se separaron por ello (15:37–39). Años después Pablo volvió a pedir a Marcos, porque le era útil (2 Timoteo 4:11).',
  },
  {
    title: 'Por los montes Tauro', ref: '2 Corintios 11:26',
    quote: {
      nbla: '«Con frecuencia en viajes, en peligros de ríos, peligros de salteadores, peligros de mis compatriotas, peligros de los gentiles, peligros en la ciudad, peligros en el desierto, peligros en el mar…»',
      nvi: '«Mi vida ha sido un continuo ir y venir de un sitio a otro; en peligros de ríos, peligros de bandidos, peligros de parte de mis compatriotas, peligros a manos de los no judíos, peligros en la ciudad, peligros en el campo, peligros en el mar…»',
      rvr1960: '«…en caminos muchas veces; en peligros de ríos, peligros de ladrones, peligros de los de mi nación, peligros de los gentiles, peligros en la ciudad, peligros en el desierto, peligros en el mar…»',
      rva: '«En caminos muchas veces, peligros de ríos, peligros de ladrones, peligros de los de mi nación, peligros de los Gentiles, peligros en la ciudad, peligros en el desierto, peligros en la mar…»',
    },
    note: 'De Perge a Antioquía de Pisidia hay unos 160 km, subiendo por las gargantas del Tauro hasta una meseta de más de 1000 m de altura. Hechos no dice nada del camino (13:14). Pablo escribió esta lista años después, sobre todos sus viajes, pero los ríos crecidos y los bandidos eran peligros conocidos en estos montes, y muchos han pensado en este camino. Algunos relacionan la subida con la enfermedad que menciona en Gálatas 4:13.',
  },
  {
    title: 'Antioquía de Pisidia', ref: 'Hechos 13:14',
    quote: {
      nbla: '«…ellos, saliendo de Perge, llegaron a Antioquía de Pisidia; y en el día de reposo entraron a la sinagoga y se sentaron.»',
      nvi: '«…ellos, por su parte, siguieron su viaje desde Perge hasta Antioquía de Pisidia. El sábado entraron en la sinagoga y se sentaron.»',
      rvr1960: '«Ellos, pasando de Perge, llegaron a Antioquía de Pisidia; y entraron en la sinagoga un día de reposo y se sentaron.»',
      rva: '«Y ellos pasando de Perge, llegaron á Antioquía de Pisidia, y entrando en la sinagoga un día de sábado, sentáronse.»',
    },
    note: 'Esta Antioquía, junto a Pisidia, sobre una colina a unos 1100 m de altura, era una colonia romana, poblada con veteranos de las legiones en tiempos de Augusto. Después de la lectura de la ley y los profetas, los jefes de la sinagoga pidieron a los visitantes una palabra de aliento (13:15), y Pablo se levantó a predicar: desde el éxodo y David hasta Jesús, resucitado de los muertos, por medio de quien se anuncia el perdón de los pecados (13:16–41).',
  },
  {
    title: { nvi: 'Luz para las naciones', default: 'Luz para los gentiles' }, ref: 'Hechos 13:47',
    quote: {
      nbla: '«Porque así nos lo ha mandado el Señor: “Te he puesto como luz para los gentiles, A fin de que lleves la salvación hasta los confines de la tierra”.»',
      nvi: '«Así nos lo ha mandado el Señor: “Te he puesto por luz para las naciones, a fin de que lleves mi salvación hasta los confines de la tierra”.»',
      rvr1960: '«Porque así nos ha mandado el Señor, diciendo: Te he puesto para luz de los gentiles, A fin de que seas para salvación hasta lo último de la tierra.»',
      rva: '«Porque así nos ha mandado el Señor, diciendo: Te he puesto para luz de los Gentiles, Para que seas salud hasta lo postrero de la tierra.»',
    },
    note: 'El sábado siguiente casi toda la ciudad se juntó para oír. Cuando algunos de los judíos se les opusieron, Pablo y Bernabé se volvieron a los gentiles, con estas palabras de Isaías 49:6. Los gentiles se alegraron, y la palabra del Señor se difundía por toda la región (13:44–49). Luego se incitó contra ellos a los hombres y mujeres principales de la ciudad, y los expulsaron; ellos sacudieron el polvo de sus pies y se fueron a Iconio (13:50–51).',
  },
  {
    title: 'Iconio', ref: 'Hechos 14:1',
    quote: {
      nbla: '«Cuando Pablo y Bernabé entraron juntos en la sinagoga de los judíos en Iconio, hablaron de tal manera que creyó una gran multitud, tanto de judíos como de griegos.»',
      nvi: '«En Iconio, Pablo y Bernabé entraron, como de costumbre, en la sinagoga judía y hablaron de tal manera que creyó una multitud de judíos y de los que no son judíos.»',
      rvr1960: '«Aconteció en Iconio que entraron juntos en la sinagoga de los judíos, y hablaron de tal manera que creyó una gran multitud de judíos, y asimismo de griegos.»',
      rva: '«…en Iconio, que entrados juntamente en la sinagoga de los Judíos, hablaron de tal manera, que creyó una grande multitud de Judíos, y asimismo de Griegos.»',
    },
    note: 'Iconio, la actual Konya, estaba unos 140 km al este, al borde de la gran llanura de Licaonia. Se quedaron mucho tiempo, hablando con valentía, y el Señor confirmaba la palabra con señales y prodigios (14:3). Pero la ciudad se dividió, y cuando supieron de un plan para apedrearlos, huyeron a Listra y Derbe, ciudades de Licaonia, y a sus alrededores (14:4–7).',
  },
  {
    title: 'Los dioses han descendido', ref: 'Hechos 14:11',
    quote: {
      nbla: '«Cuando la multitud vio lo que Pablo había hecho, alzaron la voz, diciendo en el idioma de Licaonia: “Los dioses se han hecho semejantes a hombres y han descendido a nosotros”.»',
      nvi: '«Al ver lo que Pablo había hecho, la gente comenzó a gritar en el idioma de Licaonia: “¡Los dioses han tomado forma humana y han venido a visitarnos!”»',
      rvr1960: '«Entonces la gente, visto lo que Pablo había hecho, alzó la voz, diciendo en lengua licaónica: Dioses bajo la semejanza de hombres han descendido a nosotros.»',
      rva: '«Entonces las gentes, visto lo que Pablo había hecho, alzaron la voz, diciendo en lengua licaónica: Dioses semejantes á hombres han descendido á nosotros.»',
    },
    note: 'Listra, una pequeña colonia romana, estaba unos 30 km al sur de Iconio. Pablo sanó a un hombre cojo de nacimiento, y la multitud tomó a Bernabé por {zeus} y a Pablo por {hermes}, porque era él quien hablaba (14:8–12). El sacerdote de {zeus}, cuyo templo estaba fuera de la ciudad, trajo toros y guirnaldas a las puertas para ofrecerles sacrificios, y los dos rasgaron sus ropas y a duras penas lo impidieron (14:13–18). No se sabe dónde estaba el templo; se dibuja junto al camino.',
  },
  {
    title: 'Apedreado en Listra', ref: 'Hechos 14:19',
    quote: {
      nbla: '«Pero vinieron algunos judíos de Antioquía y de Iconio, y habiendo persuadido a la multitud, apedrearon a Pablo y lo arrastraron fuera de la ciudad, pensando que estaba muerto.»',
      nvi: '«En eso llegaron de Antioquía y de Iconio unos judíos que hicieron cambiar de parecer a la multitud. Apedrearon a Pablo y lo arrastraron fuera de la ciudad, creyendo que estaba muerto.»',
      rvr1960: '«Entonces vinieron unos judíos de Antioquía y de Iconio, que persuadieron a la multitud, y habiendo apedreado a Pablo, le arrastraron fuera de la ciudad, pensando que estaba muerto.»',
      rva: '«Entonces sobrevinieron unos Judíos de Antioquía y de Iconio, que persuadieron á la multitud, y habiendo apedreado á Pablo, le sacaron fuera de la ciudad, pensando que estaba muerto.»',
    },
    note: 'Pero cuando los discípulos lo rodearon, se levantó y volvió a la ciudad, y al día siguiente salió con Bernabé para Derbe (14:20). Años después Pablo lo contaba entre sus sufrimientos: una vez fue apedreado (2 Corintios 11:25). A Timoteo le recordó lo que le pasó en Antioquía, en Iconio y en Listra, y cómo el Señor lo libró de todo (2 Timoteo 3:11). Timoteo era de Listra (16:1).',
  },
  {
    title: 'Derbe', ref: 'Hechos 14:21',
    quote: {
      nbla: '«Después de anunciar el evangelio a aquella ciudad y de hacer muchos discípulos, volvieron a Listra, a Iconio y a Antioquía…»',
      nvi: '«Después de anunciar las buenas noticias en aquella ciudad y de hacer muchos discípulos, Pablo y Bernabé regresaron a Listra, a Iconio y a Antioquía…»',
      rvr1960: '«Y después de anunciar el evangelio a aquella ciudad y de hacer muchos discípulos, volvieron a Listra, a Iconio y a Antioquía…»',
      rva: '«Y como hubieron anunciado el evangelio á aquella ciudad, y enseñado á muchos, volvieron á Listra, y á Iconio, y á Antioquía…»',
    },
    note: 'Derbe, a unos 90 km al este de Listra, fue el punto más lejano del viaje. Su sitio solo se conoce por inscripciones con el nombre de la ciudad halladas al nordeste de Karaman, y aún se discute; se dibuja allí. Desde Derbe, el camino que seguía por las Puertas de Cilicia hasta Tarso y a casa era más corto, pero volvieron atrás, a las ciudades de donde los habían echado.',
  },
  {
    title: 'Fortaleciendo a los discípulos', ref: 'Hechos 14:22',
    quote: {
      nbla: '«…fortaleciendo los ánimos de los discípulos, exhortándolos a que perseveraran en la fe, y diciendo: “Es necesario que a través de muchas tribulaciones entremos en el reino de Dios”.»',
      nvi: '«…fortaleciendo a los discípulos y animándolos a perseverar en la fe. “Es necesario pasar por muchas dificultades para entrar en el reino de Dios”, les decían.»',
      rvr1960: '«…confirmando los ánimos de los discípulos, exhortándoles a que permaneciesen en la fe, y diciéndoles: Es necesario que a través de muchas tribulaciones entremos en el reino de Dios.»',
      rva: '«Confirmando los ánimos de los discípulos, exhortándoles á que permaneciesen en la fe, y que es menester que por muchas tribulaciones entremos en el reino de Dios.»',
    },
    note: 'Volvieron por donde habían venido, por Listra e Iconio, los lugares donde Pablo había sido apedreado y donde a los dos los habían amenazado, para fortalecer a los nuevos creyentes. Lo que les dijeron no fue que seguir a Jesús sería fácil.',
  },
  {
    title: { nvi: 'Líderes en cada iglesia', default: 'Ancianos en cada iglesia' }, ref: 'Hechos 14:23',
    quote: {
      nbla: '«Después que les designaron ancianos en cada iglesia, habiendo orado con ayunos, los encomendaron al Señor en quien habían creído.»',
      nvi: '«Cada iglesia nombró líderes religiosos, y con oración y ayuno los encomendaron al Señor, en quien habían creído.»',
      rvr1960: '«Y constituyeron ancianos en cada iglesia, y habiendo orado con ayunos, los encomendaron al Señor en quien habían creído.»',
      rva: '«Y habiéndoles constituído ancianos en cada una de las iglesias, y habiendo orado con ayunos, los encomendaron al Señor en el cual habían creído.»',
    },
    note: 'En cada ciudad dejaron a los creyentes con dirigentes propios, y lo hicieron como la iglesia de Antioquía los había enviado a ellos, con oración y ayuno (13:3). Después los dejaron en manos del Señor. De vuelta en Antioquía, junto a Pisidia, habían recorrido ya las cuatro ciudades.',
  },
  {
    title: 'Las iglesias de Galacia', ref: 'Gálatas 4:13',
    quote: {
      nbla: '«Pero saben que fue por causa de una enfermedad física que les prediqué el evangelio la primera vez.»',
      nvi: '«Como bien saben, la primera vez que les prediqué acerca de las buenas noticias fue debido a una enfermedad…»',
      rvr1960: '«Pues vosotros sabéis que a causa de una enfermedad del cuerpo os anuncié el evangelio al principio…»',
      rva: '«Que vosotros sabéis que por flaqueza de carne os anuncié el evangelio al principio…»',
    },
    note: 'Las cuatro ciudades estaban en la provincia romana de Galacia. Muchos piensan que la carta de Pablo «a las iglesias de Galacia» (Gálatas 1:2) fue escrita para ellas, y que aquí recuerda esta primera visita, cuando lo recibieron aunque estaba enfermo. Otros piensan que la carta fue a los pueblos gálatas más al norte, que visitó más tarde (16:6). En cualquier caso, la enfermedad no se nombra.',
  },
  {
    title: { nvi: 'Perge y Atalía', default: 'Perge y Atalia' }, ref: 'Hechos 14:25',
    quote: {
      nbla: '«Después de predicar la palabra en Perge, descendieron a Atalia…»',
      nvi: '«…y, cuando terminaron de predicar la palabra en Perge, bajaron a Atalía.»',
      rvr1960: '«Y habiendo predicado la palabra en Perge, descendieron a Atalia.»',
      rva: '«Y habiendo predicado la palabra en Perge, descendieron á Atalia…»',
    },
    note: 'Atravesaron Pisidia y bajaron por los montes hasta Panfilia (14:24). Esta vez predicaron en Perge, donde Hechos no menciona predicación a la ida, y bajaron al puerto de la costa, la actual Antalya.',
  },
  {
    title: 'De regreso a Antioquía', ref: 'Hechos 14:26',
    quote: {
      nbla: '«…y de allí se embarcaron para Antioquía, donde habían sido encomendados a la gracia de Dios para la obra que habían cumplido.»',
      nvi: '«De Atalía navegaron a Antioquía, donde se los había encomendado a la gracia de Dios para la obra que ya habían realizado.»',
      rvr1960: '«De allí navegaron a Antioquía, desde donde habían sido encomendados a la gracia de Dios para la obra que habían cumplido.»',
      rva: '«Y de allí navegaron á Antioquía, donde habían sido encomendados á la gracia de Dios para la obra que habían acabado.»',
    },
    note: 'Desde allí hay unos 500 km por mar hasta Seleucia, a lo largo de la costa de Cilicia y del norte de Chipre, y luego, Orontes arriba, hasta Antioquía. Habían estado fuera quizá uno o dos años; Hechos no da fechas. La obra para la que habían sido apartados (13:2) estaba cumplida.',
  },
];
