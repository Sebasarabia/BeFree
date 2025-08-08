// ---- App.js ------------------------------------------------------------
import React, { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import MapScreen from './screens/MapScreen';
import SettingsScreen from './screens/SettingsScreen';

// Context global para compartir la opacidad del heat-map
export const HeatmapSettingsContext = createContext();

const Tab = createBottomTabNavigator();

export default function App() {
  // El slider controla este estado (min 0.3, max 1)
  const [opacity, setOpacity] = useState(0.6);

  return (
    <HeatmapSettingsContext.Provider value={{ opacity, setOpacity }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              const icon = route.name === 'Mapa' ? 'map' : 'settings';
              return <Ionicons name={icon} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Mapa" component={MapScreen} />
          <Tab.Screen name="Ajustes" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </HeatmapSettingsContext.Provider>
  );
}