import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Alert,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import ReviewCard from "../components/ReviewCard";
import AddReviewModal from "../components/AddReviewModal";
import { WEATHER_API_KEY } from "../utils/constants";
import axios from "axios";
import theme from "../constants/theme";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: width * 0.7,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  backButton: {
    position: "absolute",
    top: 44,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
    ...theme.shadows.small,
  },
  contentContainer: {
    flex: 1,
    padding: theme.spacing.m,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: theme.spacing.m,
  },
  name: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  location: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    flexDirection: "row",
    alignItems: "center",
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  price: {
    ...theme.typography.h2,
    color: theme.colors.primary,
  },
  perNight: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  weatherContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radii.md,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    ...theme.shadows.small,
  },
  weatherTitle: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.xs,
  },
  weatherContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.xs,
  },
  weatherText: {
    ...theme.typography.body,
    marginLeft: theme.spacing.s,
  },
  weatherDetail: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
  },
  weatherLoading: {
    padding: theme.spacing.m,
  },
  section: {
    marginBottom: theme.spacing.l,
  },
  sectionTitle: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.m,
  },
  amenitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -theme.spacing.xs,
  },
  amenityItem: {
    width: "25%",
    padding: theme.spacing.xs,
    alignItems: "center",
  },
  amenityText: {
    ...theme.typography.caption,
    marginTop: theme.spacing.xs,
    textAlign: "center",
  },
  showMoreButton: {
    alignItems: "center",
    paddingVertical: theme.spacing.s,
  },
  showMoreText: {
    ...theme.typography.bodySmall,
    color: theme.colors.primary,
  },
  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.m,
  },
  addReviewButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderRadius: theme.radii.full,
  },
  addReviewText: {
    ...theme.typography.bodySmall,
    color: theme.colors.white,
    marginLeft: theme.spacing.xs,
  },
  bottomCTA: {
    padding: theme.spacing.m,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  bookButton: {
    ...theme.button.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  bookButtonText: {
    ...theme.typography.body,
    color: theme.colors.white,
    fontWeight: "600",
  },
});

export default function HotelDetails({ route, navigation }) {
  const { user } = useContext(AuthContext);
  const { hotel } = route.params;
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [reviews, setReviews] = useState([
    {
      id: "r1",
      name: "Sizwe",
      rating: 5,
      text: "Amazing stay!",
      createdAt: Date.now() - 86400000,
    },
    {
      id: "r2",
      name: "Amanda",
      rating: 4,
      text: "Great location and service",
      createdAt: Date.now() - 172800000,
    },
  ]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAmenities, setShowAmenities] = useState(false);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    if (WEATHER_API_KEY === "YOUR_OPENWEATHER_API_KEY") {
      setWeatherLoading(false);
      return;
    }
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

  const handleBookNow = () => {
    if (!user) {
      Alert.alert("Sign in Required", "Please sign in to book this hotel", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign In",
          onPress: () =>
            navigation.reset({ index: 0, routes: [{ name: "Auth" }] }),
        },
      ]);
      return;
    }
    navigation.navigate("Booking", { hotel });
  };

  const amenities = [
    { icon: "wifi", name: "Free WiFi" },
    { icon: "car", name: "Parking" },
    { icon: "restaurant", name: "Restaurant" },
    { icon: "fitness", name: "Gym" },
    { icon: "water", name: "Pool" },
    { icon: "bed", name: "King Bed" },
  ];

  const addReview = (review) => {
    setReviews([{ ...review, id: Date.now().toString() }, ...reviews]);
  };

  return (
    <ScrollView style={styles.container} bounces={false}>
      {/* Hero Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={hotel.image}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.white} />
        </TouchableOpacity>
      </View>

      {/* Hotel Info Section */}
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{hotel.name}</Text>
            <Text style={styles.location}>
              <Ionicons
                name="location"
                size={16}
                color={theme.colors.primary}
              />{" "}
              {hotel.location}
            </Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${hotel.price}</Text>
            <Text style={styles.perNight}>/night</Text>
          </View>
        </View>

        {/* Weather Widget */}
        {weatherLoading ? (
          <ActivityIndicator
            style={styles.weatherLoading}
            color={theme.colors.primary}
          />
        ) : (
          weather && (
            <View style={styles.weatherContainer}>
              <Text style={styles.weatherTitle}>Current Weather</Text>
              <View style={styles.weatherContent}>
                <Ionicons
                  name={
                    weather.weather[0].main.toLowerCase() === "clear"
                      ? "sunny"
                      : "cloud"
                  }
                  size={24}
                  color={theme.colors.primary}
                />
                <Text style={styles.weatherText}>
                  {Math.round(weather.main.temp)}°C - {weather.weather[0].main}
                </Text>
              </View>
              <Text style={styles.weatherDetail}>
                Humidity: {weather.main.humidity}% | Wind:{" "}
                {Math.round(weather.wind.speed)} m/s
              </Text>
            </View>
          )
        )}

        {/* Amenities Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesGrid}>
            {amenities
              .slice(0, showAmenities ? undefined : 4)
              .map((item, index) => (
                <View key={index} style={styles.amenityItem}>
                  <Ionicons
                    name={item.icon}
                    size={24}
                    color={theme.colors.primary}
                  />
                  <Text style={styles.amenityText}>{item.name}</Text>
                </View>
              ))}
          </View>
          {amenities.length > 4 && (
            <TouchableOpacity
              style={styles.showMoreButton}
              onPress={() => setShowAmenities(!showAmenities)}
            >
              <Text style={styles.showMoreText}>
                {showAmenities ? "Show Less" : "Show More"}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Reviews Section */}
        <View style={styles.section}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            <TouchableOpacity
              style={styles.addReviewButton}
              onPress={() => setShowReviewModal(true)}
            >
              <Ionicons name="add" size={20} color={theme.colors.white} />
              <Text style={styles.addReviewText}>Add Review</Text>
            </TouchableOpacity>
          </View>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </View>
      </View>

      {/* Bottom CTA */}
      <View style={styles.bottomCTA}>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>

      {/* Review Modal */}
      <AddReviewModal
        visible={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmit={addReview}
        defaultName={user ? user.displayName || user.email : "Guest"}
      />
    </ScrollView>
  );
}
