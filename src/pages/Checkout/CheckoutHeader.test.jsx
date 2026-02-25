import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import CheckoutHeader from './CheckoutHeader';

vi.mock('axios')
describe('CheckoutHeader Component', () => {
    let cart;
    beforeEach(() => {
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
    })

    it('displays the correct number of items in the cart', () => {
        render(
            <MemoryRouter>
                <CheckoutHeader cart={cart} />
            </MemoryRouter>
        );
        const cartItemCount = screen.getByTestId('checkout-header');
        expect(cartItemCount).toHaveTextContent('Checkout (3 items)');
    });
    it( 'displays the logo and mobile logo with correct src attributes', () => {
        render(<MemoryRouter>
            <CheckoutHeader cart={cart} />
        </MemoryRouter>);
        const logo = screen.getByTestId('checkout-header-left-section').querySelector('img');
        expect(logo).toHaveAttribute('src', 'logo.png');
        expect(screen.getByTestId('checkout-header-left-section').querySelector('.mobile-logo')).toHaveAttribute('src', 'mobile-logo.png');
    });
    it('display the checkout lock icon', () => {
        render(
            <MemoryRouter>
                <CheckoutHeader cart={cart} />
            </MemoryRouter>
        );
        const checkoutLockIcon = screen.getByTestId('checkout-header-right-section');
        expect(checkoutLockIcon.querySelector('img')).toHaveAttribute('src', 'icons/checkout-lock-icon.png');
    });
})