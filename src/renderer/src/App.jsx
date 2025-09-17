import Navbar from './components/Navbar'
import AppRoutes from './routes/index'

function App() {
  return (
    <>
      {/* Barra para arrastar a janela */}
      <div style={{ appRegion: 'drag' }} className="fixed transparent w-full h-8"></div>
      <Navbar />
      {/* padding pra ignorar o navbar lateral */}
      <div className="ps-24">
        {/* Rotas do aplicativo */}
        <AppRoutes />
      </div>
    </>
  )
}

export default App
