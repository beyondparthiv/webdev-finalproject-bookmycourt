import * as client from "./client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormControl, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signup = async () => {
    const currentUser = await client.signup(user);
    dispatch(setCurrentUser(currentUser));
    navigate("/profile");
  };

  return (
    <div className="wd-signup-screen">
      <h1>Sign up</h1>
      <FormControl value={user.username}
        onChange={(e) => setUser({
          ...user,
          username: e.target.value
        })}
        placeholder="username"
        className="mb-2"
      />
      <FormControl value={user.password}
        type="password"
        onChange={(e) => setUser({
          ...user,
          password: e.target.value
        })}
        placeholder="password"
        className="mb-2"
      />
      <Button className="w-100" onClick={signup}>Sign up</Button>
      <br />
      <Link to="/signin">Sign in</Link>
    </div>
  );
}