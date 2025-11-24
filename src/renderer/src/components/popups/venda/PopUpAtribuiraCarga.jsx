import { useEffect, useState, useRef } from 'react'
import { IoMdClose, IoIosArrowDown } from 'react-icons/io'
import Button from '../../botoes/DesignBotao'
import PopupCriarCarga from '../carga/PopUpCriarCarga'

export default function PopUpAtribuirCarga({ showModal, onClose, itemPraCarga }) {
  const [showCriarCarga, setShowCriarCarga] = useState(false)
  const [cargas, setCargas] = useState([])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedCarga, setSelectedCarga] = useState(null)
  const dropdownRef = useRef(null)

  // hooks devem ser chamados sempre na mesma ordem — colocar o useEffect antes do return condicional
  useEffect(() => {
    if (!showModal) return // não buscar quando popup fechado

    window.api
      .getCargas()
      .then((result) => setCargas(result))
      .catch((error) => console.error('Error fetching cargas:', error))
  }, [showModal, showCriarCarga]) // atualiza quando o popup abre/fecha ou uma nova carga é criada

  if (!showModal) return null

  const handleAbrirCriarCarga = () => setShowCriarCarga(true)
  const handleFecharCriarCarga = () => setShowCriarCarga(false)

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

        <h1 className="mt-1 text-3xl text-[#1A6D12] font-black py-3 text-center">
          Atribuir à Carga
        </h1>

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
                {selectedCarga || itemPraCarga.Carga || 'Selecione a Carga'}
                <IoIosArrowDown className="text-sm" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-full bg-[#044a23] text-white rounded shadow-[0_8px_25px_rgba(0,0,0,0.5)] z-30 h-60 overflow-scroll">
                  <button
                    className="block w-full text-left px-4 py-2 bg-red-900 hover:bg-red-950"
                    onClick={() => {
                      setDropdownOpen(false)
                      setSelectedCarga(null)
                    }}
                  >
                    Limpar seleção
                  </button>
                  {cargas.map((carga) => (
                    <button
                      key={carga.Id}
                      className="block w-full text-left px-4 py-2 hover:bg-green-900"
                      onClick={() => {
                        setSelectedCarga(carga.Id)
                        setDropdownOpen(false)
                      }}
                    >
                      {carga.Id}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <Button
              text="Atribuir a Carga"
              className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-44"
              onClick={() => {
                if (selectedCarga) {
                  window.api
                    .atribuirCarga(
                      itemPraCarga.Id,
                      selectedCarga,
                      Number(itemPraCarga.Peso_total),
                      Number(itemPraCarga.Valor_total),
                      itemPraCarga.Carga || null
                    )
                    .then(() => onClose())
                    .catch(() => onClose())
                }
              }}
            />
            <Button
              text="Criar Nova Carga"
              className="text-[#1A6D12] border border-[#1A6D12] hover:bg-[#ececec] w-44"
              onClick={handleAbrirCriarCarga}
            />
          </div>
        </div>
      </div>

      {/* Popup interno (Criar Carga) */}
      <PopupCriarCarga showModal={showCriarCarga} onClose={handleFecharCriarCarga} />
    </>
  )
}
