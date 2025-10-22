import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Produtos from '../pages/Produtos'
import Pessoas from '../pages/Pessoas'
import Pagamento from '../pages/Pagamento'
import Vendas from '../pages/vendas/Vendas'
import NovaVenda from '../pages/vendas/NovaVenda'
import Compras from '../pages/Compras'
import Carga from '../pages/Cargas'
import Funcionarios from '../pages/Funcionarios'
import ViewCarga from '../pages/views/ViewCarga'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/pessoas" element={<Pessoas />} />
      <Route path="/pagamento" element={<Pagamento />} />
      <Route path="/vendas" element={<Vendas />} />
      <Route path="/nova-venda" element={<NovaVenda />} />
      <Route path="/compras" element={<Compras />} />
      <Route path="/carga" element={<Carga />} />
      <Route path="/funcionarios" element={<Funcionarios />} />
      <Route path="/view/carga" element={<ViewCarga />} />
    </Routes>
  )
}
