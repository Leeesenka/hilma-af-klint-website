import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="min-h-screen relative" style={{ backgroundColor: '#C1C0B6' }}>
        <Navigation />
        <div id="page" className="relative transition-all duration-1000 ease-in-out">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  )
}

export default App

