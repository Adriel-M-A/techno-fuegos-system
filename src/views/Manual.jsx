import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { PageHeader, TabBar } from '../components/ui'

// Cargar el contenido en crudo de los archivos markdown correspondientes
import mdIntroduccion from '../manual/introduccion.md?raw'
import mdCreacion from '../manual/creacion.md?raw'
import mdCostos from '../manual/costos.md?raw'
import mdSoporte from '../manual/soporte.md?raw'

// Listado de pestañas del manual de ayuda
const TABS = [
  { id: 'introduccion', label: 'Introducción' },
  { id: 'creacion', label: 'Creador de Presupuestos' },
  { id: 'costos', label: 'Costos y Materiales' },
  { id: 'soporte', label: 'Seguridad y Copias' },
]

/**
 * Vista Manual
 * Renderiza el manual técnico del usuario administrativo segmentado por pestañas.
 */
export default function Manual() {
  const [activeTab, setActiveTab] = useState('introduccion')

  // Retornar el archivo markdown correspondiente según la pestaña activa
  const getMarkdownContent = () => {
    switch (activeTab) {
      case 'introduccion':
        return mdIntroduccion
      case 'creacion':
        return mdCreacion
      case 'costos':
        return mdCostos
      case 'soporte':
        return mdSoporte
      default:
        return mdIntroduccion
    }
  }

  return (
    <div className="p-6 flex flex-col gap-4">
      {/* Encabezado superior estructurado */}
      <PageHeader
        title="Manual de Ayuda"
        subtitle="Guía técnica interactiva y soporte para el usuario administrativo"
      />

      {/* Selector de pestañas con estética industrial */}
      <TabBar tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

      {/* Contenedor del manual con bordes de 0px y sin sombras */}
      <div className="p-6 bg-surface-container-lowest border border-outline-variant rounded-none">
        <article className="markdown-body">
          <ReactMarkdown>{getMarkdownContent()}</ReactMarkdown>
        </article>
      </div>
    </div>
  )
}
