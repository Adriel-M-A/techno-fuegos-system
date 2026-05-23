# Arquitectura del Sistema, Persistencia y Base de Datos

## 1. Estrategia de Almacenamiento Local (SQLite)
La persistencia de datos opera de forma 100% offline local en un único archivo de base de datos relacional. 
- **Entorno de Desarrollo:** El archivo se genera en la raíz del proyecto como `dev-techno-fuegos.db` para facilitar su inspección técnica.
- **Entorno de Producción (Windows Nativizado):** El backend de Rust resuelve la ruta de manera automática apuntando al directorio de datos de aplicación del sistema operativo: `%APPDATA%/techno-fuegos-system/techno-fuegos.db`. El sistema crea la carpeta contenedora si no existe antes de inicializar el motor de persistencia.

---

## 2. Ciclo de Vida y Sistema de Migraciones Embebidas
Para permitir actualizaciones de tablas o agregado de campos futuros sin corromper el historial de presupuestos del cliente, el backend de Rust controla las versiones mediante un array secuencial de scripts SQL embebidos en el binario.
- Al iniciar la aplicación, Rust verifica la integridad del archivo `.db`.
- Se ejecuta un chequeo sobre la tabla interna de control de versiones.
- Si la versión estructural del archivo en disco es menor a la declarada en el código, se aplican las migraciones pendientes de forma lineal bajo transacciones seguras (ACID), garantizando que el usuario administrativo nunca experimente fallos por desajuste de esquemas.

---

## 3. Modelo de Datos Detallado (Esquema de Tablas SQL)

### Tabla: configuracion_general
Almacena los parámetros globales de la empresa y del documento PDF. Siempre opera sobre la fila con `id = 1`.
- `id`: INTEGER (PRIMARY KEY, CHECK id = 1)
- `nombre_empresa`: TEXT (NOT NULL, por defecto: 'Techno Fuegos')
- `telefono`: TEXT
- `email`: TEXT
- `direccion`: TEXT
- `instagram`: TEXT
- `web`: TEXT
- `dias_validez_presupuesto`: INTEGER (NOT NULL, por defecto: 7)
- `clausula_seña`: TEXT
- `clausula_inflacion`: TEXT

### Tabla: empleados
Catálogo para el control de autorías y asignación en el creador.
- `id`: INTEGER (PRIMARY KEY AUTOINCREMENT)
- `nombre`: TEXT (NOT NULL)
- `activo`: INTEGER (NOT NULL, valores: 1 = Activo, 0 = Inactivo para preservar históricos sin borrar filas)

### Tabla: clientes
- `id`: INTEGER (PRIMARY KEY AUTOINCREMENT)
- `nombre`: TEXT (NOT NULL)
- `telefono`: TEXT
- `localidad`: TEXT

### Tabla: insumos_base
Materiales planos e intangibles que alimentan el cálculo del costo técnico en el taller.
- `id`: INTEGER (PRIMARY KEY AUTOINCREMENT)
- `nombre_insumo`: TEXT (NOT NULL)
- `unidad`: TEXT (NOT NULL, valores restringidos: 'metro', 'm2', 'litro', 'kilo', 'cantidad')
- `costo_unitario`: REAL (NOT NULL, valor font-mono mapeado en frontend)

### Tabla: productos_base
Catálogo estático de recetas prefijadas de herrería.
- `id`: INTEGER (PRIMARY KEY AUTOINCREMENT)
- `nombre_producto`: TEXT (NOT NULL)
- `descripcion`: TEXT
- `precio_base_calculado`: REAL (NOT NULL)

### Tabla: presupuestos
Estructura unificada de documentos comerciales y modelos reutilizables.
- `id`: INTEGER (PRIMARY KEY AUTOINCREMENT)
- `cliente_id`: INTEGER (FOREIGN KEY REFERENCES clientes(id), NULLABLE si es_plantilla = 1)
- `nombre_plantilla`: TEXT (NULL si es cotización real; almacena el nombre del modelo si es plantilla)
- `descripcion_general`: TEXT (Breve contexto explicativo sobre el propósito del presupuesto)
- `fecha_emision`: TEXT (ISO 8601 YYYY-MM-DD, NULLABLE si es plantilla)
- `fecha_vencimiento`: TEXT (ISO 8601 YYYY-MM-DD, NULLABLE si es plantilla)
- `total`: REAL (NOT NULL)
- `vendedor`: TEXT (Mapea el nombre del empleado que emitió la pieza)
- `estado`: TEXT (NOT NULL, valores: 'Borrador', 'Enviado', 'Aceptado', 'Vencido', 'Plantilla')
- `es_plantilla`: INTEGER (NOT NULL, valores: 0 = Presupuesto operativo, 1 = Plantilla clonable)

---

## 4. Capa de Validación Frontend (Zod + Resolvers)
La sincronización entre los tipos de datos permisivos de SQLite y el tipado estricto de la UI se gestiona en la frontera de React mediante esquemas de Zod:
- **Esquema Presupuesto Real:** Valida obligatoriamente campos de cliente, localidad válida y fecha estructurada.
- **Esquema Plantilla:** Omite el objeto cliente, obligando únicamente el string identificador de la plantilla y la matriz de insumos numéricos.
- Los montos procesados se sanean con `parseFloat` en el frontend antes de cruzar el puente IPC, impidiendo strings vacíos o caracteres inválidos en columnas de tipo `REAL`.

---

## 5. Interfaces IPC (Tauri Conectores Rust ⇄ JavaScript)
La comunicación se realiza mediante pasarelas de invocación asíncronas asiladas de la red.
- `get_presupuestos()`: Recupera el listado del historial completo para el Dashboard.
- `get_plantillas()`: SELECT filtrado donde `es_plantilla = 1` para autopopular el creador.
- `save_presupuesto(payload)`: Inserta o actualiza registros de cotizaciones o modelos.
- `update_estado_presupuesto(id, nuevo_estado)`: Conmutador rápido desde las filas del panel.
- `get_configuracion()`, `save_configuracion(payload)`: Persistencia de los datos base de la empresa.
- `get_empleados()`, `save_empleado(payload)`: Administración del CRUD de operadores del sistema.

### Copia de Seguridad y Mantenimiento (Nativo Tauri)
- `exportar_db()`: Abre el diálogo nativo del sistema para guardar archivos. Realiza una copia bit a bit física del archivo SQLite activo en `%APPDATA%/techno-fuegos-system/techno-fuegos.db` hacia la ruta seleccionada por el usuario (ej. pendrive externo).
- `importar_db()`: Abre el selector nativo del sistema. Recibe el archivo `.db` externo, valida su integridad estructural del esquema de tablas e inicia el reemplazo físico en caliente en la ruta local de `%APPDATA%`, enviando una señal para forzar el refresco de los almacenes globales de Zustand y estado de datos en el frontend.