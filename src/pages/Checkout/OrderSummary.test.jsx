import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import axios from 'axios';
import { OrderSummary } from './OrderSummary';
import userEvent from '@testing-library/user-event';

vi.mock('axios')
describe('Order Summary Component', () => {
    let cart, deliveryOptions, loadCart, user;

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

      deliveryOptions = [{
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

        user = userEvent.setup();
    })
    it('displays the products in the cart with correct details', () => {
        render(
            <MemoryRouter>
                <OrderSummary cart={cart} deliveryOption={deliveryOptions} loadCart={loadCart} />
            </MemoryRouter>
        );
        const cartItemContainer = screen.getAllByTestId('cart-item-container');
        expect(cartItemContainer).toHaveLength(2);
        expect(
            within(cartItemContainer[0]).getByTestId('cart-item-product-image')
        ).toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg');
        expect(
            within(cartItemContainer[0]).getByTestId('cart-item-product-name')
        ).toHaveTextContent('Black and Gray Athletic Cotton Socks - 6 Pairs');

        expect(
            within(cartItemContainer[0]).getByTestId('cart-item-product-price')
        ).toHaveTextContent('$10.90');

        expect(
            within(cartItemContainer[0]).getByTestId('cart-item-product-quantity')
        ).toHaveTextContent('2');

        expect(
            within(cartItemContainer[1]).getByTestId('cart-item-product-image')
        ).toHaveAttribute('src', 'images/products/intermediate-composite-basketball.jpg');
 
        expect(
            within(cartItemContainer[1]).getByTestId('cart-item-product-name')
        ).toHaveTextContent('Intermediate Size Basketball');

        expect(
            within(cartItemContainer[1]).getByTestId('cart-item-product-price')
        ).toHaveTextContent('$20.95');

        expect(
            within(cartItemContainer[1]).getByTestId('cart-item-product-quantity')
        ).toHaveTextContent('1');

        let deliveryOptionInputs = within(cartItemContainer[0]).getAllByTestId('delivery-option-input');
        expect(deliveryOptionInputs.length).toBe(3);
        expect(deliveryOptionInputs[0].checked).toBe(true);
        expect(deliveryOptionInputs[1].checked).toBe(false);
        expect(deliveryOptionInputs[2].checked).toBe(false);

        deliveryOptionInputs = within(cartItemContainer[1]).getAllByTestId('delivery-option-input');
        expect(deliveryOptionInputs.length).toBe(3);
        expect(deliveryOptionInputs[0].checked).toBe(false);
        expect(deliveryOptionInputs[1].checked).toBe(true);
        expect(deliveryOptionInputs[2].checked).toBe(false);
     });

     it('Delete a cart item and updates the order summary', async () => {
        render(
            <MemoryRouter>
                <OrderSummary 
                  cart={cart} 
                  deliveryOption={deliveryOptions} 
                  loadCart={loadCart} />
            </MemoryRouter>
        )
        const cartItemContainer = screen.getAllByTestId('cart-item-container');
        expect(cartItemContainer).toHaveLength(2);
        const deleteButtons = within(cartItemContainer[0]).getByTestId('cart-item-delete-button');
        await user.click(deleteButtons);
        expect(axios.delete).toHaveBeenCalledWith('/api/cart-items/e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(loadCart).toHaveBeenCalled();

        const deleteButton2 = within(cartItemContainer[1]).getByTestId('cart-item-delete-button');
        await user.click(deleteButton2);
        expect(axios.delete).toHaveBeenCalledWith('/api/cart-items/15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(loadCart).toHaveBeenCalledTimes(2);
     });

     it('Update the quantity of a cart item and updates the order summary', async () => {
        render(
            <MemoryRouter>
                <OrderSummary 
                  cart={cart} 
                  deliveryOption={deliveryOptions} 
                  loadCart={loadCart} />
            </MemoryRouter>
        )
        const cartItemContainer = screen.getAllByTestId('cart-item-container');
        expect(cartItemContainer).toHaveLength(2);
        const quantityInput = within(cartItemContainer[0]).getByTestId('cart-item-update-quantity-button');
        await user.click(quantityInput);
        const quantityTextBox = within(cartItemContainer[0]).getByTestId('cart-item-product-quantity-input');
        await user.clear(quantityTextBox);
        await user.type(quantityTextBox, '3');
        await user.keyboard('{Enter}');
        expect(axios.put).toHaveBeenCalledWith('/api/cart-items/e43638ce-6aa0-4b85-b27f-e1d07eb678c6', {
            quantity: 3
        })
        expect(loadCart).toHaveBeenCalledTimes(1);

        const quantityInput2 = within(cartItemContainer[1]).getByTestId('cart-item-update-quantity-button');
        await user.click(quantityInput2);
        const quantityTextBox2 = within(cartItemContainer[1]).getByTestId('cart-item-product-quantity-input');
        await user.clear(quantityTextBox2);
        await user.type(quantityTextBox2, '4');
        await user.keyboard('{Enter}');
        expect(axios.put).toHaveBeenCalledWith('/api/cart-items/15b6fc6f-327a-4ec4-896f-486349e85a3d', {
            quantity: 4
        })
        expect(loadCart).toHaveBeenCalledTimes(2);
     })
});