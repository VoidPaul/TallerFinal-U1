import { Schema, model } from "mongoose"

const productSchema = Schema(
  {
    name: {
      type: String,
      maxLength: 50,
      unique: true,
      required: [true, "Product name required."],
    },
    description: {
      type: String,
      required: [true, "Product description required."],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product category requried."],
    },
    picture: {
      type: String,
      required: [true, "Product picture required."],
    },
    creationDate: {
      type: Date,
      required: [true, "Creation date required."],
    },
    price: {
      type: String,
      required: [true, "Product price required."],
    },
    stock: {
      type: Number,
      required: [true, "Stock required."],
      default: 0,
    },
    sold: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

productSchema.methods.toJSON = function () {
  const { _id, ...product } = this.toObject()
  product.id = _id
  return product
}

export default model("Product", productSchema)
