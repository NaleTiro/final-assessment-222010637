import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { FIREBASE_COLLECTIONS } from "../utils/constants";

export async function addReview(hotelId, review, userId) {
  try {
    const reviewData = {
      ...review,
      hotelId,
      userId,
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(
      collection(db, FIREBASE_COLLECTIONS.REVIEWS),
      reviewData
    );
    return { id: docRef.id, ...reviewData };
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
}

export async function getReviewsForHotel(hotelId) {
  try {
    const q = query(
      collection(db, FIREBASE_COLLECTIONS.REVIEWS),
      where("hotelId", "==", hotelId),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
}

export async function getUserReviews(userId) {
  try {
    const q = query(
      collection(db, FIREBASE_COLLECTIONS.REVIEWS),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    throw error;
  }
}
