const Journey = require('../../models/journeyModel');

exports.getJourneys = async (req, res) => {
  try {
    const journeys = await Journey.find();
    return res.status(200).json({
      success: true,
      data: journeys,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Unable to fetch journeys',
    });
  }
};

exports.getJourneyById = async (req, res) => {
  try {
    const journey = await Journey.findById(req.params.id);
    if (!journey) {
      return res.status(404).json({
        success: false,
        message: 'Journey not found',
      });
    }
    return res.status(200).json({
      success: true,
      data: journey,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Unable to fetch journey',
    });
  }
};

exports.updateJourney = async (req, res) => {
  try {
    const journey = await Journey.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!journey) {
      return res.status(404).json({
        success: false,
        message: 'Journey not found',
      });
    }
    return res.status(200).json({
      success: true,
      data: journey,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Unable to update journey',
    });
  }
};

exports.deleteJourney = async (req, res) => {
  try {
    const journey = await Journey.findByIdAndDelete(req.params.id);
    if (!journey) {
      return res.status(404).json({
        success: false,
        message: 'Journey not found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Journey deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Unable to delete journey',
    });
  }
};
