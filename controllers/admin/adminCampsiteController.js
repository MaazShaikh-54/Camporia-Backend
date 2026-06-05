import Campsite from "../../models/Campsite.js";

export const getCampsites = async (req, res) => {
    try {
        const campsites = await Campsite.find().lean();
        if (campsites.length === 0) {
            return res.status(404).json({ message: "Campsites not found" });
        }
        res.json(campsites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addCampsite = async (req, res) => {
    try {
        const campsite = new Campsite(req.body);
        await campsite.save();
        res.status(201).json({ message: "Campsite added successfully", campsite });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCampsite = async (req, res) => {
    try {
        const campsite = await Campsite.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!campsite) {
            return res.status(404).json({ message: "Campsite not found" });
        }
        res.json({ message: "Campsite updated successfully", campsite });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCampsite = async (req, res) => {
    try {
        await Campsite.findByIdAndDelete(req.params.id);
        res.json({ message: "Campsite deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};