import { body } from "express-validator"
import { emailExists, usernameExists } from "../helpers/database-validator.js"
import { validateFields } from "./field-validator.js"
import { deleteFileOnError } from "./file-error-handler.js"
import { handleErrors } from "./error-handler.js"
//import
//import
//import

export const registerValidator = [
  body("name", "Name is required.").notEmpty(),
  body("username", "Username is required.").notEmpty(),
  body("email", "E-mail required.").notEmpty(),
  body("email", "Invalid e-mail.").isEmail(),
  body("email", "E-mail already in use.").custom(emailExists),
  body("username", "Username already in use.").custom(usernameExists),
  body("password", "W E A K   password.").isStrongPassword(),
  validateFields,
  deleteFileOnError,
  handleErrors,
]

export const loginValidator = [
  body("username", "Invalid username format.").optional().isString(),
  body("email", "Invalid e-mail.").optional().isEmail(),
  body("password", "Invalid password format.").isString(),
  validateFields,
  handleErrors,
]
