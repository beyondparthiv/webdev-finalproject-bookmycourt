import React, { useEffect, useRef } from 'react';

const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

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

      // Add Dummy marker for Northeastern University
      new AdvancedMarkerElement({
        map: map,
        position: { lat: 42.3398, lng: -71.0892 },
        title: 'Northeastern University',
      });

      // Add Dummy marker for Prudential Center
      new AdvancedMarkerElement({
        map: map,
        position: { lat: 42.3467, lng: -71.0818 },
        title: 'Prudential Center',
      });
    };

    initMap();
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '600px' }} />;
};

export default Map;