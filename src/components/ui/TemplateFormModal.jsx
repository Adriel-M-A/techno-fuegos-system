import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, Save } from 'lucide-react'
import Button from './Button'
import Input from './Input'

/**
 * TemplateFormModal
 * Modal de formulario bloqueante y centrado para guardar un modelo de plantilla.
 * Diseñado bajo las estrictas pautas Fluent de Windows 11 de la app.
 */
export default function TemplateFormModal({
  isOpen,
  onSave,
  onClose,
}) {
  const [nombre, setNombre] = useState('')

  useEffect(() => {
    if (isOpen) {
      setNombre('')
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSave = () => {
    if (nombre.trim().length > 0) {
      onSave(nombre.trim())
    }
  }

  const isFormValid = nombre.trim().length > 0

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-transparent" 
        onClick={onClose}
      />
      
      {/* Contenedor del Modal */}
      <div 
        className="relative w-[448px] max-w-full bg-surface-container-lowest rounded-md shadow-raised border border-outline-variant flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Cabecera del modal */}
        <div className="flex items-center justify-between px-4 py-3 bg-surface-container-low/80 border-b border-outline-variant/60">
          <span className="label-lg text-on-surface uppercase tracking-wider font-bold">
            Guardar como Plantilla
          </span>
          <button 
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface p-1 rounded-sm hover:bg-surface-container transition-colors duration-150 cursor-pointer"
            title="Cerrar modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Cuerpo del formulario */}
        <div className="p-6 bg-surface-container-lowest">
          <p className="body-md text-on-surface-variant text-xs mb-4 leading-relaxed">
            Asigná un nombre claro y descriptivo a esta plantilla para que los operarios puedan identificarla de inmediato en la cabecera del creador.
          </p>
          <Input
            label="Nombre de la Plantilla"
            placeholder="Ej. Portón Levadizo 3x2m Reforzado"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            maxLength={80}
            showCounter={true}
            required
            className="w-full"
          />
        </div>

        {/* Divisor fino */}
        <div className="h-px bg-outline-variant/60" />

        {/* Pie del modal */}
        <div className="px-6 py-4 bg-surface-container-low/20 flex items-center justify-end gap-3">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!isFormValid}
            className="flex items-center gap-1.5"
          >
            <Save size={15} />
            Guardar Plantilla
          </Button>
        </div>
      </div>
    </div>,
    document.body
  )
}
