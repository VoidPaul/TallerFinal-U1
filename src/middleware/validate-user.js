import { body, param } from "express-validator"
import { userExists, usernameExists, emailExists } from "../helpers/validate-database.js"
import { validateJWT, validateRoles } from "./validate-jwt.js"
import { validateFields } from "./field-error-handler.js"
import { deleteFileOnError } from "./file-error-handler.js"
import { handleErrors } from "./error-handler.js"

// General Authentication

export const registerValidator = [
  body("name", "Name required.").notEmpty(),
  body("username", "Username is required.").notEmpty(),
  body("username").custom(usernameExists),
  body("email", "E-mail required.").notEmpty(),
  body("email", "Enter a valid e-mail.").isEmail(),
  body("email").custom(emailExists),
  body("password", "W E A K password.").isStrongPassword(),
  validateFields,
  deleteFileOnError,
  handleErrors,
]

export const loginValidator = [
  body("username", "Invalid username format.").optional().isString(),
  body("email", "Enter a valid e-mail.").optional().isEmail(),
  body("password", "Invalid password.").isLength({ min: 8 }),
  validateFields,
  handleErrors,
]

// General Validations

export const getUserByIdValidator = [
  param("uid", "Invalid MongoDB ID.").isMongoId(),
  param("uid").custom(userExists),
  validateFields,
  handleErrors,
]

export const updateUserValidator = [
  validateJWT,
  body("name", "Name required.").optional().notEmpty(),
  body("username", "Username is required.").optional().notEmpty(),
  body("username").optional().custom(usernameExists),
  body("email", "E-mail required.").optional().notEmpty(),
  body("email", "Enter a valid e-mail.").optional().isEmail(),
  body("email").optional().custom(emailExists),
  validateFields,
  deleteFileOnError,
  handleErrors,
]

export const updatePasswordValidator = [
  validateJWT,
  body("newPassword", "New password cannot be W E A K.").isStrongPassword(),
  validateFields,
  handleErrors,
]

export const updateProfilePictureValidator = [validateJWT, validateFields, deleteFileOnError, handleErrors]

// Admin-only Validations

export const adminUpdateUserValidator = [
  validateJWT,
  validateRoles("ADMIN"),
  param("uid", "Invalid MongoDB ID.").isMongoId(),
  param("uid").custom(userExists),
  body("name", "Name required.").optional().notEmpty(),
  body("username", "Username is required.").optional().notEmpty(),
  body("username").optional().custom(usernameExists),
  body("email", "E-mail required.").optional().notEmpty(),
  body("email", "Enter a valid e-mail.").optional().isEmail(),
  body("email").optional().custom(emailExists),
  validateFields,
  deleteFileOnError,
  handleErrors,
]

export const adminUpdatePasswordValidator = [
  validateJWT,
  validateRoles("ADMIN"),
  param("uid", "Invalid MongoDB ID.").isMongoId(),
  param("uid").custom(userExists),
  body("newPassword", "New password cannot be W E A K.").isStrongPassword(),
  validateFields,
  handleErrors,
]

export const adminUpdateProfilePictureValidator = [
  validateJWT,
  validateRoles("ADMIN"),
  param("uid", "Invalid MongoDB ID.").isMongoId(),
  param("uid").custom(userExists),
  validateFields,
  deleteFileOnError,
  handleErrors,
]
