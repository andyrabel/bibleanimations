// Brazilian Portuguese text for "The Day of Atonement", merged over data.js (see
// addLanguage in ../../i18n.js). Same shape as data.js, text fields only. One version,
// the NVI (nvipt, the 2000 edition), so every field is a plain string. STOPS line
// up with data.js by position.
//
// Quotations are verbatim, with the 2000 edition's spelling ("iniqüidades",
// "assembléia"). The NVI's words in Levítico 16: "bodes", "novilho", "véu",
// "tampa", "calções", "cinto", "propiciação", and the second lot is "para Azazel".

export const TERMS = {
  tunic: 'túnica',
  undergarments: 'calções de linho',
  sash: 'cinto',
  turban: 'turbante',
  laver: 'bacia',
  tent: 'Tenda do Encontro',
  veil: 'véu',
  cover: 'tampa',
  bull: 'novilho',
  firepan: 'incensário',
  household: 'família',
  blue: 'azul',
  liveGoat: 'bode vivo',
  manReady: 'Um homem designado para isso',
  bathePlace: 'num lugar sagrado',
  glory: 'que lhe confiram dignidade e honra',
  humble: 'se humilhar',
  onceAYear: 'uma vez por ano',
  sabbath: 'um sábado de descanso',
};

export const ATONE = {
  self: 'Arão e sua família',
  sanctuary: 'O Lugar Santíssimo',
  tent: 'A Tenda do Encontro',
  altar: 'O altar',
  people: 'O povo',
};

export const WEARING = {
  linen: 'As vestes sagradas de linho: a túnica, os calções, o cinto e o turbante (16:4)',
  glory: 'As vestes do sumo sacerdote (16:24; Êxodo 28)',
};

export const LABELS = {
  aaron: { name: 'Arão' },
  man: { name: 'O homem designado' },
  bull: { name: 'Novilho' },
  ramA: { name: 'O carneiro de Arão' },
  ramP: { name: 'O carneiro do povo' },
  goatL: { name: 'Bode', after: { name: 'Bode para o Senhor' } },
  goatS: { name: 'Bode', after: { name: 'Bode para Azazel' } },
  laver: { name: 'Bacia' },
  altar: { name: 'Altar' },
  cover: { name: 'Tampa' },
  veil: { name: 'Véu' },
  firepan: { name: 'Incensário' },
  outside: { name: 'Fora do acampamento' },
  wilderness: { name: 'O deserto' },
};

export const INTRO = {
  title: 'O Dia da Expiação',
  ref: 'Levítico 16:2',
  quote: '“Diga a seu irmão Arão que não entre a toda hora no Lugar Santíssimo, atrás do véu, diante da tampa da arca, para que não morra; pois aparecerei na nuvem, acima da tampa.”',
  note: 'Depois que Nadabe e Abiú, filhos de Arão, morreram por oferecer um fogo que o Senhor não tinha ordenado (16:1; 10:1–2), o Senhor disse a Moisés como Arão podia entrar atrás do véu e viver. Uma vez por ano, no décimo dia do sétimo mês (16:29, 34), o sumo sacerdote fazia propiciação por si mesmo e por sua família, pelo Lugar Santíssimo, pela Tenda do Encontro e pelo altar, e por todo o povo. Este passeio segue Levítico 16 passo a passo.',
  aside: 'As medidas estão em côvados (1 côvado ≈ 45 cm), e o tabernáculo é o mesmo das outras animações. Levítico 16 dá a ordem, mas não todos os detalhes, como onde Arão se banhou, o que eram as sortes ou como o sangue era levado; as notas dizem onde algo é uma suposição. A morte dos animais não é mostrada: eles se deitam no chão.',
};

export const FINALE = {
  title: 'Uma vez por ano',
  ref: 'Levítico 16:30',
  quote: '“Porquanto nesse dia se fará propiciação por vocês, para purificá-los. Então, perante o Senhor, vocês estarão puros de todos os seus pecados.”',
  note: 'Todos os anos, no décimo dia do sétimo mês, todo Israel, tanto o natural da terra como o estrangeiro, devia se humilhar e não fazer trabalho algum: um sábado de descanso (16:29–31). Os sacerdotes ungidos depois de Arão fariam o mesmo, com as vestes de linho (16:32–33), uma vez por ano (16:34). Hebreus 9 lembra este dia, em que só o sumo sacerdote entrava no lugar interior, uma vez por ano, e nunca sem sangue (9:7).',
};

export const STOPS = [
  {
    title: 'As vestes sagradas de linho',
    ref: 'Levítico 16:4',
    quote: '“Ele vestirá a túnica sagrada de linho, com calções também de linho por baixo; porá o cinto de linho na cintura e também o turbante de linho. Essas vestes são sagradas; por isso ele se banhará com água antes de vesti-las.”',
    note: 'Neste dia Arão não usa as suas vestes de ouro, azul, roxo e vermelho, mas linho simples: a túnica sobre os calções, o cinto e o turbante (16:4). Ele se banha antes de vesti-las. O texto não diz onde nem como; aqui ele joga água sobre si junto à bacia, onde os sacerdotes se lavavam (Êxodo 30:18–21).',
    where: 'Junto à bacia',
  },
  {
    title: 'As ofertas',
    ref: 'Levítico 16:5',
    quote: '“Receberá da comunidade de Israel dois bodes como oferta pelo pecado e um carneiro como holocausto.”',
    note: 'Arão traz as suas próprias ofertas, um novilho pelo pecado e um carneiro como holocausto (16:3), e o povo dá dois bodes e um carneiro. O novilho faz propiciação por Arão e sua família (16:6); os bodes são pelo povo (16:15). Aqui eles entram pela porta do pátio e esperam ao norte do altar, onde as ofertas eram mortas (1:11; 4:24).',
    where: 'O pátio, ao norte do altar',
  },
  {
    title: 'As sortes',
    ref: 'Levítico 16:8',
    quote: '“E lançará sortes quanto aos dois bodes: uma para o Senhor e a outra para Azazel.”',
    note: 'Os dois bodes são apresentados ao Senhor à entrada da Tenda do Encontro (16:7). As sortes decidem qual é oferecido pelo pecado e qual fica vivo, para ser enviado ao deserto (16:9–10). Azazel é uma palavra hebraica de sentido discutido. O texto não diz o que eram as sortes nem como eram lançadas; aqui são duas pedras simples jogadas diante dos bodes.',
    where: 'Diante da entrada da Tenda do Encontro',
  },
  {
    title: 'O novilho por si mesmo',
    ref: 'Levítico 16:11',
    quote: '“Arão trará o novilho como oferta por seu próprio pecado para fazer propiciação por si mesmo e por sua família, e ele o oferecerá como sacrifício pelo seu próprio pecado.”',
    note: 'Antes de fazer propiciação por qualquer outro, Arão a faz por si mesmo e por sua família. O novilho é morto ao norte do altar (1:11; 4:24); aqui ele se deita no chão, e o seu sangue é guardado numa bacia ao lado. O texto não diz em que recipiente; o altar tinha bacias de bronze para a aspersão (Êxodo 27:3).',
    where: 'Ao norte do altar',
  },
  {
    title: 'Brasas do altar',
    ref: 'Levítico 16:12',
    quote: '“Pegará o incensário cheio de brasas do altar que está perante o Senhor e dois punhados de incenso aromático em pó, e os levará para trás do véu.”',
    note: 'As brasas vêm do altar do pátio, cujo fogo nunca devia se apagar (6:12–13). O incenso é a mistura sagrada de Êxodo 30:34–38, moída fina. O incensário não é descrito; os utensílios do altar eram de bronze (Êxodo 27:3), por isso este também é, e Arão leva o incenso na outra mão.',
    where: 'Junto ao altar',
  },
  {
    title: 'A fumaça sobre a tampa',
    ref: 'Levítico 16:13',
    quote: '“Porá o incenso no fogo perante o Senhor, e a fumaça do incenso cobrirá a tampa que está acima das tábuas da aliança, a fim de que não morra.”',
    note: 'Atrás do véu há só a arca, com a tampa e os seus dois querubins por cima (Êxodo 25:17–22). Ali o Senhor disse que apareceria na nuvem (16:2). A fumaça do incenso esconde a tampa dos olhos de Arão. Ninguém mais pode estar na Tenda do Encontro enquanto ele está lá dentro (16:17). O texto não diz o que ele fez com o incensário; aqui ele o deixa no chão diante da arca.',
    where: 'Atrás do véu',
  },
  {
    title: 'O sangue do novilho',
    ref: 'Levítico 16:14',
    quote: '“Pegará um pouco do sangue do novilho e com o dedo o aspergirá sobre a parte da frente da tampa; depois, com o dedo aspergirá o sangue sete vezes, diante da tampa.”',
    note: 'Arão sai para buscar o sangue do seu novilho e o leva para trás do véu. Com o dedo, ele o asperge na frente da tampa, o lado leste, voltado para ele, e sete vezes diante dela. O texto não dá um número para a primeira aspersão (aqui é uma) nem diz como o sangue era levado.',
    where: 'Atrás do véu',
  },
  {
    title: 'O bode pelo povo',
    ref: 'Levítico 16:15',
    quote: '“Então sacrificará o bode da oferta pelo pecado, em favor do povo, e trará o sangue para trás do véu; fará com o sangue o que fez com o sangue do novilho…”',
    note: 'O bode sobre o qual caiu a sorte para o Senhor é morto, e o seu sangue é aspergido como o do novilho, sobre a tampa e na frente dela. Assim Arão faz propiciação pelo Lugar Santíssimo, por causa das impurezas e das rebeliões de Israel, e faz o mesmo pela Tenda do Encontro, que está entre eles (16:16). Ninguém pode estar na Tenda do Encontro até que ele saia (16:17).',
    where: 'Atrás do véu',
  },
  {
    title: 'As pontas do altar',
    ref: 'Levítico 16:18',
    quote: '“Depois irá ao altar que está perante o Senhor e pelo altar fará propiciação. Pegará um pouco do sangue do novilho e do sangue do bode e o porá em todas as pontas do altar.”',
    note: 'Arão põe o sangue dos dois em cada uma das quatro pontas e depois o asperge sete vezes sobre o altar com o dedo, para purificá-lo e santificá-lo das impurezas dos israelitas (16:19). Discute-se de que altar se trata: as pontas do altar de ouro do incenso também eram purificadas com sangue uma vez por ano (Êxodo 30:10). Aqui é o altar do pátio, pois Arão sai até ele.',
    where: 'Junto ao altar',
  },
  {
    title: 'O bode vivo',
    ref: 'Levítico 16:20–21',
    quote: '“…trará para a frente o bode vivo. Então colocará as duas mãos sobre a cabeça do bode vivo e confessará todas as iniqüidades e rebeliões dos israelitas, todos os seus pecados, e os porá sobre a cabeça do bode.”',
    note: 'Quando o Lugar Santíssimo, a Tenda do Encontro e o altar já foram purificados, Arão traz o bode vivo, que esteve vivo diante do Senhor (16:10, 20). Com as duas mãos sobre a cabeça dele, confessa sobre ele todos os pecados de Israel e os põe sobre a cabeça do animal.',
    where: 'Diante da entrada da Tenda do Encontro',
  },
  {
    title: 'Para o deserto',
    ref: 'Levítico 16:22',
    quote: '“O bode levará consigo todas as iniqüidades deles para um lugar solitário. E o homem soltará o bode no deserto.”',
    note: 'Um homem designado para isso leva o bode (16:21), para fora do pátio, através do acampamento e até o deserto, e o solta. Ele deve lavar as roupas e se banhar antes de voltar ao acampamento (16:26). Não se diz para onde o levou; aqui ele vai para o leste.',
    where: 'Pelo acampamento, rumo ao deserto',
  },
  {
    title: 'Deixa as vestes de linho',
    ref: 'Levítico 16:23',
    quote: '“Depois Arão entrará na Tenda do Encontro, tirará as vestes de linho que usou para entrar no Santo dos Santos e as deixará ali.”',
    note: 'Arão volta à Tenda do Encontro e tira as vestes de linho que usou atrás do véu. Elas ficam na tenda; o texto não diz o que se fazia com elas. Aqui ficam dobradas junto à parede.',
    where: 'Na Tenda do Encontro',
  },
  {
    title: 'As suas próprias vestes',
    ref: 'Levítico 16:24',
    quote: '“Ele se banhará com água num lugar sagrado e vestirá as suas próprias roupas.”',
    note: 'Ele se banha de novo (o texto diz só “num lugar sagrado”, por isso isso não é mostrado) e veste as vestes do sumo sacerdote, feitas para lhe conferir “dignidade e honra” (Êxodo 28:2): a túnica e o cinto, o manto azul com os seus sinos, o colete sacerdotal com as pedras de ônix, o peitoral com as doze pedras, e o turbante com a lâmina de ouro.',
    where: 'Na Tenda do Encontro',
  },
  {
    title: 'Os holocaustos',
    ref: 'Levítico 16:24',
    quote: '“Então sairá e sacrificará o holocausto por si mesmo e o holocausto pelo povo, para fazer propiciação por si mesmo e pelo povo.”',
    note: 'Arão sai e oferece em holocausto os dois carneiros, o seu e o do povo (16:3, 5), que eram queimados inteiros sobre o altar (1:9). Também queima ali a gordura das ofertas pelo pecado (16:25).',
    where: 'Junto ao altar',
  },
  {
    title: 'Fora do acampamento',
    ref: 'Levítico 16:27',
    quote: '“O novilho e o bode da oferta pelo pecado, cujo sangue foi trazido ao Lugar Santíssimo para fazer propiciação, serão levados para fora do acampamento; o couro, a carne e o excremento deles serão queimados com fogo.”',
    note: 'Uma oferta pelo pecado cujo sangue foi levado ao santuário não é comida pelos sacerdotes (6:30): é queimada fora do acampamento. Quem a queima deve lavar as roupas e se banhar antes de voltar ao acampamento (16:28). O texto não diz em que lugar fora do acampamento; aqui é além das tendas do leste.',
    where: 'Fora do acampamento',
  },
];
