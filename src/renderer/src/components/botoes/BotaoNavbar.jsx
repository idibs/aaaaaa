import { Link } from 'react-router-dom'

export default function BotaoNavbar({ icon, text, link }) {
  return (
    <Link
      to={link}
      className="w-24 py-5 flex flex-col items-center text-[14px] hover:bg-[#3e7441] transition-all duration-200"
    >
      <div className="text-[28px]">{icon}</div>
      <span>{text}</span>
    </Link>
  )
}
