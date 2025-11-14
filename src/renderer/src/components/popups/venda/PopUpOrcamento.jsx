import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import Button from '../../botoes/DesignBotao'

export default function PopUpOrcamento({ showModal, onClose }) {
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

        <h1 className="mt-1 text-3xl text-[#1A6D12] font-black py-3 text-center">
          Preço do Produto
        </h1>
        {/*formValues.ValorUnitario ?? ''*/}
        <div className="mt-4 px-4 w-full">
          <input
            type="number"
            step="0.01"
            placeholder="Valor Unitário"
            onChange={(e) => {}}
            className="border border-[#1A6D12] px-4 py-2 rounded-xl mt-3 w-full focus:outline-none focus:ring-2 focus:ring-[#1A6D12] text-gray-800 placeholder-gray-500"
          />
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <Button
            text="Adicionar Valor"
            className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-44"
            onClick={() => {
              if (selectedCarga) {
                window.api
                  .atribuirCarga(itemPraCarga, selectedCarga)
                  .then(() => onClose())
                  .catch(() => onClose())
              }
            }}
          />
          <Button
            text="Cancelar"
            className="text-[#1A6D12] border border-[#1A6D12] hover:bg-[#ececec] w-44"
            onClick={onClose}
          />
        </div>
      </div>
    </>
  )
}
