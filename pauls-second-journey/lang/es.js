// Spanish text for this journey, merged over data.js (see addLanguage in ../../i18n.js).
// Same shape as data.js, text fields only; STOPS line up by position. Quotations are
// verbatim, including the RVA’s 1909 spelling; where the RVA opens a chapter in
// capitals, the quotation starts after them.

// Words that differ between versions: {term} in any text field.
export const TERMS = {
  areopagus: 'Areópago',
};

export const PLACES = {
  antioch: { name: 'Antioquía' },
  derbe: { name: 'Derbe' },
  lystra: { name: 'Listra' },
  iconium: { name: 'Iconio' },
  antiochP: { name: 'Antioquía de Pisidia' },
  troas: { name: 'Troas' },
  neapolis: { name: 'Neápolis' },
  philippi: { name: 'Filipos' },
  thessalonica: { name: 'Tesalónica' },
  berea: { name: 'Berea' },
  athens: { name: 'Atenas' },
  corinth: { name: 'Corinto' },
  cenchrea: { name: { nvi: 'Cencreas', rva: 'Cencreas', default: 'Cencrea' } },
  ephesus: { name: { rva: 'Efeso', default: 'Éfeso' } },
  caesarea: { name: 'Cesarea' },
  jerusalem: { name: { rva: 'Jerusalem', default: 'Jerusalén' } },
};

export const FEATURES = {
  tarsus: { name: 'Tarso' },
  amphipolis: { name: { rva: 'Amphípolis', default: 'Anfípolis' } },
  apollonia: { name: 'Apolonia' },
  samothrace: { name: 'Samotracia' },
  areopagus: { name: '{Areopagus}' },
  syria: { name: 'Siria' },
  cilicia: { name: 'Cilicia' },
  galatia: { name: 'Galacia' },
  phrygia: { name: { rva: 'Phrygia', default: 'Frigia' } },
  mysia: { name: 'Misia' },
  bithynia: { name: { rva: 'Bithynia', default: 'Bitinia' } },
  asia: { name: 'Asia' },
  macedonia: { name: 'Macedonia' },
  achaia: { name: 'Acaya' },
  judea: { name: 'Judea' },
  cyprus: { name: 'Chipre' },
  aegean: { name: 'Mar Egeo' },
  sea: { name: 'Mar Mediterráneo' },
};

export const INTRO = {
  title: 'Volvamos',
  ref: 'Hechos 15:36',
  quote: {
    nbla: '«Después de algunos días Pablo dijo a Bernabé: “Volvamos y visitemos a los hermanos en todas las ciudades donde hemos proclamado la palabra del Señor, para ver cómo están”.»',
    nvi: '«Algún tiempo después, Pablo dijo a Bernabé: “Volvamos a visitar a los creyentes en todas las ciudades en donde hemos anunciado la palabra del Señor, y veamos cómo están”.»',
    rvr1960: '«Después de algunos días, Pablo dijo a Bernabé: Volvamos a visitar a los hermanos en todas las ciudades en que hemos anunciado la palabra del Señor, para ver cómo están.»',
    rva: '«Y después de algunos días, Pablo dijo á Bernabé: Volvamos á visitar á los hermanos por todas las ciudades en las cuales hemos anunciado la palabra del Señor, cómo están.»',
  },
  note: 'Después del concilio de Jerusalén (Hechos 15), Pablo propuso volver a las iglesias del primer viaje. Bernabé quería llevar otra vez a Juan Marcos; Pablo no quiso, y se separaron: Bernabé navegó a Chipre con Marcos, y Pablo salió por tierra con Silas (15:37–40). Este viaje, hacia los años 49–52 d. C., llevó el evangelio a Europa: a Filipos, Tesalónica, Berea, Atenas y Corinto.',
  aside: 'La tierra es real, a partir de datos de elevación modernos, con las alturas multiplicadas por tres para que se vean los montes; la costa es la de hoy, así que los puertos cegados de Éfeso y Mileto quedan ahora tierra adentro. Hechos no dice por qué caminos fueron, así que las rutas por tierra siguen el paso más fácil entre los lugares nombrados, y las de mar el camino más corto por aguas abiertas. Las ciudades y el barco se dibujan mucho más grandes de lo que eran. No se muestran personas.',
};

export const FINALE = {
  title: 'La palabra se difundió',
  ref: '1 Tesalonicenses 1:8',
  quote: {
    nbla: '«Porque saliendo de ustedes, la palabra del Señor se ha escuchado, no solo en Macedonia y Acaya, sino que también por todas partes la fe de ustedes en Dios se ha divulgado, de modo que nosotros no tenemos necesidad de decir nada.»',
    nvi: '«Partiendo de ustedes, el mensaje del Señor se ha proclamado no solo en Macedonia y en Acaya, sino en todo lugar; a tal punto se ha divulgado su fe en Dios que ya no es necesario que nosotros digamos nada.»',
    rvr1960: '«Porque partiendo de vosotros ha sido divulgada la palabra del Señor, no solo en Macedonia y Acaya, sino que también en todo lugar vuestra fe en Dios se ha extendido, de modo que nosotros no tenemos necesidad de hablar nada…»',
    rva: '«Porque de vosotros ha sido divulgada la palabra del Señor no sólo en Macedonia y en Acaya, mas aun en todo lugar vuestra fe en Dios se ha extendido; de modo que no tenemos necesidad de hablar nada.»',
  },
  note: 'Pablo escribió esto desde Corinto, pocos meses después de haber sido expulsado de Tesalónica (1 Tesalonicenses 2:17; 3:1–6). Es probablemente la más antigua de sus cartas que conservamos. Volvería a escribir a las iglesias fundadas en este viaje, en Filipos, Tesalónica y Corinto, y las visitaría de nuevo en su tercer viaje (20:1–3).',
};

export const STOPS = [
  {
    title: 'Pablo escoge a Silas', ref: 'Hechos 15:40',
    quote: {
      nbla: '«…pero Pablo escogió a Silas y partió, siendo encomendado por los hermanos a la gracia del Señor.»',
      nvi: '«…mientras que Pablo escogió a Silas. Después de que los hermanos lo encomendaron a la gracia del Señor, Pablo partió…»',
      rvr1960: '«…y Pablo, escogiendo a Silas, salió encomendado por los hermanos a la gracia del Señor…»',
      rva: '«Y Pablo escogiendo á Silas, partió encomendado de los hermanos á la gracia del Señor.»',
    },
    note: 'Silas (Silvano en las cartas) era uno de los dirigentes de la iglesia de Jerusalén y profeta, enviado a Antioquía con la carta del concilio (15:22, 32). Como Pablo, era ciudadano romano (16:37). Bernabé y Marcos navegaron a Chipre; Hechos no los sigue, aunque Pablo habla después con aprecio de los dos (1 Corintios 9:6; Colosenses 4:10).',
  },
  {
    title: 'Por Siria y Cilicia', ref: 'Hechos 15:41',
    quote: {
      nbla: '«Y viajaba por Siria y Cilicia confirmando a las iglesias.»',
      nvi: '«…y viajó por Siria y Cilicia, consolidando a las iglesias.»',
      rvr1960: '«…y pasó por Siria y Cilicia, confirmando a las iglesias.»',
      rva: '«Y anduvo la Siria y la Cilicia, confirmando á las iglesias.»',
    },
    note: 'El camino iba hacia el norte por los montes Amano, por las Puertas de Siria, rodeaba el fondo del golfo hasta Tarso, la ciudad natal de Pablo (21:39), y subía por las Puertas de Cilicia, el paso a través del Tauro, hasta la meseta. Las iglesias de aquí eran anteriores al primer viaje (15:23; Gálatas 1:21).',
  },
  {
    title: 'Timoteo', ref: 'Hechos 16:1',
    quote: {
      nbla: '«Pablo llegó también a Derbe y a Listra. Y estaba allí cierto discípulo llamado Timoteo, hijo de una mujer judía creyente, pero de padre griego…»',
      nvi: '«Llegó Pablo a Derbe y después a Listra, donde se encontró con un discípulo llamado Timoteo, hijo de una mujer judía creyente, pero de padre griego.»',
      rvr1960: '«Después llegó a Derbe y a Listra; y he aquí, había allí cierto discípulo llamado Timoteo, hijo de una mujer judía creyente, pero de padre griego…»',
      rva: '«…llegó á Derbe, y á Listra: y he aquí, estaba allí un discípulo llamado Timoteo, hijo de una mujer Judía fiel, mas de padre Griego.»',
    },
    note: 'La madre de Timoteo, Eunice, y su abuela Loida eran creyentes (2 Timoteo 1:5), y los hermanos de Listra e Iconio hablaban bien de él (16:2). Pablo lo llevó consigo y, como todos sabían que su padre era griego, lo circuncidó por causa de los judíos de aquellos lugares (16:3). Llegó a ser su colaborador más cercano (Filipenses 2:19–22).',
  },
  {
    title: 'Las iglesias, confirmadas', ref: 'Hechos 16:5',
    quote: {
      nbla: '«Así que las iglesias eran confirmadas en la fe, y diariamente crecían en número.»',
      nvi: '«Y así las iglesias se fortalecían en la fe y crecían en número día tras día.»',
      rvr1960: '«Así que las iglesias eran confirmadas en la fe, y aumentaban en número cada día.»',
      rva: '«Así que, las iglesias eran confirmadas en fe, y eran aumentadas en número cada día.»',
    },
    note: 'De ciudad en ciudad entregaban las decisiones de los apóstoles y los ancianos de Jerusalén (16:4): los creyentes gentiles no tenían que circuncidarse, pero debían abstenerse de lo sacrificado a los ídolos, de sangre, de lo estrangulado y de la inmoralidad sexual (15:28–29).',
  },
  {
    title: 'Sin poder hablar en Asia', ref: 'Hechos 16:6',
    quote: {
      nbla: '«Pasaron por la región de Frigia y Galacia, habiendo sido impedidos por el Espíritu Santo de hablar la palabra en Asia.»',
      nvi: '«Atravesaron la región de Frigia y Galacia, ya que el Espíritu Santo había impedido que predicaran la palabra en la provincia de Asia.»',
      rvr1960: '«Y atravesando Frigia y la provincia de Galacia, les fue prohibido por el Espíritu Santo hablar la palabra en Asia…»',
      rva: '«Y pasando á Phrygia y la provincia de Galacia, les fué prohibido por el Espíritu Santo hablar la palabra en Asia.»',
    },
    note: 'Asia es aquí la provincia romana de la costa del Egeo, cuya ciudad principal era Éfeso. Hechos no dice cómo se lo impidió el Espíritu Santo, ni por dónde fueron. El mapa los lleva hacia el norte por Frigia, en dirección a Bitinia, como sugiere el versículo siguiente.',
  },
  {
    title: 'Bitinia, tampoco', ref: 'Hechos 16:7',
    quote: {
      nbla: '«Cuando llegaron a Misia, intentaron ir a Bitinia, pero el Espíritu de Jesús no se lo permitió.»',
      nvi: '«Cuando llegaron cerca de Misia, intentaron pasar a Bitinia, pero el Espíritu de Jesús no se lo permitió.»',
      rvr1960: '«…y cuando llegaron a Misia, intentaron ir a Bitinia, pero el Espíritu no se lo permitió.»',
      rva: '«Y como vinieron á Misia, tentaron de ir á Bithynia; mas el Espíritu no les dejó.»',
    },
    note: 'Bitinia, junto al mar Negro, era otra provincia con grandes ciudades. Detenidos por segunda vez, siguieron hacia el oeste por Misia sin predicar allí, hasta la costa en Troas (16:8): unos 400 km de camino.',
  },
  {
    title: 'El hombre de Macedonia', ref: 'Hechos 16:9',
    quote: {
      nbla: '«Por la noche se le mostró a Pablo una visión: un hombre de Macedonia estaba de pie, suplicándole: “Pasa a Macedonia y ayúdanos”.»',
      nvi: '«Durante la noche Pablo tuvo una visión en la que un hombre de Macedonia, puesto de pie, rogaba: “Pasa a Macedonia y ayúdanos”.»',
      rvr1960: '«Y se le mostró a Pablo una visión de noche: un varón macedonio estaba en pie, rogándole y diciendo: Pasa a Macedonia y ayúdanos.»',
      rva: '«Y fué mostrada á Pablo de noche una visión: Un varón Macedonio se puso delante, rogándole, y diciendo: Pasa á Macedonia, y ayúdanos.»',
    },
    note: 'Alejandría de Troas era una colonia romana y el puerto para pasar a Macedonia. Desde aquí el relato dice «nosotros» (16:10): el autor, según la tradición Lucas, se ha unido a ellos. Concluyeron que Dios los llamaba a anunciar el evangelio en Macedonia.',
  },
  {
    title: 'Samotracia y Neápolis', ref: 'Hechos 16:11', caption: 'De Asia a Europa',
    quote: {
      nbla: '«Así que, saliendo de Troas, navegamos con rumbo directo a Samotracia, y al día siguiente a Neápolis.»',
      nvi: '«Zarpando de Troas, navegamos directamente a Samotracia y al día siguiente a Neápolis.»',
      rvr1960: '«Zarpando, pues, de Troas, vinimos con rumbo directo a Samotracia, y el día siguiente a Neápolis…»',
      rva: '«Partidos pues de Troas, vinimos camino derecho á Samotracia, y el día siguiente á Neápolis…»',
    },
    note: 'Con viento a favor, la travesía duró dos días, con una noche en la isla de Samotracia; en sentido contrario el viaje duró cinco (20:6). Neápolis, la actual Kavala, era el puerto de Filipos, en la Vía Egnatia, la calzada romana que cruzaba Macedonia.',
  },
  {
    title: 'Lidia', ref: 'Hechos 16:14',
    quote: {
      nbla: '«Y estaba escuchando cierta mujer llamada Lidia, de la ciudad de Tiatira, vendedora de telas de púrpura, que adoraba a Dios; y el Señor abrió su corazón para que recibiera lo que Pablo decía.»',
      nvi: '«Una de ellas, que se llamaba Lidia, adoraba a Dios. Era de la ciudad de Tiatira y vendía telas de color púrpura. Mientras escuchaba, el Señor le abrió el corazón para que respondiera al mensaje de Pablo.»',
      rvr1960: '«Entonces una mujer llamada Lidia, vendedora de púrpura, de la ciudad de Tiatira, que adoraba a Dios, estaba oyendo; y el Señor abrió el corazón de ella para que estuviese atenta a lo que Pablo decía.»',
      rva: '«Entonces una mujer llamada Lidia, que vendía púrpura en la ciudad de Tiatira, temerosa de Dios, estaba oyendo; el corazón de la cual abrió el Señor para que estuviese atenta á lo que Pablo decía.»',
    },
    note: 'Filipos era una colonia romana y una ciudad principal de su distrito (16:12). El sábado salieron por la puerta hasta el río, donde pensaban que había un lugar de oración, y hablaron a las mujeres reunidas allí (16:13). Lidia y su familia fueron bautizadas, y ella los hospedó en su casa (16:15).',
  },
  {
    title: 'El carcelero', ref: 'Hechos 16:31',
    quote: {
      nbla: '«Ellos respondieron: “Cree en el Señor Jesús, y serás salvo, tú y toda tu casa”.»',
      nvi: '«—Cree en el Señor Jesús; así tú y tu familia serán salvos —contestaron.»',
      rvr1960: '«Ellos dijeron: Cree en el Señor Jesucristo, y serás salvo, tú y tu casa.»',
      rva: '«Y ellos dijeron: Cree en el Señor Jesucristo, y serás salvo tú, y tu casa.»',
    },
    note: 'Cuando Pablo expulsó un espíritu de una muchacha esclava, sus amos hicieron azotar con varas a Pablo y a Silas y los metieron en la cárcel. A medianoche estaban orando y cantando himnos cuando un terremoto abrió las puertas (16:16–26). El carcelero, a punto de matarse, preguntó qué debía hacer para ser salvo; él y su familia fueron bautizados esa misma noche (16:27–34).',
  },
  {
    title: 'Tesalónica', ref: 'Hechos 17:2',
    quote: {
      nbla: '«Y Pablo, entró según su costumbre, y por tres días de reposo discutió con ellos basándose en las Escrituras…»',
      nvi: '«Como era su costumbre, Pablo entró en la sinagoga y tres sábados seguidos discutió con ellos. Basándose en las Escrituras…»',
      rvr1960: '«Y Pablo, como acostumbraba, fue a ellos, y por tres días de reposo discutió con ellos…»',
      rva: '«Y Pablo, como acostumbraba, entró á ellos, y por tres sábados disputó con ellos de las Escrituras…»',
    },
    note: 'Tomaron la Vía Egnatia por Anfípolis y Apolonia, unos 140 km, hasta Tesalónica, la capital de la provincia (17:1). Pablo demostraba con las Escrituras que el Cristo tenía que padecer y resucitar (17:3). Algunos creyeron, con muchos griegos temerosos de Dios; otros alborotaron a la gente, y los hermanos enviaron de noche a Pablo y a Silas (17:4–10).',
  },
  {
    title: 'Berea', ref: 'Hechos 17:11',
    quote: {
      nbla: '«Estos eran más nobles que los de Tesalónica, pues recibieron la palabra con toda solicitud, escudriñando diariamente las Escrituras, para ver si estas cosas eran así.»',
      nvi: '«Estos eran de sentimientos más nobles que los de Tesalónica, de modo que estuvieron muy dispuestos a recibir el mensaje y todos los días examinaban las Escrituras para ver si era verdad lo que se les anunciaba.»',
      rvr1960: '«Y estos eran más nobles que los que estaban en Tesalónica, pues recibieron la palabra con toda solicitud, escudriñando cada día las Escrituras para ver si estas cosas eran así.»',
      rva: '«Y fueron estós más nobles que los que estaban en Tesalónica, pues recibieron la palabra con toda solicitud, escudriñando cada día las Escrituras, si estas cosas eran así.»',
    },
    note: 'Berea estaba a unos 70 km al oeste, apartada de la calzada principal. Muchos creyeron allí, entre ellos mujeres griegas distinguidas, y hombres (17:12). Pero vinieron judíos de Tesalónica y alborotaron a la gente, y los hermanos enviaron a Pablo hacia el mar, mientras Silas y Timoteo se quedaban (17:13–14).',
  },
  {
    title: 'Atenas', ref: 'Hechos 17:16',
    quote: {
      nbla: '«Mientras Pablo los esperaba en Atenas, su espíritu se enardecía dentro de él al contemplar la ciudad llena de ídolos.»',
      nvi: '«Mientras Pablo los esperaba en Atenas, le dolió en el alma ver que la ciudad estaba llena de ídolos.»',
      rvr1960: '«Mientras Pablo los esperaba en Atenas, su espíritu se enardecía viendo la ciudad entregada a la idolatría.»',
      rva: '«Y esperándolos Pablo en Atenas, su espíritu se deshacía en él viendo la ciudad dada á idolatría.»',
    },
    note: 'Los que acompañaban a Pablo lo llevaron hasta Atenas (17:15), por mar, según se suele pensar; la ruta rodea Eubea hasta el Pireo, el puerto de Atenas. Atenas ya no era poderosa, pero seguía siendo la ciudad de los filósofos y de templos famosos. Pablo discutía en la sinagoga, y cada día en la plaza con los que estaban allí (17:17).',
  },
  {
    title: 'Al dios desconocido', ref: 'Hechos 17:23',
    quote: {
      nbla: '«Porque mientras pasaba y observaba los objetos de su adoración, hallé también un altar con esta inscripción: “AL DIOS DESCONOCIDO”. Pues lo que ustedes adoran sin conocer, eso les anuncio yo.»',
      nvi: '«Al pasar y fijarme en sus lugares sagrados, encontré incluso un altar con esta inscripción: A UN DIOS DESCONOCIDO. Pues bien, eso que ustedes adoran como algo desconocido es lo que yo les anuncio.»',
      rvr1960: '«…porque pasando y mirando vuestros santuarios, hallé también un altar en el cual estaba esta inscripción: AL DIOS NO CONOCIDO. Al que vosotros adoráis, pues, sin conocerle, es a quien yo os anuncio.»',
      rva: '«Porque pasando y mirando vuestros santuarios, hallé también un altar en el cual estaba esta inscripción: AL DIOS NO CONOCIDO. Aquél pues, que vosotros honráis sin conocerle, á éste os anuncio yo.»',
    },
    note: 'Filósofos epicúreos y estoicos lo llevaron al Areópago, el consejo que se reunía en la colina de Ares, al pie de la Acrópolis, para oír su nueva enseñanza (17:18–22). Habló del Dios que hizo el mundo y no habita en templos hechos por manos, y del hombre al que ha resucitado de los muertos (17:24–31). Algunos creyeron, entre ellos Dionisio, miembro del consejo, y una mujer llamada Dámaris (17:34).',
  },
  {
    title: 'Corinto', ref: 'Hechos 18:9–10',
    quote: {
      nbla: '«Por medio de una visión durante la noche, el Señor dijo a Pablo: “No temas, sigue hablando y no calles; porque Yo estoy contigo, y nadie te atacará para hacerte daño, porque Yo tengo mucha gente en esta ciudad”.»',
      nvi: '«Una noche el Señor dijo a Pablo en una visión: “No tengas miedo; sigue hablando y no te calles, pues estoy contigo. Aunque te ataquen, no voy a dejar que nadie te haga daño, porque tengo mucha gente en esta ciudad”.»',
      rvr1960: '«Entonces el Señor dijo a Pablo en visión de noche: No temas, sino habla, y no calles; porque yo estoy contigo, y ninguno pondrá sobre ti la mano para hacerte mal, porque yo tengo mucho pueblo en esta ciudad.»',
      rva: '«Entonces él Señor dijo de noche en visión á Pablo: No temas, sino habla, y no calles: Porque yo estoy contigo, y ninguno te podrá hacer mal; porque yo tengo mucho pueblo en esta ciudad.»',
    },
    note: 'Corinto, la capital de Acaya, era una activa ciudad romana en el istmo entre dos mares. Pablo se quedó con Aquila y Priscila, judíos expulsados de Roma, y trabajó con ellos haciendo tiendas (18:1–3); llegó, escribiría después, con debilidad y temor (1 Corintios 2:3). Se quedó un año y medio (18:11). Una inscripción fecha el proconsulado de Galión (18:12) hacia los años 51–52 d. C., una de las fechas más seguras de la vida de Pablo.',
  },
  {
    title: { nvi: 'Cencreas', rva: 'Cencreas', default: 'Cencrea' }, ref: 'Hechos 18:18',
    quote: {
      nbla: '«Pablo, después de quedarse muchos días más, se despidió de los hermanos y se embarcó hacia Siria, y con él iban Priscila y Aquila. Y en Cencrea se hizo cortar el cabello, porque tenía hecho un voto.»',
      nvi: '«Pablo permaneció en Corinto algún tiempo más. Después se despidió de los hermanos y emprendió el viaje rumbo a Siria, acompañado de Priscila y Aquila. En Cencreas, antes de embarcarse, se hizo rapar la cabeza a causa de una promesa que había hecho.»',
      rvr1960: '«Mas Pablo, habiéndose detenido aún muchos días allí, después se despidió de los hermanos y navegó a Siria, y con él Priscila y Aquila, habiéndose rapado la cabeza en Cencrea, porque tenía hecho voto.»',
      rva: '«Mas Pablo habiéndose detenido aún allí muchos días, después se despidió de los hermanos, y navegó á Siria, y con él Priscila y Aquila, habiéndose trasquilado la cabeza en Cencreas, porque tenía voto.»',
    },
    note: 'El puerto oriental de Corinto estaba en el golfo Sarónico, frente a Asia. Hechos no dice cuál era el voto de Pablo; cortarse el cabello marcaba su fin, o su comienzo. Más tarde hubo aquí una iglesia, a cuyo servicio estaba Febe (Romanos 16:1).',
  },
  {
    title: { rva: 'Efeso', default: 'Éfeso' }, ref: 'Hechos 18:21',
    quote: {
      nbla: '«…sino que se despidió de ellos, diciendo: “Volveré a ustedes otra vez, si Dios quiere”. Y embarcándose, se fue de Éfeso.»',
      nvi: '«…pero al despedirse les prometió: “Ya volveré, si Dios quiere”. Y zarpó de Éfeso.»',
      rvr1960: '«…sino que se despidió de ellos, diciendo: Es necesario que en todo caso yo guarde en Jerusalén la fiesta que viene; pero otra vez volveré a vosotros, si Dios quiere. Y zarpó de Éfeso.»',
      rva: '«Sino que se despidió de ellos, diciendo: Es menester que en todo caso tenga la fiesta que viene, en Jerusalem; mas otra vez volveré á vosotros, queriendo Dios. Y partió de Efeso.»',
    },
    note: 'De regreso, el barco hizo escala en Éfeso, la ciudad principal de Asia, donde antes no se les había permitido predicar. Pablo habló en la sinagoga, y le pidieron que se quedara más tiempo, pero no quiso (18:19–20). Dejó allí a Priscila y Aquila, y volvió en su tercer viaje (18:26; 19:1). La costa se ha cegado desde entonces; el puerto estaba entonces junto a la ciudad.',
  },
  {
    title: 'De regreso a Antioquía', ref: 'Hechos 18:22',
    quote: {
      nbla: '«Al llegar a Cesarea, subió a Jerusalén para saludar a la iglesia, y luego descendió a Antioquía.»',
      nvi: '«Cuando desembarcó en Cesarea, subió a Jerusalén a saludar a la iglesia y luego bajó a Antioquía.»',
      rvr1960: '«Habiendo arribado a Cesarea, subió para saludar a la iglesia, y luego descendió a Antioquía.»',
      rva: '«Y habiendo arribado á Cesarea subió á Jerusalem; y después de saludar á la iglesia, descendió á Antioquía.»',
    },
    note: 'Cesarea, la ciudad portuaria de Herodes, era el puerto de Jerusalén. «Subió» se entiende por lo general como subir a Jerusalén, y algunas versiones lo dicen así. Hechos no dice cómo siguió Pablo hasta Antioquía; la ruta toma el camino de la costa hacia el norte, por Tolemaida, Tiro y Sidón.',
  },
];
