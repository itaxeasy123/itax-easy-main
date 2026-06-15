import React from 'react';

import {
  PaymentPageWrapper,
  PaymentForm,
  Title,
  PaymentButton,
} from './checkoutStyles';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const navigate = useNavigate();

  const paymentData = JSON.parse(localStorage.getItem('paymentData'))

  const handlePayment = async () => {
    navigate('/payment-success');
  }
  

  return (
    <PaymentPageWrapper className='py-10'>
      <PaymentForm>
        <Title>Payment Page</Title>
        <div className="flex justify-between bg-yellow-100 p-2 mt-5">
          <h2>Name</h2>
          <h2 className="font-bold">{paymentData.name}</h2>
        </div>
        <div className="flex justify-between bg-yellow-100 p-2 mt-5">
          <h2>Email</h2>
          <h2 className="font-bold">{paymentData.email}</h2>
        </div>
        <div className="flex justify-between bg-yellow-100 p-2 mt-5">
          <h2>Phone</h2>
          <h2 className="font-bold">{paymentData.phone}</h2>
        </div>
        <div className="flex justify-between bg-yellow-100 p-2 mt-5">
          <h2>Total Amount</h2>
          <h2 className="font-bold">{paymentData.amount}</h2>
        </div>
        <div className="flex justify-between bg-yellow-100 p-2 mt-5">
          <h2>Net Total Amount</h2>
          <h2 className="font-bold">{paymentData.amount}</h2>
        </div>
        <PaymentButton onClick={handlePayment} className='mt-2'>Submit Payment</PaymentButton>
      </PaymentForm>
    </PaymentPageWrapper>

  );
}

export default Checkout;
