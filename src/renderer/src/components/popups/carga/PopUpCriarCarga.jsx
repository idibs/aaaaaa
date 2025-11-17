import { IoMdClose } from 'react-icons/io'
import { IoMdArrowRoundBack, IoMdArrowRoundForward, IoIosArrowDown } from 'react-icons/io'
import { useState, useEffect, useRef } from 'react'
import Button from '../../botoes/DesignBotao'

export default function PopupCriarCarga({ showModal, onClose }) {
  const [caminhoes, setCaminhoes] = useState([])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedCarga, setSelectedCarga] = useState(null)
  const [error, setError] = useState(null)
  const dropdownRef = useRef(null)

  // hooks devem ser chamados sempre na mesma ordem — colocar o useEffect antes do return condicional
  useEffect(() => {
    if (!showModal) return // não buscar quando popup fechado

    window.api
      .getCaminhoes()
      .then((result) => setCaminhoes(result))
      .catch((error) => console.error('Error fetching cargas:', error))
  }, [showModal]) // atualiza quando o popup abre/fecha ou uma nova carga é criada

  if (!showModal) return null

  return (
    <>
      {/* Fundo escuro */}
      <div className="fixed inset-0 bg-black/40 z-10"></div>

      {/* Popup principal */}
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      border border-[#1A6D12] w-[480px] z-20 p-6 bg-[#fffcff] 
                      rounded-xl shadow-2xl"
      >
        <div className="flex justify-end">
          <button className="cursor-pointer" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>

        <h1 className="mt-1 text-3xl text-[#1A6D12] font-black py-3 text-center">Criar Carga</h1>

        <div className="flex flex-col justify-between">
          <div className="mt-4 px-4 w-full">
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
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <Button
              text="Atribuir a Carga"
              className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-44"
              onClick={() => {
                if (selectedCarga) {
                  setError(null)

                  window.api
                    .createCarga(selectedCarga)
                    .then(() => onClose())
                    .catch(() => setError('Erro ao criar carga. Tente novamente.'))
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
