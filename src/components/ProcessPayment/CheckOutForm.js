import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const CheckOutForm = ({handlePayment}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  const handleSubmit = async (event) => {
  
    event.preventDefault();

    if (!stripe || !elements) {
   
      return;
    }

  
    const cardElement = elements.getElement(CardElement);

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setPaymentError(error.message);
      setPaymentSuccess(null);
      console.log(error)
    } else {
     setPaymentSuccess(paymentMethod.id)
     setPaymentError(null) 

     handlePayment(paymentMethod.id);
     console.log('[paymentMethod]', paymentMethod)
    }
  };

  return (
   <div style={{border: '2px solid blue', margin: '20px', padding: '80px 15px'}}>
        <form onSubmit={handleSubmit}>
      <CardElement />
      <button className="mt-5 btn-success p-2 rounded" type="submit" disabled={!stripe}>
        Payment by Stripe 
      </button>
    </form>
    {
        paymentError && <p style ={{color: 'red'}}>{paymentError}</p>
    }
    {
        paymentSuccess && <p style = {{color: 'green'}}> Your Payment is SuccessFull</p>
    }
   </div>
  );
};

export default CheckOutForm;