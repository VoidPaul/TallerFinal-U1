import Product from "./product.model.js"
import fs from "fs/promises"
import { join, dirname } from "path"
import { fileURLToPath } from "url"
import { getSortOptions } from "../helpers/sort-products.js"

const __dirname = dirname(fileURLToPath(import.meta.url))

export const addProduct = async (req, res) => {
  try {
    const data = req.body
    const category = req.body

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      })
    }

    let productPicture = req.file ? req.file.filename : null

    data.picture = productPicture

    const product = new Product({ ...data, category: category })

    await product.save()

    return res.status(201).json({
      message: "Product added successfuly.",
      productName: product.name,
      price: product.price,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error adding product.",
      error: err.message,
    })
  }
}

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params

    const product = await Product.findById(id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      })
    }

    return res.status(200).json({
      success: true,
      product,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error getting product.",
      error: err.message,
    })
  }
}

export const getProducts = async (req, res) => {
  const { limit = 10, from = 0 } = req.query
  const isActive = { status: true }

  try {
    const [total, products] = await Promise.all([
      Product.countDocuments(),
      Product.find(isActive).sort(getSortOptions(req)).skip(Number(from)).limit(Number(limit)),
    ])

    return res.status(200).json({
      success: true,
      total,
      products,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error listing products.",
      error: err.message,
    })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body
    const category = req.body

    let newProductPic = req.file ? req.file.filename : null

    if (!newProductPic) {
      return res.status(400).json({
        success: false,
        message: "File not found.",
      })
    }

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      })
    }

    const oldProductPic = join(__dirname, "../../public/uploads/pictures/product", product.picture)
    await fs.unlink(oldProductPic)

    data.picture = newProductPic

    const product = new Product({ ...data, category: category })

    await product.findByIdAndUpdate(id)

    return res.status(200).json({
      success: true,
      message: "User updated.",
      product: product,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error updating product.",
      error: err.message,
    })
  }
}

export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params

    await Product.findByIdAndUpdate(id, { status: false })

    return res.status(200).json({
      success: true,
      message: "User removed successfuly.",
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error removing product.",
      error: err.message,
    })
  }
}
