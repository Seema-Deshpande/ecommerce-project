import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { MemoryRouter } from 'react-router';
import { userEvent } from '@testing-library/user-event';

vi.mock('axios');

describe("Header Component", () => {
    let cart, user;
    beforeEach(() => {
        cart = [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
        }, {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 3,
            deliveryOptionId: '2'
        }];
        user = userEvent.setup();
    })
    it('display header correctly', async()=> {
        render(
            <MemoryRouter>
                <Header cart={cart}></Header>
            </MemoryRouter>
        )
        const headerLogo = screen.getByTestId('header-logo')
        expect(headerLogo).toHaveAttribute('src', 'logo-white.png')
        const mobileHeadeLogo = screen.getByTestId('header-mobile-logo')
        expect(mobileHeadeLogo).toHaveAttribute('src','mobile-logo-white.png')
        const searchBar  = screen.getByTestId('search-bar')
        await user.click(searchBar);
         await user.clear(searchBar);
        const searchButton = screen.getByTestId('search-button')
        await user.click(searchButton);
        await user.type(searchBar, 'laptop')
        expect(searchBar).toHaveValue('laptop')

        const ordersLink = screen.getByTestId('header-order-link');
        expect(ordersLink).toHaveTextContent('Orders');

        const cartLink = screen.getByTestId('header-cart-link');
        expect(cartLink).toHaveTextContent('Cart');
        expect(cartLink).toHaveTextContent('5');

    })
})