// Componente PageHeader: cabecera de vista con título, subtítulo y zona de acciones
export default function PageHeader({ title, subtitle, children }) {
  return (
    <div className="flex flex-col gap-4 pb-5 mb-3 border-b border-outline-variant">

      {/* Fila principal: título + acciones */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <h1 className="headline-md text-on-surface">
            {title}
          </h1>
          {subtitle && (
            <p className="body-md text-on-surface-variant">
              {subtitle}
            </p>
          )}
        </div>

        {/* Zona de acciones (botones, selects, etc.) */}
        {children && (
          <div className="flex items-center gap-2 shrink-0">
            {children}
          </div>
        )}
      </div>

    </div>
  )
}
