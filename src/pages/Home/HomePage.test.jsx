import { it, expect, describe, vi, beforeEach } from 'vitest';
import HomePage from './HomePage';
import { render, screen, within } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';

vi.mock('axios')

describe('HomePage component', () => {
    let cart
    let loadCart
    beforeEach(() => {
        cart = [];
        loadCart = vi.fn();
        axios.get.mockImplementation(async (urlPath) => {
            if (urlPath === '/api/products') {
                return {
                    data: [
                        {
                            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                            rating: {
                                stars: 4.5,
                                count: 87
                            },
                            priceCents: 1090,
                            keywords: ["socks", "sports", "apparel"]
                        },
                        {
                            id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                            image: "images/products/intermediate-composite-basketball.jpg",
                            name: "Intermediate Size Basketball",
                            rating: {
                                stars: 4,
                                count: 127
                            },
                            priceCents: 2095,
                            keywords: ["sports", "basketballs"]
                        },
                    ]
                }
            }

            });
    });

    it('Displays the products correctly', async () => {
        render(
        <MemoryRouter>
            <HomePage cart={cart} loadCart={loadCart} />
        </MemoryRouter>)
       const productContainers = await screen.findAllByTestId('product-container');
       expect(productContainers).toHaveLength(2);
       expect(
        within(productContainers[0])
            .getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
        ).toBeInTheDocument();
          expect(
        within(productContainers[1])
            .getByText('Intermediate Size Basketball')
        ).toBeInTheDocument();
    });

    it('Add to cart button workks correctly', async () => {
        render(
            <MemoryRouter>
                <HomePage cart={cart} loadCart={loadCart} />
            </MemoryRouter>
        )
        const productContainers = await screen.findAllByTestId('product-container');
        const addToCartButton = within(productContainers[0]).getByTestId('add-to-cart-button');
        const selectQuantity1 = within(productContainers[0]).getByTestId('quantitySelector');
        await userEvent.selectOptions(selectQuantity1, '2');
        await userEvent.click(addToCartButton);
        const secondAddTOCartButton = within(productContainers[1]).getByTestId('add-to-cart-button');
        const selectQuantity2 = within(productContainers[1]).getByTestId('quantitySelector');
        await userEvent.selectOptions(selectQuantity2, '3');
        await userEvent.click(secondAddTOCartButton);
        expect(axios.post).toHaveBeenNthCalledWith(1,'/api/cart-items', {
            productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: Number(selectQuantity1.value)
        })
        expect(axios.post).toHaveBeenNthCalledWith(2,'/api/cart-items', {
            productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: Number(selectQuantity2.value)
        })
        expect(loadCart).toHaveBeenCalledTimes(2);
    })
});