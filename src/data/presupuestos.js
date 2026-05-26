/**
 * Mock de presupuestos del historial.
 * Estructura idéntica al futuro struct Rust:
 *   struct Presupuesto { id, fecha_emision, cliente_nombre, total_centavos, vendedor_nombre, estado }
 *
 * SAFE MONEY: total_centavos es INTEGER (centavos). Usar formatARS() para mostrar.
 */
export const MOCK_PRESUPUESTOS = [
  {
    id: 1,
    fecha_emision: '2024-03-15',
    cliente_nombre: 'Construcciones Andes S.A.',
    total_centavos: 4250000,        // ARS 42.500,00
    vendedor_nombre: 'Ing. Carlos Ruiz',
    estado: 'aceptado',
  },
  {
    id: 2,
    fecha_emision: '2024-03-12',
    cliente_nombre: 'Minería del Norte Ltda.',
    total_centavos: 12800000,       // ARS 128.000,00
    vendedor_nombre: 'Arq. Elena Soto',
    estado: 'entregado',
  },
  {
    id: 3,
    fecha_emision: '2024-03-05',
    cliente_nombre: 'Inmobiliaria Horizonte',
    total_centavos: 1240000,        // ARS 12.400,00
    vendedor_nombre: 'Ing. Carlos Ruiz',
    estado: 'vencido',
  },
  {
    id: 4,
    fecha_emision: '2024-03-16',
    cliente_nombre: 'Logística Integral S.A.',
    total_centavos: 520000,         // ARS 5.200,00
    vendedor_nombre: 'Arq. Elena Soto',
    estado: 'borrador',
  },
  {
    id: 5,
    fecha_emision: '2024-03-17',
    cliente_nombre: 'Metalúrgica Pilar',
    total_centavos: 1540000,        // ARS 15.400,00
    vendedor_nombre: 'Ing. Carlos Ruiz',
    estado: 'aceptado',
  },
  {
    id: 6,
    fecha_emision: '2024-03-18',
    cliente_nombre: 'Siderurgia del Sur',
    total_centavos: 9800000,        // ARS 98.000,00
    vendedor_nombre: 'Arq. Elena Soto',
    estado: 'entregado',
  },
  {
    id: 7,
    fecha_emision: '2024-03-19',
    cliente_nombre: 'Inversiones Patagónicas',
    total_centavos: 6720000,        // ARS 67.200,00
    vendedor_nombre: 'Ing. Carlos Ruiz',
    estado: 'borrador',
  },
  {
    id: 8,
    fecha_emision: '2024-03-20',
    cliente_nombre: 'Distribuidora Centro',
    total_centavos: 3100000,        // ARS 31.000,00
    vendedor_nombre: 'Arq. Elena Soto',
    estado: 'aceptado',
  },
]
