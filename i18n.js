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
    lukeThomas: 'Inspired by the original fly-by created by Luke Thomas.',
    creditLuke: 'Scripture: {abbr} · Inspired by Luke Thomas',
    credit: 'Scripture: {abbr}',
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
    gateChips: 'What the text records for this gate',
    recorded: 'Recorded in the text',
    notMentioned: 'Not mentioned',
    repairedBy: 'Repaired by',
    materialChips: 'What the text says it is made of',
    named: 'Named in the text',
    notUsed: 'Not used here',
    size: 'Size',
    madeBy: 'Made by',
    atoneChips: 'What atonement is made for (Leviticus 16:33)',
    where: 'Where',
    wearing: 'Wearing',
    stoneRows: 'The stones, row by row (Exodus 28:17–20)',
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
    lukeThomas: 'Inspirado en el vuelo original creado por Luke Thomas.',
    creditLuke: 'Escritura: {abbr} · Inspirado en Luke Thomas',
    credit: 'Escritura: {abbr}',
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
    gateChips: 'Lo que el texto registra de esta puerta',
    recorded: 'Registrado en el texto',
    notMentioned: 'No se menciona',
    repairedBy: 'Reparado por',
    materialChips: 'De qué dice el texto que está hecho',
    named: 'Mencionado en el texto',
    notUsed: 'No se usa aquí',
    size: 'Tamaño',
    madeBy: 'Hecho por',
    atoneChips: 'Por qué se hace expiación (Levítico 16:33)',
    where: 'Dónde',
    wearing: 'Lleva',
    stoneRows: 'Las piedras, hilera por hilera (Éxodo 28:17–20)',
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
    lukeThomas: 'Inspiré du survol original créé par Luke Thomas.',
    creditLuke: 'Écriture : {abbr} · Inspiré de Luke Thomas',
    credit: 'Écriture : {abbr}',
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
    gateChips: 'Ce que le texte rapporte de cette porte',
    recorded: 'Rapporté par le texte',
    notMentioned: 'Non mentionné',
    repairedBy: 'Réparé par',
    materialChips: 'Ce dont le texte dit qu’il est fait',
    named: 'Nommé dans le texte',
    notUsed: 'Pas utilisé ici',
    size: 'Taille',
    madeBy: 'Fait par',
    atoneChips: 'Ce pour quoi l’expiation est faite (Lévitique 16:33)',
    where: 'Où',
    wearing: 'Vêtements',
    stoneRows: 'Les pierres, rangée par rangée (Exode 28:17–20)',
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
