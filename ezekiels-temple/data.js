// Content for "Ezekiel's Temple".
// Plan coordinates: x = cubits east, n = cubits north, with the origin at the
// altar in the middle of the inner court. One world unit is one long cubit, a
// cubit and a handbreadth (40:5), about 52.5 cm, so the sizes in the text can
// be used directly. The house faces east.
//
// The plan is the usual one: from the outer east wall to the west wall, the
// outer gate (50), the outer court (100), the inner gate (50), the inner court
// (100), the house (100) and the building to the west (100) make the 500 of 42:20;
// from north to south, gates and courts make 500 the same way.
//
// The tour follows Ezekiel 40–42 as the man with the measuring rod leads
// Ezekiel round: the wall, the outer gates and court, the inner gates and
// court, the house from the porch to the most holy place, the building to the
// west, the priests' chambers, and the wall measured all round. The finale is 43:1–5.

// Text fields below are English. Any of them may be a plain string (the same in
// every English version) or an object keyed by version id (see VERSIONS in ../i18n.js),
// with an optional `default` used by versions not listed. Other languages are in
// lang/<lang>.js.

// Words that differ between versions. Any text field may contain {term}
// (or {Term} for a capital first letter) and gets the current version's word.
export const TERMS = {
  rod: { esv: 'reed', kjv: 'reed', default: 'rod' },
  guardrooms: { nasb: 'guardrooms', niv: 'alcoves', esv: 'side rooms', kjv: 'little chambers' },
  porch: { niv: 'portico', esv: 'vestibule', default: 'porch' },
  porches: { niv: 'porticoes', esv: 'vestibules', kjv: 'arches', default: 'porches' },
  jambs: { nasb: 'side pillars', kjv: 'posts', default: 'jambs' },
  court: { nasb: 'courtyard', default: 'court' },
  nave: { nasb: 'sanctuary', niv: 'main hall', esv: 'nave', kjv: 'temple' },
  house: { kjv: 'house', default: 'temple' },
  sideChambers: { niv: 'side rooms', default: 'side chambers' },
  separate: { nasb: 'separate area', niv: 'temple courtyard', esv: 'separate yard', kjv: 'separate place' },
  palms: { nasb: 'palm tree decorations', default: 'palm trees' },
  bronze: { kjv: 'brass', default: 'bronze' },
};

// Levels: the ground outside the wall, the outer court (seven steps up, 40:22, 26),
// the inner court (eight more, 40:31) and the platform of the house (a rod, 41:8).
export const LEVEL = { outside: -3.5, outer: 0, inner: 4, house: 10 };
// Half the side of the square inside the outer wall's outer face (42:20).
export const OUTER = 250;
// The inner court (40:47) with the house, the yard and the building to the west
// behind it, all at the inner court's level: x from west to east, n ±half.
export const INNER = { west: -244, east: 50, half: 50 };

// Labelled things. kind: 'item' (boxed), 'feature' (small), 'region' (large),
// 'mount' (large, italic). `group` hides the label until that piece is built;
// `inside` hides it unless the walls are cut away.
export const FEATURES = {
  eastGate: { name: 'East Gate', x: 225, n: 0, lift: 18, kind: 'feature', group: 'gateE' },
  northGate: { name: 'North Gate', x: 0, n: 225, lift: 18, kind: 'feature', group: 'gateN' },
  southGate: { name: 'South Gate', x: 0, n: -225, lift: 18, kind: 'feature', group: 'gateS' },
  outerCourt: { name: { nasb: 'Outer Courtyard', default: 'Outer Court' }, x: 150, n: -150, lift: 8, kind: 'feature', group: 'pavement' },
  chambers: { name: { niv: 'Rooms', default: 'Chambers' }, x: 238, n: 90, lift: 14, kind: 'feature', group: 'rooms' },
  pavement: { name: 'Pavement', x: 222, n: -170, lift: 3, kind: 'feature', group: 'pavement' },
  innerCourt: { name: { nasb: 'Inner Courtyard', default: 'Inner Court' }, x: 30, n: -30, lift: 10, kind: 'feature', group: 'innerCourt' },
  innerSouth: { name: 'Inner South Gate', x: 0, n: -75, lift: 20, kind: 'feature', group: 'innerS' },
  innerEast: { name: 'Inner East Gate', x: 75, n: 0, lift: 20, kind: 'feature', group: 'innerE' },
  innerNorth: { name: 'Inner North Gate', x: 0, n: 75, lift: 20, kind: 'feature', group: 'innerN' },
  tables: { name: 'Tables', x: 0, n: 104, lift: 6, kind: 'item', group: 'tables' },
  rinse: { name: { niv: 'Washing Room', default: 'Chamber for Rinsing' }, x: 19, n: 93, lift: 10, kind: 'item', group: 'rinse' },
  roomN: { name: { niv: 'Room for the Priests', default: 'Chamber for the Priests' }, x: 30, n: 45, lift: 11, kind: 'item', group: 'priestRooms' },
  roomS: { name: { niv: 'Room for the Priests', default: 'Chamber for the Priests' }, x: 30, n: -45, lift: 11, kind: 'item', group: 'priestRooms' },
  altar: { name: 'Altar', x: 0, n: 0, lift: 19, kind: 'item', group: 'altar' },
  porch: { name: '{Porch}', x: -58, n: 0, lift: 34, kind: 'feature', group: 'porch' },
  columns: { name: { esv: 'Pillars', kjv: 'Pillars', default: 'Columns' }, x: -47, n: 11, lift: 25, kind: 'item', group: 'columns' },
  nave: { name: { nasb: 'Sanctuary', niv: 'Main Hall', esv: 'Nave', kjv: 'Temple' }, x: -93, n: 0, lift: 46, kind: 'feature', group: 'walls' },
  mostHoly: { name: { kjv: 'Most Holy Place', default: 'Most Holy Place' }, x: -125, n: 0, lift: 46, kind: 'feature', group: 'partition' },
  sideChambers: { name: { niv: 'Side Rooms', default: 'Side Chambers' }, x: -105, n: -22.5, lift: 25, kind: 'feature', group: 'chambers' },
  table: { name: { kjv: 'Altar of Wood', default: 'Wooden Altar' }, x: -109, n: 0, lift: 14.5, kind: 'item', group: 'table', inside: true },
  westBuilding: { name: 'Building', x: -204, n: 0, lift: 26, kind: 'feature', group: 'westBuilding' },
  yard: { name: '{Separate}', x: -157, n: 36, lift: 7, kind: 'feature', group: 'westBuilding' },
  priestsN: { name: { niv: 'Priests’ Rooms', default: 'Holy Chambers' }, x: -100, n: 77, lift: 22, kind: 'feature', group: 'priestsN' },
  priestsS: { name: { niv: 'Priests’ Rooms', default: 'Holy Chambers' }, x: -100, n: -77, lift: 22, kind: 'feature', group: 'priestsS' },
  mountain: { name: 'A Very High Mountain', x: 600, n: -1500, lift: 160, kind: 'mount' },
};

// People: the man and Ezekiel. Each stop says where they stand when we arrive,
// [x, n, facing in degrees from east, counter-clockwise]; `via` lists the
// points they walk through on the way. `measure` (default true) has the man
// hold his rod out. Before the first stop they stand at START.
export const START = { man: [258, -2, 31], ezekiel: [268, 4, 211] };

// Labels for the two, shown at the first stop and close by.
export const PEOPLE = {
  man: { name: 'The Man' },
  ezekiel: { name: 'Ezekiel' },
};

export const INTRO = {
  title: 'A Very High Mountain',
  ref: 'Ezekiel 40:2',
  quote: {
    nasb: '“In the visions of God He brought me into the land of Israel and set me on a very high mountain, and on it to the south there was something like a structure of a city.”',
    niv: '“In visions of God he took me to the land of Israel and set me on a very high mountain, on whose south side were some buildings that looked like a city.”',
    esv: '“In visions of God he brought me to the land of Israel, and set me down on a very high mountain, on which was a structure like a city to the south.”',
    kjv: '“In the visions of God brought he me into the land of Israel, and set me upon a very high mountain, by which was as the frame of a city on the south.”',
  },
  note: 'It was the twenty-fifth year of the exile, fourteen years after Jerusalem fell and Solomon’s temple was burned (40:1). Ezekiel, a priest among the exiles in Babylon (1:3), is brought in a vision to a mountain in the land of Israel. The structure like a city is usually taken to be the temple itself, with its walls and gates. A man with a measuring {rod} shows it to him, part by part (Ezekiel 40–42), and each part goes up as he measures it.',
  aside: 'Everything is drawn to the sizes the text gives, in the long cubit of 40:5, a cubit and a handbreadth (≈ 52.5 cm). Ezekiel gives lengths and widths but almost no heights, so the heights are guesses, and the notes say where else the model has to guess. The mountain is not a real place; the vision doesn’t say where it is.',
};

export const FINALE = {
  title: 'The Glory Returns',
  ref: 'Ezekiel 43:4–5',
  quote: {
    nasb: '“And the glory of the LORD entered the house by way of the gate facing east. And the Spirit lifted me up and brought me into the inner courtyard; and behold, the glory of the LORD filled the house.”',
    niv: '“The glory of the LORD entered the temple through the gate facing east. Then the Spirit lifted me up and brought me into the inner court, and the glory of the LORD filled the temple.”',
    esv: '“As the glory of the LORD entered the temple by the gate facing east, the Spirit lifted me up and brought me into the inner court; and behold, the glory of the LORD filled the temple.”',
    kjv: '“And the glory of the LORD came into the house by the way of the gate whose prospect is toward the east. So the spirit took me up, and brought me into the inner court; and, behold, the glory of the LORD filled the house.”',
  },
  note: 'Years before, Ezekiel had seen the glory leave Solomon’s temple by the east gate and stand on the mountain east of the city (10:18–19; 11:22–23). Now it comes back the same way, with a sound like many waters, and the earth shines (43:2). Ezekiel falls on his face (43:3), and the LORD speaks from the house: “this is the place of My throne… where I will dwell among the sons of Israel forever” (43:7, NASB). Later the east gate is shut, because the LORD has entered by it (44:1–2).',
};

// Tour stops, in the order of Ezekiel 40–42.
// build: groups (made in main.js) that go up on the way in, one after another.
// look / cam: where the camera looks and where it sits ({ x, n } plan, y height).
// cutaway: true fades the south walls and the roof of the house.
// trace: a group (a measuring line) that goes round while the verse is read.
// man / ezekiel / via: where the two stand (see START).
// size: what the man measured there.
export const STOPS = [
  {
    title: 'The Man with the Measuring {Rod}', ref: 'Ezekiel 40:3', build: ['people'],
    quote: {
      nasb: '“So He brought me there; and behold, there was a man whose appearance was like the appearance of bronze, with a thread of flax and a measuring rod in his hand; and he was standing in the gateway.”',
      niv: '“He took me there, and I saw a man whose appearance was like bronze; he was standing in the gateway with a linen cord and a measuring rod in his hand.”',
      esv: '“When he brought me there, behold, there was a man whose appearance was like bronze, with a linen cord and a measuring reed in his hand. And he was standing in the gateway.”',
      kjv: '“And he brought me thither, and, behold, there was a man, whose appearance was like the appearance of brass, with a line of flax in his hand, and a measuring reed; and he stood in the gate.”',
    },
    note: 'The man told Ezekiel to see with his eyes, hear with his ears and set his heart on all he would be shown, and to declare it to the house of Israel (40:4). His line was for long distances (47:3), the {rod} for buildings. Who he is isn’t said; he speaks for the LORD (44:5) and is drawn shining like {bronze}, as in 1:7. Ezekiel is drawn as a man in a plain robe.',
    size: 'The {rod}: 6 long cubits (3.2 m)',
    man: [258, -2, 31], ezekiel: [268, 4, 211], measure: false,
    look: { x: 262, n: 1, y: -1.5 }, cam: { x: 290, n: -22, y: 6 },
  },
  {
    title: 'The Wall', ref: 'Ezekiel 40:5', build: ['wall'],
    quote: {
      nasb: '“And behold, there was a wall on the outside of the temple all around, and in the man’s hand was a measuring rod of six cubits, each of which was a cubit and a hand width. So he measured the thickness of the wall, one rod; and the height, one rod.”',
      niv: '“I saw a wall completely surrounding the temple area. The length of the measuring rod in the man’s hand was six long cubits, each of which was a cubit and a handbreadth. He measured the wall; it was one measuring rod thick and one rod high.”',
      esv: '“And behold, there was a wall all around the outside of the temple area, and the length of the measuring reed in the man’s hand was six long cubits, each being a cubit and a handbreadth in length. So he measured the thickness of the wall, one reed; and the height, one reed.”',
      kjv: '“And behold a wall on the outside of the house round about, and in the man’s hand a measuring reed of six cubits long by the cubit and an hand breadth: so he measured the breadth of the building, one reed; and the height, one reed.”',
    },
    note: 'A long cubit is the common cubit and a handbreadth, about 52.5 cm, so the {rod} is a little over 3 m, and the wall as thick as it is high. Its height is drawn from the outer {court}, which stands seven steps above the ground outside. Later the man says what the wall is for: “to divide between the holy and the common” (42:20, NASB).',
    size: '6 × 6 long cubits (3.2 × 3.2 m)',
    man: [257, 40, 180], ezekiel: [263, 46, 200], via: [[262, 14]],
    look: { x: 225, n: 70, y: 1 }, cam: { x: 320, n: -40, y: 48 },
  },
  {
    title: 'The East Gate', ref: 'Ezekiel 40:6', build: ['gateE'],
    quote: {
      nasb: '“Then he went to the gate which faced east, went up its steps, and measured the threshold of the gate, one rod in width; and the other threshold was one rod in width.”',
      niv: '“Then he went to the east gate. He climbed its steps and measured the threshold of the gate; it was one rod deep.”',
      esv: '“Then he went into the gateway facing east, going up its steps, and measured the threshold of the gate, one reed deep.”',
      kjv: '“Then came he unto the gate which looketh toward the east, and went up the stairs thereof, and measured the threshold of the gate, which was one reed broad; and the other threshold of the gate, which was one reed broad.”',
    },
    note: 'Inside, three {guardrooms} on each side, each a {rod} square with five cubits between them and a low barrier a cubit wide in front (40:7, 10, 12), then the inner threshold and a {porch} of eight cubits facing the {court} (40:8–9). The gateway is ten cubits wide; windows look into the {guardrooms}, and {palms} are carved on the {jambs} (40:11, 16). Fifty cubits long and twenty-five wide (40:13, 15). The heights aren’t given; the sixty cubits of 40:14 are uncertain, and the {jambs} are drawn lower.',
    size: '50 × 25 cubits (26 × 13 m) · {guardrooms} 6 × 6',
    man: [244, 0, 180], ezekiel: [251.5, 3, 180],
    look: { x: 228, n: 0, y: 3 }, cam: { x: 282, n: -52, y: 38 },
  },
  {
    title: 'The Outer {Court}', ref: 'Ezekiel 40:17', build: ['pavement', 'rooms'],
    quote: {
      nasb: '“Then he brought me into the outer courtyard, and behold, there were chambers and a stone pavement made for the courtyard all around; thirty chambers faced the pavement.”',
      niv: '“Then he brought me into the outer court. There I saw some rooms and a pavement that had been constructed all around the court; there were thirty rooms along the pavement.”',
      esv: '“Then he brought me into the outer court. And behold, there were chambers and a pavement, all around the court. Thirty chambers faced the pavement.”',
      kjv: '“Then brought he me into the outward court, and, lo, there were chambers, and a pavement made for the court round about: thirty chambers were upon the pavement.”',
    },
    note: 'The pavement runs along the wall, as wide as the gates are long (40:18), lower than the inner {court}. The thirty chambers’ size and layout aren’t given; they are drawn in rows of five on either side of each gate. Later the people would eat their sacrifices in rooms like these (compare 46:21–24). From the inner end of this gate to the next gate inward is a hundred cubits (40:19).',
    size: 'Pavement as wide as a gate is long · chambers not measured',
    man: [192, -10, 60], ezekiel: [196, -16, 70], via: [[226, 0], [204, 0]],
    look: { x: 225, n: 95, y: 3 }, cam: { x: 135, n: -20, y: 48 },
  },
  {
    title: 'The North Gate', ref: 'Ezekiel 40:22', build: ['gateN'],
    quote: {
      nasb: '“Its windows, its porches, and its palm tree decorations had the same measurements as the gate which faced east; and it was reached by seven steps, and its porch was in front of them.”',
      niv: '“Its openings, its portico and its palm tree decorations had the same measurements as those of the gate facing east. Seven steps led up to it, with its portico opposite them.”',
      esv: '“And its windows, its vestibule, and its palm trees were of the same size as those of the gate that faced toward the east. And by seven steps people would go up to it, and find its vestibule before them.”',
      kjv: '“And their windows, and their arches, and their palm trees, were after the measure of the gate that looketh toward the east; and they went up unto it by seven steps; and the arches thereof were before them.”',
    },
    note: 'The gate facing north is the same as the east gate: three {guardrooms} on each side, fifty cubits long and twenty-five wide (40:20–21). Its seven steps rise from the ground outside the wall, so the outer {court} stands above the mountain top round it. The steps of the east gate aren’t counted (40:6); they are drawn the same.',
    size: '50 × 25 cubits · 7 steps',
    man: [0, 197, 90], ezekiel: [5, 192, 110], via: [[150, 120]],
    look: { x: 0, n: 226, y: 4 }, cam: { x: 58, n: 158, y: 36 },
  },
  {
    title: 'The South Gate', ref: 'Ezekiel 40:24', build: ['gateS'],
    quote: {
      nasb: '“Then he led me toward the south, and behold, there was a gate toward the south; and he measured its side pillars and its porches according to those same measurements.”',
      niv: '“Then he led me to the south side and I saw the south gate. He measured its jambs and its portico, and they had the same measurements as the others.”',
      esv: '“And he led me toward the south, and behold, there was a gate on the south. And he measured its jambs and its vestibule; they had the same size as the others.”',
      kjv: '“After that he brought me toward the south, and behold a gate toward the south: and he measured the posts thereof and the arches thereof according to these measures.”',
    },
    note: 'A third gate, the same again, with its seven steps and its {palms} on the {jambs} (40:25–26). There is no gate on the west: the house and the building behind it fill that side, and the only way in is from the east, north or south. In 46:9 the people coming in by the north gate go out by the south, and those coming in by the south go out by the north.',
    size: '50 × 25 cubits · 7 steps',
    man: [0, -197, -90], ezekiel: [-5, -192, -70], via: [[150, 120], [150, -120]],
    look: { x: 0, n: -226, y: 4 }, cam: { x: 58, n: -158, y: 36 },
  },
  {
    title: 'The Inner {Court}’s South Gate', ref: 'Ezekiel 40:31', build: ['innerCourt', 'innerS'],
    quote: {
      nasb: '“And its porches were toward the outer courtyard; and palm tree decorations were on its side pillars, and its stairway had eight steps.”',
      niv: '“Its portico faced the outer court; palm trees decorated its jambs, and eight steps led up to it.”',
      esv: '“Its vestibule faced the outer court, and palm trees were on its jambs, and its stairway had eight steps.”',
      kjv: '“And the arches thereof were toward the utter court; and palm trees were upon the posts thereof: and the going up to it had eight steps.”',
    },
    note: 'A hundred cubits from the outer south gate stands the inner one, the same size (40:27–29), but turned round: its {porch} faces the outer {court}, and eight more steps lead up to the inner {court}. The inner {court}’s wall isn’t described; a low one is drawn round its terrace. The {porches} of verse 30, twenty-five cubits by five, are unclear and aren’t drawn.',
    size: '50 × 25 cubits · 8 steps',
    man: [0, -101, 90], ezekiel: [4, -108, 100],
    look: { x: 0, n: -78, y: 7 }, cam: { x: 62, n: -150, y: 40 },
  },
  {
    title: 'The Inner East and North Gates', ref: 'Ezekiel 40:32', build: ['innerE', 'innerN'],
    quote: {
      nasb: '“Then he brought me into the inner courtyard toward the east. And he measured the gate according to those same measurements.”',
      niv: '“Then he brought me to the inner court on the east side, and he measured the gateway; it had the same measurements as the others.”',
      esv: '“Then he brought me to the inner court on the east side, and he measured the gate. It was of the same size as the others.”',
      kjv: '“And he brought me into the inner court toward the east: and he measured the gate according to these measures.”',
    },
    note: 'Then the north gate (40:35–37). All six gates are alike: fifty cubits by twenty-five, three {guardrooms} on each side, windows, and {palms} on the {jambs}; the outer gates have seven steps, the inner ones eight. Each inner gate stands opposite an outer one, a hundred cubits away (40:23, 27).',
    size: 'Each 50 × 25 cubits · 8 steps',
    man: [57, 0, 0], ezekiel: [51, -4, 10], via: [[0, -60], [30, -30]],
    look: { x: 55, n: 55, y: 6 }, cam: { x: -35, n: -45, y: 70 },
  },
  {
    title: 'Tables for the Burnt Offering', ref: 'Ezekiel 40:39', build: ['tables', 'rinse'],
    quote: {
      nasb: '“And in the porch of the gate were two tables on each side, on which to slaughter the burnt offering, the sin offering, and the guilt offering.”',
      niv: '“In the portico of the gateway were two tables on each side, on which the burnt offerings, sin offerings and guilt offerings were slaughtered.”',
      esv: '“And in the vestibule of the gate were two tables on either side, on which the burnt offering and the sin offering and the guilt offering were to be slaughtered.”',
      kjv: '“And in the porch of the gate were two tables on this side, and two tables on that side, to slay thereon the burnt offering and the sin offering and the trespass offering.”',
    },
    note: 'Two more on each side outside the {porch}, as one goes up (40:40–41), eight in all, and four tables of cut stone, a cubit and a half square and a cubit high, for the knives (40:42). A chamber with its doorway by the gate is where the burnt offering was rinsed (40:38). The text names the north gate (40:40), and burnt offerings were killed on the north side of the altar (Leviticus 1:11), so the tables are drawn there. The hooks a handbreadth long (40:43) are too small to show.',
    size: 'Stone tables 1½ × 1½ × 1 cubits',
    man: [-4, 95, 0], ezekiel: [4, 91, 150], via: [[0, 30], [0, 62]],
    look: { x: 0, n: 99, y: 3 }, cam: { x: 32, n: 136, y: 20 },
  },
  {
    title: 'Chambers for the Priests', ref: 'Ezekiel 40:45–46', build: ['priestRooms'],
    quote: {
      nasb: '“Then he said to me, ‘This is the chamber which faces south, intended for the priests who are responsible for the temple; but the chamber which faces north is for the priests who are responsible for the altar. They are the sons of Zadok, who from the sons of Levi come near to the LORD to serve Him.’”',
      niv: '“He said to me, ‘The room facing south is for the priests who guard the temple, and the room facing north is for the priests who guard the altar. These are the sons of Zadok, who are the only Levites who may draw near to the LORD to minister before him.’”',
      esv: '“And he said to me, ‘This chamber that faces south is for the priests who have charge of the temple, and the chamber that faces north is for the priests who have charge of the altar. These are the sons of Zadok, who alone among the sons of Levi may come near to the LORD to minister to him.’”',
      kjv: '“And he said unto me, This chamber, whose prospect is toward the south, is for the priests, the keepers of the charge of the house. And the chamber whose prospect is toward the north is for the priests, the keepers of the charge of the altar: these are the sons of Zadok among the sons of Levi, which come near to the LORD to minister unto him.”',
    },
    note: 'One chamber is beside the north gate, facing south, the other beside the south gate, facing north (40:44). The Hebrew calls them the singers’ chambers and puts the second by the east gate (so KJV); the Greek has two chambers and the south gate, which NIV and ESV follow. Their sizes aren’t given.',
    size: 'Not measured',
    man: [30, 30, 90], ezekiel: [24, 26, 60], via: [[0, 75], [0, 46]],
    look: { x: 30, n: 0, y: 6 }, cam: { x: -38, n: -22, y: 36 },
  },
  {
    title: 'The Inner {Court} and the Altar', ref: 'Ezekiel 40:47', build: ['altar'], trace: 'courtLine',
    quote: {
      nasb: '“He measured the courtyard, a perfect square, a hundred cubits long and a hundred cubits wide; and the altar was in front of the temple.”',
      niv: '“Then he measured the court: It was square—a hundred cubits long and a hundred cubits wide. And the altar was in front of the temple.”',
      esv: '“And he measured the court, a hundred cubits long and a hundred cubits broad, a square. And the altar was in front of the temple.”',
      kjv: '“So he measured the court, an hundred cubits long, and an hundred cubits broad, foursquare; and the altar that was before the house.”',
    },
    note: 'His line marks out the square, paved paler than the yards behind it. The altar is measured later, in 43:13–17: a base with a gutter round it, two ledges, and a hearth twelve cubits square with four horns, its steps facing east. It is drawn that way, in the middle of the {court}: about eleven cubits high, eighteen square at the foot. On it the priests would offer burnt offerings and peace offerings, and the LORD would accept them (43:27).',
    size: '{Court} 100 × 100 cubits (52 m) · altar hearth 12 × 12',
    man: [45, -45, 135], ezekiel: [45, -36, 150],
    look: { x: -2, n: 2, y: 4 }, cam: { x: 78, n: -86, y: 64 },
  },
  {
    title: 'The {Porch} of the {House}', ref: 'Ezekiel 40:49', build: ['platform', 'porch', 'columns'],
    quote: {
      nasb: '“The length of the porch was twenty cubits, and the width eleven cubits; and at the stairway by which it was ascended were columns belonging to the side pillars, one on each side.”',
      niv: '“The portico was twenty cubits wide, and twelve cubits from front to back. It was reached by a flight of stairs, and there were pillars on each side of the jambs.”',
      esv: '“The length of the vestibule was twenty cubits, and the breadth twelve cubits, and people would go up to it by ten steps. And there were pillars beside the jambs, one on either side.”',
      kjv: '“The length of the porch was twenty cubits, and the breadth eleven cubits, and he brought me by the steps whereby they went up to it: and there were pillars by the posts, one on this side, and another on that side.”',
    },
    note: 'The house stands on a platform a full {rod} high (41:8). The {porch} is twelve cubits deep in the Greek (NIV, ESV), eleven in the Hebrew (NASB, KJV); twelve is drawn, which makes the house a hundred cubits long (41:13). Its entrance is fourteen cubits wide between {jambs} five cubits thick (40:48). The Greek counts ten steps. The two columns recall Jachin and Boaz (1 Kings 7:21); their size isn’t given.',
    size: '{Porch} 20 × 12 cubits · platform 6 high',
    man: [-48, 1, 180], ezekiel: [-41, -3, 170], via: [[-30, -6]],
    look: { x: -60, n: 0, y: 15 }, cam: { x: -2, n: -52, y: 30 },
  },
  {
    title: 'The {Nave}', ref: 'Ezekiel 41:2', build: ['walls'], cutaway: true,
    quote: {
      nasb: '“The width of the entrance was ten cubits and the sides of the entrance were five cubits on each side. He also measured the length of the sanctuary, forty cubits, and the width, twenty cubits.”',
      niv: '“The entrance was ten cubits wide, and the projecting walls on each side of it were five cubits wide. He also measured the main hall; it was forty cubits long and twenty cubits wide.”',
      esv: '“And the breadth of the entrance was ten cubits, and the sidewalls of the entrance were five cubits on either side. And he measured the length of the nave, forty cubits, and its breadth, twenty cubits.”',
      kjv: '“And the breadth of the door was ten cubits; and the sides of the door were five cubits on the one side, and five cubits on the other side: and he measured the length thereof, forty cubits: and the breadth, twenty cubits.”',
    },
    note: 'The walls are six cubits thick (41:1, 5); the room is forty by twenty, the size of the main room of Solomon’s temple (1 Kings 6:17). No height is given for the house; it is drawn thirty cubits high like Solomon’s, and the south wall is cut away to see inside. Ezekiel goes in as far as the {nave}; he is a priest, but only the man goes further.',
    size: '40 × 20 cubits (21 × 10.5 m) · walls 6 thick',
    man: [-96, 3, 180], ezekiel: [-77, -3, 180], via: [[-58, 0]],
    look: { x: -94, n: 0, y: 16 }, cam: { x: -66, n: -66, y: 46 },
  },
  {
    title: 'The Most Holy Place', ref: 'Ezekiel 41:4', build: ['partition'], cutaway: true,
    quote: {
      nasb: '“And he measured its length, twenty cubits, and the width, twenty cubits, before the sanctuary; and he said to me, ‘This is the Most Holy Place.’”',
      niv: '“And he measured the length of the inner sanctuary; it was twenty cubits, and its width was twenty cubits across the end of the main hall. He said to me, ‘This is the Most Holy Place.’”',
      esv: '“And he measured the length of the room, twenty cubits, and its breadth, twenty cubits, across the nave. And he said to me, ‘This is the Most Holy Place.’”',
      kjv: '“So he measured the length thereof, twenty cubits; and the breadth, twenty cubits, before the temple: and he said unto me, This is the most holy place.”',
    },
    note: 'Here only the man goes in (41:3); Ezekiel stays in the {nave}. The wall between is two cubits thick, with an entrance six cubits wide. The room is twenty cubits square like Solomon’s (1 Kings 6:20), but nothing stands in it: no ark, no cherubim, no veil. Ezekiel isn’t told what fills it until the glory comes back (43:5).',
    size: '20 × 20 cubits (10.5 m) · entrance 6 wide',
    man: [-124, 0, 0], ezekiel: [-104, 0, 180], via: [[-100, 0]],
    look: { x: -118, n: 0, y: 15 }, cam: { x: -96, n: -58, y: 42 },
  },
  {
    title: { niv: 'The Side Rooms', default: 'The Side Chambers' }, ref: 'Ezekiel 41:6', build: ['chambers'],
    quote: {
      nasb: '“The side chambers were in three stories, one above another, and thirty in each story; and the side chambers extended to the wall which stood on their inward side all around, so that they could be attached, but not be attached to the wall of the temple itself.”',
      niv: '“The side rooms were on three levels, one above another, thirty on each level. There were ledges all around the wall of the temple to serve as supports for the side rooms, so that the supports were not inserted into the wall of the temple.”',
      esv: '“And the side chambers were in three stories, one over another, thirty in each story. There were offsets all around the wall of the temple to serve as supports for the side chambers, so that they should not be supported by the wall of the temple.”',
      kjv: '“And the side chambers were three, one over another, and thirty in order; and they entered into the wall which was of the house for the side chambers round about, that they might have hold, but they had not hold in the wall of the house.”',
    },
    note: 'Four cubits wide at the bottom, wider at each storey as the wall steps in (41:5, 7), as in Solomon’s temple (1 Kings 6:6). Their outer wall is five cubits thick, with a door on the north and one on the south onto a free space five cubits wide on the platform, and round that a yard of twenty cubits (41:9–11). The storeys’ heights aren’t given; they are drawn six cubits.',
    size: '4 cubits wide · outer wall 5 · 3 storeys of 30',
    man: [-100, -36, 90], ezekiel: [-92, -38, 110], via: [[-60, 0], [-46, 0], [-42, -4], [-42, -36]],
    look: { x: -100, n: -20, y: 18 }, cam: { x: -66, n: -86, y: 40 },
  },
  {
    title: 'The Building to the West', ref: 'Ezekiel 41:12', build: ['westBuilding'],
    quote: {
      nasb: '“The building that was in front of the separate area at the side toward the west was seventy cubits wide; and the wall of the building was five cubits thick all around, and its length was ninety cubits.”',
      niv: '“The building facing the temple courtyard on the west side was seventy cubits wide. The wall of the building was five cubits thick all around, and its length was ninety cubits.”',
      esv: '“The building that was facing the separate yard on the west side was seventy cubits broad, and the wall of the building was five cubits thick all around, and its length ninety cubits.”',
      kjv: '“Now the building that was before the separate place at the end toward the west was seventy cubits broad; and the wall of the building was five cubits thick round about, and the length thereof ninety cubits.”',
    },
    note: 'Behind the house, across the {separate}, stands a large building whose purpose isn’t given; it fills the west side, where there is no gate. Its height and doors aren’t given either. Seventy by ninety inside, with its walls it is eighty by a hundred, and with the {separate} in front of it a hundred cubits from east to west (41:13).',
    size: '70 × 90 cubits inside (37 × 47 m) · walls 5',
    man: [-157, -36, 180], ezekiel: [-151, -41, 170], via: [[-145, -40]],
    look: { x: -200, n: 0, y: 12 }, cam: { x: -110, n: -112, y: 60 },
  },
  {
    title: 'A Hundred Cubits', ref: 'Ezekiel 41:13', build: ['roof'], trace: 'houseLine',
    quote: {
      nasb: '“Then he measured the temple, a hundred cubits long; the separate area with the building and its walls were also a hundred cubits long.”',
      niv: '“Then he measured the temple; it was a hundred cubits long, and the temple courtyard and the building with its walls were also a hundred cubits long.”',
      esv: '“Then he measured the temple, a hundred cubits long; and the yard and the building with its walls, a hundred cubits long…”',
      kjv: '“So he measured the house, an hundred cubits long; and the separate place, and the building, with the walls thereof, an hundred cubits long…”',
    },
    note: 'The front of the house with the yards on either side is also a hundred cubits (41:14), so the house and its yards make a square like the inner {court} in front of it, which his line marks out. From front to back: the {porch} 5 + 12, the wall 6, the {nave} 40, the wall 2, the Most Holy Place 20, the wall 6, the {sideChambers} 4 and their wall 5. A roof isn’t mentioned; one is drawn.',
    size: 'The {house} 100 × 100 cubits with its yards (52 m)',
    man: [-147, -45, 0], ezekiel: [-141, -46.5, 10],
    look: { x: -100, n: 0, y: 14 }, cam: { x: -10, n: -152, y: 92 },
  },
  {
    title: { kjv: 'Cherubims and Palm Trees', default: 'Cherubim and Palm Trees' }, ref: 'Ezekiel 41:18–19', build: ['panels', 'carvings', 'table'], cutaway: true,
    quote: {
      nasb: '“It was carved with cherubim and palm trees; and a palm tree was between cherub and cherub, and every cherub had two faces: a human face toward the palm tree on one side and a young lion’s face toward the palm tree on the other side; they were carved on all the house all around.”',
      niv: '“…were carved cherubim and palm trees. Palm trees alternated with cherubim. Each cherub had two faces: the face of a human being toward the palm tree on one side and the face of a lion toward the palm tree on the other. They were carved all around the whole temple.”',
      esv: '“It was carved of cherubim and palm trees, a palm tree between cherub and cherub. Every cherub had two faces: a human face toward the palm tree on the one side, and the face of a young lion toward the palm tree on the other side. They were carved on the whole temple all around.”',
      kjv: '“And it was made with cherubims and palm trees, so that a palm tree was between a cherub and a cherub; and every cherub had two faces; So that the face of a man was toward the palm tree on the one side, and the face of a young lion toward the palm tree on the other side: it was made through all the house round about.”',
    },
    note: 'The walls are panelled with wood from the floor to the windows (41:16–17), and carved from the floor to above the entrance (41:20). Unlike Solomon’s, nothing is said of gold. In the {nave} stands an altar of wood, three cubits high and two long: “This is the table that is before the LORD” (41:22, NASB). Its width isn’t given; it is drawn two cubits square.',
    size: 'Wooden altar 2 × 2 × 3 cubits',
    man: [-109, 4, 90], ezekiel: [-96, -5, 160], via: [[-45, -40], [-43, -3], [-60, 0], [-80, 0]],
    look: { x: -100, n: 4, y: 17 }, cam: { x: -86, n: -40, y: 26 },
  },
  {
    title: 'Double Doors', ref: 'Ezekiel 41:23–24', build: ['doors', 'canopy'], cutaway: true,
    quote: {
      nasb: '“The sanctuary and the inner sanctuary each had a double door. Each of the doors had two leaves, two swinging leaves; two leaves for one door and two leaves for the other.”',
      niv: '“Both the main hall and the Most Holy Place had double doors. Each door had two leaves—two hinged leaves for each door.”',
      esv: '“The nave and the Holy Place had each a double door. The double doors had two leaves apiece, two swinging leaves for each door.”',
      kjv: '“And the temple and the sanctuary had two doors. And the doors had two leaves apiece, two turning leaves; two leaves for the one door, and two leaves for the other door.”',
    },
    note: 'The doors of the {nave} were carved with cherubim and palm trees like the walls, and in front of the {porch} was a threshold or canopy of wood, the word is uncertain (41:25); a canopy is drawn. The {porch} had narrow windows and palm trees on its sides (41:26). The doors are drawn open, each leaf folding in two.',
    size: 'Doorways 10 and 6 cubits wide',
    man: [-80, 2, 0], ezekiel: [-86, -3, 10],
    look: { x: -78, n: 0, y: 15 }, cam: { x: -102, n: -42, y: 24 },
  },
  {
    title: 'The Holy Chambers', ref: 'Ezekiel 42:13', build: ['priestsN', 'priestsS'],
    quote: {
      nasb: '“Then he said to me, ‘The north chambers and the south chambers, which are opposite the separate area, they are the holy chambers where the priests who are near to the LORD shall eat the most holy things. There they shall set the most holy things, the grain offering, the sin offering, and the guilt offering; for the place is holy.’”',
      niv: '“Then he said to me, ‘The north and south rooms facing the temple courtyard are the priests’ rooms, where the priests who approach the LORD will eat the most holy offerings. There they will put the most holy offerings—the grain offerings, the sin offerings and the guilt offerings—for the place is holy.”',
      esv: '“Then he said to me, ‘The north chambers and the south chambers opposite the yard are the holy chambers, where the priests who approach the LORD shall eat the most holy offerings. There they shall put the most holy offerings—the grain offering, the sin offering, and the guilt offering—for the place is holy.”',
      kjv: '“Then said he unto me, The north chambers and the south chambers, which are before the separate place, they be holy chambers, where the priests that approach unto the LORD shall eat the most holy things: there shall they lay the most holy things, and the meat offering, and the sin offering, and the trespass offering; for the place is holy.”',
    },
    note: 'On each side of the house, in the outer {court}: a block a hundred cubits long beside the yard and one fifty long on the outer side, three storeys stepped back, with a passage ten cubits wide between them and the way in from the east (42:1–12). The priests leave their holy garments here before going out to the people (42:14). The layout is one reading of a hard passage.',
    size: '100 × 50 cubits · passage 10 wide',
    man: [-62, 77, 180], ezekiel: [-54, 76, 180], via: [[-60, 0], [-45, 0], [-6, 45], [0, 60], [0, 106], [-30, 106], [-46, 78]],
    look: { x: -100, n: 75, y: 8 }, cam: { x: -28, n: 162, y: 58 },
  },
  {
    title: 'Five Hundred', ref: 'Ezekiel 42:20', build: ['line'],
    quote: {
      nasb: '“He measured it on the four sides; it had a wall all around, the length five hundred rods and the width five hundred, to divide between the holy and the common.”',
      niv: '“So he measured the area on all four sides. It had a wall around it, five hundred cubits long and five hundred cubits wide, to separate the holy from the common.”',
      esv: '“He measured it on the four sides. It had a wall around it, 500 cubits long and 500 cubits broad, to make a separation between the holy and the common.”',
      kjv: '“He measured it by the four sides: it had a wall round about, five hundred reeds long, and five hundred broad, to make a separation between the sanctuary and the profane place.”',
    },
    note: 'The man brought Ezekiel out by the east gate and measured all round (42:15–19). The Hebrew has five hundred rods a side, about 1.6 km (NASB, KJV); the Greek has cubits (NIV, ESV). The courts and gates of chapter 40 add up to five hundred cubits, so that is how it is drawn. In 45:2 the sanctuary is again a square of five hundred.',
    size: '500 × 500 cubits (262 m)',
    man: [263, -8, 90], ezekiel: [263, 2, 90], measure: false, fly: 13,
    via: [[-30, 106], [-10, 120], [150, 110], [190, 6], [200, 0], [253, 0]],
    look: { x: 0, n: 0, y: 0 }, cam: { x: 330, n: -560, y: 400 },
  },
];

// The finale: the glory comes in from the east (43:1–5). Ezekiel stands at the
// east gate, falls on his face, and is lifted into the inner court; the man stands by.
export const GLORY = {
  gate: { man: [262, -8, 0], ezekiel: [258, 1, 0] },
  inner: { man: [26, -14, 180], ezekiel: [22, -10, 180] },
};
