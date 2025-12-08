import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaArrowLeft,
  FaStar,
  FaHeart,
  FaRegHeart,
  FaMapMarkerAlt,
} from "react-icons/fa";
import type {
  TurfDetails as TurfDetailsType,
  TimeSlot,
} from "../types/turf.types";
import { turfService, bookingService } from "../services/api";
import { getTurfById } from "../data/mockTurfs";
import "./TurfDetails.css";

const TurfDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useSelector((state: any) => state.account);

  const [turf, setTurf] = useState<TurfDetailsType | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
    fetchTurfDetails();
  }, [id]);

  useEffect(() => {
    if (turf && selectedDate) {
      fetchBookedSlots();
    }
  }, [selectedDate, turf]);

  const fetchTurfDetails = async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      const data = await turfService.getById(id);
      setTurf(data);
      setIsFavorite(data.isFavorite);
    } catch (err) {
      console.error("Error fetching turf details:", err);
      loadMockData();
    } finally {
      setLoading(false);
    }
  };

  const fetchBookedSlots = async () => {
    if (!id || !selectedDate) return;

    try {
      const slots = await turfService.getBookedSlots(id, selectedDate);
      setBookedSlots(slots);
      if (turf) {
        generateTimeSlots(turf.pricePerHour, slots);
      }
    } catch (err) {
      console.error("Error fetching booked slots:", err);
      // Generate slots without booked info
      if (turf) {
        generateTimeSlots(turf.pricePerHour, []);
      }
    }
  };

  const loadMockData = () => {
    if (!id) return;

    const foundTurf = getTurfById(id);
    if (foundTurf) {
      setTurf(foundTurf);
      setIsFavorite(foundTurf.isFavorite);
      generateTimeSlots(foundTurf.pricePerHour, []);
    }
  };

  const generateTimeSlots = (
    basePrice: number,
    bookedTimes: string[]
  ): void => {
    const slots: TimeSlot[] = [];
    const startHour = 6;
    const endHour = 22;

    for (let hour = startHour; hour < endHour; hour++) {
      const timeString = `${hour.toString().padStart(2, "0")}:00`;
      const endTimeString = `${(hour + 1).toString().padStart(2, "0")}:00`;

      // Peak hours (6-9 PM) have higher prices
      const isPeakHour = hour >= 18 && hour < 21;
      const price = isPeakHour ? basePrice + 3 : basePrice;

      // Check if this slot is booked
      const isBooked = bookedTimes.includes(timeString);

      slots.push({
        id: `slot-${hour}`,
        time: `${timeString} - ${endTimeString}`,
        isAvailable: !isBooked,
        price: price,
      });
    }

    setTimeSlots(slots);
  };

  const getNextDays = (): { date: string; display: string; day: string }[] => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split("T")[0];
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      const dayNum = date.getDate().toString();
      days.push({ date: dateStr, display: dayNum, day: dayName });
    }
    return days;
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    if (slot.isAvailable) {
      setSelectedSlot(slot);
    }
  };

  const handleBookNow = async () => {
    if (!selectedSlot || !turf || !id) return;

    // Check if user is logged in
    if (!currentUser) {
      navigate("/signin", {
        state: { from: `/turf/${id}` },
      });
      return;
    }

    setBooking(true);
    setError(null);

    try {
      const bookingTime = selectedSlot.time.split(" - ")[0];

      await bookingService.create(id, {
        bookingDate: selectedDate,
        bookingTime: bookingTime,
        duration: 1,
        totalPrice: selectedSlot.price,
      });

      // Navigate to confirmation or my bookings
      navigate("/my-bookings", {
        state: {
          success: true,
          message: `Successfully booked ${turf.name} for ${selectedDate} at ${selectedSlot.time}`,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Booking error:", err);
      setError(err.message || "Failed to book. Please try again.");
    } finally {
      setBooking(false);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Save to backend/user preferences
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="turf-details-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!turf) {
    return (
      <div className="turf-details-container">
        <div className="error">Turf not found</div>
      </div>
    );
  }

  return (
    <div className="turf-details-container">
      {/* Header Image */}
      <div className="turf-image-header">
        <img src={turf.image} alt={turf.name} className="turf-main-image" />
        <div className="image-overlay">
          <button className="back-btn" onClick={handleBack}>
            <FaArrowLeft />
          </button>
          <button className="favorite-btn-header" onClick={toggleFavorite}>
            {isFavorite ? (
              <FaHeart className="heart-icon active" />
            ) : (
              <FaRegHeart className="heart-icon" />
            )}
          </button>
        </div>
      </div>

      {/* Turf Info */}
      <div className="turf-info-section">
        <div className="turf-title-row">
          <h1 className="turf-title">{turf.name}</h1>
          <div className="turf-rating">
            <FaStar className="star-icon" />
            <span>{turf.rating}</span>
          </div>
        </div>

        <div className="turf-address-row">
          <FaMapMarkerAlt className="address-icon" />
          <span>{turf.address}</span>
        </div>

        <div className="turf-distance-price">
          <span className="distance-info">{turf.distance} km away</span>
          <span className="base-price">
            Starting at ${turf.pricePerHour}/hr
          </span>
        </div>

        {turf.description && (
          <p className="turf-description">{turf.description}</p>
        )}

        {turf.amenities && turf.amenities.length > 0 && (
          <div className="amenities-section">
            <h3>Amenities</h3>
            <div className="amenities-list">
              {turf.amenities.map((amenity, index) => (
                <span key={index} className="amenity-tag">
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Date Selection */}
      <div className="date-section">
        <h3>Select Date</h3>
        <div className="date-picker">
          {getNextDays().map((day) => (
            <div
              key={day.date}
              className={`date-item ${selectedDate === day.date ? "selected" : ""}`}
              onClick={() => handleDateSelect(day.date)}
            >
              <span className="day-name">{day.day}</span>
              <span className="day-number">{day.display}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Time Slots */}
      <div className="slots-section">
        <h3>Available Time Slots</h3>
        <div className="slots-grid">
          {timeSlots.map((slot) => (
            <div
              key={slot.id}
              className={`slot-item ${!slot.isAvailable ? "unavailable" : ""} ${
                selectedSlot?.id === slot.id ? "selected" : ""
              }`}
              onClick={() => handleSlotSelect(slot)}
            >
              <span className="slot-time">{slot.time}</span>
              <span className="slot-price">${slot.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* Pricing Summary */}
      {selectedSlot && (
        <div className="pricing-summary">
          <div className="summary-row">
            <span>Turf</span>
            <span>{turf.name}</span>
          </div>
          <div className="summary-row">
            <span>Selected Slot</span>
            <span>{selectedSlot.time}</span>
          </div>
          <div className="summary-row">
            <span>Date</span>
            <span>{new Date(selectedDate).toLocaleDateString()}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${selectedSlot.price}</span>
          </div>
        </div>
      )}

      {/* Book Now Button */}
      <div className="book-section">
        <button
          className={`book-now-btn ${!selectedSlot || booking ? "disabled" : ""}`}
          onClick={handleBookNow}
          disabled={!selectedSlot || booking}
        >
          {booking
            ? "Booking..."
            : selectedSlot
              ? `Book Now - $${selectedSlot.price}`
              : "Select a Time Slot"}
        </button>
        {!currentUser && selectedSlot && (
          <p className="login-hint">You'll need to sign in to complete booking</p>
        )}
      </div>
    </div>
  );
};

export default TurfDetails;