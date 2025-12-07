import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const location = useLocation();
  return (
    <nav className="navbar">
      <div className="logo">BookMyCourt</div>
      <ul>
        <li className={location.pathname === "/" ? "active" : ""}><Link to="/">Home</Link></li>
        <li className={location.pathname === "/map" ? "active" : ""}><Link to="/map">Map</Link></li>
        <li className={location.pathname === "/contact" ? "active" : ""}><Link to="/contact">Contact</Link></li>
        <li className={location.pathname === "/booking" ? "active" : ""}><Link to="/booking">Booking</Link></li>
        <li className={location.pathname === "/account" ? "active" : ""}><Link to="/account">Account</Link></li>
      </ul>
    </nav>
  );
};
export default Navbar;
