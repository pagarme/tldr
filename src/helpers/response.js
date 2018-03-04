const formatResponse = (data, error) => ({
  data,
  error,
})

const sendData = (req, res, statusCode, data) => {
  const response = formatResponse(data)

  return res.status(statusCode).send(response)
}

module.exports = {
  sendData,
}
