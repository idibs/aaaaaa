import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { createPessoa } from '../database/functions'

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
  getProdutosNomes: () => ipcRenderer.invoke('get-produtos-nomes'),
  getPedidoProdutosByCarga: (Id_ped) => ipcRenderer.invoke('get-pedido-produtos-by-carga', Id_ped),
  createEnsacado: (produto) => ipcRenderer.invoke('create-ensacado', produto),
  createOutroProduto: (produto) => ipcRenderer.invoke('create-outro-produto', produto),
  createPessoa: (pessoa) => ipcRenderer.invoke('create-pessoa', pessoa),
  updateCereal: (produto) => ipcRenderer.invoke('update-cereal', produto),
  updateOutroProduto: (produto) => ipcRenderer.invoke('update-outro-produto', produto),
  deleteOutroProduto: (id) => ipcRenderer.invoke('delete-outro-produto', id),
  deleteEnsacado: (id) => ipcRenderer.invoke('delete-ensacado', id)
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
