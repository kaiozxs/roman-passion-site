/**
 * MESAS MONTADAS EM EVENTO
 *
 * Galeria em mosaico, separada do carrossel de propósito: aqui são as mesas
 * completas, fotografadas no evento. O carrossel (src/data/gallery.js) fica
 * com os close-ups dos doces. Naturezas diferentes, tratamentos diferentes.
 *
 * `w` e `h` são as dimensões reais do arquivo. Vão para os atributos
 * width/height da imagem, o que permite ao navegador reservar o espaço exato
 * antes do download — o mosaico respeita a proporção original de cada foto,
 * sem recorte, e ainda assim não há salto de layout.
 *
 * `credito` aparece discretamente sobre a foto quando o fotógrafo assina a
 * imagem. Ver docs/fotos-dos-doces.md.
 */
export const MESAS = [
  {
    id: "m1",
    arquivo: "mesa-bem-casados-circular.jpg",
    w: 853,
    h: 1280,
    alt: "Mesa redonda de madeira com centenas de bem-casados dispostos em círculos concêntricos, com fitas verdes, e um arranjo alto de flores brancas e capim-dos-pampas ao centro.",
    credito: "Gabriel Kolher Fotografia",
  },
  {
    id: "m2",
    arquivo: "bem-casados-estante.jpg",
    w: 1280,
    h: 851,
    alt: "Bem-casados embalados e amarrados com fita verde, empilhados em pirâmides sobre as prateleiras de uma estante de madeira rústica.",
  },
  {
    id: "m3",
    arquivo: "mesa-bolo-por-do-sol.jpg",
    w: 854,
    h: 1280,
    alt: "Mesa de bolo ao pôr do sol com vista da baía: bolo branco drapeado, orquídeas magenta, velas e travessas de doces variados.",
  },
  {
    id: "m4",
    arquivo: "mesa-doces-bandeja.jpg",
    w: 1280,
    h: 853,
    alt: "Mesa de doces com bandeja espelhada de docinhos finalizados com raspas cítricas, ao lado de tortinhas e cestas de doces.",
    credito: "Claudio Porto Fotografia",
  },
  {
    id: "m5",
    arquivo: "bombons-cafe-tule.jpg",
    w: 1280,
    h: 854,
    alt: "Bombons de chocolate finalizados com grão de café, servidos em forminhas de tule cru dentro de uma cesta de palha.",
  },
  {
    id: "m6",
    arquivo: "mesa-doces-branca.webp",
    w: 853,
    h: 1280,
    alt: "Mesa de doces em tons de branco, com travessas de cristal, brigadeiros brancos e arranjos de flores brancas.",
  },
];

/** Caminho público da foto. */
export const mesaPath = (arquivo) => `/images/doces/${arquivo}`;
