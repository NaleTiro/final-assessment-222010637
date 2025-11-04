import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { hotelImages } from "../constants/images";
import theme from "../constants/theme";

export default function HotelCard({ hotel, onPress }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress && onPress(hotel)}
    >
      <View style={styles.left}>
        <Image
          source={hotel.image || hotelImages.hotelPlaceholder}
          style={styles.image}
        />
      </View>
      <View style={styles.right}>
        <Text style={styles.title}>{hotel.name}</Text>
        <Text style={styles.meta}>{hotel.location}</Text>
        <Text style={styles.rating}>
          {Array(Math.min(5, Math.max(0, parseInt(hotel.rating) || 0)))
            .fill("★")
            .join("") +
            Array(Math.max(0, 5 - (parseInt(hotel.rating) || 0)))
              .fill("☆")
              .join("")}
        </Text>
      </View>
      <View style={styles.priceBadge}>
        <Text style={styles.priceText}>${hotel.price}</Text>
        <Text style={styles.priceSub}>/night</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: theme.spacing.s,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: theme.radii.md,
    marginBottom: theme.spacing.m,
    backgroundColor: theme.colors.card,
    alignItems: "center",
  },
  left: { marginRight: 12 },
  image: { width: 100, height: 72, borderRadius: theme.radii.sm },
  right: { flex: 1 },
  title: { fontWeight: "700", color: theme.colors.text },
  meta: { color: theme.colors.muted, marginTop: 4 },
  rating: { marginTop: 6, color: theme.colors.accent },
  priceBadge: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  priceText: { color: "white", fontWeight: "700" },
  priceSub: { color: "white", fontSize: 10 },
});
