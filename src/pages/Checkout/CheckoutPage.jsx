import CheckoutHeader from './CheckoutHeader';
import './CheckoutPage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';

export default function CheckoutPage({ cart, loadCart }) {
    const [deliveryOption, setDeliveryOption] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);
    useEffect(() => {
        const fetchCheckoutData = async() => {
            let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
            setDeliveryOption(response.data);

            response = await axios.get('/api/payment-summary');
            setPaymentSummary(response.data);
        }
        fetchCheckoutData();
    }, [cart])
    return (
        <>
        {   console.log('checkout page render', cart) }
            <title>Checkout Page</title>
            <CheckoutHeader cart={cart} />
            <div className="checkout-page">
                <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                <OrderSummary cart={cart} deliveryOption={deliveryOption} loadCart={loadCart} />
                <PaymentSummary paymentSummary={paymentSummary}  loadCart={loadCart}/>
                </div>
            </div>
        </>
    )
}