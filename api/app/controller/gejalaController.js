const { default: mongoose } = require('mongoose')
const Gejala = require('../model/gejala')

module.exports = {
  create : async (req, res) => {
    const gejalaBody = req.body

    try {
      let gejala = await Gejala(gejalaBody)
      await gejala.save()

      return res.json(gejala)
    } catch (error) {
      console.log(error)
    }
  },
  get : async (req, res) => {
    let { pasienId } = req.params
    try {
      let gejala = await Gejala.findOne({ pasien: pasienId }).lean()
      console.log(gejala)
      if (gejala) {
        return res.json(gejala)
      } else {
        return res.status(404).json({ errors: [`gejala dengan pasien ID ${pasienId} tidak ditemukan`] });
      }
    } catch (error) {
      
    }
  }
}