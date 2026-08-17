import { CONTACT, RECONHECIMENTO } from "../../config";
import Icon from "../ui/Icon";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import styles from "./Awards.module.css";

/**
 * Prova social. Todos os números aqui são verificáveis nos perfis públicos —
 * nunca acrescente depoimento, nota ou prêmio que não possa ser conferido.
 *
 * Os selos gráficos do Casamentos.com.br não são recriados: são marca do
 * portal. A seção afirma os fatos e aponta para a fonte.
 */
export default function Awards() {
  const { premios, avaliacoes } = RECONHECIMENTO;

  return (
    <section className={styles.section} id="reconhecimento">
      <div className="container">
        <SectionHeading
          align="center"
          label="Reconhecimento"
          title={`${premios.length} anos consecutivos premiados`}
          lead="Quem contratou avaliou. As notas e os prêmios abaixo podem ser conferidos nos perfis públicos da Roman Passion."
        />

        {/* --- Notas: cada card leva ao perfil onde a nota pode ser conferida --- */}
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

        {/* --- Prêmios --- */}
        <Reveal delay={200} className={styles.premios}>
          <h3 className={styles.premiosTitulo}>
            <Icon name="award" size={18} />
            Casamentos Awards
          </h3>
          <ul className={styles.anos}>
            {premios.map((ano) => (
              <li key={ano}>{ano}</li>
            ))}
          </ul>
          <a
            className={styles.fonteLink}
            href={CONTACT.casamentosUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            Ver o perfil no Casamentos.com.br
            <Icon name="arrow" size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
