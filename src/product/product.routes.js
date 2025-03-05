import { Router } from "express"
import { addProduct, getProductById, getProducts, updateProduct, removeProduct } from "./product.controller.js"
import {
  addProductValidator,
  getProductByIdValidator,
  updateProductValidator,
  removeProductValidator,
} from "../middleware/validate-product.js"
import { uploadProductPicture } from "../middleware/multer-uploads.js"

const router = Router()

router.post("/add", uploadProductPicture.single("picture"), addProductValidator, addProduct)

router.get("/list", getProducts)

router.put("/edit/:id", uploadProductPicture.single("picture"), updateProductValidator, updateProduct)

router.post("/remove/:id", removeProductValidator, removeProduct)

router.get("/:id", getProductByIdValidator, getProductById)

export default router
