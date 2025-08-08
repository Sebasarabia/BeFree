// components/MapViewWeb.js
import React from 'react';

export default function MapViewWeb({ style, children }) {
  return (
    <div
      style={{
        ...(style || {}),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#eee',
        color: '#333',
      }}
    >
      Map not supported on web
    </div>
  );
}

export function HeatmapWeb() {
  return null;
}
