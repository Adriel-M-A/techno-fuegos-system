/**
 * Mock de plantillas de presupuesto guardadas.
 * Estructura idéntica al futuro struct Rust (presupuestos con es_plantilla = 1):
 *   struct Plantilla { id, nombre }
 *
 * Estas plantillas auto-pueblan el formulario del Creador cuando se seleccionan.
 */
export const MOCK_PLANTILLAS = [
  { id: 'tmpl-1', nombre: 'Presupuesto Rejas Estándar' },
  { id: 'tmpl-2', nombre: 'Presupuesto Portón Herrería' },
  { id: 'tmpl-3', nombre: 'Presupuesto Baranda de Balcón' },
  { id: 'tmpl-4', nombre: 'Presupuesto Escalera Interior' },
]
