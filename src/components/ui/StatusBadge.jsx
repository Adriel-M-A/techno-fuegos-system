// Configuración de estados de presupuesto con clases CSS semánticas de Tailwind v4 y opacidades
const STATUS_CONFIG = {
  borrador: {
    label: 'Borrador',
    textClass: 'text-secondary',
    bgClass: 'bg-secondary/12',
    dotClass: 'bg-secondary',
  },
  enviado: {
    label: 'Enviado',
    textClass: 'text-primary-container',
    bgClass: 'bg-primary-container/12',
    dotClass: 'bg-primary-container',
  },
  entregado: {
    label: 'Entregado',
    textClass: 'text-primary-container',
    bgClass: 'bg-primary-container/12',
    dotClass: 'bg-primary-container',
  },
  aceptado: {
    label: 'Aceptado',
    textClass: 'text-success',
    bgClass: 'bg-success/12',
    dotClass: 'bg-success',
  },
  vencido: {
    label: 'Vencido',
    textClass: 'text-tertiary-container',
    bgClass: 'bg-tertiary-container/12',
    dotClass: 'bg-tertiary-container',
  },
}

// Componente StatusBadge: indicador visual de estado tipo chip pill
export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.borrador

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full label-md uppercase tracking-wider ${config.textClass} ${config.bgClass}`}
    >
      {/* Indicador circular tipo LED */}
      <span
        className={`w-1.5 h-1.5 shrink-0 rounded-full ${config.dotClass}`}
      />
      {config.label}
    </span>
  )
}
