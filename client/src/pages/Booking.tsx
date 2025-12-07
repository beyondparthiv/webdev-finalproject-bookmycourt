import React, { useState } from "react";
import "./Booking.css";
import * as client from "./client";

type Slot = { time: string; status: "available" | "booked" };

const Booking: React.FC = () => {
  const [selectedCourt, setSelectedCourt] = useState("Tennis");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const courts = ["Tennis", "Badminton", "Basketball"];
  const courtSlots: Record<string, Slot[]> = {
    Tennis: [
      { time: "6:00 AM - 7:00 AM", status: "available" },
      { time: "7:00 AM - 8:00 AM", status: "booked" },
      { time: "8:00 AM - 9:00 AM", status: "available" },
      { time: "9:00 AM - 10:00 AM", status: "available" },
      { time: "10:00 AM - 11:00 AM", status: "booked" },
      { time: "11:00 AM - 12:00 PM", status: "available" },
      { time: "12:00 PM - 1:00 PM", status: "booked" },
      { time: "1:00 PM - 2:00 PM", status: "available" },
      { time: "2:00 PM - 3:00 PM", status: "available" },
      { time: "3:00 PM - 4:00 PM", status: "booked" },
      { time: "4:00 PM - 5:00 PM", status: "available" },
      { time: "5:00 PM - 6:00 PM", status: "available" },
      { time: "6:00 PM - 7:00 PM", status: "booked" },
      { time: "7:00 PM - 8:00 PM", status: "available" },
      { time: "8:00 PM - 9:00 PM", status: "available" },
      { time: "9:00 PM - 10:00 PM", status: "available" },
      { time: "10:00 PM - 11:00 PM", status: "available" },
      { time: "11:00 PM - 11:59 PM", status: "available" },
    ],
    Badminton: [
      { time: "6:00 AM - 7:00 AM", status: "booked" },
      { time: "7:00 AM - 8:00 AM", status: "available" },
      { time: "8:00 AM - 9:00 AM", status: "available" },
      { time: "9:00 AM - 10:00 AM", status: "available" },
      { time: "10:00 AM - 11:00 AM", status: "available" },
      { time: "11:00 AM - 12:00 PM", status: "booked" },
      { time: "12:00 PM - 1:00 PM", status: "available" },
      { time: "1:00 PM - 2:00 PM", status: "available" },
      { time: "2:00 PM - 3:00 PM", status: "available" },
      { time: "3:00 PM - 4:00 PM", status: "booked" },
      { time: "4:00 PM - 5:00 PM", status: "available" },
      { time: "5:00 PM - 6:00 PM", status: "available" },
      { time: "6:00 PM - 7:00 PM", status: "booked" },
      { time: "7:00 PM - 8:00 PM", status: "available" },
      { time: "8:00 PM - 9:00 PM", status: "available" },
      { time: "9:00 PM - 10:00 PM", status: "available" },
      { time: "10:00 PM - 11:00 PM", status: "available" },
      { time: "11:00 PM - 11:59 PM", status: "available" },
    ],
    Basketball: [
      { time: "6:00 AM - 7:00 AM", status: "available" },
      { time: "7:00 AM - 8:00 AM", status: "available" },
      { time: "8:00 AM - 9:00 AM", status: "booked" },
      { time: "9:00 AM - 10:00 AM", status: "available" },
      { time: "10:00 AM - 11:00 AM", status: "booked" },
      { time: "11:00 AM - 12:00 PM", status: "available" },
      { time: "12:00 PM - 1:00 PM", status: "available" },
      { time: "1:00 PM - 2:00 PM", status: "booked" },
      { time: "2:00 PM - 3:00 PM", status: "available" },
      { time: "3:00 PM - 4:00 PM", status: "available" },
      { time: "4:00 PM - 5:00 PM", status: "booked" },
      { time: "5:00 PM - 6:00 PM", status: "available" },
      { time: "6:00 PM - 7:00 PM", status: "booked" },
      { time: "7:00 PM - 8:00 PM", status: "available" },
      { time: "8:00 PM - 9:00 PM", status: "available" },
      { time: "9:00 PM - 10:00 PM", status: "available" },
      { time: "10:00 PM - 11:00 PM", status: "available" },
      { time: "11:00 PM - 11:59 PM", status: "available" },
    ],
  };

  const slots = courtSlots[selectedCourt];

  const onBook = () => {
    if (!selectedDate || !selectedSlot) {
      alert("Please select both date and slot!");
      return;
    }
    console.log("Booking:", selectedCourt, selectedDate, selectedSlot);
    //bookTurf(selectedCourt, selectedDate, selectedSlot);
    alert(`✅ Booking confirmed for ${selectedCourt} on ${selectedDate} (${selectedSlot})`);
  };

  return (
    <div className="booking-container">
      <h1>Book Your Court 🎾</h1>
      <p>Select court type, date, and available slot below.</p>
      <div className="booking-card">
        <div className="input-group">
          <label>Select Court:</label>
          <div className="court-options">
            {courts.map(court => (
              <button
                key={court}
                className={`court-btn ${selectedCourt === court ? "selected" : ""}`}
                onClick={() => { setSelectedCourt(court); setSelectedSlot(null); }}
              >{court}</button>
            ))}
          </div>
        </div>

        <div className="input-group">
          <label>Select Date:</label>
          <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
        </div>

        <div className="input-group">
          <label>Available Slots:</label>
          <div className="slots">
            {slots.map((slot, i) => (
              <button
                key={i}
                disabled={slot.status === "booked"}
                className={`slot-btn ${slot.status} ${selectedSlot === slot.time ? "selected" : ""}`}
                onClick={() => slot.status === "available" && setSelectedSlot(slot.time)}
              >{slot.time}</button>
            ))}
          </div>
        </div>

        <button className="book-btn" onClick={() => onBook()}>Book Now</button>
      </div>
    </div>
  );
};
export default Booking;
