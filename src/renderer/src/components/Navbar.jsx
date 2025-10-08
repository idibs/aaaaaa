import { FaHome, FaBoxes, FaBriefcase } from 'react-icons/fa'
import { IoPeople } from 'react-icons/io5'
import { FaCartShopping, FaMoneyCheckDollar, FaTableList } from 'react-icons/fa6'
import Button from './botoes/BotaoNavbar'

export default function Navbar() {
  return (
    <div className="fixed w-24 text-center text-white bg-[#06630b] h-full flex flex-col justify-center">
      <Button icon={<FaHome />} text={'Home'} link={'/'} />
      <Button icon={<FaBoxes />} text={'Produtos'} link={'/produtos'} />
      <Button icon={<IoPeople />} text={'Pessoas'} link={'/pessoas'} />
      <Button icon={<FaBriefcase />} text={'Funcionários'} link={'/funcionarios'} />
      <Button icon={<FaTableList />} text={'Vendas'} link={'/vendas'} />
      <Button icon={<FaCartShopping />} text={'Compras'} link={'/compras'} />
      <Button icon={<FaMoneyCheckDollar />} text={'Pagamentos'} link={'/pagamento'} />
    </div>
  )
}
