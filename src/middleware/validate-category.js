import { body, param } from "express-validator"
import { categoryExists, categoryNameExists } from "../helpers/database-validator.js"
import { validateJWT, validateRoles } from "./validate-jwt.js"
import { validateFields } from "./field-error-handler.js"
import { handleErrors } from "./error-handler.js"

export const newCategoryValidator = [
  validateJWT,
  validateRoles("ADMIN"),
  body("name", "Name required.").notEmpty(),
  body("name").custom(categoryNameExists),
  validateFields,
  handleErrors,
]

export const updateCategoryValidator = [
  validateJWT,
  validateRoles("ADMIN"),
  param("id", "Invalid MongoDB ID.").isMongoId(),
  param("id").custom(categoryExists),
  validateFields,
  handleErrors,
]

export const removeCategoryValidator = [
  validateJWT,
  validateRoles("ADMIN"),
  param("id", "Invalid MongoDB ID.").isMongoId(),
  param("id").custom(categoryExists),
  validateFields,
  handleErrors,
]
