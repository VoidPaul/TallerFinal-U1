import Purchase from "./purchase.model.js"

export const getPurchaseHistory = async (req, res) => {
  try {
    const purchases = await Purchase.find({ userId: req.user._id, status: "completed" })
    return res.status(200).json({
      success: true,
      purchases,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error fetching history.",
      error: err.message,
    })
  }
}
