import express from "express";
import {
  getAllStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff
} from "../controllers/StaffControllers";
import upload from "../middleware/UploadUser";
import Staff from "../models/StaffModels";
const router = express.Router();
router.get("/", getAllStaff);
// router.get("/:id", getStaffById);
router.get("/:id", async (req, res) => {
  const staff = await Staff.findById(req.params.id);
  if (!staff) return res.status(404).json({ message: "Staff not found" });
  res.json(staff);
});
router.post("/", upload.single("image"), createStaff);
router.put("/:id", upload.single("image"), updateStaff);
router.delete("/:id", deleteStaff);
export default router;
