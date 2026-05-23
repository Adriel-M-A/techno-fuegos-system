# Product Requirements Document (PRD) - Techno Fuegos System

## 1. Objetivos del Sistema
- **Sistematizar el conocimiento de costos:** Evitar depender del encargado de producción para calcular el precio de cada producto o personalización.
- **Automatizar la emisión de cotizaciones:** Permitir que personal administrativo genere un presupuesto preciso en menos de 5 minutos.
- **Profesionalizar la salida:** Generar presupuestos en PDF limpios, claros, con identidad corporativa y vencimiento automatizado.

## 2. Alcance (MVP - Producto Mínimo Viable)
El sistema se enfocará en la creación, cálculo parametrizado, persistencia local y exportación de presupuestos. Incluye gestión de modelos/plantillas para acelerar la carga de configuraciones frecuentes, parametrización dinámica de datos de la empresa, control de empleados (vendedores), y un manual estático offline integrado. Queda fuera de este alcance la facturación fiscal y el control físico de stock.

## 3. Mapa de Vistas, Subvistas y Navegación (Sidebar + Zustand)

El sistema se compone de un Layout con un `sidebar` izquierdo permanente y un panel derecho dinámico regido por el store de Zustand.

### Vista 1: Panel de Presupuestos (Dashboard)
- **Propósito:** Pantalla de inicio para el control y seguimiento comercial rápido.
- **Métricas Rápidas:** Tarjetas superiores compactas que muestran la facturación total mensual de presupuestos 'Aceptados', cantidad de cotizaciones pendientes en estado 'Enviado' y alertas de documentos 'Vencidos'.
- **Barra de Herramientas:** Input de búsqueda en tiempo real por nombre de cliente y filtro desplegable por estados ('Borrador', 'Enviado', 'Aceptado', 'Vencido').
- **Tabla de Datos:** Historial detallado con Fecha de Emisión, Cliente, Total, Vendedor y Estado (con etiquetas visuales de color según el estado).
- **Acciones Directas:** Iconos de control para visualizar detalles, editar borradores o volver a descargar el PDF.

### Vista 2: Creador de Presupuestos (Formulario de Cotización)
- **Propósito:** Núcleo operativo del sistema para la carga ágil y cálculo en tiempo real.
- **Carga de Plantilla:** Selector dinámico en la cabecera para buscar y seleccionar "Modelos de Presupuesto" previamente guardados, autopopulando el formulario de manera inmediata.
- **Sección A (Cliente):** Inputs controlados mediante React Hook Form para Nombre, Teléfono, Email y Localidad (crítico para flete).
- **Sección B (Ítems):** Selector de productos base provistos por el taller con sus respectivas cantidades.
- **Sección C (Personalización y Modificadores):** Campos específicos para añadir Kg extras de hierro, horas estimadas de soldadura extra para diseños a medida o herrajes especiales.
- **Sección D (Control Interno):** Selector desplegable de empleados activos y área de observaciones libres para el PDF.
- **Pie de Formulario (Totales y Acciones):** Visualización del precio final recalculado instantáneamente. Botón "Guardar como Plantilla" (congela la configuración de ítems sin datos de cliente), botón "Guardar Borrador" (persiste en la base de datos) y botón "Exportar PDF".

### Vista 3: Panel de Configuración y Producción
- **Propósito:** Cerebro lógico e informativo del sistema administrado mediante pestañas (`Tabs`) superiores.
- **Subvista A (Gestión de Insumos y Recetas):** - Tabla de administración del costo unitario de materiales base (Kg de chapa, hierro, valor hora de mano de obra).
  - ABM de productos estándar definiendo su receta por defecto (ej: un Fogonero de 80cm consume 40kg de hierro y 6 horas de soldador).
- **Subvista B (Datos de la Empresa y PDF):** - Formulario de edición para Datos Base de la empresa: Teléfono, Dirección física en Pilar, Correo, Instagram y Web.
  - Configuración de parámetros globales: Campo numérico de días de validez por defecto (para automatizar fechas de vencimiento) y campos de texto largo para la Cláusula de Seña y Cláusula de Inflación.
- **Subvista C (Control de Empleados - CRUD):**
  - Interfaz simple para dar de alta nuevos administrativos/vendedores y un control de estado de actividad ('Activo' / 'Inactivo') para remover personal del creador de presupuestos sin corromper los registros históricos de la base de datos.

### Vista 4: Manual de Ayuda (Documentación Embebida)
- **Propósito:** Soporte local offline. Lee el archivo `src/manual/manual-usuario.md` y lo renderiza mediante React Markdown con estilos limpios de lectura.

## 4. Reglas de Negocio Estrictas
- **Campos Opcionales en el PDF:** Si un campo informativo de la empresa (ej: Instagram) o una cláusula legal se deja vacía en la Vista 3, la lógica condicional del frontend omitirá la etiqueta y reajustará el espacio vertical en el PDF, evitando líneas en blanco.
- **Automatización de Fechas:** El formulario creador toma la fecha del sistema y le suma dinámicamente los días de validez configurados para establecer el vencimiento automático del presupuesto.