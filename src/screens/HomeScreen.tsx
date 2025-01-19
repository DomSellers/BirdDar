import React, { useEffect, useState, useContext, createContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

// Create a Theme Context
const ThemeContext = createContext({ backgroundColor: '#f5f5f5', textColor: '#000' });

function Greeting() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Set a dynamic greeting based on the time of day
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  return <Text style={styles.title}>{greeting}, Welcome to BirdDar</Text>;
}

function ActionButton({ title, onPress }) {
  return <Button title={title} onPress={onPress} />;
}

export default function HomeScreen() {
  const theme = useContext(ThemeContext);

  return (
    <ThemeContext.Provider value={{ backgroundColor: '#f5f5f5', textColor: '#000' }}>
      <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <Greeting />
        <ActionButton title="Identify a Bird" onPress={() => {}} />
        <ActionButton title="View Map" onPress={() => {}} />
        <ActionButton title="Your Spottings" onPress={() => {}} />
      </View>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});