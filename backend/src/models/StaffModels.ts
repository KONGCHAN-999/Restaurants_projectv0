import { Schema, model, Document } from "mongoose";

export interface IStaff extends Document {
  name: string;
  role: "chef" | "waiter" | "cashier" | "manager";
  contact: string;
  shift?: string;
  image?: string;
  createdAt: Date;
}

const staffSchema = new Schema<IStaff>({
  name: { type: String, required: true },
  role: {
    type: String,
    enum: ["chef", "waiter", "cashier", "manager"],
    required: true,
  },
  contact: { type: String, required: true },
  shift: { type: String },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default model<IStaff>("Staff", staffSchema);
