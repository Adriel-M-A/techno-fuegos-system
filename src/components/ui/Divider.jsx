// Componente Divider: divisor estructural horizontal o vertical de 1px
export default function Divider({ orientation = 'horizontal', className = '' }) {
  if (orientation === 'vertical') {
    return (
      <div
        className={`w-px self-stretch bg-outline-variant shrink-0 ${className}`}
      />
    )
  }

  return (
    <hr className={`border-none h-px bg-outline-variant my-0 ${className}`} />
  )
}
