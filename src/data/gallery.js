/**
 * GALERIA DE FOTOS DOS DOCES
 *
 * Carrossel puramente visual: sem nome, sem preço e sem descrição na tela.
 * O texto `alt` NÃO aparece para o visitante comum — ele existe para leitores
 * de tela e para o Google entender a imagem. Por isso ele descreve a foto.
 *
 * Os arquivos ficam em `public/images/doces/`. A ordem desta lista é a ordem
 * do carrossel — reordene à vontade.
 *
 * Para acrescentar uma foto: salve o arquivo naquela pasta e adicione um item
 * aqui. Se o arquivo não existir, o cartão cai no selo da marca em vez de
 * mostrar imagem quebrada.
 */
export const GALLERY = [
  {
    id: "g01",
    arquivo: "copinhos-mirtilo.webp",
    alt: "Copinhos de chocolate branco com creme rosé e mirtilo, em suporte dourado; ao fundo, bombons de chocolate e morangos.",
  },
  {
    id: "g02",
    arquivo: "brigadeiro-branco-morango.webp",
    alt: "Brigadeiros claros cobertos de granulado, finalizados com morango fatiado, servidos em bandeja espelhada.",
  },
  {
    id: "g03",
    arquivo: "bombons-ganache.webp",
    alt: "Bombons quadrados de chocolate escuro com ganache em espiral e pérolas, em prato de cristal ao lado de um arranjo de flores.",
  },
  {
    id: "g04",
    arquivo: "tacas-frutas-vermelhas.webp",
    alt: "Doces de colher em taças individuais, com creme e calda de frutas vermelhas, alinhados em bandeja dourada.",
  },
  {
    id: "g05",
    arquivo: "lembrancas-laco.webp",
    alt: "Lembranças de chocolate embaladas uma a uma e fechadas com laço de cetim branco, em bowl de madeira.",
  },
  {
    id: "g06",
    arquivo: "suporte-dois-andares.webp",
    alt: "Suporte dourado de dois andares: copinhos de chocolate branco com mirtilo em cima e copinhos de chocolate escuro embaixo.",
  },
  {
    id: "g07",
    arquivo: "copinhos-frutas-vermelhas.webp",
    alt: "Copinhos de chocolate escuro finalizados com morango, framboesa e mirtilo, entre arranjos de flores coloridas.",
  },
  {
    id: "g08",
    arquivo: "copinhos-maracuja.webp",
    alt: "Copinhos de chocolate com recheio de maracujá, servidos em bandeja dourada sobre mesa de madeira.",
  },
  {
    id: "g09",
    arquivo: "copinhos-physalis.webp",
    alt: "Copinhos de chocolate decorados com physalis, dispostos em fileiras sobre bandeja; ao fundo, bombons em prato de cristal.",
  },
  {
    id: "g10",
    arquivo: "brigadeiros-granulado.webp",
    alt: "Brigadeiros tradicionais cobertos de granulado de chocolate, servidos em bowl de vidro.",
  },
  {
    id: "g11",
    arquivo: "mesa-doces-branca.webp",
    alt: "Mesa de doces em tons de branco, com travessas de cristal, brigadeiros brancos e arranjos de flores brancas.",
  },
  {
    id: "g12",
    arquivo: "brownies-embalados.jpg",
    alt: "Brownies da Roman Passion embalados individualmente, com a etiqueta da marca, sobre tábua de madeira ao lado de potes de vidro com doces.",
  },
];

/** Caminho público da foto. */
export const photoPath = (arquivo) => `/images/doces/${arquivo}`;
