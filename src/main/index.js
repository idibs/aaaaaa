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
  getEnsacadosColunas,
  createEnsacado,
  deleteEnsacado
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
