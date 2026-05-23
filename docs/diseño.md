# Guía de Diseño Visual e Identidad de Interfaz

## 1. Estética General e Identidad
El sistema sigue una estética **Modern Industrial**: fusión de confiabilidad corporativa y precisión técnica. Prioriza la densidad de información, legibilidad y estructura rígida. La respuesta emocional debe ser confianza, estabilidad y precisión técnica absoluta.

El sistema utiliza **modo claro únicamente**. No existe modo oscuro.

---

## 2. Paleta de Colores

### Colores principales
| Token | Valor hex | Uso |
| --- | --- | --- |
| `primary` | `#8c3600` | Acciones primarias, estado activo |
| `primary-container` | `#b34700` | Botones primarios, CTAs, fondo activo sidebar |
| `on-primary` | `#ffffff` | Texto sobre fondos primary |
| `on-primary-container` | `#ffe4d9` | Texto sobre primary-container |
| `secondary` | `#5f5e5e` | Texto secundario, elementos de soporte |
| `secondary-container` | `#e2dfde` | Hover en items de navegación |
| `on-secondary-container` | `#636262` | Texto sobre secondary-container |
| `tertiary` | `#004fa2` | Acciones secundarias |
| `tertiary-container` | `#0066cf` | Botones terciarios, links, indicadores informativos |
| `on-tertiary` | `#ffffff` | Texto sobre fondos tertiary |
| `error` | `#ba1a1a` | Estados de error |
| `error-container` | `#ffdad6` | Fondos de mensajes de error |
| `on-error-container` | `#93000a` | Texto sobre error-container |

### Colores de superficie
| Token | Valor hex | Uso |
| --- | --- | --- |
| `background` | `#f9f9f9` | Fondo general de la aplicación |
| `surface` | `#f9f9f9` | Superficie base |
| `surface-container-lowest` | `#ffffff` | Tarjetas, modales, paneles principales |
| `surface-container-low` | `#f3f3f3` | Sidebar, headers de cards |
| `surface-container` | `#eeeeee` | Contenedores secundarios |
| `surface-container-high` | `#e8e8e8` | Contenedores elevados |
| `on-surface` | `#1a1c1c` | Texto principal |
| `on-surface-variant` | `#574239` | Texto secundario, subtítulos |
| `outline` | `#8b7267` | Bordes de inputs en foco |
| `outline-variant` | `#dfc0b4` | Bordes sutiles, divisores |
| `surface-tint` | `#a23f00` | Tinte de superficie activa |

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

  /* Radios estrictos rectilíneos */
  --radius-sm: 0px;
  --radius-DEFAULT: 0px;
  --radius-md: 0px;
  --radius-lg: 0px;

  /* Spacing base */
  --spacing-unit: 4px;
}
```

## 4. Tipografía

Fuente principal: **Inter** — elegida por su legibilidad excepcional en interfaces técnicas.

|**Estilo**|**Familia**|**Tamaño**|**Peso**|**Line Height**|**Letter Spacing**|
|---|---|---|---|---|---|
|`headline-lg`|Inter|32px|700|1.2|-0.02em|
|`headline-md`|Inter|24px|600|1.3|—|
|`headline-sm`|Inter|20px|600|1.4|—|
|`body-lg`|Inter|16px|400|1.6|—|
|`body-md`|Inter|14px|400|1.5|—|
|`label-lg`|Inter|12px|600|1.2|0.05em|
|`label-md`|Inter|11px|500|1.2|—|
|`mono-data`|mono|13px|400|1.4|—|

- **Labels:** uppercase con letter-spacing amplio, estilo estampado industrial.
    
- **Datos numéricos:** siempre `font-mono` para alineación tabular de importes.
    

## 5. Reglas Estrictas de Componentes Visuales

### Bordes y radios

- Radio de borde: estrictamente `0px` en todos los componentes del sistema.
    
- Cards, contenedores, botones, selectores, inputs y badges: deben tener esquinas totalmente rectas y rectilíneas.
    
- **Prohibido:** El uso de bordes redondeados (`rounded`, `rounded-sm`, etc.) o formas circulares. Todos los indicadores visuales (como los LEDs de estado) serán cuadrados o rectangulares.
    
- Todos los inputs, tablas, tarjetas y contenedores deben tener un borde visible fino de `1px` usando `--color-outline-variant`.
    

### Números, Precios e Importes

- Es obligatorio utilizar `font-mono` y la utilidad global `formatARS` para renderizar cualquier valor numérico crítico, impidiendo la concatenación manual del signo `$`.
    

## 6. Estructura Visual del PDF de Salida (jsPDF)

El presupuesto final se generará exclusivamente en una estética clásica, estructurada y limpia en blanco y negro (estética monocromática), maximizando el contraste para optimizar la claridad en su impresión en el taller y reduciendo al mínimo el consumo de tinta.

- **Cabecera:** Nombre de la empresa, dirección, teléfono, mail, Instagram. Si un campo está vacío, la lógica condicional del frontend impide su renderizado eliminando el renglón para evitar renglones en blanco.
    
- **Bloque de Contexto:** Bloque físico del campo **Descripción General** (que detalla brevemente el propósito de la cotización) posicionado en la cabecera del PDF, justo antes de la matriz numérica.
    
- **Cuerpo (Desglose de Materiales):** Tabla estructurada con desglose estricto de materiales crudos utilizados (kilos de chapa, metros de perfiles, insumos específicos) y horas de mano de obra del taller estimadas, en lugar de listar productos de catálogo terminados con descripciones largas. Columnas: Cantidad, Descripción de Materiales / Servicios, Precio Unitario, Total.
    
- **Tipografía impresa:** Serif/Times para texto general y descripciones básicas, y Courier/monoespaciada para la matriz de precios alineada rigurosamente a la derecha.
    
- **Pie de página:** Bloque reducido de condiciones de fabricación con cláusulas dinámicas (Seña, plazos e inflación).
