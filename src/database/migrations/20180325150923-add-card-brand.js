const tableName = 'Receipts'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn(tableName, 'card_brand', {
      type: Sequelize.STRING,
      allowNull: false,
    }),

  down: queryInterface =>
    queryInterface.removeColumn(tableName, 'card_brand'),
}
