import { Router } from "express"
import { register, login } from "./auth.controller.js"
import { registerValidator, loginValidator } from "../middleware/validate-user.js"
import { uploadProfilePicture } from "../middleware/multer-uploads.js"

const router = Router()

/**
 * @swagger
 * /shop-manager/v1/auth/register:
 *  post:
 *    summary: Register a new user
 *    description: Creates a new user account with optional profile picture upload
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            allOf:
 *              - $ref: '#/components/schemas/User'
 *              - type: object
 *                properties:
 *                  profilePicture:
 *                  type: string
 *                  format: binary
 *                  description: Optional profile picture file (defaults to "default-pfp.png" if not provided)
 *          example:
 *            name: "John"
 *            lastName: "Doe"
 *            username: "dummy420"
 *            email: "john.doe@example.com"
 *            password: "securePass123"
 *            phone: "12345678"
 *            role: "USER"
 *    responses:
 *      201:
 *        description: User registered successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "User registered successfuly."
 *                name:
 *                  type: string
 *                  example: "John"
 *                email:
 *                  type: string
 *                  example: "john.doe@example.com"
 *      500:
 *        description: Internal server error (e.g., duplicate email/username)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "User registration failed."
 *                error:
 *                  type: string
 *                  example: "E11000 duplicate key error collection: users index: email_1"
 */
router.post("/register", uploadProfilePicture.single("profilePicture"), registerValidator, register)

/**
 * @swagger
 * /shop-manager/v1/auth/login:
 *  post:
 *    summary: Log in a user
 *    description: Authenticates a user and returns a JWT token
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: The user's email (optional if username is provided)
 *              username:
 *                type: string
 *                description: The user's username (optional if email is provided)
 *              password:
 *                type: string
 *                description: The user's password
 *            required:
 *              - password
 *            oneOf:
 *              - required: [email]
 *              - required: [username]
 *          example:
 *            email: "john.doe@example.com"
 *            password: "securePass123"
 *    responses:
 *      200:
 *        description: Login successful
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Login Successful."
 *                userDetails:
 *                  type: object
 *                  properties:
 *                    token:
 *                      type: string
 *                      description: JWT token for authentication
 *                      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                    profilePicture:
 *                      type: string
 *                      example: "default-pfp.png"
 *      500:
 *        description: Login failed (e.g., invalid credentials or server error)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Invalid Credentials."
 *                error:
 *                  type: string
 *                  example: "User does not exist."
 */
router.post("/login", loginValidator, login)

export default router
