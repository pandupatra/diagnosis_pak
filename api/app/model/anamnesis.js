const mongoose = require('mongoose');

const anamnesisSchema = mongoose.Schema({
  pasien: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pasien"
  },
  pemeriksaan_fisik: String,
  tingkat_pernapasan: String,
  abdomen: String,
  tekanan_darah: String,
  pemeriksaan_penunjang: String
})

module.exports = mongoose.model("Anamnesis", anamnesisSchema)