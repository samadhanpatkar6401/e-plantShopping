import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';
import CartItem from './CartItem';

const plantsArray = [
  {
    category: "Indoor Plants",
    plants: [
      { 
        name: "Snake Plant", 
        image: "https://images.unsplash.com/photo-1593483316242-efb5420596ca", 
        cost: "$20", 
        description: "Low maintenance air purifier" 
      },
      { 
        name: "Fiddle Leaf Fig", 
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411", 
        cost: "$35", 
        description: "Popular decorative plant" 
      },
    ]
  },
  {
    category: "Outdoor Plants",
    plants: [
      { 
        name: "Rose Bush", 
        image: "https://images.unsplash.com/photo-1597826368522-9f4cb5a6ba48", 
        cost: "$25", 
        description: "Beautiful flowering shrub" 
      },
      { 
        name: "Lavender", 
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946", 
        cost: "$18", 
        description: "Fragrant and drought-tolerant" 
      },
    ]
  }
];

const styleObj = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '0 20px'
};

const styleObjUl = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '1100px'
};

const styleA = {
  color: 'white',
  fontSize: '30px',
  textDecoration: 'none'
};

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  
  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(!showCart);
  };

  const handleContinueShopping = () => {
    setShowCart(false);
  };

  return (
    <div>
      <div className="navbar" style={styleObj}>
        <div className="tag">
          <a href="#" onClick={onHomeClick} className="tag_home_link">
            <h3>Paradise Nursery</h3>
          </a>
        </div>
        <div style={styleObjUl}>
          <div><a href="#" onClick={handlePlantsClick} style={styleA}>Plants</a></div>
          <div className="cart-icon-container">
            <a href="#" onClick={handleCartClick} style={styleA}>
              <h1 className='cart'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="68" width="68">
                  <path fill="currentColor" d="M96 216a16 16 0 1 1-16-16a16 16 0 0 1 16 16Zm88-16a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm47-44a8 8 0 0 1 0 16H47a24 24 0 0 1-23.3-30l26.8-94A16 16 0 0 1 66 40h116a16 16 0 0 1 15.5 19.9L210.1 150a24.2 24.2 0 0 1-5 17.3A24 24 0 0 1 184 180Z"/>
                </svg>
                {calculateTotalQuantity() > 0 && (
                  <span className="cart-badge">{calculateTotalQuantity()}</span>
                )}
              </h1>
            </a>
          </div>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index}>
              <h1 className="category-title">{category.category}</h1>
              <div className="product-list">
                {category.plants.map((plant, plantIndex) => {
                  const isInCart = cartItems.some(item => item.name === plant.name);
                  return (
                    <div className="product-card" key={plantIndex}>
                      <img src={plant.image} alt={plant.name} className="product-image" />
                      <h3 className="product-title">{plant.name}</h3>
                      <p className="product-description">{plant.description}</p>
                      <p className="product-price">{plant.cost}</p>
                      <button
                        className={`product-button ${isInCart ? 'added' : ''}`}
                        onClick={() => handleAddToCart(plant)}
                        disabled={isInCart}
                      >
                        {isInCart ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;