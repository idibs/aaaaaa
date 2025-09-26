import Tabela from '../components/tabelas/Tabela'
import { useState, useEffect } from 'react'
import Button from '../components/botoes/DesignBotao'
import Popup from '../components/popups/PopupCriarRegistro' // popup de criar Pessoa
import Input from '../components/inputs/Input'

export default function Pessoas() {
  // define os dados da tabela, improviso por falta de banco de dados
  const [data, setData] = useState([])
  // define a tabela selecionada, sendo a inicial 'cliente'
  const [funcao, setFuncao] = useState('cliente')
  const [term, setTerm] = useState('')  // termo de pesquisa
  const [filteredData, setFilteredData] = useState([])  // dados filtrados
  // controla a visibilidade do modal
  const [showModal, setShowModal] = useState(false)
  const [insertTable, setInsertTable] = useState('cliente') // tabela onde vai ser inserido o novo registro

  useEffect(() => {
    window.api
      .getPessoas(funcao)
      .then((result) => {
        setData(result)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
    setInsertTable(funcao)
  }, [funcao])  // Esse useEffect executa quando 'funcao' mudar

  // useEffect separado para filtrar os dados sempre que 'data' ou 'term' mudarem
  useEffect(() => {
    console.log(data)
    setFilteredData(
      data.filter(item =>
        item.Nome_pes.toLowerCase().includes(term.toLowerCase())
      )
    )
  }, [term, data])  // Executa quando 'data' ou 'term' mudam

  const changeData = (funcao) => {
    setFuncao(funcao)
  }

  // funções para abrir e fechar o modal
  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  return (
    <div className="pt-10">
      <h1 className="text-4xl text-[#1A6D12] font-black py-4 text-center">Controle de Pessoas</h1>
      {/* texto do input da tabela */}
      <p className="text-black ps-30 mt-10 mb-3">Nome da Pessoa</p>
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
            onChange={(e) => setTerm(e.target.value)}  // altera o termo de pesquisa
            />
        </div>
        {/* options */}
        <div className="flex gap-3">
          <Button
            className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-40 h-full py-2"
            text="Nova Pessoa"
            onClick={openModal}
          />
          <Button 
            className="text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec] w-40 py-2"
            text="Exportar"
          />
        </div>
        </div>
        {/* table */}
        <div className="border border-[#1A6D12] h-120 overflow-auto w-full mt-3">
          <Tabela data={filteredData ? filteredData : []} insertTable={insertTable}/>
        </div>
        {/* escolher entre tabelas */}
        <div className="mt-4 mb-4 flex justify-between">
          <Button
            onClick={() => changeData('cliente')}
            className={`${funcao === 'cliente' ? 'text-white bg-[#1A6D12] hover:bg-[#145A0C]' : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'} w-60`}
            text="Clientes"
          />
          <Button
            onClick={() => changeData('funcionario')}
            className={`${funcao === 'funcionario' ? 'text-white bg-[#1A6D12] hover:bg-[#145A0C]' : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'} w-60`}
            text="Funcionários"
          />
          <Button
            onClick={() => changeData('fornecedor')}
            className={`${funcao === 'fornecedor' ? 'text-white bg-[#1A6D12] hover:bg-[#145A0C]' : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'} w-60`}
            text="Fornecedores"
          />
        </div>
      </div>
      {/* Popup para criar Pessoa */}
      <Popup showModal={showModal} onClose={closeModal} table={data} insertTable={insertTable}/>
    </div>
  )
}
