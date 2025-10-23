import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  getEnsacados: () => ipcRenderer.invoke('get-ensacados'),
  getOutrosProdutosByCategoria: (categoria) =>
    ipcRenderer.invoke('get-outros-produtos-by-categoria', categoria),
  getProdutos: () => ipcRenderer.invoke('get-produtos'),
  getPessoasByTipo: (tipo) => ipcRenderer.invoke('get-pessoas-by-tipo', tipo),
  getPedidoProdutosByStatus: (status) =>
    ipcRenderer.invoke('get-pedido-produtos-by-status', status),
  getFuncionariosByTipo: (tipo) => ipcRenderer.invoke('get-funcionarios-by-tipo', tipo),
  getPedidos: () => ipcRenderer.invoke('get-pedidos'),
  getProdutosNomes: () => ipcRenderer.invoke('get-produtos-nomes')
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
