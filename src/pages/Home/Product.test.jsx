import { it, expect, describe, vi, beforeEach} from 'vitest';
import { Product } from './Product';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

vi.mock('axios')
describe('Product component', () => {
    let product;
    let loadCart;
    let user;
        beforeEach(() => {
        product = {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
        rating: {
            stars: 4.5,
            count: 87
        },
        priceCents: 1090,
        keywords: ["socks", "sports", "apparel"]
    };
    loadCart= vi.fn();
    user = userEvent.setup();
    })
    it('It displays the product details correctly', () => {

        render(<Product
            product={product}
            loadCart={loadCart}
        />)
        expect(screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')).toBeInTheDocument();
        expect(screen.getByText('$10.90')).toBeInTheDocument();
        expect(screen.getByTestId('product-image')).toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg');
        expect(screen.getByTestId('product-rating-stars-image')).toHaveAttribute('src', 'images/ratings/rating-45.png');
        expect(screen.getByText('87')).toBeInTheDocument();
    });

    it('Add a product to the cart', async () => {
        render(<Product
            product={product}
            loadCart={loadCart}
        />)
        const addToCartButton = screen.getByTestId('add-to-cart-button');
        await user.click(addToCartButton);
        expect(axios.post).toHaveBeenCalledWith('/api/cart-items', {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1
        })
        expect(loadCart).toHaveBeenCalled();
        expect
    });
    it('Allows the user to select a quantity before adding to cart', async ()=> {
        render(<Product
            product={product}
            loadCart={loadCart}
        />)

        const quantitySelector = screen.getByTestId('quantitySelector');
        await user.selectOptions(quantitySelector, '1');
        expect(quantitySelector).toHaveValue('1');
        await user.selectOptions(quantitySelector, '5');
        expect(quantitySelector).toHaveValue('5');
        await user.selectOptions(quantitySelector, '3');
        expect(quantitySelector).toHaveValue('3');
        const addToCartButton = screen.getByTestId('add-to-cart-button');
        await user.click(addToCartButton);
        expect(axios.post).toHaveBeenCalledWith('/api/cart-items', {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 3
        })
        expect(loadCart).toHaveBeenCalled();
    })
})