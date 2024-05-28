const Hasildiagnosis = require('../model/hasildiagnosis')

module.exports = {
  update : async (req, res) => {
    const hasildiagnosisBody = req.body
    const { _id } = req.body
    console.log(hasildiagnosisBody)

    try {
      let hasildiagnosis = await Hasildiagnosis.findOneAndUpdate({
        _id: _id
      },
      {
        $set: hasildiagnosisBody
      }
      ,{
        new: true
      })
      return res.json(hasildiagnosis)
    } catch (error) {
      console.log(error)
    }
  },
  create : async (req, res) => {
    const hasildiagnosisBody = req.body
    try {
      let hasildiagnosis = await Hasildiagnosis(hasildiagnosisBody)
      await hasildiagnosis.save()

      return res.json(hasildiagnosis)
    } catch (error) {
      console.log(error)
    }
  },
  get : async (req, res) => {
    const { pasienId } = req.params
    try {
      let hasildiagnosis = await Hasildiagnosis.findOne({ pasien: pasienId }).lean()

      if (hasildiagnosis) {
        return res.json(hasildiagnosis)
      } else {
        return res.status(404).json({ errors: [`hasildiagnosis dengan pasien ID ${pasienId} tidak ditemukan`] });
      }
    } catch (error) {
      
    }
  }
}