import storeModel from "../models/storeModel.js";

export const getAllStores = async (req, res) => {
  try {
    const stores = await storeModel.find().select("-password -__v");

    return res.json({
      success: true,
      count: stores.length,
      stores,
    });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const deleteStore = async (req, res) => {
  try {
    const { storeID } = req.params;  

    if (!storeID) {
      return res.json({
        success: false,
        message: "Store ID is required"
      });
    }

    const store = await storeModel.findOne({ storeID });

    if (!store) {
      return res.json({
        success: false,
        message: "Store not found"
      });
    }

    const result = await storeModel.deleteOne({ storeID });

    return res.json({
      success: true,
      message: "Store removed successfully",
      deletedStoreID: storeID
    });

  } catch (error) {
    return res.json({
      success: false,
      message: error.message
    });
  }
};
