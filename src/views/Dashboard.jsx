import { useState } from 'react'
import { Plus, Send, Eye, Download, Pencil, RotateCcw, Trash2 } from 'lucide-react'
import { Button, PageHeader, Select, StatusBadge, ConfirmationModal } from '../components/ui'
import { DataTable, TableActionButton, TablePagination } from '../components/table'
import { formatARS } from '../utils/currencyFormatters'

// Datos mock de demostración basados en la imagen de referencia (sin ID de cliente y con estado entregado)
const PRESUPUESTOS_MOCK = [
  { id: 1, fecha: '2023-11-24', cliente: 'Construcciones Andes S.A.', total: 42500.00, vendedor: 'Ing. Carlos Ruiz', status: 'aceptado' },
  { id: 2, fecha: '2023-11-22', cliente: 'Minería del Norte Ltda.', total: 128000.00, vendedor: 'Arq. Elena Soto', status: 'entregado' },
  { id: 3, fecha: '2023-11-15', cliente: 'Inmobiliaria Horizonte', total: 12400.00, vendedor: 'Ing. Carlos Ruiz', status: 'vencido' },
  { id: 4, fecha: '2023-11-25', cliente: 'Logística Integral S.A.', total: 5200.00, vendedor: 'Arq. Elena Soto', status: 'borrador' },
  { id: 5, fecha: '2023-11-26', cliente: 'Metalúrgica Pilar', total: 15400.00, vendedor: 'Ing. Carlos Ruiz', status: 'aceptado' },
  { id: 6, fecha: '2023-11-27', cliente: 'Siderurgia del Sur', total: 98000.00, vendedor: 'Arq. Elena Soto', status: 'entregado' },
  { id: 7, fecha: '2023-11-28', cliente: 'Inversiones Patagónicas', total: 67200.00, vendedor: 'Ing. Carlos Ruiz', status: 'borrador' },
  { id: 8, fecha: '2023-11-29', cliente: 'Distribuidora Centro', total: 31000.00, vendedor: 'Arq. Soto Elena', status: 'aceptado' },
]

const ITEMS_PER_PAGE = 4

/**
 * Dashboard
 * Vista del panel de control principal para seguimiento y gestión de presupuestos.
 */
export default function Dashboard() {
  const [filtroEstado, setFiltroEstado] = useState('todos')
  const [filtroVendedor, setFiltroVendedor] = useState('todos')
  const [paginaActiva, setPaginaActiva] = useState(1)

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    variant: 'info',
    confirmText: 'Confirmar',
    onConfirm: () => {},
  })

  const showConfirm = ({ title, message, variant, confirmText, onConfirm }) => {
    setModalConfig({
      isOpen: true,
      title,
      message,
      variant,
      confirmText,
      onConfirm: () => {
        onConfirm()
        setModalConfig(prev => ({ ...prev, isOpen: false }))
      }
    })
  }

  const handleCloseModal = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }))
  }

  const handleRenewPresupuesto = (p) => {
    showConfirm({
      title: 'Renovar Presupuesto',
      message: `¿Deseas renovar y recalcular el presupuesto número ${p.id} del cliente "${p.cliente}"? Se actualizará la validez y se recalcularán los importes según los costos vigentes de insumos.`,
      variant: 'info',
      confirmText: 'Renovar',
      onConfirm: () => {
        console.log('Renovando presupuesto...', p.id)
      }
    })
  }

  const handleEliminarBorrador = (p) => {
    showConfirm({
      title: 'Eliminar Borrador',
      message: `¿Estás seguro de que deseas eliminar permanentemente el borrador del presupuesto para "${p.cliente}"? Esta acción no se puede deshacer.`,
      variant: 'danger',
      confirmText: 'Eliminar',
      onConfirm: () => {
        console.log('Eliminando borrador...', p.id)
      }
    })
  }

  const handleExportPDF = (p) => {
    showConfirm({
      title: 'Exportar Presupuesto',
      message: `¿Deseas exportar y descargar el presupuesto de "${p.cliente}" en formato PDF clásico monocromático para taller?`,
      variant: 'info',
      confirmText: 'Exportar PDF',
      onConfirm: () => {
        console.log('Exportando PDF...', p.id)
      }
    })
  }

  // Cambiar filtros y resetear la página a la primera
  const handleFiltroEstado = (val) => {
    setFiltroEstado(val)
    setPaginaActiva(1)
  }

  const handleFiltroVendedor = (val) => {
    setFiltroVendedor(val)
    setPaginaActiva(1)
  }

  // Filtrado de presupuestos basado en las selecciones
  const presupuestosFiltrados = PRESUPUESTOS_MOCK.filter((p) => {
    const coincideEstado = filtroEstado === 'todos' || p.status === filtroEstado
    const coincideVendedor = filtroVendedor === 'todos' || p.vendedor === filtroVendedor
    return coincideEstado && coincideVendedor
  })

  // Lógica de paginación
  const totalItems = presupuestosFiltrados.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1
  const paginaActualValida = paginaActiva > totalPages ? 1 : paginaActiva

  const indexInicio = (paginaActualValida - 1) * ITEMS_PER_PAGE
  const indexFin = Math.min(indexInicio + ITEMS_PER_PAGE, totalItems)
  const presupuestosPaginados = presupuestosFiltrados.slice(indexInicio, indexFin)

  // Renderizar la etiqueta de estado usando el componente centralizado StatusBadge
  const renderEstadoBadge = (status) => {
    return <StatusBadge status={status} />
  }

  // Renderizar los botones de acción dinámicos en base al estado del presupuesto
  const renderAcciones = (p) => {
    switch (p.status) {
      case 'aceptado':
        return (
          <div className="flex items-center justify-end gap-1">
            <TableActionButton
              icon={Eye}
              title="Ver presupuesto"
            />
            <TableActionButton
              icon={Download}
              title="Exportar PDF"
              onClick={() => handleExportPDF(p)}
            />
          </div>
        )
      case 'entregado':
        return (
          <div className="flex items-center justify-end gap-1">
            <TableActionButton
              icon={Eye}
              title="Ver presupuesto"
            />
            <TableActionButton
              icon={Pencil}
              title="Editar presupuesto"
            />
          </div>
        )
      case 'vencido':
        return (
          <div className="flex items-center justify-end gap-1">
            <TableActionButton
              icon={Eye}
              title="Ver presupuesto"
            />
            <TableActionButton
              icon={RotateCcw}
              title="Renovar presupuesto"
              onClick={() => handleRenewPresupuesto(p)}
            />
          </div>
        )
      case 'borrador':
        return (
          <div className="flex items-center justify-end gap-1">
            <TableActionButton
              icon={Pencil}
              title="Editar presupuesto"
            />
            <TableActionButton
              icon={Trash2}
              title="Eliminar borrador"
              variant="danger"
              onClick={() => handleEliminarBorrador(p)}
            />
          </div>
        )
      default:
        return null
    }
  }

  // Configuración de las columnas para DataTable (cumple con las alineaciones de extremos e intermedias)
  const columns = [
    { key: 'fecha', label: 'FECHA' },
    { key: 'cliente', label: 'CLIENTE' },
    { key: 'total', label: 'MONTO TOTAL', mono: true },
    { key: 'vendedor', label: 'VENDEDOR' },
    { key: 'estado', label: 'ESTADO' },
    { key: 'acciones', label: 'ACCIONES' },
  ]

  // Mapear presupuestos paginados a filas compatibles con DataTable
  const dataRows = presupuestosPaginados.map((p) => ({
    id: p.id,
    fecha: <span className="font-mono select-all">{p.fecha}</span>,
    cliente: <span className="font-bold leading-snug">{p.cliente}</span>,
    total: formatARS(p.total),
    vendedor: p.vendedor,
    estado: renderEstadoBadge(p.status),
    acciones: renderAcciones(p),
  }))

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
        <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-md shadow-[var(--shadow-card)] px-5 py-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="label-lg text-xs text-on-surface-variant font-semibold tracking-wider uppercase">
              Total Facturado Aceptado
            </span>
            <span className="border border-success/30 text-success bg-success/10 px-1.5 py-0.5 text-xs font-semibold rounded-sm select-none">
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
        <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-md shadow-[var(--shadow-card)] px-5 py-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="label-lg text-xs text-on-surface-variant font-semibold tracking-wider uppercase">
              Presupuestos Entregados
            </span>
            <Send className="text-primary-container" size={16} />
          </div>
          <span className="text-3xl font-extrabold text-on-surface font-mono mono-data tracking-tight select-all">
            14
          </span>
          <span className="text-xs text-on-surface-variant mt-0.5">
            Pendientes de respuesta
          </span>
        </div>

        {/* Tarjeta 3: Presupuestos Vencidos */}
        <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-md shadow-[var(--shadow-card)] px-5 py-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="label-lg text-xs text-on-surface-variant font-semibold tracking-wider uppercase">
              Presupuestos Vencidos
            </span>
            <span className="border border-error/30 text-error bg-error/10 px-1.5 py-0.5 text-xs font-semibold rounded-sm select-none uppercase">
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
      <div className="bg-surface-container-lowest border border-outline-variant/60 px-5 py-3.5 flex items-center gap-6 rounded-sm shadow-[var(--shadow-card)]">
        
        {/* Filtro por Estado */}
        <div className="flex items-center gap-2">
          <span className="label-lg text-xs font-bold text-on-surface-variant uppercase tracking-wider select-none">
            Filtrar por:
          </span>
          <Select
            value={filtroEstado}
            onChange={(e) => handleFiltroEstado(e.target.value)}
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
        <div className="h-6 w-px bg-outline-variant/60" />

        {/* Filtro por Vendedor */}
        <div className="flex items-center gap-2">
          <span className="label-lg text-xs font-bold text-on-surface-variant uppercase tracking-wider select-none">
            Vendedor:
          </span>
          <Select
            value={filtroVendedor}
            onChange={(e) => handleFiltroVendedor(e.target.value)}
            className="min-w-[160px] !py-1.5"
          >
            <option value="todos">Todos</option>
            <option value="Ing. Carlos Ruiz">Ing. Carlos Ruiz</option>
            <option value="Arq. Elena Soto">Arq. Elena Soto</option>
          </Select>
        </div>

      </div>

      {/* Tabla Industrial de Presupuestos */}
      <div className="flex flex-col">
        <DataTable
          columns={columns}
          rows={dataRows}
          emptyMessage="No hay presupuestos que coincidan con los filtros seleccionados."
        />

        {/* Fila de Paginación Industrial Reutilizable */}
        {totalItems > 0 && (
          <TablePagination
            currentPage={paginaActualValida}
            totalPages={totalPages}
            onPageChange={setPaginaActiva}
            totalItems={totalItems}
            showingStart={indexInicio + 1}
            showingEnd={indexFin}
          />
        )}
      </div>

      {/* Modal de confirmación global para el Dashboard */}
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        variant={modalConfig.variant}
        confirmText={modalConfig.confirmText}
        onConfirm={modalConfig.onConfirm}
        onCancel={handleCloseModal}
      />
    </div>
  )
}
