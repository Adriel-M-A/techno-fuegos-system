import { Button, Divider } from '../ui'

/**
 * Componente TableFooterActions
 * Contenedor reutilizable para las acciones globales situadas al pie de las tablas/formularios.
 * Incluye un separador vertical y alinea los botones a la derecha de forma consistente.
 */
export default function TableFooterActions({
  onSave,
  onCancel,
  saveLabel = 'Guardar Cambios',
  cancelLabel = 'Descartar Cambios',
  isSaveDisabled = false,
  isCancelDisabled = false,
  className = '',
  children,
}) {
  return (
    <div className={`mt-4 ${className}`}>
      {/* Separador superior industrial */}
      <Divider className="my-4" />

      {/* Caja flexible con botones alineados a la derecha */}
      <div className="flex items-center justify-end gap-3">
        {/* Hijos inyectados opcionalmente para agregar botones personalizados en el futuro */}
        {children}

        {/* Botón secundario para descartar/cancelar */}
        {onCancel && (
          <Button
            variant="secondary"
            onClick={onCancel}
            disabled={isCancelDisabled}
            className="border border-outline-variant"
          >
            {cancelLabel}
          </Button>
        )}

        {/* Botón primario para guardar */}
        {onSave && (
          <Button
            variant="primary"
            onClick={onSave}
            disabled={isSaveDisabled}
          >
            {saveLabel}
          </Button>
        )}
      </div>
    </div>
  )
}
