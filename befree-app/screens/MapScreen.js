// screens/MapScreen.js
import React, { useContext, useRef } from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import MapView, { Heatmap } from 'react-native-maps';
import PlacesMini from '../components/PlacesMini';

import SafePlacesInput from '../components/SafePlacesInput';
import Constants from 'expo-constants';

import { HeatmapSettingsContext } from '../App';
import newsReportsRaw from '../utils/newsReports';

export default function MapScreen() {
  /* ---------- contexto & datos ---------- */
  const { opacity } = useContext(HeatmapSettingsContext);
  const mapRef = useRef(null);
  const points = Array.isArray(newsReportsRaw) ? newsReportsRaw : [];

  /* ---------- gradiente ---------- */
  const gradient = {
    colors: [
      `rgba(0,255,0,${opacity})`,
      `rgba(255,255,0,${opacity})`,
      `rgba(255,0,0,${opacity})`,
    ],
    startPoints: [0.2, 0.5, 0.9],
    colorMapSize: 256,
  };

  /* ---------- helper seguro ---------- */
  const goTo = (lat, lng) => {
    if (!mapRef.current) return;
    if (Platform.OS === 'android') {
      mapRef.current.animateToRegion(
        { latitude: lat, longitude: lng, latitudeDelta: 0.05, longitudeDelta: 0.05 },
        700           // duración NUMÉRICA ⇒ evita sendRequest crash
      );
    } else {
      mapRef.current.animateCamera(
        { center: { latitude: lat, longitude: lng }, zoom: 14 },
        { duration: 700 }
      );
    }
  };

  /* ---------- clave de Places ---------- */
  const GOOGLE_KEY =
    Constants.expoConfig?.extra?.googlePlacesApiKey ||
    process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;

  return (
    <View style={styles.container}>
      {/* -------- barra de búsqueda -------- */}
      {GOOGLE_KEY ? (
        <PlacesMini onSelect={(lat, lng) => goTo(lat, lng)} />

      ) : (
        <Text style={styles.missingKey}>
          Falta googlePlacesApiKey en app.json o .env
        </Text>
      )}

      {/* -------- mapa -------- */}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: -17.789,
          longitude: -63.182,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
      >
        {points.length > 0 && <Heatmap points={points} gradient={gradient} />}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  missingKey: {
    position: 'absolute',
    top: 45,
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 4,
    elevation: 2,
    zIndex: 10,
  },
});
