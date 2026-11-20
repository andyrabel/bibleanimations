// Brazilian Portuguese text for "The Dedication of the Wall", merged over data.js (see
// addLanguage in ../../i18n.js). Same shape as data.js, text fields only. One version,
// the NVI (nvipt, the 2000 edition), so every field is a plain string. STOPS line
// up with data.js by position. The city's names come from ../nehemiahs-wall/lang/pt.js.
//
// Quotations are verbatim. In 12:38 the NVI has "a porta Larga" where the other
// versions have the Broad Wall (the city's label, from Neemias 3:8, is "Muro Largo").

export const GATES = {
  ephraim: { name: 'Porta de Efraim' },
  guard: { name: 'Porta da Guarda' },
};

export const INSTRUMENTS = {
  cymbals: 'Címbalos',
  harps: 'Harpas',
  lyres: 'Liras',
  trumpets: 'Trombetas',
  david: 'Instrumentos de Davi',
};

export const PEOPLE = {
  ezra: { name: 'Esdras' },
  nehemiah: { name: 'Neemias' },
  choir1: { name: 'O primeiro coro' },
  choir2: { name: 'O segundo coro' },
};

export const INTRO = {
  title: 'Jerusalém, 445 a.C.',
  ref: 'Neemias 12:27–43',
  quote: '“…para celebrarem a dedicação alegremente, com cânticos e ações de graças, ao som de címbalos, harpas e liras.” (12:27)',
  note: 'O muro está pronto, em cinquenta e dois dias (6:15). Neemias 12 conta como ele foi dedicado: dois grandes coros percorreram o alto do muro em sentidos opostos e se encontraram no templo de Deus. Este passeio os acompanha.',
  aside: 'A data não é dada, só que foi depois de o muro ficar pronto, em 445 a.C. A cidade é a mesma reconstrução de “O muro de Neemias”, e as posições são aproximadas.',
};

export const FINALE = {
  title: 'A alegria de Jerusalém',
  ref: 'Neemias 12:43',
  quote: '“…e os sons da alegria de Jerusalém podiam ser ouvidos de longe.”',
  note: 'Uns 140 anos depois de os babilônios derrubarem os muros (2Rs 25:10), a cidade volta a ter muro, e o som da sua alegria atravessa o Cedrom até o monte das Oliveiras.',
};

export const STOPS = [
  {
    title: 'Os levitas são procurados',
    quote: '“Por ocasião da dedicação dos muros de Jerusalém, os levitas foram procurados e trazidos de onde moravam para Jerusalém…”',
    note: 'Os levitas moravam em cidades por todo Judá (11:20, 36), e os cantores tinham construído povoados ao redor de Jerusalém: Netofá ao sul, Geba e Azmavete ao norte, e Bete-Gilgal. O texto não diz onde a procissão começou. A porta do Vale, no meio do lado oeste, serve aos dois percursos, por isso eles se reúnem aqui.',
    who: 'Os levitas · os cantores',
  },
  {
    title: 'O povo, as portas e os muros são purificados',
    quote: '“Os sacerdotes e os levitas se purificaram cerimonialmente, e depois purificaram também o povo, as portas e os muros.”',
    note: 'O texto não diz como. Quando os levitas foram separados pela primeira vez, foram aspergidos com água e lavaram as roupas (Nm 8:7, 21), e na Páscoa depois da reconstrução do templo os sacerdotes e os levitas se purificaram juntos (Ed 6:20). A luz que percorre o muro só mostra o que está sendo purificado.',
    who: 'Os sacerdotes e os levitas',
  },
  {
    title: 'No alto do muro',
    quote: '“Ordenei aos líderes de Judá que subissem ao alto do muro. Também designei dois grandes coros para darem graças.”',
    note: 'Neemias conta isso ele mesmo. O alto do muro forma um caminho ao redor de toda a cidade, à vista de todos. Quando estava pela metade, Tobias zombou dizendo que, se uma raposa subisse nele, ele cairia (4:3). Agora ele leva duas procissões.',
    who: 'Neemias · os líderes de Judá',
  },
  {
    title: 'O primeiro coro vai para a direita',
    quote: '“Um deles avançou em cima do muro, para a direita, até a porta do Esterco… Esdras, o escriba, ia à frente deles.”',
    note: 'Em hebraico as direções são dadas olhando para o leste, por isso a direita é o sul. Atrás do coro vão Hosaías e metade dos líderes de Judá, sacerdotes com trombetas, e Zacarias, descendente de Asafe, com seus colegas, que tocavam “os instrumentos musicais prescritos por Davi, homem de Deus”.',
    who: 'Esdras · o primeiro coro · Hosaías e metade dos líderes · sacerdotes · Zacarias e seus colegas',
  },
  {
    title: 'Os degraus da Cidade de Davi',
    quote: '“À porta da Fonte eles subiram diretamente os degraus da Cidade de Davi, na subida para o muro…”',
    note: 'Depois da porta da Fonte, o muro vira para o norte e sobe pela colina da Cidade de Davi. Discute-se se o coro continuou em cima do muro ou subiu por uma escada ao lado dele, os degraus que desciam da cidade (3:15). Aqui ele segue pelo alto do muro.',
    who: 'O primeiro coro',
  },
  {
    title: 'Sobre a casa de Davi até a porta das Águas',
    quote: '“…e passaram sobre a casa de Davi até a porta das Águas, a leste.”',
    note: 'Passam pelo antigo palácio real, no alto da colina (o de 3:25), e param sobre a porta das Águas, onde Esdras tinha lido a Lei para todo o povo (8:1–3). Aqui esperam enquanto o segundo coro dá a volta.',
    who: 'O primeiro coro',
  },
  {
    title: 'O segundo coro vai no sentido oposto',
    quote: '“O segundo coro avançou no sentido oposto. Eu os acompanhei, quando iam sobre o muro, levando comigo a metade do povo; passamos pela torre dos Fornos até a porta Larga…”',
    note: 'O próprio Neemias caminha atrás deste coro. O seu percurso é o muro do capítulo 3 ao contrário: as mesmas torres e portas, citadas na ordem inversa. Listas como estas são uma das principais maneiras de traçar o curso do muro. Onde a NVI diz “porta Larga”, outras versões dizem “muro Largo” (3:8).',
    who: 'O segundo coro · Neemias e a metade do povo',
  },
  {
    title: 'As portas de Efraim, Jesana e do Peixe',
    quote: '“…sobre a porta de Efraim, a porta Jesana, a porta do Peixe…”',
    note: 'A porta de Efraim não aparece nos reparos do capítulo 3, mas tinha uma praça onde o povo fez tendas para a festa (8:16). Dava para a estrada do norte, rumo aos montes de Efraim. Ela foi posta aqui, entre o muro Largo e a porta Jesana, pela ordem deste versículo.',
    who: 'O segundo coro · Neemias e a metade do povo',
  },
  {
    title: 'Até a porta das Ovelhas e a porta da Guarda',
    quote: '“…a torre de Hananeel e a torre dos Cem, indo até a porta das Ovelhas. Junto à porta da Guarda paramos.”',
    note: 'A porta das Ovelhas é onde a reconstrução começou (3:1), por isso o segundo coro termina onde a obra começou. A porta da Guarda não é citada em nenhum outro lugar, e não se sabe onde ficava. Aqui ela aparece como a porta norte do pátio do templo.',
    who: 'O segundo coro · Neemias e a metade do povo',
  },
  {
    title: 'No templo de Deus',
    quote: '“Os dois coros encarregados das ações de graças assumiram os seus lugares no templo de Deus… Os coros cantaram sob a direção de Jezraías.”',
    note: 'Os dois coros descem do muro e se encontram no pátio do templo, um vindo do sul e o outro do norte, com Neemias, metade dos oficiais e os sacerdotes com trombetas. É o templo reconstruído sob Zorobabel e terminado em 516 a.C. (Ed 6:15).',
    who: 'Os dois coros · Neemias e metade dos oficiais · sacerdotes com trombetas · Jezraías',
  },
  {
    title: 'Grandes sacrifícios',
    quote: '“E naquele dia, contentes como estavam, ofereceram grandes sacrifícios, pois Deus os enchera de grande alegria. As mulheres e as crianças também se alegraram…”',
    note: 'Não só os sacerdotes, os levitas e os líderes: as mulheres e as crianças também se alegram. A fumaça das ofertas sobe do altar diante do templo.',
    who: 'Todo o povo, também as mulheres e as crianças',
  },
];
