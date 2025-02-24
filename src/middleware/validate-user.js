import { body, param } from "express-validator"
import { userExists, usernameExists, emailExists } from "../helpers/database-validator.js"
import { validateJWT } from "./validate-jwt.js"
import { validateFields } from "./field-error-handler.js"
import { deleteFileOnError } from "./file-error-handler.js"
import { handleErrors } from "./error-handler.js"

export const registerValidator = [
  body("name", "Name required.").notEmpty(),
  body("username", "Username is required.").notEmpty(),
  body("username", "Username already in use.").custom(usernameExists),
  body("email", "E-mail required.").notEmpty(),
  body("email", "Enter a valid e-mail.").isEmail(),
  body("email", "E-mail already in use.").custom(emailExists),
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

export const getUserByIdValidator = [
  param("uid", "Invalid MongoDB ID.").isMongoId(),
  param("uid").custom(userExists),
  validateFields,
  handleErrors,
]

export const updateUserValidator = [
  validateJWT,
  body("username", "Username already in use.").custom(usernameExists),
  validateFields,
  handleErrors,
]

export const updatePasswordValidator = [
  validateJWT,
  body("newPassword", "New password cannot be W E A K.").isStrongPassword(),
  validateFields,
  handleErrors,
]

export const updateProfilePictureValidator = [validateJWT, validateFields, deleteFileOnError, handleErrors]
