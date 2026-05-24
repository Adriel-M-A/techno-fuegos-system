import { Plus, Search, Filter } from 'lucide-react'
import { Button, Card, PageHeader, StatusBadge, DataTable } from '../components/ui'

// Datos mock de demostración para visualizar el panel de presupuestos
const PRESUPUESTOS_MOCK = [
  { id: 1, fecha: '22/05/2026', cliente: 'Carlos Rodríguez', total: '$ 148.000', vendedor: 'Adriel', status: 'aceptado' },
  { id: 2, fecha: '20/05/2026', cliente: 'Florencia Méndez', total: '$ 92.500', vendedor: 'Adriel', status: 'enviado' },
  { id: 3, fecha: '18/05/2026', cliente: 'Obra Pilar Centro', total: '$ 310.000', vendedor: 'Adriel', status: 'borrador' },
  { id: 4, fecha: '10/05/2026', cliente: 'Juan Pérez', total: '$ 67.200', vendedor: 'Adriel', status: 'vencido' },
  { id: 5, fecha: '08/05/2026', cliente: 'Hormigones SA', total: '$ 215.800', vendedor: 'Adriel', status: 'aceptado' },
]

// Columnas de la tabla de presupuestos
const COLUMNS = [
  { key: 'fecha', label: 'Fecha' },
  { key: 'cliente', label: 'Cliente' },
  { key: 'total', label: 'Total', mono: true, align: 'right' },
  { key: 'vendedor', label: 'Vendedor' },
  { key: 'status', label: 'Estado' },
]

// Filas procesadas con el badge de estado
const rows = PRESUPUESTOS_MOCK.map((p) => ({
  ...p,
  status: <StatusBadge status={p.status} />,
}))

// Métricas de resumen para las tarjetas superiores
const METRICAS = [
  { label: 'Facturación del Mes', valor: '$ 363.800', sub: 'Presupuestos aceptados', color: '#8c3600' },
  { label: 'Cotizaciones Enviadas', valor: '1', sub: 'Pendientes de respuesta', color: '#004fa2' },
  { label: 'Presupuestos Vencidos', valor: '1', sub: 'Sin renovar', color: '#ba1a1a' },
]

// Vista del panel principal de presupuestos
export default function Presupuestos() {
  return (
    <div className="p-6 flex flex-col gap-4">

      {/* Cabecera de la vista */}
      <PageHeader
        title="Panel de Presupuestos"
        subtitle="Historial y seguimiento comercial del taller"
      >
        <Button variant="primary" size="md">
          <Plus size={16} />
          Nuevo Presupuesto
        </Button>
      </PageHeader>

      {/* Tarjetas de métricas rápidas */}
      <div className="grid grid-cols-3 gap-4">
        {METRICAS.map((m) => (
          <div
            key={m.label}
            className="bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-4 flex flex-col gap-1"
          >
            <span className="label-md text-on-surface-variant uppercase tracking-wide">{m.label}</span>
            <span
              className="text-2xl font-bold mono-data leading-tight"
              style={{ color: m.color }}
            >
              {m.valor}
            </span>
            <span className="label-md text-on-surface-variant">{m.sub}</span>
          </div>
        ))}
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded">
          <Search size={15} className="text-on-surface-variant shrink-0" />
          <input
            type="text"
            placeholder="Buscar por cliente..."
            className="flex-1 text-sm text-on-surface bg-transparent focus:outline-none placeholder:text-on-surface-variant/50"
          />
        </div>
        <Button variant="secondary" size="md">
          <Filter size={15} />
          Filtrar
        </Button>
      </div>

      {/* Tabla de presupuestos */}
      <Card>
        <DataTable columns={COLUMNS} rows={rows} emptyMessage="No hay presupuestos registrados." />
      </Card>

    </div>
  )
}
