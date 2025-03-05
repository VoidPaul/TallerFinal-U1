import { body, param } from "express-validator"
import { productExists } from "../helpers/validate-database.js"
import { validateJWT, validateRoles } from "./validate-jwt.js"
import { validateFields } from "./field-error-handler.js"
import { deleteFileOnError } from "./file-error-handler.js"
import { handleErrors } from "./error-handler.js"

export const addProductValidator = [
  validateJWT,
  validateRoles("ADMIN"),
  body("name", "Product name is required.").notEmpty(),
  body("name").custom(productExists),
  body("description", "Product description is required.").notEmpty(),
  body("category", "Product category is required.").notEmpty(),
  body("picture", "Product picture is required.").notEmpty(),
  body("price", "Product price is required.").notEmpty(),
  body("stock", "Product stock is required.").notEmpty(),
  body("stock", "Stock must be a number.").isNumeric(),
  validateFields,
  deleteFileOnError,
  handleErrors,
]

export const getProductByIdValidator = [
  param("id", "Invalid MongoDB ID.").isMongoId(),
  param("id").custom(productExists),
  validateFields,
  handleErrors,
]

export const updateProductValidator = [
  validateJWT,
  validateRoles("ADMIN"),
  param("id", "Invalid MongoDB ID.").isMongoId(),
  param("id").custom(productExists),
  body("name", "Product name is required.").optional().notEmpty(),
  body("name").optional().custom(productExists),
  body("description", "Product description is required.").optional().notEmpty(),
  body("category", "Product category is required.").optional().notEmpty(),
  body("picture", "Product picture is required.").optional().notEmpty(),
  body("price", "Product price is required.").optional().notEmpty(),
  body("stock", "Product stock is required.").optional().notEmpty(),
  body("stock", "Stock must be a number.").optional().isNumeric(),
  validateFields,
  deleteFileOnError,
  handleErrors,
]

export const removeProductValidator = [
  validateJWT,
  validateRoles("ADMIN"),
  param("id", "Invalid MongoDB ID.").isMongoId(),
  param("id").custom(productExists),
  validateFields,
  handleErrors,
]
