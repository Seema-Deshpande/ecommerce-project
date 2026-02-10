import HomePage from './pages/HomePage'
import CheckoutPage from './pages/Checkout/CheckoutPage'
import OrdersPage from './pages/OrdersPage'
import TrackingPage from './pages/TrackingPage'
import './App.css'
import {Routes, Route } from 'react-router'
import PageNotFound from './pages/PageNotFound.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios';
function App() {
      const [cart, setCart] = useState([]);
      useEffect(() => {
              axios.get('/api/cart-items?expand=product')
            .then((response) => {
                setCart(response.data);
            });
      },[])

  return (
    <Routes>
      <Route index element={<HomePage  cart={cart}/>} />
      <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="/orders" element={<OrdersPage cart={cart}/>} />
      <Route path="/tracking" element={<TrackingPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default App
