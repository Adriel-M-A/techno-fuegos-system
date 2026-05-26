/**
 * Punto de entrada centralizado para todos los datos mock del sistema.
 * Al migrar a la persistencia real con Tauri IPC + SQLite,
 * solo se reemplaza la fuente de datos en cada store/vista
 * sin cambiar los contratos de los componentes.
 */
export * from './presupuestos'
export * from './insumos'
export * from './catalogo'
export * from './empleados'
export * from './empresa'
export * from './plantillas'
