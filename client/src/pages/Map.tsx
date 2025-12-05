import React, { useEffect, useRef } from 'react';
import db_locations from '../../../server/Database/locations.js';

const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const locations = db_locations;

  useEffect(() => {
    const initMap = async () => {

      const [{ Map }, { AdvancedMarkerElement }] = await Promise.all([
        google.maps.importLibrary('maps') as Promise<google.maps.MapsLibrary>,
        google.maps.importLibrary('marker') as Promise<google.maps.MarkerLibrary>,
      ]);

      // Create the map
      const map = new Map(mapRef.current!, {
        center: { lat: 42.3398, lng: -71.0892 },
        zoom: 13,
        mapId: 'DEMO_MAP_ID',
      });
 // Add markers for each location
      locations.forEach(location => {
        const marker = new AdvancedMarkerElement({
          map: map,
          position: { lat: location.lat, lng: location.long },
          title: location.name,
        });

        // Clickable on Markers to navigate to booking page
        marker.addListener('click', () => {
          console.log('Clicked:', location.name);
          // TODO: Navigate to booking page for this location
          // You can add routing logic here later
        });
         });

   
    };

    initMap();
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '600px' }} />;
};

export default Map;