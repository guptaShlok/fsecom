import mongoose, { Schema, Document } from "mongoose";

export interface StoreModel extends Document {
  name: string;
  userId: string;
  description?: string;
  createdAt?: Date; // Optional, will be auto-managed
  updatedAt?: Date;
}
const ProductSchema: Schema<StoreModel> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      unique: true,
    },
    userId: {
      type: String,
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
