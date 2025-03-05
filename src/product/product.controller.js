import Product from "./product.model.js"
import Category from "../category/category.model.js"
import fs from "fs/promises"
import { join, dirname } from "path"
import { fileURLToPath } from "url"
import { getSortOptions } from "../helpers/sort-products.js"

const __dirname = dirname(fileURLToPath(import.meta.url))

export const addProduct = async (req, res) => {
  try {
    const data = req.body
    const { category } = req.body

    const productCategory = Category.findOne({ _id: category })

    if (!productCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      })
    }

    let productPicture = req.file ? req.file.filename : null
    const numericStock = Number(data.stock)

    data.picture = productPicture
    data.creationDate = new Date()
    data.stock = numericStock

    const product = new Product({ ...data, category })

    await product.save()

    return res.status(201).json({
      message: "Product added successfuly.",
      productName: product.name,
      productCategory: product.category.name,
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
  const { limit = 10, from = 0, name } = req.query
  const isActive = { status: true }

  try {
    let query = { ...isActive }

    if (name) {
      query.name = { $regex: new RegExp(name, "i") }
    }

    const [total, products] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query)
        .populate("category", "name")
        .sort(getSortOptions(req))
        .skip(Number(from))
        .limit(Number(limit)),
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
    const { category } = req.body
    const data = req.body

    const product = await Product.findById(id)

    const newCategory = await Category.findOne({ _id: category })

    let newProductPic = req.file ? req.file.filename : null

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      })
    }

    if (!newProductPic) {
      return res.status(404).json({
        success: false,
        message: "File not found.",
      })
    }

    if (newProductPic && product.picture) {
      const oldProductPic = join(__dirname, "../../public/uploads/pictures/product", product.picture)
      await fs.unlink(oldProductPic)
    }

    const updateData = {
      ...data,
      picture: newProductPic || product.picture,
      category: category || product.category,
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true })

    return res.status(200).json({
      success: true,
      message: "Product updated.",
      product: updatedProduct,
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
