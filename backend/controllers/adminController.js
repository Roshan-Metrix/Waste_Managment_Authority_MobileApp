import userModel from "../models/adminModel.js";

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await userModel
      .find({ role: "admin" })
      .select("-password -__v");

    return res.json({
      success: true,
      count: admins.length,
      admins,
    });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


