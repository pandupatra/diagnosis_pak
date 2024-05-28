const mongoose = require('mongoose');

const pajananSchema = mongoose.Schema({
  pasien: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pasien"
  },
  deskripsi_lingkungan_kerja: String,
  lama_kerja: String,
  masa_kerja: String,
  data_plk: String,
  data_monitoring_biologis: String
})

module.exports = mongoose.model("Pajanan", pajananSchema)