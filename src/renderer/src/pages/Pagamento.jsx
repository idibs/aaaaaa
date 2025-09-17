// n faço ideia do q vou fazer aq ainda, mas é aquela ideia
// de calcular o valor a ser pago a um funcionario baseado
// na quantidade de horas trabalhadas e ao seu cargo
import { useState } from 'react'
import Tabela from '../components/tabelas/Tabela'
import Input from '../components/inputs/Input'

const exemplo = [
  {
    nome: 'ração poedeira triturada 20kg nutirmax',
    valor: 10,
  },
  { nome: 'produto b', valor: 50 },
  { nome: 'produto etwetwtewtwtc', valor: 7  },
  { nome: 'produto d', valor: 90  },
  { nome: 'produto e', valor: 56  },
  { nome: 'produto f', valor: 12  },
  { nome: 'produto g', valor: 59  },
  { nome: 'produto h', valor: 69  },
  { nome: 'produto i', valor: 222  },
  { nome: 'produto j', valor: 14  }
]

export default function Pagamento() {
  const [data, setData] = useState(exemplo)
  const total = data.reduce((acc, item) => acc + item.valor, 0)

  return (
    <div className="pt-10">
      <h1 className="text-4xl text-[#1A6D12] font-black py-4 text-center">Pagar Funcionários</h1>
    <div className="mt-20 grid px-30 grid-cols-5 gap-6 w-full">
        <div className="col-span-3">
          <p>Itens:</p>
          <div className="border border-[#1A6D12] w-full h-125">
            <Tabela data={data} />
          </div>
        </div>
        <div className="col-span-2">
          <p>Produtos:</p>
          <Input
            inputType="text"
            placeholder="Nome"
            inputName="nome"
          />
          <div className="flex justify-between">
            <button className="text-white bg-[#1A6D12] hover:bg-[#145A0C] rounded-xl w-32 py-2 mt-4 cursor-pointer" >
              Adicionar
            </button>
            <button className="text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec] rounded-xl w-32 py-2 mt-4 cursor-pointer">
              limpar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


      /*<div className="mb-4">
        <CreateInput 
          placeholder="Escolha o Funcionário" 
          inputName="nome_func" 
          inputType="text"
          text="Funcionário"
        />
        </div>
        <div className="mb-4">
        <CreateInput 
          placeholder="Escolha o Cargo" 
          inputName="nome_car" 
          inputType="text"
          text="Cargo"
        />
        </div>*/