import React, { useState, useEffect, useRef } from 'react';

const typeColors = {
  'Looking for Work': "#EF4444",
  'Teaching Skills': "#EAB308", 
  'Business': "#22C55E"
};

const CommunityMap = ({ users, hoveredUser, selectedUser, onUserSelect, onUserHover }) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const mapInstanceRef = useRef(null);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  // Load HERE Maps scripts
  useEffect(() => {
    const scripts = [
      { src: 'https://js.api.here.com/v3/3.1/mapsjs-core.js' },
      { src: 'https://js.api.here.com/v3/3.1/mapsjs-service.js' },
      { src: 'https://js.api.here.com/v3/3.1/mapsjs-mapevents.js' },
      { src: 'https://js.api.here.com/v3/3.1/mapsjs-ui.js' }
    ];

    let loadedCount = 0;
    const head = document.head;
    
    // Add CSS for HERE Maps UI
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.type = 'text/css';
    linkElement.href = 'https://js.api.here.com/v3/3.1/mapsjs-ui.css';
    head.appendChild(linkElement);

    // Load scripts sequentially
    const loadScript = (index) => {
      if (index >= scripts.length) {
        setScriptsLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = scripts[index].src;
      script.async = false;
      script.defer = false;

      script.onload = () => {
        loadedCount++;
        if (loadedCount === scripts.length) {
          setScriptsLoaded(true);
        } else {
          loadScript(index + 1);
        }
      };

      head.appendChild(script);
    };

    loadScript(0);

    return () => {
      // Cleanup scripts and CSS when component unmounts
      const scripts = document.querySelectorAll('script[src*="api.here.com"]');
      const links = document.querySelectorAll('link[href*="api.here.com"]');
      scripts.forEach(script => script.remove());
      links.forEach(link => link.remove());
    };
  }, []);

  // Initialize map after scripts are loaded
  useEffect(() => {
    if (!scriptsLoaded || !mapRef.current || !window.H) return;

    try {
      const platform = new window.H.service.Platform({
        apikey: 'bFRPes0Fw5k2h1449upxSGSYInt0J2GjEPeJ1D20fSM' // Replace with your API key
      });

      const layers = platform.createDefaultLayers();
      
      const map = new window.H.Map(
        mapRef.current,
        layers.vector.normal.map,
        {
          zoom: 11,
          center: { lat: 28.6139, lng: 77.2090 } // Delhi coordinates
        }
      );

      // Enable map interaction
      const behavior = new window.H.mapevents.Behavior(
        new window.H.mapevents.MapEvents(map)
      );
      
      // Add UI controls
      const ui = window.H.ui.UI.createDefault(map, layers);

      mapInstanceRef.current = map;

      return () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.dispose();
        }
      };
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, [scriptsLoaded]);

  // Update markers when users change
  useEffect(() => {
    if (!mapInstanceRef.current || !window.H) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current.removeObject(marker);
    });
    markersRef.current = [];

    // Add new markers
    users.forEach(user => {
      const { lat, lng } = user.coordinates;
      
      const markerElement = document.createElement('div');
      markerElement.style.backgroundColor = typeColors[user.category];
      markerElement.style.width = '16px';
      markerElement.style.height = '16px';
      markerElement.style.borderRadius = '50%';
      markerElement.style.border = '2px solid white';
      markerElement.style.cursor = 'pointer';
      markerElement.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
      
      const marker = new window.H.map.DomMarker(
        { lat, lng },
        {
          element: markerElement
        }
      );

      marker.addEventListener('pointerenter', () => onUserHover(user));
      marker.addEventListener('pointerleave', () => onUserHover(null));
      marker.addEventListener('tap', () => onUserSelect(user));

      mapInstanceRef.current.addObject(marker);
      markersRef.current.push(marker);
    });
  }, [users, onUserHover, onUserSelect]);

  return (
    <div className="relative w-full h-full">
      <div 
        ref={mapRef} 
        className="w-full h-full"
        style={{ minHeight: '600px' }}
      />
    </div>
  );
};

export default CommunityMap;