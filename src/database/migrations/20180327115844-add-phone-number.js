const tableName = 'Receipts'
const columnName = 'phone_number'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn(tableName, columnName, {
      type: Sequelize.STRING,
      allowNull: false,
    }),

  down: queryInterface =>
    queryInterface.removeColumn(tableName, columnName),
}
