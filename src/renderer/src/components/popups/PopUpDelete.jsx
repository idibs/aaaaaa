import Button from '../botoes/DesignBotao'
import { IoMdClose } from 'react-icons/io'

export default function PopupDelete({ showModal, onClose, initialData, insertTable }) {
  if (!showModal) return null

  // Usar async e não executar durante render
  const deleteItem = async (id) => {
    try {
      if (!id) {
        return
      }

      if (insertTable === 'cereal') {
        await window.api.deleteEnsacado(id)
      } else if (insertTable === 'ração' || insertTable === 'variedade') {
        await window.api.deleteOutroProduto(id)
      } else if (insertTable === 'cliente') {
        await window.api.deletePessoa(id)
      } else if (insertTable === 'funcionario') {
        await window.api.deleteFuncionario(id)
      } else if (insertTable === 'venda') {
        await window.api.deletePedidoProduto(id)
      } else if (insertTable === 'view_carga_detalhes') {
        await window.api.deletePedidoProdutoFromCarga(
          id,
          initialData.Valor_total,
          initialData.Peso_total
        )
      } else if (insertTable === 'carga') {
        console.log('deletando carga com id:', id)
        await window.api.deleteCarga(id)
      }
      onClose()
    } catch (err) {
      console.log('Erro ao deletar:', err)
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
            onClick={() => deleteItem(initialData?.Id ?? initialData?.id ?? initialData?.Carga)}
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
