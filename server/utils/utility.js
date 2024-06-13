const moment = require("moment");

function formatDate(date) {
  return moment(date).format("Do MMM YYYY");
}

module.exports = { formatDate };
