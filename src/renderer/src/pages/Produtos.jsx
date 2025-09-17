/* 
trocar o nome do arquivo
finalizar o popup de criar produto
adicionar o popup de editar produto baseado no de criar
integrar com banco de dados
*/

import TableContainer from '../components/tabelas/TabelaComFiltro'
import { useState } from 'react'
import Button from '../components/botoes/DesignBotao'
import Popup from '../components/popups/PopupCriarRegistro' // popup de criar produto
import { useEffect } from 'react'

export default function Produtos() {
  // define os dados da tabela, imporviso por falta de banco de dados
  const [data, setData] = useState([])
  // define a tabela selecionada, sendo a inicial 'cereais'
  const [selected, setSelected] = useState('cereal')
  // controla a visibilidade do modal
  const [showModal, setShowModal] = useState(false)

  const insertTable = 'produto'

  useEffect(() => {
    window.api
      .getProducts(selected)
      .then((result) => {
        setData(result)
        console.log(result)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [selected])

  // função para alterar os dados da tabela e o tipo selecionado controlado pelos botões de baixo
  const changeData = (type) => {
    setSelected(type)
  }

  // funções para abrir e fechar o modal
  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  return (
    <div className="pt-10">
      <h1 className="text-4xl text-[#1A6D12] font-black py-4 text-center">Produtos em Estoque</h1>
      {/* texto do input da tabela */}
      <p className="text-black ps-30 mt-10 mb-3">Nome do Produto:</p>
      {/* container da tabela */}
      <div className=" w-full px-30">
        <TableContainer
          data={data}
          buttonText={'Novo Produto'}
          secondaryButtonText={'Exportar'}
          onClick={openModal}
        />
        {/* escolher entre tabelas */}
        <div className="mt-4 mb-4 flex justify-between">
          <Button
            onClick={() => changeData('cereal')}
            className={`${selected === 'cereal' ? 'text-white bg-[#1A6D12] hover:bg-[#145A0C]' : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'} w-60`}
            text="Cereais"
          />
          <Button
            onClick={() => changeData('ração')}
            className={`${selected === 'ração' ? 'text-white bg-[#1A6D12] hover:bg-[#145A0C]' : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'} w-60`}
            text="Rações"
          />
          <Button
            onClick={() => changeData('variedades')}
            className={`${selected === 'variedades' ? 'text-white bg-[#1A6D12] hover:bg-[#145A0C]' : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'} w-60`}
            text="Variedades"
          />
        </div>
      </div>
      {/* Popup para criar produto */}
      <Popup showModal={showModal} onClose={closeModal} table={data} insertTable={insertTable}/>
    </div>
  )
}
