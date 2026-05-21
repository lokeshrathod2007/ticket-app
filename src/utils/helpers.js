// Generate a random unique booking ID
export const genBookingId = () =>
  "TKT" + Math.random().toString(36).slice(2, 8).toUpperCase();

// Get ticket price based on tier name
export const tierPrice = (event, tier) => {
  if (tier === "vip")      return event.vipPrice;
  if (tier === "standard") return event.standardPrice;
  return event.economyPrice;
};
