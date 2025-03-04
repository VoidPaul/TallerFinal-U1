import User from "../user/user.model.js"

export const userExists = async (uid = "") => {
  const exists = await User.findById(uid)

  if (!exists) {
    throw new Error("User does not exist.")
  }
}

export const emailExists = async (email = "") => {
  const exists = await User.findOne({ email })

  if (exists) {
    throw new Error(`E-mail ${email} is already in use.`)
  }
}

export const usernameExists = async (username = "") => {
  const exists = await User.findOne({ username })

  if (exists) {
    throw new Error(`Username ${username} is already in use.`)
  }
}
