import Map from './components/Map';
import { useEffect, useState } from 'react';

const App = () => {
  const [latLng, setLatLng] = useState({});

  // Change function to an async function
  const getLocation = () => {
    if (!navigator.geolocation) {
      // Implement error / backup function when location not available
      console.log('Location not available');
    } else {
      navigator.geolocation.getCurrentPosition(
        position => setLatLng({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
        () => {
          // Implement error / backup function when location not available
          console.log('Error with trying to find location');
        }
      );
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      <Map location={latLng} />
    </>
  );
};

export default App;
