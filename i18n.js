// Languages and Bible versions, shared by the landing page and every animation.
//
// Each version belongs to one language, so choosing a version also chooses the
// language of the interface and the notes. The language is picked, in order,
// from ?version=, ?lang=, the last choice (localStorage), the browser's
// languages, and finally English.
//
// Content text in an animation's data.js is English. Other languages live in
// that animation's lang/<lang>.js, which has the same shape as data.js and is
// merged over it by addLanguage(). A text field is a string or an object keyed
// by version id, with `default` for the versions not listed (in a language
// file, `default` means that language's other versions).

export const LANGS = {
  en: { name: 'English', version: 'nasb' },
  es: { name: 'Español', version: 'nbla' },
  fr: { name: 'Français', version: 'sg21' },
};

// A version with a `link` must show it beside its notice.
export const VERSIONS = {
  nasb: {
    lang: 'en', abbr: 'NASB', name: 'New American Standard Bible (2020)',
    notice: 'Scripture quotations taken from the (NASB®) New American Standard Bible®, Copyright © 1960, 1971, 1977, 1995, 2020 by The Lockman Foundation. Used by permission. All rights reserved.',
    link: 'https://www.Lockman.org',
  },
  niv: {
    lang: 'en', abbr: 'NIV', name: 'New International Version',
    notice: 'Scripture quotations taken from The Holy Bible, New International Version® NIV®. Copyright © 1973, 1978, 1984, 2011 by Biblica, Inc.® Used by permission. All rights reserved worldwide.',
  },
  esv: {
    lang: 'en', abbr: 'ESV', name: 'English Standard Version',
    notice: 'Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®), © 2001 by Crossway, a publishing ministry of Good News Publishers. Used by permission. All rights reserved.',
  },
  kjv: {
    lang: 'en', abbr: 'KJV', name: 'King James Version',
    notice: 'Scripture quotations are from the King James Version (KJV), which is in the public domain.',
  },
  nbla: {
    lang: 'es', abbr: 'NBLA', name: 'Nueva Biblia de las Américas',
    notice: 'Texto bíblico tomado de la Nueva Biblia de las Américas (NBLA), Copyright © 2005 por The Lockman Foundation. Usado con permiso.',
    link: 'https://www.NuevaBiblia.com',
  },
  nvi: {
    lang: 'es', abbr: 'NVI', name: 'Nueva Versión Internacional',
    notice: 'Texto bíblico tomado de la Santa Biblia, Nueva Versión Internacional® NVI® © 1999, 2015, 2022 por Biblica, Inc.® Usado con permiso de Biblica, Inc.® Reservados todos los derechos en todo el mundo.',
  },
  rvr1960: {
    lang: 'es', abbr: 'RVR1960', name: 'Reina-Valera 1960',
    notice: 'Texto bíblico tomado de la Reina-Valera 1960® © Sociedades Bíblicas en América Latina, 1960. Renovado © Sociedades Bíblicas Unidas, 1988. Utilizado con permiso.',
  },
  rva: {
    lang: 'es', abbr: 'RVA', name: 'Reina-Valera Antigua (1909)',
    notice: 'Texto bíblico tomado de la Reina-Valera Antigua (1909), de dominio público.',
  },
  sg21: {
    lang: 'fr', abbr: 'SG21', name: 'Segond 21',
    notice: 'Texte biblique de la Bible Segond 21, Copyright © 2007 Société Biblique de Genève. Reproduit avec aimable autorisation. Tous droits réservés.',
  },
  bds: {
    lang: 'fr', abbr: 'BDS', name: 'La Bible du Semeur',
    notice: 'Texte biblique de La Bible du Semeur, Copyright © 1992, 1999 Biblica, Inc.® Utilisé avec la permission de Biblica, Inc.® Tous droits réservés dans le monde entier.',
  },
  neg1979: {
    lang: 'fr', abbr: 'NEG1979', name: 'Nouvelle Édition de Genève (1979)',
    notice: 'Texte biblique de la Nouvelle Édition de Genève, Copyright © 1979 Société Biblique de Genève. Reproduit avec aimable autorisation. Tous droits réservés.',
  },
  lsg: {
    lang: 'fr', abbr: 'LSG', name: 'Louis Segond (1910)',
    notice: 'Texte biblique tiré de la Bible Louis Segond (1910), du domaine public.',
  },
};

// Interface text. {name} placeholders are filled from t()'s second argument.
const UI = {
  en: {
    siteTitle: 'Bible Animations',
    siteLede: '3D animated tours of places and events in Scripture.',
    siteDocTitle: 'Bible Animations: Free 3D Tours of the Tabernacle, the Temple and Jerusalem',
    siteDescription: 'Free interactive 3D tours of the Bible: Nehemiah’s wall, the tabernacle, the priestly garments, the Day of Atonement, Holy Week in Jerusalem, Solomon’s temple, Ezekiel’s temple and Paul’s journeys, built step by step from the text.',
    docTitle: '{title}: 3D Bible Tour of {ref} | Bible Animations',
    language: 'Language',
    allAnimations: 'All animations',
    backHome: 'Back to all animations',
    'nehemiah.title': 'Nehemiah’s Wall',
    'nehemiah.subtitle': 'The rebuilding of Jerusalem’s walls · Nehemiah 3',
    'nehemiah.ref': 'Nehemiah 3',
    'nehemiah.blurb': 'Fly around Jerusalem as its walls and gates are rebuilt, section by section, in the order Nehemiah records them.',
    'nehemiah.description': 'A 3D fly-by of the rebuilding of Jerusalem’s walls, following Nehemiah 3.',
    'nehemiah.book': 'Nehemiah',
    'tabernacle.title': 'The Tabernacle',
    'tabernacle.subtitle': 'Setting up the tent of meeting · Exodus 25–40',
    'tabernacle.ref': 'Exodus 25–40',
    'tabernacle.blurb': 'Watch the tent of meeting go up at Sinai, piece by piece, in the order Moses set it up in Exodus 40, from the silver bases to the cloud of glory.',
    'tabernacle.description': 'A 3D tour of the tabernacle being set up, in the order of Exodus 40.',
    'tabernacle.book': 'Exodus',
    'garments.title': 'The Priestly Garments',
    'garments.subtitle': 'Aaron is clothed · Exodus 28 · Leviticus 8',
    'garments.ref': 'Exodus 28 · Leviticus 8:6–9',
    'garments.blurb': 'Watch Moses wash Aaron and dress him as high priest, garment by garment, in the order of Leviticus 8, from the linen tunic to the gold plate on his turban.',
    'garments.description': 'A 3D animation of Aaron being dressed in the priestly garments, in the order of Leviticus 8:6–9.',
    'atonement.title': 'The Day of Atonement',
    'atonement.subtitle': 'Atonement for the sanctuary and the people · Leviticus 16',
    'atonement.ref': 'Leviticus 16',
    'atonement.blurb': 'Follow Aaron through the Day of Atonement, step by step through Leviticus 16: the linen garments, the lots for the two goats, the incense and the blood inside the veil, and the goat sent into the wilderness.',
    'atonement.description': 'A 3D tour of the Day of Atonement at the tabernacle, step by step through Leviticus 16.',
    'dedication.title': 'The Dedication of the Wall',
    'dedication.subtitle': 'Two choirs on the wall · Nehemiah 12:27–43',
    'dedication.ref': 'Nehemiah 12:27–43',
    'dedication.blurb': 'Walk the finished wall of Jerusalem with the two great choirs of thanksgiving, one each way round the city, until they meet in the house of God.',
    'dedication.description': 'A 3D tour of the dedication of Jerusalem’s wall, following the two choirs of Nehemiah 12.',
    'holyweek.title': 'Holy Week in Jerusalem',
    'holyweek.subtitle': 'From Palm Sunday to the empty tomb · Mark 11–16',
    'holyweek.ref': 'Mark 11–16',
    'holyweek.blurb': 'Follow Jesus through his last week in Jerusalem, day by day: the ride down the Mount of Olives, the temple, the upper room, Gethsemane, the trials, the cross and the empty tomb.',
    'holyweek.description': 'A 3D tour of Jerusalem in the last week of Jesus’ life, day by day from Palm Sunday to the empty tomb.',
    'solomon.title': 'Solomon’s Temple',
    'solomon.subtitle': 'Building the house of the LORD · 1 Kings 6–7',
    'solomon.ref': '1 Kings 6–7 · 2 Chronicles 3–4',
    'solomon.blurb': 'Watch Solomon’s temple rise on Mount Moriah, part by part, in the order of 1 Kings 6–7: the stone house and its side chambers, the cedar and gold within, the cherubim, and Hiram’s bronze pillars and Sea.',
    'solomon.description': 'A 3D tour of Solomon’s temple being built, in the order of 1 Kings 6–7.',
    'ezekiel.title': 'Ezekiel’s Temple',
    'ezekiel.subtitle': 'The vision of the measured temple · Ezekiel 40–43',
    'ezekiel.ref': 'Ezekiel 40–43',
    'ezekiel.blurb': 'Follow the man with the measuring rod as he shows Ezekiel the temple of his vision on a very high mountain: the gates and courts, the altar, the house and its side chambers, until the glory of the LORD returns by the east gate.',
    'ezekiel.description': 'A 3D tour of the temple Ezekiel saw in his vision, measured part by part, in the order of Ezekiel 40–42.',
    'journey.title': 'Paul’s First Missionary Journey',
    'journey.subtitle': 'Barnabas and Saul sent out from Antioch · Acts 13–14',
    'journey.ref': 'Acts 13–14',
    'journey.blurb': 'Fly the route of Paul and Barnabas’s first journey over the real land and sea: from Antioch to Cyprus, over the Taurus Mountains to Pisidian Antioch, Iconium, Lystra and Derbe, and back, with a ship on the sea crossings.',
    'journey.description': 'A 3D fly-over of Paul’s first missionary journey with Barnabas, in the order of Acts 13–14.',
    'journey2.title': 'Paul’s Second Missionary Journey',
    'journey2.subtitle': 'Paul and Silas, from Antioch to Corinth · Acts 15:36–18:22',
    'journey2.ref': 'Acts 15:36–18:22',
    'journey2.blurb': 'Fly the route of Paul’s second journey over the real land and sea: through Galatia to Troas, across to Macedonia, to Philippi, Thessalonica and Berea, Athens and Corinth, and home by Ephesus and Jerusalem.',
    'journey2.description': 'A 3D fly-over of Paul’s second missionary journey with Silas and Timothy, in the order of Acts 15:36–18:22.',
    'journey3.title': 'Paul’s Third Missionary Journey',
    'journey3.subtitle': 'Ephesus, Greece and the road to Jerusalem · Acts 18:23–21:17',
    'journey3.ref': 'Acts 18:23–21:17',
    'journey3.blurb': 'Fly the route of Paul’s third journey over the real land and sea: two years in Ephesus, Macedonia and Greece, then down the coast of Asia by Troas, Miletus and Tyre to Jerusalem with the collection for the poor.',
    'journey3.description': 'A 3D fly-over of Paul’s third missionary journey, in the order of Acts 18:23–21:17.',
    'voyage.title': 'Paul’s Voyage to Rome',
    'voyage.subtitle': 'The storm, the shipwreck and the road to Rome · Acts 27–28',
    'voyage.ref': 'Acts 27–28',
    'voyage.blurb': 'Sail with Paul the prisoner from Caesarea to Rome over the real sea: along Cyprus and Crete, through the storm and fourteen days adrift, the shipwreck on Malta, and on by Syracuse and Puteoli up the Appian Way.',
    'voyage.description': 'A 3D fly-over of Paul’s voyage to Rome as a prisoner, the storm and the shipwreck on Malta, in the order of Acts 27–28.',
    lukeThomas: 'Inspired by the original fly-by created by Luke Thomas.',
    creditLuke: 'Scripture: {abbr} · Inspired by Luke Thomas',
    credit: 'Scripture: {abbr}',
    feedback: 'Send feedback',
    compass: 'Compass',
    tourStops: 'Tour stops',
    tourControls: 'Tour controls',
    prevStop: 'Previous stop',
    prevTitle: 'Previous stop (←)',
    nextStop: 'Next stop',
    nextTitle: 'Next stop (→)',
    play: 'Play',
    playTitle: 'Play (Space)',
    pause: 'Pause',
    pauseTitle: 'Pause (Space)',
    explore: 'Explore',
    exploreTitle: 'Look around freely (E)',
    speed: 'Speed',
    hold: 'Pause',
    holdTitle: 'How long to stay at each stop',
    holdNone: 'No pause',
    holdShort: 'Short',
    holdNormal: 'Normal',
    holdLong: 'Long',
    holdLonger: 'Longer',
    bible: 'Bible',
    exploreHint: 'Drag to orbit · scroll to zoom · right-drag to pan',
    stopOf: 'Stop {n} of {total}',
    next: 'Next',
    goTo: 'Go to stop {n}: {title}',
    begin: 'Begin the tour',
    replay: 'Replay the tour',
    exploreFreely: 'Explore freely',
    share: 'Share this tour',
    shareText: '{title}: a 3D Bible tour',
    shareLink: 'Link',
    copy: 'Copy',
    copied: 'Copied',
    shareMore: 'More…',
    shareEmail: 'Email',
    embedCode: 'Embed on your site',
    embedHint: 'Paste this into your web page or blog. The tour runs inside your page, with a link back to the full tour.',
    embedOpen: 'Open the full tour',
    fullscreen: 'Full screen',
    close: 'Close',
    gateChips: 'What the text records for this gate',
    recorded: 'Recorded in the text',
    notMentioned: 'Not mentioned',
    repairedBy: 'Repaired by',
    materialChips: 'What the text says it is made of',
    named: 'Named in the text',
    notUsed: 'Not used here',
    size: 'Size',
    madeBy: 'Made by',
    measured: 'Measured',
    atoneChips: 'What atonement is made for (Leviticus 16:33)',
    where: 'Where',
    thisLeg: 'This leg',
    soFar: 'Journey so far',
    wholeJourney: 'The whole journey',
    overland: 'overland',
    bySea: 'by sea',
    distance: '{km} km ({mi} miles)',
    wearing: 'Wearing',
    stoneRows: 'The stones, row by row (Exodus 28:17–20)',
    who: 'Who',
    instrumentChips: 'Instruments named in these verses',
    voice: 'Voice',
    noVoice: 'No voice available',
    mute: 'Mute the reading',
    muteTitle: 'Mute the reading (M)',
    unmute: 'Read the verses aloud',
    unmuteTitle: 'Read the verses aloud (M)',
    volume: 'Volume',
    refChapter: '{book}, chapter {ch}.',
    refChapters: '{book}, chapters {a} to {b}.',
    refVerse: '{book}, chapter {ch}, verse {v}.',
    refVerses: '{book}, chapter {ch}, verses {a} to {b}.',
  },
  es: {
    siteTitle: 'Animaciones bíblicas',
    siteLede: 'Recorridos animados en 3D por lugares y acontecimientos de las Escrituras.',
    siteDocTitle: 'Animaciones bíblicas: recorridos gratuitos en 3D por el tabernáculo, el templo y Jerusalén',
    siteDescription: 'Recorridos bíblicos interactivos y gratuitos en 3D: la muralla de Nehemías, el tabernáculo, las vestiduras sacerdotales, el día de la expiación, la Semana Santa en Jerusalén, el templo de Salomón, el templo de Ezequiel y los viajes de Pablo, construidos paso a paso según el texto.',
    docTitle: '{title}: recorrido bíblico en 3D ({ref}) | Animaciones bíblicas',
    language: 'Idioma',
    allAnimations: 'Todas las animaciones',
    backHome: 'Volver a todas las animaciones',
    'nehemiah.title': 'La muralla de Nehemías',
    'nehemiah.subtitle': 'La reconstrucción de las murallas de Jerusalén · Nehemías 3',
    'nehemiah.ref': 'Nehemías 3',
    'nehemiah.blurb': 'Vuela alrededor de Jerusalén mientras se reconstruyen sus murallas y puertas, tramo a tramo, en el orden en que las registra Nehemías.',
    'nehemiah.description': 'Un vuelo en 3D sobre la reconstrucción de las murallas de Jerusalén, siguiendo Nehemías 3.',
    'nehemiah.book': 'Nehemías',
    'tabernacle.title': 'El tabernáculo',
    'tabernacle.subtitle': 'El levantamiento de la tienda de reunión · Éxodo 25–40',
    'tabernacle.ref': 'Éxodo 25–40',
    'tabernacle.blurb': 'Mira cómo se levanta la tienda de reunión en el Sinaí, pieza a pieza, en el orden en que Moisés la armó en Éxodo 40, desde las basas de plata hasta la nube de gloria.',
    'tabernacle.description': 'Un recorrido en 3D por el levantamiento del tabernáculo, en el orden de Éxodo 40.',
    'tabernacle.book': 'Éxodo',
    'garments.title': 'Las vestiduras sacerdotales',
    'garments.subtitle': 'Aarón es vestido · Éxodo 28 · Levítico 8',
    'garments.ref': 'Éxodo 28 · Levítico 8:6–9',
    'garments.blurb': 'Mira cómo Moisés lava a Aarón y lo viste como sumo sacerdote, prenda a prenda, en el orden de Levítico 8, desde la túnica de lino hasta la lámina de oro sobre su cabeza.',
    'garments.description': 'Una animación en 3D de Aarón vestido con las vestiduras sacerdotales, en el orden de Levítico 8:6–9.',
    'atonement.title': 'El día de la expiación',
    'atonement.subtitle': 'Expiación por el santuario y por el pueblo · Levítico 16',
    'atonement.ref': 'Levítico 16',
    'atonement.blurb': 'Sigue a Aarón en el día de la expiación, paso a paso por Levítico 16: las vestiduras de lino, las suertes sobre los dos machos cabríos, el incienso y la sangre detrás del velo, y el macho cabrío enviado al desierto.',
    'atonement.description': 'Un recorrido en 3D por el día de la expiación en el tabernáculo, paso a paso por Levítico 16.',
    'dedication.title': 'La dedicación de la muralla',
    'dedication.subtitle': 'Dos coros sobre la muralla · Nehemías 12:27–43',
    'dedication.ref': 'Nehemías 12:27–43',
    'dedication.blurb': 'Recorre la muralla terminada de Jerusalén con los dos grandes coros de acción de gracias, uno en cada sentido alrededor de la ciudad, hasta que se encuentran en la casa de Dios.',
    'dedication.description': 'Un recorrido en 3D por la dedicación de la muralla de Jerusalén, siguiendo a los dos coros de Nehemías 12.',
    'holyweek.title': 'La Semana Santa en Jerusalén',
    'holyweek.subtitle': 'Del Domingo de Ramos a la tumba vacía · Marcos 11–16',
    'holyweek.ref': 'Marcos 11–16',
    'holyweek.blurb': 'Sigue a Jesús en su última semana en Jerusalén, día a día: la bajada del monte de los Olivos, el templo, el aposento alto, Getsemaní, los juicios, la cruz y la tumba vacía.',
    'holyweek.description': 'Un recorrido en 3D por Jerusalén en la última semana de la vida de Jesús, día a día del Domingo de Ramos a la tumba vacía.',
    'solomon.title': 'El templo de Salomón',
    'solomon.subtitle': 'La construcción de la casa del Señor · 1 Reyes 6–7',
    'solomon.ref': '1 Reyes 6–7 · 2 Crónicas 3–4',
    'solomon.blurb': 'Mira cómo se levanta el templo de Salomón en el monte Moriah, parte por parte, en el orden de 1 Reyes 6–7: la casa de piedra y sus cámaras laterales, el cedro y el oro de dentro, los querubines, y las columnas y el mar de bronce de Hiram.',
    'solomon.description': 'Un recorrido en 3D por la construcción del templo de Salomón, en el orden de 1 Reyes 6–7.',
    'ezekiel.title': 'El templo de Ezequiel',
    'ezekiel.subtitle': 'La visión del templo medido · Ezequiel 40–43',
    'ezekiel.ref': 'Ezequiel 40–43',
    'ezekiel.blurb': 'Sigue al hombre de la caña de medir mientras muestra a Ezequiel el templo de su visión sobre un monte muy alto: las puertas y los atrios, el altar, la casa y sus cámaras laterales, hasta que la gloria del Señor vuelve por la puerta oriental.',
    'ezekiel.description': 'Un recorrido en 3D por el templo que Ezequiel vio en su visión, medido parte por parte, en el orden de Ezequiel 40–42.',
    'journey.title': 'El primer viaje misionero de Pablo',
    'journey.subtitle': 'Bernabé y Saulo enviados desde Antioquía · Hechos 13–14',
    'journey.ref': 'Hechos 13–14',
    'journey.blurb': 'Sobrevuela la ruta del primer viaje de Pablo y Bernabé sobre la tierra y el mar reales: de Antioquía a Chipre, por los montes Tauro hasta Antioquía de Pisidia, Iconio, Listra y Derbe, y de regreso, con un barco en las travesías por mar.',
    'journey.description': 'Un sobrevuelo en 3D del primer viaje misionero de Pablo con Bernabé, en el orden de Hechos 13–14.',
    'journey2.title': 'El segundo viaje misionero de Pablo',
    'journey2.subtitle': 'Pablo y Silas, de Antioquía a Corinto · Hechos 15:36–18:22',
    'journey2.ref': 'Hechos 15:36–18:22',
    'journey2.blurb': 'Sobrevuela la ruta del segundo viaje de Pablo sobre la tierra y el mar reales: por Galacia hasta Troas, a Macedonia, a Filipos, Tesalónica y Berea, Atenas y Corinto, y de regreso por Éfeso y Jerusalén.',
    'journey2.description': 'Un sobrevuelo en 3D del segundo viaje misionero de Pablo con Silas y Timoteo, en el orden de Hechos 15:36–18:22.',
    'journey3.title': 'El tercer viaje misionero de Pablo',
    'journey3.subtitle': 'Éfeso, Grecia y el camino a Jerusalén · Hechos 18:23–21:17',
    'journey3.ref': 'Hechos 18:23–21:17',
    'journey3.blurb': 'Sobrevuela la ruta del tercer viaje de Pablo sobre la tierra y el mar reales: dos años en Éfeso, Macedonia y Grecia, y luego por la costa de Asia, por Troas, Mileto y Tiro, hasta Jerusalén con la colecta para los pobres.',
    'journey3.description': 'Un sobrevuelo en 3D del tercer viaje misionero de Pablo, en el orden de Hechos 18:23–21:17.',
    'voyage.title': 'El viaje de Pablo a Roma',
    'voyage.subtitle': 'La tempestad, el naufragio y el camino a Roma · Hechos 27–28',
    'voyage.ref': 'Hechos 27–28',
    'voyage.blurb': 'Navega con Pablo, preso, de Cesarea a Roma sobre el mar real: junto a Chipre y Creta, en la tempestad y catorce días a la deriva, el naufragio en Malta, y por Siracusa y Puteoli hasta la Vía Apia.',
    'voyage.description': 'Un sobrevuelo en 3D del viaje de Pablo a Roma como preso, la tempestad y el naufragio en Malta, en el orden de Hechos 27–28.',
    lukeThomas: 'Inspirado en el vuelo original creado por Luke Thomas.',
    creditLuke: 'Escritura: {abbr} · Inspirado en Luke Thomas',
    credit: 'Escritura: {abbr}',
    feedback: 'Enviar comentarios',
    compass: 'Brújula',
    tourStops: 'Paradas del recorrido',
    tourControls: 'Controles del recorrido',
    prevStop: 'Parada anterior',
    prevTitle: 'Parada anterior (←)',
    nextStop: 'Parada siguiente',
    nextTitle: 'Parada siguiente (→)',
    play: 'Reproducir',
    playTitle: 'Reproducir (espacio)',
    pause: 'Pausa',
    pauseTitle: 'Pausa (espacio)',
    explore: 'Explorar',
    exploreTitle: 'Mirar libremente (E)',
    speed: 'Velocidad',
    hold: 'Espera',
    holdTitle: 'Cuánto tiempo quedarse en cada parada',
    holdNone: 'Sin espera',
    holdShort: 'Corta',
    holdNormal: 'Normal',
    holdLong: 'Larga',
    holdLonger: 'Más larga',
    bible: 'Biblia',
    exploreHint: 'Arrastra para girar · rueda para acercar · botón derecho para desplazar',
    stopOf: 'Parada {n} de {total}',
    next: 'Siguiente',
    goTo: 'Ir a la parada {n}: {title}',
    begin: 'Comenzar el recorrido',
    replay: 'Repetir el recorrido',
    exploreFreely: 'Explorar libremente',
    share: 'Compartir este recorrido',
    shareText: '{title}: un recorrido bíblico en 3D',
    shareLink: 'Enlace',
    copy: 'Copiar',
    copied: 'Copiado',
    shareMore: 'Más…',
    shareEmail: 'Correo',
    embedCode: 'Insertar en tu sitio',
    embedHint: 'Pega esto en tu página web o blog. El recorrido se muestra dentro de tu página, con un enlace al recorrido completo.',
    embedOpen: 'Abrir el recorrido completo',
    fullscreen: 'Pantalla completa',
    close: 'Cerrar',
    gateChips: 'Lo que el texto registra de esta puerta',
    recorded: 'Registrado en el texto',
    notMentioned: 'No se menciona',
    repairedBy: 'Reparado por',
    materialChips: 'De qué dice el texto que está hecho',
    named: 'Mencionado en el texto',
    notUsed: 'No se usa aquí',
    size: 'Tamaño',
    madeBy: 'Hecho por',
    measured: 'Medidas',
    atoneChips: 'Por qué se hace expiación (Levítico 16:33)',
    where: 'Dónde',
    thisLeg: 'Este tramo',
    soFar: 'Recorrido hasta aquí',
    wholeJourney: 'Todo el viaje',
    overland: 'por tierra',
    bySea: 'por mar',
    distance: '{km} km',
    wearing: 'Lleva',
    stoneRows: 'Las piedras, hilera por hilera (Éxodo 28:17–20)',
    who: 'Quiénes',
    instrumentChips: 'Instrumentos que nombran estos versículos',
    voice: 'Voz',
    noVoice: 'No hay voz disponible',
    mute: 'Silenciar la lectura',
    muteTitle: 'Silenciar la lectura (M)',
    unmute: 'Leer los versículos en voz alta',
    unmuteTitle: 'Leer los versículos en voz alta (M)',
    volume: 'Volumen',
    refChapter: '{book}, capítulo {ch}.',
    refChapters: '{book}, capítulos {a} al {b}.',
    refVerse: '{book}, capítulo {ch}, versículo {v}.',
    refVerses: '{book}, capítulo {ch}, versículos {a} al {b}.',
  },
  fr: {
    siteTitle: 'Animations bibliques',
    siteLede: 'Visites animées en 3D de lieux et d’événements de l’Écriture.',
    siteDocTitle: 'Animations bibliques : visites gratuites en 3D du tabernacle, du temple et de Jérusalem',
    siteDescription: 'Visites bibliques interactives et gratuites en 3D : la muraille de Néhémie, le tabernacle, les vêtements sacerdotaux, le jour des expiations, la Semaine sainte à Jérusalem, le temple de Salomon, le temple d’Ézéchiel et les voyages de Paul, construits pas à pas d’après le texte.',
    docTitle: '{title} : visite biblique en 3D ({ref}) | Animations bibliques',
    language: 'Langue',
    allAnimations: 'Toutes les animations',
    backHome: 'Retour à toutes les animations',
    'nehemiah.title': 'La muraille de Néhémie',
    'nehemiah.subtitle': 'La reconstruction des murailles de Jérusalem · Néhémie 3',
    'nehemiah.ref': 'Néhémie 3',
    'nehemiah.blurb': 'Survolez Jérusalem pendant que ses murailles et ses portes sont reconstruites, section par section, dans l’ordre où Néhémie les rapporte.',
    'nehemiah.description': 'Un survol en 3D de la reconstruction des murailles de Jérusalem, d’après Néhémie 3.',
    'nehemiah.book': 'Néhémie',
    'tabernacle.title': 'Le tabernacle',
    'tabernacle.subtitle': 'Le montage de la tente de la rencontre · Exode 25–40',
    'tabernacle.ref': 'Exode 25–40',
    'tabernacle.blurb': 'Regardez la tente de la rencontre se dresser au Sinaï, pièce par pièce, dans l’ordre où Moïse l’a montée en Exode 40, des bases d’argent jusqu’à la nuée de gloire.',
    'tabernacle.description': 'Une visite en 3D du montage du tabernacle, dans l’ordre d’Exode 40.',
    'tabernacle.book': 'Exode',
    'garments.title': 'Les vêtements sacerdotaux',
    'garments.subtitle': 'Aaron est revêtu · Exode 28 · Lévitique 8',
    'garments.ref': 'Exode 28 · Lévitique 8:6–9',
    'garments.blurb': 'Regardez Moïse laver Aaron et le revêtir comme grand-prêtre, vêtement après vêtement, dans l’ordre de Lévitique 8, de la tunique de lin jusqu’à la lame d’or sur sa tiare.',
    'garments.description': 'Une animation en 3D d’Aaron revêtu des vêtements sacerdotaux, dans l’ordre de Lévitique 8:6–9.',
    'atonement.title': 'Le jour des expiations',
    'atonement.subtitle': 'L’expiation pour le sanctuaire et pour le peuple · Lévitique 16',
    'atonement.ref': 'Lévitique 16',
    'atonement.blurb': 'Suivez Aaron au jour des expiations, pas à pas dans Lévitique 16 : les vêtements de lin, le sort jeté sur les deux boucs, le parfum et le sang derrière le voile, et le bouc chassé dans le désert.',
    'atonement.description': 'Une visite en 3D du jour des expiations au tabernacle, pas à pas dans Lévitique 16.',
    'dedication.title': 'La dédicace de la muraille',
    'dedication.subtitle': 'Deux chœurs sur la muraille · Néhémie 12:27–43',
    'dedication.ref': 'Néhémie 12:27–43',
    'dedication.blurb': 'Parcourez la muraille achevée de Jérusalem avec les deux grands chœurs de louange, chacun dans un sens autour de la ville, jusqu’à ce qu’ils se retrouvent dans la maison de Dieu.',
    'dedication.description': 'Une visite en 3D de la dédicace de la muraille de Jérusalem, avec les deux chœurs de Néhémie 12.',
    'holyweek.title': 'La semaine sainte à Jérusalem',
    'holyweek.subtitle': 'Des Rameaux au tombeau vide · Marc 11–16',
    'holyweek.ref': 'Marc 11–16',
    'holyweek.blurb': 'Suivez Jésus pendant sa dernière semaine à Jérusalem, jour après jour : la descente du mont des Oliviers, le temple, la chambre haute, Gethsémané, les procès, la croix et le tombeau vide.',
    'holyweek.description': 'Une visite en 3D de Jérusalem pendant la dernière semaine de la vie de Jésus, jour après jour, des Rameaux au tombeau vide.',
    'solomon.title': 'Le temple de Salomon',
    'solomon.subtitle': 'La construction du temple · 1 Rois 6–7',
    'solomon.ref': '1 Rois 6–7 · 2 Chroniques 3–4',
    'solomon.blurb': 'Regardez le temple de Salomon s’élever sur le mont Morija, partie par partie, dans l’ordre de 1 Rois 6–7 : la maison de pierre et ses chambres latérales, le cèdre et l’or à l’intérieur, les chérubins, et les colonnes et la mer de bronze de Hiram.',
    'solomon.description': 'Une visite en 3D de la construction du temple de Salomon, dans l’ordre de 1 Rois 6–7.',
    'ezekiel.title': 'Le temple d’Ézéchiel',
    'ezekiel.subtitle': 'La vision du temple mesuré · Ézéchiel 40–43',
    'ezekiel.ref': 'Ézéchiel 40–43',
    'ezekiel.blurb': 'Suivez l’homme à la canne à mesurer tandis qu’il montre à Ézéchiel le temple de sa vision sur une montagne très élevée : les portes et les parvis, l’autel, la maison et ses chambres latérales, jusqu’au retour de la gloire de l’Éternel par la porte orientale.',
    'ezekiel.description': 'Une visite en 3D du temple qu’Ézéchiel a vu en vision, mesuré partie par partie, dans l’ordre d’Ézéchiel 40–42.',
    'journey.title': 'Le premier voyage missionnaire de Paul',
    'journey.subtitle': 'Barnabas et Saul envoyés d’Antioche · Actes 13–14',
    'journey.ref': 'Actes 13–14',
    'journey.blurb': 'Survolez l’itinéraire du premier voyage de Paul et Barnabas au-dessus des vraies terres et de la vraie mer : d’Antioche à Chypre, par les monts Taurus jusqu’à Antioche de Pisidie, Iconium, Lystre et Derbe, puis le retour, avec un navire pour les traversées.',
    'journey.description': 'Un survol en 3D du premier voyage missionnaire de Paul avec Barnabas, dans l’ordre d’Actes 13–14.',
    'journey2.title': 'Le deuxième voyage missionnaire de Paul',
    'journey2.subtitle': 'Paul et Silas, d’Antioche à Corinthe · Actes 15:36–18:22',
    'journey2.ref': 'Actes 15:36–18:22',
    'journey2.blurb': 'Survolez l’itinéraire du deuxième voyage de Paul au-dessus des vraies terres et de la vraie mer : par la Galatie jusqu’à Troas, en Macédoine, à Philippes, Thessalonique et Bérée, Athènes et Corinthe, puis le retour par Éphèse et Jérusalem.',
    'journey2.description': 'Un survol en 3D du deuxième voyage missionnaire de Paul avec Silas et Timothée, dans l’ordre d’Actes 15:36–18:22.',
    'journey3.title': 'Le troisième voyage missionnaire de Paul',
    'journey3.subtitle': 'Éphèse, la Grèce et la route de Jérusalem · Actes 18:23–21:17',
    'journey3.ref': 'Actes 18:23–21:17',
    'journey3.blurb': 'Survolez l’itinéraire du troisième voyage de Paul au-dessus des vraies terres et de la vraie mer : deux ans à Éphèse, la Macédoine et la Grèce, puis le long de la côte d’Asie, par Troas, Milet et Tyr, jusqu’à Jérusalem avec la collecte pour les pauvres.',
    'journey3.description': 'Un survol en 3D du troisième voyage missionnaire de Paul, dans l’ordre d’Actes 18:23–21:17.',
    'voyage.title': 'Le voyage de Paul à Rome',
    'voyage.subtitle': 'La tempête, le naufrage et la route de Rome · Actes 27–28',
    'voyage.ref': 'Actes 27–28',
    'voyage.blurb': 'Naviguez avec Paul, prisonnier, de Césarée à Rome sur la vraie mer : le long de Chypre et de la Crète, dans la tempête et quatorze jours de dérive, le naufrage à Malte, puis par Syracuse et Pouzzoles jusqu’à la voie Appienne.',
    'voyage.description': 'Un survol en 3D du voyage de Paul à Rome comme prisonnier, de la tempête et du naufrage à Malte, dans l’ordre d’Actes 27–28.',
    lukeThomas: 'Inspiré du survol original créé par Luke Thomas.',
    creditLuke: 'Écriture : {abbr} · Inspiré de Luke Thomas',
    credit: 'Écriture : {abbr}',
    feedback: 'Envoyer un commentaire',
    compass: 'Boussole',
    tourStops: 'Étapes de la visite',
    tourControls: 'Commandes de la visite',
    prevStop: 'Étape précédente',
    prevTitle: 'Étape précédente (←)',
    nextStop: 'Étape suivante',
    nextTitle: 'Étape suivante (→)',
    play: 'Lecture',
    playTitle: 'Lecture (espace)',
    pause: 'Pause',
    pauseTitle: 'Pause (espace)',
    explore: 'Explorer',
    exploreTitle: 'Regarder librement (E)',
    speed: 'Vitesse',
    hold: 'Arrêt',
    holdTitle: 'Combien de temps rester à chaque étape',
    holdNone: 'Sans arrêt',
    holdShort: 'Court',
    holdNormal: 'Normal',
    holdLong: 'Long',
    holdLonger: 'Plus long',
    bible: 'Bible',
    exploreHint: 'Glisser pour tourner · molette pour zoomer · clic droit pour déplacer',
    stopOf: 'Étape {n} sur {total}',
    next: 'Suivant',
    goTo: 'Aller à l’étape {n} : {title}',
    begin: 'Commencer la visite',
    replay: 'Revoir la visite',
    exploreFreely: 'Explorer librement',
    share: 'Partager cette visite',
    shareText: '{title} : une visite biblique en 3D',
    shareLink: 'Lien',
    copy: 'Copier',
    copied: 'Copié',
    shareMore: 'Plus…',
    shareEmail: 'E-mail',
    embedCode: 'Intégrer à votre site',
    embedHint: 'Collez ce code dans votre page web ou votre blog. La visite s’affiche dans votre page, avec un lien vers la visite complète.',
    embedOpen: 'Ouvrir la visite complète',
    fullscreen: 'Plein écran',
    close: 'Fermer',
    gateChips: 'Ce que le texte rapporte de cette porte',
    recorded: 'Rapporté par le texte',
    notMentioned: 'Non mentionné',
    repairedBy: 'Réparé par',
    materialChips: 'Ce dont le texte dit qu’il est fait',
    named: 'Nommé dans le texte',
    notUsed: 'Pas utilisé ici',
    size: 'Taille',
    madeBy: 'Fait par',
    measured: 'Mesures',
    atoneChips: 'Ce pour quoi l’expiation est faite (Lévitique 16:33)',
    where: 'Où',
    thisLeg: 'Cette étape',
    soFar: 'Parcouru jusqu’ici',
    wholeJourney: 'Tout le voyage',
    overland: 'par voie de terre',
    bySea: 'par mer',
    distance: '{km} km',
    wearing: 'Vêtements',
    stoneRows: 'Les pierres, rangée par rangée (Exode 28:17–20)',
    who: 'Qui',
    instrumentChips: 'Instruments nommés dans ces versets',
    voice: 'Voix',
    noVoice: 'Aucune voix disponible',
    mute: 'Couper la lecture',
    muteTitle: 'Couper la lecture (M)',
    unmute: 'Lire les versets à voix haute',
    unmuteTitle: 'Lire les versets à voix haute (M)',
    volume: 'Volume',
    refChapter: '{book}, chapitre {ch}.',
    refChapters: '{book}, chapitres {a} à {b}.',
    refVerse: '{book}, chapitre {ch}, verset {v}.',
    refVerses: '{book}, chapitre {ch}, versets {a} à {b}.',
  },
};

// The version (and so the language) on screen.
export const current = { version: LANGS.en.version, lang: 'en' };

function load(key) { try { return localStorage.getItem(key); } catch { return null; } }
function store(key, value) { try { localStorage.setItem(key, value); } catch {} }

// The language to use when no version is given.
export function chooseLang() {
  const params = new URLSearchParams(location.search);
  if (params.get('lang') in LANGS) return params.get('lang');
  if (load('lang') in LANGS) return load('lang');
  for (const l of navigator.languages ?? [navigator.language]) {
    const base = l?.toLowerCase().split('-')[0];
    if (base in LANGS) return base;
  }
  return 'en';
}

// The version to start with. A version or language named in the URL counts as a choice and is remembered.
export function chooseVersion() {
  const params = new URLSearchParams(location.search);
  const asked = params.get('version');
  if (VERSIONS[asked]) { remember(asked); return asked; }
  const lang = chooseLang();
  if (params.get('lang') === lang) store('lang', lang);
  // 'bibleVersion' is where the English version was kept before there were other languages.
  const saved = load(`bibleVersion.${lang}`) ?? load('bibleVersion');
  return VERSIONS[saved]?.lang === lang ? saved : LANGS[lang].version;
}

export function remember(version) {
  const { lang } = VERSIONS[version];
  store('lang', lang);
  store(`bibleVersion.${lang}`, version);
}
export function rememberLang(lang) { store('lang', lang); }

export function setVersion(version) {
  current.version = version;
  current.lang = VERSIONS[version].lang;
}
export function setLang(lang) {
  current.lang = lang;
  const saved = load(`bibleVersion.${lang}`);
  current.version = VERSIONS[saved]?.lang === lang ? saved : LANGS[lang].version;
}

// A text field in the current version: the version's own text, else the
// language's, else English.
export function pick(v) {
  if (v == null || typeof v === 'string') return v;
  return v[current.version] ?? v[current.lang] ?? v.default ?? v[LANGS.en.version];
}

// A text field's English, for code that reads the text rather than showing it.
export function english(v) {
  return v == null || typeof v === 'string' ? v : v.default ?? v[LANGS.en.version];
}

// Interface text in the current language.
export function t(key, vars) {
  const s = UI[current.lang]?.[key] ?? UI.en[key] ?? key;
  return vars ? s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m)) : s;
}

// Fills in the page's static text: data-i18n sets the text, data-i18n-title and
// data-i18n-aria the title and aria-label, data-i18n-content a meta's content.
export function localizeDOM(root = document) {
  document.documentElement.lang = current.lang;
  for (const el of root.querySelectorAll('[data-i18n]')) el.textContent = t(el.dataset.i18n);
  for (const el of root.querySelectorAll('[data-i18n-title]')) el.title = t(el.dataset.i18nTitle);
  for (const el of root.querySelectorAll('[data-i18n-aria]')) el.setAttribute('aria-label', t(el.dataset.i18nAria));
  for (const el of root.querySelectorAll('[data-i18n-content]')) el.content = t(el.dataset.i18nContent);
  for (const el of root.querySelectorAll('[data-i18n-doc]')) {
    const k = el.dataset.i18nDoc;
    el.textContent = t('docTitle', { title: t(`${k}.title`), ref: t(`${k}.ref`) });
  }
  if (root === document) setCanonical();
}

// One canonical URL per language (the hreflang alternates in each page's head):
// the bare path for English, ?lang= for the others. Other query parameters are dropped.
function setCanonical() {
  let link = document.querySelector('link[rel=canonical]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.append(link);
  }
  const base = location.hostname.endsWith('bibletours3d.org') ? 'https://bibletours3d.org' : location.origin;
  link.href = base + location.pathname + (current.lang === 'en' ? '' : `?lang=${current.lang}`);
}

// The Bible menu: one group of versions per language.
export function fillVersionSelect(select) {
  for (const [l, { name }] of Object.entries(LANGS)) {
    const group = document.createElement('optgroup');
    group.label = name;
    for (const [k, v] of Object.entries(VERSIONS)) if (v.lang === l) group.append(new Option(v.abbr, k));
    select.append(group);
  }
}

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

// The current version's copyright notice, with the publisher's link where its terms require one.
export function noticeHTML() {
  const { notice, link } = VERSIONS[current.version];
  return esc(notice) + (link ? ` <a href="${link}" target="_blank" rel="noopener">${esc(link.replace(/^https:\/\/|\/$/g, ''))}</a>` : '');
}

// A quiet mailto link for feedback, with the page's title as the subject.
const FEEDBACK = 'andyabel+bibetours3d@gmail.com';
export function feedbackHTML() {
  const subject = encodeURIComponent(`Feedback: ${document.title}`);
  return `<a class="feedback" href="mailto:${FEEDBACK}?subject=${subject}">${esc(t('feedback'))}</a>`;
}

// Merges a language file (its exports, shaped like data.js) into the data, in place.
const isText = (v) => typeof v === 'string'
  || Object.keys(v).every((k) => k === 'default' || k in VERSIONS || k in LANGS);
export function addLanguage(target, overlay, lang) {
  for (const [k, ov] of Object.entries(overlay)) {
    if (ov == null) continue;
    const cur = target[k];
    if (isText(ov)) {
      const base = cur == null ? {} : typeof cur === 'string' ? { default: cur } : cur;
      const add = typeof ov === 'string'
        ? { [lang]: ov }
        : Object.fromEntries(Object.entries(ov).map(([vk, s]) => [vk === 'default' ? lang : vk, s]));
      target[k] = { ...base, ...add };
    } else if (cur && typeof cur === 'object') {
      addLanguage(cur, ov, lang);
    } else {
      console.warn(`lang/${lang}.js: "${k}" has nothing to translate in data.js`);
    }
  }
}

// Loads every language's file for an animation and merges each into its data.
// A missing file only means that animation's content stays in English.
export async function loadLanguages(data, base) {
  await Promise.all(Object.keys(LANGS).filter((l) => l !== 'en').map(async (l) => {
    try {
      addLanguage(data, await import(new URL(`lang/${l}.js`, base).href), l);
    } catch (e) {
      console.warn(`No ${LANGS[l].name} text for this animation`, e);
    }
  }));
}
