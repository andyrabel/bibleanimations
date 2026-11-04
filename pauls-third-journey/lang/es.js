// Spanish text for this journey, merged over data.js (see addLanguage in ../../i18n.js).
// Same shape as data.js, text fields only; STOPS line up by position. Quotations are
// verbatim, including the RVA’s 1909 spelling; where the RVA opens a chapter in
// capitals, the quotation starts after them.

// Words that differ between versions: {term} in any text field.
export const TERMS = {
  artemis: { nvi: 'Artemisa', default: 'Diana' },
  theater: 'teatro',
};

export const PLACES = {
  antioch: { name: 'Antioquía' },
  derbe: { name: 'Derbe' },
  lystra: { name: 'Listra' },
  iconium: { name: 'Iconio' },
  antiochP: { name: 'Antioquía de Pisidia' },
  ephesus: { name: { rva: 'Efeso', default: 'Éfeso' } },
  troas: { name: 'Troas' },
  neapolis: { name: 'Neápolis' },
  philippi: { name: 'Filipos' },
  thessalonica: { name: 'Tesalónica' },
  berea: { name: 'Berea' },
  corinth: { name: 'Corinto' },
  assos: { name: { rva: 'Assón', default: 'Asón' } },
  mitylene: { name: 'Mitilene' },
  miletus: { name: 'Mileto' },
  cos: { name: { rva: 'Coos', default: 'Cos' } },
  rhodes: { name: { rva: 'Rhodas', default: 'Rodas' } },
  patara: { name: 'Pátara' },
  tyre: { name: 'Tiro' },
  ptolemais: { name: 'Tolemaida' },
  caesarea: { name: 'Cesarea' },
  jerusalem: { name: { rva: 'Jerusalem', default: 'Jerusalén' } },
};

export const FEATURES = {
  tarsus: { name: 'Tarso' },
  theater: { name: '{Theater}' },
  smyrna: { name: 'Esmirna' },
  pergamum: { name: 'Pérgamo' },
  thyatira: { name: 'Tiatira' },
  sardis: { name: 'Sardis' },
  philadelphia: { name: 'Filadelfia' },
  laodicea: { name: 'Laodicea' },
  colossae: { name: 'Colosas' },
  hierapolis: { name: 'Hierápolis' },
  chios: { name: { rva: 'Chîo', default: 'Quío' } },
  samos: { name: { rva: 'Samo', default: 'Samos' } },
  syria: { name: 'Siria' },
  cilicia: { name: 'Cilicia' },
  galatia: { name: 'Galacia' },
  phrygia: { name: { rva: 'Phrygia', default: 'Frigia' } },
  asia: { name: 'Asia' },
  macedonia: { name: 'Macedonia' },
  achaia: { name: 'Acaya' },
  lycia: { name: 'Licia' },
  phoenicia: { name: 'Fenicia' },
  judea: { name: 'Judea' },
  cyprus: { name: 'Chipre' },
  aegean: { name: 'Mar Egeo' },
  sea: { name: 'Mar Mediterráneo' },
};

export const INTRO = {
  title: 'Acabar la carrera',
  ref: 'Hechos 20:24',
  quote: {
    nbla: '«Pero en ninguna manera estimo mi vida como valiosa para mí mismo, a fin de poder terminar mi carrera y el ministerio que recibí del Señor Jesús, para dar testimonio solemnemente del evangelio de la gracia de Dios.»',
    nvi: '«Sin embargo, considero que mi vida carece de valor para mí mismo, con tal de que termine mi carrera y lleve a cabo el servicio que me ha encomendado el Señor Jesús, que es el de dar testimonio del evangelio de la gracia de Dios.»',
    rvr1960: '«Pero de ninguna cosa hago caso, ni estimo preciosa mi vida para mí mismo, con tal que acabe mi carrera con gozo, y el ministerio que recibí del Señor Jesús, para dar testimonio del evangelio de la gracia de Dios.»',
    rva: '«Mas de ninguna cosa hago caso, ni estimo mi vida preciosa para mí mismo; solamente que acabe mi carrera con gozo, y el ministerio que recibí del Señor Jesús, para dar testimonio del evangelio de la gracia de Dios.»',
  },
  note: 'Pablo dijo esto a los ancianos de Éfeso en Mileto, hacia el final de su tercer viaje, en torno a los años 53–57 d. C. La mayor parte del viaje la pasó en Éfeso, más de dos años. Luego recorrió Macedonia y Grecia reuniendo una colecta para los pobres de Jerusalén, y la llevó él mismo, aunque se le advirtió que le esperaban prisiones (20:23).',
  aside: 'La tierra es real, a partir de datos de elevación modernos, con las alturas multiplicadas por tres para que se vean los montes; la costa es la de hoy, así que los puertos cegados de Éfeso y Mileto quedan ahora tierra adentro. Hechos no dice por qué caminos fueron, así que las rutas por tierra siguen el paso más fácil entre los lugares nombrados, y las de mar el camino más corto por aguas abiertas. Las ciudades y el barco se dibujan mucho más grandes de lo que eran. No se muestran personas.',
};

export const FINALE = {
  title: 'Lo que Dios había hecho',
  ref: 'Hechos 21:19',
  quote: {
    nbla: '«Después de saludarlos, comenzó a referirles una por una las cosas que Dios había hecho entre los gentiles mediante su ministerio.»',
    nvi: '«Después de saludarlos, Pablo relató detalladamente lo que Dios había hecho entre los no judíos por medio de su ministerio.»',
    rvr1960: '«…a los cuales, después de haberles saludado, les contó una por una las cosas que Dios había hecho entre los gentiles por su ministerio.»',
    rva: '«A los cuales, como los hubo saludado, contó por menudo lo que Dios había hecho entre los Gentiles por su ministerio.»',
  },
  note: 'Pablo y sus compañeros informaron a Jacobo y a los ancianos, que glorificaron a Dios (21:18–20). Pocos días después Pablo fue apresado en el templo y arrestado (21:27–33). Llegaría a Roma, como esperaba (Romanos 15:23–24), pero preso (Hechos 27–28).',
};

export const STOPS = [
  {
    title: 'De nuevo desde Antioquía', ref: 'Hechos 18:23',
    quote: {
      nbla: '«Después de pasar allí algún tiempo, Pablo fue recorriendo por orden la región de Galacia y de Frigia, fortaleciendo a todos los discípulos.»',
      nvi: '«Después de pasar algún tiempo allí, Pablo se fue a visitar una por una las congregaciones de Galacia y Frigia, animando a todos los discípulos.»',
      rvr1960: '«Y después de estar allí algún tiempo, salió, recorriendo por orden la región de Galacia y de Frigia, confirmando a todos los discípulos.»',
      rva: '«Y habiendo estado allí algún tiempo, partió, andando por orden la provincia de Galacia, y la Phrygia, confirmando á todos los discípulos.»',
    },
    note: 'Después de un tiempo en Antioquía, Pablo salió por tercera vez, de nuevo por tierra, hacia las iglesias de los dos primeros viajes. Hechos dedica a esta parte del viaje una sola frase antes de que Pablo llegue a Éfeso (19:1). La ruta pasa por Tarso y las Puertas de Cilicia, como en el segundo viaje.',
  },
  {
    title: 'La colecta', ref: '1 Corintios 16:1',
    quote: {
      nbla: '«Ahora bien, en cuanto a la ofrenda para los santos, hagan ustedes también como instruí a las iglesias de Galacia.»',
      nvi: '«En cuanto a la colecta para los creyentes, sigan las instrucciones que di a las iglesias de Galacia.»',
      rvr1960: '«En cuanto a la ofrenda para los santos, haced vosotros también de la manera que ordené en las iglesias de Galacia.»',
      rva: '«…á la colecta para los santos, haced vosotros también de la manera que ordené en las iglesias de Galacia.»',
    },
    note: 'En este viaje Pablo reunió dinero de las iglesias gentiles para los creyentes pobres de Jerusalén (Romanos 15:25–28; 2 Corintios 8–9), como los apóstoles le habían pedido que se acordara de los pobres (Gálatas 2:10). A las iglesias de Galacia, como después a los corintios, les dijo que apartaran algo el primer día de cada semana (1 Corintios 16:2).',
  },
  {
    title: { rva: 'Efeso', default: 'Éfeso' }, ref: 'Hechos 19:1',
    quote: {
      nbla: '«Mientras Apolos estaba en Corinto, Pablo, después de haber recorrido las regiones superiores, llegó a Éfeso y encontró a algunos discípulos…»',
      nvi: '«Mientras Apolos estaba en Corinto, Pablo recorrió las regiones del interior y llegó a Éfeso. Allí encontró a algunos discípulos.»',
      rvr1960: '«Aconteció que entre tanto que Apolos estaba en Corinto, Pablo, después de recorrer las regiones superiores, vino a Éfeso, y hallando a ciertos discípulos…»',
      rva: '«…que entre tanto que Apolos estaba en Corinto, Pablo, andadas las regiones superiores, vino á Efeso, y hallando ciertos discípulos…»',
    },
    note: 'Las «regiones superiores» se entienden como el camino por las tierras altas y no por los valles; Colosenses 2:1 sugiere que Pablo nunca fue a Laodicea ni a Colosas, así que la ruta pasa al norte de ellas. Éfeso era la ciudad principal de Asia, con el gran templo de {artemis}. Pablo encontró a unos doce discípulos que solo conocían el bautismo de Juan (19:1–7), y enseñó en la sinagoga durante tres meses (19:8).',
  },
  {
    title: 'Toda Asia oyó', ref: 'Hechos 19:10',
    quote: {
      nbla: '«Esto continuó por dos años, de manera que todos los que vivían en Asia oyeron la palabra del Señor, tanto judíos como griegos.»',
      nvi: '«Esto continuó por espacio de dos años, de modo que todos los judíos y los que no eran judíos que vivían en la provincia de Asia llegaron a escuchar la palabra del Señor.»',
      rvr1960: '«Así continuó por espacio de dos años, de manera que todos los que habitaban en Asia, judíos y griegos, oyeron la palabra del Señor Jesús.»',
      rva: '«Y esto fué por espacio de dos años; de manera que todos los que habitaban en Asia, Judíos y Griegos, oyeron la palabra del Señor Jesús.»',
    },
    note: 'Cuando la sinagoga se volvió contra él, Pablo enseñaba cada día en la escuela de Tirano (19:9). Surgieron iglesias por toda la provincia, algunas fundadas por otros: Epafras llevó el evangelio a Colosas, Laodicea y Hierápolis (Colosenses 1:7; 4:13). Las siete iglesias de Apocalipsis 2–3 están todas en Asia: Éfeso, Esmirna, Pérgamo, Tiatira, Sardis, Filadelfia y Laodicea.',
  },
  {
    title: 'El alboroto', ref: 'Hechos 19:29',
    quote: {
      nbla: '«La ciudad se llenó de confusión y a una se precipitaron en el teatro, arrastrando consigo a Gayo y a Aristarco, los compañeros de viaje de Pablo, que eran de Macedonia.»',
      nvi: '«Enseguida toda la ciudad se alborotó. La turba en masa se precipitó en el teatro, arrastrando a Gayo y a Aristarco, compañeros de viaje de Pablo, que eran de Macedonia.»',
      rvr1960: '«Y la ciudad se llenó de confusión, y a una se lanzaron al teatro, arrebatando a Gayo y a Aristarco, macedonios, compañeros de Pablo.»',
      rva: '«Y la ciudad se llenó de confusión; y unánimes se arrojaron al teatro, arrebatando á Gayo y á Aristarco, Macedonios, compañeros de Pablo.»',
    },
    note: 'Demetrio, un platero que hacía templecillos de plata de {artemis}, vio amenazado su negocio y alborotó a los artesanos (19:23–27). En el {theater} la multitud estuvo gritando alabanzas a la diosa durante dos horas, hasta que el escribano de la ciudad la calmó (19:34–41). Se dibujan aquí sus ruinas, con capacidad para unas 25 000 personas. Pablo quería entrar, pero los discípulos no lo dejaron (19:30).',
  },
  {
    title: 'Una puerta abierta en Troas', ref: '2 Corintios 2:12',
    quote: {
      nbla: '«Cuando llegué a Troas para predicar el evangelio de Cristo, y se me abrió una puerta en el Señor…»',
      nvi: '«Ahora bien, cuando llegué a Troas para predicar el evangelio de Cristo, descubrí que el Señor me había abierto una puerta.»',
      rvr1960: '«Cuando llegué a Troas para predicar el evangelio de Cristo, aunque se me abrió puerta en el Señor…»',
      rva: '«Cuando vine á Troas para el evangelio de Cristo, aunque me fué abierta puerta en el Señor…»',
    },
    note: 'Después del alboroto, Pablo salió hacia Macedonia (20:1). Sus cartas completan el camino: en Troas encontró una puerta abierta para el evangelio, pero no tuvo reposo, porque Tito, que había llevado a Corinto una carta dolorosa, no había vuelto (2 Corintios 2:4, 13). Así que siguió adelante. Hechos no dice cómo fue de Éfeso a Troas; la ruta sigue el camino por Esmirna y Pérgamo.',
  },
  {
    title: 'Tito en Macedonia', ref: '2 Corintios 7:6',
    quote: {
      nbla: '«Pero Dios, que consuela a los deprimidos, nos consoló con la llegada de Tito…»',
      nvi: '«Pero Dios, que consuela a los abatidos, nos consoló con la llegada de Tito…»',
      rvr1960: '«Pero Dios, que consuela a los humildes, nos consoló con la venida de Tito…»',
      rva: '«Mas Dios, que consuela á los humildes, nos consoló con la venida de Tito…»',
    },
    note: 'Tampoco en Macedonia tuvo Pablo reposo: conflictos por fuera, temores por dentro (2 Corintios 7:5). Entonces llegó Tito con buenas noticias de Corinto, y Pablo escribió 2 Corintios desde Macedonia. Las iglesias de Macedonia, aunque pobres, dieron con generosidad para la colecta (2 Corintios 8:1–5).',
  },
  {
    title: 'Grecia', ref: 'Hechos 20:2',
    quote: {
      nbla: '«Y después de recorrer aquellas regiones y de haberlos exhortado mucho, llegó a Grecia.»',
      nvi: '«Recorrió aquellas regiones, dando palabras de aliento a los creyentes en muchas ocasiones, y por fin llegó a Grecia…»',
      rvr1960: '«Y después de recorrer aquellas regiones, y de exhortarles con abundancia de palabras, llegó a Grecia.»',
      rva: '«Y andado que hubo aquellas partes, y exhortádoles con abundancia de palabra, vino á Grecia.»',
    },
    note: 'Hechos resume Macedonia en una frase; Pablo quizá llegó hasta el Ilírico, en el Adriático (Romanos 15:19). En Grecia se quedó tres meses (20:3), probablemente en Corinto, y allí escribió su carta a los Romanos, que llevó Febe de Cencrea (Romanos 16:1). Hechos no dice por dónde llegó desde Macedonia; la ruta toma el camino de Tesalia.',
  },
  {
    title: 'Para los pobres de Jerusalén', ref: 'Romanos 15:26',
    quote: {
      nbla: '«…pues Macedonia y Acaya han tenido a bien hacer una colecta para los pobres de entre los santos que están en Jerusalén.»',
      nvi: '«…ya que Macedonia y Acaya tuvieron a bien hacer una colecta para los hermanos pobres de Jerusalén.»',
      rvr1960: '«Porque Macedonia y Acaya tuvieron a bien hacer una ofrenda para los pobres que hay entre los santos que están en Jerusalén.»',
      rva: '«Porque Macedonia y Acaya tuvieron por bien hacer una colecta para los pobres de los santos que están en Jerusalem.»',
    },
    note: 'Escribiendo a Roma desde Corinto, Pablo explicó que primero debía llevar la ofrenda a Jerusalén, y les pidió que oraran para que fuera bien recibida (Romanos 15:25–31). Acaya es la provincia de Grecia al sur de Macedonia, con Corinto por capital. Después de Jerusalén esperaba visitar Roma de camino a España (15:24, 28).',
  },
  {
    title: 'De vuelta por Macedonia', ref: 'Hechos 20:3',
    quote: {
      nbla: '«Pasó allí tres meses, y habiéndose tramado un plan en su contra de parte de los judíos cuando estaba por embarcarse para Siria, tomó la decisión de regresar por Macedonia.»',
      nvi: '«…donde se quedó tres meses. Como los judíos tramaban un atentado contra él cuando estaba a punto de embarcarse para Siria, decidió regresar por Macedonia.»',
      rvr1960: '«Después de haber estado allí tres meses, y siéndole puestas asechanzas por los judíos para cuando se embarcase para Siria, tomó la decisión de volver por Macedonia.»',
      rva: '«Y después de haber estado allí tres meses, y habiendo de navegar á Siria, le fueron puestas asechanzas por los Judíos; y así tomó consejo de volverse por Macedonia.»',
    },
    note: 'Había pensado navegar desde Grecia directamente a Siria; en cambio volvió por el camino largo, por tierra a través de Macedonia. Lo acompañaban hombres de las iglesias, quizá con la colecta: Sópater de Berea, Aristarco y Segundo de Tesalónica, Gayo de Derbe, Timoteo, y Tíquico y Trófimo de Asia (20:4).',
  },
  {
    title: 'Partir el pan en Troas', ref: 'Hechos 20:7',
    quote: {
      nbla: '«El primer día de la semana, cuando estábamos reunidos para partir el pan, Pablo les hablaba, pensando salir al día siguiente, y prolongó su discurso hasta la medianoche.»',
      nvi: '«El primer día de la semana nos reunimos para partir el pan. Como iba a salir al día siguiente, Pablo estuvo hablando a los creyentes y prolongó su discurso hasta la medianoche.»',
      rvr1960: '«El primer día de la semana, reunidos los discípulos para partir el pan, Pablo les enseñaba, habiendo de salir al día siguiente; y alargó el discurso hasta la medianoche.»',
      rva: '«Y el día primero de la semana, juntos los discípulos á partir el pan, Pablo les enseñaba, habiendo de partir al día siguiente: y alargó el discurso hasta la media noche.»',
    },
    note: 'Navegaron desde Filipos después de los días de los panes sin levadura, llegaron a Troas en cinco días y se quedaron siete (20:6); desde Filipos el relato vuelve a decir «nosotros». Aquella noche un joven, Eutico, se durmió en una ventana, cayó desde el tercer piso y lo levantaron muerto; Pablo lo abrazó, y lo llevaron vivo a casa (20:9–12).',
  },
  {
    title: { rva: 'A pie hasta Assón', default: 'A pie hasta Asón' }, ref: 'Hechos 20:13',
    quote: {
      nbla: '«Entonces nosotros, adelantándonos a tomar la nave, salimos para Asón, con el propósito de recoger allí a Pablo, pues así lo había decidido, deseando él ir por tierra hasta Asón.»',
      nvi: '«Nosotros, por nuestra parte, nos embarcamos anticipadamente y zarpamos para Asón, donde íbamos a recoger a Pablo. Así se había planeado, ya que él iba a hacer esa parte del viaje por tierra.»',
      rvr1960: '«Nosotros, adelantándonos a embarcarnos, navegamos a Asón para recoger allí a Pablo, ya que así lo había determinado, queriendo él ir por tierra.»',
      rva: '«Y nosotros subiendo en el navío, navegamos á Assón, para recibir de allí á Pablo; pues así había determinado que debía él ir por tierra.»',
    },
    note: 'Pablo caminó unos 35 km atravesando el cabo, mientras los demás lo rodeaban por mar. En Asón lo recogieron a bordo y siguieron hasta Mitilene, en Lesbos (20:14).',
  },
  {
    title: { rva: 'Chîo, Samo, Mileto', default: 'Quío, Samos, Mileto' }, ref: 'Hechos 20:15',
    quote: {
      nbla: '«Saliendo de allí, al día siguiente llegamos frente a Quío; y al otro día atracamos en Samos. Habiendo hecho escala en Trogilio, al día siguiente llegamos a Mileto.»',
      nvi: '«Desde allí zarpamos al día siguiente y llegamos frente a Quío. Al otro día cruzamos en dirección a Samos y un día después llegamos a Mileto.»',
      rvr1960: '«Navegando de allí, al día siguiente llegamos delante de Quío, y al otro día tomamos puerto en Samos; y habiendo hecho escala en Trogilio, al día siguiente llegamos a Mileto.»',
      rva: '«Y navegamos de allí, al día siguiente llegamos delante de Chîo, y al otro día tomamos puerto en Samo: y habiendo reposado en Trogilio, al día siguiente llegamos á Mileto.»',
    },
    note: 'Pasaron de largo Éfeso, porque Pablo se apresuraba para estar en Jerusalén, si le era posible, el día de Pentecostés (20:16). Cada jornada de navegación terminaba en una isla o un puerto, como hacían los barcos de cabotaje.',
  },
  {
    title: 'Despedida en Mileto', ref: 'Hechos 20:38',
    quote: {
      nbla: '«Estaban afligidos especialmente por la palabra que había dicho de que ya no volverían a ver su rostro. Y lo acompañaron hasta el barco.»',
      nvi: '«Lo que más los entristecía era su declaración de que ellos no volverían a verlo. Luego lo acompañaron hasta el barco.»',
      rvr1960: '«…doliéndose en gran manera por la palabra que dijo, de que no verían más su rostro. Y le acompañaron al barco. Hechos 20:24: 2 Ti. 4.7.»',
      rva: '«Doliéndose en gran manera por la palabra que dijo, que no habían de ver más su rostro. Y le acompañaron al navío.»',
    },
    note: 'Desde Mileto Pablo mandó llamar a los ancianos de la iglesia de Éfeso, a unos 50 km, y les habló de sus años con ellos, de lo que le esperaba y del rebaño que debían pastorear (20:17–35). Luego se arrodilló y oró con todos ellos (20:36). El puerto de Mileto, como el de Éfeso, se ha cegado desde entonces.',
  },
  {
    title: { rva: 'Coos, Rhodas, Pátara', default: 'Cos, Rodas, Pátara' }, ref: 'Hechos 21:1',
    quote: {
      nbla: '«Después de separarnos de ellos, salimos y navegamos con rumbo directo a Cos, al día siguiente a Rodas, y de allí a Pátara.»',
      nvi: '«Después de separarnos de ellos, zarpamos y navegamos directamente a Cos. Al día siguiente fuimos a Rodas, y de allí a Pátara.»',
      rvr1960: '«Después de separarnos de ellos, zarpamos y fuimos con rumbo directo a Cos, y al día siguiente a Rodas, y de allí a Pátara.»',
      rva: '«…partido de ellos, navegamos y vinimos camino derecho á Coos, y al día siguiente á Rhodas, y de allí á Pátara.»',
    },
    note: 'Cada jornada terminaba en una isla o un puerto. En Pátara, en la costa de Licia, encontraron un barco que pasaba a Fenicia y subieron a bordo (21:2): un barco mayor, para alta mar, que cruzaba directamente en lugar de seguir la costa.',
  },
  {
    title: 'Frente a Chipre, hasta Tiro', ref: 'Hechos 21:3',
    quote: {
      nbla: '«Cuando vimos la isla de Chipre, dejándola a la izquierda, navegamos hacia Siria, y desembarcamos en Tiro porque la nave debía dejar allí su cargamento.»',
      nvi: '«Después de avistar Chipre y de pasar al sur de la isla, navegamos hacia Siria y llegamos a Tiro, donde el barco tenía que descargar.»',
      rvr1960: '«Al avistar Chipre, dejándola a mano izquierda, navegamos a Siria, y arribamos a Tiro, porque el barco había de descargar allí.»',
      rva: '«Y como avistamos á Cipro, dejándola á mano izquierda, navegamos á Siria, y vinimos á Tiro: porque el barco había de descargar allí su carga.»',
    },
    note: 'La travesía de unos 650 km pasó al sur de Chipre, donde había comenzado el primer viaje de Pablo. En Tiro se quedaron siete días con los discípulos, que por el Espíritu decían a Pablo que no subiera a Jerusalén; al partir, toda la iglesia, con mujeres y niños, los acompañó, y se arrodillaron en la playa para orar (21:4–5).',
  },
  {
    title: 'Cesarea', ref: 'Hechos 21:13',
    quote: {
      nbla: '«Entonces Pablo respondió: “¿Qué hacen, llorando y quebrantándome el corazón? Porque listo estoy no solo a ser atado, sino también a morir en Jerusalén por el nombre del Señor Jesús”.»',
      nvi: '«—¿Por qué lloran? ¡Me parten el alma! —respondió Pablo—. Por el nombre del Señor Jesús estoy dispuesto no solo a ser atado, sino también a morir en Jerusalén.»',
      rvr1960: '«Entonces Pablo respondió: ¿Qué hacéis llorando y quebrantándome el corazón? Porque yo estoy dispuesto no solo a ser atado, mas aun a morir en Jerusalén por el nombre del Señor Jesús.»',
      rva: '«Entonces Pablo respondió: ¿Qué hacéis llorando y afligiéndome el corazón? porque yo no sólo estoy presto á ser atado, mas aun á morir en Jerusalem por el nombre del Señor Jesús.»',
    },
    note: 'De Tiro navegaron a Tolemaida, y al día siguiente llegaron a Cesarea, a casa de Felipe el evangelista (21:7–8). El profeta Agabo tomó el cinto de Pablo, se ató con él los pies y las manos, y dijo que así atarían los judíos en Jerusalén a su dueño (21:10–11). Todos rogaron a Pablo que no subiera; esta fue su respuesta.',
  },
  {
    title: { rva: 'Jerusalem', default: 'Jerusalén' }, ref: 'Hechos 21:17',
    quote: {
      nbla: '«Cuando llegamos a Jerusalén, los hermanos nos recibieron con regocijo.»',
      nvi: '«Cuando llegamos a Jerusalén, los creyentes nos recibieron calurosamente.»',
      rvr1960: '«Cuando llegamos a Jerusalén, los hermanos nos recibieron con gozo.»',
      rva: '«Y cuando llegamos á Jerusalem, los hermanos nos recibieron de buena voluntad.»',
    },
    note: 'De Cesarea a Jerusalén hay unos 100 km, subiendo a las montañas. Algunos discípulos de Cesarea fueron con ellos y los llevaron a hospedarse con Mnasón de Chipre, un discípulo antiguo (21:16). Hechos menciona la colecta una sola vez, cuando Pablo dice después que vino a traer limosnas a su nación (24:17).',
  },
];
