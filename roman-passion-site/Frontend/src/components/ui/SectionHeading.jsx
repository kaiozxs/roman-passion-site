import Reveal from "./Reveal";
import styles from "./SectionHeading.module.css";

/**
 * Cabeçalho padrão das seções: sobrelinha em caixa alta, título em serifa
 * e texto de apoio opcional. Mantém o ritmo tipográfico igual em toda a página.
 */
export default function SectionHeading({
  label,
  title,
  lead,
  align = "left",
  tone = "dark",
  id,
}) {
  return (
    <Reveal className={`${styles.wrap} ${styles[align]} ${styles[tone]}`}>
      {label && <span className={styles.label}>{label}</span>}
      <h2 className={styles.title} id={id}>
        {title}
      </h2>
      {lead && <p className={styles.lead}>{lead}</p>}
    </Reveal>
  );
}
