import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { ProductGrid } from './ProductsGrid';

vi.mock('axios');

describe('Product Grid Component', () => {
    let products;
    let loadCart;

    beforeEach(() => {
        products = [{
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
        }];

        loadCart = vi.fn();
    });

    it('renders the products', async()=> {
        render(
            <ProductGrid
              products={products}
              loadCart={loadCart}
              />
        )
        const productGrid = await screen.findAllByTestId('product-grid')
        expect(productGrid.length).toBe(1)
        const productContainer = await screen.findAllByTestId('product-container')
        expect(productContainer.length).toBe(2)
        expect(
            within(productContainer[0]).getByTestId('product-image')
            ).toHaveAttribute('src','images/products/athletic-cotton-socks-6-pairs.jpg')
        expect(
            within(productContainer[0]).getByTestId('product-rating-stars-image')
            ).toHaveAttribute('src','images/ratings/rating-45.png')
        expect(
            within(productContainer[1]).getByTestId('product-image')
        ).toHaveAttribute('src','images/products/intermediate-composite-basketball.jpg')
        expect(
            within(productContainer[1]).getByTestId('product-rating-stars-image')
        ).toHaveAttribute('src','images/ratings/rating-40.png')
    })

})