import { DeliveryOptions } from './DeliveryOptions';
import { CartItemDetails } from './CartItemDetails';
import { DeliveryDate } from './DeliveryDate';
export function OrderSummary ({ cart, deliveryOption, loadCart }) {
    return (
        <>
        <div className="order-summary">
    {deliveryOption.length > 0 && cart.map((cartItem) => {
        return (
            <div className="cart-item-container" key={cartItem.productId}>
                <DeliveryDate deliveryOption={deliveryOption} cartItem={cartItem} />
                <div className="cart-item-details-grid">
                <CartItemDetails cartItem={cartItem} loadCart={loadCart} />
                <DeliveryOptions deliveryOption={deliveryOption} cartItem={cartItem} loadCart={loadCart} />
                </div>
            </div>
        )
    })}
</div>
</>
)
}