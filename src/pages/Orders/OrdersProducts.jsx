import dayjs from 'dayjs';
import { Fragment } from 'react';
import axios from 'axios';
export function OrderProducts({ order, loadCart }) {
    return (
        <div className="order-details-grid" data-testid="order-details-grid">
            {order.products.map((orderProduct) => {
                const addToCart = async () => {
                    await axios.post('/api/cart-items', {
                        productId: orderProduct.product.id,
                        quantity: 1
                    })
                    await loadCart();
                }
                return (
                    <Fragment key={orderProduct.id}>
                        <div className="product-image-container" data-testid="product-image-container">
                            <img 
                            data-testid="order-product-image"
                            src={orderProduct.product.image} />
                        </div>
                        <div className="product-details" data-testid="product-details">
                            <div className="product-name"
                                data-testid="order-product-name">
                                {orderProduct.product.name}
                            </div>
                            <div className="product-delivery-date"
                                data-testid="order-product-delivery-date">
                                Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                            </div>
                            <div className="product-quantity"
                                data-testid="order-product-quantity">
                                Quantity: {orderProduct.quantity}
                            </div>
                            <button className="buy-again-button button-primary"
                                data-testid="buy-again-button"
                                onClick={addToCart}>
                                <img className="buy-again-icon" src="src/assets/images/icons/buy-again.png" />
                                <span className="buy-again-message">Add to Cart</span>
                            </button>
                        </div>
                        <div className="product-actions">
                            <a data-testid="track-product" href={`/tracking/${order.id}/${orderProduct.product.id}`}>
                                <button className="track-package-button button-secondary">
                                    Track package
                                </button>
                            </a>
                        </div>
                    </Fragment>
                )
            })}
        </div>
    )
}