import TabelaVaidacao from '../../components/tabelas/TabelaComValidacao'
import Tabela from '../../components/tabelas/Tabela'
import Input from '../../components/inputs/Input'
import { useState, useEffect } from 'react'
import Button from '../../components/botoes/DesignBotao'
import Popup from '../../components/popups/venda/PopUpCriarVenda'
import PopUpOrcamento from '../../components/popups/venda/PopUpOrcamento'

export default function Produtos() {
  const [data, setData] = useState([])
  const [status, setStatus] = useState('Em analise')
  const [term, setTerm] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showOrcamento, setShowOrcamento] = useState(false)
  const [selectedVenda, setSelectedVenda] = useState(null)

  const insertTable = 'venda'

  useEffect(() => {
    window.api
      .getPedidoProdutosByStatus(status)
      .then((result) => setData(result))
      .catch((error) => console.error('Error fetching data:', error))
  }, [status, data, Tabela, showModal, showOrcamento])

  useEffect(() => {
    setFilteredData(data.filter((item) => item.Cliente.toLowerCase().includes(term.toLowerCase())))
  }, [term, data])

  const changeData = (status) => setStatus(status)

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  const openOrcamento = (venda) => {
    setSelectedVenda(venda)
    setShowOrcamento(true)
  }
  const closeOrcamento = () => setShowOrcamento(false)

  const finalizarVenda = async (valor) => {
    try {
      await window.api.finalizarVenda(selectedVenda.id, valor)
      setShowOrcamento(false)
      setStatus('Finalizado')
    } catch (err) {
      console.error('Erro ao finalizar venda:', err)
    }
  }

  return (
    <div className="pt-10">
      <h1 className="text-4xl text-[#1A6D12] font-black py-4 text-center">Pedidos de Produtos</h1>

      <p className="text-black ps-30 mt-10 mb-3">Nome do Cliente:</p>

      <div className="w-full px-30">
        <div className="w-full flex justify-between">
          <div className="flex flex-col w-1/3">
            <Input
              inputType="text"
              placeholder="Nome"
              inputName="nome"
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>

          {/* Botões condicionais */}
          <div className="flex gap-2 items-center">
            <Button
              className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-36 py-1.5 text-sm"
              text="Novo Pedido"
              onClick={openModal}
            />

            {status === 'Finalizado' && (
              <>
                <Button
                  className="text-[#1A6D12] border border-[#1A6D12] hover:bg-[#ececec] w-36 py-1.5 text-sm"
                  text="Relatório"
                />
              </>
            )}
          </div>
        </div>

        <div className="border border-[#1A6D12] h-120 overflow-auto w-full mt-3">
          <TabelaVaidacao
            data={filteredData}
            insertTable={insertTable}
            onCheckClick={status === 'Em orçamento' ? openOrcamento : undefined}
            status={status}
          />
        </div>

        <div className="mt-4 mb-4 flex justify-between">
          <Button
            onClick={() => changeData('Em analise')}
            className={`${
              status === 'Em analise'
                ? 'text-white bg-[#1A6D12] hover:bg-[#145A0C]'
                : 'text-[#1A6D12] border border-[#1A6D12] hover:bg-[#ececec]'
            } w-60`}
            text="Em análise"
          />
          <Button
            onClick={() => changeData('Em orçamento')}
            className={`${
              status === 'Em orçamento'
                ? 'text-white bg-[#1A6D12] hover:bg-[#145A0C]'
                : 'text-[#1A6D12] border border-[#1A6D12] hover:bg-[#ececec]'
            } w-60`}
            text="Em orçamento"
          />
          <Button
            onClick={() => changeData('Finalizado')}
            className={`${
              status === 'Finalizado'
                ? 'text-white bg-[#1A6D12] hover:bg-[#145A0C]'
                : 'text-[#1A6D12] border border-[#1A6D12] hover:bg-[#ececec]'
            } w-60`}
            text="Finalizado"
          />
        </div>
      </div>

      {/* Popups */}
      <Popup showModal={showModal} onClose={closeModal} table={data} insertTable={insertTable} />
      <PopUpOrcamento
        showModal={showOrcamento}
        onClose={closeOrcamento}
        onFinalizar={finalizarVenda}
      />
    </div>
  )
}
