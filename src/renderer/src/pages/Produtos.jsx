import Tabela from '../components/tabelas/Tabela'
import Input from '../components/inputs/Input'
import { useState, useEffect } from 'react'
import Button from '../components/botoes/DesignBotao'
import Popup from '../components/popups/PopupCriarRegistro' // popup de criar produto

export default function Produtos() {
    // define os dados da tabela, improviso por falta de banco de dados
  const [data, setData] = useState([])
  // define a tabela selecionada, sendo a inicial 'cliente'
  const [categoria, setCategoria] = useState('Cereais')
  const [term, setTerm] = useState('')  // termo de pesquisa
  const [filteredData, setFilteredData] = useState([])  // dados filtrados
  // controla a visibilidade do modal
  const [showModal, setShowModal] = useState(false)

  const insertTable = 'produto'

  useEffect(() => {
    window.api
      .getProdutos(categoria)
      .then((result) => {
        setData(result)
        console.log(result)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [categoria])

    // useEffect separado para filtrar os dados sempre que 'data' ou 'term' mudarem
  useEffect(() => {
    console.log(data)
    setFilteredData(
      data.filter(item =>
        item.Nome_prod.toLowerCase().includes(term.toLowerCase())
      )
    )
  }, [term, data])  // Executa quando 'data' ou 'term' mudam

  // função para alterar os dados da tabela e o tipo selecionado controlado pelos botões de baixo
  const changeData = (categoria) => {
    setCategoria(categoria)
  }

  // funções para abrir e fechar o modal
  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  return (
    <div className="pt-10">
      <h1 className="text-4xl text-[#1A6D12] font-black py-4 text-center">Produtos em Estoque</h1>
      {/* texto do input da tabela */}
      <p className="text-black ps-30 mt-10 mb-3">Nome do Produto:</p>
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
            onClick={() => changeData('Cereais')}
            className={`${categoria === 'Cereais' ? 'text-white bg-[#1A6D12] hover:bg-[#145A0C]' : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'} w-60`}
            text="Cereais"
          />
          <Button
            onClick={() => changeData('Rações')}
            className={`${categoria === 'Rações' ? 'text-white bg-[#1A6D12] hover:bg-[#145A0C]' : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'} w-60`}
            text="Rações"
          />
          <Button
            onClick={() => changeData('Variedades')}
            className={`${categoria === 'Variedades' ? 'text-white bg-[#1A6D12] hover:bg-[#145A0C]' : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'} w-60`}
            text="Variedades"
          />
        </div>
      </div>
      {/* Popup para criar produto */}
      <Popup showModal={showModal} onClose={closeModal} table={data} insertTable={insertTable}/>
    </div>
  )
}
