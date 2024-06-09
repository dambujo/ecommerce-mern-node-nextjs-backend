import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required,
    },
    quantity: {
      type: Number,
      min: 1,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { _id: false, timestamps: true }
)

const cancellationSchema = new mongoose.Schema(
  {
    reason: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { _id: false }
)

const returnSchema = new mongoose.Schema(
  {
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejectd'],
      default: 'pending',
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { _id: false }
)

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [orderItemSchema],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pendin', 'confirmed', 'shipped', 'deliverd', 'cancelled'],
      required: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String,
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'paypal', 'cash_on_delivery', 'mpesa', 'emola', 'mkesh'],
      required: true,
    },
    cancellation: cancellationSchema,
    return: returnSchema,
  },
  { timestamps: true }
)

export const Order = mongoose.model('Order', orderSchema)
