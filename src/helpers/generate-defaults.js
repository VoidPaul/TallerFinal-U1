import User from "../user/user.model.js"
import Category from "../category/category.model.js"
import { hash } from "argon2"

export const defaultAdmin = async () => {
  const admin = await User.findOne({ role: "ADMIN" })
  if (!admin) {
    const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || "Admin123!"
    const hashedPassword = await hash(defaultPassword)
    await User.create({
      name: "Default Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "ADMIN",
      status: true,
    })
    console.log("Users   | Default admin user created. Password: ", defaultPassword)
    console.log("Users   | Please change the default password after first login!")
  }
}

export const defaultCategory = async () => {
  const defaultCategory = await Category.findOne({ name: "Other" })
  if (!defaultCategory) {
    await Category.create({ name: "Other", status: true })
    console.log("Category| Default category created named 'Other'")
  }
}