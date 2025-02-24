import { Router } from "express"
import { getUserById, updateUser, updatePassword, updateProfilePicture } from "./user.controller.js"
import {
  getUserByIdValidator,
  updateUserValidator,
  updatePasswordValidator,
  updateProfilePictureValidator,
} from "../middleware/validate-user.js"
import { uploadProfilePicture } from "../middleware/multer-uploads.js"

const router = Router()

router.get("/profile/:uid", getUserByIdValidator, getUserById)

router.put("/update", updateUserValidator, updateUser)

router.patch("/update/password", updatePasswordValidator, updatePassword)

router.patch(
  "/update/picture",
  uploadProfilePicture.single("profilePicture"),
  updateProfilePictureValidator,
  updateProfilePicture
)

export default router
