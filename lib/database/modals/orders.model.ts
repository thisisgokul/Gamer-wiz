import mongoose, { model, models } from "mongoose";

const orderSchema = new mongoose.Schema({
  picture: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  price: { type: String, required: true },
});

const Orders = models?.Orders || model("Orders", orderSchema);

export default Orders;
