const tableName = 'Receipts'
const columName = 'cvm_pin'

module.exports = {
  up: queryInterface =>
    queryInterface.sequelize.query(`UPDATE "${tableName}" SET ${columName} = true`),
}
