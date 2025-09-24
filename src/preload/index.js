import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  getProducts: (category) => ipcRenderer.invoke('get-produtos', Nome_categ),
  getPeople: (tableName) => ipcRenderer.invoke('get-pessoas', Funcao_pes),
  getProductsColumns: () => ipcRenderer.invoke('get-colunas-produtos')
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
