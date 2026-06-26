import { useState } from 'react'
import { Plus, Send, Eye, Download, Pencil, RotateCcw, Trash2 } from 'lucide-react'
import { Button, PageHeader, Select, StatusBadge, ConfirmationModal } from '../components/ui'
import { DataTable, TableActionButton, TablePagination } from '../components/table'
import { formatARS } from '../utils/currencyFormatters'
import useNavigationStore from '../stores/navigationStore'
import useDataStore from '../stores/dataStore'

const ITEMS_PER_PAGE = 4

/**
 * Dashboard
 * Vista del panel de control principal para seguimiento y gestión de presupuestos.
 * Datos provistos por MOCK_PRESUPUESTOS (src/data/presupuestos.js).
 * Todos los montos son total_centavos (INTEGER) — SAFE MONEY.
 */
export default function Dashboard() {
  const setVista = useNavigationStore((state) => state.setVista)
  const { presupuestos } = useDataStore()

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
      message: `¿Deseas renovar y recalcular el presupuesto N° ${p.id} del cliente "${p.cliente_nombre}"? Se actualizará la validez y se recalcularán los importes según los costos vigentes de insumos.`,
      variant: 'info',
      confirmText: 'Renovar',
      onConfirm: () => {
        // En prod: invoke('renovar_presupuesto', { id: p.id })
      }
    })
  }

  const handleEliminarBorrador = (p) => {
    showConfirm({
      title: 'Eliminar Borrador',
      message: `¿Estás seguro de que deseas eliminar permanentemente el borrador del presupuesto para "${p.cliente_nombre}"? Esta acción no se puede deshacer.`,
      variant: 'danger',
      confirmText: 'Eliminar',
      onConfirm: () => {
        // En prod: invoke('eliminar_presupuesto', { id: p.id })
      }
    })
  }

  const handleExportPDF = (p) => {
    showConfirm({
      title: 'Exportar Presupuesto',
      message: `¿Deseas exportar y descargar el presupuesto de "${p.cliente_nombre}" en formato PDF monocromático para taller?`,
      variant: 'info',
      confirmText: 'Exportar PDF',
      onConfirm: async () => {
        // En prod real se debería hacer un invoke('get_presupuesto', { id })
        // Por ahora construimos un objeto compatible con lo que tenemos
        const presupuestoData = {
          nombreCliente: p.cliente_nombre,
          fecha_emision: p.fecha_emision,
          descripcionGeneral: `Presupuesto N° ${p.id} - ${p.estado.toUpperCase()}`,
          productRows: [
            {
              product_id: 'generico', // Si no tenemos ID real
              quantity: 1,
              unit_price_centavos: p.total_centavos
            }
          ],
          subtotalCentavos: p.total_centavos,
          manoDeObraCentavos: 0,
          totalCentavos: p.total_centavos,
          observaciones: `Vendedor: ${p.vendedor_nombre}`
        }

        // Para evitar fallos en el find() del catálogo, pasamos un catálogo con el ítem genérico
        const catalogMock = [{ id: 'generico', nombre: 'Presupuesto Completo (Resumen)' }]
        
        const { generateAndSavePresupuestoPDF } = await import('../utils/pdfGenerator')
        const result = await generateAndSavePresupuestoPDF(presupuestoData, catalogMock)
        
        if (result.success) {
          showConfirm({
            title: 'Exportación Exitosa',
            message: `El PDF se guardó correctamente.`,
            variant: 'success',
            confirmText: 'Aceptar',
            onConfirm: () => {}
          })
        } else if (!result.cancelled) {
          showConfirm({
            title: 'Error de Exportación',
            message: 'Ocurrió un error al intentar guardar el PDF.',
            variant: 'danger',
            confirmText: 'Aceptar',
            onConfirm: () => {}
          })
        }
      }
    })
  }

  // Cambiar filtros y resetear la paginación
  const handleFiltroEstado = (val) => {
    setFiltroEstado(val)
    setPaginaActiva(1)
  }

  const handleFiltroVendedor = (val) => {
    setFiltroVendedor(val)
    setPaginaActiva(1)
  }

  // Construir lista dinámica de vendedores únicos desde el store
  const vendedoresUnicos = [...new Set(presupuestos.map(p => p.vendedor_nombre))]

  // Filtrado local
  const presupuestosFiltrados = presupuestos.filter(p => {
    const matchEstado = filtroEstado === 'todos' || p.estado === filtroEstado
    const matchVendedor = filtroVendedor === 'todos' || p.vendedor_nombre === filtroVendedor
    // Excluir plantillas, solo presupuestos emitidos o borradores
    const noEsPlantilla = !p.es_plantilla
    return matchEstado && matchVendedor && noEsPlantilla
  })

  // Métricas calculadas dinámicamente desde los mocks (centavos enteros)
  const totalAceptadoCentavos = presupuestos
    .filter(p => p.estado === 'aceptado')
    .reduce((acc, p) => acc + p.total_centavos, 0)

  const cantidadEntregados = presupuestos.filter(p => p.estado === 'entregado').length
  const cantidadVencidos = presupuestos.filter(p => p.estado === 'vencido').length

  // Lógica de paginación
  const totalItems = presupuestosFiltrados.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1
  const paginaActualValida = paginaActiva > totalPages ? 1 : paginaActiva
  const indexInicio = (paginaActualValida - 1) * ITEMS_PER_PAGE
  const indexFin = Math.min(indexInicio + ITEMS_PER_PAGE, totalItems)
  const presupuestosPaginados = presupuestosFiltrados.slice(indexInicio, indexFin)

  const renderEstadoBadge = (estado) => <StatusBadge status={estado} />

  // Renderizar botones de acción dinámicos según estado
  const renderAcciones = (p) => {
    switch (p.estado) {
      case 'aceptado':
        return (
          <div className="flex items-center justify-end gap-1">
            <TableActionButton icon={Eye} title="Ver presupuesto" />
            <TableActionButton icon={Download} title="Exportar PDF" onClick={() => handleExportPDF(p)} />
          </div>
        )
      case 'entregado':
        return (
          <div className="flex items-center justify-end gap-1">
            <TableActionButton icon={Eye} title="Ver presupuesto" />
            <TableActionButton icon={Pencil} title="Editar presupuesto" />
          </div>
        )
      case 'vencido':
        return (
          <div className="flex items-center justify-end gap-1">
            <TableActionButton icon={Eye} title="Ver presupuesto" />
            <TableActionButton icon={RotateCcw} title="Renovar presupuesto" onClick={() => handleRenewPresupuesto(p)} />
          </div>
        )
      case 'borrador':
        return (
          <div className="flex items-center justify-end gap-1">
            <TableActionButton icon={Pencil} title="Editar presupuesto" />
            <TableActionButton icon={Trash2} title="Eliminar borrador" variant="danger" onClick={() => handleEliminarBorrador(p)} />
          </div>
        )
      default:
        return null
    }
  }

  // Columnas de la tabla
  const columns = [
    { key: 'fecha_emision', label: 'FECHA' },
    { key: 'cliente_nombre', label: 'CLIENTE' },
    { key: 'total_centavos', label: 'MONTO TOTAL', mono: true },
    { key: 'vendedor_nombre', label: 'VENDEDOR' },
    { key: 'estado', label: 'ESTADO' },
    { key: 'acciones', label: 'ACCIONES' },
  ]

  // Mapear presupuestos paginados a filas compatibles con DataTable
  const dataRows = presupuestosPaginados.map((p) => ({
    id: p.id,
    fecha_emision: <span className="font-mono select-all">{p.fecha_emision}</span>,
    cliente_nombre: <span className="font-bold leading-snug">{p.cliente_nombre}</span>,
    // formatARS recibe centavos — SAFE MONEY
    total_centavos: formatARS(p.total_centavos),
    vendedor_nombre: p.vendedor_nombre,
    estado: renderEstadoBadge(p.estado),
    acciones: renderAcciones(p),
  }))

  return (
    <div className="p-6 flex flex-col gap-4">
      {/* Cabecera superior principal */}
      <PageHeader
        title="Panel de Presupuestos"
        subtitle="Historial y seguimiento comercial del taller"
      >
        <Button
          variant="primary"
          size="md"
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setVista('creador')}
        >
          <Plus size={16} />
          Nuevo Presupuesto
        </Button>
      </PageHeader>

      {/* Grid de Tarjetas de Métricas Rápidas — valores calculados dinámicamente */}
      <div className="grid grid-cols-3 gap-6">

        {/* Tarjeta 1: Total Aceptado */}
        <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-md shadow-card px-5 py-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="label-lg text-xs text-on-surface-variant font-semibold tracking-wider uppercase">
              Total Facturado Aceptado
            </span>
            <span className="border border-success/30 text-success bg-success/10 px-1.5 py-0.5 text-xs font-semibold rounded-sm select-none">
              Año actual
            </span>
          </div>
          <span className="text-3xl font-extrabold text-on-surface font-mono mono-data tracking-tight select-all">
            {/* formatARS recibe centavos — SAFE MONEY */}
            {formatARS(totalAceptadoCentavos)}
          </span>
          <span className="text-xs text-on-surface-variant mt-0.5">
            Suma de presupuestos aceptados
          </span>
        </div>

        {/* Tarjeta 2: Presupuestos Entregados */}
        <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-md shadow-card px-5 py-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="label-lg text-xs text-on-surface-variant font-semibold tracking-wider uppercase">
              Presupuestos Entregados
            </span>
            <Send className="text-primary-container" size={16} />
          </div>
          <span className="text-3xl font-extrabold text-on-surface font-mono mono-data tracking-tight select-all">
            {cantidadEntregados}
          </span>
          <span className="text-xs text-on-surface-variant mt-0.5">
            Pendientes de respuesta del cliente
          </span>
        </div>

        {/* Tarjeta 3: Presupuestos Vencidos */}
        <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-md shadow-card px-5 py-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="label-lg text-xs text-on-surface-variant font-semibold tracking-wider uppercase">
              Presupuestos Vencidos
            </span>
            <span className="border border-error/30 text-error bg-error/10 px-1.5 py-0.5 text-xs font-semibold rounded-sm select-none uppercase">
              Crítico
            </span>
          </div>
          <span className="text-3xl font-extrabold text-on-surface font-mono mono-data tracking-tight select-all">
            {cantidadVencidos}
          </span>
          <span className="text-xs text-on-surface-variant mt-0.5">
            Requieren seguimiento inmediato
          </span>
        </div>

      </div>

      {/* Barra de Filtros */}
      <div className="bg-surface-container-lowest border border-outline-variant/60 px-5 py-3.5 flex items-center gap-6 rounded-sm shadow-card">

        {/* Filtro por Estado */}
        <div className="flex items-center gap-2">
          <span className="label-lg text-xs font-bold text-on-surface-variant uppercase tracking-wider select-none">
            Filtrar por:
          </span>
          <Select
            value={filtroEstado}
            onChange={(e) => handleFiltroEstado(e.target.value)}
            className="min-w-[160px]"
          >
            <option value="todos">Todos los Estados</option>
            <option value="aceptado">Aceptado</option>
            <option value="entregado">Entregado</option>
            <option value="vencido">Vencido</option>
            <option value="borrador">Borrador</option>
          </Select>
        </div>

        {/* Separador vertical */}
        <div className="h-6 w-px bg-outline-variant/60" />

        {/* Filtro por Vendedor — construido dinámicamente desde el mock */}
        <div className="flex items-center gap-2">
          <span className="label-lg text-xs font-bold text-on-surface-variant uppercase tracking-wider select-none">
            Vendedor:
          </span>
          <Select
            value={filtroVendedor}
            onChange={(e) => handleFiltroVendedor(e.target.value)}
            className="min-w-[180px]"
          >
            <option value="todos">Todos</option>
            {vendedoresUnicos.map(v => (
              <option key={v} value={v}>{v}</option>
            ))}
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

      {/* Modal de confirmación global */}
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
