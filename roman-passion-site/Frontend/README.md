# Roman Passion — Site

Site institucional da chocolateria, em React + Vite. O painel administrativo
(`dashboard.html` / `login.html`) é uma aplicação separada em JS puro que
convive na mesma pasta e **não** passa pelo build do Vite.

## Rodando

```bash
npm install
npm run dev
```

O site sobe em `http://localhost:5173`.

Outros comandos: `npm run build` (gera `dist/`), `npm run preview`
(serve o build), `npm run lint`.

## ⚠️ Pendência: as fotos dos doces

A pasta `public/images/doces/` está vazia. Enquanto os arquivos não existirem,
o carrossel mostra o selo da marca no lugar de cada foto — e, em modo de
desenvolvimento, o nome do arquivo que está faltando.

Os 11 nomes esperados estão em `docs/fotos-dos-doces.md`.

> Documentação fica em `docs/`, nunca em `public/`: tudo dentro de `public/` é
> copiado para o build e fica acessível publicamente no site.

## Onde mexer

| Preciso mudar…                          | Arquivo                    |
| --------------------------------------- | -------------------------- |
| WhatsApp, Instagram, Facebook, cidade   | `src/config.js`            |
| **Fotos do carrossel** (ordem, alt)     | `src/data/gallery.js`      |
| Arquivos das fotos                      | `public/images/doces/`     |
| Cores, fontes, espaçamentos             | `src/styles/tokens.css`    |
| Textos das seções                       | `src/components/sections/` |

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
```

Estilos usam **CSS Modules** (`*.module.css`), co-locados ao componente. Toda
cor, fonte e espaçamento sai dos tokens em `styles/tokens.css` — a paleta é a
mesma do painel administrativo (bordô `#8B0000`, ouro `#c5a059`, creme).

## Decisões que valem saber

- **O carrossel é só imagem.** Sem nome, preço ou descrição na tela, por decisão
  de produto. O texto `alt` de cada foto existe para leitor de tela e para o
  Google — não aparece para o visitante.
- **Nenhuma foto quebra a página.** Se o arquivo não existir, o `onError` troca
  a imagem pelo selo da marca. Vale para 404 em produção e para o fallback HTML
  do dev server do Vite (que responde 200 com `index.html`).
- **Sem biblioteca de carrossel.** É rolagem nativa com `scroll-snap`: swipe no
  celular, teclado e trackpad funcionam de graça, e as setas só chamam
  `scrollBy()`. Dois detalhes que já causaram bug e não devem ser desfeitos:
  1. O passo sai de `trilha.children`, **não** de `querySelectorAll`, que
     pegaria elementos internos e daria um passo errado.
  2. O `ResizeObserver` observa a trilha **e cada item**. Observar só a trilha
     não basta: a largura dela não muda quando o conteúdo cresce, então uma
     primeira medição feita antes do CSS ser aplicado deixaria as setas
     desativadas para sempre. Há ainda um `setTimeout` de rede de segurança
     para o caso de o observer não disparar (aba em segundo plano).
- **Sem preços no site.** O orçamento é montado caso a caso pelo WhatsApp.
- **Sem integração com a API nesta seção.** O carrossel é de fotos estáticas: a
  tabela `produtos` não tem coluna de imagem, então não havia o que consumir. O
  hook `useCatalog` foi removido por ter ficado sem uso. Se a tabela ganhar
  imagens e quiser voltar a ler do banco, é um hook novo alimentando
  `src/data/gallery.js`.
- **Nada de fato não confirmado.** Horário de atendimento, e-mail, prazo de
  produção e detalhes técnicos de produção foram removidos por não haver dado
  oficial. Se a empresa confirmar algum, há um `TODO` em `src/config.js`.
