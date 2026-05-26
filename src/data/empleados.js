/**
 * Mock de empleados/vendedores activos del sistema.
 * Estructura idéntica al futuro struct Rust:
 *   struct Empleado { id, nombre, activo }
 *
 * activo: 1 = activo, 0 = inactivo (INTEGER en SQLite, no boolean).
 */
export const MOCK_EMPLEADOS = [
  { id: 1, nombre: 'Ing. Carlos Ruiz', activo: 1 },
  { id: 2, nombre: 'Arq. Elena Soto', activo: 1 },
  { id: 3, nombre: 'Lic. Marcos Díaz', activo: 1 },
  { id: 4, nombre: 'Tec. Sandra Paredes', activo: 0 },
]
