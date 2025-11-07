import { Request, Response } from "express";
import Staff from "../models/StaffModels";
import fs from "fs";
import path from "path";

// Get all staff
export const getAllStaff = async (req: Request, res: Response) => {
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Get single staff
export const getStaffById = async (req: Request, res: Response) => {
  try {
    const staff = await Staff.findById(req.params.id);
    const image = req.file ? req.file.filename : "";
    if (!staff) return res.status(404).json({ message: "Staff not found" });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Create staff
export const createStaff = async (req: Request, res: Response) => {
  try {
    const image = req.file ? req.file.filename : "";
    req.body.image = image;
    const staff = new Staff(req.body);
    await staff.save();
    res.status(201).json(staff);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

// Update staff
export const updateStaff = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const staffMembers = await Staff.findById(id);
    if (!staffMembers) return res.status(404).json({ message: "Staff not found" });
    const updatedData: any = { ...req.body };
    if (req.file) {
      // Delete old image if exists
      if (staffMembers.image) {
        const oldImagePath = path.join(__dirname, "../../uploads/imageUser", staffMembers.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updatedData.image = req.file.filename;
    }
    const staffUpdate = await Staff.findByIdAndUpdate(id, updatedData, { new: true });
    if (!staffUpdate) return res.status(404).json({ message: "Staff not found" });
    res.json(staffUpdate);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

// Delete staff
export const deleteStaff = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const staffMembers = await Staff.findById(id);  
    if (!staffMembers) return res.status(404).json({ message: "Staff not found" });
    // Delete image file if exists
    if (staffMembers.image) {
      const imagePath = path.join(__dirname, "../../uploads/imageUser", staffMembers.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    // Delete staff from database
    const staffDelete = await Staff.findByIdAndDelete(id);
    if (!staffDelete) return res.status(404).json({ message: "Staff not found" });
    res.json({ message: "Staff deleted" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
