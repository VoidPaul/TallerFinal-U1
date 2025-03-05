"use strict"

import mongoose from "mongoose"

export const dbConnection = async () => {
  try {
    mongoose.connection.on("error", () => {
      console.log("MongoDB | Could not connect to MongoDB")
      mongoose.disconnect()
    })
    mongoose.connection.on("connecting", () => {
      console.log("MongoDB | Connecting to MongoDB")
    })
    mongoose.connection.on("connected", () => {
      console.log("MongoDB | Connected to MongoDB")
    })
    mongoose.connection.on("open", () => {
      console.log("MongoDB | Connnected to Database")
    })
    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB | Reconnected to MongoDB")
    })
    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB | Disconnected from MongoDB")
    })

    await mongoose.connect(process.env.URI_MONGO, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 50,
    })
  } catch (err) {
    console.log(`MongoDB | Database connection failed: ${err}`)
  }
}
