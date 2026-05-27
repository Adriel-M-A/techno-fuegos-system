import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, Save } from 'lucide-react'
import Button from './Button'
import Input from './Input'
import Select from './Select'
import { UNIDADES } from '../table/InsumosTable'

export const CATEGORIAS_INSUMOS = [
  { value: 'perfiles', label: 'Hierros/Perfiles' },
  { value: 'chapas', label: 'Chapas' },
  { value: 'soldadura', label: 'Soldadura/Consumibles' },
  { value: 'pintura', label: 'Pinturas/Químicos' },
  { value: 'accesorios', label: 'Accesorios/Herrajes' },
  { value: 'varios', label: 'Varios/Servicios' },
]

/**
 * InsumoFormModal
 * Modal de formulario interactivo y bloqueante para añadir y editar insumos.
 * Sigue estrictamente la estética industrial Fluent y el principio de Safe Money.
 */
export default function InsumoFormModal({
  isOpen,
  insumo,
  onSave,
  onClose,
}) {
  const [material, setMaterial] = useState('')
  const [categoria, setCategoria] = useState('perfiles')
  const [unidad, setUnidad] = useState('metro')
  const [costoPesosText, setCostoPesosText] = useState('')

  // Efecto para autopopular datos del insumo activo en modo edición o limpiar en creación
  useEffect(() => {
    if (isOpen) {
      if (insumo) {
        setMaterial(insumo.material || '')
        setCategoria(insumo.categoria || 'perfiles')
        setUnidad(insumo.unidad || 'metro')
        // Convertir centavos enteros a formato legible de pesos con coma
        const pesos = (insumo.costo_centavos || 0) / 100
        setCostoPesosText(pesos.toFixed(2).replace('.', ','))
      } else {
        setMaterial('')
        setCategoria('perfiles')
        setUnidad('metro')
        setCostoPesosText('')
      }
    }
  }, [isOpen, insumo])

  if (!isOpen) return null

  // Manejar el cambio del costo en formato de pesos con coma
  const handleCostoChange = (e) => {
    setCostoPesosText(e.target.value)
  }

  const handleSave = () => {
    // Validar nombre obligatorio
    if (!material.trim()) return

    // Convertir pesos con coma → centavos enteros para persistencia segura en SQLite
    const pesosFloat = parseFloat(costoPesosText.replace(',', '.'))
    const costoCentavos = !isNaN(pesosFloat) ? Math.round(pesosFloat * 100) : 0

    // Emitir el objeto completo
    onSave({
      id: insumo?.id || crypto.randomUUID(),
      material: material.trim(),
      categoria,
      unidad,
      costo_centavos: costoCentavos,
    })
  }

  const isFormValid = material.trim().length > 0

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-transparent" 
        onClick={onClose}
      />
      
      {/* Caja del Modal */}
      <div 
        className="relative w-[448px] max-w-full bg-surface-container-lowest rounded-md shadow-raised border border-outline-variant flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Cabecera */}
        <div className="flex items-center justify-between px-4 py-3 bg-surface-container-low/80 border-b border-outline-variant/60">
          <span className="label-lg text-on-surface uppercase tracking-wider font-bold">
            {insumo ? 'Editar Insumo / Material' : 'Nuevo Insumo / Material'}
          </span>
          <button 
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface p-1 rounded-sm hover:bg-surface-container transition-colors duration-150 cursor-pointer"
            title="Cerrar modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Formulario */}
        <div className="p-6 flex flex-col gap-4 bg-surface-container-lowest overflow-y-auto max-h-[75vh]">
          
          {/* Campo Material */}
          <Input
            label="Nombre del Insumo / Material"
            placeholder="Ej. Caño estructural 40x40x1.6mm"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            maxLength={100}
            showCounter={true}
            required
          />

          {/* Campo Categoría/Tipo */}
          <Select
            label="Categoría / Tipo"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            {CATEGORIAS_INSUMOS.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </Select>

          {/* Campo Unidad de Medida */}
          <Select
            label="Unidad de Medida"
            value={unidad}
            onChange={(e) => setUnidad(e.target.value)}
          >
            {UNIDADES.map((u) => (
              <option key={u.value} value={u.value}>{u.label}</option>
            ))}
          </Select>

          {/* Campo Costo Base ($) */}
          <Input
            label="Costo Unitario Base ($)"
            placeholder="0,00"
            value={costoPesosText}
            onChange={handleCostoChange}
            numericMode="decimal"
          />

        </div>

        {/* Divisor */}
        <div className="h-px bg-outline-variant/60" />

        {/* Pie de Página */}
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
            {insumo ? 'Actualizar Insumo' : 'Añadir Insumo'}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  )
}
