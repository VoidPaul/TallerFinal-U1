import Purchase from "./purchase.model.js"
import Product from "../product/product.model.js"
import User from "../user/user.model.js"

export const getPurchaseHistory = async (req, res) => {
  try {
    const { limit = 10, from = 0 } = req.query
    const purchases = await Purchase.find({ userId: req.user._id, status: "completed" })
      .sort({ date: -1 })
      .skip(Number(from))
      .limit(Number(limit))
      .populate("userId", "name")
      .populate("items.productId", "name")

    const total = await Purchase.countDocuments({ userId: req.user._id, status: "completed" })

    return res.status(200).json({
      success: true,
      total,
      purchases,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error fetching purchase history.",
      error: err.message,
    })
  }
}
