import { addOrder, getStore } from "../data/store.js"

export const createOrder = (req, res) => {
  const { customer, deliveryAddress, items, paymentMethod, notes } = req.body

  if (!customer?.name || !customer?.email) {
    return res.status(400).json({ success: false, message: "Customer name and email are required" })
  }
  if (!deliveryAddress?.street || !deliveryAddress?.city) {
    return res.status(400).json({ success: false, message: "Delivery address (street, city) is required" })
  }
  if (!items || !items.length) {
    return res.status(400).json({ success: false, message: "Order must contain at least one item" })
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const deliveryFee = subtotal >= 999 ? 0 : 49
  const total = parseFloat((subtotal + deliveryFee).toFixed(2))

  const order = addOrder({
    customer,
    deliveryAddress,
    items,
    subtotal: parseFloat(subtotal.toFixed(2)),
    deliveryFee,
    total,
    status: "pending",
    paymentMethod: paymentMethod || "cash",
    notes: notes || "",
    estimatedDelivery: "30-40 minutes",
  })

  res.status(201).json({ success: true, data: order })
}

export const getOrders = (req, res) => {
  const { orders } = getStore()
  const { email, status } = req.query
  let result = [...orders]

  if (email) result = result.filter((o) => o.customer?.email?.toLowerCase() === email.toLowerCase())
  if (status) result = result.filter((o) => o.status === status)

  res.json({ success: true, count: result.length, data: result })
}

export const getOrderById = (req, res) => {
  const { orders } = getStore()
  const order = orders.find((o) => o._id === req.params.id)
  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" })
  }
  res.json({ success: true, data: order })
}
