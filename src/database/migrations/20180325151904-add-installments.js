const tableName = 'Receipts'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn(tableName, 'installments', {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    }),

  down: queryInterface =>
    queryInterface.removeColumn(tableName, 'installments'),
}
