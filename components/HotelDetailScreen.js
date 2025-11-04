import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import AddReviewModal from "../components/AddReviewModal";
import ReviewCard from "../components/ReviewCard";
import axios from "axios";
import { WEATHER_API_KEY } from "../utils/constants";

export default function HotelDetailsScreen({ route, navigation }) {
  const { hotel } = route.params;
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([
    {
      id: "r1",
      name: "Alice",
      rating: 5,
      text: "Great place!",
      createdAt: Date.now() - 100000,
    },
    {
      id: "r2",
      name: "Bob",
      rating: 4,
      text: "Nice stay",
      createdAt: Date.now() - 200000,
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${hotel.location}&units=metric&appid=${WEATHER_API_KEY}`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchWeather();
  }, [hotel.location]);

  const openBooking = () => {
    if (!user) return navigation.navigate("Auth");
    navigation.navigate("Booking", { hotel });
  };

  const addReview = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{hotel.name}</Text>
      <Text style={styles.meta}>{hotel.location}</Text>
      <Text style={styles.price}>${hotel.price} / night</Text>

      {/* Weather Information */}
      <View style={styles.weatherContainer}>
        {weatherLoading ? (
          <ActivityIndicator size="small" color={theme.colors.primary} />
        ) : weather ? (
          <>
            <Text style={styles.weatherTitle}>Current Weather</Text>
            <Text style={styles.weatherText}>
              {Math.round(weather.main.temp)}°C - {weather.weather[0].main}
            </Text>
            <Text style={styles.weatherDetail}>
              Humidity: {weather.main.humidity}% | Wind:{" "}
              {Math.round(weather.wind.speed)} m/s
            </Text>
          </>
        ) : null}
      </View>

      <View style={{ marginVertical: 12 }}>
        <Button
          title={user ? "Book Now" : "Sign in to book"}
          onPress={openBooking}
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={styles.sectionTitle}>Reviews</Text>
        {reviews.length === 0 ? (
          <Text>No reviews yet</Text>
        ) : (
          reviews.map((r) => <ReviewCard key={r.id} review={r} />)
        )}
        <View style={{ marginTop: 8 }}>
          <Button title="Add Review" onPress={() => setModalVisible(true)} />
        </View>
      </View>

      <AddReviewModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={(r) => {
          addReview(r);
          setModalVisible(false);
        }}
        defaultName={user ? user.displayName || user.email : "Guest"}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  meta: {
    color: "#666",
  },
  price: {
    fontWeight: "700",
    marginTop: 8,
  },
  sectionTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "700",
  },
  weatherContainer: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  weatherTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  weatherText: {
    fontSize: 18,
    color: "#333",
  },
  weatherDetail: {
    marginTop: 4,
    color: "#666",
    fontSize: 12,
  },
});
