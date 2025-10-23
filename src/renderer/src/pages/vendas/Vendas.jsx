import Tabela from '../../components/tabelas/Tabela'
import Input from '../../components/inputs/Input'
import { useState, useEffect } from 'react'
import Button from '../../components/botoes/DesignBotao'
import Popup from '../../components/popups/venda/PopUpCriarVenda' // popup de criar produto

export default function Produtos() {
  // define os dados da tabela, improviso por falta de banco de dados
  const [data, setData] = useState([])
  // define a tabela selecionada, sendo a inicial 'cliente'
  const [status, setStatus] = useState('Em analise')
  const [term, setTerm] = useState('') // termo de pesquisa
  const [filteredData, setFilteredData] = useState([]) // dados filtrados
  // controla a visibilidade do modal
  const [showModal, setShowModal] = useState(false)

  const insertTable = 'produto'

  useEffect(() => {
    window.api
      .getPedidoProdutosByStatus(status)
      .then((result) => {
        setData(result)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [status])

  // useEffect separado para filtrar os dados sempre que 'data' ou 'term' mudarem
  useEffect(() => {
    setFilteredData(data.filter((item) => item.Cliente.toLowerCase().includes(term.toLowerCase())))
  }, [term, data]) // Executa quando 'data' ou 'term' mudam

  // função para alterar os dados da tabela e o tipo selecionado controlado pelos botões de baixo
  const changeData = (status) => {
    setStatus(status)
  }

  // funções para abrir e fechar o modal
  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  return (
    <div className="pt-10">
      <h1 className="text-4xl text-[#1A6D12] font-black py-4 text-center">Pedidos de Produtos</h1>
      {/* texto do input da tabela */}
      <p className="text-black ps-30 mt-10 mb-3">Nome do Cliente:</p>
      {/* container da tabela */}
      <div className=" w-full px-30">
        {/* table options */}
        <div className="w-full flex justify-between">
          {/* Name */}
          <div className="flex flex-col w-1/3">
            <Input
              inputType="text"
              placeholder="Nome"
              inputName="nome"
              onChange={(e) => setTerm(e.target.value)} // altera o termo de pesquisa
            />
          </div>
          {/* options */}
          <div className="flex gap-3">
            <Button
              className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-40 h-full py-2"
              text={"Novo Pedido"}
              onClick={openModal}
            />
            <Button
              className="text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec] w-50 py-2"
              text="Adicionar a Carga"
            />
             <Button
              className="text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec] w-50 py-2"
              text="Gerar PDF"
            />
          </div>
        </div>
        {/* table */}
        <div className="border border-[#1A6D12] h-120 overflow-auto w-full mt-3">
          <Tabela data={filteredData} insertTable={insertTable} />
        </div>
        {/* escolher entre tabelas */}
        <div className="mt-4 mb-4 flex justify-between">
          <Button
            onClick={() => changeData('Em analise')}
            className={`${status === 'Em analise' ? 'text-white bg-[#1A6D12] hover:bg-[#145A0C]' : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'} w-60`}
            text="Em analise"
          />
          <Button
            onClick={() => changeData('Em orçamento')}
            className={`${status === 'Em orçamento' ? 'text-white bg-[#1A6D12] hover:bg-[#145A0C]' : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'} w-60`}
            text="Em orçamento"
          />
          <Button
            onClick={() => changeData('Finalizado')}
            className={`${status === 'Finalizado' ? 'text-white bg-[#1A6D12] hover:bg-[#145A0C]' : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'} w-60`}
            text="Finalizado"
          />
        </div>
      </div>
      {/* Popup para criar produto */}
      <Popup showModal={showModal} onClose={closeModal} table={data} insertTable={insertTable} />
    </div>
  )
}
