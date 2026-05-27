# AGENTS.md - Contexto de Desarrollo Autónomo

## 1. Identidad del Proyecto
- **Nombre:** Techno Fuegos System.
- **Tipo:** Aplicación de escritorio nativa para Windows (Offline).
- **Objetivo:** Automatización, cálculo parametrizado y emisión de presupuestos para productos de herrería artesanal a medida, eliminando el cuello de botella del taller de producción.

## 2. Stack Tecnológico Estricto
- **Frontend:** React, Vite, Tailwind CSS v4, JavaScript (ES6+). No usar TypeScript.
- **Estado Global y Ruteo:** Zustand (Navegación interna por estado. NO usar React Router ni enrutadores basados en URLs web).
- **Formularios y Validación:** React Hook Form + Zod (Validaciones condicionales dinámicas según se guarde plantilla o presupuesto real).
- **Iconografía:** Lucide React (Componentes individuales importados, única fuente de iconos permitida).
- **Documentación Interna:** React Markdown (Renderizado local de archivos .md para ayuda offline).
- **Generación de Reportes:** jsPDF + jspdf-autotable (Procesado en memoria en el frontend).
- **Runtime / Backend:** Tauri (Rust) utilizando plugins nativos `dialog` y `fs`.
- **Base de Datos:** SQLite (Persistencia local relacional en archivo).
- **Gestor de Paquetes:** pnpm.

## 3. Reglas de Arquitectura e Interfaz Inviolables (Constraints)
- **Aislamiento de Red:** El sistema opera completamente offline. Está estrictamente prohibido generar código con `fetch`, `axios` o protocolos HTTP. Toda la persistencia invoca comandos IPC de Tauri (`import { invoke } from '@tauri-apps/api/core';`).
- **Configuración de Estilos:** El proyecto utiliza Tailwind CSS v4. No existe ni se debe crear el archivo de configuración `tailwind.config.js` ni `tailwind.config.ts`. Toda extensión del tema y personalización de colores e identidades se maneja mediante variables CSS en `src/index.css` bajo la directiva `@theme`.
- **Estética de Componentes (Bordes y Esquinas):** Modo claro únicamente. Se implementa de forma estricta el estilo Fluent Design de Windows 10/11: esquinas suaves de `4px` (`rounded-sm`) para inputs, botones y selectores; `8px` (`rounded-md`) para tarjetas (`Cards`), contenedores y tablas de datos; y `rounded-full` para indicadores de estado (chips de `StatusBadge`). Los contenedores y tarjetas deben usar bordes delgados con `--color-outline-variant` y sombras de elevación Fluent (`shadow-card` o `shadow-raised`) para dar profundidad visual sutil.
- **Navegación por Zustand:** El Layout cuenta con un `sidebar` izquierdo fijo que conmuta la vista activa en el panel derecho cambiando un estado string en el store de navegación de Zustand. No destruir ni desmontar los stores globales durante la navegación para mantener la persistencia de datos en curso.
- **Campos Opcionales en el PDF:** La lógica de generación en jsPDF debe evaluar de forma condicional si los campos informativos de la empresa o cláusulas legales configurados en la base de datos están vacíos; en tal caso, se omitirá su impresión y el cursor vertical de la hoja se reajustará automáticamente para evitar renglones en blanco.
- **Manejo de PDF y Tablas Dinámicas:** Queda estrictamente prohibido calcular manualmente coordenadas XY píxel por píxel para renderizar la matriz de materiales crudos. Es obligatorio utilizar la librería `jspdf-autotable` montada sobre el objeto `jsPDF` para gestionar automáticamente el flujo de texto (*reflow*), la alineación técnica a la derecha con fuente monoespaciada de los totales y el salto de página automático ante desbordamientos verticales. El output final debe convertirse en un `Uint8Array` antes de enviarlo al plugin `fs` de Tauri.
- **Lógica de Modelos (Plantillas):** El creador de presupuestos debe permitir guardar configuraciones de ítems frecuentes como plantillas asignándoles `es_plantilla: 1` omitiendo la validación obligatoria de datos de clientes, así como poder recuperarlas desde un selector en la cabecera para autopopular el formulario instantáneamente.
- **Iconos:** Está estrictamente prohibido usar SVGs inline o cualquier otra librería de iconos. Todos los iconos deben importarse desde `lucide-react`.
- **Vista 4 ("Manual de Ayuda"):** Accesible desde el sidebar con el icono Lucide `LifeBuoy` y regido por Zustand. Integra la documentación del manual local con `react-markdown` para asistencia offline.
- **Soporte y Mantenimiento (Vista 3 - Pestaña/Tab):** Una pestaña adicional superior en el panel de configuración operativa diario. Ofrece herramientas de seguridad con dos acciones de copia bit a bit (`exportar_db` e `importar_db`) mediante comandos IPC nativos de Tauri actuando sobre el archivo local de `%APPDATA%/techno-fuegos-system/techno-fuegos.db`. Al importar, Rust debe cerrar explícitamente la conexión SQLite activa, validar el esquema del archivo entrante, sobreescribir el archivo local y forzar una recarga del frontend mediante `window.location.reload()` para limpiar estados remanentes.
- **Descripción General en Creador (Vista 2):** Input de texto simple en la parte superior del formulario (Sección B) para detallar brevemente el propósito de la cotización.
- **Formato del PDF Monocromático de Materiales:** El reporte PDF en jsPDF se diseña estrictamente en blanco y negro (estética clásica monocromática) para taller. Muestra la "Descripción General" en la cabecera y un desglose técnico riguroso de materiales crudos (kilos de chapa, metros de perfiles, insumos) e insumos de taller junto con las horas de mano de obra estimadas, en lugar de nombres de productos finales de catálogo.
- **Control de Commits en Git:** La IA tiene estrictamente prohibido realizar commits en Git de forma autónoma. Solo podrá realizar commits cuando el usuario lo solicite o avise explícitamente, asegurando que dichos commits sean descriptivos y detallados.

## 4. Estructura del Repositorio
```text
techno-fuegos-system/
├── .agents/
│   └── skills/           # Habilidades locales personalizadas
├── docs/                 # Documentación técnica del proyecto
│   ├── prd.md            # Requerimientos, vistas y reglas de negocio
│   └── diseño.md         # Identidad visual, paleta, tipografía y componentes
├── src/                  # Código fuente Frontend (React + JavaScript)
│   ├── components/       # Componentes visuales atómicos (Sidebar, Tablas)
│   ├── manual/           # Contenedor y archivo .md del manual de usuario
│   ├── stores/           # Stores de Zustand (Navegación, Datos)
│   ├── utils/            # Utilidades globales (currencyFormatters, textFormatters)
│   ├── views/            # Vistas fijas (Dashboard, Creador, Configuración)
│   └── index.css         # Configuración de Tailwind v4 y variables de tema
├── src-tauri/            # Código fuente Backend (Tauri / Rust)
│   ├── src/main.rs       # Comandos IPC y conexión SQLite
│   └── tauri.conf.json   # Configuración de capacidades y plugins
├── AGENTS.md             # Este archivo (Contexto del IDE)
└── .env                  # Variables de entorno locales
```

## 5. Skills Activas
Las siguientes habilidades están instaladas en .agents/skills/ y deben aplicarse en cada iteración del editor:
- **writing-plans** — Planificar antes de implementar modificaciones de código.
- **executing-plans** — Ejecutar de manera procedimental paso a paso con verificación.
- **systematic-debugging** — Diagnóstico del entorno antes de proponer arreglos de código.
- **verification-before-completion** — Verificar que la app compila y funciona antes de cerrar la tarea.
- **diagnose** — Para resolución de bugs de compilación específicos.
- **git-commit** — Estructura uniforme para commits de Git.
- **tauri-sqlite-bridge** — Control estricto de comandos IPC, queries locales a SQLite y control de estado/navegación vía Zustand sin ruteadores basados en URLs web.
- **tailwind-v4-rules** — Restricción absoluta sobre archivos de configuración v3 y uso obligatorio de la directiva @theme en src/index.css empleando las variables industriales del tema.

**Regla Mandatoria para IAs (Reporte de Skills):** En cada respuesta donde se realice análisis, planificación o implementación de código, la IA debe avisar de manera explícita cuáles de estas skills de la carpeta .agents consultó o aplicó para resolver la tarea.

## 6. Documentación Obligatoria
Antes de cualquier tarea de análisis o implementación, leer siempre estos archivos:
- **docs/prd.md** — Requerimientos del producto, mapa de vistas, subvistas y reglas de negocio estrictas.
- **docs/diseño.md** — Guía de diseño visual, paleta de colores, tipografía, configuración de Tailwind v4 y restricciones de componentes.

Estos archivos son la fuente de verdad del proyecto. Ninguna decisión de diseño o arquitectura debe contradecirlos.

## 7. Estrategia de Carga y Búsqueda de Datos (Tablas y Formularios)
El sistema opera en un entorno de escritorio nativo 100% offline (Tauri + SQLite) con un catálogo acotado de insumos y servicios (entre 200 y 1.000 registros base). Por lo tanto, la optimización de datos se rige bajo las siguientes directrices operativas estrictas:

- **Carga Única en Memoria:** Al montar o inicializar formularios de alta densidad (como el Creador de Presupuestos), el estado global (Zustand) debe solicitar el array completo de insumos mediante un único comando IPC (`invoke`) hacia el backend de Rust.
- **Filtrado Reactivo e Inmediato:** Está terminantemente prohibido implementar umbrales mínimos de caracteres (como esperar a que el usuario escriba 3 letras) para activar las búsquedas en los selectores dinámicos. El filtrado se realiza puramente en el frontend con JavaScript mediante `.filter()` sobre el array local en caliente, respondiendo instantáneamente desde el primer carácter introducido.
- **Aislamiento de la Base de Datos:** No se deben emitir consultas continuas de búsqueda (`LIKE %búsqueda%`) hacia el archivo de SQLite por cada tecla presionada en las grillas o filas adaptables. Esto evita problemas de concurrencia local y micropausas en la interfaz del taller.
- **Sincronización por Eventos:** La actualización del listado local en memoria solo se re-ejecuta si el administrativo añade, modifica o elimina un insumo maestro desde el panel de configuración y navega de regreso al creador.

## 8. Comportamiento, Rendimiento y UX en Grillas de Datos (Tablas)
Para garantizar un renderizado instantáneo y evitar problemas de bloqueo de interfaz (input lag) en el entorno de escritorio, la construcción de tablas se divide en dos patrones arquitectónicos estrictos según su propósito operativo:

### Patrón A: Tablas Dinámicas Operativas (Carga y Cálculo en Caliente)
Se aplican en formularios de creación o edición de documentos de alta densidad donde el cálculo numérico ocurre en tiempo real (ej: desgloses de ítems, cálculo de presupuestos).
- **Crecimiento Elástico:** Comienzan vacías o con una única fila y crecen verticalmente a medida que el operario añade registros dinámicos.
- **Sin Paginación:** El volumen de filas por documento es acotado por naturaleza de negocio. Dividir estas tablas en páginas destruye la experiencia de usuario, ya que el administrativo requiere controlar los totales y modificadores de un solo golpe de vista.
- **Scroll Contenedor Estricto:** La tarjeta o panel contenedor debe poseer un límite de altura rígido gestionado mediante las variables del tema de Tailwind v4 y scroll interno (`overflow-y-auto`) enfocado en el cuerpo (`<tbody>`), manteniendo siempre fijos los encabezados de las columnas para no perder la referencia visual.

### Patrón B: Tablas Maestras de Administración (Catálogos y ABM)
Se aplican en pantallas de configuración, visualización de historiales o administración de entidades base del sistema (ej: gestión de materiales, listas de clientes, control de empleados).
- **Grillas de Solo Lectura:** Está terminantemente prohibido inyectar inputs editables de forma directa dentro de las celdas de la tabla para modificar registros masivos. Las filas solo renderizan texto plano o componentes de visualización limpios, optimizando al 100% los ciclos de re-renderizado de React.
- **Flujo Operativo Basado en Modales:** Las acciones de creación o edición de una fila se aíslan por completo mediante un modal de formulario dedicado que hereda la identidad visual industrial (radios `rounded-md` para el contenedor y `rounded-sm` para los campos).
- **Paginación en Memoria (Frontend):** El array completo de registros (obtenido en un único viaje IPC desde SQLite al montar la vista madre) se segmenta localmente en bloques fijos de 20 o 25 filas utilizando el componente de paginación combinado con el método `.slice()` de JavaScript.
- **Inserción y Redirección:** Al confirmar un alta exitosa desde el modal, el nuevo objeto se añade al inicio del array principal en memoria (`unshift`) y el sistema debe forzar de manera automática el redireccionamiento del paginador hacia la Página 1 para ofrecer feedback visual inmediato.
- **Bloqueo Preventivo de Navegación:** Si existen modificaciones locales pendientes en el estado de la vista que no han sido impactadas en la base de datos de SQLite, el paginador debe inhabilitar los clics de cambio de página o disparar el modal de confirmación para evitar la pérdida accidental de datos antes de presionar la persistencia masiva en el pie de la pantalla.