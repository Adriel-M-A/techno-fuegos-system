import { Plus, Minus } from 'lucide-react'

// Componente QuantityInput: control de número/cantidad Fluent con botones interactivos de incremento y decremento
export default function QuantityInput({
  value = 1,
  onChange,
  min = 1,
  max,
  disabled = false,
  className = '',
}) {
  const handleDecrement = () => {
    if (disabled) return
    const newVal = Math.max(min, value - 1)
    if (onChange) onChange(newVal)
  }

  const handleIncrement = () => {
    if (disabled) return
    const newVal = max !== undefined ? Math.min(max, value + 1) : value + 1
    if (onChange) onChange(newVal)
  }

  const handleInputChange = (e) => {
    // Sanitizar entrada no numérica y aplicar límites en caliente
    const cleaned = e.target.value.replace(/[^0-9]/g, '')
    if (cleaned === '') {
      if (onChange) onChange('')
      return
    }
    let val = parseInt(cleaned, 10)
    if (isNaN(val)) val = min
    if (min !== undefined && val < min) val = min
    if (max !== undefined && val > max) val = max
    if (onChange) onChange(val)
  }

  const handleBlur = () => {
    if (value === '' || isNaN(value)) {
      if (onChange) onChange(min)
    }
  }

  return (
    <div className={`inline-flex items-center bg-surface-container-lowest border border-outline-variant rounded-sm overflow-hidden h-8 ${className}`}>
      {/* Botón decremento */}
      <button
        type="button"
        disabled={disabled || (value !== '' && value <= min)}
        onClick={handleDecrement}
        className="px-2 h-full flex items-center justify-center hover:bg-primary-container/10 active:bg-primary-container/15 text-on-surface-variant disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer shrink-0"
        title="Reducir cantidad"
      >
        <Minus size={11} />
      </button>

      {/* Input de entrada centrado */}
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur}
        disabled={disabled}
        className="w-10 text-center text-xs font-bold text-on-surface bg-transparent focus:outline-none h-full select-all px-0.5"
      />

      {/* Botón incremento */}
      <button
        type="button"
        disabled={disabled || (value !== '' && max !== undefined && value >= max)}
        onClick={handleIncrement}
        className="px-2 h-full flex items-center justify-center hover:bg-primary-container/10 active:bg-primary-container/15 text-on-surface-variant disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer shrink-0"
        title="Aumentar cantidad"
      >
        <Plus size={11} />
      </button>
    </div>
  )
}
