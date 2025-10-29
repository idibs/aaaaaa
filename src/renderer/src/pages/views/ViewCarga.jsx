import Tabela from '../../components/tabelas/Tabela.jsx'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Button from '../../components/botoes/BotaoVoltar.jsx'

export default function ViewCarga() {
  const [data, setData] = useState([])
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!id) return // evita chamada com id indefinido
    window.api
      .getPedidoProdutosByCarga(id)
      .then((result) => setData(result))
      .catch((error) => console.error('Error fetching data:', error))
  }, [id])

  return (
    <div className="pt-10 h-screen flex flex-col items-center">
      {/* Título */}
      <h1 className="text-4xl text-[#1A6D12] font-black py-4 text-center">
        Detalhes da Carga #{id}
      </h1>

      {/* Botão Voltar */}
      <div className="flex justify-start w-4/5 mb-4">
        <Button path={'/carga'} />
      </div>

      {/* Container da Tabela */}
      <div className="border border-[#1A6D12] h-[70vh] overflow-auto w-4/5 rounded-lg shadow-md">
        <Tabela data={data ? data : []} />
      </div>
    </div>
  )
}
