const { mongoose } = require('mongoose')
const Anamnesis = require('../model/anamnesis')

module.exports = {
  update : async (req, res) => {
    const anamnesisBody = req.body
    const { _id } = req.body
    console.log(anamnesisBody)

    try {
      let anamnesis = await Anamnesis.findOneAndUpdate({
        _id: _id ?? new mongoose.Types.ObjectId()
      },
      {
        $set: anamnesisBody
      },
      {
        new: true
      })
      console.log(anamnesis)
      return res.json(anamnesis)
    } catch (error) {
      console.log(error)
    }
  },
  create : async (req, res) => {
    const anamnesisBody = req.body
    try {
      let anamnesis = await Anamnesis(anamnesisBody)
      await anamnesis.save()

      return res.json(anamnesis)
    } catch (error) {
      console.log(error)
    }
  },
  get : async (req, res) => {
    const { pasienId } = req.params
    try {
      let anamnesis = await Anamnesis.findOne({ pasien: pasienId }).lean()

      if (anamnesis) {
        return res.json(anamnesis)
      } else {
        return res.status(404).json({ errors: [`anamnesis dengan pasien ID ${pasienId} tidak ditemukan`] });
      }
    } catch (error) {
      
    }
  }
}