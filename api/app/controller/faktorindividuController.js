const Faktorindividu = require('../model/faktorindividu')

module.exports = {
  update : async (req, res) => {
    const faktorindividuBody = req.body
    const { _id } = req.body
    console.log(faktorindividuBody)

    try {
      let faktorindividu = await Faktorindividu.findOneAndUpdate({
        _id: _id
      },
      {
        $set: faktorindividuBody
      }
      ,{
        new: true
      })
      return res.json(faktorindividu)
    } catch (error) {
      console.log(error)
    }
  },
  create : async (req, res) => {
    const faktorindividuBody = req.body
    try {
      let faktorindividu = await Faktorindividu(faktorindividuBody)
      await faktorindividu.save()

      return res.json(faktorindividu)
    } catch (error) {
      console.log(error)
    }
  },
  get : async (req, res) => {
    const { pasienId } = req.params
    try {
      let faktorindividu = await Faktorindividu.findOne({ pasien: pasienId }).lean()

      if (faktorindividu) {
        return res.json(faktorindividu)
      } else {
        return res.status(404).json({ errors: [`faktorindividu dengan pasien ID ${pasienId} tidak ditemukan`] });
      }
    } catch (error) {
      
    }
  }
}