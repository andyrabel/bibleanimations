// Content for "Paul's Third Missionary Journey" (Acts 18:23–21:17).
//
// The map is real: places are given by latitude and longitude, and the shared
// engine (../pauls-first-journey/journey.js) projects them onto the terrain in
// kilometres. The terrain is the second journey's (../pauls-second-journey/).
// The route between them is worked out by ../pauls-first-journey/tools/route.py
// and kept in route.js; each leg ends at one of the PLACES below (or at a
// harbour on the way).
//
// The tour follows Acts 18:23–21:17 in order, with what Paul's letters add:
// from Antioch through Galatia and Phrygia to Ephesus, by Troas to Macedonia and
// Greece, back through Macedonia, by sea from Troas down the coast of Asia to
// Miletus, Patara and Tyre, and up to Jerusalem with the collection. No people
// are shown; on the sea legs a ship carries the route.

// Text fields below are English. Any of them may be a plain string (the same in
// every English version) or an object keyed by version id (see VERSIONS in ../i18n.js),
// with an optional `default` used by versions not listed. Other languages are in
// lang/<lang>.js. Quotations are verbatim from Bible Gateway.

// The map (see ../pauls-first-journey/terrain.js and tools/terrain.py).
export const MAP = {
  lon0: 29.25, lat0: 36.5,
  fine: { url: '../pauls-second-journey/terrain.png', x0: -740, n1: 590, step: 1 },
  wide: { url: '../pauls-second-journey/terrain-wide.png', x0: -1800, n1: 1400, step: 4 },
};
export const OVERVIEW = { bearing: 185, dist: 1050, h: 760 };

// Words that differ between versions: {term} in any text field.
export const TERMS = {
  artemis: { kjv: 'Diana', default: 'Artemis' },
  theater: { kjv: 'theatre', default: 'theater' },
};

// Towns on the route: lat / lon (tools/route.py reads them too), size: the drawn town's radius in km.
export const PLACES = {
  antioch: { name: 'Antioch', lat: 36.202, lon: 36.160, size: 1.9, walls: true },
  derbe: { name: 'Derbe', lat: 37.350, lon: 33.370, size: 0.5 },
  lystra: { name: 'Lystra', lat: 37.578, lon: 32.453, size: 0.6, walls: true },
  iconium: { name: 'Iconium', lat: 37.872, lon: 32.492, size: 1.0, walls: true },
  antiochP: { name: { nasb: 'Pisidian Antioch', niv: 'Pisidian Antioch', default: 'Antioch in Pisidia' }, lat: 38.306, lon: 31.189, size: 0.8, walls: true },
  ephesus: { name: 'Ephesus', lat: 37.941, lon: 27.341, size: 1.6, walls: true, port: true },
  troas: { name: 'Troas', lat: 39.757, lon: 26.159, size: 1.0, walls: true, port: true },
  neapolis: { name: 'Neapolis', lat: 40.937, lon: 24.409, size: 0.5, walls: true, port: true },
  philippi: { name: 'Philippi', lat: 41.013, lon: 24.286, size: 0.9, walls: true },
  thessalonica: { name: 'Thessalonica', lat: 40.632, lon: 22.946, size: 1.5, walls: true, port: true },
  berea: { name: 'Berea', lat: 40.524, lon: 22.202, size: 0.8 },
  corinth: { name: 'Corinth', lat: 37.906, lon: 22.879, size: 1.4, walls: true },
  assos: { name: 'Assos', lat: 39.490, lon: 26.337, size: 0.5, walls: true, port: true },
  mitylene: { name: 'Mitylene', lat: 39.106, lon: 26.556, size: 0.6, walls: true, port: true },
  miletus: { name: 'Miletus', lat: 37.530, lon: 27.278, size: 0.9, walls: true, port: true },
  cos: { name: { niv: 'Kos', kjv: 'Coos', default: 'Cos' }, lat: 36.893, lon: 27.288, size: 0.5, port: true },
  rhodes: { name: 'Rhodes', lat: 36.445, lon: 28.227, size: 1.0, walls: true, port: true },
  patara: { name: 'Patara', lat: 36.262, lon: 29.315, size: 0.6, port: true },
  tyre: { name: 'Tyre', lat: 33.271, lon: 35.196, size: 0.9, walls: true, port: true },
  ptolemais: { name: 'Ptolemais', lat: 32.921, lon: 35.069, size: 0.7, walls: true, port: true },
  caesarea: { name: 'Caesarea', lat: 32.500, lon: 34.892, size: 0.9, walls: true, port: true },
  jerusalem: { name: 'Jerusalem', lat: 31.778, lon: 35.235, size: 1.0, walls: true },
};

// Other labels. kind: 'town' (drawn small), 'island', 'region', 'sea', 'item' (shown only at
// the stops that name it), 'point' (no label: a place the route goes through).
export const FEATURES = {
  tarsus: { name: 'Tarsus', lat: 36.918, lon: 34.893, kind: 'town', size: 0.9 },
  theater: { name: '{Theater}', lat: 37.9413, lon: 27.342, kind: 'item', lift: 0.6, model: 'theater', facing: 270 },
  smyrna: { name: 'Smyrna', lat: 38.418, lon: 27.139, kind: 'town', size: 1.0 },
  pergamum: { name: 'Pergamum', lat: 39.132, lon: 27.184, kind: 'town', size: 0.8 },
  thyatira: { name: 'Thyatira', lat: 38.92, lon: 27.84, kind: 'town', size: 0.5 },
  sardis: { name: 'Sardis', lat: 38.488, lon: 28.04, kind: 'town', size: 0.8 },
  philadelphia: { name: 'Philadelphia', lat: 38.35, lon: 28.52, kind: 'town', size: 0.5 },
  laodicea: { name: 'Laodicea', lat: 37.836, lon: 29.107, kind: 'town', size: 0.8 },
  colossae: { name: 'Colossae', lat: 37.788, lon: 29.262, kind: 'town', size: 0.4 },
  hierapolis: { name: 'Hierapolis', lat: 37.926, lon: 29.126, kind: 'town', size: 0.5 },
  chios: { name: 'Chios', lat: 38.37, lon: 26.0, kind: 'island', lift: 2 },
  samos: { name: 'Samos', lat: 37.73, lon: 26.8, kind: 'island', lift: 2 },
  syria: { name: 'Syria', lat: 35.4, lon: 36.7, kind: 'region', lift: 8 },
  cilicia: { name: 'Cilicia', lat: 37.15, lon: 35.2, kind: 'region', lift: 8 },
  galatia: { name: 'Galatia', lat: 39.2, lon: 32.6, kind: 'region', lift: 8 },
  phrygia: { name: 'Phrygia', lat: 38.9, lon: 30.2, kind: 'region', lift: 8 },
  asia: { name: 'Asia', lat: 38.6, lon: 28.4, kind: 'region', lift: 8 },
  macedonia: { name: 'Macedonia', lat: 40.95, lon: 22.7, kind: 'region', lift: 8 },
  achaia: { name: 'Achaia', lat: 37.55, lon: 22.3, kind: 'region', lift: 8 },
  lycia: { name: 'Lycia', lat: 36.6, lon: 29.9, kind: 'region', lift: 8 },
  phoenicia: { name: 'Phoenicia', lat: 33.9, lon: 35.7, kind: 'region', lift: 8 },
  judea: { name: 'Judea', lat: 31.55, lon: 35.0, kind: 'region', lift: 8 },
  cyprus: { name: 'Cyprus', lat: 35.05, lon: 33.2, kind: 'region', lift: 8 },
  aegean: { name: 'Aegean Sea', lat: 39.0, lon: 25.0, kind: 'sea', lift: 0 },
  sea: { name: 'Mediterranean Sea', lat: 34.3, lon: 30.5, kind: 'sea', lift: 0 },
};

export const INTRO = {
  title: 'To Finish the Course',
  ref: 'Acts 20:24',
  quote: {
    nasb: '“But I do not consider my life of any account as dear to myself, so that I may finish my course and the ministry which I received from the Lord Jesus, to testify solemnly of the gospel of God’s grace.”',
    niv: '“However, I consider my life worth nothing to me; my only aim is to finish the race and complete the task the Lord Jesus has given me—the task of testifying to the good news of God’s grace.”',
    esv: '“But I do not account my life of any value nor as precious to myself, if only I may finish my course and the ministry that I received from the Lord Jesus, to testify to the gospel of the grace of God.”',
    kjv: '“But none of these things move me, neither count I my life dear unto myself, so that I might finish my course with joy, and the ministry, which I have received of the Lord Jesus, to testify the gospel of the grace of God.”',
  },
  note: 'Paul said this to the elders of Ephesus at Miletus, near the end of his third journey, around AD 53–57. Most of the journey was spent at Ephesus, more than two years. Then he went through Macedonia and Greece gathering a collection for the poor in Jerusalem, and took it there himself, though he was warned that prison awaited him (20:23).',
  aside: 'The land is real, from modern elevation data, with the heights raised three times so the mountains show; the coastline is today’s, so the silted harbours of Ephesus and Miletus now lie inland. Acts doesn’t record the roads, so the land routes take the easiest way over the ground through the places named, and the sea routes the shortest way through open water. Towns and the ship are drawn much larger than life. No people are shown.',
};

export const FINALE = {
  title: 'What God Had Done',
  ref: 'Acts 21:19',
  quote: {
    nasb: '“After he had greeted them, he began to relate one by one the things which God had done among the Gentiles through his ministry.”',
    niv: '“Paul greeted them and reported in detail what God had done among the Gentiles through his ministry.”',
    esv: '“After greeting them, he related one by one the things that God had done among the Gentiles through his ministry.”',
    kjv: '“And when he had saluted them, he declared particularly what things God had wrought among the Gentiles by his ministry.”',
  },
  note: 'Paul and his companions reported to James and the elders, who glorified God (21:18–20). Within days Paul was seized in the temple and arrested (21:27–33). He would reach Rome, as he had hoped (Romans 15:23–24), but as a prisoner (Acts 27–28).',
};

// Tour stops, in order. at: the place the route reaches (the next time it gets there);
// part: stop that far along the way to it instead. view: [bearing (degrees from
// north), km away, km up] from what the camera looks at: the route, or the middle
// of `look`. labels: FEATURES keys to show.
export const STOPS = [
  {
    title: 'From Antioch Again', ref: 'Acts 18:23', at: 'antioch',
    quote: {
      nasb: '“And after spending some time there, he left and passed successively through the Galatian region and Phrygia, strengthening all the disciples.”',
      niv: '“After spending some time in Antioch, Paul set out from there and traveled from place to place throughout the region of Galatia and Phrygia, strengthening all the disciples.”',
      esv: '“After spending some time there, he departed and went from one place to the next through the region of Galatia and Phrygia, strengthening all the disciples.”',
      kjv: '“And after he had spent some time there, he departed, and went over all the country of Galatia and Phrygia in order, strengthening all the disciples.”',
    },
    note: 'After some time in Antioch Paul set out for the third time, overland again, to the churches of the first two journeys. Acts gives this part of the journey a single sentence before Paul reaches Ephesus (19:1). The route goes by Tarsus and the Cilician Gates, as on the second journey.',
    view: { bearing: 235, dist: 11, h: 4.5 },
  },
  {
    title: 'The Collection', ref: '1 Corinthians 16:1', at: 'antiochP', look: ['antiochP', 'iconium', 'lystra', 'derbe'], labels: ['galatia', 'phrygia'],
    quote: {
      nasb: '“Now concerning the collection for the saints, as I directed the churches of Galatia, so you are to do as well.”',
      niv: '“Now about the collection for the Lord’s people: Do what I told the Galatian churches to do.”',
      esv: '“Now concerning the collection for the saints: as I directed the churches of Galatia, so you also are to do.”',
      kjv: '“Now concerning the collection for the saints, as I have given order to the churches of Galatia, even so do ye.”',
    },
    note: 'On this journey Paul gathered money from the Gentile churches for the poor believers in Jerusalem (Romans 15:25–28; 2 Corinthians 8–9), as the apostles had asked him to remember the poor (Galatians 2:10). He told the Galatian churches, as later the Corinthians, to set something aside on the first day of every week (1 Corinthians 16:2).',
    view: { bearing: 160, dist: 60, h: 30 },
  },
  {
    title: 'Ephesus', ref: 'Acts 19:1', at: 'ephesus',
    quote: {
      nasb: '“Now it happened that while Apollos was in Corinth, Paul passed through the upper country and came to Ephesus, and found some disciples.”',
      niv: '“While Apollos was at Corinth, Paul took the road through the interior and arrived at Ephesus. There he found some disciples…”',
      esv: '“And it happened that while Apollos was at Corinth, Paul passed through the inland country and came to Ephesus. There he found some disciples.”',
      kjv: '“And it came to pass, that, while Apollos was at Corinth, Paul having passed through the upper coasts came to Ephesus: and finding certain disciples…”',
    },
    note: 'The “upper country” is taken to be the road over the uplands rather than down the valleys; Colossians 2:1 suggests Paul never went to Laodicea or Colossae, so the route keeps north of them. Ephesus was the chief city of Asia, with the great temple of {artemis}. Paul found about twelve disciples who knew only John’s baptism (19:1–7), and taught in the synagogue for three months (19:8).',
    view: { bearing: 240, dist: 11, h: 4.5 },
  },
  {
    title: 'All Asia Heard', ref: 'Acts 19:10', at: 'ephesus', look: ['ephesus', 'laodicea', 'pergamum'], labels: ['smyrna', 'pergamum', 'thyatira', 'sardis', 'philadelphia', 'laodicea', 'colossae', 'hierapolis', 'asia'],
    quote: {
      nasb: '“This took place for two years, so that all who lived in Asia heard the word of the Lord, both Jews and Greeks.”',
      niv: '“This went on for two years, so that all the Jews and Greeks who lived in the province of Asia heard the word of the Lord.”',
      esv: '“This continued for two years, so that all the residents of Asia heard the word of the Lord, both Jews and Greeks.”',
      kjv: '“And this continued by the space of two years; so that all they which dwelt in Asia heard the word of the Lord Jesus, both Jews and Greeks.”',
    },
    note: 'When the synagogue turned against him, Paul taught every day in the school of Tyrannus (19:9). Churches grew up across the province, some founded by others: Epaphras brought the gospel to Colossae, Laodicea and Hierapolis (Colossians 1:7; 4:13). The seven churches of Revelation 2–3 are all in Asia: Ephesus, Smyrna, Pergamum, Thyatira, Sardis, Philadelphia and Laodicea.',
    view: { bearing: 250, dist: 170, h: 95 },
  },
  {
    title: 'The Riot', ref: 'Acts 19:29', at: 'ephesus', look: ['theater'], labels: ['theater'],
    quote: {
      nasb: '“The city was filled with the confusion, and they rushed together into the theater, dragging along Gaius and Aristarchus, Paul’s Macedonian traveling companions.”',
      niv: '“Soon the whole city was in an uproar. The people seized Gaius and Aristarchus, Paul’s traveling companions from Macedonia, and all of them rushed into the theater together.”',
      esv: '“So the city was filled with the confusion, and they rushed together into the theater, dragging with them Gaius and Aristarchus, Macedonians who were Paul’s companions in travel.”',
      kjv: '“And the whole city was filled with confusion: and having caught Gaius and Aristarchus, men of Macedonia, Paul’s companions in travel, they rushed with one accord into the theatre.”',
    },
    note: 'Demetrius, a silversmith who made silver shrines of {artemis}, saw his trade threatened and stirred up the craftsmen (19:23–27). In the {theater} the crowd shouted the goddess’s praise for two hours until the town clerk calmed them (19:34–41). Its ruins, which seat about 25,000, are drawn here. Paul wanted to go in, but the disciples would not let him (19:30).',
    view: { bearing: 255, dist: 1.6, h: 2.2 },
  },
  {
    title: 'An Open Door at Troas', ref: '2 Corinthians 2:12', at: 'troas',
    quote: {
      nasb: '“Now when I came to Troas for the gospel of Christ and when a door was opened for me in the Lord…”',
      niv: '“Now when I went to Troas to preach the gospel of Christ and found that the Lord had opened a door for me…”',
      esv: '“When I came to Troas to preach the gospel of Christ, even though a door was opened for me in the Lord…”',
      kjv: '“Furthermore, when I came to Troas to preach Christ’s gospel, and a door was opened unto me of the Lord…”',
    },
    note: 'After the riot Paul left for Macedonia (20:1). His letters fill in the way: at Troas he found an opening for the gospel, but no rest, because Titus, who had taken a painful letter to Corinth, had not come back (2 Corinthians 2:4, 13). So he went on. Acts doesn’t say how he went from Ephesus to Troas; the route follows the road by Smyrna and Pergamum.',
    view: { bearing: 120, dist: 10, h: 4 },
  },
  {
    title: 'Titus in Macedonia', ref: '2 Corinthians 7:6', at: 'philippi',
    quote: {
      nasb: '“But God, who comforts the discouraged, comforted us by the arrival of Titus…”',
      niv: '“But God, who comforts the downcast, comforted us by the coming of Titus…”',
      esv: '“But God, who comforts the downcast, comforted us by the coming of Titus…”',
      kjv: '“Nevertheless God, that comforteth those that are cast down, comforted us by the coming of Titus…”',
    },
    note: 'In Macedonia Paul had no rest either: conflicts outside, fears within (2 Corinthians 7:5). Then Titus arrived with good news from Corinth, and Paul wrote 2 Corinthians from Macedonia. The churches of Macedonia, though poor themselves, gave generously to the collection (2 Corinthians 8:1–5).',
    view: { bearing: 200, dist: 9, h: 3.5 },
  },
  {
    title: 'Greece', ref: 'Acts 20:2', at: 'corinth',
    quote: {
      nasb: '“When he had gone through those regions and had given them much encouragement, he came to Greece.”',
      niv: '“He traveled through that area, speaking many words of encouragement to the people, and finally arrived in Greece…”',
      esv: '“When he had gone through those regions and had given them much encouragement, he came to Greece.”',
      kjv: '“And when he had gone over those parts, and had given them much exhortation, he came into Greece…”',
    },
    note: 'Acts covers Macedonia in a sentence; Paul may have gone as far as Illyricum, on the Adriatic (Romans 15:19). In Greece he stayed three months (20:3), probably at Corinth, and there wrote his letter to the Romans, carried by Phoebe of Cenchrea (Romans 16:1). Acts doesn’t say which way he came from Macedonia; the route takes the road through Thessaly.',
    view: { bearing: 200, dist: 11, h: 4.5 },
  },
  {
    title: 'For the Poor in Jerusalem', ref: 'Romans 15:26', at: 'corinth', labels: ['achaia', 'macedonia'],
    quote: {
      nasb: '“For Macedonia and Achaia have been pleased to make a contribution for the poor among the saints in Jerusalem.”',
      niv: '“For Macedonia and Achaia were pleased to make a contribution for the poor among the Lord’s people in Jerusalem.”',
      esv: '“For Macedonia and Achaia have been pleased to make some contribution for the poor among the saints at Jerusalem.”',
      kjv: '“For it hath pleased them of Macedonia and Achaia to make a certain contribution for the poor saints which are at Jerusalem.”',
    },
    note: 'Writing to Rome from Corinth, Paul explained that he must first take the gift to Jerusalem, and asked them to pray that it would be accepted (Romans 15:25–31). Achaia is the province of Greece south of Macedonia, with Corinth its capital. After Jerusalem he hoped to visit Rome on the way to Spain (15:24, 28).',
    view: { bearing: 110, dist: 14, h: 6 },
  },
  {
    title: 'Back through Macedonia', ref: 'Acts 20:3', at: 'philippi',
    quote: {
      nasb: '“And there he spent three months, and when a plot was formed against him by the Jews as he was about to set sail for Syria, he decided to return through Macedonia.”',
      niv: '“…where he stayed three months. Because some Jews had plotted against him just as he was about to sail for Syria, he decided to go back through Macedonia.”',
      esv: '“There he spent three months, and when a plot was made against him by the Jews as he was about to set sail for Syria, he decided to return through Macedonia.”',
      kjv: '“And there abode three months. And when the Jews laid wait for him, as he was about to sail into Syria, he purposed to return through Macedonia.”',
    },
    note: 'He had meant to sail from Greece straight to Syria; instead he went back the long way, overland through Macedonia. Men from the churches went with him, perhaps with the collection: Sopater of Berea, Aristarchus and Secundus of Thessalonica, Gaius of Derbe, Timothy, and Tychicus and Trophimus of Asia (20:4).',
    view: { bearing: 220, dist: 10, h: 4 },
  },
  {
    title: 'Breaking Bread at Troas', ref: 'Acts 20:7', at: 'troas',
    quote: {
      nasb: '“On the first day of the week, when we were gathered together to break bread, Paul began talking to them, intending to leave the next day, and he prolonged his message until midnight.”',
      niv: '“On the first day of the week we came together to break bread. Paul spoke to the people and, because he intended to leave the next day, kept on talking until midnight.”',
      esv: '“On the first day of the week, when we were gathered together to break bread, Paul talked with them, intending to depart on the next day, and he prolonged his speech until midnight.”',
      kjv: '“And upon the first day of the week, when the disciples came together to break bread, Paul preached unto them, ready to depart on the morrow; and continued his speech until midnight.”',
    },
    note: 'They sailed from Philippi after the days of Unleavened Bread and reached Troas in five days, and stayed seven (20:6); the story says “we” again from Philippi. That night a young man, Eutychus, fell asleep in a window and fell from the third story, and was picked up dead; Paul took him in his arms, and he was brought home alive (20:9–12).',
    view: { bearing: 120, dist: 10, h: 4 },
  },
  {
    title: 'On Foot to Assos', ref: 'Acts 20:13', at: 'assos',
    quote: {
      nasb: '“But we went ahead to the ship and set sail for Assos, intending from there to take Paul on board; for that was what he had arranged, intending himself to go by land.”',
      niv: '“We went on ahead to the ship and sailed for Assos, where we were going to take Paul aboard. He had made this arrangement because he was going there on foot.”',
      esv: '“But going ahead to the ship, we set sail for Assos, intending to take Paul aboard there, for so he had arranged, intending himself to go by land.”',
      kjv: '“And we went before to ship, and sailed unto Assos, there intending to take in Paul: for so had he appointed, minding himself to go afoot.”',
    },
    note: 'Paul walked some 35 km across the cape while the others sailed round it. At Assos they took him on board and went on to Mitylene, on Lesbos (20:14).',
    view: { bearing: 190, dist: 8, h: 3 },
  },
  {
    title: 'Chios, Samos, Miletus', ref: 'Acts 20:15', at: 'miletus', part: 0.7, labels: ['chios', 'samos'],
    quote: {
      nasb: '“Sailing from there, we arrived the following day opposite Chios; and the next day we crossed over to Samos, and on the following day we came to Miletus.”',
      niv: '“The next day we set sail from there and arrived off Chios. The day after that we crossed over to Samos, and on the following day arrived at Miletus.”',
      esv: '“And sailing from there we came the following day opposite Chios; the next day we touched at Samos; and the day after that we went to Miletus.”',
      kjv: '“And we sailed thence, and came the next day over against Chios; and the next day we arrived at Samos, and tarried at Trogyllium; and the next day we came to Miletus.”',
    },
    note: 'They sailed past Ephesus, because Paul was hurrying to be in Jerusalem, if he could, by the day of Pentecost (20:16). Each day’s sailing ended at an island or a harbour, as coasting ships did.',
    view: { bearing: 250, dist: 45, h: 22 },
  },
  {
    title: 'Farewell at Miletus', ref: 'Acts 20:38', at: 'miletus',
    quote: {
      nasb: '“…grieving especially over the word which he had spoken, that they would not see his face again. And they were accompanying him to the ship.”',
      niv: '“What grieved them most was his statement that they would never see his face again. Then they accompanied him to the ship.”',
      esv: '“…being sorrowful most of all because of the word he had spoken, that they would not see his face again. And they accompanied him to the ship.”',
      kjv: '“Sorrowing most of all for the words which he spake, that they should see his face no more. And they accompanied him unto the ship.”',
    },
    note: 'From Miletus Paul sent for the elders of the church at Ephesus, some 50 km away, and spoke to them of his years with them, of what lay ahead, and of the flock they were to shepherd (20:17–35). Then he knelt and prayed with them all (20:36). Miletus’s harbour, like Ephesus’s, has since silted up.',
    view: { bearing: 230, dist: 10, h: 4 },
  },
  {
    title: { niv: 'Kos, Rhodes, Patara', kjv: 'Coos, Rhodes, Patara', default: 'Cos, Rhodes, Patara' }, ref: 'Acts 21:1', at: 'patara', labels: ['lycia'],
    quote: {
      nasb: '“Now when we had parted from them and had set sail, we ran a straight course to Cos, and on the next day to Rhodes, and from there to Patara…”',
      niv: '“After we had torn ourselves away from them, we put out to sea and sailed straight to Kos. The next day we went to Rhodes and from there to Patara.”',
      esv: '“And when we had parted from them and set sail, we came by a straight course to Cos, and the next day to Rhodes, and from there to Patara.”',
      kjv: '“And it came to pass, that after we were gotten from them, and had launched, we came with a straight course unto Coos, and the day following unto Rhodes, and from thence unto Patara…”',
    },
    note: 'Each day’s run ended at an island or a harbour. At Patara, on the coast of Lycia, they found a ship crossing over to Phoenicia, and went on board (21:2): a bigger ship for the open sea, sailing straight across instead of along the coast.',
    view: { bearing: 200, dist: 12, h: 5 },
  },
  {
    title: 'Past Cyprus to Tyre', ref: 'Acts 21:3', at: 'tyre', labels: ['phoenicia'],
    quote: {
      nasb: '“When we came in sight of Cyprus, leaving it on the left, we kept sailing to Syria and landed at Tyre; for the ship was to unload its cargo there.”',
      niv: '“After sighting Cyprus and passing to the south of it, we sailed on to Syria. We landed at Tyre, where our ship was to unload its cargo.”',
      esv: '“When we had come in sight of Cyprus, leaving it on the left we sailed to Syria and landed at Tyre, for there the ship was to unload its cargo.”',
      kjv: '“Now when we had discovered Cyprus, we left it on the left hand, and sailed into Syria, and landed at Tyre: for there the ship was to unlade her burden.”',
    },
    note: 'The crossing of some 650 km passed south of Cyprus, where Paul’s first journey had begun. At Tyre they stayed seven days with the disciples, who told Paul through the Spirit not to go up to Jerusalem; when they left, the whole church, with wives and children, saw them off, and they knelt on the beach and prayed (21:4–5).',
    view: { bearing: 250, dist: 11, h: 4.5 },
  },
  {
    title: 'Caesarea', ref: 'Acts 21:13', at: 'caesarea',
    quote: {
      nasb: '“Then Paul replied, ‘What are you doing, weeping and breaking my heart? For I am ready not only to be bound, but even to die in Jerusalem for the name of the Lord Jesus.’”',
      niv: '“Then Paul answered, ‘Why are you weeping and breaking my heart? I am ready not only to be bound, but also to die in Jerusalem for the name of the Lord Jesus.’”',
      esv: '“Then Paul answered, ‘What are you doing, weeping and breaking my heart? For I am ready not only to be imprisoned but even to die in Jerusalem for the name of the Lord Jesus.’”',
      kjv: '“Then Paul answered, What mean ye to weep and to break mine heart? for I am ready not to be bound only, but also to die at Jerusalem for the name of the Lord Jesus.”',
    },
    note: 'From Tyre they sailed to Ptolemais, and the next day came to Caesarea, to the house of Philip the evangelist (21:7–8). The prophet Agabus took Paul’s belt, bound his own feet and hands with it, and said that the Jews in Jerusalem would bind its owner like this (21:10–11). Everyone begged Paul not to go up; this was his answer.',
    view: { bearing: 260, dist: 10, h: 4 },
  },
  {
    title: 'Jerusalem', ref: 'Acts 21:17', at: 'jerusalem', labels: ['judea'],
    quote: {
      nasb: '“After we arrived in Jerusalem, the brothers and sisters received us gladly.”',
      niv: '“When we arrived at Jerusalem, the brothers and sisters received us warmly.”',
      esv: '“When we had come to Jerusalem, the brothers received us gladly.”',
      kjv: '“And when we were come to Jerusalem, the brethren received us gladly.”',
    },
    note: 'From Caesarea to Jerusalem is about 100 km, up into the hills. Some of the disciples from Caesarea went with them and took them to stay with Mnason of Cyprus, an early disciple (21:16). Acts mentions the collection only once, when Paul later says he came to bring gifts to his nation (24:17).',
    view: { bearing: 250, dist: 12, h: 5 },
  },
];
