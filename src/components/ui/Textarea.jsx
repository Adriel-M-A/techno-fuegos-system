import { useState, useRef, useEffect } from 'react'
import CharacterCounter from './CharacterCounter'

// Componente de entrada multilínea Textarea reutilizable diseñado bajo la estética Fluent
export default function Textarea({
  label,
  value = '',
  onChange,
  error,
  disabled = false,
  placeholder = '',
  rows = 3,
  maxLength,
  showCounter = false,
  className = '',
  ...props
}) {
  const [internalValue, setInternalValue] = useState(value)
  const prevValueRef = useRef(value)

  // Disparar efecto secundario para actualizar la referencia del valor anterior
  useEffect(() => {
    prevValueRef.current = value
  }, [value])

  const handleChange = (e) => {
    const val = e.target.value
    if (maxLength && val.length > maxLength) return
    setInternalValue(val)
    if (onChange) onChange(e)
  }

  // Sincronizar el estado interno de forma reactiva únicamente si la propiedad cambia remotamente a nivel externo
  if (prevValueRef.current !== value) {
    setInternalValue(value)
    prevValueRef.current = value
  }

  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {label && (
        <label className="label-md text-on-surface-variant uppercase tracking-wide select-none">
          {label}
        </label>
      )}
      <textarea
        value={internalValue}
        onChange={handleChange}
        disabled={disabled}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        className={`
          w-full px-3 py-2 text-sm text-on-surface bg-surface-container-lowest
          border rounded-sm transition-all duration-200 resize-none
          placeholder:text-on-surface-variant/40
          focus:outline-none
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error
            ? 'border-error focus:ring-2 focus:ring-error/20 focus:border-error'
            : 'border-outline-variant focus:ring-2 focus:ring-primary-container/30 focus:border-primary-container'
          }
        `}
        {...props}
      />

      {/* Zona inferior de metadatos (error y contador de caracteres) */}
      <div className="flex items-start justify-between mt-0.5">
        {error ? (
          <span className="label-md text-error">{error}</span>
        ) : <div />}

        {showCounter && maxLength && (
          <div className="ml-auto">
            <CharacterCounter currentLength={internalValue.length} maxLength={maxLength} />
          </div>
        )}
      </div>
    </div>
  )
}
