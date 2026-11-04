// Spanish text for this journey, merged over data.js (see addLanguage in ../../i18n.js).
// Same shape as data.js, text fields only; STOPS line up by position. Quotations are
// verbatim, including the RVA’s 1909 spelling; where the RVA opens a chapter in
// capitals, the quotation starts after them.

// Words that differ between versions: {term} in any text field.
export const TERMS = {
  cauda: { nvi: 'Cauda', default: 'Clauda' },
  centurion: 'centurión',
};

export const PLACES = {
  caesarea: { name: 'Cesarea' },
  sidon: { name: 'Sidón' },
  myra: { name: 'Mira' },
  cnidus: { name: 'Gnido' },
  fairHavens: { name: 'Buenos Puertos' },
  malta: { name: 'Malta' },
  syracuse: { name: 'Siracusa' },
  rhegium: { name: 'Regio' },
  puteoli: { name: { nvi: 'Poteoli', rva: 'Puteolos', default: 'Puteoli' } },
  forum: { name: { rva: 'Plaza de Appio', default: 'Foro de Apio' } },
  taverns: { name: 'Tres Tabernas' },
  rome: { name: 'Roma' },
};

export const FEATURES = {
  lasea: { name: 'Lasea' },
  phoenix: { name: { nvi: 'Fenice', default: 'Fenice' } },
  salmone: { name: { nvi: 'Salmona', default: 'Salmón' } },
  cauda: { name: '{Cauda}' },
  cyprus: { name: 'Chipre' },
  cilicia: { name: 'Cilicia' },
  pamphylia: { name: 'Panfilia' },
  lycia: { name: 'Licia' },
  crete: { name: 'Creta' },
  achaia: { name: 'Acaya' },
  sicily: { name: 'Sicilia' },
  italy: { name: 'Italia' },
  phoenicia: { name: 'Fenicia' },
  adria: { name: 'Mar Adriático' },
  syrtis: { name: 'Sirte' },
  sea: { name: 'Mar Mediterráneo' },
};

export const INTRO = {
  title: 'Testificar también en Roma',
  ref: 'Hechos 23:11',
  quote: {
    nbla: '«A la noche siguiente el Señor se le apareció a Pablo y le dijo: “Ten ánimo, porque como has testificado fielmente de Mi causa en Jerusalén, así has de testificar también en Roma”.»',
    nvi: '«A la noche siguiente, el Señor se apareció a Pablo y le dijo: “¡Ánimo! Así como has dado testimonio de mí en Jerusalén, es necesario que lo des también en Roma”.»',
    rvr1960: '«A la noche siguiente se le presentó el Señor y le dijo: Ten ánimo, Pablo, pues como has testificado de mí en Jerusalén, así es necesario que testifiques también en Roma.»',
    rva: '«Y la noche siguiente, presentándosele el Señor, le dijo: Confía, Pablo; que como has testificado de mí en Jerusalem, así es menester testifiques también en Roma.»',
  },
  note: 'Pablo había sido apresado en el templo de Jerusalén (21:27–36). El Señor le habló en la fortaleza la noche después de comparecer ante el concilio. Fue llevado a Cesarea, retenido allí dos años bajo los gobernadores Félix y Festo, y, como ciudadano romano, apeló al César (24:27; 25:11–12). Así fue a Roma, preso, hacia los años 59–60 d. C. Lucas iba con él, y su relato del viaje es uno de los testimonios más detallados de la navegación antigua.',
  aside: 'La tierra es real, a partir de datos de elevación modernos, con las alturas multiplicadas por tres para que se vean los montes; la costa es la de hoy. Lucas, que navegó con Pablo, da los puertos y las islas, pero no los rumbos entre ellos, así que las rutas por mar siguen el camino más corto por aguas abiertas junto a los lugares que nombra, y la deriva de Clauda a Malta se dibuja recta. Las ciudades y el barco se dibujan mucho más grandes de lo que eran. No se muestran personas.',
};

export const FINALE = {
  title: 'Sin impedimento',
  ref: 'Hechos 28:31',
  quote: {
    nbla: '«…predicando el reino de Dios y enseñando todo lo concerniente al Señor Jesucristo con toda libertad, sin estorbo.»',
    nvi: '«Predicaba el reino de Dios y enseñaba acerca del Señor Jesucristo sin impedimento y sin temor alguno.»',
    rvr1960: '«…predicando el reino de Dios y enseñando acerca del Señor Jesucristo, abiertamente y sin impedimento.»',
    rva: '«Predicando el reino de Dios y enseñando lo que es del Señor Jesucristo con toda libertad, sin impedimento.»',
  },
  note: 'Hechos termina con Pablo dos años enteros en Roma, en una casa alquilada, recibiendo a todos los que acudían a él (28:30). Desde allí, según muchos, escribió a los filipenses que su prisión había servido para el progreso del evangelio, de modo que toda la guardia pretoriana sabía que estaba preso por Cristo (Filipenses 1:12–13). El libro se detiene ahí; no cuenta cómo terminó su juicio.',
};

export const STOPS = [
  {
    title: 'Rumbo a Italia', ref: 'Hechos 27:1',
    quote: {
      nbla: '«Cuando se decidió que deberíamos embarcarnos para Italia, fueron entregados Pablo y algunos otros presos a un centurión de la compañía Augusta, llamado Julio.»',
      nvi: '«Cuando se decidió que navegáramos rumbo a Italia, entregaron a Pablo y a algunos otros presos a un centurión llamado Julio, quien pertenecía al batallón imperial.»',
      rvr1960: '«Cuando se decidió que habíamos de navegar para Italia, entregaron a Pablo y a algunos otros presos a un centurión llamado Julio, de la compañía Augusta.»',
      rva: '«…como fué determinado que habíamos de navegar para Italia, entregaron á Pablo y algunos otros presos á un centurión, llamado Julio, de la compañía Augusta.»',
    },
    note: 'El relato vuelve a decir «nosotros»: Lucas navegó con Pablo, y también Aristarco de Tesalónica (27:2). Subieron a una nave de Adramitio, un puerto cerca de Troas, que iba a navegar por la costa de Asia. Cesarea, la ciudad portuaria de Herodes, era la sede del gobernador romano de Judea.',
  },
  {
    title: 'Sidón', ref: 'Hechos 27:3',
    quote: {
      nbla: '«Al día siguiente llegamos a Sidón. Julio trató con benevolencia a Pablo, permitiéndole ir a sus amigos y ser atendido por ellos.»',
      nvi: '«Al día siguiente, hicimos escala en Sidón, y Julio, con mucha amabilidad, permitió a Pablo visitar a sus amigos para que lo atendieran.»',
      rvr1960: '«Al otro día llegamos a Sidón; y Julio, tratando humanamente a Pablo, le permitió que fuese a los amigos, para ser atendido por ellos.»',
      rva: '«Y otro día llegamos á Sidón; y Julio, tratando á Pablo con humanidad, permitióle que fuese á los amigos, para ser de ellos asistido.»',
    },
    note: 'Sidón, a unos 110 km costa arriba, era un antiguo puerto fenicio con creyentes, quizá desde la dispersión que siguió a la muerte de Esteban (11:19). El {centurion} Julio, que más tarde le salvaría la vida a Pablo (27:43), le permitió bajar a tierra a ver a sus amigos.',
  },
  {
    title: 'Al abrigo de Chipre', ref: 'Hechos 27:4',
    quote: {
      nbla: '«De allí partimos y navegamos al amparo de la isla de Chipre, porque los vientos eran contrarios.»',
      nvi: '«Desde Sidón zarpamos y navegamos al abrigo de Chipre, porque los vientos nos eran contrarios.»',
      rvr1960: '«Y haciéndonos a la vela desde allí, navegamos a sotavento de Chipre, porque los vientos eran contrarios.»',
      rva: '«Y haciéndonos á la vela desde allí, navegamos bajo de Cipro, porque los vientos eran contrarios.»',
    },
    note: 'Los vientos de verano soplan del oeste y del noroeste. Por eso la nave se mantuvo al este y al norte de Chipre, al abrigo de la isla, y luego avanzó hacia el oeste por la costa de Cilicia y Panfilia, donde ayudaban las brisas de tierra y las corrientes (27:5). La ruta dibujada es una suposición de ese tipo.',
  },
  {
    title: 'Una nave alejandrina', ref: 'Hechos 27:6',
    quote: {
      nbla: '«Allí el centurión halló una nave alejandrina que iba para Italia, y nos embarcó en ella.»',
      nvi: '«Allí el centurión encontró un barco de Alejandría que iba para Italia, y nos hizo subir a bordo.»',
      rvr1960: '«Y hallando allí el centurión una nave alejandrina que zarpaba para Italia, nos embarcó en ella.»',
      rva: '«Y hallando allí el centurión una nave Alejandrina que navegaba á Italia, nos puso en ella.»',
    },
    note: 'Mira, en Licia, era un puerto de la ruta del trigo de Egipto a Roma; con los vientos del oeste, las naves de Alejandría subían hasta la costa de Asia antes de girar al oeste. Esta llevaba trigo (27:38) y 276 personas (27:37). Las naves de la flota del trigo eran grandes: una descrita en el siglo II medía unos 55 m.',
  },
  {
    title: 'Frente a Gnido', ref: 'Hechos 27:7',
    quote: {
      nbla: '«Después de navegar lentamente por muchos días, y de llegar con dificultad frente a Gnido, pues el viento no nos permitió avanzar más, navegamos al amparo de la isla de Creta, frente a Salmón.»',
      nvi: '«Durante muchos días la navegación fue lenta y a duras penas llegamos frente a Gnido. Como el viento nos era desfavorable para seguir el rumbo trazado, navegamos al amparo de Creta, frente a Salmona.»',
      rvr1960: '«Navegando muchos días despacio, y llegando a duras penas frente a Gnido, porque nos impedía el viento, navegamos a sotavento de Creta, frente a Salmón.»',
      rva: '«Y navegando muchos días despacio, y habiendo apenas llegado delante de Gnido, no dejándonos el viento, navegamos bajo de Creta, junto á Salmón.»',
    },
    note: 'Gnido estaba al final de una larga península, el último abrigo antes del Egeo abierto. Con el viento en contra no podían mantener el rumbo a Italia, así que giraron al sur y bajaron por el extremo oriental de Creta, doblando el cabo Salmón, hasta el abrigo de su costa sur.',
  },
  {
    title: 'Buenos Puertos', ref: 'Hechos 27:8',
    quote: {
      nbla: '«Costeándola con dificultad, llegamos a un lugar llamado Buenos Puertos, cerca del cual estaba la ciudad de Lasea.»',
      nvi: '«Seguimos con dificultad a lo largo de la costa y llegamos a un lugar llamado Buenos Puertos, cerca de la ciudad de Lasea.»',
      rvr1960: '«Y costeándola con dificultad, llegamos a un lugar que llaman Buenos Puertos, cerca del cual estaba la ciudad de Lasea.»',
      rva: '«Y costeándola difícilmente, llegamos á un lugar que llaman Buenos Puertos, cerca del cual estaba la ciudad de Lasea.»',
    },
    note: 'Buenos Puertos se sigue llamando Kaloi Limenes, una pequeña bahía en la costa sur de Creta; unas ruinas cercanas se identifican con Lasea. Se había perdido mucho tiempo, y el Ayuno, el día de la expiación a finales de septiembre u octubre, ya había pasado (27:9). Navegar era peligroso desde mediados de septiembre, y en invierno se dejaba del todo.',
  },
  {
    title: 'La advertencia de Pablo', ref: 'Hechos 27:10',
    quote: {
      nbla: '«…diciéndoles: “Amigos, veo que de seguro este viaje va a ser con perjuicio y graves pérdidas, no solo del cargamento y de la nave, sino también de nuestras vidas”.»',
      nvi: '«“Señores, veo que nuestro viaje va a ser desastroso y que va a causar mucho perjuicio tanto para el barco y su carga como para nuestras propias vidas”.»',
      rvr1960: '«…diciéndoles: Varones, veo que la navegación va a ser con perjuicio y mucha pérdida, no solo del cargamento y de la nave, sino también de nuestras personas.»',
      rva: '«Diciéndoles: Varones, veo que con trabajo y mucho daño, no sólo de la cargazón y de la nave, mas aun de nuestras personas, habrá de ser la navegación.»',
    },
    note: 'El {centurion} hizo más caso al piloto y al dueño de la nave que a Pablo. Buenos Puertos no era un puerto adecuado para invernar, así que la mayoría decidió intentar llegar a Fenice, un puerto de Creta a unos 65 km al oeste, que mira al suroeste y al noroeste, y pasar allí el invierno (27:11–12).',
  },
  {
    title: 'Euroclidón', ref: 'Hechos 27:14',
    quote: {
      nbla: '«Pero no mucho después, desde tierra comenzó a soplar un viento huracanado que se llama Euroclidón…»',
      nvi: '«Poco después se nos vino encima un viento huracanado, llamado Nordeste, que venía desde la isla.»',
      rvr1960: '«Pero no mucho después dio contra la nave un viento huracanado llamado Euroclidón.»',
      rva: '«Mas no mucho después dió en ella un viento repentino, que se llama Euroclidón.»',
    },
    note: 'Un viento suave del sur los había animado a salir, navegando muy cerca de la costa (27:13). Entonces el viento bajó de los montes de Creta desde el nordeste. La nave no podía hacerle frente, así que cedieron y se dejaron llevar (27:15).',
  },
  {
    title: '{Cauda}', ref: 'Hechos 27:16',
    quote: {
      nbla: '«Navegando al amparo de una pequeña isla llamada Clauda, con mucha dificultad pudimos sujetar el bote salvavidas.»',
      nvi: '«Mientras pasábamos al abrigo de un islote llamado Cauda, a duras penas pudimos sujetar el bote salvavidas.»',
      rvr1960: '«Y habiendo corrido a sotavento de una pequeña isla llamada Clauda, con dificultad pudimos recoger el esquife.»',
      rva: '«Y habiendo corrido á sotavento de una pequeña isla que se llama Clauda, apenas pudimos ganar el esquife…»',
    },
    note: 'Al abrigo de la isla, a unos 40 km al suroeste, subieron el bote y pasaron cables alrededor del casco para reforzarlo. Temiendo encallar en la Sirte, los bancos de arena frente a África, arriaron el aparejo y se dejaron llevar (27:17). Los días siguientes echaron al mar la carga, y luego los aparejos de la nave (27:18–19).',
  },
  {
    title: 'Perdida toda esperanza', ref: 'Hechos 27:20',
    quote: {
      nbla: '«Como ni el sol ni las estrellas aparecieron por muchos días, y una tempestad no pequeña se abatía sobre nosotros, desde entonces fuimos abandonando toda esperanza de salvarnos.»',
      nvi: '«Como pasaron muchos días sin que aparecieran ni el sol ni las estrellas, y la tempestad seguía azotándonos, perdimos al fin toda esperanza de salvarnos.»',
      rvr1960: '«Y no apareciendo ni sol ni estrellas por muchos días, y acosados por una tempestad no pequeña, ya habíamos perdido toda esperanza de salvarnos.»',
      rva: '«Y no pareciendo sol ni estrellas por muchos días, y viniendo una tempestad no pequeña, ya era perdida toda la esperanza de nuestra salud.»',
    },
    note: 'Sin sol ni estrellas, una nave no podía saber dónde estaba. La deriva de Clauda a Malta es de unos 870 km; a la velocidad que calculan los marinos modernos para una nave al pairo en un temporal, eso lleva unos trece días, lo que concuerda con las catorce noches de 27:27. La ruta se dibuja como una deriva recta.',
  },
  {
    title: 'No temas, Pablo', ref: 'Hechos 27:23–24',
    quote: {
      nbla: '«Porque esta noche estuvo en mi presencia un ángel del Dios de quien soy y a quien sirvo, diciendo: “No temas, Pablo; has de comparecer ante César; pero ahora, Dios te ha concedido todos los que navegan contigo”.»',
      nvi: '«Anoche se me apareció un ángel del Dios a quien pertenezco y sirvo, y me dijo: “No tengas miedo, Pablo. Tienes que comparecer ante el césar y Dios te ha concedido la vida de todos los que navegan contigo”.»',
      rvr1960: '«Porque esta noche ha estado conmigo el ángel del Dios de quien soy y a quien sirvo, diciendo: Pablo, no temas; es necesario que comparezcas ante César; y he aquí, Dios te ha concedido todos los que navegan contigo.»',
      rva: '«Porque esta noche ha estado conmigo el ángel del Dios del cual yo soy, y al cual sirvo, Diciendo: Pablo, no temas; es menester que seas presentado delante de César; y he aquí, Dios te ha dado todos los que navegan contigo.»',
    },
    note: 'Después de haber pasado mucho tiempo sin comer, Pablo se puso en pie en medio de ellos. Les recordó que debían haberle hecho caso en Creta, pero les pidió que tuvieran ánimo: nadie perdería la vida, solo la nave, y tendrían que encallar en alguna isla (27:21–26).',
  },
  {
    title: 'La decimocuarta noche', ref: 'Hechos 27:27',
    quote: {
      nbla: '«Llegada la decimocuarta noche, mientras éramos llevados a la deriva en el mar Adriático, a eso de la medianoche los marineros presentían que se estaban acercando a tierra.»',
      nvi: '«Ya habíamos pasado catorce noches a la deriva por el mar Adriático cuando a eso de la medianoche los marineros presintieron que se aproximaban a tierra.»',
      rvr1960: '«Venida la decimacuarta noche, y siendo llevados a través del mar Adriático, a la medianoche los marineros sospecharon que estaban cerca de tierra…»',
      rva: '«Y venida la décimacuarta noche, y siendo llevados por el mar Adriático, los marineros á la media noche sospecharon que estaban cerca de alguna tierra…»',
    },
    note: 'El mar Adriático, o Adria, designaba entonces todo el mar entre Grecia, Italia y África. Al sondear, los marineros hallaron veinte brazas, luego quince; echaron cuatro anclas por la popa y ansiaban que llegara el día (27:28–29). Pablo animó a todos a comer, dio gracias por el pan delante de todos y lo partió; luego aligeraron la nave echando el trigo al mar (27:33–38).',
  },
  {
    title: 'El naufragio', ref: 'Hechos 27:44',
    quote: {
      nbla: '«…y que los demás siguieran, algunos en tablones, y otros en diferentes objetos de la nave. Y así sucedió que todos llegaron salvos a tierra.»',
      nvi: '«…y de que los demás salieran valiéndose de tablas o de restos del barco. De esta manera todos llegamos sanos y salvos a tierra.»',
      rvr1960: '«…y los demás, parte en tablas, parte en cosas de la nave. Y así aconteció que todos se salvaron saliendo a tierra.»',
      rva: '«Y los demás, parte en tablas, parte en cosas de la nave. Y así aconteció que todos se salvaron saliendo á tierra.»',
    },
    note: 'Al amanecer vieron una bahía con playa e intentaron varar allí la nave, pero dio en un lugar donde se juntaban dos mares, un arrecife o banco de arena, y quedó encallada; la popa se deshacía con la fuerza de las olas (27:39–41). Los soldados querían matar a los presos, pero el {centurion}, queriendo salvar a Pablo, se lo impidió (27:42–43). La bahía de San Pablo, al norte de Malta, es el lugar tradicional.',
  },
  {
    title: 'Malta', ref: 'Hechos 28:2',
    quote: {
      nbla: '«Los habitantes de la isla nos mostraron toda clase de atenciones, porque a causa de la lluvia que caía y del frío, encendieron una hoguera y nos acogieron a todos.»',
      nvi: '«Los isleños nos trataron con extraordinaria bondad. Encendieron una fogata y nos invitaron a acercarnos, porque estaba lloviendo y hacía frío.»',
      rvr1960: '«Y los naturales nos trataron con no poca humanidad; porque encendiendo un fuego, nos recibieron a todos, a causa de la lluvia que caía, y del frío.»',
      rva: '«Y los bárbaros nos mostraron no poca humanidad; porque, encendido un fuego, nos recibieron á todos, á causa de la lluvia que venía, y del frío.»',
    },
    note: 'Una víbora se prendió de la mano de Pablo cuando echaba ramas al fuego; él la sacudió y no sufrió ningún daño, y la gente decidió que era un dios (28:3–6). Publio, el hombre principal de la isla, los hospedó tres días. Pablo sanó a su padre, y luego vinieron los demás enfermos de la isla y fueron curados (28:7–9). Se quedaron tres meses, todo el invierno.',
  },
  {
    title: 'Siracusa', ref: 'Hechos 28:11',
    quote: {
      nbla: '«Después de tres meses, nos hicimos a la vela en una nave alejandrina que había invernado en la isla, y que tenía por insignia a los Hermanos Gemelos.»',
      nvi: '«Al cabo de tres meses en la isla, zarpamos en un barco que había invernado allí. Era una nave de Alejandría que tenía por insignia a los dioses Dióscuros.»',
      rvr1960: '«Pasados tres meses, nos hicimos a la vela en una nave alejandrina que había invernado en la isla, la cual tenía por enseña a Cástor y Pólux.»',
      rva: '«Así que, pasados tres meses, navegamos en una nave Alejandrina que había invernado en la isla, la cual tenía por enseña á Cástor y Pólux.»',
    },
    note: 'Los Hermanos Gemelos son Cástor y Pólux, hijos de Zeus y protectores de los marineros, tallados o pintados en la proa. Volvieron a navegar al abrirse la temporada en primavera, unos 150 km hasta Siracusa, la ciudad principal de Sicilia, y se quedaron tres días (28:12).',
  },
  {
    title: { nvi: 'Regio y Poteoli', rva: 'Regio y Puteolos', default: 'Regio y Puteoli' }, ref: 'Hechos 28:13',
    quote: {
      nbla: '«Saliendo de allí, seguimos la costa hasta llegar a Regio. Al día siguiente se levantó un viento del sur y en dos días llegamos a Puteoli.»',
      nvi: '«Desde allí navegamos bordeando la costa y llegamos a Regio. Al día siguiente se levantó el viento del sur y al segundo día llegamos a Poteoli.»',
      rvr1960: '«De allí, costeando alrededor, llegamos a Regio; y otro día después, soplando el viento sur, llegamos al segundo día a Puteoli…»',
      rva: '«De allí, costeando alrededor, vinimos á Regio; y otro día después, soplando el austro, vinimos al segundo día á Puteolos…»',
    },
    note: 'Regio, en la punta de Italia, guardaba el estrecho de Mesina. Con el viento del sur a favor recorrieron en dos días los 350 km hasta Puteoli, en la bahía de Nápoles. Puteoli era el gran puerto donde las naves del trigo de Alejandría descargaban para Roma. Allí encontraron hermanos y se quedaron siete días (28:14).',
  },
  {
    title: { rva: 'La plaza de Appio', default: 'El Foro de Apio' }, ref: 'Hechos 28:15',
    quote: {
      nbla: '«Al tener noticia de nuestra llegada, los hermanos vinieron desde allá a recibirnos hasta el Foro de Apio y Las Tres Tabernas; y cuando Pablo los vio, dio gracias a Dios y cobró ánimo.»',
      nvi: '«Los hermanos de Roma, habiéndose enterado de nuestra situación, salieron hasta el Foro de Apio y Tres Tabernas a recibirnos. Al verlos, Pablo dio gracias a Dios y cobró ánimo.»',
      rvr1960: '«…de donde, oyendo de nosotros los hermanos, salieron a recibirnos hasta el Foro de Apio y las Tres Tabernas; y al verlos, Pablo dio gracias a Dios y cobró aliento.»',
      rva: '«De donde, oyendo de nosotros los hermanos, nos salieron á recibir hasta la plaza de Appio, y Las Tres Tabernas: á los cuales como Pablo vió, dió gracias á Dios, y tomó aliento.»',
    },
    note: 'Desde Puteoli siguieron a pie por la Vía Apia, la más antigua de las grandes calzadas romanas. El Foro de Apio, un pueblo de mercado a unos 70 km de Roma, y las Tres Tabernas, a unos 50 km, es donde dos grupos de hermanos salieron a su encuentro. Pablo había escrito a la iglesia de Roma tres años antes, con deseos de verlos (Romanos 1:11; 15:23).',
  },
  {
    title: 'Roma', ref: 'Hechos 28:16',
    quote: {
      nbla: '«Cuando entramos en Roma, el centurión entregó los presos al prefecto militar, pero a Pablo se le permitió vivir aparte, con el soldado que lo custodiaba.»',
      nvi: '«Cuando llegamos a Roma, a Pablo se le permitió tener su domicilio particular, con un soldado que lo custodiara.»',
      rvr1960: '«Cuando llegamos a Roma, el centurión entregó los presos al prefecto militar, pero a Pablo se le permitió vivir aparte, con un soldado que le custodiase.»',
      rva: '«Y como llegamos á Roma, el centurión entregó los presos al prefecto de los ejércitos, mas á Pablo fué permitido estar por sí, con un soldado que le guardase.»',
    },
    note: 'Roma tenía quizá un millón de habitantes, con mucho la mayor ciudad del imperio. Pablo estaba bajo custodia, pero en su propio alojamiento. Tres días después convocó a los dirigentes de los judíos y les explicó por qué había venido: estaba encadenado por la esperanza de Israel (28:17–20). Unos creyeron y otros no (28:24).',
  },
];
