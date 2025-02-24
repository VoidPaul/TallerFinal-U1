import { hash, verify } from "argon2"
import User from "./user.model.js"
import fs from "fs/promises"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

export const getUserById = async (req, res) => {
  try {
    const { uid } = req.params

    const user = await User.findById(uid)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      })
    }

    return res.status(200).json({
      success: true,
      user,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error getting user.",
      error: err.message,
    })
  }
}

export const updateUser = async (req, res) => {
  try {
    const uid = req.user._id
    const data = req.body

    const user = await User.findByIdAndUpdate(uid, data, { new: true })

    return res.status(200).json({
      success: true,
      message: "User updated.",
      user,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error updating user.",
      error: err.message,
    })
  }
}

export const updatePassword = async (req, res) => {
  try {
    const uid = req.user._id
    const { newPassword } = req.body

    const user = await User.findById(uid)

    const samePassword = await verify(user.password, newPassword)

    if (samePassword) {
      return res.status(400).json({
        success: false,
        message: "New password cannot be the same as previous one.",
      })
    }

    const encryptedPassword = await hash(newPassword)

    await User.findByIdAndUpdate(uid, { password: encryptedPassword }, { new: true })

    return res.status(200).json({
      success: true,
      message: "Password updated.",
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error changing password.",
      error: err.message,
    })
  }
}

export const updateProfilePicture = async (req, res) => {
  try {
    const uid = req.user._id

    let newProfilePic = req.file ? req.file.filename : "default-pfp.png"

    if (!newProfilePic) {
      return res.status(400).json({
        success: false,
        message: "File not found.",
      })
    }

    const user = await User.findById(uid)

    if (user.profilePicture && user.profilePicture !== "default-pfp.png") {
      const oldProfilePic = join(__dirname, "../../public/uploads/pictures/profile", user.profilePicture)

      fs.unlink(oldProfilePic)
    }

    user.profilePicture = newProfilePic

    await user.save()

    return res.status(200).json({
      success: true,
      message: "Picture updated.",
      profilePicture: user.profilePicture,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error updating profile picture.",
      error: err.message,
    })
  }
}
