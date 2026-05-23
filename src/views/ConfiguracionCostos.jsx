import { useState } from 'react'
import { Button, Card, PageHeader, Input, Divider } from '../components/ui'
import { Plus } from 'lucide-react'
import InsumosTable from '../components/InsumosTable'

// Tabs de configuración según el PRD (Insumos, Empresa y PDF, Empleados)
const TABS = [
  { id: 'insumos',   label: 'Insumos y Recetas' },
  { id: 'empresa',   label: 'Empresa y PDF'      },
  { id: 'empleados', label: 'Empleados'           },
]

// Componente de tab bar para la vista de configuración
function TabBar({ activeTab, onChange }) {
  return (
    <div className="flex items-center border-b border-outline-variant">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              px-4 py-2.5 label-lg text-sm transition-colors duration-150
              border-b-2 -mb-px
              ${isActive
                ? 'border-primary-container text-primary-container font-semibold'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }
            `}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

// Insumos mock de base con materiales típicos de herrería
const MOCK_INSUMOS = [
  { id: '1', material: 'Chapa de hierro dulce (1.2mm)', unidad: 'kilo', costo: 1450.00 },
  { id: '2', material: 'Caño estructural 40x40x1.6mm', unidad: 'metro', costo: 2800.00 },
  { id: '3', material: 'Pintura antióxido negro', unidad: 'litro', costo: 5400.00 },
  { id: '4', material: 'Electrodo punta azul 2.5mm', unidad: 'cantidad', costo: 85.00 },
]

// Vista de Insumos y Recetas interactiva
function SubvistaInsumos() {
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
    <div className="flex flex-col gap-6 pt-4">
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

// Vista de datos de la Empresa y configuración del PDF
function SubvistaEmpresa() {
  return (
    <div className="flex flex-col gap-6 pt-4">
      <Card title="Datos de la Empresa">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Nombre de la empresa" placeholder="Techno Fuegos" />
          <Input label="Teléfono" placeholder="+54 911 0000 0000" type="tel" />
          <Input label="Dirección" placeholder="Pilar, Buenos Aires" />
          <Input label="Correo electrónico" placeholder="contacto@ejemplo.com" type="email" />
          <Input label="Instagram" placeholder="@technofuegos" />
          <Input label="Sitio web" placeholder="https://..." type="url" />
        </div>
        <Divider className="my-4" />
        <div className="flex justify-end">
          <Button variant="primary">Guardar Datos</Button>
        </div>
      </Card>
      <Card title="Parámetros del Presupuesto PDF">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Validez del presupuesto (días)" placeholder="30" type="number" />
          <div />
          <div className="col-span-2 flex flex-col gap-1">
            <label className="label-md text-on-surface-variant uppercase tracking-wide">Cláusula de Seña</label>
            <textarea
              className="w-full px-3 py-2 text-sm text-on-surface bg-surface-container-lowest border border-outline-variant rounded focus:outline-none focus:border-primary-container resize-none"
              rows={3}
              placeholder="Texto que aparecerá en el pie del presupuesto PDF..."
            />
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            <label className="label-md text-on-surface-variant uppercase tracking-wide">Cláusula de Inflación</label>
            <textarea
              className="w-full px-3 py-2 text-sm text-on-surface bg-surface-container-lowest border border-outline-variant rounded focus:outline-none focus:border-primary-container resize-none"
              rows={3}
              placeholder="Texto que aparecerá en el pie del presupuesto PDF..."
            />
          </div>
        </div>
        <Divider className="my-4" />
        <div className="flex justify-end">
          <Button variant="primary">Guardar Parámetros</Button>
        </div>
      </Card>
    </div>
  )
}

// Vista de gestión de empleados
function SubvistaEmpleados() {
  return (
    <div className="flex flex-col gap-6 pt-4">
      <Card title="Empleados y Vendedores">
        <p className="body-md text-on-surface-variant">
          El CRUD de empleados se implementará en la próxima iteración.
        </p>
      </Card>
    </div>
  )
}

// Vista principal de Configuración con tabs
export default function ConfiguracionCostos() {
  const [activeTab, setActiveTab] = useState('insumos')

  return (
    <div className="p-6 flex flex-col gap-4">
      <PageHeader
        title="Configuración"
        subtitle="Gestión de insumos, datos de empresa y empleados del sistema"
      />
      <TabBar activeTab={activeTab} onChange={setActiveTab} />
      {activeTab === 'insumos'   && <SubvistaInsumos />}
      {activeTab === 'empresa'   && <SubvistaEmpresa />}
      {activeTab === 'empleados' && <SubvistaEmpleados />}
    </div>
  )
}
