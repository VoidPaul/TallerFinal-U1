import { Router } from "express"
import {
  getUserById,
  updateUser,
  updatePassword,
  updateProfilePicture,
  adminUpdateUser,
  adminUpdatePassword,
  adminUpdateProfilePicture,
} from "./user.controller.js"
import {
  getUserByIdValidator,
  updateUserValidator,
  updatePasswordValidator,
  updateProfilePictureValidator,
  adminUpdateUserValidator,
  adminUpdatePasswordValidator,
  adminUpdateProfilePictureValidator,
} from "../middleware/validate-user.js"
import { uploadProfilePicture } from "../middleware/multer-uploads.js"

const router = Router()

<<<<<<< HEAD
=======
// General Routes

>>>>>>> feature/auth
/**
 * @swagger
 * /shop-manager/v1/user/profile/{uid}:
 *  get:
 *    summary: Retrieve a user by ID
 *    description: Fetches a user's details based on their unique ID
 *    parameters:
 *      - in: path
 *        name: uid
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the user to retrieve
 *    responses:
 *      200:
 *        description: User retrieved successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: true
 *                user:
 *                  $ref: '#/components/schemas/User'
 *      404:
 *        description: User not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  example: "User not found."
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  example: "Error getting user."
 *                error:
 *                  type: string
 *                  example: "Error details"
 */
router.get("/profile/:uid", getUserByIdValidator, getUserById)

/**
 * @swagger
 * /shop-manager/v1/user/update:
 *  put:
 *    summary: Update user data
 *    description: Updates the authenticated user's data with the provided fields
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                description: The new username
 *              email:
 *                type: string
 *                description: The new email address
 *            example:
 *              username: "newUsername"
 *              email: "newemail@example.com"
 *    responses:
 *      200:
 *        description: User updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: true
 *                message:
 *                  type: string
 *                  example: "User updated."
 *                user:
 *                  $ref: '#/components/schemas/User'
 *      401:
 *        description: Unauthorized (e.g., invalid or missing token)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  example: "Unauthorized"
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  example: "Error updating user."
 *                error:
 *                  type: string
 *                  example: "Error details"
 */
router.put("/update", updateUserValidator, updateUser)

/**
 * @swagger
 * /shop-manager/v1/user/update/password:
 *  patch:
 *    summary: Update user password
 *    description: Changes the authenticated user's password
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              newPassword:
 *                type: string
 *                description: The new password to set
 *            required:
 *              - newPassword
 *            example:
 *              newPassword: "newSecurePass123"
 *    responses:
 *      200:
 *        description: Password updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: true
 *                message:
 *                  type: string
 *                  example: "Password updated."
 *      400:
 *        description: Bad request (e.g., new password same as old)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  example: "New password cannot be the same as previous one."
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  example: "Unauthorized"
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  example: "Error changing password."
 *                error:
 *                  type: string
 *                  example: "Error details"
 */
router.patch("/update/password", updatePasswordValidator, updatePassword)

/**
 * @swagger
 * /shop-manager/v1/user/update/picture:
 *  patch:
 *    summary: Update user profile picture
 *    description: Uploads a new profile picture for the authenticated user
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              profilePicture:
 *                type: string
 *                format: binary
 *                description: The profile picture file to upload
 *            required:
 *              - profilePicture
 *    responses:
 *      200:
 *        description: Profile picture updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: true
 *                message:
 *                  type: string
 *                  example: "Picture updated."
 *                profilePicture:
 *                  type: string
 *                  example: "new-pic.jpg"
 *      400:
 *        description: Bad request (e.g., no file uploaded)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  example: "File not found."
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  example: "Unauthorized"
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  example: "Error updating profile picture."
 *                error:
 *                  type: string
 *                  example: "Error details"
 */
router.patch(
  "/update/picture",
  uploadProfilePicture.single("profilePicture"),
  updateProfilePictureValidator,
  updateProfilePicture
)

// Admin-only routes

router.put("/admin/user/update/:uid", adminUpdateUserValidator, adminUpdateUser)

router.patch("/admin/user/update/password/:uid", adminUpdatePasswordValidator, adminUpdatePassword)

router.patch("/admin/user/update/picture/:uid", adminUpdateProfilePictureValidator, adminUpdateProfilePicture)

export default router
