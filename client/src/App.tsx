import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import { Contact } from "./pages/Contact/Contact";
import Account from "./pages/Account/Account";
import Map from "./pages/Map";
import "./index.css";
import Signin from "./pages/Account/Signin";
import Signup from "./pages/Account/Signup";
import Profile from "./pages/Account/Profile/Profile";
import TurfDetails from './pages/TurfDetails';
import MyBookings from "./pages/Account/Profile/MyBookings/MyBookings";
import Users from "./pages/Account/Profile/Users";
import OwnerBookings from "./pages/Account/Profile/OwnerBookings";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/account" element={<Account />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/map" element={<Map />} />
        <Route path="/turf/:id" element={<TurfDetails />} />
      </Routes>
    </Router>
  );
}
export default App;
