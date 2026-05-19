import Journey from "../../models/Journey.js";

export const getJourneys = async (req, res) => {
    try {
        const journeys = await Journey.find().populate("user").populate("campsite");
        res.status(200).json(journeys);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getJourneyById = async (req, res) => {
    try {
        const journey = await Journey.findById(req.params.id).populate("user").populate("campsite");
        if (!journey) return res.status(404).json({ message: "Journey not found" });
        res.status(200).json(journey);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateJourney = async (req, res) => {
    try {
        const journey = await Journey.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!journey) return res.status(404).json({ message: "Journey not found" });
        res.status(200).json(journey);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteJourney = async (req, res) => {
    try {
        const journey = await Journey.findByIdAndDelete(req.params.id);
        if (!journey) return res.status(404).json({ message: "Journey not found" });
        res.status(200).json({ message: "Journey deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};