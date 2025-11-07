import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import menuItemRoutes from "./routes/MenuItemRoutes";
import categoryRoutes from "./routes/CategoryRoutes";
import staffRoutes from "./routes/StaffRoutes";
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
// Routes
app.use("/api/menu-items", menuItemRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/staff", staffRoutes);
export default app;
