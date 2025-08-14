import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'products', or 'bill'

  return (
    <div className="app-container">
      {currentView === 'landing' ? (
        <div className="landing-page">
          <div className="background-image"></div>
          <div className="content">
            <div className="landing_content">
              <h1>Welcome To Paradise Nursery</h1>
              <div className="divider"></div>
              <p>Where Green Meets Serenity</p>
              <button 
                className="get-started-button" 
                onClick={() => setCurrentView('products')}
              >
                Get Started
              </button>
            </div>
            <div className="aboutus_container">
              <AboutUs />
            </div>
          </div>
        </div>
      ) : currentView === 'products' ? (
        <ProductList 
          onHomeClick={() => setCurrentView('landing')} 
        />
      ) : (
        <Bill onBackToShopping={() => setCurrentView('products')} />
      )}
    </div>
  );
}

export default App;