import Product from "./product.model.js"
import fs from "fs/promises"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

const addProduct = async (req, res) => {
  try {
    const data = req.body

    let productPicture = req.file ? req.file.filename : null

    data.productPicture = productPicture

    const product = await Product.create(data)

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

const getProduct = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error getting product.",
      error: err.message,
    })
  }
}

const getProducts = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error listing products.",
      error: err.message,
    })
  }
}

const updateProduct = async (id, req, res) => {
  try {
    const data = req.body
    let newProductPic = req.file ? req.file.filename : null

    const oldProductPic = join(__dirname, "../../public/uploads/pictures/product", product.picture)
    await fs.unlink(oldProductPic)

    const product = await Product.findByIdAndUpdate(id, data, { new: true })

    product.picture = newProductPic

    await product.save()

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      })
    }

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

const removeProduct = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error removing product.",
      error: err.message,
    })
  }
}
