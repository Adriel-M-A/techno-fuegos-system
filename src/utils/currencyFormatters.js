/**
 * Formatea centavos enteros a moneda Pesos Argentinos (ARS).
 *
 * CONTRATO SAFE MONEY (Opción A):
 *   - Recibe: centavos enteros (INTEGER). Ejemplo: 4250000 = ARS 42.500,00
 *   - Emite: string formateado en pesos. Ejemplo: "$ 42.500,00"
 *
 * La conversión centavos → pesos ocurre ÚNICAMENTE aquí, en la capa de presentación.
 * Todo el sistema opera internamente con centavos enteros para evitar errores de punto flotante.
 *
 * @param {number} centavos - Monto en centavos enteros (INTEGER).
 * @returns {string} - String formateado en pesos argentinos.
 */
export const formatARS = (centavos) => {
  // Convertir centavos a pesos (única división por 100 permitida en el sistema)
  const pesos = (Number(centavos) || 0) / 100

  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(pesos)
}
