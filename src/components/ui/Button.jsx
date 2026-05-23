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
    transition-colors duration-150 cursor-pointer select-none
    rounded focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed
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
      bg-primary-container text-on-primary
      hover:bg-primary active:shadow-[inset_0_0_0_2px_rgba(0,0,0,0.15)]
    `,
    secondary: `
      bg-surface-container-lowest text-on-surface
      border border-outline-variant
      hover:bg-surface-container active:shadow-[inset_0_0_0_2px_rgba(0,0,0,0.08)]
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
