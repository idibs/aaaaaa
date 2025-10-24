import { IoMdClose } from 'react-icons/io'
import { IoIosArrowDown } from 'react-icons/io'
import { useState, useEffect, useRef } from 'react'
import Button from '../../botoes/DesignBotao'

export default function PopupEditFunc({ showModal, onClose, insertTable, initialData, onSave }) {
  if (!showModal) return null

  const [form, setForm] = useState({})

  useEffect(() => {
    if (initialData) {
      const copy = { ...initialData }
      delete copy.Id
      delete copy.id
      setForm(copy)
      // set initial cargo if exists in initialData
      const possibleCargo =
        initialData.Cargo || initialData.CargoNome || initialData.CargoSelecionado || ''
      if (possibleCargo) setCargoSelecionado(possibleCargo)
    } else {
      setForm({})
    }
  }, [initialData])

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  // novo: estados e refs para dropdown de cargos
  const [cargos, setCargos] = useState([])
  const [cargoSelecionado, setCargoSelecionado] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    // busca cargos quando o componente abrir
    if (window.api && window.api.getCargosNomes) {
      window.api
        .getCargosNomes()
        .then((result) => {
          setCargos(result || [])
        })
        .catch((error) => console.error('Erro ao buscar nomes de cargos:', error))
    }
  }, [insertTable])

  const handleSave = async () => {
    try {
      // inclui cargo selecionado no payload
      const payload = { ...form }
      if (cargoSelecionado) payload.Cargo = cargoSelecionado

      if (onSave) {
        onSave(payload, initialData)
        if (onClose) onClose()
        return
      }

      // fallback: chamar API exposta no preload
      try {
        if (window.api && window.api.updateFuncionario) {
          await window.api.updateFuncionario(payload)
          if (onClose) onClose()
        } else {
          console.warn('Nenhuma função onSave fornecida e window.api.updateFuncionario não existe')
        }
      } catch (err) {
        console.error('Erro ao atualizar funcionário:', err)
      }
    } catch (err) {
      console.error('Erro ao salvar edição:', err)
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-10"></div>

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-[#1A6D12] w-200 z-20 h-180 p-4 bg-[#fffcff] rounded-xl shadow-2xl">
        <div className="flex justify-end">
          <button className="cursor-pointer" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>

        <h1 className="mt-4 text-4xl text-[#1A6D12] font-black py-4 text-center">
          Editar Funcionário
        </h1>

        <div className="flex flex-col justify-between h-140">
          <div className="mt-7 flex flex-col px-30 w-full">
            {/* Dropdown de cargos (novo) */}
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
                        setForm((prev) => ({ ...prev, Cargo: cargo.Nome }))
                        setDropdownOpen(false)
                      }}
                    >
                      {cargo.Nome}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {Object.entries(form)
              .filter(([key]) => key !== 'Cargo' && key !== 'CargoNome' && key !== 'CargoId')
              .map(([key, value], idx) => (
                <input
                  key={idx}
                  type={typeof value === 'number' ? 'number' : 'text'}
                  placeholder={key}
                  value={value ?? ''}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="border border-[#1A6D12] px-4 py-2 rounded-xl mt-3 focus:outline-none focus:ring-2 focus:ring-[#1A6D12] text-gray-800 placeholder-gray-500"
                />
              ))}

            {Object.keys(form).length === 0 && (
              <p className="text-center">Nenhum dado para editar.</p>
            )}
          </div>

          <div className="flex justify-center mt-4">
            <Button
              className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-60"
              text="Salvar"
              onClick={handleSave}
            />
          </div>
        </div>
      </div>
    </>
  )
}
