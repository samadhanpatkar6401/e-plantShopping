import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, generateBill, clearCart } from './CartSlice';
import './CartItem.css';
import Bill from './Bill';

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [showBill, setShowBill] = useState(false);

  // Calculate cart total
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.cost.replace('$', ''));
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  // Quantity handlers
  const handleIncrement = (item) => {
    dispatch(updateQuantity({
      name: item.name,
      quantity: item.quantity + 1
    }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({
        name: item.name,
        quantity: item.quantity - 1
      }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate individual item total
  const calculateItemTotal = (item) => {
    const price = parseFloat(item.cost.replace('$', ''));
    return (price * item.quantity).toFixed(2);
  };

  // Checkout handler
  const handleCheckout = () => {
    if (cartItems.length > 0) {
      dispatch(generateBill());
      dispatch(clearCart());
      setShowBill(true);
    }
  };

  // Show bill if generated
  if (showBill) {
    return <Bill onBackToShopping={onContinueShopping} />;
  }

  // Main cart render
  return (
    <div className="cart-container">
      <h2>Shopping Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)} items)</h2>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button 
            className="continue-shopping-btn"
            onClick={onContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items-list">
            {cartItems.map(item => (
              <div className="cart-item" key={item.name}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="cart-item-image" 
                />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="price">{item.cost}</p>
                  <p className="description">{item.description}</p>
                  
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn dec"
                      onClick={() => handleDecrement(item)}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="quantity-btn inc"
                      onClick={() => handleIncrement(item)}
                    >
                      +
                    </button>
                  </div>
                  
                  <p className="item-total">
                    Item Total: ${calculateItemTotal(item)}
                  </p>
                  
                  <button 
                    className="remove-btn"
                    onClick={() => handleRemove(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h3>Total: ${calculateTotalAmount()}</h3>
            
            <div className="cart-actions">
              <button 
                className="continue-shopping-btn"
                onClick={onContinueShopping}
              >
                Continue Shopping
              </button>
              
              <button 
                className="checkout-btn"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;