import { Router } from "express"
import { addProduct, getProductById, getProducts, updateProduct, removeProduct } from "./product.controller.js"
import {
  addProductValidator,
  getProductByIdValidator,
  updateProductValidator,
  removeProduct,
  removeProductValidator,
} from "../middleware/validate-product"

const router = Router()

router.post("/add", addProductValidator, addProduct)

router.get("/list", getProducts)

router.put("/edit/:id", updateProductValidator, updateProduct)

router.post("/remove/:id", removeProductValidator, removeProduct)

router.get("/:id", getProductByIdValidator, getProductById)

export default router
