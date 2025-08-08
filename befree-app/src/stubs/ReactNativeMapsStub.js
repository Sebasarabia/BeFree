// src/stubs/ReactNativeMapsStub.js
import React from 'react';

/**
 * Stubbed MapView for web:
 * just renders a gray box with a message.
 */
export default function MapView({ style, children }) {
  return (
    <div
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#eee',
        color: '#333',
        fontSize: 14,
      }}
    >
      (Map not available on web)
      {children}
    </div>
  );
}

// Stub out the Heatmap component
export function Heatmap(props) {
  return null;
}

// If you use Marker or PROVIDER_GOOGLE anywhere, stub them too:
export const PROVIDER_GOOGLE = 'google';
export function Marker() {
  return null;
}
