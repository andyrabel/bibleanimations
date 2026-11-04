// Content for "Paul's First Missionary Journey" (Acts 13–14).
//
// The map is real: places are given by latitude and longitude, and main.js
// projects them onto the terrain (terrain.js) in kilometres. The route between
// them is worked out by tools/route.py and kept in route.js; each leg ends at
// one of the PLACES below (or at a harbour on the way).
//
// The tour follows Acts 13:1–14:28 in order, with what Paul's letters add:
// from Antioch in Syria down to Seleucia, by sea to Cyprus, across the island
// to Paphos, by sea to Perga, over the Taurus to Pisidian Antioch, Iconium,
// Lystra and Derbe, back the same way, and by sea from Attalia home to Antioch.
// No people are shown; on the sea legs a ship carries the route.

// Text fields below are English. Any of them may be a plain string (the same in
// every English version) or an object keyed by version id (see VERSIONS in ../i18n.js),
// with an optional `default` used by versions not listed. Other languages are in
// lang/<lang>.js.

// Words that differ between versions. Any text field may contain {term}
// (or {Term} for a capital first letter) and gets the current version's word.
export const TERMS = {
  zeus: { kjv: 'Jupiter', default: 'Zeus' },
  hermes: { kjv: 'Mercurius', default: 'Hermes' },
  proconsul: { kjv: 'deputy', default: 'proconsul' },
};

// Towns on the route. lat / lon in degrees (tools/route.py reads them too);
// size: the drawn town's radius in km; walls: drawn with a wall.
export const PLACES = {
  antioch: { name: 'Antioch', lat: 36.202, lon: 36.160, size: 1.9, walls: true },
  seleucia: { name: 'Seleucia', lat: 36.123, lon: 35.922, size: 0.9, walls: true, port: true },
  salamis: { name: 'Salamis', lat: 35.185, lon: 33.900, size: 1.2, port: true },
  paphos: { name: 'Paphos', lat: 34.756, lon: 32.408, size: 1.0, walls: true, port: true },
  perga: { name: 'Perga', lat: 36.961, lon: 30.854, size: 0.9, walls: true },
  antiochP: {
    name: { nasb: 'Pisidian Antioch', niv: 'Pisidian Antioch', default: 'Antioch in Pisidia' },
    lat: 38.306, lon: 31.189, size: 0.8, walls: true,
  },
  iconium: { name: 'Iconium', lat: 37.872, lon: 32.492, size: 1.0, walls: true },
  lystra: { name: 'Lystra', lat: 37.578, lon: 32.453, size: 0.6, walls: true },
  derbe: { name: 'Derbe', lat: 37.350, lon: 33.370, size: 0.5 },
  attalia: { name: 'Attalia', lat: 36.885, lon: 30.704, size: 0.8, walls: true, port: true },
};

// Other labels. kind: 'town' (a place off the route, drawn small), 'region',
// 'sea', 'mount', 'item' (shown only at the stops that name it in `labels`).
// lift: km above the ground.
export const FEATURES = {
  tarsus: { name: 'Tarsus', lat: 36.918, lon: 34.893, kind: 'town', size: 0.9 },
  zeus: { name: 'Temple of {Zeus}', lat: 37.572, lon: 32.462, kind: 'item', lift: 0.25 },
  syria: { name: 'Syria', lat: 35.7, lon: 36.55, kind: 'region', lift: 6 },
  cilicia: { name: 'Cilicia', lat: 37.15, lon: 35.2, kind: 'region', lift: 6 },
  cyprus: { name: 'Cyprus', lat: 35.05, lon: 33.2, kind: 'region', lift: 8 },
  pamphylia: { name: 'Pamphylia', lat: 37.0, lon: 31.25, kind: 'region', lift: 6 },
  pisidia: { name: 'Pisidia', lat: 37.75, lon: 30.75, kind: 'region', lift: 6 },
  lycaonia: { name: 'Lycaonia', lat: 37.55, lon: 33.0, kind: 'region', lift: 6 },
  galatia: { name: 'Galatia', lat: 38.85, lon: 32.6, kind: 'region', lift: 6 },
  taurus: { name: 'Taurus Mountains', lat: 37.0, lon: 32.6, kind: 'mount', lift: 8 },
  sea: { name: 'Mediterranean Sea', lat: 35.75, lon: 31.4, kind: 'sea', lift: 0 },
};

export const INTRO = {
  title: 'Set Apart for the Work',
  ref: 'Acts 13:2',
  quote: {
    nasb: '“While they were serving the Lord and fasting, the Holy Spirit said, ‘Set Barnabas and Saul apart for Me for the work to which I have called them.’”',
    niv: '“While they were worshiping the Lord and fasting, the Holy Spirit said, ‘Set apart for me Barnabas and Saul for the work to which I have called them.’”',
    esv: '“While they were worshiping the Lord and fasting, the Holy Spirit said, ‘Set apart for me Barnabas and Saul for the work to which I have called them.’”',
    kjv: '“As they ministered to the Lord, and fasted, the Holy Ghost said, Separate me Barnabas and Saul for the work whereunto I have called them.”',
  },
  note: 'The church at Antioch in Syria, where the disciples were first called Christians (11:26), had prophets and teachers: Barnabas, Simeon called Niger, Lucius of Cyrene, Manaen and Saul (13:1). Two of them were sent out, probably in the late 40s AD, on a journey of some 2,000 km by sea and on foot: across Cyprus, over the Taurus Mountains into the uplands of Asia Minor, and back. Acts 13–14 tells it; Paul’s letters add a little.',
  aside: 'The land is real, from modern elevation data, with the heights raised three times so the mountains show; the coastline is today’s. Acts doesn’t record the roads, so the land routes take the easiest way over the ground through the places named, and the sea routes are a guess. Towns and the ship are drawn much larger than life. No people are shown.',
};

export const FINALE = {
  title: 'A Door of Faith',
  ref: 'Acts 14:27',
  quote: {
    nasb: '“When they had arrived and gathered the church together, they began to report all the things that God had done with them and how He had opened a door of faith to the Gentiles.”',
    niv: '“On arriving there, they gathered the church together and reported all that God had done through them and how he had opened a door of faith to the Gentiles.”',
    esv: '“And when they arrived and gathered the church together, they declared all that God had done with them, and how he had opened a door of faith to the Gentiles.”',
    kjv: '“And when they were come, and had gathered the church together, they rehearsed all that God had done with them, and how he had opened the door of faith unto the Gentiles.”',
  },
  note: 'They stayed a long time with the disciples in Antioch (14:28). The question this journey raised, whether Gentile believers had to be circumcised and keep the law of Moses, soon took Paul and Barnabas to Jerusalem, where the apostles and elders agreed that God had cleansed the Gentiles’ hearts by faith, as he had the Jews’ (15:1–11). Later Paul set out again, to visit the believers in every city where they had preached (15:36).',
};

// Tour stops, in the order of Acts 13–14.
// at: the place the route reaches (the next time it gets there); part: stop
// that far along the way to it instead (0..1).
// view: where the camera is, from what it looks at: bearing (degrees from
// north, clockwise), dist (km away) and h (km above it). look: a place or
// FEATURES key to look at instead of the route.
// labels: FEATURES keys to show.
export const STOPS = [
  {
    title: 'Sent Off from Antioch', ref: 'Acts 13:3', at: 'antioch',
    quote: {
      nasb: '“Then, when they had fasted, prayed, and laid their hands on them, they sent them away.”',
      niv: '“So after they had fasted and prayed, they placed their hands on them and sent them off.”',
      esv: '“Then after fasting and praying they laid their hands on them and sent them off.”',
      kjv: '“And when they had fasted and prayed, and laid their hands on them, they sent them away.”',
    },
    note: 'Antioch on the Orontes was the capital of the Roman province of Syria and one of the great cities of the empire. Barnabas had brought Saul here from Tarsus (11:25–26), and they had just come back from taking famine relief to Jerusalem, bringing John Mark with them (12:25). Now the church lays its hands on them and sends them out.',
    view: { bearing: 235, dist: 11, h: 4.5 },
  },
  {
    title: 'Down to Seleucia', ref: 'Acts 13:4', at: 'seleucia',
    quote: {
      nasb: '“So, being sent out by the Holy Spirit, they went down to Seleucia and from there they sailed to Cyprus.”',
      niv: '“The two of them, sent on their way by the Holy Spirit, went down to Seleucia and sailed from there to Cyprus.”',
      esv: '“So, being sent out by the Holy Spirit, they went down to Seleucia, and from there they sailed to Cyprus.”',
      kjv: '“So they, being sent forth by the Holy Ghost, departed unto Seleucia; and from thence they sailed to Cyprus.”',
    },
    note: 'Seleucia Pieria was Antioch’s port, by the sea near the mouth of the Orontes. Barnabas was a Levite from Cyprus (4:36), so the island was a natural place to begin. Acts doesn’t describe their ship; travellers took passage on merchant ships, and the one drawn here is a small Roman merchantman of the time.',
    view: { bearing: 160, dist: 9, h: 3 },
  },
  {
    title: 'Salamis', ref: 'Acts 13:5', at: 'salamis',
    quote: {
      nasb: '“When they reached Salamis, they began to proclaim the word of God in the synagogues of the Jews; and they also had John as their helper.”',
      niv: '“When they arrived at Salamis, they proclaimed the word of God in the Jewish synagogues. John was with them as their helper.”',
      esv: '“When they arrived at Salamis, they proclaimed the word of God in the synagogues of the Jews. And they had John to assist them.”',
      kjv: '“And when they were at Salamis, they preached the word of God in the synagogues of the Jews: and they had also John to their minister.”',
    },
    note: 'Salamis, on the east coast about 200 km from Seleucia, was the island’s largest city, with Jews enough for more than one synagogue. This is how Paul would work from now on: to the synagogue first (13:14; 14:1). John is John Mark, Barnabas’s cousin (Colossians 4:10), whose mother’s house in Jerusalem was a meeting place of the church (12:12).',
    view: { bearing: 120, dist: 10, h: 3.5 },
  },
  {
    title: 'Through the Whole Island', ref: 'Acts 13:6', at: 'paphos', part: 0.45, look: ['salamis', 'paphos'],
    quote: {
      nasb: '“When they had gone through the whole island as far as Paphos, they found a magician, a Jewish false prophet whose name was Bar-Jesus…”',
      niv: '“They traveled through the whole island until they came to Paphos. There they met a Jewish sorcerer and false prophet named Bar-Jesus…”',
      esv: '“When they had gone through the whole island as far as Paphos, they came upon a certain magician, a Jewish false prophet named Bar-Jesus.”',
      kjv: '“And when they had gone through the isle unto Paphos, they found a certain sorcerer, a false prophet, a Jew, whose name was Barjesus…”',
    },
    note: 'From Salamis to Paphos is about 160 km. Acts doesn’t give the road; the coast road by Kition, Amathus and Kourion is the usual guess, and the route follows it, below the Troodos Mountains. Cyprus was a senatorial province, governed by a {proconsul}, and Luke gives him the right title (13:7).',
    view: { bearing: 175, dist: 95, h: 60 },
  },
  {
    title: 'The {Proconsul} Believes', ref: 'Acts 13:12', at: 'paphos',
    quote: {
      nasb: '“Then the proconsul believed when he saw what had happened, being amazed at the teaching of the Lord.”',
      niv: '“When the proconsul saw what had happened, he believed, for he was amazed at the teaching about the Lord.”',
      esv: '“Then the proconsul believed, when he saw what had occurred, for he was astonished at the teaching of the Lord.”',
      kjv: '“Then the deputy, when he saw what was done, believed, being astonished at the doctrine of the Lord.”',
    },
    note: 'Paphos (New Paphos) was the capital, where the {proconsul} Sergius Paulus lived. He sent for Barnabas and Saul to hear the word of God, but the magician Elymas, who was with him, tried to turn him away from the faith. Saul, also called Paul, told him he would be blind for a time, and he was (13:7–11). From here on Luke calls him Paul, and names him first.',
    view: { bearing: 215, dist: 8, h: 3 },
  },
  {
    title: 'Perga in Pamphylia', ref: 'Acts 13:13', at: 'perga',
    quote: {
      nasb: '“Now Paul and his companions put out to sea from Paphos and came to Perga in Pamphylia; but John left them and returned to Jerusalem.”',
      niv: '“From Paphos, Paul and his companions sailed to Perga in Pamphylia, where John left them to return to Jerusalem.”',
      esv: '“Now Paul and his companions set sail from Paphos and came to Perga in Pamphylia. And John left them and returned to Jerusalem…”',
      kjv: '“Now when Paul and his company loosed from Paphos, they came to Perga in Pamphylia: and John departing from them returned to Jerusalem.”',
    },
    note: 'The voyage from Paphos to the coast of Pamphylia is some 250 km. Perga lay about 12 km inland on the river Cestrus, which ships could sail up; the route lands at its mouth. Here John Mark went home. Acts doesn’t say why, but Paul held it against him, and later he and Barnabas parted over it (15:37–39). Years afterwards Paul asked for Mark again, as useful to him (2 Timothy 4:11).',
    view: { bearing: 200, dist: 10, h: 4 },
  },
  {
    title: 'Over the Taurus', ref: '2 Corinthians 11:26', at: 'antiochP', part: 0.4,
    quote: {
      nasb: '“I have been on frequent journeys, in dangers from rivers, dangers from robbers, dangers from my countrymen, dangers from the Gentiles, dangers in the city, dangers in the wilderness, dangers at sea…”',
      niv: '“I have been constantly on the move. I have been in danger from rivers, in danger from bandits, in danger from my fellow Jews, in danger from Gentiles; in danger in the city, in danger in the country, in danger at sea…”',
      esv: '“…on frequent journeys, in danger from rivers, danger from robbers, danger from my own people, danger from Gentiles, danger in the city, danger in the wilderness, danger at sea…”',
      kjv: '“In journeyings often, in perils of waters, in perils of robbers, in perils by mine own countrymen, in perils by the heathen, in perils in the city, in perils in the wilderness, in perils in the sea…”',
    },
    note: 'From Perga to Pisidian Antioch is some 160 km, up through the gorges of the Taurus to a plateau over 1,000 m high. Acts says nothing of the road (13:14). Paul wrote this list years later about all his travels, but rivers in flood and robbers were known dangers in these mountains, and many have thought of this road. Some link the climb with the illness he mentions in Galatians 4:13.',
    view: { bearing: 135, dist: 26, h: 12 },
  },
  {
    title: { nasb: 'Pisidian Antioch', niv: 'Pisidian Antioch', default: 'Antioch in Pisidia' }, ref: 'Acts 13:14', at: 'antiochP',
    quote: {
      nasb: '“But going on from Perga, they arrived at Pisidian Antioch, and on the Sabbath day they went into the synagogue and sat down.”',
      niv: '“From Perga they went on to Pisidian Antioch. On the Sabbath they entered the synagogue and sat down.”',
      esv: '“…but they went on from Perga and came to Antioch in Pisidia. And on the Sabbath day they went into the synagogue and sat down.”',
      kjv: '“But when they departed from Perga, they came to Antioch in Pisidia, and went into the synagogue on the sabbath day, and sat down.”',
    },
    note: 'This Antioch, near Pisidia on a hill some 1,100 m up, was a Roman colony, settled with veterans of the legions under Augustus. After the reading of the Law and the Prophets the synagogue officials asked the visitors for a word of encouragement (13:15), and Paul stood up and preached: from the exodus and David to Jesus, raised from the dead, through whom forgiveness of sins is proclaimed (13:16–41).',
    view: { bearing: 210, dist: 9, h: 3.5 },
  },
  {
    title: 'A Light for the Gentiles', ref: 'Acts 13:47', at: 'antiochP',
    quote: {
      nasb: '“For so the Lord has commanded us, ‘I have appointed You as a light to the Gentiles, That You may bring salvation to the end of the earth.’”',
      niv: '“For this is what the Lord has commanded us: ‘I have made you a light for the Gentiles, that you may bring salvation to the ends of the earth.’”',
      esv: '“For so the Lord has commanded us, saying, ‘I have made you a light for the Gentiles, that you may bring salvation to the ends of the earth.’”',
      kjv: '“For so hath the Lord commanded us, saying, I have set thee to be a light of the Gentiles, that thou shouldest be for salvation unto the ends of the earth.”',
    },
    note: 'The next Sabbath nearly the whole city came to hear. When some of the Jews opposed them, Paul and Barnabas turned to the Gentiles, with these words from Isaiah 49:6. The Gentiles rejoiced, and the word of the Lord spread through the whole region (13:44–49). Then the city’s leading men and women were stirred up against them, and they were driven out, and shook the dust off their feet, and went on to Iconium (13:50–51).',
    view: { bearing: 240, dist: 34, h: 16 },
  },
  {
    title: 'Iconium', ref: 'Acts 14:1', at: 'iconium',
    quote: {
      nasb: '“In Iconium they entered the synagogue of the Jews together, and spoke in such a way that a large number of people believed, both of Jews and of Greeks.”',
      niv: '“At Iconium Paul and Barnabas went as usual into the Jewish synagogue. There they spoke so effectively that a great number of Jews and Greeks believed.”',
      esv: '“Now at Iconium they entered together into the Jewish synagogue and spoke in such a way that a great number of both Jews and Greeks believed.”',
      kjv: '“And it came to pass in Iconium, that they went both together into the synagogue of the Jews, and so spake, that a great multitude both of the Jews and also of the Greeks believed.”',
    },
    note: 'Iconium, modern Konya, lay some 140 km to the east, at the edge of the great plain of Lycaonia. They stayed a long time, speaking boldly, and the Lord confirmed the word with signs and wonders (14:3). But the city was divided, and when they learned of a plot to stone them, they fled to Lystra and Derbe, cities of Lycaonia, and the country round about (14:4–7).',
    view: { bearing: 250, dist: 10, h: 4 },
  },
  {
    title: 'The Gods Have Come Down', ref: 'Acts 14:11', at: 'lystra', labels: ['zeus'],
    quote: {
      nasb: '“When the crowds saw what Paul had done, they raised their voice, saying in the Lycaonian language, ‘The gods have become like men and have come down to us!’”',
      niv: '“When the crowd saw what Paul had done, they shouted in the Lycaonian language, ‘The gods have come down to us in human form!’”',
      esv: '“And when the crowds saw what Paul had done, they lifted up their voices, saying in Lycaonian, ‘The gods have come down to us in the likeness of men!’”',
      kjv: '“And when the people saw what Paul had done, they lifted up their voices, saying in the speech of Lycaonia, The gods are come down to us in the likeness of men.”',
    },
    note: 'Lystra, a small Roman colony, lay about 30 km south of Iconium. Paul healed a man lame from birth, and the crowd took Barnabas for {zeus} and Paul for {hermes}, because he did the speaking (14:8–12). The priest of {zeus}, whose temple was outside the city, brought oxen and garlands to the gates to sacrifice to them, and the two tore their clothes and could hardly stop them (14:13–18). Where the temple stood isn’t known; it is drawn by the road.',
    view: { bearing: 150, dist: 6, h: 2.2 },
  },
  {
    title: 'Stoned at Lystra', ref: 'Acts 14:19', at: 'lystra',
    quote: {
      nasb: '“But Jews came from Antioch and Iconium, and having won over the crowds, they stoned Paul and dragged him out of the city, thinking that he was dead.”',
      niv: '“Then some Jews came from Antioch and Iconium and won the crowd over. They stoned Paul and dragged him outside the city, thinking he was dead.”',
      esv: '“But Jews came from Antioch and Iconium, and having persuaded the crowds, they stoned Paul and dragged him out of the city, supposing that he was dead.”',
      kjv: '“And there came thither certain Jews from Antioch and Iconium, who persuaded the people, and having stoned Paul, drew him out of the city, supposing he had been dead.”',
    },
    note: 'But when the disciples gathered round him, he got up and went back into the city, and the next day he left with Barnabas for Derbe (14:20). Years later Paul counted it among his sufferings: once he was stoned (2 Corinthians 11:25). He reminded Timothy of what happened to him at Antioch, Iconium and Lystra, and how the Lord rescued him from it all (2 Timothy 3:11). Timothy came from Lystra (16:1).',
    view: { bearing: 290, dist: 8, h: 3 },
  },
  {
    title: 'Derbe', ref: 'Acts 14:21', at: 'derbe',
    quote: {
      nasb: '“And after they had preached the gospel to that city and had made a good number of disciples, they returned to Lystra, to Iconium, and to Antioch…”',
      niv: '“They preached the gospel in that city and won a large number of disciples. Then they returned to Lystra, Iconium and Antioch…”',
      esv: '“When they had preached the gospel to that city and had made many disciples, they returned to Lystra and to Iconium and to Antioch…”',
      kjv: '“And when they had preached the gospel to that city, and had taught many, they returned again to Lystra, and to Iconium, and Antioch…”',
    },
    note: 'Derbe, some 90 km east of Lystra, was the furthest point of the journey. Its site is known only from inscriptions naming the city found north-east of Karaman, and is still debated; it is drawn there. From Derbe the road on through the Cilician Gates to Tarsus and home was shorter, but they turned back, to the cities they had been driven out of.',
    view: { bearing: 190, dist: 9, h: 3.5 },
  },
  {
    title: 'Strengthening the Disciples', ref: 'Acts 14:22', at: 'iconium',
    quote: {
      nasb: '“…strengthening the souls of the disciples, encouraging them to continue in the faith, and saying, ‘It is through many tribulations that we must enter the kingdom of God.’”',
      niv: '“…strengthening the disciples and encouraging them to remain true to the faith. ‘We must go through many hardships to enter the kingdom of God,’ they said.”',
      esv: '“…strengthening the souls of the disciples, encouraging them to continue in the faith, and saying that through many tribulations we must enter the kingdom of God.”',
      kjv: '“Confirming the souls of the disciples, and exhorting them to continue in the faith, and that we must through much tribulation enter into the kingdom of God.”',
    },
    note: 'They went back the way they had come, through Lystra and Iconium, the towns where Paul had been stoned and they had both been threatened, to strengthen the new believers there. What they told them was not that following Jesus would be easy.',
    view: { bearing: 160, dist: 30, h: 13 },
  },
  {
    title: 'Elders in Every Church', ref: 'Acts 14:23', at: 'antiochP',
    quote: {
      nasb: '“When they had appointed elders for them in every church, having prayed with fasting, they entrusted them to the Lord in whom they had believed.”',
      niv: '“Paul and Barnabas appointed elders for them in each church and, with prayer and fasting, committed them to the Lord, in whom they had put their trust.”',
      esv: '“And when they had appointed elders for them in every church, with prayer and fasting they committed them to the Lord in whom they had believed.”',
      kjv: '“And when they had ordained them elders in every church, and had prayed with fasting, they commended them to the Lord, on whom they believed.”',
    },
    note: 'In each city they left the believers with leaders of their own, and they did it as the church at Antioch had sent them out, with prayer and fasting (13:3). Then they left them in the Lord’s keeping. Back at Antioch near Pisidia, they had come full circle through the four cities.',
    view: { bearing: 145, dist: 9, h: 3.5 },
  },
  {
    title: 'The Churches of Galatia', ref: 'Galatians 4:13', at: 'antiochP', look: 'iconium',
    quote: {
      nasb: '“…but you know that it was because of a bodily illness that I preached the gospel to you the first time…”',
      niv: '“As you know, it was because of an illness that I first preached the gospel to you…”',
      esv: '“You know it was because of a bodily ailment that I preached the gospel to you at first…”',
      kjv: '“Ye know how through infirmity of the flesh I preached the gospel unto you at the first.”',
    },
    note: 'All four cities lay in the Roman province of Galatia. Many think that Paul’s letter “to the churches of Galatia” (Galatians 1:2) was written to them, and that he is remembering this first visit, when they welcomed him though he was ill. Others think the letter went to the Galatian peoples further north, whom he visited later (16:6). Either way, the illness isn’t named.',
    view: { bearing: 165, dist: 150, h: 95 },
  },
  {
    title: 'Perga and Attalia', ref: 'Acts 14:25', at: 'attalia', labels: ['perga'],
    quote: {
      nasb: '“When they had spoken the word in Perga, they went down to Attalia.”',
      niv: '“…and when they had preached the word in Perga, they went down to Attalia.”',
      esv: '“And when they had spoken the word in Perga, they went down to Attalia…”',
      kjv: '“And when they had preached the word in Perga, they went down into Attalia…”',
    },
    note: 'They passed through Pisidia and came down through the mountains into Pamphylia (14:24). This time they preached in Perga, where Acts records no preaching on the way out, and went down to Attalia, the harbour on the coast, modern Antalya.',
    view: { bearing: 200, dist: 16, h: 6 },
  },
  {
    title: 'Home to Antioch', ref: 'Acts 14:26', at: 'antioch',
    quote: {
      nasb: '“From there they sailed to Antioch, where they had been entrusted to the grace of God for the work that they had accomplished.”',
      niv: '“From Attalia they sailed back to Antioch, where they had been committed to the grace of God for the work they had now completed.”',
      esv: '“…and from there they sailed to Antioch, where they had been commended to the grace of God for the work that they had fulfilled.”',
      kjv: '“And thence sailed to Antioch, from whence they had been recommended to the grace of God for the work which they fulfilled.”',
    },
    note: 'From Attalia it is some 500 km by sea to Seleucia, past the coast of Cilicia and the north of Cyprus, then up the Orontes to Antioch. They had been away perhaps a year or two; Acts gives no dates. The work they had been set apart for (13:2) was done.',
    view: { bearing: 250, dist: 13, h: 5.5 },
  },
];
