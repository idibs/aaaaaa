import { IoMdClose } from 'react-icons/io'
import { useEffect, useState, useRef } from 'react'
import Button from '../../botoes/DesignBotao'
import { IoMdArrowRoundBack, IoMdArrowRoundForward, IoIosArrowDown } from 'react-icons/io'

export default function PopupCriarRegistro({ showModal, onClose, insertTable }) {
  if (!showModal) return null

  const PAGE_SIZE = 4
  const [columns, setColumns] = useState([])
  const [selectOptions, setSelectOptions] = useState([])
  const [page, setPage] = useState(1)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [produtosBase, setProdutosBase] = useState([])
  const userDropdownRef = useRef(null)

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
  const inputNumbers = ['ML', 'Preço', 'Peso', 'Quantidade']

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-10"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-[#1A6D12] w-200 z-20 h-180 p-4 bg-[#fffcff] rounded-xl shadow-2xl">
        <div className="flex justify-end">
          <button className="cursor-pointer" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>
        <h1 className="mt-4 text-4xl text-[#1A6D12] font-black py-4 text-center">Novo Registro</h1>
        <div className="flex flex-col justify-between h-140">
          <div>
            <div className="mt-7 flex flex-col px-30 h-90 w-full">
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen((v) => !v)}
                  className="border-solid border border-[#1A6D12] px-4 w-full py-2 rounded-xl"
                  aria-haspopup="true"
                  aria-expanded={userDropdownOpen}
                  type="button"
                >
                  Produtos Base
                  <span className=" text-sm">
                    <IoIosArrowDown />
                  </span>
                </button>
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-[#044a23] text-white rounded shadow-[0_8px_25px_rgba(0,0,0,0.5)] z-30 overflow-hidden">
                    {produtosBase.map((produto) => (
                      <button
                        className="block px-4 py-2 hover:bg-green-900"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        {produto.Nome}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {totalPages > 1 && (
              <div className="flex justify-end w-full px-30">
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
            <Button className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-60" text="Salvar" />
          </div>
        </div>
      </div>
    </>
  )
}
