import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
}, { timestamps: true })

export default mongoose.model("Category", categorySchema)
