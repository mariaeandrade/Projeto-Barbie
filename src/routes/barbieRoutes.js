import express from "express";
import { getAllBarbies, getBarbiesById, creatBarbie, deleteBarbie, updateBarbie } from "../controllers/barbieController.js";

const router = express.Router();

router.get("/", getAllBarbies);
router.get("/:id", getBarbiesById);
router.post("/", creatBarbie);
router.delete("/:id", deleteBarbie);
router.put("/:id", updateBarbie)

export default router;