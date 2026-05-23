/**
 * Formatea un valor numérico a moneda Pesos Argentinos (ARS).
 * @param {number} amount - El monto a formatear.
 * @returns {string} - El string formateado con estilo de moneda.
 */
export const formatARS = (amount) => {
  // Asegurarnos de que el monto es un número antes de formatearlo
  const numericAmount = Number(amount) || 0;
  
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numericAmount);
};
