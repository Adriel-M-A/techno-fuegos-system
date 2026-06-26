import { create } from 'zustand'
import { invoke } from '@tauri-apps/api/core'

/**
 * dataStore
 * Estado global unificado para datos provenientes de la base de datos (SQLite vía Tauri IPC).
 * Sigue el principio de "Carga Única en Memoria" para catálogos.
 */
const useDataStore = create((set, get) => ({
  // Estados
  isInitialized: false,
  configuracion: null,
  insumos: [],
  productos: [],
  empleados: [],
  presupuestos: [], // Por el momento vacíos o manejados con MOCK hasta tener el comando de Rust

  // Acciones (Public)
  loadInitialData: async () => {
    if (get().isInitialized) return; // Evitar múltiples cargas
    try {
      console.log("Cargando datos iniciales desde SQLite...")
      
      const configuracion = await invoke('get_configuracion')
      const insumos = await invoke('get_insumos')
      const productos = await invoke('get_productos')
      const empleados = await invoke('get_empleados')
      const presupuestos = await invoke('get_presupuestos')
      
      set({ 
        configuracion, 
        insumos, 
        productos, 
        empleados,
        presupuestos,
        isInitialized: true 
      })
      console.log("Datos cargados correctamente:", { configuracion, insumos, productos, empleados })
    } catch (error) {
      console.error("Error al cargar datos desde SQLite:", error)
    }
  },

  reloadPresupuestos: async () => {
    try {
      const presupuestos = await invoke('get_presupuestos')
      set({ presupuestos })
    } catch (error) {
      console.error("Error al recargar presupuestos:", error)
    }
  },

  // Acción para actualizar insumos localmente luego de guardar/editar
  updateInsumoLocal: (insumoData) => {
    set((state) => {
      const exists = state.insumos.find(i => i.id === insumoData.id)
      if (exists) {
        return { insumos: state.insumos.map(i => i.id === insumoData.id ? insumoData : i) }
      }
      return { insumos: [insumoData, ...state.insumos] }
    })
  },
  
  deleteInsumoLocal: (id) => {
    set((state) => ({
      insumos: state.insumos.filter(i => i.id !== id)
    }))
  },

  updateConfiguracionLocal: (newConfig) => {
    set((state) => ({
      configuracion: { ...state.configuracion, ...newConfig }
    }))
  },

  updateEmpleadoLocal: (empleadoData) => {
    set((state) => {
      const exists = state.empleados.find(e => e.id === empleadoData.id)
      if (exists) {
        return { empleados: state.empleados.map(e => e.id === empleadoData.id ? empleadoData : e) }
      }
      return { empleados: [...state.empleados, empleadoData] }
    })
  },

  toggleEmpleadoActivoLocal: (id, activo) => {
    set((state) => ({
      empleados: state.empleados.map(e => e.id === id ? { ...e, activo } : e)
    }))
  },
}))

export default useDataStore
