import * as client from "../client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "../reducer";
import { Button, FormControl } from "react-bootstrap";
import "../Account.css";
import "../../../index.css"
import OwnerBookings from "./OwnerBookings";
import MyBookings from "./MyBookings/MyBookings";
import Users from "./Users";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

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
        <div>
          <FormControl id="wd-username" className="mb-2"
            placeholder="username"
            defaultValue={profile.username}
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
          />
          <br />
          <FormControl id="wd-password" className="mb-2"
            placeholder="password"
            defaultValue={profile.password}
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
          />
          <br />
          <FormControl id="wd-firstname" className="mb-2"
            placeholder="first name"
            defaultValue={profile.firstName}
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
          />
          <br />
          <FormControl id="wd-lastname" className="mb-2"
            placeholder="last name"
            defaultValue={profile.lastName}
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
          <br />
          <FormControl id="wd-dob" className="mb-2" type="date"
            defaultValue={profile.dob}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })} />
          <br />
          <FormControl id="wd-email" className="mb-2"
            placeholder="email"
            defaultValue={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
          <br />
          <select className="form-control mb-2" id="wd-role"
            value={profile.role}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })} >
            <option value="COURTOWNER">Court Owner</option>
            <option value="CUSTOMER">Customer</option>
            <option value="ADMIN">Admin</option>
          </select>
          <br />
          <Button onClick={updateProfile} className="w-100 mb-2">Update</Button>
          <Button onClick={signout} className="w-100 mb-2 btn-danger" id="wd-signout-btn">
            Sign out
          </Button>
          <br />
          {currentUser && currentUser.role === "COURTOWNER" && (
            <OwnerBookings />
          )}
          {currentUser && currentUser.role === "CUSTOMER" && (
            <MyBookings />
          )}
          {currentUser && currentUser.role === "ADMIN" && (
            <Users />
          )} 

        </div>
      )}
    </div>
  );
}
