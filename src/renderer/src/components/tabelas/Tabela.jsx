import { MdEdit } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa'
import { useState } from 'react'
import PopupDelete from '../popups/PopUpDelete'
import PopupEdit from '../popups/PopupEdit'

const Tabela = ({ data, insertTable }) => {
  const [showModal, setShowModal] = useState(false)
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [selectedItems, setSelectedItems] = useState([]) // ids selecionados

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)
  const openModalEdit = () => setShowModalEdit(true)
  const closeModalEdit = () => setShowModalEdit(false)

  // Toggle checkbox
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
              {/* Cabeçalho checkbox */}
              <input
                type="checkbox"
                // Select all (opcional)
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
            const id = item.Id || item.id || index // pega o id, se não usar index como fallback
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
                  <div className="flex justify-evenly">
                    <button onClick={openModal} className="cursor-pointer">
                      <FaTrash />
                    </button>
                    <PopupDelete showModal={showModal} onClose={closeModal} />
                    <button onClick={openModalEdit} className="cursor-pointer">
                      <MdEdit />
                    </button>
                    <PopupEdit
                      showModal={showModalEdit}
                      onClose={closeModalEdit}
                      insertTable={insertTable}
                    />
                  </div>
                </td>
              </tr>
            )
          })
        ) : (
          <tr>
            <td
              colSpan={
                (Object.keys(data[0] || { id: 1, nome: '', quantidade: '', peso: '' }).length + 1) + 1 // +1 do checkbox
              }
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
