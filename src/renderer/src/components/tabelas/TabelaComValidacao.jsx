import { MdEdit } from 'react-icons/md'
import { FaTrash, FaCheck } from 'react-icons/fa' // ⬅️ Importamos o FaCheck
import { useState } from 'react'
import PopupDelete from '../popups/PopUpDelete'
import PopupEditFunc from '../popups/funcionario/PopUpEditFunc'
import PopupEditProd from '../popups/produtos/PopUpEditProd'
import PopupEditPes from '../popups/pessoas/PopUpEditPes'

const Tabela = ({ data, insertTable, onSave, columns }) => {
  const [showModal, setShowModal] = useState(false)
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)
  const openModalEdit = () => setShowModalEdit(true)
  const closeModalEdit = () => setShowModalEdit(false)

  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((item) => item !== id) : [...prevSelected, id]
    )
  }

  // Função para obter o valor da célula a partir do objeto row usando o nome da coluna.
  // Tenta várias formas: nome exato, sem espaços, snake_case, camelCase e nomes legados comuns.
  const getCellValue = (row, col) => {
    if (!row) return ''
    // se existir exatamente a chave, retorna direto
    if (Object.prototype.hasOwnProperty.call(row, col)) return row[col]

    const normalize = (s) =>
      s
        ?.toString()
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')

    const candidates = new Set()
    candidates.add(col)

    // sem espaços
    const noSpace = col?.toString().replace(/\s+/g, '')
    if (noSpace) candidates.add(noSpace)
    candidates.add(noSpace?.toLowerCase())

    // snake_case
    const snake = col?.toString().replace(/\s+/g, '_')
    if (snake) candidates.add(snake)

    // camelCase
    const words = col
      ?.toString()
      .split(/\s+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join('')
    if (words) candidates.add(words.charAt(0).toLowerCase() + words.slice(1))

    // versão normalizada para mapear nomes legados
    const norm = normalize(col)

    const legacyMap = {
      datadopagamento: 'data_pagamento',
      datapagamento: 'data_Pagamento',
      periodo: '',
      horastrabalhadas: 'horas_trabalhadas',
      observacoes: 'Observacoes',
      observações: 'Observacoes',
      valor: 'val',
      calendario: 'calendario'
    }

    if (legacyMap[norm]) candidates.add(legacyMap[norm])

    // tenta todas as chaves candidatas
    for (const k of candidates) {
      if (!k) continue
      if (Object.prototype.hasOwnProperty.call(row, k)) return row[k]
      // também tenta com primeira letra minúscula/maiúscula
      const alt = k.charAt(0).toLowerCase() + k.slice(1)
      if (Object.prototype.hasOwnProperty.call(row, alt)) return row[alt]
      const alt2 = k.charAt(0).toUpperCase() + k.slice(1)
      if (Object.prototype.hasOwnProperty.call(row, alt2)) return row[alt2]
    }

    return ''
  }

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((col, idx) => (
            <th
              key={idx}
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((col, i) => (
              <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {getCellValue(row, col) ?? ''}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Tabela
