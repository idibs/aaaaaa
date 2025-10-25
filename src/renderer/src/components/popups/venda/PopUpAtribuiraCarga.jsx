import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import Button from '../../botoes/DesignBotao'
import PopupCriarCarga from '../carga/PopUpCriarCarga'

export default function PopUpAtribuirCarga({ showModal, onClose }) {
  const [showCriarCarga, setShowCriarCarga] = useState(false)

  if (!showModal) return null

  const cargas = ['Carga 001', 'Carga 002', 'Carga 003']

  const handleAbrirCriarCarga = () => setShowCriarCarga(true)
  const handleFecharCriarCarga = () => setShowCriarCarga(false)

  return (
    <>
      {/* Fundo escuro */}
      <div className="fixed inset-0 bg-black/40 z-10"></div>

      {/* Popup principal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      border border-[#1A6D12] w-[480px] z-20 p-6 bg-[#fffcff] 
                      rounded-xl shadow-2xl">
        <div className="flex justify-end">
          <button className="cursor-pointer" onClick={onClose}>
            <IoMdClose size={22} />
          </button>
        </div>

        <h1 className="mt-1 text-3xl text-[#1A6D12] font-black py-3 text-center">
          Atribuir à Carga
        </h1>

        <div className="flex flex-col justify-between">
          <div className="mt-4 flex flex-col items-center px-4 w-full">
            <select className="border border-[#1A6D12] rounded-xl w-full p-3 
                               focus:outline-none focus:ring-2 focus:ring-[#1A6D12] 
                               text-gray-800 placeholder-gray-500">
              <option value="">Selecione uma carga</option>
              {cargas.map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <Button
              text="Criar Nova Carga"
              className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-44"
              onClick={handleAbrirCriarCarga}
            />
            <Button
              text="Cancelar"
              className="text-[#1A6D12] border border-[#1A6D12] hover:bg-[#ececec] w-44"
              onClick={onClose}
            />
          </div>
        </div>
      </div>

      {/* Popup interno (Criar Carga) */}
      <PopupCriarCarga
        showModal={showCriarCarga}
        onClose={handleFecharCriarCarga}
      />
    </>
  )
}
