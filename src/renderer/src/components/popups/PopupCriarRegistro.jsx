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

const PAGE_SIZE = 4
let columns = []

export default function PopupCriarRegistro({ showModal, onClose, insertTable }) {
  if (!showModal) return null

  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
    if (insertTable === 'produto') {
      window.api.getProductsColumns().then((result) => {
        columns = Object.keys(result[0])
      })
    } else if (insertTable === 'cliente') {
      window.api.getClientColumns().then((result) => {
        columns = Object.keys(result[0])
      })
    }
  }, [])

  const totalPages = Math.ceil(columns.length / PAGE_SIZE)
  const startIdx = (page - 1) * PAGE_SIZE
  const endIdx = startIdx + PAGE_SIZE
  const inputs = columns.slice(startIdx, endIdx)

  return (
    <div className="border border-[#1A6D12] w-200 z-20 h-180 absolute top-13 start-85 p-4 bg-[#fffcff] rounded-xl shadow-2xl">
      <div className="flex justify-end">
        <button className="cursor-pointer" onClick={onClose}>
          <IoMdClose />
        </button>
      </div>
      <h1 className="mt-4 text-4xl text-[#1A6D12] font-black py-4 text-center">Novo Registro</h1>
      <div className="flex flex-col justify-between h-140">
        <div>
          <div className="mt-7 flex flex-col px-30 h-90 w-full">
            {inputs.map((key) => (
              <div className="mb-4">
                <CreateInput
                  key={key}
                  text={key + ':'}
                  placeholder={`Digite o ${key}`}
                  inputName={key}
                  inputType={'text'}
                  ref={(el) => (inputs[key] = el)}
                />
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
            onClick={() => {
              insertData
            }}
            className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-60"
            text="Salvar"
          />
        </div>
      </div>
    </div>
  )
}

/*<div className="mb-2">
          <CreateInput
            text="Nome:"
            placeholder="Digite o nome do produto"
            inputName="nome"
            inputType="text"
          />
        </div>
        <div className="mb-2">
          <CreateInput
            text="Quantidade:"
            placeholder="Digite a quantidade"
            inputName="id"
            inputType="number"
          />
        </div>
        <div className="mb-2">
          <CreateInput
            text="Nome:"
            placeholder="Digite o nome do produto"
            inputName="nome"
            inputType="text"
          />
        </div>*/
