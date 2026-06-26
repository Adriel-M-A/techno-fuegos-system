import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Trash2, Pencil, X, Save } from 'lucide-react'
import { Button, Card, ConfirmationModal, Input } from '../../components/ui'
import DataTable from '../../components/table/DataTable'
import TableActionButton from '../../components/table/TableActionButton'
import TablePagination from '../../components/table/TablePagination'
import { formatARS } from '../../utils/currencyFormatters'
import useDataStore from '../../stores/dataStore'

/**
 * SubvistaPlantillas
 * Administra y renderiza la lista de plantillas de presupuesto guardadas (modelos maestros).
 * Sigue de forma estricta el Patrón B: tabla de solo lectura, modal para edición de nombre,
 * confirmación para eliminación y paginación industrial de 20 en 20.
 */
export default function SubvistaPlantillas() {
  const { presupuestos, reloadPresupuestos } = useDataStore()
  const plantillas = presupuestos.filter(p => p.es_plantilla === 1)

  // Estados de paginación
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 20

  // Estado del modal de edición de nombre
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [activePlantilla, setActivePlantilla] = useState(null)
  const [nuevoNombre, setNuevoNombre] = useState('')

  // Estados para modal de confirmación de borrado
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)

  // Columnas estructuradas de solo lectura para la grilla
  const columns = [
    { key: 'nombre', label: 'NOMBRE DEL MODELO' },
    { key: 'materiales', label: 'MATERIALES / ÍTEMS', align: 'center' },
    { key: 'costo_total', label: 'COSTO ESTIMADO ($)', align: 'right' },
    { key: 'acciones', label: 'ACCIONES', align: 'right' },
  ]

  // Función para calcular el costo total acumulado en centavos enteros (SAFE MONEY)
  const calcularCostoTotalCentavos = (items = []) => {
    return items.reduce((acc, it) => acc + (it.unit_price_centavos || 0) * (it.quantity || 0), 0)
  }

  // Abrir modal para editar nombre
  const handleOpenEdit = (plantilla) => {
    setActivePlantilla(plantilla)
    setNuevoNombre(plantilla.nombre)
    setIsEditOpen(true)
  }

  // Confirmar cambio de nombre en el modal
  const handleSaveNombre = async () => {
    if (!nuevoNombre.trim() || !activePlantilla) return

    try {
      const { invoke } = await import('@tauri-apps/api/core')
      await invoke('rename_plantilla', { 
        id: activePlantilla.id, 
        newName: nuevoNombre.trim() 
      })
      await reloadPresupuestos()
    } catch (e) {
      console.error("Error al renombrar plantilla", e)
    }

    setIsEditOpen(false)
    setActivePlantilla(null)
  }

  // Eliminar una plantilla tras confirmación
  const handleDelete = async (id) => {
    try {
      const { invoke } = await import('@tauri-apps/api/core')
      await invoke('delete_presupuesto', { id })
      await reloadPresupuestos()
    } catch (e) {
      console.error("Error al eliminar plantilla", e)
    }

    setConfirmDeleteId(null)

    // Ajustar paginación si se queda vacía la página activa
    const newTotalItems = plantillas.length - 1
    const newTotalPages = Math.ceil(newTotalItems / ITEMS_PER_PAGE) || 1
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages)
    }
  }

  // --- Cálculos de paginación ---
  const totalItems = plantillas.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1
  const validPage = Math.min(currentPage, totalPages)
  const showingStart = totalItems === 0 ? 0 : (validPage - 1) * ITEMS_PER_PAGE + 1
  const showingEnd = Math.min(validPage * ITEMS_PER_PAGE, totalItems)

  // Array paginado rebanado
  const plantillasPaginadas = plantillas.slice((validPage - 1) * ITEMS_PER_PAGE, validPage * ITEMS_PER_PAGE)

  // Mapear filas legibles
  const dataTableRows = plantillasPaginadas.map((row) => {
    const itemsCount = row.items ? row.items.length : 0
    const costoTotalCentavos = calcularCostoTotalCentavos(row.items) + (row.mano_de_obra_centavos || 0)

    return {
      id: row.id,
      nombre: (
        <span className="font-semibold text-on-surface select-text">
          {row.nombre_plantilla}
        </span>
      ),
      materiales: (
        <span className="text-xs font-semibold px-2.5 py-1 bg-surface-container/60 border border-outline-variant/60 rounded-full select-none text-on-surface-variant font-mono">
          {itemsCount} {itemsCount === 1 ? 'ítem' : 'ítems'}
        </span>
      ),
      costo_total: (
        <span className="font-mono font-bold text-on-surface">
          {formatARS(costoTotalCentavos)}
        </span>
      ),
      acciones: (
        <div className="flex items-center justify-end gap-2">
          <TableActionButton
            icon={Pencil}
            title="Modificar nombre"
            variant="primary"
            onClick={() => handleOpenEdit({ id: row.id, nombre: row.nombre_plantilla })}
          />
          <TableActionButton
            icon={Trash2}
            title="Eliminar plantilla"
            variant="danger"
            onClick={() => setConfirmDeleteId(row.id)}
          />
        </div>
      ),
    }
  })

  return (
    <div className="flex flex-col gap-6">
      <Card title="Plantillas Guardadas (Modelos Base)">
        <div className="overflow-x-auto">
          <DataTable
            columns={columns}
            rows={dataTableRows}
            emptyMessage="No hay plantillas registradas. Podés guardar configuraciones frecuentes como plantilla desde el Creador de Presupuestos."
          />
        </div>

        {/* Paginador local */}
        {totalItems > 0 && (
          <TablePagination
            currentPage={validPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={totalItems}
            showingStart={showingStart}
            showingEnd={showingEnd}
            itemType="plantillas"
          />
        )}
      </Card>

      {/* Modal para Modificar Nombre (Formulario aislado industrial) */}
      {isEditOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-transparent" onClick={() => setIsEditOpen(false)} />

          {/* Caja del Modal */}
          <div className="relative w-[448px] max-w-full bg-surface-container-lowest rounded-md shadow-raised border border-outline-variant flex flex-col overflow-hidden">
            {/* Cabecera */}
            <div className="flex items-center justify-between px-4 py-3 bg-surface-container-low/80 border-b border-outline-variant/60">
              <span className="label-lg text-on-surface uppercase tracking-wider font-bold">
                Modificar Nombre de Plantilla
              </span>
              <button
                onClick={() => setIsEditOpen(false)}
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-sm hover:bg-surface-container transition-colors duration-150 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Formulario */}
            <div className="p-6 bg-surface-container-lowest">
              <Input
                label="Nombre del Modelo"
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
                maxLength={80}
                required
                className="w-full"
                placeholder="Ej. Rejas de Seguridad Pesadas"
              />
            </div>

            {/* Divisor */}
            <div className="h-px bg-outline-variant/60" />

            {/* Pie de Página */}
            <div className="px-6 py-4 bg-surface-container-low/20 flex items-center justify-end gap-3">
              <Button variant="secondary" onClick={() => setIsEditOpen(false)}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                onClick={handleSaveNombre}
                disabled={!nuevoNombre.trim()}
                className="flex items-center gap-1.5"
              >
                <Save size={15} />
                Guardar Nombre
              </Button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Modal de confirmación de borrado */}
      <ConfirmationModal
        isOpen={confirmDeleteId !== null}
        title="Eliminar plantilla"
        message="¿Estás seguro de que deseas eliminar este modelo de presupuesto? Esta acción es irreversible y ya no estará disponible en el selector de la cabecera."
        variant="danger"
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={() => handleDelete(confirmDeleteId)}
        onCancel={() => setConfirmDeleteId(null)}
      />
    </div>
  )
}
