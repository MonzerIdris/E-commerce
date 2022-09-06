const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    total: { type: Number, default: 0},
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        size: {
          type: Array,
        },
      },
    ],
    default: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
// module.exports = CartSchema;