// Content for "The Day of Atonement".
// Plan coordinates: x = cubits east, n = cubits north, with the origin at the
// middle of the tabernacle's doorway (the tent runs west from x = 0, the veil
// hangs at x = -20). One world unit is one cubit (about 45 cm), as in the
// Tabernacle and the Priestly Garments.
//
// The tour follows Leviticus 16 in its own order: the linen garments, the
// offerings, the lots, the bull for Aaron, the incense and the blood inside the
// veil, the altar, the live goat, the change of garments, the burnt offerings,
// and the burning outside the camp.

// Text fields below are English. Any of them may be a plain string (the same in
// every English version) or an object keyed by version id (see VERSIONS in ../i18n.js),
// with an optional `default` used by versions not listed. Other languages are in
// lang/<lang>.js.

// Words that differ between versions. Any text field may contain {term}
// (or {Term} for a capital first letter) and gets the current version's word.
export const TERMS = {
  tunic: { esv: 'coat', kjv: 'coat', default: 'tunic' },
  undergarments: { esv: 'undergarment', kjv: 'breeches', default: 'undergarments' },
  sash: { kjv: 'girdle', default: 'sash' },
  turban: { kjv: 'mitre', default: 'turban' },
  laver: { kjv: 'laver', default: 'basin' },
  tent: { kjv: 'tabernacle of the congregation', default: 'tent of meeting' },
  veil: { niv: 'curtain', kjv: 'vail', default: 'veil' },
  cover: { nasb: 'atoning cover', niv: 'atonement cover', default: 'mercy seat' },
  bull: { kjv: 'bullock', default: 'bull' },
  firepan: { nasb: 'firepan', default: 'censer' },
  household: { esv: 'house', kjv: 'house', default: 'household' },
  blue: { nasb: 'violet', default: 'blue' },
  // The goat sent away (16:8-10, 21-22, 26).
  liveGoat: { esv: 'goat for Azazel', default: 'scapegoat' },
  manReady: { nasb: 'a man who stands ready', niv: 'someone appointed for the task', esv: 'a man who is in readiness', kjv: 'a fit man' },
  bathePlace: { niv: 'in the sanctuary area', kjv: 'in the holy place', default: 'in a holy place' },
  glory: { niv: 'to give him dignity and honor', default: '“for glory and for beauty”' },
  humble: { niv: 'deny themselves', esv: 'afflict themselves', kjv: 'afflict their souls', default: 'humble themselves' },
  sabbath: { niv: 'a day of sabbath rest', kjv: 'a sabbath of rest', default: 'a Sabbath of solemn rest' },
  onceAYear: { nasb: 'once every year', esv: 'once in the year', default: 'once a year' },
};

// The high priest's own garments (Exodus 28), as in the Priestly Garments:
// the twelve breastpiece stones' colours (28:17-20, after the NASB's names),
// the sons of Israel in Hebrew in order of birth (28:10, 21), and "Holy to the
// LORD" (28:36) for the plate.
export const STONES = ['#b0302a', '#d8c25a', '#3f9a5a', '#2f9c8a', '#2c4fb0', '#eef2f4', '#d07a2a', '#9a8a7a', '#7a3fa0', '#e0c860', '#262626', '#4f7f4a'];
export const NAMES_HE = ['ראובן', 'שמעון', 'לוי', 'יהודה', 'דן', 'נפתלי', 'גד', 'אשר', 'יששכר', 'זבולן', 'יוסף', 'בנימן'];
export const HOLY_HE = 'קדש ליהוה';

// What atonement is made for (16:33). Each stop lists the ones its verses name;
// the popup greys out the others.
export const ATONE = {
  self: 'Aaron and his {household}',
  sanctuary: { niv: 'The Most Holy Place', kjv: 'The holy place', default: 'The Holy Place' },
  tent: 'The {tent}',
  altar: 'The altar',
  people: 'The people',
};

// What Aaron is wearing at a stop.
export const WEARING = {
  linen: 'The holy linen garments: {tunic}, {undergarments}, {sash} and {turban} (16:4)',
  glory: 'The high priest’s garments (16:24; Exodus 28)',
};

// Labels. `actor` follows a figure or animal made in main.js; `lift` is the
// height above it. The rest stand at (x, n, y). `group` hides a label until
// that group (made in main.js) is under way, and `after` changes its text
// once a group is done (the goats are named by the lots).
export const LABELS = {
  aaron: { name: 'Aaron', kind: 'person', actor: 'aaron', lift: 4.2 },
  man: { name: { nasb: 'The man who stands ready', niv: 'The man appointed', esv: 'The man in readiness', kjv: 'The fit man' }, kind: 'person', actor: 'man', lift: 4 },
  bull: { name: '{Bull}', kind: 'animal', actor: 'bull', lift: 3.4 },
  ramA: { name: 'Aaron’s ram', kind: 'animal', actor: 'ramA', lift: 2.5 },
  ramP: { name: 'The people’s ram', kind: 'animal', actor: 'ramP', lift: 2.5 },
  goatL: { name: 'Goat', kind: 'animal', actor: 'goatL', lift: 2.5, after: { group: 'lots', name: { kjv: 'The LORD’s lot', default: 'Goat for the LORD' } } },
  goatS: { name: 'Goat', kind: 'animal', actor: 'goatS', lift: 2.5, after: { group: 'lots', name: { esv: 'Goat for Azazel', default: 'Scapegoat' } } },
  laver: { name: '{Laver}', kind: 'item', x: 12, n: 0, y: 3.6 },
  altar: { name: { kjv: 'Altar of Burnt Offering', default: 'Altar' }, kind: 'item', x: 25, n: 0, y: 5.4 },
  cover: { name: { nasb: 'Atoning Cover', niv: 'Atonement Cover', default: 'Mercy Seat' }, kind: 'item', x: -25, n: 0, y: 3.8, inside: true },
  veil: { name: '{Veil}', kind: 'item', x: -20.3, n: 3.2, y: 7.5, inside: true },
  firepan: { name: '{Firepan}', kind: 'item', actor: 'firepan', lift: 0.7, group: 'coals' },
  outside: { name: 'Outside the Camp', kind: 'region', x: 330, n: -110, y: 20, group: 'pyre' },
  wilderness: { name: 'The Wilderness', kind: 'region', x: 470, n: 80, y: 30 },
};

// The camp round the tabernacle, as in the Tabernacle animation (Numbers 2-3):
// one tent for every thousand men of each tribe, in its block on its side, and
// one for every 500 Levites in a closer ring. The tribes aren't labelled here.
export const CAMP = {
  tribes: [
    { side: 'east', place: 0, men: 74600 },    // Judah
    { side: 'east', place: -1, men: 54400 },   // Issachar
    { side: 'east', place: 1, men: 57400 },    // Zebulun
    { side: 'south', place: 0, men: 46500 },   // Reuben
    { side: 'south', place: -1, men: 59300 },  // Simeon
    { side: 'south', place: 1, men: 45650 },   // Gad
    { side: 'west', place: 0, men: 40500 },    // Ephraim
    { side: 'west', place: -1, men: 32200 },   // Manasseh
    { side: 'west', place: 1, men: 35400 },    // Benjamin
    { side: 'north', place: 0, men: 62700 },   // Dan
    { side: 'north', place: -1, men: 41500 },  // Asher
    { side: 'north', place: 1, men: 53400 },   // Naphtali
  ],
  levites: [
    { side: 'west', count: 7500 },    // Gershonites
    { side: 'south', count: 8600 },   // Kohathites
    { side: 'north', count: 6200 },   // Merarites
    { side: 'east', tents: 4 },       // Moses, Aaron and his sons
  ],
};

export const INTRO = {
  title: 'The Day of Atonement',
  ref: 'Leviticus 16:2',
  quote: {
    nasb: '“Tell your brother Aaron that he shall not enter at any time into the Holy Place inside the veil, before the atoning cover which is on the ark, or he will die; for I will appear in the cloud over the atoning cover.”',
    niv: '“Tell your brother Aaron that he is not to come whenever he chooses into the Most Holy Place behind the curtain in front of the atonement cover on the ark, or else he will die. For I will appear in the cloud over the atonement cover.”',
    esv: '“Tell Aaron your brother not to come at any time into the Holy Place inside the veil, before the mercy seat that is on the ark, so that he may not die. For I will appear in the cloud over the mercy seat.”',
    kjv: '“Speak unto Aaron thy brother, that he come not at all times into the holy place within the vail before the mercy seat, which is upon the ark; that he die not: for I will appear in the cloud upon the mercy seat.”',
  },
  note: 'After Aaron’s sons Nadab and Abihu died for offering fire the LORD had not commanded (16:1; 10:1–2), the LORD told Moses how Aaron could come inside the {veil} and live. Once a year, on the tenth day of the seventh month (16:29, 34), the high priest made atonement for himself and his {household}, for the sanctuary, the {tent} and the altar, and for all the people. This tour follows Leviticus 16 step by step.',
  aside: 'Sizes are in cubits (1 cubit ≈ 45 cm), and the tabernacle stands as in the other animations. Leviticus 16 gives the order but not every detail, such as where Aaron bathed, what the lots were or how the blood was carried; the notes say where something is a guess. The slaughter of the animals isn’t shown: they lie down.',
};

export const FINALE = {
  title: 'Once a Year',
  ref: 'Leviticus 16:30',
  quote: {
    nasb: '“…for it is on this day that atonement shall be made for you to cleanse you; you will be clean from all your sins before the LORD.”',
    niv: '“…because on this day atonement will be made for you, to cleanse you. Then, before the LORD, you will be clean from all your sins.”',
    esv: '“For on this day shall atonement be made for you to cleanse you. You shall be clean before the LORD from all your sins.”',
    kjv: '“For on that day shall the priest make an atonement for you, to cleanse you, that ye may be clean from all your sins before the LORD.”',
  },
  note: 'Every year on the tenth day of the seventh month, all Israel, native and stranger alike, were to {humble} and do no work: {sabbath} (16:29–31). The priests anointed after Aaron would do the same in the linen garments (16:32–33), {onceAYear} (16:34). Hebrews 9 looks back to this day, when the high priest alone went into the inner room, once a year and not without blood (9:7).',
};

// Tour stops, in the order of Leviticus 16.
// build: groups (made in main.js) that happen during the flight in, one after
// another. Walks take time in proportion to their length, and the camera
// follows whoever is walking.
// look / cam: where the camera looks and where it sits ({ x, n } plan, y height).
// follow: the camera's offset from a walker ({ x, n, y }) where the default doesn't suit,
// or false to keep to look / cam.
// cutaway: fade the coverings and the south wall to see inside the tent.
// atone: keys of ATONE that the stop's verses name.
// where: a short note of the place. wearing: a key of WEARING.
// labels: keys of LABELS to highlight.
export const STOPS = [
  {
    title: 'The Holy Linen Garments', ref: 'Leviticus 16:4', build: ['bathe', 'linen'],
    quote: {
      nasb: '“He shall put on the holy linen tunic, and the linen undergarments shall be next to his body… (these are holy garments). He shall bathe his body in water and put them on.”',
      niv: '“He is to put on the sacred linen tunic, with linen undergarments next to his body… These are sacred garments; so he must bathe himself with water before he puts them on.”',
      esv: '“He shall put on the holy linen coat and shall have the linen undergarment on his body… these are the holy garments. He shall bathe his body in water and then put them on.”',
      kjv: '“He shall put on the holy linen coat, and he shall have the linen breeches upon his flesh… these are holy garments; therefore shall he wash his flesh in water, and so put them on.”',
    },
    note: 'For this day Aaron doesn’t wear his garments of gold, {blue}, purple and scarlet, but plain linen: a {tunic} over the {undergarments}, a {sash} and a {turban} (16:4). He bathes before he puts them on. The text doesn’t say where or how; here he pours water over himself at the bronze {laver}, where the priests washed (Exodus 30:18–21).',
    where: 'At the bronze {laver}', wearing: 'linen', labels: ['aaron', 'laver'],
    look: { x: 10.9, n: -1, y: 2.1 }, cam: { x: 15.8, n: -6.4, y: 3.8 },
  },
  {
    title: 'The Offerings', ref: 'Leviticus 16:5', build: ['toDoor', 'bring'],
    quote: {
      nasb: '“And he shall take from the congregation of the sons of Israel two male goats as a sin offering, and one ram as a burnt offering.”',
      niv: '“From the Israelite community he is to take two male goats for a sin offering and a ram for a burnt offering.”',
      esv: '“And he shall take from the congregation of the people of Israel two male goats for a sin offering, and one ram for a burnt offering.”',
      kjv: '“And he shall take of the congregation of the children of Israel two kids of the goats for a sin offering, and one ram for a burnt offering.”',
    },
    note: 'Aaron brings his own offerings, a {bull} for a sin offering and a ram for a burnt offering (16:3), and the people give two male goats and a ram. The {bull} makes atonement for Aaron and his {household} (16:6); the goats are for the people (16:15). Here they come in through the court gate and wait north of the altar, where offerings were slaughtered (1:11; 4:24).',
    atone: ['self', 'people'], where: 'The court, north of the altar', wearing: 'linen',
    labels: ['bull', 'ramA', 'ramP', 'goatL', 'goatS'], follow: false,
    look: { x: 27, n: 4, y: 1 }, cam: { x: 14, n: -17, y: 11 },
  },
  {
    title: 'The Lots', ref: 'Leviticus 16:8', build: ['present', 'lots', 'goatBack'],
    quote: {
      nasb: '“Aaron shall cast lots for the two goats, one lot for the LORD and the other lot for the scapegoat.”',
      niv: '“He is to cast lots for the two goats—one lot for the LORD and the other for the scapegoat.”',
      esv: '“And Aaron shall cast lots over the two goats, one lot for the LORD and the other lot for Azazel.”',
      kjv: '“And Aaron shall cast lots upon the two goats; one lot for the LORD, and the other lot for the scapegoat.”',
    },
    note: 'The two goats stand before the LORD at the doorway of the {tent} (16:7). The lots decide which is offered as a sin offering and which is kept alive, to be sent into the wilderness (16:9–10). The Hebrew of the second lot is “for Azazel”, a word whose meaning is debated. The text doesn’t say what the lots were or how they were cast; here they are two plain stones thrown down in front of the goats.',
    atone: ['people'], where: 'Before the doorway of the {tent}', wearing: 'linen', labels: ['aaron', 'goatL', 'goatS'], follow: false,
    look: { x: 5.2, n: 0, y: 1.4 }, cam: { x: 10.5, n: -7.5, y: 4.6 },
  },
  {
    title: 'The {Bull} for Himself', ref: 'Leviticus 16:11', build: ['toBull', 'bullDown'],
    quote: {
      nasb: '“Then Aaron shall offer the bull of the sin offering which is for himself and make atonement for himself and for his household, and he shall slaughter the bull of the sin offering which is for himself.”',
      niv: '“Aaron shall bring the bull for his own sin offering to make atonement for himself and his household, and he is to slaughter the bull for his own sin offering.”',
      esv: '“Aaron shall present the bull as a sin offering for himself, and shall make atonement for himself and for his house. He shall kill the bull as a sin offering for himself.”',
      kjv: '“And Aaron shall bring the bullock of the sin offering, which is for himself, and shall make an atonement for himself, and for his house, and shall kill the bullock of the sin offering which is for himself…”',
    },
    note: 'Before he makes atonement for anyone else, Aaron makes it for himself and his {household}. The {bull} is slaughtered north of the altar (1:11; 4:24); here it lies down, and its blood is kept in a bowl beside it. The text doesn’t name the vessel; the altar had bronze basins for the blood (Exodus 27:3).',
    atone: ['self'], where: 'North of the altar', wearing: 'linen', labels: ['aaron', 'bull'],
    look: { x: 23.6, n: 5.3, y: 1.2 }, cam: { x: 17.4, n: 2.8, y: 4.2 },
  },
  {
    title: 'Coals from the Altar', ref: 'Leviticus 16:12', build: ['toFire', 'coals'],
    quote: {
      nasb: '“He shall take a firepan full of coals of fire from upon the altar before the LORD and two handfuls of finely ground sweet incense, and bring it inside the veil.”',
      niv: '“He is to take a censer full of burning coals from the altar before the LORD and two handfuls of finely ground fragrant incense and take them behind the curtain.”',
      esv: '“And he shall take a censer full of coals of fire from the altar before the LORD, and two handfuls of sweet incense beaten small, and he shall bring it inside the veil…”',
      kjv: '“And he shall take a censer full of burning coals of fire from off the altar before the LORD, and his hands full of sweet incense beaten small, and bring it within the vail…”',
    },
    note: 'The coals come from the altar in the court, whose fire was never to go out (6:12–13). The incense is the holy blend of Exodus 30:34–38, ground fine. The {firepan} isn’t described; the altar’s firepans were bronze (Exodus 27:3), so this one is too, and Aaron carries the incense in his other hand.',
    where: 'At the altar', wearing: 'linen', labels: ['aaron', 'altar', 'firepan'],
    look: { x: 22.6, n: 0, y: 2.6 }, cam: { x: 16.5, n: -6.2, y: 5.4 },
  },
  {
    title: { nasb: 'The Cloud over the Atoning Cover', niv: 'The Cloud over the Atonement Cover', default: 'The Cloud over the Mercy Seat' },
    ref: 'Leviticus 16:13', build: ['toArk', 'cloud'], cutaway: true,
    quote: {
      nasb: '“He shall put the incense on the fire before the LORD, so that the cloud of incense may cover the atoning cover that is on the ark of the testimony, otherwise he will die.”',
      niv: '“He is to put the incense on the fire before the LORD, and the smoke of the incense will conceal the atonement cover above the tablets of the covenant law, so that he will not die.”',
      esv: '“…and put the incense on the fire before the LORD, that the cloud of the incense may cover the mercy seat that is over the testimony, so that he does not die.”',
      kjv: '“And he shall put the incense upon the fire before the LORD, that the cloud of the incense may cover the mercy seat that is upon the testimony, that he die not…”',
    },
    note: 'Behind the {veil} stands only the ark, with the {cover} and its two cherubim over it (Exodus 25:17–22). There the LORD said He would appear in the cloud (16:2). The smoke of the incense hides the {cover} from Aaron. No one else may be in the {tent} while he is inside (16:17). The text doesn’t say what he did with the {firepan}; here he sets it down before the ark.',
    where: 'Inside the {veil}', wearing: 'linen', labels: ['aaron', 'cover', 'firepan'],
    look: { x: -23.4, n: 0, y: 1.9 }, cam: { x: -24.2, n: -12, y: 6.4 },
  },
  {
    title: 'The Blood of the {Bull}', ref: 'Leviticus 16:14', build: ['outBull', 'inBull', 'sprinkle1'], cutaway: true,
    quote: {
      nasb: '“Moreover, he shall take some of the blood of the bull and sprinkle it with his finger on the atoning cover on the east side; also in front of the atoning cover he shall sprinkle some of the blood with his finger seven times.”',
      niv: '“He is to take some of the bull’s blood and with his finger sprinkle it on the front of the atonement cover; then he shall sprinkle some of it with his finger seven times before the atonement cover.”',
      esv: '“And he shall take some of the blood of the bull and sprinkle it with his finger on the front of the mercy seat on the east side, and in front of the mercy seat he shall sprinkle some of the blood with his finger seven times.”',
      kjv: '“And he shall take of the blood of the bullock, and sprinkle it with his finger upon the mercy seat eastward; and before the mercy seat shall he sprinkle of the blood with his finger seven times.”',
    },
    note: 'Aaron goes out for the blood of his {bull} and brings it inside the {veil}. With his finger he sprinkles it on the east side of the {cover}, the side facing him, and seven times in front of it. The text gives no number for the first sprinkling (here it is once), and doesn’t say how the blood was carried.',
    atone: ['self', 'sanctuary'], where: 'Inside the {veil}', wearing: 'linen', labels: ['aaron', 'cover'],
    look: { x: -23, n: 0, y: 1.5 }, cam: { x: -23.6, n: -9.6, y: 5.2 },
  },
  {
    title: 'The Goat for the People', ref: 'Leviticus 16:15', build: ['outGoat', 'goatDown', 'inGoat', 'sprinkle2'], cutaway: true,
    quote: {
      nasb: '“Then he shall slaughter the goat of the sin offering, which is for the people, and bring its blood inside the veil and do with its blood as he did with the blood of the bull…”',
      niv: '“He shall then slaughter the goat for the sin offering for the people and take its blood behind the curtain and do with it as he did with the bull’s blood…”',
      esv: '“Then he shall kill the goat of the sin offering that is for the people and bring its blood inside the veil and do with its blood as he did with the blood of the bull…”',
      kjv: '“Then shall he kill the goat of the sin offering, that is for the people, and bring his blood within the vail, and do with that blood as he did with the blood of the bullock…”',
    },
    note: 'The goat on which the LORD’s lot fell is slaughtered, and its blood is sprinkled as the {bull}’s was, on the {cover} and in front of it. So Aaron makes atonement for the sanctuary, because of the uncleanness of Israel and all their sins, and does the same for the {tent}, which stands among them (16:16). No one may be in the {tent} until he comes out (16:17).',
    atone: ['people', 'sanctuary', 'tent'], where: 'Inside the {veil}', wearing: 'linen', labels: ['aaron', 'cover', 'goatL'],
    look: { x: -23.2, n: 0, y: 1.4 }, cam: { x: -26.5, n: -9.5, y: 5.2 },
  },
  {
    title: 'The Horns of the Altar', ref: 'Leviticus 16:18',
    build: ['toNW', 'horn1', 'toNE', 'horn2', 'toSE', 'horn3', 'toSW', 'horn4', 'toSouth', 'sprinkle3'],
    quote: {
      nasb: '“Then he shall go out to the altar that is before the LORD and make atonement for it; he shall take some of the blood from the bull and some of the blood from the goat, and put it on the horns of the altar on all sides.”',
      niv: '“Then he shall come out to the altar that is before the LORD and make atonement for it. He shall take some of the bull’s blood and some of the goat’s blood and put it on all the horns of the altar.”',
      esv: '“Then he shall go out to the altar that is before the LORD and make atonement for it, and shall take some of the blood of the bull and some of the blood of the goat, and put it on the horns of the altar all around.”',
      kjv: '“And he shall go out unto the altar that is before the LORD, and make an atonement for it; and shall take of the blood of the bullock, and of the blood of the goat, and put it upon the horns of the altar round about.”',
    },
    note: 'Aaron puts blood from both on each of the four horns, then sprinkles it on the altar seven times with his finger, to cleanse it and make it holy from the uncleanness of Israel (16:19). Which altar is meant is debated: the gold altar of incense also had its horns cleansed with blood once a year (Exodus 30:10). Here it is the altar in the court, since Aaron goes out to it.',
    atone: ['altar'], where: 'At the altar', wearing: 'linen', labels: ['aaron', 'altar'], follow: { x: -2, n: -11, y: 15 },
    look: { x: 25, n: -0.5, y: 2.4 }, cam: { x: 18.5, n: -11, y: 7 },
  },
  {
    title: 'The Live Goat', ref: 'Leviticus 16:21', build: ['toLive', 'hands'],
    quote: {
      nasb: '“Then Aaron shall lay both of his hands on the head of the live goat, and confess over it all the wrongdoings of the sons of Israel and all their unlawful acts regarding all their sins; and he shall place them on the head of the goat…”',
      niv: '“He is to lay both hands on the head of the live goat and confess over it all the wickedness and rebellion of the Israelites—all their sins—and put them on the goat’s head.”',
      esv: '“And Aaron shall lay both his hands on the head of the live goat, and confess over it all the iniquities of the people of Israel, and all their transgressions, all their sins. And he shall put them on the head of the goat…”',
      kjv: '“And Aaron shall lay both his hands upon the head of the live goat, and confess over him all the iniquities of the children of Israel, and all their transgressions in all their sins, putting them upon the head of the goat…”',
    },
    note: 'When the sanctuary, the {tent} and the altar have been cleansed, Aaron brings the {liveGoat}, which has stood alive before the LORD (16:10, 20). With both hands on its head he confesses over it all the sins of Israel, and puts them on the goat’s head.',
    atone: ['people'], where: 'Before the doorway of the {tent}', wearing: 'linen', labels: ['aaron', 'goatS'],
    look: { x: 5, n: -1.4, y: 1.7 }, cam: { x: 8.8, n: -7.2, y: 3.7 },
  },
  {
    title: 'Into the Wilderness', ref: 'Leviticus 16:22', build: ['manToGoat', 'lead'],
    quote: {
      nasb: '“Then the goat shall carry on itself all their wrongdoings to an isolated territory; he shall release the goat in the wilderness.”',
      niv: '“The goat will carry on itself all their sins to a remote place; and the man shall release it in the wilderness.”',
      esv: '“The goat shall bear all their iniquities on itself to a remote area, and he shall let the goat go free in the wilderness.”',
      kjv: '“And the goat shall bear upon him all their iniquities unto a land not inhabited: and he shall let go the goat in the wilderness.”',
    },
    note: '{ManReady} leads the goat away (16:21), out of the court, through the camp and into the wilderness, and lets it go. He must wash his clothes and bathe before he comes back into the camp (16:26). Where he took it isn’t said; here he heads east.',
    atone: ['people'], where: 'Through the camp, into the wilderness', wearing: 'linen', labels: ['man', 'goatS', 'wilderness'],
    follow: { x: -10, n: -16, y: 12 },
    look: { x: 214, n: 56, y: 1 }, cam: { x: 176, n: 30, y: 19 },
  },
  {
    title: 'The Linen Garments Left', ref: 'Leviticus 16:23', build: ['toTent', 'unlinen', 'pile'], cutaway: true,
    quote: {
      nasb: '“Then Aaron shall come into the tent of meeting and take off the linen garments which he put on when he went into the Holy Place, and shall leave them there.”',
      niv: '“Then Aaron is to go into the tent of meeting and take off the linen garments he put on before he entered the Most Holy Place, and he is to leave them there.”',
      esv: '“Then Aaron shall come into the tent of meeting and shall take off the linen garments that he put on when he went into the Holy Place and shall leave them there.”',
      kjv: '“And Aaron shall come into the tabernacle of the congregation, and shall put off the linen garments, which he put on when he went into the holy place, and shall leave them there…”',
    },
    note: 'Aaron goes back into the {tent} and takes off the linen garments he wore inside the {veil}. They stay in the {tent}; the text doesn’t say what became of them. Here they are left folded by the wall.',
    where: 'In the {tent}', labels: ['aaron'],
    look: { x: -5.4, n: -2.2, y: 1.9 }, cam: { x: -2.6, n: -12.5, y: 4.6 },
  },
  {
    title: { niv: 'His Regular Garments', default: 'His Own Garments' }, ref: 'Leviticus 16:24',
    build: ['tunic', 'sash', 'robe', 'hem', 'ephod', 'onyx', 'band', 'breastpiece', 'stones', 'chains', 'urim', 'turban', 'plate'], cutaway: true,
    quote: {
      nasb: '“And he shall bathe his body with water in a holy place and put on his clothes…”',
      niv: '“He shall bathe himself with water in the sanctuary area and put on his regular garments.”',
      esv: '“And he shall bathe his body in water in a holy place and put on his garments…”',
      kjv: '“And he shall wash his flesh with water in the holy place, and put on his garments…”',
    },
    note: 'He bathes again (the text says only “{bathePlace}”, so it isn’t shown) and puts on the high priest’s garments, made {glory} (Exodus 28:2): the checkered {tunic} and its {sash}, the {blue} robe with its bells, the ephod with its onyx stones, the breastpiece with its twelve stones, and the {turban} with its golden plate.',
    where: 'In the {tent}', wearing: 'glory', labels: ['aaron'],
    look: { x: -5.2, n: -2.3, y: 2.2 }, cam: { x: -4.4, n: -8.6, y: 3.1 },
  },
  {
    title: 'The Burnt Offerings', ref: 'Leviticus 16:24', build: ['toAltar', 'rams', 'burn'],
    quote: {
      nasb: '“…and come out and offer his burnt offering and the burnt offering of the people, and make atonement for himself and for the people.”',
      niv: '“Then he shall come out and sacrifice the burnt offering for himself and the burnt offering for the people, to make atonement for himself and for the people.”',
      esv: '“…and come out and offer his burnt offering and the burnt offering of the people and make atonement for himself and for the people.”',
      kjv: '“…and come forth, and offer his burnt offering, and the burnt offering of the people, and make an atonement for himself, and for the people.”',
    },
    note: 'Aaron comes out and offers the two rams, his own and the people’s (16:3, 5), as burnt offerings, burned whole on the altar (1:9). He also burns the fat of the sin offerings there (16:25).',
    atone: ['self', 'people'], where: 'At the altar', wearing: 'glory', labels: ['aaron', 'ramA', 'ramP', 'altar'],
    look: { x: 24, n: 2.5, y: 3 }, cam: { x: 13, n: -14, y: 9.5 },
  },
  {
    title: 'Outside the Camp', ref: 'Leviticus 16:27', build: ['carry', 'pyre'],
    quote: {
      nasb: '“But the bull of the sin offering and the goat of the sin offering, whose blood was brought in to make atonement in the Holy Place, shall be taken outside the camp, and they shall burn their hides, their flesh, and their refuse in the fire.”',
      niv: '“The bull and the goat for the sin offerings, whose blood was brought into the Most Holy Place to make atonement, must be taken outside the camp; their hides, flesh and intestines are to be burned up.”',
      esv: '“And the bull for the sin offering and the goat for the sin offering, whose blood was brought in to make atonement in the Holy Place, shall be carried outside the camp. Their skin and their flesh and their dung shall be burned up with fire.”',
      kjv: '“And the bullock for the sin offering, and the goat for the sin offering, whose blood was brought in to make atonement in the holy place, shall one carry forth without the camp; and they shall burn in the fire their skins, and their flesh, and their dung.”',
    },
    note: 'A sin offering whose blood was brought into the sanctuary isn’t eaten by the priests (6:30): it is burned outside the camp. The one who burns it must wash his clothes and bathe before he comes back into the camp (16:28). The text doesn’t say where outside the camp; here it is beyond the tents on the east.',
    where: 'Outside the camp', wearing: 'glory', labels: ['outside'],
    look: { x: 314, n: -100, y: 3 }, cam: { x: 351, n: -129, y: 11 },
  },
];
