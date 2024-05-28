const PajananLuarKerja = require('../model/pajananluarkerja')

module.exports = {
  update : async (req, res) => {
    const pajananluarkerjaBody = req.body
    const { _id } = req.body
    console.log(pajananluarkerjaBody)

    try {
      let pajananluarkerja = await PajananLuarKerja.findOneAndUpdate({
        _id: _id
      },
      {
        $set: pajananluarkerjaBody
      },
      {
        new: true
      })
      return res.json(pajananluarkerja)
    } catch (error) {
      console.log(error)
    }
  },
  create : async (req, res) => {
    const pajananluarkerjaBody = req.body
    try {
      let pajananluarkerja = await PajananLuarKerja(pajananluarkerjaBody)
      await pajananluarkerja.save()

      return res.json(pajananluarkerja)
    } catch (error) {
      console.log(error)
    }
  },
  get : async (req, res) => {
    const { pasienId } = req.params
    try {
      let pajananluarkerja = await PajananLuarKerja.findOne({ pasien: pasienId }).lean()

      if (pajananluarkerja) {
        return res.json(pajananluarkerja)
      } else {
        return res.status(404).json({ errors: [`pajananluarkerja dengan pasien ID ${pasienId} tidak ditemukan`] });
      }
    } catch (error) {
      
    }
  }
}