import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function AccountPage() {
 const { currentUser } = useSelector((state: any) => state.accountReducer);
 const navigate = useNavigate();
 
 useEffect(() => {
   if (!currentUser) {
     navigate("/signin");
   } else {
     navigate("/profile");
   }
 }, [currentUser, navigate]);
 
 return null;
}
