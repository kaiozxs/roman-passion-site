import { useEffect, useState } from "react";
import { BRAND, NAV_LINKS, whatsappLink } from "../../config";
import { useScrolled } from "../../hooks/useScrolled";
import Button from "../ui/Button";
import styles from "./Header.module.css";

export default function Header() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);

  // Trava o scroll do corpo e fecha no Escape enquanto o menu está aberto
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.body.classList.add("is-locked");
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("is-locked");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.condensed : ""}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.brand}>
          <img
            src="/logo.png"
            alt={`${BRAND.name} — ${BRAND.tagline}`}
            className={styles.logo}
            width="64"
            height="64"
          />
          <span className={styles.brandText}>
            <strong>{BRAND.name}</strong>
            <small>{BRAND.tagline}</small>
          </span>
        </a>

        <nav className={styles.nav} aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <Button
            variant="outline"
            href={whatsappLink()}
            icon="whatsapp"
            className={styles.headerCta}
          >
            Falar com a Roman
          </Button>

          <button
            type="button"
            className={styles.burger}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={menuOpen ? styles.barTop : ""} />
            <span className={menuOpen ? styles.barMid : ""} />
          </button>
        </div>
      </div>

      {/* O `hidden` é quem controla a visibilidade — ver a regra
          `.drawer[hidden]` no CSS, sem ela a gaveta não some. */}
      <div id="menu-mobile" className={styles.drawer} hidden={!menuOpen}>
        <nav aria-label="Navegação mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.drawerLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <Button
          variant="solid"
          href={whatsappLink()}
          icon="whatsapp"
          className={styles.drawerCta}
        >
          Falar com a Roman
        </Button>
      </div>
    </header>
  );
}
