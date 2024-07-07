const mongoose = require('mongoose');

const pasienSchema = new mongoose.Schema({
  nama: {
    type: String,
  },
  jenis_kelamin: {
    type: String,
  },
  tahun_masuk: {
    type: String,
  },
  no_riwayat_medis: {
    type: Number,
  },
  golongan_darah: {
    type: String,
  },
  tinggi_badan: {
    type: Number
  },
  berat_badan: {
    type: Number
  },
  no_telepon: {
    type: Number,
  },
  alamat: {
    type: String,
  },
  agama: {
    type: String,
  },
  pekerjaan: {
    type: String,
  },
  tanggal_lahir: {
    type: Date,
  },
  nip: {
    type: Number,
  },
  nik: {
    type: Number,
    require: true
  },
  skenario: {
    type: String
  }
},
{
  timestamps: true
})

module.exports = mongoose.model("Pasien", pasienSchema)