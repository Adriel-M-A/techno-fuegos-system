import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, Search, X } from 'lucide-react'

// Componente SearchableSelect: selector dinámico con buscador, filtro de 3 letras, navegación por teclado y posicionamiento absoluto global via React Portals
export default function SearchableSelect({
  options = [],
  value = '',
  onChange,
  placeholder = 'Seleccionar...',
  label,
  disabled = false,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 })
  const containerRef = useRef(null)
  const dropdownRef = useRef(null)
  const triggerRef = useRef(null)
  const searchInputRef = useRef(null)

  // Cerrar el panel desplegable al hacer click fuera del componente, respetando el Portal
  useEffect(() => {
    function handleClickOutside(event) {
      // Ignorar si el click fue dentro del contenedor del trigger original
      if (containerRef.current && containerRef.current.contains(event.target)) {
        return
      }
      // Ignorar si el click fue dentro del dropdown flotante del Portal (lista o buscador)
      if (dropdownRef.current && dropdownRef.current.contains(event.target)) {
        return
      }
      setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Auto-enfocar el campo de búsqueda inmediatamente al abrir el selector
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    } else {
      setSearchTerm('')
    }
  }, [isOpen])

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

  const handleSelect = (optionValue) => {
    if (onChange) {
      onChange({ target: { value: optionValue } })
    }
    setIsOpen(false)
  }

  // Filtrado local inteligente con un umbral de activación de 3 caracteres
  const isSearchActive = searchTerm.trim().length >= 3
  const filteredOptions = options.filter(opt => {
    if (!isSearchActive) return true // Muestra la lista completa si no hay suficiente longitud de búsqueda
    return opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  })

  // Sincronizar y resetear el índice resaltado cuando cambien las opciones o se abra el menú
  useEffect(() => {
    setHighlightedIndex(0)
  }, [searchTerm, isOpen])

  // Manejar eventos de navegación de teclado dentro del buscador
  const handleKeyDown = (e) => {
    if (!isOpen) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex((prevIndex) =>
        prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : 0
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : filteredOptions.length - 1
      )
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
        handleSelect(filteredOptions[highlightedIndex].value)
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  const selectedOption = options.find(opt => opt.value === value)

  return (
    <div ref={containerRef} className={`flex flex-col gap-1 w-full relative ${className}`}>
      {label && (
        <label className="label-md text-on-surface-variant uppercase tracking-wider select-none">
          {label}
        </label>
      )}
      
      {/* Botón gatillador del select */}
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
        <span className={selectedOption ? 'font-semibold' : 'text-on-surface-variant/50'}>
          {selectedOption ? selectedOption.label : placeholder}
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
          className="bg-surface-container-lowest border border-outline-variant/60 rounded-md shadow-[var(--shadow-raised)] overflow-hidden flex flex-col"
        >
          
          {/* Campo buscador interno */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-outline-variant/40 bg-surface-container-low/50">
            <Search size={14} className="text-on-surface-variant/60 shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Buscar (escribir mínimo 3 letras)..."
              className="w-full text-xs text-on-surface bg-transparent focus:outline-none placeholder:text-on-surface-variant/40"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="text-on-surface-variant/50 hover:text-on-surface shrink-0 cursor-pointer"
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Listado de Opciones filtradas */}
          <ul className="max-h-48 overflow-y-auto flex flex-col py-1">
            {filteredOptions.length === 0 ? (
              <li className="px-3 py-2 text-xs text-on-surface-variant text-center select-none">
                Sin resultados encontrados
              </li>
            ) : (
              filteredOptions.map((opt, index) => {
                const isSelected = opt.value === value
                const isHighlighted = index === highlightedIndex
                return (
                  <li
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`
                      px-3 py-1.5 text-xs cursor-pointer transition-colors duration-150 select-none text-left
                      ${isSelected
                        ? 'bg-sidebar-active text-primary-container font-semibold'
                        : isHighlighted
                          ? 'bg-primary-container/10 text-primary-container font-medium'
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
