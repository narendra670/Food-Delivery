import "dotenv/config"
import mongoose from "mongoose"
import Category from "../models/Category.js"
import MenuItem from "../models/MenuItem.js"
import Testimonial from "../models/Testimonial.js"
import { readFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

const loadJSON = (file) => {
  const data = readFileSync(join(__dirname, file), "utf-8")
  return JSON.parse(data)
}

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/flavordash")
    console.log("Connected to MongoDB")

    await Promise.all([
      Category.deleteMany({}),
      MenuItem.deleteMany({}),
      Testimonial.deleteMany({}),
    ])
    console.log("Cleared existing data")

    const [categories, menuItems, testimonials] = await Promise.all([
      Category.insertMany(loadJSON("categories.json")),
      MenuItem.insertMany(loadJSON("menuItems.json")),
      Testimonial.insertMany(loadJSON("testimonials.json")),
    ])
    console.log(`Seeded: ${categories.length} categories, ${menuItems.length} menu items, ${testimonials.length} testimonials`)

    await mongoose.disconnect()
    console.log("Done - disconnected from MongoDB")
    process.exit(0)
  } catch (err) {
    console.error("Seed error:", err.message)
    process.exit(1)
  }
}

seed()
