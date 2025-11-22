import { IoMdClose } from 'react-icons/io'
import { useEffect, useState, useRef } from 'react'
import Button from '../../botoes/DesignBotao'
import { IoMdArrowRoundBack, IoMdArrowRoundForward, IoIosArrowDown } from 'react-icons/io'
import { Form } from 'react-router-dom'

export default function PopUpEditProd({ showModal, onClose, categoria, initialData }) {
  if (!showModal) return null

  const PAGE_SIZE = 5
  const [columns, setColumns] = useState([])
  const [page, setPage] = useState(1)
  const [formValues, setFormValues] = useState({}) // <-- persist valores por coluna

  useEffect(() => {
    // reset ao abrir/modal ou trocar categoria
    setPage(1)
    setFormValues({ ...initialData, Categoria: categoria })
  }, [showModal]) // <- inclui showModal para resetar ao abrir

  useEffect(() => {
    formValues.Categoria === 'Cereal'
      ? setColumns(['Nome', 'Preço', 'Quantidade', 'Peso', 'Codigo'])
      : setColumns(['Nome', 'Preço', 'Quantidade', 'Peso', 'Codigo', 'Descrição'])
  }, [formValues.Categoria])

  const totalPages = Math.ceil(columns.length / PAGE_SIZE)
  const startIdx = (page - 1) * PAGE_SIZE
  const endIdx = startIdx + PAGE_SIZE
  const inputs = columns.slice(startIdx, endIdx)
  const inputNumbers = ['Preço', 'Peso', 'Quantidade']

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-10"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-[#1A6D12] w-200 z-20 h-180 p-4 bg-[#fffcff] rounded-xl shadow-2xl">
        <div className="flex justify-end">
          <button className="cursor-pointer" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>

        <h1 className="mt-4 text-4xl text-[#1A6D12] font-black py-4 text-center">Novo Pessoa</h1>

        <div className="flex flex-col justify-between h-140">
          <div>
            <div className="mt-7 flex flex-col px-30 h-90 w-full">
              {/* Aqui no futuro entram os inputs puxados do banco */}
              {formValues.Categoria &&
                inputs.map((coluna) => {
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
                          setFormValues((prev) => ({
                            ...prev,
                            [coluna]: val
                          }))
                        }}
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

            {totalPages > 1 && formValues.Categoria && (
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
                console.log(formValues)
                formValues.Categoria === 'Cereal'
                  ? window.api
                      .editCereal([
                        formValues.Nome,
                        Number(formValues.Preço),
                        Number(formValues.Quantidade),
                        Number(formValues.Peso),
                        formValues.Codigo,
                        formValues.Id
                      ])
                      .then(onClose)
                      .catch(onClose)
                  : window.api
                      .editOutroProduto([
                        formValues.Nome,
                        Number(formValues.Preço),
                        Number(formValues.Quantidade),
                        Number(formValues.Peso),
                        formValues.Codigo,
                        formValues.Descrição,
                        formValues.Categoria === 'Ração' ? 1 : 2,
                        formValues.Id
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
