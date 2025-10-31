import Button from '../botoes/DesignBotao'
import { IoMdClose } from 'react-icons/io'
import { Link } from 'react-router-dom'

export default function PopupDelete({ showModal, onClose, initialData, insertTable }) {
  if (!showModal) return null

  // Usar async e não executar durante render
  const deleteItem = async (id) => {
    try {
      if (!id) return
      if (insertTable === 'cereal') {
        await window.api.deleteEnsacado(id)
        // fechar modal e opcionalmente atualizar a UI
        onClose()
      }
    } catch (err) {
      console.error('Erro ao deletar:', err)
    }
  }

  return (
    <>
        <div className="fixed inset-0 bg-black/5 z-10"></div>
        <div className="fixed border border-[#1A6D12] w-100 z-20 top-80 start-140 p-4 bg-[#fffcff] rounded-xl shadow-xl">
            <div className="flex justify-end">
                <button className="cursor-pointer" onClick={onClose}>
                <IoMdClose />
                </button>
            </div>
            <p className="text-black ps-1 mb-7">Deseja deletar o cadastro?</p>
            <div className="flex gap-2 w-full justify-center">
                <Button
                    className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-20"
                    text="Sim"
                    onClick={() => deleteItem(initialData?.Id ?? initialData?.id)}
                />
                <Button
                    className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-20"
                    text="Não"
                    onClick={onClose}
                />
            </div>
        </div>
    </> 
  )
}
