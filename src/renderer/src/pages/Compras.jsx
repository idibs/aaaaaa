import Tabela from '../components/tabelas/Tabela'
import Input from '../components/inputs/Input'
import { useState, useEffect } from 'react'
import Button from '../components/botoes/DesignBotao'
import PopupAddLote from '../components/popups/produto_base/PopUpAddLote' // popup de adicionar lote
import PopupCriarProduto from '../components/popups/produto_base/PopUpCriarProdBase' // popup de criar produto

export default function Compras() {
  const [data, setData] = useState([])
  const [term, setTerm] = useState('') // termo de pesquisa
  const [filteredData, setFilteredData] = useState([]) // dados filtrados
  const [showAddLote, setShowAddLote] = useState(false)
  const [showCriarProduto, setShowCriarProduto] = useState(false)

  const insertTable = 'produto'

  useEffect(() => {
    window.api
      .getProdutos()
      .then((result) => setData(result))
      .catch((error) => console.error('Error fetching data:', error))
  }, [data, showAddLote, showCriarProduto, Tabela])

  useEffect(() => {
    setFilteredData(data.filter((item) => item.Nome.toLowerCase().includes(term.toLowerCase())))
  }, [term, data])

  return (
    <div className="pt-10 overflow-hidden">
      <h1 className="text-4xl text-[#1A6D12] font-black py-4 text-center">
        Valor dos Itens em Estoque
      </h1>

      <p className="text-black ps-30 mt-10 mb-3">Nome do Produto:</p>

      <div className="h-full w-full px-30">
        <div className="w-full flex justify-between">
          {/* Campo de busca */}
          <div className="flex flex-col w-1/3">
            <Input
              inputType="text"
              placeholder="Buscar..."
              inputName="nome"
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>

          {/* Botões de ação */}
          <div className="flex gap-3">
            <Button
              className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-40 h-full py-2"
              text="Adicionar Lote"
              onClick={() => setShowAddLote(true)}
            />
            <Button
              className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-40 h-full py-2"
              text="Criar Lote"
              onClick={() => setShowCriarProduto(true)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="max-w-full mt-6 mx-auto">
          <div className="border border-[#1A6D12] rounded-md shadow-sm h-[50vh] lg:h-[70vh] max-h-[100vh]">
            <div className="w-full h-full overflow-auto">
              <Tabela data={filteredData ? filteredData : []} insertTable={insertTable} />
            </div>
          </div>
        </div>
      </div>

      {/* Popups */}
      <PopupAddLote
        showModal={showAddLote}
        onClose={() => setShowAddLote(false)}
        table={data}
        insertTable={insertTable}
      />
      <PopupCriarProduto
        showModal={showCriarProduto}
        onClose={() => setShowCriarProduto(false)}
        table={data}
        insertTable={insertTable}
      />
    </div>
  )
}
