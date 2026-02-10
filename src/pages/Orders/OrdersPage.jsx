import Header from '../../components/Header'
import './OrdersPage.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { OrdersGrid } from './OrdersGrid';
export default function OrdersPage({ cart }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.get('/api/orders?expand=products');
            setOrders(response.data);
        }
        fetchOrders();
    }, [])
    return (
        <>
            <title>Orders Page</title>
            <link rel="icon" type="image/svg+xml" href="/orders-favicon.png" />
            <Header cart={cart} />
            <div className="orders-page">
                <div className="page-title">Your Orders</div>
                <OrdersGrid orders={orders} />
            </div>
        </>
    )
}