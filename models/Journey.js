const journeySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    campsite: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campsite",
      required: true,
    },
    journeyId: {
      type: String,
      required: true,
      unique: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    personCount: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    contactDetails: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    status: {
      type: String,
      enum: ["upcoming", "completed", "cancelled"],
      default: "upcoming",
    },
    refundAmount: {
      type: Number,
      default: 0,
    },
    cancellationNote: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);
