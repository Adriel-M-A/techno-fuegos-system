# Techno Fuegos System

## Contexto Técnico
Aplicación de escritorio dedicada a la automatización, cálculo parametrizado y emisión de presupuestos para productos de herrería y carpintería artesanal. El sistema abstrae la lógica de costos del taller de producción para permitir que cualquier operador emita una cotización precisa en formato PDF imprimible, eliminando el cuello de botella actual en el proceso de fabricación.

## Stack Tecnológico
- **Frontend:** React, Vite, Tailwind CSS v4, JavaScript (ES6+).
- **Estado Global y Ruteo:** Zustand (Navegación interna por estado sin URLs y middleware de persistencia local).
- **Formularios y Validación:** React Hook Form + Zod.
- **Iconografía:** Lucide React (Componentes optimizados, única fuente visual).
- **Documentación Interna:** React Markdown (Renderizado del manual de usuario local).
- **Generación de Reportes:** jsPDF + jspdf-autotable (Procesado en memoria en el frontend).
- **Backend / Runtime:** Tauri (Rust) utilizando plugins nativos `dialog` y `fs` junto al control de capacidades ACL de Tauri v2.
- **Base de Datos:** SQLite (Persistencia local en archivo relacional con manejo de dinero en centavos enteros).
- **Gestor de Paquetes:** pnpm.
- **Seguridad:** Configuración local mediante archivo `.env`.

## Arquitectura de Interfaz
El programa utiliza una estructura clásica de escritorio con una barra lateral de navegación (`sidebar`) fija a la izquierda y un contenedor principal a la derecha. El ruteo se gestiona de forma interna mediante un store de Zustand que conmutará la vista activa (incluyendo la vista de 'Manual de Ayuda' bajo el icono `LifeBuoy`) sin destruir ni desmontar los almacenes de datos globales, garantizando la persistencia de la sesión de trabajo activa. 

El formulario de carga implementa un estado intermedio auto-guardado localmente para tolerar fallos físicos de energía en el entorno del taller. Las pantallas complejas se segmentan mediante pestañas (`Tabs`) superiores.

## Índice de Documentos Vinculados

### Fase de Relevamiento y Diseño Técnico
- [[cliente]]: Información de la empresa, datos de contacto, horarios y relevamiento del problema del negocio.
- [[preguntas-reunion]]: Cuestionario y guía para la entrevista de relevamiento inicial con el cliente.
- [[prd]]: Product Requirements Document. Define los objetivos, el alcance del MVP, el comportamiento detallado de las vistas y las reglas de resiliencia anti-apagones.
- [[arquitectura]]: Estructura de las tablas SQLite (esquema Safe Money en centavos), validaciones de Zod, comandos IPC y archivo de capacidades ACL para Tauri v2.
- [[diseño]]: Guía de estilos basados en Tailwind CSS v4, variables de tema e identidad visual basada en Fluent Design.

### Fase Comercial y Preventa (Pausado / En Reserva)
- [[propuesta]]: Índice maestro de la documentación comercial entregable, estimaciones presupuestarias, maquetas visuales y ejemplos de salida para el cliente.