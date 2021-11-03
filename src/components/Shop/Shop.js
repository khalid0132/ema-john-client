import React, { useEffect, useState } from "react";
import "../../fakeData";
// import fakeData from "../../fakeData";
import { addToDatabaseCart, getDatabaseCart } from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import { Link } from "react-router-dom";

const Shop = () => {
  // console.log(fakeData);
  // const first10 = fakeData.slice(0, 10);
  // console.log(first10);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/products')
    .then(res => res.json())
    .then(data => {
      setProducts(data)
    })
  }, [])

  document.title ="ema-john/shop"

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    console.log(products, productKeys);

    fetch('http://localhost:5000/productsByKeys', {
                method: 'POST',
                headers: {
                    'Content-type':'application/json',
                    'Accept': 'application/json'},
                body: JSON.stringify(productKeys),
            })
            .then(res => res.json())
            .then(data => {setCart(data)})

    // if(products.length > 0) {
    //   const previousCart = productKeys.map( existingKey => {
    //     const product = products.find(pd => pd.key === existingKey);
    //     product.quantity = savedCart[existingKey];
    //     // console.log(existingKey, savedCart[existingKey])
    //     return product;
    //   })
    //   setCart(previousCart);
    // }
    // console.log(previousCart)
  }, [products])

  const handleAddProduct =(product) =>{
      // console.log('product added', product);
     const toBeAdded = product.key;
      const sameProduct = cart.find(pd => pd.key === toBeAdded);
     let count = 1;
     let newCart;
      if (sameProduct){
        count = sameProduct.quantity + 1;
        sameProduct.quantity = count;
        const others = cart.filter(pd => pd.key !== toBeAdded)
        newCart = [...others, sameProduct];
      }
      else{
        product.quantity = 1;
        newCart = [...cart, product]
      }
      // const count = sameProduct.length;
      // const newCart = [...cart, product]; // Inside an array otherwise const newCart = cart+1
      setCart(newCart);
      addToDatabaseCart(product.key, count);
  }
  return (
    <div className="twin-container">
      {/* <h1>Shopping here</h1>
      <h3> Number of Products:{products.length}</h3> */}
     
      <div className="product-container">

      {/* Material UI spinner added bellow: <CircularProgress /> */}
      {
        products.length === 0 && <p>LOADING...</p>
      }
          {/* {products.map(pd => <img src= {pd.img}></img>)} */}
          {products.map((pd) => (<Product 
                                    showAddToCart = {true}
                                    handleAddProduct={handleAddProduct} 
                                    product = {pd} key = {pd.key}
                                    > </Product>))}
    
      </div>
      <div className="cart-container">
          <Cart cart={cart}>
          <Link to="/Review"><button className = "button-style">Review your order</button></Link>
          </Cart>
        {/* <h1>This is cart</h1>
        <h5>Items ordered: {cart.length}</h5> */}
      </div>
    </div>
  );
};

export default Shop;
