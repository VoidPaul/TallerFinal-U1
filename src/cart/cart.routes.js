import { Router } from "express"
import { addToCart, removeFromCart, checkout } from "./cart.controller.js"
import { initCart } from "../middleware/shopping-cart.js"
import { validateJWT } from "../middleware/validate-jwt.js"

const router = Router()

router.post("/add", validateJWT, initCart, addToCart)
router.delete("/remove/:productId", validateJWT, initCart, removeFromCart)
router.post("/checkout", validateJWT, initCart, checkout)

export default router
