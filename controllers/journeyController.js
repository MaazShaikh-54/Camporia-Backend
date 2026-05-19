import Journey from "../models/Journey.js";
import Campsite from "../models/Campsite.js";
import { getDemandMultiplier } from "../utils/pricing.js";
import { calculatePrice } from "../services/pricingService.js";
import { checkAvailability } from "../services/availabilityService.js";
import { generateJourneyId } from "../utils/helpers.js";

export const createJourney = async (req, res) => {
  try {
    const { campsite, checkIn, checkOut, personCount, coupon, contactDetails } = req.body;

    const userId = req.user.id;

    const available = await checkAvailability(campsite, checkIn, checkOut);

    if (!available) {
      return res.status(400).json({ message: "Campsite not available on the selected dates" });
    }

    const camp = await Campsite.findById(campsite);

    if (!camp) {
      return res.status(404).json({ message: "Campsite not found" });
    }
    
    const campsiteData = await Campsite.findById(campsite);

    const demandMultiplier = await getDemandMultiplier(campsite, checkIn);

    const totalPrice = calculatePrice({
      price: campsiteData.price * demandMultiplier,
      checkIn,
      checkOut,
      personCount,
      coupon,
    });

    const journey = new Journey({
      user: userId,
      campsite,
      journeyId: generateJourneyId(),
      checkIn,
      checkOut,
      personCount,
      totalPrice,
      contactDetails,
    });

    await journey.save();

    res.status(201).json(journey);
  } catch (error) {
    console.error("Error creating journey:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getJourneys = async (req, res) => {
  try {
    const journeys = await Journey.find().populate("user").populate("campsite");

    res.status(200).json(journeys);
  } catch (error) {
    console.error("Error fetching journeys:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getJourneyById = async (req, res) => {
  try {
    const journey = await Journey.findById(req.params.id)
      .populate("user")
      .populate("campsite");

    if (!journey) {
      return res.status(404).json({ message: "Journey not found" });
    }

    res.status(200).json(journey);
  } catch (error) {
    console.error("Error fetching journey:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateJourney = async (req, res) => {
  try {
    const journey = await Journey.findById(req.params.id);

    if (!journey) {
      return res.status(404).json({ message: "Journey not found" });
    }

    const { campsite, checkIn, checkOut, personCount, paymentStatus, status, contactDetails } =
      req.body;

    journey.campsite = campsite || journey.campsite;
    journey.checkIn = checkIn || journey.checkIn;
    journey.checkOut = checkOut || journey.checkOut;
    journey.personCount = personCount || journey.personCount;
    journey.contactDetails = contactDetails || journey.contactDetails;
    journey.paymentStatus = paymentStatus || journey.paymentStatus;
    journey.status = status || journey.status;

    await journey.save();

    res.status(200).json(journey);
  } catch (error) {
    console.error("Journey update error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const previewPrice = async (req, res) => {
    try {
        const { campsite, checkIn, checkOut, personCount } = req.body;
        const camp = await Campsite.findById(campsite);
        if (!camp) return res.status(404).json({ message: "Campsite not found" });
        const demandMultiplier = await getDemandMultiplier(campsite, checkIn);
        const totalPrice = calculatePrice({
            price: camp.price * demandMultiplier,
            checkIn,
            checkOut,
            personCount,
        });
        res.status(200).json({ totalPrice });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const cancelJourney = async (req, res) => {
    try {
        const journey = await Journey.findById(req.params.id);
        if (!journey) return res.status(404).json({ message: "Journey not found" });

        if (journey.status === "cancelled") {
            return res.status(400).json({ message: "Journey already cancelled" });
        }

        const now = new Date();
        const checkIn = new Date(journey.checkIn);
        const daysUntilCheckIn = Math.ceil((checkIn - now) / (1000 * 60 * 60 * 24));

        if (daysUntilCheckIn >= 7) {
            journey.status = "cancelled";
            journey.paymentStatus = "pending";
            journey.refundAmount = Math.round(journey.totalPrice * 0.90);
            journey.cancellationNote = "Cancelled 7+ days before check-in. 90% refund applicable.";
        } else {
            journey.status = "cancelled";
            journey.paymentStatus = "pending";
            journey.refundAmount = 0;
            journey.cancellationNote = "Cancelled within 7 days of check-in. No refund.";
        }

        await journey.save();
        res.status(200).json(journey);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMyJourneys = async (req, res) => {
    try {
        const journeys = await Journey.find({ user: req.user.id }).populate("campsite");
        res.status(200).json(journeys);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
