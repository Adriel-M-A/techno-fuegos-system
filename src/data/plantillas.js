/**
 * Mock de plantillas de presupuesto guardadas.
 * Estructura idéntica al futuro struct Rust (presupuestos con es_plantilla = 1):
 *   struct Plantilla { id, nombre, descripcion_general, items }
 *
 * Cada plantilla contiene un desglose de materiales base en centavos enteros (SAFE MONEY)
 * y una descripción general del presupuesto opcional.
 * Estas plantillas auto-pueblan la grilla interactiva y el textarea del Creador cuando se seleccionan.
 */
export const MOCK_PLANTILLAS = [
  {
    id: 'tmpl-1',
    nombre: 'Presupuesto Rejas Estándar',
    descripcion_general: 'Fabricación e instalación de rejas frontales de seguridad con tubos redondos de hierro dulce y marcos reforzados.',
    mano_de_obra_centavos: 12000000, // $120.000,00 de mano de obra inicial de taller
    items: [
      { product_id: 'prod-1', quantity: 2, unit_price_centavos: 15000000 }, // 2 Rejas de Seguridad
      { product_id: 'serv-1', quantity: 1, unit_price_centavos: 5000000 },  // 1 Instalación Básica
    ]
  },
  {
    id: 'tmpl-2',
    nombre: 'Presupuesto Portón Corredizo',
    descripcion_general: 'Fabricación de portón corredizo industrial a medida de 3x2m con guías inferiores, poleas reforzadas de acero y rodamiento suave.',
    mano_de_obra_centavos: 35000000, // $350.000,00 de mano de obra de taller
    items: [
      { product_id: 'prod-2', quantity: 1, unit_price_centavos: 45000000 }, // 1 Portón Corredizo 3x2m
      { product_id: 'serv-2', quantity: 1, unit_price_centavos: 12000000 }, // 1 Instalación con Obra Civil
      { product_id: 'serv-3', quantity: 1, unit_price_centavos: 4500000 },  // 1 Pintura Final
    ]
  },
  {
    id: 'tmpl-3',
    nombre: 'Presupuesto Baranda de Balcón',
    descripcion_general: '', // Descripción vacía para simular plantillas que no la tienen configurada
    mano_de_obra_centavos: 8500000, // $85.000,00 de mano de obra
    items: [
      { product_id: 'prod-3', quantity: 6, unit_price_centavos: 8500000 },  // 6m de Baranda de Balcón
      { product_id: 'serv-1', quantity: 1, unit_price_centavos: 5000000 },  // 1 Instalación Básica
      { product_id: 'serv-3', quantity: 1, unit_price_centavos: 4500000 },  // 1 Pintura Final
    ]
  },
  {
    id: 'tmpl-4',
    nombre: 'Presupuesto Escalera Interior',
    descripcion_general: 'Diseño, fabricación e instalación en taller de escalera recta interior construida en perfiles UPN con escalones de metal desplegado antideslizante.',
    // Sin mano de obra predefinida para probar la rama condicional de carga a cero
    items: [
      { product_id: 'prod-5', quantity: 1, unit_price_centavos: 38000000 }, // 1 Escalera Recta Interior
      { product_id: 'serv-2', quantity: 1, unit_price_centavos: 12000000 }, // 1 Instalación con Obra Civil
    ]
  },
]
