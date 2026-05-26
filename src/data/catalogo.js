/**
 * Mock del catálogo de productos y servicios de herrería.
 * Estructura idéntica al futuro struct Rust:
 *   struct Producto { id, nombre, precio_centavos }
 *
 * SAFE MONEY: precio_centavos es INTEGER. Usar formatARS() para mostrar.
 */
export const MOCK_CATALOGO = [
  {
    id: 'prod-1',
    nombre: 'Reja de Seguridad Estándar',
    precio_centavos: 15000000,      // ARS 150.000,00
  },
  {
    id: 'prod-2',
    nombre: 'Portón Corredizo 3x2m',
    precio_centavos: 45000000,      // ARS 450.000,00
  },
  {
    id: 'prod-3',
    nombre: 'Baranda de Balcón (ml)',
    precio_centavos: 8500000,       // ARS 85.000,00
  },
  {
    id: 'prod-4',
    nombre: 'Reja Plegadiza Ventana',
    precio_centavos: 9800000,       // ARS 98.000,00
  },
  {
    id: 'prod-5',
    nombre: 'Escalera Recta Interior',
    precio_centavos: 38000000,      // ARS 380.000,00
  },
  {
    id: 'serv-1',
    nombre: 'Instalación Básica',
    precio_centavos: 5000000,       // ARS 50.000,00
  },
  {
    id: 'serv-2',
    nombre: 'Instalación con Obra Civil',
    precio_centavos: 12000000,      // ARS 120.000,00
  },
  {
    id: 'serv-3',
    nombre: 'Anticorrosivo y Pintura Final',
    precio_centavos: 4500000,       // ARS 45.000,00
  },
]
