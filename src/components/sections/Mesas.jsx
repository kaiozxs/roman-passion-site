import { useCallback, useEffect, useState } from "react";
import { MESAS, mesaPath } from "../../data/mesas";
import Icon from "../ui/Icon";
import SectionHeading from "../ui/SectionHeading";
import styles from "./Mesas.module.css";

/**
 * Mosaico de mesas montadas, com visor em tela cheia.
 *
 * O mosaico usa colunas CSS (`column-count`), não grid: assim cada foto mantém
 * a proporção original e as colunas se encaixam sozinhas, sem recorte e sem
 * as sobras que um grid de linhas fixas deixaria com fotos de formatos
 * diferentes.
 */
export default function Mesas() {
  /** Índice da foto aberta no visor, ou null quando fechado. */
  const [aberta, setAberta] = useState(null);

  const fechar = useCallback(() => setAberta(null), []);
  const mover = useCallback(
    (passo) => setAberta((i) => (i === null ? i : (i + passo + MESAS.length) % MESAS.length)),
    [],
  );

  useEffect(() => {
    if (aberta === null) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") fechar();
      else if (e.key === "ArrowRight") mover(1);
      else if (e.key === "ArrowLeft") mover(-1);
    };

    document.body.classList.add("is-locked");
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("is-locked");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [aberta, fechar, mover]);

  const foto = aberta === null ? null : MESAS[aberta];

  return (
    <section className={styles.section} id="eventos">
      <div className="container">
        <SectionHeading
          tone="light"
          label="Eventos que realizamos"
          title="Cada evento tem a sua mesa"
          lead="Fotos de casamentos e celebrações reais que atendemos. Clique em qualquer imagem para ver de perto."
        />

        <ul className={styles.mosaico}>
          {MESAS.map((m, i) => (
            <li key={m.id} className={styles.item}>
              <button
                type="button"
                className={styles.botao}
                onClick={() => setAberta(i)}
                aria-label={`Ampliar: ${m.alt}`}
              >
                <img
                  src={mesaPath(m.arquivo)}
                  width={m.w}
                  height={m.h}
                  alt={m.alt}
                  loading="lazy"
                  decoding="async"
                  className={styles.foto}
                />
                <span className={styles.lupa} aria-hidden="true">
                  <Icon name="search" size={18} />
                </span>
                {/* Sem etiqueta de crédito sobre a miniatura: as fotos que têm
                    autor já traziam a marca d'água do fotógrafo gravada, e
                    duplicar o crédito só sujava a imagem. O crédito aparece no
                    visor, na legenda abaixo da foto. */}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* --- Visor em tela cheia --- */}
      {foto && (
        <div
          className={styles.visor}
          role="dialog"
          aria-modal="true"
          aria-label="Visualização ampliada"
          onClick={fechar}
        >
          <button
            type="button"
            className={`${styles.visorBtn} ${styles.fechar}`}
            onClick={fechar}
            aria-label="Fechar"
            autoFocus
          >
            <Icon name="close" size={22} />
          </button>

          <button
            type="button"
            className={`${styles.visorBtn} ${styles.anterior}`}
            onClick={(e) => {
              e.stopPropagation();
              mover(-1);
            }}
            aria-label="Foto anterior"
          >
            <Icon name="chevronLeft" size={24} />
          </button>

          {/* stopPropagation: clicar na foto não fecha, clicar no fundo fecha */}
          <figure className={styles.visorFigura} onClick={(e) => e.stopPropagation()}>
            <img src={mesaPath(foto.arquivo)} alt={foto.alt} className={styles.visorFoto} />
            <figcaption className={styles.visorLegenda}>
              <span>
                {aberta + 1} / {MESAS.length}
              </span>
              {foto.credito && <span>Foto: {foto.credito}</span>}
            </figcaption>
          </figure>

          <button
            type="button"
            className={`${styles.visorBtn} ${styles.proxima}`}
            onClick={(e) => {
              e.stopPropagation();
              mover(1);
            }}
            aria-label="Próxima foto"
          >
            <Icon name="chevronRight" size={24} />
          </button>
        </div>
      )}
    </section>
  );
}
