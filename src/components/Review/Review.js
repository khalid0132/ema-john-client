import React, { useEffect, useState } from 'react';
// import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {
    document.title = "ema-john/review";
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();

    const handleProceedCheckOut = () =>{
        history.push('/shipment');
    }

    const removeProduct = (productKey) =>{
        // console.log('remove clickeddddd', productKey)
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    
    useEffect(()=>{
        //cart
            const savedCart= getDatabaseCart();
            //  console.log(savedCart);
            const productKeys = Object.keys(savedCart);
            // console.log(productKeys)
            fetch('https://pacific-shore-16007.herokuapp.com/productsByKeys', {
                method: 'POST',
                headers: {
                    'Content-type':'application/json',
                    'Accept': 'application/json'},
                body: JSON.stringify(productKeys),
            })
            .then(res => res.json())
            .then(data => {setCart(data)})
        }, [])
            // const cartProducts = productKeys.map(key => {
            //     const product = fakeData.find(pd => pd.key === key);
            //     product.quantity = savedCart[key];
            //     return product;
            // }, []);
                // console.log(cartProducts)
                // setCart(cartProducts);
      
    let thankyou;
    if(orderPlaced){
        thankyou = <img src={happyImage} alt =""/>
    }
    
    return (
        <div className="twin-container">
            <div className = "product-container">
            {/* <h3>Order View: {cart.length}</h3> */}
            {
                cart.map(pd => <ReviewItem product = {pd}
                     key={pd.key}
                     removeProduct = {removeProduct}
                ></ReviewItem> )
            }
            {thankyou}
            
        </div>
        <div className="cart-container">
        <Cart cart={cart}></Cart>
        <button className="button-style" onClick = {handleProceedCheckOut}>Proceed Check Out</button>
        </div>
     </div>
    );
};

export default Review;