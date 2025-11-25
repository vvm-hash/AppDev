import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface AstronomyData {
  date: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination_percentage: string;
  location: {
    city: string;
    state_prov: string;
    country_name: string;
  };
}

export default function App() {
  const [data, setData] = useState<AstronomyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const LAT = 15.4909; // Panaji latitude
  const LON = 73.8278; // Panaji longitude
  const API_KEY = 'c5c09b69bd2b418792220280699b6254'; // get from https://ipgeolocation.io

  useEffect(() => {
    const fetchAstronomy = async () => {
      try {
        const response = await fetch(
          `https://api.ipgeolocation.io/astronomy?apiKey=${API_KEY}&lat=${LAT}&long=${LON}`
        );
        if (!response.ok) throw new Error('Failed to fetch data');
        const json = await response.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAstronomy();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#7c3aed" />
        <Text style={styles.text}>Fetching Moon Data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={[styles.text, { color: 'red' }]}>
          Error: {error}
        </Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>No data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌙 Moon & Sun Info</Text>
      <Text style={styles.subtitle}>
        {data.location.city}, {data.location.state_prov}, {data.location.country_name}
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>📅 Date:</Text>
        <Text style={styles.value}>{data.date}</Text>

        <Text style={styles.label}>🌔 Moon Phase:</Text>
        <Text style={styles.value}>{data.moon_phase}</Text>

        <Text style={styles.label}>💡 Illumination:</Text>
        <Text style={styles.value}>{data.moon_illumination_percentage}%</Text>

        <Text style={styles.label}>🌅 Sunrise:</Text>
        <Text style={styles.value}>{data.sunrise}</Text>

        <Text style={styles.label}>🌇 Sunset:</Text>
        <Text style={styles.value}>{data.sunset}</Text>

        <Text style={styles.label}>🌙 Moonrise:</Text>
        <Text style={styles.value}>{data.moonrise}</Text>

        <Text style={styles.label}>🌘 Moonset:</Text>
        <Text style={styles.value}>{data.moonset}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#a5b4fc',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    width: '100%',
  },
  label: {
    color: '#a5b4fc',
    fontSize: 15,
    marginTop: 10,
  },
  value: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  text: {
    color: '#fff',
  },
});
