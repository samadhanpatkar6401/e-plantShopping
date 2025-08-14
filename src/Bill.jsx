import React from 'react';
import { useSelector } from 'react-redux';
import './Bill.css';

const Bill = ({ onBackToShopping }) => {
  const bill = useSelector(state => state.cart.currentBill);

  if (!bill) return <div>No bill generated</div>;

  return (
    <div className="bill-container">
      <h2>Paradise Nursery</h2>
      <p>Invoice Date: {bill.date}</p>
      <hr />
      
      <table className="bill-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {bill.items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>${item.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="bill-totals">
        <div className="bill-row">
          <span>Subtotal:</span>
          <span>${bill.subtotal.toFixed(2)}</span>
        </div>
        <div className="bill-row">
          <span>Tax (10%):</span>
          <span>${bill.tax.toFixed(2)}</span>
        </div>
        <div className="bill-row total">
          <span>Total:</span>
          <span>${bill.total.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="thank-you">
        <p>Thank you for your purchase!</p>
        <p>Your plants will be delivered within 3-5 business days.</p>
      </div>
      
      <button 
        className="print-button"
        onClick={() => window.print()}
      >
        Print Bill
      </button>
      
      <button 
        className="back-button"
        onClick={onBackToShopping}
      >
        Back to Shopping
      </button>
    </div>
  );
};

export default Bill;