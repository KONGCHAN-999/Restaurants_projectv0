import { Schema, model, Document } from "mongoose";

export interface IMenuItem extends Document {
  name: string;
  category: Schema.Types.ObjectId;
  price: number;
  status: "available" | "unavailable";
  image?: string;
  createdAt: Date;
}

const menuItemSchema = new Schema<IMenuItem>({
  name: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, required: true },
  status: {
    type: String,
    enum: ["available", "unavailable"],
    default: "available",
  },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default model<IMenuItem>("Menu", menuItemSchema);
