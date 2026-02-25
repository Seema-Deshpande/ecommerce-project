import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router';
import CheckoutPage from './CheckoutPage';

vi.mock('axios')
describe('CheckoutPage Component', () => {
    let cart, paymentSummary, loadCart;
    beforeEach(() => {

        loadCart = vi.fn();
        cart = [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1',
            product: {
                id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                rating: {
                    stars: 4.5,
                    count: 87
                },
                priceCents: 1090,
                keywords: ["socks", "sports", "apparel"]
            }
        }, {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2',
            product: {
                id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                image: "images/products/intermediate-composite-basketball.jpg",
                name: "Intermediate Size Basketball",
                rating: {
                    stars: 4,
                    count: 127
                },
                priceCents: 2095,
                keywords: ["sports", "basketballs"]
            }
        }];

        const deliveryOptions = [{
            id: '1',
            deliveryDays: 7,
            priceCents: 0,
            estimatedDeliveryTimeMs: 1747597994451,
        }, {
            id: '2',
            deliveryDays: 3,
            priceCents: 499,
            estimatedDeliveryTimeMs: 1747252394451,
        }, {
            id: '3',
            deliveryDays: 1,
            priceCents: 999,
            estimatedDeliveryTimeMs: 1747079594451,
        }];

        paymentSummary = {
            totalItems: 3,
            productCostCents: 4275,
            shippingCostCents: 499,
            totalCostBeforeTaxCents: 4774,
            taxCents: 477,
            totalCostCents: 5251
        };

        axios.get.mockImplementation(async (urlPath) => {
            if (urlPath === '/api/delivery-options?expand=estimatedDeliveryTime') {
                return {
                    data: deliveryOptions
                }
            }
            if (urlPath === '/api/payment-summary') {
                return {
                    data: paymentSummary
                }
            }
        })
    })
    it('displays the checkout page details correctly', async () => {
        render(
            <MemoryRouter>
                <CheckoutPage cart={cart} loadCart={loadCart} />
            </MemoryRouter>
        );
        const paymentSummaryContainer = await screen.findAllByTestId('payment-summary-product-cost');
        expect(axios.get).toHaveBeenNthCalledWith(1, '/api/delivery-options?expand=estimatedDeliveryTime');
        expect(axios.get).toHaveBeenNthCalledWith(2, '/api/payment-summary');
        expect(screen.getByText('Review your order')).toBeInTheDocument();
        expect(screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')).toBeInTheDocument();
        expect(screen.getByText('Intermediate Size Basketball')).toBeInTheDocument();
        expect(within(paymentSummaryContainer[0]).getByText('Items (3):')).toBeInTheDocument();
        expect(within(paymentSummaryContainer[0]).getByText('$42.75')).toHaveTextContent('$42.75');
        expect(screen.getByText('Shipping & handling:')).toBeInTheDocument();
        expect(screen.getByText('$4.99')).toHaveTextContent('$4.99');
        expect(screen.getByText('Total before tax:')).toBeInTheDocument();
        expect(screen.getByText('$47.74')).toHaveTextContent('$47.74');
        expect(screen.getByText('Estimated tax (10%):')).toBeInTheDocument();
        expect(screen.getByText('$4.77')).toHaveTextContent('$4.77');
        expect(screen.getByText('Order total:')).toBeInTheDocument();
        expect(screen.getByText('$52.51')).toHaveTextContent('$52.51');
     });

     it('recalculates payment summary when cart changes', async () => {
        render(
            <MemoryRouter>
                <CheckoutPage cart={cart} loadCart={loadCart} />
            </MemoryRouter>
        );
        expect(axios.get).toHaveBeenNthCalledWith(2, '/api/payment-summary');
        cart.push({
            productId: '3ebe75dc-64d2-4137-8860-1f5a963e534b',
            quantity: 1,
            deliveryOptionId: '3',
            product: {
                id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
                image: "images/products/wooden-desk-organizer.jpg",
                name: "Wooden Desk Organizer",
                rating: {
                    stars: 4.8,
                    count: 52
                },
                priceCents: 1999,
                keywords: ["home", "office", "organizers"]
            }
        });
        render(
            <MemoryRouter>
                <CheckoutPage cart={cart} loadCart={loadCart} />
            </MemoryRouter>
        );
        expect(axios.get).toHaveBeenNthCalledWith(4, '/api/payment-summary');
        const paymentSummaryContainer = await screen.findAllByTestId('payment-summary-product-cost');
        expect(within(paymentSummaryContainer[0]).getByText('Items (3):')).toBeInTheDocument();
    })

});