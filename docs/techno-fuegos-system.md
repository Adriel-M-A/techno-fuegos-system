# Techno Fuegos System

## Contexto Técnico
Aplicación de escritorio dedicada a la automatización, cálculo parametrizado y emisión de presupuestos para productos de herrería y carpintería artesanal. El sistema abstrae la lógica de costos del taller de producción para permitir que cualquier operador emita una cotización precisa en formato PDF imprimible, eliminando el cuello de botella actual en el proceso de fabricación.

## Stack Tecnológico
- **Frontend:** React, Vite, Tailwind CSS v4, JavaScript (ES6+).
- **Estado Global y Ruteo:** Zustand (Navegación interna por estado sin URLs).
- **Formularios y Validación:** React Hook Form + Zod.
- **Iconografía:** Lucide React (Componentes optimizados, única fuente visual).
- **Documentación Interna:** React Markdown (Renderizado del manual de usuario local).
- **Generación de Reportes:** jsPDF (Procesado en memoria en el frontend).
- **Backend / Runtime:** Tauri (Rust) utilizando plugins nativos `dialog` y `fs`.
- **Base de Datos:** SQLite (Persistencia local en archivo).
- **Gestor de Paquetes:** pnpm.
- **Seguridad:** Configuración local mediante archivo `.env`.

## Arquitectura de Interfaz
El programa utiliza una estructura clásica de escritorio con una barra lateral de navegación (`sidebar`) fija a la izquierda y un contenedor principal a la derecha. El ruteo se gestiona de forma interna mediante un store de Zustand que conmutará la vista activa (incluyendo la vista de 'Manual de Ayuda' bajo el icono `LifeBuoy`) sin desmontar los almacenes de datos globales, garantizando la persistencia de la sesión activa. Las pantallas complejas se segmentan mediante pestañas (`Tabs`) superiores.

## Índice de Documentos Vinculados
- [[cliente]]: Información de la empresa, datos de contacto, horarios y relevamiento del problema del negocio.
- [[preguntas-reunion]]: Cuestionario y guía para la entrevista de relevamiento inicial.
- [[prd]]: Product Requirements Document. Define los objetivos, el alcance del MVP y el comportamiento detallado de las vistas fijas.
- [[arquitectura]]: Estructura de las tablas SQLite, esquemas de Zod y especificación de comandos IPC de Tauri.
- [[diseño]]: Guía de estilos basados en Tailwind CSS v4, variables de tema e identidad visual clásica.
- [[manual-usuario]]: Contenido en texto plano del manual que React Markdown renderizará dentro de la app.
- [[tareas]]: Tablero de control de desarrollo (Backlog) dividido por fases.