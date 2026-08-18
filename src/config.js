/**
 * Configuração pública do site.
 *
 * Dados de contato reais da Roman Passion. Nada aqui é secreto — este arquivo
 * vai para o bundle do navegador, então nunca coloque senha ou token.
 */

/** Base da API. Em produção, defina VITE_API_URL no ambiente de build. */
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export const BRAND = {
  name: "Roman Passion",
  tagline: "Chocolateria Artesanal",
  /** Assinatura da marca, exibida no rodapé. */
  assinatura: "Desde 2019, adoçando momentos que ficam para sempre.",
  /** Manifesto da marca, exibido na linha de meta do hero. */
  manifesto:
    "Transformando seus momentos inesquecíveis em experiências inigualavelmente doces.",
};

export const CONTACT = {
  /** Número da empresa, apenas dígitos com DDI+DDD (+55 21 99457-0859). */
  whatsapp: "5521994570859",
  /** Versão formatada, para exibir na tela. */
  whatsappLabel: "+55 21 99457-0859",
  instagram: "romanpassion.chocolateria",
  instagramUrl: "https://www.instagram.com/romanpassion.chocolateria/",
  facebookUrl: "https://www.facebook.com/RomanPassionChocolateria/",
  casamentosUrl:
    "https://www.casamentos.com.br/doces-casamento/roman-passion-chocolateria--e362448",
  /**
   * Perfil no Google. É uma busca do Maps pelo nome exato da empresa, que cai
   * na ficha certa.
   * TODO: trocar pelo link direto — no perfil do Google, botão "Compartilhar"
   * gera uma URL curta (maps.app.goo.gl/...) que aponta sem intermediários.
   */
  googleUrl:
    "https://www.google.com/maps/search/?api=1&query=Roman+Passion+Doces+Finos+%26+Bem+Casados+Nova+Am%C3%A9rica+Rio+de+Janeiro",
  /** Presença verificada no portal de casamentos (conferido no perfil). */
  since: "No Casamentos.com.br desde 2019",
  /** Alcance da entrega. */
  entrega: "Entregamos em todo o Estado do Rio de Janeiro",
};

/** Onde a degustação presencial acontece. */
export const ATENDIMENTO = [
  "Shopping Nova América — RJ",
  "Pendotiba — Niterói/RJ",
  "São Gonçalo — RJ",
];

/**
 * Reconhecimento público. Números conferidos nos perfis em agosto de 2026 —
 * eles mudam com o tempo, então atualize aqui quando necessário.
 *
 * Os selos são os arquivos oficiais fornecidos pelo próprio Casamentos.com.br
 * aos fornecedores premiados. Nunca desenhe uma imitação deles: a arte é marca
 * registrada do portal.
 */
export const RECONHECIMENTO = {
  /** Anos em que a marca recebeu o Casamentos Awards, do mais recente ao antigo. */
  premios: [
    { ano: "2026", arquivo: "selo-casamentos-2026.jpg" },
    { ano: "2025", arquivo: "selo-casamentos-2025.jpg" },
    { ano: "2024", arquivo: "selo-casamentos-2024.jpg" },
    { ano: "2023", arquivo: "selo-casamentos-2023.jpg" },
  ],
  /** `url` torna o card clicável — a nota deixa de ser afirmação e vira prova. */
  avaliacoes: [
    {
      fonte: "Google",
      nota: "5,0",
      volume: "34 avaliações",
      url: CONTACT.googleUrl,
    },
    {
      fonte: "Casamentos.com.br",
      nota: "5,0",
      volume: "100 opiniões",
      url: CONTACT.casamentosUrl,
    },
  ],
};

/** Mensagem que já vai preenchida ao abrir a conversa no WhatsApp. */
export function whatsappLink(
  message = "Olá! Gostaria de falar com a Roman e agendar uma degustação.",
) {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { href: "#doces", label: "Doces" },
  { href: "#atelier", label: "A Chocolateria" },
  { href: "#ocasioes", label: "Ocasiões" },
  { href: "#degustacao", label: "Degustação" },
];
