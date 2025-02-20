"use strict"

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./database.js"
import authRoutes from "../src/auth/auth.routes.js"
import apiLimiter from "../src/middleware/rate-limit.js"

const middlewares = (app) => {
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
  app.use(cors())
  app.use(helmet())
  app.use(morgan("dev"))
  app.use(apiLimiter)
}

const routes = (app) => {
  app.use("/shop-manager/v1/auth", authRoutes)
}

const connectDB = async () => {
  try {
    await dbConnection()
  } catch (err) {
    console.log(`Server  | Database connection failed: ${err}`)
    process.exit(1)
  }
}

export const initServer = () => {
  const app = express()
  try {
    middlewares(app)
    connectDB()
    routes(app)
    app.listen(process.env.PORT)
    console.log(`Server  | Running on port ${process.env.PORT}`)
  } catch (err) {
    console.log(`Server  | Init failed: ${err}`)
  }
}
