import { Button, Card, Input, Divider } from '../../components/ui'

/**
 * SubvistaEmpresa
 * Renderiza los campos para editar los datos comerciales de la empresa y los parámetros del reporte PDF.
 */
export default function SubvistaEmpresa() {
  return (
    <div className="flex flex-col gap-6">
      <Card title="Datos de la Empresa">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Nombre de la empresa" placeholder="Techno Fuegos" />
          <Input label="Teléfono" placeholder="+54 911 0000 0000" type="tel" />
          <Input label="Dirección" placeholder="Pilar, Buenos Aires" />
          <Input label="Correo electrónico" placeholder="contacto@ejemplo.com" type="email" />
          <Input label="Instagram" placeholder="@technofuegos" />
          <Input label="Sitio web" placeholder="https://..." type="url" />
        </div>
        <Divider className="my-4" />
        <div className="flex justify-end">
          <Button variant="primary">Guardar Datos</Button>
        </div>
      </Card>
      <Card title="Parámetros del Presupuesto PDF">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Validez del presupuesto (días)" placeholder="30" type="number" />
          <div />
          <div className="col-span-2 flex flex-col gap-1">
            <label className="label-md text-on-surface-variant uppercase tracking-wide">Cláusula de Seña</label>
            <textarea
              className="w-full px-3 py-2 text-sm text-on-surface bg-surface-container-lowest border border-outline-variant rounded focus:outline-none focus:border-primary-container resize-none"
              rows={3}
              placeholder="Texto que aparecerá en el pie del presupuesto PDF..."
            />
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            <label className="label-md text-on-surface-variant uppercase tracking-wide">Cláusula de Inflación</label>
            <textarea
              className="w-full px-3 py-2 text-sm text-on-surface bg-surface-container-lowest border border-outline-variant rounded focus:outline-none focus:border-primary-container resize-none"
              rows={3}
              placeholder="Texto que aparecerá en el pie del presupuesto PDF..."
            />
          </div>
        </div>
        <Divider className="my-4" />
        <div className="flex justify-end">
          <Button variant="primary">Guardar Parámetros</Button>
        </div>
      </Card>
    </div>
  )
}
