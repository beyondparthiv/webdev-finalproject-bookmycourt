import * as client from "../client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../reducer";
import { Button, FormControl } from "react-bootstrap";
import "../Account.css";
import "../../../index.css";
import OwnerBookings from "./OwnerBookings";
import MyBookings from "./MyBookings/MyBookings";
import Users from "./Users";

export default function Profile() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useSelector((state: any) => state.account);

  const fetchProfile = () => {
    if (!currentUser) {
      navigate("/signin");
      return;
    }
    setProfile(currentUser);
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/signin");
  };

  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };

  useEffect(() => {
    fetchProfile();
  }, [currentUser, navigate]);

  return (
    <div className="wd-profile-screen">
      <h1>Profile</h1>
      {profile && (
        <div className="profile-container">
          <div className="profile-form">
            <FormControl
              id="wd-username"
              className="mb-2"
              placeholder="username"
              value={profile.username || ""}
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
            />
            <FormControl
              id="wd-password"
              className="mb-2"
              placeholder="password"
              value={profile.password || ""}
              onChange={(e) =>
                setProfile({ ...profile, password: e.target.value })
              }
            />
            <FormControl
              id="wd-firstname"
              className="mb-2"
              placeholder="first name"
              value={profile.firstName || ""}
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
            />
            <FormControl
              id="wd-lastname"
              className="mb-2"
              placeholder="last name"
              value={profile.lastName || ""}
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
            />
            <FormControl
              id="wd-dob"
              className="mb-2"
              type="date"
              value={profile.dob || ""}
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            />
            <FormControl
              id="wd-email"
              className="mb-2"
              placeholder="email"
              value={profile.email || ""}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
            <select
              className="form-control mb-2"
              id="wd-role"
              value={profile.role || "CUSTOMER"}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            >
              <option value="CUSTOMER">Customer</option>
              <option value="COURTOWNER">Court Owner</option>
              <option value="ADMIN">Admin</option>
            </select>
            <div className="profile-buttons">
              <Button onClick={updateProfile} className="btn-primary">
                Update
              </Button>
              <Button onClick={signout} className="btn-danger" id="wd-signout-btn">
                Sign out
              </Button>
            </div>
          </div>

          {currentUser && currentUser.role === "COURTOWNER" && (
            <div className="mt-4">
              <OwnerBookings />
            </div>
          )}
          {currentUser && currentUser.role === "CUSTOMER" && (
            <div className="mt-4">
              <h3>My Bookings</h3>
              <MyBookings />
            </div>
          )}
          {currentUser && currentUser.role === "ADMIN" && (
            <div className="mt-4">
              <Users />
            </div>
          )}
        </div>
      )}
    </div>
  );
}