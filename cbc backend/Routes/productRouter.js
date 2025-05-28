import express from  "express";
import { createProduct, getProduct } from "../controllers/productController.js";

const productRouter = express.Router();
productRoute.post("/",createProduct)
productRoute.get("/",getProduct)

export default productRouter;
