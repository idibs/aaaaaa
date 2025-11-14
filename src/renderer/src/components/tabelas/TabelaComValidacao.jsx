import { MdEdit } from 'react-icons/md'
import { FaTrash, FaCheck } from 'react-icons/fa'
import { useState } from 'react'
import PopupDelete from '../popups/PopUpDelete'
import PopupEditPag from '../popups/pagamento/PopUpEditPag'
import PopupEditVenda from '../popups/venda/PopUpEditVenda'
import PopUpAtribuirCarga from '../popups/venda/PopUpAtribuiraCarga'
import PopUpCriarCarga from '../popups/carga/PopUpCriarCarga'
import PopUpOrcamento from '../popups/venda/PopUpOrcamento'

const Tabela = ({ data, insertTable, onSave, status }) => {
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])
  const [showAtribuirCarga, setShowAtribuirCarga] = useState(false)
  const [showCriarCarga, setShowCriarCarga] = useState(false)
  const [itemPraCarga, setItemPraCarga] = useState(null)
  const [showOrcamento, setShowOrcamento] = useState(false)

  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((item) => item !== id) : [...prevSelected, id]
    )
  }

  const openOrcamento = () => setShowOrcamento(true)
  const closeOrcamento = () => setShowOrcamento(false)

  const openAtribuirCarga = () => setShowAtribuirCarga(true)
  const closeAtribuirCarga = () => setShowAtribuirCarga(false)

  const openCriarCarga = () => setShowCriarCarga(true)
  const closeCriarCarga = () => setShowCriarCarga(false)

  return (
    <>
      <table className="table border-collapsed w-full">
        {data.length > 0 && (
          <thead>
            <tr>
              <th className="border border-[#1A6D12] px-1 py-1">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedItems(data.map((item) => item.Id || item.id))
                    } else {
                      setSelectedItems([])
                    }
                  }}
                  checked={selectedItems.length === data.length}
                />
              </th>
              {Object.keys(data[0]).map((key) => (
                <th key={key} className="border border-[#1A6D12] px-1 py-1">
                  {key}
                </th>
              ))}
              <th className="border border-[#1A6D12] px-1 py-1">Opções</th>
            </tr>
          </thead>
        )}
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => {
              const id = item.Id || item.id || index
              return (
                <tr key={index} className="hover:bg-[#ececec]">
                  <td className="border border-[#1A6D12] text-center py-1">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(id)}
                      onChange={() => handleCheckboxChange(id)}
                    />
                  </td>
                  {Object.entries(item).map(([key, value], idx) => (
                    <td key={idx} className="border border-[#1A6D12] text-center py-1">
                      {key.toLowerCase().includes('data') && value
                        ? new Date(value).toLocaleDateString()
                        : value}
                    </td>
                  ))}
                  <td className="border border-[#1A6D12] text-center py-1">
                    <div className="flex justify-evenly items-center">
                      {/* Confirmação */}
                      <button
                        onClick={() => {
                          if (status === 'Finalizado') {
                            setItemPraCarga(item.Id)
                            openAtribuirCarga()
                            return
                          } else if (status === 'Em orçamento') {
                            openOrcamento()
                            return
                          }

                          if (item.Valor_total && item.Pagamento) {
                            window.api.finalizaPedido(item.Id).catch((err) => console.error(err))
                          } else {
                            alert(
                              'Este pedido não possui todos os dados necessários para finalização.'
                            )
                          }
                        }}
                        className="cursor-pointer text-green-600 hover:text-green-800"
                      >
                        <FaCheck />
                      </button>

                      {/* Exclusão */}
                      <button
                        onClick={() => {
                          setSelectedItem(item)
                          setShowModalDelete(true)
                        }}
                        className="cursor-pointer text-black"
                      >
                        <FaTrash />
                      </button>

                      {/* Edição */}
                      <button
                        onClick={() => {
                          setSelectedItem(item)
                          setShowModalEdit(true)
                        }}
                        className="cursor-pointer text-black"
                      >
                        <MdEdit />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td
                colSpan={Object.keys(data[0] || { id: 1 }).length + 2}
                className="text-center py-4"
              >
                Nenhum resultado encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal de exclusão */}
      {selectedItem && (
        <PopupDelete
          showModal={showModalDelete}
          onClose={() => {
            setShowModalDelete(false)
            setSelectedItem(null)
          }}
          initialData={selectedItem}
        />
      )}

      {/* Modal de edição */}
      {selectedItem && insertTable === 'pagamento' && (
        <PopupEditPag
          showModal={showModalEdit}
          onClose={() => {
            setShowModalEdit(false)
            setSelectedItem(null)
          }}
          initialData={selectedItem}
          onSave={(payload) => onSave && onSave(payload, selectedItem)}
        />
      )}

      <PopupEditVenda
        showModal={showModalEdit}
        onClose={() => {
          setShowModalEdit(false)
          setSelectedItem(null)
        }}
        vendaSelecionada={selectedItem} // ✅ corrigido aqui
        onSalvar={(payload) => onSave && onSave(payload, selectedItem)}
      />
      <PopUpAtribuirCarga
        showModal={showAtribuirCarga}
        onClose={closeAtribuirCarga}
        onCriarNovaCarga={openCriarCarga}
        itemPraCarga={itemPraCarga}
      />
      <PopUpCriarCarga showModal={showCriarCarga} onClose={closeCriarCarga} />
      <PopUpOrcamento showModal={showOrcamento} onClose={closeOrcamento} />
    </>
  )
}

export default Tabela
