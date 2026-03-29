import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campsite",
      },
    ],
    searchHistory: [
      {
        query: String,
        searchedAt: { type: Date, default: Date.now },
      },
    ],
    // reviews: [
    //   {
    //     campsite: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Campsite",
    //     },
    //     rating: {
    //       type: Number,
    //       required: true,
    //     },
    //     comment: {
    //       type: String,
    //     },
    //   },
    // ],
    // bookings: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Booking",
    //   },
    // ],
    notifications: [
      {
        message: { type: String, required: true },
        read: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    // coupons: [
    //   {
    //     code: { type: String, required: true },
    //     discount: { type: Number, required: true },
    //     expiry: { type: Date, required: true },
    //   },
    // ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);
