import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { differenceInCalendarDays, format } from "date-fns";
import { Ionicons } from "@expo/vector-icons";
import theme from "../constants/theme";

export default function BookingScreen({ route, navigation }) {
  const { hotel } = route.params;
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [rooms, setRooms] = useState(1);
  const [showPicker, setShowPicker] = useState({ which: null, visible: false });

  const openPicker = (which) => setShowPicker({ which, visible: true });
  const closePicker = () => setShowPicker({ which: null, visible: false });
  const handleConfirm = (date) => {
    if (showPicker.which === "in") setCheckIn(date);
    else setCheckOut(date);
    closePicker();
  };

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0;
    const days = Math.max(1, differenceInCalendarDays(checkOut, checkIn));
    return days * hotel.price * rooms;
  };

  const submit = () => {
    if (!checkIn || !checkOut)
      return Alert.alert("Validation", "Select check-in and check-out");
    if (checkOut <= checkIn)
      return Alert.alert("Validation", "Check-out must be after check-in");
    const total = calculateTotal();
    // save booking to database later
    Alert.alert(
      "Confirm Booking",
      `Total: $${total}
Proceed?`,
      [
        { text: "Cancel" },
        {
          text: "Confirm",
          onPress: () => {
            // here persist booking via bookingService
            Alert.alert("Booked", "Your booking was saved (demo).");
            navigation.popToTop();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Book Your Stay</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.hotelName}>{hotel.name}</Text>
          <Text style={styles.location}>
            <Ionicons name="location" size={16} color={theme.colors.primary} />{" "}
            {hotel.location}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Dates</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => openPicker("in")}
          >
            <View style={styles.dateContent}>
              <Ionicons
                name="calendar"
                size={24}
                color={theme.colors.primary}
              />
              <View style={styles.dateTextContainer}>
                <Text style={styles.dateLabel}>Check-in</Text>
                <Text style={styles.dateValue}>
                  {checkIn ? format(checkIn, "MMM dd, yyyy") : "Select date"}
                </Text>
              </View>
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={theme.colors.text}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => openPicker("out")}
          >
            <View style={styles.dateContent}>
              <Ionicons
                name="calendar"
                size={24}
                color={theme.colors.primary}
              />
              <View style={styles.dateTextContainer}>
                <Text style={styles.dateLabel}>Check-out</Text>
                <Text style={styles.dateValue}>
                  {checkOut ? format(checkOut, "MMM dd, yyyy") : "Select date"}
                </Text>
              </View>
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Number of Rooms</Text>
          <View style={styles.roomSelector}>
            <TouchableOpacity
              style={styles.roomButton}
              onPress={() => setRooms(Math.max(1, rooms - 1))}
            >
              <Ionicons name="remove" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
            <Text style={styles.roomCount}>{rooms}</Text>
            <TouchableOpacity
              style={styles.roomButton}
              onPress={() => setRooms(rooms + 1)}
            >
              <Ionicons name="add" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Price per night</Text>
            <Text style={styles.summaryValue}>${hotel.price}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Number of nights</Text>
            <Text style={styles.summaryValue}>
              {checkIn && checkOut
                ? differenceInCalendarDays(checkOut, checkIn)
                : 0}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Number of rooms</Text>
            <Text style={styles.summaryValue}>{rooms}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>${calculateTotal()}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmButton} onPress={submit}>
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={showPicker.visible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={closePicker}
        minimumDate={
          showPicker.which === "out" && checkIn ? checkIn : new Date()
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    padding: theme.spacing.s,
    marginRight: theme.spacing.s,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text,
  },
  card: {
    margin: theme.spacing.m,
    padding: theme.spacing.m,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radii.lg,
    ...theme.shadows.small,
  },
  hotelName: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  location: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    margin: theme.spacing.m,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing.m,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radii.md,
    marginBottom: theme.spacing.s,
    ...theme.shadows.small,
  },
  dateContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateTextContainer: {
    marginLeft: theme.spacing.m,
  },
  dateLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  dateValue: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginTop: 2,
  },
  roomSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.m,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radii.md,
    ...theme.shadows.small,
  },
  roomButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  roomCount: {
    ...theme.typography.h2,
    marginHorizontal: theme.spacing.xl,
    minWidth: 30,
    textAlign: "center",
  },
  summary: {
    margin: theme.spacing.m,
    padding: theme.spacing.m,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radii.lg,
    ...theme.shadows.small,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: theme.spacing.s,
  },
  summaryLabel: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  summaryValue: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  totalRow: {
    marginTop: theme.spacing.s,
    paddingTop: theme.spacing.m,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  totalLabel: {
    ...theme.typography.h3,
    color: theme.colors.text,
  },
  totalValue: {
    ...theme.typography.h2,
    color: theme.colors.primary,
  },
  footer: {
    padding: theme.spacing.m,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  confirmButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.m,
    borderRadius: theme.radii.full,
    alignItems: "center",
    justifyContent: "center",
    ...theme.shadows.small,
  },
  confirmButtonText: {
    ...theme.typography.buttonText,
    color: theme.colors.white,
  },
});
