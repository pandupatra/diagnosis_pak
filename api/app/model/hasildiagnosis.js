const mongoose = require('mongoose');

const hasildiagnosisSchema = mongoose.Schema({
  pasien: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pasien"
  },
  kesimpulan: String,
  rekomendasi: String,
  evaluasi: String
})

module.exports = mongoose.model("Hasildiagnosis", hasildiagnosisSchema)