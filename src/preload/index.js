import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  getProdutos: (Nome_categ) => ipcRenderer.invoke('get-produtos', Nome_categ),
  getPessoas: (Funcao_pes) => ipcRenderer.invoke('get-pessoas', Funcao_pes),
  getColunasProdutos: () => ipcRenderer.invoke('get-colunas-produtos'),
  getCategorias: () => ipcRenderer.invoke('get-categorias')
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
