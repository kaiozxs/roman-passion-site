# Fotos dos doces

As 11 fotos do carrossel estão nesta pasta, em `.webp`. **Está tudo no lugar** —
este arquivo é só referência para quando precisar mexer.

## Fotos atuais

A ordem abaixo é a ordem em que aparecem no carrossel (definida em
`src/data/gallery.js`).

| #  | Arquivo                          | Foto                                              |
| -- | -------------------------------- | ------------------------------------------------- |
| 1  | `copinhos-mirtilo.webp`          | Copinhos brancos com creme rosé e mirtilo         |
| 2  | `brigadeiro-branco-morango.webp` | Brigadeiros claros com morango, bandeja espelhada |
| 3  | `bombons-ganache.webp`           | Bombons escuros com ganache, prato de cristal     |
| 4  | `tacas-frutas-vermelhas.webp`    | Taças de creme com calda de frutas vermelhas      |
| 5  | `lembrancas-laco.webp`           | Lembranças com laço de cetim, bowl de madeira     |
| 6  | `suporte-dois-andares.webp`      | Suporte dourado de dois andares                   |
| 7  | `copinhos-frutas-vermelhas.webp` | Copinhos escuros com morango e framboesa          |
| 8  | `copinhos-maracuja.webp`         | Copinhos de chocolate com maracujá                |
| 9  | `copinhos-physalis.webp`         | Copinhos decorados com physalis                   |
| 10 | `brigadeiros-granulado.webp`     | Brigadeiros tradicionais, bowl de vidro           |
| 11 | `mesa-doces-branca.webp`         | Mesa de doces em tons de branco                   |

Os nomes não têm acento nem espaço de propósito: caminho de arquivo na web com
acento causa problema em alguns servidores.

## Para trocar, acrescentar ou reordenar

1. Salve o arquivo nesta pasta.
2. Edite a lista em `src/data/gallery.js` — cada item tem `arquivo` (nome do
   arquivo) e `alt` (descrição da foto, para leitor de tela e para o Google;
   não aparece na tela). A ordem da lista é a ordem do carrossel.

Se um arquivo listado não existir, o carrossel mostra o selo da marca no lugar,
e em modo de desenvolvimento exibe o nome do arquivo que está faltando — nunca
aparece imagem quebrada para o cliente.

## Especificação

- **Não precisa recortar.** A moldura é 4:5 (retrato) e o corte é
  `object-fit: cover` centralizado — funciona com fotos em retrato e em
  paisagem. Só garanta que o doce esteja mais ao centro.
- **Peso máximo ~300KB** por foto. As atuais estão entre 66KB e 188KB.
- **Formato** `.webp` (preferido, menor) ou `.jpg`.
