import { IoMdClose } from 'react-icons/io'
import { useEffect, useState, useRef } from 'react'
import { IoMdArrowRoundBack, IoMdArrowRoundForward, IoIosArrowDown } from 'react-icons/io'
import Button from '../../botoes/DesignBotao'

export default function PopupEditCarga({ showModal, onClose, initialData }) {
  if (!showModal || !initialData) return null

  const [formData, setFormData] = useState({})
  const dropdownRef = useRef(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedCarga, setSelectedCarga] = useState(null)
  const [caminhoes, setCaminhoes] = useState([])

  useEffect(() => {
    window.api
      .getCaminhoes()
      .then((result) => setCaminhoes(result))
      .catch((error) => console.error('Error fetching cargas:', error))
    // 🔹 Formata automaticamente campos de data no padrão DD/MM/AAAA
    const formattedData = Object.entries(initialData).reduce((acc, [key, value]) => {
      if (key.toLowerCase().includes('data') && value) {
        const date = new Date(value)
        acc[key] = date.toISOString().split('T')[0]
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
    window.api
      .editCarga([selectedCarga, formData.Data_entregue, formData.Carga])
      .then(onClose)
      .catch((err) => console.error(err))
    console.log(formData)
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

        <h1 className="mt-4 text-4xl text-[#1A6D12] font-black py-4 text-center">
          Finalizar Carga
        </h1>
        <div className="flex flex-col justify-between h-140">
          {/* Dropdown de tipo da pessoa */}
          <div className="mt-7 flex flex-col px-30 w-full">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="border-solid border border-[#1A6D12] px-4 w-full py-2 rounded-xl flex justify-between items-center"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                type="button"
              >
                {selectedCarga || 'Selecione a Carga'}
                <IoIosArrowDown className="text-sm" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-full bg-[#044a23] text-white rounded shadow-[0_8px_25px_rgba(0,0,0,0.5)] z-30 overflow-hidden">
                  <button
                    className="block w-full text-left px-4 py-2 bg-red-900 hover:bg-red-950"
                    onClick={() => {
                      setDropdownOpen(false)
                      setSelectedCarga(null)
                    }}
                  >
                    Limpar seleção
                  </button>
                  {caminhoes.map((caminhao) => (
                    <button
                      key={caminhao.Código}
                      className="block w-full text-left px-4 py-2 hover:bg-green-900"
                      onClick={() => {
                        setSelectedCarga(caminhao.Id)
                        setDropdownOpen(false)
                      }}
                    >
                      {caminhao.Código}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <input
              type="date"
              value={formData.Data_entregue}
              placeholder="Data de entrega do pedido"
              onChange={(e) => handleChange('Data_entregue', e.target.value)}
              className="border border-[#1A6D12] px-4 py-2 rounded-xl mt-3 focus:outline-none focus:ring-2 focus:ring-[#1A6D12] text-gray-800 placeholder-gray-500"
            />
          </div>

          {/* Botão salvar */}
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
