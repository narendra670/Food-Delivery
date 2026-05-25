import "dotenv/config"
import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { connectDB } from "./config/db.js"
import menuRoutes from "./routes/menuRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import contactRoutes from "./routes/contactRoutes.js"
import { notFound, errorHandler } from "./middleware/errorHandler.js"

const app = express()
const PORT = process.env.PORT || 5000

app.use(helmet())
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
}))
app.use(express.json({ limit: "10kb" }))
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"))
}

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "FlavorDash API is running",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  })
})

app.use("/api/menu", menuRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/contact", contactRoutes)

app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to FlavorDash API",
    version: "1.0.0",
    endpoints: {
      health: "GET /api/health",
      categories: "GET /api/menu/categories",
      menuItems: "GET /api/menu/items",
      menuItem: "GET /api/menu/items/:id",
      testimonials: "GET /api/menu/testimonials",
      orders: "POST /api/orders | GET /api/orders | GET /api/orders/:id",
      contact: "POST /api/contact",
      subscribe: "POST /api/contact/subscribe",
    },
  })
})

app.use(notFound)
app.use(errorHandler)

const startServer = async () => {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`)
  })
}

startServer()
