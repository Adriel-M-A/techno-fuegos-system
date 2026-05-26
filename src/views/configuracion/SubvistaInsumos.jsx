import { useState } from 'react'
import { Button, Card, ConfirmationModal } from '../../components/ui'
import { Plus } from 'lucide-react'
import { InsumosTable, TableFooterActions } from '../../components/table'
import { MOCK_INSUMOS } from '../../data'

/**
 * SubvistaInsumos
 * Administra y renderiza la lista editable de materiales base e insumos.
 * Los datos provienen del mock centralizado MOCK_INSUMOS (src/data/insumos.js).
 * Todos los costos operan con costo_centavos (INTEGER) — SAFE MONEY.
 */
export default function SubvistaInsumos() {
  // Carga inicial desde el mock centralizado (en prod: se reemplaza por invoke('listar_insumos'))
  const [insumos, setInsumos] = useState(MOCK_INSUMOS)
  const [insumosGuardados, setInsumosGuardados] = useState(MOCK_INSUMOS)

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

  // Agregar una nueva fila de insumo vacía con costo_centavos = 0
  const handleAddRow = () => {
    setInsumos((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        material: '',
        unidad: 'metro',
        costo_centavos: 0,          // SAFE MONEY: centavos enteros
      },
    ])
  }

  // Modificar un campo específico de una fila por su ID
  const handleFieldChange = (id, field, value) => {
    setInsumos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    )
  }

  // Eliminar un insumo de la lista
  const handleDeleteRow = (id) => {
    setInsumos((prev) => prev.filter((item) => item.id !== id))
  }

  // Guardar los materiales en memoria (en prod: se reemplaza por invoke('guardar_insumos'))
  const handleSave = () => {
    showConfirm({
      title: 'Guardar Materiales',
      message: '¿Deseas guardar los costos de insumos y materiales actuales? Estos se aplicarán en todos los nuevos presupuestos creados.',
      variant: 'success',
      confirmText: 'Guardar',
      onConfirm: () => {
        setInsumosGuardados(insumos)
      }
    })
  }

  // Descartar cambios y revertir al último estado guardado
  const handleDiscard = () => {
    showConfirm({
      title: 'Descartar Cambios',
      message: '¿Estás seguro de que deseas revertir todos los cambios realizados? Se perderán las modificaciones no guardadas.',
      variant: 'warning',
      confirmText: 'Descartar',
      onConfirm: () => {
        setInsumos(insumosGuardados)
      }
    })
  }

  const hasChanges = JSON.stringify(insumos) !== JSON.stringify(insumosGuardados)

  // Deshabilitar "Añadir Fila" si la última fila tiene el campo material vacío
  const isLastRowEmpty = insumos.length > 0 && insumos[insumos.length - 1].material.trim() === ''

  return (
    <div className="flex flex-col gap-6">
      <Card
        title="Costos Unitarios de Materiales"
        headerActions={
          <Button
            variant="secondary"
            size="sm"
            onClick={handleAddRow}
            disabled={isLastRowEmpty}
            className="flex items-center gap-1.5 cursor-pointer"
          >
            <Plus size={16} />
            Añadir Fila
          </Button>
        }
      >
        <div className="overflow-x-auto">
          <InsumosTable
            rows={insumos}
            onFieldChange={handleFieldChange}
            onDeleteRow={handleDeleteRow}
          />
        </div>

        {/* Acciones globales al pie de la tabla */}
        <TableFooterActions
          onSave={handleSave}
          onCancel={hasChanges ? handleDiscard : null}
          saveLabel="Guardar Materiales"
          cancelLabel="Descartar Cambios"
          isSaveDisabled={!hasChanges}
        />
      </Card>

      <Card title="Productos Base (Recetas)">
        <p className="body-md text-on-surface-variant">
          El ABM de productos estándar se implementará en la próxima iteración.
        </p>
      </Card>

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
