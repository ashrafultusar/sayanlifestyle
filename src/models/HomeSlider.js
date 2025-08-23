// models/HomeSlider.js
import mongoose from "mongoose";

const HomeSliderSchema = new mongoose.Schema(
  {
    sliderImages: [String],
    rightImageTop: String,
    rightImageBottom: String,
  },
  { timestamps: true }
);

export default mongoose.models.HomeSlider || mongoose.model("HomeSlider", HomeSliderSchema);
