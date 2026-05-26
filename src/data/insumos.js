/**
 * Mock de insumos/materiales del catálogo base.
 * Estructura idéntica al futuro struct Rust:
 *   struct Insumo { id, material, unidad, costo_centavos }
 *
 * SAFE MONEY: costo_centavos es INTEGER. Usar formatARS() para mostrar.
 * El display en el input muestra costo_centavos / 100 con separador coma.
 */
export const MOCK_INSUMOS = [
  {
    id: '1',
    material: 'Chapa de hierro dulce (1.2mm)',
    unidad: 'kilo',
    costo_centavos: 145000,         // ARS 1.450,00
  },
  {
    id: '2',
    material: 'Caño estructural 40x40x1.6mm',
    unidad: 'metro',
    costo_centavos: 280000,         // ARS 2.800,00
  },
  {
    id: '3',
    material: 'Pintura antióxido negro',
    unidad: 'litro',
    costo_centavos: 540000,         // ARS 5.400,00
  },
  {
    id: '4',
    material: 'Electrodo punta azul 2.5mm',
    unidad: 'cantidad',
    costo_centavos: 8500,           // ARS 85,00
  },
  {
    id: '5',
    material: 'Ángulo de hierro 30x30x3mm',
    unidad: 'metro',
    costo_centavos: 190000,         // ARS 1.900,00
  },
  {
    id: '6',
    material: 'Disco de corte 115mm',
    unidad: 'cantidad',
    costo_centavos: 12000,          // ARS 120,00
  },
]
