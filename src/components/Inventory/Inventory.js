import React from 'react';
import {Button} from 'react-bootstrap'
import fakeData from '../../fakeData';

const Inventory = () => {
    document.tile="ema-john/inventory";
    const handleAddProduct = () => {
        const products = {}
        fetch('http://localhost:5000/addProduct', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(fakeData)
        })
    }

    return (
        <div style={{textAlign: 'center', border: '2px solid gray', margin: '10px', padding: '10px'}}>
            <form action="">
                <p><span>Name: </span><input type="text" /></p>
                <p><span>Price: </span><input type="text" /></p>
                <p><span>Quantity: </span><input type="text" /></p>
                <p><span>Upload image</span><input type="file" /></p>
                <Button onClick= {handleAddProduct} variant="success">Add Product</Button>

            </form>
        </div>
    );
};

export default Inventory;