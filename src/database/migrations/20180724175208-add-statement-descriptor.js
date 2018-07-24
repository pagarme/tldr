const tableName = 'Receipts'
const columnName = 'statement_descriptor'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn(tableName, columnName, {
      type: Sequelize.STRING,
      allowNull: true,
    }),

  down: queryInterface =>
    queryInterface.removeColumn(tableName, columnName),
}
