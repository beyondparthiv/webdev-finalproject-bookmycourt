import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signout } = useAuth();

  const handleSignout = async () => {
    await signout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">BookMyCourt</Link>
      </div>
      <ul>
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === "/map" ? "active" : ""}>
          <Link to="/map">Map</Link>
        </li>
        <li className={location.pathname === "/contact" ? "active" : ""}>
          <Link to="/contact">Contact</Link>
        </li>

        {user ? (
          <>
            <li className={location.pathname === "/my-bookings" ? "active" : ""}>
              <Link to="/my-bookings">My Bookings</Link>
            </li>
            <li className={location.pathname === "/profile" ? "active" : ""}>
              <Link to="/profile">
                {user.firstName || user.username}
              </Link>
            </li>
            <li>
              <button className="signout-btn" onClick={handleSignout}>
                Sign Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li className={location.pathname === "/signin" ? "active" : ""}>
              <Link to="/signin">Sign In</Link>
            </li>
            <li className={location.pathname === "/signup" ? "active" : ""}>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;