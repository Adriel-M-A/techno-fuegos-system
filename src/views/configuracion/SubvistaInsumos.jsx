import { useState } from 'react'
import { Button, Card, ConfirmationModal, InsumoFormModal, Input, Select } from '../../components/ui'
import { Plus, Search } from 'lucide-react'
import { InsumosTable } from '../../components/table'
import TablePagination from '../../components/table/TablePagination'
import { MOCK_INSUMOS } from '../../data'
import { CATEGORIAS_INSUMOS } from '../../components/ui/InsumoFormModal'

/**
 * SubvistaInsumos
 * Administra y renderiza la lista de materiales base e insumos.
 * Flujo moderno basado en modales para alta y edición, con filtrado en tiempo real y paginación de 20 en 20.
 * Todos los costos operan con costo_centavos (INTEGER) — SAFE MONEY.
 */
export default function SubvistaInsumos() {
  // Carga inicial de insumos desde el mock centralizado
  const [insumos, setInsumos] = useState(MOCK_INSUMOS)

  // Estados de filtrado reactivo
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  // Estados de paginación
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 20

  // Estados del modal de formulario
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [activeInsumo, setActiveInsumo] = useState(null)

  // Estados para diálogos de confirmación global
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    variant: 'info',
    confirmText: 'Confirmar',
    onConfirm: () => {},
  })

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

  const handleCloseModal = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }))
  }

  // --- Lógica del modal de formulario ---

  // Abrir modal en modo "Creación"
  const handleOpenCreateModal = () => {
    setActiveInsumo(null)
    setIsFormOpen(true)
  }

  // Abrir modal en modo "Edición" al recibir la fila
  const handleOpenEditModal = (insumo) => {
    setActiveInsumo(insumo)
    setIsFormOpen(true)
  }

  // Confirmar y guardar el insumo (creación o edición)
  const handleSaveInsumo = (insumoData) => {
    if (activeInsumo) {
      // Modo Edición: mapear y actualizar
      setInsumos(prev => prev.map(item => item.id === insumoData.id ? insumoData : item))
    } else {
      // Modo Creación: insertar al principio, limpiar filtros para verlo, y redirigir a la página 1
      setInsumos(prev => [insumoData, ...prev])
      setSearchQuery('')
      setSelectedCategory('')
      setCurrentPage(1)
    }
    setIsFormOpen(false)
    setActiveInsumo(null)
  }

  // Eliminar un insumo de la lista local
  const handleDeleteRow = (id) => {
    setInsumos(prev => prev.filter(item => item.id !== id))
    
    // Si la página se queda vacía después de eliminar, retroceder una página
    const newTotalItems = insumos.length - 1
    const newTotalPages = Math.ceil(newTotalItems / ITEMS_PER_PAGE) || 1
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages)
    }
  }

  // --- Filtrado en memoria (Reactivo e instantáneo) ---
  const insumosFiltrados = insumos.filter(item => {
    const matchesSearch = item.material.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || item.categoria === selectedCategory
    return matchesSearch && matchesCategory
  })

  // --- Cálculos de paginación ---
  const totalItems = insumosFiltrados.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1

  // Asegurar que la página actual esté en rango
  const validPage = Math.min(currentPage, totalPages)
  const showingStart = totalItems === 0 ? 0 : (validPage - 1) * ITEMS_PER_PAGE + 1
  const showingEnd = Math.min(validPage * ITEMS_PER_PAGE, totalItems)

  // Array rebanado para mostrar en la grilla
  const insumosPaginados = insumosFiltrados.slice((validPage - 1) * ITEMS_PER_PAGE, validPage * ITEMS_PER_PAGE)

  return (
    <div className="flex flex-col gap-6">
      <Card
        title="Costos Unitarios de Materiales"
        headerActions={
          <Button
            variant="secondary"
            size="sm"
            onClick={handleOpenCreateModal}
            className="flex items-center gap-1.5 cursor-pointer"
          >
            <Plus size={16} />
            Añadir Insumo
          </Button>
        }
      >
        {/* Barra de Filtros y Búsqueda (Modern Industrial / Fluent) */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4 p-3 bg-surface-container-low/40 border border-outline-variant/40 rounded-sm">
          {/* Input de búsqueda por texto */}
          <div className="flex-1 relative">
            <Input
              placeholder="Buscar material o insumo..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full"
            />
          </div>

          {/* Selector de categorías */}
          <div className="w-full sm:w-64">
            <Select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full"
            >
              <option value="">Todas las categorías</option>
              {CATEGORIAS_INSUMOS.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </Select>
          </div>
        </div>

        {/* Grilla interactiva */}
        <div className="overflow-x-auto">
          <InsumosTable
            rows={insumosPaginados}
            onEditRow={handleOpenEditModal}
            onDeleteRow={handleDeleteRow}
          />
        </div>

        {/* Paginación integrada descriptiva */}
        {totalItems > 0 && (
          <TablePagination
            currentPage={validPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={totalItems}
            showingStart={showingStart}
            showingEnd={showingEnd}
            itemType="insumos"
          />
        )}
      </Card>

      <Card title="Productos Base (Recetas)">
        <p className="body-md text-on-surface-variant">
          El ABM de productos estándar se implementará en la próxima iteración.
        </p>
      </Card>

      {/* Modal interactivo de formulario de insumo */}
      <InsumoFormModal
        isOpen={isFormOpen}
        insumo={activeInsumo}
        onSave={handleSaveInsumo}
        onClose={() => {
          setIsFormOpen(false)
          setActiveInsumo(null)
        }}
      />

      {/* Modal de confirmación global para insumos */}
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        variant={modalConfig.variant}
        confirmText={modalConfig.confirmText}
        onConfirm={modalConfig.onConfirm}
        onCancel={handleCloseModal}
      />
    </div>
  )
}
