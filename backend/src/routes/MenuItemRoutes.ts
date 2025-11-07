import express from "express";
import {
  getAllMenus,
  //   getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
} from "../controllers/MenuControllers";
import upload from "../middleware/UploadMenu";
import Menu from "../models/MenuModels";
const router = express.Router();
router.get("/", getAllMenus);
// router.get("/:id", getMenuById);
router.get("/:id", async (req, res) => {
  const menu = await Menu.findById(req.params.id);
  if (!menu) return res.status(404).json({ message: "Item not found" });
  res.json(menu);
});
router.post("/", upload.single("image"), createMenu);
router.put("/:id", upload.single("image"), updateMenu);
router.delete("/:id", deleteMenu);

export default router;
