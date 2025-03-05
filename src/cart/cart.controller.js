import Product from "../product/product.model.js"
import Purchase from "../purchase/purchase.model.js"
import pdfkit from "pdfkit"
import fs from "fs/promises"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body
  const product = await Product.findById(productId)
  if (!product || product.status === false || product.stock < quantity) {
    return res.status(400).json({
      success: false,
      message: "Invalid product or insufficient stock."
    })
  }
  req.cart.items.push({ productId, quantity, price: product.price })
  return res.status(200).json({
    success: true,
    message: "Item added to cart.",
    cart: req.cart
  })
}

export const removeFromCart = async (req, res) => {
  const { productId } = req.params
  req.cart.items = req.cart.items.filter((item) => item.productId.toString() !== productId)
  return res.status(200).json({
    success: true,
    message: "Item removed from cart.",
    cart: req.cart
  })
}

export const checkout = async (req, res) => {
  const { items } = req.cart
  if (!items.length) {
    return res.status(400).json({
      success: false,
      message: "Cart is empty."
    })
  }

  const total = items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0).toFixed(2)
  const purchase = new Purchase({
    userId: req.user._id,
    items,
    total,
    status: "pending",
  })
  await purchase.save()

  const doc = new pdfkit()
  const filePath = join(__dirname, "../../public/receipts", `receipt_${purchase._id}.pdf`)
  doc.pipe(fs.createWriteStream(filePath))
  doc.text(
    `Receipt #${purchase._id}\nUser: ${req.user.name}\nTotal: $${total}\nItems: ${items
      .map((i) => `${i.quantity}x ${i.productId}`)
      .join(", ")}`
  )
  doc.end()
  await new Promise((resolve) => doc.on("finish", resolve))

  purchase.filePath = filePath
  purchase.status = "completed"
  await purchase.save()

  req.cart.items = []
  return res.status(200).json({
    success: true, message: "Purchase completed.",
    purchaseId: purchase.id
  })
}
