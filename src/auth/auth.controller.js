import { hash, verify } from "argon2"
import User from "../user/user.model.js"
import { generateJWT } from "../helpers/jwt-generator.js"

export const register = async (req, res) => {
  try {
    const data = req.body

    let profilePicture = req.file ? req.file.filename : "default-pfp.png"
    const encryptedPassword = await hash(data.password)

    data.password = encryptedPassword
    data.profilePicture = profilePicture

    const user = await User.create(data)

    return res.status(201).json({
      message: "User registered successfuly.",
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
      return res.status(500).json({
        message: "Invalid Credentials.",
        error: "User does not exist.",
      })
    }

    const validPassword = await verify(user.password, password)

    if (!validPassword) {
      return res.status(500).json({
        message: "Invalid Credentials.",
        error: "Wrong password.",
      })
    }

    const token = await generateJWT(user.id)

    return res.status(200).json({
      message: "Login Successful.",
      userDetails: {
        token: token,
        profilePicture: user.profilePicture,
      },
    })
  } catch (err) {
    return res.status(500).json({
      message: "User registration failed.",
      error: err.message,
    })
  }
}
