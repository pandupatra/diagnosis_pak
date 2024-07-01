const Pasien = require('../model/pasien')

module.exports = {
  index: async (req, res) => {
    try {

      const pasien = await Pasien.countDocuments()
      res.render('admin/dashboard/view_dashboard', {
        // name: req.session.user.name,
        title: 'Halaman Dashboard',
        count: {
          pasien
        }
      })
    } catch (err) {
      console.log(err)

    }
  }
}