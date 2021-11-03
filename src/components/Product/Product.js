import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import "./Product.css";
import { Link } from "react-router-dom";

const Product = (props) => {
  // console.log(props);
  const {img, name, seller, price, stock, key} = props.product;
//   console.log(props.product.name);
  //   const {img, name, seller, price} = props.product;
  // we can write <h4>By: {seller}</h4> instead of <h4>seller: {props.product.seller}</h4>
  return (
    <div className="product-style">
      <div className="product-photo">
        <img src={img} alt="product"></img>
      </div>
      <div className="product-history">
        <h4 style={{ color: "blue" }}><Link to={"/product/"+ key} >{name}</Link></h4>
        <p>
          <small>by: {seller}</small>
        </p>

        <p>${price}</p>
        {/* <br/> */}
        <p>only {stock} left in stock- order soon</p>

     {props.showAddToCart === true && <button className="button-style" onClick={()=>props.handleAddProduct(props.product)}>
            <FontAwesomeIcon icon={faShoppingCart} />
            <span>add to cart</span>
            </button>}
      </div>
    </div>
  )
}

export default Product;
