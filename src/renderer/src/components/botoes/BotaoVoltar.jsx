import { Link } from 'react-router-dom'
import Button from './DesignBotao'
import { IoMdArrowRoundBack } from "react-icons/io";

export default function BotaoVoltar({ path }) {
    return (
        <Link to={path}>
            <Button
                className={`text-[#1A6D12] border-solid border border-[#1A6D12] py-3 hover:bg-[#ececec]`}
                text={<IoMdArrowRoundBack />}
            />
        </Link>
    )
}