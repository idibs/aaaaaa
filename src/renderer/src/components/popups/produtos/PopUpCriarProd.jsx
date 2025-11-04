import { IoMdClose } from 'react-icons/io'
import { useEffect, useState, useRef } from 'react'
import Button from '../../botoes/DesignBotao'
import { IoMdArrowRoundBack, IoMdArrowRoundForward, IoIosArrowDown } from 'react-icons/io'

export default function PopupCriarRegistro({ showModal, onClose, categoria }) {
  if (!showModal) return null

  const PAGE_SIZE = 5
  const [columns, setColumns] = useState([])
  const [isProductSelected, setIsProductSelected] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null) // <-- novo estado para o produto selecionado
  const [page, setPage] = useState(1)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [userDropdownOpen2, setUserDropdownOpen2] = useState(false)
  const [produtosBase, setProdutosBase] = useState([{}])
  const [formValues, setFormValues] = useState({}) // <-- persist valores por coluna
  const userDropdownRef = useRef(null)
  const userDropdownRef2 = useRef(null)

  useEffect(() => {
    // reset ao abrir/modal ou trocar categoria
    setPage(1)
    setFormValues({})
    window.api
      .getProdutosNomes()
      .then((result) => {
        setProdutosBase(result)
      })
      .catch((error) => {
        console.error('Error fetching product names:', error)
      })
    categoria === 'Cereal'
      ? setColumns(['Nome', 'Preço', 'Peso', 'Quantidade', 'Código'])
      : setColumns([
          'Nome',
          'Preço',
          'Quantidade',
          'Peso',
          'Código',
          'Foto',
          'Descrição',
          'Categoria'
        ])
  }, [categoria, showModal]) // <- inclui showModal para resetar ao abrir

  const totalPages = Math.ceil(columns.length / PAGE_SIZE)
  const startIdx = (page - 1) * PAGE_SIZE
  const endIdx = startIdx + PAGE_SIZE
  const inputs = columns.slice(startIdx, endIdx)
  const inputNumbers = ['Preço', 'Peso', 'Quantidade']
  const categorias = ['Ração', 'Variedade']

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-10"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-[#1A6D12] w-200 z-20 h-180 p-4 bg-[#fffcff] rounded-xl shadow-2xl">
        <div className="flex justify-end">
          <button className="cursor-pointer" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>

        <h1 className="mt-4 text-4xl text-[#1A6D12] font-black py-4 text-center">Novo Produto</h1>

        <div className="flex flex-col justify-between h-140">
          <div>
            <div className="mt-7 flex flex-col px-30 h-90 w-full">
              {/* Dropdown de produtos base */}
              {page === 1 && (
                <div className="relative" ref={userDropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen((v) => !v)}
                    className="rounded-xl flex justify-between items-center w-full py-2 px-4 cursor-pointer text-white bg-[#145A0C] h-full"
                    aria-haspopup="true"
                    aria-expanded={userDropdownOpen}
                    type="button"
                  >
                    {formValues.Nome || 'Produtos Base'}
                    <IoIosArrowDown className="text-sm" />
                  </button>
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-full bg-[#044a23] text-white rounded shadow-[0_8px_25px_rgba(0,0,0,0.5)] z-30 overflow-hidden">
                      {/* Botão Limpar */}
                      <button
                        className="block w-full text-left px-4 py-2 bg-red-800 hover:bg-red-900 border-b border-white/20"
                        onClick={() => {
                          setUserDropdownOpen(false)
                          setIsProductSelected(false)
                          setSelectedProduct(null) // limpa produto selecionado
                          setFormValues((prev) => ({ ...prev, Nome: '', Preço: '' }))
                        }}
                      >
                        Limpar seleção
                      </button>
                      {/* Lista de produtos */}
                      {produtosBase.map((produto) => (
                        <button
                          key={produto.Nome}
                          className="block w-full text-left px-4 py-2 hover:bg-green-900"
                          onClick={() => {
                            setUserDropdownOpen(false)
                            // preenche o campo "Nome" no formValues e guarda o produto selecionado
                            setIsProductSelected(true)
                            setSelectedProduct(produto) // salva o objeto para cálculos futuros
                            setFormValues((prev) => ({
                              ...prev,
                              Nome: produto.Nome,
                              Preço: produto.Preço
                            }))
                          }}
                        >
                          {produto.Nome}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Dropdown de produtos base */}
              {page === 1 && categoria !== 'Cereal' && (
                <div className="relative" ref={userDropdownRef2}>
                  <button
                    onClick={() => setUserDropdownOpen2((v) => !v)}
                    className="rounded-xl flex justify-between items-center w-full py-2 px-4 cursor-pointer text-white bg-[#145A0C] h-full"
                    aria-haspopup="true"
                    aria-expanded={userDropdownOpen2}
                    type="button"
                  >
                    {formValues.Categoria || 'Categoria'}
                    <IoIosArrowDown className="text-sm" />
                  </button>
                  {userDropdownOpen2 && (
                    <div className="absolute right-0 mt-2 w-full bg-[#044a23] text-white rounded shadow-[0_8px_25px_rgba(0,0,0,0.5)] z-30 overflow-hidden">
                      {/* Botão Limpar */}
                      <button
                        className="block w-full text-left px-4 py-2 bg-red-800 hover:bg-red-900 border-b border-white/20"
                        onClick={() => {
                          setUserDropdownOpen2(false)
                          setFormValues((prev) => ({ ...prev, Categoria: '' }))
                        }}
                      >
                        Limpar seleção
                      </button>
                      {/* Lista de produtos */}
                      {categorias.map((c) => (
                        <button
                          key={c}
                          className="block w-full text-left px-4 py-2 hover:bg-green-900"
                          onClick={() => {
                            setUserDropdownOpen2(false) // Corrigido: era setUserDropdownOpen
                            setFormValues((prev) => ({
                              ...prev,
                              Categoria: c
                            }))
                          }}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Aqui no futuro entram os inputs puxados do banco */}
              {inputs.map((coluna) => {
                // desabilita apenas o campo "Nome" quando um produto base for selecionado
                if (coluna === 'Nome' || coluna === 'Preço') {
                  return (
                    <input
                      key={coluna}
                      type={inputNumbers.includes(coluna) ? 'number' : 'text'}
                      placeholder={coluna}
                      value={formValues[coluna] ?? ''} // <-- valor persistido
                      onChange={(e) =>
                        setFormValues((prev) => ({ ...prev, [coluna]: e.target.value }))
                      } // <-- atualiza o estado
                      disabled={isProductSelected}
                      className="border border-[#1A6D12] px-4 py-2 rounded-xl mt-3 focus:outline-none focus:ring-2 focus:ring-[#1A6D12] text-gray-800 placeholder-gray-500"
                    />
                  )
                } else if (coluna === 'Peso') {
                  return (
                    <input
                      key={coluna}
                      type="number"
                      placeholder={coluna}
                      value={formValues[coluna] ?? ''} // <-- valor persistido
                      onChange={(e) => {
                        const val = e.target.value
                        // se produto selecionado, usar selectedProduct de forma segura
                        if (isProductSelected && selectedProduct) {
                          const precoUnit = parseFloat(selectedProduct.Preço) || 0
                          const pesoNum = parseFloat(val) || 0
                          const novoPreco = precoUnit * pesoNum
                          setFormValues((prev) => ({
                            ...prev,
                            [coluna]: val,
                            Preço: novoPreco,
                            Nome: `${selectedProduct.Nome} ${val}Kg`
                          }))
                        } else {
                          setFormValues((prev) => ({ ...prev, [coluna]: val }))
                        }
                      }} // <-- atualiza o estado
                      className="border border-[#1A6D12] px-4 py-2 rounded-xl mt-3 focus:outline-none focus:ring-2 focus:ring-[#1A6D12] text-gray-800 placeholder-gray-500"
                    />
                  )
                }

                // demais inputs permanecem editáveis
                return (
                  <input
                    key={coluna} // manter coluna como key
                    type={inputNumbers.includes(coluna) ? 'number' : 'text'}
                    placeholder={coluna}
                    value={formValues[coluna] ?? ''} // <-- valor persistido
                    onChange={(e) =>
                      setFormValues((prev) => ({ ...prev, [coluna]: e.target.value }))
                    } // <-- atualiza o estado
                    className="border border-[#1A6D12] px-4 py-2 rounded-xl mt-3 focus:outline-none focus:ring-2 focus:ring-[#1A6D12] text-gray-800 placeholder-gray-500"
                  />
                )
              })}
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

          <div className="flex justify-center">
            <Button
              className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-60"
              text="Salvar"
              onClick={() => {
                let id
                isProductSelected ? (id = selectedProduct.Id) : (id = null)
                categoria === 'Cereal'
                  ? window.api
                      .createEnsacado([
                        formValues.Código,
                        formValues.Nome,
                        formValues.Peso,
                        formValues.Preço,
                        formValues.Quantidade,
                        id
                      ])
                      .then(onClose)
                      .catch(onClose)
                  : window.api
                      .createOutroProduto([
                        formValues.Nome,
                        formValues.Preço,
                        formValues.Quantidade,
                        formValues.Peso,
                        formValues.Código,
                        formValues.Descrição,
                        formValues.Categoria
                      ])
                      .then(onClose)
                      .catch(onClose)
                // TODO: enviar formValues para a API / banco
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
