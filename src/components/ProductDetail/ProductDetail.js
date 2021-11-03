import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import fakeData from '../../fakeData';
import Product from '../Product/Product';
import './ProductDetail.css';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch('https://pacific-shore-16007.herokuapp.com/product/'+ productKey)
        .then(res => res.json())
        .then(data => {
            setProduct(data)
        })
    }, [productKey])

    // const product = fakeData.find(pd => pd.key === productKey);
    console.log(product)
    return (
        <div className="product-detail">
            {/* <h1>{productKey} Product detail</h1> */}
            <h1 style={{textAlign:'center'}}>Your Product Details:</h1>
            <Product showAddToCart = {false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;