import './CheckoutHeader.css';
import { Link } from 'react-router';
export default function CheckoutHeader ({ cart }) {
     const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    return (
          <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <Link to="/">
                            <img className="logo" src="src/assets/images/logo.png" />
                            <img className="mobile-logo" src="src/assets/images/mobile-logo.png" />
                        </Link>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (<Link className="return-to-home-link"
                            to="/">{totalQuantity} items</Link>)
                    </div>

                    <div className="checkout-header-right-section">
                        <img src="src/assets/images/icons/checkout-lock-icon.png" />
                    </div>
                </div>
            </div>
    )
}