import { create } from 'zustand'

// Store para manejar la navegación entre las diferentes vistas de la aplicación
const useNavigationStore = create((set) => ({
  vistaActiva: 'presupuestos',
  setVista: (vista) => set({ vistaActiva: vista }),
}))

export default useNavigationStore
