import HomePage from './pages/Home/HomePage.jsx'
import CheckoutPage from './pages/Checkout/CheckoutPage'
import OrdersPage from './pages/Orders/OrdersPage.jsx'
import TrackingPage from './pages/TrackingPage'
import './App.css'
import {Routes, Route } from 'react-router'
import PageNotFound from './pages/PageNotFound.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios';
function App() {
      const [cart, setCart] = useState([]);

      useEffect(() => {
        const getCartData = async () => {
            const response = await axios.get('/api/cart-items?expand=product');
            setCart(response.data);
        }
        getCartData();
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
