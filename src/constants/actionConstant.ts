export const plans = {
  weekly: {
    starter: { price: 64.95 * 0.5 + 6.95, originalPrice: 64.95 + 6.95, points: 650, bonus: 60 },
    balance: { price: 124.95 * 0.5, originalPrice: 124.95, points: 1250, bonus: 120 },
    elite: { price: 249.95 * 0.5, originalPrice: 249.95, points: 2500, bonus: 250 },
  },
  monthly: {
    starter: { price: 124.95 * 0.5, originalPrice: 124.95, points: 1250, bonus: 120 },
    balance: { price: 249.95 * 0.5, originalPrice: 249.95, points: 2500, bonus: 250 },
    elite: { price: 499.95 * 0.5, originalPrice: 499.95, points: 5000, bonus: 500 },
  },
};
