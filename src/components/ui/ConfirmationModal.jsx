import { AlertTriangle, Info, Trash2, CheckCircle2, X } from 'lucide-react';
import Button from './Button';

/**
 * Componente modal de confirmación bloqueante y centrado.
 * Sigue estrictamente la estética "Modern Industrial" y Fluent Design del proyecto.
 * Adopta el formato estructurado de las tarjetas con cabecera y pie de página bien delimitados.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Si el modal está visible.
 * @param {string} props.title - Título del diálogo (se renderiza en la cabecera en mayúsculas).
 * @param {string} props.message - Cuerpo del mensaje explicativo.
 * @param {Function} props.onConfirm - Callback al presionar el botón de confirmación.
 * @param {Function} props.onCancel - Callback al presionar cancelar, cerrar o hacer click fuera.
 * @param {string} [props.confirmText='Confirmar'] - Texto del botón de confirmación.
 * @param {string} [props.cancelText='Cancelar'] - Texto del botón de cancelación.
 * @param {'info' | 'danger' | 'success' | 'warning'} [props.variant='info'] - Variante estética y funcional.
 * @param {boolean} [props.confirmDisabled=false] - Deshabilita el botón de confirmación.
 */
export default function ConfirmationModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'info',
  confirmDisabled = false,
}) {
  if (!isOpen) return null;

  // Estilos de los contenedores de iconos según la variante
  const variantStyles = {
    info: {
      icon: <Info className="w-5 h-5" />,
      iconClass: 'bg-primary-fixed text-primary-container border-primary-fixed-dim/30',
    },
    danger: {
      icon: <Trash2 className="w-5 h-5" />,
      iconClass: 'bg-error-container text-error border-error/20',
    },
    success: {
      icon: <CheckCircle2 className="w-5 h-5" />,
      iconClass: 'bg-success/10 text-success border-success/25',
    },
    warning: {
      icon: <AlertTriangle className="w-5 h-5" />,
      iconClass: 'bg-tertiary-container/10 text-tertiary-container border-tertiary-container/20',
    },
  };

  const currentStyle = variantStyles[variant] || variantStyles.info;

  // Variantes del botón de confirmación mapeadas al componente Button
  const confirmVariants = {
    info: 'primary',
    danger: 'danger',
    success: 'primary',
    warning: 'tertiary',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[1px]">
      {/* Backdrop de bloqueo de interacciones traseras */}
      <div 
        className="absolute inset-0 bg-transparent" 
        onClick={onCancel}
      />
      
      {/* Contenedor del Modal (8px de radio rounded-md, sombra Fluent elevada y bordeoutline) */}
      <div 
        className="relative w-[448px] max-w-full bg-surface-container-lowest rounded-md shadow-raised border border-outline-variant flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Cabecera del modal: fondo gris claro estructurado con divisor fino y botón cerrar */}
        <div className="flex items-center justify-between px-4 py-3 bg-surface-container-low/80 border-b border-outline-variant/60">
          <span className="label-lg text-on-surface uppercase tracking-wider font-bold font-sans">
            {title}
          </span>
          <button 
            onClick={onCancel}
            className="text-on-surface-variant hover:text-on-surface p-1 rounded-sm hover:bg-surface-container transition-colors duration-150 cursor-pointer"
            title="Cerrar modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Cuerpo del modal: padding amplio con icono enmarcado en bloque industrial */}
        <div className="p-6 flex items-start gap-4 bg-surface-container-lowest">
          {/* Contenedor del icono con borde fino y fondo temático de variante */}
          <div className={`flex-shrink-0 p-2.5 rounded-sm border ${currentStyle.iconClass}`}>
            {currentStyle.icon}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="body-md text-on-surface-variant leading-relaxed text-sm font-sans">
              {message}
            </p>
          </div>
        </div>

        {/* Divisor de sección del pie de página */}
        <div className="h-px bg-outline-variant/60" />

        {/* Pie de página del modal con los botones y fondo sutil */}
        <div className="px-6 py-4 bg-surface-container-low/20 flex items-center justify-end gap-3">
          <Button
            variant="secondary"
            onClick={onCancel}
          >
            {cancelText}
          </Button>
          <Button
            variant={confirmVariants[variant] || 'primary'}
            onClick={onConfirm}
            disabled={confirmDisabled}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
