# Manual de Usuario - Techno Fuegos System

## Introducción
Este sistema fue diseñado para agilizar la creación de presupuestos comerciales de productos de herrería artesanal sin necesidad de interrumpir las tareas del taller de producción.

## 1. Cómo Crear un Presupuesto
1. Navega a la sección **Creador de Presupuestos** desde la barra lateral.
2. Completa los datos del cliente. La **Localidad** es fundamental para prever los costos de flete de piezas pesadas.
3. Especifica brevemente el propósito global de la cotización en el campo **Descripción General** en la parte superior de la sección de ítems (ej. *"Cotización de materiales para estructura base de quincho"*).
4. Selecciona un producto base (ej. Fogonero 80cm) en la tabla. El sistema cargará automáticamente los costos estándar de materiales y mano de obra.
5. Si el cliente requiere modificaciones a medida (herrajes extras, mayor grosor de chapa, dimensiones especiales), añade estos valores en la sección de **Personalización**. El sistema recalculará el total en tiempo real.
6. Haz clic en **Exportar PDF** para seleccionar la carpeta de tu computadora donde deseas guardar la cotización. El documento se generará en una estética monocromática clásica en blanco y negro, estructurada con un desglose técnico riguroso de materiales crudos y mano de obra para taller.

## 2. Actualización de Costos (Solo Producción)
Cuando los precios del hierro o el valor de la hora de trabajo cambien:
1. Dirígete a la sección **Gestor de Costos**.
2. Modifica los valores base en la tabla de insumos.
3. Guarda los cambios. A partir de ese momento, todos los nuevos presupuestos se calcularán con los precios actualizados automáticamente.

*Nota: Los presupuestos emitidos con anterioridad mantendrán sus valores históricos y su fecha de vencimiento original.*

## 3. Soporte, Mantenimiento y Seguridad (Administración)
Para garantizar la integridad técnica y la seguridad de la información ante fallos o cambios de hardware, dispones de herramientas nativas de base de datos en la pestaña **Soporte y Mantenimiento** dentro de la sección de **Configuración** en la barra lateral:
1. **Exportar Copia de Seguridad:** Abre un diálogo nativo en tu computadora. Copia bit a bit el archivo local activo `.db` desde la carpeta protegida de la aplicación `%APPDATA%/techno-fuegos-system/` hacia una unidad extraíble externa (como un pendrive). Es recomendable realizar este proceso semanalmente.
2. **Importar Copia de Seguridad:** Permite recuperar tu historial completo ante fallos de disco o cambios de computadora. Al seleccionar una copia externa válida, el sistema analiza su estructura, reemplaza los datos locales en `%APPDATA%` y fuerza el reinicio del programa para refrescar y cargar el nuevo estado de datos al instante de forma segura.

## 4. Manual de Ayuda Offline
Toda esta documentación técnica offline se encuentra embebida directamente dentro del propio software y está siempre accesible haciendo clic en el botón **Manual de Ayuda** de la barra lateral (icono Lucide `LifeBuoy`). Puedes visualizar estas instrucciones y guías en cualquier momento sin depender de una conexión a Internet.