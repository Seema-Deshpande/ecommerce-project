import { OrderProducts } from './OrdersProducts';
import { OrderHeader } from './OrderHeader';

export function OrdersGrid({ orders }) {
    return (
        <>
            <div className="orders-grid">
                {orders.map((order) => {
                    return (
                        <div className="order-container" key={order.id}>
                            <OrderHeader order={order} />
                            <OrderProducts order={order} />
                        </div>
                    )
                })}
            </div>
        </>
    )
}