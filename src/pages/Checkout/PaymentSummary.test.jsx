import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useLocation } from 'react-router';
import axios from 'axios';
import { MemoryRouter } from 'react-router';
import { PaymentSummary } from './PaymentSummary';

vi.mock('axios')
describe('PaymentSummary Component', () => {
    let paymentSummary = [];
    let loadCart;
    beforeEach(() => {
        paymentSummary = {
            totalItems: 3,
            productCostCents: 4275,
            shippingCostCents: 499,
            totalCostBeforeTaxCents: 4774,
            taxCents: 477,
            totalCostCents: 5251
        };
        loadCart = vi.fn();
        axios.post.mockImplementation(async (urlPath) => {
            if (urlPath === '/api/orders') {
                return {
                    data: {
                        orderId: '12345',
                        orderTimeMs: 1771386430486,
                        totalCostCents: 2274,
                        products: [
                            {
                                productId: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
                            quantity: 1,
                            estimatedDeliveryTimeMs: 1771991230486
                        },
                    ],
                }
            }

            }
        })
    })
    it('displays the payment summary details correctly', () => {
        render(<MemoryRouter>
            <PaymentSummary
                paymentSummary={paymentSummary}
                loadCart={loadCart} />
        </MemoryRouter>)
        const paymentSummaryContainer = screen.getByTestId('payment-summary-product-cost');
        expect(within(paymentSummaryContainer).getByText('Items (3):')).toBeInTheDocument();
        expect(within(paymentSummaryContainer).getByText('$42.75')).toHaveTextContent('$42.75');
        const shippingCostContainer = screen.getByTestId('payment-summary-shipping-cost');
        expect(within(shippingCostContainer).getByText('Shipping & handling:')).toBeInTheDocument();
        expect(within(shippingCostContainer).getByText('$4.99')).toHaveTextContent('$4.99');
        const totalBeforeTaxContainer = screen.getByTestId('payment-summary-total-before-tax');
        expect(within(totalBeforeTaxContainer).getByText('Total before tax:')).toBeInTheDocument();
        expect(within(totalBeforeTaxContainer).getByText('$47.74')).toHaveTextContent('$47.74');
        const taxContainer = screen.getByTestId('payment-summary-tax');
        expect(within(taxContainer).getByText('Estimated tax (10%):')).toBeInTheDocument();
        expect(within(taxContainer).getByText('$4.77')).toHaveTextContent('$4.77');
        const totalContainer = screen.getByTestId('payment-summary-total');
        expect(within(totalContainer).getByText('Order total:')).toBeInTheDocument();
        expect(within(totalContainer).getByText('$52.51')).toHaveTextContent('$52.51');
    })

    it('payment summary checks that clicking place order creates an order, reloads the cart and navigates to orders page', async () => {
        function Location () {
            const location = useLocation();
            return(
                <div data-testid="urlPath">{location.pathname}</div>
            )
        }
        render(<MemoryRouter>
            <PaymentSummary
                paymentSummary={paymentSummary}
                loadCart={loadCart} />
            <Location />
        </MemoryRouter>)
        const placeOrderButton = screen.getByTestId('place-order-button');
        await userEvent.click(placeOrderButton);
        expect(axios.post).toHaveBeenCalledWith('/api/orders');
        expect(loadCart).toHaveBeenCalled();
        const urlPath = screen.getByTestId('urlPath');
        expect(urlPath).toHaveTextContent('/orders');
    })
})