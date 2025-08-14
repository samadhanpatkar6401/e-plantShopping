import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h2 className="about-us-heading">About Us</h2>
      <p className="about-us-description">
        Your trusted source for quality plants since 2010
      </p>
      <div className="about-us-content">
        <p>
          At Paradise Nursery, we're passionate about bringing nature into your home and garden.
          Our team of horticulturists carefully selects each plant to ensure you receive the
          healthiest specimens available.
        </p>
        <p>
          We believe in sustainable practices and source our plants from ethical growers who
          share our commitment to environmental responsibility.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;