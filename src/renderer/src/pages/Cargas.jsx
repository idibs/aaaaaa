import Tabela from '../components/tabelas/TabelaComView'
import Input from '../components/inputs/Input'
import { useState, useEffect } from 'react'
import Button from '../components/botoes/DesignBotao'
import Popup from '../components/popups/produtos/PopUpCriarProd' // popup de criar produto

export default function Carga() {
  // define os dados da tabela, improviso por falta de banco de dados
  const [data, setData] = useState([])
  const [term, setTerm] = useState('') // termo de pesquisa
  const [filteredData, setFilteredData] = useState([]) // dados filtrados
  // controla a visibilidade do modal
  const [showModal, setShowModal] = useState(false)

  const insertTable = 'produto'

  useEffect(() => {
    window.api
      .getPedidos()
      .then((result) => {
        setData(result)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])

  // useEffect separado para filtrar os dados sempre que 'data' ou 'term' mudarem
  useEffect(() => {
    setFilteredData(
      data.filter((item) => item.Valor_total.toLowerCase().includes(term.toLowerCase()))
    )
  }, [term, data]) // Executa quando 'data' ou 'term' mudam

  // funções para abrir e fechar o modal
  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  return (
    <div className="pt-10 h-screen">
      <h1 className="text-4xl text-[#1A6D12] font-black py-4 text-center">
        Valor dos Itens em Estoque
      </h1>
      {/* texto do input da tabela */}
      <p className="text-black ps-30 mt-10 mb-3">Nome do Produto:</p>
      {/* container da tabela */}
      <div className="h-full w-full px-30">
        {/* table options */}
        <div className="w-full flex justify-between">
          {/* Name */}
          <div className="flex flex-col w-1/3">
            <Input
              inputType="text"
              placeholder="Buscar..."
              inputName="nome"
              onChange={(e) => setTerm(e.target.value)} // altera o termo de pesquisa
            />
          </div>
          {/* options */}
          <div className="flex gap-3">
            <Button
              className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-40 h-full py-2"
              text="Criar carga"
              onClick={openModal}
            />
          </div>
        </div>
        {/* table */}
        <div className="border border-[#1A6D12] h-6/10 overflow-auto w-full mt-3">
          <Tabela data={filteredData ? filteredData : []} insertTable={insertTable} />
        </div>
      </div>
      {/* Popup para criar produto */}
      <Popup showModal={showModal} onClose={closeModal} table={data} insertTable={insertTable} />
    </div>
  )
}
