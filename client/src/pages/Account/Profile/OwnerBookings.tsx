import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
export default function OwnerBookings() {
    const navigate = useNavigate();
    return (
        <div className="my-bookings">
            <h1>
                <IoChevronBack onClick={() => navigate('/profile')} />
                Owner Bookings</h1>
        </div>
    )
}