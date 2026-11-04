// Content for "Paul's Voyage to Rome" (Acts 27–28).
//
// The map is real: places are given by latitude and longitude, and the shared
// engine (../pauls-first-journey/journey.js) projects them onto the terrain in
// kilometres. The route between them is worked out by
// ../pauls-first-journey/tools/route.py and kept in route.js.
//
// The tour follows Acts 27:1–28:16 in order: from Caesarea by Sidon and Myra to
// Fair Havens on Crete, the storm and fourteen days adrift, the shipwreck on
// Malta, and on by Syracuse, Rhegium and Puteoli, and up the Appian Way to Rome.
// No people are shown; a ship carries the route at sea, and stops with `storm`
// bring the weather in.

// Text fields below are English. Any of them may be a plain string (the same in
// every English version) or an object keyed by version id (see VERSIONS in ../i18n.js),
// with an optional `default` used by versions not listed. Other languages are in
// lang/<lang>.js. Quotations are verbatim from Bible Gateway.

// The map (see ../pauls-first-journey/terrain.js and tools/terrain.py).
export const MAP = {
  lon0: 24.0, lat0: 36.55,
  fine: { url: 'terrain.png', x0: -1120, n1: 640, step: 1.5 },
  wide: { url: 'terrain-wide.png', x0: -2600, n1: 1800, step: 5 },
};
export const OVERVIEW = { bearing: 175, dist: 1550, h: 1100 };

// Words that differ between versions: {term} in any text field.
export const TERMS = {
  cauda: { kjv: 'Clauda', default: 'Cauda' },
  centurion: 'centurion',
};

// Towns on the route: lat / lon (tools/route.py reads them too), size: the drawn town's radius in km.
export const PLACES = {
  caesarea: { name: 'Caesarea', lat: 32.500, lon: 34.892, size: 0.9, walls: true, port: true },
  sidon: { name: 'Sidon', lat: 33.563, lon: 35.371, size: 0.9, walls: true, port: true },
  myra: { name: 'Myra', lat: 36.259, lon: 29.985, size: 0.8, walls: true, port: true },
  cnidus: { name: 'Cnidus', lat: 36.686, lon: 27.374, size: 0.6, walls: true, port: true },
  fairHavens: { name: { kjv: 'The Fair Havens', default: 'Fair Havens' }, lat: 34.932, lon: 24.812, size: 0.2, port: true },
  malta: { name: { kjv: 'Melita', default: 'Malta' }, lat: 35.886, lon: 14.403, size: 0.7, walls: true },
  syracuse: { name: 'Syracuse', lat: 37.075, lon: 15.290, size: 1.5, walls: true, port: true },
  rhegium: { name: 'Rhegium', lat: 38.111, lon: 15.647, size: 0.9, walls: true, port: true },
  puteoli: { name: 'Puteoli', lat: 40.823, lon: 14.121, size: 1.0, walls: true, port: true },
  forum: { name: { nasb: 'Market of Appius', kjv: 'Appii Forum', default: 'Forum of Appius' }, lat: 41.433, lon: 13.064, size: 0.35 },
  taverns: { name: { nasb: 'Three Inns', default: 'Three Taverns' }, lat: 41.610, lon: 12.830, size: 0.3 },
  rome: { name: 'Rome', lat: 41.893, lon: 12.483, size: 3.0, walls: true },
};

// Other labels. kind: 'town' (drawn small), 'island', 'region', 'sea', 'item' (shown only at
// the stops that name it), 'point' (no label: a place the route goes through).
export const FEATURES = {
  lasea: { name: 'Lasea', lat: 34.931, lon: 24.865, kind: 'town', size: 0.4 },
  phoenix: { name: { kjv: 'Phenice', default: 'Phoenix' }, lat: 35.198, lon: 24.077, kind: 'town', size: 0.3 },
  salmone: { name: 'Salmone', lat: 35.31, lon: 26.31, kind: 'island', lift: 1 },
  cauda: { name: '{Cauda}', lat: 34.845, lon: 24.085, kind: 'island', lift: 1 },
  cyprus: { name: 'Cyprus', lat: 35.05, lon: 33.2, kind: 'region', lift: 8 },
  cilicia: { name: 'Cilicia', lat: 37.0, lon: 35.0, kind: 'region', lift: 8 },
  pamphylia: { name: 'Pamphylia', lat: 37.0, lon: 31.2, kind: 'region', lift: 8 },
  lycia: { name: 'Lycia', lat: 36.6, lon: 29.9, kind: 'region', lift: 8 },
  crete: { name: 'Crete', lat: 35.25, lon: 24.6, kind: 'region', lift: 8 },
  achaia: { name: 'Achaia', lat: 37.55, lon: 22.3, kind: 'region', lift: 8 },
  sicily: { name: 'Sicily', lat: 37.55, lon: 14.2, kind: 'region', lift: 8 },
  italy: { name: 'Italy', lat: 41.2, lon: 15.4, kind: 'region', lift: 8 },
  phoenicia: { name: 'Phoenicia', lat: 33.9, lon: 35.7, kind: 'region', lift: 8 },
  adria: { name: { kjv: 'Adria', default: 'Adriatic Sea' }, lat: 36.6, lon: 18.6, kind: 'sea', lift: 0 },
  syrtis: { name: 'Syrtis', lat: 32.3, lon: 18.8, kind: 'sea', lift: 0 },
  sea: { name: 'Mediterranean Sea', lat: 34.2, lon: 29.0, kind: 'sea', lift: 0 },
  matala: { lat: 34.97, lon: 24.7, kind: 'point' },
  caudaPt: { lat: 34.8, lon: 24.1, kind: 'point' },
  bay: { lat: 35.955, lon: 14.405, kind: 'point' },
  valletta: { lat: 35.895, lon: 14.515, kind: 'point' },
};

export const INTRO = {
  title: 'You Must Testify in Rome',
  ref: 'Acts 23:11',
  quote: {
    nasb: '“But on the following night, the Lord stood near him and said, ‘Be courageous! For as you have testified to the truth about Me in Jerusalem, so you must testify in Rome also.’”',
    niv: '“The following night the Lord stood near Paul and said, ‘Take courage! As you have testified about me in Jerusalem, so you must also testify in Rome.’”',
    esv: '“The following night the Lord stood by him and said, ‘Take courage, for as you have testified to the facts about me in Jerusalem, so you must testify also in Rome.’”',
    kjv: '“And the night following the Lord stood by him, and said, Be of good cheer, Paul: for as thou hast testified of me in Jerusalem, so must thou bear witness also at Rome.”',
  },
  note: 'Paul had been arrested in the temple at Jerusalem (21:27–36). The Lord spoke to him in the barracks the night after he stood before the council. He was taken to Caesarea, held there two years under the governors Felix and Festus, and, as a Roman citizen, appealed to Caesar (24:27; 25:11–12). So he went to Rome as a prisoner, around AD 59–60. Luke went with him, and his account of the voyage is one of the most detailed records of ancient seafaring.',
  aside: 'The land is real, from modern elevation data, with the heights raised three times so the mountains show; the coastline is today’s. Luke, who sailed with Paul, gives the ports and islands but not the courses between them, so the sea routes take the shortest way through open water past the places he names, and the drift from Cauda to Malta is drawn straight. Towns and the ship are drawn much larger than life. No people are shown.',
};

export const FINALE = {
  title: 'Unhindered',
  ref: 'Acts 28:31',
  quote: {
    nasb: '“…preaching the kingdom of God and teaching things about the Lord Jesus Christ with all openness, unhindered.”',
    niv: '“He proclaimed the kingdom of God and taught about the Lord Jesus Christ—with all boldness and without hindrance!”',
    esv: '“…proclaiming the kingdom of God and teaching about the Lord Jesus Christ with all boldness and without hindrance.”',
    kjv: '“Preaching the kingdom of God, and teaching those things which concern the Lord Jesus Christ, with all confidence, no man forbidding him.”',
  },
  note: 'Acts ends with Paul two whole years in Rome, in his own rented lodging, welcoming all who came to him (28:30). From there, many think, he wrote to the Philippians that his imprisonment had served to advance the gospel, so that the whole praetorian guard knew he was in chains for Christ (Philippians 1:12–13). The book stops there; it doesn’t tell how his trial ended.',
};

// Tour stops, in order. at: the place the route reaches (the next time it gets there);
// part: stop that far along the way to it instead. view: [bearing (degrees from
// north), km away, km up] from what the camera looks at: the route, or the middle
// of `look`. labels: FEATURES keys to show. storm: how stormy it is (0..1).
export const STOPS = [
  {
    title: 'Bound for Italy', ref: 'Acts 27:1', at: 'caesarea',
    quote: {
      nasb: '“Now when it was decided that we would sail for Italy, they proceeded to turn Paul and some other prisoners over to a centurion of the Augustan cohort, named Julius.”',
      niv: '“When it was decided that we would sail for Italy, Paul and some other prisoners were handed over to a centurion named Julius, who belonged to the Imperial Regiment.”',
      esv: '“And when it was decided that we should sail for Italy, they delivered Paul and some other prisoners to a centurion of the Augustan Cohort named Julius.”',
      kjv: '“And when it was determined that we should sail into Italy, they delivered Paul and certain other prisoners unto one named Julius, a centurion of Augustus’ band.”',
    },
    note: 'The story says “we” again: Luke sailed with Paul, and so did Aristarchus of Thessalonica (27:2). They went on board a ship of Adramyttium, a port near Troas, that was sailing along the coast of Asia. Caesarea, Herod’s harbour city, was the seat of the Roman governor of Judea.',
    view: { bearing: 270, dist: 9, h: 3.5 },
  },
  {
    title: 'Sidon', ref: 'Acts 27:3', at: 'sidon', labels: ['phoenicia'],
    quote: {
      nasb: '“The next day we put in at Sidon; and Julius treated Paul with consideration and allowed him to go to his friends and receive care.”',
      niv: '“The next day we landed at Sidon; and Julius, in kindness to Paul, allowed him to go to his friends so they might provide for his needs.”',
      esv: '“The next day we put in at Sidon. And Julius treated Paul kindly and gave him leave to go to his friends and be cared for.”',
      kjv: '“And the next day we touched at Sidon. And Julius courteously entreated Paul, and gave him liberty to go unto his friends to refresh himself.”',
    },
    note: 'Sidon, about 110 km up the coast, was an old Phoenician port with believers in it, perhaps since the scattering after Stephen’s death (11:19). The {centurion} Julius, who would later save Paul’s life (27:43), let him go ashore to his friends.',
    view: { bearing: 250, dist: 9, h: 3.5 },
  },
  {
    title: 'In the Lee of Cyprus', ref: 'Acts 27:4', at: 'myra', part: 0.35, labels: ['cyprus', 'cilicia'],
    quote: {
      nasb: '“From there we put out to sea and sailed under the shelter of Cyprus, because the winds were contrary.”',
      niv: '“From there we put out to sea again and passed to the lee of Cyprus because the winds were against us.”',
      esv: '“And putting out to sea from there we sailed under the lee of Cyprus, because the winds were against us.”',
      kjv: '“And when we had launched from thence, we sailed under Cyprus, because the winds were contrary.”',
    },
    note: 'The summer winds blow from the west and north-west. So the ship kept to the east and north of Cyprus, in the shelter of the island, and then worked west along the coast of Cilicia and Pamphylia, where land breezes and currents helped (27:5). The route here is a guess of that kind.',
    view: { bearing: 150, dist: 60, h: 30 },
  },
  {
    title: 'A Ship of Alexandria', ref: 'Acts 27:6', at: 'myra', labels: ['lycia'],
    quote: {
      nasb: '“There the centurion found an Alexandrian ship sailing for Italy, and he put us aboard it.”',
      niv: '“There the centurion found an Alexandrian ship sailing for Italy and put us on board.”',
      esv: '“There the centurion found a ship of Alexandria sailing for Italy and put us on board.”',
      kjv: '“And there the centurion found a ship of Alexandria sailing into Italy; and he put us therein.”',
    },
    note: 'Myra, in Lycia, was a harbour on the grain route from Egypt to Rome; with the westerly winds, ships from Alexandria came north to the Asian coast before turning west. This one carried wheat (27:38) and 276 people (27:37). Ships of the grain fleet were large: one described in the second century was some 55 m long.',
    view: { bearing: 200, dist: 10, h: 4 },
  },
  {
    title: 'Off Cnidus', ref: 'Acts 27:7', at: 'cnidus', labels: ['salmone'],
    quote: {
      nasb: '“When we had sailed slowly for a good many days, and with difficulty had arrived off Cnidus, since the wind did not permit us to go farther, we sailed under the shelter of Crete, off Salmone…”',
      niv: '“We made slow headway for many days and had difficulty arriving off Cnidus. When the wind did not allow us to hold our course, we sailed to the lee of Crete, opposite Salmone.”',
      esv: '“We sailed slowly for a number of days and arrived with difficulty off Cnidus, and as the wind did not allow us to go farther, we sailed under the lee of Crete off Salmone.”',
      kjv: '“And when we had sailed slowly many days, and scarce were come over against Cnidus, the wind not suffering us, we sailed under Crete, over against Salmone…”',
    },
    note: 'Cnidus stood at the end of a long peninsula, the last shelter before the open Aegean. With the wind against them they could not hold their course for Italy, so they turned south and ran down the east end of Crete, round Cape Salmone, to the shelter of its south coast.',
    view: { bearing: 220, dist: 14, h: 6 },
  },
  {
    title: { kjv: 'The Fair Havens', default: 'Fair Havens' }, ref: 'Acts 27:8', at: 'fairHavens', labels: ['lasea'],
    quote: {
      nasb: '“…and with difficulty sailing past it, we came to a place called Fair Havens, near which was the city of Lasea.”',
      niv: '“We moved along the coast with difficulty and came to a place called Fair Havens, near the town of Lasea.”',
      esv: '“Coasting along it with difficulty, we came to a place called Fair Havens, near which was the city of Lasea.”',
      kjv: '“And, hardly passing it, came unto a place which is called The fair havens; nigh whereunto was the city of Lasea.”',
    },
    note: 'Fair Havens is still called Kaloi Limenes, a small bay on the south coast of Crete; ruins near it are taken to be Lasea. Much time had been lost, and the Fast, the Day of Atonement in late September or October, was already over (27:9). Sailing was dangerous from mid-September and stopped altogether in winter.',
    view: { bearing: 200, dist: 10, h: 4 },
  },
  {
    title: 'Paul’s Warning', ref: 'Acts 27:10', at: 'fairHavens', labels: ['phoenix'],
    quote: {
      nasb: '“…saying to them, ‘Men, I perceive that the voyage will certainly be with damage and great loss, not only of the cargo and the ship, but also of our lives.’”',
      niv: '“‘Men, I can see that our voyage is going to be disastrous and bring great loss to ship and cargo, and to our own lives also.’”',
      esv: '“…saying, ‘Sirs, I perceive that the voyage will be with injury and much loss, not only of the cargo and the ship, but also of our lives.’”',
      kjv: '“And said unto them, Sirs, I perceive that this voyage will be with hurt and much damage, not only of the lading and ship, but also of our lives.”',
    },
    note: 'The {centurion} listened to the pilot and the owner of the ship rather than to Paul. Fair Havens was not a good harbour to winter in, so the majority decided to try to reach Phoenix, a harbour of Crete some 65 km west, facing south-west and north-west, and winter there (27:11–12).',
    view: { bearing: 110, dist: 22, h: 9 },
  },
  {
    title: { kjv: 'Euroclydon', niv: 'The Northeaster', esv: 'The Northeaster', default: 'Euraquilo' }, ref: 'Acts 27:14', at: 'cauda', part: 0.35, storm: 0.8,
    quote: {
      nasb: '“But before very long a violent wind, called Euraquilo, rushed down from the land…”',
      niv: '“Before very long, a wind of hurricane force, called the Northeaster, swept down from the island.”',
      esv: '“But soon a tempestuous wind, called the northeaster, struck down from the land.”',
      kjv: '“But not long after there arose against it a tempestuous wind, called Euroclydon.”',
    },
    note: 'A gentle south wind had tempted them out, sailing close along the coast (27:13). Then the wind came down off the mountains of Crete from the north-east. The ship could not head into it, so they gave way and let her be driven (27:15).',
    view: { bearing: 160, dist: 9, h: 3 },
  },
  {
    title: '{Cauda}', ref: 'Acts 27:16', at: 'cauda', labels: ['cauda'], storm: 0.9,
    quote: {
      nasb: '“Running under the shelter of a small island called Cauda, we were able to get the ship’s boat under control only with difficulty.”',
      niv: '“As we passed to the lee of a small island called Cauda, we were hardly able to make the lifeboat secure…”',
      esv: '“Running under the lee of a small island called Cauda, we managed with difficulty to secure the ship’s boat.”',
      kjv: '“And running under a certain island which is called Clauda, we had much work to come by the boat…”',
    },
    note: 'In the lee of the island, about 40 km south-west, they hauled in the ship’s boat and passed cables round the hull to hold it together. Afraid of running onto the Syrtis, the sandbanks off Africa, they let down the gear and were driven along (27:17). The next days they threw the cargo, then the ship’s tackle, overboard (27:18–19).',
    view: { bearing: 200, dist: 7, h: 2.6 },
  },
  {
    title: 'All Hope Abandoned', ref: 'Acts 27:20', at: 'bay', part: 0.3, labels: ['syrtis'], storm: 1,
    quote: {
      nasb: '“Since neither sun nor stars appeared for many days, and no small storm was assailing us, from then on all hope of our being saved was slowly abandoned.”',
      niv: '“When neither sun nor stars appeared for many days and the storm continued raging, we finally gave up all hope of being saved.”',
      esv: '“When neither sun nor stars appeared for many days, and no small tempest lay on us, all hope of our being saved was at last abandoned.”',
      kjv: '“And when neither sun nor stars in many days appeared, and no small tempest lay on us, all hope that we should be saved was then taken away.”',
    },
    note: 'With no sun or stars a ship could not find its position. The drift from Cauda to Malta is some 870 km; at the speed modern sailors reckon for a ship lying to in a gale, that takes about thirteen days, which fits the fourteen nights of 27:27. The route is drawn as a straight drift.',
    view: { bearing: 140, dist: 4, h: 1.4 },
  },
  {
    title: 'Do Not Be Afraid, Paul', ref: 'Acts 27:23–24', at: 'bay', part: 0.55, storm: 0.9,
    quote: {
      nasb: '“For this very night an angel of the God to whom I belong, whom I also serve, came to me, saying, ‘Do not be afraid, Paul; you must stand before Caesar; and behold, God has graciously granted you all those who are sailing with you.’”',
      niv: '“Last night an angel of the God to whom I belong and whom I serve stood beside me and said, ‘Do not be afraid, Paul. You must stand trial before Caesar; and God has graciously given you the lives of all who sail with you.’”',
      esv: '“For this very night there stood before me an angel of the God to whom I belong and whom I worship, and he said, ‘Do not be afraid, Paul; you must stand before Caesar. And behold, God has granted you all those who sail with you.’”',
      kjv: '“For there stood by me this night the angel of God, whose I am, and whom I serve, Saying, Fear not, Paul; thou must be brought before Caesar: and, lo, God hath given thee all them that sail with thee.”',
    },
    note: 'After they had gone a long time without food, Paul stood up among them. He reminded them that they should have listened to him at Crete, but told them to take heart: no one would lose his life, only the ship, and they must run aground on some island (27:21–26).',
    view: { bearing: 250, dist: 4, h: 1.6 },
  },
  {
    title: 'The Fourteenth Night', ref: 'Acts 27:27', at: 'bay', part: 0.97, labels: ['adria'], storm: 0.7,
    quote: {
      nasb: '“But when the fourteenth night came, as we were being driven about in the Adriatic Sea, about midnight the sailors began to suspect that they were approaching some land.”',
      niv: '“On the fourteenth night we were still being driven across the Adriatic Sea, when about midnight the sailors sensed they were approaching land.”',
      esv: '“When the fourteenth night had come, as we were being driven across the Adriatic Sea, about midnight the sailors suspected that they were nearing land.”',
      kjv: '“But when the fourteenth night was come, as we were driven up and down in Adria, about midnight the shipmen deemed that they drew near to some country…”',
    },
    note: 'The Adriatic Sea, or Adria, then meant the whole sea between Greece, Italy and Africa. Sounding, the sailors found twenty fathoms, then fifteen; they let go four anchors from the stern and prayed for day (27:28–29). Paul urged everyone to eat, gave thanks for bread before them all, and broke it; then they lightened the ship by throwing the wheat into the sea (27:33–38).',
    view: { bearing: 80, dist: 5, h: 1.8 },
  },
  {
    title: 'Shipwreck', ref: 'Acts 27:44', at: 'bay', storm: 0.5,
    quote: {
      nasb: '“…and the rest were to follow, some on planks, and others on various things from the ship. And so it happened that they all were brought safely to land.”',
      niv: '“The rest were to get there on planks or on other pieces of the ship. In this way everyone reached land safely.”',
      esv: '“…and the rest on planks or on pieces of the ship. And so it was that all were brought safely to land.”',
      kjv: '“And the rest, some on boards, and some on broken pieces of the ship. And so it came to pass, that they escaped all safe to land.”',
    },
    note: 'At daybreak they saw a bay with a beach and tried to run the ship onto it, but she struck a place where two seas met, a reef or sandbar, and stuck fast; the stern broke up in the surf (27:39–41). The soldiers meant to kill the prisoners, but the {centurion}, wanting to save Paul, stopped them (27:42–43). St Paul’s Bay, in the north of Malta, is the traditional place.',
    view: { bearing: 20, dist: 6, h: 2.2 },
  },
  {
    title: { kjv: 'Melita', default: 'Malta' }, ref: 'Acts 28:2', at: 'malta', storm: 0.25,
    quote: {
      nasb: '“The natives showed us extraordinary kindness, for they kindled a fire and took us all in because of the rain that had started and because of the cold.”',
      niv: '“The islanders showed us unusual kindness. They built a fire and welcomed us all because it was raining and cold.”',
      esv: '“The native people showed us unusual kindness, for they kindled a fire and welcomed us all, because it had begun to rain and was cold.”',
      kjv: '“And the barbarous people shewed us no little kindness: for they kindled a fire, and received us every one, because of the present rain, and because of the cold.”',
    },
    note: 'A viper fastened on Paul’s hand as he put sticks on the fire; he shook it off and was not harmed, and the people decided he was a god (28:3–6). Publius, the leading man of the island, received them for three days. Paul healed his father, and then the other sick of the island came and were cured (28:7–9). They stayed three months, through the winter.',
    view: { bearing: 200, dist: 9, h: 3.5 },
  },
  {
    title: 'Syracuse', ref: 'Acts 28:11', at: 'syracuse', labels: ['sicily'],
    quote: {
      nasb: '“After three months we set sail on an Alexandrian ship which had wintered at the island, and which had the Twin Brothers for its figurehead.”',
      niv: '“After three months we put out to sea in a ship that had wintered in the island—it was an Alexandrian ship with the figurehead of the twin gods Castor and Pollux.”',
      esv: '“After three months we set sail in a ship that had wintered in the island, a ship of Alexandria, with the twin gods as a figurehead.”',
      kjv: '“And after three months we departed in a ship of Alexandria, which had wintered in the isle, whose sign was Castor and Pollux.”',
    },
    note: 'The Twin Brothers are Castor and Pollux, the sons of Zeus, the sailors’ protectors, carved or painted on the bow. They sailed again when the season opened in spring, about 150 km to Syracuse, the chief city of Sicily, and stayed three days (28:12).',
    view: { bearing: 200, dist: 11, h: 4.5 },
  },
  {
    title: 'Rhegium and Puteoli', ref: 'Acts 28:13', at: 'puteoli', labels: ['italy'],
    quote: {
      nasb: '“From there we sailed around and arrived at Rhegium, and a day later a south wind came up, and on the second day we came to Puteoli.”',
      niv: '“From there we set sail and arrived at Rhegium. The next day the south wind came up, and on the following day we reached Puteoli.”',
      esv: '“And from there we made a circuit and arrived at Rhegium. And after one day a south wind sprang up, and on the second day we came to Puteoli.”',
      kjv: '“And from thence we fetched a compass, and came to Rhegium: and after one day the south wind blew, and we came the next day to Puteoli…”',
    },
    note: 'Rhegium, at the toe of Italy, guarded the Strait of Messina. With a south wind behind them they covered the 350 km to Puteoli, on the Bay of Naples, in two days. Puteoli was the great port where the Alexandrian grain ships unloaded for Rome. There they found believers and stayed seven days (28:14).',
    view: { bearing: 200, dist: 14, h: 6 },
  },
  {
    title: { nasb: 'The Market of Appius', kjv: 'Appii Forum', default: 'The Forum of Appius' }, ref: 'Acts 28:15', at: 'taverns', look: ['forum', 'taverns'],
    quote: {
      nasb: '“And from there the brothers and sisters, when they heard about us, came as far as the Market of Appius and the Three Inns to meet us; and when Paul saw them, he thanked God and took courage.”',
      niv: '“The brothers and sisters there had heard that we were coming, and they traveled as far as the Forum of Appius and the Three Taverns to meet us. At the sight of these people Paul thanked God and was encouraged.”',
      esv: '“And the brothers there, when they heard about us, came as far as the Forum of Appius and Three Taverns to meet us. On seeing them, Paul thanked God and took courage.”',
      kjv: '“And from thence, when the brethren heard of us, they came to meet us as far as Appii forum, and The three taverns: whom when Paul saw, he thanked God, and took courage.”',
    },
    note: 'From Puteoli they went on foot by the Via Appia, the oldest of the great Roman roads. The Forum of Appius, a market town some 70 km from Rome, and the Three Taverns, about 50 km out, are where two groups of believers met them. Paul had written to the church in Rome three years before, longing to see them (Romans 1:11; 15:23).',
    view: { bearing: 250, dist: 40, h: 18 },
  },
  {
    title: 'Rome', ref: 'Acts 28:16', at: 'rome',
    quote: {
      nasb: '“When we entered Rome, Paul was allowed to stay by himself, with the soldier who was guarding him.”',
      niv: '“When we got to Rome, Paul was allowed to live by himself, with a soldier to guard him.”',
      esv: '“And when we came into Rome, Paul was allowed to stay by himself, with the soldier who guarded him.”',
      kjv: '“And when we came to Rome, the centurion delivered the prisoners to the captain of the guard: but Paul was suffered to dwell by himself with a soldier that kept him.”',
    },
    note: 'Rome had perhaps a million people, by far the largest city of the empire. Paul was kept under guard, but in his own lodging. Three days later he called the leaders of the Jews and explained that it was for the hope of Israel that he was in chains (28:17–20). Some believed and some did not (28:24).',
    view: { bearing: 220, dist: 14, h: 6 },
  },
];
