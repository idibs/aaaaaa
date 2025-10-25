import { MdEdit } from 'react-icons/md'
import { FaTrash, FaCheck } from 'react-icons/fa'
import { useState } from 'react'
import PopupDelete from '../popups/PopUpDelete'
import PopupEditPag from '../popups/pagamento/PopUpEditPag'
import PopupEditVenda from '../popups/venda/PopUpEditVenda'

const Tabela = ({ data, insertTable, onSave }) => {
  const [showModal, setShowModal] = useState(false)
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)
  const openModalEdit = () => setShowModalEdit(true)
  const closeModalEdit = () => setShowModalEdit(false)

  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    )
  }

  return (
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
                    {/* Ícone de confirmação */}
                    <button
                      onClick={() => alert(`Item ${id} confirmado!`)}
                      className="cursor-pointer text-green-600 hover:text-green-800"
                    >
                      <FaCheck />
                    </button>

                    {/* Ícone de exclusão */}
                    <button onClick={openModal} className="cursor-pointer text-red-600 hover:text-red-800">
                      <FaTrash />
                    </button>
                    <PopupDelete showModal={showModal} onClose={closeModal} />

                    {/* Ícone de edição */}
                    <button
                      onClick={() => {
                        setSelectedItem(item)
                        openModalEdit()
                      }}
                      className="cursor-pointer text-blue-600 hover:text-blue-800"
                    >
                      <MdEdit />
                    </button>

                    {/* Popups de edição específicos */}
                    {insertTable === 'pagamento' ? (
                      <PopupEditPag
                        showModal={showModalEdit}
                        onClose={() => {
                          closeModalEdit()
                          setSelectedItem(null)
                        }}
                        initialData={selectedItem}
                        onSave={(payload) => {
                          if (onSave) onSave(payload, selectedItem)
                        }}
                      />
                    ) : insertTable === 'pedido_produto' ? (
                      <PopupEditVenda
                        showModal={showModalEdit}
                        onClose={() => {
                          closeModalEdit()
                          setSelectedItem(null)
                        }}
                        initialData={selectedItem}
                        onSave={(payload) => {
                          if (onSave) onSave(payload, selectedItem)
                        }}
                      />
                    ) : null}
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
  )
}

export default Tabela
