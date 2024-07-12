import mongoose, { Schema, Document } from "mongoose";

export interface StoreModel extends Document {
  name: string;
  userId: string;
  description?: string;
  reatedAt?: Date; // Optional, will be auto-managed
  updatedAt?: Date;
}
const ProductSchema: Schema<StoreModel> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    userId: {
      type: String,
      required: [true, "user id for the product is required"],
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const StoreModel =
  (mongoose.models.Product as mongoose.Model<StoreModel>) ||
  mongoose.model<StoreModel>("Product", ProductSchema);

export default StoreModel;
