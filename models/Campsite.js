import mongoose from "mongoose";

const campsiteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: {
      type: [String],
      required: true,
      validate: (v) => v.length > 0,
    },
    feature: [{ type: String, required: false }],
    amenities: [{ type: String }],
    campsiteType: { type: String, required: true },
    campsiteSize: { type: String, required: true },
    capacity: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: Number,
        comment: String,
      },
    ],
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    season: {
      type: String,
      enum: ["summer", "winter", "monsoon", "all"],
      default: "all",
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    checkInTime: { type: String, required: true },
    checkOutTime: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

campsiteSchema.index({ location: 1, price: 1, campsiteType: 1 });

export default mongoose.model("Campsite", campsiteSchema);
