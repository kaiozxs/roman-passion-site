import { ATENDIMENTO, whatsappLink } from "../../config";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Reveal from "../ui/Reveal";
import styles from "./Order.module.css";

/**
 * Faixa de fechamento: texto à esquerda, fotos empilhadas à direita.
 *
 * As duas fotos usam proporção 4:3 — empilhadas, somam altura próxima à do
 * texto ao lado, o que mantém as duas colunas equilibradas. Em proporção
 * original (3:4) a pilha ficaria quase o dobro da altura do texto.
 */
const FOTOS = [
  {
    arquivo: "degustacao-mesa.jpg",
    alt: "Mesa de degustação montada: bandejas espelhadas com bombons e doces variados, jarra de água, taças azuis, guardanapos e a folha de boas-vindas da degustação Roman.",
  },
  {
    arquivo: "degustacao-bandejas.jpg",
    alt: "Bandeja espelhada com doces variados: copinhos de chocolate com frutas vermelhas, tortinhas de mirtilo, bem-casados e taças de creme com calda.",
  },
];

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

          {/* Locais com fio dourado acima de cada um, em vez de caixa fechada:
              são três itens curtos, e a caixa deixava metade do espaço vazio à
              direita e competia em peso com o botão logo abaixo. */}
          <div className={styles.locais}>
            <h3 className={styles.locaisTitulo}>
              <Icon name="pin" size={15} />
              Atendimento presencial em
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

        <ul className={styles.galeria}>
          {FOTOS.map((f, i) => (
            <Reveal as="li" key={f.arquivo} delay={140 + i * 90}>
              <figure className={styles.figura}>
                <img
                  src={`/images/doces/${f.arquivo}`}
                  width="960"
                  height="1280"
                  alt={f.alt}
                  loading="lazy"
                  decoding="async"
                  className={styles.foto}
                />
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
