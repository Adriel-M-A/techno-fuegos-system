---
name: tauri-sqlite-bridge
description: Reglas estrictas para la persistencia de datos e IPC en Techno Fuegos System
---
- Está estrictamente prohibido usar fetch, axios o protocolos HTTP para obtener datos.
- Toda la persistencia se realiza localmente mediante la invocación de comandos de Tauri usando: import { invoke } from '@tauri-apps/api/core';
- Las funciones de base de datos se ejecutan en el backend de Rust (src-tauri/src/) interactuando con SQLite.
- Los tipos de datos del frontend deben coincidir exactamente con las estructuras (Structs) de Rust encargadas de la deserialización de SQLite.
- La navegación entre vistas se maneja exclusivamente con Zustand (navigationStore).
- No usar React Router ni ningún enrutador basado en URLs.
- El estado global de formularios y búsquedas se maneja con Zustand stores separados por vista.