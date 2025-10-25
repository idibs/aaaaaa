import { IoMdClose, IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io'
import { useEffect, useState } from 'react'
import Button from '../../botoes/DesignBotao'

export default function PopUpEditPag({ showModal, onClose, initialData = {}, onSave }) {
  if (!showModal) return null

  const PAGE_SIZE = 5
  const [columns, setColumns] = useState([])
  const [page, setPage] = useState(1)
  const [values, setValues] = useState({ ...initialData })

  // campos que devem ser number por padrão
  const inputNumbers = ['valor', 'preço', 'preco', 'quantidade', 'amount']

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setColumns(Object.keys(initialData).filter((col) => col !== 'Id'))
      setValues({ ...initialData })
    } else {
      setColumns(['Valor', 'Data', 'Metodo', 'Status'])
      setValues({})
    }
    setPage(1)
  }, [initialData])

  // helpers para inputs paginados
  const totalPages = Math.max(1, Math.ceil(columns.length / PAGE_SIZE))
  const startIdx = (page - 1) * PAGE_SIZE
  const endIdx = startIdx + PAGE_SIZE
  const inputs = columns.slice(startIdx, endIdx)

  function handleChange(col, v) {
    setValues((prev) => ({ ...prev, [col]: v }))
  }

  async function handleSave() {
    const payload = { ...values }

    if (onSave) {
      onSave(payload)
      onClose && onClose()
      return
    }

    try {
      if (window.api && window.api.updatePagamento) {
        await window.api.updatePagamento(payload)
        onClose && onClose()
      } else {
        console.warn('Nenhuma função onSave fornecida e window.api.updatePagamento não existe')
      }
    } catch (err) {
      console.error('Erro ao salvar pagamento:', err)
    }
  }

  // format value para input date se necessário
  function getInputValue(col) {
    const val = values[col]
    if (!val && val !== 0) return ''
    if (col.toLowerCase().includes('data')) {
      const d = new Date(val)
      if (!isNaN(d)) {
        // YYYY-MM-DD
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
      <div className="fixed inset-0 bg-black/40 z-10"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-[#1A6D12] w-200 z-20 h-auto max-h-[80vh] p-4 bg-[#fffcff] rounded-xl shadow-2xl overflow-auto">
        <div className="flex justify-end">
          <button className="cursor-pointer" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>

        <h1 className="mt-4 text-3xl text-[#1A6D12] font-black py-2 text-center">
          Editar Pagamento
        </h1>

        <div className="flex flex-col justify-between">
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
                  value={getInputValue(coluna) ?? ''}
                  onChange={(e) => handleChange(coluna, e.target.value)}
                  className="border border-[#1A6D12] px-4 py-2 rounded-xl mt-3 focus:outline-none focus:ring-2 focus:ring-[#1A6D12] text-gray-800 placeholder-gray-500"
                />
              )
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-end w-full px-4 mt-2 gap-2">
              <Button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className={`${page === 1 ? 'hidden' : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'}`}
                text={<IoMdArrowRoundBack />}
              />
              <Button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className={`${page === totalPages ? 'hidden' : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'}`}
                text={<IoMdArrowRoundForward />}
              />
            </div>
          )}

          <div className="flex justify-center mt-4">
            <Button
              onClick={handleSave}
              className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-60"
              text="Salvar"
            />
          </div>
        </div>
      </div>
    </>
  )
}
