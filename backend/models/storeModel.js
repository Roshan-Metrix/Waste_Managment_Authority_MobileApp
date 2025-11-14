import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    storeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    storeName: {
      type: String,
      required: true,
      trim: true,
    },

    storeLocation: {
      type: String,
      required: true,
      trim: true,
    },

    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },

     createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", 
    },
  },
  { timestamps: true }
);

const Store = mongoose.model("Store", storeSchema);
export default Store;
