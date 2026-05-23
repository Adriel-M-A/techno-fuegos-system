/**
 * Capitaliza solo la primera letra de una cadena y convierte el resto en minúsculas.
 * Ejemplo: "adriel" -> "Adriel"
 * @param {string} text - El texto a formatear.
 * @returns {string} - El texto formateado.
 */
export const capitalizeFirst = (text) => {
  if (!text || typeof text !== 'string') return '';
  const trimmed = text.trim();
  if (trimmed.length === 0) return '';
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
};

/**
 * Capitaliza la primera letra de cada palabra de una cadena.
 * Ejemplo: "adriel montes" -> "Adriel Montes"
 * @param {string} text - El texto a formatear.
 * @returns {string} - El texto formateado.
 */
export const capitalizeWords = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text
    .trim()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Capitaliza como título, ignorando palabras conectoras (preposiciones, artículos, conjunciones).
 * La primera y la última palabra siempre se capitalizan.
 * Ejemplo: "reja de seguridad estandar" -> "Reja de Seguridad Estandar"
 * @param {string} text - El texto a formatear.
 * @returns {string} - El texto formateado.
 */
export const capitalizeTitle = (text) => {
  if (!text || typeof text !== 'string') return '';
  
  const conectores = [
    'de', 'del', 'la', 'el', 'las', 'los', 'un', 'una', 'unos', 'unas', 
    'y', 'e', 'o', 'u', 'en', 'con', 'a', 'por', 'para', 'sin', 'sobre', 'al'
  ];
  
  const words = text.trim().split(/\s+/);
  if (words.length === 0 || words[0] === '') return '';

  return words.map((word, index) => {
    const lowerWord = word.toLowerCase();
    // Siempre capitalizar la primera y última palabra, o si no es conector
    if (index === 0 || index === words.length - 1 || !conectores.includes(lowerWord)) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    return lowerWord;
  }).join(' ');
};
