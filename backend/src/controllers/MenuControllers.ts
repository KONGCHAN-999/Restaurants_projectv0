import { Request, Response } from "express";
import Item from "../models/MenuModels";
import fs from "fs";
import path from "path";
export const getAllMenus = async (req: Request, res: Response) => {
  const items = await Item.find();
  res.json(items);
};
export const createMenu = async (req: Request, res: Response) => {
  try {
    const image = req.file ? req.file.filename : "";
    const { name, description, price, quantity } = req.body;
    const newItem = new Item({ name, description, price, quantity, image });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
export const updateMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    const updatedData: any = { ...req.body };
    if (req.file) {
      // Delete old image if exists
      if (item.image) {
        const oldImagePath = path.join(__dirname, "../../uploads/imageMenu", item.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updatedData.image = req.file.filename;
    }
    const updated = await Item.findByIdAndUpdate(id, updatedData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
export const deleteMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    // Delete image file if exists
    if (item.image) {
      const imagePath = path.join(__dirname, "../../uploads/imageMenu", item.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    await Item.findByIdAndDelete(id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};