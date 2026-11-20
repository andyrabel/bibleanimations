// Brazilian Portuguese text for "Nehemiah's Wall", merged over data.js (see addLanguage
// in ../../i18n.js). Same shape as data.js, text fields only. There is one version,
// the NVI (nvipt: the 2000 edition, as on Bible Gateway), so every field is a plain
// string. STOPS line up with data.js by position.
//
// Quotations are verbatim, with the 2000 edition's spelling ("cinqüenta"); the
// notes use today's spelling. Names follow the NVI (Eliasibe, Mesulão, Mispá).
// In Neemias 3 the NVI has "batentes" for the beams and "ferrolhos e trancas"
// for the bolts and bars, and says the Sheep Gate was consecrated.

export const GATES = {
  sheep: { name: 'Porta das Ovelhas', repair: 'Reconstruída' },
  fish: { name: 'Porta do Peixe', repair: 'Reconstruída' },
  old: { name: 'Porta Jesana', repair: 'Consertada' },
  valley: { name: 'Porta do Vale', repair: 'Reparada e reconstruída' },
  dung: { name: 'Porta do Esterco', repair: 'Reparada e reconstruída' },
  fountain: { name: 'Porta da Fonte', repair: 'Reparada e reconstruída' },
  water: { name: 'Porta das Águas', repair: 'Não se diz que foi reparada' },
  horse: { name: 'Porta dos Cavalos', repair: 'Os sacerdotes repararam acima dela' },
  east: { name: 'Porta Oriental', repair: 'Só o seu guarda é citado' },
  muster: { name: 'Porta da Inspeção', repair: 'Os reparos chegaram em frente dela' },
};

export const TOWERS = {
  meah: { name: 'Torre dos Cem' },
  hananel: { name: 'Torre de Hananeel' },
  ovens: { name: 'Torre dos Fornos' },
  kingtower: { name: 'Torre do palácio superior' },
  greattower: { name: 'Torre que sobressaía' },
  corner2: { name: 'Posto de vigia da esquina' },
};

export const FEATURES = {
  temple: { name: 'O templo' },
  broadWall: { name: 'Muro Largo' },
  poolSiloam: { name: 'Tanque de Siloé' },
  kingsGarden: { name: 'Jardim do Rei' },
  stairs: { name: 'Degraus da Cidade de Davi' },
  tombs: { name: 'Túmulos de Davi' },
  artificialPool: { name: 'Açude artificial' },
  mighty: { name: 'Casa dos soldados' },
  armory: { name: 'Casa das armas' },
  eliashib: { name: 'Casa do sumo sacerdote Eliasibe' },
  angle: { name: 'A esquina do muro' },
  kingsHouse: { name: 'Palácio superior e pátio da guarda' },
  gihon: { name: 'Fonte de Giom' },
  ophel: { name: 'Ofel' },
  cityOfDavid: { name: 'Cidade de Davi' },
  kidron: { name: 'Vale do Cedrom' },
  kidronN: { name: 'Vale do Cedrom' },
  hinnom: { name: 'Vale de Hinom' },
  olives: { name: 'Monte das Oliveiras' },
};

// The gate-part chips, in the NVI's words.
export const PARTS = {
  beams: 'Batentes',
  doors: 'Portas',
  bolts: 'Ferrolhos',
  bars: 'Trancas',
  covered: 'Coberta',
  consecrated: 'Consagrada',
};

export const INTRO = {
  title: 'Jerusalém, 445 a.C.',
  ref: 'Neemias 1–3',
  quote: '“O muro de Jerusalém foi derrubado, e suas portas foram destruídas pelo fogo.” (1:3)',
  note: 'Neemias, copeiro do rei Artaxerxes, voltou a uma cidade em ruínas. O capítulo 3 lista, em ordem, quem reconstruiu cada trecho do muro, no sentido anti-horário a partir da porta das Ovelhas. Este passeio segue essa lista, e o muro volta a subir à nossa passagem.',
  aside: 'O circuito mostrado é a cidade menor de depois do exílio: a colina da Cidade de Davi e o monte do templo. As posições são aproximadas.',
};

export const FINALE = {
  title: 'O muro está pronto',
  ref: 'Neemias 6:15–16',
  quote: '“O muro ficou pronto no vigésimo quinto dia de elul, em cinqüenta e dois dias.”',
  note: 'Os inimigos “perceberam que essa obra havia sido executada com a ajuda de nosso Deus” (6:16). Cada família reparou o trecho perto da própria casa, e o circuito inteiro ficou pronto em menos de dois meses, quase todo com o calcário que estava no meio do entulho.',
};

export const STOPS = [
  {
    title: 'A porta das Ovelhas',
    quote: '“O sumo sacerdote Eliasibe e os seus colegas sacerdotes começaram o seu trabalho e reconstruíram a porta das Ovelhas. Eles a consagraram e colocaram as portas no lugar.”',
    note: 'Os sacerdotes começaram pela porta mais próxima do templo, por onde entravam as ovelhas para o sacrifício. As portas são colocadas, mas não se mencionam ferrolhos nem trancas. É a única porta que o texto diz ter sido consagrada.',
    builders: 'O sumo sacerdote Eliasibe e os sacerdotes',
  },
  {
    title: 'Torres dos Cem e de Hananeel',
    quote: '“Depois construíram o muro até a torre dos Cem, que consagraram, e até a torre de Hananeel.”',
    note: 'O lado norte não tinha um vale profundo que o protegesse, por isso era guardado por torres. A consagração chegou até aqui. Em seguida trabalharam os homens de Jericó, e depois Zacur, filho de Inri.',
    builders: 'Os sacerdotes · homens de Jericó · Zacur',
  },
  {
    title: 'A porta do Peixe',
    quote: '“A porta do Peixe foi reconstruída pelos filhos de Hassenaá. Eles puseram os batentes e colocaram as portas, os ferrolhos e as trancas no lugar.”',
    note: 'Provavelmente tinha esse nome por causa do comércio de peixe (os homens de Tiro vendiam peixe em Jerusalém, 13:16). É a primeira porta descrita por inteiro: batentes, portas, ferrolhos e trancas. Depois vieram Meremote, Mesulão, Zadoque e os homens de Tecoa, “mas os nobres dessa cidade não quiseram se juntar ao serviço”.',
    builders: 'Os filhos de Hassenaá',
  },
  {
    title: 'A porta Jesana',
    quote: '“A porta Jesana foi consertada por Joiada, filho de Paséia, e por Mesulão, filho de Besodias. Eles puseram os batentes e colocaram as portas, os ferrolhos e as trancas no lugar.”',
    note: 'Jesana quer dizer “velha”, e a nota da NVI dá “porta Velha”. O nome pode se referir à porta da cidade velha ou ao caminho para a aldeia de Jesana. Como a porta do Peixe, recebe batentes, portas, ferrolhos e trancas.',
    builders: 'Joiada, filho de Paséia, e Mesulão, filho de Besodias',
  },
  {
    title: 'O muro Largo',
    quote: '“Eles reconstruíram Jerusalém até o muro Largo.”',
    note: 'Aqui trabalharam homens de Gibeom e de Mispá, com Uziel, o ourives, e Hananias, o perfumista. Avigad escavou na colina ocidental um “muro largo” de 7 m de espessura, dos dias de Ezequias, e discute-se se a linha de Neemias chegava até ele. Aqui ele aparece numa posição simplificada.',
    builders: 'Homens de Gibeom e de Mispá · Uziel · Hananias',
  },
  {
    title: 'A torre dos Fornos',
    quote: '“Malquias, filho de Harim, e Hassube, filho de Paate-Moabe, repararam outro trecho e a torre dos Fornos.”',
    note: 'Talvez tivesse esse nome por causa dos fornos dos padeiros (compare a rua dos padeiros, Jr 37:21). Perto dali trabalharam os governadores das duas metades do distrito de Jerusalém. Salum trabalhou aqui “com a ajuda de suas filhas”.',
    builders: 'Refaías · Jedaías · Hatus · Malquias · Hassube · Salum e suas filhas',
  },
  {
    title: 'A porta do Vale',
    quote: '“Eles a reconstruíram e colocaram as portas, os ferrolhos e as trancas no lugar. Também repararam quatrocentos e cinqüenta metros do muro, até a porta do Esterco.”',
    note: 'A inspeção noturna de Neemias começou aqui (2:13). Em 1927, Crowfoot e FitzGerald escavaram uma porta no muro ocidental da Cidade de Davi que muitos identificam com esta. O hebraico diz mil côvados, uns 450–500 m.',
    builders: 'Hanum e os moradores de Zanoa',
  },
  {
    title: 'A porta do Esterco',
    quote: '“A porta do Esterco foi reparada por Malquias, filho de Recabe, governador do distrito de Bete-Haquerém. Ele a reconstruiu e colocou as portas, os ferrolhos e as trancas no lugar.”',
    note: 'Por esta porta se levava o lixo para fora. Ficava perto da ponta sul, acima do vale de Hinom, para onde o lixo era levado. Acabamos de percorrer os mil côvados desde a porta do Vale.',
    builders: 'Malquias, filho de Recabe, governador de Bete-Haquerém',
  },
  {
    title: 'A porta da Fonte',
    quote: '“Ele a reconstruiu, cobriu-a e colocou as portas, os ferrolhos e as trancas no lugar.”',
    note: 'É a única porta que o texto diz ter sido coberta. Também tem portas, ferrolhos e trancas. Tinha esse nome por causa das fontes de água ao pé da colina.',
    builders: 'Salum, filho de Col-Hozé, governador de Mispá',
  },
  {
    title: 'O tanque de Siloé e o jardim do Rei',
    quote: '“Também fez os reparos do muro do tanque de Siloé, junto ao jardim do Rei…”',
    note: 'O túnel de Ezequias trazia a água da fonte de Giom até esta ponta da cidade (2Rs 20:20). O jardim real ficava mais abaixo, onde se encontram os vales do Cedrom e de Hinom. Séculos depois, Jesus mandou um cego se lavar neste tanque (Jo 9:7).',
    builders: 'Salum',
  },
  {
    title: 'Os degraus que descem da Cidade de Davi',
    quote: '“…até os degraus que descem da Cidade de Davi.”',
    note: 'Aqui o relato vira para o norte, pelo lado leste. Kenyon descobriu que o muro de depois do exílio seguia a crista da colina, bem acima do muro antigo da encosta, cujos terraços desmoronados Neemias não conseguiu atravessar com o seu animal (2:14).',
    builders: 'Salum',
  },
  {
    title: 'Em frente dos túmulos de Davi',
    quote: '“Além dele, Neemias, filho de Azbuque, governador de meio distrito de Bete-Zur, fez os reparos até em frente dos túmulos de Davi…”',
    note: 'É outro Neemias, governador de meio distrito de Bete-Zur. Davi foi sepultado na Cidade de Davi (1Rs 2:10). Na escavação de Weill de 1913–14 apareceram aqui túmulos em forma de túnel, cavados na rocha, que alguns propõem como os túmulos reais.',
    builders: 'Neemias, filho de Azbuque',
  },
  {
    title: 'O açude artificial',
    quote: '“…até o açude artificial…”',
    note: 'É um reservatório feito à mão, diferente do tanque de Siloé. Pode estar ligado às obras hidráulicas dos dias de Ezequias (Is 22:9–11). Não se sabe exatamente onde ficava.',
    builders: 'Neemias, filho de Azbuque',
  },
  {
    title: 'A casa dos soldados',
    quote: '“…e a casa dos soldados.”',
    note: 'Talvez o quartel dos guerreiros de Davi, os seus valentes (2Sm 23:8). Depois vieram os levitas com Reum, e então Hasabias e Binui, pelos seus distritos de Queila.',
    builders: 'Neemias, filho de Azbuque · levitas · Hasabias · Binui',
  },
  {
    title: 'A casa das armas',
    quote: '“…começando de um ponto que fica em frente da subida para a casa das armas, indo até a esquina do muro.”',
    note: 'Ézer, governador de Mispá, reparou outro trecho. Aqui o muro muda de direção, na “esquina”, uma dobra ou contraforte do seu traçado.',
    builders: 'Ézer, filho de Jesua, governador de Mispá',
  },
  {
    title: 'A casa de Eliasibe',
    quote: '“Depois dele Baruque, filho de Zabai, reparou com zelo outro trecho, desde a esquina do muro até a entrada da casa do sumo sacerdote Eliasibe.”',
    note: 'Depois de Baruque, Meremote trabalhou desde a entrada da casa de Eliasibe até o fim dela. Aqui morava o sumo sacerdote que tinha começado na porta das Ovelhas.',
    builders: 'Baruque, filho de Zabai · Meremote, filho de Urias',
  },
  {
    title: 'A esquina do muro',
    quote: '“Depois dele, Binui, filho de Henadade, reparou outro trecho, desde a casa de Azarias até a esquina do muro…”',
    note: 'Aqui trabalharam sacerdotes das redondezas, e depois Benjamim, Hassube e Azarias, cada um em frente da própria casa. Cada um guardava o seu próprio lar. Binui terminou na esquina.',
    builders: 'Sacerdotes das redondezas · Benjamim · Hassube · Azarias · Binui',
  },
  {
    title: 'A torre do palácio superior',
    quote: '“…a torre que sai do palácio superior, perto do pátio da guarda.”',
    note: 'Uma torre saía do antigo palácio real, perto do pátio da guarda onde Jeremias esteve preso (Jr 32:2). Eilat Mazar ligou grandes estruturas desta colina ao palácio e ao muro de Neemias. As duas propostas são discutidas.',
    builders: 'Palal, filho de Uzai · Pedaías, filho de Parós',
  },
  {
    title: 'Ofel e a porta das Águas',
    quote: '“…e os servos do templo que viviam na colina de Ofel fizeram os reparos até em frente da porta das Águas…”',
    note: 'Os servos do templo moravam em Ofel. Não se diz que a porta das Águas foi reparada. A obra só chegou até em frente dela, por isso ela aparece de pé, com as portas, como se não precisasse de reparo. Descia para a fonte de Giom. Mais tarde, Esdras leu a Lei na praça diante dela (8:1).',
    builders: 'Os servos do templo',
  },
  {
    title: 'A grande torre e o muro de Ofel',
    quote: '“Depois dele os homens de Tecoa repararam outro trecho, desde a grande torre até o muro de Ofel.”',
    note: 'O povo comum de Tecoa assumiu um segundo trecho, embora os seus nobres tivessem se recusado a trabalhar (3:5).',
    builders: 'Os homens de Tecoa',
  },
  {
    title: 'A porta dos Cavalos',
    quote: '“Acima da porta dos Cavalos, os sacerdotes fizeram os reparos, cada um em frente da sua própria casa.”',
    note: 'Não se registram portas, ferrolhos nem trancas para esta porta. Jeremias a situa a leste (Jr 31:40). Pode estar ligada à entrada dos cavalos no palácio (2Rs 11:16).',
    builders: 'Os sacerdotes',
  },
  {
    title: 'A porta Oriental',
    quote: '“Ao seu lado Semaías, filho de Secanias, o guarda da porta Oriental, fez os reparos.”',
    note: 'Zadoque, filho de Imer, reparou em frente da sua casa, e depois Semaías. Semaías é o guarda da porta, mas não se diz que a própria porta foi reconstruída. Dava para o Cedrom, a leste do templo.',
    builders: 'Zadoque, filho de Imer · Semaías · Hananias · Hanum · Mesulão',
  },
  {
    title: 'A porta da Inspeção',
    quote: '“Depois dele, Malquias, um ourives, fez os reparos do muro até a casa dos servos do templo e dos comerciantes, em frente da porta da Inspeção…”',
    note: 'O nome hebraico, Mifcade, quer dizer encontro, revista ou inspeção. Os reparos chegaram até a casa dos servos do templo e dos comerciantes, em frente dela. Não se mencionam as suas portas.',
    builders: 'Malquias, um ourives',
  },
  {
    title: 'O posto de vigia da esquina',
    quote: '“…até o posto de vigia da esquina…”',
    note: 'O hebraico diz literalmente “o quarto de cima da esquina” (no versículo 32 a NVI diz “a sala acima da esquina”), provavelmente uma sala de guarda na esquina nordeste, que dominava o Cedrom.',
    builders: 'Malquias, um ourives',
  },
  {
    title: 'De volta à porta das Ovelhas',
    quote: '“…e entre a sala acima da esquina e a porta das Ovelhas os ourives e os comerciantes fizeram os reparos.”',
    note: 'Os ourives e os comerciantes fecharam a última brecha, junto à porta onde o circuito começou. O muro está completo.',
    builders: 'Os ourives e os comerciantes',
  },
];
