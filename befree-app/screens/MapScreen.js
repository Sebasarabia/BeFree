// screens/MapScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import HeatmapOverlay from '../components/HeatmapOverlay';
import { newsReports } from '../utils/newsReports';

// Dynamic imports:
const isWeb = Platform.OS === 'web';
const MapView = isWeb
  ? require('../components/MapViewWeb').default
  : require('react-native-maps').default;
const PROVIDER_GOOGLE = isWeb
  ? undefined
  : require('react-native-maps').PROVIDER_GOOGLE;
// HeatmapOverlay wraps react-native-maps’ Heatmap, so on web it'll render nothing.

export default function MapScreen() {
  const [region] = useState({
    latitude: -17.7833,
    longitude: -63.1821,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const mapped = newsReports.map(r => ({
      latitude: r.latitude,
      longitude: r.longitude,
      weight: r.severity,
    }));
    setPoints(mapped);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
      >
        {!isWeb && <HeatmapOverlay points={points} />}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
