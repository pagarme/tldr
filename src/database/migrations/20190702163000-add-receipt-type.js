const tableName = 'Receipts'
const columnName = 'type'
const defaultValue = 'stone_mais'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn(tableName, columnName, {
      type: Sequelize.STRING,
      defaultValue,
    }),

  down: queryInterface =>
    queryInterface.removeColumn(tableName, columnName),
}
