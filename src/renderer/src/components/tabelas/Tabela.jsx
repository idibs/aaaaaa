import { MdEdit } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import PopupDelete from '../popups/PopUpDelete'
import { useState } from 'react'
import PopupEdit from '../popups/PopupEdit'

const Tabela = ({ data, insertTable }) => {
  const [showModal, setShowModal] = useState(false)
  const [showModalEdit, setShowModalEdit] = useState(false)

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)
  const openModalEdit = () => setShowModalEdit(true)
  const closeModalEdit = () => setShowModalEdit(false)

  return (
    <table className="table border-collapsed w-full">
      {data.length > 0 && (
        <thead>
          <tr>
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
          data.map((item, index) => (
            <tr key={index} className="hover:bg-[#ececec]">
              {Object.values(item).map((value, idx) => (
                <td key={idx} className="border border-[#1A6D12] text-center py-1">
                  {value}
                </td>
              ))}
              <td className="border border-[#1A6D12] text-center py-1">
                <div className="flex justify-evenly">
                  <button key={index} onClick={openModal} className="cursor-pointer">
                    <FaTrash />
                  </button>
                  <PopupDelete showModal={showModal} onClose={closeModal} />
                  <button key={index} onClick={openModalEdit} className="cursor-pointer">
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
          ))
        ) : (
          <tr>
            <td
              colSpan={
                Object.keys(data[0] || { id: 1, nome: '', quantidade: '', peso: '' }).length + 1
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
