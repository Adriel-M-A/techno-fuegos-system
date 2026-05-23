import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { PageHeader } from '../components/ui'

// Cargar el contenido en crudo de los archivos markdown correspondientes
import mdIntroduccion from '../manual/introduccion.md?raw'
import mdCreacion from '../manual/creacion.md?raw'
import mdCostos from '../manual/costos.md?raw'
import mdSoporte from '../manual/soporte.md?raw'

// Listado de pestañas del manual de ayuda
const TABS = [
  { id: 'introduccion', label: 'Introducción' },
  { id: 'creacion',     label: 'Creador de Presupuestos' },
  { id: 'costos',       label: 'Costos y Materiales' },
  { id: 'soporte',      label: 'Seguridad y Copias' },
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
    <div className="p-6 flex flex-col gap-6">
      {/* Encabezado superior estructurado */}
      <PageHeader
        title="Manual de Ayuda"
        subtitle="Guía técnica interactiva y soporte para el usuario administrativo"
      />

      {/* Selector de pestañas con estética industrial */}
      <div className="flex items-center border-b border-outline-variant">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-4 py-2.5 label-lg text-sm transition-colors duration-150
                border-b-2 -mb-px cursor-pointer
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

      {/* Contenedor del manual con bordes de 0px y sin sombras */}
      <div className="p-6 bg-surface-container-lowest border border-outline-variant rounded-none">
        <article className="markdown-body">
          <ReactMarkdown>{getMarkdownContent()}</ReactMarkdown>
        </article>
      </div>
    </div>
  )
}
