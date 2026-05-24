import { useState } from 'react'
import { Button, Card, Divider } from '../../components/ui'
import { Plus } from 'lucide-react'
import InsumosTable from '../../components/InsumosTable'

// Insumos mock de base con materiales típicos de herrería
const MOCK_INSUMOS = [
  { id: '1', material: 'Chapa de hierro dulce (1.2mm)', unidad: 'kilo', costo: 1450.00 },
  { id: '2', material: 'Caño estructural 40x40x1.6mm', unidad: 'metro', costo: 2800.00 },
  { id: '3', material: 'Pintura antióxido negro', unidad: 'litro', costo: 5400.00 },
  { id: '4', material: 'Electrodo punta azul 2.5mm', unidad: 'cantidad', costo: 85.00 },
]

/**
 * SubvistaInsumos
 * Administra y renderiza la lista editable de materiales base e insumos.
 */
export default function SubvistaInsumos() {
  const [insumos, setInsumos] = useState(MOCK_INSUMOS)

  // Agregar una nueva fila de insumo vacía
  const handleAddRow = () => {
    setInsumos((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        material: '',
        unidad: 'metro',
        costo: 0,
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

  // Simular el guardado de materiales en consola
  const handleSave = () => {
    console.log('Insumos guardados en memoria del componente:', insumos)
  }

  return (
    <div className="flex flex-col gap-6">
      <Card
        title="Costos Unitarios de Materiales"
        headerActions={
          <Button
            variant="secondary"
            size="sm"
            onClick={handleAddRow}
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
        <Divider className="my-4" />
        <div className="flex justify-end">
          <Button variant="primary" onClick={handleSave}>
            Guardar Materiales
          </Button>
        </div>
      </Card>
      <Card title="Productos Base (Recetas)">
        <p className="body-md text-on-surface-variant">
          El ABM de productos estándar se implementará en la próxima iteración.
        </p>
      </Card>
    </div>
  )
}
