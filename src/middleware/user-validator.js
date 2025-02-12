import { body, param } from "express-validator"
// import { emailExists, usernameExists, userExists } from "../helpers/database-validator.js"
import { validateFields } from "./field-validator.js"
import { deleteFileOnError } from "./file-error-handler.js"
import { handleErrors } from "./error-handler.js"
//import
//import
//import

export const registerValidator = [
  body("name", "").notEmpty(),
  body("username", "").notEmpty(),
  //body("username", "").custom(usernameExists),
  body("email", "").isEmail(),
  //body("email", "").custom(emailExists),
  body("password", "").isStrongPassword(),
]

export const loginValidator = []
