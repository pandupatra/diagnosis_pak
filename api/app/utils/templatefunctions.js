const moment = require('moment');

module.exports = () => {
  return {
    formatDate: (dateTxt, localizedFormat) => {
      return moment.utc(dateTxt, 'DD/MM/YYYY').format(localizedFormat);
    }
  }
}