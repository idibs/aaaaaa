import { IoMdClose } from 'react-icons/io'
import { useEffect, useState } from 'react'
import Button from '../../botoes/DesignBotao'

export default function PopupEditCarga({ showModal, onClose, insertTable, initialData }) {
  if (!showModal || !initialData) return null

  const [formData, setFormData] = useState({})

  useEffect(() => {
    // 🔹 Formata automaticamente campos de data no padrão DD/MM/AAAA
    const formattedData = Object.entries(initialData).reduce((acc, [key, value]) => {
      if (key.toLowerCase().includes('data') && value) {
        const date = new Date(value)
        acc[key] = date.toLocaleDateString('pt-BR') // <-- formato DD/MM/AAAA
      } else {
        acc[key] = value ?? ''
      }
      return acc
    }, {})

    setFormData(formattedData)
  }, [initialData])

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    onClose()
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-10"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-[#1A6D12] w-200 z-20 h-180 p-4 bg-[#fffcff] rounded-xl shadow-2xl overflow-y-auto">
        <div className="flex justify-end">
          <button className="cursor-pointer" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>

        <h1 className="mt-4 text-4xl text-[#1A6D12] font-black py-4 text-center">Editar Carga</h1>

        <div className="flex flex-col justify-between h-140">
          <div className="mt-7 flex flex-col px-30 h-90 w-full">
            {Object.entries(formData).map(([key, value], index) => (
              <input
                key={index}
                type={
                  key.toLowerCase().includes('data')
                    ? 'text' // mantém texto para mostrar "DD/MM/AAAA"
                    : typeof value === 'number'
                      ? 'number'
                      : 'text'
                }
                value={value}
                placeholder={key}
                onChange={(e) => handleChange(key, e.target.value)}
                className="border border-[#1A6D12] px-4 py-2 rounded-xl mt-3 focus:outline-none focus:ring-2 focus:ring-[#1A6D12] text-gray-800 placeholder-gray-500"
              />
            ))}
          </div>

          <div className="flex justify-center">
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
