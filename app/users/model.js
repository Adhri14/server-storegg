const mongoose = require("mongoose");

let userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email harus diisi"],
    },
    name: {
      type: String,
      required: [true, "Nama harus diisi"],
    },
    password: {
      type: String,
      required: [true, "Kata sandi harus diisi"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "admin",
    },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
    phoneNumber: {
      type: String,
      required: [true, "Nomor telepon harus diisi"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
