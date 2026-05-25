// Componente Select: selector industrial reutilizable sin bordes redondeados y de estética técnica
export default function Select({ label, className = '', children, ...props }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="label-md text-on-surface-variant uppercase tracking-wider select-none">
          {label}
        </label>
      )}
      <select
        className={`
          px-3 py-1.5 bg-surface-container border border-border-iron
          text-sm font-semibold text-on-surface rounded-none
          focus:outline-none focus:border-primary-container cursor-pointer
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
        {...props}
      >
        {children}
      </select>
    </div>
  )
}
