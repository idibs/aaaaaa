import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import {
  getProdutos,
  getEnsacados,
  getOutrosProdutosByCategoria,
  getPessoasByTipo,
  getPedidoProdutosByStatus,
  getFuncionariosByTipo,
  getPedidos,
  getProdutosNomes,
  getPedidoProdutosByCarga,
  createEnsacado,
  deleteEnsacado,
  createOutroProduto,
  getEndereco,
  createEndereco,
  createPessoa,
  deleteOutroProduto,
  updateOutroProduto,
  updateCereal,
  deletePessoa,
  getPedidoProdutosByPessoa,
  createFuncionario,
  deleteFuncionario,
  finalizaPedido,
  getCargas,
  atribuirCarga,
  createPedidoProduto,
  getPessoaByNome,
  getEnsacadoByNome,
  getOutroProdutoByNome,
  updateValorPedido, // <-- ADICIONADO
  deletePedidoProduto,
  getCaminhoes,
  createCarga,
  adicionaPrecoPesoCarga,
  deletePedidoProdutoFromCarga,
  retirarPrecoPesoCarga,
  deleteCarga
} from '../database/functions'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    minWidth: 1000, // largura mínima da janela
    minHeight: 550, // altura mínima da janela
    title: 'RBS CEREAIS', // título da janela
    titleBarStyle: 'hidden', // estilo da barra de título
    titleBarOverlay: {
      color: '#fffcff', // cor da barra de título
      symbolColor: '#000000', // cor do símbolo da barra de título
      height: 10 // altura da barra de título
    },
    width: 1400, // largura da janela
    height: 850, // altura da janela
    maximizable: true, // permite maximizar a janela
    minimizable: true, // permite minimizar a janela
    resizable: true, // permite redimensionar a janela
    fullscreenable: true, // permite colocar a janela em tela cheia
    icon: icon, // ícone da janela
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.handle('create-pessoa', async (event, pessoa) => {
    try {
      const endereco = [
        pessoa.Cidade,
        pessoa.Rua,
        pessoa.Numero,
        pessoa.Bairro,
        pessoa.Cep,
        pessoa.Complemento
      ]

      // usar as mesmas chaves usadas no formulário (Cep, Numero)
      let Id_end = await getEndereco(pessoa.Cep, pessoa.Numero)

      if (!Id_end || Id_end.length === 0) {
        await createEndereco(endereco)
        Id_end = await getEndereco(pessoa.Cep, pessoa.Numero)
        if (!Id_end || Id_end.length === 0) {
          throw new Error('Erro ao criar endereço')
        }
      }

      const cliente = [pessoa.Nome, pessoa.Telefone, pessoa.Tipo, Id_end[0].Id_end]

      const data = await createPessoa(cliente)
      return data
    } catch (error) {
      throw error
    }
  })

  ipcMain.handle('create-funcionario', async (event, funcionario) => {
    try {
      const data = await createFuncionario(funcionario)
      return data
    } catch (error) {
      throw error
    }
  })

  ipcMain.handle('update-cereal', async (event, produto) => {
    try {
      const data = await updateCereal(produto)
      return data
    } catch (error) {
      throw error
    }
  })

  ipcMain.handle('update-outro-produto', async (event, produto) => {
    try {
      const data = await updateOutroProduto(produto)
      return data
    } catch (error) {
      throw error
    }
  })

  ipcMain.handle('delete-outro-produto', async (event, id) => {
    try {
      const data = await deleteOutroProduto(id)
      return data // ✅ Certifique-se que está retornando
    } catch (error) {
      throw error
    }
  })

  ipcMain.handle('get-cargas', async (event) => {
    try {
      const data = await getCargas()
      return data
    } catch (error) {
      throw error
    }
  })

  ipcMain.handle(
    'atribuir-carga',
    async (event, id_venda, id_carga, peso_venda, valor_venda, carga_atual) => {
      try {
        if (carga_atual) {
          await retirarPrecoPesoCarga(carga_atual, valor_venda, peso_venda)
        }
        await atribuirCarga(id_venda, id_carga)
        await adicionaPrecoPesoCarga(id_carga, valor_venda, peso_venda)
        const data = { success: true }
        return data
      } catch (error) {
        throw error
      }
    }
  )

  ipcMain.handle('delete-carga', async (event, id) => {
    try {
      const data = await deleteCarga(id)
      return data // ✅ Certifique-se que está retornando
    } catch (error) {
      throw error
    }
  })

  ipcMain.handle(
    'delete-pedido-produto-from-carga',
    async (event, id_ped, valor_pedido, peso_pedido) => {
      try {
        await deletePedidoProdutoFromCarga(id_ped, valor_pedido, peso_pedido)
        const data = { success: true }
        return data
      } catch (error) {
        throw error
      }
    }
  )

  ipcMain.handle('create-pedido-produto', async (event, pedidoProduto) => {
    try {
      const Cliente = await getPessoaByNome(pedidoProduto.Cliente)

      if (!Cliente || Cliente.length === 0) {
        throw new Error(`Cliente "${pedidoProduto.Cliente}" não encontrado no banco`)
      }

      const idPessoa = Cliente[0].Id_pes
      if (!idPessoa) {
        throw new Error('ID da pessoa inválido')
      }

      const endereco = [
        pedidoProduto.Endereco.Cidade,
        pedidoProduto.Endereco.Rua,
        pedidoProduto.Endereco.Numero,
        pedidoProduto.Endereco.Bairro,
        pedidoProduto.Endereco.Cep,
        pedidoProduto.Endereco.Complemento
      ]

      // usar as mesmas chaves usadas no formulário (Cep, Numero)
      let Id_end = await getEndereco(pedidoProduto.Endereco.Cep, pedidoProduto.Endereco.Numero)

      if (!Id_end || Id_end.length === 0) {
        await createEndereco(endereco)
        Id_end = await getEndereco(pedidoProduto.Endereco.Cep, pedidoProduto.Endereco.Numero)
        if (!Id_end || Id_end.length === 0) {
          throw new Error('Erro ao criar endereço')
        }
      }

      const pedido = [
        idPessoa,
        pedidoProduto.ProdutoEnsacado || null,
        pedidoProduto.OutroProduto || null,
        pedidoProduto.Data,
        pedidoProduto.Quantidade,
        pedidoProduto.PesoTotal,
        pedidoProduto.ValorTotal,
        pedidoProduto.Metodo,
        'Finalizado',
        Id_end[0].Id_end
      ]

      const data = await createPedidoProduto(pedido)
      return data
    } catch (error) {
      console.error('Erro ao criar pedido:', error)
      throw error
    }
  })

  ipcMain.handle('get-caminhoes', async (event) => {
    try {
      const data = await getCaminhoes()
      return data
    } catch (error) {
      throw error
    }
  })

  ipcMain.handle('delete-pedido-produto', async (event, id) => {
    try {
      const data = await deletePedidoProduto(id)
      return data // ✅ Certifique-se que está retornando
    } catch (error) {
      throw error
    }
  })

  ipcMain.handle('adicionar-orcamento-produto', async (event, Id_pedprod, valorTotal) => {
    try {
      // atualiza valor/estado do pedido usando updateValorPedido (ja existente em functions.js)
      const data = await updateValorPedido(Id_pedprod, valorTotal)
      return data
    } catch (error) {
      throw error
    }
  })

  ipcMain.handle('get-produto-by-nome', async (event, nome) => {
    try {
      let data = await getEnsacadoByNome(nome)

      if (!data || data.length === 0) {
        data = await getOutroProdutoByNome(nome)
      }

      return data[0]
    } catch (error) {
      throw error
    }
  })

  /*ipcMain.handle('create-carga', async (event, carga) => {
    try {
      const data = await createCarga(carga)
      return data
    } catch (error) {
      throw error
    }
  })*/

  ipcMain.handle('delete-funcionario', async (event, id) => {
    try {
      const data = await deleteFuncionario(id)
      return data // ✅ Certifique-se que está retornando
    } catch (error) {
      throw error
    }
  })

  ipcMain.handle('finaliza-pedido', async (event, id) => {
    try {
      const data = await finalizaPedido(id)
      return data // ✅ Certifique-se que está retornando
    } catch (error) {
      throw error
    }
  })

  ipcMain.handle('delete-pessoa', async (event, id) => {
    try {
      const pedidoExiste = await getPedidoProdutosByPessoa(id)
      const data = await deletePessoa(id, pedidoExiste)
      return data // ✅ Certifique-se que está retornando
    } catch (error) {
      throw error
    }
  })

  ipcMain.handle('get-ensacados', async (event) => {
    try {
      const data = await getEnsacados()
      return data
    } catch (error) {
      throw error
    }
  })

  ipcMain.handle('delete-ensacado', async (event, id) => {
    try {
      const data = await deleteEnsacado(id)
      return data
    } catch (error) {
      throw error
    }
  })

  ipcMain.handle('get-outros-produtos-by-categoria', async (event, categoria) => {
    try {
      const data = await getOutrosProdutosByCategoria(categoria)
      return data
    } catch (error) {
      throw error
    }
  })

  ipcMain.handle('get-produtos', async (event) => {
    try {
      const data = await getProdutos()
      return data
    } catch (error) {
      throw error
    }
  })

  ipcMain.handle('get-pessoas-by-tipo', async (event, tipo) => {
    try {
      const data = await getPessoasByTipo(tipo)
      return data
    } catch (error) {
      throw error
    }
  })

  ipcMain.handle('get-pedido-produtos-by-status', async (event, status) => {
    try {
      const data = await getPedidoProdutosByStatus(status)
      return data
    } catch (error) {
      throw error
    }
  })

  ipcMain.handle('get-funcionarios-by-tipo', async (event, tipo) => {
    try {
      const data = await getFuncionariosByTipo(tipo)
      return data
    } catch (error) {
      throw error
    }
  })

  ipcMain.handle('get-pedidos', async (event) => {
    try {
      const data = await getPedidos()
      return data
    } catch (error) {
      throw error
    }
  })

  ipcMain.handle('get-produtos-nomes', async (event) => {
    try {
      const data = await getProdutosNomes()
      return data
    } catch (error) {
      throw error
    }
  })

  ipcMain.handle('get-pedido-produtos-by-carga', async (event, id_ped) => {
    try {
      const data = await getPedidoProdutosByCarga(id_ped)
      return data
    } catch (error) {
      throw error
    }
  })

  ipcMain.handle('create-ensacado', async (event, produto) => {
    try {
      const data = await createEnsacado(produto)
      return data
    } catch (error) {
      throw error
    }
  })

  ipcMain.handle('create-carga', async (event, carga) => {
    try {
      const data = await createCarga(carga)
      return data
    } catch (error) {
      throw error
    }
  })

  ipcMain.handle('create-outro-produto', async (event, produto) => {
    try {
      const data = await createOutroProduto(produto)
      return data
    } catch (error) {
      throw error
    }
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
