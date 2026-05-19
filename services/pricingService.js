import { calculateNights, getSeason } from "../utils/helpers.js";

const festivalDates = [
  "2026-01-01",
  "2026-01-26",
  "2026-10-24",
  "2026-03-14",
];

export const calculatePrice = ({
  price,
  checkIn,
  checkOut,
  personCount = 1,
  coupon = null,
}) => {
  const nights = calculateNights(checkIn, checkOut);
  const season = getSeason(checkIn);

  let finalPrice = price;

  if (season === "winter") finalPrice *= 1.3;
  if (season === "summer") finalPrice *= 1.1;
  if (season === "monsoon") finalPrice *= 0.8;

  let totalPrice = finalPrice * nights;

  const checkInDay = new Date(checkIn).getDay();
  if (checkInDay === 5 || checkInDay === 6) {
    totalPrice *= 1.2;
  }

  const isFestival = festivalDates.includes(
    new Date(checkIn).toISOString().split("T")[0]
  );
  if (isFestival) {
    totalPrice *= 1.5;
  }

  if (personCount > 2) {
    totalPrice += (personCount - 2) * 500 * nights;
  }

  if (coupon) {
    if (coupon === "CAMP10") {
      totalPrice *= 0.9;
    }
    if (coupon === "NEWUSER") {
      totalPrice -= 500;
    }
  }

  return Math.max(0, Math.round(totalPrice));
};