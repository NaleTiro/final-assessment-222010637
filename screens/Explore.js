import React, { useState, useEffect } from "react";
import { View, FlatList, Text, RefreshControl } from "react-native";
import HotelCard from "../components/HotelCard";
import { hotelImages } from "../constants/images";
import theme from "../constants/theme";

const SAMPLE_HOTELS = [
  {
    id: "1",
    name: "Ocean View",
    location: "Cape Town",
    price: 120,
    image: hotelImages.hotel1,
    rating: 5,
  },
  {
    id: "2",
    name: "City Lodge",
    location: "Johannesburg",
    price: 80,
    image: hotelImages.hotel2,
    rating: 4,
  },
  {
    id: "3",
    name: "Mountain Inn",
    location: "Drakensberg",
    price: 95,
    image: hotelImages.hotel3,
    rating: 4,
  },
];

export default function Explore({ navigation }) {
  const [hotels, setHotels] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setHotels(SAMPLE_HOTELS);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setHotels(SAMPLE_HOTELS);
      setRefreshing(false);
    }, 800);
  };

  return (
    <View style={{ flex: 1, padding: theme.spacing.s }}>
      <FlatList
        data={hotels}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
          />
        }
        renderItem={({ item }) => (
          <HotelCard
            hotel={item}
            onPress={() => navigation.navigate("HotelDetails", { hotel: item })}
          />
        )}
        ListEmptyComponent={<Text>No hotels found</Text>}
      />
    </View>
  );
}
