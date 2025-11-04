import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onboardingImages } from "../../constants/images";
import { onboardingStyles as styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";

export default function OnboardingScreen3({ navigation }) {
  const finish = async () => {
    try {
      await AsyncStorage.setItem("hasOnboarded", "true");
      navigation.replace("Auth");
    } catch (e) {
      console.error("Failed to set onboarded", e);
      navigation.replace("Auth");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image source={onboardingImages.onboarding3} style={styles.image} />
        </View>

        <Text style={styles.title}>Luxury Experience</Text>
        <Text style={styles.body}>
          Immerse yourself in comfort and luxury with our premium hotel
          selection. Enjoy world-class amenities and exceptional service
          throughout your stay.
        </Text>

        <View style={styles.progress}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={finish}>
          <Text style={styles.buttonText}>Get Started</Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
