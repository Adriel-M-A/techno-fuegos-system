import { useState, useRef, useEffect, Children } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown } from 'lucide-react'

// Componente Select: dropdown interactivo controlado React con look Fluent, soporte de navegación de teclado, compatibilidad con option children y posicionamiento absoluto global via React Portals
export default function Select({
  label,
  value,
  defaultValue,
  onChange,
  options: propOptions,
  placeholder = 'Seleccionar...',
  disabled = false,
  className = '',
  children,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 })
  const containerRef = useRef(null)
  const dropdownRef = useRef(null)
  const triggerRef = useRef(null)

  // Cerrar el panel desplegable al hacer click fuera del componente, respetando el Portal
  useEffect(() => {
    function handleClickOutside(event) {
      // Ignorar si el click fue dentro del contenedor del trigger original
      if (containerRef.current && containerRef.current.contains(event.target)) {
        return
      }
      // Ignorar si el click fue dentro del dropdown flotante renderizado en el Portal
      if (dropdownRef.current && dropdownRef.current.contains(event.target)) {
        return
      }
      setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Recalcular la posición geográfica exacta en la pantalla al abrirse o redimensionar
  useEffect(() => {
    if (!isOpen) return

    const updatePosition = () => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect()
        setCoords({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
        })
      }
    }

    updatePosition()
    window.addEventListener('scroll', updatePosition, true) // Captura todos los scrolls internos de contenedores
    window.addEventListener('resize', updatePosition)

    return () => {
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  }, [isOpen])

  // Extraer el catálogo de opciones desde la propiedad options o parseando las etiquetas <option> hijas
  const options = []
  if (propOptions) {
    propOptions.forEach(opt => options.push(opt))
  } else if (children) {
    Children.forEach(children, (child) => {
      if (child && child.type === 'option') {
        options.push({
          value: child.props.value ?? '',
          label: child.props.children ?? '',
          disabled: child.props.disabled ?? false,
        })
      }
    })
  }

  // Filtrar el listado visible desplegable de opciones omitiendo el placeholder vacío e inactivo inicial
  const visibleOptions = options.filter(opt => !(opt.disabled && opt.value === ''))

  // Manejar estado local si no se suministra un valor controlado de forma externa
  const [localValue, setLocalValue] = useState(value ?? defaultValue ?? '')

  // Sincronizar el valor si cambia externamente
  useEffect(() => {
    if (value !== undefined) {
      setLocalValue(value)
    }
  }, [value])

  // Sincronizar el índice resaltado para que comience en la opción activa al abrirse
  useEffect(() => {
    if (isOpen) {
      const selectedIdx = visibleOptions.findIndex(opt => opt.value === localValue)
      setHighlightedIndex(selectedIdx >= 0 ? selectedIdx : 0)
    }
  }, [isOpen, localValue])

  const handleSelect = (optionValue, optionDisabled) => {
    if (optionDisabled) return
    setLocalValue(optionValue)
    if (onChange) {
      onChange({ target: { value: optionValue } })
    }
    setIsOpen(false)
  }

  // Manejar navegación por teclado dentro de la lista de opciones
  const handleKeyDown = (e) => {
    if (disabled) return

    if (!isOpen) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault()
        setIsOpen(true)
      }
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex((prevIndex) =>
        prevIndex < visibleOptions.length - 1 ? prevIndex + 1 : 0
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : visibleOptions.length - 1
      )
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (highlightedIndex >= 0 && highlightedIndex < visibleOptions.length) {
        const targetOpt = visibleOptions[highlightedIndex]
        handleSelect(targetOpt.value, targetOpt.disabled)
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setIsOpen(false)
    }
  }

  const selectedOption = options.find(opt => opt.value === localValue)
  
  // Buscar un placeholder si no hay opción seleccionada o si la opción seleccionada es deshabilitada
  const displayLabel = selectedOption 
    ? selectedOption.label 
    : (options[0]?.disabled ? options[0].label : placeholder)

  return (
    <div 
      ref={containerRef} 
      onKeyDown={handleKeyDown}
      className={`flex flex-col gap-1 w-full relative ${className}`}
    >
      {/* Label superior */}
      {label && (
        <label className="label-md text-on-surface-variant uppercase tracking-wide select-none">
          {label}
        </label>
      )}
      
      {/* Botón gatillador principal */}
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full px-3 py-1.5 bg-surface-container-lowest border border-outline-variant
          text-sm text-on-surface rounded-sm transition-all duration-200 flex items-center justify-between
          focus:outline-none focus:ring-2 focus:ring-primary-container/30 focus:border-primary-container cursor-pointer
          disabled:opacity-50 disabled:cursor-not-allowed text-left
        `}
      >
        <span className={selectedOption && selectedOption.value !== '' ? 'font-semibold' : 'text-on-surface-variant/50'}>
          {displayLabel}
        </span>
        <ChevronDown size={16} className={`text-on-surface-variant transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Menú desplegable flotante adjunto directamente al body via React Portal */}
      {isOpen && createPortal(
        <div 
          ref={dropdownRef}
          style={{
            position: 'absolute',
            top: `${coords.top + 4}px`,
            left: `${coords.left}px`,
            width: `${coords.width}px`,
            zIndex: 9999,
          }}
          className="bg-surface-container-lowest border border-outline-variant/60 rounded-md shadow-[var(--shadow-raised)] overflow-hidden flex flex-col py-1"
        >
          <ul className="max-h-48 overflow-y-auto flex flex-col">
            {visibleOptions.length === 0 ? (
              <li className="px-3 py-2 text-xs text-on-surface-variant text-center select-none">
                Sin opciones disponibles
              </li>
            ) : (
              visibleOptions.map((opt, index) => {
                const isSelected = opt.value === localValue
                const isHighlighted = index === highlightedIndex
                
                return (
                  <li
                    key={opt.value}
                    onClick={() => handleSelect(opt.value, opt.disabled)}
                    onMouseEnter={() => !opt.disabled && setHighlightedIndex(index)}
                    className={`
                      px-3 py-1.5 text-xs cursor-pointer transition-colors duration-150 select-none text-left
                      ${opt.disabled ? 'text-on-surface-variant/30 cursor-not-allowed' : ''}
                      ${isSelected && !opt.disabled
                        ? 'bg-sidebar-active text-primary-container font-semibold'
                        : isHighlighted && !opt.disabled
                          ? 'bg-primary-container/10 text-primary-container font-medium'
                          : opt.disabled
                            ? ''
                            : 'text-on-surface hover:bg-primary-container/5 hover:text-primary-container'
                      }
                    `}
                  >
                    {opt.label}
                  </li>
                )
              })
            )}
          </ul>
        </div>,
        document.body
      )}
    </div>
  )
}
