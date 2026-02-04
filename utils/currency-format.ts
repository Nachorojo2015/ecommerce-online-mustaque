export function currencyFormat(value: number): string {
  const formatted = new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 2,
  }).format(value);

  return `$ARS ${formatted}`;
}
