import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

import logo from "../../images/logo.png";
import "./Header.css";
const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    <div className="header">
      {/* <h1>I am header</h1> */}
      <img src={logo} alt="" />
      <nav>
        <Link to="/Shop">Shop</Link>
        <Link to="/Review">Order Review</Link>
        <Link to="/Inventory">Manage Inventory</Link>
      <button onClick= {()=> setLoggedInUser({})}>Sign out</button>
      </nav>
      <div className = "search-input">
          <span><input placeholder= "type here to search" type="text"/ ></span>
      </div>
    </div>
  );
};

export default Header;
