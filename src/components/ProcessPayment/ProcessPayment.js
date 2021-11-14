import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckOutForm from './CheckOutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51IhKyVCvdh73TlL5Y5XOmngfJFPHjYyQ6WkbYXVczDjkd0Ha9FZGaoHuG7esZaXOje3UXowFDEI6B9r3UUWoE1ou00enAiLwBv');

const ProcessPayment = ({handlePayment}) => {
    // const options = {
    //     // passing the client secret obtained from the server
    //     clientSecret: '{{CLIENT_SECRET}}',
    // }; options={options}
    
    return (
    <Elements stripe={stripePromise} >
        <CheckOutForm handlePayment = {handlePayment} />
    </Elements>
    );
};

export default ProcessPayment;