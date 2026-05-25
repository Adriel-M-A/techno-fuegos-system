# Guía de Diseño Visual e Identidad de Interfaz

## 1. Estética General e Identidad
El sistema sigue una estética **Modern Industrial**: fusión de confiabilidad corporativa y precisión técnica. Prioriza la densidad de información, legibilidad y estructura rígida. La respuesta emocional debe ser confianza, estabilidad y precisión técnica absoluta.

El sistema utiliza **modo claro únicamente**. No existe modo oscuro.

---

## 2. Paleta de Colores

### Colores principales
| Token | Valor hex | Uso |
| --- | --- | --- |
| `primary` | `#005bbf` | Acciones primarias, estado activo, marca principal azul |
| `primary-container` | `#1a73e8` | Botones primarios, CTAs, fondo interactivo |
| `on-primary` | `#ffffff` | Texto sobre fondos primary |
| `on-primary-container` | `#ffffff` | Texto sobre primary-container |
| `secondary` | `#515f74` | Elementos de soporte, texto secundario |
| `secondary-container` | `#d5e3fc` | Hover en ítems de navegación, fondos secundarios sutiles |
| `on-secondary-container` | `#57657a` | Texto sobre secondary-container |
| `tertiary` | `#9e4300` | Acciones secundarias, color óxido industrial |
| `tertiary-container` | `#c55500` | Botones terciarios, links informativos óxido |
| `on-tertiary` | `#ffffff` | Texto sobre fondos tertiary |
| `error` | `#ba1a1a` | Estados de error |
| `error-container` | `#ffdad6` | Fondos de mensajes de error |
| `on-error-container` | `#93000a` | Texto sobre error-container |

### Colores de superficie
| Token | Valor hex | Uso |
| --- | --- | --- |
| `background` | `#f7f9fb` | Fondo general de la aplicación |
| `surface` | `#f7f9fb` | Superficie base |
| `surface-container-lowest` | `#ffffff` | Tarjetas, modales, paneles principales |
| `surface-container-low` | `#f2f4f6` | Sidebar, cabeceras secundarias |
| `surface-container` | `#eceef0` | Contenedores secundarios, cajas técnicas |
| `surface-container-high` | `#e6e8ea` | Contenedores elevados, hovers sutiles |
| `on-surface` | `#191c1e` | Texto principal |
| `on-surface-variant` | `#414754` | Texto secundario de soporte |
| `outline` | `#727785` | Bordes de inputs en foco |
| `outline-variant` | `#c1c6d6` | Bordes sutiles, divisores |
| `surface-tint` | `#005bc0` | Tinte de superficie activa |

---

## 3. Configuración del Tema (Tailwind CSS v4 `@theme` en `src/index.css`)

```css
@import "tailwindcss";

@theme {
  /* Primary */
  --color-primary: #005bbf;
  --color-primary-container: #1a73e8;
  --color-on-primary: #ffffff;
  --color-on-primary-container: #ffffff;
  --color-inverse-primary: #adc7ff;
  --color-primary-fixed: #d8e2ff;
  --color-primary-fixed-dim: #adc7ff;
  --color-on-primary-fixed: #001a41;
  --color-on-primary-fixed-variant: #004493;

  /* Secondary */
  --color-secondary: #515f74;
  --color-on-secondary: #ffffff;
  --color-secondary-container: #d5e3fc;
  --color-on-secondary-container: #57657a;
  --color-secondary-fixed: #d5e3fc;
  --color-secondary-fixed-dim: #b9c7df;
  --color-on-secondary-fixed: #0d1c2e;
  --color-on-secondary-fixed-variant: #3a485b;

  /* Tertiary */
  --color-tertiary: #9e4300;
  --color-tertiary-container: #c55500;
  --color-on-tertiary: #ffffff;
  --color-on-tertiary-container: #0e0200;
  --color-tertiary-fixed: #ffdbcb;
  --color-tertiary-fixed-dim: #ffb691;
  --color-on-tertiary-fixed: #341100;
  --color-on-tertiary-fixed-variant: #783100;

  /* Error */
  --color-error: #ba1a1a;
  --color-on-error: #ffffff;
  --color-error-container: #ffdad6;
  --color-on-error-container: #93000a;

  /* Surface */
  --color-background: #f7f9fb;
  --color-surface: #f7f9fb;
  --color-surface-container-lowest: #ffffff;
  --color-surface-container-low: #f2f4f6;
  --color-surface-container: #eceef0;
  --color-surface-container-high: #e6e8ea;
  --color-surface-container-highest: #e0e3e5;
  --color-on-surface: #191c1e;
  --color-on-surface-variant: #414754;
  --color-outline: #727785;
  --color-outline-variant: #c1c6d6;
  --color-border-iron: #c1c6d6;
  --color-surface-tint: #005bc0;

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
