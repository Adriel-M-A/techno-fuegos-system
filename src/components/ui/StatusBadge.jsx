// Configuración de estados de presupuesto con clases CSS semánticas de Tailwind v4
const STATUS_CONFIG = {
  borrador: {
    label: 'Borrador',
    textClass: 'text-secondary',
    bgClass: 'bg-surface-container',
    dotClass: 'bg-secondary',
  },
  enviado: {
    label: 'Enviado',
    textClass: 'text-primary',
    bgClass: 'bg-secondary-container/40',
    dotClass: 'bg-primary',
  },
  aceptado: {
    label: 'Aceptado',
    textClass: 'text-success',
    bgClass: 'bg-success/10',
    dotClass: 'bg-success',
  },
  vencido: {
    label: 'Vencido',
    textClass: 'text-tertiary',
    bgClass: 'bg-tertiary-fixed',
    dotClass: 'bg-tertiary',
  },
}

// Componente StatusBadge: indicador visual de estado de presupuesto sin colores hardcodeados
export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.borrador

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm label-md uppercase tracking-wide ${config.textClass} ${config.bgClass}`}
    >
      {/* Indicador cuadrado tipo LED */}
      <span
        className={`w-1.5 h-1.5 shrink-0 ${config.dotClass}`}
      />
      {config.label}
    </span>
  )
}
