/*
mudar o nome do arquivo
adicionar o valor do produto como campo da tabela pra fazer a soma do valor do pedido
n pode adicionar dois itens iguais
*/

import { Link } from 'react-router-dom'
import Tabela from '../../components/tabelas/Tabela'
import Popup from '../../components/popups/PopupCompras'
import { useState } from 'react'
import Button from '../../components/botoes/DesignBotao'
import Back from '../../components/botoes/BotaoVoltar'
import Input from '../../components/inputs/Input'

const data = [
  {
    id: 1,
    nome: 'ração poedeira triturada 20kg nutirmax',
    quantidade: 10,
    peso: 25,
    tipo: 'cereal'
  },
  { id: 2, nome: 'produto b', quantidade: 5, peso: 12, tipo: 'medicamento' },
  { id: 3, nome: 'produto etwetwtewtwtc', quantidade: 20, peso: 30, tipo: 'racao' },
  { id: 4, nome: 'produto d', quantidade: 15, peso: 18, tipo: 'cereal' },
  { id: 5, nome: 'produto e', quantidade: 8, peso: 22, tipo: 'medicamento' },
  { id: 6, nome: 'produto f', quantidade: 12, peso: 28, tipo: 'racao' },
  { id: 7, nome: 'produto g', quantidade: 7, peso: 16, tipo: 'cereal' },
  { id: 8, nome: 'produto h', quantidade: 18, peso: 24, tipo: 'medicamento' },
  { id: 9, nome: 'produto i', quantidade: 9, peso: 20, tipo: 'racao' },
  { id: 10, nome: 'produto j', quantidade: 14, peso: 26, tipo: 'cereal' },
  { id: 11, nome: 'produto k', quantidade: 11, peso: 19, tipo: 'medicamento' },
  { id: 12, nome: 'produto l', quantidade: 6, peso: 21, tipo: 'racao' },
  { id: 13, nome: 'produto m', quantidade: 13, peso: 27, tipo: 'cereal' },
  { id: 14, nome: 'produto n', quantidade: 16, peso: 23, tipo: 'medicamento' },
  { id: 15, nome: 'produto o', quantidade: 4, peso: 17, tipo: 'racao' },
  { id: 16, nome: 'produto p', quantidade: 17, peso: 29, tipo: 'cereal' },
  { id: 17, nome: 'produto q', quantidade: 3, peso: 15, tipo: 'medicamento' },
  { id: 18, nome: 'produto r', quantidade: 19, peso: 31, tipo: 'racao' },
  { id: 19, nome: 'produto s', quantidade: 2, peso: 14, tipo: 'cereal' },
  { id: 20, nome: 'produto t', quantidade: 21, peso: 32, tipo: 'medicamento' }
]

export default function NovaCompra() {
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = data.filter((item) =>
    item.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  return (
    <>
      <div className="pt-10">
        {/* title */}
        <h1 className="text-4xl text-[#1A6D12] font-black py-4 text-center">Nome Pedido</h1>
        {/* container table */}
        <p className="text-[#fffcff] ps-30 mt-15 mb-3 cursor-default">Pedido ou Orçamento:</p>
        <div className=" w-full px-30">
          {/* table options */}
          <div className="w-full flex justify-between">
            {/* Name */}
            <div className="flex gap-3  w-1/3">
              <Back path="/pedido" />
              <div className="flex flex-col w-full">
                <Input
                  inputType="text"
                  placeholder="Nome"
                  inputName="nome"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            {/* options */}
            <div className="flex gap-3">
              <Button
                className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-40"
                onClick={openModal}
                text="Adicionar Itens"
              />
              <Link to="/">
                <Button
                  className="text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec] w-40"
                  text="Exportar"
                />
              </Link>
            </div>
          </div>
          {/* table */}
          <div className="border border-[#1A6D12] h-120 overflow-auto w-full mt-3">
            <Tabela data={filteredData ? filteredData : []} />
          </div>
        </div>
        <Popup showModal={showModal} onClose={closeModal} />
      </div>
    </>
  )
}
