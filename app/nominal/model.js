const mongoose = require("mongoose");

let nominalSchema = mongoose.Schema({
  cointQuantity: {
    type: Number,
    default: 0,
  },
  coitName: {
    type: String,
    required: [true, "Nama koin harus diisi"],
  },
  price: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Nominal", nominalSchema);
