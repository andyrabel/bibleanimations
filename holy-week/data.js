// Content for "Holy Week in Jerusalem".
// Plan coordinates: x = metres east, n = metres north, with the origin at the
// sanctuary of the temple. Heights are metres above 600 m (the temple court is
// at about 740 m above sea level).
//
// The tour follows the week in Mark's order, from the Sunday the colt was
// fetched at Bethphage to the empty tomb a week later, with the other Gospels
// where they add to it.

// Text fields below are English. Any of them may be a plain string (the same in
// every English version) or an object keyed by version id (see VERSIONS in ../i18n.js),
// with an optional `default` used by versions not listed. Other languages are in
// lang/<lang>.js.

// The temple platform, as Herod rebuilt it: its corners (south-west,
// south-east, north-east, north-west) and the height of its court.
export const PLATFORM = { pts: [[-128, -300], [152, -300], [168, 190], [-150, 186]], y: 140 };

// The city walls, as Josephus describes them (War 5.4.2). The first wall runs
// from the tower Hippicus by Herod's palace east to the temple, and from
// Hippicus south round Mount Zion and the Pool of Siloam to the temple's
// south-east corner. The second wall starts at the Gennath Gate in the first
// and runs north and east to the Antonia. Agrippa's third wall was begun in
// the 40s, after these events, so it isn't shown.
export const WALLS = {
  first: [[-134, -40], [-260, -44], [-400, -46], [-560, -48], [-700, -55], [-722, -130], [-728, -330], [-716, -560], [-690, -760],
    [-620, -880], [-480, -960], [-300, -1000], [-160, -965], [-80, -936], [0, -892], [48, -800], [78, -600], [100, -440], [152, -300]],
  second: [[-520, -47], [-514, 20], [-505, 110], [-452, 210], [-330, 252], [-230, 244], [-150, 228]],
};
// Gates on the walls that the tour passes through: { wall, x, n }.
export const GATES = {
  gennath: { wall: 'first', x: -520, n: -47 },
  fountain: { wall: 'first', x: -40, n: -914 },
  east: { wall: 'platform', x: 160, n: 0 },
};

// Places, for labels and for building.
export const SITES = {
  temple: { x: 0, n: 0 },
  antonia: { x: -90, n: 212 },
  royalStoa: { x: 12, n: -284 },
  courtWomen: { x: 94, n: 0 },
  herodsPalace: { x: -662, n: -195 },
  pavement: { x: -575, n: -195 },
  hasmonean: { x: -250, n: -75 },
  golgotha: { x: -575, n: 52 },
  tomb: { x: -608, n: 14 },
  upperRoom: { x: -600, n: -700 },
  caiaphas: { x: -390, n: -720 },
  siloam: { x: -80, n: -845 },
  bethesda: { x: 40, n: 300 },
  gethsemane: { x: 358, n: 115 },
  flevit: { x: 640, n: 40 },
  olives: { x: 900, n: 100 },
  bethphage: { x: 1500, n: 260 },
  bethany: { x: 2300, n: -620 },
  simon: { x: 2290, n: -600 },
  figTree: { x: 1700, n: 40 },
};

// Words that differ between versions. Any text field may contain {term}
// (or {Term} for a capital first letter) and gets the current version's word.
export const TERMS = {
  temple: { niv: 'temple courts', default: 'temple' },
  council: { niv: 'Sanhedrin', default: 'Council' },
};

// The days of the week, for the popup and the progress bar (STOPS[].day).
export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'The Sabbath', 'The first day of the week'];

// Labels. `actor` follows a person made in main.js, `lift` metres above them
// (or above the ground at x, n). `from` and `until` are groups (STOPS[].build):
// the label shows only between them. Kinds: person, animal, item (a place), region, mount.
// Places show at their own stops, at stops with `context`, and (when `big`) in the overview.
export const LABELS = {
  olives: { name: 'Mount of Olives', kind: 'mount', x: 900, n: 100, lift: 25 },
  kidron: { name: 'Kidron Valley', kind: 'mount', x: 290, n: -150, lift: 12 },
  upperCity: { name: 'Upper City', kind: 'region', x: -480, n: -420, lift: 40 },
  lowerCity: { name: 'Lower City', kind: 'region', x: -60, n: -620, lift: 40 },
  bethphage: { name: 'Bethphage', kind: 'item', big: true, x: 1500, n: 262, lift: 14 },
  bethany: { name: 'Bethany', kind: 'item', big: true, x: 2300, n: -620, lift: 16 },
  temple: { name: 'The Temple', kind: 'item', big: true, x: 0, n: 0, lift: 66 },
  royalStoa: { name: 'Royal Stoa', kind: 'item', x: 12, n: -284, lift: 34 },
  courtWomen: { name: 'Court of the Women', kind: 'item', x: 94, n: 0, lift: 26 },
  portico: { name: 'Solomon’s Portico', kind: 'item', x: 152, n: -130, lift: 18 },
  antonia: { name: 'Antonia Fortress', kind: 'item', big: true, x: -90, n: 212, lift: 50 },
  herodsPalace: { name: 'Herod’s Palace', kind: 'item', big: true, x: -662, n: -195, lift: 36 },
  pavement: { name: 'The Pavement', kind: 'item', x: -575, n: -195, lift: 9 },
  golgotha: { name: 'Golgotha', kind: 'item', big: true, x: -575, n: 52, lift: 18 },
  tomb: { name: 'The Tomb', kind: 'item', x: -606, n: 14, lift: 8 },
  upperRoom: { name: 'The Upper Room', kind: 'item', x: -600, n: -700, lift: 13 },
  caiaphas: { name: 'House of the High Priest', kind: 'item', x: -390, n: -720, lift: 14 },
  siloam: { name: 'Pool of Siloam', kind: 'item', big: true, x: -80, n: -845, lift: 8 },
  bethesda: { name: 'Pool of Bethesda', kind: 'item', x: 40, n: 300, lift: 10 },
  gethsemane: { name: 'Gethsemane', kind: 'item', big: true, x: 358, n: 115, lift: 12 },
  figTree: { name: 'The Fig Tree', kind: 'item', x: 1700, n: 40, lift: 8 },
  jesus: { name: 'Jesus', kind: 'person', actor: 'jesus', lift: 2.3 },
  peter: { name: 'Peter', kind: 'person', actor: 'peter', lift: 2.2 },
  john: { name: 'John', kind: 'person', actor: 'john', lift: 2.2 },
  judas: { name: 'Judas', kind: 'person', actor: 'judas', lift: 2.2 },
  colt: { name: 'The colt', kind: 'animal', actor: 'colt', lift: 1.8, until: 'mount' },
  questioners: { name: 'Pharisees and Herodians', kind: 'person', actor: 'q2', lift: 2.2 },
  widow: { name: 'The widow', kind: 'person', actor: 'widow', lift: 2.1 },
  anointer: { name: 'The woman', kind: 'person', actor: 'anointer', lift: 2.1 },
  jarMan: { name: 'The man with the jar', kind: 'person', actor: 'jarMan', lift: 2.6 },
  caiaphasP: { name: 'The high priest', kind: 'person', actor: 'caiaphas', lift: 2.2 },
  girl: { name: 'A servant girl', kind: 'person', actor: 'girl', lift: 2.1 },
  pilate: { name: 'Pilate', kind: 'person', actor: 'pilate', lift: 3.4 },
  barabbas: { name: 'Barabbas', kind: 'person', actor: 'barabbas', lift: 2.2 },
  simonC: { name: 'Simon of Cyrene', kind: 'person', actor: 'simonC', lift: 2.2 },
  centurion: { name: 'The centurion', kind: 'person', actor: 'centurion', lift: 2.3 },
  women: { name: 'The women', kind: 'person', actor: 'maryM', lift: 2.2 },
  joseph: { name: 'Joseph of Arimathea', kind: 'person', actor: 'joseph', lift: 2.2 },
  nicodemus: { name: 'Nicodemus', kind: 'person', actor: 'nicodemus', lift: 2.2 },
  guard: { name: 'The guard', kind: 'person', actor: 's1', lift: 2.3, from: 'saturday' },
  youngMan: { name: 'A young man in white', kind: 'person', actor: 'youngMan', lift: 1.7 },
};

export const INTRO = {
  title: 'Holy Week in Jerusalem',
  ref: 'Mark 10:33–34', day: 0, hour: 8.5,
  quote: {
    nasb: '“Behold, we are going up to Jerusalem, and the Son of Man will be handed over to the chief priests and the scribes; and they will condemn Him to death… and three days later He will rise from the dead.”',
    niv: '“We are going up to Jerusalem,” he said, “and the Son of Man will be delivered over to the chief priests and the teachers of the law. They will condemn him to death… Three days later he will rise.”',
    esv: '“See, we are going up to Jerusalem, and the Son of Man will be delivered over to the chief priests and the scribes, and they will condemn him to death… And after three days he will rise.”',
    kjv: '“Behold, we go up to Jerusalem; and the Son of man shall be delivered unto the chief priests, and unto the scribes; and they shall condemn him to death… and the third day he shall rise again.”',
  },
  note: 'On the road up from Jericho, Jesus told the twelve what would happen in Jerusalem. This tour follows his last week there, day by day in Mark’s order, from the Sunday he rode into the city to the first day of the next week, with the other Gospels where they add to it. It is Passover, and the city is full of pilgrims.',
  aside: 'Jerusalem is shown as it was about AD 30: Herod’s temple on its great platform, the Antonia, Herod’s palace, and the first and second walls. Many places are uncertain, such as the upper room, the high priest’s house, the Praetorium and Golgotha; the notes say which tradition is followed. The crucifixion is shown only from a distance.',
};

export const FINALE = {
  title: 'He Has Risen',
  ref: '1 Corinthians 15:3–4', day: 7, hour: 7,
  quote: {
    nasb: '“…that Christ died for our sins according to the Scriptures, and that He was buried, and that He was raised on the third day according to the Scriptures.”',
    niv: '“…that Christ died for our sins according to the Scriptures, that he was buried, that he was raised on the third day according to the Scriptures.”',
    esv: '“…that Christ died for our sins in accordance with the Scriptures, that he was buried, that he was raised on the third day in accordance with the Scriptures.”',
    kjv: '“…how that Christ died for our sins according to the scriptures; And that he was buried, and that he rose again the third day according to the scriptures.”',
  },
  note: 'The young man told the women to go and tell the disciples and Peter that Jesus was going ahead of them to Galilee, where they would see him (Mark 16:7). The other Gospels and Acts tell how he appeared to the women, to Peter, to the two on the road to Emmaus, to the eleven, and to more than five hundred at once (1 Corinthians 15:5–8).',
};

// Tour stops, in Mark's order.
// day: 0 for the first Sunday to 7 for the next; hour: the hour of the day (sets the light).
// when: when it happened, as the popup says it. where: a short note of the place.
// build: groups (made in main.js) that happen during the flight in, one after
// another. Walks take time in proportion to their length, and the camera
// follows whoever is walking (follow: its offset { x, n, y }, or false).
// look / cam: where the camera looks and where it sits ({ x, n } plan, y metres above the floor there).
// start: how far into the flight the groups begin (walks at once, others at 0.3).
// cutaway: fade the roof and a wall of the building to see inside.
// context: show the places round about too.
// labels: keys of LABELS to highlight.
export const STOPS = [
  {
    title: 'The Colt', ref: 'Mark 11:2', day: 0, hour: 9.5, when: 'Sunday morning',
    build: ['twoGo', 'twoBack', 'cloaks', 'mount'],
    quote: {
      nasb: '“Go into the village opposite you, and immediately as you enter it you will find a colt tied there, on which no one has ever sat; untie it and bring it here.”',
      niv: '“Go to the village ahead of you, and just as you enter it, you will find a colt tied there, which no one has ever ridden. Untie it and bring it here.”',
      esv: '“Go into the village in front of you, and immediately as you enter it you will find a colt tied, on which no one has ever sat. Untie it and bring it.”',
      kjv: '“Go your way into the village over against you: and as soon as ye be entered into it, ye shall find a colt tied, whereon never man sat; loose him, and bring him.”',
    },
    note: 'Coming up the road from Jericho, they reach Bethphage and Bethany on the Mount of Olives (11:1). Two disciples find the colt tied at a door, outside in the street, and bring it; they throw their cloaks on it and Jesus sits on it (11:4–7). Matthew 21:5 and John 12:15 see in this Zechariah 9:9: “your king is coming to you… mounted on a donkey.” Mark doesn’t name the two disciples.',
    where: 'Bethphage, on the Mount of Olives', labels: ['jesus', 'colt', 'bethphage'],
    look: { x: 1524, n: 228, y: 1.3 }, cam: { x: 1547, n: 207, y: 9 },
  },
  {
    title: 'Hosanna!', ref: 'Mark 11:8–9', day: 0, hour: 11, when: 'Sunday',
    build: ['ride1'], context: true, follow: { x: 22, n: -26, y: 16 },
    quote: {
      nasb: '“And many people spread their cloaks on the road, and others spread leafy branches which they had cut from the fields. And those who went in front and those who followed were shouting: ‘Hosanna! Blessed is He who comes in the name of the Lord.’”',
      niv: '“Many people spread their cloaks on the road, while others spread branches they had cut in the fields. Those who went ahead and those who followed shouted, ‘Hosanna!’ ‘Blessed is he who comes in the name of the Lord!’”',
      esv: '“And many spread their cloaks on the road, and others spread leafy branches that they had cut from the fields. And those who went before and those who followed were shouting, ‘Hosanna! Blessed is he who comes in the name of the Lord!’”',
      kjv: '“And many spread their garments in the way: and others cut down branches off the trees, and strawed them in the way. And they that went before, and they that followed, cried, saying, Hosanna; Blessed is he that cometh in the name of the Lord.”',
    },
    note: 'The road climbs over the shoulder of the Mount of Olives and comes down towards the city. The crowds going ahead and following spread their cloaks and cut branches on the road; John says they took palm branches and went out from the city to meet him (John 12:12–13). “Hosanna” is Hebrew for “save, please”, from Psalm 118:25–26, sung at the feasts.',
    where: 'The road over the Mount of Olives', labels: ['jesus', 'olives'],
    look: { x: 700, n: 62, y: 1.6 }, cam: { x: 723, n: 44, y: 7 },
  },
  {
    title: 'He Wept over the City', ref: 'Luke 19:41–42', day: 0, hour: 12, when: 'Sunday',
    build: ['wept'], context: true,
    quote: {
      nasb: '“When He approached Jerusalem, He saw the city and wept over it, saying, ‘If you had known on this day, even you, the conditions for peace! But now they have been hidden from your eyes.’”',
      niv: '“As he approached Jerusalem and saw the city, he wept over it and said, ‘If you, even you, had only known on this day what would bring you peace—but now it is hidden from your eyes.’”',
      esv: '“And when he drew near and saw the city, he wept over it, saying, ‘Would that you, even you, had known on this day the things that make for peace! But now they are hidden from your eyes.’”',
      kjv: '“And when he was come near, he beheld the city, and wept over it, Saying, If thou hadst known, even thou, at least in this thy day, the things which belong unto thy peace! but now they are hid from thine eyes.”',
    },
    note: 'As the road comes over the hill the whole city comes into view across the Kidron, the temple shining in front of it. Luke alone tells how Jesus wept here, and foretold the siege: “they will not leave in you one stone upon another” (19:43–44). The Romans destroyed the city and the temple forty years later, in AD 70.',
    where: 'The western slope of the Mount of Olives', labels: ['jesus', 'temple', 'kidron'],
    look: { x: 200, n: 8, y: 6 }, cam: { x: 762, n: 80, y: 11 },
  },
  {
    title: 'Into the Temple', ref: 'Mark 11:11', day: 0, hour: 17, when: 'Sunday evening',
    build: ['ride2', 'dismount', 'inTemple'], follow: { x: 20, n: -28, y: 18 },
    quote: {
      nasb: '“And Jesus entered Jerusalem and came into the temple area; and after looking around at everything, He left for Bethany with the twelve, since it was already late.”',
      niv: '“Jesus entered Jerusalem and went into the temple courts. He looked around at everything, but since it was already late, he went out to Bethany with the Twelve.”',
      esv: '“And he entered Jerusalem and went into the temple. And when he had looked around at everything, as it was already late, he went out to Bethany with the twelve.”',
      kjv: '“And Jesus entered into Jerusalem, and into the temple: and when he had looked round about upon all things, and now the eventide was come, he went out unto Bethany with the twelve.”',
    },
    note: 'Down across the Kidron and up into the city: here he comes in by the east gate of the temple court (the Mishnah’s Shushan Gate), though the text doesn’t say which gate. The great court, open to everyone, ran round the inner courts on the platform Herod had built. Mark has him only look round and go back to Bethany; in Matthew and Luke he clears the temple the same day.',
    where: 'The Court of the Gentiles', labels: ['jesus', 'temple', 'courtWomen'],
    look: { x: 98, n: -58, y: 1.6 }, cam: { x: 122, n: -86, y: 7 },
  },
  {
    title: 'The Fig Tree', ref: 'Mark 11:13', day: 1, hour: 7.5, when: 'Monday morning',
    build: ['monday', 'toFig', 'searchFig'],
    quote: {
      nasb: '“Seeing from a distance a fig tree in leaf, He went to see if perhaps He would find anything on it; and when He came to it, He found nothing but leaves, for it was not the season for figs.”',
      niv: '“Seeing in the distance a fig tree in leaf, he went to find out if it had any fruit. When he reached it, he found nothing but leaves, because it was not the season for figs.”',
      esv: '“And seeing in the distance a fig tree in leaf, he went to see if he could find anything on it. When he came to it, he found nothing but leaves, for it was not the season for figs.”',
      kjv: '“And seeing a fig tree afar off having leaves, he came, if haply he might find any thing thereon: and when he came to it, he found nothing but leaves; for the time of figs was not yet.”',
    },
    note: 'On the way back from Bethany he is hungry. He says to the tree, “May no one ever eat fruit from you again,” and the disciples hear it (11:14); the next morning they find it withered from the roots (11:20–21). Mark sets the clearing of the temple between the two, as if one explains the other. Where the tree stood isn’t said.',
    where: 'The road from Bethany', labels: ['jesus', 'figTree'],
    look: { x: 1704, n: 36, y: 2.2 }, cam: { x: 1724, n: 16, y: 6 },
  },
  {
    title: 'The Tables Overturned', ref: 'Mark 11:15–17', day: 1, hour: 10, when: 'Monday',
    build: ['templeMon', 'toStoa', 'overturn'], follow: { x: 18, n: 24, y: 12 },
    quote: {
      nasb: '“…He overturned the tables of the money changers and the seats of those who were selling doves… ‘Is it not written: “My house will be called a house of prayer for all the nations”? But you have made it a den of robbers.’”',
      niv: '“He overturned the tables of the money changers and the benches of those selling doves… ‘Is it not written: “My house will be called a house of prayer for all nations”? But you have made it “a den of robbers.”’”',
      esv: '“…he overturned the tables of the money-changers and the seats of those who sold pigeons… ‘Is it not written, “My house shall be called a house of prayer for all the nations”? But you have made it a den of robbers.’”',
      kjv: '“…and overthrew the tables of the moneychangers, and the seats of them that sold doves… Is it not written, My house shall be called of all nations the house of prayer? but ye have made it a den of thieves.”',
    },
    note: 'Pilgrims changed their money into the temple’s coinage for the half-shekel tax, and bought doves and other animals for the sacrifices. Here the market is in the Royal Stoa along the south side of the court, which is where many place it. He quotes Isaiah 56:7 and Jeremiah 7:11. The chief priests and scribes begin looking for a way to destroy him (11:18).',
    where: 'The Royal Stoa', labels: ['jesus', 'royalStoa'],
    look: { x: 30, n: -272, y: 1.4 }, cam: { x: 41, n: -252, y: 6 },
  },
  {
    title: 'Caesar’s Coin', ref: 'Mark 12:16–17', day: 2, hour: 10, when: 'Tuesday',
    build: ['tuesday', 'questioners', 'coin'],
    quote: {
      nasb: '“‘Whose image and inscription is this?’ And they said to Him, ‘Caesar’s.’ And Jesus said to them, ‘Pay to Caesar the things that are Caesar’s, and to God the things that are God’s.’”',
      niv: '“‘Whose image is this? And whose inscription?’ ‘Caesar’s,’ they replied. Then Jesus said to them, ‘Give back to Caesar what is Caesar’s and to God what is God’s.’”',
      esv: '“‘Whose likeness and inscription is this?’ They said to him, ‘Caesar’s.’ Jesus said to them, ‘Render to Caesar the things that are Caesar’s, and to God the things that are God’s.’”',
      kjv: '“Whose is this image and superscription? And they said unto him, Caesar’s. And Jesus answering said unto them, Render to Caesar the things that are Caesar’s, and to God the things that are God’s.”',
    },
    note: 'On the Tuesday, walking in the temple, he is questioned again and again: by the chief priests, scribes and elders about his authority, by Pharisees and Herodians about the tax, by Sadducees about the resurrection, and by a scribe about the greatest commandment (11:27–12:34). The denarius bore the head of the emperor Tiberius. Where in the courts this happened isn’t said; here it is in Solomon’s Portico, where John places his teaching (John 10:23).',
    where: 'Solomon’s Portico (a guess)', labels: ['jesus', 'questioners', 'portico'],
    look: { x: 144, n: -120, y: 1.6 }, cam: { x: 127, n: -107, y: 4.5 },
  },
  {
    title: 'The Widow’s Two Coins', ref: 'Mark 12:42–43', day: 2, hour: 13, when: 'Tuesday',
    build: ['toTreasury', 'sitTreasury', 'widowGives', 'twoCoins'],
    quote: {
      nasb: '“And a poor widow came and put in two lepta coins, which amount to a quadrans. Calling His disciples to Him, He said to them, ‘Truly I say to you, this poor widow put in more than all the contributors to the treasury.’”',
      niv: '“But a poor widow came and put in two very small copper coins, worth only a few cents. Calling his disciples to him, Jesus said, ‘Truly I tell you, this poor widow has put more into the treasury than all the others.’”',
      esv: '“And a poor widow came and put in two small copper coins, which make a penny. And he called his disciples to him and said to them, ‘Truly, I say to you, this poor widow has put in more than all those who are contributing to the offering box.’”',
      kjv: '“And there came a certain poor widow, and she threw in two mites, which make a farthing. And he called unto him his disciples, and saith unto them, Verily I say unto you, That this poor widow hath cast more in, than all they which have cast into the treasury.”',
    },
    note: 'He sits down opposite the treasury and watches the rich put in large amounts (12:41). The Mishnah describes thirteen chests in the temple, shaped like rams’ horns, for the offerings; they are shown here round the Court of the Women, the furthest a woman could go, which is where they are usually placed. A lepton was the smallest coin there was. “She, out of her poverty, put in all she owned” (12:44).',
    where: 'The Court of the Women', labels: ['jesus', 'widow', 'courtWomen'],
    look: { x: 98, n: 25, y: 0.6 }, cam: { x: 102, n: -39.3, y: 3.2 },
  },
  {
    title: 'Not One Stone upon Another', ref: 'Mark 13:1–2', day: 2, hour: 16.5, when: 'Tuesday afternoon',
    build: ['leaveTemple', 'sitOlives'], follow: { x: 24, n: -30, y: 18 },
    quote: {
      nasb: '“…one of His disciples said to Him, ‘Teacher, look! What wonderful stones and what wonderful buildings!’ And Jesus said to him, ‘Do you see these great buildings? Not one stone will be left upon another, which will not be torn down.’”',
      niv: '“…one of his disciples said to him, ‘Look, Teacher! What massive stones! What magnificent buildings!’ ‘Do you see all these great buildings?’ replied Jesus. ‘Not one stone here will be left on another; every one will be thrown down.’”',
      esv: '“…one of his disciples said to him, ‘Look, Teacher, what wonderful stones and what wonderful buildings!’ And Jesus said to him, ‘Do you see these great buildings? There will not be left here one stone upon another that will not be thrown down.’”',
      kjv: '“…one of his disciples saith unto him, Master, see what manner of stones and what buildings are here! And Jesus answering said unto him, Seest thou these great buildings? there shall not be left one stone upon another, that shall not be thrown down.”',
    },
    note: 'Some of Herod’s stones are over ten metres long, and the work on the temple was still going on. Sitting on the Mount of Olives opposite the temple, Peter, James, John and Andrew ask him privately when this will be (13:3–4), and he speaks of what is to come, ending “Stay awake” (13:37). In AD 70 the Romans burned the temple and threw down its buildings.',
    where: 'The Mount of Olives, opposite the temple', labels: ['jesus', 'peter', 'john', 'temple'],
    look: { x: 350, n: 0, y: 45 }, cam: { x: 586, n: 12, y: 3 },
  },
  {
    title: 'Anointed at Bethany', ref: 'Mark 14:3', day: 3, hour: 19.5, when: 'Wednesday evening',
    build: ['wednesday', 'woman', 'pour', 'judasGoes'], cutaway: true, follow: false,
    quote: {
      nasb: '“While He was in Bethany at the home of Simon the Leper, He was reclining at the table, and a woman came with an alabaster vial of very expensive perfume of pure nard. She broke the vial and poured the perfume over His head.”',
      niv: '“While he was in Bethany, reclining at the table in the home of Simon the Leper, a woman came with an alabaster jar of very expensive perfume, made of pure nard. She broke the jar and poured the perfume on his head.”',
      esv: '“And while he was at Bethany in the house of Simon the leper, as he was reclining at table, a woman came with an alabaster flask of ointment of pure nard, very costly, and she broke the flask and poured it over his head.”',
      kjv: '“And being in Bethany in the house of Simon the leper, as he sat at meat, there came a woman having an alabaster box of ointment of spikenard very precious; and she brake the box, and poured it on his head.”',
    },
    note: 'Some said the perfume could have been sold for more than a year’s wages and given to the poor; Jesus said she had anointed his body beforehand for burial (14:4–8). Then Judas Iscariot went to the chief priests, who promised him money (14:10–11). Mark sets this two days before the Passover (14:1), which is why it is shown on the Wednesday; John tells of an anointing at Bethany six days before, by Mary, Martha’s sister (John 12:1–3).',
    where: 'The house of Simon the leper, Bethany', labels: ['jesus', 'anointer', 'judas'],
    look: { x: 2289.5, n: -599.6, y: 0.6 }, cam: { x: 2294, n: -607.5, y: 5 },
  },
  {
    title: 'The Man with the Jar', ref: 'Mark 14:13–15', day: 4, hour: 15, when: 'Thursday afternoon',
    build: ['thursday', 'followJar'], follow: { x: 16, n: -20, y: 13 },
    quote: {
      nasb: '“Go into the city, and a man carrying a pitcher of water will meet you; follow him… And he himself will show you a large upstairs room furnished and ready; prepare for us there.”',
      niv: '“Go into the city, and a man carrying a jar of water will meet you. Follow him… He will show you a large room upstairs, furnished and ready. Make preparations for us there.”',
      esv: '“Go into the city, and a man carrying a jar of water will meet you. Follow him… And he will show you a large upper room furnished and ready; there prepare for us.”',
      kjv: '“Go ye into the city, and there shall meet you a man bearing a pitcher of water: follow him… And he will shew you a large upper room furnished and prepared: there make ready for us.”',
    },
    note: 'It is the first day of Unleavened Bread, when the Passover lambs were sacrificed (14:12). Luke names the two as Peter and John (Luke 22:8). A man carrying water would stand out, since it was usually women’s work. The house is placed on Mount Zion, where tradition puts the upper room; the text doesn’t say where it was, and he is shown coming up from the Pool of Siloam.',
    where: 'From the Pool of Siloam to Mount Zion', labels: ['peter', 'john', 'jarMan', 'upperRoom'],
    look: { x: -591, n: -702, y: 3 }, cam: { x: -577, n: -713, y: 8 },
  },
  {
    title: 'The Last Supper', ref: 'Mark 14:22–24', day: 4, hour: 20, when: 'Thursday evening',
    build: ['evening', 'bread', 'cup', 'judasOut'], cutaway: true, follow: false,
    quote: {
      nasb: '“While they were eating, He took some bread, and after a blessing He broke it, and gave it to them, and said, ‘Take it; this is My body.’ And when He had taken a cup and given thanks, He gave it to them… ‘This is My blood of the covenant, which is being poured out for many.’”',
      niv: '“While they were eating, Jesus took bread, and when he had given thanks, he broke it and gave it to his disciples, saying, ‘Take it; this is my body.’ Then he took a cup, and when he had given thanks, he gave it to them… ‘This is my blood of the covenant, which is poured out for many.’”',
      esv: '“And as they were eating, he took bread, and after blessing it broke it and gave it to them, and said, ‘Take; this is my body.’ And he took a cup, and when he had given thanks he gave it to them… ‘This is my blood of the covenant, which is poured out for many.’”',
      kjv: '“And as they did eat, Jesus took bread, and blessed, and brake it, and gave to them, and said, Take, eat: this is my body. And he took the cup, and when he had given thanks, he gave it to them… This is my blood of the new testament, which is shed for many.”',
    },
    note: 'They recline at table, as at a Passover meal (14:18). He says one of them will betray him, one dipping bread with him in the bowl (14:18–20). John tells how he washed their feet (John 13:1–15), and how Judas took the bread and went out: “and it was night” (John 13:30). In Mark the meal is the Passover; John seems to place the Passover on the Friday evening (John 18:28; 19:14), and how the two fit is still argued.',
    where: 'The upper room', labels: ['jesus', 'john', 'peter', 'judas'],
    look: { x: -600.6, n: -699.6, y: 0.6 }, cam: { x: -598, n: -709.5, y: 7.5 },
  },
  {
    title: 'Gethsemane', ref: 'Mark 14:35–36', day: 4, hour: 23, when: 'Thursday night',
    build: ['hymn', 'toPray', 'pray', 'sleep'], follow: { x: 18, n: -22, y: 14 },
    quote: {
      nasb: '“And He went a little beyond them, and fell to the ground and began praying that if it were possible, the hour might pass Him by. And He was saying, ‘Abba! Father! All things are possible for You; remove this cup from Me; yet not what I will, but what You will.’”',
      niv: '“Going a little farther, he fell to the ground and prayed that if possible the hour might pass from him. ‘Abba, Father,’ he said, ‘everything is possible for you. Take this cup from me. Yet not what I will, but what you will.’”',
      esv: '“And going a little farther, he fell on the ground and prayed that, if it were possible, the hour might pass from him. And he said, ‘Abba, Father, all things are possible for you. Remove this cup from me. Yet not what I will, but what you will.’”',
      kjv: '“And he went forward a little, and fell on the ground, and prayed that, if it were possible, the hour might pass from him. And he said, Abba, Father, all things are possible unto thee; take away this cup from me: nevertheless not what I will, but what thou wilt.”',
    },
    note: 'After singing a hymn they go out to the Mount of Olives (14:26), across the Kidron to a garden (John 18:1). The way is a guess: down from Mount Zion past Siloam and up the valley by moonlight; Passover fell at the full moon. He takes Peter, James and John further, asks them to keep watch, and goes on alone; three times he comes back and finds them asleep (14:33–41). Gethsemane means “oil press”.',
    where: 'Gethsemane, across the Kidron', labels: ['jesus', 'peter', 'gethsemane'],
    look: { x: 378, n: 127.5, y: 0.3 }, cam: { x: 387, n: 120.5, y: 2.4 },
  },
  {
    title: 'The Arrest', ref: 'Mark 14:45–46, 50', day: 5, hour: 0.5, when: 'Friday, in the night',
    build: ['arrestCome', 'rise', 'kiss', 'seize', 'flee'], follow: { x: -16, n: -18, y: 11 },
    quote: {
      nasb: '“And after coming, Judas immediately went to Him and said, ‘Rabbi!’ and kissed Him. And they laid hands on Him and arrested Him… And His disciples all left Him and fled.”',
      niv: '“Going at once to Jesus, Judas said, ‘Rabbi!’ and kissed him. The men seized Jesus and arrested him… Then everyone deserted him and fled.”',
      esv: '“And when he came, he went up to him at once and said, ‘Rabbi!’ And he kissed him. And they laid hands on him and seized him… And they all left him and fled.”',
      kjv: '“And as soon as he was come, he goeth straightway to him, and saith, Master, master; and kissed him. And they laid their hands on him, and took him… And they all forsook him, and fled.”',
    },
    note: 'Judas comes with a crowd with swords and clubs from the chief priests, the scribes and the elders (14:43); John adds a cohort of soldiers and officers, with lanterns, torches and weapons (John 18:3). One of those standing by draws a sword and cuts off the ear of the high priest’s slave (14:47); Luke says Jesus healed it (Luke 22:51).',
    where: 'Gethsemane', labels: ['jesus', 'judas'],
    look: { x: 350, n: 113, y: 1.4 }, cam: { x: 361, n: 103, y: 4.5 },
  },
  {
    title: 'Peter’s Denial', ref: 'Mark 14:67–68', day: 5, hour: 3, when: 'Friday, before dawn',
    build: ['ledAway', 'warm', 'girl'], follow: { x: 18, n: -24, y: 16 },
    quote: {
      nasb: '“…and seeing Peter warming himself, she looked at him and said, ‘You were with Jesus the Nazarene as well.’ But he denied it, saying, ‘I neither know nor understand what you are talking about.’”',
      niv: '“When she saw Peter warming himself, she looked closely at him. ‘You also were with that Nazarene, Jesus,’ she said. But he denied it. ‘I don’t know or understand what you’re talking about,’ he said.”',
      esv: '“…and seeing Peter warming himself, she looked at him and said, ‘You also were with the Nazarene, Jesus.’ But he denied it, saying, ‘I neither know nor understand what you mean.’”',
      kjv: '“And when she saw Peter warming himself, she looked upon him, and said, And thou also wast with Jesus of Nazareth. But he denied, saying, I know not, neither understand I what thou sayest.”',
    },
    note: 'Jesus is led to the high priest, Caiaphas (Matthew 26:57), where the chief priests and the whole {council} try to find testimony against him; asked if he is the Christ, he says “I am” (14:53–64). Peter follows at a distance into the courtyard and sits with the guards at the fire (14:54). He denies Jesus three times, the rooster crows a second time, and he weeps (14:66–72). The house is placed at the traditional site on Mount Zion.',
    where: 'The courtyard of the high priest', labels: ['jesus', 'peter', 'girl', 'caiaphasP'],
    look: { x: -390, n: -724, y: 1.4 }, cam: { x: -387, n: -707, y: 4 },
  },
  {
    title: 'Before Pilate', ref: 'Mark 15:14–15', day: 5, hour: 7, when: 'Friday morning',
    build: ['toPilate', 'barabbas'], follow: { x: 18, n: -24, y: 16 },
    quote: {
      nasb: '“But Pilate said to them, ‘Why, what evil has He done?’ But they shouted all the more, ‘Crucify Him!’ Intent on satisfying the crowd, Pilate released Barabbas for them, and after having Jesus flogged, he handed Him over to be crucified.”',
      niv: '“‘Why? What crime has he committed?’ asked Pilate. But they shouted all the louder, ‘Crucify him!’ Wanting to satisfy the crowd, Pilate released Barabbas to them. He had Jesus flogged, and handed him over to be crucified.”',
      esv: '“And Pilate said to them, ‘Why? What evil has he done?’ But they shouted all the more, ‘Crucify him.’ So Pilate, wishing to satisfy the crowd, released for them Barabbas, and having scourged Jesus, he delivered him to be crucified.”',
      kjv: '“Then Pilate said unto them, Why, what evil hath he done? And they cried out the more exceedingly, Crucify him. And so Pilate, willing to content the people, released Barabbas unto them, and delivered Jesus, when he had scourged him, to be crucified.”',
    },
    note: 'Early in the morning they bind him and hand him over to Pontius Pilate, the Roman governor (15:1). It was the custom to release one prisoner at the feast; the crowd asks for Barabbas, held for murder in an uprising (15:6–11). Luke adds that Pilate sent him to Herod Antipas, who sent him back (Luke 23:7–11). The Praetorium is placed at Herod’s palace, with the judgement seat on the Pavement (John 19:13); others place it at the Antonia, where the Via Dolorosa begins.',
    where: 'The Pavement, before Herod’s palace', labels: ['jesus', 'pilate', 'barabbas', 'herodsPalace'],
    look: { x: -590, n: -195, y: 2 }, cam: { x: -569, n: -209, y: 5 },
  },
  {
    title: 'Simon of Cyrene', ref: 'Mark 15:21', day: 5, hour: 8.5, when: 'Friday morning',
    build: ['toGate', 'compel', 'toGolgotha'], follow: { x: 16, n: -20, y: 13 },
    quote: {
      nasb: '“And they compelled a passer-by coming from the country, Simon of Cyrene (the father of Alexander and Rufus), to carry His cross.”',
      niv: '“A certain man from Cyrene, Simon, the father of Alexander and Rufus, was passing by on his way in from the country, and they forced him to carry the cross.”',
      esv: '“And they compelled a passerby, Simon of Cyrene, who was coming in from the country, the father of Alexander and Rufus, to carry his cross.”',
      kjv: '“And they compel one Simon a Cyrenian, who passed by, coming out of the country, the father of Alexander and Rufus, to bear his cross.”',
    },
    note: 'The soldiers mock him, dress him in purple and a crown of thorns, then put his own clothes back on him and lead him out (15:16–20). He goes out carrying his cross (John 19:17); then Simon is made to carry it behind him (Luke 23:26), with a great crowd following, among them women mourning for him (Luke 23:27). What he carried was probably the crossbeam. Here they go out by the Gennath Gate, which is a guess.',
    where: 'Out of the city to Golgotha', labels: ['jesus', 'simonC', 'golgotha'],
    look: { x: -572, n: 50, y: 1.6 }, cam: { x: -546, n: 26, y: 14 },
  },
  {
    title: 'The Cross', ref: 'Mark 15:33, 38–39', day: 5, hour: 14, dark: true, when: 'Friday, from the sixth hour to the ninth',
    build: ['crucified', 'dark'], start: 0.55, follow: false,
    quote: {
      nasb: '“When the sixth hour came, darkness fell over the whole land until the ninth hour… And the veil of the temple was torn in two from top to bottom. And when the centurion… saw that He died in this way, he said, ‘Truly this Man was the Son of God!’”',
      niv: '“At noon, darkness came over the whole land until three in the afternoon… The curtain of the temple was torn in two from top to bottom. And when the centurion… saw how he died, he said, ‘Surely this man was the Son of God!’”',
      esv: '“And when the sixth hour had come, there was darkness over the whole land until the ninth hour… And the curtain of the temple was torn in two, from top to bottom. And when the centurion… saw that in this way he breathed his last, he said, ‘Truly this man was the Son of God!’”',
      kjv: '“And when the sixth hour was come, there was darkness over the whole land until the ninth hour… And the veil of the temple was rent in twain from the top to the bottom. And when the centurion… saw that he so cried out, and gave up the ghost, he said, Truly this man was the Son of God.”',
    },
    note: 'They crucify him at the third hour, about nine in the morning, between two robbers, and divide his clothes by lot; the charge over him reads “The King of the Jews” (15:24–27). Passers-by and the chief priests mock him (15:29–32). At the ninth hour he cries, “My God, my God, why have You forsaken Me?” and dies (15:34–37). Women watch from a distance (15:40). Golgotha is shown at the traditional place, now in the Church of the Holy Sepulchre, outside the wall of the time.',
    where: 'Golgotha, the Place of a Skull', labels: ['golgotha', 'centurion', 'women'],
    look: { x: -575, n: 50, y: 5 }, cam: { x: -503, n: 8, y: 25 },
  },
  {
    title: 'The Burial', ref: 'Mark 15:46', day: 5, hour: 17.5, when: 'Friday evening',
    build: ['takenDown', 'carry', 'outTomb', 'rollStone'], follow: { x: 12, n: -14, y: 9 },
    quote: {
      nasb: '“Joseph bought a linen cloth, took Him down, wrapped Him in the linen cloth, and laid Him in a tomb which had been cut out in the rock; and he rolled a stone against the entrance of the tomb.”',
      niv: '“So Joseph bought some linen cloth, took down the body, wrapped it in the linen, and placed it in a tomb cut out of rock. Then he rolled a stone against the entrance of the tomb.”',
      esv: '“And Joseph bought a linen shroud, and taking him down, wrapped him in the linen shroud and laid him in a tomb that had been cut out of the rock. And he rolled a stone against the entrance of the tomb.”',
      kjv: '“And he bought fine linen, and took him down, and wrapped him in the linen, and laid him in a sepulchre which was hewn out of a rock, and rolled a stone unto the door of the sepulchre.”',
    },
    note: 'It is the day of preparation, before the Sabbath begins at sunset. Joseph of Arimathea, a respected member of the {council}, asks Pilate for the body (15:42–45); Nicodemus brings myrrh and aloes, and the tomb is new, in a garden near the place (John 19:39–41). Mary Magdalene and Mary the mother of Joses see where he is laid (15:47). Tombs of the time had low doors; a few were closed with a round stone like this.',
    where: 'A tomb in a garden nearby', labels: ['joseph', 'nicodemus', 'women', 'tomb'],
    look: { x: -602, n: 13, y: 1.2 }, cam: { x: -590, n: 1, y: 4 },
  },
  {
    title: 'The Sabbath', ref: 'Matthew 27:65–66', day: 6, hour: 10, when: 'Saturday, the Sabbath',
    build: ['saturday', 'seal'],
    quote: {
      nasb: '“Pilate said to them, ‘You have a guard; go, make it as secure as you know how.’ And they went and made the tomb secure with the guard, sealing the stone.”',
      niv: '“‘Take a guard,’ Pilate answered. ‘Go, make the tomb as secure as you know how.’ So they went and made the tomb secure by putting a seal on the stone and posting the guard.”',
      esv: '“Pilate said to them, ‘You have a guard of soldiers. Go, make it as secure as you can.’ So they went and made the tomb secure by sealing the stone and setting a guard.”',
      kjv: '“Pilate said unto them, Ye have a watch: go your way, make it as sure as ye can. So they went, and made the sepulchre sure, sealing the stone, and setting a watch.”',
    },
    note: 'Mark says nothing of the Sabbath; the women rest according to the commandment (Luke 23:56). Matthew tells how the chief priests and Pharisees remembered that he had said he would rise after three days, and asked Pilate to make the tomb secure (27:62–64). How the stone was sealed isn’t said; here it is a cord fixed with clay.',
    where: 'The tomb', labels: ['guard', 'tomb'],
    look: { x: -603, n: 14, y: 1.3 }, cam: { x: -588, n: 7, y: 5 },
  },
  {
    title: 'He Is Not Here', ref: 'Mark 16:5–6', day: 7, hour: 6.2, when: 'Sunday, at sunrise',
    build: ['sunday', 'womenCome', 'lookIn'], cutaway: true, follow: { x: 10, n: -12, y: 7 },
    quote: {
      nasb: '“And entering the tomb, they saw a young man sitting at the right, wearing a white robe; and they were amazed. But he said to them, ‘Do not be amazed; you are looking for Jesus the Nazarene, who has been crucified. He has risen; He is not here.’”',
      niv: '“As they entered the tomb, they saw a young man dressed in a white robe sitting on the right side, and they were alarmed. ‘Don’t be alarmed,’ he said. ‘You are looking for Jesus the Nazarene, who was crucified. He has risen! He is not here.’”',
      esv: '“And entering the tomb, they saw a young man sitting on the right side, dressed in a white robe, and they were alarmed. And he said to them, ‘Do not be alarmed. You seek Jesus of Nazareth, who was crucified. He has risen; he is not here.’”',
      kjv: '“And entering into the sepulchre, they saw a young man sitting on the right side, clothed in a long white garment; and they were affrighted. And he saith unto them, Be not affrighted: Ye seek Jesus of Nazareth, which was crucified: he is risen; he is not here.”',
    },
    note: 'When the Sabbath was over, Mary Magdalene, Mary the mother of James, and Salome bought spices to anoint him, and came very early on the first day of the week, when the sun had risen. They wondered who would roll the stone away, and found it already rolled back (16:1–4). Matthew says an angel rolled it away and the guards shook for fear (Matthew 28:2–4).',
    where: 'The empty tomb', labels: ['women', 'youngMan', 'tomb'],
    look: { x: -607.5, n: 14.4, y: 0.5 }, cam: { x: -607.5, n: 6.5, y: 3.2 },
  },
];
