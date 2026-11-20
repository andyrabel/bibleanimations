// Brazilian Portuguese text for "Ezekiel's Temple", merged over data.js (see addLanguage
// in ../../i18n.js). Same shape as data.js, text fields only. One version, the NVI
// (nvipt, the 2000 edition), so every field is a plain string. STOPS line up with
// data.js by position.
//
// Quotations are verbatim. The NVI gives the sizes in metres, taking the long
// cubit as half a metre (40:5); the notes give cubits with metres at 52,5 cm.
// Like the NVI in English, it follows the Greek where the Hebrew is hard: twelve
// cubits for the porch (40:49), two rooms by the north and south gates (40:44),
// five hundred cubits, not rods, for the wall (42:20). Its words: "salas dos
// guardas", "batentes", "tamareiras", "pórtico", "santuário externo" (the nave),
// "quartos laterais", and "pátio do templo" for the separate yard.

export const TERMS = {
  rod: 'vara',
  guardrooms: 'salas dos guardas',
  porch: 'pórtico',
  porches: 'pórticos',
  jambs: 'batentes',
  court: 'pátio',
  nave: 'santuário externo',
  house: 'templo',
  sideChambers: 'quartos laterais',
  separate: 'pátio do templo',
  palms: 'tamareiras',
  bronze: 'bronze',
};

export const FEATURES = {
  eastGate: { name: 'Porta leste' },
  northGate: { name: 'Porta norte' },
  southGate: { name: 'Porta sul' },
  outerCourt: { name: 'Pátio externo' },
  chambers: { name: 'Quartos' },
  pavement: { name: 'Piso' },
  innerCourt: { name: 'Pátio interno' },
  innerSouth: { name: 'Porta sul interna' },
  innerEast: { name: 'Porta leste interna' },
  innerNorth: { name: 'Porta norte interna' },
  tables: { name: 'Mesas' },
  rinse: { name: 'Quarto para lavar' },
  roomN: { name: 'Quarto dos sacerdotes' },
  roomS: { name: 'Quarto dos sacerdotes' },
  altar: { name: 'Altar' },
  porch: { name: 'Pórtico' },
  columns: { name: 'Colunas' },
  nave: { name: 'Santuário externo' },
  mostHoly: { name: 'Lugar Santíssimo' },
  sideChambers: { name: 'Quartos laterais' },
  table: { name: 'Altar de madeira' },
  westBuilding: { name: 'Prédio' },
  yard: { name: 'Pátio do templo' },
  priestsN: { name: 'Quartos santos' },
  priestsS: { name: 'Quartos santos' },
  mountain: { name: 'Um monte muito alto' },
};

export const PEOPLE = {
  man: { name: 'O homem' },
  ezekiel: { name: 'Ezequiel' },
};

export const INTRO = {
  title: 'Um monte muito alto',
  ref: 'Ezequiel 40:2',
  quote: '“Em visões de Deus ele me levou a Israel e me pôs num monte muito alto, sobre o qual, no lado sul, havia alguns prédios que tinham a aparência de uma cidade.”',
  note: 'Era o vigésimo quinto ano do exílio, catorze anos depois da queda de Jerusalém e do incêndio do templo de Salomão (40:1). Ezequiel, sacerdote entre os exilados na Babilônia (1:3), é levado em visão a um monte na terra de Israel. O que parece uma cidade costuma ser entendido como o próprio templo, com os seus muros e portas. Um homem com uma vara de medir o mostra parte por parte (Ezequiel 40–42), e cada parte sobe à medida que ele a mede.',
  aside: 'Tudo está desenhado com as medidas do texto, no côvado longo de 40:5, um côvado e um palmo (≈ 52,5 cm; a NVI arredonda para meio metro). Ezequiel dá comprimentos e larguras, mas quase nenhuma altura, por isso as alturas são suposições, e as notas dizem onde mais o modelo precisa supor. O monte não é um lugar real; a visão não diz onde ele fica.',
};

export const FINALE = {
  title: 'A glória volta',
  ref: 'Ezequiel 43:4–5',
  quote: '“A glória do Senhor entrou no templo pela porta que dava para o lado leste. Então o Espírito pôs-me em pé e levou-me para dentro do pátio interno, e a glória do Senhor encheu o templo.”',
  note: 'Anos antes, Ezequiel tinha visto a glória sair do templo de Salomão pela porta leste e parar sobre o monte a leste da cidade (10:18–19; 11:22–23). Agora ela volta pelo mesmo caminho, com um som como o de muitas águas, e a terra resplandece (43:2). Ezequiel cai com o rosto em terra (43:3), e o Senhor fala do templo: “este é o lugar do meu trono… Aqui viverei para sempre entre os israelitas” (43:7). Depois a porta leste fica fechada, porque o Senhor entrou por ela (44:1–2).',
};

export const STOPS = [
  {
    title: 'O homem da vara de medir',
    ref: 'Ezequiel 40:3',
    quote: '“Ele me levou para lá, e eu vi um homem que parecia de bronze; ele estava em pé junto à entrada, tendo em sua mão uma corda de linho e uma vara de medir.”',
    note: 'O homem disse a Ezequiel que olhasse bem, ouvisse bem e prestasse atenção a tudo o que ia ser mostrado, e que contasse tudo à nação de Israel (40:4). A corda servia para as distâncias longas (47:3), a vara para os edifícios. Não se diz quem ele é; fala da parte do Senhor (44:5) e está desenhado brilhando como o bronze, como em 1:7. Ezequiel está desenhado com uma túnica simples.',
    size: 'A vara: 6 côvados longos (3,2 m)',
  },
  {
    title: 'O muro',
    ref: 'Ezequiel 40:5',
    quote: '“Vi um muro que cercava completamente a área do templo. O comprimento da vara de medir na mão do homem era de seis medidas longas, cada uma com meio metro. Ele mediu o muro, que tinha três metros de espessura e três de altura.”',
    note: 'Um côvado longo é o côvado comum mais um palmo, uns 52,5 cm, por isso a vara mede pouco mais de 3 m, e o muro é tão espesso quanto alto. A sua altura está desenhada a partir do pátio externo, que fica sete degraus acima do chão de fora. Mais adiante se diz para que serve o muro: “para separar o santo do comum” (42:20).',
    size: '6 × 6 côvados longos (3,2 × 3,2 m)',
  },
  {
    title: 'A porta leste',
    ref: 'Ezequiel 40:6',
    quote: '“Depois ele foi até a porta que dá para o oriente. Subiu os seus degraus e mediu a soleira da porta, que tinha três metros de extensão.”',
    note: 'Lá dentro, três salas dos guardas de cada lado, cada uma com uma vara de lado, cinco côvados entre elas e um muro baixo de um côvado à frente (40:7, 10, 12); depois a soleira interna e um pórtico de oito côvados que dá para o pátio (40:8–9). A entrada tem dez côvados de largura; há aberturas para as salas e tamareiras nas paredes salientes (40:11, 16). Cinquenta côvados de comprimento e vinte e cinco de largura (40:13, 15). As alturas não são dadas; os sessenta côvados de 40:14 são incertos, e os batentes estão desenhados mais baixos.',
    size: '50 × 25 côvados (26 × 13 m) · salas dos guardas de 6 × 6',
  },
  {
    title: 'O pátio externo',
    ref: 'Ezequiel 40:17',
    quote: '“Depois ele me levou ao pátio externo. Ali eu vi alguns quartos e um piso que havia sido construído ao redor de todo o pátio; nele havia trinta quartos ao longo de todo o piso.”',
    note: 'O piso corre ao longo do muro, tão largo quanto as portas são compridas (40:18), mais baixo que o pátio interno. A medida e a disposição dos trinta quartos não são dadas; estão desenhados em fileiras de cinco de cada lado de cada porta. Mais tarde o povo comeria os seus sacrifícios em lugares assim (compare 46:21–24). Da parte interna desta porta até a porta seguinte, para dentro, há cem côvados (40:19).',
    size: 'Piso tão largo quanto uma porta é comprida · quartos sem medida',
  },
  {
    title: 'A porta norte',
    ref: 'Ezequiel 40:22',
    quote: '“Suas aberturas, seu pórtico e sua decoração com tamareiras tinham as mesmas medidas dos da porta que dava para o oriente. Sete degraus subiam até ela, e o seu pórtico ficava no lado oposto a eles.”',
    note: 'A porta que dá para o norte é igual à leste: três salas dos guardas de cada lado, cinquenta côvados de comprimento e vinte e cinco de largura (40:20–21). Os seus sete degraus sobem do chão de fora do muro, de modo que o pátio externo fica acima do alto do monte. Os degraus da porta leste não são contados (40:6); estão desenhados iguais.',
    size: '50 × 25 côvados · 7 degraus',
  },
  {
    title: 'A porta sul',
    ref: 'Ezequiel 40:24',
    quote: '“Depois ele me levou para o lado sul, e eu vi uma porta que dava para o sul. Ele mediu seus batentes e seu pórtico, e eles tinham as mesmas medidas das outras portas.”',
    note: 'Uma terceira porta, igual às outras, com os seus sete degraus e tamareiras nos batentes (40:25–26). Não há porta a oeste: o templo e o prédio de trás ocupam esse lado, e só se entra pelo leste, pelo norte ou pelo sul. Segundo 46:9, quem entra pela porta norte sai pela sul, e quem entra pela porta sul sai pela norte.',
    size: '50 × 25 côvados · 7 degraus',
  },
  {
    title: 'A porta sul do pátio interno',
    ref: 'Ezequiel 40:31',
    quote: '“Seu pórtico dava para o pátio externo; tamareiras decoravam seus batentes, e oito degraus subiam até a porta.”',
    note: 'A cem côvados da porta sul externa fica a interna, com as mesmas medidas (40:27–29), mas virada ao contrário: o seu pórtico dá para o pátio externo, e mais oito degraus sobem até o pátio interno. O muro do pátio interno não é descrito; está desenhado um muro baixo em volta do seu terraço. Os pórticos de vinte e cinco côvados por cinco do versículo 30 não são claros e não estão desenhados.',
    size: '50 × 25 côvados · 8 degraus',
  },
  {
    title: 'As portas leste e norte do pátio interno',
    ref: 'Ezequiel 40:32',
    quote: '“Depois ele me levou ao pátio interno no lado leste, e mediu a entrada; suas medidas eram iguais às outras.”',
    note: 'Depois, a porta norte (40:35–37). As seis portas são iguais: cinquenta côvados por vinte e cinco, três salas dos guardas de cada lado, aberturas e tamareiras nos batentes; as externas têm sete degraus, as internas oito. Cada porta interna fica em frente de uma externa, a cem côvados (40:23, 27).',
    size: 'Cada uma 50 × 25 côvados · 8 degraus',
  },
  {
    title: 'Mesas para o holocausto',
    ref: 'Ezequiel 40:39',
    quote: '“No pórtico da entrada havia duas mesas de cada lado, em que os holocaustos, as ofertas pelo pecado e as ofertas pela culpa eram abatidos.”',
    note: 'Mais duas de cada lado, do lado de fora do pórtico, junto aos degraus (40:40–41), oito ao todo, e quatro mesas de pedra lavrada, de um côvado e meio de lado e um de altura, para os utensílios do abate (40:42). Um quarto com a sua entrada junto à porta servia para lavar os holocaustos (40:38). O texto cita a porta norte (40:40), e os holocaustos eram abatidos no lado norte do altar (Levítico 1:11), por isso as mesas estão desenhadas ali. Os ganchos de quatro dedos (40:43) são pequenos demais para aparecer.',
    size: 'Mesas de pedra de 1½ × 1½ × 1 côvado',
  },
  {
    title: 'Quartos para os sacerdotes',
    ref: 'Ezequiel 40:45–46',
    quote: '“Ele me disse: ‘O quarto que dá para o sul é para os sacerdotes encarregados do templo, e o quarto que dá para o norte é para os sacerdotes encarregados do altar. São eles os filhos de Zadoque, os únicos levitas que podem aproximar-se do Senhor para ministrarem diante dele’.”',
    note: 'Um quarto fica ao lado da porta norte, dando para o sul; o outro ao lado da porta sul, dando para o norte (40:44). O hebraico os chama de quartos dos cantores e põe o segundo junto à porta leste; a NVI segue o grego, com dois quartos e a porta sul. As medidas não são dadas.',
    size: 'Sem medida',
  },
  {
    title: 'O pátio interno e o altar',
    ref: 'Ezequiel 40:47',
    quote: '“Depois ele mediu o pátio: era quadrado, medindo cinqüenta metros de comprimento e cinqüenta de largura. E o altar ficava em frente do templo.”',
    note: 'A corda dele marca o quadrado, com um piso mais claro que o dos pátios de trás. O altar é medido mais adiante, em 43:13–17: uma base com uma canaleta em volta, duas saliências e uma fornalha de doze côvados de lado com quatro chifres, com os degraus voltados para o leste. É assim que está desenhado, no meio do pátio: uns onze côvados de altura, dezoito de lado na base. Sobre ele os sacerdotes ofereceriam holocaustos e ofertas de comunhão, e o Senhor os aceitaria (43:27).',
    size: 'Pátio de 100 × 100 côvados (52 m) · fornalha do altar de 12 × 12',
  },
  {
    title: 'O pórtico do templo',
    ref: 'Ezequiel 40:49',
    quote: '“O pórtico tinha dez metros de largura e seis metros da frente aos fundos. Havia um lance de escadas que dava acesso a ele, e três colunas em cada lado dos batentes.”',
    note: 'O templo fica sobre uma base de uma vara inteira de altura (41:8). O pórtico tem doze côvados de fundo no grego (seis metros na NVI), onze no hebraico; estão desenhados doze, e assim o templo mede cem côvados de comprimento (41:13). A entrada tem catorze côvados de largura entre batentes de cinco (40:48). O grego conta dez degraus. Onde a NVI diz “três colunas”, o hebraico tem uma coluna junto a cada batente, e estão desenhadas duas, que lembram Jaquim e Boaz (1 Reis 7:21); a medida não é dada.',
    size: 'Pórtico de 20 × 12 côvados · base de 6 de altura',
  },
  {
    title: 'O santuário externo',
    ref: 'Ezequiel 41:2',
    quote: '“A entrada tinha cinco metros de largura, e as paredes salientes em cada lado tinham dois metros e meio de largura. Ele mediu também o santuário externo; e ele tinha vinte metros de comprimento e dez de largura.”',
    note: 'As paredes têm seis côvados de espessura (41:1, 5); a sala mede quarenta por vinte, como a sala principal do templo de Salomão (1 Reis 6:17). A altura do templo não é dada; está desenhado com trinta côvados, como o de Salomão, e a parede sul foi tirada para se ver o interior. Ezequiel entra até o santuário externo; ele é sacerdote, mas só o homem vai além.',
    size: '40 × 20 côvados (21 × 10,5 m) · paredes de 6',
  },
  {
    title: 'O Lugar Santíssimo',
    ref: 'Ezequiel 41:4',
    quote: '“E ele mediu o comprimento do santuário interno; tinha dez metros, e sua largura era de dez metros até o fim do santuário externo. Ele me disse: ‘Este é o Lugar Santíssimo’.”',
    note: 'Aqui só o homem entra (41:3); Ezequiel fica no santuário externo. A parede entre as duas salas tem dois côvados de espessura, com uma entrada de seis. A sala mede vinte côvados de lado, como a de Salomão (1 Reis 6:20), mas não há nada nela: nem arca, nem querubins, nem véu. Ezequiel não sabe o que a encherá até a glória voltar (43:5).',
    size: '20 × 20 côvados (10,5 m) · entrada de 6',
  },
  {
    title: 'Os quartos laterais',
    ref: 'Ezequiel 41:6',
    quote: '“Os quartos laterais, sobrepostos uns aos outros, ficavam em três andares, havendo trinta em cada andar. Havia saliências em torno de toda a parede do templo para servirem de pontos de apoio para os quartos laterais, para que não fossem incrustados na parede do templo.”',
    note: 'Quatro côvados de largura embaixo, mais largos em cada andar à medida que a parede se estreita (41:5, 7), como no templo de Salomão (1 Reis 6:6). A parede externa tem cinco côvados de espessura, com uma entrada ao norte e outra ao sul que dão para uma área aberta de cinco côvados sobre a base, e em volta um espaço de vinte côvados (41:9–11). A altura dos andares não é dada; estão desenhados com seis côvados.',
    size: '4 côvados de largura · parede externa de 5 · 3 andares de 30',
  },
  {
    title: 'O prédio a oeste',
    ref: 'Ezequiel 41:12',
    quote: '“O prédio em frente do pátio do templo no lado oeste media trinta e cinco metros de largura. A parede do prédio tinha dois metros e meio de espessura em toda a sua volta, e o seu comprimento era de quarenta e cinco metros.”',
    note: 'Atrás do templo, do outro lado do pátio do templo, há um grande prédio cujo uso não é dito; ele ocupa o lado oeste, onde não há porta. A altura e as portas também não são dadas. Setenta por noventa por dentro, com as paredes mede oitenta por cem, e com o pátio do templo à frente, cem côvados de leste a oeste (41:13).',
    size: '70 × 90 côvados por dentro (37 × 47 m) · paredes de 5',
  },
  {
    title: 'Cem côvados',
    ref: 'Ezequiel 41:13',
    quote: '“Depois ele mediu o templo; tinha cinqüenta metros de comprimento, e o pátio do templo e o prédio com suas paredes também tinham cinqüenta metros de comprimento.”',
    note: 'A frente do templo com os pátios dos dois lados também mede cem côvados (41:14), por isso o templo e os seus pátios formam um quadrado como o pátio interno à frente, que a corda dele marca. Da frente para trás: o pórtico 5 + 12, a parede 6, o santuário externo 40, a parede 2, o Lugar Santíssimo 20, a parede 6, os quartos laterais 4 e a sua parede 5. Não se menciona telhado; um está desenhado.',
    size: 'O templo: 100 × 100 côvados com os seus pátios (52 m)',
  },
  {
    title: 'Querubins e tamareiras',
    ref: 'Ezequiel 41:18–19',
    quote: '“…havia querubins e tamareiras em relevo. As tamareiras alternavam com os querubins. Cada querubim tinha dois rostos: o rosto de um homem virado para a tamareira de um dos lados, e o rosto de um leão virado para a tamareira do outro lado. Estavam em relevo ao redor de todo o templo.”',
    note: 'As paredes são revestidas de madeira do chão até as janelas (41:16–17), e entalhadas do chão até acima da entrada (41:20). Ao contrário do templo de Salomão, não se fala de ouro. No santuário externo há um altar de madeira de três côvados de altura e dois de lado (a NVI diz um metro e meio por um metro): “Esta é a mesa que fica diante do Senhor” (41:22).',
    size: 'Altar de madeira de 2 × 2 × 3 côvados',
  },
  {
    title: 'Portas duplas',
    ref: 'Ezequiel 41:23–24',
    quote: '“Tanto o santuário externo quanto o Santo dos Santos tinham portas duplas. Cada porta tinha duas folhas articuladas.”',
    note: 'As portas do santuário externo eram esculpidas com querubins e tamareiras, como as paredes, e na frente do pórtico havia uma saliência de madeira; a palavra é incerta (41:25), e está desenhada uma cornija. O pórtico tinha janelas estreitas e tamareiras dos lados (41:26). As portas estão desenhadas abertas, cada folha dobrada em duas.',
    size: 'Entradas de 10 e 6 côvados',
  },
  {
    title: 'Os quartos santos',
    ref: 'Ezequiel 42:13',
    quote: '“Depois o homem me disse: ‘Os quartos do norte e do sul que dão para o pátio do templo são os quartos em que os sacerdotes que se aproximam do Senhor comerão e guardarão as ofertas santíssimas, isto é, as ofertas de cereal, as ofertas pelo pecado e as ofertas pela culpa, pois o local é santo.’”',
    note: 'De cada lado do templo, no pátio externo: um bloco de cem côvados junto ao pátio do templo e outro de cinquenta do lado de fora, com três andares escalonados, um corredor de dez côvados entre eles e a entrada pelo leste (42:1–12). Os sacerdotes deixam aqui as suas vestes santas antes de sair para junto do povo (42:14). A disposição é uma leitura de uma passagem difícil.',
    size: '100 × 50 côvados · corredor de 10',
  },
  {
    title: 'Quinhentos',
    ref: 'Ezequiel 42:20',
    quote: '“Assim ele mediu a área nos quatro lados. Em torno dela havia um muro de duzentos e cinqüenta metros de comprimento e duzentos e cinqüenta metros de largura, para separar o santo do comum.”',
    note: 'O homem levou Ezequiel para fora pela porta leste e mediu tudo em volta (42:15–19). O hebraico diz quinhentas varas de cada lado, uns 1,6 km; o grego diz côvados, e a NVI o segue (250 metros). Os pátios e as portas do capítulo 40 somam quinhentos côvados, e assim está desenhado. Em 45:2 o santuário é de novo um quadrado de quinhentos.',
    size: '500 × 500 côvados (262 m)',
  },
];
