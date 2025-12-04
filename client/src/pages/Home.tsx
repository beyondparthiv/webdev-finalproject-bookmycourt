import React, { useState, useEffect } from 'react';
import './Home.css';
import {
  FaMapMarkerAlt,
  FaUser,
  FaStar,
  FaHeart,
  FaRegHeart,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import type { Turf } from '../types/turf.types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Detecting location...');
  const [turfs, setTurfs] = useState<Turf[]>([]);
  const [filteredTurfs, setFilteredTurfs] = useState<Turf[]>([]);
  const [featuredTurfs, setFeaturedTurfs] = useState<Turf[]>([]);

  useEffect(() => {
    detectLocation();
    fetchTurfs();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTurfs(turfs);
    } else {
      const filtered = turfs.filter(
        (turf) =>
          turf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          turf.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTurfs(filtered);
    }
  }, [searchQuery, turfs]);

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation('Your Location');
        },
        (error) => {
          setLocation('Location unavailable');
        }
      );
    } else {
      setLocation('Location not supported');
    }
  };

  const fetchTurfs = async () => {
    try {
      const response = await fetch('/api/turfs/nearby');
      const data = await response.json();
      setTurfs(data);
      setFilteredTurfs(data);
      setFeaturedTurfs(data.slice(0, 4));
    } catch (error) {
      console.error('Error fetching turfs:', error);
      loadMockData();
    }
  };

  const loadMockData = () => {
    const mockTurfs: Turf[] = [
      {
        id: '1',
        name: 'Green Valley Sports Arena',
        image:
          'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=500',
        distance: 1.2,
        rating: 4.5,
        pricePerHour: 12,
        address: 'Boston Common Area',
        isFavorite: false,
      },
      {
        id: '2',
        name: 'Champions Turf',
        image:
          'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=500',
        distance: 2.5,
        rating: 4.8,
        pricePerHour: 15,
        address: 'Jamaica Plain',
        isFavorite: true,
      },
      {
        id: '3',
        name: 'Elite Sports Complex',
        image:
          'https://images.unsplash.com/photo-1624880357913-a8539238245b?w=500',
        distance: 0.8,
        rating: 4.3,
        pricePerHour: 10,
        address: 'Allston',
        isFavorite: false,
      },
      {
        id: '4',
        name: 'Victory Ground',
        image:
          'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=500',
        distance: 3.1,
        rating: 4.6,
        pricePerHour: 13,
        address: 'Cambridge',
        isFavorite: false,
      },
      {
        id: '5',
        name: 'Premier Turf Arena',
        image:
          'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=500',
        distance: 1.8,
        rating: 4.7,
        pricePerHour: 14,
        address: 'Huntington Ave',
        isFavorite: false,
      },
    ];
    setTurfs(mockTurfs);
    setFilteredTurfs(mockTurfs);
    setFeaturedTurfs(mockTurfs.slice(0, 4));
  };

  const handleTurfClick = (turfId: string) => {
    navigate(`/turf/${turfId}`);
  };

  const toggleFavorite = (turfId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTurfs((prevTurfs) =>
      prevTurfs.map((turf) =>
        turf.id === turfId ? { ...turf, isFavorite: !turf.isFavorite } : turf
      )
    );
  };

  const handleProfileClick = () => {
    navigate('/account');
  };

  return (
    <div className="home-container">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="location-section">
          <FaMapMarkerAlt className="location-icon" />
          <span className="location-text">{location}</span>
        </div>
        <div className="profile-icon" onClick={handleProfileClick}>
          <FaUser />
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for Turfs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Featured Turfs Carousel */}
      {featuredTurfs.length > 0 && (
        <div className="featured-section">
          <h2 className="section-title">Featured Turfs</h2>
          <div className="carousel">
            {featuredTurfs.map((turf) => (
              <div
                key={turf.id}
                className="carousel-card"
                onClick={() => handleTurfClick(turf.id)}
              >
                <img
                  src={turf.image}
                  alt={turf.name}
                  className="carousel-image"
                />
                <div className="carousel-overlay">
                  <h3>{turf.name}</h3>
                  <div className="carousel-info">
                    <span className="rating">
                      <FaStar /> {turf.rating}
                    </span>
                    <span className="price">${turf.pricePerHour}/hr</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nearby Turfs List */}
      <div className="turfs-section">
        <h2 className="section-title">Nearby Turfs</h2>
        <div className="turfs-list">
          {filteredTurfs.length > 0 ? (
            filteredTurfs.map((turf) => (
              <div
                key={turf.id}
                className="turf-card"
                onClick={() => handleTurfClick(turf.id)}
              >
                <img
                  src={turf.image}
                  alt={turf.name}
                  className="turf-image"
                />
                <div className="turf-content">
                  <div className="turf-header">
                    <h3 className="turf-name">{turf.name}</h3>
                    <button
                      className="favorite-btn"
                      onClick={(e) => toggleFavorite(turf.id, e)}
                    >
                      {turf.isFavorite ? (
                        <FaHeart className="favorite-icon active" />
                      ) : (
                        <FaRegHeart className="favorite-icon" />
                      )}
                    </button>
                  </div>
                  <p className="turf-address">{turf.address}</p>
                  <div className="turf-details">
                    <span className="distance">
                      <FaMapMarkerAlt /> {turf.distance} km away
                    </span>
                    <span className="rating">
                      <FaStar className="star-icon" /> {turf.rating}
                    </span>
                  </div>
                  <div className="turf-footer">
                    <span className="price">${turf.pricePerHour}/hour</span>
                    <button className="book-btn">Book Now</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No turfs found matching your search</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;