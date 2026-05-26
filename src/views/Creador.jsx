import { useState } from 'react'
import { Save, FileDown, Plus } from 'lucide-react'
import { Button, Card, PageHeader, Input, Divider, Select, Textarea, ConfirmationModal, SearchableSelect } from '../components/ui'
import ProductsTable from '../components/table/ProductsTable'
import { formatARS } from '../utils/currencyFormatters'
import { MOCK_CATALOGO, MOCK_EMPLEADOS, MOCK_PLANTILLAS } from '../data'

/**
 * Creador de Presupuestos
 * Formulario de cotización con secciones A-D estructuradas.
 *
 * SAFE MONEY: todas las filas de producto usan unit_price_centavos (INTEGER).
 * Los cálculos de subtotal operan sobre centavos enteros sin punto flotante.
 *
 * Datos de catálogo, empleados y plantillas provienen de src/data/ (centralizados).
 * En prod: se reemplaza el estado inicial por invoke() correspondiente.
 */
export default function Creador() {
  // Fila inicial con campo snake_case — coincide con el futuro struct ItemPresupuesto
  const [productRows, setProductRows] = useState([
    { id: crypto.randomUUID(), product_id: '', quantity: 1, unit_price_centavos: 0 }
  ])

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    variant: 'info',
    confirmText: 'Confirmar',
    onConfirm: () => { },
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

  const handleAddProductRow = () => {
    setProductRows(prev => [
      ...prev,
      { id: crypto.randomUUID(), product_id: '', quantity: 1, unit_price_centavos: 0 }
    ])
  }

  // Al seleccionar un producto, asignar unit_price_centavos desde el catálogo
  const handleProductChange = (rowId, newProductId) => {
    const producto = MOCK_CATALOGO.find(p => p.id === newProductId)
    // precio_centavos: INTEGER desde el mock/SQLite — SAFE MONEY
    const precio = producto ? producto.precio_centavos : 0
    setProductRows(prev => prev.map(row =>
      row.id === rowId ? { ...row, product_id: newProductId, unit_price_centavos: precio } : row
    ))
  }

  const handleQuantityChange = (rowId, newQuantityStr) => {
    let parsed = parseInt(newQuantityStr, 10)
    if (isNaN(parsed) || parsed < 1) parsed = 1
    setProductRows(prev => prev.map(row =>
      row.id === rowId ? { ...row, quantity: parsed } : row
    ))
  }

  const handleDeleteProductRow = (rowId) => {
    showConfirm({
      title: 'Eliminar producto',
      message: '¿Estás seguro de que deseas quitar este producto o servicio del presupuesto actual?',
      variant: 'danger',
      confirmText: 'Eliminar',
      onConfirm: () => {
        setProductRows(prev => prev.filter(row => row.id !== rowId))
      }
    })
  }

  const handleSaveTemplate = () => {
    showConfirm({
      title: 'Guardar como plantilla',
      message: '¿Deseas guardar la configuración de ítems frecuentes de este presupuesto como una plantilla reutilizable?',
      variant: 'success',
      confirmText: 'Guardar plantilla',
      onConfirm: () => {
        // En prod: invoke('guardar_plantilla', { items: productRows })
      }
    })
  }

  const handleSaveDraft = () => {
    showConfirm({
      title: 'Guardar borrador',
      message: '¿Deseas guardar el estado actual de este presupuesto como un borrador?',
      variant: 'info',
      confirmText: 'Guardar borrador',
      onConfirm: () => {
        // En prod: invoke('guardar_borrador', { presupuesto })
      }
    })
  }

  const handleExportPDF = () => {
    showConfirm({
      title: 'Exportar presupuesto',
      message: '¿Deseas generar y descargar el reporte del presupuesto en formato PDF monocromático para taller?',
      variant: 'info',
      confirmText: 'Exportar PDF',
      onConfirm: () => {
        // En prod: lógica jsPDF + jspdf-autotable
      }
    })
  }

  // SAFE MONEY: operación entera centavos × cantidad — sin punto flotante
  const subtotalCentavos = productRows.reduce(
    (acc, row) => acc + row.unit_price_centavos * row.quantity,
    0
  )
  const totalCentavos = subtotalCentavos // Sin modificadores por ahora

  // Deshabilitar botones si el total es 0 centavos
  const isTotalEmpty = totalCentavos === 0

  const isLastRowEmpty = productRows.length > 0 && productRows[productRows.length - 1].product_id === ''

  // Solo empleados activos (activo = 1) en el selector
  const empleadosActivos = MOCK_EMPLEADOS.filter(e => e.activo === 1)

  // Estado de la plantilla seleccionada
  const [selectedTemplate, setSelectedTemplate] = useState('')

  return (
    <div className="p-6 flex flex-col gap-4">

      {/* Cabecera con selector de plantilla e ID */}
      <PageHeader
        title="Creador de Presupuestos"
        subtitle="Completá los datos del cliente y los ítems del trabajo"
      >
        <div className="flex items-center gap-4">
          {/* Selector de Plantilla — desde MOCK_PLANTILLAS centralizado */}
          <div className="flex items-center gap-2">
            <span className="label-lg text-xs font-bold text-on-surface-variant uppercase tracking-wider select-none shrink-0">
              Plantilla:
            </span>
            <SearchableSelect
              className="min-w-[240px]"
              placeholder="Sin plantilla"
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              options={[
                { value: '', label: 'Sin plantilla' },
                ...MOCK_PLANTILLAS.map(t => ({ value: t.id, label: t.nombre }))
              ]}
            />
          </div>

          {/* Separador */}
          <div className="h-6 w-px bg-outline-variant/60" />

          {/* ID de Presupuesto */}
          <div className="flex items-center gap-2">
            <span className="label-lg text-xs font-bold text-on-surface-variant uppercase tracking-wider select-none shrink-0">
              ID:
            </span>
            <span className="px-3 py-1.5 bg-surface-container-low/60 border border-outline-variant/60 text-sm font-mono font-bold text-on-surface select-all rounded-sm">
              PRE-2024-0001
            </span>
          </div>
        </div>
      </PageHeader>

      {/* Secciones del formulario */}
      <div className="flex flex-col gap-8">

        {/* Sección A — Datos del cliente */}
        <Card title="Datos del Cliente">
          <div className="grid grid-cols-4 gap-4">
            <Input label="Nombre" placeholder="Nombre del cliente" />
            <Input label="Teléfono" placeholder="+54 911 0000 0000" type="tel" />
            <Input label="Email" placeholder="correo@ejemplo.com" type="email" />
            <Input label="Localidad" placeholder="Pilar, Buenos Aires" />
          </div>
        </Card>

        {/* Sección B — Descripción General del presupuesto */}
        <Card title="Descripción General">
          <Textarea
            placeholder="Ej: Fabricación e instalación de portón levadizo reforzado y rejas frontales..."
            className="w-full"
            rows={3}
            maxLength={250}
            showCounter={true}
          />
        </Card>

        {/* Sección C — Selección de Productos y Servicios */}
        <Card
          title="Selección de Productos y Servicios"
          headerActions={
            <Button
              variant="secondary"
              size="sm"
              onClick={handleAddProductRow}
              disabled={isLastRowEmpty}
              className="flex items-center gap-1.5 cursor-pointer"
            >
              <Plus size={16} />
              Añadir Fila
            </Button>
          }
        >
          <ProductsTable
            rows={productRows}
            onProductChange={handleProductChange}
            onQuantityChange={handleQuantityChange}
            onDeleteRow={handleDeleteProductRow}
          />
        </Card>

        {/* Sección D — Personalización y Modificaciones */}
        <Card title="Personalización y Modificaciones">
          <div className="grid grid-cols-3 gap-4">
            <Input label="Kg extras de hierro" placeholder="0" numericMode="decimal" maxLength={6} />
            <Input label="Horas soldadura extra" placeholder="0" numericMode="integer" maxLength={4} />
            <Input label="Herrajes especiales" placeholder="Descripción" />
          </div>
        </Card>

        {/* Sección D — Control y Logística */}
        <Card title="Control y Logística">
          <div className="grid grid-cols-2 gap-4">
            {/* Selector de vendedor — solo activos desde MOCK_EMPLEADOS centralizado */}
            <Select label="Vendedor" defaultValue="">
              <option value="" disabled>Seleccionar vendedor...</option>
              {empleadosActivos.map(e => (
                <option key={e.id} value={e.id}>{e.nombre}</option>
              ))}
            </Select>
            <Textarea
              label="Observaciones"
              placeholder="Notas internas para el PDF..."
              rows={3}
              maxLength={200}
              showCounter={true}
            />
          </div>
        </Card>

      </div>

      {/* Barra de Totales y Acciones Inferior */}
      <div className="flex items-center justify-between gap-6 bg-surface-container-lowest border border-outline-variant/60 p-4 rounded-md shadow-raised">

        {/* Resumen de totales — formatARS recibe centavos */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-start">
            <span className="label-md text-on-surface-variant uppercase">Subtotal Ítems</span>
            <span className="mono-data text-on-surface font-bold">{formatARS(subtotalCentavos)}</span>
          </div>
          <Divider orientation="vertical" className="h-10" />
          <div className="flex flex-col items-start">
            <span className="label-md text-on-surface-variant uppercase">Modificadores</span>
            <span className="mono-data text-on-surface font-bold">{formatARS(0)}</span>
          </div>
          <Divider orientation="vertical" className="h-10" />
          <div className="flex flex-col items-start">
            <span className="label-md text-on-surface uppercase">Total</span>
            <span className="text-lg font-bold mono-data text-primary leading-tight">{formatARS(totalCentavos)}</span>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="md" disabled={isTotalEmpty} onClick={handleSaveTemplate}>
            <Save size={15} />
            Guardar Plantilla
          </Button>
          <Button variant="secondary" size="md" disabled={isTotalEmpty} onClick={handleSaveDraft}>
            <Save size={15} />
            Guardar Borrador
          </Button>
          <Button variant="primary" size="md" disabled={isTotalEmpty} onClick={handleExportPDF}>
            <FileDown size={15} />
            Exportar PDF
          </Button>
        </div>

      </div>

      {/* Modal de confirmación */}
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
