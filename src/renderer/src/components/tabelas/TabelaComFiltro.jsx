import { Link } from 'react-router-dom'
import Tabela from './Tabela'
import Button from '../botoes/DesignBotao'
import { useState } from 'react'
import Input from '../inputs/Input'

export default function TabelaComFiltro({data, buttonText, pathButton, onClick, secondaryButtonText}) {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredData =  data.filter(item => item.Nome.toLowerCase().includes(searchTerm.toLowerCase()))

    return(
      <>
        {/* table options */}
        <div className="w-full flex justify-between">
        {/* Name */}
        <div className="flex flex-col w-1/3">
            <Input
            inputType="text"
            placeholder="Nome"
            inputName="nome"
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        {/* options */}
        <div className="flex gap-3">
          <Link to={pathButton} className="h-full">
            <Button
              className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-40 h-full py-2"
              text={buttonText}
              onClick={onClick}
            />
          </Link>
          <Button 
            className="text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec] w-40 py-2"
            text={secondaryButtonText}
          />
        </div>
        </div>
        {/* table */}
        <div className="border border-[#1A6D12] h-120 overflow-auto w-full mt-3">
          <Tabela data={filteredData ? filteredData : []}/>
        </div>
      </>
    )
}