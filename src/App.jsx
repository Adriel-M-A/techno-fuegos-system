import { useEffect } from 'react'
import Sidebar from './components/Sidebar'
import useNavigationStore from './stores/navigationStore'
import useDataStore from './stores/dataStore'
import Dashboard from './views/Dashboard'
import Creador from './views/Creador'
import ConfiguracionCostos from './views/ConfiguracionCostos'
import Manual from './views/Manual'

// Componente principal que define el layout general del sistema de escritorio
export default function App() {
  const vistaActiva = useNavigationStore((state) => state.vistaActiva)
  const { loadInitialData, isInitialized } = useDataStore()

  useEffect(() => {
    loadInitialData()
  }, [loadInitialData])

  if (!isInitialized) {
    return (
      <div className="flex h-screen w-screen bg-background items-center justify-center">
        <p className="text-on-surface-variant animate-pulse">Cargando base de datos...</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-screen bg-background text-on-surface font-display overflow-hidden">
      {/* Barra de navegación lateral fija */}
      <Sidebar />

      {/* Área de contenido principal dinámico — cada vista maneja su propio padding */}
      <main className="flex-1 overflow-y-auto min-w-0 bg-background">
        {vistaActiva === 'presupuestos' && <Dashboard />}
        {vistaActiva === 'creador' && <Creador />}
        {vistaActiva === 'costos' && <ConfiguracionCostos />}
        {vistaActiva === 'manual' && <Manual />}
      </main>
    </div>
  )
}
