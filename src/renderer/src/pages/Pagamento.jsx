import { useState, useEffect } from 'react'
import Tabela from '../components/tabelas/Tabela'
import Input from '../components/inputs/Input'
import Button from '../components/botoes/DesignBotao'

export default function Pagamento() {
  const [data, setData] = useState([]) // dados do banco
  const [filteredData, setFilteredData] = useState([]) // dados filtrados
  const [term, setTerm] = useState('') // termo de pesquisa
  const [tipo, setTipo] = useState('Registrado') // tipo selecionado

  // Busca os dados do banco sempre que o tipo mudar
  useEffect(() => {
    window.api
      .getFuncionariosByTipo(tipo)
      .then((result) => {
        setData(result)
      })
      .catch((error) => console.error('Erro ao buscar funcionários:', error))
  }, [tipo])

  // Filtra os dados pelo nome sempre que data ou term mudarem
  useEffect(() => {
    setFilteredData(
      data.filter(f => f.Nome.toLowerCase().includes(term.toLowerCase()))
    )
  }, [data, term])

  const changeData = (novoTipo) => setTipo(novoTipo)

  // Calcula valor a pagar baseado no cargo e nos dias registrados
  const calcularValor = (func) => {
    const valorDia = func.Cargo === 'Horista' ? 30 : 50
    return (func.DiasRegistrados?.length || 0) * valorDia
  }

  // Prepara os dados para a tabela (apenas visualização)
  const tabelaFormatada = filteredData.map((f) => ({
    id: f.id,
    nome: f.Nome,
    cargo: f.Cargo,
    calendario: f.DiasRegistrados?.join(', ') || '-', // mostra os dias já registrados
    valor: `R$ ${calcularValor(f)}`,
    observacoes: f.Observacoes || '',
    dataPagamento: f.DataPagamento || '',
  }))

  return (
    <div className="pt-10 flex flex-col items-center">
      <h1 className="text-4xl text-[#1A6D12] font-black py-4 text-center">
        Pagar Funcionários
      </h1>

      <div className="w-full max-w-5xl mt-10">
        <p className="text-black mb-2 text-lg font-medium">Funcionários:</p>

        {/* Barra de pesquisa e botão */}
        <div className="w-full flex items-center justify-between mb-4">
          <div className="flex w-1/3">
            <Input
              inputType="text"
              placeholder="Buscar..."
              inputName="nome"
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <Button
              className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-40 py-2"
              text="Adicionar"
              onClick={() => console.log('Abrir formulário para registrar dias')}
            />
          </div>
        </div>

        {/* Tabela */}
        <div className="border border-[#1A6D12] h-120 overflow-auto w-full rounded-lg mx-auto">
          <Tabela
            data={tabelaFormatada}
            columns={['Nome', 'Cargo', 'Calendário', 'Valor a Pagar', 'Observações', 'Data do Pagamento']}
          />
        </div>

        {/* Escolher entre tabelas */}
        <div className="mt-4 mb-4 flex justify-around">
          <Button
            onClick={() => changeData('Registrado')}
            className={`${tipo === 'Registrado'
              ? 'text-white bg-[#1A6D12] hover:bg-[#145A0C]'
              : 'text-[#1A6D12] border border-[#1A6D12] hover:bg-[#ececec]'
            } w-60`}
            text="Registrado"
          />
          <Button
            onClick={() => changeData('Não Registrado')}
            className={`${tipo === 'Não Registrado'
              ? 'text-white bg-[#1A6D12] hover:bg-[#145A0C]'
              : 'text-[#1A6D12] border border-[#1A6D12] hover:bg-[#ececec]'
            } w-60`}
            text="Não Registrado"
          />
        </div>
      </div>
    </div>
  )
}
