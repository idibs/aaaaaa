import Button from '../botoes/DesignBotao'
import { IoMdClose } from 'react-icons/io'
import { Link } from 'react-router-dom'

export default function PopupDelete({ showModal, onClose }) {
  if (!showModal) return null

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
                />
                <Button
                    className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-20"
                    text="Não"
                />
            </div>
        </div>
    </> 
  )
}
