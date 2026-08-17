import { ATENDIMENTO, whatsappLink } from "../../config";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Reveal from "../ui/Reveal";
import styles from "./Order.module.css";

/**
 * Faixa de fechamento: uma única ação, agendar a degustação presencial.
 *
 * A lista de canais fica só no rodapé, que vem imediatamente abaixo.
 */
export default function Order() {
  return (
    <section className={styles.section} id="degustacao">
      <div className="container">
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

          <p className={styles.fecho}>
            Entre em contato para saber mais e agendar seu atendimento com a Roman.
          </p>

          <Button variant="solid" href={whatsappLink()} icon="whatsapp">
            Falar com a Roman
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
