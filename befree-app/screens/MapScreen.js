// ---- screens/MapScreen.js ---------------------------------------------
import React, { useContext, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Heatmap } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';
console.log('GOOGLE KEY:', Constants.expoConfig?.extra?.googlePlacesApiKey);

const GOOGLE_KEY =
  Constants.expoConfig?.extra?.googlePlacesApiKey ||
  process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;


import newsReports from '../utils/newsReports';
import { HeatmapSettingsContext } from '../App';

export default function MapScreen() {
  const { opacity } = useContext(HeatmapSettingsContext);
  const mapRef = useRef(null);

  // Genera un gradiente con alfa variable
  const gradient = {
    colors: [
      `rgba(0,255,0,${opacity})`,
      `rgba(255,255,0,${opacity})`,
      `rgba(255,0,0,${opacity})`,
    ],
    startPoints: [0.2, 0.5, 0.9],
    colorMapSize: 256,
  };

  return (
    <View style={styles.container}>
      {/* Barra de búsqueda superior */}
      <GooglePlacesAutocomplete
        placeholder="Buscar ubicación"
        fetchDetails
        minLength={2}
        predefinedPlaces={[]}                 // evita el bug del filter
        onFail={err => console.warn('Places API:', err)}
        onPress={(data, details = null) => {
          if (!details) return;
          const { lat, lng } = details.geometry.location;
          mapRef.current?.animateCamera({
            center: { latitude: lat, longitude: lng },
            zoom: 14,
          });
        }}
        /** ------------- clave del fix ------------- **/
        textInputProps={{
          // aunque no necesites onFocus, entrega un objeto
          // y coloca aquí cualquier ajuste extra del TextInput
          onFocus: () => { },
          returnKeyType: 'search',
          clearButtonMode: 'while-editing',
        }}
        query={{
          key: GOOGLE_KEY,
          language: 'es',
          components: 'country:bo',
        }}
        enablePoweredByContainer={false}
        styles={{
          container: {
            position: 'absolute',
            top: 40,
            width: '90%',
            alignSelf: 'center',
            zIndex: 10,
          },
          listView: { backgroundColor: 'white' },
        }}
      />

      {/* Mapa con heatmap */}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: -17.789, // centro SCZ
          longitude: -63.182,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
      >
        {Array.isArray(newsReports) && newsReports.length > 0 && (
          <Heatmap
            points={newsReports}
            gradient={gradient}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});