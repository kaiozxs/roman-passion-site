/**
 * CARROSSEL DE DOCES — close-ups
 *
 * Aqui ficam as fotos aproximadas dos doces. As mesas completas montadas em
 * evento estão em `src/data/mesas.js`, na galeria em mosaico. A separação é
 * proposital: são naturezas diferentes de foto.
 *
 * O texto `alt` NÃO aparece para o visitante comum — ele existe para leitores
 * de tela e para o Google entender a imagem. Por isso descreve a foto.
 *
 * Os arquivos ficam em `public/images/doces/`. A ordem desta lista é a ordem
 * do carrossel. Se um arquivo não existir, o cartão cai no selo da marca em
 * vez de mostrar imagem quebrada.
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
    arquivo: "trufas-laranja.jpg",
    alt: "Trufas de chocolate meio amargo finalizadas com uma fatia de laranja desidratada, servidas em taça de vidro.",
  },
  {
    id: "g04",
    arquivo: "bombons-ganache.webp",
    alt: "Bombons quadrados de chocolate escuro com ganache em espiral e pérolas, em prato de cristal ao lado de um arranjo de flores.",
  },
  {
    id: "g05",
    arquivo: "tortinhas-mirtilo.jpg",
    alt: "Tortinhas de massa amanteigada com creme e mirtilo fresco, alinhadas em suporte dourado.",
  },
  {
    id: "g06",
    arquivo: "brigadeiros-brancos-mirtilo.jpg",
    alt: "Brigadeiros brancos cobertos de granulado claro, cada um finalizado com um mirtilo, em travessa de cristal.",
  },
  {
    id: "g07",
    arquivo: "doces-nozes-douradas.jpg",
    alt: "Doces de chocolate branco finalizados com nozes douradas, servidos em bandeja de madeira entalhada.",
  },
  {
    id: "g08",
    arquivo: "copinhos-physalis.webp",
    alt: "Copinhos de chocolate decorados com physalis, dispostos em fileiras sobre bandeja; ao fundo, bombons em prato de cristal.",
  },
  {
    id: "g09",
    arquivo: "doces-forminhas-rendadas.jpg",
    alt: "Doces dourados servidos em forminhas rendadas verdes, sobre travessa de cristal, em luz de fim de tarde.",
  },
  {
    id: "g10",
    arquivo: "brigadeiros-granulado.webp",
    alt: "Brigadeiros tradicionais cobertos de granulado de chocolate, servidos em bowl de vidro.",
  },
  {
    id: "g11",
    arquivo: "lembrancas-laco.webp",
    alt: "Lembranças de chocolate embaladas uma a uma e fechadas com laço de cetim branco, em bowl de madeira.",
  },
];

/** Caminho público da foto. */
export const photoPath = (arquivo) => `/images/doces/${arquivo}`;
