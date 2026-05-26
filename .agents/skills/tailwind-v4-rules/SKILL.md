---
name: tailwind-v4-rules
description: Especificaciones de configuración para Tailwind CSS v4
---
- El proyecto utiliza exclusivamente Tailwind CSS v4.
- No existe el archivo tailwind.config.js ni tailwind.config.ts. No intentes crearlos ni modificarlos.
- Toda personalización de estilos, fuentes, colores de acento y extensiones del tema se debe realizar directamente en src/index.css utilizando la directiva @theme de Tailwind v4.
- Está estrictamente prohibido el uso de valores arbitrarios en clases de espaciado, tamaños o colores (por ejemplo: bg-[#f3f6fb], p-[13px] o rounded-[4px]). Es obligatorio utilizar de forma exclusiva los tokens semánticos y variables del tema definidos bajo la directiva @theme (como bg-background, p-4 o rounded-sm).