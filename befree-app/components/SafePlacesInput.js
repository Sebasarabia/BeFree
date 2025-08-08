import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function SafePlacesInput(props) {
  // intercepta los resultados y fuerza array vacío si vienen mal
  return (
    <GooglePlacesAutocomplete
      {...props}
      onFail={props.onFail}
      render={(data) => data}              /* evita require cycles */
      // patch interno:
      listViewDisplayed="auto"
      predefinedPlaces={[]}                // evita crash de filter
    />
  );
}
