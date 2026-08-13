# Roman Passion — Site

Site institucional da chocolateria, em React + Vite. Página única, estática:
não tem servidor nem banco de dados. As encomendas vão direto para o WhatsApp.

## Rodando

```bash
npm install
npm run dev
```

O site sobe em `http://localhost:5173`.

Outros comandos: `npm run build` (gera `dist/`), `npm run preview`
(serve o build), `npm run lint`.

## Publicação

Hospedado no **Cloudflare Pages**, com deploy automático a cada push na `main`.

| Configuração             | Valor           |
| ------------------------ | --------------- |
| Framework preset         | `Vite`          |
| Build command            | `npm run build` |
| Build output directory   | `dist`          |
| Root directory           | (raiz do repo)  |

A versão do Node fica fixada em `.node-version` — o Vite 8 exige Node 20.19+
ou 22.12+, e sem isso a hospedagem pode tentar usar uma versão antiga.

## Onde mexer

| Preciso mudar…                          | Arquivo                    |
| --------------------------------------- | -------------------------- |
| WhatsApp, Instagram, Facebook, cidade   | `src/config.js`            |
| Fotos do carrossel (ordem, alt)         | `src/data/gallery.js`      |
| Arquivos das fotos                      | `public/images/doces/`     |
| Cores, fontes, espaçamentos             | `src/styles/tokens.css`    |
| Textos das seções                       | `src/components/sections/` |

As 11 fotos e o formato esperado estão documentados em `docs/fotos-dos-doces.md`.

> Documentação fica em `docs/`, nunca em `public/`: tudo dentro de `public/` é
> copiado para o build e fica acessível publicamente no site.

## Estrutura

```
src/
  components/
    layout/     Header, Footer
    sections/   Hero, Gallery (carrossel), Atelier, Occasions, Order
    ui/         Button, Icon, Reveal, SectionHeading
  hooks/        useScrolled
  data/         gallery.js — lista de fotos do carrossel
  styles/       tokens de design + reset global
  config.js     contatos e navegação
public/
  images/doces/ as 11 fotos
  _headers      cabeçalhos HTTP lidos pelo Cloudflare Pages
```

Estilos usam **CSS Modules** (`*.module.css`), co-locados ao componente. Toda
cor, fonte e espaçamento sai dos tokens em `styles/tokens.css`: bordô
`#8B0000`, ouro `#c5a059`, creme `#f5ebe0` e o tom profundo `#1f0409`.

## Decisões que valem saber

- **Sem banco de dados, sem back-end.** A página é estática de propósito: nada
  para cair, nada para manter. O orçamento é montado caso a caso pelo WhatsApp,
  então não há preço nem catálogo dinâmico no site.
- **O carrossel é só imagem.** Sem nome, preço ou descrição na tela, por decisão
  de produto. O texto `alt` de cada foto existe para leitor de tela e para o
  Google — não aparece para o visitante.
- **Nenhuma foto quebra a página.** Se o arquivo não existir, o `onError` troca
  a imagem pelo selo da marca.
- **Sem biblioteca de carrossel.** É rolagem nativa com `scroll-snap`: swipe no
  celular, teclado e trackpad funcionam de graça, e as setas só chamam
  `scrollBy()`. Dois detalhes que já causaram bug e não devem ser desfeitos:
  1. O passo sai de `trilha.children`, **não** de `querySelectorAll`, que
     pegaria os `<li>` internos e daria um passo errado.
  2. O `ResizeObserver` observa a trilha **e cada item**. Observar só a trilha
     não basta: a largura dela não muda quando o conteúdo cresce, então uma
     primeira medição feita antes do CSS ser aplicado deixaria as setas
     desativadas para sempre.
- **O menu mobile depende de uma regra explícita.** `.drawer[hidden]` existe
  porque `[hidden]` do navegador perde para o `display: flex` do autor — sem
  ela, a gaveta fica visível na tela com o menu fechado.
- **O desfoque do cabeçalho fica num `::before`.** `backdrop-filter` no próprio
  `<header>` o transformaria em bloco de contenção, prendendo a gaveta `fixed`
  dentro da altura do cabeçalho.
- **Nada de fato não confirmado.** Horário de atendimento, e-mail e prazo de
  produção foram removidos por não haver dado oficial da empresa. Há um `TODO`
  em `src/config.js` caso venham a ser confirmados.

## Pendência

O `og:image` em `index.html` usa caminho relativo. WhatsApp e Facebook exigem
URL absoluta para exibir a prévia do link — trocar pelo endereço real do site
depois da publicação.
