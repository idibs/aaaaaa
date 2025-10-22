import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Produtos from './pages/Produtos'
import Pessoas from './pages/Pessoas'
import Pagamento from './pages/Pagamento'
import Vendas from './pages/vendas/Vendas'
import Compras from './pages/Compras'
import Home from './pages/Home'
import Carga from './pages/Cargas'
import Funcionarios from './pages/Funcionarios'
import ViewCarga from './pages/views/ViewCarga'

// Usando createBrowserRouter para definir as rotas
const router = createBrowserRouter([
  {
    path: '*',
    element: <App />,
    children: [
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'produtos',
        element: <Produtos />
      },
      {
        path: 'carga',
        element: <Carga />
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
        path: 'compras',
        element: <Compras />
      },
      {
        path: 'funcionarios',
        element: <Funcionarios />
      },
      {
        path: 'view/carga',
        element: <ViewCarga />
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
