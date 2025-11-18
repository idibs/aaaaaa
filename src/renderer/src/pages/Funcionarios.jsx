import Tabela from '../components/tabelas/Tabela'
import Input from '../components/inputs/Input'
import { useState, useEffect } from 'react'
import Button from '../components/botoes/DesignBotao'
import Popup from '../components/popups/funcionario/PopUpAddFunc' // popup de criar produto

export default function Funcionarios() {
  // define os dados da tabela, improviso por falta de banco de dados
  const [data, setData] = useState([])
  // define a tabela selecionada, sendo a inicial 'cliente'
  const [tipo, setTipo] = useState('Registrado')
  const [term, setTerm] = useState('') // termo de pesquisa
  const [filteredData, setFilteredData] = useState([]) // dados filtrados
  // controla a visibilidade do modal
  const [showModal, setShowModal] = useState(false)

  const insertTable = 'funcionario'

  useEffect(() => {
    window.api
      .getFuncionariosByTipo(tipo)
      .then((result) => {
        setData(result)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [tipo, data, Tabela, showModal])

  // useEffect separado para filtrar os dados sempre que 'data' ou 'term' mudarem
  useEffect(() => {
    setFilteredData(data.filter((item) => item.Nome.toLowerCase().includes(term.toLowerCase())))
  }, [term, data]) // Executa quando 'data' ou 'term' mudam

  // função para alterar os dados da tabela e o tipo selecionado controlado pelos botões de baixo
  const changeData = (tipo) => {
    setTipo(tipo)
  }

  // funções para abrir e fechar o modal
  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  return (
    <div className="pt-10">
      <h1 className="text-4xl text-[#1A6D12] font-black py-4 text-center">Funcionários</h1>
      {/* texto do input da tabela */}
      <p className="text-black ps-30 mt-10 mb-3">Nome do Funcionário:</p>
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
              text="Novo Funcionário"
              onClick={openModal}
            />
          </div>
        </div>
        {/* table */}
        <div className="border border-[#1A6D12] h-120 overflow-auto w-full mt-3">
          <Tabela data={filteredData ? filteredData : []} insertTable={insertTable} />
        </div>
        {/* escolher entre tabelas */}
        <div className="mt-4 mb-4 flex justify-around">
          <Button
            onClick={() => changeData('Registrado')}
            className={`${tipo === 'Registrado' ? 'text-white bg-[#1A6D12] hover:bg-[#145A0C]' : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'} w-60`}
            text="Registrado"
          />
          <Button
            onClick={() => changeData('Não Registrado')}
            className={`${tipo === 'Não Registrado' ? 'text-white bg-[#1A6D12] hover:bg-[#145A0C]' : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'} w-60`}
            text="Não Registrado"
          />
        </div>
      </div>
      {/* Popup para criar produto */}
      <Popup showModal={showModal} onClose={closeModal} table={data} insertTable={insertTable} />
    </div>
  )
}
