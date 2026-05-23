# Guía de Diseño Visual e Identidad de Interfaz

## 1. Estética General e Identidad

El sistema sigue una estética **Modern Industrial**: fusión de confiabilidad corporativa y precisión técnica. Prioriza densidad de información, legibilidad y estructura rígida. La respuesta emocional debe ser confianza, estabilidad y precisión técnica absoluta.

El sistema utiliza **modo claro únicamente**. No existe modo oscuro.

---

## 2. Paleta de Colores

### Colores principales

| Token                        | Valor hex | Uso                                                              |
| ---------------------------- | --------- | ---------------------------------------------------------------- |
| `primary`                    | `#8c3600` | Acciones primarias, estado activo                                |
| `primary-container`          | `#b34700` | Botones primarios, CTAs, fondo activo sidebar                    |
| `on-primary`                 | `#ffffff` | Texto sobre fondos primary                                       |
| `on-primary-container`       | `#ffe4d9` | Texto sobre primary-container                                    |
| `secondary`                  | `#5f5e5e` | Texto secundario, elementos de soporte                           |
| `secondary-container`        | `#e2dfde` | Hover en items de navegación                                     |
| `on-secondary-container`     | `#636262` | Texto sobre secondary-container                                  |
| `tertiary`                   | `#004fa2` | Acciones secundarias                                             |
| `tertiary-container`         | `#0066cf` | Botones terciarios, links, indicadores informativos              |
| `on-tertiary`                | `#ffffff` | Texto sobre fondos tertiary                                      |
| `error`                      | `#ba1a1a` | Estados de error                                                 |
| `error-container`            | `#ffdad6` | Fondos de mensajes de error                                      |
| `on-error-container`         | `#93000a` | Texto sobre error-container                                      |

### Colores de superficie

| Token                        | Valor hex | Uso                                                              |
| ---------------------------- | --------- | ---------------------------------------------------------------- |
| `background`                 | `#f9f9f9` | Fondo general de la aplicación                                   |
| `surface`                    | `#f9f9f9` | Superficie base                                                  |
| `surface-container-lowest`   | `#ffffff` | Tarjetas, modales, paneles principales                           |
| `surface-container-low`      | `#f3f3f3` | Sidebar, headers de cards                                        |
| `surface-container`          | `#eeeeee` | Contenedores secundarios                                         |
| `surface-container-high`     | `#e8e8e8` | Contenedores elevados                                            |
| `on-surface`                 | `#1a1c1c` | Texto principal                                                  |
| `on-surface-variant`         | `#574239` | Texto secundario, subtítulos                                     |
| `outline`                    | `#8b7267` | Bordes de inputs en foco                                         |
| `outline-variant`            | `#dfc0b4` | Bordes sutiles, divisores                                        |
| `surface-tint`               | `#a23f00` | Tinte de superficie activa                                       |

---

## 3. Configuración del Tema (Tailwind CSS v4 `@theme` en `src/index.css`)

```css
@import "tailwindcss";

@theme {
  /* Primary */
  --color-primary: #8c3600;
  --color-primary-container: #b34700;
  --color-on-primary: #ffffff;
  --color-on-primary-container: #ffe4d9;
  --color-inverse-primary: #ffb695;

  /* Secondary */
  --color-secondary: #5f5e5e;
  --color-on-secondary: #ffffff;
  --color-secondary-container: #e2dfde;
  --color-on-secondary-container: #636262;

  /* Tertiary */
  --color-tertiary: #004fa2;
  --color-tertiary-container: #0066cf;
  --color-on-tertiary: #ffffff;
  --color-on-tertiary-container: #e1e9ff;

  /* Error */
  --color-error: #ba1a1a;
  --color-on-error: #ffffff;
  --color-error-container: #ffdad6;
  --color-on-error-container: #93000a;

  /* Surface */
  --color-background: #f9f9f9;
  --color-surface: #f9f9f9;
  --color-surface-container-lowest: #ffffff;
  --color-surface-container-low: #f3f3f3;
  --color-surface-container: #eeeeee;
  --color-surface-container-high: #e8e8e8;
  --color-surface-container-highest: #e2e2e2;
  --color-on-surface: #1a1c1c;
  --color-on-surface-variant: #574239;
  --color-outline: #8b7267;
  --color-outline-variant: #dfc0b4;
  --color-surface-tint: #a23f00;

  /* Tipografías */
  --font-display: "Inter", sans-serif;
  --font-mono: monospace;

  /* Radios */
  --radius-sm: 0px;
  --radius-DEFAULT: 0px;
  --radius-md: 0px;
  --radius-lg: 0px;

  /* Spacing base */
  --spacing-unit: 4px;
}
```

---

## 4. Tipografía

Fuente principal: **Inter** — elegida por su legibilidad excepcional en interfaces técnicas.

| Estilo            | Familia | Tamaño | Peso | Line Height | Letter Spacing |
| ----------------- | ------- | ------ | ---- | ----------- | -------------- |
| `headline-lg`     | Inter   | 32px   | 700  | 1.2         | -0.02em        |
| `headline-md`     | Inter   | 24px   | 600  | 1.3         | —              |
| `headline-sm`     | Inter   | 20px   | 600  | 1.4         | —              |
| `body-lg`         | Inter   | 16px   | 400  | 1.6         | —              |
| `body-md`         | Inter   | 14px   | 400  | 1.5         | —              |
| `label-lg`        | Inter   | 12px   | 600  | 1.2         | 0.05em         |
| `label-md`        | Inter   | 11px   | 500  | 1.2         | —              |
| `mono-data`       | mono    | 13px   | 400  | 1.4         | —              |

- **Labels:** uppercase con letter-spacing amplio, estilo estampado industrial.
- **Datos numéricos:** siempre `font-mono` para alineación tabular.

---

## 5. Layout y Espaciado

- Grid de 12 columnas en desktop, gutters de 16px
- Baseline grid de 4px — todos los márgenes y paddings son múltiplos de 4px
- Densidad de información alta, separación por bordes y tonos, no por espacios vacíos

---

## 6. Elevación y Profundidad

**Sin sombras.** La profundidad se logra exclusivamente por capas tonales y bordes:

- Fondo base: `#ffffff`
- Zonas funcionales secundarias (sidebar): `#f3f3f3`
- Todos los contenedores, cards e inputs: borde `1px solid #e0e0e0`
- Estado activo/foco: cambio de color de borde a `#b34700`, nunca sombra

---

## 7. Reglas Estrictas de Componentes

### Bordes y radios
- Radio de borde: estrictamente `0px` en todos los componentes.
- Cards, contenedores, botones, selectores, inputs y badges: deben tener esquinas totalmente rectas y rectilíneas.
- **Prohibido:** El uso de bordes redondeados (`rounded`, `rounded-sm`, `rounded-lg`, etc.) o formas circulares. Todos los indicadores visuales (como indicadores LED de estado) deben ser de forma cuadrada o rectangular con esquinas de 90 grados.

### Botones
- **Primario:** fondo `#b34700`, texto `#ffffff`, radio `4px`, sin gradientes
- **Secundario:** fondo blanco, borde `1px solid #e0e0e0`, texto `#1a1c1c`
- **Hover:** oscurecer levemente el color de fondo
- **Activo:** borde interior `2px inset`

### Inputs
- **Default:** fondo blanco, borde `1px solid #e0e0e0`
- **Focus:** borde `1px solid #b34700`
- **Label:** siempre visible encima del input, estilo `label-md`

### Cards y Contenedores
- Borde `1px solid #e0e0e0`
- Header de card: fondo `#f5f5f5` con borde inferior separador

### Tablas
- Filas separadas por líneas horizontales de `1px`
- Header: fondo `#f5f5f5`, labels en negrita
- Columnas numéricas: `font-mono`

### Indicadores de Estado
- **Activo/OK:** verde sólido `#2e7d32` (icono circular)
- **Advertencia/Error:** naranja óxido `#b34700`
- Sin glows ni blurs, solo colores planos sólidos

### Divisores
- `1px solid #e0e0e0` para todas las divisiones estructurales

---

## 8. Estructura Visual de la Sidebar

- Fondo: `#f3f3f3` (`surface-container-low`)
- Borde derecho: `1px solid #e0e0e0`
- Ancho: `240px` (`w-60`)
- Título "Techno Fuegos": color `#8c3600` (`primary`), fuente Inter, peso 700, `text-lg`
- Subtítulo "GESTIÓN DE PRESUPUESTOS": color `#574239` (`on-surface-variant`), uppercase, `font-medium`, `tracking-widest`, `text-[10px]`
- Items inactivos: texto `#1a1c1c` (`on-surface`), icono `#1a1c1c`, sin fondo, sin borde
- Item hover: fondo `#e2dfde` (`secondary-container`), texto `#1a1c1c`
- Item activo: fondo `rgba(179, 71, 0, 0.12)`, **borde derecho** `3px solid #b34700`, texto `#b34700` e icono `#b34700`
  > ⚠️ El fondo activo se aplica via `style` de React (no clase Tailwind) porque Tailwind v4 no soporta modificadores de opacidad (`/12`) sobre colores hex definidos en `@theme`.
- Versión al pie: color `#574239` (`on-surface-variant`), `text-[11px]`, centrado
- Padding de cabecera y pie: `px-6`
- Padding de botones de navegación: `pl-6 pr-4 py-3`
- Gap entre botones: `1px`

---

## 9. Estructura Visual del PDF de Salida (jsPDF)

- **Cabecera:** Nombre empresa, dirección, teléfono, mail, Instagram. Si un campo está vacío no se renderiza ni su etiqueta.
- **Bloque de identificación:** Número de presupuesto, fecha de emisión, fecha de vencimiento automática.
- **Cuerpo:** Tabla con bordes `1px` finos. Columnas: Detalle, Cantidad, Precio Unitario, Total.
- **Tipografía impresa:** Serif/Times para texto general, Courier/monoespaciada para precios alineados a la derecha.
- **Pie de página:** Cláusulas legales condicionales según configuración del sistema.

---

## 10. Librería de Componentes Atómicos (`src/components/ui/`)

Todos los componentes se importan desde el barrel export: `import { Button, Card, ... } from '../components/ui'`

### Button
Props: `variant` (`primary`|`secondary`|`ghost`), `size` (`sm`|`md`|`lg`), `onClick`, `disabled`, `children`
- **Primary:** fondo `#b34700`, texto blanco, radio `4px`
- **Secondary:** fondo blanco, borde `outline-variant`, texto `on-surface`
- **Ghost:** fondo transparente, texto `primary-container`
- **Hover:** oscurece levemente el fondo. **Active:** borde inset `2px`

### Input
Props: `label`, `placeholder`, `value`, `onChange`, `error`, `disabled`, `type`
- Label siempre visible encima del campo, estilo `label-md` uppercase
- Default: fondo blanco, borde `outline-variant`
- Focus: borde `primary-container` (`#b34700`)
- Error: borde `error`, mensaje rojo debajo

### Card
Props: `title`, `headerActions`, `children`
- Borde `1px outline-variant`, radio `0px` (esquinas rectas)
- Header: fondo `surface-container-low` (`#f3f3f3`), borde inferior, título en `label-lg` uppercase
- Body: fondo blanco, padding `16px`

### PageHeader
Props: `title`, `subtitle`, `children` (zona de acciones)
- Título: `headline-md`, texto `on-surface`
- Subtítulo: `body-md`, texto `on-surface-variant`
- Divisor horizontal `1px outline-variant` debajo
- Acciones alineadas a la derecha

### StatusBadge
Props: `status` (`borrador`|`enviado`|`aceptado`|`vencido`)
- Indicador circular LED + etiqueta en `label-md` uppercase
- `borrador`: gris `#5f5e5e` / fondo `#eeeeee`
- `enviado`: azul `#004fa2` / fondo `#e1e9ff`
- `aceptado`: verde `#2e7d32` / fondo `#e8f5e9`
- `vencido`: naranja `#b34700` / fondo `#ffe4d9`
- Sin sombras, sin glows — solo colores sólidos planos

### DataTable
Props: `columns` (Array: `{key, label, mono?, align?}`), `rows`, `emptyMessage`
- Header: fondo `surface-container-low`, `label-lg` uppercase, negrita
- Filas: separadas por `1px outline-variant`, hover `surface-container-low`
- Columnas `mono: true` usan `mono-data` (font monoespaciada)
- Columnas `align: 'right'` alinean texto a la derecha

### Divider
Props: `orientation` (`horizontal`|`vertical`), `className`
- `1px solid outline-variant` en todos los casos
- Vertical: `w-px self-stretch` (para uso entre columnas de datos adyacentes)