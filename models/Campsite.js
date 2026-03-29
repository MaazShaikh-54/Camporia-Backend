import mongoose from "mongoose";

const campsiteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: [{ type: String, required: true }],
    feature: [{ type: String, required: false }],
    amenities: [{ type: String }],
    rating: { type: Number, default: 0 },
    campsiteType: { type: String, required: true },
    campsiteSize: { type: String, required: true },
    capacity: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    reviewsCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Campsite", campsiteSchema);
