/*
sendo usada de teste por enquanto
trocar o nome do arquivo
fazer tipo a pagina de estoque so que com fornecedores, funcionarios e clientes
*/

import TableContainer from '../components/tabelas/TabelaComFiltro'
import { useState, useEffect } from 'react'
import Button from '../components/botoes/DesignBotao'
import Popup from '../components/popups/PopupCriarRegistro' // popup de criar Pessoa

export default function Pessoas() {
  // define os dados da tabela, imporviso por falta de banco de dados
  const [data, setData] = useState([])
  // define a tabela selecionada, sendo a inicial 'cereais'
  const [selected, setSelected] = useState('cliente')
  // controla a visibilidade do modal
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
      window.api
        .getPeople(selected)
        .then((result) => {
          setData(result)
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    }, [selected])

  const changeData = (type) => {
    setSelected(type)
  }

  // funções para abrir e fechar o modal
  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  return (
    <div className="pt-10">
      <h1 className="text-4xl text-[#1A6D12] font-black py-4 text-center">Controle de Pessoas</h1>
      {/* texto do input da tabela */}
      <p className="text-black ps-30 mt-15 mb-3">Nome da Pessoa</p>
      {/* container da tabela */}
      <div className=" w-full px-30">
        <TableContainer
          data={data}
          buttonText={'Nova Pessoa'}
          secondaryButtonText={'Exportar'}
          onClick={openModal}
        />
        {/* escolher entre tabelas */}
        <div className="mt-3 flex justify-between">
          <Button
            onClick={() => changeData('cliente')}
            className={`${selected === 'cliente' ? 'text-white bg-[#1A6D12] hover:bg-[#145A0C]' : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'} w-60`}
            text="Clientes"
          />
          <Button
            onClick={() => changeData('funcionario')}
            className={`${selected === 'funcionario' ? 'text-white bg-[#1A6D12] hover:bg-[#145A0C]' : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'} w-60`}
            text="Funcionários"
          />
          <Button
            onClick={() => changeData('fornecedor')}
            className={`${selected === 'fornecedor' ? 'text-white bg-[#1A6D12] hover:bg-[#145A0C]' : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'} w-60`}
            text="Fornecedores"
          />
        </div>
      </div>
      {/* Popup para criar Pessoa */}
      <Popup showModal={showModal} onClose={closeModal} table={data} />
    </div>
  )
}
