// module-43-9
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, watch, errors } = useForm();
    const [shippingData, setShippingData] = useState(null);

    const onSubmit = (data) =>{
      setShippingData(data);
      console.log('form submitted', data)
      };

      const handlePaymentSuccess = (paymentId) => {
      const savedCart = getDatabaseCart();
      const orderDetails = {
          ...loggedInUser, 
          paymentId, 
          products: savedCart, 
          shipment: shippingData, 
          time: new Date() 
        }
        
        fetch('https://pacific-shore-16007.herokuapp.com/addOrder', {
          method:'POST',
          headers: { 'Content-Type' : 'application/json', 'Accept' : 'application/json'},
          body: JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then (data => {
          console.log(data)
          if(data) {
            processOrder();
            alert('Your order has been placed successfully.');
          }
        })  
      }
  
    console.log(watch("example")); // watch input value by passing the name of it
  
    return (
      <div className="container">
        <div className="row">

        <div style={{display: shippingData ? 'none' : 'block'}} className ="col-md-6">
            <form className = "ship-form" onSubmit={handleSubmit(onSubmit)}>
            <input name="example" defaultValue = {loggedInUser.name} ref={register} placeholder="Your Name" />
            <input name="exampleRequired" defaultValue = {loggedInUser.email} ref={register({ required: true })} placeholder="Your E-mail" />
                {errors.exampleRequired && <span style={{color:'red'}}>This field is required</span>}
                
                <input name="address" ref={register({ required: true })}  placeholder="Your Address" />
              {errors.address && <span className="error">Address is required</span>}
            
              <input name="phone" ref={register({ required: true })}  placeholder="Your Phone Number"/>
              {errors.phone && <span className="error">Phone Number is required</span>}
                
            <input type="submit" />
          </form>
          </div>

        <div style = {{display: shippingData ? 'block' : 'none', textAlign: 'center'}} className ="col-md-6">
          <h1>Please pay here</h1>
          <ProcessPayment handlePayment = {handlePaymentSuccess}></ProcessPayment>
        </div>
      </div>
      </div>
    );
};

export default Shipment;