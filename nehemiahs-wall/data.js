// Content for "Nehemiah's Wall".
// Plan coordinates: x = metres east, n = metres north (see terrain.js).
//
// The circuit follows the order of Nehemiah 3: it starts at the Sheep Gate
// (north-east), runs west along the north side, south down the west side,
// round the southern tip, and back north along the east side - i.e.
// counter-clockwise. This reconstruction follows the commonly held "smaller
// city" view: the post-exilic wall enclosed the City of David ridge and the
// Temple Mount, not the western hill.

// Text fields below are English. Any of them may be a plain string (the same in
// every English version) or an object keyed by version id (see VERSIONS in ../i18n.js),
// with an optional `default` used by versions not listed. Other languages are in
// lang/<lang>.js.

// Names for the gate parts shown in the popup, as each version words them.
export const PARTS = {
  beams: 'Beams',
  doors: 'Doors',
  bolts: { kjv: 'Locks', default: 'Bolts' },
  bars: 'Bars',
  covered: { esv: 'Covered', kjv: 'Covered', default: 'Roofed' },
  consecrated: { nasb: 'Consecrated', esv: 'Consecrated', kjv: 'Sanctified', default: 'Dedicated' },
};

export const WALL = [
  { id: 'sheep', x: 110, n: 720 },
  { id: 'meah', x: 30, n: 748 },
  { id: 'hananel', x: -50, n: 748 },
  { id: 'fish', x: -140, n: 715 },
  { id: 'old', x: -210, n: 640 },
  { id: 'w1', x: -218, n: 540 },
  { id: 'broad', x: -208, n: 450 },
  { id: 'w2', x: -188, n: 345 },
  { id: 'ovens', x: -165, n: 250 },
  { id: 'w3', x: -140, n: 150 },
  { id: 'valley', x: -115, n: 60 },
  { id: 'w4', x: -100, n: -100 },
  { id: 'w5', x: -82, n: -270 },
  { id: 'dung', x: -55, n: -430 },
  { id: 'fountain', x: -10, n: -500 },
  { id: 'siloam', x: 40, n: -492 },
  { id: 'stairs', x: 65, n: -430 },
  { id: 'tombs', x: 76, n: -330 },
  { id: 'pool', x: 82, n: -255 },
  { id: 'mighty', x: 88, n: -190 },
  { id: 'armory', x: 94, n: -112 },
  { id: 'eliashib', x: 110, n: -42 },
  { id: 'corner', x: 126, n: 25 },
  { id: 'kingtower', x: 114, n: 100 },
  { id: 'water', x: 120, n: 165 },
  { id: 'greattower', x: 126, n: 228 },
  { id: 'ophel', x: 132, n: 290 },
  { id: 'horse', x: 150, n: 360 },
  { id: 'priests', x: 165, n: 440 },
  { id: 'east', x: 175, n: 510 },
  { id: 'chamber', x: 178, n: 580 },
  { id: 'muster', x: 175, n: 645 },
  { id: 'corner2', x: 165, n: 712 },
];

// Segments (named by their starting point) built extra thick: the Broad Wall.
export const THICK_SEGMENTS = { w1: 6.5, broad: 6.5 };

// What the text says about each gate. `repair` is the wording of the record;
// the boolean fields drive what is modelled. Anything not mentioned is not built.
export const GATES = {
  sheep: {
    name: 'Sheep Gate', ref: '3:1', repair: 'Built', consecrated: true, doors: true,
  },
  fish: {
    name: 'Fish Gate', ref: '3:3', repair: 'Built', beams: true, doors: true, bolts: true, bars: true,
  },
  old: {
    name: { nasb: 'Ancient Gate', niv: 'Jeshanah Gate', esv: 'Gate of Yeshanah', kjv: 'Old Gate' }, ref: '3:6', repair: 'Repaired', beams: true, doors: true, bolts: true, bars: true,
  },
  valley: {
    name: 'Valley Gate', ref: '3:13', repair: 'Repaired & built', doors: true, bolts: true, bars: true,
  },
  dung: {
    name: 'Dung Gate', ref: '3:14', repair: 'Repaired & built', doors: true, bolts: true, bars: true,
  },
  fountain: {
    name: { kjv: 'Gate of the Fountain', default: 'Fountain Gate' }, ref: '3:15', repair: 'Repaired & built', covered: true, doors: true, bolts: true, bars: true,
  },
  // Repairs ran "over against" the Water Gate but not on it: it stands intact, needing no repair.
  water: {
    name: 'Water Gate', ref: '3:26', repair: 'Not said to be repaired', intact: true,
  },
  horse: {
    name: 'Horse Gate', ref: '3:28', repair: 'Priests repaired above it',
  },
  east: {
    name: 'East Gate', ref: '3:29', repair: 'Only its keeper is named',
  },
  muster: {
    name: { esv: 'Muster Gate', kjv: 'Gate Miphkad', default: 'Inspection Gate' }, ref: '3:31', repair: 'Repairs ran opposite it',
  },
};

export const TOWERS = {
  meah: { name: { kjv: 'Tower of Meah', default: 'Tower of the Hundred' }, size: 9 },
  hananel: { name: { kjv: 'Tower of Hananeel', default: 'Tower of Hananel' }, size: 9 },
  ovens: { name: { nasb: 'Tower of Furnaces', kjv: 'Tower of the Furnaces', default: 'Tower of the Ovens' }, size: 9 },
  kingtower: {
    name: { niv: 'Tower of the Upper Palace', kjv: 'Tower of the King’s High House', default: 'Tower of the King’s Upper House' },
    size: 10,
  },
  greattower: {
    name: { kjv: 'Great Tower That Lieth Out', default: 'Great Projecting Tower' },
    size: 13,
  },
  corner2: {
    name: { nasb: 'Upper Room of the Corner', niv: 'Room Above the Corner', esv: 'Upper Chamber of the Corner', kjv: 'Going Up of the Corner' },
    size: 9, chamber: true,
  },
};

// Labelled places. kind: 'feature' (small label), 'region' (large), 'valley' (large, italic).
export const FEATURES = {
  temple: { name: 'The Temple', x: 40, n: 520, kind: 'feature', lift: 24 },
  broadWall: { name: 'Broad Wall', x: -213, n: 495, kind: 'feature', lift: 14 },
  poolSiloam: { name: { niv: 'Pool of Siloam', kjv: 'Pool of Siloah', default: 'Pool of Shelah' }, x: 26, n: -466, kind: 'feature', lift: 6 },
  kingsGarden: { name: 'King’s Garden', x: 80, n: -560, kind: 'feature', lift: 14 },
  stairs: { name: { nasb: 'Steps from the City of David', niv: 'Steps from the City of David', default: 'Stairs from the City of David' }, x: 40, n: -418, kind: 'feature', lift: 8 },
  tombs: { name: { kjv: 'Sepulchres of David', default: 'Tombs of David' }, x: 56, n: -335, kind: 'feature', lift: 9 },
  artificialPool: { name: { kjv: 'The Pool That Was Made', default: 'The Artificial Pool' }, x: 62, n: -255, kind: 'feature', lift: 5 },
  mighty: { name: { niv: 'House of the Heroes', esv: 'House of the Mighty Men', default: 'House of the Mighty' }, x: 70, n: -188, kind: 'feature', lift: 10 },
  armory: { name: { nasb: 'Ascent of the Armory', kjv: 'Going Up to the Armoury', default: 'Ascent to the Armory' }, x: 74, n: -118, kind: 'feature', lift: 10 },
  eliashib: { name: 'House of Eliashib the High Priest', x: 92, n: -40, kind: 'feature', lift: 10 },
  angle: { name: { esv: 'The Buttress', kjv: 'The Turning of the Wall', default: 'The Angle' }, x: 108, n: -108, kind: 'feature', lift: 16 },
  kingsHouse: {
    name: {
      nasb: 'King’s Upper House & Courtyard of the Guard', niv: 'Upper Palace & Court of the Guard',
      esv: 'King’s Upper House & Court of the Guard', kjv: 'King’s High House & Court of the Prison',
    },
    x: 88, n: 104, kind: 'feature', lift: 14,
  },
  gihon: { name: 'Gihon Spring', x: 197, n: 108, kind: 'feature', lift: 6 },
  ophel: { name: 'Ophel', x: 92, n: 290, kind: 'region', lift: 30 },
  cityOfDavid: { name: 'City of David', x: 5, n: -180, kind: 'region', lift: 40 },
  kidron: { name: 'Kidron Valley', x: 232, n: -10, kind: 'valley', lift: 12 },
  kidronN: { name: 'Kidron Valley', x: 258, n: 640, kind: 'valley', lift: 12 },
  hinnom: { name: 'Valley of Hinnom', x: -330, n: -640, kind: 'valley', lift: 12 },
  olives: { name: 'Mount of Olives', x: 760, n: 330, kind: 'valley', lift: 30 },
};

export const INTRO = {
  title: 'Jerusalem, 445 BC',
  ref: 'Nehemiah 1–3',
  quote: {
    nasb: '“The wall of Jerusalem is broken down and its gates have been burned with fire.” (1:3)',
    niv: '“The wall of Jerusalem is broken down, and its gates have been burned with fire.” (1:3)',
    esv: '“The wall of Jerusalem is broken down, and its gates are destroyed by fire.” (1:3)',
    kjv: '“The wall of Jerusalem also is broken down, and the gates thereof are burned with fire.” (1:3)',
  },
  note: 'Nehemiah, cupbearer to King Artaxerxes, has come home to a ruined city. Chapter 3 lists who rebuilt each piece of wall, in order, counter-clockwise from the Sheep Gate. This tour follows that list, and the wall goes back up as we pass.',
  aside: 'The circuit shown is the smaller post-exilic city: the City of David ridge and the Temple Mount. Positions are approximate.',
};

export const FINALE = {
  title: 'The Wall Is Finished',
  ref: 'Nehemiah 6:15–16',
  quote: {
    nasb: '“So the wall was completed on the twenty-fifth of the month Elul, in fifty-two days.”',
    niv: '“So the wall was completed on the twenty-fifth of Elul, in fifty-two days.”',
    esv: '“So the wall was finished on the twenty-fifth day of the month Elul, in fifty-two days.”',
    kjv: '“So the wall was finished in the twenty and fifth day of the month Elul, in fifty and two days.”',
  },
  note: {
    nasb: 'Their enemies “realized that this work had been accomplished with the help of our God” (6:16). Each family repaired the stretch by its own house, and the whole circuit was done in under two months, mostly with the limestone lying in the rubble.',
    niv: 'Their enemies “realized that this work had been done with the help of our God” (6:16). Each family repaired the stretch by its own house, and the whole circuit was done in under two months, mostly with the limestone lying in the rubble.',
    esv: 'Their enemies “perceived that this work had been accomplished with the help of our God” (6:16). Each family repaired the stretch by its own house, and the whole circuit was done in under two months, mostly with the limestone lying in the rubble.',
    kjv: 'Their enemies “perceived that this work was wrought of our God” (6:16). Each family repaired the stretch by its own house, and the whole circuit was done in under two months, mostly with the limestone lying in the rubble.',
  },
};

// Tour stops, in the order of Nehemiah 3.
// wall: the WALL point whose stretch (from the previous stop) gets rebuilt on the way in.
// target: what the camera looks at (defaults to the gate/tower/wall point).
// view: camera placement relative to the wall: side 'in' (city side) or 'out',
//       dist from the wall, h above wall ground, along = metres along the wall.
export const STOPS = [
  {
    wall: 'sheep', gate: 'sheep', title: 'The Sheep Gate', ref: '3:1',
    quote: {
      nasb: '“Then Eliashib the high priest arose with his brothers the priests and built the Sheep Gate; they consecrated it and installed its doors.”',
      niv: '“Eliashib the high priest and his fellow priests went to work and rebuilt the Sheep Gate. They dedicated it and set its doors in place…”',
      esv: '“Then Eliashib the high priest rose up with his brothers the priests, and they built the Sheep Gate. They consecrated it and set its doors.”',
      kjv: '“Eliashib the high priest rose up with his brethren the priests, and they builded the sheep gate; they sanctified it, and set up the doors of it.”',
    },
    note: 'The priests started at the gate nearest the Temple, where sheep came in for sacrifice. Doors are set up, but no bolts or bars are mentioned. This is the only gate said to be consecrated.',
    builders: 'Eliashib the high priest & the priests',
    view: { side: 'in', dist: 46, h: 17, along: 26 },
  },
  {
    wall: 'hananel', target: { x: -10, n: 748 }, towers: ['meah', 'hananel'],
    title: { kjv: 'Towers of Meah & Hananeel', default: 'Towers of the Hundred & Hananel' }, ref: '3:1–2',
    quote: {
      nasb: '“They consecrated the wall to the Tower of the Hundred and the Tower of Hananel.”',
      niv: '“…building as far as the Tower of the Hundred, which they dedicated, and as far as the Tower of Hananel.”',
      esv: '“They consecrated it as far as the Tower of the Hundred, as far as the Tower of Hananel.”',
      kjv: '“…even unto the tower of Meah they sanctified it, unto the tower of Hananeel.”',
    },
    note: 'The north side had no deep valley to protect it, so it was guarded by towers. The consecration ran this far. The men of Jericho worked next, then Zaccur son of Imri.',
    builders: 'The priests · men of Jericho · Zaccur',
    view: { side: 'out', dist: 75, h: 30, along: 0 },
  },
  {
    wall: 'fish', gate: 'fish', title: 'The Fish Gate', ref: '3:3–5',
    quote: {
      nasb: '“Now the sons of Hassenaah built the Fish Gate; they laid its beams and installed its doors with its bolts and bars.”',
      niv: '“The Fish Gate was rebuilt by the sons of Hassenaah. They laid its beams and put its doors and bolts and bars in place.”',
      esv: '“The sons of Hassenaah built the Fish Gate. They laid its beams and set its doors, its bolts, and its bars.”',
      kjv: '“…who also laid the beams thereof, and set up the doors thereof, the locks thereof, and the bars thereof.”',
    },
    note: {
      nasb: 'Probably named for the fish trade (Tyrians sold fish here, 13:16). This is the first gate described in full: beams, doors, bolts and bars. Next came Meremoth, Meshullam, Zadok and the Tekoites, “but their nobles did not support the work of their masters.”',
      niv: 'Probably named for the fish trade (Tyrians sold fish here, 13:16). This is the first gate described in full: beams, doors, bolts and bars. Next came Meremoth, Meshullam, Zadok and the Tekoites, “but their nobles would not put their shoulders to the work under their supervisors.”',
      esv: 'Probably named for the fish trade (Tyrians sold fish here, 13:16). This is the first gate described in full: beams, doors, bolts and bars. Next came Meremoth, Meshullam, Zadok and the Tekoites, “but their nobles would not stoop to serve their Lord.”',
      kjv: 'Probably named for the fish trade (Tyrians sold fish here, 13:16). This is the first gate described in full: beams, doors, bolts (“locks”) and bars. Next came Meremoth, Meshullam, Zadok and the Tekoites, “but their nobles put not their necks to the work.”',
    },
    builders: 'Sons of Hassenaah',
    view: { side: 'in', dist: 40, h: 15, along: -24 },
  },
  {
    wall: 'old', gate: 'old',
    title: { nasb: 'The Ancient Gate', niv: 'The Jeshanah Gate', esv: 'The Gate of Yeshanah', kjv: 'The Old Gate' }, ref: '3:6',
    quote: {
      nasb: '“Now Joiada the son of Paseah and Meshullam the son of Besodeiah repaired the Ancient Gate; they laid its beams and installed its doors with its bolts and its bars.”',
      niv: '“The Jeshanah Gate was repaired by Joiada son of Paseah and Meshullam son of Besodeiah. They laid its beams and put its doors with their bolts and bars in place.”',
      esv: '“Joiada the son of Paseah and Meshullam the son of Besodeiah repaired the Gate of Yeshanah. They laid its beams and set its doors, its bolts, and its bars.”',
      kjv: '“…they laid the beams thereof, and set up the doors thereof, and the locks thereof, and the bars thereof.”',
    },
    note: {
      kjv: 'Also called the Jeshanah Gate. The name may mean the gate of the old city, or the road to the town of Jeshanah. Like the Fish Gate it gets beams, doors, bolts and bars.',
      nasb: 'Its Hebrew name, Jeshanah, means “old,” and the KJV calls it the Old Gate. The name may mean the gate of the old city, or the road to the town of Jeshanah. Like the Fish Gate it gets beams, doors, bolts and bars.',
      esv: 'Yeshanah means “old,” and the KJV calls it the Old Gate. The name may mean the gate of the old city, or the road to the town of Jeshanah. Like the Fish Gate it gets beams, doors, bolts and bars.',
      default: 'Jeshanah means “old,” and the KJV calls it the Old Gate. The name may mean the gate of the old city, or the road to the town of Jeshanah. Like the Fish Gate it gets beams, doors, bolts and bars.',
    },
    builders: 'Joiada son of Paseah & Meshullam son of Besodeiah',
    view: { side: 'in', dist: 40, h: 15, along: -24 },
  },
  {
    wall: 'broad', target: { x: -212, n: 490 }, feature: 'broadWall',
    title: 'The Broad Wall', ref: '3:7–8',
    quote: {
      nasb: '“…and they restored Jerusalem as far as the Broad Wall.”',
      niv: '“…They restored Jerusalem as far as the Broad Wall.”',
      esv: '“…and they restored Jerusalem as far as the Broad Wall.”',
      kjv: '“…and they fortified Jerusalem unto the broad wall.”',
    },
    note: 'Men of Gibeon and Mizpah worked here, along with Uzziel the goldsmith and Hananiah the perfumer. Avigad excavated a 7 m-thick “Broad Wall” from Hezekiah’s day on the western hill, and it is debated whether Nehemiah’s line reached it. Here it is shown in a simplified position.',
    builders: 'Men of Gibeon & Mizpah · Uzziel · Hananiah',
    view: { side: 'out', dist: 60, h: 28, along: -20 },
  },
  {
    wall: 'ovens', towers: ['ovens'],
    title: { nasb: 'The Tower of Furnaces', kjv: 'The Tower of the Furnaces', default: 'The Tower of the Ovens' }, ref: '3:9–12',
    quote: {
      nasb: '“Malchijah the son of Harim and Hasshub the son of Pahath-moab repaired another section and the Tower of Furnaces.”',
      niv: '“Malkijah son of Harim and Hasshub son of Pahath-Moab repaired another section and the Tower of the Ovens.”',
      esv: '“Malchijah the son of Harim and Hasshub the son of Pahath-moab repaired another section and the Tower of the Ovens.”',
      kjv: '“Malchijah… and Hashub… repaired the other piece, and the tower of the furnaces.”',
    },
    note: {
      niv: 'Possibly named for bakers’ ovens (compare the bakers’ street, Jer 37:21). Rulers of the two halves of the Jerusalem district worked nearby. Shallum worked here “with the help of his daughters.”',
      default: 'Possibly named for bakers’ ovens (compare the bakers’ street, Jer 37:21). Rulers of the two halves of the Jerusalem district worked nearby. Shallum worked here, “he and his daughters.”',
    },
    builders: 'Rephaiah · Jedaiah · Hattush · Malchijah · Hashub · Shallum & daughters',
    view: { side: 'out', dist: 60, h: 26, along: -25 },
  },
  {
    wall: 'valley', gate: 'valley', title: 'The Valley Gate', ref: '3:13',
    quote: {
      nasb: '“…They built it and installed its doors with its bolts and its bars, and a thousand cubits of the wall to the Dung Gate.”',
      niv: '“…They rebuilt it and put its doors with their bolts and bars in place. They also repaired a thousand cubits of the wall as far as the Dung Gate.”',
      esv: '“…They rebuilt it and set its doors, its bolts, and its bars, and repaired a thousand cubits of the wall, as far as the Dung Gate.”',
      kjv: '“…they built it, and set up the doors thereof, the locks thereof, and the bars thereof, and a thousand cubits on the wall unto the dung gate.”',
    },
    note: 'Nehemiah’s night inspection started here (2:13). In 1927 Crowfoot and FitzGerald excavated a gate in the west wall of the City of David that many identify as this one. A thousand cubits is about 450–500 m.',
    builders: 'Hanun & the inhabitants of Zanoah',
    view: { side: 'in', dist: 40, h: 14, along: -24 },
  },
  {
    wall: 'dung', gate: 'dung', title: 'The Dung Gate', ref: '3:14',
    quote: {
      nasb: '“And Malchijah the son of Rechab, the official of the district of Beth-haccherem repaired the Dung Gate. He built it and installed its doors with its bolts and its bars.”',
      niv: '“The Dung Gate was repaired by Malkijah son of Rekab, ruler of the district of Beth Hakkerem. He rebuilt it and put its doors with their bolts and bars in place.”',
      esv: '“Malchijah the son of Rechab, ruler of the district of Beth-haccherem, repaired the Dung Gate. He rebuilt it and set its doors, its bolts, and its bars.”',
      kjv: '“But the dung gate repaired Malchiah the son of Rechab… he built it, and set up the doors thereof, the locks thereof, and the bars thereof.”',
    },
    note: 'The refuse gate stood near the southern tip, above the Valley of Hinnom where rubbish was carried out. We have just flown the 1,000 cubits from the Valley Gate.',
    builders: 'Malchijah son of Rechab, ruler of Beth-haccherem',
    view: { side: 'in', dist: 40, h: 14, along: -24 },
  },
  {
    wall: 'fountain', gate: 'fountain',
    title: { kjv: 'The Gate of the Fountain', default: 'The Fountain Gate' }, ref: '3:15',
    quote: {
      nasb: '“…He built it, made a roof for it, and installed its doors with its bolts and its bars.”',
      niv: '“…He rebuilt it, roofing it over and putting its doors and bolts and bars in place.”',
      esv: '“…He rebuilt it and covered it and set its doors, its bolts, and its bars.”',
      kjv: '“…he built it, and covered it, and set up the doors thereof, the locks thereof, and the bars thereof.”',
    },
    note: {
      esv: 'This is the only gate said to be “covered,” meaning roofed over. It also has doors, bolts and bars. It was named for the spring-fed waters at the foot of the ridge.',
      kjv: 'This is the only gate said to be “covered,” meaning roofed over. It also has doors, bolts and bars. It was named for the spring-fed waters at the foot of the ridge.',
      default: 'This is the only gate said to be roofed over. It also has doors, bolts and bars. It was named for the spring-fed waters at the foot of the ridge.',
    },
    builders: 'Shallun son of Col-hozeh, ruler of Mizpah',
    view: { side: 'in', dist: 44, h: 17, along: -26 },
  },
  {
    wall: 'siloam', target: { x: 30, n: -485 }, feature: 'poolSiloam',
    title: {
      niv: 'Pool of Siloam & the King’s Garden', kjv: 'Pool of Siloah & the King’s Garden', default: 'Pool of Shelah & the King’s Garden',
    },
    ref: '3:15',
    quote: {
      nasb: '“…the wall of the Pool of Shelah at the king’s garden…”',
      niv: '“He also repaired the wall of the Pool of Siloam, by the King’s Garden…”',
      esv: '“And he built the wall of the Pool of Shelah of the king’s garden…”',
      kjv: '“…and the wall of the pool of Siloah by the king’s garden.”',
    },
    note: {
      niv: 'Hezekiah’s tunnel carried water from the Gihon Spring to this end of the city (2 Kgs 20:20). The royal garden lay below, where the Kidron and Hinnom valleys meet. Centuries later Jesus sent a blind man to wash in this pool (John 9:7).',
      default: 'Hezekiah’s tunnel carried water from the Gihon Spring to this end of the city (2 Kgs 20:20). The royal garden lay below, where the Kidron and Hinnom valleys meet. Centuries later Jesus sent a blind man to wash in this pool, by then called Siloam (John 9:7).',
    },
    builders: 'Shallun',
    view: { side: 'out', dist: 100, h: 55, along: 0 },
  },
  {
    wall: 'stairs', target: { x: 45, n: -420 }, feature: 'stairs',
    title: { nasb: 'The Steps Down from the City of David', niv: 'The Steps Down from the City of David', default: 'The Stairs from the City of David' }, ref: '3:15',
    quote: {
      nasb: '“…as far as the steps that descend from the city of David.”',
      niv: '“…as far as the steps going down from the City of David.”',
      esv: '“…as far as the stairs that go down from the city of David.”',
      kjv: '“…and unto the stairs that go down from the city of David.”',
    },
    note: 'Here the record turns north along the east side. Kenyon found that the post-exilic wall ran along the crest of the ridge, well above the older wall on the slope, whose collapsed terraces Nehemiah could not ride through (2:14).',
    builders: 'Shallun',
    view: { side: 'in', dist: 40, h: 26, along: -25 },
  },
  {
    wall: 'tombs', target: { x: 56, n: -335 }, feature: 'tombs',
    title: { kjv: 'Over Against the Sepulchres of David', default: 'Opposite the Tombs of David' }, ref: '3:16',
    quote: {
      nasb: '“After him Nehemiah the son of Azbuk, official of half the district of Beth-zur, made repairs… as far as a point opposite the tombs of David…”',
      niv: '“…Nehemiah son of Azbuk, ruler of a half-district of Beth Zur, made repairs up to a point opposite the tombs of David…”',
      esv: '“After him Nehemiah the son of Azbuk, ruler of half the district of Beth-zur, repaired to a point opposite the tombs of David…”',
      kjv: '“After him repaired Nehemiah the son of Azbuk… unto the place over against the sepulchres of David.”',
    },
    note: 'This is a different Nehemiah, ruler of half of Beth-zur. David was buried in the City of David (1 Kgs 2:10). Weill’s 1913–14 dig found rock-cut tunnel tombs here that some propose as the royal tombs.',
    builders: 'Nehemiah son of Azbuk',
    view: { side: 'in', dist: 50, h: 28, along: -30 },
  },
  {
    wall: 'pool', target: { x: 62, n: -255 }, feature: 'artificialPool',
    title: { kjv: 'The Pool That Was Made', default: 'The Artificial Pool' }, ref: '3:16',
    quote: {
      nasb: '“…the artificial pool…”',
      kjv: '“…and to the pool that was made.”',
      default: '“…as far as the artificial pool…”',
    },
    note: 'This is a man-made reservoir, separate from the Pool of Siloam. It may be linked to the waterworks of Hezekiah’s day (Isa 22:9–11). Its exact spot is unknown.',
    builders: 'Nehemiah son of Azbuk',
    view: { side: 'in', dist: 45, h: 24, along: -25 },
  },
  {
    wall: 'mighty', target: { x: 70, n: -188 }, feature: 'mighty',
    title: { niv: 'The House of the Heroes', kjv: 'The House of the Mighty', default: 'The House of the Mighty Men' }, ref: '3:16–18',
    quote: {
      nasb: '“…the house of the mighty men.”',
      niv: '“…and the House of the Heroes.”',
      esv: '“…and as far as the house of the mighty men.”',
      kjv: '“…and unto the house of the mighty.”',
    },
    note: 'Perhaps the barracks of David’s warriors, his mighty men (2 Sam 23:8). The Levites under Rehum came next, then Hashabiah and Bavvai for their districts of Keilah.',
    builders: 'Nehemiah son of Azbuk · Levites · Hashabiah · Bavvai',
    view: { side: 'in', dist: 45, h: 24, along: -25 },
  },
  {
    wall: 'armory', target: { x: 82, n: -116 }, feature: 'armory',
    title: {
      nasb: 'The Ascent of the Armory, at the Angle', esv: 'The Ascent to the Armory, at the Buttress', kjv: 'The Going Up to the Armoury, at the Turning',
      default: 'The Ascent to the Armory, at the Angle',
    },
    ref: '3:19',
    quote: {
      nasb: '“…repaired another section in front of the ascent of the armory at the Angle.”',
      niv: '“…from a point facing the ascent to the armory as far as the angle of the wall.”',
      esv: '“…repaired another section opposite the ascent to the armory at the buttress.”',
      kjv: '“…over against the going up to the armoury at the turning of the wall.”',
    },
    note: {
      esv: 'Ezer, ruler of Mizpah, repaired another section. The wall changes direction here, at “the buttress,” an angle or buttress in the line.',
      kjv: 'Ezer, ruler of Mizpah, repaired “another piece.” The wall changes direction here, at “the turning,” an angle or buttress.',
      default: 'Ezer, ruler of Mizpah, repaired another section. The wall changes direction here, at “the angle,” a turn or buttress in the line.',
    },
    builders: 'Ezer son of Jeshua, ruler of Mizpah',
    view: { side: 'out', dist: 55, h: 30, along: -30 },
  },
  {
    wall: 'eliashib', target: { x: 95, n: -42 }, feature: 'eliashib',
    title: 'The House of Eliashib', ref: '3:20–21',
    quote: {
      nasb: '“After him Baruch the son of Zabbai zealously repaired another section, from the Angle to the doorway of the house of Eliashib the high priest.”',
      niv: '“Baruch son of Zabbai zealously repaired another section, from the angle to the entrance of the house of Eliashib the high priest.”',
      esv: '“After him Baruch the son of Zabbai repaired another section from the buttress to the door of the house of Eliashib the high priest.”',
      kjv: '“…from the turning of the wall unto the door of the house of Eliashib the high priest.”',
    },
    note: {
      niv: 'Baruch “zealously repaired.” Then Meremoth worked from Eliashib’s door to the end of his house. The high priest who began at the Sheep Gate lived here.',
      esv: 'After Baruch, Meremoth worked from Eliashib’s door to the end of his house. The high priest who began at the Sheep Gate lived here.',
      nasb: 'Baruch “zealously repaired.” Then Meremoth worked from Eliashib’s door to the end of his house. The high priest who began at the Sheep Gate lived here.',
      kjv: 'Baruch “earnestly repaired.” Then Meremoth worked from Eliashib’s door to the end of his house. The high priest who began at the Sheep Gate lived here.',
    },
    builders: 'Baruch son of Zabbai · Meremoth son of Urijah',
    view: { side: 'in', dist: 42, h: 22, along: -28 },
  },
  {
    wall: 'corner', target: { x: 126, n: 25 },
    title: { esv: 'The Buttress & the Corner', kjv: 'The Turning & the Corner', default: 'The Angle & the Corner' }, ref: '3:22–24',
    quote: {
      nasb: '“…from the house of Azariah as far as the Angle and as far as the corner.”',
      niv: '“…from Azariah’s house to the angle and the corner.”',
      esv: '“…from the house of Azariah to the buttress and to the corner.”',
      kjv: '“…unto the turning of the wall, even unto the corner.”',
    },
    note: 'Priests from the surrounding area worked here, then Benjamin, Hashub and Azariah, each by his own house. Everyone guarded his own home. Binnui finished at the corner.',
    builders: 'Priests of the surrounding area · Benjamin · Hashub · Azariah · Binnui',
    view: { side: 'out', dist: 55, h: 30, along: -35 },
  },
  {
    wall: 'kingtower', towers: ['kingtower'], feature: 'kingsHouse',
    title: {
      niv: 'The Tower of the Upper Palace', kjv: 'The Tower of the King’s High House',
      default: 'The Tower of the King’s Upper House',
    },
    ref: '3:25',
    quote: {
      nasb: '“…the tower projecting from the upper house of the king, which is by the courtyard of the guard.”',
      niv: '“…the tower projecting from the upper palace near the court of the guard.”',
      esv: '“…the tower projecting from the upper house of the king at the court of the guard.”',
      kjv: '“…the tower which lieth out from the king’s high house, that was by the court of the prison.”',
    },
    note: 'A tower stood out from the old royal palace, next to the court of the guard where Jeremiah was held (Jer 32:2). Eilat Mazar linked large structures on this crest to the palace and to Nehemiah’s wall. Both claims are debated.',
    builders: 'Palal son of Uzai · Pedaiah son of Parosh',
    view: { side: 'out', dist: 60, h: 28, along: -30 },
  },
  {
    wall: 'water', gate: 'water',
    title: 'Ophel & the Water Gate', ref: '3:26',
    quote: {
      nasb: '“Now the temple servants living in Ophel made repairs as far as the front of the Water Gate toward the east…”',
      niv: '“…the temple servants living on the hill of Ophel made repairs up to a point opposite the Water Gate toward the east…”',
      esv: '“…the temple servants living on Ophel repaired to a point opposite the Water Gate on the east…”',
      kjv: '“Moreover the Nethinims dwelt in Ophel, unto the place over against the water gate toward the east.”',
    },
    note: {
      kjv: 'The temple servants lived on the Ophel. The Water Gate is not said to be repaired. The work only ran “over against” it, so it is shown standing with its doors, as if it needed no repair. It led down toward the Gihon Spring. Ezra later read the Law in the square before it (8:1).',
      default: 'The temple servants lived on the Ophel. The Water Gate is not said to be repaired. The work only ran to a point opposite it, so it is shown standing with its doors, as if it needed no repair. It led down toward the Gihon Spring. Ezra later read the Law in the square before it (8:1).',
    },
    builders: 'The Nethinim (temple servants)',
    view: { side: 'out', dist: 55, h: 20, along: -12 },
  },
  {
    wall: 'ophel', towers: ['greattower'], target: { x: 128, n: 240 },
    title: 'The Great Tower & the Wall of Ophel', ref: '3:27',
    quote: {
      nasb: '“After them the Tekoites repaired another section in front of the great projecting tower and as far as the wall of Ophel.”',
      niv: '“…the men of Tekoa repaired another section, from the great projecting tower to the wall of Ophel.”',
      esv: '“After him the Tekoites repaired another section opposite the great projecting tower as far as the wall of Ophel.”',
      kjv: '“…the Tekoites repaired another piece, over against the great tower that lieth out, even unto the wall of Ophel.”',
    },
    note: 'The common people of Tekoa took on a second section, even though their nobles refused to work at all (3:5).',
    builders: 'The Tekoites',
    view: { side: 'out', dist: 65, h: 30, along: -40 },
  },
  {
    wall: 'horse', gate: 'horse', title: 'The Horse Gate', ref: '3:28',
    quote: {
      nasb: '“Above the Horse Gate the priests carried out repairs, each in front of his house.”',
      niv: '“Above the Horse Gate, the priests made repairs, each in front of his own house.”',
      esv: '“Above the Horse Gate the priests repaired, each one opposite his own house.”',
      kjv: '“From above the horse gate repaired the priests, every one over against his house.”',
    },
    note: 'No doors, bolts or bars are recorded for this gate. Jeremiah places it on the east (Jer 31:40). It may be connected with the horses’ entrance to the palace (2 Kgs 11:16).',
    builders: 'The priests',
    view: { side: 'out', dist: 50, h: 24, along: -30 },
  },
  {
    wall: 'east', gate: 'east', title: 'The East Gate', ref: '3:29–30',
    quote: {
      nasb: '“And after him Shemaiah the son of Shecaniah, the keeper of the East Gate, carried out repairs.”',
      niv: '“Next to him, Shemaiah son of Shekaniah, the guard at the East Gate, made repairs.”',
      esv: '“After him Shemaiah the son of Shecaniah, the keeper of the East Gate, repaired.”',
      kjv: '“After him repaired also Shemaiah the son of Shechaniah, the keeper of the east gate.”',
    },
    note: 'Zadok son of Immer repaired opposite his house, and then Shemaiah did. Shemaiah is the gate’s keeper, but the gate itself is not described as rebuilt. It faced the Kidron, east of the Temple.',
    builders: 'Zadok son of Immer · Shemaiah · Hananiah · Hanun · Meshullam',
    view: { side: 'out', dist: 55, h: 26, along: -30 },
  },
  {
    wall: 'muster', gate: 'muster',
    title: { esv: 'The Muster Gate', kjv: 'The Gate Miphkad', default: 'The Inspection Gate' }, ref: '3:31',
    quote: {
      nasb: '“…Malchijah, one of the goldsmiths, carried out repairs as far as the house of the temple servants and of the merchants, in front of the Inspection Gate…”',
      niv: '“Malkijah, one of the goldsmiths, made repairs as far as the house of the temple servants and the merchants, opposite the Inspection Gate…”',
      esv: '“After him Malchijah, one of the goldsmiths, repaired as far as the house of the temple servants and of the merchants, opposite the Muster Gate…”',
      kjv: '“Malchiah the goldsmith’s son… over against the gate Miphkad.”',
    },
    note: '“Miphkad” means appointment, muster or inspection. Repairs reached the house of the temple servants and merchants opposite it. No doors are mentioned.',
    builders: 'Malchijah the goldsmith',
    view: { side: 'in', dist: 45, h: 26, along: -28 },
  },
  {
    wall: 'corner2', towers: ['corner2'],
    title: {
      nasb: 'The Upper Room of the Corner', niv: 'The Room Above the Corner',
      esv: 'The Upper Chamber of the Corner', kjv: 'The Going Up of the Corner',
    },
    ref: '3:31',
    quote: {
      nasb: '“…and as far as the upper room of the corner.”',
      niv: '“…and as far as the room above the corner.”',
      esv: '“…and to the upper chamber of the corner.”',
      kjv: '“…and to the going up of the corner.”',
    },
    note: 'The Hebrew is literally “the upper room of the corner,” likely a watch-room on the north-east corner looking over the Kidron.',
    builders: 'Malchijah the goldsmith',
    view: { side: 'out', dist: 60, h: 28, along: -30 },
  },
  {
    wall: 'sheep', closing: true, gate: 'sheep', title: 'Back to the Sheep Gate', ref: '3:32',
    quote: {
      nasb: '“And between the upper room of the corner and the Sheep Gate the goldsmiths and the merchants carried out repairs.”',
      niv: '“…between the room above the corner and the Sheep Gate the goldsmiths and merchants made repairs.”',
      esv: '“And between the upper chamber of the corner and the Sheep Gate the goldsmiths and the merchants repaired.”',
      kjv: '“And between the going up of the corner unto the sheep gate repaired the goldsmiths and the merchants.”',
    },
    note: 'The goldsmiths and merchants closed the last gap, beside the gate where the circuit began. The wall is complete.',
    builders: 'The goldsmiths & the merchants',
    view: { side: 'out', dist: 60, h: 30, along: -30 },
  },
];
