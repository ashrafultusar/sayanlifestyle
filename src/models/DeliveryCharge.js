import mongoose from 'mongoose';

const deliveryChargeSchema = new mongoose.Schema(
  {
    insideDhaka: {
      type: Number,
      required: true,
    },
    outsideDhaka: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.DeliveryCharge ||
  mongoose.model('DeliveryCharge', deliveryChargeSchema);
