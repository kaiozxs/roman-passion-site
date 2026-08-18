import { RECONHECIMENTO } from "../../config";
import Icon from "../ui/Icon";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import styles from "./Awards.module.css";

/**
 * Prova social. Todos os números aqui são verificáveis nos perfis públicos —
 * nunca acrescente depoimento, nota ou prêmio que não possa ser conferido.
 *
 * Os selos do Casamentos Awards ficam no rodapé, não aqui.
 */
export default function Awards() {
  const { avaliacoes } = RECONHECIMENTO;

  return (
    <section className={styles.section} id="reconhecimento">
      <div className="container">
        <SectionHeading
          align="center"
          label="Reconhecimento"
          title="Nota máxima nos dois portais"
          lead="Quem contratou avaliou. As notas abaixo podem ser conferidas nos perfis públicos da Roman Passion."
        />

        <ul className={styles.notas}>
          {avaliacoes.map((a, i) => (
            <Reveal as="li" key={a.fonte} delay={i * 100}>
              <a
                className={styles.nota}
                href={a.url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Ver as ${a.volume} no ${a.fonte}, nota ${a.nota} de 5`}
              >
                <div className={styles.estrelas} aria-hidden="true">
                  {Array.from({ length: 5 }, (_, n) => (
                    <Icon key={n} name="star" size={16} />
                  ))}
                </div>
                <strong className={styles.valor}>{a.nota}</strong>
                <span className={styles.fonte}>{a.fonte}</span>
                <span className={styles.volume}>{a.volume}</span>
                <span className={styles.verPerfil}>
                  Ver avaliações
                  <Icon name="external" size={14} />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
