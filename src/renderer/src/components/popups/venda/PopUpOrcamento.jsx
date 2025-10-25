import { useState } from 'react'
import Button from '../../botoes/DesignBotao'

export default function PopUpOrcamento({ showModal, onClose, onFinalizar }) {
  const [valor, setValor] = useState('')

  if (!showModal) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-md w-96 shadow-md">
        <h2 className="text-xl font-bold mb-4 text-[#1A6D12]">Definir Valor da Venda</h2>
        <input
          type="number"
          className="border border-gray-300 rounded w-full p-2 mb-4"
          placeholder="Digite o valor da venda"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
        <div className="flex justify-end gap-3">
          <Button text="Cancelar" className="border border-[#1A6D12] text-[#1A6D12]" onClick={onClose} />
          <Button text="Finalizar" className="bg-[#1A6D12] text-white" onClick={() => onFinalizar(valor)} />
        </div>
      </div>
    </div>
  )
}
