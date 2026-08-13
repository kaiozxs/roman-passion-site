import Reveal from "../ui/Reveal";
import Icon from "../ui/Icon";
import SectionHeading from "../ui/SectionHeading";
import styles from "./Atelier.module.css";

/**
 * Os três pilares abaixo saem do material oficial da marca. Evite adicionar
 * detalhes técnicos de produção que não estejam confirmados pela empresa.
 */
const STEPS = [
  {
    icon: "cocoa",
    title: "Ingredientes selecionados",
    text: "Trabalhamos apenas com os melhores ingredientes do mercado. É o que sustenta o sabor diferenciado que os nossos clientes reconhecem.",
  },
  {
    icon: "hand",
    title: "Sabores e combinações",
    text: "O cardápio é amplo e a seleção é montada junto ao cliente, pensando na experiência de quem vai provar.",
  },
  {
    icon: "gift",
    title: "Apresentação personalizada",
    text: "Cada criação é apresentada em harmonia com a decoração e o tema do evento, para os doces fazerem parte da festa.",
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
          lead="A Roman Passion acompanha o cliente em cada etapa, com atendimento próximo e cordial. Os doces impressionam pelo sabor e pela apresentação — e chegam prontos para compor a festa."
        />

        <ol className={styles.steps}>
          {STEPS.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index * 120} className={styles.step}>
              <span className={styles.iconBox}>
                <Icon name={step.icon} size={26} />
              </span>
              <div>
                <h3 className={styles.stepTitle}>
                  <span className={styles.stepNum}>0{index + 1}</span>
                  {step.title}
                </h3>
                <p className={styles.stepText}>{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
