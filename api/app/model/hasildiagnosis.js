const mongoose = require('mongoose');

const hasildiagnosisSchema = mongoose.Schema({
  pasien: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pasien"
  },
  kesimpulan: String,
  hasil_diagnosis_pak: String,
  rekomendasi: String,
  evaluasi: String
})

module.exports = mongoose.model("Hasildiagnosis", hasildiagnosisSchema)