import Tabela from '../components/tabelas/TabelaComView'
import Input from '../components/inputs/Input'
import { useState, useEffect } from 'react'
import Button from '../components/botoes/DesignBotao'
import Popup from '../components/popups/carga/PopUpCriarCarga' // popup de criar produto
import { IoIosArrowDown } from 'react-icons/io'

export default function Carga() {
  const [data, setData] = useState([])
  const [term, setTerm] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false) // controla o dropdown

  const insertTable = 'produto'

  useEffect(() => {
    window.api
      .getPedidos()
      .then((result) => setData(result))
      .catch((error) => console.error('Error fetching data:', error))
  }, [])

  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        item.Valor_total?.toString().toLowerCase().includes(term.toLowerCase())
      )
    )
  }, [term, data])

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  const handleRelatorioCarga = () => {
    alert('Gerando Relatório de Carga...')
    setShowDropdown(false)
  }

  const handleRelatorioLucro = () => {
    alert('Gerando Relatório de Lucro...')
    setShowDropdown(false)
  }

  return (
    <div className="pt-10 h-screen">
      <h1 className="text-4xl text-[#1A6D12] font-black py-4 text-center">
        Cargas
      </h1>

      <p className="text-black ps-30 mt-10 mb-3">Nome do Caminhão:</p>

      <div className="h-full w-full px-30">
        <div className="w-full flex justify-between items-center">
          {/* Campo de busca */}
          <div className="flex flex-col w-1/3">
            <Input
              inputType="text"
              placeholder="Buscar..."
              inputName="nome"
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>

          {/* Botões de opções */}
          <div className="flex gap-3 relative">
            {/* Botão Criar Carga */}
            <Button
              className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-40 h-full py-2"
              text="Criar carga"
              onClick={openModal}
            />

            {/* Dropdown de Relatórios */}
            <div className="relative">
              <button
                className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-40 h-full py-2 rounded-xl flex items-center justify-center"
                onClick={() => setShowDropdown(!showDropdown)}
                type="button"
              >
                Relatórios
                <IoIosArrowDown className="inline-block ml-2" />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-[#1A6D12] rounded-lg shadow-lg z-10">
                  <button
                    onClick={handleRelatorioCarga}
                    className="block w-full text-left px-4 py-2 hover:bg-[#e9f5ec] text-[#1A6D12]"
                  >
                    Relatório de Carga
                  </button>
                  <button
                    onClick={handleRelatorioLucro}
                    className="block w-full text-left px-4 py-2 hover:bg-[#e9f5ec] text-[#1A6D12]"
                  >
                    Relatório de Lucro
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabela */}
        <div className="border border-[#1A6D12] h-6/10 overflow-auto w-full mt-3">
          <Tabela data={filteredData ? filteredData : []} insertTable={insertTable} />
        </div>
      </div>

      {/* Popup Criar Carga */}
      <Popup showModal={showModal} onClose={closeModal} table={data} insertTable={insertTable} />
    </div>
  )
}
