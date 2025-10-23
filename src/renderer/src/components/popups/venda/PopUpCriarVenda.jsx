import { IoMdClose } from 'react-icons/io'
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io'
import { useState, useEffect } from 'react'
import Button from '../../botoes/DesignBotao'

export default function PopupCriarVenda({ showModal, onClose, insertTable }) {
  if (!showModal) return null

  const PAGE_SIZE = 4
  const [columns, setColumns] = useState([])
  const [page, setPage] = useState(1)

  /* 
  useEffect(() => {
    setPage(1)
    window.api
      .getVendasColunas()
      .then((result) => setColumns(result))
      .catch((error) => console.error('Erro ao buscar colunas de vendas:', error))
  }, [insertTable])
  */

  const totalPages = Math.ceil(columns.length / PAGE_SIZE)
  const startIdx = (page - 1) * PAGE_SIZE
  const endIdx = startIdx + PAGE_SIZE
  const inputs = columns.slice(startIdx, endIdx)

  const inputNumbers = ['Quantidade', 'Preço', 'Desconto', 'Total']

  return (
    <>
      {/* Fundo escuro */}
      <div className="fixed inset-0 bg-black/40 z-10"></div>

      {/* Conteúdo do popup */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-[#1A6D12] w-200 z-20 h-180 p-4 bg-[#fffcff] rounded-xl shadow-2xl">
        <div className="flex justify-end">
          <button className="cursor-pointer" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>

        <h1 className="mt-4 text-4xl text-[#1A6D12] font-black py-4 text-center">
          Nova Venda
        </h1>

        {/* Container principal com justify-between */}
        <div className="flex flex-col justify-between h-140">
          {/* Campos dinâmicos */}
          <div className="mt-7 flex flex-col px-30 h-90 w-full">
            {inputs.map((coluna, index) => (
              <input
                key={index}
                type={inputNumbers.includes(coluna) ? 'number' : 'text'}
                placeholder={coluna}
                className="border border-[#1A6D12] px-4 py-2 rounded-xl mt-3 focus:outline-none focus:ring-2 focus:ring-[#1A6D12] text-gray-800 placeholder-gray-500"
              />
            ))}
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex justify-end w-full px-30 mt-2">
              <Button
                onClick={() => setPage(page - 1)}
                className={`${
                  page === 1
                    ? 'hidden'
                    : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'
                }`}
                text={<IoMdArrowRoundBack />}
              />
              <Button
                onClick={() => setPage(page + 1)}
                className={`${
                  page === totalPages
                    ? 'hidden'
                    : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'
                }`}
                text={<IoMdArrowRoundForward />}
              />
            </div>
          )}

          {/* Botão salvar */}
          <div className="flex justify-center">
            <Button
              className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-60"
              text="Salvar"
            />
          </div>
        </div>
      </div>
    </>
  )
}
