// Componente reusable para botones de acción en filas de tablas
export default function TableActionButton({
  icon: IconComponent,
  title,
  onClick,
  variant = 'default',
  disabled = false,
  className = '',
  ...props
}) {
  // Clases base del botón de acción (diseño industrial con esquinas rectas)
  const base = `
    p-1.5 inline-flex items-center justify-center
    transition-all duration-200 cursor-pointer select-none rounded-sm
    disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none
  `

  // Variantes estéticas del botón de acción
  const variants = {
    default: 'text-on-surface-variant hover:text-primary-container hover:bg-primary-container/8',
    danger: 'text-on-surface-variant hover:text-error hover:bg-error-container/40',
  }

  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant] || variants.default} ${className}`}
      {...props}
    >
      {IconComponent && <IconComponent size={16} />}
    </button>
  )
}
