//pagina inicial so com a logo da empresa

import logo from '../assets/RBS.svg'

export default function Home() {
  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <div>
          <img
            src={logo}
            className="h-70 transition-[filter] duration-300 hover:drop-shadow-[0_0_16px_rgba(87,130,87,0.37)]"
          />
        </div>
      </div>
    </div>
  )
}
