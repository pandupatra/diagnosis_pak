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
  pemeriksaan_penunjang: String,
  gejala_tetanus: Object,
  gejala_tuberkulosis: Object,
  gejala_hepatitis: Object,
  gejalaSubmitted: Boolean
})

module.exports = mongoose.model("Anamnesis", anamnesisSchema)