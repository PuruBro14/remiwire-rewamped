const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, "..", "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const accessLogStream = fs.createWriteStream(path.join(logsDir, "access.log"), {
  flags: "a",
});

const requestLogger = morgan("combined", { stream: accessLogStream });

const errorLogger = (err, req, res, next) => {
  const errorLogStream = fs.createWriteStream(path.join(logsDir, "error.log"), {
    flags: "a",
  });
  errorLogStream.write(`${new Date().toISOString()} - ${err.message}\n`);
  next(err);
};

module.exports = { requestLogger, errorLogger };
