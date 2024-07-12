import mongoose, { Schema, Document } from "mongoose";

export interface StoreModel extends Document {
  name: string;
  userId: number;
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
      type: Number,
      required: [true, "user id for the product is required"],
      min: [0, "Price cannot be negative"],
      unique: true,
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
