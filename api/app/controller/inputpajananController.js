const Inputpajanan = require('../model/inputPajanan')

module.exports = {
  update : async (req, res) => {
    const inputpajananBody = req.body
    const { _id } = req.body
    console.log(inputpajananBody)

    try {
      let inputpajanan = await Inputpajanan.findOneAndUpdate({
        _id: _id
      },
      {
        $set: inputpajananBody
      }
      ,{
        new: true
      })
      return res.json(inputpajanan)
    } catch (error) {
      console.log(error)
    }
  },
  create : async (req, res) => {
    const inputpajananBody = req.body
    try {
      let inputpajanan = await Inputpajanan(inputpajananBody)
      await inputpajanan.save()

      return res.json(inputpajanan)
    } catch (error) {
      console.log(error)
    }
  },
  get : async (req, res) => {
    const { pasienId } = req.params
    try {
      let inputpajanan = await Inputpajanan.findOne({ pasien: pasienId }).lean()

      if (inputpajanan) {
        return res.json(inputpajanan)
      } else {
        return res.status(404).json({ errors: [`inputpajanan dengan pasien ID ${pasienId} tidak ditemukan`] });
      }
    } catch (error) {
      
    }
  }
}