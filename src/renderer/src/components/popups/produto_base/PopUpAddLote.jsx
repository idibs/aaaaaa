import { IoMdClose } from 'react-icons/io'
import { useEffect, useState, useRef } from 'react'
import Button from '../../botoes/DesignBotao'
import { IoMdArrowRoundBack, IoMdArrowRoundForward, IoIosArrowDown } from 'react-icons/io'

export default function PopupAddLote({ showModal, onClose, insertTable }) {
  if (!showModal) return null

  const PAGE_SIZE = 5
  const columns = ['Preço', 'Quantidade']
  const [page, setPage] = useState(1)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [produtosBase, setProdutosBase] = useState([])
  const [formValues, setFormValues] = useState({}) // <-- persist valores por coluna
  const userDropdownRef = useRef(null)
  const [error, setError] = useState('')

  useEffect(() => {
    setPage(1)
    window.api
      .getProdutosNomes()
      .then((result) => {
        setProdutosBase(result)
      })
      .catch((error) => {
        console.error('Error fetching product names:', error)
      })
  }, [insertTable])

  const totalPages = Math.ceil(columns.length / PAGE_SIZE)
  const startIdx = (page - 1) * PAGE_SIZE
  const endIdx = startIdx + PAGE_SIZE
  const inputs = columns.slice(startIdx, endIdx)

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-10"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-[#1A6D12] w-200 z-20 h-180 p-4 bg-[#fffcff] rounded-xl shadow-2xl">
        <div className="flex justify-end">
          <button className="cursor-pointer" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>

        <h1 className="mt-4 text-4xl text-[#1A6D12] font-black py-4 text-center">
          Adicionar a um Lote
        </h1>

        <div className="flex flex-col justify-between h-140">
          <div>
            <div className="mt-7 flex flex-col px-30 h-90 w-full">
              {/* Dropdown de produtos base */}
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="border-solid border border-[#1A6D12] px-4 w-full py-2 rounded-xl flex justify-between items-center"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                  type="button"
                >
                  {formValues.ProdutoNome || 'Produtos Base'}
                  <IoIosArrowDown className="text-sm" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 max-h-90 w-full bg-[#044a23] text-white rounded shadow-[0_8px_25px_rgba(0,0,0,0.5)] z-30 overflow-y-scroll">
                    <button
                      className="block w-full text-left px-4 py-2 bg-red-900 hover:bg-red-950"
                      onClick={() => {
                        setDropdownOpen(false)
                        setFormValues((prev) => ({
                          ...prev,
                          Produto: '',
                          ProdutoNome: '',
                          ProdutoPreco: '',
                          ProdutoQuantidade: '',
                          ProdutoCompras: ''
                        }))
                      }}
                    >
                      Limpar seleção
                    </button>
                    {produtosBase.map((produto) => (
                      <button
                        key={produto.Nome}
                        className="block w-full text-left px-4 py-2 hover:bg-green-900"
                        onClick={() => {
                          setFormValues((prev) => ({
                            ...prev,
                            Produto: produto.Id,
                            ProdutoNome: produto.Nome,
                            ProdutoPreco: produto.Preço,
                            ProdutoQuantidade: produto.Quantidade,
                            ProdutoCompras: produto.Compras
                          }))
                          setDropdownOpen(false)
                        }}
                      >
                        {produto.Nome}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Aqui no futuro entram os inputs puxados do banco */}
              {inputs.map((coluna, index) => (
                <input
                  key={coluna} // manter coluna como key
                  type="number"
                  placeholder={coluna === 'Preço' ? 'Preço' : 'Quantidade em KG'}
                  value={formValues[coluna] ?? ''} // <-- valor persistido
                  onChange={(e) => setFormValues((prev) => ({ ...prev, [coluna]: e.target.value }))} // <-- atualiza o estado
                  className="border border-[#1A6D12] px-4 py-2 rounded-xl mt-3 focus:outline-none focus:ring-2 focus:ring-[#1A6D12] text-gray-800 placeholder-gray-500"
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-end w-full px-30 mt-2">
                <Button
                  onClick={() => setPage(page - 1)}
                  className={`${page === 1 ? 'hidden' : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'}`}
                  text={<IoMdArrowRoundBack />}
                />
                <Button
                  onClick={() => setPage(page + 1)}
                  className={`${page === totalPages ? 'hidden' : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'}`}
                  text={<IoMdArrowRoundForward />}
                />
              </div>
            )}
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="flex justify-center">
            <Button
              className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-60"
              text="Salvar"
              onClick={() => {
                setError('')

                const precoTotalNovo = parseFloat(formValues.Preço)
                const quantidadeNova = parseFloat(formValues.Quantidade)

                const precoMedioAntigo = parseFloat(formValues.ProdutoPreco) || 0
                const estoqueAntigo = parseFloat(formValues.ProdutoQuantidade) || 0

                // preço por kg/unidade do lote novo
                const precoUnitarioNovo = precoTotalNovo / quantidadeNova

                // novo preço médio correto
                const novoPrecoMedio =
                  (estoqueAntigo * precoMedioAntigo + quantidadeNova * precoUnitarioNovo) /
                  (estoqueAntigo + quantidadeNova)

                // nova quantidade em estoque
                const novaQuantidade = estoqueAntigo + quantidadeNova

                // caso queira acumular compras:
                const quantidadeCompradaNova = quantidadeNova

                window.api
                  .addLote(
                    formValues.Produto,
                    novoPrecoMedio,
                    novaQuantidade,
                    quantidadeCompradaNova
                  )
                  .then(onClose)
                  .catch((error) => setError(`erro: ${error.message}`))
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
