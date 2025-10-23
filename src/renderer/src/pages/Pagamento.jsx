import { useState, useEffect } from 'react'
import Tabela from '../components/tabelas/Tabela'
import Input from '../components/inputs/Input'
import Button from '../components/botoes/DesignBotao'
import Popup from '../components/popups/pagamento/PopUpCriarPag'

export default function Pagamento() {
  const [data, setData] = useState([]) // dados do banco
  const [filteredData, setFilteredData] = useState([]) // dados filtrados
  const [term, setTerm] = useState('') // termo de pesquisa
  const [tipo, setTipo] = useState('Registrado') // tipo selecionado
  const [showModal, setShowModal] = useState(false)
  
  const insertTable = 'pagamento'

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

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

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
    <div className="pt-10">
      <h1 className="text-4xl text-[#1A6D12] font-black py-4 text-center">
        Pagar Funcionários
      </h1>
      {/* texto do input da tabela */}
      <p className="text-black ps-30 mt-10 mb-3">Nome do Funcionário:</p>
      {/* container da tabela */}
      <div className=" w-full px-30">
        {/* table options */}
        <div className="w-full flex justify-between">
          {/* Name */}
          <div className="flex flex-col w-1/3">
            <Input
              inputType="text"
              placeholder="Nome"
              inputName="nome"
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>
          {/* options */}
          <div className="flex gap-3">
            <Button
              className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-40 h-full py-2"
              text="Adicionar"
              onClick={openModal}
            />
          </div>
        </div>
        {/* table */}
        <div className="border border-[#1A6D12] h-120 overflow-auto w-full mt-3">
          <Tabela
            data={tabelaFormatada}
            columns={["Nome", "Cargo", "Calendário", "Valor a Pagar", "Observações", "Data do Pagamento"]}
            insertTable={insertTable}
          />
        </div>
        {/* escolher entre tabelas */}
        <div className="mt-4 mb-4 flex justify-around">
          <Button
            onClick={() => changeData('Registrado')}
            className={`${tipo === 'Registrado' ? 'text-white bg-[#1A6D12] hover:bg-[#145A0C]' : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'} w-60`}
            text="Registrado"
          />
          <Button
            onClick={() => changeData('Não Registrado')}
            className={`${tipo === 'Não Registrado' ? 'text-white bg-[#1A6D12] hover:bg-[#145A0C]' : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'} w-60`}
            text="Não Registrado"
          />
        </div>
      </div>
      <Popup showModal={showModal} onClose={closeModal} table={data} insertTable={insertTable} />
    </div>
  )
}
