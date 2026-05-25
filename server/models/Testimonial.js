import mongoose from "mongoose"

const testimonialSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  avatar: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  text: { type: String, required: true },
}, { timestamps: true })

export default mongoose.model("Testimonial", testimonialSchema)
