---
name: tauri-sqlite-bridge
description: Reglas estrictas para la persistencia de datos e IPC en Techno Fuegos System
---
- Está estrictamente prohibido usar fetch, axios o protocolos HTTP para obtener datos.
- Toda la persistencia se realiza localmente mediante la invocación de comandos de Tauri usando: import { invoke } from '@tauri-apps/api/core';.
- Las funciones de base de datos se ejecutan en el backend de Rust (src-tauri/src/) interactuando con SQLite.
- Los tipos de datos del frontend deben coincidir exactamente con las estructuras (Structs) de Rust encargadas de la deserialización de SQLite.
- La navegación entre vistas se maneja exclusivamente con Zustand (navigationStore).
- No usar React Router ni ningún enrutador basado en URLs.
- El estado global de formularios y búsquedas se maneja con Zustand stores separados por vista.
- Cualquier comando IPC que reemplace o altere el archivo físico de la base de datos (como la restauración de copias de seguridad) debe exigir primero el cierre explícito de la conexión y de los descriptores de archivo activos en Rust antes de sobreescribir el archivo .db en disco.
- MENTALIDAD SAFE MONEY: Queda prohibido el uso de operaciones matemáticas con números decimales (Float/REAL) para costos, precios o totales. Toda la lógica matemática en los stores de Zustand y en las queries SQL de Rust debe operar estrictamente con números enteros que representen centavos enteros. El parseo a float y aplicación de formato de moneda local ocurre únicamente en la capa visual de presentación o renderizado del reporte PDF.
- CAPACIDADES TAURI V2: Al crear, modificar o consumir comandos IPC nativos o comandos personalizados expuestos en Rust, es obligatorio actualizar el archivo de configuración de capacidades de Tauri v2 en `src-tauri/capabilities/main.json`. Se deben mapear explícitamente los permisos para la ejecución de los plugins de diálogo (`dialog`) y sistema de archivos (`fs`), impidiendo fallos silenciosos por denegación de acceso en el frontend.
- AUTO-GUARDADO DE RESILIENCIA (ANTI-APAGONES): El store de Zustand encargado del creador de presupuestos debe implementar de forma obligatoria el middleware `persist` para volcar el estado del formulario en tiempo real hacia el almacenamiento local (localStorage o el almacén local de Tauri). Este borrador temporal activo debe persistir entre reinicios forzados de la aplicación. Una vez que el usuario confirma el presupuesto y este se inserta con éxito en SQLite mediante el comando IPC, el store debe limpiar explícitamente el almacenamiento local del borrador para dejar el formulario listo para una nueva carga.