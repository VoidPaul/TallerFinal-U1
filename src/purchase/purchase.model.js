import { Schema, model } from "mongoose"

const purchaseSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        price: { type: String, required: true },
      },
    ],
    total: { type: String, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ["pending", "completed"], default: "completed" },
    filePath: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

purchaseSchema.methods.toJSON = function () {
  const { _id, ...purchase } = this.toObject()
  purchase.id = _id
  return purchase
}

export default model("Purchase", purchaseSchema)
