import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import { userSchema } from "./schemas.js"

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Shop Manager API",
      version: "1.0.0",
      description: "API de administración y gestión de tiendas en línea.",
      contact: {
        name: "Paulo Alvarez",
        email: "palvarez-2023238@kinal.edu.gt",
      },
    },
    servers: [
      {
        url: "http://127.0.0.1:3000/shop-manager/v1",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: userSchema,
      },
    },
  },
  apis: [
    "./src/auth/auth.routes.js",
    "./src/user/user.routes.js",
  ],
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi }
