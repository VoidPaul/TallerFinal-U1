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
    const { category: categoryName } = req.body

    const validCategory = await Category.findOne({ name: categoryName })

    if (!validCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      })
    }

    const productCategory = validCategory._id
    const numericStock = Number(data.stock)
    let productPicture = req.file ? req.file.filename : null

    data.picture = productPicture
    data.category = productCategory
    data.creationDate = new Date()
    data.stock = numericStock

    const product = new Product(data)

    await product.save()

    const populatedProduct = await Product.findById(product._id).populate("category", "name")

    return res.status(201).json({
      message: "Product added successfully.",
      product: populatedProduct,
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
    const { category: categoryName } = req.body
    const data = req.body

    const oldProduct = await Product.findById(id)

    if (!oldProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      })
    }

    let categoryId = oldProduct.category

    if (categoryName) {
      const validCategory = await Category.findOne({ name: categoryName })
      if (!validCategory) {
        return res.status(404).json({
          success: false,
          message: "Category not found.",
        })
      }
      categoryId = validCategory._id
    }

    let newProductPic = req.file ? req.file.filename : null

    if (newProductPic && oldProduct.picture) {
      const oldProductPic = join(
        __dirname,
        "../../public/uploads/pictures/product",
        oldProduct.picture
      )
      await fs.unlink(oldProductPic)
    }

    const updateData = {
      ...oldProduct.toObject(),
      ...data,
      picture: newProductPic || oldProduct.picture,
      category: categoryId,
    }

    const newProduct = await Product.findByIdAndUpdate(id, updateData, { new: true })

    const product = await Product.findById(newProduct._id).populate("category", "name")

    return res.status(200).json({
      success: true,
      message: "Product updated.",
      product,
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
