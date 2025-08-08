import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const GOOGLE_KEY =
  Constants.expoConfig?.extra?.googlePlacesApiKey ||
  process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;

export default function PlacesMini({ onSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const search = async (txt) => {
    setQuery(txt);
    if (txt.length < 2) return setResults([]);

    try {
      const url =
        `https://maps.googleapis.com/maps/api/place/autocomplete/json` +
        `?key=${GOOGLE_KEY}&input=${encodeURIComponent(txt)}&language=es&components=country:bo`;
      const r = await fetch(url);
      const j = await r.json();
      setResults(Array.isArray(j.predictions) ? j.predictions : []);
    } catch (e) {
      console.warn('PlacesMini error:', e);
      setResults([]);
    }
  };

  const styles = StyleSheet.create({
    box: {
      position: 'absolute',
      top: 40,
      alignSelf: 'center',
      width: '90%',
      zIndex: 10,
    },
    input: {
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 6,
      elevation: 2,
    },
    item: {
      padding: 10,
      backgroundColor: '#fafafa',
      borderBottomWidth: 1,
      borderColor: '#eee',
    },
  });

  return (
    <View style={styles.box}>
      <TextInput
        style={styles.input}
        placeholder="Buscar ubicación"
        value={query}
        onChangeText={search}
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={async () => {
              // obtener lat/lng con otro endpoint
              const detUrl =
                `https://maps.googleapis.com/maps/api/place/details/json` +
                `?key=${GOOGLE_KEY}&place_id=${item.place_id}`;
              const d = await (await fetch(detUrl)).json();
              const loc = d.result?.geometry?.location;
              if (loc) onSelect(loc.lat, loc.lng);
              setQuery('');
              setResults([]);
            }}
          >
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
