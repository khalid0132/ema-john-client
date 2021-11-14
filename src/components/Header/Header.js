import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

import logo from "../../images/logo.png";
import "./Header.css";
const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  // const handleSignOut = () => {
  //   console.log('logged out')
  // }
  // const handleSignIn = () => {
  //   console.log('logged in')
  // }
  return (
    <div className="header">
      {/* <h1>I am header</h1> */}
      <img src={logo} alt="" />
      <nav>
        <Link to="/Shop">Shop</Link>
        <Link to="/Review">Order Review</Link>
        <Link to="/Inventory">Manage Inventory</Link>
        {/* {
        
         loggedInUser.email ? <button onClick={handleSignOut} className="btn btn-danger">Sign Out</button> : <button onClick={handleSignIn} className="btn btn-success">Sign In with Google</button>
        
        } */}
          {
         loggedInUser.email ?  <Link to="/Login">Logout</Link> : <Link to="/Login">Login</Link>
        }
      {/* <button onClick= {()=> setLoggedInUser({})}>Sign In</button> */}
      </nav>
    </div>
  );
};

export default Header;
