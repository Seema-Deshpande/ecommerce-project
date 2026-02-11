import dayjs from 'dayjs';
export function DeliveryDate ({ deliveryOption, cartItem }) {
    const selectDeliveryOption = deliveryOption.find((option) => option.id === cartItem.deliveryOptionId);
    return (
        <div className="delivery-date">
            Delivery date: {dayjs(selectDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
        </div>
    )
}