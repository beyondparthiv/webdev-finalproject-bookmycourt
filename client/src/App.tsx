import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
import { checkSession } from "./pages/Account/reducer";
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
import TurfDetails from "./pages/TurfDetails";
import MyBookings from "./pages/Account/Profile/MyBookings/MyBookings";
import Users from "./pages/Account/Profile/Users";
import OwnerBookings from "./pages/Account/Profile/OwnerBookings";

// Inner component to handle session check
function AppContent() {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { loading } = useSelector((state: any) => state.account);

  // Check session on app mount
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(checkSession() as any);
  }, [dispatch]);

  // Show loading spinner while checking session
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          fontSize: "1.5rem",
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/account" element={<Account />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/map" element={<Map />} />
        <Route path="/turf/:id" element={<TurfDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/users" element={<Users />} />
        <Route path="/owner-bookings" element={<OwnerBookings />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;