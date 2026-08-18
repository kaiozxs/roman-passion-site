import { whatsappLink } from "../../config";
import Icon from "../ui/Icon";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import styles from "./Occasions.module.css";

const OCCASIONS = [
  {
    icon: "rings",
    title: "Casamentos",
    text: "Uma mesa de doces completa, com sabores variados para agradar todos os convidados e uma apresentação que harmoniza com o grande dia.",
    cta: "Falar com a Roman sobre casamento",
  },
  {
    icon: "crown",
    title: "XV anos",
    text: "Uma mesa de doces jovem, criativa e cheia de personalidade, com sabores que conquistam os paladares dos aniversariantes, amigos e convidados.",
    cta: "Falar com a Roman sobre XV anos",
  },
  {
    icon: "gift",
    title: "Aniversários e festas",
    text: "Não importa o tamanho da comemoração. Se existe um motivo para celebrar, temos doces para fazer parte desse momento.",
    cta: "Falar com a Roman sobre festas",
  },
  {
    icon: "corporate",
    title: "Corporativo",
    text: "Sua marca também pode ser lembrada pelo sabor: contrate a Roman para festas corporativas, mesas de doces para confraternizações e eventos de fim de ano, além de lembranças personalizadas com a sua logomarca para tornar cada momento ainda mais especial.",
    cta: "Falar com a Roman sobre eventos corporativos",
  },
];

export default function Occasions() {
  return (
    <section className={styles.section} id="ocasioes">
      <div className="container">
        <SectionHeading
          align="center"
          label="Ocasiões"
          title="Para cada ocasião, uma experiência à altura"
          lead="Atendemos desde grandes celebrações até eventos mais intimistas, sempre com o cuidado da Roman Passion."
        />

        <ul className={styles.grid}>
          {OCCASIONS.map((item, index) => (
            <Reveal as="li" key={item.title} delay={index * 90} className={styles.card}>
              <Icon name={item.icon} size={30} className={styles.icon} />
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.text}>{item.text}</p>
              <a
                className={styles.link}
                href={whatsappLink(`Olá! ${item.cta}.`)}
                target="_blank"
                rel="noreferrer noopener"
              >
                {item.cta}
                <Icon name="arrow" size={16} />
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
