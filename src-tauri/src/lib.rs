mod db;
mod models;

use std::sync::Mutex;
use tauri::{Manager, State};
use models::*;

// Database state
struct AppState {
    conn: Mutex<rusqlite::Connection>,
}

#[tauri::command]
fn get_configuracion(state: State<'_, AppState>) -> Result<ConfiguracionGeneral, String> {
    let conn = state.conn.lock().unwrap();
    let mut stmt = conn.prepare("SELECT nombre, telefono, direccion, email, instagram, web, validez_dias, clausula_sena, clausula_inflacion FROM configuracion_general WHERE id = 1").map_err(|e| e.to_string())?;
    
    let config = stmt.query_row([], |row| {
        Ok(ConfiguracionGeneral {
            nombre: row.get(0)?,
            telefono: row.get(1)?,
            direccion: row.get(2)?,
            email: row.get(3)?,
            instagram: row.get(4)?,
            web: row.get(5)?,
            validez_dias: row.get(6)?,
            clausula_sena: row.get(7)?,
            clausula_inflacion: row.get(8)?,
        })
    }).map_err(|e| e.to_string())?;

    Ok(config)
}

#[tauri::command]
fn delete_presupuesto(id: i32, state: State<'_, AppState>) -> Result<(), String> {
    let conn = state.conn.lock().unwrap();
    // Use transaction for cascading delete just in case, though PRAGMA foreign_keys = ON should handle it.
    conn.execute("DELETE FROM presupuestos WHERE id = ?1", [id]).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn rename_plantilla(id: i32, new_name: String, state: State<'_, AppState>) -> Result<(), String> {
    let conn = state.conn.lock().unwrap();
    conn.execute("UPDATE presupuestos SET nombre_plantilla = ?1 WHERE id = ?2", [new_name.clone(), id.to_string()]).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn save_empleado(empleado: Empleado, state: State<'_, AppState>) -> Result<i32, String> {
    let conn = state.conn.lock().unwrap();
    if empleado.id <= 0 {
        // Creación
        conn.execute(
            "INSERT INTO empleados (nombre, activo) VALUES (?1, ?2)",
            (&empleado.nombre, empleado.activo),
        ).map_err(|e| e.to_string())?;
        let last_id = conn.last_insert_rowid() as i32;
        Ok(last_id)
    } else {
        // Edición
        conn.execute(
            "UPDATE empleados SET nombre = ?1, activo = ?2 WHERE id = ?3",
            (&empleado.nombre, empleado.activo, empleado.id),
        ).map_err(|e| e.to_string())?;
        Ok(empleado.id)
    }
}

#[tauri::command]
fn toggle_empleado_activo(id: i32, activo: i32, state: State<'_, AppState>) -> Result<(), String> {
    let conn = state.conn.lock().unwrap();
    conn.execute(
        "UPDATE empleados SET activo = ?1 WHERE id = ?2",
        (activo, id),
    ).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn get_empleados(state: State<'_, AppState>) -> Result<Vec<Empleado>, String> {
    let conn = state.conn.lock().unwrap();
    let mut stmt = conn.prepare("SELECT id, nombre, activo FROM empleados ORDER BY id").map_err(|e| e.to_string())?;
    let empleados = stmt.query_map([], |row| {
        Ok(Empleado {
            id: row.get(0)?,
            nombre: row.get(1)?,
            activo: row.get(2)?,
        })
    }).map_err(|e| e.to_string())?
    .collect::<Result<Vec<_>, _>>().map_err(|e| e.to_string())?;
    Ok(empleados)
}

#[tauri::command]
fn get_insumos(state: State<'_, AppState>) -> Result<Vec<Insumo>, String> {
    let conn = state.conn.lock().unwrap();
    let mut stmt = conn.prepare("SELECT id, material, unidad, costo_centavos FROM insumos_base ORDER BY id").map_err(|e| e.to_string())?;
    let insumos = stmt.query_map([], |row| {
        Ok(Insumo {
            id: row.get(0)?,
            material: row.get(1)?,
            unidad: row.get(2)?,
            costo_centavos: row.get(3)?,
        })
    }).map_err(|e| e.to_string())?
    .collect::<Result<Vec<_>, _>>().map_err(|e| e.to_string())?;
    Ok(insumos)
}

#[tauri::command]
fn get_productos(state: State<'_, AppState>) -> Result<Vec<Producto>, String> {
    let conn = state.conn.lock().unwrap();
    let mut stmt = conn.prepare("SELECT id, nombre, precio_centavos FROM productos_base ORDER BY id").map_err(|e| e.to_string())?;
    let productos = stmt.query_map([], |row| {
        Ok(Producto {
            id: row.get(0)?,
            nombre: row.get(1)?,
            precio_centavos: row.get(2)?,
        })
    }).map_err(|e| e.to_string())?
    .collect::<Result<Vec<_>, _>>().map_err(|e| e.to_string())?;
    Ok(productos)
}

#[tauri::command]
fn get_presupuestos(state: State<'_, AppState>) -> Result<Vec<Presupuesto>, String> {
    let conn = state.conn.lock().unwrap();
    let mut stmt = conn.prepare("SELECT p.id, p.es_plantilla, p.nombre_plantilla, p.fecha_emision, p.cliente_nombre, p.cliente_telefono, p.cliente_email, p.cliente_localidad, p.descripcion_general, p.mano_de_obra_centavos, p.total_centavos, p.vendedor_id, p.vendedor_nombre, p.observaciones, p.estado, (SELECT COUNT(*) FROM presupuesto_detalles d WHERE d.presupuesto_id = p.id) as items_count FROM presupuestos p ORDER BY p.id DESC").map_err(|e| e.to_string())?;
    
    let presupuestos = stmt.query_map([], |row| {
        Ok(Presupuesto {
            id: row.get(0)?,
            es_plantilla: row.get(1)?,
            nombre_plantilla: row.get(2)?,
            fecha_emision: row.get(3)?,
            cliente_nombre: row.get(4)?,
            cliente_telefono: row.get(5)?,
            cliente_email: row.get(6)?,
            cliente_localidad: row.get(7)?,
            descripcion_general: row.get(8)?,
            mano_de_obra_centavos: row.get(9)?,
            total_centavos: row.get(10)?,
            vendedor_id: row.get(11)?,
            vendedor_nombre: row.get(12)?,
            observaciones: row.get(13)?,
            estado: row.get(14)?,
            items_count: row.get(15).unwrap_or(None),
            items: None, // No cargamos los items en la lista general para hacerla más ligera
        })
    }).map_err(|e| e.to_string())?
    .collect::<Result<Vec<_>, _>>().map_err(|e| e.to_string())?;
    
    Ok(presupuestos)
}

#[tauri::command]
fn get_presupuesto_detalles(id: i32, state: State<'_, AppState>) -> Result<Vec<PresupuestoDetalle>, String> {
    let conn = state.conn.lock().unwrap();
    let mut stmt = conn.prepare("SELECT id, presupuesto_id, producto_id, descripcion, cantidad, precio_unitario_centavos FROM presupuesto_detalles WHERE presupuesto_id = ?1").map_err(|e| e.to_string())?;
    
    let detalles = stmt.query_map([id], |row| {
        Ok(PresupuestoDetalle {
            id: row.get(0)?,
            presupuesto_id: row.get(1)?,
            producto_id: row.get(2)?,
            descripcion: row.get(3)?,
            cantidad: row.get(4)?,
            precio_unitario_centavos: row.get(5)?,
        })
    }).map_err(|e| e.to_string())?
    .collect::<Result<Vec<_>, _>>().map_err(|e| e.to_string())?;
    
    Ok(detalles)
}

#[tauri::command]
fn save_presupuesto(presupuesto: Presupuesto, state: State<'_, AppState>) -> Result<i32, String> {
    let mut conn = state.conn.lock().unwrap();
    let tx = conn.transaction().map_err(|e| e.to_string())?;
    
    // Insert header
    tx.execute(
        "INSERT INTO presupuestos (
            es_plantilla, nombre_plantilla, fecha_emision, cliente_nombre, cliente_telefono, 
            cliente_email, cliente_localidad, descripcion_general, mano_de_obra_centavos, 
            total_centavos, vendedor_id, vendedor_nombre, observaciones, estado
        ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14)",
        (
            presupuesto.es_plantilla,
            &presupuesto.nombre_plantilla,
            &presupuesto.fecha_emision,
            &presupuesto.cliente_nombre,
            &presupuesto.cliente_telefono,
            &presupuesto.cliente_email,
            &presupuesto.cliente_localidad,
            &presupuesto.descripcion_general,
            presupuesto.mano_de_obra_centavos,
            presupuesto.total_centavos,
            presupuesto.vendedor_id,
            &presupuesto.vendedor_nombre,
            &presupuesto.observaciones,
            &presupuesto.estado,
        )
    ).map_err(|e| e.to_string())?;
    
    let presupuesto_id = tx.last_insert_rowid() as i32;

    // Insert items
    if let Some(items) = presupuesto.items {
        let mut stmt = tx.prepare(
            "INSERT INTO presupuesto_detalles (
                presupuesto_id, producto_id, descripcion, cantidad, precio_unitario_centavos
            ) VALUES (?1, ?2, ?3, ?4, ?5)"
        ).map_err(|e| e.to_string())?;

        for item in items {
            stmt.execute((
                presupuesto_id,
                &item.producto_id,
                &item.descripcion,
                item.cantidad,
                item.precio_unitario_centavos,
            )).map_err(|e| e.to_string())?;
        }
    }
    
    tx.commit().map_err(|e| e.to_string())?;
    Ok(presupuesto_id)
}

#[tauri::command]
fn export_db(dest_path: String, state: State<'_, AppState>) -> Result<(), String> {
    let conn = state.conn.lock().unwrap();
    conn.backup(rusqlite::DatabaseName::Main, dest_path, None).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn import_db(src_path: String, app_handle: tauri::AppHandle, state: State<'_, AppState>) -> Result<(), String> {
    let mut conn = state.conn.lock().unwrap();
    
    // Validate that the source file is a valid SQLite database
    let test_conn = rusqlite::Connection::open(&src_path).map_err(|e| format!("El archivo no es una base de datos válida: {}", e))?;
    test_conn.execute("SELECT count(*) FROM sqlite_master", []).map_err(|e| format!("El archivo no tiene el formato correcto: {}", e))?;
    drop(test_conn);

    let app_dir = app_handle.path().app_data_dir().expect("Failed to get app data directory");
    let db_path = app_dir.join("techno-fuegos.db");

    // Replace current connection with an in-memory one to release the file lock on Windows
    let temp_conn = rusqlite::Connection::open_in_memory().map_err(|e| e.to_string())?;
    let old_conn = std::mem::replace(&mut *conn, temp_conn);
    drop(old_conn);

    // Overwrite the database file
    std::fs::copy(&src_path, &db_path).map_err(|e| format!("Error al copiar el archivo: {}", e))?;

    // Reinitialize the connection with the new file
    let new_conn = crate::db::init_db(&app_handle).map_err(|e| format!("Error al reconectar la base de datos: {}", e))?;
    *conn = new_conn;

    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .setup(|app| {
            let conn = db::init_db(app.handle()).expect("Failed to initialize database");
            app.manage(AppState {
                conn: Mutex::new(conn),
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_configuracion,
            get_empleados,
            get_insumos,
            get_productos,
            get_presupuestos,
            get_presupuesto_detalles,
            save_presupuesto,
            delete_presupuesto,
            rename_plantilla,
            save_empleado,
            toggle_empleado_activo,
            export_db,
            import_db
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
