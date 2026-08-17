/** Numeração de listas: 0 -> "01". */
export function ordinal(index) {
  return String(index + 1).padStart(2, "0");
}
