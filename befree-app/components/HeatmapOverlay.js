// components/HeatmapOverlay.js
import React from 'react';
import { Heatmap } from 'react-native-maps';

/**
 * points: Array of { latitude, longitude, weight }
 */
export default function HeatmapOverlay({ points }) {
  if (!points?.length) return null;
  return (
    <Heatmap
      points={points}
      radius={25}
      opacity={0.7}
      // green→yellow→red gradient
      gradient={{
        colors: ['green', 'yellow', 'red'],
        startPoints: [0.1, 0.3, 0.6],
        colorMapSize: 256,
      }}
    />
  );
}
