import { Router } from "express"
import { register, login } from "./auth.controller.js"
import { registerValidator, loginValidator } from "../middleware/user-validator.js"
import { uploadProfilePicture } from "../middleware/multer-upload.js"

const router = Router()

router.post("/register", registerValidator, uploadProfilePicture.single("profilePicture"), register)

router.post("/login", loginValidator, login)

export default router
