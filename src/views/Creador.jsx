import { useState } from 'react'
import { Save, FileDown, Plus, RotateCcw } from 'lucide-react'
import { Button, Card, PageHeader, Input, Divider, Select, Textarea, ConfirmationModal, SearchableSelect, TemplateFormModal } from '../components/ui'
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
  // --- Estados controlados del formulario ---
  const [nombreCliente, setNombreCliente] = useState('')
  const [telefonoCliente, setTelefonoCliente] = useState('')
  const [emailCliente, setEmailCliente] = useState('')
  const [localidadCliente, setLocalidadCliente] = useState('')

  const [manoDeObraCentavos, setManoDeObraCentavos] = useState(0)
  const [manoDeObraPesosText, setManoDeObraPesosText] = useState('')

  // Manejador del costo de la mano de obra con soporte decimal y Safe Money
  const handleManoDeObraChange = (e) => {
    const text = e.target.value
    setManoDeObraPesosText(text)

    // Normalizar coma por punto para el parseado matemático
    const normalizedText = text.replace(',', '.')
    const pesosFloat = parseFloat(normalizedText)
    if (!isNaN(pesosFloat) && pesosFloat >= 0) {
      setManoDeObraCentavos(Math.round(pesosFloat * 100))
    } else {
      setManoDeObraCentavos(0)
    }
  }

  const [vendedorId, setVendedorId] = useState('')
  const [observaciones, setObservaciones] = useState('')

  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false)

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

  // Fila inicial con campo snake_case — coincide con el futuro struct ItemPresupuesto
  const [productRows, setProductRows] = useState([
    { id: crypto.randomUUID(), product_id: '', quantity: 1, unit_price_centavos: 0 }
  ])

  const handleSaveTemplate = () => {
    setIsTemplateModalOpen(true)
  }

  const handleSaveTemplateConfirm = (nombrePlantilla) => {
    const nuevaPlantilla = {
      id: `tmpl-${crypto.randomUUID()}`,
      nombre: nombrePlantilla,
      descripcion_general: descripcionGeneral,
      mano_de_obra_centavos: manoDeObraCentavos, // Persistencia de la mano de obra en plantilla
      items: productRows.filter(row => row.product_id !== '').map(row => ({
        product_id: row.product_id,
        quantity: row.quantity,
        unit_price_centavos: row.unit_price_centavos
      }))
    }
    MOCK_PLANTILLAS.push(nuevaPlantilla)
    setSelectedTemplate(nuevaPlantilla.id)
    setIsTemplateModalOpen(false)

    showConfirm({
      title: 'Plantilla Guardada',
      message: `La plantilla "${nombrePlantilla}" ha sido creada exitosamente con los ítems y descripción del formulario actual.`,
      variant: 'success',
      confirmText: 'Aceptar',
      onConfirm: () => {}
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
  // Suma exacta en centavos de los materiales y la mano de obra
  const totalCentavos = subtotalCentavos + manoDeObraCentavos

  // Deshabilitar botones si el total es 0 centavos
  const isTotalEmpty = totalCentavos === 0

  const isLastRowEmpty = productRows.length > 0 && productRows[productRows.length - 1].product_id === ''

  // Solo empleados activos (activo = 1) en el selector
  const empleadosActivos = MOCK_EMPLEADOS.filter(e => e.activo === 1)

  // Estado de la plantilla seleccionada
  const [selectedTemplate, setSelectedTemplate] = useState('')

  // Estado para la descripción general del presupuesto
  const [descripcionGeneral, setDescripcionGeneral] = useState('')

  // Manejador de cambio de plantilla: autopopula la grilla interactiva y el textarea en caliente
  const handleTemplateChange = (e) => {
    const templateId = e.target.value
    setSelectedTemplate(templateId)

    if (!templateId) {
      // Limpiar grilla a una fila vacía estándar y limpiar descripción y mano de obra
      setProductRows([
        { id: crypto.randomUUID(), product_id: '', quantity: 1, unit_price_centavos: 0 }
      ])
      setDescripcionGeneral('')
      setManoDeObraCentavos(0)
      setManoDeObraPesosText('')
      return
    }

    // Buscar plantilla en los mocks locales
    const template = MOCK_PLANTILLAS.find(t => t.id === templateId)
    if (template) {
      // Cargar descripción general correspondiente
      setDescripcionGeneral(template.descripcion_general || '')

      // Cargar mano de obra si está definida en la plantilla
      if (template.mano_de_obra_centavos !== undefined && template.mano_de_obra_centavos !== null) {
        setManoDeObraCentavos(template.mano_de_obra_centavos)
        const pesosFloat = template.mano_de_obra_centavos / 100
        setManoDeObraPesosText(pesosFloat > 0 ? pesosFloat.toString().replace('.', ',') : '')
      } else {
        setManoDeObraCentavos(0)
        setManoDeObraPesosText('')
      }

      if (template.items) {
        // Inyectar en bloque los ítems de la plantilla — Safe Money (centavos enteros)
        setProductRows(template.items.map(item => ({
          id: crypto.randomUUID(),
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price_centavos: item.unit_price_centavos
        })))
      }
    }
  }

  // Actualizar plantilla en caliente localmente con comparador quirúrgico
  const handleUpdateTemplate = () => {
    if (!selectedTemplate) return
    const index = MOCK_PLANTILLAS.findIndex(t => t.id === selectedTemplate)
    if (index === -1) return

    const plantillaPrevia = MOCK_PLANTILLAS[index]
    const prevItems = plantillaPrevia.items || []
    const currentItems = productRows.filter(row => row.product_id !== '')

    const cambiosDetectados = []

    // 1. Detectar materiales eliminados o con cantidad modificada
    prevItems.forEach(prev => {
      const curr = currentItems.find(c => c.product_id === prev.product_id)
      const producto = MOCK_CATALOGO.find(p => p.id === prev.product_id)
      const nombreProd = producto ? producto.nombre : prev.product_id

      if (!curr) {
        cambiosDetectados.push(`Se quitó el material/servicio: "${nombreProd}"`)
      } else if (curr.quantity !== prev.quantity) {
        cambiosDetectados.push(`Se modificó la cantidad de "${nombreProd}": ${prev.quantity} -> ${curr.quantity}`)
      }
    })

    // 2. Detectar materiales agregados nuevos
    currentItems.forEach(curr => {
      const prev = prevItems.find(p => p.product_id === curr.product_id)
      const producto = MOCK_CATALOGO.find(p => p.id === curr.product_id)
      const nombreProd = producto ? producto.nombre : curr.product_id

      if (!prev) {
        cambiosDetectados.push(`Se agregó el material/servicio: "${nombreProd}" (Cantidad: ${curr.quantity})`)
      }
    })

    // 3. Detectar cambios en la descripción general
    const prevDesc = plantillaPrevia.descripcion_general || ''
    const currentDesc = descripcionGeneral || ''
    if (prevDesc.trim() !== currentDesc.trim()) {
      if (!prevDesc.trim() && currentDesc.trim()) {
        cambiosDetectados.push('Se agregó la descripción general a la plantilla')
      } else if (prevDesc.trim() && !currentDesc.trim()) {
        cambiosDetectados.push('Se quitó la descripción general de la plantilla')
      } else {
        cambiosDetectados.push('Se modificó el texto de la descripción general')
      }
    }

    // 4. Detectar cambios en la mano de obra
    const prevManoObra = plantillaPrevia.mano_de_obra_centavos || 0
    if (prevManoObra !== manoDeObraCentavos) {
      if (prevManoObra === 0 && manoDeObraCentavos > 0) {
        cambiosDetectados.push(`Se agregó el costo de Mano de Obra: ${formatARS(manoDeObraCentavos)}`)
      } else if (prevManoObra > 0 && manoDeObraCentavos === 0) {
        cambiosDetectados.push(`Se eliminó el costo de Mano de Obra: ${formatARS(prevManoObra)}`)
      } else {
        cambiosDetectados.push(`Se modificó el costo de Mano de Obra: ${formatARS(prevManoObra)} -> ${formatARS(manoDeObraCentavos)}`)
      }
    }

    // Contenido del cuerpo del modal
    const bodyContent = cambiosDetectados.length === 0 ? (
      <span>No se registraron cambios entre el formulario actual y el modelo original de la plantilla.</span>
    ) : (
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-on-surface">Se registraron las siguientes modificaciones con respecto a la plantilla original:</span>
        <ul className="list-disc pl-5 text-xs text-on-surface-variant flex flex-col gap-1">
          {cambiosDetectados.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
        <span className="mt-2 text-xs font-semibold text-tertiary">¿Deseas sobreescribir la plantilla con estos cambios de taller?</span>
      </div>
    )

    showConfirm({
      title: 'Actualizar Plantilla',
      message: bodyContent,
      variant: 'warning',
      confirmText: 'Actualizar',
      onConfirm: () => {
        MOCK_PLANTILLAS[index].items = currentItems.map(row => ({
          product_id: row.product_id,
          quantity: row.quantity,
          unit_price_centavos: row.unit_price_centavos
        }))
        MOCK_PLANTILLAS[index].descripcion_general = descripcionGeneral
        MOCK_PLANTILLAS[index].mano_de_obra_centavos = manoDeObraCentavos // Guardar mano de obra actualizada
      }
    })
  }

  // Restablecido absoluto e integral de todo el formulario
  const handleResetForm = () => {
    showConfirm({
      title: 'Restablecer Formulario',
      message: '¿Estás seguro de que deseas limpiar por completo este presupuesto? Se borrarán todos los datos del cliente, la descripción general, las filas de productos y la logística.',
      variant: 'warning',
      confirmText: 'Restablecer Todo',
      onConfirm: () => {
        setSelectedTemplate('')
        setDescripcionGeneral('')
        setProductRows([
          { id: crypto.randomUUID(), product_id: '', quantity: 1, unit_price_centavos: 0 }
        ])
        setNombreCliente('')
        setTelefonoCliente('')
        setEmailCliente('')
        setLocalidadCliente('')
        setManoDeObraCentavos(0)
        setManoDeObraPesosText('')
        setVendedorId('')
        setObservaciones('')
      }
    })
  }

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
              onChange={handleTemplateChange}
              options={[
                { value: '', label: 'Sin plantilla' },
                ...MOCK_PLANTILLAS.map(t => ({ value: t.id, label: t.nombre }))
              ]}
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={handleResetForm}
              className="flex items-center justify-center p-1.5 cursor-pointer shrink-0"
              title="Restablecer presupuesto"
            >
              <RotateCcw size={14} />
            </Button>
          </div>
        </div>
      </PageHeader>

      {/* Secciones del formulario */}
      <div className="flex flex-col gap-8">

        {/* Sección A — Datos del cliente */}
        <Card title="Datos del Cliente">
          <div className="grid grid-cols-4 gap-4">
            <Input label="Nombre" placeholder="Nombre del cliente" value={nombreCliente} onChange={(e) => setNombreCliente(e.target.value)} />
            <Input label="Teléfono" placeholder="+54 911 0000 0000" type="tel" value={telefonoCliente} onChange={(e) => setTelefonoCliente(e.target.value)} />
            <Input label="Email" placeholder="correo@ejemplo.com" type="email" value={emailCliente} onChange={(e) => setEmailCliente(e.target.value)} />
            <Input label="Localidad" placeholder="Pilar, Buenos Aires" value={localidadCliente} onChange={(e) => setLocalidadCliente(e.target.value)} />
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
            value={descripcionGeneral}
            onChange={(e) => setDescripcionGeneral(e.target.value)}
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

        {/* Sección D — Mano de Obra */}
        <Card title="Mano de Obra">
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Costo Mano de Obra ($)"
              placeholder="0,00"
              value={manoDeObraPesosText}
              onChange={handleManoDeObraChange}
              numericMode="decimal"
              maxLength={12}
            />
          </div>
        </Card>

        {/* Sección D — Control y Logística */}
        <Card title="Control y Logística">
          <div className="grid grid-cols-2 gap-4">
            {/* Selector de vendedor — solo activos desde MOCK_EMPLEADOS centralizado */}
            <Select label="Vendedor" value={vendedorId} onChange={(e) => setVendedorId(e.target.value)}>
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
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
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
            <span className="label-md text-on-surface-variant uppercase">Mano de Obra</span>
            <span className="mono-data text-on-surface font-bold">{formatARS(manoDeObraCentavos)}</span>
          </div>
          <Divider orientation="vertical" className="h-10" />
          <div className="flex flex-col items-start">
            <span className="label-md text-on-surface uppercase">Total</span>
            <span className="text-lg font-bold mono-data text-primary leading-tight">{formatARS(totalCentavos)}</span>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-3">
          {selectedTemplate && (
            <Button
              variant="secondary"
              size="md"
              disabled={isTotalEmpty}
              onClick={handleUpdateTemplate}
            >
              <Save size={15} />
              Actualizar Plantilla
            </Button>
          )}
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

      {/* Modal interactivo para capturar el nombre de la nueva plantilla */}
      <TemplateFormModal
        isOpen={isTemplateModalOpen}
        onSave={handleSaveTemplateConfirm}
        onClose={() => setIsTemplateModalOpen(false)}
      />

    </div>
  )
}
