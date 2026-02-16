import { formatMoney } from '../../utils/money.js';
import axios from 'axios';
import { useState } from 'react';

export function CartItemDetails({ cartItem, loadCart }) {
    const [isUpdating, setUpdatedText] = useState(false);
    const [quantity, setQuantity] = useState(cartItem.quantity);
    const deleteCartItem = async () => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`);
        await loadCart();
    }
    const updateCartItem = async () => {
        if (isUpdating) {
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
                quantity,
            });
            await loadCart();
            setUpdatedText(false);
        } else {
            setUpdatedText(true);
        }
    }
    const updateQuantity = (e) => {
        setQuantity(Number(e.target.value));
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            updateCartItem();
        }
        if (e.key === 'Escape') {
            setQuantity(cartItem.quantity);
            setUpdatedText(false);
        }
    }
    return (
        <>
            <img className="product-image"
                src={cartItem.product.image} />

            <div className="cart-item-details">
                <div className="product-name">
                    {cartItem.product.name}
                </div>
                <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                    <span>
                        Quantity: {isUpdating ?
                            <input
                                type='text'
                                className='quantity-textbox'
                                value={quantity}
                                onChange={updateQuantity}
                                onKeyDown={handleKeyDown}
                            /> :
                            <span className="quantity-label">{cartItem.quantity}</span>}
                    </span>
                    <span className="update-quantity-link link-primary" onClick={updateCartItem}>
                        Update
                    </span>
                    <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
                        Delete
                    </span>
                </div>
            </div>
        </>
    )
}