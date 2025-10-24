/*
esqueleto de popup pra criaçao de pessoas e estoque
vai pegar uma array de valores e o nome da tabela passads por porps 
ai vai da um map pra fazer os inputs
e guardar o codigo sql
trabalho do krl
*/

import { IoMdClose } from 'react-icons/io'
import { useEffect, useState, useRef } from 'react'
import Button from '../../botoes/DesignBotao'
import { IoMdArrowRoundBack, IoMdArrowRoundForward, IoIosArrowDown } from 'react-icons/io'

// Popup para editar um produto. Baseado no PopUpCriarProd.jsx,
// recebe `initialData` (objeto com os campos do produto) e um `onSave` opcional.
export default function PopUpEditProd({ showModal, onClose, initialData = {}, onSave }) {
  if (!showModal) return null

  const PAGE_SIZE = 5
  const [columns, setColumns] = useState([])
  const [produtosBase, setProdutosBase] = useState([])
  const [page, setPage] = useState(1)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const userDropdownRef = useRef(null)
  const [baseValue, setBaseValue] = useState('')

  // valores controlados para os inputs
  const [values, setValues] = useState(() => ({ ...initialData }))

  useEffect(() => {
    // reset page and load auxiliary data
    setPage(1)
    window.api
      .getProdutosNomes()
      .then((result) => setProdutosBase(result))
      .catch((err) => console.error('Erro ao buscar produtos base:', err))
    // Se initialData vier com chaves, use-as como colunas (puxar campos da tabela)
    if (initialData && Object.keys(initialData).length > 0) {
      setColumns(Object.keys(initialData).filter((col) => col !== 'Id'))
      return
    }

    // tentar recuperar colunas relevantes (fallback simples)
    window.api
      .getPedidoProdutosByStatus?.('Em analise')
      .then((cols) => {
        if (Array.isArray(cols) && cols.length > 0) {
          setColumns(Object.keys(cols[0]).filter((col) => col !== 'Id'))
        }
      })
      .catch((err) => console.warn('Não foi possível obter colunas via getPedidoProdutosByStatus:', err))
  }, [])

  // quando `initialData` mudar, atualiza os valores e o produto base selecionado
  useEffect(() => {
    setValues({ ...initialData })
    if (initialData && initialData.Base) setBaseValue(initialData.Base)
    if (initialData && Object.keys(initialData).length > 0) {
      setColumns(Object.keys(initialData).filter((col) => col !== 'Id'))
    }
  }, [initialData])

  const totalPages = Math.max(1, Math.ceil(columns.length / PAGE_SIZE))
  const startIdx = (page - 1) * PAGE_SIZE
  const endIdx = startIdx + PAGE_SIZE
  const inputs = columns.slice(startIdx, endIdx)

  const inputNumbers = ['ML', 'Preço', 'Peso', 'Quantidade']

  function handleChange(col, v) {
    setValues((prev) => ({ ...prev, [col]: v }))
  }

  async function handleSave() {
    const payload = { ...values }
    if (baseValue) payload.Base = baseValue
    if (onSave) {
      onSave(payload)
      onClose()
      return
    }

    // fallback: chamar API exposta no preload
    try {
      if (window.api && window.api.updateProduto) {
        await window.api.updateProduto(payload)
        onClose()
      } else {
        console.warn('Nenhuma função onSave fornecida e window.api.updateProduto não existe')
      }
    } catch (err) {
      console.error('Erro ao atualizar produto:', err)
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-10"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-[#1A6D12] w-200 z-20 h-180 p-4 bg-[#fffcff] rounded-xl shadow-2xl">
        <div className="flex justify-end">
          <button className="cursor-pointer" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>

        <h1 className="mt-4 text-4xl text-[#1A6D12] font-black py-4 text-center">Editar Produto</h1>

        <div className="flex flex-col justify-between h-140">
          <div>
            <div className="mt-7 flex flex-col px-30 h-90 w-full">
              {/* Dropdown de produtos base */}
              <div className="relative mb-6" ref={userDropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen((v) => !v)}
                  className="border-solid border border-[#1A6D12] px-4 w-full py-2 rounded-xl flex justify-between items-center"
                  aria-haspopup="true"
                  aria-expanded={userDropdownOpen}
                  type="button"
                >
                  {baseValue || 'Produtos Base'}
                  <IoIosArrowDown className="text-sm" />
                </button>
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-full bg-[#044a23] text-white rounded shadow-[0_8px_25px_rgba(0,0,0,0.5)] z-30 overflow-hidden">
                    {produtosBase.map((produto) => (
                      <button
                        key={produto.Nome}
                        className="block w-full text-left px-4 py-2 hover:bg-green-900"
                        onClick={() => {
                          setBaseValue(produto.Nome)
                          setUserDropdownOpen(false)
                        }}
                      >
                        {produto.Nome}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Inputs gerados dinamicamente a partir das colunas */}
              {inputs.map((coluna, index) => (
                <input
                  key={index}
                  type={inputNumbers.includes(coluna) ? 'number' : 'text'}
                  placeholder={coluna}
                  value={values[coluna] ?? ''}
                  onChange={(e) => handleChange(coluna, e.target.value)}
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

          <div className="flex justify-center">
            <Button onClick={handleSave} className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-60" text="Salvar" />
          </div>
        </div>
      </div>
    </>
  )
}
