import { useState } from 'react'
import { Save, FileDown, Plus } from 'lucide-react'
import { Button, Card, PageHeader, Input, Divider, Select, Textarea } from '../components/ui'
import ProductsTable, { CATALOGO_PRODUCTOS } from '../components/table/ProductsTable'
import { formatARS } from '../utils/currencyFormatters'

// Vista del creador de presupuestos con secciones estructuradas y barra inferior unificada
export default function Creador() {
  const [productRows, setProductRows] = useState([
    { id: crypto.randomUUID(), productId: '', quantity: 1, unitPrice: 0 }
  ]);

  const handleAddProductRow = () => {
    setProductRows(prev => [
      ...prev,
      { id: crypto.randomUUID(), productId: '', quantity: 1, unitPrice: 0 }
    ]);
  };

  const handleProductChange = (rowId, newProductId) => {
    const producto = CATALOGO_PRODUCTOS.find(p => p.id === newProductId);
    const precio = producto ? producto.precio : 0;
    setProductRows(prev => prev.map(row =>
      row.id === rowId ? { ...row, productId: newProductId, unitPrice: precio } : row
    ));
  };

  const handleQuantityChange = (rowId, newQuantityStr) => {
    let parsed = parseInt(newQuantityStr, 10);
    if (isNaN(parsed) || parsed < 1) parsed = 1;
    setProductRows(prev => prev.map(row =>
      row.id === rowId ? { ...row, quantity: parsed } : row
    ));
  };

  const handleDeleteProductRow = (rowId) => {
    setProductRows(prev => prev.filter(row => row.id !== rowId));
  };

  const subtotalItems = productRows.reduce((sum, row) => sum + (row.unitPrice * row.quantity), 0);
  const total = subtotalItems; // Por ahora sin modificadores
  const isLastRowEmpty = productRows.length > 0 && productRows[productRows.length - 1].productId === '';

  return (
    <div className="p-6 flex flex-col gap-4">

      {/* Cabecera de la vista con zona de acciones superiores integradas */}
      <PageHeader
        title="Creador de Presupuestos"
        subtitle="Completá los datos del cliente y los ítems del trabajo"
      >
        <div className="flex items-center gap-4">
          {/* Selección de Plantilla */}
          <div className="flex items-center gap-2">
            <span className="label-lg text-xs font-bold text-on-surface-variant uppercase tracking-wider select-none shrink-0">
              Plantilla:
            </span>
            <Select
              className="min-w-[180px] !py-1.5"
              defaultValue=""
            >
              <option value="">Sin plantilla</option>
              <option value="reja-estandar">Presupuesto Rejas Estándar</option>
              <option value="porton-herreria">Presupuesto Portón Herrería</option>
              <option value="baranda-seguridad">Presupuesto Baranda Seguridad</option>
            </Select>
          </div>

          {/* Separador vertical de cabecera */}
          <div className="h-6 w-px bg-outline-variant/60" />

          {/* ID de Presupuesto */}
          <div className="flex items-center gap-2">
            <span className="label-lg text-xs font-bold text-on-surface-variant uppercase tracking-wider select-none shrink-0">
              ID:
            </span>
            <span className="px-3 py-1.5 bg-surface-container-low/60 border border-outline-variant/60 text-sm font-mono font-bold text-on-surface select-all rounded-sm select-none">
              PRE-2026-0001
            </span>
          </div>
        </div>
      </PageHeader>

      {/* Flujo vertical de secciones principales de ancho completo */}
      <div className="flex flex-col gap-8">

        {/* Sección A — Datos del cliente en una sola fila */}
        <Card title="Datos del Cliente">
          <div className="grid grid-cols-4 gap-4">
            <Input label="Nombre" placeholder="Nombre del cliente" />
            <Input label="Teléfono" placeholder="+54 911 0000 0000" type="tel" />
            <Input label="Email" placeholder="correo@ejemplo.com" type="email" />
            <Input label="Localidad" placeholder="Pilar, Buenos Aires" />
          </div>
        </Card>

        {/* Sección B — Selección de Productos y Servicios */}
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
          <div className="flex flex-col gap-4">
            <Textarea
              label="Descripción General"
              placeholder="Ej: Fabricación e instalación de portón levadizo reforzado y rejas frontales..."
              className="w-full"
              rows={2}
              maxLength={250}
              showCounter={true}
            />
            <ProductsTable
              rows={productRows}
              onProductChange={handleProductChange}
              onQuantityChange={handleQuantityChange}
              onDeleteRow={handleDeleteProductRow}
            />
          </div>
        </Card>

        {/* Sección C — Personalización y Modificaciones */}
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
            <Select
              label="Vendedor"
              className="w-full bg-surface-container-lowest focus:border-primary-container"
              defaultValue=""
            >
              <option value="" disabled>Seleccionar vendedor</option>
              <option value="juan-perez">Juan Pérez</option>
              <option value="maria-gomez">María Gómez</option>
              <option value="carlos-rodriguez">Carlos Rodríguez</option>
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

      {/* Barra de Totales y Acciones Inferior en una sola fila */}
      <div className="flex items-center justify-between gap-6 bg-surface-container-lowest border border-outline-variant/60 p-4 rounded-md shadow-[var(--shadow-raised)]">

        {/* Resumen de totales a la izquierda */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-start">
            <span className="label-md text-on-surface-variant uppercase">Subtotal Ítems</span>
            <span className="mono-data text-on-surface font-bold">{formatARS(subtotalItems)}</span>
          </div>
          <Divider orientation="vertical" className="h-10" />
          <div className="flex flex-col items-start">
            <span className="label-md text-on-surface-variant uppercase">Modificadores</span>
            <span className="mono-data text-on-surface font-bold">{formatARS(0)}</span>
          </div>
          <Divider orientation="vertical" className="h-10" />
          <div className="flex flex-col items-start">
            <span className="label-md text-on-surface uppercase">Total</span>
            <span className="text-lg font-bold mono-data text-primary leading-tight">{formatARS(total)}</span>
          </div>
        </div>

        {/* Acciones principales a la derecha */}
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="md" disabled={total === 0}>
            <Save size={15} />
            Guardar Plantilla
          </Button>
          <Button variant="secondary" size="md" disabled={total === 0}>
            <Save size={15} />
            Guardar Borrador
          </Button>
          <Button variant="primary" size="md" disabled={total === 0}>
            <FileDown size={15} />
            Exportar PDF
          </Button>
        </div>

      </div>

    </div>
  )
}
