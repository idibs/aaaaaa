import { IoMdClose } from 'react-icons/io'
import { IoIosArrowDown } from 'react-icons/io'
import { useState, useEffect, useRef } from 'react'
import Button from '../../botoes/DesignBotao'

export default function PopupEditFunc({ showModal, onClose, initialData }) {
  if (!showModal) return null

  const [formValues, setFormValues] = useState({})

  useEffect(() => {
    if (initialData) {
      const copy = { ...initialData }
      setFormValues(copy)
    }
  }, [initialData])

  const handleChange = (key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [dropdownOpen2, setDropdownOpen2] = useState(false)
  const dropdownRef = useRef(null)
  const dropdownRef2 = useRef(null)

  const cargos = ['Encarregado de Produção', 'Movimentador de Carga', 'Motorista']
  const tipos = ['Registrado', 'Não Registrado']

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
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="border-solid border border-[#1A6D12] px-4 w-full py-2 rounded-xl flex justify-between items-center"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                type="button"
              >
                {formValues.Cargo || 'Selecione o Cargo'}
                <IoIosArrowDown className="text-sm" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-full bg-[#044a23] text-white rounded shadow-[0_8px_25px_rgba(0,0,0,0.5)] z-30 overflow-hidden">
                  {cargos.map((cargo) => (
                    <button
                      key={cargo}
                      className="block w-full text-left px-4 py-2 hover:bg-green-900"
                      onClick={() => {
                        setFormValues((prev) => ({ ...prev, Cargo: cargo }))
                        setDropdownOpen(false)
                      }}
                    >
                      {cargo}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative mt-3" ref={dropdownRef2}>
              <button
                onClick={() => setDropdownOpen2((v) => !v)}
                className="border-solid border border-[#1A6D12] px-4 w-full py-2 rounded-xl flex justify-between items-center"
                aria-haspopup="true"
                aria-expanded={dropdownOpen2}
                type="button"
              >
                {formValues.Tipo || 'Selecione o Tipo de Contrato'}
                <IoIosArrowDown className="text-sm" />
              </button>

              {dropdownOpen2 && (
                <div className="absolute right-0 mt-2 w-full bg-[#044a23] text-white rounded shadow-[0_8px_25px_rgba(0,0,0,0.5)] z-30 overflow-hidden">
                  {tipos.map((tipo) => (
                    <button
                      key={tipo}
                      className="block w-full text-left px-4 py-2 hover:bg-green-900"
                      onClick={() => {
                        setFormValues((prev) => ({ ...prev, Tipo: tipo }))
                        setDropdownOpen2(false)
                      }}
                    >
                      {tipo}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {Object.entries(formValues)
              .filter(([key]) => key !== 'Cargo' && key !== 'Id')
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

            {Object.keys(formValues).length === 0 && (
              <p className="text-center">Nenhum dado para editar.</p>
            )}
          </div>

          <div className="flex justify-center mt-4">
            <Button
              className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-60"
              text="Salvar"
              onClick={() => {
                // calcula id do cargo (retorno numérico, não função)
                const cargoId =
                  formValues.Cargo === 'Encarregado de Produção'
                    ? 1
                    : formValues.Cargo === 'Movimentador de Carga'
                      ? 2
                      : formValues.Cargo === 'Motorista'
                        ? 3
                        : null

                // validação mínima
                if (!formValues.Nome || !formValues.CPF) {
                  alert('Nome e CPF são obrigatórios.')
                  return
                }

                window.api
                  .editFuncionario([
                    formValues.Nome,
                    formValues.Telefone,
                    formValues.CPF,
                    formValues.Tipo,
                    cargoId,
                    formValues.Id
                  ])
                  .then(onClose)
                  .catch((err) => {
                    console.error('Erro ao criar funcionário:', err)
                    onClose()
                  })
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
