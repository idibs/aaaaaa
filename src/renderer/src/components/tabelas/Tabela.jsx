import { MdEdit } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa'
import { useState } from 'react'
import PopupDelete from '../popups/PopUpDelete'
import PopupEditFunc from '../popups/funcionario/PopUpEditFunc'
import PopupEditProd from '../popups/produtos/PopUpEditProd'
import PopupEditPes from '../popups/pessoas/PopUpEditPes'
import PopupEditLote from '../popups/produto_base/PopUpEditLote' // ✅ import adicionado

const Tabela = ({ data, insertTable, onSave }) => {
  const [showModal, setShowModal] = useState(false)
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedItems, setSelectedItems] = useState([]) // ids selecionados

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)
  const openModalEdit = () => setShowModalEdit(true)
  const closeModalEdit = () => setShowModalEdit(false)

  // Toggle checkbox
  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((item) => item !== id) : [...prevSelected, id]
    )
  }

  // Determina qual popup de edição usar baseado na tabela
  const renderEditPopup = () => {
    if (!showModalEdit || !selectedProduct) return null

    const commonProps = {
      showModal: showModalEdit,
      onClose: () => {
        closeModalEdit()
        setSelectedProduct(null)
      },
      initialData: selectedProduct,
      onSave: (payload) => {
        onSave?.(payload, selectedProduct)
        closeModalEdit()
      }
    }

    switch (insertTable.toLowerCase()) {
      case 'cereal':
      case 'ração':
      case 'variedade':
        return <PopupEditProd {...commonProps} />
      case 'funcionario':
        return <PopupEditFunc {...commonProps} />
      case 'pessoas':
      case 'cliente':
        return <PopupEditPes {...commonProps} />
      case 'lote':
      case 'produto':
        return <PopupEditLote {...commonProps} />
      default:
        return null
    }
  }

  return (
    <>
      <table className="table border-collapsed w-full">
        {data.length > 0 && (
          <thead>
            <tr>
              <th className="border border-[#1A6D12] px-1 py-1">
                {/* Cabeçalho checkbox */}
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
                    <div className="flex justify-evenly">
                      {/* Ao clicar na lixeira: seleciona o item e abre o modal de delete */}
                      <button
                        onClick={() => {
                          setSelectedProduct(item)
                          openModal()
                        }}
                        className="cursor-pointer"
                      >
                        <FaTrash />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedProduct(item)
                          openModalEdit()
                        }}
                        className="cursor-pointer"
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
                colSpan={
                  Object.keys(data[0] || { id: 1, nome: '', quantidade: '', peso: '' }).length +
                  1 +
                  1
                }
                className="text-center py-4"
              >
                Nenhum resultado encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Popups renderizados fora da tabela */}
      {showModal && (
        <PopupDelete
          showModal={showModal}
          onClose={() => {
            closeModal()
            setSelectedProduct(null)
          }}
          initialData={selectedProduct}
        />
      )}

      {renderEditPopup()}
    </>
  )
}

export default Tabela
