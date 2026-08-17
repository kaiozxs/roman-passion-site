import Reveal from "../ui/Reveal";
import Icon from "../ui/Icon";
import SectionHeading from "../ui/SectionHeading";
import styles from "./Atelier.module.css";

/**
 * Os quatro pilares abaixo são texto oficial da marca. Não invente detalhes
 * de produção ou de processo que não estejam confirmados pela empresa.
 */
const STEPS = [
  {
    icon: "hand",
    title: "Experiência e proximidade",
    subtitle: "Degustação presencial e atendimento humanizado",
    text: "A experiência começa antes do grande dia. O cliente conhece nossos sabores em uma degustação presencial e conta com um atendimento próximo durante todo o processo, com transparência e atenção a cada detalhe.",
  },
  {
    icon: "cocoa",
    title: "Curadoria especializada",
    subtitle: "Uma seleção pensada para cada evento",
    text: "Nossa consultoria ajuda a definir sabores, tipos e quantidades de doces de acordo com o número de convidados, o local, a estação do ano e o estilo de cada celebração. Um cardápio autoral, criado para tornar cada evento único.",
  },
  {
    icon: "temper",
    title: "Compromisso em cada detalhe",
    subtitle: "Do planejamento à entrega",
    text: "Cuidamos de toda a jornada com organização, pontualidade e segurança. Da definição do pedido à entrega em todo o Estado do Rio de Janeiro, cada etapa é planejada para que os doces cheguem com todo o cuidado que o seu evento merece.",
  },
  {
    icon: "gift",
    title: "Confiança para celebrar",
    subtitle: "Uma experiência completa, do início ao fim",
    text: "Mais do que fornecer doces, oferecemos suporte para construir a experiência ideal para cada ocasião — de casamentos e aniversários a eventos corporativos e celebrações especiais. Um trabalho baseado em transparência, flexibilidade e na confiança dos nossos clientes.",
  },
];

export default function Atelier() {
  return (
    <section className={styles.section} id="atelier">
      <div className={`container ${styles.inner}`}>
        <SectionHeading
          tone="light"
          label="A Chocolateria"
          title="Do primeiro contato até a entrega"
          lead="A Roman Passion acompanha o cliente em cada etapa, começando pela degustação presencial e passando por uma consultoria especializada para definir os doces ideais para cada celebração. Do planejamento à entrega no grande dia, cuidamos de cada detalhe para que tudo seja perfeito."
        />

        <ol className={styles.steps}>
          {STEPS.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index * 100} className={styles.step}>
              <span className={styles.iconBox}>
                <Icon name={step.icon} size={26} />
              </span>
              <div>
                <h3 className={styles.stepTitle}>
                  <span className={styles.stepNum}>0{index + 1}</span>
                  {step.title}
                </h3>
                <p className={styles.stepSubtitle}>{step.subtitle}</p>
                <p className={styles.stepText}>{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
