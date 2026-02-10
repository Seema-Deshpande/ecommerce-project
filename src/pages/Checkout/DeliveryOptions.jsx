import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';
export function DeliveryOptions ({ deliveryOption, cartItem }) {
    return (
        <>
            <div className="delivery-options">
                <div className="delivery-options-title">
                    Choose a delivery option:
                </div>
                {deliveryOption.map((deliveryOption) => {
                    let priceString = deliveryOption.priceCents > 0 ?
                        `${formatMoney(deliveryOption.priceCents)} - Shipping` : 'Free Shipping';
                    return (
                        <div className="delivery-option" key={deliveryOption.id}>
                            <input type="radio" checked={deliveryOption.id === cartItem.deliveryOptionId}
                                className="delivery-option-input"
                                name={`delivery-option-${cartItem.productId}`} />
                            <div>
                                <div className="delivery-option-date">
                                    {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                                </div>
                                <div className="delivery-option-price"> {priceString} </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}