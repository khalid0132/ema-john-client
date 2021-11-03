// module-43-9
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = (data) =>{
      console.log('form submitted', data)
      const savedCart = getDatabaseCart();
      const orderDetails = {...loggedInUser, products: savedCart, shipment: data, time: new Date() }
        
        fetch('http://localhost:5000/addOrder', {
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
      };
  
    console.log(watch("example")); // watch input value by passing the name of it
  
    return (
      <form className = "ship-form" onSubmit={handleSubmit(onSubmit)}>
        <input name="example" defaultValue = {loggedInUser.name} ref={register} />
        <input name="exampleRequired" defaultValue = {loggedInUser.email} ref={register({ required: true })} />
        {errors.exampleRequired && <span style={{color:'red'}}>This field is required</span>}
        
        <input name="address" ref={register({ required: true })}  placeholder="Your Address" />
      {errors.address && <span className="error">Address is required</span>}
     
      <input name="phone" ref={register({ required: true })}  placeholder="Your Phone Number"/>
      {errors.phone && <span className="error">Phone Number is required</span>}
        
        <input type="submit" />
      </form>
    );
};

export default Shipment;