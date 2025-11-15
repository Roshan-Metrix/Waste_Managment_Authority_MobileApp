import managerModel from "../models/managerModel.js";

export const getAllManagers = async (req, res) => {
  try {
    const managers = await managerModel.find().select("-password -__v");

    return res.json({
      success: true,
      count: managers.length,
      managers,
    });

  } catch (error) {
    console.log("Error in getAllManagers Controller : ",error)
    return res.json({ success: false, message: error.message });
  }
};