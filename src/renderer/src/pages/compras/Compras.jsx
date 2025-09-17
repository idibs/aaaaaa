import TableContainer from '../../components/tabelas/TabelaComFiltro'
import { useState } from 'react'
import Button from '../../components/botoes/DesignBotao'
import Popup from '../../components/popups/PopupVendas'

/*
trocar nome do arquivo
criar pedido ou orçamento colocando o nome no input dop popup (so com banco *chorinho chorinho*)
criar opçao de editar pedido ou orçamento
*/

const pedidos = [
  {
    id: 1,
    Nome: 'ração poedeira triturada 20kg nutirmax',
    quantidade: 10,
    peso: 25,
    tipo: 'cereal'
  },
  { id: 2, nome: 'produto b', quantidade: 5, peso: 12, tipo: 'medicamento' },
  { id: 3, nome: 'produto etwetwtewtwtc', quantidade: 20, peso: 30, tipo: 'racao' },
  { id: 4, nome: 'produto d', quantidade: 15, peso: 18, tipo: 'cereal' },
  { id: 5, nome: 'produto e', quantidade: 8, peso: 22, tipo: 'medicamento' },
  { id: 6, nome: 'produto f', quantidade: 12, peso: 28, tipo: 'racao' },
  { id: 7, nome: 'produto g', quantidade: 7, peso: 16, tipo: 'cereal' },
  { id: 8, nome: 'produto h', quantidade: 18, peso: 24, tipo: 'medicamento' },
  { id: 9, nome: 'produto i', quantidade: 9, peso: 20, tipo: 'racao' },
  { id: 10, nome: 'produto j', quantidade: 14, peso: 26, tipo: 'cereal' }
]

const orcamentos = [
  { id: 11, nome: 'produto k', quantidade: 11, peso: 19, tipo: 'medicamento' },
  { id: 12, nome: 'produto l', quantidade: 6, peso: 21, tipo: 'racao' },
  { id: 13, nome: 'produto m', quantidade: 13, peso: 27, tipo: 'cereal' },
  { id: 14, nome: 'produto n', quantidade: 16, peso: 23, tipo: 'medicamento' },
  { id: 15, nome: 'produto o', quantidade: 4, peso: 17, tipo: 'racao' },
  { id: 16, nome: 'produto p', quantidade: 17, peso: 29, tipo: 'cereal' },
  { id: 17, nome: 'produto q', quantidade: 3, peso: 15, tipo: 'medicamento' },
  { id: 18, nome: 'produto r', quantidade: 19, peso: 31, tipo: 'racao' },
  { id: 19, nome: 'produto s', quantidade: 2, peso: 14, tipo: 'cereal' },
  { id: 20, nome: 'produto t', quantidade: 21, peso: 32, tipo: 'medicamento' }
]

export default function Vendas() {
  const [data, setData] = useState(pedidos)
  const [selected, setSelected] = useState('pedido') // novo estado
  const [path, setPath] = useState('/novo-pedido')
  const [showModal, setShowModal] = useState(false)

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  const changeData = (table, type) => {
    setData(table)
    setSelected(type)
    setPath(type === 'pedido' ? '/novo-pedido' : '/novo-orcamento')
  }

  return (
    <div className="pt-10">
      <h1 className="text-4xl text-[#1A6D12] font-black py-4 text-center">Pedidos e Orçamentos</h1>
      {/* container table */}
      <p className="text-black ps-30 mt-15 mb-3">Pedido ou Orçamento:</p>
      <div className=" w-full px-30">
        <TableContainer
          data={data}
          buttonText={'Novo Registro'}
          onClick={openModal}
          secondaryButtonText={'Exportar'}
        />
        {/* tabs */}
        <div className="mt-3 flex justify-evenly">
          <Button
            className={`${selected === 'pedido' ? 'text-white bg-[#1A6D12] hover:bg-[#145A0C]' : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'} w-60`}
            onClick={() => changeData(pedidos, 'pedido')}
            text="Pedidos"
          />
          <Button
            onClick={() => changeData(orcamentos, 'orcamento')}
            className={`${selected === 'orcamento' ? 'text-white bg-[#1A6D12] hover:bg-[#145A0C]' : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'} rounded-xl w-60 py-2 cursor-pointer`}
            text="Orçamentos"
          />
        </div>
      </div>
      <Popup showModal={showModal} onClose={closeModal} path={path} />
    </div>
  )
}
