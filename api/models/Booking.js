const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  place: {
    ref:'Place',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },

  checkOut: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  numberOfGuests: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const BookingModel = mongoose.model("Booking", bookingSchema);
module.exports = BookingModel;
