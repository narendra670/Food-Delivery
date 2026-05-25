import { getStore } from "../data/store.js"

export const getCategories = (req, res) => {
  const { categories } = getStore()
  res.json({ success: true, count: categories.length, data: categories })
}

export const getMenuItems = (req, res) => {
  const { menuItems } = getStore()
  let { category, search, sortBy, page = 1, limit = 50 } = req.query
  let items = [...menuItems]

  if (category && category !== "all") {
    items = items.filter((i) => i.category === category)
  }

  if (search) {
    const q = search.toLowerCase()
    items = items.filter((i) => i.name.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q))
  }

  if (sortBy === "price-asc") items.sort((a, b) => a.price - b.price)
  else if (sortBy === "price-desc") items.sort((a, b) => b.price - a.price)
  else if (sortBy === "rating") items.sort((a, b) => b.rating - a.rating)

  const total = items.length
  page = Math.max(1, parseInt(page))
  limit = Math.max(1, Math.min(100, parseInt(limit)))
  const start = (page - 1) * limit
  const paginated = items.slice(start, start + limit)

  res.json({
    success: true,
    count: paginated.length,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    data: paginated,
  })
}

export const getMenuItemById = (req, res) => {
  const { menuItems } = getStore()
  const item = menuItems.find((i) => i.id === parseInt(req.params.id))
  if (!item) {
    return res.status(404).json({ success: false, message: "Menu item not found" })
  }
  res.json({ success: true, data: item })
}

export const getTestimonials = (req, res) => {
  const { testimonials } = getStore()
  res.json({ success: true, count: testimonials.length, data: testimonials })
}
