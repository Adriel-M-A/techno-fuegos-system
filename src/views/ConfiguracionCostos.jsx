import { useState } from 'react'
import { PageHeader, TabBar } from '../components/ui'
import SubvistaInsumos from './configuracion/SubvistaInsumos'
import SubvistaEmpresa from './configuracion/SubvistaEmpresa'
import SubvistaEmpleados from './configuracion/SubvistaEmpleados'
import SubvistaSoporte from './configuracion/SubvistaSoporte'

// Tabs de configuración según el PRD (Insumos, Empresa y PDF, Empleados, Soporte)
const TABS = [
  { id: 'insumos', label: 'Insumos y Recetas' },
  { id: 'empresa', label: 'Empresa y PDF' },
  { id: 'empleados', label: 'Empleados' },
  { id: 'soporte', label: 'Soporte y Mantenimiento' },
]

// Vista principal de Configuración con tabs modularizados
export default function ConfiguracionCostos() {
  const [activeTab, setActiveTab] = useState('insumos')

  return (
    <div className="p-6 flex flex-col gap-4">
      <PageHeader
        title="Configuración"
        subtitle="Gestión de insumos, datos de empresa y empleados del sistema"
      />
      <TabBar tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
      {activeTab === 'insumos' && <SubvistaInsumos />}
      {activeTab === 'empresa' && <SubvistaEmpresa />}
      {activeTab === 'empleados' && <SubvistaEmpleados />}
      {activeTab === 'soporte' && <SubvistaSoporte />}
    </div>
  )
}

