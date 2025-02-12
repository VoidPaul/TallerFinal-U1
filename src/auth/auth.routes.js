import { Router } from "express"
import { register, login } from "./auth.controller"
// import
import { uploadProfilePicture } from "../middleware/multer-upload"

router.post(
  "/register",
  //registerValidator,
  uploadProfilePicture,
  register
)

router.post(
  "/login",
  //loginValidator,
  login
)

export default router
