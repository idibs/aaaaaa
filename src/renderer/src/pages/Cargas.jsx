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

  const insertTable = 'carga'

  // Carrega dados ao montar e também quando o modal de criar carga for fechado/aberto
  useEffect(() => {
    window.api
      .getPedidos()
      .then((result) => setData(result))
      .catch((error) => console.error('Error fetching data:', error))
  }, [showModal, Tabela]) // atualizado: não depende de `data` (evita loop)

  // Filtra tratando valores nulos/undefined como string vazia
  useEffect(() => {
    const q = term.toLowerCase()
    setFilteredData(
      data.filter((item) =>
        String(item.Caminhão ?? '')
          .toLowerCase()
          .includes(q)
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
    <div className="pt-5">
      <h1 className="text-4xl text-[#1A6D12] font-black py-4 text-center">Cargas</h1>

      <p className="text-black ps-30 mt-10 mb-3">Nome do Caminhão:</p>

      <div className="w-full px-30">
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
          </div>
        </div>

        {/* Tabela */}
        <div className="max-w-full mt-6 mx-auto">
          <div className="border border-[#1A6D12] rounded-md shadow-sm lg:h-[67vh] 2xl:h-[72vh] max-h-[100vh]">
            <div className="w-full h-full overflow-auto">
              <Tabela data={filteredData ? filteredData : []} insertTable={insertTable} />
            </div>
          </div>
        </div>
      </div>

      {/* Popup Criar Carga */}
      <Popup showModal={showModal} onClose={closeModal} table={data} insertTable={insertTable} />
    </div>
  )
}
