import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { FIREBASE_COLLECTIONS } from "../utils/constants";

export async function createBooking(userId, hotelId, bookingData) {
  try {
    const booking = {
      userId,
      hotelId,
      ...bookingData,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(
      collection(db, FIREBASE_COLLECTIONS.BOOKINGS),
      booking
    );

    // Update user's bookings array
    const userRef = doc(db, FIREBASE_COLLECTIONS.USERS, userId);
    await updateDoc(userRef, {
      bookings: [...(booking.bookings || []), { id: docRef.id, ...booking }],
    });

    return { id: docRef.id, ...booking };
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}

export async function getUserBookings(userId) {
  try {
    const q = query(
      collection(db, FIREBASE_COLLECTIONS.BOOKINGS),
      where("userId", "==", userId)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
}

export async function cancelBooking(bookingId, userId) {
  try {
    const bookingRef = doc(db, FIREBASE_COLLECTIONS.BOOKINGS, bookingId);
    await updateDoc(bookingRef, {
      status: "cancelled",
      cancelledAt: new Date().toISOString(),
    });

    return { success: true };
  } catch (error) {
    console.error("Error cancelling booking:", error);
    throw error;
  }
}
