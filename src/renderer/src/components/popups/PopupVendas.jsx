import { IoMdClose } from "react-icons/io";
//mudar nome para PopopForm e criar PopupOrcamento
import CreateInput from '../inputs/InputComTitulo'

export default function PopupVendas({ showModal, onClose }) {

  if (!showModal) return null

  return (
    <div className="border border-[#1A6D12] w-200 z-20 h-180 absolute top-13 start-85 p-4 bg-[#fffcff] rounded-xl shadow-2xl">
      <div className="flex justify-end">
        <button className="cursor-pointer" onClick={onClose}>
          <IoMdClose />
        </button>
      </div>
      <h1 className="mt-4 text-4xl text-[#1A6D12] font-black py-4 text-center">Adicionar Item</h1>
      <div className="mt-15 grid grid-cols-5 gap-4 w-full">
        <div className="col-span-3">
          <p>Itens:</p>
          <div className="border border-[#1A6D12] w-full h-125 "></div>
        </div>
        <div className="col-span-2">
          <CreateInput
            inputType="text"
            placeholder="Nome"
            inputName="nome"
            text="Produto"
          />
          <div className="flex justify-between">
            <button className="text-white bg-[#1A6D12] hover:bg-[#145A0C] rounded-xl w-32 py-2 mt-4 cursor-pointer">
              Adicionar
            </button>
            <button className="text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec] rounded-xl w-32 py-2 mt-4 cursor-pointer">
              limpar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
