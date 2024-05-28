const Pajanan = require('../model/pajanan')

module.exports = {
  update : async (req, res) => {
    const pajananBody = req.body
    const { _id } = req.body
    console.log(pajananBody)

    try {
      let pajanan = await Pajanan.findOneAndUpdate({
        _id: _id
      },
      {
        $set: pajananBody
      },
      {
        new: true
      })
      return res.json(pajanan)
    } catch (error) {
      console.log(error)
    }
  },
  create : async (req, res) => {
    const pajananBody = req.body
    try {
      let pajanan = await Pajanan(pajananBody)
      await pajanan.save()

      return res.json(pajanan)
    } catch (error) {
      console.log(error)
    }
  },
  get : async (req, res) => {
    const { pasienId } = req.params
    try {
      let pajanan = await Pajanan.findOne({ pasien: pasienId }).lean()

      if (pajanan) {
        return res.json(pajanan)
      } else {
        return res.status(404).json({ errors: [`pajanan dengan pasien ID ${pasienId} tidak ditemukan`] });
      }
    } catch (error) {
      
    }
  }
}