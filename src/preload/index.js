import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  getCereais: () => ipcRenderer.invoke('get-cereais'),
  getOutrosProdutosByCategoria: (categoria) =>
    ipcRenderer.invoke('get-outros-produtos-by-categoria', categoria),
  getProdutos: () => ipcRenderer.invoke('get-produtos'),
  getPessoasByTipo: (tipo) => ipcRenderer.invoke('get-pessoas-by-tipo', tipo),
  getPedidoProdutos: () => ipcRenderer.invoke('get-pedido-produtos'),
  getFuncionariosByTipo: (tipo) => ipcRenderer.invoke('get-funcionarios-by-tipo', tipo)
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
