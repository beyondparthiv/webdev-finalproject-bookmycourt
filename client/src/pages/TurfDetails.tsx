import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FaArrowLeft,
  FaStar,
  FaHeart,
  FaRegHeart,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import type { TurfDetails as TurfDetailsType, TimeSlot } from '../types/turf.types';
import { getTurfById } from '../data/mockTurfs';
import './TurfDetails.css';
import { bookTurf } from './client';
import { useSelector } from 'react-redux';

const TurfDetails: React.FC = () => {
   const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();


  const [turf, setTurf] = useState<TurfDetailsType | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    fetchTurfDetails();
    generateDates();
  }, [id]);

  const generateDates = () => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
  };

  const fetchTurfDetails = async () => {
    try {
      const response = await fetch(`/api/turfs/${id}`);
      const data = await response.json();
      setTurf(data);
      setIsFavorite(data.isFavorite);
      setTimeSlots(generateTimeSlots(data.pricePerHour));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching turf details:', error);
      loadMockData();
    }
  };

  const loadMockData = () => {
    if (!id) {
      setLoading(false);
      return;
    }

    const foundTurf = getTurfById(id);

    if (foundTurf) {
      setTurf(foundTurf);
      setIsFavorite(foundTurf.isFavorite);
      setTimeSlots(generateTimeSlots(foundTurf.pricePerHour));
    }

    setLoading(false);
  };

  const generateTimeSlots = (basePrice: number): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const startHour = 6;
    const endHour = 22;

    for (let hour = startHour; hour < endHour; hour++) {
      const timeString = `${hour.toString().padStart(2, '0')}:00`;
      const endTimeString = `${(hour + 1).toString().padStart(2, '0')}:00`;

      // Peak hours (6-9 PM) have higher prices
      const isPeakHour = hour >= 18 && hour < 21;
      const price = isPeakHour ? basePrice + 3 : basePrice;

      slots.push({
        id: `slot-${hour}`,
        time: `${timeString} - ${endTimeString}`,
        isAvailable: Math.random() > 0.3,
        price: price,
      });
    }
    return slots;
  };

  const getNextDays = (): { date: string; display: string; day: string }[] => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNum = date.getDate().toString();
      days.push({ date: dateStr, display: dayNum, day: dayName });
    }
    return days;
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    // Regenerate slots for the new date (availability may differ)
    if (turf) {
      setTimeSlots(generateTimeSlots(turf.pricePerHour));
    }
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    if (slot.isAvailable) {
      setSelectedSlot(slot);
    }
  };

  const handleBookNow = () => {
    if (selectedSlot && turf) {
      bookTurf(currentUser?._id, turf.id, selectedDate, selectedSlot.time);
      alert(`✅ Booking confirmed for ${turf.name} on ${selectedDate} (${selectedSlot.time})`);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
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
    <>
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
          <span className="base-price">Starting at ${turf.pricePerHour}/hr</span>
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
              className={`date-item ${selectedDate === day.date ? 'selected' : ''}`}
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
              className={`slot-item ${!slot.isAvailable ? 'unavailable' : ''} ${
                selectedSlot?.id === slot.id ? 'selected' : ''
              }`}
              onClick={() => handleSlotSelect(slot)}
            >
              <span className="slot-time">{slot.time}</span>
              <span className="slot-price">${slot.price}</span>
            </div>
          ))}
        </div>
      </div>

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
          className={`book-now-btn ${!selectedSlot ? 'disabled' : ''}`}
          onClick={handleBookNow}
          disabled={!selectedSlot}
        >
          {selectedSlot
            ? `Book Now - $${selectedSlot.price}`
            : 'Select a Time Slot'}
        </button>
      </div>
    </div>
    </>
  );
};

export default TurfDetails;