import { IoMdClose } from 'react-icons/io'
import { IoMdArrowRoundBack, IoMdArrowRoundForward, IoIosArrowDown } from 'react-icons/io'
import { useState, useEffect, useRef } from 'react'
import Button from '../../botoes/DesignBotao'

export default function PopupCriarPes({ showModal, onClose, insertTable }) {
  if (!showModal) return null

  const PAGE_SIZE = 5
  const columns = ['Nome', 'Telefone', 'Cep', 'Cidade', 'Bairro', 'Rua', 'Numero', 'Complemento']
  const [page, setPage] = useState(1)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [formValues, setFormValues] = useState({}) // <-- persist valores por coluna
  const dropdownRef = useRef(null)

  const tiposPessoa = ['Cliente', 'Fornecedor', 'Vendedor', 'Cliente/Fornecedor']

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setPage(1)
    setFormValues({})
  }, [])

  const totalPages = Math.ceil(columns.length / PAGE_SIZE)
  const startIdx = (page - 1) * PAGE_SIZE
  const endIdx = startIdx + PAGE_SIZE
  const inputs = columns.slice(startIdx, endIdx)

  const inputNumbers = ['Telefone', 'Número', 'Cep']

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

        <h1 className="mt-4 text-4xl text-[#1A6D12] font-black py-4 text-center">Novo Registro</h1>

        {/* Container principal com justify-between */}
        <div className="flex flex-col justify-between h-140">
          {/* Dropdown de tipo da pessoa */}
          <div className="mt-7 flex flex-col px-30 w-full">
            {page === 1 && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="border border-[#1A6D12] px-4 py-2 w-full rounded-xl flex justify-between items-center focus:outline-none"
                >
                  {formValues.Tipo || 'Selecione o Tipo'}
                  <IoIosArrowDown className="text-sm" />
                </button>

                {dropdownOpen && (
                  <div className="absolute left-0 mt-2 w-full bg-[#044a23] text-white rounded shadow-[0_8px_25px_rgba(0,0,0,0.5)] z-30 overflow-hidden">
                    {tiposPessoa.map((tipo) => (
                      <button
                        key={tipo}
                        className="block w-full text-left px-4 py-2 hover:bg-green-900"
                        onClick={() => {
                          setDropdownOpen(false)
                          setFormValues((prev) => ({ ...prev, Tipo: tipo }))
                        }}
                      >
                        {tipo}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Campos dinâmicos */}
            {inputs.map((coluna) => (
              <input
                key={coluna}
                type={inputNumbers.includes(coluna) ? 'number' : 'text'}
                placeholder={coluna}
                value={formValues[coluna] ?? ''} // <-- valor persistido
                onChange={(e) => setFormValues((prev) => ({ ...prev, [coluna]: e.target.value }))} // <-- atualiza o estado
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
          <div className="flex justify-center mt-4">
            <Button
              className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-60"
              text="Salvar"
              onClick={() => {
                window.api.createPessoa(formValues).then(onClose).catch(onClose)
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
