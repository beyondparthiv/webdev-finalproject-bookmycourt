import { CardBody, CardText, CardTitle, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function MyBookings() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { courts } = useSelector((state: any) => state.courtReducer);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { bookings } = useSelector((state: any) => state.bookingsReducer);

    function isBooked(courtId: string, userId: string) {
        return bookings.some((booking: { user: string; court: string }) =>
            booking.user === userId &&
            booking.court === courtId)
    }

    function getBookingTime(courtId: string, userId: string) {
        return Date.now();
    }
    return (
        <div className="my-bookings">
            <h2>My Bookings</h2>

            <Row xs={1} md={5} className="g-4">
                {courts
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .filter((court: { _id: any }) => isBooked(court._id, currentUser?._id))
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .map((court: { _id: any; name: string; }) => (
                        <Col className="wd-dashboard-booking">
                            <CardBody className="card-body">
                                <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                    {court.name} </CardTitle>
                                <CardText>{getBookingTime(court._id, currentUser?._id)}</CardText>
                            </CardBody>
                        </Col>
                    ))
                }
            </Row>

        </div>
    )
}