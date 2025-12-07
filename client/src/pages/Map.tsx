import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import './Map.css';

interface TurfLocation {
  _id: string;
  name: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  latitude: number;
  longitude: number;
  courts: string[];  // Array of court IDs
}

const Map: React.FC = () => {
  const dispatch = useDispatch();
  const [locations, setLocations] = useState<TurfLocation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("/api/locations");

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers.get('content-type'));

        if (!response.ok) {
          throw new Error(`Error status: ${response.status}`);
        }

        // Check what the response actually contains
        const text = await response.text();
        console.log('Response text:', text);

        // Try to parse it as JSON
        const data = JSON.parse(text);
        console.log('Parsed data:', data);

        dispatch({ type: 'SET_LOCATIONS', payload: data });
        setLocations(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching locations:', error);
        setError('Failed to load locations');
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!locations.length || !mapRef.current) return;

    const initMap = async () => {

      const [{ Map }, { AdvancedMarkerElement }] = await Promise.all([
        google.maps.importLibrary('maps') as Promise<google.maps.MapsLibrary>,
        google.maps.importLibrary('marker') as Promise<google.maps.MarkerLibrary>,
      ]);

      const map = new Map(mapRef.current!, {
        center: { lat: 42.3398, lng: -71.0892 },
        zoom: 13,
        mapId: 'DEMO_MAP_ID',
      });

      // Create info window for a location's turf
      const createInfoWindowContent = (location: TurfLocation, turfs: any[]) => {
        const div = document.createElement('div');
        div.className = 'info-window-content';

        let turfsHTML = '';
        if (turfs && turfs.length > 0) {
          turfsHTML = turfs.map((turf) => `
            <button
              id="court-btn-${turf._id}"
              class="info-window-court-btn"
            >
              <div class="court-btn-info">
                <div class="court-btn-name">${turf.name}</div>
                ${turf.rating ? `<div class="court-btn-rating">⭐ ${turf.rating}</div>` : ''}
              </div>
              <div class="court-btn-price">$${turf.pricePerHour}/hr</div>
            </button>
          `).join('');
        } else {
          turfsHTML = '<p class="no-courts">No courts available at this location</p>';
        }

        div.innerHTML = `
          <div class="info-window-header">
            <h3>${location.name}</h3>
            ${location.city && location.state ? `<p class="info-window-address">${location.city}, ${location.state}</p>` : ''}
<p style="font-size: 14px; color: #888; margin: 0 0 16px 0;">${location.courts.length} court${location.courts.length > 1 ? 's' : ''} available</p>
          </div>
          <div class="info-window-courts">
            <p class="courts-label">Select a court:</p>
            ${turfsHTML}
          </div>
        `;

        return div;
      };

      // Add markers for each location
      locations.forEach(location => {
        const marker = new AdvancedMarkerElement({
          map: map,
          position: { lat: location.latitude, lng: location.longitude },
          title: location.name,
        });

        marker.addListener('click', async () => {
          console.log('Clicked:', location.name);

          // Fetch turf details for all courts at this location
          const turfDetails = await Promise.all(
            location.courts.map(async (courtId) => {

              try {
                const url = `/api/turfs/${courtId}`;
                const response = await fetch(url);

                if (response.ok) {
                  const data = await response.json();
                  return data;
                }
                return null;
              } catch (error) {
                console.error(`Error fetching turf ${courtId}:`, error);
                return null;
              }
            })
          );

          // Filter out any failed requests
          const validTurfs = turfDetails.filter(turf => turf !== null);

          // Create info window content
          const content = createInfoWindowContent(location, validTurfs);

          // Create Window
          const { InfoWindow } = await google.maps.importLibrary('maps') as google.maps.MapsLibrary;
          const infoWindow = new InfoWindow();

          infoWindow.setContent(content);
          infoWindow.open(map, marker);

          setTimeout(() => {
            validTurfs.forEach((turf) => {
              const button = document.getElementById(`court-btn-${turf._id}`);
              if (button) {
                button.addEventListener('click', () => {
                  window.location.href = `/turf/${turf._id}`;
                });
              }
            });
          }, 100);
        });
      });
    };

    initMap();
  }, [locations]);

  if (loading) return <div>Loading map...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div ref={mapRef} style={{ width: '100%', height: '600px' }} />;
};

export default Map;