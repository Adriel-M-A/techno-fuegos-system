/**
 * Mock de la configuración de la empresa (fila única en SQLite).
 * Estructura idéntica al futuro struct Rust:
 *   struct ConfigEmpresa { nombre, telefono, direccion, email, instagram, web,
 *                          validez_dias, clausula_sena, clausula_inflacion }
 *
 * Campos opcionales vacíos ('') serán omitidos en el PDF (lógica condicional de impresión).
 */
export const MOCK_CONFIG_EMPRESA = {
  nombre: 'Techno Fuegos',
  telefono: '+54 911 0000 0000',
  direccion: 'Pilar, Buenos Aires',
  email: 'contacto@technofuegos.com.ar',
  instagram: '@technofuegos',
  web: 'https://technofuegos.com.ar',
  validez_dias: 30,
  clausula_sena: 'Seña requerida del 50% para dar inicio a la fabricación en taller.',
  clausula_inflacion: 'Los precios cotizados están sujetos a variación inflacionaria si no se efectúa la seña en 5 días hábiles.',
}
