import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import axios from 'axios';
import { DeliveryOptions } from './DeliveryOptions';
import userEvent from '@testing-library/user-event';

vi.mock('axios')
describe('DeliveryOptions Component', () => {
    let cartItem;
    let deliveryOption;
    let loadCart;
    let user;

    beforeEach(() => {
        cartItem = {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '2',
        };

        deliveryOption = [
            {
                id: "1",
                deliveryDays: 7,
                priceCents: 0,
                createdAt: "2026-02-12T00:17:59.044Z",
                updatedAt: "2026-02-12T00:17:59.044Z",
                estimatedDeliveryTimeMs: 1772236250519
            },
            {
                id: "2",
                deliveryDays: 3,
                priceCents: 499,
                createdAt: "2026-02-12T00:17:59.045Z",
                updatedAt: "2026-02-12T00:17:59.045Z",
                estimatedDeliveryTimeMs: 1771890650519
            },
            {
                id: "3",
                deliveryDays: 1,
                priceCents: 999,
                createdAt: "2026-02-12T00:17:59.046Z",
                updatedAt: "2026-02-12T00:17:59.046Z",
                estimatedDeliveryTimeMs: 1771717850519
            }
        ]

        loadCart = vi.fn();
        user = userEvent.setup();
    });

    it('renders delivery options correctly', () => {
        render(
            <DeliveryOptions
                cartItem={cartItem}
                deliveryOption={deliveryOption}
                loadCart={loadCart}
            />
        );

        expect(screen.getByText('Choose a delivery option:')).toBeInTheDocument();
        const deliveryOptionElements = screen.getAllByTestId('delivery-option');
        expect(deliveryOptionElements).toHaveLength(3);
        expect(deliveryOptionElements[0]).toHaveTextContent('Friday, February 27');
        expect(deliveryOptionElements[0]).toHaveTextContent('Free Shipping');
        expect(
            within(deliveryOptionElements[0]).getByTestId('delivery-option-input').checked
        ).toBe(false);
        expect(deliveryOptionElements[1]).toHaveTextContent('Monday, February 23');
        expect(deliveryOptionElements[1]).toHaveTextContent('$4.99 - Shipping');
        expect(
            within(deliveryOptionElements[1]).getByTestId('delivery-option-input').checked
        ).toBe(true);

        expect(deliveryOptionElements[2]).toHaveTextContent('Saturday, February 21 ');
        expect(deliveryOptionElements[2]).toHaveTextContent('$9.99 - Shipping');
        expect(
            within(deliveryOptionElements[2]).getByTestId('delivery-option-input').checked
        ).toBe(false);
    });
    it('allows the user to select a delivery option', async () => {
        render(
            <DeliveryOptions
                cartItem={cartItem}
                deliveryOption={deliveryOption}
                loadCart={loadCart}
            />
        )
        const deliveryOptionElements = screen.getAllByTestId('delivery-option-input');
        await user.click(deliveryOptionElements[0]);
        expect(axios.put).toHaveBeenCalledWith('/api/cart-items/e43638ce-6aa0-4b85-b27f-e1d07eb678c6', {
            deliveryOptionId: '1'
        })
        expect(loadCart).toHaveBeenCalled(1);
        
        await user.click(deliveryOptionElements[2]);
        expect(axios.put).toHaveBeenCalledWith('/api/cart-items/e43638ce-6aa0-4b85-b27f-e1d07eb678c6', {
            deliveryOptionId: '3'
        })
        expect(loadCart).toHaveBeenCalledTimes(2);
    });
});