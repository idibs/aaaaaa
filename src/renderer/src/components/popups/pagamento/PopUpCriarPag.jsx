import { IoMdClose } from 'react-icons/io'
import { useEffect, useState, useRef } from 'react'
import Button from '../../botoes/DesignBotao'
import { IoMdArrowRoundBack, IoMdArrowRoundForward, IoIosArrowDown } from 'react-icons/io'

export default function PopupCriarPag({ showModal, onClose, insertTable }) {
  if (!showModal) return null

  const PAGE_SIZE = 5
  const [columns, setColumns] = useState([])
  const [selectOptions, setSelectOptions] = useState([])
  const [page, setPage] = useState(1)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [pagamentosBase, setProdutosBase] = useState([])
  const [baseValue, setBaseValue] = useState('')
  const userDropdownRef = useRef(null)

  {
    /* 
  useEffect((status, nome, cargo, horas_trabalhadas, período, data_pagamento, observações) => {
    setPage(1)
    window.api
      .getProdutosNomes()
      .then((result) => {
        setProdutosBase(result)
      })
      .catch((error) => {
        console.error('Error fetching product names:', error)
      })
    window.api
      .getPedidoProdutosByStatus('Em analise')
      .then((cols) => {
        setColumns(Object.keys(cols[0]).filter((col) => col !== 'Id'))
      })
      .catch((error) => {
        console.error('Error fetching table columns:', error)
      })
  }, [insertTable])
*/
  }
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

        <h1 className="mt-4 text-4xl text-[#1A6D12] font-black py-4 text-center">Novo Pagamento</h1>

        <div className="flex flex-col justify-between h-140">
          <div>
            <div className="mt-7 flex flex-col px-30 h-90 w-full">
              {/* Aqui no futuro entram os inputs puxados do banco */}
              {inputs.map((coluna, index) => (
                <input
                  key={index}
                  type={inputNumbers.includes(coluna) ? 'number' : 'text'}
                  placeholder={coluna}
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
            <Button className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-60" text="Salvar" />
          </div>
        </div>
      </div>
    </>
  )
}
