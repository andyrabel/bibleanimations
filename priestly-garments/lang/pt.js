// Brazilian Portuguese text for "The Priestly Garments", merged over data.js (see
// addLanguage in ../../i18n.js). Same shape as data.js, text fields only. One version,
// the NVI (nvipt, the 2000 edition), so every field is a plain string. STOPS and
// STONES line up with data.js by position.
//
// Quotations are verbatim. The NVI's names: the ephod is the "colete sacerdotal",
// the sash the "cinto" (Levítico 8) or "cinturão" (Êxodo 28:39), the ephod's band
// the "cinturão" of the ephod, the plate the "lâmina de ouro" (Lv 8:9) or
// "diadema" (Êx 28:36), the caps "gorros". In Levítico 8:6 the NVI has Moses
// have them bathe ("mandou-os banhar-se"); the Hebrew says he washed them.

export const TERMS = {
  tunic: 'túnica',
  sash: 'cinto',
  band: 'cinturão do colete',
  ephod: 'colete sacerdotal',
  breastpiece: 'peitoral',
  turban: 'turbante',
  plate: 'lâmina de ouro',
  crown: 'coroa sagrada',
  caps: 'gorros',
  undergarments: 'calções de linho',
  urim: 'Urim e Tumim',
  ithamar: 'Itamar',
  blue: 'azul',
  colours: 'azul, roxo e vermelho',
  laver: 'bacia',
  tent: 'Tenda do Encontro',
  glory: 'para conferir-lhes honra e dignidade',
  holy: 'Consagrado ao Senhor',
};

export const MATERIALS = {
  linen: 'Linho fino',
  yarn: 'Azul, roxo e vermelho',
  gold: 'Ouro',
  stones: 'Pedras preciosas',
};

export const PARTS = {
  tunic: { name: 'Túnica' },
  sash: { name: 'Cinto' },
  robe: { name: 'Manto' },
  ephod: { name: 'Colete sacerdotal' },
  onyx: { name: 'Pedras de ônix' },
  band: { name: 'Cinturão do colete' },
  breastpiece: { name: 'Peitoral' },
  urim: { name: 'Urim e Tumim' },
  turban: { name: 'Turbante' },
  plate: { name: 'Lâmina de ouro' },
};

export const PEOPLE = {
  aaron: { name: 'Arão' },
  moses: { name: 'Moisés' },
  nadab: { name: 'Nadabe' },
  abihu: { name: 'Abiú' },
  eleazar: { name: 'Eleazar' },
  ithamar: { name: 'Itamar' },
};

// Êxodo 28:17–20 in the NVI, row by row.
export const STONES = [
  { name: 'rubi' }, { name: 'topázio' }, { name: 'berilo' },
  { name: 'turquesa' }, { name: 'safira' }, { name: 'diamante' },
  { name: 'jacinto' }, { name: 'ágata' }, { name: 'ametista' },
  { name: 'crisólito' }, { name: 'ônix' }, { name: 'jaspe' },
];

export const INTRO = {
  title: 'Vestes sagradas',
  ref: 'Êxodo 28:2',
  quote: '“Para o seu irmão Arão, faça vestes sagradas que lhe confiram dignidade e honra.”',
  note: 'Deus mandou Moisés fazer vestes para Arão e seus filhos, para que o servissem como sacerdotes (28:1–4). Êxodo 28 descreve cada peça, e Êxodo 39 conta como foram feitas. Em Levítico 8, à entrada da Tenda do Encontro, com toda a comunidade reunida, Moisés lavou Arão e o vestiu, peça por peça. Este passeio segue essa ordem.',
  aside: 'As medidas estão em côvados (1 côvado ≈ 45 cm) quando o texto as dá. A maioria das formas e dos comprimentos não é dada, por isso são uma suposição modesta; as notas dizem onde.',
};

export const FINALE = {
  title: 'Honra e dignidade',
  ref: 'Levítico 8:13',
  quote: '“Trouxe então os filhos de Arão à frente, vestiu-os com suas túnicas e cintos, e colocou-lhes gorros, conforme o Senhor lhe havia ordenado.”',
  note: 'Entre vestir Arão e vestir os seus filhos, Moisés ungiu o tabernáculo e tudo o que nele havia, e derramou o óleo da unção sobre a cabeça de Arão (8:10–12). As vestes dos filhos também foram feitas “para conferir-lhes honra e dignidade” (Êx 28:40). Durante sete dias os sacerdotes ficaram à entrada da Tenda do Encontro, até completar a sua ordenação (8:33–35).',
};

export const STOPS = [
  {
    title: 'A lavagem',
    ref: 'Levítico 8:6',
    quote: '“…e levou Arão e seus filhos à frente e mandou-os banhar-se com água…”',
    note: 'Moisés leva Arão e seus quatro filhos, Nadabe, Abiú, Eleazar e Itamar (Êxodo 28:1), até a bacia, entre a Tenda do Encontro e o altar; o hebraico diz que Moisés os lavou. Os sacerdotes lavavam ali as mãos e os pés sempre que entravam para ministrar (30:19–21; 40:31–32). O texto não diz como se tirava a água; aqui Moisés a derrama com um jarro, primeiro sobre as mãos de cada um e depois sobre os pés. Por baixo de tudo, os sacerdotes usavam calções de linho, da cintura até a coxa (28:42–43).',
    made: 'Os artesãos (39:28)',
  },
  {
    title: 'A túnica',
    ref: 'Levítico 8:7',
    quote: '“…pôs a túnica em Arão…”',
    note: 'Primeiro vem a túnica, sobre os calções. É de linho fino, tecida (28:39); em 28:4 a NVI a chama de “túnica bordada”. O comprimento e as mangas não são descritos; aqui ela vai até os tornozelos. Foram tecidas túnicas iguais para os filhos de Arão (39:27).',
    size: 'Não indicado',
    made: 'Os tecelões (39:27)',
  },
  {
    title: 'O cinto',
    ref: 'Levítico 8:7',
    quote: '“…colocou-lhe o cinto…”',
    note: 'De linho fino trançado e de fios azul, roxo e vermelho, obra de bordador (28:39; 39:29). O texto não diz o comprimento nem como era amarrado; aqui ele rodeia a cintura, e as pontas caem na frente. O manto vai por cima.',
    size: 'Não indicado',
    made: 'Os bordadores (39:29)',
  },
  {
    title: 'O manto',
    ref: 'Levítico 8:7',
    quote: '“…e o manto…”',
    note: 'O manto do colete sacerdotal é todo de fio azul, tecido numa peça só, com uma abertura para a cabeça reforçada por uma dobra tecida, como uma gola, para que não se rasgasse (28:31–32; 39:22–23). Em volta da borda de baixo há romãs de fios azul, roxo e vermelho, alternadas com pequenos sinos de ouro (28:33–34). O som dos sinos devia ser ouvido quando Arão entrava no Lugar Santo e quando saía, para que não morresse (28:35). O comprimento e o número não são dados: aqui o manto chega à canela, com 18 de cada.',
    size: 'Não indicado',
    made: 'Os tecelões (39:22–26)',
  },
  {
    title: 'O colete sacerdotal',
    ref: 'Levítico 8:7',
    quote: '“…e pôs sobre ele o colete sacerdotal; depois a ele prendeu o manto sacerdotal com o cinturão…”',
    note: 'De linho fino trançado, fios de ouro e fios azul, roxo e vermelho, trabalho artesanal (28:6); o ouro foi batido em placas finas e cortado em fios (39:3). Duas ombreiras o unem na frente e atrás, e o cinturão é da mesma peça (28:7–8). Em cada ombro, uma pedra de ônix presa em ouro traz gravados seis nomes dos filhos de Israel, por ordem de nascimento, para que Arão leve os seus nomes diante do Senhor (28:9–12). A forma não é dada; aqui ele cobre o corpo do peito aos quadris. Em 8:7 a NVI chama o colete de “manto sacerdotal”.',
    made: 'Os artesãos (39:2–7)',
  },
  {
    title: 'O peitoral',
    ref: 'Levítico 8:8',
    quote: '“…colocou também o peitoral…”',
    note: 'Feito como o colete sacerdotal e dobrado num quadrado de um palmo de lado (28:15–16). Tem doze pedras em quatro fileiras, cada uma presa em ouro e gravada com o nome de uma das tribos, para que Arão leve os seus nomes sobre o coração (28:17–21, 29). Correntes de ouro prendem os cantos de cima às filigranas dos ombros, e um cordão azul amarra as argolas de baixo ao colete, logo acima do cinturão, para que não se solte (28:22–28). O texto não dá a ordem dos nomes; aqui ela segue a ordem de nascimento.',
    size: 'Um palmo de lado, uns 22 cm, dobrado',
    made: 'Os artesãos (39:8–21)',
  },
  {
    title: 'O Urim e o Tumim',
    ref: 'Levítico 8:8',
    quote: '“…e nele pôs o Urim e o Tumim…”',
    note: 'Ficam dentro do peitoral dobrado, para que estejam sobre o coração de Arão quando ele entra na presença do Senhor (28:30). Por meio deles o sacerdote buscava as decisões do Senhor para Israel (Números 27:21). O texto nunca diz de que eram feitos nem como eram, por isso aqui são só duas formas simples dentro da bolsa.',
    size: 'Não descritos',
  },
  {
    title: 'O turbante',
    ref: 'Levítico 8:9',
    quote: '“…e colocou o turbante na cabeça de Arão…”',
    note: 'De linho fino (28:39; 39:28). A forma não é descrita; aqui é um pano comprido enrolado em volta da cabeça. Os filhos de Arão usavam gorros (28:40).',
    size: 'Não indicado',
    made: 'Os artesãos (39:28)',
  },
  {
    title: 'A lâmina de ouro',
    ref: 'Levítico 8:9',
    quote: '“…com a lâmina de ouro, isto é, a coroa sagrada, na frente do turbante, conforme o Senhor tinha ordenado a Moisés.”',
    note: 'De ouro puro, com as palavras “Consagrado ao Senhor” gravadas como num selo (28:36; 39:30), aqui em hebraico. Uma fita azul a prende na frente do turbante (28:37), de modo que ela fica sobre a testa de Arão: ele leva a culpa das ofertas sagradas que Israel apresenta, para que sejam aceitas pelo Senhor (28:38). O tamanho não é dado.',
    size: 'Não indicado',
    made: 'Os artesãos (39:30–31)',
  },
];
