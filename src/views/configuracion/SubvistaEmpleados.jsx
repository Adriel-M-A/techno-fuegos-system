import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Plus, Search, Edit2, ShieldAlert, Check, X, Save } from 'lucide-react'
import { Button, Card, ConfirmationModal, Input } from '../../components/ui'
import { DataTable, TableActionButton, TablePagination } from '../../components/table'
import useDataStore from '../../stores/dataStore'
import { invoke } from '@tauri-apps/api/core'

/**
 * SubvistaEmpleados
 * Administra y renderiza el listado de empleados / vendedores.
 * Flujo moderno basado en modales para alta y edición, con filtrado reactivo
 * y baja lógica (activo: 0) para mantener la integridad en presupuestos históricos.
 */
export default function SubvistaEmpleados() {
  const { empleados, updateEmpleadoLocal, toggleEmpleadoActivoLocal } = useDataStore()

  // Estados de filtrado reactivo
  const [searchQuery, setSearchQuery] = useState('')

  // Estados de paginación (bloques de 10 en 10)
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 10

  // Estados del modal de formulario
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [activeEmpleado, setActiveEmpleado] = useState(null) // null es creación, o el objeto empleado para edición
  const [empleadoNombre, setEmpleadoNombre] = useState('')

  // Estados para diálogos de confirmación
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    variant: 'info',
    confirmText: 'Confirmar',
    onConfirm: () => {},
  })

  // Abrir modal en modo "Creación"
  const handleOpenCreate = () => {
    setActiveEmpleado(null)
    setEmpleadoNombre('')
    setIsFormOpen(true)
  }

  // Abrir modal en modo "Edición"
  const handleOpenEdit = (empleado) => {
    setActiveEmpleado(empleado)
    setEmpleadoNombre(empleado.nombre)
    setIsFormOpen(true)
  }

  // Guardar empleado (Creación o Edición)
  const handleSaveEmpleado = async () => {
    if (!empleadoNombre.trim()) return

    const id = activeEmpleado ? activeEmpleado.id : 0
    const activo = activeEmpleado ? activeEmpleado.activo : 1 // Por defecto activo = 1 para nuevos
    const empleadoData = { id, nombre: empleadoNombre.trim(), activo }

    try {
      // IPC a Rust para guardar en SQLite
      const savedId = await invoke('save_empleado', { empleado: empleadoData })
      
      // Actualizar Zustand local
      updateEmpleadoLocal({ ...empleadoData, id: savedId })
      
      setIsFormOpen(false)

      if (!activeEmpleado) {
        // En creación redireccionar a pág 1 y limpiar filtros para que se visualice
        setSearchQuery('')
        setCurrentPage(1)
      }
    } catch (error) {
      console.error('Error al guardar empleado:', error)
      showConfirm({
        title: 'Error',
        message: `No se pudo guardar el empleado. Error: ${error}`,
        variant: 'danger',
        confirmText: 'Aceptar',
        onConfirm: () => {}
      })
    }
  }

  // Cambiar estado activo/inactivo (Deshabilitación lógica)
  const handleToggleActivo = (empleado) => {
    const nuevoEstado = empleado.activo === 1 ? 0 : 1
    const accionTexto = nuevoEstado === 1 ? 'activar' : 'desactivar'
    
    showConfirm({
      title: `${nuevoEstado === 1 ? 'Activar' : 'Desactivar'} Empleado`,
      message: `¿Estás seguro de que deseas ${accionTexto} a "${empleado.nombre}"? Esto ${nuevoEstado === 0 ? 'evitará que aparezca en el selector del creador' : 'permitirá seleccionarlo nuevamente en nuevos presupuestos'}, pero preservará su nombre en el historial de presupuestos anteriores.`,
      variant: nuevoEstado === 1 ? 'success' : 'danger',
      confirmText: nuevoEstado === 1 ? 'Activar' : 'Desactivar',
      onConfirm: async () => {
        try {
          // IPC a Rust
          await invoke('toggle_empleado_activo', { id: empleado.id, activo: nuevoEstado })
          
          // Actualizar Zustand
          toggleEmpleadoActivoLocal(empleado.id, nuevoEstado)
        } catch (error) {
          console.error('Error al cambiar estado del empleado:', error)
        }
      }
    })
  }

  // Utilidad para abrir modales de confirmación
  const showConfirm = ({ title, message, variant, confirmText, onConfirm }) => {
    setModalConfig({
      isOpen: true,
      title,
      message,
      variant,
      confirmText,
      onConfirm: () => {
        onConfirm()
        setModalConfig(prev => ({ ...prev, isOpen: false }))
      }
    })
  }

  // Filtrado local reactivo
  const empleadosFiltrados = empleados.filter((e) => {
    const matchesSearch = e.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  // Paginación local
  const totalItems = empleadosFiltrados.length
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE))
  
  // Ajustar página activa si queda fuera del rango por filtrados
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [totalPages, currentPage])

  const showingStart = totalItems === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1
  const showingEnd = Math.min(currentPage * ITEMS_PER_PAGE, totalItems)
  const paginatedEmpleados = empleadosFiltrados.slice(showingStart - 1, showingEnd)

  // Mapeo de filas para DataTable
  const mappedRows = paginatedEmpleados.map((e) => ({
    id: e.id,
    nombre: (
      <span className="font-semibold text-on-surface">
        {e.nombre}
      </span>
    ),
    estado: (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full label-md uppercase tracking-wider ${
          e.activo === 1
            ? 'bg-success/12 text-success'
            : 'bg-outline-variant/30 text-on-surface-variant'
        }`}
      >
        <span
          className={`w-1.5 h-1.5 shrink-0 rounded-full ${
            e.activo === 1 ? 'bg-success' : 'bg-on-surface-variant/40'
          }`}
        />
        {e.activo === 1 ? 'Activo' : 'Inactivo'}
      </span>
    ),
    acciones: (
      <div className="flex justify-end gap-1.5">
        <TableActionButton
          icon={Edit2}
          title="Editar nombre"
          onClick={() => handleOpenEdit(e)}
        />
        <TableActionButton
          icon={e.activo === 1 ? X : Check}
          title={e.activo === 1 ? 'Desactivar empleado' : 'Activar empleado'}
          variant={e.activo === 1 ? 'danger' : 'default'}
          onClick={() => handleToggleActivo(e)}
        />
      </div>
    )
  }))

  const columns = [
    { key: 'nombre', label: 'Nombre del Empleado' },
    { key: 'estado', label: 'Estado' },
    { key: 'acciones', label: 'Acciones' }
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Caja de Filtros e Incorporación */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={16} />
          <Input
            placeholder="Buscar empleado..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-9 w-full"
          />
        </div>
        <Button onClick={handleOpenCreate} className="flex items-center gap-1.5 w-full sm:w-auto justify-center">
          <Plus size={16} />
          Agregar Empleado
        </Button>
      </div>

      {/* Grilla Principal */}
      <Card className="p-0 overflow-hidden">
        <DataTable
          columns={columns}
          rows={mappedRows}
          emptyMessage="No se encontraron empleados registrados."
        />
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={totalItems}
          showingStart={showingStart}
          showingEnd={showingEnd}
          itemType="empleados"
        />
      </Card>

      {/* Modal de Formulario (Portaled to body) */}
      {isFormOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="absolute inset-0 bg-transparent" onClick={() => setIsFormOpen(false)} />
          <div className="relative w-[400px] max-w-full bg-surface-container-lowest rounded-md shadow-raised border border-outline-variant flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-surface-container-low/80 border-b border-outline-variant/60">
              <span className="label-lg text-on-surface uppercase tracking-wider font-bold">
                {activeEmpleado ? 'Editar Empleado' : 'Nuevo Empleado'}
              </span>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-sm hover:bg-surface-container transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-6 bg-surface-container-lowest">
              <Input
                label="Nombre Completo"
                placeholder="Ej. Juan Pérez"
                value={empleadoNombre}
                onChange={(e) => setEmpleadoNombre(e.target.value)}
                maxLength={50}
                required
                className="w-full"
              />
            </div>
            <div className="h-px bg-outline-variant/60" />
            <div className="px-6 py-4 bg-surface-container-low/20 flex items-center justify-end gap-3">
              <Button variant="secondary" onClick={() => setIsFormOpen(false)}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                onClick={handleSaveEmpleado}
                disabled={!empleadoNombre.trim()}
                className="flex items-center gap-1.5"
              >
                <Save size={15} />
                Guardar
              </Button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Modal de Confirmación */}
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        variant={modalConfig.variant}
        confirmText={modalConfig.confirmText}
        onConfirm={modalConfig.onConfirm}
        onCancel={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  )
}
