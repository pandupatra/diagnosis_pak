const mongoose = require('mongoose');

const gejalaSchema = mongoose.Schema({
  pasien: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pasien"
  },
  gejala_tetanus: Number,
  gejala_tuberkulosis: Number,
  gejala_hepatitis_a: Number,
  gejala_hepatitis_c: Number
})

module.exports = mongoose.model("Gejala", gejalaSchema)