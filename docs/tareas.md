# Control de Tareas y Estado del Proyecto (Backlog)

Este documento registra de forma detallada el progreso actual del proyecto **Techno Fuegos System**, separando lo completado `[x]`, lo que está en progreso o maquetado `[/]`, y lo que queda pendiente `[ ]`.

---

## Fase 1: Preparación, Entorno y Configuración de Agentes
- [x] Estructurar el cerebro del proyecto con notas técnicas base completas en `docs/` (`PRD.md`, `diseño.md`).
- [x] Inicializar el proyecto local con Tauri v2, React, Vite y pnpm usando JavaScript (ES6+).
- [x] Instalar y configurar Tailwind CSS v4 en `src/index.css` definiendo variables del tema industrial e identidad fuego (`@theme`).
- [x] Configurar esquinas rectilíneas estrictas (`0px` de radio) en toda la interfaz (botones, cards, inputs, tablas).
- [x] Instalar e integrar Agent Skills en el IDE (`writing-plans`, `executing-plans`, etc.).
- [x] Sincronizar el archivo maestro de contexto `AGENTS.md` en la raíz del proyecto para reglas e IA.

---

## Fase 2: Configuración del Frontend Estricto y Dependencias
- [x] Instalar `zustand` e implementar el store de navegación global por estado interno para el Layout del Sidebar (sin rutas URL web).
- [x] Diseñar la interfaz base nativa: Sidebar izquierdo (`w-60`, fondo `#f2f4f6`) con efectos de hover e indicador activo industrial, y panel derecho dinámico.
- [x] Instalar e integrar `lucide-react` como único proveedor de iconos en el frontend.
- [x] Instalar `react-markdown` para renderizar el manual de usuario sin dependencias de red.
- [x] Instalar `react-hook-form` y `zod` junto con su resolver en `package.json` para formularios estructurados.
- [x] Crear y documentar utilidades de formateo global de datos en `src/utils/` (`formatARS`, `currencyFormatters`, `textFormatters`).
- [x] Instalar `jspdf-autotable` en `package.json` como complemento estructural para el procesamiento dinámico de la grilla de materiales.

---

## Fase 3: Componentes y Vistas Interactivas (MVP Frontend)
- [x] **Diseñar Componente Común `DataTable`:** Tabla genérica con soporte para columnas numéricas (`font-mono`), cabeceras en negrita uppercase y filas separadas por bordes finos.
- [x] **Vista Creador de Presupuestos (`Creador.jsx`):**
  - [x] Maquetación de la vista completa por secciones.
  - [x] Integrar selector de plantillas mockeado y visualización de ID de presupuesto.
  - [x] **Sección A:** Formulario maquetado para Datos del Cliente.
  - [/] Agregar campo de input de texto para **Descripción General** (Contexto del presupuesto).
  - [x] **Sección B:** Tabla dinámica de productos (`ProductsTable.jsx`) con select del catálogo, input numérico de cantidad, precio unitario y subtotal recalculados en tiempo real.
  - [x] Botón de **"Añadir Fila"** tipo botón secundario en el encabezado de la Card de productos.
  - [x] Botón de eliminar filas con icono individual (`Trash2`) y hover destructivo.
  - [x] **Sección C y D:** Formulario maquetado para modificaciones extras (Kg de hierro, horas de soldador), vendedor y observaciones.
  - [x] **Barra Inferior de Totales:** Layout de un solo renglón con etiquetas arriba y montos abajo usando `formatARS` y botones de acción unificados.
- [x] **Vista Panel de Configuración (`ConfiguracionCostos.jsx`):**
  - [x] Implementar TabBar personalizado con tres subvistas: Insumos, Empresa/PDF y Empleados.
  - [x] **Insumos y Recetas (CRUD Editable):** Rediseñar la subvista estática como una tabla interactiva editable en caliente (`InsumosTable.jsx`).
  - [x] Permitir edición interactiva al hacer clic en las celdas para Material, Unidad y Costo Unitario (`font-mono` a la derecha).
  - [x] Botón de **"Añadir Fila"** nativo en el encabezado de la Card de insumos.
  - [x] Botón de eliminar insumo en caliente (`Trash2`) y botón de "Guardar Materiales".
  - [/] **Empresa y PDF (Maquetación):** Campos para datos de empresa, días de validez del presupuesto y cláusulas legales condicionales.
  - [/] **Empleados (Maquetación):** Vista base con aviso de implementación en la próxima iteración.
  - [ ] **Soporte y Mantenimiento (Seguridad):** Crear una cuarta pestaña superior en la Vista 3 e implementar el maquetado con botones de "Exportar Copia de Seguridad" e "Importar Copia de Seguridad".
- [x] **Comportamiento Nativo Tauri:**
  - [x] Configurar la ventana principal de Tauri para iniciarse maximizada por defecto (`maximized: true` en `tauri.conf.json`).
- [/] **Vista 4: Manual de Ayuda (Documentación Embebida):**
  - [/] Conectar la Vista 4 al sidebar de Zustand bajo el icono Lucide `LifeBuoy`.
  - [ ] Diseñar el contenedor offline para renderizar el manual de usuario local `src/manual/manual.md` mediante `react-markdown`.

---

## 4. Persistencia Local y Backend (Rust/SQLite)
- [ ] Configurar la base de datos SQLite en el backend de Tauri (`src-tauri`).
- [ ] Crear scripts de migración para las tablas con soporte para flag `es_plantilla` y `descripcion_general`.
- [ ] Implementar comandos IPC nativos en Rust (`lib.rs` / `main.rs`) para conectar el estado de Zustand a SQLite.
- [ ] Escribir comandos Tauri para exportación e importación de la base de datos bit a bit (`exportar_db` e `importar_db`) desde/hacia la ubicación externa del usuario y la carpeta local de `%APPDATA%`, forzando el reinicio del frontend.
- [ ] Enlazar los botones de "Guardar" de las vistas con comandos nativos `invoke` de Tauri.

---

## Fase 5: Reportes PDF e Integración con el Sistema Operativo
- [ ] Programar la lógica del documento PDF unificando `jsPDF` y `jspdf-autotable` en formato clásico monocromático (blanco y negro), inyectando dinámicamente la Descripción General y asegurando el salto de página prolijo del desglose físico de insumos.
- [ ] Implementar la descarga y almacenamiento físico del PDF en disco interactuando con los diálogos del sistema a través de plugins `dialog` and `fs` de Tauri.
- [ ] Vincular la ayuda interna para renderizarla usando `react-markdown` y los archivos locales `.md` en la Vista 4.