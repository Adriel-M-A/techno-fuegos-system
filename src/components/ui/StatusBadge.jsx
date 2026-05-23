// Configuración de estados de presupuesto con colores e indicadores
const STATUS_CONFIG = {
  borrador: {
    label: 'Borrador',
    color: '#5f5e5e',
    bg: '#eeeeee',
    dot: '#5f5e5e',
  },
  enviado: {
    label: 'Enviado',
    color: '#004fa2',
    bg: '#e1e9ff',
    dot: '#004fa2',
  },
  aceptado: {
    label: 'Aceptado',
    color: '#2e7d32',
    bg: '#e8f5e9',
    dot: '#2e7d32',
  },
  vencido: {
    label: 'Vencido',
    color: '#b34700',
    bg: '#ffe4d9',
    dot: '#b34700',
  },
}

// Componente StatusBadge: indicador visual de estado de presupuesto
export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.borrador

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm label-md uppercase tracking-wide"
      style={{ color: config.color, backgroundColor: config.bg }}
    >
      {/* Indicador circular tipo LED */}
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ backgroundColor: config.dot }}
      />
      {config.label}
    </span>
  )
}
