// Brazilian Portuguese text for "Paul's Voyage to Rome", merged over data.js (see
// addLanguage in ../../i18n.js). Same shape as data.js, text fields only. One version,
// the NVI (nvipt, the 2000 edition), so every field is a plain string. STOPS line
// up with data.js by position. Place names follow the NVI (Sidom, Mirra, Cnido,
// Bons Portos, Clauda, Régio, Potéoli, praça de Ápio, Três Vendas), in today's
// spelling where the 2000 edition has an older one ("Laséia"); the quotations
// keep the NVI's.

export const TERMS = {
  cauda: 'Clauda',
  centurion: 'centurião',
};

export const PLACES = {
  caesarea: { name: 'Cesareia' },
  sidon: { name: 'Sidom' },
  myra: { name: 'Mirra' },
  cnidus: { name: 'Cnido' },
  fairHavens: { name: 'Bons Portos' },
  malta: { name: 'Malta' },
  syracuse: { name: 'Siracusa' },
  rhegium: { name: 'Régio' },
  puteoli: { name: 'Potéoli' },
  forum: { name: 'Praça de Ápio' },
  taverns: { name: 'Três Vendas' },
  rome: { name: 'Roma' },
};

export const FEATURES = {
  lasea: { name: 'Laseia' },
  phoenix: { name: 'Fenice' },
  salmone: { name: 'Salmona' },
  cauda: { name: 'Clauda' },
  cyprus: { name: 'Chipre' },
  cilicia: { name: 'Cilícia' },
  pamphylia: { name: 'Panfília' },
  lycia: { name: 'Lícia' },
  crete: { name: 'Creta' },
  achaia: { name: 'Acaia' },
  sicily: { name: 'Sicília' },
  italy: { name: 'Itália' },
  phoenicia: { name: 'Fenícia' },
  adria: { name: 'Mar Adriático' },
  syrtis: { name: 'Sirte' },
  sea: { name: 'Mar Mediterrâneo' },
};

export const INTRO = {
  title: 'Testemunhar também em Roma',
  ref: 'Atos 23:11',
  quote: '“Na noite seguinte o Senhor, pondo-se ao lado dele, disse: ‘Coragem! Assim como você testemunhou a meu respeito em Jerusalém, deverá testemunhar também em Roma’.”',
  note: 'Paulo tinha sido preso no templo de Jerusalém (21:27–36). O Senhor lhe falou na fortaleza, na noite depois de ele comparecer diante do Sinédrio. Ele foi levado a Cesareia, mantido ali dois anos sob os governadores Félix e Festo, e, como cidadão romano, apelou para César (24:27; 25:11–12). Assim ele foi a Roma, como prisioneiro, por volta dos anos 59–60 d.C. Lucas ia com ele, e o seu relato da viagem é um dos testemunhos mais detalhados da navegação antiga.',
  aside: 'O relevo é real, a partir de dados de elevação modernos, com as alturas multiplicadas por três para que os montes apareçam; o litoral é o de hoje. Lucas, que navegou com Paulo, dá os portos e as ilhas, mas não os rumos entre eles, por isso as rotas por mar seguem o caminho mais curto por águas abertas junto aos lugares que ele cita, e a deriva de Clauda até Malta está desenhada em linha reta. As cidades e o navio estão desenhados muito maiores do que eram. Não aparecem pessoas.',
};

export const FINALE = {
  title: 'Sem impedimento algum',
  ref: 'Atos 28:31',
  quote: '“Pregava o Reino de Deus e ensinava a respeito do Senhor Jesus Cristo, abertamente e sem impedimento algum.”',
  note: 'Atos termina com Paulo dois anos inteiros em Roma, numa casa alugada, recebendo todos os que iam vê-lo (28:30). Dali, segundo muitos, ele escreveu aos filipenses que a sua prisão tinha servido para o progresso do evangelho, de modo que toda a guarda do palácio sabia que ele estava preso por causa de Cristo (Filipenses 1:12–13). O livro para aí; não conta como terminou o seu julgamento.',
};

export const STOPS = [
  {
    title: 'Rumo à Itália',
    ref: 'Atos 27:1',
    quote: '“Quando ficou decidido que navegaríamos para a Itália, Paulo e alguns outros presos foram entregues a um centurião chamado Júlio, que pertencia ao Regimento Imperial.”',
    note: 'O relato volta a dizer “nós”: Lucas navegou com Paulo, e também Aristarco, de Tessalônica (27:2). Eles embarcaram num navio de Adramítio, um porto perto de Trôade, que ia passar por lugares da costa da Ásia. Cesareia, a cidade portuária de Herodes, era a sede do governador romano da Judeia.',
  },
  {
    title: 'Sidom',
    ref: 'Atos 27:3',
    quote: '“No dia seguinte, ancoramos em Sidom; e Júlio, num gesto de bondade para com Paulo, permitiu-lhe que fosse ao encontro dos seus amigos, para que estes suprissem as suas necessidades.”',
    note: 'Sidom, uns 110 km costa acima, era um antigo porto fenício com crentes, talvez desde a dispersão que se seguiu à morte de Estêvão (11:19). O centurião Júlio, que mais tarde salvaria a vida de Paulo (27:43), deixou que ele descesse a terra para ver os amigos.',
  },
  {
    title: 'Ao norte de Chipre',
    ref: 'Atos 27:4',
    quote: '“Quando partimos de lá, passamos ao norte de Chipre, porque os ventos nos eram contrários.”',
    note: 'Os ventos de verão sopram do oeste e do noroeste. Por isso o navio se manteve a leste e ao norte de Chipre, protegido pela ilha, e depois avançou para o oeste ao longo da costa da Cilícia e da Panfília, onde as brisas de terra e as correntes ajudavam (27:5). A rota desenhada é uma suposição desse tipo.',
  },
  {
    title: 'Um navio alexandrino',
    ref: 'Atos 27:6',
    quote: '“Ali, o centurião encontrou um navio alexandrino que estava de partida para a Itália e nele nos fez embarcar.”',
    note: 'Mirra, na Lícia, era um porto da rota do trigo do Egito para Roma; com os ventos do oeste, os navios de Alexandria subiam até a costa da Ásia antes de virar para o oeste. Este levava trigo (27:38) e 276 pessoas (27:37). Os navios da frota do trigo eram grandes: um descrito no século 2 media uns 55 m.',
  },
  {
    title: 'Diante de Cnido',
    ref: 'Atos 27:7',
    quote: '“Navegamos vagarosamente por muitos dias e tivemos dificuldade para chegar a Cnido. Não sendo possível prosseguir em nossa rota, devido aos ventos contrários, navegamos ao sul de Creta, defronte de Salmona.”',
    note: 'Cnido ficava na ponta de uma longa península, o último abrigo antes do Egeu aberto. Com o vento contra, não conseguiam manter o rumo para a Itália, por isso viraram para o sul e desceram pela ponta leste de Creta, contornando o cabo Salmona, até o abrigo da sua costa sul.',
  },
  {
    title: 'Bons Portos',
    ref: 'Atos 27:8',
    quote: '“Costeamos a ilha com dificuldade e chegamos a um lugar chamado Bons Portos, perto da cidade de Laséia.”',
    note: 'Bons Portos ainda se chama Kaloi Limenes, uma pequena baía na costa sul de Creta; umas ruínas próximas são identificadas com Laseia. Muito tempo tinha sido perdido, e o Jejum, o Dia da Expiação, no fim de setembro ou em outubro, já tinha passado (27:9). Navegar era perigoso a partir de meados de setembro, e no inverno se parava por completo.',
  },
  {
    title: 'O aviso de Paulo',
    ref: 'Atos 27:10',
    quote: '“Senhores, vejo que a nossa viagem será desastrosa e acarretará grande prejuízo para o navio, para a carga e também para a nossa vida.”',
    note: 'O centurião deu mais ouvidos ao piloto e ao dono do navio do que a Paulo. Bons Portos não era um porto adequado para passar o inverno, por isso a maioria decidiu tentar chegar a Fenice, um porto de Creta uns 65 km a oeste, voltado para o sudoeste e para o noroeste, e passar o inverno ali (27:11–12).',
  },
  {
    title: 'O Nordeste',
    ref: 'Atos 27:14',
    quote: '“Pouco tempo depois, desencadeou-se da ilha um vento muito forte, chamado Nordeste.”',
    note: 'Um vento brando do sul os tinha animado a partir, navegando bem junto à costa (27:13). Então o vento desceu dos montes de Creta, do nordeste. O navio não conseguia enfrentá-lo, por isso eles cederam e se deixaram levar (27:15). Em grego o vento se chama Euroáquilo.',
  },
  {
    title: 'Clauda',
    ref: 'Atos 27:16',
    quote: '“Passando ao sul de uma pequena ilha chamada Clauda, foi com dificuldade que conseguimos recolher o barco salva-vidas.”',
    note: 'Protegidos pela ilha, uns 40 km a sudoeste, recolheram o barco e passaram cordas por baixo do casco para reforçá-lo. Com medo de encalhar nos bancos de areia da Sirte, diante da África, baixaram as velas e se deixaram levar (27:17). Nos dias seguintes jogaram a carga ao mar, e depois o equipamento do navio (27:18–19).',
  },
  {
    title: 'Perdida toda a esperança',
    ref: 'Atos 27:20',
    quote: '“Não aparecendo nem sol nem estrelas por muitos dias, e continuando a abater-se sobre nós grande tempestade, finalmente perdemos toda a esperança de salvamento.”',
    note: 'Sem sol nem estrelas, um navio não tinha como saber onde estava. A deriva de Clauda até Malta é de uns 870 km; à velocidade que os navegadores modernos calculam para um navio à deriva numa tempestade, isso leva uns treze dias, o que combina com as catorze noites de 27:27. A rota está desenhada como uma deriva em linha reta.',
  },
  {
    title: 'Não tenha medo, Paulo',
    ref: 'Atos 27:23–24',
    quote: '“Pois ontem à noite apareceu-me um anjo do Deus a quem pertenço e a quem adoro, dizendo-me: ‘Paulo, não tenha medo. É preciso que você compareça perante César; Deus, por sua graça, deu-lhe a vida de todos os que estão navegando com você’.”',
    note: 'Depois de muito tempo sem comer, Paulo se levantou no meio deles. Lembrou que deviam tê-lo ouvido em Creta, mas pediu que tivessem coragem: ninguém perderia a vida, só o navio, e eles teriam de encalhar numa ilha (27:21–26).',
  },
  {
    title: 'A décima quarta noite',
    ref: 'Atos 27:27',
    quote: '“Na décima quarta noite, ainda estávamos sendo levados de um lado para outro no mar Adriático, quando, por volta da meia-noite, os marinheiros imaginaram que estávamos próximos da terra.”',
    note: 'O mar Adriático designava então todo o mar entre a Grécia, a Itália e a África. Ao sondar, os marinheiros acharam trinta e sete metros de profundidade, depois vinte e sete; lançaram quatro âncoras da popa e ansiavam pelo dia (27:28–29). Paulo animou todos a comer, deu graças pelo pão diante de todos e o partiu; depois aliviaram o navio jogando o trigo ao mar (27:33–38).',
  },
  {
    title: 'O naufrágio',
    ref: 'Atos 27:44',
    quote: '“Os outros teriam que salvar-se em tábuas ou em pedaços do navio. Dessa forma, todos chegaram a salvo em terra.”',
    note: 'Ao amanhecer viram uma enseada com praia e tentaram encalhar o navio ali, mas ele encalhou num banco de areia (no grego, um lugar onde dois mares se encontram) e ficou preso; a popa se despedaçava com a força das ondas (27:39–41). Os soldados queriam matar os presos, mas o centurião, querendo salvar a vida de Paulo, os impediu (27:42–43). A baía de São Paulo, no norte de Malta, é o lugar tradicional.',
  },
  {
    title: 'Malta',
    ref: 'Atos 28:2',
    quote: '“Os habitantes da ilha mostraram extraordinária bondade para conosco. Fizeram uma fogueira e receberam bem a todos nós, pois estava chovendo e fazia frio.”',
    note: 'Uma víbora se prendeu à mão de Paulo quando ele punha gravetos no fogo; ele a sacudiu e não sofreu mal nenhum, e o povo concluiu que ele era um deus (28:3–6). Públio, o homem principal da ilha, os hospedou por três dias. Paulo curou o pai dele, e depois vieram os outros doentes da ilha e foram curados (28:7–9). Eles ficaram três meses, o inverno inteiro.',
  },
  {
    title: 'Siracusa',
    ref: 'Atos 28:11',
    quote: '“Passados três meses, embarcamos num navio que tinha passado o inverno na ilha; era um navio alexandrino, que tinha por emblema os deuses gêmeos Cástor e Pólux.”',
    note: 'Cástor e Pólux, filhos de Zeus, eram os protetores dos marinheiros, esculpidos ou pintados na proa. Voltaram a navegar quando a temporada se abriu, na primavera, uns 150 km até Siracusa, a principal cidade da Sicília, e ficaram ali três dias (28:12).',
  },
  {
    title: 'Régio e Potéoli',
    ref: 'Atos 28:13',
    quote: '“Dali partimos e chegamos a Régio. No dia seguinte, soprando o vento sul, prosseguimos, chegando a Potéoli no segundo dia.”',
    note: 'Régio, na ponta da Itália, guardava o estreito de Messina. Com o vento sul a favor, percorreram em dois dias os 350 km até Potéoli, na baía de Nápoles. Potéoli era o grande porto onde os navios do trigo de Alexandria descarregavam para Roma. Ali encontraram irmãos e ficaram sete dias (28:14).',
  },
  {
    title: 'A praça de Ápio',
    ref: 'Atos 28:15',
    quote: '“Os irmãos dali tinham ouvido falar que estávamos chegando e vieram até a praça de Ápio e às Três Vendas para nos encontrar. Vendo-os, Paulo deu graças a Deus e sentiu-se encorajado.”',
    note: 'De Potéoli seguiram a pé pela Via Ápia, a mais antiga das grandes estradas romanas. A praça de Ápio, uma vila de mercado a uns 70 km de Roma, e as Três Vendas, a uns 50 km, são onde dois grupos de irmãos vieram ao seu encontro. Paulo tinha escrito à igreja de Roma três anos antes, com o desejo de vê-los (Romanos 1:11; 15:23).',
  },
  {
    title: 'Roma',
    ref: 'Atos 28:16',
    quote: '“Quando chegamos a Roma, Paulo recebeu permissão para morar por conta própria, sob a custódia de um soldado.”',
    note: 'Roma tinha talvez um milhão de habitantes, de longe a maior cidade do império. Paulo estava sob custódia, mas na sua própria moradia. Três dias depois ele chamou os líderes dos judeus e explicou por que tinha vindo: estava preso por causa da esperança de Israel (28:17–20). Alguns creram, e outros não (28:24).',
  },
];
