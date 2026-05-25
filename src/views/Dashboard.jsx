import { useState } from 'react'
import { Plus, Send, Eye, Download, Pencil, RotateCcw, Trash2 } from 'lucide-react'
import { Button, PageHeader, Select } from '../components/ui'
import { formatARS } from '../utils/currencyFormatters'

// Datos mock de demostración basados en la imagen de referencia (sin ID de cliente y con estado entregado)
const PRESUPUESTOS_MOCK = [
  { id: 1, fecha: '2023-11-24', cliente: 'Construcciones Andes S.A.', total: 42500.00, vendedor: 'Ing. Carlos Ruiz', status: 'aceptado' },
  { id: 2, fecha: '2023-11-22', cliente: 'Minería del Norte Ltda.', total: 128000.00, vendedor: 'Arq. Elena Soto', status: 'entregado' },
  { id: 3, fecha: '2023-11-15', cliente: 'Inmobiliaria Horizonte', total: 12400.00, vendedor: 'Ing. Carlos Ruiz', status: 'vencido' },
  { id: 4, fecha: '2023-11-25', cliente: 'Logística Integral S.A.', total: 5200.00, vendedor: 'Arq. Elena Soto', status: 'borrador' },
]

/**
 * Dashboard
 * Vista del panel de control principal para seguimiento y gestión de presupuestos.
 */
export default function Dashboard() {
  const [filtroEstado, setFiltroEstado] = useState('todos')
  const [filtroVendedor, setFiltroVendedor] = useState('todos')

  // Filtrado de presupuestos basado en las selecciones
  const presupuestosFiltrados = PRESUPUESTOS_MOCK.filter((p) => {
    const coincideEstado = filtroEstado === 'todos' || p.status === filtroEstado
    const coincideVendedor = filtroVendedor === 'todos' || p.vendedor === filtroVendedor
    return coincideEstado && coincideVendedor
  })

  // Renderizar la etiqueta de estado con estética rectangular outline
  const renderEstadoBadge = (status) => {
    switch (status) {
      case 'aceptado':
        return (
          <span className="border border-success text-success bg-success/5 px-2.5 py-0.5 label-lg text-xs font-bold tracking-wider rounded-none uppercase select-none inline-block">
            Aceptado
          </span>
        )
      case 'entregado':
        return (
          <span className="border border-primary text-primary bg-primary/5 px-2.5 py-0.5 label-lg text-xs font-bold tracking-wider rounded-none uppercase select-none inline-block">
            Entregado
          </span>
        )
      case 'vencido':
        return (
          <span className="border border-tertiary text-tertiary bg-tertiary/5 px-2.5 py-0.5 label-lg text-xs font-bold tracking-wider rounded-none uppercase select-none inline-block">
            Vencido
          </span>
        )
      case 'borrador':
        return (
          <span className="border border-secondary text-secondary bg-secondary/5 px-2.5 py-0.5 label-lg text-xs font-bold tracking-wider rounded-none uppercase select-none inline-block">
            Borrador
          </span>
        )
      default:
        return null
    }
  }

  // Renderizar los botones de acción dinámicos en base al estado del presupuesto
  const renderAcciones = (p) => {
    switch (p.status) {
      case 'aceptado':
        return (
          <div className="flex items-center gap-1">
            <button
              title="Ver presupuesto"
              className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors duration-150 cursor-pointer rounded-none"
            >
              <Eye size={16} />
            </button>
            <button
              title="Exportar PDF"
              className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors duration-150 cursor-pointer rounded-none"
            >
              <Download size={16} />
            </button>
          </div>
        )
      case 'entregado':
        return (
          <div className="flex items-center gap-1">
            <button
              title="Ver presupuesto"
              className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors duration-150 cursor-pointer rounded-none"
            >
              <Eye size={16} />
            </button>
            <button
              title="Editar presupuesto"
              className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors duration-150 cursor-pointer rounded-none"
            >
              <Pencil size={16} />
            </button>
          </div>
        )
      case 'vencido':
        return (
          <div className="flex items-center gap-1">
            <button
              title="Ver presupuesto"
              className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors duration-150 cursor-pointer rounded-none"
            >
              <Eye size={16} />
            </button>
            <button
              title="Renovar presupuesto"
              className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors duration-150 cursor-pointer rounded-none"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        )
      case 'borrador':
        return (
          <div className="flex items-center gap-1">
            <button
              title="Editar presupuesto"
              className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors duration-150 cursor-pointer rounded-none"
            >
              <Pencil size={16} />
            </button>
            <button
              title="Eliminar borrador"
              className="p-1.5 text-error hover:bg-surface-container transition-colors duration-150 cursor-pointer rounded-none"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="p-6 flex flex-col gap-4">
      {/* Cabecera superior principal */}
      <PageHeader
        title="Panel de Presupuestos"
        subtitle="Historial y seguimiento comercial del taller"
      >
        <Button variant="primary" size="md" className="flex items-center gap-2 cursor-pointer">
          <Plus size={16} />
          Nuevo Presupuesto
        </Button>
      </PageHeader>

      {/* Grid de Tarjetas de Métricas Rápidas */}
      <div className="grid grid-cols-3 gap-6">
        
        {/* Tarjeta 1: Total Facturado Aceptado */}
        <div className="bg-surface-container-lowest border border-border-iron rounded-none px-5 py-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="label-lg text-xs text-on-surface-variant font-semibold tracking-wider uppercase">
              Total Facturado Aceptado
            </span>
            <span className="border border-[#2e7d32]/30 text-[#2e7d32] bg-[#2e7d32]/5 px-1.5 py-0.5 text-xs font-semibold rounded-none select-none">
              +12%
            </span>
          </div>
          <span className="text-3xl font-extrabold text-on-surface font-mono mono-data tracking-tight select-all">
            {formatARS(1250000)}
          </span>
          <span className="text-xs text-on-surface-variant mt-0.5">
            Acumulado año fiscal actual
          </span>
        </div>

        {/* Tarjeta 2: Presupuestos Entregados */}
        <div className="bg-surface-container-lowest border border-border-iron rounded-none px-5 py-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="label-lg text-xs text-on-surface-variant font-semibold tracking-wider uppercase">
              Presupuestos Entregados
            </span>
            <Send className="text-primary" size={16} />
          </div>
          <span className="text-3xl font-extrabold text-on-surface font-mono mono-data tracking-tight select-all">
            14
          </span>
          <span className="text-xs text-on-surface-variant mt-0.5">
            Pendientes de respuesta
          </span>
        </div>

        {/* Tarjeta 3: Presupuestos Vencidos */}
        <div className="bg-surface-container-lowest border border-border-iron rounded-none px-5 py-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="label-lg text-xs text-on-surface-variant font-semibold tracking-wider uppercase">
              Presupuestos Vencidos
            </span>
            <span className="border border-[#ba1a1a]/30 text-[#ba1a1a] bg-[#ba1a1a]/5 px-1.5 py-0.5 text-xs font-semibold rounded-none select-none uppercase">
              Crítico
            </span>
          </div>
          <span className="text-3xl font-extrabold text-on-surface font-mono mono-data tracking-tight select-all">
            3
          </span>
          <span className="text-xs text-on-surface-variant mt-0.5">
            Requieren seguimiento inmediato
          </span>
        </div>

      </div>

      {/* Barra de Búsqueda y Filtros Simplificada */}
      <div className="bg-surface-container-lowest border border-border-iron px-5 py-3.5 flex items-center gap-6 rounded-none">
        
        {/* Filtro por Estado */}
        <div className="flex items-center gap-2">
          <span className="label-lg text-xs font-bold text-on-surface-variant uppercase tracking-wider select-none">
            Filtrar por:
          </span>
          <Select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="min-w-[160px] !py-1.5"
          >
            <option value="todos">Todos los Estados</option>
            <option value="aceptado">Aceptado</option>
            <option value="entregado">Entregado</option>
            <option value="vencido">Vencido</option>
            <option value="borrador">Borrador</option>
          </Select>
        </div>

        {/* Separador vertical de filtros */}
        <div className="h-6 w-px bg-outline-variant" />

        {/* Filtro por Vendedor */}
        <div className="flex items-center gap-2">
          <span className="label-lg text-xs font-bold text-on-surface-variant uppercase tracking-wider select-none">
            Vendedor:
          </span>
          <Select
            value={filtroVendedor}
            onChange={(e) => setFiltroVendedor(e.target.value)}
            className="min-w-[160px] !py-1.5"
          >
            <option value="todos">Todos</option>
            <option value="Ing. Carlos Ruiz">Ing. Carlos Ruiz</option>
            <option value="Arq. Elena Soto">Arq. Elena Soto</option>
          </Select>
        </div>

      </div>

      {/* Tabla Industrial de Presupuestos */}
      <div className="border border-border-iron bg-surface-container-lowest rounded-none overflow-hidden flex flex-col">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-border-iron">
              <th className="px-5 py-3 label-lg text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-5 py-3 label-lg text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-5 py-3 label-lg text-xs font-bold text-on-surface-variant uppercase tracking-wider text-right">
                Monto Total
              </th>
              <th className="px-5 py-3 label-lg text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Vendedor
              </th>
              <th className="px-5 py-3 label-lg text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Estado
              </th>
              <th className="px-5 py-3 label-lg text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {presupuestosFiltrados.length > 0 ? (
              presupuestosFiltrados.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-surface-container-low/40 transition-colors duration-100"
                >
                  <td className="px-5 py-3.5 text-sm font-mono text-on-surface select-all">
                    {p.fecha}
                  </td>
                  <td className="px-5 py-3.5 text-sm font-bold text-on-surface leading-snug">
                    {p.cliente}
                  </td>
                  <td className="px-5 py-3.5 text-sm font-bold text-on-surface font-mono mono-data text-right select-all">
                    {formatARS(p.total)}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-on-surface">
                    {p.vendedor}
                  </td>
                  <td className="px-5 py-3.5">
                    {renderEstadoBadge(p.status)}
                  </td>
                  <td className="px-5 py-3.5">
                    {renderAcciones(p)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-sm text-on-surface-variant">
                  No hay presupuestos que coincidan con los filtros seleccionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Fila de Paginación Industrial */}
        <div className="px-5 py-4 border-t border-border-iron bg-surface-container-low flex items-center justify-between">
          <span className="text-xs text-on-surface-variant select-none">
            Mostrando 1-{presupuestosFiltrados.length} de 28 presupuestos registrados
          </span>
          
          {/* Botones de Paginador */}
          <div className="flex items-center gap-1.5">
            <button className="px-3 py-1.5 text-xs font-semibold text-on-surface bg-surface-container-lowest border border-border-iron hover:bg-surface-container-low transition-colors duration-150 cursor-pointer rounded-none select-none">
              Anterior
            </button>
            <button className="px-3 py-1.5 text-xs font-bold text-white bg-primary border border-primary cursor-pointer rounded-none select-none">
              1
            </button>
            <button className="px-3 py-1.5 text-xs font-semibold text-on-surface bg-surface-container-lowest border border-border-iron hover:bg-surface-container-low transition-colors duration-150 cursor-pointer rounded-none select-none">
              2
            </button>
            <button className="px-3 py-1.5 text-xs font-semibold text-on-surface bg-surface-container-lowest border border-border-iron hover:bg-surface-container-low transition-colors duration-150 cursor-pointer rounded-none select-none">
              3
            </button>
            <button className="px-3 py-1.5 text-xs font-semibold text-on-surface bg-surface-container-lowest border border-border-iron hover:bg-surface-container-low transition-colors duration-150 cursor-pointer rounded-none select-none">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
