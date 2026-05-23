import Sidebar from './components/Sidebar'
import useNavigationStore from './stores/navigationStore'
import Presupuestos from './views/Presupuestos'
import Creador from './views/Creador'
import ConfiguracionCostos from './views/ConfiguracionCostos'
import Manual from './views/Manual'

// Componente principal que define el layout general del sistema de escritorio
export default function App() {
  const vistaActiva = useNavigationStore((state) => state.vistaActiva)

  return (
    <div className="flex h-screen w-screen bg-background text-on-surface font-display overflow-hidden">
      {/* Barra de navegación lateral fija */}
      <Sidebar />

      {/* Área de contenido principal dinámico — cada vista maneja su propio padding */}
      <main className="flex-1 overflow-y-auto min-w-0 bg-background">
        {vistaActiva === 'presupuestos' && <Presupuestos />}
        {vistaActiva === 'creador' && <Creador />}
        {vistaActiva === 'costos' && <ConfiguracionCostos />}
        {vistaActiva === 'manual' && <Manual />}
      </main>
    </div>
  )
}
