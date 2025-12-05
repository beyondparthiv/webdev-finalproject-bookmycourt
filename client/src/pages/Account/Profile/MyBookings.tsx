import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
export default function MyBookings() {
    const navigate = useNavigate();
    return (
        <div className="my-bookings">
            <h1>
                <IoChevronBack onClick={() => navigate('/profile')} />
                My Bookings</h1>


        </div>
    )
}