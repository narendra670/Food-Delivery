import "dotenv/config"
import path from "path"
import { fileURLToPath } from "url"
import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { connectDB } from "./config/db.js"
import menuRoutes from "./routes/menuRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import contactRoutes from "./routes/contactRoutes.js"
import { notFound, errorHandler } from "./middleware/errorHandler.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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

const clientDistPath = path.resolve(__dirname, "..", "client", "dist")
app.use(express.static(clientDistPath))

app.get("/favicon.ico", (req, res) => res.status(204).end())

app.get(/^\/(?!api\/).*/, (req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"))
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
