import "dotenv/config";
import mongoose from "mongoose";
import Turf from "./Turfs/model.js";

const turfsData = [
  {
    _id: "1",
    name: "Green Valley Sports Arena",
    image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800",
    images: [
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800",
    ],
    distance: 1.2,
    rating: 4.5,
    pricePerHour: 12,
    address: "123 Sports Lane, Boston Common Area, MA 02108",
    isFavorite: false,
    description:
      "Premium quality turf with excellent facilities. Perfect for football, soccer, and other sports activities.",
    amenities: ["Floodlights", "Changing Rooms", "Parking", "Drinking Water"],
    openTime: "06:00",
    closeTime: "22:00",
  },
  {
    _id: "2",
    name: "Champions Turf",
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800",
    images: [
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800",
    ],
    distance: 2.5,
    rating: 4.8,
    pricePerHour: 15,
    address: "456 Victory Road, Jamaica Plain, MA 02130",
    isFavorite: true,
    description:
      "State-of-the-art sports facility with FIFA-approved turf. Ideal for professional training.",
    amenities: [
      "Floodlights",
      "Changing Rooms",
      "Parking",
      "Cafeteria",
      "First Aid",
      "Shower",
    ],
    openTime: "05:00",
    closeTime: "23:00",
  },
  {
    _id: "3",
    name: "Elite Sports Complex",
    image: "https://images.unsplash.com/photo-1624880357913-a8539238245b?w=800",
    images: [
      "https://images.unsplash.com/photo-1624880357913-a8539238245b?w=800",
    ],
    distance: 0.8,
    rating: 4.3,
    pricePerHour: 10,
    address: "789 Athletic Ave, Allston, MA 02134",
    isFavorite: false,
    description:
      "Affordable and accessible turf for all skill levels. Great for casual games.",
    amenities: ["Floodlights", "Parking", "Drinking Water"],
    openTime: "07:00",
    closeTime: "21:00",
  },
  {
    _id: "4",
    name: "Victory Ground",
    image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800",
    images: [
      "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800",
    ],
    distance: 3.1,
    rating: 4.6,
    pricePerHour: 13,
    address: "321 Champion Street, Cambridge, MA 02139",
    isFavorite: false,
    description:
      "Spacious turf with multiple playing fields. Host tournaments or enjoy a game.",
    amenities: [
      "Floodlights",
      "Changing Rooms",
      "Parking",
      "Equipment Rental",
      "First Aid",
    ],
    openTime: "06:00",
    closeTime: "22:00",
  },
  {
    _id: "5",
    name: "Premier Turf Arena",
    image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800",
    images: [
      "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800",
    ],
    distance: 1.8,
    rating: 4.7,
    pricePerHour: 14,
    address: "555 Premier Blvd, Huntington Ave, MA 02115",
    isFavorite: false,
    description:
      "Top-rated turf near Northeastern University. Popular among students and professionals.",
    amenities: [
      "Floodlights",
      "Changing Rooms",
      "Parking",
      "Cafeteria",
      "Locker Rooms",
      "Shower",
      "WiFi",
    ],
    openTime: "05:00",
    closeTime: "00:00",
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Turf.deleteMany({});
    console.log("Cleared existing turfs");

    // Insert new data
    await Turf.insertMany(turfsData);
    console.log("Seeded turfs successfully!");

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}

seedDatabase();