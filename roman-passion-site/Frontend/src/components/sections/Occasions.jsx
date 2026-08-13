import { whatsappLink } from "../../config";
import Icon from "../ui/Icon";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import styles from "./Occasions.module.css";

const OCCASIONS = [
  {
    icon: "rings",
    title: "Casamentos",
    text: "Mesa de doces e lembranças para os convidados, com apresentação alinhada à decoração e ao cerimonial.",
    cta: "Orçar para o meu casamento",
  },
  {
    icon: "gift",
    title: "Aniversários e festas",
    text: "Doces que acompanham o tema da festa, do formato às cores, para adultos e crianças.",
    cta: "Orçar para a minha festa",
  },
  {
    icon: "corporate",
    title: "Corporativo",
    text: "Brindes para clientes e equipes, kits de fim de ano e datas comemorativas, com embalagem personalizada.",
    cta: "Falar sobre brindes",
  },
];

export default function Occasions() {
  return (
    <section className={styles.section} id="ocasioes">
      <div className="container">
        <SectionHeading
          align="center"
          label="Ocasiões"
          title="Para onde os nossos doces costumam ir"
          lead="Atendemos eventos de qualquer tamanho, da caixa de presente à mesa completa de um casamento."
        />

        <ul className={styles.grid}>
          {OCCASIONS.map((item, index) => (
            <Reveal as="li" key={item.title} delay={index * 110} className={styles.card}>
              <Icon name={item.icon} size={30} className={styles.icon} />
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.text}>{item.text}</p>
              <a
                className={styles.link}
                href={whatsappLink(`Olá! ${item.cta} — ${item.title}.`)}
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
