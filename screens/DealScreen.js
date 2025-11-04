import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from "react-native";
import axios from "axios";
import HotelCard from "../components/HotelCard";
import { hotelImages } from "../constants/images";
import theme from "../constants/theme";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEmPmPCPhAZz_WsKO9rB7NDed6eNH1vMA",
  authDomain: "dsw-final-test.firebaseapp.com",
  projectId: "dsw-final-test",
  storageBucket: "dsw-final-test.firebasestorage.app",
  messagingSenderId: "625772429571",
  appId: "1:625772429571:web:9b9a27549905a50bd8e936",
  measurementId: "G-VGTXFYE4GP",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default function DealsScreen({ navigation }) {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDeals = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      // Transform products into hotel-like data
      const hotelDeals = res.data.slice(0, 10).map((item, index) => ({
        id: item.id.toString(),
        name: item.title.split(" ").slice(0, 3).join(" ") + " Hotel", // Create hotel-like name
        location:
          item.category.charAt(0).toUpperCase() + item.category.slice(1),
        price: Math.round(item.price * 10), // Convert to reasonable hotel prices
        rating: Math.ceil((item.rating?.rate || 3.5) + 1),
        description: item.description,
        image:
          hotelImages[`hotel${(index % 3) + 1}`] ||
          hotelImages.hotelPlaceholder,
        dealType: "Special Offer",
        originalPrice: Math.round(item.price * 12), // Show savings
      }));
      setDeals(hotelDeals);
    } catch (e) {
      console.error("Error fetching deals:", e);
    }
  };

  useEffect(() => {
    fetchDeals().finally(() => setLoading(false));
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDeals();
    setRefreshing(false);
  };

  if (loading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Finding best deals...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Special Deals</Text>
      <FlatList
        data={deals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.dealContainer}>
            <Text style={styles.dealBadge}>
              Save ${item.originalPrice - item.price}!
            </Text>
            <HotelCard
              hotel={item}
              onPress={() =>
                navigation.navigate("HotelDetails", { hotel: item })
              }
            />
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: theme.colors.muted,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    padding: 16,
    color: theme.colors.text,
  },
  dealContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  dealBadge: {
    position: "absolute",
    top: -10,
    right: 10,
    backgroundColor: theme.colors.accent,
    color: "white",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
    fontSize: 12,
    fontWeight: "700",
  },
  listContent: {
    paddingBottom: 16,
  },
});
