// Brazilian Portuguese text for "The Tabernacle", merged over data.js (see addLanguage
// in ../../i18n.js). Same shape as data.js, text fields only. There is one version,
// the NVI (nvipt: the 2000 edition, as on Bible Gateway), so every field is a plain
// string. STOPS, TRIBES and LEVITES line up with data.js by position.
//
// Quotations are verbatim, including the 2000 edition's spelling ("pêlos",
// "cinqüenta"); the notes use today's spelling. The NVI turns cubits into
// metres in the text, so the notes give both.

// The NVI's words (Êxodo 25–40). It calls the boards "armações" and the bars
// "travessões" in chapters 26 and 36, but "molduras" and "vigas" in 40:18.
export const TERMS = {
  bases: 'bases',
  boards: 'armações',
  board: 'armação',
  bars: 'travessões',
  pillars: 'colunas',
  acacia: 'madeira de acácia',
  bronze: 'bronze',
  blue: 'azul',
  cover: 'tampa',
  ark: 'arca da aliança',
  veil: 'véu',
  lampstand: 'candelabro',
  laver: 'bacia',
  court: 'pátio',
  tent: 'Tenda do Encontro',
  clasps: 'colchetes',
  bread: 'pães da Presença',
  goatsHair: 'pelos de cabra',
  rams: 'peles de carneiro tingidas de vermelho',
  outer: 'couro',
  bezalel: 'Bezalel',
  oholiab: 'Aoliabe',
};

export const MATERIALS = {
  acacia: 'Madeira de acácia',
  gold: 'Ouro',
  silver: 'Prata',
  bronze: 'Bronze',
  linen: 'Linho fino',
  yarn: 'Azul, roxo e vermelho',
};

export const FEATURES = {
  ark: { name: 'Arca da aliança' },
  table: { name: 'Mesa' },
  lampstand: { name: 'Candelabro' },
  incense: { name: 'Altar de ouro' },
  veil: { name: 'Véu' },
  screen: { name: 'Cortina da entrada' },
  altar: { name: 'Altar de holocaustos' },
  laver: { name: 'Bacia' },
  gate: { name: 'Entrada do pátio' },
  holyPlace: { name: 'Lugar Santo' },
  mostHoly: { name: 'Lugar Santíssimo' },
  sinai: { name: 'Monte Sinai' },
};

export const TRIBES = [
  { name: 'Judá' }, { name: 'Issacar' }, { name: 'Zebulom' },
  { name: 'Rúben' }, { name: 'Simeão' }, { name: 'Gade' },
  { name: 'Efraim' }, { name: 'Manassés' }, { name: 'Benjamim' },
  { name: 'Dã' }, { name: 'Aser' }, { name: 'Naftali' },
];
export const LEVITES = [
  { name: 'Gersonitas' }, { name: 'Coatitas' }, { name: 'Meraritas' }, { name: 'Moisés, Arão e seus filhos' },
];

export const INTRO = {
  title: 'O deserto do Sinai',
  ref: 'Êxodo 25:8',
  quote: '“E farão um santuário para mim, e eu habitarei no meio deles.”',
  note: 'No monte, Deus mostrou a Moisés o modelo de um santuário que podia ser transportado (25:9, 40). Os capítulos 25–31 dão as instruções, e os capítulos 35–39 contam como o povo fez cada peça. No capítulo 40, Moisés armou tudo num só dia, numa ordem definida. Este passeio segue essa ordem, e cada peça é montada quando chegamos.',
  aside: 'Tudo está desenhado com as medidas do texto hebraico, em côvados (1 côvado ≈ 45 cm); a NVI as converte em metros. Onde o texto não dá medida nem posição, como no caso do candelabro e da bacia, o modelo é uma suposição modesta.',
};

export const FINALE = {
  title: 'A glória do Senhor',
  ref: 'Êxodo 40:34',
  quote: '“Então a nuvem cobriu a Tenda do Encontro, e a glória do Senhor encheu o tabernáculo.”',
  note: 'Moisés não podia entrar na Tenda do Encontro, porque a nuvem estava sobre ela (40:35). Daí em diante, a nuvem sobre o tabernáculo de dia, e o fogo nela de noite, mostravam a Israel quando partir e quando ficar (40:36–38).',
};

export const STOPS = [
  {
    title: 'As bases',
    quote: '“Assim, o tabernáculo foi armado no primeiro dia do primeiro mês do segundo ano.”',
    note: 'Quase um ano depois da saída do Egito, Moisés arma o tabernáculo, começando pelas bases. Debaixo de cada armação vão duas bases de prata: cem ao todo, contando as quatro que ficam debaixo das colunas do véu. Cada uma foi fundida com um talento de prata dado como preço do resgate pelos homens contados no recenseamento (30:11–16; 38:25–27). As cinco colunas da entrada ficam sobre bases de bronze (26:37).',
    size: 'Um talento cada, cerca de 35 kg · 100 de prata, 5 de bronze',
  },
  {
    title: 'As armações e os travessões',
    quote: '“Moisés armou o tabernáculo, colocou as bases em seus lugares, armou as molduras, colocou as vigas e levantou as colunas.”',
    note: 'Cada armação é de madeira de acácia revestida de ouro, com dez côvados de altura e um côvado e meio de largura (26:16, 29). Vinte ficam no lado sul, vinte no norte e seis no fundo, com mais duas nos cantos de trás (26:18–23). Cinco travessões de cada lado as mantêm unidas, e o travessão central vai de uma ponta à outra (26:26–28). Depois são levantadas as colunas: quatro para o véu e cinco para a entrada. Em 40:18, a NVI diz “molduras” e “vigas”.',
    size: 'Cada armação: 10 × 1½ côvados (4,5 × 0,7 m) · 48 ao todo',
    made: 'Os artesãos habilidosos (36:8, 20–38)',
  },
  {
    title: 'As cortinas',
    quote: '“Faça o tabernáculo com dez cortinas internas de linho fino trançado e de fios de tecidos azul, roxo e vermelho, e nelas mande bordar querubins.”',
    note: 'A rigor, “o tabernáculo” são estas dez cortinas de linho (26:1). Cada uma mede 28 côvados por 4. São costuradas em dois conjuntos de cinco, e cinquenta colchetes de ouro unem os dois conjuntos (26:3–6). Estendidas sobre as armações, formam o teto, e de dentro se veem lá em cima os querubins bordados.',
    size: 'Dez cortinas, cada uma de 28 × 4 côvados (12,6 × 1,8 m)',
    made: 'Os artesãos habilidosos (36:8–13)',
  },
  {
    title: 'A tenda e suas coberturas',
    quote: '“Depois estendeu a tenda sobre o tabernáculo e colocou a cobertura sobre ela, como o Senhor tinha ordenado.”',
    note: 'Sobre o linho vai uma tenda de onze cortinas de pelos de cabra, cada uma de 30 côvados por 4, unidas com colchetes de bronze; a sexta é dobrada em duas na frente (26:7–11). Por cima vão mais duas coberturas, de peles de carneiro tingidas de vermelho e de couro (26:14). O texto não dá as medidas dessas duas, por isso elas aparecem só sobre o teto. É a primeira das sete vezes em que o capítulo 40 diz que Moisés fez tudo como o Senhor tinha ordenado.',
    size: 'Pelos de cabra: onze cortinas, cada uma de 30 × 4 côvados (13,5 × 1,8 m)',
    made: 'Os artesãos habilidosos (36:14–19)',
  },
  {
    title: 'A arca',
    quote: '“Colocou também as tábuas da aliança na arca, fixou nela as varas, e pôs sobre ela a tampa.”',
    note: 'Uma caixa de madeira de acácia revestida de ouro puro por dentro e por fora, com uma moldura de ouro e quatro argolas de ouro para as varas (25:10–15). Dentro vão as duas tábuas de pedra (31:18). A tampa (tradicionalmente, o propiciatório) é de ouro puro, com dois querubins de ouro formando uma só peça com ela, um de frente para o outro, com as asas estendidas por cima (25:17–20). Deus prometeu encontrar-se ali com Moisés, entre os querubins (25:22).',
    size: '2½ × 1½ × 1½ côvados (1,1 × 0,7 × 0,7 m)',
  },
  {
    title: 'O véu',
    quote: '“Em seguida trouxe a arca para dentro do tabernáculo e pendurou o véu protetor, cobrindo a arca da aliança, como o Senhor tinha ordenado.”',
    note: 'O véu é de linho fino trançado e de fios azul, roxo e vermelho, com querubins bordados (26:31). Fica pendurado com ganchos de ouro em quatro colunas, debaixo dos colchetes (26:32–33), e separa o Lugar Santo do Lugar Santíssimo, um cubo de dez côvados de lado. Só o sumo sacerdote passava para o outro lado, uma vez por ano (Levítico 16).',
    size: 'Lugar Santíssimo: 10 × 10 × 10 côvados (4,5 m de lado)',
  },
  {
    title: 'A mesa',
    quote: '“Moisés colocou a mesa na Tenda do Encontro, no lado norte do tabernáculo, do lado de fora do véu, e sobre ela colocou os pães da Presença, diante do Senhor…”',
    note: 'De madeira de acácia revestida de ouro puro, com uma moldura de ouro, uma borda da largura de quatro dedos e argolas para as varas (25:23–28). Sobre ela ficavam sempre os pães da Presença diante do Senhor (25:30). Levítico 24:5–6 fala de doze pães, postos em duas fileiras de seis.',
    size: '2 × 1 × 1½ côvados (90 × 45 × 70 cm)',
  },
  {
    title: 'O candelabro',
    quote: '“Pôs o candelabro na Tenda do Encontro, em frente da mesa, no lado sul do tabernáculo, e colocou as lâmpadas diante do Senhor…”',
    note: 'Feito de um talento de ouro puro batido: uma haste central com três braços de cada lado, enfeitados com taças em forma de flor de amêndoa (25:31–39). Suas sete lâmpadas iluminam o espaço à frente dele (25:37), a única luz do Lugar Santo. O texto não dá a sua altura.',
    size: 'Altura não indicada · um talento de ouro, cerca de 35 kg',
  },
  {
    title: 'O altar de ouro',
    quote: '“Moisés também pôs o altar de ouro na Tenda do Encontro, diante do véu, e nele queimou incenso aromático…”',
    note: 'O altar do incenso: de madeira de acácia revestida de ouro puro, com pontas nos cantos, uma moldura de ouro e argolas para as varas (30:1–5). Fica diante do véu, em frente da arca que está atrás dele (30:6). Toda manhã e todo entardecer, quando se cuidava das lâmpadas, queimava-se incenso sobre ele (30:7–8).',
    size: '1 × 1 × 2 côvados (45 × 45 × 90 cm)',
  },
  {
    title: 'A cortina da entrada',
    quote: '“Pôs também a cortina à entrada do tabernáculo.”',
    note: 'O tabernáculo está voltado para o leste, com o fundo para o oeste (26:22). A entrada é fechada por uma cortina de linho fino trançado e de fios azul, roxo e vermelho, bordada, mas sem os querubins do véu (26:36). Fica pendurada com ganchos de ouro em cinco colunas revestidas de ouro, sobre bases de bronze (26:37).',
  },
  {
    title: 'O altar de holocaustos',
    quote: '“Montou o altar de holocaustos à entrada do tabernáculo, a Tenda do Encontro, e sobre ele ofereceu holocaustos e ofertas de cereal…”',
    note: 'Uma caixa oca, feita de tábuas de madeira de acácia revestidas de bronze, com uma ponta em forma de chifre em cada canto, uma grelha de bronze a meia altura, e argolas e varas para ser carregado (27:1–8). Fica ao ar livre, diante da entrada. O texto não diz a que distância da porta.',
    size: '5 × 5 × 3 côvados (2,3 × 2,3 × 1,4 m)',
  },
  {
    title: 'A bacia',
    quote: '“Colocou a bacia entre a Tenda do Encontro e o altar, e encheu-a de água; Moisés, Arão e os filhos deste usavam-na para lavar as mãos e os pés.”',
    note: 'De bronze, com uma base de bronze, feita com os espelhos das mulheres que serviam à entrada da Tenda do Encontro (38:8). Os sacerdotes se lavavam aqui sempre que entravam na tenda ou se aproximavam do altar (30:19–21). O texto não dá o tamanho nem a forma. Arão usa as vestes do sumo sacerdote (28:4–39): a túnica de linho fino; o manto azul, com pequenos sinos de ouro e romãs ao redor da borda; o colete sacerdotal, com uma pedra de ônix em cada ombro; o peitoral com doze pedras, uma para cada tribo; e o turbante de linho com o diadema de ouro. Seus filhos usam túnicas, cinturões e gorros (28:40).',
    size: 'Tamanho e forma não indicados',
  },
  {
    title: 'O pátio',
    quote: '“Finalmente, Moisés armou o pátio ao redor do tabernáculo e colocou a cortina à entrada do pátio. Assim, Moisés terminou a obra.”',
    note: 'Cem côvados por cinquenta, fechado por cortinas de linho fino trançado de cinco côvados de altura, em colunas com bases de bronze e ganchos e ligaduras de prata, presas com estacas de bronze e cordas (27:9–19; 35:18). A entrada, a leste, tem vinte côvados de largura e uma cortina de fios azul, roxo e vermelho (27:16). Sessenta colunas, a cinco côvados uma da outra, correspondem às quantidades dadas para cada lado.',
    size: '100 × 50 côvados (45 × 22,5 m)',
  },
];
