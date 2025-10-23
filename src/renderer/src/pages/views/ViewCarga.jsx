import Tabela from '../../components/tabelas/Tabela.jsx'
import { useState, useEffect } from 'react'

export default function ViewCarga() {
  const [data, setData] = useState([])

  useEffect(() => {
    window.api
      .getProdutosNomes()
      .then((result) => {
        setData(result)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])

  return (
    <div className="border border-[#1A6D12] h-6/10 overflow-auto w-full mt-3">
      <Tabela data={data ? data : []} />
    </div>
  )
}
