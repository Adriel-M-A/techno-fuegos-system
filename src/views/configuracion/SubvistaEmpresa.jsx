import { useState } from 'react'
import { Button, Card, Input, Divider, Textarea, QuantityInput, ConfirmationModal } from '../../components/ui'
import { MOCK_CONFIG_EMPRESA } from '../../data'

/**
 * SubvistaEmpresa
 * Renderiza y administra el formulario para editar los datos comerciales de la empresa
 * y los parámetros de validez y cláusulas del presupuesto PDF.
 *
 * Los datos provienen de MOCK_CONFIG_EMPRESA (src/data/empresa.js).
 * Campos: snake_case idénticos al struct ConfigEmpresa de Rust / tabla config_empresa de SQLite.
 */
export default function SubvistaEmpresa() {
  // Estado separado por sección para detección de cambios granular
  // (en prod: se reemplaza el estado inicial por invoke('obtener_config_empresa'))
  const [empresa, setEmpresa] = useState({
    nombre: MOCK_CONFIG_EMPRESA.nombre,
    telefono: MOCK_CONFIG_EMPRESA.telefono,
    direccion: MOCK_CONFIG_EMPRESA.direccion,
    email: MOCK_CONFIG_EMPRESA.email,
    instagram: MOCK_CONFIG_EMPRESA.instagram,
    web: MOCK_CONFIG_EMPRESA.web,
  })
  const [empresaGuardada, setEmpresaGuardada] = useState({ ...empresa })

  const [parametros, setParametros] = useState({
    validez_dias: MOCK_CONFIG_EMPRESA.validez_dias,
    clausula_sena: MOCK_CONFIG_EMPRESA.clausula_sena,
    clausula_inflacion: MOCK_CONFIG_EMPRESA.clausula_inflacion,
  })
  const [parametrosGuardados, setParametrosGuardados] = useState({ ...parametros })

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

  // Comparación de cambios en caliente
  const hasEmpresaChanges = JSON.stringify(empresa) !== JSON.stringify(empresaGuardada)
  const hasParametrosChanges = JSON.stringify(parametros) !== JSON.stringify(parametrosGuardados)

  const handleSaveEmpresa = () => {
    showConfirm({
      title: 'Guardar Datos de la Empresa',
      message: '¿Deseas guardar los datos comerciales de la empresa? Se mostrarán en la cabecera de todos los presupuestos emitidos.',
      variant: 'success',
      confirmText: 'Guardar',
      onConfirm: () => {
        // En prod: invoke('guardar_config_empresa', { empresa })
        setEmpresaGuardada(empresa)
      }
    })
  }

  const handleDiscardEmpresa = () => {
    showConfirm({
      title: 'Descartar cambios de la empresa',
      message: '¿Estás seguro de que deseas revertir los cambios en los datos de la empresa? Se perderán las modificaciones no guardadas.',
      variant: 'warning',
      confirmText: 'Descartar',
      onConfirm: () => {
        setEmpresa(empresaGuardada)
      }
    })
  }

  const handleSaveParametros = () => {
    showConfirm({
      title: 'Guardar parámetros del PDF',
      message: '¿Deseas guardar los parámetros y cláusulas legales del presupuesto PDF?',
      variant: 'success',
      confirmText: 'Guardar',
      onConfirm: () => {
        // En prod: invoke('guardar_config_empresa', { parametros })
        setParametrosGuardados(parametros)
      }
    })
  }

  const handleDiscardParametros = () => {
    showConfirm({
      title: 'Descartar cambios de parámetros',
      message: '¿Estás seguro de que deseas revertir los cambios en los parámetros del PDF? Se perderán las modificaciones no guardadas.',
      variant: 'warning',
      confirmText: 'Descartar',
      onConfirm: () => {
        setParametros(parametrosGuardados)
      }
    })
  }

  const handleFieldEmpresa = (field, val) => {
    setEmpresa(prev => ({ ...prev, [field]: val }))
  }

  const handleFieldParametros = (field, val) => {
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
            onChange={(e) => handleFieldEmpresa('nombre', e.target.value)}
          />
          <Input
            label="Teléfono"
            placeholder="+54 911 0000 0000"
            type="tel"
            value={empresa.telefono}
            onChange={(e) => handleFieldEmpresa('telefono', e.target.value)}
          />
          <Input
            label="Dirección"
            placeholder="Pilar, Buenos Aires"
            value={empresa.direccion}
            onChange={(e) => handleFieldEmpresa('direccion', e.target.value)}
          />
          <Input
            label="Correo electrónico"
            placeholder="contacto@ejemplo.com"
            type="email"
            value={empresa.email}
            onChange={(e) => handleFieldEmpresa('email', e.target.value)}
          />
          <Input
            label="Instagram"
            placeholder="@technofuegos"
            value={empresa.instagram}
            onChange={(e) => handleFieldEmpresa('instagram', e.target.value)}
          />
          <Input
            label="Sitio web"
            placeholder="https://..."
            type="url"
            value={empresa.web}
            onChange={(e) => handleFieldEmpresa('web', e.target.value)}
          />
        </div>
        <Divider className="my-4" />
        <div className="flex justify-end gap-3">
          {hasEmpresaChanges && (
            <Button variant="secondary" onClick={handleDiscardEmpresa}>
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
          {/* Validez en días */}
          <div className="flex flex-col gap-1.5 w-full">
            <span className="label-md text-on-surface-variant uppercase tracking-wide select-none">
              Validez del presupuesto (días)
            </span>
            <QuantityInput
              value={parametros.validez_dias}
              onChange={(val) => handleFieldParametros('validez_dias', val)}
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
            value={parametros.clausula_sena}
            onChange={(e) => handleFieldParametros('clausula_sena', e.target.value)}
          />
          <Textarea
            label="Cláusula de Inflación"
            placeholder="Texto que aparecerá en el pie del presupuesto PDF..."
            rows={3}
            maxLength={300}
            showCounter={true}
            className="col-span-2"
            value={parametros.clausula_inflacion}
            onChange={(e) => handleFieldParametros('clausula_inflacion', e.target.value)}
          />
        </div>
        <Divider className="my-4" />
        <div className="flex justify-end gap-3">
          {hasParametrosChanges && (
            <Button variant="secondary" onClick={handleDiscardParametros}>
              Descartar
            </Button>
          )}
          <Button variant="primary" disabled={!hasParametrosChanges} onClick={handleSaveParametros}>
            Guardar Parámetros
          </Button>
        </div>
      </Card>

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
