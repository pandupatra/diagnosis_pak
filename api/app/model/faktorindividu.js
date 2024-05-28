const mongoose = require('mongoose');

const faktorindividuSchema = mongoose.Schema({
  pasien: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pasien"
  },
  kebiasaan: String,
  riwayat_penyakit_genetik: String,
  riwayat_atopi: String,
  penyakit_penyerta: String
})

module.exports = mongoose.model("Faktorindividu", faktorindividuSchema)