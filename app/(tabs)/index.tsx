import React, { useEffect, useState } from "react";
import { Image, StyleSheet, FlatList, View, Text } from "react-native";
import Papa from "papaparse";

// Map of bird images
const birdImages: Record<string, any> = {
  "northern-cardinal": require("../../assets/images/northern-cardinal.png"),
  "default": require("../../assets/images/default-bird.png"),
};

const BirdSpotter = () => {
  const [birds, setBirds] = useState([]);

  useEffect(() => {
    loadBirdData();
  }, []);

  const loadBirdData = async () => {
    try {
      const response = await fetch("http://localhost:8081/assets/data/birds.csv"); // Update with your server's path to the CSV file
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const csvText = await response.text();
      const parsedData = Papa.parse(csvText, { header: true }).data;

      const formattedData = parsedData.map((bird, index) => ({
        id: index.toString(),
        name: bird.name?.trim() || "Unknown Bird",
        scientific_name: bird.scientific_name?.trim() || "Scientific name not available",
        image: birdImages[bird.image_url?.trim()] || birdImages["default"], // Use the map for images
      }));

      setBirds(formattedData);
    } catch (error) {
      console.error("Error loading bird data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bird Spotter</Text>
      <FlatList
        data={birds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.birdContainer}>
            <Image source={item.image} style={styles.birdImage} />
            <View>
              <Text style={styles.birdName}>{item.name}</Text>
              <Text style={styles.birdScientific}>{item.scientific_name}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f7f7f7",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  birdContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  birdImage: {
    width: 50,
    height: 50,
    marginRight: 16,
    borderRadius: 25,
  },
  birdName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  birdScientific: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#666",
  },
});

export default BirdSpotter;