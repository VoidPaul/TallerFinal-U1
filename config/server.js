"use strict"

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./database.js"
import authRoutes from "../src/auth/auth.routes.js"
import userRoutes from "../src/user/user.routes.js"
import productRoutes from "../src/product/product.routes.js"
import categoryRoutes from "../src/category/category.routes.js"
import apiLimiter from "../src/middleware/rate-limit.js"
import { defaultAdmin, defaultCategory } from "../src/helpers/generate-defaults.js"
import { swaggerDocs, swaggerUi } from "./swagger.js"

const middlewares = (app) => {
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  )
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", `http://localhost:${process.env.PORT}`],
          connectSrc: ["'self'", `http://localhost:${process.env.PORT}`],
          imgSrc: ["'self'", "data:"],
          styleSrc: ["'self'", "'unsafe-inline'"],
        },
      },
    })
  )
  app.use(morgan("dev"))
  app.use(apiLimiter)
}

const routes = (app) => {
  app.use("/shop-manager/v1/auth", authRoutes)
  app.use("/shop-manager/v1/user", userRoutes)
  app.use("/shop-manager/v1/product", productRoutes)
  app.use("/shop-manager/v1/category", categoryRoutes)
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

const connectDB = async () => {
  try {
    defaultAdmin()
    defaultCategory()
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
