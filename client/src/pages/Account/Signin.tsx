import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, FormControl } from "react-bootstrap";
import { setCurrentUser } from "./reducer";
import * as client from "./client";
import "./Account.css";
import "../../index.css"


export default function Signin() {
 const [credentials, setCredentials] = useState<any>({});
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const signin = async () => {
   const user = await client.signin(credentials);
   if (!user) return;
   dispatch(setCurrentUser(user));
   navigate("/profile");
 };
  return (
    <div className="wd-signin-screen">
      <h1>Sign in</h1>
      <FormControl defaultValue={credentials.username}
             onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
             className="mb-2" placeholder="username" id="wd-username" />
      <br />
      <FormControl defaultValue={credentials.password}
             onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
             className="mb-2" placeholder="password" type="password" id="wd-password" />
      <br />
      <Button onClick={signin} id="wd-signin-btn" className="w-100" > Sign in </Button>
      <Link id="wd-signup-link" to="/signup"> Sign up </Link>
    </div>
  );
}
