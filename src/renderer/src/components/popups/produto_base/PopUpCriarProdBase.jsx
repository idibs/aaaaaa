import { IoMdClose } from 'react-icons/io'
import { useEffect, useState, useRef } from 'react'
import Button from '../../botoes/DesignBotao'
import { IoMdArrowRoundBack, IoMdArrowRoundForward, IoIosArrowDown } from 'react-icons/io'

export default function PopupCriarProdBase({ showModal, onClose, insertTable }) {
  if (!showModal) return null

  const PAGE_SIZE = 5
  const columns = ['Nome', 'Preço', 'Quantidade', 'Descrição']
  const [page, setPage] = useState(1)
  const [formValues, setFormValues] = useState({}) // <-- persist valores por coluna
  const [error, setError] = useState('')
  const [userDropdownOpen2, setUserDropdownOpen2] = useState(false)
  const [produtosBase, setProdutosBase] = useState([{}])
  const userDropdownRef2 = useRef(null)

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

  const numberInputs = ['Preço', 'Quantidade']
  const categorias = ['Cereal', 'Ração', 'Variedade']

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
              {page === 1 && (
                <div className="relative" ref={userDropdownRef2}>
                  <button
                    onClick={() => setUserDropdownOpen2((v) => !v)}
                    className="border border-[#1A6D12] px-4 py-2 w-full rounded-xl flex justify-between items-center focus:outline-none"
                    aria-haspopup="true"
                    aria-expanded={userDropdownOpen2}
                    type="button"
                  >
                    {formValues.Categoria || 'Categoria'}
                    <IoIosArrowDown className="text-sm" />
                  </button>
                  {userDropdownOpen2 && (
                    <div className="absolute right-0 mt-2 max-h-90 w-full bg-[#044a23] text-white rounded shadow-[0_8px_25px_rgba(0,0,0,0.5)] z-30 overflow-y-scroll">
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
              {inputs.map((coluna, index) => (
                <input
                  key={coluna} // manter coluna como key
                  type={numberInputs.includes(coluna) ? 'number' : 'text'}
                  placeholder={coluna === 'Quantidade' ? 'Quantidade em KG' : coluna}
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

                const preco = parseFloat(formValues.Preço)
                const quantidade = parseFloat(formValues.Quantidade)
                const precoMedio = preco / quantidade
                const codigo = `P${produtosBase.length + 2}`

                if (isNaN(preco) || isNaN(quantidade)) {
                  setError('Por favor, insira valores válidos para preço e quantidade.')
                  return
                }

                window.api
                  .createProdutoBase([
                    formValues.Nome,
                    precoMedio,
                    quantidade,
                    formValues.Descrição,
                    formValues.Categoria === 'Cereal'
                      ? null
                      : formValues.Categoria === 'Ração'
                        ? 2
                        : 1,
                    codigo
                  ])
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
