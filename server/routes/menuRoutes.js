import { Router } from "express"
import { getCategories, getMenuItems, getMenuItemById, getTestimonials } from "../controllers/menuController.js"

const router = Router()

router.get("/", (req, res) => {
  res.redirect("/api/menu")
})

router.get("/categories", getCategories)
router.get("/items", getMenuItems)
router.get("/items/:id", getMenuItemById)
router.get("/testimonials", getTestimonials)

export default router
