import { hash, verify } from "argon2"
import User from "../user/user.model.js"
import { generateJWT } from "../helpers/generateJWT.js"

export const register = async (req, res) => {
  try {
    const data = req.body

    let profilePicture = req.file ? req.file.filename : null
    const encryptedPassword = await hash(data.password)

    data.profilePicture = profilePicture
    data.password = encryptedPassword

    const user = await User.create(data)

    return res.status(200).json({
      message: "User registered successfully!",
      name: user.name,
      email: user.email,
    })
  } catch (err) {
    return res.status(500).json({
      message: "User registration failed.",
      error: err.message,
    })
  }
}

export const login = async (req, res) => {
  const { email, username, password } = req.body

  try {
    const user = await User.findOne({
      $or: [{ email: email }, { username: username }],
    })

    if (!user) {
    }

    const validPassword = await verify(user.password, password)

    if (!validPassword) {
    }

    const token = await generateJWT(user.id)

    return res.status(200).json({
      message: "Login successful!",
      userDetails: {
        token: token,
        profilePicture: user.profilePicture,
      },
    })
  } catch (err) {
    return res.status(500).json({
      message: "User login failed.",
      error: err.message,
    })
  }
}
