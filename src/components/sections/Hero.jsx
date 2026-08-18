import { BRAND, whatsappLink } from "../../config";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.glow} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>{BRAND.tagline}</span>

          <h1 className={styles.title}>
            A mesa de doces que combina
            <em> com a sua festa.</em>
          </h1>

          <p className={styles.lead}>{BRAND.manifesto}</p>

          <div className={styles.ctas}>
            <Button variant="solid" href={whatsappLink()} icon="whatsapp">
              Falar com a Roman
            </Button>
            <Button variant="outline" href="#doces">
              Ver os doces
            </Button>
          </div>

          <ul className={styles.meta}>
            <li>
              <Icon name="rings" size={16} />
              {BRAND.assinatura}
            </li>
          </ul>
        </div>

        {/* Selo da marca: medalhão de fios dourados concêntricos */}
        <div className={styles.seal} aria-hidden="true">
          <span className={styles.ring} />
          <span className={styles.ringInner} />
          <img src="/logo.png" alt="" className={styles.sealLogo} />
        </div>
      </div>

      <a href="#doces" className={styles.scrollHint}>
        <span>Explorar</span>
        <span className={styles.scrollLine} />
      </a>
    </section>
  );
}
