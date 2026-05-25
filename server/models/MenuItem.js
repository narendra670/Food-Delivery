import mongoose from "mongoose"

const menuItemSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  desc: { type: String, required: true },
}, { timestamps: true })

export default mongoose.model("MenuItem", menuItemSchema)
