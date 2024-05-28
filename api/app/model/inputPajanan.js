const mongoose = require('mongoose');

const inputpajananSchema = mongoose.Schema({
  pasien: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pasien"
  },
  deskripsi_pekerjaan: String,
  periode_waktu: String,
  pajanan: String,
  produk: String,
  bahan: String,
  cara_kerja: String,
  proses_kerja: String,
  riwayat_kecelakaan_kerja: String,
  apd: String,
})

module.exports = mongoose.model("Inputpajanan", inputpajananSchema)