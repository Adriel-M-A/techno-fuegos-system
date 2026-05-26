# Product Requirements Document (PRD) - Techno Fuegos System

## 1. Objetivos del Sistema
- **Sistematizar el conocimiento de costos:** Evitar depender del encargado de producción para calcular el precio de cada producto o personalización.
- **Automatizar la emisión de cotizaciones:** Permitir que personal administrativo genere un presupuesto preciso en menos de 5 minutos de forma autónoma.
- **Profesionalizar la salida:** Generar presupuestos en PDF limpios, claros, con identidad corporativa y vencimiento automatizado.

## 2. Alcance (MVP - Producto Mínimo Viable)
El sistema se enfocará en la creación, cálculo parametrizado, persistencia local y exportación de presupuestos. Incluye gestión de modelos/plantillas para acelerar la carga de configuraciones frecuentes, parametrización dinámica de datos de la empresa, control de empleados (vendedores), y un manual estático offline integrado. Queda fuera de este alcance la facturación fiscal y el control físico de stock.

## 3. Mapa de Vistas, Subvistas y Navegación (Sidebar + Zustand)
El sistema se compone de un Layout con un `sidebar` izquierdo permanente y un panel derecho dinámico regido por el store de Zustand.

### Vista 1: Panel de Presupuestos (Dashboard)
- **Propósito:** Pantalla de inicio para el control y seguimiento comercial rápido.
- **Métricas Rápidas:** Tarjetas superiores compactas que muestran la facturación total mensual de presupuestos 'Aceptados', cantidad de cotizaciones pendientes en estado 'Enviado' y alertas de documentos 'Vencidos'.
- **Barra de Herramientas:** Input de búsqueda en tiempo real por nombre de cliente y filtro desplegable por estados.
- **Tabla de Datos:** Historial detallado con Fecha de Emisión, Cliente, Total, Vendedor y Estado (con etiquetas visuales sólidas y planas de color).
- **Acciones Directas:** Iconos de control para visualizar detalles, editar borradores o volver a descargar el PDF.

### Vista 2: Creador de Presupuestos (Formulario de Cotización)
- **Propósito:** Núcleo operativo del sistema para la carga ágil y cálculo en tiempo real.
- **Carga de Plantilla:** Selector dinámico en la cabecera para buscar y seleccionar "Modelos de Presupuesto" previamente guardados, autopopulando el formulario de manera inmediata.
- **Sección A (Cliente):** Inputs controlados mediante React Hook Form para Nombre, Teléfono, Email y Localidad.
- **Sección B (Descripción General e Ítems):**
  - Input de texto simple para la **Descripción General** del presupuesto (propósito global de la cotización).
  - Tabla dinámica interactiva de materiales y mano de obra que inyecta filas del catálogo base con cantidad, unidad e importes calculados al instante.
- **Sección C (Personalización y Modificadores):** Campos específicos para añadir Kg extras de hierro o modificadores complejos a medida.
- **Sección D (Control Interno):** Selector desplegable de empleados activos y área de observaciones libres.
- **Pie de Formulario (Totales y Acciones):** Visualización del subtotal y precio final recalculado con `formatARS`. Botón "Guardar como Plantilla", "Guardar Borrador" y "Exportar PDF".

### Vista 3: Panel de Configuración y Producción
- **Propósito:** Cerebro lógico e informativo del sistema administrado mediante pestañas (`Tabs`) superiores.
- **Subvista A (Gestión de Insumos y Recetas):** Tabla interactiva editable en caliente (`InsumosTable.jsx`) para administrar materiales (nombre, unidad de medida, costo unitario) y recetas base.
- **Subvista B (Datos de la Empresa y PDF):** Formulario de edición para datos base de la empresa (Teléfono, Dirección, Correo, Redes), días de validez del presupuesto y las cláusulas condicionales de Seña e Inflación.
- **Subvista C (Control de Empleados - CRUD):** Interfaz para dar de alta nuevos vendedores y controlar su estado de actividad ('Activo' / 'Inactivo').
- **Subvista D (Soporte y Mantenimiento - Seguridad):** Implementación de mecanismos de migración de base de datos bit a bit mediante Tauri IPC:
  - **Botón "Exportar Copia de Seguridad":** Abre el diálogo nativo de Windows para guardar archivos y realiza una copia de seguridad del archivo `.db` activo desde `%APPDATA%/techno-fuegos-system/techno-fuegos.db` hacia la unidad externa seleccionada.
  - **Botón "Importar Copia de Seguridad":** Abre el selector de archivos nativo del sistema, recibe una base de datos externa, valida su estructura de esquema relacional y reemplaza de forma segura el archivo local en `%APPDATA%` tras cerrar los descriptores activos en Rust, forzando un reinicio completo de la ventana del frontend para limpiar estados de memoria.

### Vista 4: Manual de Ayuda (Documentación Embebida)
- **Propósito:** Soporte local offline. Lee el archivo `src/manual/manual.md` y lo renderiza mediante React Markdown para asistencia rápida del usuario.
- **Navegación:** Opción permanente al `sidebar` con el icono de Lucide `LifeBuoy` y regido por Zustand.

## 4. Reglas de Negocio Estrictas
- **Campos Opcionales en el PDF:** Si un campo informativo de la empresa o cláusula legal se deja vacía en la Vista 3, la lógica del frontend omitirá la etiqueta y reajustará el espacio vertical en el PDF, evitando líneas en blanco.
- **Automatización de Fechas:** El creador toma la fecha del sistema y le suma dinámicamente los días de validez configurados para establecer el vencimiento automático del presupuesto.
- **Formato del PDF Monocromático de Materiales:** El presupuesto exportado se diseña estrictamente en blanco y negro (estética monocromática clásica) para optimizar la impresión en taller y ahorrar tinta. Realiza un desglose técnico de materiales crudos (kilos de chapa, metros de perfiles, insumos específicos) y horas de mano de obra en taller, en lugar de listar productos de catálogo terminados con descripciones comerciales. Incluye físicamente el bloque de la "Descripción General" en la cabecera.
- **Resiliencia ante Fallos de Hardware (Cortes de Luz):** El taller de producción es un entorno propenso a fluctuaciones eléctricas y cortes de energía por el arranque de maquinaria pesada. El formulario del Creador de Presupuestos (Vista 2) no debe perder la información bajo ninguna circunstancia antes de confirmarse la persistencia en SQLite. Es obligatorio implementar un mecanismo de auto-guardado en tiempo real en un almacenamiento local intermedio para que, ante un apagón físico de la máquina, el usuario administrativo pueda retomar el borrador exactamente donde lo dejó al reiniciar el sistema.