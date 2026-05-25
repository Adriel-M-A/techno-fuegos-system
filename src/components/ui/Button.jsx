// Componente Button reutilizable con variantes primary y secondary
export default function Button({
  variant = 'primary',
  size = 'md',
  onClick,
  children,
  disabled = false,
  type = 'button',
  className = '',
}) {
  // Clases base comunes a todas las variantes
  const base = `
    inline-flex items-center justify-center gap-2 font-medium
    transition-all duration-200 select-none
    rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-container/40 focus-visible:ring-offset-1
    ${disabled 
      ? 'opacity-50 cursor-not-allowed -translate-y-0 shadow-none pointer-events-none' 
      : 'cursor-pointer'
    }
  `

  // Tamaños disponibles
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-sm',
  }

  // Variantes de estilo
  const variants = {
    primary: `
      bg-primary-container text-on-primary shadow-sm
      hover:bg-primary hover:shadow-md hover:-translate-y-[1px]
      active:translate-y-0 active:shadow-sm
    `,
    secondary: `
      bg-surface-container-lowest text-on-surface
      border border-outline-variant shadow-sm
      hover:bg-surface-container hover:-translate-y-[1px] hover:shadow-md
      active:translate-y-0 active:shadow-sm
    `,
    tertiary: `
      bg-tertiary-container text-on-tertiary shadow-sm
      hover:bg-tertiary hover:shadow-md hover:-translate-y-[1px]
      active:translate-y-0 active:shadow-sm
    `,
    danger: `
      bg-error text-on-error shadow-sm
      hover:bg-error/90 hover:shadow-md hover:-translate-y-[1px]
      active:translate-y-0 active:shadow-sm
    `,
    ghost: `
      bg-transparent text-primary-container
      hover:bg-primary-container/10 active:bg-primary-container/15
    `,
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizes[size] || sizes.md} ${variants[variant] || variants.primary} ${className}`}
    >
      {children}
    </button>
  )
}
