import { IoMdClose, IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io'
import { useEffect, useState } from 'react'
import Button from '../../botoes/DesignBotao'

export default function PopUpEditVenda({ showModal, onClose, vendaSelecionada = {}, onSalvar }) {
  if (!showModal || !vendaSelecionada) return null

  const PAGE_SIZE = 4
  const [columns, setColumns] = useState([])
  const [page, setPage] = useState(1)
  const [formData, setFormData] = useState({ ...vendaSelecionada })

  // campos que devem ser number
  const inputNumbers = ['quantidade', 'preço', 'preco', 'desconto', 'total', 'valor']

  useEffect(() => {
    if (vendaSelecionada && Object.keys(vendaSelecionada).length > 0) {
      const colunas = Object.keys(vendaSelecionada)
      setColumns(colunas)
      setFormData({ ...vendaSelecionada })
      setPage(1)
    }
  }, [vendaSelecionada])

  const totalPages = Math.max(1, Math.ceil(columns.length / PAGE_SIZE))
  const startIdx = (page - 1) * PAGE_SIZE
  const endIdx = startIdx + PAGE_SIZE
  const inputs = columns.slice(startIdx, endIdx)

  const handleChange = (col, value) => {
    setFormData((prev) => ({ ...prev, [col]: value }))
  }

  const handleSalvar = () => {
    if (onSalvar) onSalvar(formData)
    onClose()
  }

  const getInputValue = (col) => {
    const val = formData[col]
    if (!val && val !== 0) return ''
    if (col.toLowerCase().includes('data')) {
      const d = new Date(val)
      if (!isNaN(d)) {
        const yyyy = d.getFullYear()
        const mm = String(d.getMonth() + 1).padStart(2, '0')
        const dd = String(d.getDate()).padStart(2, '0')
        return `${yyyy}-${mm}-${dd}`
      }
    }
    return val
  }

  return (
    <>
      {/* Fundo escuro */}
      <div className="fixed inset-0 bg-black/40 z-10"></div>

      {/* Popup */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-[#1A6D12] w-200 z-20 h-auto max-h-[80vh] p-4 bg-[#fffcff] rounded-xl shadow-2xl overflow-auto">
        <div className="flex justify-end">
          <button className="cursor-pointer" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>

        <h1 className="mt-4 text-3xl text-[#1A6D12] font-black py-2 text-center">
          Editar Venda
        </h1>

        <div className="flex flex-col justify-between">
          {/* Campos */}
          <div className="mt-4 flex flex-col px-4">
            {inputs.map((coluna, index) => {
              const lower = String(coluna).toLowerCase()
              const isNumber = inputNumbers.includes(lower)
              const isDate = lower.includes('data') || lower.includes('date')

              return (
                <input
                  key={index}
                  type={isDate ? 'date' : isNumber ? 'number' : 'text'}
                  placeholder={coluna}
                  value={getInputValue(coluna)}
                  onChange={(e) => handleChange(coluna, e.target.value)}
                  className="border border-[#1A6D12] px-4 py-2 rounded-xl mt-3 focus:outline-none focus:ring-2 focus:ring-[#1A6D12] text-gray-800 placeholder-gray-500"
                />
              )
            })}
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex justify-end w-full px-4 mt-2 gap-2">
              <Button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className={`${page === 1 ? 'hidden' : 'text-[#1A6D12] border border-[#1A6D12] hover:bg-[#ececec]'}`}
                text={<IoMdArrowRoundBack />}
              />
              <Button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className={`${page === totalPages ? 'hidden' : 'text-[#1A6D12] border border-[#1A6D12] hover:bg-[#ececec]'}`}
                text={<IoMdArrowRoundForward />}
              />
            </div>
          )}

          {/* Botão Salvar */}
          <div className="flex justify-center mt-4">
            <Button
              onClick={handleSalvar}
              className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-60"
              text="Salvar Alterações"
            />
          </div>
        </div>
      </div>
    </>
  )
}
