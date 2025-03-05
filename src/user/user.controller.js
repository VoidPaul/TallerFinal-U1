import { hash, verify } from "argon2"
import User from "./user.model.js"
import fs from "fs/promises"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

// Update logic

const updateUserData = async (uid, data, res) => {
  try {
    const user = await User.findByIdAndUpdate(uid, data, { new: true })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      })
    }

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

const updateUserPassword = async (uid, newPassword, res) => {
  try {
    const user = await User.findById(uid)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      })
    }

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

const updateUserProfilePicture = async (uid, req, res) => {
  try {
    let newProfilePic = req.file ? req.file.filename : "default-pfp.png"

    if (!newProfilePic) {
      return res.status(400).json({
        success: false,
        message: "File not found.",
      })
    }

    const user = await User.findById(uid)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      })
    }

    if (user.profilePicture && user.profilePicture !== "default-pfp.png") {
      const oldProfilePic = join(__dirname, "../../public/uploads/pictures/profile", user.profilePicture)
      await fs.unlink(oldProfilePic)
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

const disableUserStatus = async (uid, req, res) => {
  try {
    await User.findByIdAndUpdate(uid, { status: false })

    return res.status(200).json({
      success: true,
      message: "User removed successfuly.",
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error removing user.",
      error: err,
    })
  }
}

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

// Function calling with different parameters for normal users and admins

export const updateUser = async (req, res) => {
  await updateUserData(req.user._id, req.body, res)
}

export const updatePassword = async (req, res) => {
  await updateUserPassword(req.user._id, req.body.newPassword, res)
}

export const updateProfilePicture = async (req, res) => {
  await updateUserProfilePicture(req.user._id, req, res)
}

export const removeUser = async (req, res) => {
  await disableUserStatus(req.user._id, req, res)
}

export const adminUpdateUser = async (req, res) => {
  await updateUserData(req.params.uid, req.body, res)
}

export const adminUpdatePassword = async (req, res) => {
  await updateUserPassword(req.params.uid, req.body.newPassword, res)
}

export const adminUpdateProfilePicture = async (req, res) => {
  await updateUserProfilePicture(req.params.uid, req, res)
}

export const adminRemoveUser = async (req, res) => {
  await disableUserStatus(req.params.uid, req, res)
}
