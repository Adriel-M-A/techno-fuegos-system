import { useState, useRef, useEffect } from 'react'
import CharacterCounter from './CharacterCounter'

// Componente Input: control de entrada Fluent con soporte para contador interno y máscara numérica estricta
export default function Input({
  label,
  placeholder = '',
  value = '',
  onChange,
  error,
  disabled = false,
  type = 'text',
  name,
  id,
  maxLength,
  showCounter = false,
  numericMode, // 'integer' o 'decimal'
  className = '',
}) {
  const [internalValue, setInternalValue] = useState(value)
  const prevValueRef = useRef(value)
  const inputId = id || name || label?.toLowerCase().replace(/\s+/g, '-')

  // Sincronizar la referencia del valor anterior
  useEffect(() => {
    prevValueRef.current = value
  }, [value])

  // Sincronizar el estado interno únicamente si la propiedad cambia remotamente a nivel externo
  if (prevValueRef.current !== value) {
    setInternalValue(value)
    prevValueRef.current = value
  }

  // Manejar el filtrado e intercepción estricta en el tipeado de teclado (onKeyDown)
  const handleKeyDown = (e) => {
    if (!numericMode) return

    // Permitir teclas de control y navegación básicas
    if ([
      'Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 
      'ArrowLeft', 'ArrowRight', 'Home', 'End'
    ].includes(e.key)) {
      return
    }

    if (numericMode === 'integer') {
      // Bloquear cualquier tecla que no sea un dígito
      if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault()
      }
    } else if (numericMode === 'decimal') {
      // Si tipea punto, cancelar y convertir automáticamente a coma
      if (e.key === '.') {
        e.preventDefault()
        const val = e.target.value
        if (!val.includes(',')) {
          const start = e.target.selectionStart
          const end = e.target.selectionEnd
          const newVal = val.substring(0, start) + ',' + val.substring(end)
          setInternalValue(newVal)
          
          if (onChange) {
            // Disparar evento React simulado
            onChange({ target: { name, value: newVal } })
          }

          // Ajustar y reposicionar el cursor después de la inserción de la coma
          setTimeout(() => {
            e.target.setSelectionRange(start + 1, start + 1)
          }, 0)
        }
        return
      }

      // Si tipea coma, bloquear si ya existe una en el input
      if (e.key === ',') {
        if (e.target.value.includes(',')) {
          e.preventDefault()
        }
        return
      }

      // Bloquear si no es un dígito
      if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault()
      }
    }
  }

  // Sanitización de respaldo para copy-paste y autocompletado en el onChange
  const handleChange = (e) => {
    const val = e.target.value

    if (numericMode === 'integer') {
      const cleaned = val.replace(/[^0-9]/g, '')
      if (maxLength && cleaned.length > maxLength) return
      setInternalValue(cleaned)
      if (onChange) {
        e.target.value = cleaned
        onChange(e)
      }
    } else if (numericMode === 'decimal') {
      let cleaned = val.replace(/\./g, ',') // Reemplazar puntos por comas
      cleaned = cleaned.replace(/[^0-9,]/g, '') // Solo números y comas
      
      const parts = cleaned.split(',')
      if (parts.length > 2) {
        cleaned = parts[0] + ',' + parts.slice(1).join('')
      }
      
      if (maxLength && cleaned.length > maxLength) return
      setInternalValue(cleaned)
      if (onChange) {
        e.target.value = cleaned
        onChange(e)
      }
    } else {
      if (maxLength && val.length > maxLength) return
      setInternalValue(val)
      if (onChange) onChange(e)
    }
  }

  // Si se especifica numericMode, anulamos type="number" para evitar inconsistencias nativas del navegador
  const inputType = numericMode ? 'text' : type

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {/* Label superior visible */}
      {label && (
        <label
          htmlFor={inputId}
          className="label-md text-on-surface-variant uppercase tracking-wide select-none"
        >
          {label}
        </label>
      )}

      {/* Contenedor relativo para posicionar de forma interna y absoluta el contador */}
      <div className="relative w-full flex items-center">
        <input
          id={inputId}
          name={name}
          type={inputType}
          value={internalValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          className={`
            w-full px-3 py-2 text-sm text-on-surface bg-surface-container-lowest
            border transition-all duration-200 rounded-sm
            placeholder:text-on-surface-variant/40
            focus:outline-none
            disabled:opacity-50 disabled:cursor-not-allowed
            ${showCounter && maxLength ? 'pr-14' : ''}
            ${error
              ? 'border-error focus:ring-2 focus:ring-error/20 focus:border-error'
              : 'border-outline-variant focus:ring-2 focus:ring-primary-container/30 focus:border-primary-container'
            }
          `}
        />
        {showCounter && maxLength && (
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 select-none pointer-events-none z-10">
            <CharacterCounter currentLength={internalValue.toString().length} maxLength={maxLength} />
          </div>
        )}
      </div>

      {/* Mensaje de error inferior */}
      {error && (
        <span className="label-md text-error mt-0.5">{error}</span>
      )}
    </div>
  )
}
