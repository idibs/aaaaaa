import Tabela from '../components/tabelas/Tabela'
import Input from '../components/inputs/Input'
import { useState, useEffect } from 'react'
import Button from '../components/botoes/DesignBotao'
import Popup from '../components/popups/produtos/PopUpCriarProd' // popup de criar produto

export default function Produtos() {
  // define os dados da tabela, improviso por falta de banco de dados
  const [data, setData] = useState([])
  // define a tabela selecionada, sendo a inicial 'cliente'
  const [categoria, setCategoria] = useState('Cereal')
  const [term, setTerm] = useState('') // termo de pesquisa
  const [filteredData, setFilteredData] = useState([]) // dados filtrados
  // controla a visibilidade do modal
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // busca ao mudar categoria ou quando o modal for fechado/aberto
    if (categoria === 'Cereal') {
      window.api
        .getEnsacados()
        .then((result) => setData(result))
        .catch((error) => console.error('Error fetching data:', error))
    } else if (categoria === 'Ração' || categoria === 'Variedade') {
      window.api
        .getOutrosProdutosByCategoria(categoria)
        .then((result) => setData(result))
        .catch((error) => console.error('Error fetching data:', error))
    }
  }, [categoria, showModal, Tabela])

  // useEffect separado para filtrar os dados sempre que 'data' ou 'term' mudarem
  useEffect(() => {
    setFilteredData(data.filter((item) => item.Nome.toLowerCase().includes(term.toLowerCase())))
  }, [term, data]) // Executa quando 'data' ou 'term' mudam

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
              placeholder="Buscar..."
              inputName="nome"
              onChange={(e) => setTerm(e.target.value)} // altera o termo de pesquisa
            />
          </div>
          {/* options */}
          <div className="flex gap-3">
            <Button
              className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-40 h-full py-2"
              text="Novo Produto"
              onClick={openModal}
            />
          </div>
        </div>
        {/* table */}
        <div className="border border-[#1A6D12] h-120 overflow-auto w-full mt-3">
          <Tabela data={filteredData ? filteredData : []} insertTable={categoria} />
        </div>
        {/* escolher entre tabelas */}
        <div className="mt-4 mb-4 flex justify-between">
          <Button
            onClick={() => changeData('Cereal')}
            className={`${categoria === 'Cereal' ? 'text-white bg-[#1A6D12] hover:bg-[#145A0C]' : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'} w-60`}
            text="Cereais"
          />
          <Button
            onClick={() => changeData('Ração')}
            className={`${categoria === 'Ração' ? 'text-white bg-[#1A6D12] hover:bg-[#145A0C]' : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'} w-60`}
            text="Rações"
          />
          <Button
            onClick={() => changeData('Variedade')}
            className={`${categoria === 'Variedade' ? 'text-white bg-[#1A6D12] hover:bg-[#145A0C]' : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'} w-60`}
            text="Variedades"
          />
        </div>
      </div>
      {/* Popup para criar produto */}
      <Popup showModal={showModal} onClose={closeModal} table={data} categoria={categoria} />
    </div>
  )
}
