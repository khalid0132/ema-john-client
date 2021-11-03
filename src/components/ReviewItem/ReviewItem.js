import React from 'react';
import './ReviewItem.css'

const ReviewItem = (props) => {
    const {name, category, img, price, quantity,key} = props.product;
    return (
        <div className = "review-item">
            <img src={img} alt=""/>
            <h4>Name: {name}</h4>
            <p>Quantity: {quantity}</p>
            {/* <h4>Category: {category}</h4> */}
            <p>Price: ${price}</p>
            <button 
            className = "button-style" 
            onClick={() => props.removeProduct(key)}
            >Remove</button>
        </div>
    );
};

export default ReviewItem;