import Icon from "./Icon";
import styles from "./Button.module.css";

/**
 * Botão de ação. Renderiza <a> quando recebe `href`, <button> caso contrário,
 * para não fabricar link falso nem botão que deveria navegar.
 */
export default function Button({
  variant = "solid",
  href,
  icon,
  children,
  className = "",
  ...rest
}) {
  const classes = [styles.btn, styles[variant], className].filter(Boolean).join(" ");

  const content = (
    <>
      {icon && <Icon name={icon} size={18} className={styles.icon} />}
      <span>{children}</span>
    </>
  );

  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        className={classes}
        href={href}
        {...(external && { target: "_blank", rel: "noreferrer noopener" })}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={classes} type="button" {...rest}>
      {content}
    </button>
  );
}
