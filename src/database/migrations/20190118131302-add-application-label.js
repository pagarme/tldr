const tableName = 'Receipts'
const columnName = 'application_label'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn(tableName, columnName, {
      type: Sequelize.STRING,
      allowNull: true,
    }),

  down: queryInterface =>
    queryInterface.removeColumn(tableName, columnName),
}
