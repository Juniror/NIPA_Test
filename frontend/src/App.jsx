import { useNavigate, Routes, Route } from 'react-router-dom'
import './css/App.css'
import Navbar from './components/Navbar'
import Bottom from './components/Bottom'
import HomePage from './pages/HomePage'
import ThankYouPage from './pages/ThankYouPage'

function App() {
  const navigate = useNavigate()

  const handleHomeClick = () => {
    navigate('/')
    window.scrollTo(0, 0)
  }

  return (
    <>
      <Navbar onHomeClick={handleHomeClick} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/thankyou" element={<ThankYouPage />} />
      </Routes>
      <Bottom />
    </>
  )
}

export default App
