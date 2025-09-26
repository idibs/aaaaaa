/*
esqueleto de popup pra criaçao de pessoas e estoque
vai pegar uma array de valores e o nome da tabela passads por porps 
ai vai da um map pra fazer os inputs
e guardar o codigo sql
trabalho do krl
*/

import { IoMdClose } from 'react-icons/io'
import CreateInput from '../inputs/InputComTitulo'
import { useEffect, useState } from 'react'
import Button from '../botoes/DesignBotao'
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io'

export default function PopupCriarRegistro({ showModal, onClose, insertTable }) {
  if (!showModal) return null

  const PAGE_SIZE = 4
  const [columns, setColumns] = useState([])
  const [selectOptions ,setSelectOptions] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
    window.api
      .getCategorias()
      .then((result) => {
        setSelectOptions(result)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
    if (insertTable === 'produto') {
      window.api.getColunasProdutos().then((result) => {
        setColumns(Object.keys(result[0]))
      })
    } else if (insertTable === 'cliente') {
      window.api.getColunasProdutos().then((result) => {
        setColumns(Object.keys(result[0]))
      })
    }
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
              {inputs.map((key) => key != 'Categoria' ? (
                <div className="mb-4">
                  <CreateInput
                    key={key}
                    text={key + ':'}
                    placeholder={`Digite o ${key}`}
                    inputName={key}
                    inputType={inputNumbers.includes(key) ? 'number' : 'text'}
                    ref={(el) => (inputs[key] = el)}
                  />
                </div>
              ) : (
                <div className="mb-4">
                  <select>
                    {selectOptions.map((key) => {
                      <option>{key}</option>
                    })}
                  </select>
                </div>
              ))}
            </div>
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
          </div>
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
