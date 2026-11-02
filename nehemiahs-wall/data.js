// Content for "Nehemiah's Wall". Scripture quotations are from the KJV (public domain).
// Plan coordinates: x = metres east, n = metres north (see terrain.js).
//
// The circuit follows the order of Nehemiah 3: it starts at the Sheep Gate
// (north-east), runs west along the north side, south down the west side,
// round the southern tip, and back north along the east side - i.e.
// counter-clockwise. This reconstruction follows the commonly held "smaller
// city" view: the post-exilic wall enclosed the City of David ridge and the
// Temple Mount, not the western hill.

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
    name: 'Old Gate', ref: '3:6', repair: 'Repaired', beams: true, doors: true, bolts: true, bars: true,
  },
  valley: {
    name: 'Valley Gate', ref: '3:13', repair: 'Repaired & built', doors: true, bolts: true, bars: true,
  },
  dung: {
    name: 'Dung Gate', ref: '3:14', repair: 'Repaired & built', doors: true, bolts: true, bars: true,
  },
  fountain: {
    name: 'Fountain Gate', ref: '3:15', repair: 'Repaired & built', covered: true, doors: true, bolts: true, bars: true,
  },
  // Repairs ran "over against" the Water Gate but not on it: it stands intact, needing no repair.
  water: {
    name: 'Water Gate', ref: '3:26', repair: 'Not said to be repaired', intact: true,
  },
  horse: {
    name: 'Horse Gate', ref: '3:28', repair: 'Priests repaired “from above” it',
  },
  east: {
    name: 'East Gate', ref: '3:29', repair: 'Only its keeper is named',
  },
  muster: {
    name: 'Muster Gate', ref: '3:31', repair: 'Repairs ran “over against” it',
  },
};

export const TOWERS = {
  meah: { name: 'Tower of the Hundred', size: 9 },
  hananel: { name: 'Tower of Hananel', size: 9 },
  ovens: { name: 'Tower of the Ovens', size: 9 },
  kingtower: { name: 'Tower of the King’s Upper House', size: 10 },
  greattower: { name: 'Great Projecting Tower', size: 13 },
  corner2: { name: 'Upper Chamber of the Corner', size: 9, chamber: true },
};

// Labelled places. kind: 'feature' (small label), 'region' (large), 'valley' (large, italic).
export const FEATURES = {
  temple: { name: 'The Temple', x: 40, n: 520, kind: 'feature', lift: 24 },
  broadWall: { name: 'Broad Wall', x: -213, n: 495, kind: 'feature', lift: 14 },
  poolSiloam: { name: 'Pool of Siloam', x: 26, n: -466, kind: 'feature', lift: 6 },
  kingsGarden: { name: 'King’s Garden', x: 80, n: -560, kind: 'feature', lift: 14 },
  stairs: { name: 'Stairs from the City of David', x: 40, n: -418, kind: 'feature', lift: 8 },
  tombs: { name: 'Tombs of David', x: 56, n: -335, kind: 'feature', lift: 9 },
  artificialPool: { name: 'The Pool That Was Made', x: 62, n: -255, kind: 'feature', lift: 5 },
  mighty: { name: 'House of the Mighty Men', x: 70, n: -188, kind: 'feature', lift: 10 },
  armory: { name: 'Ascent to the Armory', x: 74, n: -118, kind: 'feature', lift: 10 },
  eliashib: { name: 'House of Eliashib the High Priest', x: 92, n: -40, kind: 'feature', lift: 10 },
  angle: { name: 'The Angle', x: 108, n: -108, kind: 'feature', lift: 16 },
  kingsHouse: { name: 'King’s Upper House & Court of the Guard', x: 88, n: 104, kind: 'feature', lift: 14 },
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
  quote: '“The wall of Jerusalem also is broken down, and the gates thereof are burned with fire.” (1:3)',
  note: 'Nehemiah, cupbearer to King Artaxerxes, has come home to a ruined city. Chapter 3 lists who rebuilt each piece of wall, in order, counter-clockwise from the Sheep Gate. This tour follows that list, and the wall goes back up as we pass.',
  aside: 'The circuit shown is the smaller post-exilic city: the City of David ridge and the Temple Mount. Positions are approximate.',
};

export const FINALE = {
  title: 'The Wall Is Finished',
  ref: 'Nehemiah 6:15–16',
  quote: '“So the wall was finished in the twenty and fifth day of the month Elul, in fifty and two days.”',
  note: 'Their enemies “perceived that this work was wrought of our God” (6:16). Each family repaired the stretch by its own house, and the whole circuit was done in under two months, mostly with the limestone lying in the rubble.',
};

// Tour stops, in the order of Nehemiah 3.
// wall: the WALL point whose stretch (from the previous stop) gets rebuilt on the way in.
// target: what the camera looks at (defaults to the gate/tower/wall point).
// view: camera placement relative to the wall: side 'in' (city side) or 'out',
//       dist from the wall, h above wall ground, along = metres along the wall.
export const STOPS = [
  {
    wall: 'sheep', gate: 'sheep', title: 'The Sheep Gate', ref: '3:1',
    quote: '“Eliashib the high priest rose up with his brethren the priests, and they builded the sheep gate; they sanctified it, and set up the doors of it.”',
    note: 'The priests started at the gate nearest the Temple, where sheep came in for sacrifice. Doors are set up, but no bolts or bars are mentioned. This is the only gate said to be consecrated.',
    builders: 'Eliashib the high priest & the priests',
    view: { side: 'in', dist: 46, h: 17, along: 26 },
  },
  {
    wall: 'hananel', target: { x: -10, n: 748 }, towers: ['meah', 'hananel'],
    title: 'Towers of the Hundred & Hananel', ref: '3:1–2',
    quote: '“…even unto the tower of Meah they sanctified it, unto the tower of Hananeel.”',
    note: 'The north side had no deep valley to protect it, so it was guarded by towers. The consecration ran this far. The men of Jericho worked next, then Zaccur son of Imri.',
    builders: 'The priests · men of Jericho · Zaccur',
    view: { side: 'out', dist: 75, h: 30, along: 0 },
  },
  {
    wall: 'fish', gate: 'fish', title: 'The Fish Gate', ref: '3:3–5',
    quote: '“…who also laid the beams thereof, and set up the doors thereof, the locks thereof, and the bars thereof.”',
    note: 'Probably named for the fish trade (Tyrians sold fish here, 13:16). This is the first gate described in full: beams, doors, bolts (“locks”) and bars. Next came Meremoth, Meshullam, Zadok and the Tekoites, “but their nobles put not their necks to the work.”',
    builders: 'Sons of Hassenaah',
    view: { side: 'in', dist: 40, h: 15, along: -24 },
  },
  {
    wall: 'old', gate: 'old', title: 'The Old Gate', ref: '3:6',
    quote: '“…they laid the beams thereof, and set up the doors thereof, and the locks thereof, and the bars thereof.”',
    note: 'Also called the Jeshanah Gate. The name may mean the gate of the old city, or the road to the town of Jeshanah. Like the Fish Gate it gets beams, doors, bolts and bars.',
    builders: 'Joiada son of Paseah & Meshullam son of Besodeiah',
    view: { side: 'in', dist: 40, h: 15, along: -24 },
  },
  {
    wall: 'broad', target: { x: -212, n: 490 }, feature: 'broadWall',
    title: 'The Broad Wall', ref: '3:7–8',
    quote: '“…and they fortified Jerusalem unto the broad wall.”',
    note: 'Men of Gibeon and Mizpah worked here, along with Uzziel the goldsmith and Hananiah the perfumer. Avigad excavated a 7 m-thick “Broad Wall” from Hezekiah’s day on the western hill, and it is debated whether Nehemiah’s line reached it. Here it is shown in a simplified position.',
    builders: 'Men of Gibeon & Mizpah · Uzziel · Hananiah',
    view: { side: 'out', dist: 60, h: 28, along: -20 },
  },
  {
    wall: 'ovens', towers: ['ovens'], title: 'The Tower of the Ovens', ref: '3:9–12',
    quote: '“Malchijah… and Hashub… repaired the other piece, and the tower of the furnaces.”',
    note: 'Possibly named for bakers’ ovens (compare “the bakers’ street,” Jer 37:21). Rulers of the two halves of the Jerusalem district worked nearby. Shallum worked here, “he and his daughters.”',
    builders: 'Rephaiah · Jedaiah · Hattush · Malchijah · Hashub · Shallum & daughters',
    view: { side: 'out', dist: 60, h: 26, along: -25 },
  },
  {
    wall: 'valley', gate: 'valley', title: 'The Valley Gate', ref: '3:13',
    quote: '“…they built it, and set up the doors thereof, the locks thereof, and the bars thereof, and a thousand cubits on the wall unto the dung gate.”',
    note: 'Nehemiah’s night inspection started here (2:13). In 1927 Crowfoot and FitzGerald excavated a gate in the west wall of the City of David that many identify as this one. A thousand cubits is about 450–500 m.',
    builders: 'Hanun & the inhabitants of Zanoah',
    view: { side: 'in', dist: 40, h: 14, along: -24 },
  },
  {
    wall: 'dung', gate: 'dung', title: 'The Dung Gate', ref: '3:14',
    quote: '“But the dung gate repaired Malchiah the son of Rechab… he built it, and set up the doors thereof, the locks thereof, and the bars thereof.”',
    note: 'The refuse gate stood near the southern tip, above the Valley of Hinnom where rubbish was carried out. We have just flown the 1,000 cubits from the Valley Gate.',
    builders: 'Malchijah son of Rechab, ruler of Beth-haccherem',
    view: { side: 'in', dist: 40, h: 14, along: -24 },
  },
  {
    wall: 'fountain', gate: 'fountain', title: 'The Fountain Gate', ref: '3:15',
    quote: '“…he built it, and covered it, and set up the doors thereof, the locks thereof, and the bars thereof.”',
    note: 'This is the only gate said to be “covered,” meaning roofed over. It also has doors, bolts and bars. It was named for the spring-fed waters at the foot of the ridge.',
    builders: 'Shallun son of Col-hozeh, ruler of Mizpah',
    view: { side: 'in', dist: 44, h: 17, along: -26 },
  },
  {
    wall: 'siloam', target: { x: 30, n: -485 }, feature: 'poolSiloam',
    title: 'Pool of Siloam & the King’s Garden', ref: '3:15',
    quote: '“…and the wall of the pool of Siloah by the king’s garden.”',
    note: 'Hezekiah’s tunnel carried water from the Gihon Spring to this end of the city (2 Kgs 20:20). The royal garden lay below, where the Kidron and Hinnom valleys meet. Centuries later Jesus sent a blind man to wash in this pool (John 9:7).',
    builders: 'Shallun',
    view: { side: 'out', dist: 100, h: 55, along: 0 },
  },
  {
    wall: 'stairs', target: { x: 45, n: -420 }, feature: 'stairs',
    title: 'The Stairs from the City of David', ref: '3:15',
    quote: '“…and unto the stairs that go down from the city of David.”',
    note: 'Here the record turns north along the east side. Kenyon found that the post-exilic wall ran along the crest of the ridge, well above the older wall on the slope, whose collapsed terraces Nehemiah could not ride through (2:14).',
    builders: 'Shallun',
    view: { side: 'in', dist: 40, h: 26, along: -25 },
  },
  {
    wall: 'tombs', target: { x: 56, n: -335 }, feature: 'tombs',
    title: 'Over Against the Tombs of David', ref: '3:16',
    quote: '“After him repaired Nehemiah the son of Azbuk… unto the place over against the sepulchres of David.”',
    note: 'This is a different Nehemiah, ruler of half of Beth-zur. David was buried “in the city of David” (1 Kgs 2:10). Weill’s 1913–14 dig found rock-cut tunnel tombs here that some propose as the royal tombs.',
    builders: 'Nehemiah son of Azbuk',
    view: { side: 'in', dist: 50, h: 28, along: -30 },
  },
  {
    wall: 'pool', target: { x: 62, n: -255 }, feature: 'artificialPool',
    title: 'The Pool That Was Made', ref: '3:16',
    quote: '“…and to the pool that was made.”',
    note: 'This is a man-made reservoir, separate from the Pool of Siloam. It may be linked to the waterworks of Hezekiah’s day (Isa 22:9–11). Its exact spot is unknown.',
    builders: 'Nehemiah son of Azbuk',
    view: { side: 'in', dist: 45, h: 24, along: -25 },
  },
  {
    wall: 'mighty', target: { x: 70, n: -188 }, feature: 'mighty',
    title: 'The House of the Mighty Men', ref: '3:16–18',
    quote: '“…and unto the house of the mighty.”',
    note: 'Perhaps the barracks of David’s warriors, the “mighty men” (2 Sam 23:8). The Levites under Rehum came next, then Hashabiah and Bavvai for their districts of Keilah.',
    builders: 'Nehemiah son of Azbuk · Levites · Hashabiah · Bavvai',
    view: { side: 'in', dist: 45, h: 24, along: -25 },
  },
  {
    wall: 'armory', target: { x: 82, n: -116 }, feature: 'armory',
    title: 'The Ascent to the Armory, at the Angle', ref: '3:19',
    quote: '“…over against the going up to the armoury at the turning of the wall.”',
    note: 'Ezer, ruler of Mizpah, repaired “another piece.” The wall changes direction here, at “the turning,” an angle or buttress.',
    builders: 'Ezer son of Jeshua, ruler of Mizpah',
    view: { side: 'out', dist: 55, h: 30, along: -30 },
  },
  {
    wall: 'eliashib', target: { x: 95, n: -42 }, feature: 'eliashib',
    title: 'The House of Eliashib', ref: '3:20–21',
    quote: '“…from the turning of the wall unto the door of the house of Eliashib the high priest.”',
    note: 'Baruch “earnestly repaired.” Then Meremoth worked from Eliashib’s door to the end of his house. The high priest who began at the Sheep Gate lived here.',
    builders: 'Baruch son of Zabbai · Meremoth son of Urijah',
    view: { side: 'in', dist: 42, h: 22, along: -28 },
  },
  {
    wall: 'corner', target: { x: 126, n: 25 },
    title: 'The Turning & the Corner', ref: '3:22–24',
    quote: '“…unto the turning of the wall, even unto the corner.”',
    note: 'Priests from the plain worked here, then Benjamin, Hashub and Azariah, each “over against his house.” Everyone guarded his own home. Binnui finished at the corner.',
    builders: 'Priests of the plain · Benjamin · Hashub · Azariah · Binnui',
    view: { side: 'out', dist: 55, h: 30, along: -35 },
  },
  {
    wall: 'kingtower', towers: ['kingtower'], feature: 'kingsHouse',
    title: 'The Tower of the King’s Upper House', ref: '3:25',
    quote: '“…the tower which lieth out from the king’s high house, that was by the court of the prison.”',
    note: 'A tower stood out from the old royal palace, next to the court of the guard where Jeremiah was held (Jer 32:2). Eilat Mazar linked large structures on this crest to the palace and to Nehemiah’s wall. Both claims are debated.',
    builders: 'Palal son of Uzai · Pedaiah son of Parosh',
    view: { side: 'out', dist: 60, h: 28, along: -30 },
  },
  {
    wall: 'water', gate: 'water',
    title: 'Ophel & the Water Gate', ref: '3:26',
    quote: '“Moreover the Nethinims dwelt in Ophel, unto the place over against the water gate toward the east.”',
    note: 'The temple servants lived on the Ophel. The Water Gate is not said to be repaired. The work only ran “over against” it, so it is shown standing with its doors, as if it needed no repair. It led down toward the Gihon Spring. Ezra later read the Law in the square before it (8:1).',
    builders: 'The Nethinim (temple servants)',
    view: { side: 'out', dist: 55, h: 20, along: -12 },
  },
  {
    wall: 'ophel', towers: ['greattower'], target: { x: 128, n: 240 },
    title: 'The Great Tower & the Wall of Ophel', ref: '3:27',
    quote: '“…the Tekoites repaired another piece, over against the great tower that lieth out, even unto the wall of Ophel.”',
    note: 'The common people of Tekoa took on a second section, even though their nobles refused to work at all (3:5).',
    builders: 'The Tekoites',
    view: { side: 'out', dist: 65, h: 30, along: -40 },
  },
  {
    wall: 'horse', gate: 'horse', title: 'The Horse Gate', ref: '3:28',
    quote: '“From above the horse gate repaired the priests, every one over against his house.”',
    note: 'No doors, bolts or bars are recorded for this gate. Jeremiah places it “toward the east” (Jer 31:40). It may be connected with the horses’ entrance to the palace (2 Kgs 11:16).',
    builders: 'The priests',
    view: { side: 'out', dist: 50, h: 24, along: -30 },
  },
  {
    wall: 'east', gate: 'east', title: 'The East Gate', ref: '3:29–30',
    quote: '“After him repaired also Shemaiah the son of Shechaniah, the keeper of the east gate.”',
    note: 'Zadok son of Immer repaired opposite his house, and then Shemaiah did. Shemaiah is the gate’s keeper, but the gate itself is not described as rebuilt. It faced the Kidron, east of the Temple.',
    builders: 'Zadok son of Immer · Shemaiah · Hananiah · Hanun · Meshullam',
    view: { side: 'out', dist: 55, h: 26, along: -30 },
  },
  {
    wall: 'muster', gate: 'muster', title: 'The Muster Gate', ref: '3:31',
    quote: '“Malchiah the goldsmith’s son… over against the gate Miphkad.”',
    note: '“Miphkad” means appointment, muster or inspection. Repairs reached the house of the temple servants and merchants opposite it. No doors are mentioned.',
    builders: 'Malchijah the goldsmith',
    view: { side: 'in', dist: 45, h: 26, along: -28 },
  },
  {
    wall: 'corner2', towers: ['corner2'], title: 'The Upper Chamber of the Corner', ref: '3:31',
    quote: '“…and to the going up of the corner.”',
    note: 'The Hebrew is literally “the upper room of the corner,” likely a watch-room on the north-east corner looking over the Kidron.',
    builders: 'Malchijah the goldsmith',
    view: { side: 'out', dist: 60, h: 28, along: -30 },
  },
  {
    wall: 'sheep', closing: true, gate: 'sheep', title: 'Back to the Sheep Gate', ref: '3:32',
    quote: '“And between the going up of the corner unto the sheep gate repaired the goldsmiths and the merchants.”',
    note: 'The goldsmiths and merchants closed the last gap, beside the gate where the circuit began. The wall is complete.',
    builders: 'The goldsmiths & the merchants',
    view: { side: 'out', dist: 60, h: 30, along: -30 },
  },
];
