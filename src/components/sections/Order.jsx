import { ATENDIMENTO, whatsappLink } from "../../config";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Reveal from "../ui/Reveal";
import styles from "./Order.module.css";

/**
 * Faixa de fechamento da página.
 *
 * Layout em duas faixas horizontais em vez de duas colunas: texto em cima,
 * fotos embaixo. Com duas fotos, a coluna de imagens ficaria quase o dobro da
 * altura do texto e sobraria um vazio grande ao lado do botão.
 *
 * Os locais de atendimento ficam em linha, não em caixa empilhada: são três
 * itens curtos, e a caixa alta deixava metade do espaço vazio à direita.
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
        </Reveal>

        {/* Locais em linha, cada um com o seu fio dourado acima */}
        <Reveal delay={100} className={styles.locais}>
          <h3 className={styles.locaisTitulo}>
            <Icon name="pin" size={15} />
            Atendimento presencial em
          </h3>
          <ul>
            {ATENDIMENTO.map((local) => (
              <li key={local}>{local}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={160} className={styles.acao}>
          <Button variant="solid" href={whatsappLink()} icon="whatsapp">
            Falar com a Roman
          </Button>
        </Reveal>

        <ul className={styles.galeria}>
          {FOTOS.map((f, i) => (
            <Reveal as="li" key={f.arquivo} delay={200 + i * 90}>
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
