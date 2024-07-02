const Pasien = require('../model/pasien');
const Anamnesis = require('../model/anamnesis');
const Diagnosis = require('../model/diagnosis');
const Faktorindividu = require('../model/faktorindividu');
const Gejala = require('../model/gejala');
const Hasildiagnosis = require('../model/hasildiagnosis');
const InputPajanan = require('../model/inputPajanan');
const Pajanan = require('../model/pajanan');
const Pajananluarkerja = require('../model/pajananluarkerja');
const moment = require('moment')

module.exports = {
  index: async(req, res)=>{
    try {
      const alertMessage = req.flash("alertMessage")
      const alertStatus = req.flash("alertStatus")

      const alert = { message: alertMessage, status: alertStatus}
      const pasien = await Pasien.find()

      console.log("alert >>")
      console.log(alert)

      res.render('admin/pasien/view_pasien',{
        pasien,
        alert,
        title: 'Halaman Pasien'
      })
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/pasien')
      
    }
  },
  detail: async(req, res)=>{
    const { id } = req.params
    try {
      const alertMessage = req.flash("alertMessage")
      const alertStatus = req.flash("alertStatus")

      const alert = { message: alertMessage, status: alertStatus}
      const pasien = await Pasien.findOne({ _id: id })
      const anamnesis = await Anamnesis.findOne({ pasien: id })
      const diagnosis = await Diagnosis.findOne({ pasien: id })
      const faktorindividu = await Faktorindividu.findOne({ pasien: id })
      const gejala = await Gejala.findOne({ pasien: id })
      const hasildiagnosis = await Hasildiagnosis.findOne({ pasien: id })
      const inputPajanan = await InputPajanan.findOne({ pasien: id })
      const pajanan = await Pajanan.findOne({ pasien: id })
      const pajananluarkerja = await Pajananluarkerja.findOne({ pasien: id })

      console.log("alert >>")
      console.log(alert)

      res.render('admin/pasien/detail',{
        pasien,
        anamnesis,
        diagnosis,
        faktorindividu,
        gejala,
        hasildiagnosis,
        inputPajanan,
        pajanan,
        pajananluarkerja,
        alert,
        title: 'Halaman Pasien'
      })
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/pasien')
      
    }
  },
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