import { body, param } from "express-validator"
import { categoryExists, productExists, productNameExists } from "../helpers/validate-database.js"
import { validateJWT, validateRoles } from "./validate-jwt.js"
import { validateFields } from "./field-error-handler.js"
import { deleteFileOnError } from "./file-error-handler.js"
import { handleErrors } from "./error-handler.js"

export const addProductValidator = [
  validateJWT,
  validateRoles("ADMIN"),
  body("name", "Product name is required.").notEmpty(),
  body("name").custom(productNameExists),
  body("description", "Product description is required.").notEmpty(),
  body("category", "Valid product category is required.").isMongoId().notEmpty(),
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
  param("id").custom(productNameExists),
  body("name", "Product name is required.").optional().notEmpty(),
  body("description", "Product description is required.").optional().notEmpty(),
  body("category", "Valid product category is required.").optional().isMongoId(),
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
