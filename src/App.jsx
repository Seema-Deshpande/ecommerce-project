import HomePage from './pages/HomePage'
import './App.css'
import {Routes, Route } from 'react-router'
function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/checkout" element={<div>Checkout Page</div>} />
    </Routes>
  )
}

export default App
