# Techno Fuegos System

Aplicación de escritorio nativa orientada a la automatización, cálculo parametrizado y emisión de presupuestos comerciales para la empresa de herrería artesanal **Techno Fuegos** (Pilar, Buenos Aires).

El sistema opera completamente offline y tiene como objetivo principal digitalizar y sistematizar la lógica de costos del taller de producción. Esto permite que el personal administrativo o de ventas genere cotizaciones precisas de estructuras complejas y piezas a medida en menos de 5 minutos, eliminando los cuellos de botella en la fabricación.

---

## Características del Sistema (MVP)

### Panel de Presupuestos
Pantalla de inicio con métricas rápidas de facturación mensual, cotizaciones pendientes y alertas de documentos vencidos. Incluye búsqueda en tiempo real por cliente, filtros por estado (Borrador, Enviado, Aceptado, Vencido) y acciones directas para visualizar, editar o re-exportar cada presupuesto.

### Creador de Presupuestos
Núcleo operativo del sistema. Formulario paramétrico con carga de plantillas, datos del cliente, selección de productos base, modificadores a medida (kg de hierro extra, horas de soldadura, herrajes) y cálculo del precio final en tiempo real. Permite guardar borradores, congelar configuraciones como plantillas y exportar el presupuesto a PDF.

### Panel de Configuración y Producción
Administración interna organizada en pestañas: gestión de insumos y recetas de productos, datos de la empresa y parámetros del PDF (cláusulas legales, validez en días), y CRUD de empleados con control de estado activo/inactivo.

### Exportación a PDF
Generación de presupuestos profesionales con identidad corporativa. Cabecera dinámica con datos de la empresa, tabla estructurada de productos y personalizaciones, tipografía monoespaciada para precios y totales, y bloque legal condicional en el pie de página. Descarga nativa a través del diálogo de Windows.

### Manual de Ayuda Integrado
Documentación técnica offline embebida dentro del propio software, renderizada desde un archivo Markdown local.

---

## Stack Tecnológico

| Categoría                  | Tecnología                       |
| -------------------------- | -------------------------------- |
| Frontend                   | React + Vite + JavaScript (ES6+) |
| Estilos                    | Tailwind CSS v4                  |
| Estado global y navegación | Zustand                          |
| Formularios y validación   | React Hook Form + Zod            |
| Iconografía                | Lucide React                     |
| Documentación interna      | React Markdown                   |
| Generación de PDF          | jsPDF                            |
| Backend / Runtime          | Tauri v2 (Rust)                  |
| Base de datos              | SQLite (via rusqlite)            |
| Gestor de paquetes         | pnpm                             |

---

## Instalación y Configuración Local

### Prerequisitos

Antes de clonar el proyecto, asegurate de tener instalado:

- [Rust](https://www.rust-lang.org/tools/install) (última versión estable)
- [Node.js](https://nodejs.org/) (v18 o superior)
- [pnpm](https://pnpm.io/installation)
- Herramientas de compilación de C++ de Visual Studio — desde [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/techno-fuegos-system.git
cd techno-fuegos-system
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz basándote en `.env.example`:

```env
DATABASE_URL="src-tauri/storage.db"
APP_ENV="development"
APP_NAME="techno-fuegos-system"
```

### 4. Correr en modo desarrollo

```bash
pnpm tauri dev
```

> La primera compilación puede tardar varios minutos debido a la compilación de dependencias de Rust. Las compilaciones siguientes son significativamente más rápidas.

---

## Estructura del Repositorio

```
techno-fuegos-system/
├── .agents/                  # Skills y configuración de agentes IA del IDE
│   └── skills/               # Habilidades locales personalizadas
├── docs/                     # Documentación técnica del proyecto
│   ├── PRD.md                # Product Requirements Document
│   └── DESIGN.md             # Guía de diseño visual e identidad
├── src/                      # Código fuente del frontend (React + JS)
│   ├── components/           # Componentes visuales reutilizables
│   ├── manual/               # Archivo .md del manual de usuario interno
│   ├── stores/               # Almacenes de estado global (Zustand)
│   └── views/                # Vistas principales de la aplicación
├── src-tauri/                # Código fuente nativo (Tauri + Rust)
│   ├── src/
│   │   └── main.rs           # Inicialización, comandos IPC y conexión SQLite
│   └── tauri.conf.json       # Manifiesto de capacidades y configuración
├── .env.example              # Plantilla de variables de entorno
├── AGENTS.md                 # Contexto de desarrollo para asistentes de IA
└── README.md                 # Este archivo
```

---

## Licencia

Este proyecto es de uso privado y propietario. Todos los derechos reservados © 2025 Techno Fuegos.

No está permitida la reproducción, distribución ni modificación del código fuente sin autorización expresa del titular.