import './TrackingPage.css';
import {Link, useParams} from 'react-router';
import Headers from '../components/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
export default function TrackingPage({ cart }) {
    const { orderId, productId } = useParams();
    const [orderData, setOrderData] = useState(null);
    useEffect(() => {
        const fetchTrackingData = async() => {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`)
            setOrderData(response.data);
        }
        fetchTrackingData();
    },[orderId])
    if(!orderData) {
        return null;
    }
    const orderProduct = orderData.products.find((orderProduct)=> {
        return orderProduct.productId === productId;
    })
    const totalDeliveryTime = orderProduct.estimatedDeliveryTimeMs - orderData.orderTimeMs;
    const timePassedMs = dayjs().valueOf() - orderData.orderTimeMs;
    const deliveryProgress = (timePassedMs / totalDeliveryTime) * 100; 
    const isPreparing = deliveryProgress < 33;
    const isShipped = deliveryProgress >= 33 && deliveryProgress < 100;
    const isDelivered = deliveryProgress >= 100;

    console.log('delivery progress', deliveryProgress);
    return (
        <><title>Tracking Page</title>
         <link rel="icon" type="image/svg+xml" href="/tracking-favicon.png" />
            <Headers cart={cart} />
                <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        { deliveryProgress >= 100 ? 'Delivered on ' : 'Arriving on '}
                        {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                    </div>

                    <div className="product-info">
                        {orderProduct.name}
                    </div>

                    <div className="product-info">
                        Quantity: {orderProduct.quantity}
                    </div>

                    <img className="product-image" src={orderProduct.product.image} />

                    <div className="progress-labels-container">
                        <div className={`progress-label ${isPreparing ? 'current-status' : ''}`}>
                            Preparing
                        </div>
                        <div className={`progress-label ${isShipped ? 'current-status' : ''}`}>
                            Shipped
                        </div>
                        <div className={`progress-label ${isDelivered ? 'current-status' : ''}`}>
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{width: `${deliveryProgress}%`}}>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}