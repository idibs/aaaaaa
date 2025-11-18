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
  getCaminhoes: () => ipcRenderer.invoke('get-caminhoes'),
  getProdutosNomes: () => ipcRenderer.invoke('get-produtos-nomes'),
  getPedidoProdutosByCarga: (Id_ped) => ipcRenderer.invoke('get-pedido-produtos-by-carga', Id_ped),
  getProdutoByNome: (nome) => ipcRenderer.invoke('get-produto-by-nome', nome),
  getPessoaEndereco: (id) => ipcRenderer.invoke('get-pessoa-endereco', id),
  createEnsacado: (produto) => ipcRenderer.invoke('create-ensacado', produto),
  createOutroProduto: (produto) => ipcRenderer.invoke('create-outro-produto', produto),
  createPessoa: (pessoa) => ipcRenderer.invoke('create-pessoa', pessoa),
  createFuncionario: (funcionario) => ipcRenderer.invoke('create-funcionario', funcionario),
  createCarga: (carga) => ipcRenderer.invoke('create-carga', carga),
  createProdutoBase: (produtoBase) => ipcRenderer.invoke('create-produto-base', produtoBase),
  updateCereal: (produto) => ipcRenderer.invoke('update-cereal', produto),
  updateOutroProduto: (produto) => ipcRenderer.invoke('update-outro-produto', produto),
  editFuncionario: (funcionario) => ipcRenderer.invoke('edit-funcionario', funcionario),
  editPessoa: (pessoa) => ipcRenderer.invoke('edit-pessoa', pessoa),
  deleteOutroProduto: (id) => ipcRenderer.invoke('delete-outro-produto', id),
  deleteEnsacado: (id) => ipcRenderer.invoke('delete-ensacado', id),
  deletePessoa: (id) => ipcRenderer.invoke('delete-pessoa', id),
  deleteCarga: (id) => ipcRenderer.invoke('delete-carga', id),
  deleteFuncionario: (id) => ipcRenderer.invoke('delete-funcionario', id),
  deletePedidoProduto: (id) => ipcRenderer.invoke('delete-pedido-produto', id),
  deletePedidoProdutoFromCarga: (id, Valor_total, Peso_total) =>
    ipcRenderer.invoke('delete-pedido-produto-from-carga', id, Valor_total, Peso_total),
  finalizaPedido: (id) => ipcRenderer.invoke('finaliza-pedido', id),
  addLote: (id_produto, novoPreco, novaQuantidade) =>
    ipcRenderer.invoke('add-lote', id_produto, novoPreco, novaQuantidade),
  /*atualizaEstoque: (id_produto, quantidade) =>
    ipcRenderer.invoke('atualiza-estoque', id_produto, quantidade),
  atualizaEstoqueOutroProduto: (id_produto, quantidade) =>
    ipcRenderer.invoke('atualiza-estoque-outro-produto', id_produto, quantidade),
  atualizaPrecoProduto: (id_produto, novoPreco) =>
    ipcRenderer.invoke('atualiza-preco-produto', id_produto, novoPreco),*/
  adicionarOrcamentoProduto: (id_pedprod, valorTotal) =>
    ipcRenderer.invoke('adicionar-orcamento-produto', id_pedprod, valorTotal),
  getCargas: () => ipcRenderer.invoke('get-cargas'),
  createPedidoProduto: (pedidoProduto) =>
    ipcRenderer.invoke('create-pedido-produto', pedidoProduto),
  atribuirCarga: (id_venda, id_carga, peso_venda, valor_venda, carga_atual) =>
    ipcRenderer.invoke('atribuir-carga', id_venda, id_carga, peso_venda, valor_venda, carga_atual)
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
