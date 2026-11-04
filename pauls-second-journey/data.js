// Content for "Paul's Second Missionary Journey" (Acts 15:36–18:22).
//
// The map is real: places are given by latitude and longitude, and the shared
// engine (../pauls-first-journey/journey.js) projects them onto the terrain in
// kilometres. The route between them is worked out by
// ../pauls-first-journey/tools/route.py and kept in route.js; each leg ends at
// one of the PLACES or FEATURES below (or at a harbour on the way).
//
// The tour follows Acts 15:36–18:22 in order, with what Paul's letters add:
// from Antioch through Syria and Cilicia to Derbe and Lystra, across Asia Minor
// to Troas, by sea to Macedonia (Philippi, Thessalonica, Berea), on to Athens
// and Corinth, and home by Ephesus, Caesarea and Jerusalem. No people are
// shown; on the sea legs a ship carries the route.

// Text fields below are English. Any of them may be a plain string (the same in
// every English version) or an object keyed by version id (see VERSIONS in ../i18n.js),
// with an optional `default` used by versions not listed. Other languages are in
// lang/<lang>.js. Quotations are verbatim from Bible Gateway.

// The map (see ../pauls-first-journey/terrain.js and tools/terrain.py).
export const MAP = {
  lon0: 29.25, lat0: 36.5,
  fine: { url: 'terrain.png', x0: -740, n1: 590, step: 1 },
  wide: { url: 'terrain-wide.png', x0: -1800, n1: 1400, step: 4 },
};
export const OVERVIEW = { bearing: 185, dist: 1050, h: 760 };

// Words that differ between versions: {term} in any text field.
export const TERMS = {
  areopagus: { kjv: 'Mars’ Hill', default: 'Areopagus' },
};

// Towns on the route: lat / lon (tools/route.py reads them too), size: the drawn town's radius in km.
export const PLACES = {
  antioch: { name: 'Antioch', lat: 36.202, lon: 36.160, size: 1.9, walls: true },
  derbe: { name: 'Derbe', lat: 37.350, lon: 33.370, size: 0.5 },
  lystra: { name: 'Lystra', lat: 37.578, lon: 32.453, size: 0.6, walls: true },
  iconium: { name: 'Iconium', lat: 37.872, lon: 32.492, size: 1.0, walls: true },
  antiochP: { name: { nasb: 'Pisidian Antioch', niv: 'Pisidian Antioch', default: 'Antioch in Pisidia' }, lat: 38.306, lon: 31.189, size: 0.8, walls: true },
  troas: { name: 'Troas', lat: 39.757, lon: 26.159, size: 1.0, walls: true, port: true },
  neapolis: { name: 'Neapolis', lat: 40.937, lon: 24.409, size: 0.5, walls: true, port: true },
  philippi: { name: 'Philippi', lat: 41.013, lon: 24.286, size: 0.9, walls: true },
  thessalonica: { name: 'Thessalonica', lat: 40.632, lon: 22.946, size: 1.5, walls: true, port: true },
  berea: { name: 'Berea', lat: 40.524, lon: 22.202, size: 0.8 },
  athens: { name: 'Athens', lat: 37.972, lon: 23.726, size: 1.6, walls: true },
  corinth: { name: 'Corinth', lat: 37.906, lon: 22.879, size: 1.4, walls: true },
  cenchrea: { name: { niv: 'Cenchreae', esv: 'Cenchreae', default: 'Cenchrea' }, lat: 37.884, lon: 22.993, size: 0.4, port: true },
  ephesus: { name: 'Ephesus', lat: 37.941, lon: 27.341, size: 1.6, walls: true, port: true },
  caesarea: { name: 'Caesarea', lat: 32.500, lon: 34.892, size: 0.9, walls: true, port: true },
  jerusalem: { name: 'Jerusalem', lat: 31.778, lon: 35.235, size: 1.0, walls: true },
};

// Other labels. kind: 'town' (drawn small), 'island', 'region', 'sea', 'item' (shown only at
// the stops that name it), 'point' (no label: a place the route goes through).
export const FEATURES = {
  tarsus: { name: 'Tarsus', lat: 36.918, lon: 34.893, kind: 'town', size: 0.9 },
  amphipolis: { name: 'Amphipolis', lat: 40.82, lon: 23.846, kind: 'town', size: 0.7 },
  apollonia: { name: 'Apollonia', lat: 40.65, lon: 23.48, kind: 'town', size: 0.4 },
  samothrace: { name: { kjv: 'Samothracia', default: 'Samothrace' }, lat: 40.47, lon: 25.53, kind: 'island', lift: 2 },
  areopagus: { name: '{Areopagus}', lat: 37.9725, lon: 23.7235, kind: 'item', lift: 0.25 },
  syria: { name: 'Syria', lat: 35.4, lon: 36.7, kind: 'region', lift: 8 },
  cilicia: { name: 'Cilicia', lat: 37.15, lon: 35.2, kind: 'region', lift: 8 },
  galatia: { name: 'Galatia', lat: 39.2, lon: 32.6, kind: 'region', lift: 8 },
  phrygia: { name: 'Phrygia', lat: 38.9, lon: 30.2, kind: 'region', lift: 8 },
  mysia: { name: 'Mysia', lat: 39.75, lon: 27.9, kind: 'region', lift: 8 },
  bithynia: { name: 'Bithynia', lat: 40.55, lon: 30.6, kind: 'region', lift: 8 },
  asia: { name: 'Asia', lat: 38.4, lon: 28.2, kind: 'region', lift: 8 },
  macedonia: { name: 'Macedonia', lat: 40.95, lon: 22.7, kind: 'region', lift: 8 },
  achaia: { name: 'Achaia', lat: 37.55, lon: 22.3, kind: 'region', lift: 8 },
  judea: { name: 'Judea', lat: 31.55, lon: 35.0, kind: 'region', lift: 8 },
  cyprus: { name: 'Cyprus', lat: 35.05, lon: 33.2, kind: 'region', lift: 8 },
  aegean: { name: 'Aegean Sea', lat: 39.0, lon: 25.0, kind: 'sea', lift: 0 },
  sea: { name: 'Mediterranean Sea', lat: 34.3, lon: 30.5, kind: 'sea', lift: 0 },
  phrygiaPt: { lat: 38.85, lon: 30.75, kind: 'point' },
  mysiaPt: { lat: 39.78, lon: 30.5, kind: 'point' },
  pydna: { lat: 40.39, lon: 22.62, kind: 'point' },
  piraeus: { lat: 37.94, lon: 23.64, kind: 'point' },
};

export const INTRO = {
  title: 'Let Us Go Back',
  ref: 'Acts 15:36',
  quote: {
    nasb: '“After some days Paul said to Barnabas, ‘Let’s return and visit the brothers and sisters in every city in which we proclaimed the word of the Lord, and see how they are.’”',
    niv: '“Some time later Paul said to Barnabas, ‘Let us go back and visit the believers in all the towns where we preached the word of the Lord and see how they are doing.’”',
    esv: '“And after some days Paul said to Barnabas, ‘Let us return and visit the brothers in every city where we proclaimed the word of the Lord, and see how they are.’”',
    kjv: '“And some days after Paul said unto Barnabas, Let us go again and visit our brethren in every city where we have preached the word of the Lord, and see how they do.”',
  },
  note: 'After the council in Jerusalem (Acts 15), Paul proposed going back to the churches of the first journey. Barnabas wanted to take John Mark again; Paul would not, and they parted: Barnabas sailed to Cyprus with Mark, and Paul set out by land with Silas (15:37–40). This journey, around AD 49–52, took the gospel into Europe: to Philippi, Thessalonica, Berea, Athens and Corinth.',
  aside: 'The land is real, from modern elevation data, with the heights raised three times so the mountains show; the coastline is today’s, so the silted harbours of Ephesus and Miletus now lie inland. Acts doesn’t record the roads, so the land routes take the easiest way over the ground through the places named, and the sea routes the shortest way through open water. Towns and the ship are drawn much larger than life. No people are shown.',
};

export const FINALE = {
  title: 'The Word Sounded Forth',
  ref: '1 Thessalonians 1:8',
  quote: {
    nasb: '“For the word of the Lord has sounded forth from you, not only in Macedonia and Achaia, but in every place the news of your faith toward God has gone out, so that we have no need to say anything.”',
    niv: '“The Lord’s message rang out from you not only in Macedonia and Achaia—your faith in God has become known everywhere. Therefore we do not need to say anything about it…”',
    esv: '“For not only has the word of the Lord sounded forth from you in Macedonia and Achaia, but your faith in God has gone forth everywhere, so that we need not say anything.”',
    kjv: '“For from you sounded out the word of the Lord not only in Macedonia and Achaia, but also in every place your faith to God-ward is spread abroad; so that we need not to speak any thing.”',
  },
  note: 'Paul wrote this from Corinth, a few months after he had been driven out of Thessalonica (1 Thessalonians 2:17; 3:1–6). It is probably the earliest of his letters that we have. He would write again to the churches founded on this journey, in Philippi, Thessalonica and Corinth, and see them again on his third journey (20:1–3).',
};

// Tour stops, in order. at: the place the route reaches (the next time it gets there);
// part: stop that far along the way to it instead. view: [bearing (degrees from
// north), km away, km up] from what the camera looks at: the route, or the middle
// of `look`. labels: FEATURES keys to show. storm: how stormy it is (0..1).
// caption: shown over the map during the flight in (crossing from Asia into Europe).
export const STOPS = [
  {
    title: 'Paul Chooses Silas', ref: 'Acts 15:40', at: 'antioch',
    quote: {
      nasb: '“But Paul chose Silas, and left after being entrusted by the brothers to the grace of the Lord.”',
      niv: '“…but Paul chose Silas and left, commended by the believers to the grace of the Lord.”',
      esv: '“…but Paul chose Silas and departed, having been commended by the brothers to the grace of the Lord.”',
      kjv: '“And Paul chose Silas, and departed, being recommended by the brethren unto the grace of God.”',
    },
    note: 'Silas (Silvanus in the letters) was a leader of the Jerusalem church and a prophet, sent with the council’s letter to Antioch (15:22, 32). Like Paul he was a Roman citizen (16:37). Barnabas and Mark sailed for Cyprus; Acts doesn’t follow them, though Paul later speaks warmly of both (1 Corinthians 9:6; Colossians 4:10).',
    view: { bearing: 235, dist: 11, h: 4.5 },
  },
  {
    title: 'Through Syria and Cilicia', ref: 'Acts 15:41', at: 'derbe', part: 0.5,
    quote: {
      nasb: '“And he was traveling through Syria and Cilicia, strengthening the churches.”',
      niv: '“He went through Syria and Cilicia, strengthening the churches.”',
      esv: '“And he went through Syria and Cilicia, strengthening the churches.”',
      kjv: '“And he went through Syria and Cilicia, confirming the churches.”',
    },
    note: 'The road went north over the Amanus Mountains by the Syrian Gates, round the head of the gulf to Tarsus, Paul’s home city (21:39), and up through the Cilician Gates, the pass through the Taurus, to the plateau. The churches here were older than the first journey (15:23; Galatians 1:21).',
    view: { bearing: 200, dist: 40, h: 20 },
  },
  {
    title: { kjv: 'Timotheus', default: 'Timothy' }, ref: 'Acts 16:1', at: 'lystra',
    quote: {
      nasb: '“Now Paul also came to Derbe and to Lystra. And a disciple was there, named Timothy, the son of a Jewish woman who was a believer, but his father was a Greek…”',
      niv: '“Paul came to Derbe and then to Lystra, where a disciple named Timothy lived, whose mother was Jewish and a believer but whose father was a Greek.”',
      esv: '“Paul came also to Derbe and to Lystra. A disciple was there, named Timothy, the son of a Jewish woman who was a believer, but his father was a Greek.”',
      kjv: '“Then came he to Derbe and Lystra: and, behold, a certain disciple was there, named Timotheus, the son of a certain woman, which was a Jewess, and believed; but his father was a Greek…”',
    },
    note: 'Timothy’s mother Eunice and grandmother Lois were believers (2 Timothy 1:5), and the brothers at Lystra and Iconium spoke well of him (16:2). Paul took him along and, since everyone knew his father was a Greek, circumcised him for the sake of the Jews there (16:3). He became Paul’s closest helper (Philippians 2:19–22).',
    view: { bearing: 150, dist: 7, h: 2.6 },
  },
  {
    title: 'The Churches Strengthened', ref: 'Acts 16:5', at: 'antiochP',
    quote: {
      nasb: '“So the churches were being strengthened in the faith, and were increasing in number daily.”',
      niv: '“So the churches were strengthened in the faith and grew daily in numbers.”',
      esv: '“So the churches were strengthened in the faith, and they increased in numbers daily.”',
      kjv: '“And so were the churches established in the faith, and increased in number daily.”',
    },
    note: 'From town to town they delivered the decisions of the apostles and elders in Jerusalem (16:4): Gentile believers need not be circumcised, but should keep away from what had been offered to idols, from blood, from what had been strangled and from sexual immorality (15:28–29).',
    view: { bearing: 210, dist: 9, h: 3.5 },
  },
  {
    title: 'Forbidden to Speak in Asia', ref: 'Acts 16:6', at: 'phrygiaPt', labels: ['phrygia', 'galatia', 'asia'],
    quote: {
      nasb: '“They passed through the Phrygian and Galatian region, after being forbidden by the Holy Spirit to speak the word in Asia…”',
      niv: '“Paul and his companions traveled throughout the region of Phrygia and Galatia, having been kept by the Holy Spirit from preaching the word in the province of Asia.”',
      esv: '“And they went through the region of Phrygia and Galatia, having been forbidden by the Holy Spirit to speak the word in Asia.”',
      kjv: '“Now when they had gone throughout Phrygia and the region of Galatia, and were forbidden of the Holy Ghost to preach the word in Asia…”',
    },
    note: 'Asia here is the Roman province on the Aegean coast, with Ephesus its chief city. Acts doesn’t say how the Holy Spirit stopped them, nor which way they went. The map takes them north through Phrygia towards Bithynia, as the next verse suggests.',
    view: { bearing: 160, dist: 60, h: 30 },
  },
  {
    title: 'Not into Bithynia', ref: 'Acts 16:7', at: 'mysiaPt', labels: ['mysia', 'bithynia'],
    quote: {
      nasb: '“…and after they came to Mysia, they were trying to go into Bithynia, and the Spirit of Jesus did not allow them…”',
      niv: '“When they came to the border of Mysia, they tried to enter Bithynia, but the Spirit of Jesus would not allow them to.”',
      esv: '“And when they had come up to Mysia, they attempted to go into Bithynia, but the Spirit of Jesus did not allow them.”',
      kjv: '“After they were come to Mysia, they assayed to go into Bithynia: but the Spirit suffered them not.”',
    },
    note: 'Bithynia, on the Black Sea, was another province with large cities. Turned back a second time, they went on west through Mysia without preaching there, down to the coast at Troas (16:8): some 400 km of road.',
    view: { bearing: 210, dist: 60, h: 30 },
  },
  {
    title: 'The Man of Macedonia', ref: 'Acts 16:9', at: 'troas',
    quote: {
      nasb: '“And a vision appeared to Paul in the night: a man of Macedonia was standing and pleading with him, and saying, ‘Come over to Macedonia and help us.’”',
      niv: '“During the night Paul had a vision of a man of Macedonia standing and begging him, ‘Come over to Macedonia and help us.’”',
      esv: '“And a vision appeared to Paul in the night: a man of Macedonia was standing there, urging him and saying, ‘Come over to Macedonia and help us.’”',
      kjv: '“And a vision appeared to Paul in the night; There stood a man of Macedonia, and prayed him, saying, Come over into Macedonia, and help us.”',
    },
    note: 'Alexandria Troas was a Roman colony and the port for crossing to Macedonia. From here the story says “we” (16:10): the writer, by tradition Luke, has joined them. They concluded that God had called them to preach the gospel in Macedonia.',
    view: { bearing: 120, dist: 10, h: 4 },
  },
  {
    title: { kjv: 'Samothracia and Neapolis', default: 'Samothrace and Neapolis' }, ref: 'Acts 16:11', caption: 'From Asia into Europe', at: 'neapolis', labels: ['samothrace'],
    quote: {
      nasb: '“So after setting sail from Troas, we ran a straight course to Samothrace, and on the following day to Neapolis…”',
      niv: '“From Troas we put out to sea and sailed straight for Samothrace, and the next day we went on to Neapolis.”',
      esv: '“So, setting sail from Troas, we made a direct voyage to Samothrace, and the following day to Neapolis…”',
      kjv: '“Therefore loosing from Troas, we came with a straight course to Samothracia, and the next day to Neapolis…”',
    },
    note: 'With a following wind the crossing took two days, with a night at the island of Samothrace; the voyage the other way took five (20:6). Neapolis, modern Kavala, was the port of Philippi, on the Via Egnatia, the Roman road across Macedonia.',
    view: { bearing: 150, dist: 12, h: 5 },
  },
  {
    title: 'Lydia', ref: 'Acts 16:14', at: 'philippi',
    quote: {
      nasb: '“A woman named Lydia was listening; she was a seller of purple fabrics from the city of Thyatira, and a worshiper of God. The Lord opened her heart to respond to the things spoken by Paul.”',
      niv: '“One of those listening was a woman from the city of Thyatira named Lydia, a dealer in purple cloth. She was a worshiper of God. The Lord opened her heart to respond to Paul’s message.”',
      esv: '“One who heard us was a woman named Lydia, from the city of Thyatira, a seller of purple goods, who was a worshiper of God. The Lord opened her heart to pay attention to what was said by Paul.”',
      kjv: '“And a certain woman named Lydia, a seller of purple, of the city of Thyatira, which worshipped God, heard us: whose heart the Lord opened, that she attended unto the things which were spoken of Paul.”',
    },
    note: 'Philippi was a Roman colony and a leading city of its district (16:12). On the Sabbath they went outside the gate to the river, where they expected a place of prayer, and spoke to the women gathered there (16:13). Lydia and her household were baptized, and she had them stay at her house (16:15).',
    view: { bearing: 200, dist: 8, h: 3 },
  },
  {
    title: 'The Jailer', ref: 'Acts 16:31', at: 'philippi',
    quote: {
      nasb: '“They said, ‘Believe in the Lord Jesus, and you will be saved, you and your household.’”',
      niv: '“They replied, ‘Believe in the Lord Jesus, and you will be saved—you and your household.’”',
      esv: '“And they said, ‘Believe in the Lord Jesus, and you will be saved, you and your household.’”',
      kjv: '“And they said, Believe on the Lord Jesus Christ, and thou shalt be saved, and thy house.”',
    },
    note: 'When Paul cast a spirit out of a slave girl, her owners had him and Silas beaten with rods and thrown into prison. At midnight they were praying and singing hymns when an earthquake opened the doors (16:16–26). The jailer, about to kill himself, asked what he must do to be saved; he and his household were baptized that night (16:27–34).',
    view: { bearing: 320, dist: 9, h: 3.5 },
  },
  {
    title: 'Thessalonica', ref: 'Acts 17:2', at: 'thessalonica', labels: ['amphipolis', 'apollonia'],
    quote: {
      nasb: '“And according to Paul’s custom, he visited them, and for three Sabbaths reasoned with them from the Scriptures…”',
      niv: '“As was his custom, Paul went into the synagogue, and on three Sabbath days he reasoned with them from the Scriptures…”',
      esv: '“And Paul went in, as was his custom, and on three Sabbath days he reasoned with them from the Scriptures…”',
      kjv: '“And Paul, as his manner was, went in unto them, and three sabbath days reasoned with them out of the scriptures…”',
    },
    note: 'They took the Via Egnatia by Amphipolis and Apollonia, some 140 km, to Thessalonica, the capital of the province (17:1). Paul showed from the Scriptures that the Christ had to suffer and rise from the dead (17:3). Some believed, with many God-fearing Greeks; others stirred up a mob, and the believers sent Paul and Silas away by night (17:4–10).',
    view: { bearing: 200, dist: 11, h: 4.5 },
  },
  {
    title: 'Berea', ref: 'Acts 17:11', at: 'berea',
    quote: {
      nasb: '“Now these people were more noble-minded than those in Thessalonica, for they received the word with great eagerness, examining the Scriptures daily to see whether these things were so.”',
      niv: '“Now the Berean Jews were of more noble character than those in Thessalonica, for they received the message with great eagerness and examined the Scriptures every day to see if what Paul said was true.”',
      esv: '“Now these Jews were more noble than those in Thessalonica; they received the word with all eagerness, examining the Scriptures daily to see if these things were so.”',
      kjv: '“These were more noble than those in Thessalonica, in that they received the word with all readiness of mind, and searched the scriptures daily, whether those things were so.”',
    },
    note: 'Berea lay some 70 km west, away from the main road. Many there believed, including Greek women of standing, and men (17:12). But Jews came from Thessalonica and stirred up the crowds, and the believers sent Paul off to the sea, while Silas and Timothy stayed behind (17:13–14).',
    view: { bearing: 160, dist: 9, h: 3.5 },
  },
  {
    title: 'Athens', ref: 'Acts 17:16', at: 'athens',
    quote: {
      nasb: '“Now while Paul was waiting for them in Athens, his spirit was being provoked within him as he observed that the city was full of idols.”',
      niv: '“While Paul was waiting for them in Athens, he was greatly distressed to see that the city was full of idols.”',
      esv: '“Now while Paul was waiting for them at Athens, his spirit was provoked within him as he saw that the city was full of idols.”',
      kjv: '“Now while Paul waited for them at Athens, his spirit was stirred in him, when he saw the city wholly given to idolatry.”',
    },
    note: 'Those who took Paul brought him to Athens (17:15), by sea, it is usually thought; the route sails round Euboea to Piraeus, the port of Athens. Athens was no longer powerful, but it was still the city of the philosophers and of famous temples. Paul reasoned in the synagogue, and every day in the marketplace with whoever was there (17:17).',
    view: { bearing: 225, dist: 11, h: 4.5 },
  },
  {
    title: 'To an Unknown God', ref: 'Acts 17:23', at: 'athens', labels: ['areopagus'],
    quote: {
      nasb: '“For while I was passing through and examining the objects of your worship, I also found an altar with this inscription, ‘TO AN UNKNOWN GOD.’ Therefore, what you worship in ignorance, this I proclaim to you.”',
      niv: '“For as I walked around and looked carefully at your objects of worship, I even found an altar with this inscription: TO AN UNKNOWN GOD. So you are ignorant of the very thing you worship—and this is what I am going to proclaim to you.”',
      esv: '“For as I passed along and observed the objects of your worship, I found also an altar with this inscription: ‘To the unknown god.’ What therefore you worship as unknown, this I proclaim to you.”',
      kjv: '“For as I passed by, and beheld your devotions, I found an altar with this inscription, TO THE UNKNOWN GOD. Whom therefore ye ignorantly worship, him declare I unto you.”',
    },
    note: 'Epicurean and Stoic philosophers brought him to the Areopagus, the council that met on the hill of Ares below the Acropolis, to hear his new teaching (17:18–22). He spoke of the God who made the world and does not live in temples made by hands, and of the man he has raised from the dead (17:24–31). A few believed, among them Dionysius, a member of the council, and a woman named Damaris (17:34).',
    view: { bearing: 300, dist: 5, h: 2 },
  },
  {
    title: 'Corinth', ref: 'Acts 18:9–10', at: 'corinth',
    quote: {
      nasb: '“And the Lord said to Paul by a vision at night, ‘Do not be afraid any longer, but go on speaking and do not be silent; for I am with you, and no one will attack you to harm you, for I have many people in this city.’”',
      niv: '“One night the Lord spoke to Paul in a vision: ‘Do not be afraid; keep on speaking, do not be silent. For I am with you, and no one is going to attack and harm you, because I have many people in this city.’”',
      esv: '“And the Lord said to Paul one night in a vision, ‘Do not be afraid, but go on speaking and do not be silent, for I am with you, and no one will attack you to harm you, for I have many in this city who are my people.’”',
      kjv: '“Then spake the Lord to Paul in the night by a vision, Be not afraid, but speak, and hold not thy peace: For I am with thee, and no man shall set on thee to hurt thee: for I have much people in this city.”',
    },
    note: 'Corinth, the capital of Achaia, was a busy Roman city on the isthmus between two seas. Paul stayed with Aquila and Priscilla, Jews expelled from Rome, and worked with them as a tentmaker (18:1–3); he came, he later wrote, in weakness and fear (1 Corinthians 2:3). He stayed a year and a half (18:11). An inscription dates Gallio’s time as proconsul (18:12) to about AD 51–52, one of the surest dates in Paul’s life.',
    view: { bearing: 200, dist: 11, h: 4.5 },
  },
  {
    title: { niv: 'Cenchreae', esv: 'Cenchreae', default: 'Cenchrea' }, ref: 'Acts 18:18', at: 'cenchrea',
    quote: {
      nasb: '“Now Paul, when he had remained many days longer, took leave of the brothers and sisters and sailed away to Syria, and Priscilla and Aquila were with him. Paul first had his hair cut at Cenchrea, for he was keeping a vow.”',
      niv: '“Paul stayed on in Corinth for some time. Then he left the brothers and sisters and sailed for Syria, accompanied by Priscilla and Aquila. Before he sailed, he had his hair cut off at Cenchreae because of a vow he had taken.”',
      esv: '“After this, Paul stayed many days longer and then took leave of the brothers and set sail for Syria, and with him Priscilla and Aquila. At Cenchreae he had cut his hair, for he was under a vow.”',
      kjv: '“And Paul after this tarried there yet a good while, and then took his leave of the brethren, and sailed thence into Syria, and with him Priscilla and Aquila; having shorn his head in Cenchrea: for he had a vow.”',
    },
    note: 'Corinth’s eastern port lay on the Saronic Gulf, facing Asia. Acts doesn’t say what Paul’s vow was; cutting the hair marked its end, or its beginning. There was a church here later, with Phoebe as one who served it (Romans 16:1).',
    view: { bearing: 150, dist: 8, h: 3 },
  },
  {
    title: 'Ephesus', ref: 'Acts 18:21', at: 'ephesus',
    quote: {
      nasb: '“…but took leave of them and said, ‘I will return to you again if God wills,’ and he set sail from Ephesus.”',
      niv: '“But as he left, he promised, ‘I will come back if it is God’s will.’ Then he set sail from Ephesus.”',
      esv: '“But on taking leave of them he said, ‘I will return to you if God wills,’ and he set sail from Ephesus.”',
      kjv: '“But bade them farewell, saying, I must by all means keep this feast that cometh in Jerusalem: but I will return again unto you, if God will. And he sailed from Ephesus.”',
    },
    note: 'On the way home the ship put in at Ephesus, the chief city of Asia, where they had earlier been kept from preaching. Paul spoke in the synagogue, and they asked him to stay longer, but he would not (18:19–20). He left Priscilla and Aquila there, and came back on his third journey (18:26; 19:1). The coast has silted up since; the harbour was then beside the city.',
    view: { bearing: 240, dist: 11, h: 4.5 },
  },
  {
    title: 'Home to Antioch', ref: 'Acts 18:22', at: 'antioch',
    quote: {
      nasb: '“When he had landed in Caesarea, he went up to Jerusalem and greeted the church, and went down to Antioch.”',
      niv: '“When he landed at Caesarea, he went up to Jerusalem and greeted the church and then went down to Antioch.”',
      esv: '“When he had landed at Caesarea, he went up and greeted the church, and then went down to Antioch.”',
      kjv: '“And when he had landed at Caesarea, and gone up, and saluted the church, he went down to Antioch.”',
    },
    note: 'Caesarea, Herod’s harbour city, was the port for Jerusalem. “Went up” is usually taken to mean up to Jerusalem, as some versions say outright. Acts doesn’t say how Paul went on to Antioch; the route follows the coast road north, through Ptolemais, Tyre and Sidon.',
    view: { bearing: 250, dist: 13, h: 5.5 },
  },
];
