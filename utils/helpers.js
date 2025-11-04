import { differenceInCalendarDays } from 'date-fns';

export function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString();
}

export function calculateNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const days = differenceInCalendarDays(checkOut, checkIn);
  return days > 0 ? days : 0;
}

export function calculateTotal(checkIn, checkOut, rate, rooms = 1) {
  const nights = calculateNights(checkIn, checkOut);
  return nights * rate * rooms;
}

export function isEmailValid(email) {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
}

export function isPasswordStrong(password) {
  // At least 6 characters
  return password && password.length >= 6;
}
