import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const slides = [
  {
    id: 1,
    title: "Watch on any device",
    description: "Stream on your phone, tablet, laptop and TV without playing more",
    image: require("../../assets/images/laptop.png"),
    buttonText: "NEXT",
  },
  {
    id: 2,
    title: "3, 2, 1,... download!",
    description: "Always have something to watch offline.",
    image: require("../../assets/images/laptop.png"),
    buttonText: "HELP",
  },
  {
    id: 3,
    title: "No pesky contracts.",
    description: "Cancel anytime",
    image: require("../../assets/images/laptop.png"),
    buttonText: "HELP",
  },
  {
    id: 4,
    title: "How do I watch?",
    description: "Members that subscribe to Netflix can watch here in the app",
    image: require("../../assets/images/laptop.png"),
    buttonText: "HELP",
  },
];

const Onbording = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>NETFLIX</Text>
      <Image source={slides[currentIndex].image} style={styles.image} />
      <Text style={styles.title}>{slides[currentIndex].title}</Text>
      <Text style={styles.description}>{slides[currentIndex].description}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>{slides[currentIndex].buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    color: "red",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Onbording;
