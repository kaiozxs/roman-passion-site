/**
 * Conjunto de ícones em traço, desenhados na mesma grade de 24px.
 * Traço único e uniforme para casar com as hairlines douradas do layout.
 */
const PATHS = {
  cocoa: (
    <>
      <path d="M12 21c-4.5-1.5-7-5.5-7-10.5V4.5l4 1.5 3-2.5 3 2.5 4-1.5v6c0 5-2.5 9-7 10.5Z" />
      <path d="M12 8v9" />
      <path d="M12 12c1.6 0 3-1.2 3-2.8M12 12c-1.6 0-3-1.2-3-2.8" />
    </>
  ),
  hand: (
    <>
      <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M12 11V4.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M15 11V6.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-1a6 6 0 0 1-6-6v-3.5a1.5 1.5 0 0 1 3 0V13" />
    </>
  ),
  temper: (
    <>
      <path d="M10 13.5V5a2 2 0 1 1 4 0v8.5a4.5 4.5 0 1 1-4 0Z" />
      <path d="M12 17.5v-2" />
    </>
  ),
  gift: (
    <>
      <path d="M4 10h16v10H4z" />
      <path d="M4 10h16M12 10v10" />
      <path d="M12 10S9.5 4 7 5.5 9.5 10 12 10Zm0 0s2.5-6 5-4.5S14.5 10 12 10Z" />
    </>
  ),
  rings: (
    <>
      <circle cx="9.5" cy="14.5" r="5.5" />
      <circle cx="15.5" cy="14.5" r="5.5" />
      <path d="M12.5 4.5 14 7h-3l1.5-2.5Z" />
    </>
  ),
  corporate: (
    <>
      <path d="M3 20h18" />
      <path d="M5 20V8l7-4 7 4v12" />
      <path d="M10 20v-6h4v6" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M4 20l1.3-4A8 8 0 1 1 8.4 19L4 20Z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.6 0 1.1-.5 1.1-1.1l-1.6-.8-1 1a5.6 5.6 0 0 1-2.6-2.6l1-1-.8-1.6c-.6 0-1.1.5-1.1 1.1Z" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <path d="M16.8 7.2h.01" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6.5-5.5 6.5-10a6.5 6.5 0 1 0-13 0C5.5 15.5 12 21 12 21Z" />
      <circle cx="12" cy="11" r="2.5" />
    </>
  ),
  facebook: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <path d="M15.5 8h-1.75A2.25 2.25 0 0 0 11.5 10.25V21M9.25 13.4h5" />
    </>
  ),
  /* Coroa: usada para XV anos */
  crown: (
    <>
      <path d="M3.5 8.5l3 3.5 3-6 2.5 5 2.5-5 3 6 3-3.5-2 10h-13l-2-10Z" />
      <path d="M6 21h12" />
    </>
  ),
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  chevronLeft: <path d="m14.5 6-6 6 6 6" />,
  chevronRight: <path d="m9.5 6 6 6-6 6" />,
};

export default function Icon({ name, size = 24, className, ...rest }) {
  const path = PATHS[name];
  if (!path) return null;

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {path}
    </svg>
  );
}
