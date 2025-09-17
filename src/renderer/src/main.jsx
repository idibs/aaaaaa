import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Produtos from './pages/Produtos'
import Pessoas from './pages/Pessoas'
import Pagamento from './pages/Pagamento'
import Vendas from './pages/vendas/Vendas'
import NovaVenda from './pages/vendas/NovaVenda'
import NovaCompra from './pages/compras/NovaCompra'
import Compras from './pages/compras/Compras'
import Home from './pages/Home'

// Usando createBrowserRouter para definir as rotas
const router = createBrowserRouter([
  {
    path: '*',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'nova-compra',
        element: <NovaCompra />
      },
      {
        path: 'produtos',
        element: <Produtos />
      },
      {
        path: 'pessoas',
        element: <Pessoas />
      },
      {
        path: 'pagamento',
        element: <Pagamento />
      },
      {
        path: 'vendas',
        element: <Vendas />
      },
      {
        path: 'nova-venda',
        element: <NovaVenda />
      },
      {
        path: 'compras',
        element: <Compras />
      }
    ]
  }
])

// Renderizando o aplicativo
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

// ver oq é isso
window.ipcRenderer?.on('main-process-message', (_event, message) => {
  console.log(message)
})
