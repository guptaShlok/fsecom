import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface StoreModelType extends Document {
  _id: ObjectId;
  name: string;
  userId: string;
  description?: string;
  createdAt?: Date; // Optional, will be auto-managed
  updatedAt?: Date;
}
const ProductSchema: Schema<StoreModelType> = new Schema(
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
  (mongoose.models.Product as mongoose.Model<StoreModelType>) ||
  mongoose.model<StoreModelType>("Product", ProductSchema);

export default StoreModel;
