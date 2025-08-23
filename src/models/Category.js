import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: { // ✅ Matches what you'll save
    type: String,
    required: true,
  },
});

export default mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);
