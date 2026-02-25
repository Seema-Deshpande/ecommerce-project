import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within} from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import OrdersPage  from './OrdersPage';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

vi.mock('axios')

describe("Order Page Component", ()=> {
    let cart, orders, loadCart;

    beforeEach (() => {
    cart = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }];

    orders = [{
      id: "27cba69d-4c3d-4098-b42d-ac7fa62b7664",
      orderTimeMs: 1723456800000,
      totalCostCents: 3506,
      products: [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        estimatedDeliveryTimeMs: 1723716000000,
        product: {
          id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          image: "images/products/athletic-cotton-socks-6-pairs.jpg",
          name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
          rating: {
            stars: 4.5,
            count: 87
          },
          priceCents: 1090
        }
      }, {
        productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        quantity: 2,
        estimatedDeliveryTimeMs: 1723456800000,
        product: {
          id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
          image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
          name: "Adults Plain Cotton T-Shirt - 2 Pack",
          rating: {
            stars: 4.5,
            count: 56
          },
          priceCents: 799
        }
      }]
    }, {
      id: "b6b6c212-d30e-4d4a-805d-90b52ce6b37d",
      orderTimeMs: 1718013600000,
      totalCostCents: 4190,
      products: [{
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 2,
        estimatedDeliveryTimeMs: 1718618400000,
        product: {
          id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          image: "images/products/intermediate-composite-basketball.jpg",
          name: "Intermediate Size Basketball",
          rating: {
            stars: 4,
            count: 127
          },
          priceCents: 2095
        }
      }]
    }];
    loadCart = vi.fn();

    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === '/api/orders?expand=products') {
        return { data: orders };
      }
    });
    });

    it('renders the order details correctly', async() => {
        render(
            <MemoryRouter>
                <OrdersPage  cart={cart} loadCart={loadCart} />
            </MemoryRouter>
        );
       expect(screen.getByText('Your Orders')).toBeInTheDocument();
       const orderContainers = await screen.findAllByTestId('orders-page');
       expect(orderContainers.length).toBe(1);
       const orderHeaders = await screen.findAllByTestId('order-header');
       expect(orderHeaders.length).toBe(2);
       expect(within(orderHeaders[0]).getByTestId('order-date')).toHaveTextContent('August 12');
       expect(within(orderHeaders[0]).getByTestId('order-total')).toHaveTextContent('$35.06');
       expect(within(orderHeaders[0]).getByTestId('order-id')).toHaveTextContent('27cba69d-4c3d-4098-b42d-ac7fa62b7664');
       expect(within(orderHeaders[1]).getByTestId('order-date')).toHaveTextContent('June 10');
       expect(within(orderHeaders[1]).getByTestId('order-total')).toHaveTextContent('$41.90');
       expect(within(orderHeaders[1]).getByTestId('order-id')).toHaveTextContent('b6b6c212-d30e-4d4a-805d-90b52ce6b37d');
       const orderDetailsGrids = await screen.findAllByTestId('product-image-container');
       expect(orderDetailsGrids.length).toBe(3);
       expect(within(orderDetailsGrids[0]).getByTestId('order-product-image')).toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg');
       expect(within(orderDetailsGrids[1]).getByTestId('order-product-image')).toHaveAttribute('src', 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg');
       expect(within(orderDetailsGrids[2]).getByTestId('order-product-image')).toHaveAttribute('src', 'images/products/intermediate-composite-basketball.jpg');
       const productDetails = await screen.findAllByTestId('product-details');
         expect(productDetails.length).toBe(3);
         expect(within(productDetails[0]).getByTestId('order-product-name')).toHaveTextContent('Black and Gray Athletic Cotton Socks - 6 Pairs');
         expect(within(productDetails[0]).getByTestId('order-product-delivery-date')).toHaveTextContent('Arriving on: August 15');
         expect(within(productDetails[0]).getByTestId('order-product-quantity')).toHaveTextContent('1');
         expect(within(productDetails[1]).getByTestId('order-product-name')).toHaveTextContent('Adults Plain Cotton T-Shirt - 2 Pack');
         expect(within(productDetails[1]).getByTestId('order-product-delivery-date')).toHaveTextContent('Arriving on: August 12');
         expect(within(productDetails[1]).getByTestId('order-product-quantity')).toHaveTextContent('2');
         expect(within(productDetails[2]).getByTestId('order-product-name')).toHaveTextContent('Intermediate Size Basketball');
         expect(within(productDetails[2]).getByTestId('order-product-delivery-date')).toHaveTextContent('Arriving on: June 17');
         expect(within(productDetails[2]).getByTestId('order-product-quantity')).toHaveTextContent('2');
    });
    it('Add to cart button works correctly', async () => {
            function Location () {
                const location = useLocation();
                return(
                    <div data-testid="urlPath">{location.pathname}</div>
                )
             }
            render(
                <MemoryRouter>
                    <OrdersPage  cart={cart} loadCart={loadCart} />
                    <Location />
                </MemoryRouter>
             )
             const addToCartButtons = await screen.findAllByTestId('buy-again-button');
                expect(addToCartButtons.length).toBe(3);
                await userEvent.click(addToCartButtons[0]);
                expect(axios.post).toHaveBeenCalledWith('/api/cart-items', {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 1
                })
                expect(loadCart).toHaveBeenCalled();
    })
    it('Redirect to tracking page as per product id', async() => {
       function Location () {
                const location = useLocation();
                return(
                    <div data-testid="urlPath">{location.pathname}</div>
                )
             }
             render(
                <MemoryRouter>
                    <OrdersPage cart={cart} loadCart={loadCart}/>
                    <Location />
                </MemoryRouter>
             )

            const trackProduct = await screen.findAllByTestId('track-product')
            expect(trackProduct.length).toBe(3);
    })
})