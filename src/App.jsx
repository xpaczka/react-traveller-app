// import { useEffect, useState } from 'react';

import Map from './components/Map';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => {
  // const [latLng, setLatLng] = useState({});

  // TODO -> Change function to an async function
  // const getLocation = () => {
  //   if (!navigator.geolocation) {
  //     // TODO -> Implement error / backup function when location not available
  //     console.log('Location not available');
  //   } else {
  //     navigator.geolocation.getCurrentPosition(
  //       position => setLatLng({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
  //       () => {
  //         // TODO -> Implement error / backup function when location not available
  //         console.log('Error with trying to find location');
  //       }
  //     );
  //   }
  // };

  // useEffect(() => {
  //   getLocation();
  // }, []);

  return (
    <>
      {/* <Map location={latLng} /> */}
      <Map />
      <Dashboard />
    </>
  );
};

export default App;
