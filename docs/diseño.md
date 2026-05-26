# Guía de Diseño Visual e Identidad de Interfaz

## 1. Estética General e Identidad
El sistema sigue una estética **Modern Industrial**: fusión de confiabilidad corporativa y precisión técnica. Prioriza la densidad de información, legibilidad y estructura limpia basada en componentes nativos de escritorio. La respuesta emocional debe ser confianza, estabilidad y precisión técnica absoluta.

El sistema utiliza **modo claro únicamente**. No existe modo oscuro.

---

## 2. Paleta de Colores

### Colores principales (Windows 11 inspired)
| Token | Valor hex | Uso |
| --- | --- | --- |
| `primary` | `#005bbf` | Azul base corporativo |
| `primary-container` | `#0078d4` | Botones primarios, CTAs, foco interactivo vibrante |
| `on-primary` | `#ffffff` | Texto sobre fondos primary |
| `on-primary-container` | `#ffffff` | Texto sobre primary-container |
| `secondary` | `#4a5768` | Elementos de soporte y texto secundario |
| `secondary-container` | `#d8e6f8` | Fondos interactivos secundarios (hover activo sidebar) |
| `on-secondary-container` | `#33445c` | Texto sobre fondos secondary-container |
| `tertiary` | `#d9480f` | Acciones secundarias y acentos vibrantes |
| `tertiary-container` | `#e8590c` | Botones terciarios y destaques en naranja vibrante |
| `on-tertiary` | `#ffffff` | Texto sobre fondos tertiary |
| `error` | `#c42b1c` | Estados de error y alertas de detención (Windows 11 Rojo) |
| `error-container` | `#fde7e9` | Fondos de mensajes de error |
| `on-error-container` | `#bc2f32` | Texto sobre fondos de error |
| `success` | `#107c10` | Estados de confirmación, éxito y activo (Windows 11 Verde) |

### Colores de superficie
| Token | Valor hex | Uso |
| --- | --- | --- |
| `background` | `#f3f6fb` | Fondo general de la aplicación con tinte azulado Mica |
| `surface` | `#f3f6fb` | Superficie base |
| `surface-container-lowest` | `#ffffff` | Tarjetas, modales, paneles principales (blanco puro) |
| `surface-container-low` | `#f8fafc` | Fondos de cabecera secundaria y bloques sutiles |
| `surface-container` | `#f1f5f9` | Contenedores secundarios y cajas de datos |
| `surface-container-high` | `#e2e8f0` | Contenedores elevados y hovers discretos |
| `surface-container-highest` | `#cbd5e1` | Separadores y divisores principales |
| `on-surface` | `#1a1a1a` | Texto principal del sistema |
| `on-surface-variant` | `#475569` | Texto de soporte secundario |
| `outline` | `#0078d4` | Bordes de foco activo |
| `outline-variant` | `#cbd5e1` | Bordes sutiles y divisores finos de contenedor |
| `surface-tint` | `#0078d4` | Tinte de superficie activa |

---

## 3. Configuración del Tema (Tailwind CSS v4 `@theme` en `src/index.css`)

```css
@import "tailwindcss";

@theme {
  /* Primary - Azul Microsoft / Windows 11 */
  --color-primary: #005bbf;
  --color-primary-container: #0078d4;
  --color-on-primary: #ffffff;
  --color-on-primary-container: #ffffff;
  --color-inverse-primary: #80bfff;
  --color-primary-fixed: #cce3ff;
  --color-primary-fixed-dim: #80bfff;
  --color-on-primary-fixed: #001e47;
  --color-on-primary-fixed-variant: #005bb7;

  /* Secondary */
  --color-secondary: #4a5768;
  --color-on-secondary: #ffffff;
  --color-secondary-container: #d8e6f8;
  --color-on-secondary-container: #33445c;

  /* Tertiary */
  --color-tertiary: #d9480f;
  --color-tertiary-container: #e8590c;
  --color-on-tertiary: #ffffff;
  --color-on-tertiary-container: #ffffff;

  /* Error */
  --color-error: #c42b1c;
  --color-on-error: #ffffff;
  --color-error-container: #fde7e9;
  --color-on-error-container: #bc2f32;

  /* Success */
  --color-success: #107c10;

  /* Surface */
  --color-background: #f3f6fb;
  --color-surface: #f3f6fb;
  --color-surface-container-lowest: #ffffff;
  --color-surface-container-low: #f8fafc;
  --color-surface-container: #f1f5f9;
  --color-surface-container-high: #e2e8f0;
  --color-surface-container-highest: #cbd5e1;
  --color-on-surface: #1a1a1a;
  --color-on-surface-variant: #475569;
  --color-outline: #0078d4;
  --color-outline-variant: #cbd5e1;
  --color-border-iron: #cbd5e1;
  --color-surface-tint: #0078d4;

  /* Radios Fluent - Unificados */
  --radius-sm: 4px;      /* Botones, inputs, badges y selectores */
  --radius-DEFAULT: 4px;
  --radius-md: 8px;      /* Tarjetas (Cards), tablas de datos y modales */
  --radius-lg: 12px;     /* Elementos flotantes o pills */
  --radius-xl: 16px;
  --radius-full: 9999px; /* Chips e indicadores de estado redondos */

  /* Sombras Fluent */
  --shadow-card: 0px 1.6px 3.6px rgba(0,0,0,0.08), 0px 0.3px 0.9px rgba(0,0,0,0.04);
  --shadow-raised: 0px 8px 16px rgba(0,0,0,0.08), 0px 1px 3px rgba(0,0,0,0.04);
}
```

## 4. Tipografía

Fuente principal: **Inter** — elegida por su legibilidad excepcional en interfaces de software de escritorio.

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

- **Labels:** uppercase con letter-spacing amplio, estilo estampado industrial limpio.
    
- **Datos numéricos:** siempre `font-mono` para alineación tabular perfecta de los importes de herrería.
    

## 5. Reglas Estrictas de Componentes Visuales

### Bordes y radios (Fluent Design Windows 10/11)

- **Radios de esquina:** Se implementan de forma estricta en el sistema para suavizar y modernizar la interfaz:
    
    - **`4px` (rounded-sm):** En botones, selectores, campos de texto (inputs) y badges rectangulares.
        
    - **`8px` (rounded-md):** En tarjetas (`Cards`), contenedores principales, modales y tablas de datos.
        
    - **`rounded-full`:** En badges de estado (`StatusBadge`) para simular pastillas/chips modernos.
        
- **Elevación y sombras:** Las tarjetas (`Cards`) y paneles elevados deben implementar sombras sutiles Fluent (`shadow-card` o `shadow-raised`) para dar profundidad a la interfaz y evitar un diseño plano sin jerarquías.
    
- Todos los inputs, tablas, tarjetas y contenedores deben tener un borde visible fino de `1px` usando `--color-outline-variant` para mantener la separación y estructura visual clara del taller.
    

### Números, Precios e Importes

- Es obligatorio utilizar `font-mono` y la utilidad global `formatARS` para renderizar cualquier valor numérico crítico, impidiendo la concatenación manual del signo `$`.
    

## 6. Estructura Visual del PDF de Salida (jsPDF)

El presupuesto final se generará exclusivamente en una estética clásica, estructurada y limpia en blanco y negro (estética monocromática), maximizando el contraste para optimizar la claridad en su impresión en el taller y reduciendo al mínimo el consumo de tinta.

- **Cabecera:** Nombre de la empresa, dirección, teléfono, mail, Instagram. Si un campo está vacío, la lógica condicional del frontend impide su renderizado eliminando el renglón para evitar espacios vacíos.
    
- **Bloque de Contexto:** Bloque físico del campo **Descripción General** (que detalla brevemente el propósito de la cotización) posicionado en la cabecera del PDF, justo antes de la matriz numérica de insumos.
    
- **Cuerpo (Desglose de Materiales):** Tabla estructurada con desglose estricto de materiales crudos utilizados (kilos de chapa, metros de perfiles, insumos específicos) y horas de mano de obra del taller estimadas, en lugar de listar productos de catálogo terminados con descripciones comerciales largas. Columnas: Cantidad, Descripción de Materiales / Servicios, Precio Unitario, Total.
    
- **Tipografía impresa:** Serif/Times para texto general y descripciones básicas, y Courier/monoespaciada para la matriz de precios alineada rigurosamente a la derecha.
    
- **Pie de página:** Bloque reducido de condiciones de fabricación con cláusulas dinámicas (Seña, plazos e inflación).