const tableName = 'Receipts'
const columnName = 'cvm_pin'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn(tableName, columnName, {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    }),

  down: queryInterface =>
    queryInterface.removeColumn(tableName, columnName),
}
