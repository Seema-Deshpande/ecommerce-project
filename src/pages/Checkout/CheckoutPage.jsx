import CheckoutHeader from './CheckoutHeader';
import './CheckoutPage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';

export default function CheckoutPage({ cart }) {
    const [deliveryOption, setDeliveryOption] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);
    useEffect(() => {
        axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            .then((response) => {
                setDeliveryOption(response.data);
            });

        axios.get('/api/payment-summary')
            .then((response) => {
                setPaymentSummary(response.data);
            });
    }, [])
    return (
        <>
            <title>Checkout Page</title>
            <CheckoutHeader />
            <div className="checkout-page">
                <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                <OrderSummary cart={cart} deliveryOption={deliveryOption} />
                <PaymentSummary paymentSummary={paymentSummary} />
                </div>
            </div>
        </>
    )
}