import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: error.message });
  }
};

export const editUserProfile = async (req, res) => {
  try {
    const { name, email, password, favorites, searchHistory } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    user.favorites = favorites || user.favorites;
    user.searchHistory = searchHistory || user.searchHistory;

    await user.save();
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error editing user profile:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteUserProfile = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: "User profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting user profile:", error);
    res.status(500).json({ message: error.message });
  }
};
