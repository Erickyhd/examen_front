import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Proyectos from './pages/Proyectos'
import Inmuebles from './pages/Inmuebles'
import Dashboard from './pages/Dashboard'
import DetalleInmueble from './pages/DetalleInmueble'
function App() {
  return (
    <div>
      <BrowserRouter>
      <Dashboard />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/inmuebles" element={<Inmuebles />} />
          <Route path="/detalleinmueble" element={<DetalleInmueble />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
