import { BRAND, CONTACT, NAV_LINKS, whatsappLink } from "../../config";
import Icon from "../ui/Icon";
import styles from "./Footer.module.css";

const SOCIAL = [
  { icon: "whatsapp", label: CONTACT.whatsappLabel, href: whatsappLink() },
  { icon: "instagram", label: `@${CONTACT.instagram}`, href: CONTACT.instagramUrl },
  { icon: "facebook", label: "Facebook", href: CONTACT.facebookUrl },
  { icon: "rings", label: "Casamentos.com.br", href: CONTACT.casamentosUrl },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brandCol}>
          <img
            src="/logo.png"
            alt={BRAND.name}
            className={styles.logo}
            width="64"
            height="64"
          />
          <p className={styles.manifesto}>{BRAND.assinatura}</p>
        </div>

        <nav className={styles.nav} aria-label="Navegação do rodapé">
          <h2 className={styles.colTitle}>Navegar</h2>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.contactCol}>
          <h2 className={styles.colTitle}>Contato</h2>
          <ul className={styles.social}>
            {SOCIAL.map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noreferrer noopener">
                  <Icon name={item.icon} size={18} />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <p className={styles.city}>{CONTACT.city}</p>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          &copy; {new Date().getFullYear()} {BRAND.name}. Todos os direitos
          reservados.
        </p>
        <p>{CONTACT.since}</p>
      </div>
    </footer>
  );
}
