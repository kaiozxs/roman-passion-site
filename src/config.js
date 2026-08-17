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
  /** Assinatura da marca, exibida no hero e no rodapé. */
  assinatura: "Desde 2019, adoçando momentos que ficam para sempre.",
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
  city: "Rio de Janeiro, RJ",
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

/** Endereço da unidade do Shopping Nova América (conforme o perfil no Google). */
export const ENDERECO =
  "Av. Pastor Martin Luther King Jr., 126 — Torre Offices 1000, Nova América, Rio de Janeiro — RJ, 20765-000";

/**
 * Reconhecimento público. Números conferidos nos perfis em agosto de 2026 —
 * eles mudam com o tempo, então atualize aqui quando necessário.
 *
 * Os selos oficiais do Casamentos.com.br não são reproduzidos no site: são
 * marca registrada do portal. Exibimos os fatos e linkamos a fonte.
 */
export const RECONHECIMENTO = {
  /** Anos em que a marca recebeu o Casamentos Awards. */
  premios: ["2023", "2024", "2025", "2026"],
  avaliacoes: [
    { fonte: "Google", nota: "5,0", volume: "34 avaliações" },
    { fonte: "Casamentos.com.br", nota: "5,0", volume: "100 opiniões" },
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
