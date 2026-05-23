// Componente Input de texto con label superior siempre visible
export default function Input({
  label,
  placeholder = '',
  value,
  onChange,
  error,
  disabled = false,
  type = 'text',
  name,
  id,
  className = '',
}) {
  const inputId = id || name || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {/* Label siempre visible encima del input */}
      {label && (
        <label
          htmlFor={inputId}
          className="label-md text-on-surface-variant uppercase tracking-wide"
        >
          {label}
        </label>
      )}

      {/* Campo de input */}
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full px-3 py-2 text-sm text-on-surface bg-surface-container-lowest
          border rounded transition-colors duration-150
          placeholder:text-on-surface-variant/50
          focus:outline-none
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error
            ? 'border-error focus:border-error'
            : 'border-outline-variant focus:border-primary-container'
          }
        `}
      />

      {/* Mensaje de error */}
      {error && (
        <span className="label-md text-error mt-0.5">{error}</span>
      )}
    </div>
  )
}
