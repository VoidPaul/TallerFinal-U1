import User from "../user/user.model.js"
import Product from "../product/product.model.js"
import Category from "../category/category.model.js"

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

export const productExists = async (id = "") => {
  const exists = await Product.findOne({ id })

  if (!exists) {
    throw new Error("Product does not exist.")
  }
}

export const productNameExists = async (name = "") => {
  const exists = await Product.findOne({ name })

  if (exists) {
    throw new Error(`Product "${name}" already exists.`)
  }
}

export const categoryExists = async (id = "") => {
  const exists = await Category.findOne({ id })

  if (!exists) {
    throw new Error("Category does not exist")
  }
}

export const categoryNameExists = async (name = "") => {
  const exists = await Category.findOne({ name })

  if (exists) {
    throw new Error(`Category "${name}" already exists.`)
  }
}
