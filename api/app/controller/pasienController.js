const Pasien = require('../model/pasien');
const moment = require('moment')

module.exports = {
  signInByNik: async (req, res) => {
    const { nik } = req.body
    try {
      const pasien = await Pasien.find({ nik: nik }).lean()
      if (pasien.length) {
        return res.json(pasien)
      } else {
        return res.status(404).json({ errors: ["pasien tidak ditemukan"] });
      }
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  },
  create : async (req, res) => {
    try {
      const pasienBody = req.body
      if (pasienBody.tanggal_lahir) {
        pasienBody.tanggal_lahir = moment(pasienBody.tanggal_lahir, 'YYYY/MM/DD').format('YYYY-MM-DD[T]HH:mm:ss')
      }
      console.log(pasienBody)
      let pasien = await Pasien(pasienBody)



      await pasien.save()

      return res.json(pasien)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ errors: err.message });
    }
  },
  update : async (req, res) => {
    const pasienId = req.body._id
    try {
      const {
        nama,
        jenis_kelamin,
        tahun_masuk,
        no_riwayat_medis,
        golongan_darah,
        tinggi_badan,
        berat_badan,
        no_telepon,
        alamat,
        agama,
        pekerjaan,
        tanggal_lahir,
        nip,
        nik
      } = req.body

      let pasien = await Pasien.findOneAndUpdate({
        _id: pasienId,
      }, 
      {
        nama,
        jenis_kelamin,
        tahun_masuk,
        no_riwayat_medis,
        golongan_darah,
        tinggi_badan,
        berat_badan,
        no_telepon,
        alamat,
        agama,
        pekerjaan,
        tanggal_lahir: moment(tanggal_lahir, 'YYYY/MM/DD').format('YYYY-MM-DD[T]HH:mm:ss'),
        nip,
        nik
      })

      await pasien.save()

      return res.json(pasien)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ errors: err.message });
    }
  } 
}