import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import TrackingPage from './TrackingPage';
import axios from 'axios';
import { MemoryRouter, Routes, Route } from 'react-router';

vi.mock('axios');

describe('Tracking component', () => {
    let cart, orders;
    beforeEach(() => {
        cart = [
            {
                id: 13,
                productId: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
                quantity: 1,
                deliveryOptionId: "1",
                product: {
                    keywords: [
                        "kitchen",
                        "cookware"
                    ],
                    id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
                    image: "images/products/3-piece-cooking-set.jpg",
                    name: "3 Piece Non-Stick, Black Cooking Pot Set",
                    rating: {
                        stars: 4.5,
                        count: 175
                    },
                    priceCents: 3499,
                }
            }
        ]
        orders = {
            id: "415541b0-11d9-4a66-b662-5f0a8737ecec",
            orderTimeMs: 1771889868398,
            totalCostCents: 34640,
            products: [
                {
                    productId: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
                    quantity: 9,
                    estimatedDeliveryTimeMs: 1772494668398,
                    product: {
                        keywords: [
                            "kitchen",
                            "cookware"
                        ],
                        id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
                        image: "images/products/3-piece-cooking-set.jpg",
                        name: "3 Piece Non-Stick, Black Cooking Pot Set",
                        rating: {
                            stars: 4.5,
                            count: 175
                        },
                        priceCents: 3499
                    }
                }
            ]
        }
        axios.get.mockResolvedValue({ data: orders });
    })

    it('renders tracking details correctly', async ()=> {
        render(
            <MemoryRouter initialEntries={['/tracking/415541b0-11d9-4a66-b662-5f0a8737ecec/8c9c52b5-5a19-4bcb-a5d1-158a74287c53']}>
                <Routes>
                    <Route path="/tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />
                </Routes>
            </MemoryRouter>
        )
        await waitFor(() => {
            expect(screen.getByTestId('product-image')).toHaveAttribute('src','images/products/3-piece-cooking-set.jpg');
            expect(screen.getByTestId('product-name')).toHaveTextContent('3 Piece Non-Stick, Black Cooking Pot Set');
            expect(screen.getByTestId('product-quantity')).toHaveTextContent("9");
            expect(screen.getByTestId('delivery-date')).toHaveTextContent('Arriving on Monday, March 2')
        });
    })
});

