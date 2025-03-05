import { Router } from "express"
import { getPurchaseHistory } from "./purchase.controller.js"
import { validateJWT } from "../middleware/validate-jwt.js"

const router = Router()

router.get("/history", validateJWT, getPurchaseHistory)

export default router
