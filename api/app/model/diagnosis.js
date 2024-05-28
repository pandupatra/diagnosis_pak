const mongoose = require('mongoose');

const diagnosisSchema = mongoose.Schema({
  pasien: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pasien"
  },
  waktu_timbul_gejala: String,
  pemeriksaan_prakerja: String,
  hasil_diagnosis_klinis: String
})

module.exports = mongoose.model("Diagnosis", diagnosisSchema)