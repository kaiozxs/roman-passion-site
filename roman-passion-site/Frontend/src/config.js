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
  /** Frase de marca herdada da primeira versão do site. */
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
  city: "Rio de Janeiro, RJ",
  /** Presença verificada no portal de casamentos. */
  since: "No Casamentos.com.br desde 2022",
  /** Como o atendimento funciona (conforme material oficial da marca). */
  service: "Atendimento do primeiro contato até a entrega",

  // TODO (opcional): se a empresa tiver e-mail e horário de atendimento
  // públicos, adicione aqui e inclua nos canais de Order.jsx / Footer.jsx.
  // Foram removidos por não haver dado real confirmado.
};

/** Mensagem que já vai preenchida ao abrir a conversa no WhatsApp. */
export function whatsappLink(
  message = "Olá! Gostaria de fazer um orçamento com a Roman Passion.",
) {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { href: "#doces", label: "Doces" },
  { href: "#atelier", label: "A Chocolateria" },
  { href: "#ocasioes", label: "Ocasiões" },
  { href: "#encomendas", label: "Orçamento" },
];
