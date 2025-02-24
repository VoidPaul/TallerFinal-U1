import { Schema, model } from "mongoose"

const userSchema = Schema(
  {
    name: {
      type: String,
      maxLength: 25,
      required: [true, "Name requried."],
    },
    lastName: {
      type: String,
      maxLength: 25,
      required: [true, "Last name required."],
    },
    username: {
      type: String,
      unique: true,
      minLength: 5,
      maxLength: 25,
      required: [true, "Username required."],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "E-mail required."],
    },
    password: {
      type: String,
      required: [true, "Password required."],
    },
    phone: {
      type: String,
      minLength: 8,
      maxLength: 10,
    },
    profilePicture: {
      type: String,
      default: "default-pfp.png",
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      required: true,
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

userSchema.methods.toJSON = function () {
  const { password, _id, ...user } = this.toObject()
  user.uid = _id
  return user
}

export default model("User", userSchema)
