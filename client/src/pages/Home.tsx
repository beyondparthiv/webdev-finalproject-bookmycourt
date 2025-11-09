import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Welcome to <span className="highlight">BookMyCourt 🎾</span></h1>
      <p>Book your favorite sports court anytime, anywhere!</p>
      <Link to="/booking"><button className="book-btn">Book Now</button></Link>
    </div>
  );
};
export default Home;
