import { IoMdClose } from 'react-icons/io'
import { IoMdArrowRoundBack, IoMdArrowRoundForward, IoIosArrowDown } from 'react-icons/io'
import { useState, useEffect, useRef } from 'react'
import Button from '../../botoes/DesignBotao'

export default function PopupCriarFuncionario({ showModal, onClose, insertTable }) {
  if (!showModal) return null

  const PAGE_SIZE = 5
  const [columns, setColumns] = useState([])
  const [page, setPage] = useState(1)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [cargos, setCargos] = useState([])
  const [cargoSelecionado, setCargoSelecionado] = useState('')
  const dropdownRef = useRef(null)


  {/*useEffect(() => {
    setPage(1)
    // Pega lista de cargos
    window.api
      .getCargosNomes()
      .then((result) => {
        setCargos(result)
      })
      .catch((error) => {
        console.error('Erro ao buscar nomes de cargos:', error)
      })

    // Pega colunas da tabela de funcionários
    window.api
      .getFuncionariosColunas()
      .then((cols) => {
        setColumns(Object.keys(cols[0]).filter((col) => col !== 'Id'))
      })
      .catch((error) => {
        console.error('Erro ao buscar colunas de funcionários:', error)
      })
  }, [insertTable]) */}

  const totalPages = Math.ceil(columns.length / PAGE_SIZE)
  const startIdx = (page - 1) * PAGE_SIZE
  const endIdx = startIdx + PAGE_SIZE
  const inputs = columns.slice(startIdx, endIdx)

  const inputNumbers = ['Salário', 'Idade', 'Telefone']

  return (
    <>
      {/* Fundo escuro */}
      <div className="fixed inset-0 bg-black/40 z-10"></div>

      {/* Popup principal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-[#1A6D12] w-200 z-20 h-180 p-4 bg-[#fffcff] rounded-xl shadow-2xl">
        <div className="flex justify-end">
          <button className="cursor-pointer" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>

        <h1 className="mt-4 text-4xl text-[#1A6D12] font-black py-4 text-center">Novo Funcionário</h1>

        <div className="flex flex-col justify-between h-140">
          <div>
            <div className="mt-7 flex flex-col px-30 h-90 w-full">
              {/* Dropdown de cargos */}
              <div className="relative mb-6" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="border-solid border border-[#1A6D12] px-4 w-full py-2 rounded-xl flex justify-between items-center"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                  type="button"
                >
                  {cargoSelecionado || 'Selecione o Cargo'}
                  <IoIosArrowDown className="text-sm" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-full bg-[#044a23] text-white rounded shadow-[0_8px_25px_rgba(0,0,0,0.5)] z-30 overflow-hidden">
                    {cargos.map((cargo) => (
                      <button
                        key={cargo.Nome}
                        className="block w-full text-left px-4 py-2 hover:bg-green-900"
                        onClick={() => {
                          setCargoSelecionado(cargo.Nome)
                          setDropdownOpen(false)
                        }}
                      >
                        {cargo.Nome}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Inputs dinâmicos */}
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
          </div>

          {/* Botão Salvar */}
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
