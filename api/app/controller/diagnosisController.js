const Diagnosis = require('../model/diagnosis')

module.exports = {
  update : async (req, res) => {
    const diagnosisBody = req.body
    const { _id } = req.body
    console.log(diagnosisBody)

    try {
      let diagnosis = await Diagnosis.findOneAndUpdate({
        _id: _id
      },
      {
        $set: diagnosisBody
      }
      ,{
        new: true
      })
      return res.json(diagnosis)
    } catch (error) {
      console.log(error)
    }
  },
  create : async (req, res) => {
    const diagnosisBody = req.body
    try {
      let diagnosis = await Diagnosis(diagnosisBody)
      await diagnosis.save()

      return res.json(diagnosis)
    } catch (error) {
      console.log(error)
    }
  },
  get : async (req, res) => {
    const { pasienId } = req.params
    try {
      let diagnosis = await Diagnosis.findOne({ pasien: pasienId }).lean()

      if (diagnosis) {
        return res.json(diagnosis)
      } else {
        return res.status(404).json({ errors: [`diagnosis dengan pasien ID ${pasienId} tidak ditemukan`] });
      }
    } catch (error) {
      
    }
  }
}