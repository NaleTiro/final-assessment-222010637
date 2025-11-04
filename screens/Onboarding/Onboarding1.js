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

export default function OnboardingScreen1({ navigation }) {
  const next = () => navigation.navigate("Onboard2");

  const skipOnboarding = async () => {
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
      <TouchableOpacity style={styles.skipButton} onPress={skipOnboarding}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image source={onboardingImages.onboarding1} style={styles.image} />
        </View>

        <Text style={styles.title}>Discover Amazing Hotels</Text>
        <Text style={styles.body}>
          Browse through our curated selection of luxury hotels, compare prices,
          and find the best deals for your perfect stay.
        </Text>

        <View style={styles.progress}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={next}>
          <Text style={styles.buttonText}>Next</Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
