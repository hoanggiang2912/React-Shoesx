const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  idUser: {
    type: ObjectId,
    required: true,
    ref: "users",
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
  subTotal: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "processing",
  },
  note: {
    type: String,
    default: "none",
  },
  paymentStatus: {
    type: String,
    default: "pending",
  },
  deliveryStatus: {
    type: String,
    default: "pending",
  },
  shippingMethod: {
    type: String,
    required: true,
    default: "standard",
  },
  shippingFee: {
    type: Number,
    required: true,
    default: 0,
  },
  paymentMethod: {
    type: String,
    required: true,
    default: "cash",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("bills", billSchema);
