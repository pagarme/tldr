const sendData = (req, res, statusCode, data) =>
  res.status(statusCode).send({
    data,
  })

module.exports = {
  sendData,
}
