import { Schema, model } from "mongoose"

const categorySchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name required."],
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timeStamps: true,
  }
)

categorySchema.methods.toJSON = function () {
  const { _id, ...category } = this.toObject()
  category.id = _id
  return category
}

export default model("Category", categorySchema)
