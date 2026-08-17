import { useCallback, useEffect, useRef, useState } from "react";
import { GALLERY, photoPath } from "../../data/gallery";
import Icon from "../ui/Icon";
import SectionHeading from "../ui/SectionHeading";
import styles from "./Gallery.module.css";

/** Uma foto do carrossel. Cai no selo da marca se o arquivo não existir. */
function Foto({ arquivo, alt }) {
  const [falhou, setFalhou] = useState(false);

  if (falhou) {
    return (
      <div className={styles.semFoto}>
        <img src="/logo.png" alt={alt} className={styles.selo} />
        {/* Só em desenvolvimento: mostra qual arquivo está faltando */}
        {import.meta.env.DEV && (
          <code className={styles.faltando}>{arquivo}</code>
        )}
      </div>
    );
  }

  return (
    <img
      className={styles.foto}
      src={photoPath(arquivo)}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFalhou(true)}
    />
  );
}

export default function Gallery() {
  const trilhaRef = useRef(null);
  const [podeVoltar, setPodeVoltar] = useState(false);
  const [podeAvancar, setPodeAvancar] = useState(false);

  const sincronizarSetas = useCallback(() => {
    const el = trilhaRef.current;
    if (!el) return;
    const fim = el.scrollWidth - el.clientWidth;
    setPodeVoltar(el.scrollLeft > 4);
    setPodeAvancar(el.scrollLeft < fim - 4);
  }, []);

  useEffect(() => {
    const el = trilhaRef.current;
    if (!el) return;

    // O ResizeObserver já dispara ao observar, o que define o estado inicial
    // das setas sem precisar chamar setState no corpo do efeito.
    const observer = new ResizeObserver(sincronizarSetas);
    observer.observe(el);

    // Observar SÓ a trilha não basta: a largura dela não muda quando o
    // conteúdo cresce. Se a primeira medição pegar os itens ainda sem largura
    // (em dev o CSS entra depois do primeiro paint), as setas ficariam
    // desativadas para sempre. Observando os itens, a remedição acontece
    // assim que eles ganham tamanho.
    for (const item of el.children) observer.observe(item);

    el.addEventListener("scroll", sincronizarSetas, { passive: true });

    // Rede de segurança: garante ao menos uma medição depois do layout, mesmo
    // que o ResizeObserver não dispare (aba em segundo plano, por exemplo).
    const timer = setTimeout(sincronizarSetas, 0);
    window.addEventListener("load", sincronizarSetas);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
      window.removeEventListener("load", sincronizarSetas);
      el.removeEventListener("scroll", sincronizarSetas);
    };
  }, [sincronizarSetas]);

  /** Avança/volta exatamente uma foto, medindo o passo real (inclui o gap). */
  const mover = (direcao) => {
    const el = trilhaRef.current;
    if (!el) return;

    // `el.children` de propósito: querySelectorAll pegaria elementos internos
    // e o passo sairia errado.
    const itens = el.children;
    const passo =
      itens.length > 1
        ? itens[1].offsetLeft - itens[0].offsetLeft
        : el.clientWidth * 0.8;

    const suave = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direcao * passo, behavior: suave ? "smooth" : "auto" });
  };

  return (
    <section className={styles.section} id="doces">
      <div className={`container ${styles.head}`}>
        <SectionHeading
          label="Os Doces"
          title="Uma seleção de doces planejada para cada celebração, pensamos em tudo com você"
        />

        <div className={styles.setas}>
          <button
            type="button"
            className={styles.seta}
            onClick={() => mover(-1)}
            disabled={!podeVoltar}
            aria-label="Ver fotos anteriores"
          >
            <Icon name="chevronLeft" size={20} />
          </button>
          <button
            type="button"
            className={styles.seta}
            onClick={() => mover(1)}
            disabled={!podeAvancar}
            aria-label="Ver mais fotos"
          >
            <Icon name="chevronRight" size={20} />
          </button>
        </div>
      </div>

      <div className={styles.trilhaWrap}>
        <ul
          className={styles.trilha}
          ref={trilhaRef}
          tabIndex={0}
          role="group"
          aria-label="Fotos dos doces — arraste para o lado para ver mais"
        >
          {GALLERY.map((foto) => (
            <li key={foto.id} className={styles.item}>
              <figure className={styles.moldura}>
                <Foto arquivo={foto.arquivo} alt={foto.alt} />
              </figure>
            </li>
          ))}
        </ul>
      </div>

    </section>
  );
}
