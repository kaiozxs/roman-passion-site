import { ATENDIMENTO, whatsappLink } from "../../config";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Reveal from "../ui/Reveal";
import styles from "./Order.module.css";

/**
 * Faixa de fechamento: texto à esquerda, foto da mesa de degustação à direita.
 *
 * A foto mostra o atendimento que o texto descreve — a mesa montada, com a
 * folha de boas-vindas, as taças e as bandejas de prova.
 */
export default function Order() {
  return (
    <section className={styles.section} id="degustacao">
      <div className={`container ${styles.inner}`}>
        <Reveal className={styles.copy}>
          <span className={styles.label}>Degustação</span>

          <h2 className={styles.title}>
            Conte como será a sua festa e agende sua degustação presencial
          </h2>

          <p className={styles.lead}>
            Mais do que escolher doces, queremos fazer parte da construção de um
            momento único. Nosso atendimento é presencial, personalizado e
            exclusivo, com hora marcada, para que os noivos, acompanhados de até
            2 pessoas, possam conhecer nossas opções, esclarecer todas as dúvidas
            e receber sugestões pensadas especialmente para o estilo da
            celebração. Juntos, vamos criar uma mesa de doces que encante os
            olhos, conquiste os paladares e se torne parte inesquecível da
            história desse grande dia.
          </p>

          <div className={styles.locais}>
            <h3 className={styles.locaisTitulo}>
              <Icon name="pin" size={16} />
              Atendimento em
            </h3>
            <ul>
              {ATENDIMENTO.map((local) => (
                <li key={local}>{local}</li>
              ))}
            </ul>
          </div>

          <Button variant="solid" href={whatsappLink()} icon="whatsapp">
            Falar com a Roman
          </Button>
        </Reveal>

        <Reveal delay={140} className={styles.figura}>
          <img
            src="/images/doces/degustacao-mesa.jpg"
            width="960"
            height="1280"
            alt="Mesa de degustação montada: duas bandejas espelhadas com bombons e doces variados, jarra de água, taças azuis, guardanapos e a folha de boas-vindas da degustação Roman."
            loading="lazy"
            decoding="async"
            className={styles.foto}
          />
        </Reveal>
      </div>
    </section>
  );
}
