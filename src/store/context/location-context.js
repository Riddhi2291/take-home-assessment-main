import React, { useState, useEffect } from 'react';
import { LOCATIONS } from '../../constants/location';

const LocationContext = React.createContext({
  location:null,
  onLocationChange: (data) => {},
});

export const LocationContextProvider = (props) => {
  const [location, setLocation] = useState(LOCATIONS[0]);

  const onLocationChangeHandler = (data) => {
    setLocation(data)
  };

  return (
    <LocationContext.Provider
      value={{
        location: location,
        onLocationChange: onLocationChangeHandler,
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
