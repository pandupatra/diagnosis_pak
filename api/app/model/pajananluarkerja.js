const mongoose = require('mongoose');

const pajananluarkerjaSchema = mongoose.Schema({
  pasien: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pasien"
  },
  pekerjaan_rumah: String,
  hobi: String,
  pekerjaan_sampingan: String,
})

module.exports = mongoose.model("PajananLuarKerja", pajananluarkerjaSchema)