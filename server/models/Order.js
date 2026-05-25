import mongoose from "mongoose"

const orderItemSchema = new mongoose.Schema({
  menuItemId: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true, min: 1 },
  image: { type: String },
})

const orderSchema = new mongoose.Schema({
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
  },
  deliveryAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String },
  },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  deliveryFee: { type: Number, default: 2.99 },
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "confirmed", "preparing", "out-for-delivery", "delivered", "cancelled"],
    default: "pending",
  },
  paymentMethod: { type: String, default: "cash" },
  notes: { type: String },
  estimatedDelivery: { type: String },
}, { timestamps: true })

export default mongoose.model("Order", orderSchema)
