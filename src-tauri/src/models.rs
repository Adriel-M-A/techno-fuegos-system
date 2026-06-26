use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ConfiguracionGeneral {
    pub nombre: String,
    pub telefono: String,
    pub direccion: String,
    pub email: String,
    pub instagram: String,
    pub web: String,
    pub validez_dias: i32,
    pub clausula_sena: String,
    pub clausula_inflacion: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Empleado {
    pub id: i32,
    pub nombre: String,
    pub activo: i32,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Insumo {
    pub id: i32,
    pub material: String,
    pub unidad: String,
    pub costo_centavos: i64,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Producto {
    pub id: i32,
    pub nombre: String,
    pub precio_centavos: i64,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Presupuesto {
    pub id: i32,
    pub es_plantilla: i32,
    pub nombre_plantilla: Option<String>,
    pub fecha_emision: Option<String>,
    pub cliente_nombre: Option<String>,
    pub cliente_telefono: Option<String>,
    pub cliente_email: Option<String>,
    pub cliente_localidad: Option<String>,
    pub descripcion_general: Option<String>,
    pub mano_de_obra_centavos: i64,
    pub total_centavos: i64,
    pub vendedor_id: Option<i32>,
    pub vendedor_nombre: Option<String>,
    pub observaciones: Option<String>,
    pub estado: Option<String>,
    pub items: Option<Vec<PresupuestoDetalle>>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct PresupuestoDetalle {
    pub id: Option<i32>,
    pub presupuesto_id: Option<i32>,
    pub producto_id: Option<String>,
    pub descripcion: String,
    pub cantidad: f64,
    pub precio_unitario_centavos: i64,
}
