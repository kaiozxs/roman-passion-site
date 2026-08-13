import { CONTACT, whatsappLink } from "../../config";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import styles from "./Order.module.css";

/**
 * Faixa de fechamento: uma única ação.
 *
 * A lista de canais (Instagram, Facebook, Casamentos.com.br) fica só no rodapé,
 * que vem imediatamente abaixo. Ter os dois blocos repetia 5 links a 0px de
 * distância e fazia o card competir com o botão no momento de maior intenção.
 */
export default function Order() {
  return (
    <section className={styles.section} id="encomendas">
      <div className="container">
        <Reveal className={styles.copy}>
          <span className={styles.label}>Orçamento</span>

          <h2 className={styles.title}>
            Conte como será a sua festa e a gente monta o orçamento
          </h2>

          <p className={styles.lead}>
            O atendimento é direto pelo WhatsApp: você descreve a ocasião, a
            quantidade de convidados e a data, e devolvemos a proposta com a
            sugestão de doces. {CONTACT.service}.
          </p>

          <Button variant="solid" href={whatsappLink()} icon="whatsapp">
            Pedir orçamento
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
