import { Router } from "express"
import { register, login } from "./auth.controller.js"
import { registerValidator, loginValidator } from "../middleware/validate-user.js"
import { uploadProfilePicture } from "../middleware/multer-uploads.js"

const router = Router()

router.post("/register", uploadProfilePicture.single("profilePicture"), registerValidator, register)

router.post("/login", loginValidator, login)

export default router
