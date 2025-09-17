import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  getProducts: (category) => ipcRenderer.invoke('get-products', category),
  insertProducts: (category, data) => ipcRenderer.invoke('insert-products', category, data),
  getPeople: (tableName) => ipcRenderer.invoke('get-people', tableName),
  getProductsColumns: () => ipcRenderer.invoke('get-products-columns')
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
