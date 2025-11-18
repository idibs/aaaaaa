import Tabela from '../components/tabelas/Tabela'
import { useState, useEffect } from 'react'
import Button from '../components/botoes/DesignBotao'
import Popup from '../components/popups/pessoas/PopUpCriarPes' // popup de criar Pessoa
import Input from '../components/inputs/Input'

export default function Pessoas() {
  // define os dados da tabela, improviso por falta de banco de dados
  const [data, setData] = useState([])
  // define a tabela selecionada, sendo a inicial 'cliente'
  const [tipo, setTipo] = useState('Cliente')
  const [term, setTerm] = useState('') // termo de pesquisa
  const [filteredData, setFilteredData] = useState([]) // dados filtrados
  // controla a visibilidade do modal
  const [showModal, setShowModal] = useState(false)
  const insertTable = 'cliente'

  useEffect(() => {
    window.api
      .getPessoasByTipo(tipo)
      .then((result) => {
        setData(result)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [tipo, Tabela, showModal]) // Esse useEffect executa quando 'tipo' mudar

  // useEffect separado para filtrar os dados sempre que 'data' ou 'term' mudarem
  useEffect(() => {
    setFilteredData(data.filter((item) => item.Nome.toLowerCase().includes(term.toLowerCase())))
  }, [term, data]) // Executa quando 'data' ou 'term' mudam

  const changeData = (tipo) => {
    setTipo(tipo)
  }

  // funções para abrir e fechar o modal
  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  // callback para quando um item for salvo no popup de edição
  async function handlePessoaSave(payload, original) {
    try {
      // tenta atualizar no backend (se existir)
      if (window.api && window.api.updatePessoa) {
        await window.api.updatePessoa(payload)
      }

      // atualiza o estado local `data` (mantém Id se não foi enviado)
      const id = original?.Id ?? original?.id
      setData((prev) =>
        prev.map((item) => {
          const itemId = item.Id ?? item.id
          if (itemId === id) return { ...item, ...payload, Id: itemId }
          return item
        })
      )
    } catch (err) {
      console.error('Erro ao salvar pessoa:', err)
    }
  }

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
              placeholder="Buscar..."
              inputName="nome"
              onChange={(e) => setTerm(e.target.value)} // altera o termo de pesquisa
            />
          </div>
          {/* options */}
          <div className="flex gap-3">
            <Button
              className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-40 h-full py-2"
              text="Nova Pessoa"
              onClick={openModal}
            />
          </div>
        </div>
        {/* table */}
        <div className="border border-[#1A6D12] h-120 overflow-auto w-full mt-3">
          <Tabela
            data={filteredData ? filteredData : []}
            insertTable={insertTable}
            onSave={handlePessoaSave}
          />
        </div>
        {/* escolher entre tabelas */}
        <div className="mt-4 mb-4 flex justify-between">
          <Button
            onClick={() => changeData('Cliente')}
            className={`${tipo === 'Cliente' ? 'text-white bg-[#1A6D12] hover:bg-[#145A0C]' : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'} w-60`}
            text="Clientes"
          />
          <Button
            onClick={() => changeData('Vendedor')}
            className={`${tipo === 'Vendedor' ? 'text-white bg-[#1A6D12] hover:bg-[#145A0C]' : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'} w-60`}
            text="Vendedores"
          />
          <Button
            onClick={() => changeData('Fornecedor')}
            className={`${tipo === 'Fornecedor' ? 'text-white bg-[#1A6D12] hover:bg-[#145A0C]' : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'} w-60`}
            text="Fornecedores"
          />
        </div>
      </div>
      {/* Popup para criar Pessoa */}
      <Popup showModal={showModal} onClose={closeModal} table={data} insertTable={insertTable} />
    </div>
  )
}
