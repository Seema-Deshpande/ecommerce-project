import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';
import axios from 'axios';
export function DeliveryOptions ({ deliveryOption, cartItem, loadCart }) {
    return (
        <>
            <div className="delivery-options">
                <div className="delivery-options-title">
                    Choose a delivery option:
                </div>
                {deliveryOption.map((deliveryOption) => {
                    let priceString = deliveryOption.priceCents > 0 ?
                        `${formatMoney(deliveryOption.priceCents)} - Shipping` : 'Free Shipping';
                    const updateDeliveryOption = async () => {
                        await axios.put(`/api/cart-items/${cartItem.productId}`, {
                            deliveryOptionId: deliveryOption.id,
                        });
                        await loadCart();
                    }
                    return (
                        <div className="delivery-option" key={deliveryOption.id} onClick={updateDeliveryOption}>
                            <input type="radio" 
                             checked={deliveryOption.id === cartItem.deliveryOptionId}
                             onChange={()=> {}}
                             className="delivery-option-input"
                             name={`delivery-option-${cartItem.productId}`}
                              />
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