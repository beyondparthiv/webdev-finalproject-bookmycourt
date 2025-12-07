import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as client from "./client";
import { useEffect } from "react";
import { setBookings } from "./reducer";
import { setTurfs } from "../../../reducer";
import { Link } from "react-router-dom";

export default function MyBookings() {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { turfs } = useSelector((state: any) => state.turfReducer);
    const { bookings } = useSelector((state: any) => state.bookingsReducer);

    function isBooked(turfId: string, userId: string) {
        const ibooked = bookings.some((booking: any) =>
            booking.user && booking.turf &&
            booking.user._id === userId &&
            booking.turf._id === turfId);
        console.log("isBooked check:", { turfId, userId, ibooked });
        return ibooked;
    }

    function findDateTime(turfId: string, userId: string) {
        const booking = bookings.find((booking: any) =>
            booking.user && booking.turf &&
            booking.user._id === userId &&
            booking.turf._id === turfId);
        return booking ? `${booking.bookingDate} at ${booking.bookingTime}` : "N/A";
    }

    const fetchTurfs = async () => {
        try {
            const turfs = await client.fetchAllTurfs();
            dispatch(setTurfs(turfs));
        } catch (error) {
            console.error("Error fetching turfs:", error);
        }
    }
    const fetchBookings = async () => {
        try {
            if (currentUser?._id) {
                const bookings = await client.fetchAllUserBookings(currentUser._id);
                console.log("Fetched bookings:", bookings);
                dispatch(setBookings(bookings));
            } else {
                console.log("No currentUser._id, skipping fetch");
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    }


    useEffect(() => {
        fetchTurfs();
        fetchBookings();
    }, [currentUser]);


    return (
        <div className="my-bookings">
            <h2>My Bookings</h2>

            <div>
                {turfs.length === 0 ?
                    <h4>No bookings yet</h4>
                    : <div>
                        {turfs.filter((turf: { _id: any }) => isBooked(turf._id, currentUser?._id))
                            .map((turf: { _id: any; name: string; img: string }) => (
                                <Link to={`/turf/${turf._id}`}>
                                    <Col className="bookingName">{turf.name}</Col>
                                    <Col className="bookingDateTime">Booked for: {findDateTime(turf._id, currentUser?._id)}</Col>
                                    <br />
                                </Link>
                            ))}

                    </div>
                }
            </div>

        </div>
    )
}