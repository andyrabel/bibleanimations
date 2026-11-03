// Spanish text for "The Day of Atonement", merged over data.js (see addLanguage in ../../i18n.js).
// Same shape as data.js, text fields only. Version keys are the Spanish versions
// (nbla, nvi, rvr1960, rva); `default` covers the ones not listed. STOPS line up
// with data.js by position.
//
// Quotations are verbatim, including each version's own spelling (the RVA keeps
// its 1909 spelling: "á", "meterálo", "fué").

// Words that differ between versions. Spanish nouns carry gender, so where a
// note needs an article the term includes it ({theSash}: el cinturón / la
// faja), and the notes avoid adjectives that would have to agree.
export const TERMS = {
  tunic: 'túnica',
  theTunic: 'la túnica',
  theUndergarments: { nbla: 'los calzoncillos de lino', nvi: 'la ropa interior de lino', rvr1960: 'los calzoncillos de lino', rva: 'los pañetes de lino' },
  theSash: { nbla: 'el cinturón', nvi: 'la faja', default: 'el cinto' },
  theTurban: { nbla: 'la tiara', nvi: 'el turbante', default: 'la mitra' },
  laver: { nbla: 'pila', nvi: 'recipiente de bronce', default: 'fuente' },
  theLaver: { nbla: 'la pila de bronce', nvi: 'el recipiente de bronce', default: 'la fuente de bronce' },
  theTent: { nbla: 'la tienda de reunión', nvi: 'la Tienda de reunión', rvr1960: 'el tabernáculo de reunión', rva: 'el tabernáculo del testimonio' },
  ofTheTent: { nbla: 'de la tienda de reunión', nvi: 'de la Tienda de reunión', rvr1960: 'del tabernáculo de reunión', rva: 'del tabernáculo del testimonio' },
  veil: { nvi: 'cortina', default: 'velo' },
  ofTheVeil: { nvi: 'de la cortina', default: 'del velo' },
  cover: { nvi: 'tapa del arca', rva: 'cubierta', default: 'propiciatorio' },
  theCover: { nvi: 'la tapa del arca', rva: 'la cubierta', default: 'el propiciatorio' },
  ofTheCover: { nvi: 'de la tapa del arca', rva: 'de la cubierta', default: 'del propiciatorio' },
  bull: { nbla: 'novillo', nvi: 'novillo', default: 'becerro' },
  theBull: { nbla: 'el novillo', nvi: 'el novillo', default: 'el becerro' },
  ofTheBull: { nbla: 'del novillo', nvi: 'del novillo', default: 'del becerro' },
  firepan: 'incensario',
  household: { nvi: 'familia', default: 'casa' },
  blue: { rva: 'cárdeno', default: 'azul' },
  colours: { nbla: 'azul, púrpura y escarlata', nvi: 'azul, carmesí y escarlata', rvr1960: 'azul, púrpura y carmesí', rva: 'cárdeno, púrpura y carmesí' },
  ephod: { rva: 'ephod', default: 'efod' },
  theLiveGoat: { nbla: 'el macho cabrío expiatorio', nvi: 'el macho cabrío que se suelta en el desierto', default: 'el macho cabrío por Azazel' },
  manReady: { nbla: 'un hombre preparado para esto', nvi: 'un hombre designado para esto', default: 'un hombre destinado para esto' },
  bathePlace: { nbla: 'en un lugar sagrado', nvi: 'en un lugar santo', default: 'en el lugar del santuario' },
  glory: { nbla: 'para gloria y hermosura', nvi: 'que le confieran honra y dignidad', default: 'para honra y hermosura' },
  humble: { nbla: 'humillar sus almas', nvi: 'ayunar y humillarse', default: 'afligir sus almas' },
  onceAYear: { nbla: 'una vez cada año', rva: 'una vez en el año', default: 'una vez al año' },
  theLord: { rvr1960: 'Jehová', rva: 'Jehová', default: 'el Señor' },
  ofTheLord: { rvr1960: 'de Jehová', rva: 'de Jehová', default: 'del Señor' },
};

export const ATONE = {
  self: 'Aarón y su {household}',
  sanctuary: { nbla: 'El lugar santo', default: 'El santuario' },
  tent: '{TheTent}',
  altar: 'El altar',
  people: 'El pueblo',
};

export const WEARING = {
  linen: 'Las vestiduras sagradas de lino: {theTunic}, {theUndergarments}, {theSash} y {theTurban} (16:4)',
  glory: 'Las vestiduras del sumo sacerdote (16:24; Éxodo 28)',
};

export const LABELS = {
  aaron: { name: 'Aarón' },
  man: { name: { nbla: 'El hombre preparado', nvi: 'El hombre designado', default: 'El hombre destinado' } },
  bull: { name: '{Bull}' },
  ramA: { name: 'El carnero de Aarón' },
  ramP: { name: 'El carnero del pueblo' },
  goatL: { name: 'Macho cabrío', after: { name: { nvi: 'Macho cabrío para el Señor', rvr1960: 'Macho cabrío por Jehová', rva: 'Macho cabrío por Jehová', default: 'Macho cabrío por el Señor' } } },
  goatS: { name: 'Macho cabrío', after: { name: { nbla: 'Macho cabrío expiatorio', nvi: 'Macho cabrío para soltar', default: 'Macho cabrío por Azazel' } } },
  laver: { name: '{Laver}' },
  altar: { name: 'Altar' },
  cover: { name: '{Cover}' },
  veil: { name: '{Veil}' },
  firepan: { name: 'Incensario' },
  outside: { name: { rva: 'Fuera del real', default: 'Fuera del campamento' } },
  wilderness: { name: 'El desierto' },
};

export const INTRO = {
  title: 'El día de la expiación',
  ref: 'Levítico 16:2',
  quote: {
    nbla: '«Dile a tu hermano Aarón que no entre en cualquier tiempo en el lugar santo detrás del velo, delante del propiciatorio que está sobre el arca, no sea que muera; porque Yo apareceré en la nube sobre el propiciatorio».',
    nvi: '«Dile a tu hermano Aarón que no entre a cualquier hora en la parte del santuario que está detrás de la cortina, es decir, delante de la tapa que está sobre el arca, no sea que muera cuando yo aparezca en la nube por encima de la tapa del arca».',
    rvr1960: '«Di a Aarón tu hermano, que no en todo tiempo entre en el santuario detrás del velo, delante del propiciatorio que está sobre el arca, para que no muera; porque yo apareceré en la nube sobre el propiciatorio».',
    rva: '«Di á Aarón tu hermano, que no en todo tiempo entre en el santuario del velo adentro, delante de la cubierta que está sobre el arca, para que no muera: porque yo apareceré en la nube sobre la cubierta».',
  },
  note: 'Después de que Nadab y Abiú, hijos de Aarón, murieron por ofrecer un fuego que {theLord} no había mandado (16:1; 10:1–2), {theLord} dijo a Moisés cómo podía Aarón entrar detrás {ofTheVeil} y vivir. Una vez al año, el día diez del mes séptimo (16:29, 34), el sumo sacerdote hacía expiación por sí mismo y por su {household}, por el santuario, {theTent} y el altar, y por todo el pueblo. Este recorrido sigue Levítico 16 paso a paso.',
  aside: 'Las medidas están en codos (1 codo ≈ 45 cm), y el tabernáculo está como en las otras animaciones. Levítico 16 da el orden pero no todos los detalles, como dónde se bañó Aarón, qué eran las suertes o cómo se llevaba la sangre; las notas indican dónde algo es una suposición. No se muestra el degüello de los animales: se echan en el suelo.',
};

export const FINALE = {
  title: 'Una vez al año',
  ref: 'Levítico 16:30',
  quote: {
    nbla: '«Porque en este día se hará expiación por ustedes para que sean limpios; serán limpios de todos sus pecados delante del Señor».',
    nvi: '«En dicho día se pedirá el perdón de sus pecados, y delante del Señor serán purificados de todos sus pecados».',
    rvr1960: '«Porque en este día se hará expiación por vosotros, y seréis limpios de todos vuestros pecados delante de Jehová».',
    rva: '«Porque en este día se os reconciliará para limpiaros; y seréis limpios de todos vuestros pecados delante de Jehová».',
  },
  note: 'Cada año, el día diez del mes séptimo, todo Israel, tanto el nativo como el extranjero, debía {humble} y no hacer ningún trabajo: un día de descanso solemne (16:29–31). Los sacerdotes ungidos después de Aarón harían lo mismo con las vestiduras de lino (16:32–33), {onceAYear} (16:34). Hebreos 9 recuerda este día, cuando solo el sumo sacerdote entraba en el lugar interior, una vez al año y no sin sangre (9:7).',
};

export const STOPS = [
  {
    title: { rvr1960: 'Las santas vestiduras de lino', rva: 'Las santas vestiduras de lino', default: 'Las vestiduras sagradas de lino' },
    ref: 'Levítico 16:4',
    quote: {
      nbla: '«Se vestirá con la túnica sagrada de lino, y los calzoncillos de lino estarán sobre su cuerpo, y se ceñirá con el cinturón de lino y se cubrirá con la tiara de lino (estas son vestiduras sagradas). Lavará, pues, su cuerpo con agua y se vestirá con ellas».',
      nvi: '«Se pondrá la túnica sagrada y la ropa interior de tela de lino. Se ceñirá con la faja de lino y se pondrá el turbante de lino. Estas son las vestiduras sagradas que se pondrá después de haberse bañado con agua».',
      rvr1960: '«Se vestirá la túnica santa de lino, y sobre su cuerpo tendrá calzoncillos de lino, y se ceñirá el cinto de lino, y con la mitra de lino se cubrirá. Son las santas vestiduras; con ellas se ha de vestir después de lavar su cuerpo con agua».',
      rva: '«La túnica santa de lino se vestirá, y sobre su carne tendrá pañetes de lino, y ceñiráse el cinto de lino; y con la mitra de lino se cubrirá: son las santas vestiduras: con ellas, después de lavar su carne con agua, se ha de vestir».',
    },
    note: 'En este día Aarón no lleva sus vestiduras de oro, {colours}, sino lino sencillo: {theTunic} sobre {theUndergarments}, {theSash} y {theTurban} (16:4). Se baña antes de ponérselas. El texto no dice dónde ni cómo; aquí se echa agua encima junto a {theLaver}, donde se lavaban los sacerdotes (Éxodo 30:18–21).',
    where: 'Junto a {theLaver}',
  },
  {
    title: 'Las ofrendas', ref: 'Levítico 16:5',
    quote: {
      nbla: '«Aarón tomará de la congregación de los israelitas dos machos cabríos para ofrenda por el pecado y un carnero para holocausto».',
      nvi: '«De la comunidad de los israelitas, Aarón tomará dos machos cabríos para el sacrificio por el perdón y un carnero para el holocausto».',
      rvr1960: '«Y de la congregación de los hijos de Israel tomará dos machos cabríos para expiación, y un carnero para holocausto».',
      rva: '«Y de la congregación de los hijos de Israel tomará dos machos de cabrío para expiación, y un carnero para holocausto».',
    },
    note: 'Aarón trae sus propias ofrendas, un {bull} por el pecado y un carnero para holocausto (16:3), y el pueblo da dos machos cabríos y un carnero. {TheBull} hace expiación por Aarón y por su {household} (16:6); los machos cabríos son por el pueblo (16:15). Aquí entran por la puerta del atrio y esperan al norte del altar, donde se degollaban las ofrendas (1:11; 4:24).',
    where: 'El atrio, al norte del altar',
  },
  {
    title: 'Las suertes', ref: 'Levítico 16:8',
    quote: {
      nbla: '«Aarón echará suertes sobre los dos machos cabríos, una suerte por el Señor, y otra suerte para el macho cabrío expiatorio».',
      nvi: '«Entonces Aarón echará suertes sobre los dos machos cabríos, uno para el Señor y otro para soltarlo en el desierto».',
      rvr1960: '«Y echará suertes Aarón sobre los dos machos cabríos; una suerte por Jehová, y otra suerte por Azazel».',
      rva: '«Y echará suertes Aarón sobre los dos machos de cabrío; la una suerte por Jehová, y la otra suerte por Azazel».',
    },
    note: 'Los dos machos cabríos están delante {ofTheLord} a la entrada {ofTheTent} (16:7). Las suertes deciden cuál se ofrece por el pecado y cuál se deja vivo, para enviarlo al desierto (16:9–10). En hebreo la segunda suerte es «para Azazel», una palabra de sentido discutido. El texto no dice qué eran las suertes ni cómo se echaban; aquí son dos piedras sencillas lanzadas delante de los machos cabríos.',
    where: 'Ante la entrada {ofTheTent}',
  },
  {
    title: '{TheBull} por sí mismo', ref: 'Levítico 16:11',
    quote: {
      nbla: '«Entonces Aarón ofrecerá el novillo de la ofrenda por el pecado, que es por sí mismo, y hará expiación por sí mismo y por su casa, y degollará el novillo de la ofrenda por el pecado hecha por sí mismo».',
      nvi: '«Aarón presentará el novillo para su propio sacrificio por el perdón de pecados, y obtendrá así el perdón por él y por su familia. Degollará el novillo para su propio sacrificio por el perdón».',
      rvr1960: '«Y hará traer Aarón el becerro que era para expiación suya, y hará la reconciliación por sí y por su casa, y degollará en expiación el becerro que es suyo».',
      rva: '«Y hará llegar Aarón el becerro que era suyo para expiación, y hará la reconciliación por sí y por su casa, y degollará en expiación el becerro que es suyo».',
    },
    note: 'Antes de hacer expiación por nadie más, Aarón la hace por sí mismo y por su {household}. {TheBull} se degüella al norte del altar (1:11; 4:24); aquí se echa en el suelo, y su sangre se guarda en un tazón a su lado. El texto no nombra el recipiente; el altar tenía tazones de bronce para la sangre (Éxodo 27:3).',
    where: 'Al norte del altar',
  },
  {
    title: 'Brasas del altar', ref: 'Levítico 16:12',
    quote: {
      nbla: '«Y tomará un incensario lleno de brasas de fuego de sobre el altar que está delante del Señor, y dos puñados de incienso aromático molido, y lo llevará detrás del velo».',
      nvi: '«Luego tomará del altar que está ante el Señor un incensario lleno de brasas, junto con dos puñados llenos de incienso aromático en polvo, y los llevará tras la cortina».',
      rvr1960: '«Después tomará un incensario lleno de brasas de fuego del altar de delante de Jehová, y sus puños llenos del perfume aromático molido, y lo llevará detrás del velo».',
      rva: '«Después tomará el incensario lleno de brasas de fuego, del altar de delante de Jehová, y sus puños llenos del perfume aromático molido, y meterálo del velo adentro…»',
    },
    note: 'Las brasas vienen del altar del atrio, cuyo fuego nunca debía apagarse (6:12–13). El incienso es la mezcla sagrada de Éxodo 30:34–38, molida fina. No se describe el incensario; los utensilios del altar eran de bronce (Éxodo 27:3), así que este también lo es, y Aarón lleva el incienso en la otra mano.',
    where: 'Junto al altar',
  },
  {
    title: 'La nube sobre {theCover}', ref: 'Levítico 16:13',
    quote: {
      nbla: '«Pondrá el incienso sobre el fuego delante del Señor, para que la nube del incienso cubra el propiciatorio que está sobre el arca del testimonio, no sea que Aarón muera».',
      nvi: '«Entonces colocará el incienso sobre el fuego, en presencia del Señor, para que la nube de incienso cubra la tapa que está sobre el arca con las tablas del pacto. De esa manera Aarón no morirá».',
      rvr1960: '«Y pondrá el perfume sobre el fuego delante de Jehová, y la nube del perfume cubrirá el propiciatorio que está sobre el testimonio, para que no muera».',
      rva: '«Y pondrá el perfume sobre el fuego delante de Jehová, y la nube del perfume cubrirá la cubierta que está sobre el testimonio, y no morirá».',
    },
    note: 'Detrás {ofTheVeil} solo está el arca, con {theCover} y sus dos querubines encima (Éxodo 25:17–22). Allí dijo {theLord} que aparecería en la nube (16:2). El humo del incienso oculta {theCover} a los ojos de Aarón. Nadie más puede estar en {theTent} mientras él está dentro (16:17). El texto no dice qué hizo con el incensario; aquí lo deja en el suelo delante del arca.',
    where: 'Detrás {ofTheVeil}',
  },
  {
    title: 'La sangre {ofTheBull}', ref: 'Levítico 16:14',
    quote: {
      nbla: '«Tomará además de la sangre del novillo y la rociará con su dedo en el lado oriental del propiciatorio; también delante del propiciatorio rociará de la sangre siete veces con su dedo».',
      nvi: '«Después tomará un poco de la sangre del novillo y la rociará con su dedo al costado oriental de la tapa del arca; la rociará delante de la tapa siete veces».',
      rvr1960: '«Tomará luego de la sangre del becerro, y la rociará con su dedo hacia el propiciatorio al lado oriental; hacia el propiciatorio esparcirá con su dedo siete veces de aquella sangre».',
      rva: '«Tomará luego de la sangre del becerro, y rociará con su dedo hacia la cubierta al lado oriental: hacia la cubierta esparcirá siete veces de aquella sangre con su dedo».',
    },
    note: 'Aarón sale a buscar la sangre de su {bull} y la lleva detrás {ofTheVeil}. Con el dedo la rocía sobre el lado oriental {ofTheCover}, el que da hacia él, y siete veces delante. El texto no da un número para la primera aspersión (aquí es una) ni dice cómo se llevaba la sangre.',
    where: 'Detrás {ofTheVeil}',
  },
  {
    title: 'El macho cabrío por el pueblo', ref: 'Levítico 16:15',
    quote: {
      nbla: '«Después degollará el macho cabrío de la ofrenda por el pecado que es por el pueblo, y llevará su sangre detrás del velo y hará con ella como hizo con la sangre del novillo…»',
      nvi: '«Luego degollará el macho cabrío del sacrificio por el perdón en favor del pueblo. Llevará su sangre detrás de la cortina y hará con esa sangre lo mismo que hizo con la del novillo…»',
      rvr1960: '«Después degollará el macho cabrío en expiación por el pecado del pueblo, y llevará la sangre detrás del velo adentro, y hará de la sangre como hizo con la sangre del becerro…»',
      rva: '«Después degollará en expiación el macho cabrío, que era del pueblo, y meterá la sangre de él del velo adentro; y hará de su sangre como hizo de la sangre del becerro…»',
    },
    note: 'Se degüella el macho cabrío sobre el que cayó la suerte por {theLord}, y su sangre se rocía como la {ofTheBull}, sobre {theCover} y delante. Así Aarón hace expiación por el santuario, a causa de las impurezas de Israel y de todos sus pecados, y hace lo mismo por {theTent}, que está en medio de ellos (16:16). Nadie puede estar en {theTent} hasta que él salga (16:17).',
    where: 'Detrás {ofTheVeil}',
  },
  {
    title: 'Los cuernos del altar', ref: 'Levítico 16:18',
    quote: {
      nbla: '«Entonces saldrá al altar que está delante del Señor y hará expiación por él, y tomará de la sangre del novillo y de la sangre del macho cabrío y la pondrá en los cuernos del altar por todos los lados».',
      nvi: '«Aarón saldrá luego para purificar el altar que está delante del Señor. Tomará sangre del novillo y del macho cabrío y la untará sobre cada uno de los cuernos del altar…»',
      rvr1960: '«Y saldrá al altar que está delante de Jehová, y lo expiará, y tomará de la sangre del becerro y de la sangre del macho cabrío, y la pondrá sobre los cuernos del altar alrededor».',
      rva: '«Y saldrá al altar que está delante de Jehová, y lo expiará; y tomará de la sangre del becerro, y de la sangre del macho cabrío, y pondrá sobre los cuernos del altar alrededor».',
    },
    note: 'Aarón pone sangre de los dos en cada uno de los cuatro cuernos, y luego la rocía siete veces sobre el altar con el dedo, para purificarlo y santificarlo de las impurezas de Israel (16:19). Se discute de qué altar se trata: también los cuernos del altar de oro del incienso se purificaban con sangre una vez al año (Éxodo 30:10). Aquí es el altar del atrio, ya que Aarón sale hacia él.',
    where: 'Junto al altar',
  },
  {
    title: 'El macho cabrío vivo', ref: { nvi: 'Levítico 16:20–21', default: 'Levítico 16:21' },
    quote: {
      nbla: '«Después Aarón pondrá ambas manos sobre la cabeza del macho cabrío y confesará sobre él todas las iniquidades de los israelitas y todas sus transgresiones, todos sus pecados, y poniéndolos sobre la cabeza del macho cabrío…»',
      nvi: '«…presentará el macho cabrío vivo y le impondrá las manos sobre la cabeza. Confesará entonces todas las iniquidades y transgresiones de los israelitas, cualesquiera que hayan sido sus pecados».',
      rvr1960: '«…pondrá Aarón sus dos manos sobre la cabeza del macho cabrío vivo, y confesará sobre él todas las iniquidades de los hijos de Israel, todas sus rebeliones y todos sus pecados, poniéndolos así sobre la cabeza del macho cabrío…»',
      rva: '«Y pondrá Aarón ambas manos suyas sobre la cabeza del macho cabrío vivo, y confesará sobre él todas las iniquidades de los hijos de Israel, y todas sus rebeliones, y todos sus pecados, poniéndolos así sobre la cabeza del macho cabrío…»',
    },
    note: 'Cuando el santuario, {theTent} y el altar ya han sido purificados, Aarón trae {theLiveGoat}, que ha estado vivo delante {ofTheLord} (16:10, 20). Con ambas manos sobre su cabeza confiesa sobre él todos los pecados de Israel y los pone sobre la cabeza del animal.',
    where: 'Ante la entrada {ofTheTent}',
  },
  {
    title: 'Al desierto', ref: 'Levítico 16:22',
    quote: {
      nbla: '«El macho cabrío llevará sobre sí todas las iniquidades de ellos a una tierra solitaria; y el hombre soltará el macho cabrío en el desierto».',
      nvi: '«El hombre soltará en el desierto al macho cabrío y este se llevará a tierra árida todas las iniquidades».',
      rvr1960: '«Y aquel macho cabrío llevará sobre sí todas las iniquidades de ellos a tierra inhabitada; y dejará ir al macho cabrío por el desierto».',
      rva: '«Y aquel macho cabrío llevará sobre sí todas las iniquidades de ellos á tierra inhabitada: y dejará ir el macho cabrío por el desierto».',
    },
    note: '{ManReady} se lleva el macho cabrío (16:21), fuera del atrio, a través del campamento y hasta el desierto, y lo suelta. Debe lavar su ropa y bañarse antes de volver al campamento (16:26). No se dice adónde lo llevó; aquí va hacia el este.',
    where: 'Por el campamento, hacia el desierto',
  },
  {
    title: 'Deja las vestiduras de lino', ref: 'Levítico 16:23',
    quote: {
      nbla: '«Entonces Aarón entrará en la tienda de reunión y se quitará las vestiduras de lino que se había puesto al entrar en el lugar santo, y las dejará allí».',
      nvi: '«Entonces Aarón entrará en la Tienda de reunión, se quitará los vestidos de tela de lino que se puso antes de entrar en el santuario, y allí los dejará».',
      rvr1960: '«Después vendrá Aarón al tabernáculo de reunión, y se quitará las vestiduras de lino que había vestido para entrar en el santuario, y las pondrá allí».',
      rva: '«Después vendrá Aarón al tabernáculo del testimonio, y se desnudará las vestimentas de lino, que había vestido para entrar en el santuario, y pondrálas allí».',
    },
    note: 'Aarón vuelve a entrar en {theTent} y se quita las vestiduras de lino que llevó detrás {ofTheVeil}. Se quedan en {theTent}; el texto no dice qué se hacía con ellas. Aquí quedan dobladas junto a la pared.',
    where: 'En {theTent}',
  },
  {
    title: 'Sus propias vestiduras', ref: 'Levítico 16:24',
    quote: {
      nbla: '«Lavará su cuerpo con agua en un lugar sagrado, se pondrá sus vestidos…»',
      nvi: '«Se bañará con agua en un lugar santo y se volverá a vestir».',
      rvr1960: '«Lavará luego su cuerpo con agua en el lugar del santuario, y después de ponerse sus vestidos…»',
      rva: '«Lavará luego su carne con agua en el lugar del santuario, y después de ponerse sus vestidos…»',
    },
    note: 'Se baña otra vez (el texto dice solo «{bathePlace}», así que no se muestra) y se pone las vestiduras del sumo sacerdote, hechas «{glory}» (Éxodo 28:2): la túnica a cuadros y {theSash}, el manto {blue} con sus campanillas, el {ephod} con sus piedras de ónice, el pectoral con sus doce piedras, y {theTurban} con su lámina de oro.',
    where: 'En {theTent}',
  },
  {
    title: 'Los holocaustos', ref: 'Levítico 16:24',
    quote: {
      nbla: '«…y saldrá y ofrecerá su holocausto y el holocausto del pueblo, y hará expiación por sí mismo y por el pueblo».',
      nvi: '«Después saldrá y ofrecerá su propio holocausto y el del pueblo. Así obtendrá el perdón de sus pecados y los del pueblo».',
      rvr1960: '«…saldrá, y hará su holocausto, y el holocausto del pueblo, y hará la expiación por sí y por el pueblo».',
      rva: '«…saldrá, y hará su holocausto, y el holocausto del pueblo, y hará la reconciliación por sí y por el pueblo».',
    },
    note: 'Aarón sale y ofrece en holocausto los dos carneros, el suyo y el del pueblo (16:3, 5), que se quemaban enteros sobre el altar (1:9). También quema allí la grasa de las ofrendas por el pecado (16:25).',
    where: 'Junto al altar',
  },
  {
    title: { rva: 'Fuera del real', default: 'Fuera del campamento' }, ref: 'Levítico 16:27',
    quote: {
      nbla: '«Pero el novillo de la ofrenda por el pecado y el macho cabrío de la ofrenda por el pecado, cuya sangre fue llevada dentro del lugar santo para hacer expiación, serán llevados fuera del campamento, y quemarán en el fuego su piel, su carne y su estiércol».',
      nvi: '«El novillo del sacrificio por el perdón y el macho cabrío del sacrificio por el perdón, cuya sangre se llevó para purificar el santuario, se sacarán del campamento, y la piel, la carne y el excremento se quemarán».',
      rvr1960: '«Y sacarán fuera del campamento el becerro y el macho cabrío inmolados por el pecado, cuya sangre fue llevada al santuario para hacer la expiación; y quemarán en el fuego su piel, su carne y su estiércol».',
      rva: '«Y sacará fuera del real el becerro del pecado, y el macho cabrío de la culpa, la sangre de los cuales fué metida para hacer la expiación en el santuario; y quemarán en el fuego sus pellejos, y sus carnes, y su estiércol».',
    },
    note: 'Una ofrenda por el pecado cuya sangre se llevó al santuario no la comen los sacerdotes (6:30): se quema fuera del campamento. El que la quema debe lavar su ropa y bañarse antes de volver al campamento (16:28). El texto no dice en qué lugar fuera del campamento; aquí es más allá de las tiendas del este.',
    where: 'Fuera del campamento',
  },
];
