// Brazilian Portuguese text for "Solomon's Temple", merged over data.js (see addLanguage
// in ../../i18n.js). Same shape as data.js, text fields only. One version, the NVI
// (nvipt, the 2000 edition), so every field is a plain string. STOPS line up with
// data.js by position.
//
// Quotations are verbatim. The NVI gives every size in metres, so the notes give
// cubits with metres. Its words: the main room is the "átrio principal", the inner
// sanctuary the "santuário interno", the porch the "pórtico", the side chambers
// "salas laterais", cypress "pinho", olive wood "oliveira", palm trees
// "tamareiras", the Sea the "tanque de metal fundido" on twelve "touros", the
// stands "carrinhos" with their "pias". The bronze worker is Hurão (1 Reis 7:13),
// the king of Tyre Hirão (5:18).

export const TERMS = {
  house: 'templo',
  porch: 'pórtico',
  mainRoom: 'átrio principal',
  inner: 'santuário interno',
  cypress: 'pinho',
  olive: 'oliveira',
  bronze: 'bronze',
  court: 'pátio',
  hiram: 'Hurão',
  jachin: 'Jaquim',
  oxen: 'touros',
  stands: 'carrinhos',
  basins: 'pias',
  basin: 'pia',
  capitals: 'capitéis',
  lampstands: 'candelabros',
  veil: 'véu',
  blue: 'azul',
  ziv: 'zive',
};

export const MATERIALS = {
  stone: 'Pedra',
  cedar: 'Cedro',
  cypress: 'Pinho',
  olive: 'Oliveira',
  gold: 'Ouro',
  bronze: 'Bronze',
};

export const FEATURES = {
  mainRoom: { name: 'Átrio principal' },
  mostHoly: { name: 'Lugar Santíssimo' },
  porch: { name: 'Pórtico' },
  chambers: { name: 'Salas laterais' },
  stair: { name: 'Escada' },
  incense: { name: 'Altar de ouro' },
  cherubim: { name: 'Querubins' },
  innerDoors: { name: 'Portas do santuário interno' },
  veil: { name: 'Véu' },
  doors: { name: 'Portas do átrio principal' },
  lampstands: { name: 'Candelabros' },
  tables: { name: 'Mesas' },
  jachin: { name: 'Jaquim' },
  boaz: { name: 'Boaz' },
  sea: { name: 'O tanque de metal' },
  standsS: { name: 'Carrinhos' },
  standsN: { name: 'Carrinhos' },
  altar: { name: 'Altar de bronze' },
  innerCourt: { name: 'Pátio interno' },
  greatCourt: { name: 'Grande pátio' },
  cityOfDavid: { name: 'Cidade de Davi' },
  kidron: { name: 'Vale do Cedrom' },
  olives: { name: 'Monte das Oliveiras' },
};

export const INTRO = {
  title: 'Jerusalém, o monte Moriá',
  ref: '1 Reis 6:1',
  quote: '“Quatrocentos e oitenta anos depois que os israelitas saíram do Egito, no quarto ano do reinado de Salomão em Israel, no mês de zive, o segundo mês, ele começou a construir o templo do Senhor.”',
  note: 'Davi queria construir uma casa para o Senhor, mas Deus lhe disse que o seu filho a construiria (2 Samuel 7:12–13; 1 Reis 5:3–5). Salomão fez um acordo com Hirão, rei de Tiro, para obter cedro e pinho do Líbano, e os seus homens tiraram grandes blocos de pedra para os alicerces (5:6–18). Este passeio segue 1 Reis 6–7, com o que 2 Crônicas 3–4 acrescenta, e cada parte sobe quando chegamos.',
  aside: 'Tudo está desenhado com as medidas do texto hebraico, em côvados; a NVI as converte em metros. 2 Crônicas 3:3 diz que o côvado era “pela medida antiga”; aqui 1 côvado ≈ 45 cm. Onde o texto não dá medida nem posição, como a espessura das paredes ou os pátios, o modelo é uma suposição, e as notas dizem isso. As poucas pessoas estão aqui só para mostrar a escala.',
};

export const FINALE = {
  title: 'A palavra do Senhor a Salomão',
  ref: '1 Reis 6:13',
  quote: '“…viverei no meio dos israelitas e não abandonarei Israel, o meu povo.”',
  note: 'A palavra veio enquanto o templo era construído, e veio com uma condição: se Salomão seguisse os decretos de Deus, Deus cumpriria a sua promessa a Davi (6:11–12). Quando o templo foi dedicado, a nuvem o encheu, e os sacerdotes não podiam ficar para ministrar (8:10–11). Uns quatro séculos depois, os babilônios o incendiaram (2 Reis 25:9).',
};

export const STOPS = [
  {
    title: 'O monte Moriá',
    ref: '2 Crônicas 3:1',
    quote: '“Então Salomão começou a construir o templo do Senhor em Jerusalém, no monte Moriá, onde o Senhor havia aparecido a seu pai Davi, na eira de Araúna, o jebuseu, local que havia sido providenciado por Davi.”',
    note: 'Davi comprou esta eira no monte ao norte da sua cidade e construiu ali um altar quando a praga parou (2 Samuel 24:18–25; 1 Crônicas 21:18–22:1). Os alicerces foram lançados no mês de zive, no quarto ano de Salomão (6:37), pelo cálculo mais comum por volta de 966 a.C. Os grandes blocos de pedra tinham sido cortados e preparados pelos construtores de Salomão e de Hirão e pelos homens de Gebal (5:17–18).',
    size: 'O templo: 60 × 20 côvados por dentro (27 × 9 m)',
  },
  {
    title: 'O templo sobe',
    ref: '1 Reis 6:7',
    quote: '“Na construção do templo só foram usados blocos lavrados nas pedreiras, e não se ouviu no templo nenhum barulho de martelo, nem de talhadeira, nem de qualquer outra ferramenta de ferro durante a sua construção.”',
    note: 'Sessenta côvados de comprimento, vinte de largura e trinta de altura (6:2): o dobro do comprimento e da largura da tenda do tabernáculo, e o triplo da altura. A espessura das paredes não é dada; elas estão desenhadas com seis côvados na base, como as do templo de Ezequiel (Ezequiel 41:5), e se estreitam um côvado no segundo e no terceiro andar das salas laterais (veja a parada 5).',
    size: '60 × 20 × 30 côvados por dentro (27 × 9 × 13,5 m)',
  },
  {
    title: 'O pórtico',
    ref: '1 Reis 6:3',
    quote: '“O pórtico da entrada do santuário tinha a largura do templo, que era de nove metros, e avançava quatro metros e meio à frente do templo.”',
    note: 'Reis não dá a sua altura. Em 2 Crônicas 3:4 algumas traduções antigas dão vinte côvados e o texto hebraico 120; uma torre quatro vezes mais alta que o templo parece pouco provável, por isso ele está desenhado com vinte, como lê a NVI (“nove metros de altura”). Por dentro era revestido de ouro puro (2 Crônicas 3:4). Não se diz se a frente era aberta; está desenhada aberta.',
    size: '20 × 10 côvados (9 × 4,5 m)',
  },
  {
    title: 'As janelas',
    ref: '1 Reis 6:4',
    quote: '“Ele fez para o templo janelas com grades estreitas.”',
    note: 'As palavras hebraicas são incertas: molduras que se estreitam para dentro, ou janelas fechadas com grades. Só podiam estar no alto das paredes, acima das salas laterais. O número não é dado; há cinco de cada lado, todas no átrio principal. Elas não são mencionadas no santuário interno, e Salomão diria que o Senhor habitaria “numa nuvem escura” (8:12).',
    size: 'Número e medida não indicados',
  },
  {
    title: 'As salas laterais',
    ref: '1 Reis 6:6',
    quote: '“O andar inferior tinha dois metros e vinte e cinco centímetros de largura, o andar intermediário tinha dois metros e setenta centímetros e o terceiro andar tinha três metros e quinze centímetros. Ele fez saliências de apoio nas paredes externas do templo, de modo que não houve necessidade de perfurar as paredes.”',
    note: 'Três andares de salas rodeiam os lados e o fundo do templo (6:5), cada um com cinco côvados de altura, ligados a ele por vigas de cedro (6:10). A parede se estreita um côvado em cada andar, de modo que cada andar tem um côvado a mais de largura que o de baixo, e as suas vigas se apoiam na saliência. O número de salas e a espessura da parede de fora não são dados; o templo de Ezequiel tinha trinta salas em cada andar (Ezequiel 41:6).',
    size: 'Andares de 5, 6 e 7 côvados de largura, cada um com 5 de altura',
  },
  {
    title: 'A escada',
    ref: '1 Reis 6:8',
    quote: '“A entrada para o andar inferior ficava no lado sul do templo; uma escada conduzia até o andar intermediário e dali ao terceiro.”',
    note: 'O lado sul é a direita de quem olha para o leste a partir do templo. O texto hebraico diz que a porta dava para o andar do meio, o grego para o de baixo. A palavra para a escada é rara e pode significar uma escada em caracol ou alçapões com escadas de mão; não se diz onde ela ficava. Está desenhada como escada em caracol junto à porta, com a parede externa cortada.',
  },
  {
    title: 'O forro de cedro',
    ref: '1 Reis 6:9',
    quote: '“Assim ele construiu o templo e o terminou, fazendo-lhe um forro com vigas e tábuas de cedro.”',
    note: 'Os homens de Hirão e de Salomão cortaram o cedro no Líbano, levaram-no até o mar e o transportaram em jangadas pela costa (5:6–9). As vigas cobrem os vinte côvados do átrio principal. O teto está desenhado plano; não se fala de um parapeito. O pórtico e as salas laterais têm os seus próprios tetos.',
  },
  {
    title: 'Cedro por dentro',
    ref: '1 Reis 6:18',
    quote: '“O interior do templo era de cedro, com figuras entalhadas de frutos e flores abertas. Tudo era de cedro; não se via pedra alguma.”',
    note: 'Tábuas de cedro cobrem as paredes do chão até o teto, e o soalho é de tábuas de pinho (6:15). Aqui, e nas paradas que olham para dentro, a parede sul está cortada.',
  },
  {
    title: 'O santuário interno',
    ref: '1 Reis 6:16',
    quote: '“Separou nove metros na parte de trás do templo, fazendo uma divisão com tábuas de cedro, do chão ao teto, para formar dentro do templo o santuário interno, o Lugar Santíssimo.”',
    note: 'Um cubo de vinte côvados de lado (6:20), preparado para a arca da aliança (6:19). O templo tem trinta côvados de altura, por isso ou o piso era mais alto ou o teto mais baixo; está desenhado com o teto mais baixo. 2 Crônicas 3:9 fala de salas superiores revestidas de ouro, que podem ser o espaço de cima. O átrio principal, à frente, tem quarenta côvados de comprimento (6:17).',
    size: '20 × 20 × 20 côvados (9 m de lado)',
  },
  {
    title: 'Revestido de ouro',
    ref: '1 Reis 6:21',
    quote: '“Salomão cobriu o interior do templo de ouro puro, e estendeu correntes de ouro em frente do santuário interno, que também foi revestido de ouro.”',
    note: 'O templo todo é revestido de ouro, e também o altar de cedro do santuário interno (6:20–22), o altar do incenso que fica à frente (7:48). 2 Crônicas 3:6–8 acrescenta pedras preciosas, ouro de Parvaim e seiscentos talentos de ouro para o Lugar Santíssimo (a NVI diz “vinte e uma toneladas”). Não se diz como as correntes ficavam penduradas; estão desenhadas ao longo da frente da divisória.',
    size: 'Altar do incenso: medida não indicada',
  },
  {
    title: 'Os querubins',
    ref: '1 Reis 6:27',
    quote: '“Ele colocou os querubins, com as asas abertas, no santuário interno do templo. A asa de um querubim encostava numa parede, e a do outro encostava na outra. As suas outras asas encostavam uma na outra no meio do santuário.”',
    note: 'Dois querubins de madeira de oliveira, cada um com dez côvados de altura e asas de cinco côvados, da mesma medida e forma (6:23–26), revestidos de ouro (6:28). Ficavam em pé, de frente para o átrio principal (2 Crônicas 3:13). A sua aparência não é descrita, por isso estão desenhados como simples figuras aladas de pé. Na dedicação, a arca foi colocada debaixo das suas asas (8:6–7).',
    size: 'Cada um com 10 côvados de altura e 10 de uma ponta de asa à outra (4,5 m)',
  },
  {
    title: 'Querubins, tamareiras e flores',
    ref: '1 Reis 6:29',
    quote: '“Nas paredes ao redor do templo, tanto na parte interna como na externa, ele esculpiu querubins, tamareiras e flores abertas.”',
    note: 'Os pisos também são revestidos de ouro (6:30), e 2 Crônicas 3:5–7 acrescenta tamareiras e correntes sobre o ouro do átrio principal, e ouro nas vigas, nos batentes, nas paredes e nas portas. Não se descreve como os entalhes eram dispostos; estão desenhados em faixas, um querubim entre duas tamareiras, como no templo de Ezequiel (Ezequiel 41:18).',
  },
  {
    title: 'Portas de oliveira',
    ref: '1 Reis 6:32',
    quote: '“E nas duas portas de madeira de oliveira esculpiu querubins, tamareiras e flores abertas, e revestiu os querubins e as tamareiras de ouro batido.”',
    note: 'Os batentes do santuário interno eram “de cinco lados” (6:31), talvez uma moldura pontuda ou um quinto da largura da parede; a entrada está desenhada com quatro côvados de largura e o alto em ponta. As portas giravam sobre dobradiças de ouro (7:50). 2 Crônicas 3:14 fala também de um véu de tecido azul, roxo, vermelho e linho fino, com querubins; Reis só fala das portas. Os dois estão desenhados: as portas abertas e o véu atrás.',
    size: 'Largura da entrada: um quinto da parede?',
  },
  {
    title: 'As portas do átrio principal',
    ref: '1 Reis 6:33–34',
    quote: '“Também fez pilares de quatro lados, de madeira de oliveira para a entrada do templo. Fez também duas portas de pinho, cada uma com duas folhas que se articulavam por meio de dobradiças.”',
    note: 'Entalhadas com querubins, tamareiras e flores abertas, e revestidas de ouro batido ajustado aos entalhes (6:35). A entrada está desenhada com cinco côvados de largura, um quarto da parede; a altura não é dada. Cada porta se dobra em duas, de modo que a entrada pode se abrir em parte ou por inteiro.',
  },
  {
    title: 'O pátio interno',
    ref: '1 Reis 6:36',
    quote: '“E construiu o pátio interno com três camadas de pedra lavrada e uma de vigas de cedro.”',
    note: 'A medida não é dada; está desenhado com o dobro do comprimento e da largura do pátio do tabernáculo. Crônicas o chama de pátio dos sacerdotes, e em volta ficava o pátio principal, com portas revestidas de bronze (2 Crônicas 4:9), cercado da mesma maneira (7:12). No grande pátio ficava também o palácio de Salomão, que levou treze anos para ser construído (7:1); ele não é mostrado.',
    size: 'Não indicado · desenhado com 200 × 100 côvados (90 × 45 m)',
  },
  {
    title: 'Jaquim e Boaz',
    ref: '1 Reis 7:21',
    quote: '“Ele levantou as colunas na frente do pórtico do templo. Deu o nome de Jaquim à coluna ao sul e de Boaz à coluna ao norte.”',
    note: 'Hurão, um artífice em bronze de Tiro cuja mãe era da tribo de Naftali (7:13–14), fundiu duas colunas de dezoito côvados de altura e doze de circunferência. Sobre cada uma pôs um capitel de cinco côvados, com correntes entrelaçadas, duas fileiras de romãs, duzentas por capitel, e o formato de lírios em cima (7:15–22). 2 Crônicas 3:15 dá trinta e cinco côvados, que a NVI lê como as duas juntas. Não se diz se sustentavam alguma coisa; estão desenhadas soltas.',
    size: '18 côvados de altura, 12 de circunferência (8 m de altura, 1,7 m de diâmetro) · capitéis de 5 côvados',
    made: 'Hurão de Tiro (7:13–22)',
  },
  {
    title: 'O tanque de metal',
    ref: '1 Reis 7:23',
    quote: '“Fez o tanque de metal fundido, redondo, medindo quatro metros e meio de diâmetro e dois metros e vinte e cinco centímetros de altura. Era preciso um fio de treze metros e meio para medir a sua circunferência.”',
    note: 'Ele fica sobre doze touros, três voltados para cada lado, com as pernas traseiras para o centro (7:25), com duas fileiras de frutos fundidos abaixo da borda; tem quatro dedos de espessura, e a borda é como uma flor de lírio (7:24–26). Reis diz que cabiam 2.000 batos (a NVI diz quarenta mil litros), 2 Crônicas 4:5 diz 3.000 (sessenta mil). Servia para os sacerdotes se lavarem (2 Crônicas 4:6) e ficava no canto sudeste do templo (7:39).',
    size: '10 côvados de diâmetro, 5 de altura (4,5 × 2,3 m)',
    made: 'Hurão (7:23–26)',
  },
  {
    title: 'Os carrinhos e as pias',
    ref: '1 Reis 7:38',
    quote: '“Depois ele fez dez pias de bronze, cada uma com capacidade de oitocentos litros, medindo um metro e oitenta centímetros de diâmetro; uma pia para cada um dos dez carrinhos.”',
    note: 'Cada carrinho mede quatro côvados de lado e três de altura, com placas de leões, bois e querubins e grinaldas, sobre quatro rodas de bronze como as de um carro, de um côvado e meio de altura (7:27–37). Cinco ficam no lado sul do templo e cinco no lado norte (7:39). Nas pias era lavado o que se usava nos holocaustos (2 Crônicas 4:6). Não está claro como elas se apoiavam nos carrinhos.',
    size: 'Carrinhos de 4 × 4 × 3 côvados · pias de 4 côvados de diâmetro',
    made: 'Hurão (7:27–39)',
  },
  {
    title: 'O altar de bronze',
    ref: '2 Crônicas 4:1',
    quote: '“Salomão também mandou fazer um altar de bronze de nove metros de comprimento, nove metros de largura e quatro metros e meio de altura.”',
    note: 'Reis não o inclui na lista, mas o chama de “o altar de bronze diante do Senhor” (8:64). Não se diz como os sacerdotes subiam; os altares não deviam ter degraus (Êxodo 20:26), por isso eles não estão desenhados. Todo o bronze foi fundido em moldes de barro na planície do Jordão, entre Sucote e Zaretã, e era tanto que não foi pesado (7:46–47).',
    size: '20 × 20 × 10 côvados (9 × 9 × 4,5 m)',
  },
  {
    title: 'Os utensílios de ouro',
    ref: '1 Reis 7:48–49',
    quote: '“Além desses, Salomão mandou fazer também estes outros utensílios para o templo do Senhor: O altar de ouro; a mesa de ouro sobre a qual ficavam os pães da Presença; os candelabros de ouro puro, cinco à direita e cinco à esquerda, em frente do santuário interno…”',
    note: 'Reis fala de uma mesa; 2 Crônicas 4:7–8 de dez mesas e dez candelabros, cinco de cada lado, feitos de acordo com as especificações. Estão desenhadas dez mesas, com os pães em cima (2 Crônicas 4:19), e candelabros como os do tabernáculo (Êxodo 25:31–37). As medidas não são dadas. Com eles foram feitos bacias, cortadores de pavio, tigelas e incensários de ouro (7:50).',
  },
  {
    title: 'Sete anos',
    ref: '1 Reis 6:38',
    quote: '“No mês de bul, o oitavo mês, do décimo primeiro ano, o templo foi terminado em todos os seus detalhes, de acordo com as suas especificações. Salomão levou sete anos para construí-lo.”',
    note: 'Terminada toda a obra, Salomão trouxe a prata, o ouro e os utensílios que o seu pai Davi tinha consagrado e os colocou junto com os tesouros do templo do Senhor (7:51). A arca foi levada para dentro na dedicação, na festa do sétimo mês (8:1–6).',
  },
];
