import React from "react";


const Cart = (props) => {
  // console.log(props.price);
  const cart = props.cart;
  // console.log(cart);
  //   const totalPrice = Cart.reduce(( total,prd) => total+ prd.price,0);
  let total = 0; // reduce a totalPrice used
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    console.log({'price': product.price, 'quantity': product.quantity});
    total = (total + product.price) * product.quantity || 1;
  }

  let shipping = 0;
  if(total > 35){
      shipping = 0;
  }
  else if(total >15){
      shipping = 4.99;
  }
  else if(total > 0){
      shipping = 12.99;
  }

  const tax = (total / 10).toFixed(2);

  const grandTotal = (total + shipping + Number(tax)).toFixed(2);

  const formatNumber = num => {
    const precision = num.toFixed(2);
    return Number(precision);
  }
  return (
    <div>
      <h2>Order Summery</h2>
      <p>Items ordered: {cart.length}</p>
      <p>
        <small>Product Price: {formatNumber(total)}</small>
      </p>
      <p><small>Shipping: {shipping}</small></p>
      <p><small>Tax: {tax}</small></p>
    <p><small>Total Price: {grandTotal}</small></p>


      {/* <p>
        <small>Items:</small>
      </p>
      <p>
        <small>Shipping and Handling:</small>
      </p>
      <p>
        <small>Total before tax:{totalPrice}</small>
      </p>
      <p>
        <small>Estimated Tax:</small>
      </p> */}

      <h2>Order Total</h2>
      {
        props.children
      }
    </div>
  );
};

export default Cart;
