import Button from '../botoes/DesignBotao'
import Input from '../inputs/InputComTitulo'
import { IoMdClose } from 'react-icons/io'
import { Link } from 'react-router-dom'

export default function Popup({ showModal, onClose, path }) {
  if (!showModal) return null

  return (
    <div className="border border-[#1A6D12] w-100 z-20 h-30 absolute top-80 start-140 p-4 bg-[#fffcff] rounded-xl shadow-2xl">
      <div className="flex justify-end">
        <button className="cursor-pointer" onClick={onClose}>
          <IoMdClose />
        </button>
      </div>
      <p className="text-black ps-1 mb-1">Nome</p>
      <div className="flex gap-2 w-full">
        <Input
          text="Nome"
          placeholder={`Nome do ${path === '/nova-compra' ? 'Compras' : 'Vendas'}`}
          inputType="text"
        />
        <Link to={path} className="h-full">
          <Button
            className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-20"
            pathButton={path}
            text="Criar"
          />
        </Link>
      </div>
    </div>
  )
}
