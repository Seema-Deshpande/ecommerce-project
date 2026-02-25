import './CheckoutHeader.css';
import { Link } from 'react-router';
export default function CheckoutHeader ({ cart }) {
     const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    return (
          <div className="checkout-header" data-testid="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section" data-testid="checkout-header-left-section">
                        <Link to="/">
                            <img className="logo" src="logo.png" />
                            <img className="mobile-logo" src="mobile-logo.png" />
                        </Link>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (<Link className="return-to-home-link"
                            to="/">{totalQuantity} items</Link>)
                    </div>

                    <div className="checkout-header-right-section" data-testid="checkout-header-right-section">
                        <img src="icons/checkout-lock-icon.png" />
                    </div>
                </div>
            </div>
    )
}