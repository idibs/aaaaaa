import Tabela from '../../components/tabelas/Tabela.jsx'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function ViewCarga() {
  const [data, setData] = useState([])
  const { id } = useParams()

  useEffect(() => {
    if (!id) return // evita chamada com id indefinido
    window.api
      .getPedidoProdutosByCarga(id)
      .then((result) => {
        setData(result)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [id]) // refaz quando o id da rota mudar

  return (
    <div className="border border-[#1A6D12] h-6/10 overflow-auto w-full mt-3">
      <Tabela data={data ? data : []} />
    </div>
  )
}
