use rusqlite::{Connection, Result};
use tauri::Manager;

pub fn init_db(app_handle: &tauri::AppHandle) -> Result<Connection, rusqlite::Error> {
    let app_dir = app_handle.path().app_data_dir().expect("Failed to get app data directory");
    std::fs::create_dir_all(&app_dir).expect("Failed to create app data directory");
    let db_path = app_dir.join("techno-fuegos.db");

    let conn = Connection::open(&db_path)?;

    // Enable security and performance features
    conn.execute_batch("
        PRAGMA foreign_keys = ON;
        PRAGMA journal_mode = WAL;
        PRAGMA synchronous = NORMAL;
        PRAGMA temp_store = MEMORY;
    ")?;

    run_migrations(&conn)?;

    Ok(conn)
}

fn run_migrations(conn: &Connection) -> Result<(), rusqlite::Error> {
    conn.execute_batch("
        CREATE TABLE IF NOT EXISTS configuracion_general (
            id INTEGER PRIMARY KEY CHECK (id = 1),
            nombre TEXT NOT NULL,
            telefono TEXT NOT NULL,
            direccion TEXT NOT NULL,
            email TEXT NOT NULL,
            instagram TEXT NOT NULL,
            web TEXT NOT NULL,
            validez_dias INTEGER NOT NULL,
            clausula_sena TEXT,
            clausula_inflacion TEXT
        );

        CREATE TABLE IF NOT EXISTS empleados (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            activo INTEGER NOT NULL DEFAULT 1
        );

        CREATE TABLE IF NOT EXISTS insumos_base (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            material TEXT NOT NULL,
            unidad TEXT NOT NULL,
            costo_centavos INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS productos_base (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            precio_centavos INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS presupuestos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            es_plantilla INTEGER NOT NULL DEFAULT 0,
            nombre_plantilla TEXT,
            fecha_emision TEXT,
            cliente_nombre TEXT,
            cliente_telefono TEXT,
            cliente_email TEXT,
            cliente_localidad TEXT,
            descripcion_general TEXT,
            mano_de_obra_centavos INTEGER NOT NULL DEFAULT 0,
            total_centavos INTEGER NOT NULL DEFAULT 0,
            vendedor_id INTEGER,
            vendedor_nombre TEXT,
            observaciones TEXT,
            estado TEXT
        );

        CREATE TABLE IF NOT EXISTS presupuesto_detalles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            presupuesto_id INTEGER NOT NULL,
            producto_id TEXT, -- Can be an ID referencing insumos/productos, or empty for custom
            descripcion TEXT NOT NULL,
            cantidad REAL NOT NULL,
            precio_unitario_centavos INTEGER NOT NULL,
            FOREIGN KEY (presupuesto_id) REFERENCES presupuestos(id) ON DELETE CASCADE
        );
    ")?;

    // Seed config if empty
    let count: i64 = conn.query_row("SELECT COUNT(*) FROM configuracion_general", [], |row| row.get(0))?;
    if count == 0 {
        conn.execute("
            INSERT INTO configuracion_general (id, nombre, telefono, direccion, email, instagram, web, validez_dias, clausula_sena, clausula_inflacion)
            VALUES (1, 'Techno Fuegos', '+54 911 0000 0000', 'Pilar, Buenos Aires', 'contacto@technofuegos.com.ar', '@technofuegos', 'https://technofuegos.com.ar', 30, 'Seña requerida del 50% para dar inicio a la fabricación en taller.', 'Los precios cotizados están sujetos a variación inflacionaria si no se efectúa la seña en 5 días hábiles.')
        ", [])?;
    }

    Ok(())
}
