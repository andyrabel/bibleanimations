// Content for "The Dedication of the Wall" (Nehemiah 12:27-43).
// Plan coordinates: x = metres east, n = metres north, as in Nehemiah's Wall.
//
// The city itself (the wall, its gates and towers, the landmarks and the
// terrain) is Nehemiah's Wall's, imported from ../nehemiahs-wall/, with the
// wall finished. This file adds the two gates chapter 3 doesn't name, the
// people, and the tour.
//
// Text fields below are English. Any of them may be a plain string (the same in
// every English version) or an object keyed by version id (see VERSIONS in ../i18n.js),
// with an optional `default` used by versions not listed. Other languages are in
// lang/<lang>.js.

// The instruments of 12:27, 35-36 and 41, as each version names them. The KJV's
// "psalteries, and harps" are the NASB's "harps, and lyres".
export const INSTRUMENTS = {
  cymbals: 'Cymbals',
  harps: { kjv: 'Psalteries', default: 'Harps' },
  lyres: { kjv: 'Harps', default: 'Lyres' },
  trumpets: 'Trumpets',
  david: { niv: 'Instruments prescribed by David', default: 'Instruments of David' },
};

// Gates named in 12:39 but not in chapter 3. `at` is a point on (or by) the wall.
// The Gate of the Guard's place is unknown; it is shown as the north gate of the
// temple court, so `court: true` builds it into the court wall instead.
export const GATES = {
  ephraim: { name: 'Gate of Ephraim', ref: '12:39', at: { x: -214, n: 592 } },
  guard: { name: { kjv: 'Prison Gate', default: 'Gate of the Guard' }, ref: '12:39', at: { x: 45, n: 595 }, court: true },
};

// People with labels. `choir` and `k` say which walker carries the label
// (k = 0 is the front of the procession).
export const PEOPLE = {
  ezra: { name: 'Ezra', choir: 1, k: 0 },
  nehemiah: { name: 'Nehemiah', choir: 2, k: 'nehemiah' },
  choir1: { name: { kjv: 'The first company', default: 'The first choir' }, choir: 1, k: 'choir', big: true },
  choir2: { name: { kjv: 'The other company', default: 'The second choir' }, choir: 2, k: 'choir', big: true },
};

export const INTRO = {
  title: 'Jerusalem, 445 BC',
  ref: 'Nehemiah 12:27–43',
  quote: {
    nasb: '“…so that they could celebrate the dedication with joy, with songs of thanksgiving and with songs to the accompaniment of cymbals, harps, and lyres.” (12:27)',
    niv: '“…to celebrate joyfully the dedication with songs of thanksgiving and with the music of cymbals, harps and lyres.” (12:27)',
    esv: '“…to celebrate the dedication with gladness, with thanksgivings and with singing, with cymbals, harps, and lyres.” (12:27)',
    kjv: '“…to keep the dedication with gladness, both with thanksgivings, and with singing, with cymbals, psalteries, and with harps.” (12:27)',
  },
  note: 'The wall is finished, in fifty-two days (6:15). Nehemiah 12 tells how it was dedicated: two great choirs walked round the top of the wall in opposite directions and met in the house of God. This tour follows them.',
  aside: 'The date isn’t given, only that it came after the wall was finished in 445 BC. The city is the same reconstruction as in Nehemiah’s Wall, and positions are approximate.',
};

export const FINALE = {
  title: 'The Joy of Jerusalem',
  ref: 'Nehemiah 12:43',
  quote: {
    nasb: '“…so that the joy of Jerusalem was heard from far away.”',
    niv: '“The sound of rejoicing in Jerusalem could be heard far away.”',
    esv: '“And the joy of Jerusalem was heard far away.”',
    kjv: '“…so that the joy of Jerusalem was heard even afar off.”',
  },
  note: 'About 140 years after the Babylonians broke down the walls (2 Kgs 25:10), the city is walled again, and the sound of its joy carries across the Kidron to the Mount of Olives.',
};

// Tour stops, in the order of Nehemiah 12.
// lead1 / lead2: where the head of each choir is when the stop is reached:
//   'formed' (on the wall, ready), a WALL id (on the wall above that point),
//   'guard' (outside the Gate of the Guard) or 'court' (in place in the temple court).
//   Unset means it stays where it was.
// view: camera placed beside the wall, following choir `follow` (side 'in' or
//   'out', dist from the wall, h above wall ground, along = metres ahead of the
//   head of the choir). Otherwise cam and look give fixed points { x, n, y }
//   with y in metres above the ground there.
// keys: labels to highlight. instruments: keys of INSTRUMENTS named in these
//   verses (the others show greyed out). effect: 'gather', 'purify' or 'smoke'.
export const STOPS = [
  {
    title: 'The Levites Are Sought Out', ref: '12:27–29',
    quote: {
      nasb: '“Now at the dedication of the wall of Jerusalem they sought out the Levites from all their places, to bring them to Jerusalem…”',
      niv: '“At the dedication of the wall of Jerusalem, the Levites were sought out from where they lived and were brought to Jerusalem…”',
      esv: '“And at the dedication of the wall of Jerusalem they sought the Levites in all their places, to bring them to Jerusalem…”',
      kjv: '“And at the dedication of the wall of Jerusalem they sought the Levites out of all their places, to bring them to Jerusalem…”',
    },
    note: 'The Levites lived in towns all over Judah (11:20, 36), and the singers had built villages round Jerusalem: Netophah to the south, Geba and Azmaveth to the north, and Beth-gilgal. The text doesn’t say where the procession began. The Valley Gate, halfway along the west side, fits both routes, so they gather here.',
    who: { niv: 'The Levites · the musicians', default: 'The Levites · the sons of the singers' },
    instruments: ['cymbals', 'harps', 'lyres'],
    effect: 'gather',
    keys: ['gate:valley'],
    cam: { x: -205, n: 30, y: 60 }, look: { x: -100, n: 62, y: 0 },
  },
  {
    title: 'The People, the Gates & the Wall Purified', ref: '12:30',
    quote: {
      nasb: '“The priests and the Levites purified themselves; they also purified the people, the gates, and the wall.”',
      niv: '“When the priests and Levites had purified themselves ceremonially, they purified the people, the gates and the wall.”',
      esv: '“And the priests and the Levites purified themselves, and they purified the people and the gates and the wall.”',
      kjv: '“And the priests and the Levites purified themselves, and purified the people, and the gates, and the wall.”',
    },
    note: 'The text doesn’t say how. When the Levites were first set apart they were sprinkled with water and washed their clothes (Num 8:7, 21), and at the Passover after the temple was rebuilt the priests and Levites purified themselves together (Ezra 6:20). The light running along the wall only marks what is purified.',
    who: 'The priests & the Levites',
    effect: 'purify',
    keys: ['gate:valley'],
    cam: { x: -40, n: 105, y: 60 }, look: { x: -112, n: 50, y: 6 },
  },
  {
    title: 'Up on Top of the Wall', ref: '12:31',
    quote: {
      nasb: '“Then I had the leaders of Judah come up on top of the wall, and I appointed two large choirs…”',
      niv: '“I had the leaders of Judah go up on top of the wall. I also assigned two large choirs to give thanks.”',
      esv: '“Then I brought the leaders of Judah up onto the wall and appointed two great choirs that gave thanks.”',
      kjv: '“Then I brought up the princes of Judah upon the wall, and appointed two great companies of them that gave thanks…”',
    },
    note: 'Nehemiah tells this himself. The top of the wall makes a walkway right round the city, in sight of everyone. When it was half built, Tobiah had sneered that a fox climbing on it would break it down (4:3). Now it carries two processions.',
    who: { kjv: 'Nehemiah · the princes of Judah', default: 'Nehemiah · the leaders of Judah' },
    lead1: 'formed', lead2: 'formed',
    keys: ['gate:valley', 'person:choir1', 'person:choir2'],
    cam: { x: -40, n: 70, y: 30 }, look: { x: -118, n: 58, y: 10 },
  },
  {
    title: 'The First Choir Goes to the Right', ref: '12:31–36',
    quote: {
      nasb: '“…the first proceeding to the right on top of the wall toward the Dung Gate… And Ezra the scribe went before them.”',
      niv: '“One was to proceed on top of the wall to the right, toward the Dung Gate… Ezra the teacher of the Law led the procession.”',
      esv: '“One went to the south on the wall to the Dung Gate… And Ezra the scribe went before them.”',
      kjv: '“…whereof one went on the right hand upon the wall toward the dung gate… and Ezra the scribe before them.”',
    },
    note: {
      esv: 'In Hebrew, directions are given facing east, so the right hand is the south. Behind the choir walk Hoshaiah and half the leaders of Judah, priests’ sons with trumpets, and Zechariah, a descendant of Asaph, with his relatives and “the musical instruments of David the man of God.”',
      niv: 'In Hebrew, directions are given facing east, so the right hand is the south. Behind the choir walk Hoshaiah and half the leaders of Judah, priests with trumpets, and Zechariah, a descendant of Asaph, with his associates and “musical instruments prescribed by David the man of God.”',
      kjv: 'In Hebrew, directions are given facing east, so the right hand is the south. Behind the company walk Hoshaiah and half the princes of Judah, priests’ sons with trumpets, and Zechariah, a descendant of Asaph, with his brethren and “the musical instruments of David the man of God.”',
      default: 'In Hebrew, directions are given facing east, so the right hand is the south. Behind the choir walk Hoshaiah and half the leaders of Judah, priests’ sons with trumpets, and Zechariah, a descendant of Asaph, with his kinsmen and “the musical instruments of David the man of God.”',
    },
    who: {
      niv: 'Ezra · the first choir · Hoshaiah & half the leaders · priests · Zechariah & his associates',
      esv: 'Ezra · the first choir · Hoshaiah & half the leaders · priests’ sons · Zechariah & his relatives',
      kjv: 'Ezra · the first company · Hoshaiah & half the princes · priests’ sons · Zechariah & his brethren',
      default: 'Ezra · the first choir · Hoshaiah & half the leaders · priests’ sons · Zechariah & his kinsmen',
    },
    instruments: ['trumpets', 'david'],
    lead1: 'dung',
    keys: ['gate:dung', 'person:ezra'],
    view: { follow: 1, side: 'in', dist: 42, h: 20, along: 14 },
  },
  {
    title: 'Up the Steps of the City of David', ref: '12:37',
    quote: {
      nasb: '“At the Fountain Gate they went directly up the steps of the city of David by the stairway of the wall…”',
      niv: '“At the Fountain Gate they continued directly up the steps of the City of David on the ascent to the wall…”',
      esv: '“At the Fountain Gate they went up straight before them by the stairs of the city of David, at the ascent of the wall…”',
      kjv: '“And at the fountain gate, which was over against them, they went up by the stairs of the city of David, at the going up of the wall…”',
    },
    note: 'Past the Fountain Gate the wall turns north and climbs the ridge of the City of David. It is debated whether the choir stayed on the wall here or went up a stairway beside it, the steps that went down from the city (3:15). Here it keeps to the top of the wall.',
    who: { kjv: 'The first company', default: 'The first choir' },
    lead1: 'stairs',
    keys: ['gate:fountain', 'feature:stairs', 'person:ezra'],
    view: { follow: 1, side: 'in', dist: 46, h: 24, along: 16 },
  },
  {
    title: { niv: 'Above David’s Palace to the Water Gate', default: 'Above the House of David to the Water Gate' }, ref: '12:37',
    quote: {
      nasb: '“…above the house of David to the Water Gate on the east.”',
      niv: '“…and passed above the site of David’s palace to the Water Gate on the east.”',
      esv: '“…above the house of David, to the Water Gate on the east.”',
      kjv: '“…above the house of David, even unto the water gate eastward.”',
    },
    note: {
      niv: 'They pass above the old royal palace on the crest of the ridge (the “upper palace” of 3:25) and stop over the Water Gate, where Ezra had read the Law to all the people (8:1–3). Here they wait while the second choir goes round.',
      kjv: 'They pass above the old royal palace on the crest of the ridge (the “king’s high house” of 3:25) and stop over the water gate, where Ezra had read the Law to all the people (8:1–3). Here they wait while the other company goes round.',
      default: 'They pass above the old royal palace on the crest of the ridge (the “upper house of the king” of 3:25) and stop over the Water Gate, where Ezra had read the Law to all the people (8:1–3). Here they wait while the second choir goes round.',
    },
    who: { kjv: 'The first company', default: 'The first choir' },
    lead1: 'water',
    keys: ['gate:water', 'feature:kingsHouse', 'person:ezra'],
    view: { follow: 1, side: 'out', dist: 55, h: 24, along: 4 },
  },
  {
    title: { kjv: 'The Other Company Goes the Other Way', default: 'The Second Choir Goes to the Left' }, ref: '12:38',
    quote: {
      nasb: '“The second choir proceeded to the left, while I followed them with half of the people on the wall, above the Tower of Furnaces, to the Broad Wall…”',
      niv: '“The second choir proceeded in the opposite direction. I followed them on top of the wall, together with half the people—past the Tower of the Ovens to the Broad Wall…”',
      esv: '“The other choir of those who gave thanks went to the north, and I followed them with half of the people, on the wall, above the Tower of the Ovens, to the Broad Wall…”',
      kjv: '“And the other company of them that gave thanks went over against them, and I after them, and the half of the people upon the wall, from beyond the tower of the furnaces even unto the broad wall…”',
    },
    note: 'Nehemiah walks behind this choir himself. Its route is the wall of chapter 3 in reverse: the same towers and gates, named the other way round. Lists like these are one of the main ways the line of the wall is worked out.',
    who: {
      kjv: 'The other company · Nehemiah & half the people',
      default: 'The second choir · Nehemiah & half the people',
    },
    lead2: 'broad',
    keys: ['tower:ovens', 'feature:broadWall', 'person:nehemiah'],
    view: { follow: 2, side: 'in', dist: 46, h: 24, along: 12 },
  },
  {
    title: {
      nasb: 'The Gate of Ephraim, the Ancient Gate & the Fish Gate', niv: 'The Gate of Ephraim, the Jeshanah Gate & the Fish Gate',
      esv: 'The Gate of Ephraim, the Gate of Yeshanah & the Fish Gate', kjv: 'The Gate of Ephraim, the Old Gate & the Fish Gate',
    },
    ref: '12:39',
    quote: {
      nasb: '“…and above the Gate of Ephraim, by the Ancient Gate, by the Fish Gate…”',
      niv: '“…over the Gate of Ephraim, the Jeshanah Gate, the Fish Gate…”',
      esv: '“…and above the Gate of Ephraim, and by the Gate of Yeshanah, and by the Fish Gate…”',
      kjv: '“And from above the gate of Ephraim, and above the old gate, and above the fish gate…”',
    },
    note: 'The Gate of Ephraim isn’t in the repairs of chapter 3, but it had a square where people built booths for the Feast of Booths (8:16). It opened onto the road north to the hill country of Ephraim. It is placed here, between the Broad Wall and the Old Gate, by the order of this verse.',
    who: { kjv: 'The other company · Nehemiah & half the people', default: 'The second choir · Nehemiah & half the people' },
    lead2: 'fish',
    keys: ['gate:ephraim', 'gate:old', 'gate:fish', 'person:nehemiah'],
    view: { follow: 2, side: 'out', dist: 60, h: 30, along: 30 },
  },
  {
    title: { kjv: 'To the Sheep Gate & the Prison Gate', default: 'To the Sheep Gate & the Gate of the Guard' }, ref: '12:39',
    quote: {
      nasb: '“…the Tower of Hananel, and the Tower of the Hundred, as far as the Sheep Gate; and they stopped at the Gate of the Guard.”',
      niv: '“…the Tower of Hananel and the Tower of the Hundred, as far as the Sheep Gate. At the Gate of the Guard they stopped.”',
      esv: '“…and the Tower of Hananel and the Tower of the Hundred, to the Sheep Gate; and they came to a halt at the Gate of the Guard.”',
      kjv: '“…and the tower of Hananeel, and the tower of Meah, even unto the sheep gate: and they stood still in the prison gate.”',
    },
    note: {
      kjv: 'The sheep gate is where the rebuilding began (3:1), so the other company ends where the work started. The prison gate is mentioned nowhere else and its place is unknown. It is shown here as the north gate of the temple court.',
      default: 'The Sheep Gate is where the rebuilding began (3:1), so the second choir ends where the work started. The Gate of the Guard is mentioned nowhere else and its place is unknown. It is shown here as the north gate of the temple court.',
    },
    who: { kjv: 'The other company · Nehemiah & half the people', default: 'The second choir · Nehemiah & half the people' },
    lead2: 'guard',
    keys: ['tower:hananel', 'tower:meah', 'gate:sheep', 'gate:guard', 'person:nehemiah'],
    cam: { x: 92, n: 538, y: 50 }, look: { x: 56, n: 650, y: 0 },
  },
  {
    title: 'In the House of God', ref: '12:40–42',
    quote: {
      nasb: '“Then the two choirs took their positions in the house of God… And the singers sang, with Jezrahiah their leader…”',
      niv: '“The two choirs that gave thanks then took their places in the house of God… The choirs sang under the direction of Jezrahiah.”',
      esv: '“So both choirs of those who gave thanks stood in the house of God… And the singers sang with Jezrahiah as their leader.”',
      kjv: '“So stood the two companies of them that gave thanks in the house of God… And the singers sang loud, with Jezrahiah their overseer.”',
    },
    note: {
      kjv: 'The two companies come down from the wall and meet in the temple court, one from the south and one from the north, with Nehemiah, half the rulers and the priests with trumpets. This is the temple rebuilt under Zerubbabel and finished in 516 BC (Ezra 6:15).',
      default: 'The two choirs come down from the wall and meet in the temple court, one from the south and one from the north, with Nehemiah, half the officials and the priests with trumpets. This is the temple rebuilt under Zerubbabel and finished in 516 BC (Ezra 6:15).',
    },
    who: {
      kjv: 'Both companies · Nehemiah & half the rulers · priests with trumpets · Jezrahiah',
      default: 'Both choirs · Nehemiah & half the officials · priests with trumpets · Jezrahiah',
    },
    instruments: ['trumpets'],
    lead1: 'court', lead2: 'court',
    keys: ['feature:temple', 'person:nehemiah', 'person:ezra'],
    cam: { x: 130, n: 470, y: 46 }, look: { x: 50, n: 522, y: 2 },
  },
  {
    title: 'Great Sacrifices', ref: '12:43',
    quote: {
      nasb: '“…and on that day they offered great sacrifices and rejoiced because God had given them great joy, and the women and children rejoiced as well…”',
      niv: '“And on that day they offered great sacrifices, rejoicing because God had given them great joy. The women and children also rejoiced.”',
      esv: '“And they offered great sacrifices that day and rejoiced, for God had made them rejoice with great joy; the women and children also rejoiced.”',
      kjv: '“Also that day they offered great sacrifices, and rejoiced: for God had made them rejoice with great joy: the wives also and the children rejoiced…”',
    },
    note: 'Not only the priests, the Levites and the leaders: the women and children rejoice too. The smoke of the offerings goes up from the altar in front of the temple.',
    who: { kjv: 'All the people, the wives also and the children', default: 'All the people, women and children too' },
    effect: 'smoke',
    keys: ['feature:temple'],
    cam: { x: 118, n: 548, y: 20 }, look: { x: 60, n: 520, y: 8 },
  },
];
