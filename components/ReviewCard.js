import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ReviewCard({ review }) {
  const date = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString()
    : "";
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{review.name || "Anonymous"}</Text>
        <Text>
          {Array(Math.min(5, Math.max(0, parseInt(review.rating) || 0)))
            .fill("★")
            .join("") +
            Array(Math.max(0, 5 - (parseInt(review.rating) || 0)))
              .fill("☆")
              .join("")}
        </Text>
      </View>
      {review.text ? <Text style={styles.text}>{review.text}</Text> : null}
      <Text style={styles.date}>{date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#eee",
    padding: 10,
    borderRadius: 8,
    marginVertical: 6,
  },
  header: { flexDirection: "row", justifyContent: "space-between" },
  name: { fontWeight: "700" },
  text: { marginTop: 6 },
  date: { marginTop: 8, color: "#666", fontSize: 12 },
});
