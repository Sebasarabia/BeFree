// ---- screens/SettingsScreen.js ----------------------------------------
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { HeatmapSettingsContext } from '../App';

export default function SettingsScreen() {
  const { opacity, setOpacity } = useContext(HeatmapSettingsContext);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Transparencia puntos: {Math.round(opacity * 100)}%
      </Text>
      <Slider
        style={{ width: '90%', height: 40 }}
        minimumValue={0.3}
        maximumValue={1}
        step={0.01}
        value={opacity}
        onValueChange={setOpacity}
        minimumTrackTintColor="#2196F3"
        maximumTrackTintColor="#000000"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  label: { marginBottom: 12, fontSize: 16, fontWeight: '500' },
});
