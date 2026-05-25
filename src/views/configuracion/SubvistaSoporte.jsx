import { Button } from '../../components/ui'
import { Info, HardDrive, Download, Upload, AlertTriangle, History, Database, ShieldCheck } from 'lucide-react'

/**
 * SubvistaSoporte
 * Renderiza el panel de seguridad de base de datos, copias de seguridad de respaldo e integridad del sistema.
 */
export default function SubvistaSoporte() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {/* Título de Sección */}
        <h2 className="headline-sm text-on-surface font-semibold tracking-tight">
          Seguridad y Base de Datos
        </h2>

        {/* Banner Informativo Superior */}
        <div
          className="flex gap-4 p-4 border border-outline-variant rounded-none items-start bg-primary/5"
        >
          <Info className="text-primary-container shrink-0 mt-0.5" size={18} />
          <p className="body-md text-on-surface-variant leading-relaxed">
            Gestione el motor de persistencia del sistema. Las operaciones de exportación e importación realizan migraciones bit-a-bit a través del bus de comunicación <strong className="font-bold text-on-surface">Tauri IPC</strong>. Este proceso garantiza la integridad referencial y la atomicidad de los datos industriales.
          </p>
        </div>
      </div>

      {/* Grid de dos columnas para las tarjetas simétricas */}
      <div className="grid grid-cols-2 gap-6">

        {/* Card Backup Externo */}
        <div className="border border-outline-variant bg-surface-container-lowest rounded-none flex flex-col">
          {/* Header de Card */}
          <div className="px-5 py-3 border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
            <span className="label-md text-on-surface-variant tracking-wider font-semibold uppercase">
              Backup Externo
            </span>
            <HardDrive className="text-on-surface-variant shrink-0" size={16} />
          </div>
          {/* Body de Card */}
          <div className="p-6 flex flex-col gap-4 flex-1 justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-on-surface leading-snug">
                Exportar Copia de Seguridad
              </h3>
              <p className="body-md text-on-surface-variant leading-relaxed">
                Crea una instantánea completa de la base de datos actual. El archivo resultante contiene todas las recetas, configuraciones de materiales y registros históricos.
              </p>
            </div>

            {/* Caja de Ruta Técnica */}
            <div className="bg-surface-container border border-outline-variant p-3 rounded-none flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
                Ruta de origen técnica:
              </span>
              <span className="font-mono text-xs text-on-surface select-all break-all leading-relaxed">
                %APPDATA%/techno-fuegos-system/techno-fuegos.db
              </span>
            </div>

            {/* Botón de Acción */}
            <Button variant="primary" className="w-full justify-center gap-2 cursor-pointer py-2">
              <Download size={16} />
              DESCARGAR ARCHIVO .DB
            </Button>
          </div>
        </div>

        {/* Card Restauración */}
        <div className="border border-outline-variant bg-surface-container-lowest rounded-none flex flex-col">
          {/* Header de Card */}
          <div className="px-5 py-3 border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
            <span className="label-md text-on-surface-variant tracking-wider font-semibold uppercase">
              Restauración de Sistema
            </span>
            <Upload className="text-on-surface-variant shrink-0" size={16} />
          </div>
          {/* Body de Card */}
          <div className="p-6 flex flex-col gap-4 flex-1 justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-on-surface leading-snug">
                Importar Copia de Seguridad
              </h3>
              <p className="body-md text-on-surface-variant leading-relaxed">
                Carga un archivo de base de datos previo. El sistema validará la estructura de esquemas antes de proceder al reemplazo físico del archivo local.
              </p>
            </div>

            {/* Banner de Advertencia */}
            <div
              className="border border-error bg-error/5 p-3 rounded-none flex gap-3 items-start"
            >
              <AlertTriangle className="text-error shrink-0 mt-0.5" size={16} />
              <p className="text-[11px] font-bold text-error uppercase leading-tight tracking-wide">
                ADVERTENCIA: Esta acción reemplazará permanentemente los datos actuales y forzará un reinicio de la aplicación.
              </p>
            </div>

            {/* Botón de Acción */}
            <Button variant="secondary" className="w-full justify-center gap-2 cursor-pointer py-2 border border-outline-variant">
              <History size={16} />
              SELECCIONAR ARCHIVO
            </Button>
          </div>
        </div>

      </div>

      {/* Fila Inferior de Metadatos */}
      <div className="grid grid-cols-3 gap-6 pt-6 border-t border-outline-variant mt-2">
        {/* Columna 1: Último Backup */}
        <div className="flex items-center gap-3">
          <History className="text-on-surface-variant" size={20} />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
              Último Backup
            </span>
            <span className="mono-data text-[13px] text-on-surface font-semibold mt-0.5">
              12 Oct 2023 - 09:45 AM
            </span>
          </div>
        </div>

        {/* Columna 2: Tamaño de DB */}
        <div className="flex items-center gap-3">
          <Database className="text-on-surface-variant" size={20} />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
              Tamaño de DB
            </span>
            <span className="mono-data text-[13px] text-on-surface font-semibold mt-0.5">
              24.8 MB
            </span>
          </div>
        </div>

        {/* Columna 3: Estado de Integridad */}
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-success" size={20} />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
              Estado de Integridad
            </span>
            <span className="mono-data text-[13px] text-success font-bold mt-0.5">
              Verificado y Óptimo
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
