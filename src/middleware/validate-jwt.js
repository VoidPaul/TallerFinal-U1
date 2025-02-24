import User from "../user/user.model.js"
import jwt from "jsonwebtoken"

export const validateJWT = async (req, res, next) => {
  try {
    let token = req.body.token || req.query.token || req.headers["authorization"]

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token wasn't provided.",
        error: err.message,
      })
    }

    token = token.replace(/^Bearer\s+/, "")

    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
    const verifiedUser = await User.findById(uid)

    if (!verifiedUser) {
      return res.status(400).json({
        success: false,
        message: "User does not exist.",
      })
    }

    if (!verifiedUser.status) {
      return res.status(400).json({
        success: false,
        message: "User disabled.",
      })
    }

    req.user = verifiedUser
    next()
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Couldn't validate token.",
      error: err.message,
    })
  }
}
