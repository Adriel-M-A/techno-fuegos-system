# AGENTS.md - Contexto de Desarrollo Autónomo

## 1. Identidad del Proyecto
- **Nombre:** Techno Fuegos System
- **Tipo:** Aplicación de escritorio nativa para Windows (Offline).
- **Objetivo:** Automatización, cálculo parametrizado y emisión de presupuestos para productos de herrería artesanal a medida, eliminando el cuello de botella del taller de producción.

## 2. Stack Tecnológico Estricto
- **Frontend:** React, Vite, Tailwind CSS v4, JavaScript (ES6+). No usar TypeScript.
- **Estado Global y Ruteo:** Zustand (Navegación interna por estado. NO usar React Router ni enrutadores basados en URLs web).
- **Formularios y Validación:** React Hook Form + Zod (Validaciones condicionales dinámicas según se guarde plantilla o presupuesto real).
- **Iconografía:** Lucide React (Componentes individuales importados, única fuente de iconos permitida).
- **Documentación Interna:** React Markdown (Renderizado local de archivos .md para ayuda offline).
- **Generación de Reportes:** jsPDF (Procesado en memoria en el frontend).
- **Runtime / Backend:** Tauri (Rust) utilizando plugins nativos `dialog` y `fs`.
- **Base de Datos:** SQLite (Persistencia local relacional en archivo).
- **Gestor de Paquetes:** pnpm.

## 3. Reglas de Arquitectura e Interfaz Inviolables (Constraints)
- **Aislamiento de Red:** El sistema opera completamente offline. Está estrictamente prohibido generar código con `fetch`, `axios` o protocolos HTTP. Toda persistencia invoca comandos IPC de Tauri (`import { invoke } from '@tauri-apps/api/core';`).
- **Configuración de Estilos:** El proyecto utiliza Tailwind CSS v4. No existe ni se debe crear el archivo de configuración `tailwind.config.js` ni `tailwind.config.ts`. Toda extensión del tema y personalización de colores e identidades se maneja mediante variables CSS en `src/index.css` bajo la directiva `@theme`.
- **Estética de Componentes (Bordes y Esquinas):** Siguiendo las directivas visuales de diseño industrial de herrería, toda la interfaz debe implementar esquinas con un radio de curvatura mínimo, sutil y rectilíneo (`rounded-sm` o un máximo de `2px` a `4px`). Quedan prohibidos los bordes completamente redondeados o curvas pronunciadas. Los contenedores de datos e inputs deben utilizar bordes delgados visibles usando `--color-border-iron`.
- **Navegación por Zustand:** El Layout cuenta con un `sidebar` izquierdo fijo que conmuta la vista activa en el panel derecho cambiando un estado string en el store de navegación de Zustand. No destruir ni desmontar los stores globales durante la navegación para mantener la persistencia de datos en curso.
- **Campos Opcionales en el PDF:** La lógica de generación en jsPDF debe evaluar de forma condicional si los campos informativos de la empresa o cláusulas legales configurados en la base de datos están vacíos; en tal caso, se omitirá su impresión y el cursor vertical de la hoja se reajustará automáticamente para evitar renglones en blanco.
- **Lógica de Modelos (Plantillas):** El creador de presupuestos debe permitir guardar configuraciones de ítems frecuentes como plantillas asignándoles `es_plantilla: 1` omitiendo la validación obligatoria de datos de clientes, así como poder recuperarlas desde un selector en la cabecera para autopopular el formulario instantáneamente.

## 4. Estructura del Repositorio
```text
techno-fuegos-system/
├── .agents/
│   └── skills/           # Habilidades locales personalizadas
├── docs/                     # Documentación técnica del proyecto
│   ├── PRD.md                # Requerimientos, vistas y reglas de negocio
│   └── DESIGN.md             # Identidad visual, paleta, tipografía y componentes
├── src/                  # Código fuente Frontend (React + JavaScript)
│   ├── components/       # Componentes visuales atómicos (Sidebar, Tablas)
│   ├── manual/           # Contenedor y archivo .md del manual de usuario
│   ├── stores/           # Stores de Zustand (Navegación, Datos)
│   ├── views/            # Vistas fijas (Dashboard, Creador, Configuración)
│   └── index.css         # Configuración de Tailwind v4 y variables de tema
├── src-tauri/            # Código fuente Backend (Tauri / Rust)
│   ├── src/main.rs       # Comandos IPC y conexión SQLite
│   └── tauri.conf.json   # Configuración de capacidades y plugins
├── AGENTS.md             # Este archivo (Contexto del IDE)
└── .env                  # Variables de entorno locales
```

## 5. Skills Activas
Las siguientes habilidades están instaladas en .agents/skills/ y deben aplicarse rigurosamente en cada iteración del editor:

- **writing-plans** — Planificar antes de implementar modificaciones de código.
- **executing-plans** — Ejecutar de manera procedimental paso a paso con verificación.
- **systematic-debugging** — Diagnóstico del entorno antes de proponer arreglos de código.
- **verification-before-completion** — Verificar que la app compila y funciona antes de cerrar la tarea.
- **diagnose** — Para resolución de bugs de compilación específicos.
- **git-commit** — Estructura uniforme para commits de Git.
- **tauri-sqlite-bridge** — Control estricto de comandos IPC, queries locales a SQLite y control de estado/navegación vía Zustand sin ruteadores basados en URLs web.
- **tailwind-v4-rules** — Restricción absoluta sobre archivos de configuración v3 y uso obligatorio de la directiva @theme en src/index.css empleando las variables industriales del tema.
- **caveman** — Comunicación ultra-comprimida estilo cavernícola para reducir drásticamente el uso de tokens. Activable por petición directa o comando.

> **Regla Mandatoria para IAs (Reporte de Skills):** En cada respuesta donde se realice análisis, planificación o implementación de código, la IA **debe** avisar de manera explícita cuáles de estas skills de la carpeta `.agents` consultó o aplicó para resolver la tarea.

## 6. Documentación Obligatoria

Antes de cualquier tarea de análisis o implementación, leer siempre estos archivos:

- `docs/PRD.md` — Requerimientos del producto, mapa de vistas, subvistas y reglas de negocio estrictas.
- `docs/DESIGN.md` — Guía de diseño visual, paleta de colores, tipografía, configuración de Tailwind v4 y restricciones de componentes.

Estos archivos son la fuente de verdad del proyecto. Ninguna decisión de diseño o arquitectura debe contradecirlos.