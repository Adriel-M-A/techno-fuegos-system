import { useState } from 'react'
import { Button, Card, Input, Divider, Textarea, QuantityInput } from '../../components/ui'

const INITIAL_EMPRESA = {
  nombre: 'Techno Fuegos',
  telefono: '+54 911 0000 0000',
  direccion: 'Pilar, Buenos Aires',
  email: 'contacto@ejemplo.com',
  instagram: '@technofuegos',
  web: 'https://technofuegos.com.ar',
}

const INITIAL_PARAMETROS = {
  validez: 30,
  sena: 'Seña requerida del 50% para dar inicio a la fabricación en taller.',
  inflacion: 'Los precios cotizados están sujetos a variación inflacionaria si no se efectúa la seña en 5 días.',
}

/**
 * SubvistaEmpresa
 * Renderiza y administra el formulario para editar los datos comerciales de la empresa
 * y los parámetros de validez y cláusulas del presupuesto PDF con estados controlados Fluent.
 */
export default function SubvistaEmpresa() {
  const [empresa, setEmpresa] = useState(INITIAL_EMPRESA)
  const [empresaGuardada, setEmpresaGuardada] = useState(INITIAL_EMPRESA)

  const [parametros, setParametros] = useState(INITIAL_PARAMETROS)
  const [parametrosGuardados, setParametrosGuardados] = useState(INITIAL_PARAMETROS)

  // Comparación de cambios en caliente
  const hasEmpresaChanges = JSON.stringify(empresa) !== JSON.stringify(empresaGuardada)
  const hasParametrosChanges = JSON.stringify(parametros) !== JSON.stringify(parametrosGuardados)

  const handleSaveEmpresa = () => {
    setEmpresaGuardada(empresa)
    console.log('Datos comerciales guardados en memoria:', empresa)
  }

  const handleSaveParametros = () => {
    setParametrosGuardados(parametros)
    console.log('Parámetros PDF guardados en memoria:', parametros)
  }

  const handleFieldChangeEmpresa = (field, val) => {
    setEmpresa(prev => ({ ...prev, [field]: val }))
  }

  const handleFieldChangeParametros = (field, val) => {
    setParametros(prev => ({ ...prev, [field]: val }))
  }

  return (
    <div className="flex flex-col gap-6">
      
      {/* Datos Comerciales */}
      <Card title="Datos de la Empresa">
        <div className="grid grid-cols-2 gap-4">
          <Input 
            label="Nombre de la empresa" 
            placeholder="Techno Fuegos" 
            value={empresa.nombre} 
            onChange={(e) => handleFieldChangeEmpresa('nombre', e.target.value)} 
          />
          <Input 
            label="Teléfono" 
            placeholder="+54 911 0000 0000" 
            type="tel" 
            value={empresa.telefono} 
            onChange={(e) => handleFieldChangeEmpresa('telefono', e.target.value)} 
          />
          <Input 
            label="Dirección" 
            placeholder="Pilar, Buenos Aires" 
            value={empresa.direccion} 
            onChange={(e) => handleFieldChangeEmpresa('direccion', e.target.value)} 
          />
          <Input 
            label="Correo electrónico" 
            placeholder="contacto@ejemplo.com" 
            type="email" 
            value={empresa.email} 
            onChange={(e) => handleFieldChangeEmpresa('email', e.target.value)} 
          />
          <Input 
            label="Instagram" 
            placeholder="@technofuegos" 
            value={empresa.instagram} 
            onChange={(e) => handleFieldChangeEmpresa('instagram', e.target.value)} 
          />
          <Input 
            label="Sitio web" 
            placeholder="https://..." 
            type="url" 
            value={empresa.web} 
            onChange={(e) => handleFieldChangeEmpresa('web', e.target.value)} 
          />
        </div>
        <Divider className="my-4" />
        <div className="flex justify-end gap-3">
          {hasEmpresaChanges && (
            <Button variant="secondary" onClick={() => setEmpresa(empresaGuardada)}>
              Descartar
            </Button>
          )}
          <Button variant="primary" disabled={!hasEmpresaChanges} onClick={handleSaveEmpresa}>
            Guardar Datos
          </Button>
        </div>
      </Card>

      {/* Parámetros del Reporte PDF */}
      <Card title="Parámetros del Presupuesto PDF">
        <div className="grid grid-cols-2 gap-4">
          {/* Validez en días con QuantityInput interactivo */}
          <div className="flex flex-col gap-1.5 w-full">
            <span className="label-md text-on-surface-variant uppercase tracking-wide select-none">
              Validez del presupuesto (días)
            </span>
            <QuantityInput
              value={parametros.validez}
              onChange={(val) => handleFieldChangeParametros('validez', val)}
              min={1}
              max={365}
              className="w-32"
            />
          </div>
          <div />
          
          <Textarea
            label="Cláusula de Seña"
            placeholder="Texto que aparecerá en el pie del presupuesto PDF..."
            rows={3}
            maxLength={300}
            showCounter={true}
            className="col-span-2"
            value={parametros.sena}
            onChange={(e) => handleFieldChangeParametros('sena', e.target.value)}
          />
          <Textarea
            label="Cláusula de Inflación"
            placeholder="Texto que aparecerá en el pie del presupuesto PDF..."
            rows={3}
            maxLength={300}
            showCounter={true}
            className="col-span-2"
            value={parametros.inflacion}
            onChange={(e) => handleFieldChangeParametros('inflacion', e.target.value)}
          />
        </div>
        <Divider className="my-4" />
        <div className="flex justify-end gap-3">
          {hasParametrosChanges && (
            <Button variant="secondary" onClick={() => setParametros(parametrosGuardados)}>
              Descartar
            </Button>
          )}
          <Button variant="primary" disabled={!hasParametrosChanges} onClick={handleSaveParametros}>
            Guardar Parámetros
          </Button>
        </div>
      </Card>
      
    </div>
  )
}
