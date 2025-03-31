import express from "express";
import {
  createProduct,
  deleteProduct,
  getproducts,
  updateProduct,
} from "../controllers/products.controller.js";

const router = express.Router();

router.get("/", getproducts); // Fetch all products

router.post("/", createProduct);

router.put("/:id", updateProduct); // Update a product by ID

router.delete("/:id", deleteProduct); // Delete a product by ID

export default router;
