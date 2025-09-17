import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa'

export default function TabelaComQuantiadade({ data, setData }) {
  const handleChange = (index, delta) => {
    setData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantidade: Math.max(1, item.quantidade + delta) } : item
      )
    )
  }
  const handleDelete = (index) => {
    setData((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <table className="table table-fixed border-collapsed w-full">
      {data && (
        <thead>
          <tr>
            <th className=" border border-[#1A6D12] px-1 py-1">Nome</th>
            <th className="border border-[#1A6D12] px-1 py-1 w-1/4">Quantidade</th>
          </tr>
        </thead>
      )}
      <tbody>
        {data && data.length > 0 ? (
          data.map((item, key) => (
            <tr key={key}>
              <td className="border border-[#1A6D12] text-center py-1">{item.nome}</td>
              <td className="border border-[#1A6D12] text-center py-1">
                <div className="flex justify-evenly">
                  <button
                    className="cursor-pointer"
                    onClick={
                      item.quantidade == 1 ? () => handleDelete(key) : () => handleChange(key, -1)
                    }
                  >
                    {item.quantidade == 1 ? <FaTrash /> : <FaMinus />}
                  </button>
                  <p>{item.quantidade}</p>
                  <button className="cursor-pointer" onClick={() => handleChange(key, 1)}>
                    <FaPlus />
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="text-center py-4" colSpan={2}>
              Nenhum resultado encontrado.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
