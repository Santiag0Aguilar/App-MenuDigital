export function validateWorkingHours(entrada, salida) {
  if (!entrada || !salida) return null;

  const start = new Date(entrada);
  const end = new Date(salida);

  if (end <= start) {
    return -1;
  }

  const diff = (end - start) / 1000 / 60 / 60;

  return Number(diff.toFixed(2));
}
