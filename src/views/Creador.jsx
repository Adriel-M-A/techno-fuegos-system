import { Save, FileDown } from 'lucide-react'
import { Button, Card, PageHeader, Input } from '../components/ui'

// Vista del creador de presupuestos — esqueleto con secciones del formulario
export default function Creador() {
  return (
    <div className="p-6 flex flex-col gap-6">

      {/* Cabecera de la vista */}
      <PageHeader
        title="Creador de Presupuestos"
        subtitle="Completá los datos del cliente y los ítems del trabajo"
      >
        <Button variant="secondary" size="md">
          <Save size={15} />
          Guardar Plantilla
        </Button>
        <Button variant="primary" size="md">
          <FileDown size={15} />
          Exportar PDF
        </Button>
      </PageHeader>

      {/* Grid principal de dos columnas */}
      <div className="grid grid-cols-3 gap-6">

        {/* Columna principal (2/3) */}
        <div className="col-span-2 flex flex-col gap-6">

          {/* Sección A — Datos del cliente */}
          <Card title="A — Datos del Cliente">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Nombre" placeholder="Nombre del cliente" />
              <Input label="Teléfono" placeholder="+54 911 0000 0000" type="tel" />
              <Input label="Email" placeholder="correo@ejemplo.com" type="email" />
              <Input label="Localidad" placeholder="Pilar, Buenos Aires" />
            </div>
          </Card>

          {/* Sección B — Ítems del pedido */}
          <Card title="B — Ítems del Trabajo">
            <p className="body-md text-on-surface-variant">
              Los ítems configurables se implementarán en la próxima iteración.
            </p>
          </Card>

          {/* Sección C — Personalización y modificadores */}
          <Card title="C — Personalización y Modificadores">
            <div className="grid grid-cols-3 gap-4">
              <Input label="Kg extras de hierro" placeholder="0" type="number" />
              <Input label="Horas soldadura extra" placeholder="0" type="number" />
              <Input label="Herrajes especiales" placeholder="Descripción" />
            </div>
          </Card>

          {/* Sección D — Control interno */}
          <Card title="D — Control Interno">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Vendedor" placeholder="Seleccionar vendedor" />
              <div className="flex flex-col gap-1">
                <label className="label-md text-on-surface-variant uppercase tracking-wide">
                  Observaciones
                </label>
                <textarea
                  className="w-full px-3 py-2 text-sm text-on-surface bg-surface-container-lowest border border-outline-variant rounded focus:outline-none focus:border-primary-container resize-none"
                  rows={3}
                  placeholder="Notas internas para el PDF..."
                />
              </div>
            </div>
          </Card>

        </div>

        {/* Columna lateral (1/3) — Totales */}
        <div className="flex flex-col gap-4">
          <Card title="Resumen de Precios">
            <div className="flex flex-col gap-3">
              {[
                { label: 'Subtotal Ítems', valor: '$ 0,00' },
                { label: 'Modificadores',  valor: '$ 0,00' },
                { label: 'IVA (21%)',       valor: '$ 0,00' },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center py-1 border-b border-outline-variant/50">
                  <span className="body-md text-on-surface-variant">{item.label}</span>
                  <span className="mono-data text-on-surface">{item.valor}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2">
                <span className="label-lg text-on-surface uppercase">Total</span>
                <span className="text-xl font-bold mono-data text-primary">$ 0,00</span>
              </div>
            </div>
          </Card>

          <Button variant="secondary" size="lg" className="w-full">
            <Save size={15} />
            Guardar Borrador
          </Button>
        </div>

      </div>
    </div>
  )
}
